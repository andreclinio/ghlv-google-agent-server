import yargs, { Arguments } from "yargs";
import { Logger } from "./logger";

export class Config {

  public readonly logger: Logger;
  private readonly args: Arguments;

  public static readonly PORT_TAG = "port";
  public static readonly PORT_DEFAULT = 3000;

  public static readonly HTTPS_TAG = "https";
  public static readonly HTTPS_DEFAULT = false;

  static addPortOption(argv: yargs.Argv): yargs.Argv {
    return argv.option(Config.PORT_TAG, {
      type: "number",
      alias: "p",
      default: process.env.PORT || this.PORT_DEFAULT,
      demandOption: false,
      description: "Set the server port",
    });
  }

  static addHttpsOption(argv: yargs.Argv): yargs.Argv {
    return argv.option(Config.HTTPS_TAG, {
      type: "boolean",
      alias: "s",
      default: this.HTTPS_DEFAULT,
      demandOption: false,
      description: "Set the HTTPS protocol",
    });
  }

  constructor(args: Arguments) {
    this.logger = new Logger(args.verbose as boolean);
    this.args = args;
  }

  public getPort(): number {
    const port = this.args[Config.PORT_TAG] as number;
    this.logger.log(`Server port: ${port}`);
    return port;
  }

  public isHttps(): boolean {
    const https = this.args[Config.HTTPS_TAG] as boolean;
    this.logger.log(`HTTPS protocol: ${https}`);
    return https;
  }

}