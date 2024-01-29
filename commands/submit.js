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
		var link = interaction.options.getString('link')
		var link2 = link.split("/")
		var link3 = link2[3]
		var videoID
		if (link3.includes("watch") === true)
		{
			videoID = link3.substring(8)
		}else{
			if(link3.includes("watch") === false)
			{
				var link4 = link3.split('?')
				var link5 = link4[0]
				var link6 = link5.split('-')
				var videoID = link6[0]
			}else{
				interaction.reply({content:`Link Error`, ephemeral: true});
			}
		}
		const DiscordID = interaction.user.id
		//Check to see if user exists
		try
		{
			userData = JSON.parse(fs.readFileSync('./cache/users/'+DiscordID+'.json'))
		}
		catch (e)
		{
            interaction.reply({content:`You do not have an account, please create on with the /setup command.`, ephemeral: true});
			return
		}
		try
		{
			var videoData = JSON.parse(fs.readFileSync('./cache/videos/'+userID+'.json'))
			var newVideoData = `{"VideoID":"${videoData.VideoID}","Parent":"${videoData.Parent}","Reposts":"${Number(videoData.Reposts)+1}"}`
			fs.writeFileSync(`./cache/videos/${videoData.VideoID}.json'`,newVideoData)
			interaction.reply({content:`Video has already been submitted.`, ephemeral: true});
			return
		}
		catch (e)
		{
			var videoData = `{"VideoID":"${videoID}","Parent":"${DiscordID}","Reposts":"0"}`
			fs.writeFileSync('./cache/videos/'+videoID+'.json',videoData)
			var newUserData = `{"DiscordID":"${userData.DiscordID}","DiscordUsername":"${userData.DiscordUsername}","Score":"${Number(userData.Score)+1}"}`
			fs.writeFileSync(`./cache/users/${userData.DiscordID}.json`,newUserData)
			interaction.reply({content:`Video submitted!`, ephemeral: true});
		}
		return
	},
};