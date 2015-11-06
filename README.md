# PokemonTeamSyntax

Syntax highlighting for Pokemon Team's importables.

![PokemonTeamSyntax](https://cloud.githubusercontent.com/assets/2235293/11000535/81dacc32-8489-11e5-8d42-ce2d16bf2370.png)

## Changelog
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
