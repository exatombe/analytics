'use strict';

const Command = require("../../structure/Command.js");
const { CanvasRenderService } = require('chartjs-node-canvas'),
        Discord = require("discord.js");
const width = 800;
const height = 400;
const chartCallback = (ChartJS) => {
    ChartJS.defaults.global.elements.rectangle.borderWidth = 2;
    ChartJS.plugins.register({
    });
    ChartJS.controllers.MyType = ChartJS.DatasetController.extend({
    });
};

class graphserverinfo extends Command {
    constructor() {
        super({
            name: 'graphserverinfo',
            category: 'stats',
            description: 'Cette commande donne les stats du bot sous forme de graph!',
            usage: 'graphsi',
            example: ['graphsi','graphsi'],
            aliases: ['gsi','graphsi']
        });
    }

    async run(client, message) {
            const canvasRenderService = new CanvasRenderService(width, height, chartCallback);
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
        const [ui] = await client.db.query(`SELECT SUM(message) AS msg,SUM(message_delete) AS msg_dlt,SUM(message_update) AS msg_upt,SUM(emoji_send) AS emj_send,SUM(invite_created) AS inv,SUM(invite_used) AS inv_use,SUM(mentions) AS mtion,SUM(mentionned) AS mtionned, SUM(link) AS link1,SUM(discordlink) AS link2,SUM(files) AS file1,SUM(videos) AS file2, SUM(images) AS file3, SUM(audio) AS file4 FROM users WHERE guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}"`)
        if(ui.length < 1) return message.channel.send("Rien n'as été fait par personne aujourd'hui");
        (async()=>{
     const configuration = {
  type: 'bar',
  data: {
  labels: [
     'Msg supprimé',
    'Msg modifié','Emoji envoyé',
    'Invitation créer','Invitation utilisé',
    'Mentions','Mentionné',
    'Liens','Invitation discord',
    'Fichiers','Vidéos',
    'Images','Audios'
  ],
  datasets: [
    {
    label:"Statistiques du jour sur " + message.guild.name,
    data:[ui[0].msg_dlt,ui[0].msg_upt,ui[0].emj_send,ui[0].inv,ui[0].inv_use,ui[0].mtion,ui[0].mtionned,ui[0].link1,ui[0].link2,ui[0].file1,ui[0].file2,ui[0].file3,ui[0].file4],
    fill:false,
    backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)","rgba(153, 102, 255, 0.2)","rgba(201, 203, 207, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)","rgba(153, 102, 255, 0.2)","rgba(201, 203, 207, 0.2)"],
    borderColor:["rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)","rgb(153, 102, 255)","rgb(201, 203, 207)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)","rgb(153, 102, 255)","rgb(201, 203, 207)"],
    borderWidth:1
}
  ]
},
  options: {
   legend: {
        display: false
    },
     title: {
            display: true,
            fontSize: 20,
            fontColor: "#fff",
            text: "Statistiques du jour sur " + message.guild.name
        },
    scales:{
        pointLabels: {
            fontSize: 20,
            fontColor: "#fff"
        },
        yAxes:[
        {
            ticks:
            {
                beginAtZero:true
            }
        }
        ]
    }
}
};
    let image2 = await canvasRenderService.renderToBuffer(configuration);
    let dataUrl = await canvasRenderService.renderToDataURL(configuration);
    let stream = canvasRenderService.renderToStream(configuration);
    const file = new Discord.MessageAttachment(stream, 'stats.png');
    await message.channel.send({ files: [file] })
})();
    }
}

module.exports = new graphserverinfo;