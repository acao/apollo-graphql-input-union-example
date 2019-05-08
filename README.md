# apollo-graphql-input-union
A simple example of the inputUnion fork for graphql using apollo

## usage

1. clone this repo
1. `yarn`
1. `yarn start`
1. make a query like this in the playground:

```graphql
query($cat: Pet, $dog: Pet) {
  cat: pet(input: $cat)
  dog: pet(input: $dog)
}
```

using variables like:

```json
{ 
  "cat": {
    "__inputname": "Cat",
    "name": "Pookie", 
    "purr": true
  },
  "dog": {
    "__inputname": "Dog",
    "name": "Fido", 
    "woof": true
  }
}
```

the schema explorer won't work in playground

## explanation

Because of how the graphql-js project builds, there really wasnt a way to automatically install the `inputUnion` fork and build it without writing a script, so i just committed it to the repo :/.

Its based on 0.12.3, and the original proposal with `__inputname` while the spec is discussed
