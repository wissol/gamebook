console.log("It kinda works!");

const options = document.getElementsByClassName("options");
// Creates a special object, which is kinda an array but not quite
// So I can't use forEach etc unless using Array.from(options);
// discovered it using  console.log(typeof options);

// old school way to do it
//for (i = 0; i < options.length; i++) {
//  options.item(i).addEventListener("click", function(click){
//  click.preventDefault();
//  alert("Managed by the gamebook engine");
//});
//}

Array.from(options).forEach( link =>
		link.addEventListener("click", function(click){
		click.preventDefault();
		alert("Managed by the gamebook engine");
	})
);
