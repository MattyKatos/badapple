const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('score')
		.setDescription(`Check your score or someone else's score.`)
		.addStringOption(option =>
			option.setName('userid')
			.setDescription(`The ID of the user you want to check the score of. Leave blank for yourself`)
			.setRequired(false)),
	async execute(interaction) {
		var userID = interaction.options.getString('userid')
		const DiscordID = interaction.user.id
		const DiscordUsername = interaction.user.username
		console.log(`[${DiscordUsername}#${DiscordID}] Score => START`)
		if(userID === null) {
			userID = DiscordID
		}
		//Check to see if user exists
		try
		{
			userData = JSON.parse(fs.readFileSync('./cache/users/'+userID+'.json'))
			interaction.reply({content:`${userData.DiscordUsername}'s current score is ${userData.Score}.`, ephemeral: true});
			console.log(`[${DiscordUsername}#${DiscordID}] Score => SUCCESS - Score returned`)
			return
		}
		catch (e)
		{
            interaction.reply({content:`The user ${userID} does not exist.`, ephemeral: true});
			console.log(`[${DiscordUsername}#${DiscordID}] Score => FAIL - Target user (or self) does not exist`)
			return
		}
	},
};