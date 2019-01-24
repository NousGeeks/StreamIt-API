/**
 * Create and export configuration variables
 * 
 */

// Container for all environments
let environments = {};

// Staging (Default) enironment
environments.staging = {
  'port': 3000,
  'envName': 'stating'
};

// Production enviroment
environments.production = {
  'port': 5000,
  'envName': 'production'
};

// Determine which environment was passed to the command-line argument
let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not, default to staging
let enviromentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = enviromentToExport;