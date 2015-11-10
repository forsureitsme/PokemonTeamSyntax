var
	fs      = require('fs'),
	plist   = require('plist'),
	request = require('request'),
	async   = require('async')
;


console.log('Loading config.');
data = JSON.parse(fs.readFileSync('data.json','utf-8'));
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
			if (exports[data[pattern].exports])
			{
				for(var id in exports[data[pattern].exports])
				{
					list.push(exports[data[pattern].exports][id][data[pattern].property]);
				}
			};
			syntax = syntax.replace('{{'+pattern+'}}', list.sort().reverse().join('|'));
		}

		console.log('Update finished, building language file.');

		fs.writeFileSync('PokemonTeamSyntax.tmLanguage', plist.build(JSON.parse(syntax)));
		console.log('Done.');
	}
);

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