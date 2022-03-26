const { Command } = require("commander");
const puppeteer = require("puppeteer");

const program = new Command();
program.name("aula").description("Node CLI for Aula").version("1.0.0");

program
  .command("msg")
  .description("Aula messages from 'Beskeder'")
  .action(() => {
    fetchAulaMessages();
  });

program.parse();

async function fetchAulaMessages() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://www.aula.dk/portal/#/login");
}

module.exports = program;
