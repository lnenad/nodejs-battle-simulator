# NodeJS Battle simulator

A simple battle simulator written in nodejs.

## Getting Started

The only dependency of this project is a TOML parser library used to load initial army config.

### Configuration

Configure the starting state of the armies inside the config.toml file.

#### Example configuration

```toml
[main]
tickDuration=25 # Game loop tick duration in milliseconds
attackStrategy=0 # Army attack strategy 0 - Random | 1 - Weakest | 2 - Strongest
fastGame=true # Make the units recharge 10 times faster for a quicker simulation

[[armies]]
name="USA"

    [[armies.squads]]
        [[armies.squads.units]]
        type="Soldier"
        [[armies.squads.units]]
        type="Soldier"
    [[armies.squads]]
        [[armies.squads.units]]
        type="Soldier"
        [[armies.squads.units]]
        type="Soldier"
    [[armies.squads]]
        [[armies.squads.units]]
        type="Soldier"
        [[armies.squads.units]]
        type="Soldier"

[[armies]]
name="China"

    [[armies.squads]]
        [[armies.squads.units]]
        type="Soldier"
        [[armies.squads.units]]
        type="Soldier"
    [[armies.squads]]
        [[armies.squads.units]]
        type="Soldier"
        [[armies.squads.units]]
        type="Soldier"
        [[armies.squads.units]]
        type="Vehicle"
            [[armies.squads.units.operators]]
            type="Soldier"
            [[armies.squads.units.operators]]
            type="Soldier"

```

### Installing

```
$ npm install
```

## Running the tests

To run the tests run the node script

```shell
$ npm run test
```

## Running the project

To run the project execute the `main.js` file using node.

```shell
$ node main.js
```

## Authors

* **Nenad Lukic** - *Initial work* - [lnenad](https://github.com/lnenad)

## Licence

This project is licensed under the MIT License


