import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';

export = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Return a cat image'),
    async execute(interaction: ChatInputCommandInteraction) {
        const res = await (await fetch('https://cataas.com/cat?json=true')).json();

        const embed = new EmbedBuilder().setColor([203, 166, 247])
            .setImage(`https://cataas.com/${res.url}`)
            .setFooter({ text: 'Powered by https://cataas.com' });

        await interaction.reply({ embeds: [embed] });
    },
};