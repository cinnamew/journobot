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

const hostedLocally = false;    //for timezone purposes lol

//TIME (DEADLINES) STUFF
//const intervalID = setInterval(checkTime, 1000);
class Deadline {
    constructor(date, channel, assignment) {
        this.date = date;
        this.channel = channel;
        this.assignment = assignment;
        this.threehrs = false;
        this.today = false;
        this.tmrw = false;
    }
}
//date: year, month (jan = 0!!!), day, hours, minutes, seconds
/* channels
if(channel == 'all') channel = 1071517805662453862;
    else if(channel == 'page') channel = 1071520095689511053;
    else if(channel == 'online') channel = 1071521560348852405;
    else if(channel == 'copy') channel = 1071523012144275546;
*/
let datesArr = [new Deadline(new Date(2023, 11, 5, 22, 0, 0), '1071520095689511053', 'Adobe Link 2 & Draft 2 Content Edits')];
datesArr.push(new Deadline(new Date(2023, 11, 6, 23, 59, 0), '1071517805662453862', 'Draft 2 Copy Edits'));
datesArr.push(new Deadline(new Date(2024, 0, 8, 0, 0, 0), '1071517805662453862', 'TEST ASSIGNMENT'));



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
//array.push(new Staffer(746577308982444145, 'Evelyn Liao', 11, ['Features Editor', 'Photo Editor']));
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
array.push(new Staffer(599644987176517642, 'Brian Kuo', 11, ['Writer']));
array.push(new Staffer(996125407407509644, 'Nikhil Krishnaswamy', 10, ['Writer']));
array.push(new Staffer(1105150719109120101, 'Ira Lele', 10, ['Writer']));
array.push(new Staffer(1125455891429335150, 'Amrita Brar', 10, ['Writer']));
array.push(new Staffer(910766430826397717, 'Nitya Dhulipala', 10, ['Writer']));
array.push(new Staffer(767264383087935528, 'Zain Haseeb', 10, ['Writer']));
array.push(new Staffer(807715880859467786, 'Yeechen Pang', 10, ['Writer']));
array.push(new Staffer(823446697702850560, 'Katie Mak', 10, ['Writer']));
//array.push(new Staffer(542958035920748545, 'Sarah Lappalanien-Zhao', 11, ['Writer']));
array.push(new Staffer(762468412747939853, 'Noah Kang', 11, ['Writer']));
array.push(new Staffer(962527575287136287, 'Victoria Hunt', 10, ['Writer']));
array.push(new Staffer(461714323665059860, 'Scarlett Guy', 10, ['Writer']));
array.push(new Staffer(642957555387203598, 'Miya Widman', 10, ['Writer']));
array.push(new Staffer(742229387973230664, 'Jeongwoo Choe', 11, ['Writer']));




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


//const intervalID = setInterval(checkTime, 1000);


client.once('ready', () => {
    console.log('i\'m on!');
    client.user.setActivity('over the prospector!', { type: ActivityType.Watching });
    checkTime();
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
    //console.log(commandName);

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
    }else if(commandName === 'schedule') {
        datesArr.sort(function(a,b){
            return new Date(a.date) - new Date(b.date);
        });
        let reply = 'Upcoming deadlines:\n';
        if(datesArr.length == 0) reply += 'N/A';
        for(let i = 0; i < datesArr.length; i++) {
            let temp = datesArr[i];
            reply += '[' + i + ']: ' + '**' + temp.assignment + '** due on <t:' + temp.date.getTime()/1000 + '>\n';
        }
        await interaction.reply(reply);
    }else if(commandName === 'remove') {
        const id = interaction.options.getInteger('id');
        if(id >= datesArr.length) {
            await interaction.reply(`There aren't enough assignments to remove that!`);
            return;
        }
        const temp = datesArr[id];
        datesArr.splice(id, 1);
        await interaction.reply(`Deleted ` + '**' + temp.assignment + '** (originally due on <t:' + temp.date.getTime()/1000 + '>)');
    }else if(commandName === 'newassignment') {
        //datesArr.push(new Deadline(new Date(2023, 11, 6, 23, 59, 0), '1071517805662453862', 'Draft 2 Copy Edits'));
        const ass = interaction.options.getString('assignment');
        const yr = interaction.options.getInteger('year') ?? 2024;
        const chn = interaction.options.getString('channel');
        var hr = interaction.options.getInteger('hour') + 8;
        if(hostedLocally) hr = interaction.options.getInteger('hour');
        const dt = new Date(yr, interaction.options.getInteger('month'), interaction.options.getInteger('day'), hr, interaction.options.getInteger('minutes'), 0);
        
        var temp = dt.getTime()/1000;
        datesArr.push(new Deadline(dt, chn, ass));
        await interaction.reply(`${ass} added for <#${chn}> on <t:${temp}>!\nTo view all assignments, use the \`/schedule\` command.`);
    }
    else await interaction.reply('weird! you found a bug! pls ping jolie :\')');
});

client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;

	//console.log(interaction);
    //let channelName = array.filter(x=>x.uid == interaction.user.id)[0].positions[0];
    newChannel = interaction.guild.channels.create({
        name: array.filter(x=>x.uid == interaction.user.id)[0].positions[0],
        parent: '1150567286487404615', //interaction.guild.channel,
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



async function checkTime() {
    //console.log('in checkTime');

    for(let i = 0; i < datesArr.length; i++) {
        const deadline = datesArr[i];
        const dateNow = new Date();
        
        //console.log('deadline: ' + deadline.date + ", date: " + dateNow);
        let mins = deadline.date.getMinutes();
        if(mins == 0) {
            mins = '00';
        }

        var temp = deadline.date.getTime()/1000;

        if(deadline.date.getMonth() == dateNow.getMonth()) {
            //console.log('it\'s the right month!');
            if(deadline.date.getDate() == dateNow.getDate() + 1) {  //doesn't work for 1st day of the month
                //console.log('due tmrw!');
                if(!deadline.date.tmrw) {
                    console.log('tmrw sent');
                    await client.channels.cache.get(deadline.channel).send("Hi <@&1072019067965276160>, **" + deadline.assignment + "** is due tomorrow, <t:" + temp + ">!");
                    deadline.date.tmrw = true;
                }
            }else if(deadline.date.getDate() == dateNow.getDate()) {
                //console.log('It\'s the right day!');
                if(!deadline.date.today) {
                    console.log("today should be sent");
                    await client.channels.cache.get(deadline.channel).send("Hi <@&1072019112303272009>, **" + deadline.assignment + "** is due today, <t:" + temp + ">!");
                    deadline.date.today = true;
                }else if(deadline.date.getHours() == dateNow.getHours() + 3 && !deadline.date.threehrs) {
                    console.log('3 hrs sent');
                    await client.channels.cache.get(deadline.channel).send("Hi <@&1072019163368919093>, **" + deadline.assignment + "** is due today, <t:" + temp + "> today!");
                    deadline.date.threehrs = true;
                }
            }
        }

        if(deadline.date < new Date()) {
            datesArr.splice(i, 1);
            i--;
        }

    }
    //setTimeout(checkTime, 2000);
    //console.log('raaaa');
    await new Promise(resolve => setTimeout(resolve, 5000));
    checkTime();
}


client.login(token);