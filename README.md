# TES-SS22-VisualizingConfidentialityInMobilitySystems

Team Project Software Development, Summer Term 2022

## Contributing

### Install dependencies

```shell
npm install
```

### Compile and Hot-Reload for Development

```shell
npm run dev
```

### Building the project

```shell
npm run build
```

### Linting and Formatting code

```shell
npm run check-format
npm run lint
```

### Testing

```shell
npm install
npm run build

npm run test:unit
# or
npm run coverage
```

### Pre-Commit Hooks

```shell
npm run prepare
```

installs this project's pre-commit hooks:

- lint-staged: This lints and formats your code before it is committed.
- [commit-lint](https://commitlint.js.org/#/): Checks that the commit message follows the [commit conventions](https://www.conventionalcommits.org/en/v1.0.0/#summary).

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

#### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
