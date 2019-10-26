const fs = require("fs");
const moment = require('moment')
const Discord = require("discord.js");
const client = new Discord.Client({
  autoReconnect:true,
  messageCacheMaxSize: 10,
  messageCacheLifetime: 30,
  messageSweepInterval: 35
});
const config = require("./data/config.json");
const token = config.token

client.on("message", (message) => {
  // Message Filter
  fs.readFile("./data/bannedTerms.json", 'utf8', function(err, termData) {
    if(err) return message.channel.send(strings.error_occured + err)
    termData = JSON.parse(termData)
    if(termData.includes(message.content)) {
      message.delete(0).then( () => {
        message.channel.send(`That URL is banned, ${message.author.tag}.`)
      })
      
      return;
    }
    if(message.content.includes(termData)) {
      message.delete(0).then( () => {
        message.channel.send(`That URL is banned, ${message.author.tag}.`)
      })
      
      return;
    }
    return;
  });
return;
});

client.on('error', (error) => {
console.log('A WebSocket error has occured: ' + error )
});

client.on("ready", () => {
    
    
    console.log('[Logged in] ' + client.user.tag)
    console.log('[Time] ' + moment().format('MMMM Do YYYY, h:mm:ss a'))

});

client.on('disconnect', event => {
    console.log('[DISCONNECTED] Attempting to reconnect')
    client.login(token)
  })

client.login(token)
