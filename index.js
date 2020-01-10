const moment = require('moment')
const { Client } = require("discord.js");
const termData = require("./data/bannedTerms.json")
const client = new Client({
  autoReconnect: true,
  messageCacheMaxSize: 10,
  messageCacheLifetime: 30,
  messageSweepInterval: 35
})
const { token } = require("./data/config.json");
client.on("message", message => {
  // Message Filter
  if (!message.deletable) return
  if (message.system) return
  try {
    if (termData.some(x => message.content.includes(x))) message.delete().then(() => message.channel.send(`That URL is banned, ${message.author.tag}.`))
  } catch (err) { message.channel.send(strings.error_occured + err) }
})
client.on('error', error => console.error('A WebSocket error has occured: ' + error))
client.on("ready", () => {
  console.log('[Logged in] ' + client.user.tag)
  console.log('[Time] ' + moment().format('MMMM Do YYYY, h:mm:ss a'))
})
client.on('disconnect', event => {
  console.log('[DISCONNECTED] Attempting to reconnect')
  client.login(token)
})
client.login(token)
