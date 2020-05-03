
const d6 = () => Math.floor(Math.random() * 6) + 1;
// dice
const twoD6 = () => d6() + d6();
const threeD6 = () => d6() + d6() + d6(); 
// rolls three dice

function arrayToList(thisArray=[], first=false){
	if(thisArray.length === 0 ) {
		if(first){
			return "---";
		} else { 
			return "."; 
			   }
	} else {
		if(first){
			return thisArray[0] + arrayToList(thisArray.slice(1), false);  
			// explicitly setting first to false because explicit is 
			// better than implicit
		} else {
			return `, ${thisArray[0]}` + arrayToList(thisArray.slice(1), false);
		}
	}
}

const armors = new Map([
  ['gambeson',3],
  ['mail',5],
  ['plate',7],
]);

console.log(armors);
console.log(armors.get('gambeson'));

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
	
const player = {
	name: "Pip", // to be entered by player Pip as default
	skill: twoD6()+6,
	stamina: threeD6(),
	weapons: ["sword","dagger","bow"], // max 3 per game rules
	shield: 0, // either shield or no shield, nothing fancy here
	armor: "gambeson", //
	backpack: [], //max 12 per game rules
	rations: 4,
	money: 23, // in silver coins
	show() {
		const header = `<h3>Character Sheet</h3>`;
		const main_stats = `<p><b>Name:</b> ${this.name} <b>Skill:</b> ${this.skill} <b>Stamina:</b> ${this.stamina}</p>`;
		const weapon_list = `<p><b>Weapons:</b>  ${arrayToList(this.weapons, first=true)}</p>`;
		return header + "\n" + main_stats + "\n" + weapon_list;
		},
	};

console.log( player.show());
player.name = "Periwinkle";	
title = "My title";
const section_title = `<h2>${section.title}</h2>`;
const section_text = section.text;
console.log(section.options);

if(section.options.length === 0){options_text = "<h3>The End</h3>"} else {options_text = "<section><h3>Options</h3><ol><a class='options' href='dontcare'><li>First option</li></a></ol>"}

document.getElementById("gbSection").innerHTML = section_title + 
												 section.text + options_text;
												 
document.getElementById("characterSheet").innerHTML = player.show();												 

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
