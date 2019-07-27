const { CommandoClient } = require("discord.js-commando");
const path = require("path");

const Keyv = require('keyv');
const KeyvProvider = require('commando-provider-keyv');

const { token } = require("./config.js");

const client = new CommandoClient({
	commandPrefix: "m!",
	owner: "404813853851910155"
});

client.setProvider(new KeyvProvider(new Keyv()));

client.registry
	.registerDefaultTypes()
	.registerGroups([
		["music", "Music"],
		["general", "General"]
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", () => console.log(`Logged in as ${client.user.tag}`));

client.on("error", console.error);


["SIGINT", "SIGUSR1", "SIGUSR2", "SIGTERM"].forEach(event =>
	process.on(event, (async event => {
		await client.destroy();
		console.log(`And... that's all folks! (${event})`)
	}).bind(null,event)));

client.login(token);
