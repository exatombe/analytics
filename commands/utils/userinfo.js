'use strict';
/*
  * Copyright 2020 © LordAlex2015
  * See LICENSE file
 */
const Command = require("../../structure/Command.js");
const moment = require('moment')
class userinfo extends Command {
    constructor() {
        super({
            name: 'userinfo',
            category: 'utils',
            description: 'Cette commande donne des informations sur des utilisateurs !',
            usage: 'userinfo [@user]',
            example: ['userinfo', 'userinfo @user'],
            aliases: ['ui']
        });
    }
    /*
      * Copyright 2020 © LordAlex2015
      * See LICENSE file
     */
    async run(client, message) {

           const date = new Date();
    let month = date.getMonth()+1;
    let day = date.getDate();
    if(String(day).length < 2){
      day = "0" + day;
    }
    if(String(month).length < 2){
      month = "0" + month;
    }
    const today = {
        day: day,
        month: month,
        year: date.getFullYear()
    }
        const membre = message.mentions.members.first() || message.member;
        const user = membre.user;
        // if (!membre) { return message.channel.send('Veuillez mentionner un utilisateur !'); }
        const [ui] = await client.db.query(`SELECT date,SUM(reaction_add) AS reactadd,SUM(invite_left) AS invleft,SUM(invite_bonus) AS invbonus,SUM(invite_fake) AS invfake,SUM(link_audio) AS link5,SUM(link_video) AS link4, SUM(link_img) AS link3, SUM(message) AS msg,SUM(message_delete) AS msg_dlt,SUM(message_update) AS msg_upt,SUM(emoji_send) AS emj_send,SUM(invite_created) AS inv,SUM(invite_used) AS inv_use,SUM(mentions) AS mtion,SUM(mentionned) AS mtionned, SUM(link) AS link1,SUM(discordlink) AS link2,SUM(files) AS file1,SUM(videos) AS file2, SUM(images) AS file3, SUM(audio) AS file4 FROM users WHERE userID = "${user.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}"`)
        if(ui.length < 1) return message.channel.send("Cet utilisateur n'as rien fait aujourd'hui.");
        await message.channel.send({ 
            embed: { 
                color: 0x2f3136, 
                author: { 
                    name: `Statistiques de : ${user.tag} (${user.id})`, 
                    icon_url: message.author.displayAvatarURL({ display: true }) }, 
                    timestamp: new Date(), 
                    description: `:id: \`Identifiant\` : **${user.id}**\n:bust_in_silhouette: \`Compte créé le\` : **${moment(user.createdAt).format('DD/MM/YYYY à HH:mm:ss')}**\n:bar_chart: \`Statistiques du\` : **${moment(ui[0].date).format('DD/MM/YYYY à HH:mm:ss')}**\n:bar_chart: \`Statistiques comptées depuis le\` : **${moment(message.guild.members.cache.get(client.user.id).joinedAt).format('DD/MM/YYYY à HH:mm:ss')}**\n\u200b`, 
                    fields: [
                    { name: `<:758740831649005578:803012941154615347> __**Messages**__`, 
                    value: `\u200b\n<:802711429740363786:803013571599532064> \`Envoyés\` : **${ui[0].msg}**\n:wastebasket: \`Supprimés\` : **${ui[0].msg_dlt}**\n:writing_hand: \`Modifiés\` : **${ui[0].msg_upt}**\n<:802711429429460993:803015391697829958>
 \`Emojis custom\` : **${ui[0].emj_send}**\n<:802711429429460993:803015391697829958>
 \`Réactions\` : **${ui[0].reactadd}**\n\u200b`, 
                    inline: true }, 
                    { name: `:bell: __**Mentions**__`, 
                    value: `\u200b\n:bust_in_silhouette: \`Mentionné\` : **${ui[0].mtionned}**\n<:802711429555421255:803013002814685186> \`Mentions\` : **${ui[0].mtion}**\n<:802720839170129941:803013092798889995> \`Roles\` : **0**\n<:758740831649005578:803012941154615347> \`Salons\` : **0**`, 
                    inline: true }, 
                    { name: `<:802711429673123880:803013023555649576> __**Invitations**__`, 
                    value: `\u200b\n<:802711429740363786:803013571599532064> \`Créées\` : **${ui[0].inv}**\n :pushpin: \`Utilisées\` : **${ui[0].inv_use}**\n<a:802727591147470878:803013141377187851> \`Membres quittés\` : **${ui[0].invleft}**\n<:802723856027615233:803013115221770350> \`Fakes\` : **${ui[0].invfake}**\n:rocket: \`Boost\` : **${ui[0].invbonus}**\n\u200b`, inline: true }, 
                    { name: `:file_folder: __**Fichiers**__`, 
                    value: `\u200b\n- \`Total\` : **${ui[0].file1}**\n:video_camera: \`Vidéos\` : **${ui[0].file2}**\n:frame_photo: \`Images\` : **${ui[0].file3}**\n<:802717548045926421:803013070053572699> \`Audios\` : **${ui[0].file4}**\n:card_box: \`Autres\` : **${parseInt(ui[0].file1)-(parseInt(ui[0].file4)+parseInt(ui[0].file3)+parseInt(ui[0].file2))}**`, 
                    inline: true }, 
                    { name: `:link: __**Liens**__`, 
                    value: `\u200b\n- \`Total\` : **${parseInt(ui[0].link1)+parseInt(ui[0].link2)+parseInt(ui[0].link3)+parseInt(ui[0].link4)+parseInt(ui[0].link5)}**\n<:772256674257436684:803014244547035188>\`Web\` : **${ui[0].link1}**\n:video_camera: \`Vidéos\` : **${ui[0].link4}**\n:frame_photo: \`Images\` : **${ui[0].link3}**\n<:802717548045926421:803013070053572699> \`Audios\` : **${ui[0].link5}**\n<:802715407755903028:803013046465069066> \`Serveurs Discord\` : **${ui[0].link2}**`, inline: true }, 
                    { name: `:timer: __**Durées**__`, 
                    value: `\u200b\n<:758740831649005578:803012941154615347> \`Textuel\` : **0**\n<:802717548045926421:803013070053572699> \`Vocal\` : **0**`, 
                    inline: true }, 
                    { name: `\u200b`, 
                    value: `\`\`\`⚠️ Les statistiques \`Invitations\` fonctionnent que si le robot a la permission \`Gérer le serveur\`.\`\`\``, 
                    inline: true }]  
                } 
            }) 
    }
}
/*
  * Copyright 2020 © LordAlex2015
  * See LICENSE file
 */

module.exports = new userinfo();