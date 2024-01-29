const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription(`Set up your account.`),
	async execute(interaction) {
		const DiscordID = interaction.user.id
		const DiscordUsername = interaction.user.username
		const userData = `{"DiscordID":"${DiscordID}","DiscordUsername":"${DiscordUsername}","Score":"0"}`
		//Check to see if user exists
		try
		{
			fs.readFileSync('./cache/users/'+DiscordID+'.json')
			interaction.reply({content:'Your account has aleady been set up.', ephemeral: true});
			console.log('['+DiscordUsername+'#'+DiscordID+'] SETUP - 400: User already has an account')
			return
		}
		catch (e)
		{
			fs.writeFileSync('./cache/users/'+DiscordID+'.json',userData)
            interaction.reply({content:'Account created!', ephemeral: true});
		}
	},
};