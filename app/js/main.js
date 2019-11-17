(function () {


	let scene = document.getElementById("scene");
	const NUMBER_OF_ELEMENTS = 50;



	createDots();

	let dots = document.querySelectorAll(".dots");
	let shape = document.querySelectorAll(".shape");
	let parallax = new Parallax(scene);

	customizeDots();

	const addBtn = document.querySelector(".form-header__btn");
	const toDoList = document.querySelector(".todo-list");



	addBtn.addEventListener("click", addString);
	buildLocalList();

	function addString() {
		const inputItem = document.querySelector(".todo-input");
		if (inputItem) {
			inputItem.remove();
			addBtn.classList.toggle("active");
			return;
		}
		addBtn.classList.toggle("active");
		let element = '<div class="todo-input"><input class="todo-input__item"></input><div class="todo-input__btn">add</div></div>';
		toDoList.insertAdjacentHTML("afterend", element);

		document.querySelector(".todo-input__item").setAttribute("autofocus", true);
		document.querySelector(".todo-input__item").setAttribute("placeholder", "write something");


		const inputBtn = document.querySelector(".todo-input__btn");
		inputBtn.style.animationDelay = `${-(Math.floor(performance.now() / 100) / 10) % 30}s`;

		inputBtn.addEventListener("click", addLocalItem);
	}

	function buildLocalList() {
		toDoList.innerHTML = "";

		for (let i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i);
			toDoList.insertAdjacentHTML("beforeend", `<li><div class="todo-list__text ${localStorage.getItem(key)}">${key}</div><div class="todo-list__remove"></div></li>`);
		}

		let removeBtn = document.querySelectorAll(".todo-list__remove");
		let checkItem = document.querySelectorAll(".todo-list__text")

		for (let i = 0; i < removeBtn.length; i++) {

			removeBtn[i].classList.toggle(`rm-${i}`);
			checkItem[i].classList.toggle(`ch-${i}`);
			document.querySelector(`.rm-${i}`).addEventListener("click", delLocalItem);
			document.querySelector(`.ch-${i}`).addEventListener("click", checkLocalItem);
		}
	}

	function addLocalItem() {
		let item = document.querySelector(".todo-input__item");

		if (item.value === "" || item.value === undefined) {
			console.log("Done!");
			item.classList.toggle("error");
		} else {
			localStorage[item.value] = "unchecked";

			buildLocalList();
			addString();
		}
	}

	function delLocalItem() {
		let localElement = this.classList[1].slice(3);
		let localList = document.querySelectorAll(".todo-list__text");
		localStorage.removeItem(localList[localElement].innerHTML);
		buildLocalList();
	}

	function checkLocalItem() {
		this.classList.toggle("unchecked");
		let value = this.innerHTML;

		localStorage.getItem([value]) === "unchecked" ? localStorage.setItem(value, "") : localStorage.setItem(value, "unchecked");
	}

	function createDots() {
		for (let i = 0; i < NUMBER_OF_ELEMENTS; i++) {
			let element = document.createElement("li");
			element.className = "dots";
			element.setAttribute("data-depth", Math.random());
			element.innerHTML = '<div class="shape"></div>';
			scene.insertAdjacentElement("afterbegin", element);
		}
	}

	function customizeDots() {
		for (let i = 0; i < NUMBER_OF_ELEMENTS; i++) {

			dots[i].style.left = randomPlacing();
			dots[i].style.top = randomPlacing();
			dots[i].style.filter = `opacity(${dots[i].getAttribute("data-depth") * 110}%)`;
			shape[i].style.transform = ` rotate(${randomRotate()}deg) scale(${dots[i].getAttribute("data-depth") * 1.14})`;

		}
	}

	function randomPlacing() {
		return Math.floor(Math.random() * 100) + "%";
	}

	function randomRotate() {
		return Math.floor(Math.random() * 90);
	}

})();