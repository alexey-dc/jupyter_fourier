# frequency_visualizer

![Github Actions Status](https://github.com/alexey-dc/jupyter_fourier/workflows/Build/badge.svg)

Jupyter Lab extension that visualizes audio frequencies

## Starting
Make sure you have all the dev tools set up to run extensions. There is an [overall tutorial](https://jupyterlab.readthedocs.io/en/stable/developer/extension_tutorial.html#extension-tutorial) from jupyterlab that explains the setup. In particular, [conda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html) is a requirement. It's a virtual environment that helps manage multiple package versions for different projects on one machine. With conda, the following should work:
```
conda activate jupyterlab-ext

jupyter lab --watch
```
## Requirements

* JupyterLab >= 2.0

## Install

```bash
jupyter labextension install frequency-visualizer
```

## Contributing

### Install

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Move to frequency_visualizer directory

# Install dependencies
jlpm
# Build Typescript source
jlpm build
# Link your development version of the extension with JupyterLab
jupyter labextension install .
# Rebuild Typescript source after making changes
jlpm build
# Rebuild JupyterLab after making any changes
jupyter lab build
```

You can watch the source directory and run JupyterLab in watch mode to watch for changes in the extension's source and automatically rebuild the extension and application.

```bash
# Watch the source directory in another terminal tab
jlpm watch
# Run jupyterlab in watch mode in one terminal tab
jupyter lab --watch
```

Now every change will be built locally and bundled into JupyterLab. Be sure to refresh your browser page after saving file changes to reload the extension (note: you'll need to wait for webpack to finish, which can take 10s+ at times).

### Uninstall

```bash

jupyter labextension uninstall frequency-visualizer
```
