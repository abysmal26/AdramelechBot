import { SlashCommandBuilder, EmbedBuilder, TextChannel, ChatInputCommandInteraction } from 'discord.js';
import Yiffy from 'yiffy';

const yiff = new Yiffy();

async function shitFunction(choice: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const category_list: any = {
        'straight': await yiff.furry.yiff.straight('json'),
        'gay': await yiff.furry.yiff.gay('json'),
        'lesbian': await yiff.furry.yiff.lesbian('json'),
        'gynomorph': await yiff.furry.yiff.gynomorph('json'),
        'andromorph': await yiff.furry.yiff.andromorph('json'),
    };

    return category_list[choice];
}

export = {
    data: new SlashCommandBuilder()
        .setName('yiff')
        .setDescription('Return a yiff (furry porn) image (NSFW)')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Select the category')
                .setRequired(true)
                .addChoices(
                    { name: 'Straight', value: 'straight' },
                    { name: 'Gay', value: 'gay' },
                    { name: 'Lesbian', value: 'lesbian' },
                    { name: 'Gynomorph', value: 'gynomorph' },
                    { name: 'Andromorph', value: 'andromorph' },
                )),
    async execute(interaction: ChatInputCommandInteraction) {
        // This is horrible, like commented in nsfw.ts
        if (interaction.channel instanceof TextChannel) {
            if (!interaction.channel.nsfw) {
                await interaction.reply({ embeds: [
                    new EmbedBuilder().setColor('Red')
                        .setTitle('__Error!__')
                        .setDescription('Your not in a NSFW channel'),
                ], ephemeral: true });
                return;
            }

            // continue
        } else if (interaction.channel === null) {
            // continue
        } else {
            await interaction.reply({ embeds: [
                new EmbedBuilder().setColor('Red')
                    .setTitle('__Error!__')
                    .setDescription('Your not in a Text or DM channel'),
            ], ephemeral: true });
        }

        const choice = interaction.options.getString('category');
        let img;

        // Check if this shit is not being rate limited
        try {
            img = (await shitFunction(String(choice)))[0].url;
        } catch {
            return await interaction.reply({ embeds: [
                new EmbedBuilder().setColor('Red')
                    .setTitle('__Error!__')
                    .setDescription('We are being rate limited, sorry for the inconvenience'),
            ], ephemeral: true });
        }

        const embed = new EmbedBuilder().setColor([203, 166, 247])
            .setImage(img)
            .setFooter({ text: 'Powered by https://yiff.rest' });

        await interaction.reply({ embeds: [embed] });
    },
};