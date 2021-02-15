'use strict';

module.exports = (client, invite) => {
    if (!invite.guild) {
        return ;
    }
  client.guilds.cache.forEach(guild => {
    guild.fetchInvites().then(invites => client.guildInvites.set(guild.id, invites)).catch(err => console.log(err));
        });
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

if(invite.inviter.bot) return;
(async() => {
       const [rows] = await client.db.query(`SELECT * FROM users WHERE userID = "${invite.inviter.id}" && guildID = "${invite.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}"  && date= "${thedate}"`)
                if (rows.length < 1) {
       await client.db.query(`INSERT INTO users (userID,guildID,invite_created,day,month,year,date) VALUES ("${invite.inviter.id}","${invite.guild.id}",1,"${today.day}","${today.month}","${today.year}", "${thedate}")`)        
                }else{
       await client.db.query(`UPDATE users SET invite_created="${rows[0].invite_created+1}" WHERE userID = "${invite.inviter.id}" && guildID = "${invite.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`)
            }
})();
     
};
