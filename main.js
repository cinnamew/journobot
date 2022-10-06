const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { token } = require('./config.json');
const { ChannelType, PermissionsBitField } = require('discord.js');

const client = new Client({
    intents: [ GatewayIntentBits.Guilds ]
});

client.commands = new Collection();


//init staffers

class Staffer {
    constructor(uid, name, grade, positions) {
        this.uid = uid;
        this.name = name;
        this.grade = grade;
        this.positions = positions;
    }
}

let array = [new Staffer(610302759450837007, 'Jolie Han', 11, ['Postscript Editor', 'Podcast Editor'])];
array.push(new Staffer(709847510688202916, 'Theresa Nguyen', 12, ['Print EIC']));
array.push(new Staffer(845433078343925761, 'Katelyn Chu', 12, ['Print EIC']));
array.push(new Staffer(1006046503279792198, 'Saniya Laungani', 12, ['Online EIC']));
// HAVE NOT JOINED DISCORD YET
/*array.push(new Staffer(332668159222087681, 'Kevin Jia', 12, ['Podcast Editor']));
array.push(new Staffer(a, 'Caroline Cheng', 12, ['News Editor']));
array.push(new Staffer(a, 'Natalie Chen', 12, ['Opinions Editor']));
array.push(new Staffer(a, 'Soha Roy', 12, ['Features Editor']));
array.push(new Staffer(a, 'Prithika Sundar', 12, ['Lifestyles Editor']));
array.push(new Staffer(a, 'Taruna Anil', 12, ['Investigations Editor', 'Copy Editor']));
array.push(new Staffer(a, 'Lisa Zivanic', 11, ['Sports Editor', 'Copy Editor']));
array.push(new Staffer(a, 'Evan Lu', 11, ['Postscript Editor', 'Business Editor']));
array.push(new Staffer(a, 'Rishita Shah', 11, ['Photo Editor', 'Video Editor']));
array.push(new Staffer(a, 'Rajasi Laddha', 12, ['Copy Editor']));
array.push(new Staffer(a, 'Meghana Vinjamury', 12, ['Copy Editor']));
array.push(new Staffer(a, 'Tanvee Sai', 12, ['Social Media Manager']));
array.push(new Staffer(a, 'Sania Mehta', 11, ['Website Manager']));
array.push(new Staffer(a, 'Aashin Singhal', 12, ['Opinions Assistant', 'Writer']));
array.push(new Staffer(a, 'Alexander Liu', 10, ['News Assistant', 'Writer']));
array.push(new Staffer(a, 'Alisha Sankha', 11, ['Website Assistant', 'Writer']));
array.push(new Staffer(a, 'Andrew Qin', 11, ['Podcast Assistant', 'Writer']));
array.push(new Staffer(a, 'Angie Li', 11, ['Lifestyles Assistant', 'Writer']));
array.push(new Staffer(a, 'Anika Rao', 11, ['Investigations Assistant', 'Writer']));
array.push(new Staffer(a, 'Anoushka Gokhale', 11, ['Business Assistant', 'Writer']));
array.push(new Staffer(a, 'Benjamin Liu', 10, ['Sports Assistant', 'Writer']));
array.push(new Staffer(a, 'Eliana Aschheim', 11, ['Lifestyles Assistant', 'Writer']));
array.push(new Staffer(a, 'Evelyn Liao', 10, ['Photo Assistant', 'Writer']));
array.push(new Staffer(a, 'Hailey Ryu', 10, ['Social Media Assistant', 'Writer']));
array.push(new Staffer(a, 'Joyce Lee', 10, ['Postscript Assistant', 'Writer']));
array.push(new Staffer(a, 'Katie Kim', 10, ['Postscript Assistant', 'Writer']));
array.push(new Staffer(a, 'Riya Malik', 11, ['Opinions Assistant', 'Writer']));
array.push(new Staffer(a, 'Shaona Das', 10, ['Video Assistant', 'Writer']));
array.push(new Staffer(a, 'Stefaniya Mirashnichenko-Nava', 12, ['Features Assistant', 'Writer']));
*/



client.once('ready', () => {
    console.log('i\'m on!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const {commandName} = interaction;

    if (commandName === 'hi') {
        await interaction.reply('hey hey!');
    }else if(commandName === 'user') {
        let personFound = array.filter(x=>x.uid == interaction.user.id)[0];
        if(personFound){
            console.log(personFound);
            await interaction.reply(`Name: ${personFound.name}\nGrade: ${personFound.grade}\nPosition(s): ${personFound.positions}`);
        }
        else await interaction.reply('Sorry, you don\'t seem to be in our staffer list quite yet. Please DM Jolie to have her add you!');
    }else if(commandName === 'button') {
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Click me!')
					.setStyle(ButtonStyle.Primary),
			);

		await interaction.reply({ content: 'Make a group chat here!', components: [row] });
    }
    else await interaction.reply('that\'s still in progress!');
});

client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;

	//console.log(interaction);
    //let channelName = array.filter(x=>x.uid == interaction.user.id)[0].positions[0];
    interaction.guild.channels.create({
        name: 'heyhey',//array.filter(x=>x.uid == interaction.user.id)[0].positions[0],
        parent: interaction.guild.channel,  //TEST THIS
        type: ChannelType.GuildText,
	permissionOverwrites: [
		{
			id: interaction.user.id,
			allow: [PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageRoles],
		},
		//{
		//	id: interaction.user.id,
		//	allow: [PermissionsBitField.Flags.ViewChannel],
		//},
	],
    })
    interaction.reply({content: 'Your channel has been created!', ephemeral: true});
});




client.login(token);