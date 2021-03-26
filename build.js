import fs from "fs";
import plist from "plist";
import AbilitiesFile from "pokemon-showdown/.data-dist/abilities.js";
import ItemsFile from "pokemon-showdown/.data-dist/items.js";
import MovesFile from "pokemon-showdown/.data-dist/moves.js";
import PokedexFile from "pokemon-showdown/.data-dist/pokedex.js";
import NaturesFile from "pokemon-showdown/.data-dist/natures.js";

console.log('-- Building Syntax Highlight File');
let syntaxFile = fs.readFileSync('PokemonTeamSyntax.JSON-tmLanguage', 'utf-8');

console.log('Started fetching.');
const patterns = {
	abilities: AbilitiesFile.Abilities,
	items: ItemsFile.Items,
	moves: MovesFile.Moves,
	pokemons: PokedexFile.Pokedex,
	natures: NaturesFile.Natures
};

for (const [pattern, elements] of Object.entries(patterns)) {
	let list = [];
	for (const element in elements) {
		list.push(elements[element].name);
	}
	syntaxFile = syntaxFile.replace('{{' + pattern + '}}', list.sort().reverse().join('|'));
}

console.log('Data gathered, writing language file.');
fs.writeFileSync('PokemonTeamSyntax.tmLanguage', plist.build(JSON.parse(syntaxFile)));
console.log('Done.');

console.log('-- Building Completions File');
console.log('Reading current Completions file');
let completionsFile = JSON.parse(fs.readFileSync('PokemonTeamSyntax.sublime-completions', 'utf-8'));

console.log('Updating completions from data');
completionsFile.completions = [];
let completion = '';
let tip = '';
for (const [pattern, elements] of Object.entries(patterns)) {
	for (const element in elements) {
		completion = elements[element].name;
		completion = completion.charAt(0).toUpperCase() + completion.slice(1);
		tip = pattern.charAt(0).toUpperCase() + pattern.slice(1);

		completionsFile.completions.push({
			trigger: completion + '\t' + tip,
			contents: pattern !== 'natures' ? completion : completion + ' Nature'
		});
	}
}

console.log('Update finished, writing completions file.');
fs.writeFileSync('PokemonTeamSyntax.sublime-completions', JSON.stringify(completionsFile, null, '\t'));
console.log('Done.');