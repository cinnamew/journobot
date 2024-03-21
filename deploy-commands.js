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
	new SlashCommandBuilder().setName('schedule').setDescription('View upcoming deadlines'),
	new SlashCommandBuilder().setName('remove').setDescription('Remove an assignment').addIntegerOption(option =>
		option.setName('id')
			.setDescription('Assignment ID')
			.setRequired(true)),
	new SlashCommandBuilder().setName('newassignment').setDescription('Add an assignment')
		.addStringOption(option =>
			option.setName('assignment')
				.setDescription('The assignment')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('channel')
				.setDescription('Who the assignment is for; it will be sent to their channel')
				.setRequired(true)
				.addChoices(
					{ name: 'All', value: '1071517805662453862' },
					{ name: 'Page Editor', value: '1071520095689511053' },
					{ name: 'Online Editor', value: '1071521560348852405' },
					{ name: 'Copy Editor', value: '1071523012144275546' },
				)
		)
		.addIntegerOption(option =>
			option.setName('month')
				.setDescription('Assignment month')
				.setRequired(true)
				.addChoices(
					{ name: 'January', value: 0 },
					{ name: 'February', value: 1 },
					{ name: 'March', value: 2 },
					{ name: 'April', value: 3 },
					{ name: 'May', value: 4 },
					{ name: 'June', value: 5 },
					{ name: 'July', value: 6 },
					{ name: 'August', value: 7 },
					{ name: 'September', value: 8 },
					{ name: 'October', value: 9 },
					{ name: 'November', value: 10 },
					{ name: 'December', value: 11 },
				)
		)
		.addIntegerOption(option =>
			option.setName('day')
				.setDescription('Assignment day')
				.setMaxValue(31)
				.setMinValue(1)
				.setRequired(true)
		)
		.addIntegerOption(option => 
			option.setName('hour')
				.setDescription('Hour due, in MILITARY TIME')
				.setRequired(true)
				.setMinValue(0)
				.setMaxValue(23)
		)
		.addIntegerOption(option =>
			option.setName('minutes')
				.setDescription('00, 59, etc')
				.setRequired(true)

			)
		.addIntegerOption(option =>
			option.setName('year')
				.setDescription('Year. Will default to 2024 if not set.')
				.setMinValue(2024)
		)
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);