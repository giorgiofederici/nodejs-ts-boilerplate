// The gulpfile.js file will use ts-node to execute the gulpfile.ts TypeScript file

require('ts-node').register({
    project: false,
    disableWarnings: true
});
require('./gulpfile.ts');