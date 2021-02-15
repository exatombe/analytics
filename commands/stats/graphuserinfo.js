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

class graphuserinfo extends Command {
    constructor() {
        super({
            name: 'graphuserinfo',
            category: 'stats',
            description: 'Cette commande donne les stats du bot sous forme de graph!',
            usage: 'graphui [@user]',
            example: ['graphui @user','graphui'],
            aliases: ['gui','graphui']
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
        const [ui] = await client.db.query(`SELECT * FROM users WHERE userID = "${user.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}"`)
        if(ui.length < 1) return message.channel.send("Cet utilisateur n'as rien fait aujourd'hui.");
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
    label:"Statistiques du jour pour " + user.username,
    data:[ui[0].message_delete,ui[0].message_update,ui[0].emoji_send,ui[0].invite_created,ui[0].invite_used,ui[0].mentions,ui[0].mentionned,ui[0].link,ui[0].discordlink,ui[0].files,ui[0].videos,ui[0].images,ui[0].audio],
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
            text: "Statistiques du jour pour " + user.username
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

module.exports = new graphuserinfo;