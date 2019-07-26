const { CommandoClient } = require("discord.js-commando");
const path = require("path");

const { token } = require("./config.js");

const client = new CommandoClient({
	commandPrefix: "m!",
	owner: "404813853851910155"
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		["music", "Music"],
		["general", "General"]
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", () => console.log(`Logged in as ${client.user.tag}`);

client.on("error", console.error);

client.login(token);
