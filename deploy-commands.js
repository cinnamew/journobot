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
	new SlashCommandBuilder().setName('schedule').setDescription('no using this unless eic')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);