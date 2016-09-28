## How is the application configuration determined?

### Organization of the hierarchical configurations

[Node-config](https://github.com/lorenwest/node-config)
is used to organize hierarchical configurations for your app deployments.

It lets you define a set of default parameters, and extend them for
different deployment environments (development, qa, staging, production, etc.).

Configurations are stored in
[configuration files](https://github.com/lorenwest/node-config/wiki/Configuration-Files)
within your application, and can be overridden and extended by
[environment variables](https://github.com/lorenwest/node-config/wiki/Environment-Variables), or
[external sources](https://github.com/lorenwest/node-config/wiki/Configuring-from-an-External-Source).

Please review how
[hierarchical configurations](https://github.com/lorenwest/node-config/wiki/Configuration-Files)
are organized.

This repo comes with the following configuration files in `config/`.
The files' values are deeply merged by replacement in the order shown into the final configuration.
Note that the environmental variable `NODE_ENV` must be one of
`devserver`, `development`, `production` for the merge to properly occur.

- `default.js`, the base configuration.
- `devserver.js`, `development.js` and `production.js`
contain overrides for the current environment.
These files should *not* contain secrets, settings or credentials
best left out of a codebase.
- `local-devserver.js`, `local-development.js` and `local-production.js`
contain sensitive information and credentials for your application.
*They are intended to _not_ be tracked in your version control system.*
- `custom-environment-variables.js`.
Some deployment situations rely heavily on environment variables to configure
secrets and credentials for even greater security.
This configuration file maps the environment variable names into your configuration structure.
Custom environment variables override all configuration files, including `local-*.js`.

### Environment variables

Storing
[configuration in the environment](https://12factor.net/config)
is one of the tenets of a
[twelve-factor app](https://12factor.net/).
Anything that is likely to change between deployment environments
--– such as resource handles for databases or credentials for external services --–
should be extracted from the code into environment variables.

But it is not always practical to set environment variables on development machines or
continuous integration servers where multiple projects are run.
[Dotenv](https://github.com/bkeepers/dotenv)
is used to load variables from a `.env` file into environment variables
when the environment is bootstrapped.

The final environment variable values are determined as follow,
highest priority to lowest.

- Value set on command line, e.g. `LOG_LEVEL=warn npm start`.
- Value set for the environment, e.g. `export LOG_LEVEL=warn` for the bash shell in Ubuntu.
- Value set in the `.env` file.

### [Tell me about the configuration the client gets](../doc/FAQ.md#-tell-me-about-configuration-values-for-the-client)
