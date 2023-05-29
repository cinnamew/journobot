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

let array = [new Staffer(610302759450837007, 'Jolie Han', 12, ['EIC'])];
array.push(new Staffer(753653175013212261, 'Jolie Han', 12, ['EIC']));
array.push(new Staffer(757745072824516669, 'Lisa Zivanic', 12, ['EIC']));
array.push(new Staffer(766060178147639336, 'Sania Mehta', 12, ['EIC']));
array.push(new Staffer(766073569553023026, 'Rishita Shah', 12, ['Video Editor', 'Photo Editor']));
array.push(new Staffer(765002153579511839, 'Andrew Qin', 12, ['Website Editor', 'News Editor']));
array.push(new Staffer(479154661320949770, 'Angie Li', 12, ['Postscript Editor']));
array.push(new Staffer(479894486495789056, 'Shaona Das', 11, ['Opinions Editor', 'Copy Editor']));
array.push(new Staffer(746577308982444145, 'Evelyn Liao', 11, ['Features Editor', 'Photo Editor']));
array.push(new Staffer(430217685725609994, 'Hailey Ryu', 11, ['Social Media Manager', 'Sports Editor']));
array.push(new Staffer(826499607826661446, 'Riya Malik', 12, ['Copy Editor']));
array.push(new Staffer(917954848626974771, 'Joyce Lee', 11, ['Video Editor', 'Copy Editor']));
array.push(new Staffer(988613906849226813, 'Katie Kim', 11, ['Podcast Editor', 'Social Media Manager']));
array.push(new Staffer(852563080092450847, 'Evan Lu', 12, ['Photo Editor']));
array.push(new Staffer(590543030759456768, 'Benjamin Liu', 11, ['News Editor', 'Investigations Editor']));
array.push(new Staffer(739950623986024568, 'Anoushka Gokhale', 12, ['Copy Editor']));
array.push(new Staffer(977057604993953842, 'Anika Rao', 12, ['Business Manager']));
array.push(new Staffer(752728177880858666, 'Alexander Liu', 11, ['Sports Editor', 'Digital Graphic Designer']));
//NEW STAFFERSSS :DD
//array.push(new Staffer(a, 'Brian Kuo', 11, ['Writer']));
//array.push(new Staffer(a, 'Nikhil Krishnaswamy', 10, ['Writer']));
//array.push(new Staffer(a, 'Ira Lele', 10, ['Writer']));
//array.push(new Staffer(a, 'Amrita Brar', 10, ['Writer']));
//array.push(new Staffer(a, 'Nitya Dhulipala', 10, ['Writer']));
//array.push(new Staffer(a, 'Zain Haseeb', 10, ['Writer']));
//array.push(new Staffer(a, 'Yeechen Pang', 10, ['Writer']));
//array.push(new Staffer(a, 'Katie Mak', 10, ['Writer']));
//array.push(new Staffer(a, 'Sarah Lappalanien-Zhao', 11, ['Writer']));
//array.push(new Staffer(a, 'Noah Kang', 11, ['Writer']));
//array.push(new Staffer(a, 'Victoria Hunt', 10, ['Writer']));
//array.push(new Staffer(a, 'Scarlett Guy', 10, ['Writer']));
//array.push(new Staffer(a, 'Miya Widman', 10, ['Writer']));
//array.push(new Staffer(a, 'Jeongwoo Choe', 11, ['Writer']));
//array.push(new Staffer(a, 'Jade Wong', 10, ['Writer']));




//2022-23 seniors/dropped class
//array.push(new Staffer(709847510688202916, 'Theresa Nguyen', 12, ['Print EIC']));
//array.push(new Staffer(845433078343925761, 'Katelyn Chu', 12, ['Print EIC']));
//array.push(new Staffer(1006046503279792198, 'Saniya Laungani', 12, ['Online EIC']));
//array.push(new Staffer(665743474414452766, 'Taruna Anil', 12, ['Writer', 'Investigations Editor (OLD)', 'Copy Editor (OLD)']));
//array.push(new Staffer(332668159222087681, 'Kevin Jia', 12, ['Writer', 'Podcast Editor (OLD)']));
//array.push(new Staffer(752008823266345002, 'Tanvee Sai', 12, ['Writer', 'Social Media Manager (OLD)']));
//array.push(new Staffer(727732302230192169, 'Soha Roy', 12, ['Writer', 'Features Editor (OLD)']));
//array.push(new Staffer(790726156650283009, 'Prithika Sundar', 12, ['Writer', 'Lifestyles Editor (OLD)']));
//array.push(new Staffer(1007369208574791740, 'Stefaniya Mirashnichenko-Nava', 12, ['Writer', 'Features Assistant (OLD)', 'Writer (OLD)']));
//array.push(new Staffer(766060113974001694, 'Caroline Cheng', 12, ['Writer', 'News Editor (OLD)']));
//array.push(new Staffer(768607817241985064, 'Eliana Aschheim', 11, ['Sports Editor', 'Lifestyles Assistant (OLD)', 'Writer (OLD)']));
//array.push(new Staffer(634121313820082188, 'Alisha Sankha', 11, ['Opinions Editor', 'Website Assistant (OLD)', 'Writer (OLD)']));
//array.push(new Staffer(452313135148302347, 'Natalie Chen', 12, ['Writer', 'Opinions Editor (OLD)']));
//array.push(new Staffer(424437176995151872, 'Aashin Singhal', 12, ['Writer','Opinions Assistant (OLD)']));

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