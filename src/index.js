const fs = require("fs");
const path = require("path");

const { Command } = require("commander");
const puppeteer = require("puppeteer");

const program = new Command();
program.name("aula").description("Node CLI for Aula").version("1.0.0");

program
  .command("creds")
  .description("Provide credentials for Aula login")
  .option("-u, --username")
  .option("-p, --password")
  .action((str, options) => {
    console.log(options.username);
  });

program
  .command("msg")
  .description("Aula messages from 'Beskeder'")
  .action(() => {
    fetchAulaMessages();
  });

program.parse();

async function fetchAulaMessages() {
  // Read credentials
  let creds;
  try {
    const data = fs.readFileSync(path.join(__dirname, "creds/creds.txt"));
    creds = data.toString().split(" ");
    console.log("creds:", creds);
  } catch (error) {
    console.log("Please login using the CLI in order to fetch Aula messages");
    return;
  }

  // Fetch messages
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://www.aula.dk/portal/#/login");
}

module.exports = program;
