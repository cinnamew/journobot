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

let array = [new Staffer(610302759450837007, 'Jolie Han', 11, ['Postscript Editor', 'Podcast Editor'])];
array.push(new Staffer(709847510688202916, 'Theresa Nguyen', 12, ['Print EIC']));
array.push(new Staffer(845433078343925761, 'Katelyn Chu', 12, ['Print EIC']));
array.push(new Staffer(1006046503279792198, 'Saniya Laungani', 12, ['Online EIC']));
array.push(new Staffer(665743474414452766, 'Taruna Anil', 12, ['Investigations Editor', 'Copy Editor']));
array.push(new Staffer(766073569553023026, 'Rishita Shah', 11, ['Photo Editor', 'Video Editor']));
array.push(new Staffer(765002153579511839, 'Andrew Qin', 11, ['Podcast Assistant', 'Writer']));
array.push(new Staffer(332668159222087681, 'Kevin Jia', 12, ['Podcast Editor']));
array.push(new Staffer(479154661320949770, 'Angie Li', 11, ['Lifestyles Assistant', 'Writer']));
array.push(new Staffer(479894486495789056, 'Shaona Das', 10, ['Video Assistant', 'Writer']));
array.push(new Staffer(746577308982444145, 'Evelyn Liao', 10, ['Photo Assistant', 'Writer']));
array.push(new Staffer(430217685725609994, 'Hailey Ryu', 10, ['Social Media Assistant', 'Writer']));
array.push(new Staffer(752008823266345002, 'Tanvee Sai', 12, ['Social Media Manager']));
array.push(new Staffer(727732302230192169, 'Soha Roy', 12, ['Features Editor']));
array.push(new Staffer(826499607826661446, 'Riya Malik', 11, ['Opinions Assistant', 'Writer']));
array.push(new Staffer(790726156650283009, 'Prithika Sundar', 12, ['Lifestyles Editor']));
array.push(new Staffer(757745072824516669, 'Lisa Zivanic', 11, ['Sports Editor', 'Copy Editor']));
array.push(new Staffer(917954848626974771, 'Joyce Lee', 10, ['Postscript Assistant', 'Writer']));
array.push(new Staffer(988613906849226813, 'Katie Kim', 10, ['Postscript Assistant', 'Writer']));
array.push(new Staffer(852563080092450847, 'Evan Lu', 11, ['Postscript Editor', 'Business Editor']));
array.push(new Staffer(590543030759456768, 'Benjamin Liu', 10, ['Sports Assistant', 'Writer']));

// HAVE NOT JOINED DISCORD YET
/*array.push(new Staffer(a, 'Caroline Cheng', 12, ['News Editor']));
array.push(new Staffer(a, 'Natalie Chen', 12, ['Opinions Editor']));
array.push(new Staffer(a, 'Rajasi Laddha', 12, ['Copy Editor']));
array.push(new Staffer(a, 'Meghana Vinjamury', 12, ['Copy Editor']));
array.push(new Staffer(a, 'Sania Mehta', 11, ['Website Manager']));
array.push(new Staffer(a, 'Aashin Singhal', 12, ['Opinions Assistant', 'Writer']));
array.push(new Staffer(a, 'Alexander Liu', 10, ['News Assistant', 'Writer']));
array.push(new Staffer(a, 'Alisha Sankha', 11, ['Website Assistant', 'Writer']));
array.push(new Staffer(a, 'Anika Rao', 11, ['Investigations Assistant', 'Writer']));
array.push(new Staffer(a, 'Anoushka Gokhale', 11, ['Business Assistant', 'Writer']));
array.push(new Staffer(a, 'Eliana Aschheim', 11, ['Lifestyles Assistant', 'Writer']));
array.push(new Staffer(a, 'Stefaniya Mirashnichenko-Nava', 12, ['Features Assistant', 'Writer']));
*/



client.once('ready', () => {
    console.log('i\'m on!');
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
    }else if(commandName === 'editor gc') {
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
        parent: interaction.guild.channel,
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