# PokemonTeamSyntax

Syntax highlighting for Pokemon Team's importables in Sublime Text, by setting the syntax on the lower right corner, or saving the file with the .pktm extension.

It was roughly tested in ST3 only. Please, help me out in testing it in other places, such as ST2 and TextMate.

![PokemonTeamSyntax](https://cloud.githubusercontent.com/assets/2235293/11094374/a6248c22-8876-11e5-8536-9169f4d1060d.png)

## Install

It's recommended to install it through [Package Control](http://packagecontrol.io), since it can update automatically when new releases are available. However, you can manually install it by [downloading it](https://github.com/forsureitsme/PokemonTeamSyntax/releases) and extracting to your Packages Folder([Preferences > Browse Packages](http://i.imgur.com/T2Qyuaz.jpg)).

## Changelog
- 2.0.0
  - [Completions](https://github.com/forsureitsme/PokemonTeamSyntax/issues/4): You can now auto-complete by typing part of what you want and using your auto-completion shortcut.
  - Rules were slightly tweaked and now the "@" is not colored with the item.
- 1.2.0
  - Moved from YAML to JSON.
  - Fixed an issue([#5](https://github.com/forsureitsme/PokemonTeamSyntax/issues/5)) where "Flash" makes the move "Flash Cannon" behave weirdly. The same happened to "Charge" and "Charge Beam, and "Thunder" with "Thunderbolt.
  - Included a ``Contribute`` section in the README, for those who want to help.
  - Updated to latest(09/11/2015) data from [Pokemon-Showdown-Client](https://github.com/Zarel/Pokemon-Showdown-Client).
- 1.1.1
  - Forgot to include "Timid" nature to the dictionary
- 1.1.0
  - Things will only be colored only if they are valid
    - IVs/EVs numbers followed by one of the stats (HP, Atk, Def, SpA, SpD and Spe)
    - Happiness and Level value must be a number
    - Shiny value must be either "Yes" or "No"
    - Items, like "Eviolite" will be colored, "EvioILte" won't.
    - Properties, if followed by a colon will be colored, but their values will only be valid if they have a space between the colon and the value. Valid properties are: Ability, EVs, IVs, Shiny, Happiness and Level.
    - Natures must be followed by the word "Nature"
    - Moves must have a space between the hiphen and the name.
    - Species names are colored if followed by a space or a closing parenthesis(")"), still couldn't find a better solution for this.
- 1.0.1
  - Fixed Move "Nature Power" was wrongly being recognized as a Nature.
- 1.0.0
  - Initial release.

## Contribute

Don't edit the ``PokemonTeamSyntax.tmLanguage``, it needs to be built with ``build.js``.
You may edit any properties of ``PokemonTeamSyntax.sublime-completions`` file, except the ``completions`` one, since the build script is going to overwrite it.

If you use Sublime Text 3, I included a project file which lets you build right away with your ``Build`` shortcut.

```shell
# Install node, or make sure it's installed by running:
node -v

# Clone the repository
git clone https://github.com/forsureitsme/PokemonTeamSyntax.git
npm install
node build.js
```
