const { Command } = require("commander");

const program = new Command();
program.name("aula").description("Node CLI for Aula").version("1.0.0");

program
  .command("msg")
  .description("Aula messages from 'Beskeder'")
  .action(() => {
    console.log("fetch aula messages");
  });

program.parse();

module.exports = program;
