const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('submit')
		.setDescription(`Submit a new video`)
		.addStringOption(option =>
			option.setName('link')
			.setDescription(`Link to the video you want to submit.`)
			.setRequired(true)),
	async execute(interaction) {
		var date = new Date()
		var link = interaction.options.getString('link')
		var link2 = link.split("/")
		var link3 = link2[3]
		var videoID
		if (link3.includes("watch") === true)
		{
			console.log('['+DiscordUsername+'#'+DiscordID+'] SUBMIT - WORKING: User submitted watch link')
			videoID = link3.substring(8)
		}else{
			if(link3.includes("watch") === false)
			{
				console.log('['+DiscordUsername+'#'+DiscordID+'] SUBMIT - WORKING: User submitted share link')
				var link4 = link3.split('?')
				var link5 = link4[0]
				var link6 = link5.split('-')
				var videoID = link6[0]
			}else{
				console.log('['+DiscordUsername+'#'+DiscordID+'] SUBMIT - FAIL: User submitted link caused an error')
				interaction.reply({content:`Link Error`, ephemeral: true});
			}
		}
		const DiscordID = interaction.user.id
		//Check to see if user exists
		try
		{
			userData = JSON.parse(fs.readFileSync('./cache/users/'+DiscordID+'.json'))
			console.log('['+DiscordUsername+'#'+DiscordID+'] SUBMIT - WORKING: User has an account')
		}
		catch (e)
		{
			console.log(e)
            interaction.reply({content:`You do not have an account, please create on with the /setup command.`, ephemeral: true});
			console.log('['+DiscordUsername+'#'+DiscordID+'] SUBMIT - FAIL: User doesn\'t have an account')
			return
		}
		try
		{
			var videoData = JSON.parse(fs.readFileSync('./cache/videos/'+videoID+'.json'))
			interaction.reply({content:`Video was submitted by ${userData.DiscordUsername} on ${videoData.Date}.`, ephemeral: true});
			console.log('['+DiscordUsername+'#'+DiscordID+'] SUBMIT - PARTIAL SUCCESS: Video has already been submitted')
			return
		}
		catch (e)
		{
			console.log()
			var videoData = `{"VideoID":"${videoID}","Parent":"${DiscordID}","Date":"${date}"}`
			fs.writeFileSync('./cache/videos/'+videoID+'.json',videoData)
			var newUserData = `{"DiscordID":"${userData.DiscordID}","DiscordUsername":"${userData.DiscordUsername}","Score":"${Number(userData.Score)+1}","IsAdmin":${userData.IsAdmin}}`
			fs.writeFileSync(`./cache/users/${userData.DiscordID}.json`,newUserData)
			interaction.reply({content:`${userData.DiscordUsername} just added a new Bad Apple Video! \n ID: ${videoID} \n ${link}`});
			console.log('['+DiscordUsername+'#'+DiscordID+'] SUBMIT - SUCCESS: Video has been submitted')
		}
		return
	},
};