function SpellBook() {
	this.spellList = [];
	this.addSpell = function(name, level, school) {
		const newSpell = new Spell(name,level,school);
		newSpell.makeDomElement();
		this.spellList.push(newSpell);
	}
	this.removeSpell = function(name) {
		for(let i = 0; i < this.spellList.length; ++i) {
			if(this.spellList[i].name === name) {
				this.spellList[i].remove();
				this.spellList.splice(i,1);
			}
		}
	}
}

function Spell(name, level, school) {
	this.name = name;
	this.level = level;
	this.school = school;
	this.buildListItem = function() {
		const newItem = document.createElement('li');
		const list = document.querySelector(`#${this.level.replace(' ','_')}_spells`);
		list.appendChild(newItem);
		return newItem;
	}
	this.buildSpan = function() {
		const newSpan = document.createElement('span');
		newSpan.className = this.school;
		newSpan.textContent = this.name;
		return newSpan;
	}
	this.makeDomElement = function () {
		this.li = this.buildListItem();
		this.li.appendChild(this.buildSpan());
	}
	this.remove = function() {
		this.li.remove();
	}
}


(function () {
	const book = document.querySelector('main');
	//Dynamically add multiple spell categories
	for(let i = 1; i <= 9; ++i) {
		book.innerHTML += `<span class="spellCategory">Level ${i} Spells</span>`;
		book.innerHTML += `<ul id=Level_${i}_spells></ul>`;  
	}
	const app = new SpellBook();
	document.querySelector('#addForm').addEventListener('submit', ev => {
		ev.preventDefault();
		const gi = s => ev.target[s].value;
		app.addSpell(gi('spellName'),gi('spellLevel'),gi('spellSchool'));
		ev.target.spellName.value = '';
		ev.target.spellName.focus();
	});
	document.querySelector('#removeForm').addEventListener('submit', ev => {
		ev.preventDefault();
		app.removeSpell(ev.target.removeName.value);
		ev.target.removeName.value = '';
		ev.target.removeName.focus();
	});
})();