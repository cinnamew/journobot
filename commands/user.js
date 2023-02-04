const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user info!'),
	async execute(interaction) {
		let personFound = array.filter(x=>x.uid == interaction.user.id)[0];
        if(personFound){
            console.log(personFound);
            await interaction.reply(`Name: ${personFound.name}\nGrade: ${personFound.grade}\nPosition(s): ${personFound.positions}`);
        }
        else await interaction.reply('Sorry, you don\'t seem to be in our staffer list quite yet. Please DM Jolie to have her add you!');

	},
};