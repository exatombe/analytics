'use strict';

const Command = require("../../structure/Command.js");

class Reload extends Command {
    constructor() {
        super({
            name: 'reload',
            category: 'dev',
            description: 'Cette commande permet de reload une commande du bot',
            usage: 'reload <categorie> <commande>',
            example: ['reload utils ping'],
            aliases: ['r']
            });
    }
    /*
      * Copyright 2020 © LordAlex2015
      * See LICENSE file
     */
    async run(client, message, args) {
        const lt = client.users.cache.get('481842007963205633')
        const garder = client.users.cache.get('243117191774470146')
       if(message.author.id !== '481842007963205633' && message.author.id !== '243117191774470146') return message.channel.send({
           embed: {
               title: "<a:error:773202660211163166> Erreur",
               color: 0xe71619,
               timestamp: new Date(),
               description: `Seul \`${lt.tag}\` et \`${garder.tag}\` sont autoriser a executer cette commande`,
               footer: {
                   text: client.user.username,
                   icon_url: client.user.displayAvatarURL()
               }
           }
       })
       const category = args[1]
       if(!category) return message.channel.send({
        embed: {
            title: "<a:error:773202660211163166> Mauvaise utilisation",
            color: 0xf36636,
            timestamp: new Date(),
            description: "Veuillez indiquer une commande a reload\n`&reload <catégorie> <nom_commande>`",
            footer: {
                text: client.user.username,
                icon_url: client.user.displayAvatarURL()
            }
        }
    })

      const categorys = client.commands.map(dir =>
    dir.category)
           if(!categorys.includes(category)) return message.channel.send({
        embed: {
            title: "<a:error:773202660211163166> Erreur",
            color: 0xe71619,
            timestamp: new Date(),
            description: `Les seuls catégorie de commande possible a reload est: ${categorys.join(' • ')}`,
            footer: {
                text: client.user.username,
                icon_url: client.user.displayAvatarURL()
            }
        }
    })
    //if(args[0] === "admin") {
        if(!args[2]) return message.channel.send({
            embed: {
                title: "<a:error:773202660211163166> Mauvaise utilisation",
                color: 0xf36636,
                timestamp: new Date(),
                description: "Veuillez indiquer une commande a reload\n`system reload <catégorie> <nom_commande>`",
                footer: {
                    text: client.user.username,
                    icon_url: client.user.displayAvatarURL()
                }
            }
        })
        let commandName = args[2].toLowerCase()

        //let commandName = client.commands.find(x => x.name.toLowerCase().includes(args[0].toLowerCase()))
        try{
             delete require.cache[require.resolve(`../../commands/${category}/${commandName}.js`)]
             client.commands.delete(commandName)
             const pull = require(`../../commands/${category}/${commandName}.js`)
             client.commands.set(commandName, pull)
        } catch(e) {
            return message.channel.send({
                embed: {
                    title: "<a:error:773202660211163166> Erreur",
                    color: 0xe71619,
                    timestamp: new Date(),
                    description: `Impossible de relaod \`${commandName}\`, sois le fichier n'existe pas, sois il y a une erreur dans le code`,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            })
        }
        message.channel.send({
            embed: {
                title: "<a:valid:773202778763427864> Commande effectuer",
                color: 0x20d166,
                timestamp: new Date(),
                description: `J'ai bien reload la commande: \`${commandName}\``,
                footer: {
                    text: client.user.username,
                    icon_url: client.user.displayAvatarURL()
                }
            }
        })
    //}
    }
}

module.exports = new Reload;