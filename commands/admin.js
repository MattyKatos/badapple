const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('admin')
		.setDescription(`Add or remove admin perms`)
		.addStringOption(option =>
			option.setName('userid')
			.setDescription(`Discord user's UID`)
			.setRequired(true))
		.addStringOption(option =>
			option.setName('action')
			.setDescription(`add or remove`)
			.setRequired(true)),
	async execute(interaction) {
		var userid = interaction.options.getString('userid')
		var action = interaction.options.getString('action')
		const DiscordID = interaction.user.id
		//Check to see if command user exists
		try
		{
			userData = JSON.parse(fs.readFileSync('./cache/users/'+DiscordID+'.json'))
			console.log('['+DiscordUsername+'#'+DiscordID+'] ADMIN - WORKING: User has an account')
		}
		catch (e)
		{
            interaction.reply({content:`You do not have an account, please create on with the /setup command.`, ephemeral: true});
			console.log('['+DiscordUsername+'#'+DiscordID+'] ADMIN - FAIL: User doesn\'t have an account')
			return
		}
		//Check to see if target user exists
		try
		{
			targerUserData = JSON.parse(fs.readFileSync('./cache/users/'+userid+'.json'))
			console.log('['+DiscordUsername+'#'+DiscordID+'] ADMIN - WORKING: Target user has an account')
		}
		catch (e)
		{
			interaction.reply({content:`Target user doesn't have an account.`, ephemeral: true});
			console.log('['+DiscordUsername+'#'+DiscordID+'] ADMIN - FAIL: Target user doesn\'t have an account')
			return
		}	
		//Check to see if command user is admin. If True, make target user admin.
		if(userData.IsAdmin === true){
			if(action == "add"){
				newTargerUserData = `{"DiscordID":"${targerUserData.DiscordID}","DiscordUsername":"${targerUserData.DiscordUsername}","Score":"${Number(targerUserData.Score)}","IsAdmin":true}`
				fs.writeFileSync(`./cache/users/${targerUserData.DiscordID}.json`,newTargerUserData)
				interaction.reply({content:`${targerUserData.DiscordUsername} has been made an admin.`, ephemeral: true});
				console.log('['+DiscordUsername+'#'+DiscordID+'] ADMIN - SUCESS: Target user has been made admin')
				return
			}
			if(action == "remove"){
				newTargerUserData = `{"DiscordID":"${targerUserData.DiscordID}","DiscordUsername":"${targerUserData.DiscordUsername}","Score":"${Number(targerUserData.Score)}","IsAdmin":false}`
				fs.writeFileSync(`./cache/users/${targerUserData.DiscordID}.json`,newTargerUserData)
				interaction.reply({content:`${targerUserData.DiscordUsername} has been removed as an admin.`, ephemeral: true});
				console.log('['+DiscordUsername+'#'+DiscordID+'] ADMIN - SUCESS: Target user has been removed as an admin')
				return
			}
			else
			{
				interaction.reply({content:`There was an error running this command.`, ephemeral: true});
				console.log('['+DiscordUsername+'#'+DiscordID+'] ADMIN - FAIL: User provided an invalid option.')
				return
			}
			return
		}
		if(userData.IsAdmin === false){
			interaction.reply({content:`You are not an admin and can't run this command.`, ephemeral: true});
			console.log('['+DiscordUsername+'#'+DiscordID+'] ADMIN - FAIL: User is not an admin.')
			return
		}
		else{
			interaction.reply({content:`There was an error running this command.`, ephemeral: true});
			console.log('['+DiscordUsername+'#'+DiscordID+'] ADMIN - FAIL: I have no idea how we got here.')
			return
		}
	},
};