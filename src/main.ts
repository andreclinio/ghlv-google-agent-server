#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { Config } from "./config";
import { Server } from "./server";


yargs(hideBin(process.argv))
  .scriptName("glhv-google-agent-server")
  .usage(
    `$0 <command> <arguments> `
  )

  .options({
    verbose: {
      default: false,
      demandOption: false,
      type: "boolean",
      alias: "v",
      description: "Show detailed logs",
    }
  })

  .command(
    `run`,
    "this command runs the program as a server (agent server) at specific port",
    (argv) => {
      Config.addPortOption(argv);
      Config.addHttpsOption(argv);
    },
    (args) => {
      const config = new Config(args);
      const logger = config.logger;
      logger.log(`Command: run`);
      const server = new Server(config);
      server.run();
    }
  )

  .strict()
  .help()
  .version()
  .demandCommand()
  .recommendCommands()
  .showHelpOnFail(true)
  .epilogue(`For more information, check out the documentation at https://github.com/andreclinio/glhv-google-agent-server`)
  .argv
  ;
