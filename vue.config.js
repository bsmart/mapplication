const PurgecssPlugin = require("purgecss-webpack-plugin");
const path = require("path");
const glob = require("glob-all");

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:/]+/g) || [];
  }
}

module.exports = {
  configureWebpack: {
    plugins: [
      new PurgecssPlugin({
        // Specify the locations of any files you want to scan for class names.
        paths: glob.sync([path.join(__dirname, "src/**/*.*")]),
        extractors: [
          {
            extractor: TailwindExtractor,

            // Specify the file extensions to include when scanning for
            // class names.
            extensions: ["html", "js", "php", "vue"]
          }
        ]
      })
    ]
  }
};
