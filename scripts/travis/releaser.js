const path = require('path');
const conventionalGithubReleaser = require('conventional-github-releaser');
const ghReleaseAssets = require('gh-release-assets');
const fs = require('fs');
const archiver = require('archiver');

// Retrieve GitHub token from environment
const token = process.env.RELEASE_TOKEN;

if (!token) {
  console.error('You need to set the RELEASE_TOKEN environment variable!');
  process.exit(1);
}

const AUTH = {
  type: 'oauth',
  token,
};

// Make a release
conventionalGithubReleaser(AUTH, { preset: 'angular' }, (err, responses) => {
  if (err) {
    console.error(`GitHub Release failed with message: ${err.message}`);
    process.exit(1);
  }

  if (responses[0].state === 'fulfilled') {
    // Make sure the .tmp folder exists
    if (!fs.existsSync(path.resolve(__dirname, '../../.tmp'))) {
      fs.mkdirSync(path.resolve(__dirname, '../../.tmp'));
    }

    const output = fs.createWriteStream(path.resolve(__dirname, '../../.tmp/dist.zip'));
    const archive = archiver('zip');

    output.on('close', () => {
      const url = responses[0].value.upload_url;
      ghReleaseAssets({
        url,
        token: [token],
        assets: [{
          name: 'dist.zip',
          path: path.resolve(__dirname, '../../.tmp/dist.zip'),
        }],
      }, (err1) => {
        if (err1) {
          console.error(`GitHub Release Assets failed with message: ${err1.message}`);
        }

        console.info('Everything went fine!');
        process.exit(0);
      });
    });

    archive.on('error', (archiveError) => {
      throw archiveError;
    });

    archive.pipe(output);
    archive.glob('**', {
      expand: true,
      cwd: path.resolve(__dirname, '../../dist'),
    });
    archive.finalize();
  } else {
    console.error('Couldn\'t create GitHub Release...');
    console.error(responses[0].reason.message);
    process.exit(1);
  }
});
