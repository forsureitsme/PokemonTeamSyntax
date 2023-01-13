import fs from "fs";
import plist from "plist";
import AbilitiesFile from "pokemon-showdown/dist/data/abilities.js";
import ItemsFile from "pokemon-showdown/dist/data/items.js";
import MovesFile from "pokemon-showdown/dist/data/moves.js";
import PokedexFile from "pokemon-showdown/dist/data/pokedex.js";
import NaturesFile from "pokemon-showdown/dist/data/natures.js";

console.log('-- Building Syntax Highlight File');

const files = {
	JSONtmLanguage: 'PokemonTeamSyntax.JSON-tmLanguage',
	tmLanguage: 'PokemonTeamSyntax.tmLanguage',
	sublimeCompletions: 'PokemonTeamSyntax.sublime-completions',
}

let syntaxFile = fs.readFileSync(files.JSONtmLanguage, 'utf-8');

console.log('Started fetching.');

const patterns = {
	abilities: AbilitiesFile.Abilities,
	items: ItemsFile.Items,
	moves: MovesFile.Moves,
	pokemons: PokedexFile.Pokedex,
	natures: NaturesFile.Natures
};

const toCapital = (str) => str[0].toUpperCase() + str.slice(1);

for (const [pattern, elements] of Object.entries(patterns)) {
	const list = Object.values(elements).map(x => x.name);
	const replaceTarget = '{{' + pattern + '}}';
	const replaceValue = list.sort().reverse().join('|');

	syntaxFile = syntaxFile.replace(replaceTarget, replaceValue);
}

console.log('Data gathered, writing language file.');

fs.writeFileSync(files.tmLanguage, plist.build(JSON.parse(syntaxFile)));

console.log('Done.');
console.log('-- Building Completions File');
console.log('Reading current Completions file');

let completionsFile = JSON.parse(fs.readFileSync(files.sublimeCompletions, 'utf-8'));

console.log('Updating completions from data');

completionsFile.completions = [];
for (const [pattern, elements] of Object.entries(patterns)) {
	Object.values(elements).forEach(({ name }, index) => {
		const type = toCapital(pattern);
		let completion = toCapital(name);

		if(pattern === 'natures') completion += ' Nature';

		completionsFile.completions.push({
			trigger: completion + '\t' + type,
			contents: completion
		});
	})
}

console.log('Update finished, writing completions file.');

fs.writeFileSync(files.sublimeCompletions, JSON.stringify(completionsFile, null, '\t'));

console.log('Done.');
