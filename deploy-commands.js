const { REST, SlashCommandBuilder, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('hi').setDescription('Says hi back!'),
	new SlashCommandBuilder().setName('journo').setDescription('Replies with info on The Prospector!'),
    new SlashCommandBuilder().setName('button').setDescription('if you run this command jolie will be very mad at you'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('transcript').setDescription('do not use this command either (unless u r jolie)')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);