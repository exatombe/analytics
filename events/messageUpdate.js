'use strict';

module.exports = (client, oldMessage, newMessage) => {
    if (!newMessage.channel.guild) {
        return ;
    }

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
    const thedate = `${today.year}-${today.month}-${today.day}`
if(newMessage.author.bot) return;
(async() => {
    const [rows] = await client.db.query(`SELECT * FROM users WHERE userID = "${newMessage.author.id}" && guildID = "${newMessage.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}"  && date= "${thedate}"`)
        if (rows.length < 1) {
       await client.db.query(`INSERT INTO users (userID,guildID,message_update,day,month,year,date) VALUES ("${newMessage.author.id}","${newMessage.guild.id}",1,"${today.day}","${today.month}","${today.year}","${thedate}")`)        
                }else{
       await client.db.query(`UPDATE users SET message_update="${rows[0].message_update +1}" WHERE userID = "${newMessage.author.id}" && guildID = "${newMessage.guild.id}"  && day = "${today.day}" && month = "${today.month}" && date= "${thedate}"`)
            }
})();
     
};