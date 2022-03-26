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
  // Get credentials
  const creds = getCredentials().split(" ");
  console.log("creds:", creds);

  if (!creds) {
    console.log("Please add credentials using the 'creds' option");
    return;
  }

  // Fetch messages
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://www.aula.dk/portal/#/login");

  // Go to username page
  await Promise.all([
    page.click(
      "#main > div.container > div.row.justify-content-md-center.mt-4.box-container > div:nth-child(1) > div"
    ),
    page.waitForNavigation(),
  ]);

  // Click username field, type username and click next button
  await page.waitForTimeout(2000);
  await page.type("#username", creds[0], { delay: 100 });
  await page.click("body > main > div > div > form > nav > button");

  // await browser.close();
}

function getCredentials() {
  try {
    const data = fs.readFileSync(
      path.join(__dirname, "creds", "creds.txt"),
      "utf-8"
    );
    return data;
  } catch (error) {
    return null;
  }
}

module.exports = program;
