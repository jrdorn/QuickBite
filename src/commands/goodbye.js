const { Command, flags } = require("@oclif/command");

class GoodbyeCommand extends Command {
  async run() {
    this.log(`\ngoodbye world!\n`);
  }
}

GoodbyeCommand.description = `Say goodbye
...
Extra documentation goes here
`;

GoodbyeCommand.flags = {
  name: flags.string({ char: "n", description: "name to print" }),
};

module.exports = GoodbyeCommand;
