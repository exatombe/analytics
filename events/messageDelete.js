'use strict';

module.exports = (client, message) => {
    if (!message.channel.guild) {
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

if(message.author.bot) return;
(async() => {
       const [rows] = await client.db.query(`SELECT * FROM users WHERE userID = "${message.author.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`)
                if (rows.length < 1) {
       await client.db.query(`INSERT INTO users (userID,guildID,message_delete,day,month,year,date) VALUES ("${message.author.id}","${message.guild.id}",1,"${today.day}","${today.month}","${today.year}", "${thedate}")`)        
                }else{
       await client.db.query(`UPDATE users SET message_delete="${rows[0].message_delete+1}" WHERE userID = "${message.author.id}" && guildID = "${message.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`)
            }
})();
     
};
