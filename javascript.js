
function arrayToList(thisArray=[], first=false){
	if(thisArray.length === 0 ) {
		if(first){
			return "Empty.";
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

function max(thisArray, x=0){
	if(thisArray.length === 0){
		return x;
	} 
	x = thisArray[0] > x ? thisArray[0] : x ;
	return max(thisArray.slice(1), x);
}

// ----- Dice ----------------------------------------------------------

const d6 = () => Math.floor(Math.random() * 6) + 1;
// dice
const twoD6 = () => d6() + d6();
const threeD6 = () => d6() + d6() + d6(); 
// rolls three dice

const weapon_list = new Map([
	['hands', 0],
	['dagger',1],
	['spear',4],
	['sword',3],
	['',0],
]);

const armors = new Map([
  ['gambeson',3],
  ['mail',5],
  ['plate',7],
]);

// ----- Rules ---------------------------------------------------------
// 
// Skill Roll
// Skill + 3Dice >= Target Number 
// Combat: 1 Roll Skill Roll + Modifiers > TN
// normal TN = 19 goes from 12 to 30

const player = {
	combatMod: function(weapon){
		const x = weapon_list.get(weapon);
		if(this.shield){return x+3} 
		else if (weapon === "spear") {
			return x - 2;
		} else {return x}
	},	
	
	maxCombatMod: function(){ 
		return this.weapons.length === 0 ? this.combatMod("hands") 
		                                 : max(this.weapons.map(w => this.combatMod(w)))
		},
		
	skillRoll: function(difficulty=0) {	return this.skill >= threeD6() + difficulty ?  true : false	},
	
	combatRoll: function(enemyCombatMod) {return this.skillRoll( Math.floor((enemyCombatMod - this.maxCombatMod())/3)) },
	
	luck: function(difficulty=0){return threeD6() - 11 >= difficulty},
	
	name: "Pip", // to be entered by player Pip as default
	skill: 9,
	weapons: ["sword", "pup"], // max 3 per game rules
	shield: true, // either shield or no shield, nothing fancy here
	armor: "gambeson", //
	backpack: [], //max 12 per game rules
	rations: 4,
	money: 23, // in silver coins
	show() {
		return `<h3>Character Sheet</h3>` +
		       `<p><b>Name:</b> ${this.name} <b>Skill:</b> ${this.skill}` +
		       `<p><b>Backpack:</b> ${arrayToList(this.backpack, first=true)}</p>` +
			   `<p><b>Weapons:</b>  ${arrayToList(this.weapons, first=true)}</p>` +
			   `<p><b>Rations:</b>  ${this.rations} <b>Money:</b>  ${this.money}</p>`;
		},
	};
	
// ----- Sections -------------------------------------------------------

sections = new Map();

sections.set("404", 
		 {
            title:"Error kinda 404:(",
            text:"\
            <p>Lo siento mucho, pero se ha generado un error en esta página. Lo\
            más probable es que me haya olvidado de algo, o tenga un punto y\
            coma donde no debería o que simplemente no hay todavía escrito la\
            sección que habías elegido para continuar la aventura.</p>\
            ",
            choices: [],
        });
        
sections.set("start", 
		 {
            title:"Game starts here",
            text:"\
            <p>This is where the game starts</p>\
            ",
            choices: [{text: "Get here", link:"here"},
                      {text: "Get there", link:"there"} ],
        });
        
sections.set("here", 
		 {
            title:"here",
            text:"\
            <p>This is where the game DOES NOT start</p>\
            ",
            choices: [{text: "Get here", link:"here"},{text: "Get there", link:"there"} ],
            hasTest: false,
            hasTest: false,
        });
        
sections.set("there", 
		 {
            title:"there",
            text:"\
            <p>There is where the game ends</p>\
            ",
            choices: [],
            hasTest: true,
            diff: 0,
            altTitle: "we game on!",
            altText: "<p>yay, gaming is fun!</p>",
            altChoices: [{text: "Get here", link:"here"},{text: "Get there", link:"there"} ],
        });
        
showChoice = choice => `<li><a class='choice' href='${choice.link}'>${choice.text}</a></li>`
        
showChoices = choices => choices.length === 0 ? "" : showChoice(choices[0]) + showChoices(choices.slice(1)) ;



function showSection(section, error = sections.get("404")){
	section = typeof section === "undefined" ? error : section;
	let title = section.title;
	let text = section.text;
	let choices = section.choices;
	
	if(section.hasTest && player.skillRoll(player.diff)){
		title = section.altTitle;	
		text = section.altText;
		choices = section.altChoices;	
	} 
	x = `<h2>${title}</h2>`
	x += text;	
	x += section.length === 0 ? "<h3>The End</h3>" : `<ol>${showChoices(choices)}</ol>`;
	return x ;
	
}

function updateDocument(sectionKey="start"){
	const thisSection = sections.get(sectionKey)
	document.getElementById("gbSection").innerHTML = showSection(thisSection);
	document.getElementById("characterSheet").innerHTML = player.show();		
	const choices = document.getElementsByClassName("choice");
	Array.from(choices).forEach( link =>
		link.addEventListener("click", function(click){
		click.preventDefault();
		updateDocument(link.getAttribute("href"));
	})
);
										 
}

updateDocument();




// ----- Stats ---------------------------------------------------------

//for(diff = -6; diff <= 6; diff += 1){
	//var successes = 0;
	//for(x=0; x < 1000; x +=1){	
		//successes += player.luck(diff) ? 1 : 0;
		//}
	//console.log(`Luck roll at diff ${diff}: ${successes}`);
//}
	
//for(diff = -6; diff <= 6; diff += 1){
	//var successes = 0;
	//for(x=0; x < 1000; x +=1){	
		//successes += player.skillRoll(diff) ? 1 : 0;
		//}
	//console.log(`Skill roll at diff ${diff}: ${successes}`);
//}


//for(eCM = -3; eCM < 35; eCM += 1){
	//var victories = 0;
	//for(x=0; x < 1000; x +=1){	
		//victories += player.combatRoll(eCM) ? 1 : 0;
		//}
	//console.log(`Player Combat maxMod ${player.maxCombatMod()}`);
	//console.log(`Combat at enemyCombatMod ${eCM}: ${victories}`);
//}
