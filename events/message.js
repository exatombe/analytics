'use strict';
    const fetch = require("node-fetch");

module.exports = (client, message) => {
    if (!message.channel.guild) {
        return ;
    }

    const data = message.content;
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
    const args = data.slice(client.prefix.length).trim().split(/ +/g);
    const content = message.content;
if(message.author.bot) return;
let dataSync = {
    user: {
        day: "",
        month:"",
        year:""
    },
    guild: {
        day:[],
        month:[],
        year:[]
    }
};
    const thedate = `${today.year}-${today.month}-${today.day}`
      let video = [];
      let image = [];
      let lien = [];
      let audio = [];
message.author.stats = dataSync.user;
message.guild.stats = dataSync.guild; 
(async() => {
    const [row] = await client.db.query(`SELECT * FROM users WHERE userID = "${message.author.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}"  && date= "${thedate}"`)
          if (row.length < 1) {
       await client.db.query(`INSERT INTO users (userID,guildID,message,day,month,year,date) VALUES ("${message.author.id}","${message.guild.id}",1,"${today.day}","${today.month}","${today.year}","${thedate}")`)        
                }else{
        if(row.length > 1){
          for(let i = 0;i<row.length;i++){
            if(i==0){}else{
              await client.db.query(`DELETE FROM users WHERE id= "${row[i].id}"`)
            }
          }
        }
        dataSync.user.day = row[0];
        const [userMonth] = await client.db.query(`SELECT * FROM users WHERE userID = "${message.author.id}" && guildID = "${message.guild.id}"  && month = "${today.month}" && year = "${today.year}"  && date= "${thedate}"`);
        const [userYear] = await client.db.query(`SELECT * FROM users WHERE userID = "${message.author.id}" && guildID = "${message.guild.id}"  && year = "${today.year}"`);
        dataSync.user.month = userMonth;
        dataSync.user.year = userYear;
        await client.db.query(`UPDATE users SET message="${row[0].message+1}" WHERE userID = "${message.author.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`)
          if(content.match(/<a?:[^:]+:(\d{18})>/gm)){
            const emoticon = content.match(/<a?:[^:]+:(\d{18})>/gm);
          if(emoticon){        
          await client.db.query(`UPDATE users SET emoji_send="${row[0].emoji_send+emoticon.length}" WHERE userID = "${message.author.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`)
          for(let x = 0;x<emoticon.length;x++){
        const [emote] = await client.db.query(`SELECT * FROM emoticons WHERE emote = "${emoticon[x]}" && guildID = "${message.guild.id}" && userID= "${message.author.id}" && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`)
          if (emote.length < 1) {
       await client.db.query(`INSERT INTO emoticons (userID,guildID,emote,used,day,month,year,date) VALUES ("${message.author.id}","${message.guild.id}","${emoticon[x]}","1","${today.day}","${today.month}","${today.year}","${thedate}")`)        
          }else{
      await client.db.query(`UPDATE emoticons SET used="${emote[0].used+1}" WHERE emote = "${emoticon[x]}" && userID = "${message.author.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`)
            } 
          }
        }               
    }
    if(content.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/gm)){
       let links = content.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/gm);
      let totalInv = [];

      links.map(link =>{
          client.fetchInvite(link).then(async(inv) =>{
            totalInv.push(link);
            }).catch(e => {  
            fetch(link).then(async(res) =>{
              if (res.status === 200) {
              let content_type = res.headers.get("content-type");
              if(content_type.includes("image")){
                image.push(link);
                }else if(content_type.includes("video")){
                  video.push(link)
                }else if(content_type.includes("audio")){
                  audio.push(link)
                }else{
                  lien.push(link)
                } 
    console.log("images" +image)
  console.log("video" +video)
  console.log("audio" +audio)
  console.log("liens" + lien) 
              }
 
          }).catch(e =>{
            client.emit('error',e)
          })
            })
      });

setTimeout(async()=>{
  console.log(links)
  if(image.length>0){
await client.db.query(`UPDATE users SET link_img="${row[0].link_img+image.length}" WHERE userID = "${message.author.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`) 
}
if(video.length>0){
await client.db.query(`UPDATE users SET link_video="${row[0].link_video+video.length}" WHERE userID = "${message.author.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`)

}
if(audio.length>0){
await client.db.query(`UPDATE users SET link_audio="${row[0].link_audio+audio.length}" WHERE userID = "${message.author.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`)
}
if(lien.length>0){
 await client.db.query(`UPDATE users SET link="${row[0].link+lien.length}" WHERE userID = "${message.author.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`) 
 }
image = [];
video = [];
audio = [];
lien = [];
totalInv = [];
},5000)


    }
    if(content.match(/discord(?:\.gg|(?:app)?\.com\/invite)\/(([^\W_]+))/gmi)){
      let dlinks = content.match(/discord(?:\.gg|(?:app)?\.com\/invite)\/(([^\W_]+))/gmi);
      let totalInv = [];
           dlinks.map(inv => {
             let finalLink = inv.match(/discord(?:\.gg|(?:app)?\.com\/invite)\/(([^\W_]+))/gmi);
          client.fetchInvite(finalLink[0]).then(async(inv) =>{
            totalInv.push(finalLink[0]);
            }).catch(e => {              
            })
          })
          setTimeout(async()=>{
          await client.db.query(`UPDATE users SET discordlink="${row[0].discordlink+totalInv.length}" WHERE userID = "${message.author.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`)
          totalInv = [];
          },5000)
        }
        if(message.mentions.users.size>0){
          message.mentions.users.map(async(m) => {
            if(m.id === message.author.id){
                }else{
      await client.db.query(`UPDATE users SET mentions="${row[0].mentions+1}" WHERE userID = "${message.author.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`)
     const [pinned] = await client.db.query(`SELECT * FROM mentions WHERE pingID = "${m.id}" && guildID = "${message.guild.id}" && userID= "${message.author.id}" && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`)
          if (pinned.length < 1) {
       await client.db.query(`INSERT INTO mentions (userID,guildID,pingID,pinged,day,month,year,date) VALUES ("${message.author.id}","${message.guild.id}","${m.id}","1","${today.day}","${today.month}","${today.year}","${thedate}")`)        
          }else{
      await client.db.query(`UPDATE mentions SET pinged="${pinned[0].pinged+1}" WHERE pingID = "${message.author.id}" && userID = "${message.author.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`)
            }
           const [mentionned] = await client.db.query(`SELECT * FROM users WHERE userID = "${m.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}"`)
          if (mentionned.length < 1) {
       await client.db.query(`INSERT INTO users (userID,guildID,mentionned,day,month,year,date) VALUES ("${message.author.id}","${message.guild.id}",1,"${today.day}","${today.month}","${today.year}","${thedate}")`)        
                }else{
            await client.db.query(`UPDATE users SET mentionned="${mentionned[0].mentionned+1}" WHERE userID = "${m.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`) 
                }
          }
          })
        }
        if(message.attachments.size>0){
          message.attachments.map(async(m) => {
            await client.db.query(`UPDATE users SET files="${row[0].files+1}" WHERE userID = "${message.author.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`) 
            fetch(m.url).then(async(res) => {
            if (res.status === 200) {
            let content_type = res.headers.get("content-type");
            if(content_type.includes("image")){
            await client.db.query(`UPDATE users SET images="${row[0].images+1}" WHERE userID = "${message.author.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`) 
                }
            if(content_type.includes("video")){
            await client.db.query(`UPDATE users SET videos="${row[0].videos+1}" WHERE userID = "${message.author.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`) 
                }
            if(content_type.includes("audio")){
            await client.db.query(`UPDATE users SET audio="${row[0].audio+1}" WHERE userID = "${message.author.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`) 
                }
              }
            }).catch((err) => { })
            })
        }
      }

      const [rows] = await client.db.query(`SELECT * FROM users WHERE guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`)
            if (rows.length < 1) {
                }else{
        dataSync.guild.day = rows;
         const [usersMonth] = await client.db.query(`SELECT * FROM users WHERE guildID = "${message.guild.id}"  && month = "${today.month}" && year = "${today.year}"`);
        const [usersYear] = await client.db.query(`SELECT * FROM users WHERE guildID = "${message.guild.id}"  && year = "${today.year}"`);
        dataSync.guild.month = usersMonth;
        dataSync.guild.year = usersYear;
            }
message.author.stats = dataSync.user;
message.guild.stats = dataSync.guild; 
  
    if (!data.startsWith(client.prefix)) {
        return;
    }

    const command = client.commands.find(cmd => cmd.aliases.includes(args[0])) || client.commands.get(args[0]);
    if (!command) {
        return ;
    }
    if(command.botNotAllowed && message.author.bot) {
        return;
    }

    if(command.perms === "owner") {
        if(!client.config.owners.includes(message.author.id)) {
            return message.channel.send('Vous n\'avez pas le niveau de permission requis pour utiliser cette commande');
        }
    }
     else if(command.perms !== 'everyone') {
        if(!message.member.permission.has(command.perms)) {
            return message.channel.send('Vous n\'avez pas les permissions requise pour effectuer cette commande !');
        }
    }
     if(command.botPerms !== []) {
         for(botPerm of command.botPerms) {
             if(!message.guild.members.cache.get(client.user.id).hasPermission(botPerm)) {
                 return message.channel.send(`Je n'ai pas la permission requise pour utiliser cette commande !\nPermission demandé : \`${botPerm}\``);
             }
         }
     }
    /*
      * Copyright 2020 © LordAlex2015
      * See LICENSE file
     */
    try {
        command.run(client, message, args)
    } catch (err) {
       client.emit('error',err);
    }
})();
};
