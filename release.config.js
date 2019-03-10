const path = require("path");
const execa = require("execa");

const pkgs = JSON.parse(execa.shellSync("yarn run -s list").stdout);

const tarballDir = path.resolve(__dirname, "dist");

module.exports = {
  branch: "master",
  repositoryUrl: "ssh://git@github.com/spiltcoffee/postdfm.git",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "./release/dependency",
      { pkgs: pkgs.map(({ name, location }) => ({ name, location })) }
    ],
    ...pkgs.map(({ location: pkgRoot }) => [
      "@semantic-release/npm",
      {
        pkgRoot,
        tarballDir
      }
    ]),
    [
      "@semantic-release/github",
      {
        assets: [
          {
            path: path.resolve(tarballDir, "*.tgz"),
            label: "Deployed Tarballs"
          }
        ]
      }
    ],
    "@semantic-release/git"
  ]
};
