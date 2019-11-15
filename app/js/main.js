(function () {


	let scene = document.getElementById("scene");
	const NUMBER_OF_ELEMENTS = 50;
	
	/* document.body.append(element, element); */

	for (let i = 0; i < NUMBER_OF_ELEMENTS; i++) {
		let element = document.createElement("li");
		
		element.className = "dots";
		element.setAttribute("data-depth", Math.random());
		element.innerHTML = '<div class="shape"></div>';
		scene.insertAdjacentElement("afterbegin", element);
		
		

	}
	
	let dots = document.querySelectorAll(".dots");
	let shape = document.querySelectorAll(".shape");
	


	let parallax = new Parallax(scene);

	for (let i = 0; i < NUMBER_OF_ELEMENTS; i++) {
		
		dots[i].style.top = `${i*3}%`; 
		dots[i].style.left = randomPlacing();
		dots[i].style.top = randomPlacing(); 
		dots[i].style.filter = `opacity(${dots[i].getAttribute("data-depth")*110}%)`;
		
		shape[i].style.transform = ` rotate(${randomRotate()}deg) scale(${dots[i].getAttribute("data-depth")*1.14})`;
		
	}
	
		
	
	function randomPlacing() {
		return Math.floor(Math.random() * 100) + "%";
	}
	function randomRotate() {
		return Math.floor(Math.random() * 90);
	}
	
})();