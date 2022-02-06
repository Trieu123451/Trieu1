import pkg from 'discord.js';
import cmddata from 'quick.db'
import proxyAgent from "https-proxy-agent";
import Create from "./Function/CreateBot.js"
import Websocket from "ws"
import axios from "axios"
import url from "url"

const { Client, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = pkg;

const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS"],
    disableEveryone: true
});

client.on('ready', async () => {
    client.user.setActivity(`🌊Redirecting Boat🌊`)
    console.log(`${client.user.username} Loadded ✅`)
})

client.on('messageCreate', async message => {
    const prefix = "-"
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    let error = (Reason) => {
        var error = new MessageEmbed()
            .setTitle(`Pathfind Command Error`)
            .setColor(`#ff0000`)
            .setDescription(`**${Reason}**`)
            .setFooter('Request By ' + message.author.tag, message.author.displayAvatarURL())
        message.reply({ embeds: [error] })
    }
    let pathembed = (tier,time) => {
        var error = new MessageEmbed()
        .setTitle(`🌊SeaFarm Pathfind🌊`)
        .setColor(`RANDOM`)
        .setDescription(`Bot Started In **Seafarm**\nYou Are Tier **${tier}**\nYour Bot Will Stop In **${time}Minutes**`)
        .setFooter('Request By ' + message.author.tag, message.author.displayAvatarURL())
        message.reply({ embeds: [error] })
    }
    let pathembed2 = (tier) => {
        var error = new MessageEmbed()
        .setTitle(`🌊Unblocking Red🌊`)
        .setColor(`RANDOM`)
        .setDescription(`Bot Started In **Teammode**\nYou Are Tier **${tier}**\nYour Bot Will Stop In **${tier == 1 ? 30 : tier == 2 ? 60 : tier == 3 ? 90 : tier == 4 ? 180 : "Infinite"}Minutes**`)
        .setFooter('Request By ' + message.author.tag, message.author.displayAvatarURL())
        message.reply({ embeds: [error] })
    }
    let pathembed3 = (tier) => {
        var error = new MessageEmbed()
        .setTitle(`🌊Farming Red🌊`)
        .setColor(`RANDOM`)
        .setDescription(`Bot Started In **Teammode**\nYou Are Tier **${tier}**\nYour Bot Will Stop In **${tier == 1 ? 30 : tier == 2 ? 60 : tier == 3 ? 90 : tier == 4 ? 180 : "Infinite"}Minutes**`)
        .setFooter('Request By ' + message.author.tag, message.author.displayAvatarURL())
        message.reply({ embeds: [error] })
    }
    let checke = (perm) => {
        if (message.member.permissions.has(perm) || message.member.permissions.has("ADMINISTRATOR")) {
            return true
        } else {
            return false
        }
    }
    switch (cmd) {
        case `farmred`:
            if (!cmddata.get(`${message.author.id}${message.guild.id}Tier`)) return error("You Are Not Allowed To Use Bot")
            if (cmddata.get(`${message.author.id}${message.guild.id}pathcmd`) && cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).Actived == true) return error("You Already Have Running Bot")
            if (cmddata.get(`${message.author.id}${message.guild.id}pathcmd`) && Date.now() - cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).Date < 21600000 && !checke("ADMINISTRATOR")) return error(`You Need Wait ${Math.floor((21600000 - (Date.now() - cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).Date)) / 60000)} Min Until Use Again`)

            let Jsonaer = {
                Date: Date.now(),
                Actived: true,
                Tier: Number(cmddata.get(`${message.author.id}${message.guild.id}Tier`))
            }
            let stoper = setTimeout(() => {
                let pepaa = cmddata.get(`${message.author.id}${message.guild.id}pathcmd`)
                if(pepaa) pepaa.Actived = false;
                cmddata.set(`${message.author.id}${message.guild.id}pathcmd`, pepaa)
                message.reply({ content: "Ur Bot Stopped" })
            }, (Jsonaer.Tier == 1 ? 900000*2 : Jsonaer.Tier == 2 ? 3600000 : Jsonaer.Tier == 3 ? 5400000 : Jsonaer.Tier == 4 ? 10800000 : 5400000))
            cmddata.set(`${message.author.id}${message.guild.id}pathcmd`, {
                Date: Date.now(),
                Actived: true,
                Tier: Number(cmddata.get(`${message.author.id}${message.guild.id}Tier`))
            })
            pathembed3(cmddata.get(`${message.author.id}${message.guild.id}Tier`))
            let getaea = () => {
                axios.get("https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all").then(res => {
                    const proxies = res.data.split("\r\n")
                    let ma = setInterval(() => {
                        if(cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).Actived == false) clearInterval(ma);
                        for (var i = 0; i < 15; i++) {
                            if(cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).Actived == false) break;
                            const proxy = proxies[Math.floor(Math.random() * proxies.length)];
                            const options = url.parse("http://" + proxy);
                            const agent = new proxyAgent(options);
                            new Create("Peanut#5066", `wss://frankfurt${Math.floor(Math.random() * 3)+1}.starve.io/server712`, "farmred", agent,Number(args[0]),Number(args[1]),message.author.id,message.guild.id)
                        }
                    }, 500)
                })
            }
            getaea()
        break;
        case `unblockred`:
            if (!cmddata.get(`${message.author.id}${message.guild.id}Tier`)) return error("You Are Not Allowed To Use Bot")
            if (cmddata.get(`${message.author.id}${message.guild.id}pathcmd`) && cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).Actived == true) return error("You Already Have Running Bot")
            if (cmddata.get(`${message.author.id}${message.guild.id}pathcmd`) && Date.now() - cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).Date < 21600000 && !checke("ADMINISTRATOR")) return error(`You Need Wait ${Math.floor((21600000 - (Date.now() - cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).Date)) / 60000)} Min Until Use Again`)

            let Jsonae = {
                Date: Date.now(),
                Actived: true,
                Tier: Number(cmddata.get(`${message.author.id}${message.guild.id}Tier`))
            }
            let stope = setTimeout(() => {
                let pepa = cmddata.get(`${message.author.id}${message.guild.id}pathcmd`)
                if(pepa) pepa.Actived = false;
                cmddata.set(`${message.author.id}${message.guild.id}pathcmd`, pepa)
                message.reply({ content: "Ur Bot Stopped" })
            }, (Jsonae.Tier == 1 ? 900000*2 : Jsonae.Tier == 2 ? 3600000 : Jsonae.Tier == 3 ? 5400000 : Jsonae.Tier == 4 ? 10800000 : 5400000))
            cmddata.set(`${message.author.id}${message.guild.id}pathcmd`, {
                Date: Date.now(),
                Actived: true,
                Tier: Number(cmddata.get(`${message.author.id}${message.guild.id}Tier`))
            })
            pathembed2(cmddata.get(`${message.author.id}${message.guild.id}Tier`))
            let getae = () => {
                axios.get("https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all").then(res => {
                    const proxies = res.data.split("\r\n")
                    let ma = setInterval(() => {
                        if(cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).Actived == false) clearInterval(ma);
                        for (var i = 0; i < 15; i++) {
                            if(cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).Actived == false) break;
                            const proxy = proxies[Math.floor(Math.random() * proxies.length)];
                            const options = url.parse("http://" + proxy);
                            const agent = new proxyAgent(options);
                            new Create("Peanut#5066", `wss://frankfurt${Math.floor(Math.random() * 3)+1}.starve.io/server712`, "unblockred", agent,Number(args[0]),Number(args[1]),message.author.id,message.guild.id)
                        }
                    }, 500)
                })
            }
            getae()
        break;
        case `pathfind`:
            if (!cmddata.get(`${message.author.id}${message.guild.id}Tier`)) return error("You Are Not Allowed To Use Bot")
            if (cmddata.get(`${message.author.id}${message.guild.id}pathcmd`) && cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).Actived == true) return error("You Already Have Running Bot")
            if(cmddata.get(`${message.author.id}${message.guild.id}pathcmd`)){
                let sta = cmddata.get(`${message.author.id}${message.guild.id}pathcmd`)
                sta.msleft = (sta.msleft - (Date.now()-sta.Date))
                cmddata.set(`${message.author.id}${message.guild.id}pathcmd`,sta)
            }
            if (cmddata.get(`${message.author.id}${message.guild.id}pathcmd`) && cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).msleft < 1 && Date.now() - cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).Det < 21600000 && !checke("ADMINISTRATOR")) return error(`You Need Wait ${Math.floor((21600000 - (Date.now() - cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).Det)) / 60000)} Min Until Use Again`)
            if (!args[0]) return error("Please Specify A Position X")
            if(isNaN(args[0])) return error("Position X Need To Be A Number")
            if (!args[1]) return error("Error Please Specify A Position Y")
            if(isNaN(args[1])) return error("Position Y Need To Be A Number")
            let tia = Number(cmddata.get(`${message.author.id}${message.guild.id}Tier`))
            let Jsona = {
                Date: Date.now(),
                Actived: true,
                Tier: tia,
                msleft: cmddata.get(`${message.author.id}${message.guild.id}pathcmd`) ? Number(cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).msleft) : tia == 1 ? 900000*2 : tia == 2 ? 3600000 : tia == 3 ? 5400000 : tia == 4 ? 10800000 : 5400000
            }
            let stop = setTimeout(() => {
                let pepa = cmddata.get(`${message.author.id}${message.guild.id}pathcmd`)
                pepa.Actived = false
                cmddata.set(`${message.author.id}${message.guild.id}pathcmd`, pepa)
                message.reply({ content: "Ur Bot Stopped" })
            }, (cmddata.get(`${message.author.id}${message.guild.id}pathcmd`) ? cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).msleft : Jsona.Tier == 1 ? 900000*2 : Jsona.Tier == 2 ? 3600000 : Jsona.Tier == 3 ? 5400000 : Jsona.Tier == 4 ? 10800000 : 5400000))
            if(!cmddata.get(`${message.author.id}${message.guild.id}pathcmd`)){
                setTimeout(() => {
                    cmddata.delete(`${message.author.id}${message.guild.id}pathcmd`)
                },1000*60*60*6)
            }
            cmddata.set(`${message.author.id}${message.guild.id}pathcmd`, {
                Det: cmddata.get(`${message.author.id}${message.guild.id}pathcmd`)? cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).Det : Date.now(),
                Date: cmddata.get(`${message.author.id}${message.guild.id}pathcmd`)? cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).Date : Date.now(),
                Actived: true,
                x: Number(args[0]),
                y: Number(args[1]),
                Tier: Number(cmddata.get(`${message.author.id}${message.guild.id}Tier`)),
                msleft: cmddata.get(`${message.author.id}${message.guild.id}pathcmd`) ? cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).msleft : Jsona.Tier == 1 ? 900000*2 : Jsona.Tier == 2 ? 3600000 : Jsona.Tier == 3 ? 5400000 : Jsona.Tier == 4 ? 10800000 : 5400000
            })
            pathembed(cmddata.get(`${message.author.id}${message.guild.id}Tier`),cmddata.get(`${message.author.id}${message.guild.id}pathcmd`)?(Math.floor(cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).msleft/1000/60)) : tia == 1 ? 30 : tia == 2 ? 60 : tia == 3 ? 90 : tia == 4 ? 180 : 9999)
            let geta = () => {
                axios.get("https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all").then(res => {
                    const proxies = res.data.split("\r\n")
                    let ma = setInterval(() => {
                        if(cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).Actived == false) clearInterval(ma);
                        for (var i = 0; i < 15; i++) {
                            if(cmddata.get(`${message.author.id}${message.guild.id}pathcmd`).Actived == false) break;
                            const proxy = proxies[Math.floor(Math.random() * proxies.length)];
                            const options = url.parse("http://" + proxy);
                            const agent = new proxyAgent(options);
                            new Create("Peanut#5066", `wss://frankfurt${Math.floor(Math.random() * 3)+1}.starve.io/server711`, "seafarm", agent,message.author.id,message.guild.id)
                        }
                    }, 500)
                })
            }
            geta()
            break;
        case `setpos`:
            if(!cmddata.get(`${message.author.id}${message.guild.id}pathcmd`)) return error("U Dont Have Running Bot")
            let pogae = cmddata.get(`${message.author.id}${message.guild.id}pathcmd`)
            pogae.x = Number(args[0]),pogae.y = Number(args[1])
            cmddata.set(`${message.author.id}${message.guild.id}pathcmd`,pogae)
            message.reply({content: `Changed Position To ${args[0]},${args[1]}`})
        break;
        case `clear`:
        case `purge`:
            if (!checke("MANAGE_MESSAGES")) return error("You Dont Have Permission To Do That")
            const memberar = message.mentions.members.first();
            let msgsize = 0
            let time = 0
            const messages = message.channel.messages.fetch();
            if (memberar) {
                const userMessages = (await messages).filter((m) => m.author.id === memberar.id);
                await message.channel.bulkDelete(userMessages);
                const embed15 = new MessageEmbed()
                    .setTitle(`${message.author.username}`)
                    .setURL('https://www.youtube.com/channel/UCKeSpcjhUk9j7ebE_2iekgA')
                    .setDescription(`Successfully Deleted ${member} Messages`)
                    .setFooter('Request By ' + message.author.tag, message.author.displayAvatarURL())
                    .setColor(`RANDOM`);
                await message.channel.send(embed15)
            } else {
                if (!args[0]) { return error(`**Clear Command :**\n\n`, "Please Enter A Number Between 1 and 100") }
                let deleteAmount;
                if (args[0] > 500) return error(`**Clear Command :**\n\n`, "Please Enter A Number Between 1 and 500")
                if (args[0] > 100) {
                    deleteAmount = 100;
                    time = (args[0] / 100).toFixed(0) - 1
                    time2 = (args[0] - (time * 100))
                } else {
                    deleteAmount = parseInt(args[0]);
                    time = 0
                }
                let msgsize = 0
                if (time == 0 || time == 1 && time2 == null) {
                    await message.channel.bulkDelete(deleteAmount + 1, true).then(mesg => {
                        msgsize += mesg.size
                        const embeda = new MessageEmbed()
                            .setTitle(`${message.author.username}`)
                            .setURL('https://www.youtube.com/channel/UCKeSpcjhUk9j7ebE_2iekgA')
                            .setDescription(`Successfully Deleted **${msgsize - 1}/100** Messages`)
                            .setFooter('Request By ' + message.author.tag, message.author.displayAvatarURL())
                            .setColor(`RANDOM`);
                        message.channel.send({ embeds: [embeda] }).then(m => m.delete({ timeout: 1000 }))
                        msgsize = 0
                        //console.log(msgsize)
                    })
                } else {
                    for (var ei = 1; ei < time; ei++) {
                        if (ei == time - 1) {
                            await message.channel.bulkDelete(100, true).then(mesg => {
                                msgsize += mesg.size
                                message.channel.bulkDelete(time2, true).then(mesg1 => {
                                    msgsize += mesg1.size
                                    const embeda = new MessageEmbed()
                                        .setTitle(`${message.author.username}`)
                                        .setURL('https://www.youtube.com/channel/UCKeSpcjhUk9j7ebE_2iekgA')
                                        .setDescription(`Successfully Deleted **${msgsize - 1}/100** Messages`)
                                        .setFooter('Request By ' + message.author.tag, message.author.displayAvatarURL())
                                        .setColor(`RANDOM`);
                                    const embed5122 = new MessageEmbed()
                                        .setTitle(`Logs`)
                                        .setURL('https://www.youtube.com/channel/UCKeSpcjhUk9j7ebE_2iekgA')
                                        .setDescription(`**${message.author.tag}** Deleted **${msgsize - 1}/100** Messages in **${message.channel.name}**`)
                                        .setFooter('Request By ' + message.author.tag, message.author.displayAvatarURL())
                                        .setColor(`RANDOM`);
                                    message.channel.send({ embeds: [embeda] }).then(m => m.delete({ timeout: 1000 }))
                                    msgsize = 0
                                    //console.log(msgsize)
                                })
                            })
                        } else {
                            await message.channel.bulkDelete(100, true).then(mesg => {
                                msgsize += mesg.size
                            })
                        }
                    }
                }
            }
        break;
        case `settier`:
            if (!checke("ADMINISTRATOR")) return error("You Dont Have Permission To Set Tier")
            if (!args[1]) return error("Please Specify A Tier")
            if (isNaN(args[1])) return error("Tier Must Be A Number")
            let membere = message.mentions.members.first();
            if (!membere) return error("Please Specify a Member")
            cmddata.set(`${membere.user.id}${message.guild.id}Tier`, args[1])
            message.reply({ content: `Setted ${membere.user.username} To Tier ${args[1]}` })
            break;
        case `checktier`:
            if (!checke("ADMINISTRATOR")) return error("You Dont Have Permission To Check Tier")
            let member = message.mentions.members.first();
            if (!member) return error("Please Specify a Member")
            message.reply({ content: `${member.user.username} Is Tier ${cmddata.get(`${member.user.id}${message.guild.id}Tier`)}` })
            break;
        case `stopbot`:
            if (!checke("ADMINISTRATOR")) {
                if (!cmddata.get(`${message.author.id}${message.guild.id}Tier`)) return error("You Are Not Allowed To Use Bot")
                let tier = cmddata.get(`${message.author.id}${message.guild.id}Tier`)
                let dat = cmddata.get(`${message.author.id}${message.guild.id}pathcmd`)
                if(!dat) return error("No Running Bot For This Player")
                let time = (dat.msleft-(Date.now()-dat.Date))
                dat.Actived = false
                dat.msleft = time
                cmddata.set(`${message.author.id}${message.guild.id}pathcmd`, dat)
                message.reply({ content: `Stopped Your Bot\nYou Can Bot Again ${Math.floor((time/1000)/60)}minutes before Cooldown` })
            } else {
                let membera = message.mentions.members.first();
                if (!membera) return error("Please Specify a Member")
                let tiere = cmddata.get(`${membera.user.id}${message.guild.id}Tier`)
                let datea = cmddata.get(`${membera.user.id}${message.guild.id}pathcmd`)
                let timee = (Number(datea.msleft)-(Date.now()-datea.Date))
                datea.Actived = false
                datea.msleft = timee
                cmddata.set(`${membera.user.id}${message.guild.id}pathcmd`, datea)
                console.log(timee)
                message.reply({ content: `Stopped ${membera.user.username} Bot\nHe Can Bot Again ${Math.floor((Number(timee)/1000)/60)}minutes before Cooldown` })
            }
            break;
        case `cleardata`:
            if (!checke("ADMINISTRATOR")) return error("You Dont Have Permission To Clear Data")
            let memberera = message.mentions.members.first()
            if (!memberera) return error("Please Specify a Member")

            cmddata.delete(`${memberera.user.id}${message.guild.id}pathcmd`)
            message.reply({ content: `Cleared ${memberera.user.username} DATA` })

            break;
    }
})
client.login("OTM5NTg3OTE2MzExNzExOTI2.Yf7Bbw.leV1ldBGJbSmp5cIGD8zoSffVoY");
let host = (url) => {
    try{
        let ws = new Websocket(`wss://${url}.herokuapp.com`)
        ws.on('open', () => {
            console.log("✅ Started Socket")
        })
        ws.on("message", msg => {
            let msge = Buffer.from(new Uint8Array(msg)).toString();
            Create.addtoken(msge)
        })
        ws.on('close', () => {
            host(url)
        })   
    }catch(e){
        host(url)
    }
}
host("peagen1")
host("peagen2")
host("peagen3")