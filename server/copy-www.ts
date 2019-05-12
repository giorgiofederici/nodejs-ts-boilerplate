import * as shell from 'shelljs';

shell.cp('-R', './server/bin', './dist/server/');

// .env file will be copied only in not production environment
shell.cp('.env', './dist/server/src/configs');