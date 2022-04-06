import { program } from "commander";
import chalk from "chalk";
import { promises as fs } from "node:fs";
// import { fileURLToPath } from "node:url";
import path from "node:path";
import { build, dev } from "./index";

(async function main() {
  // const __filename = fileURLToPath(import.meta.url);
  const { version } = JSON.parse(
    (await fs.readFile("package.json")).toString()
  );

  const { blue, bold } = chalk;

  program
    .name(path.basename(__filename))
    .description(
      blue(`              ╔════════╗
	  ╔══════════════════════════════╗
	  ║     ${bold.yellow("WEBEXTENSION-TOOLBOX")}     ║
	  ╚══════════════════════════════╝`)
    )
    .version(version);

  program
    .command("dev")
    .description("Compiles extension in devmode")
    .argument("<vendor>", "The Vendor to compile")
    .option(
      "-c, --config [config]",
      "specify config file path",
      "./webextension-toolbox.config.js"
    )
    .option("-s, --src [src]", "specify source directory", "app")
    .option(
      "-t, --target [target]",
      "specify target directory",
      "dist/[vendor]"
    )
    .option(
      "-d, --devtool [devtool]",
      "controls if and how source maps are generated",
      "cheap-source-map"
    )
    .option(
      "-r, --auto-reload [autoReload]",
      "reload extension after rebuild",
      true
    )
    .option(
      "-p, --port [port]",
      "Define the port for the websocket development server",
      "35729"
    )
    .option(
      "-v, --vendor-version [vendorVersion]",
      "last supported vendor (default: current)"
    )
    .option(
      "--dev-server [devServer]",
      "use webpack dev server to serve bundled files",
      false
    )
    .option("--skip-manifest-validation", "validate manifest syntax")
    .option(
      "--verbose",
      "print messages at the beginning and end of incremental build"
    )
    .action(dev);

  program
    .command("build")
    .description("Compiles extension for production")
    .argument("<vendor>", "The Vendor to compile")
    .option(
      "-c, --config [config]",
      "specify config file path",
      "./webextension-toolbox.config.js"
    )
    .option("-s, --src [src]", "specify source directory", "app")
    .option(
      "-t, --target [target]",
      "specify target directory",
      "dist/[vendor]"
    )
    .option(
      "-d, --devtool [devtool]",
      "controls if and how source maps are generated",
      false
    )
    .option("-m, --no-minimize", "disables code minification", true)
    .option(
      "-v, --vendor-version [vendorVersion]",
      "last supported vendor (default: current)"
    )
    .option("--skip-manifest-validation", "validate manifest syntax", true)
    .action(build);

  program.parse();
})();
