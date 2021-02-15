'use strict';

const Command = require("../../structure/Command.js");

class Reload extends Command {
    constructor() {
        super({
            name: 'restart',
            category: 'dev',
            description: 'Cette commande permet de restart le bot',
            usage: 'restart',
            example: ['restart'],
            aliases: ['start']
            });
    }
    /*
      * Copyright 2020 © LordAlex2015
      * See LICENSE file
     */
    async run(client, message, args) {
        const garder = client.users.cache.get('243117191774470146')
       if( message.author.id !== '243117191774470146') return message.channel.send({
           embed: {
               title: "<a:error:773202660211163166> Erreur",
               color: 0xe71619,
               timestamp: new Date(),
               description: `Seul \`${garder.tag}\` est autoriser a executer cette commande`,
               footer: {
                   text: client.user.username,
                   icon_url: client.user.displayAvatarURL()
               }
           }
       })
message.channel.send({
            embed: {
                title: "Bot en redemarrage",
                color: 0x20d166,
                timestamp: new Date(),
                description: `Le bot redemarre dans 2 secondes`,
                footer: {
                    text: client.user.username,
                    icon_url: client.user.displayAvatarURL()
                }
            }
        })
      setTimeout(() => {
        client.destroy()
                setTimeout(() => {
        process.exit(1);
          },2000)
        },2000)
    }
}

module.exports = new Reload;