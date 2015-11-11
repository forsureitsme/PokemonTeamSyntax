var
	fs      = require('fs'),
	plist   = require('plist'),
	request = require('request'),
	async   = require('async')
;


console.log('Loading config files.');
data = JSON.parse(fs.readFileSync('data.json','utf-8'));
function syntax()
{
	console.log('-- Building Syntax Highlight File');

	syntax = fs.readFileSync('PokemonTeamSyntax.JSON-tmLanguage','utf-8');

	console.log('Started fetching.');
	var requests = {};
	for(var pattern in data)
	{
		requests[pattern] = requestFunction(pattern);
	}

	async.parallel(
		requests,
		function (err, results)
		{
			for(var pattern in results)
			{
				var
					error = results[pattern][0],
					response = results[pattern][1],
					json = results[pattern][2]
				;
				try
				{
					if (!error && response.statusCode == 200)
					{
						json = JSON.parse(json);
						console.log('Importing '+pattern+'!');
						data[pattern].last_modified = response.headers['last-modified'];
						data[pattern].file          = json.content;
					}
					else if (!error && response.statusCode == 304)
					{
						console.log('Loading local, '+pattern+' were not modified!');
					}
					else
					{
						throw 'HTTP Request Failed!';
					}

					eval(new Buffer(data[pattern].file, 'base64').toString('utf8'));
				}
				catch(e)
				{
					exports[data[pattern].exports] = false;
					console.log('Couldn\'t import '+pattern+'! '+e.message);
				}
			}

			console.log('Saving data.');
			fs.writeFileSync('data.json', JSON.stringify(data, null, '\t'));

			console.log('Update process started.');
			for(var pattern in data)
			{
				var list = [];
				for(var id in exports[data[pattern].exports])
				{
					list.push(exports[data[pattern].exports][id][data[pattern].property]);
				}
				syntax = syntax.replace('{{'+pattern+'}}', list.sort().reverse().join('|'));
			}

			console.log('Update finished, writing language file.');
			fs.writeFileSync('PokemonTeamSyntax.tmLanguage', plist.build(JSON.parse(syntax)));
			console.log('Done.');
			completions();
		}
	);
}
// Needed to return a function here, so "pattern" would be evaluated by the time requestFunction() is called.
function requestFunction(pattern)
{
	return function(callback)
	{
		console.log('Fetching: '+data[pattern].exports);
		request(
			{
				url: data[pattern].url,
				headers: {
					'User-Agent': 'forsureitsme/PokemonTeamSyntax',
					'If-Modified-Since': data[pattern].last_modified
				}
			},
			function(error, response, json)
			{
				callback(null, [error, response, json]);
			}
		)
	}
}

function completions()
{
	console.log('-- Building Completions File');

	console.log('Reading current Completions file');
	completions = JSON.parse(fs.readFileSync('PokemonTeamSyntax.sublime-completions','utf-8'));

	console.log('Updating completions from data');
	completions.completions = [];
	var
		completion = '',
		tip = ''
	;

	// It's pretty lame and wrong what I'm doing here
	data.natures = {
		exports: "BattleNatures",
		property: "name"
	};
	exports.BattleNatures = {
		adamant: 	{name: "Adamant"},
		bashful: 	{name: "Bashful"},
		bold: 		{name: "Bold"},
		brave: 		{name: "Brave"},
		calm: 		{name: "Calm"},
		careful: 	{name: "Careful"},
		docile: 	{name: "Docile"},
		gentle: 	{name: "Gentle"},
		hardy: 		{name: "Hardy"},
		hasty: 		{name: "Hasty"},
		impish: 	{name: "Impish"},
		jolly: 		{name: "Jolly"},
		lax: 		{name: "Lax"},
		lonely: 	{name: "Lonely"},
		mild: 		{name: "Mild"},
		modest: 	{name: "Modest"},
		naive: 		{name: "Naive"},
		naughty: 	{name: "Naughty"},
		quiet: 		{name: "Quiet"},
		quirky: 	{name: "Quirky"},
		rash: 		{name: "Rash"},
		relaxed: 	{name: "Relaxed"},
		sassy: 		{name: "Sassy"},
		serious: 	{name: "Serious"},
		timid: 		{name: "Timid"}
	};
	//

	for(var pattern in data)
	{
		for(var id in exports[data[pattern].exports])
		{
			completion = exports[data[pattern].exports][id][data[pattern].property];
			completion = completion.charAt(0).toUpperCase() + completion.slice(1);
			tip = pattern.charAt(0).toUpperCase() + pattern.slice(1);

			completions.completions.push({
				trigger: completion+'\t'+tip,
				contents: pattern != 'natures' ? completion : completion+' Nature'
			});
		}
	}

	console.log('Update finished, writing completions file.');
	fs.writeFileSync('PokemonTeamSyntax.sublime-completions', JSON.stringify(completions, null, '\t'));
	console.log('Done.');
}

// Start
syntax();