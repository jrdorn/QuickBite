const { Command, flags } = require("@oclif/command");

class HelloCommand extends Command {
  async run() {
    const { flags } = this.parse(HelloCommand);
    const name = flags.name || "world";
    this.log(`\nhello ${name} from ./src/commands/hello.js\n`);
  }
}

HelloCommand.description = `Say hello from file location
...
Extra documentation goes here
`;

HelloCommand.flags = {
  name: flags.string({ char: "n", description: "name to print" }),
};

module.exports = HelloCommand;
