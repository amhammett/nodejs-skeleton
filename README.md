NodeJS Skeleton
===============

A skeleton repository to start a new project. Useful when spinning out new services or perhaps interview technical questions.

See the [Makefile](./Makefile) for common tasks.

```
# see make options
make help
```


## Getting Started

NodeJS requirements are managed in yarn but as every project is different you can install requirements via the Makefile.

```
# install requirements
make install
```


## Testing

Even simple projects should include test.

```
# test all the things
make test

# run tests when there is a file system change
make watch command='make test || true'
```


## Deploying

By default most projects will include a `run` or `deploy` tasks.

```
# run application
make run

# deploy application
make deploy
```
