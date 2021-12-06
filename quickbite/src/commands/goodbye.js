const { Command, flags } = require("@oclif/command");

class GoodbyeCommand extends Command {
  async run() {
    this.log(`goodbye world!`);
  }
}

GoodbyeCommand.description = `Describe the command here
...
Extra documentation goes here
`;

GoodbyeCommand.flags = {
  name: flags.string({ char: "n", description: "name to print" }),
};

module.exports = GoodbyeCommand;
