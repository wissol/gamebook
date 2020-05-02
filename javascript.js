
const section = {
	title: "my title",
	text: "<p>\
	The text of each gamebook section contains one or more paragraph and\
	other such block of texts. And even inline markup. Therefore it\
	cannot be easily constrained to a format\
	</p><p>\
	For example here it's an <b>important</b> second paragraph</p>",
	options: [1], //["This is option 1","This is option 2"], // an array it can be empty
	};
	
title = "My title";
const section_title = `<h2>${section.title}</h2>`;
const section_text = section.text;
console.log(section.options);

if(section.options.length === 0){options_text = "<h3>The End</h3>"} else {options_text = "<section><h3>Options</h3><ol><a class='options' href='dontcare'><li>First option</li></a></ol>"}

document.getElementById("gbSection").innerHTML = section_title + 
												 section.text + options_text;

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
