# PokemonTeamSyntax ![Version](https://img.shields.io/github/release/forsureitsme/PokemonTeamSyntax.svg?label=Version)

![Downloads](https://img.shields.io/packagecontrol/dt/PokemonTeamSyntax.svg?label=Package Control Downloads)

Syntax highlighting for Pokemon Team's importables in Sublime Text, by setting the syntax on the lower right corner, or saving the file with the .pktm extension.

It was roughly tested in ST3 only. Please, help me out in testing it in other editors, such as ST2 and TextMate.

![PokemonTeamSyntax](https://cloud.githubusercontent.com/assets/2235293/11094374/a6248c22-8876-11e5-8536-9169f4d1060d.png)

## Install

It's recommended to install it through [Package Control](http://packagecontrol.io), since it can update automatically when new releases are available. However, you can manually install it by [downloading it](https://github.com/forsureitsme/PokemonTeamSyntax/releases) and extracting to your Packages Folder([Preferences > Browse Packages](http://i.imgur.com/T2Qyuaz.jpg)).

## Changelog
- 2.5.0
  - Pokestars added
- 2.4.0
  - Sun & Moon changes. I didn't even bother to get the whole changelist because it's really too much.
- 2.3.0
  - Build data updated to reflect the content being moved from [Pokemon-Showdown-Client](https://github.com/Zarel/Pokemon-Showdown-Client) to [Pokemon-Showdown](https://github.com/Zarel/Pokemon-Showdown).
  - Added Crucibelle, as [update from Pokemon Showdown](https://github.com/Zarel/Pokemon-Showdown/commit/b7d3ce40e791a83ea615622084b312fd9b41b95f).
  - Revert ``Remove Pikachu-Cosplay``, as [update from Pokemon Showdown](https://github.com/Zarel/Pokemon-Showdown/commit/f373762078007c40881895e0d8b0ed3b85b6489c).
  - Added event Vivillon formes, as [update from Pokemon Showdown](https://github.com/Zarel/Pokemon-Showdown/commit/b1569da63482e6336ce35bfea4bb62ef86dc5c7f).
  - Remove Flower from Floette Eternal's forme name, as [update from Pokemon Showdown](https://github.com/Zarel/Pokemon-Showdown/commit/adcde565a858b4a352ad3aca9139347b6b45b615).
- 2.2.0
  - Removed Pikachu-Cosplay from the pokemon completions, as [update from Pokemon Showdown Client](https://github.com/Zarel/Pokemon-Showdown-Client/commit/08bcba01cb746613d2cef9165f6f9834e9d3b4ba).
- 2.1.0
  - Added the following items, by the [latest update from Pokemon Showdown Client Repository](https://github.com/Zarel/Pokemon-Showdown-Client/commit/0e82df26d493ce02bf1f4384107afd83eee3309b).
    - Energy Powder
    - Berserk Gene
    - Berry
    - Bitter Berry
    - Burnt Berry
    - Dragon Scale
    - Gold Berry
    - Ice Berry
    - Mint Berry
    - Miracle Berry
    - Mystery Berry
    - Pink Bow
    - Polkadot Bow
    - PRZ Cure Berry
    - PSN Cure Berry
- 2.0.0
  - [Completions](https://github.com/forsureitsme/PokemonTeamSyntax/issues/4): You can now auto-complete by typing part of what you want and using your auto-completion shortcut.
  - Rules were slightly tweaked and now the ``@`` is not colored with the item.
- 1.2.0
  - Moved from YAML to JSON.
  - Fixed an issue([#5](https://github.com/forsureitsme/PokemonTeamSyntax/issues/5)) where ``Flash`` makes the move ``Flash Cannon`` behave weirdly. The same happened to ``Charge`` and ``Charge Beam, and ``Thunder`` with ``Thunderbolt.
  - Included a ``Contribute`` section in the README, for those who want to help.
  - Updated to latest(09/11/2015) data from [Pokemon-Showdown-Client](https://github.com/Zarel/Pokemon-Showdown-Client).
- 1.1.1
  - Forgot to include ``Timid`` nature to the dictionary
- 1.1.0
  - Things will only be colored only if they are valid
    - IVs/EVs numbers followed by one of the stats (HP, Atk, Def, SpA, SpD and Spe)
    - Happiness and Level value must be a number
    - Shiny value must be either ``Yes`` or ``No``
    - Items, like ``Eviolite`` will be colored, ``EvioILte`` won't.
    - Properties, if followed by a colon will be colored, but their values will only be valid if they have a space between the colon and the value. Valid properties are: Ability, EVs, IVs, Shiny, Happiness and Level.
    - Natures must be followed by the word ``Nature``
    - Moves must have a space between the hiphen and the name.
    - Species names are colored if followed by a space or a closing parenthesis(``)``), still couldn't find a better solution for this.
- 1.0.1
  - Fixed Move ``Nature Power`` was wrongly being recognized as a Nature.
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
