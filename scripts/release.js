const standardVersion = require('standard-version');
const simpleGit = require('simple-git')();

simpleGit.status((err, resp) => {
  if (err || resp.current !== 'master' || resp.behind !== 0 || resp.ahead !== 0) {
    console.err('Please make sure to use the latest master before releasing');
    process.exit(1);
  }

  console.info('Start releasing process...');

  // Options are the same as command line, except camelCase
  standardVersion({}, (standardError) => {
    if (standardError) {
      console.error(`standard-version failed with message: ${err.message}`);
      process.exit(1);
    }

    console.info('Everything has been set up for a new release!');
    console.info('You can now run `git push --follow-tags origin master`');
    process.exit(0);
  });
});
