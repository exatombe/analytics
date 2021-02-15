'use strict';

const Command = require("../../structure/Command.js");


class Help extends Command {
    constructor() {
        super({
            name: 'help',
            category: 'utils',
            description: 'Cette commande est là pour vous aider',
            usage: 'help [commande]',
            example: ['help', 'help ping'],
            aliases: ['h', 'aide']
        });
    }

    
    async run(client, message, args) {
        if (!args[1]) {
            await message.channel.send({
                embed: {
                    color: client.maincolor,
                    title: `Commandes de ${client.user.username}`,
                    thumbnail: {
                        url: 'https://i.ibb.co/8KYCKJd/info.png'
                    },
                    description: `Faite &help [Nom commande] pour plus d'informations!`,
                    fields: [
                        {
                            name: "❱ Informations",
                            value: client.commands.filter((command) => command.category === "utils").map((command) => `\`${command.name}\``).join(' • '),
                            inline: true,
                        },
                        {
                            name: "❱ Stats",
                            value: client.commands.filter((command) => command.category === "stats").map((command) => `\`${command.name}\``).join(' • '),
                            inline: true,
                        },
                        {
                            name: "❱ Dev",
                            value: client.commands.filter((command) => command.category === "dev").map((command) => `\`${command.name}\``).join(' • '),
                            inline: true,
                        }
                    ],
                    footer: {
                        text: client.footer
                    },

                }
            })
        } else if (args[1]) {
          
            const command = client.commands.find(cmd => cmd.aliases.includes(args[1])) || client.commands.get(args[1]);
            if (!command) return message.channel.send(`Cette commande est invalide`);
            let send = "";
            command.example.forEach(use => {
                send += '&' + use + '\n'
            })
            await message.channel.send({
                embed: {
                    color: client.maincolor,
                    author: {
                        name: `Help: Commande ` + args[1],
                        icon_url: message.author.displayAvatarURL()
                    },
                    description: ` <> est un arguments requis\nEt [] est un arguments optionnel`,
                    footer: {
                        icon_url: client.user.displayAvatarURL(),
                        text: client.user.username
                    },
                    fields: [
                        {
                            name: "Description",
                            value: !command.description ? 'No description' : command.description,
                        },
                        {
                            name: "Utilisation",
                            value: !command.usage ? "No usage" : '!' + command.usage,
                        },
                        {
                            name: "Exemples",
                            value: !command.example ? `No examples` : send,
                        },
                        {
                            name: "Permissions requises",
                            value: command.perms,
                        }]
                }
            })
        }
    }
}


module.exports = new Help;