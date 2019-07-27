const { Command } = require("discord.js-commando");

module.exports = class PlayCommand extends Command {
	constructor(client) {
		super(client, {
			name: "join",
			aliases: ["j"],
			group: "music",
			description: "Join a voice channel",
			memberName: "join",
			guildOnly: true
		});
	}

	async run(message) {
		const vc = message.member.voice.channel;

		if (!vc)
			return message.reply("Please first join the voice channel yourself");

		if (await message.guild.settings.get("voicechannel"))
			return message.reply("I'm already in a voice channel in this server");

		await vc.join();
		await message.guild.settings.set("voicechannel", vc.id);

		return message.say(await message.guild.settings.get("voicechannel"));
	}

};
