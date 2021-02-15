'use strict';

module.exports = (client, member) => {
    if (!member.guild) {
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

  let cachedInvites = client.guildInvites.get(member.guild.id);
  (async()=>{
  let newInvites = await member.guild.fetchInvites();
  let usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses) || cachedInvites.find(inv => !newInvites.has(inv.code)) || {code: member.guild.vanityURLCode, uses: null, inviter: {id: null}};
  let inviter = client.users.cache.get(usedInvite.inviter.id) || {id: member.guild.id};
if(member.user.bot) return;
       const [rows] = await client.db.query(`SELECT * FROM users WHERE userID = "${inviter.id}" && guildID = "${member.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}"  && date= "${thedate}"`)
                if (rows.length < 1) {
       await client.db.query(`INSERT INTO users (userID,guildID,invite_used,day,month,year,date) VALUES ("${inviter.id}","${member.guild.id}",1,"${today.day}","${today.month}","${today.year}", "${thedate}")`)        
                }else{
       await client.db.query(`UPDATE users SET invite_used="${rows[0].invite_used+1}" WHERE userID = "${inviter.id}" && guildID = "${member.guild.id}"  && day = "${today.day}" && month = "${today.month}" && year = "${today.year}" && date= "${thedate}"`)
            }
})();
     
};
