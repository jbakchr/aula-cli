const fs = require("fs");
const path = require("path");

const { Command } = require("commander");
const puppeteer = require("puppeteer");

const program = new Command();
program.name("aula").description("Node CLI for Aula").version("1.0.0");

program
  .command("creds")
  .description("Provide credentials needed for use of Aula")
  .option("-u, --username <string>", "username for Aula")
  .option("-p, --password <string>", "password for Aula")
  .action((args) => {
    saveCredentials(args);
  });

program
  .command("msg")
  .description("Aula messages from 'Beskeder'")
  .action(() => {
    fetchAulaMessages();
  });

program.parse();

function saveCredentials(args) {
  const creds = `${args.username} ${args.password}`;

  fs.writeFile(path.join(__dirname, "creds", "creds.txt"), creds, (err) => {
    if (err) {
      console.log("unable to save credentials");
    } else {
      console.log("Credentials saved");
    }
  });
}

async function fetchAulaMessages() {
  // Read credentials
  let creds;
  try {
    const data = fs.readFileSync(path.join(__dirname, "creds", "creds.txt"));
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
