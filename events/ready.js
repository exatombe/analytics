'use strict';
const {blue, green} = require('colors');
module.exports = async(client) => {
    /*
      * Copyright 2020 © LordAlex2015
      * See LICENSE file
     */

    console.log(`Logged in as ${blue(`${client.user.tag}`)}`);

    await client.user.setActivity('Analytics is Starting...');
    console.log(`${green('[Bot]')} Playing: ${blue('Analytics is Starting...')}`);

    client.guilds.cache.forEach(guild => {
    guild.fetchInvites().then(invites => client.guildInvites.set(guild.id, invites)).catch(err => console.log(err));
        });
     const activities = [`Analytics | &help`, `${client.guilds.cache.size} serveurs`,`Analysez le comportement des utilisateurs`]
    setInterval(async () => {
            await client.user.setActivity(activities[Math.floor(Math.random() * activities.length)]);
        },
        120000);
};