const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { token } = require('./config.json');
const { ChannelType, PermissionsBitField } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');
const { issuenum, importantlink, folderlink, notionlink, channelToSendTranscriptIn } = require('./prospectorinfo.json');

const client = new Client({
    intents: [ GatewayIntentBits.Guilds ]
});

const { ActivityType } = require('discord.js');


client.commands = new Collection();
//const commandsPath = path.join(__dirname, 'commands');
//const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//for (const file of commandFiles) {
//    const filePath = path.join(commandsPath, file);
//    const command = require(filePath);
//    client.commands.set(command.data.name, command);
//}


//init staffers

class Staffer {
    constructor(uid, name, grade, positions) {
        this.uid = uid;
        this.name = name;
        this.grade = grade;
        this.positions = positions;
    }
}

let array = [new Staffer(610302759450837007, 'Jolie Han', 11, ['Print EIC', 'Postscript Editor (OLD)', 'Podcast Editor (OLD)'])];
array.push(new Staffer(753653175013212261, 'Jolie Han', 11, ['Podcast Editor']));
array.push(new Staffer(709847510688202916, 'Theresa Nguyen', 12, ['Print EIC']));
array.push(new Staffer(845433078343925761, 'Katelyn Chu', 12, ['Print EIC']));
array.push(new Staffer(1006046503279792198, 'Saniya Laungani', 12, ['Online EIC']));
array.push(new Staffer(665743474414452766, 'Taruna Anil', 12, ['Print EIC', 'Investigations Editor (OLD)', 'Copy Editor (OLD)']));
array.push(new Staffer(766073569553023026, 'Rishita Shah', 11, ['Online EIC', 'Photo Editor (OLD)', 'Video Editor (OLD)']));
array.push(new Staffer(765002153579511839, 'Andrew Qin', 11, ['News Editor', 'Podcast Assistant (OLD)', 'Writer (OLD)']));
array.push(new Staffer(332668159222087681, 'Kevin Jia', 12, ['Writer', 'Podcast Editor (OLD)']));
array.push(new Staffer(479154661320949770, 'Angie Li', 11, ['Lifestyles Editor', 'Lifestyles Assistant (OLD)', 'Writer (OLD)']));
array.push(new Staffer(479894486495789056, 'Shaona Das', 10, ['Social Media Editor', 'Copy Editor', 'Video Assistant (OLD)', 'Writer (OLD)']));
array.push(new Staffer(746577308982444145, 'Evelyn Liao', 10, ['Arts and Leisure Editor', 'Politics & Activism Editor', 'Photo Editor', 'Photo Assistant (OLD)', 'Writer (OLD)']));
array.push(new Staffer(430217685725609994, 'Hailey Ryu', 10, ['Sports Editor', 'Social Media Assistant (OLD)', 'Writer (OLD)']));
array.push(new Staffer(752008823266345002, 'Tanvee Sai', 12, ['Writer', 'Social Media Manager (OLD)']));
array.push(new Staffer(727732302230192169, 'Soha Roy', 12, ['Writer', 'Features Editor (OLD)']));
array.push(new Staffer(826499607826661446, 'Riya Malik', 11, ['Lifestyles Editor', 'Opinions Assistant (OLD)', 'Writer (OLD)']));
array.push(new Staffer(790726156650283009, 'Prithika Sundar', 12, ['Writer', 'Lifestyles Editor (OLD)']));
array.push(new Staffer(757745072824516669, 'Lisa Zivanic', 11, ['Podcast Editor', 'Sports Editor (OLD)', 'Copy Editor (OLD)']));
array.push(new Staffer(917954848626974771, 'Joyce Lee', 10, ['Copy Editor', 'Postscript Assistant (OLD)', 'Writer (OLD)']));
array.push(new Staffer(988613906849226813, 'Katie Kim', 10, ['Multimedia Editor', 'Video Editor', 'Postscript Assistant (OLD)', 'Writer (OLD)']));
array.push(new Staffer(852563080092450847, 'Evan Lu', 11, ['Online Opinions Editor', 'Tech Editor', 'Website Editor', 'Postscript Editor (OLD)', 'Business Editor (OLD)']));
array.push(new Staffer(590543030759456768, 'Benjamin Liu', 10, ['Investigations Editor', 'Sports Assistant (OLD)', 'Writer (OLD)']));
array.push(new Staffer(766060178147639336, 'Sania Mehta', 11, ['Online News Editor', 'Spotlight Editor', 'Business Editor', 'Website Manager (OLD)']));
array.push(new Staffer(739950623986024568, 'Anoushka Gokhale', 11, ['Copy Editor', 'Business Assistant (OLD)', 'Writer (OLD)']));
array.push(new Staffer(977057604993953842, 'Anika Rao', 11, ['Features Editor', 'Investigations Assistant (OLD)', 'Writer (OLD)']));
array.push(new Staffer(1007369208574791740, 'Stefaniya Mirashnichenko-Nava', 12, ['Writer', 'Features Assistant (OLD)', 'Writer (OLD)']));
array.push(new Staffer(766060113974001694, 'Caroline Cheng', 12, ['Writer', 'News Editor (OLD)']));
array.push(new Staffer(768607817241985064, 'Eliana Aschheim', 11, ['Postscript Editor', 'Lifestyles Assistant (OLD)', 'Writer (OLD)']));
array.push(new Staffer(634121313820082188, 'Alisha Sankha', 11, ['Copy Editor', 'Website Assistant (OLD)', 'Writer (OLD)']));
array.push(new Staffer(452313135148302347, 'Natalie Chen', 12, ['Writer', 'Opinions Editor (OLD)']));
array.push(new Staffer(752728177880858666, 'Alexander Liu', 10, ['Opinions Editor', 'News Assistant (OLD)', 'Writer (OLD)']));
array.push(new Staffer(424437176995151872, 'Aashin Singhal', 12, ['Opinions Assistant (OLD)', 'Writer']));

// HAVE NOT JOINED DISCORD YET
/*array.push(new Staffer(a, 'Rajasi Laddha', 12, ['Copy Editor']));
array.push(new Staffer(a, 'Meghana Vinjamury', 12, ['Copy Editor']));
*/



client.once('ready', () => {
    console.log('i\'m on!');
    client.user.setActivity('over the prospector!', { type: ActivityType.Watching });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    //const command = interaction.client.commands.get(interaction.commandName);

	//if (!command) return;

	//try {
	//	await command.execute(interaction);
	//} catch (error) {
	//	console.error(error);
	//	await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	//}
    
    const {commandName} = interaction;

    if (commandName === 'hi') {
        await interaction.reply('hey hey!');
    }else if(commandName === 'user') {
        let personFound = array.filter(x=>x.uid == interaction.user.id)[0];
        if(personFound){
            //console.log(personFound);
            await interaction.reply(`Name: ${personFound.name}\nGrade: ${personFound.grade}\nPosition(s): ${personFound.positions}`);
        }
        else await interaction.reply('Sorry, you don\'t seem to be in our staffer list quite yet. Please DM/ping Jolie to have her add you!');
    }else if(commandName === 'button') {
        if(interaction.user.id != '610302759450837007') {
            interaction.channel.send('come on man');
        }
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Click me!')
					.setStyle(ButtonStyle.Primary),
			);

		await interaction.reply({ content: 'Make a group chat here!', components: [row] });
    }else if(commandName == 'transcript') {
        const attachment = await discordTranscripts.createTranscript(interaction.channel, {
            limit: -1, // Max amount of messages to fetch. `-1` recursively fetches.
            returnType: 'attachment', // Valid options: 'buffer' | 'string' | 'attachment' Default: 'attachment' OR use the enum ExportReturnType
            filename: interaction.channel.name + '.html', // Only valid with returnType is 'attachment'. Name of attachment.
            saveImages: true, // Download all images and include the image data in the HTML (allows viewing the image even after it has been deleted) (! WILL INCREASE FILE SIZE !)
            footerText: "reached the end of {number} message{s}", // Change text at footer, don't forget to put {number} to show how much messages got exported, and {s} for plural
            poweredBy: false // Whether to include the "Powered by discord-html-transcripts" footer
        });
        const channelyum = client.channels.cache.get('1071512112997879821');    //channel to send it in
        
        console.log('yo creating a transcript');
        await interaction.reply('Creating a transcript... (please wait)');

        channelyum.send({
            files: [attachment],
        });

        interaction.channel.send('Transcript saved!');
    }else if(commandName === 'currentinfo') {
        await interaction.reply(`Current issue #: ${issuenum}\nImportant links doc: ${importantlink}\nFolder link: ${folderlink}\nNotion link: ${notionlink}`);
    }
    else await interaction.reply('weird! you found a bug! pls ping jolie :\')');
});

client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;

	//console.log(interaction);
    //let channelName = array.filter(x=>x.uid == interaction.user.id)[0].positions[0];
    newChannel = interaction.guild.channels.create({
        name: array.filter(x=>x.uid == interaction.user.id)[0].positions[0],
        parent: '1087200980027854958', //interaction.guild.channel,
        type: ChannelType.GuildText,
	permissionOverwrites: [
		{
			id: interaction.user.id,
			allow: [PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ViewChannel],
		},
		{
			id: interaction.guild.roles.everyone,
			deny: [PermissionsBitField.Flags.ViewChannel],
		},
	],
    })
    //newChannel.setParent('1016182946274746408');
    //newChannel.cache.get(newChannel.id).send('hey hey <@' + interaction.user.id + '>, here\'s your channel!');
    interaction.reply({content: 'Your channel has been created!', ephemeral: true});
});




client.login(token);