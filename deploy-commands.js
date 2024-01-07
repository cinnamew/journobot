//const fs = require('node:fs');
//const path = require('node:path');
const { REST, SlashCommandBuilder, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

//const commands = [];
//const commandsPath = path.join(__dirname, 'commands');
//const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//for (const file of commandFiles) {
//	const filePath = path.join(commandsPath, file);
//	const command = require(filePath);
//	commands.push(command.data.toJSON());
//}


const commands = [
	new SlashCommandBuilder().setName('hi').setDescription('Says hi back!'),
	new SlashCommandBuilder().setName('currentinfo').setDescription('Replies with info on the current issue + some important links!'),
    new SlashCommandBuilder().setName('button').setDescription('DO NOT USE THIS COMMAND (unless eic or bot editor)'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('transcript').setDescription('EDITORS ONLY: save your channel\'s transcript'),
	new SlashCommandBuilder().setName('schedule').setDescription('View upcoming deadlines. Hopefully.'),
	new SlashCommandBuilder().setName('newassignment').setDescription('wip')
		//.addIntegerOption(option =>
		//	option.setName('month')
		//		.setDescription('Assignment month')
		//		.setRequired(true)
		//		.addChoices(
		//			{ name: 1, value: 0 },
		//			{ name: 2, value: 1 }
		//			//{ name: 'March', value: 2 },
		//			//{ name: 'April', value: 3 },
		//			//{ name: 'May', value: 4 },
		//			//{ name: 'June', value: 5 },
		//			//{ name: 'July', value: 6 },
		//			//{ name: 'August', value: 7 },
		//			//{ name: 'September', value: 8 },
		//			//{ name: 'October', value: 9 },
		//			//{ name: 'November', value: 10 },
		//			//{ name: 'December', value: 11 },
		//		)
		//)
		.addIntegerOption(option =>
			option.setName('day')
				.setDescription('Assignment day')
				.setMaxValue(31)
				.setMinValue(1)
				.setRequired(true)
		)
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);