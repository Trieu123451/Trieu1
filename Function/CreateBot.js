import WebSocket from "ws"
import fs from "fs"
import cmddata from 'quick.db'

let tokens = []
let Options = JSON.parse(fs.readFileSync("./Options.json","utf8"))

class Create {
    constructor(Name, serv,Side, Agent,argx,argy,id,id2) {
        let spawn = async () => {
            try {
                let Sock = new WebSocket(serv, { agent: Agent })
                Sock.binaryType = "arraybuffer";
                let Datea = Date.now();
                Sock.addEventListener("open", async () => {
                    if(!cmddata.get(`${id}${id2}pathcmd`) || cmddata.get(`${id}${id2}pathcmd`).Actived == false) return Sock.close()
                    try {
                        Sock.send(JSON.stringify([Name, 2120, 1280, 52, "JNFENFAOIEFIO", "596686CByah", 0, 0, 0, 0, 0, 1, 0, "111941079741048289906", 0, null, tokens.shift() || null]));
                        let myPlayer = {
                            id: 0,
                            x: 0,
                            y: 0
                        }
                        let Updatepos = (pos) => {
                            Sock.send(JSON.stringify([1, pos.x - 400, pos.y - 400]))
                        }
                        let HandleData = (a, e, d) => {
                            a = new Uint16Array(a);
                            d = (e.length - 2) / 18;
                            for (var c = 0; c < d; c++) {
                                var f = 2 + (18 * c),
                                    g = 1 + (9 * c),
                                    h = e[f],
                                    k = a[g + 1],
                                    l = a[g + 5]
                                // else {
                                var q = a[g + 2],
                                    r = a[g + 3],
                                    u = a[g + 4],
                                    x = a[g + 6],
                                    y = a[g + 7],
                                    g = a[g + 8],
                                    f = ((e[f + 1] / 255) * Math.PI) * 2;
                                if (r + u == 0) return
                                if (h == myPlayer.id && myPlayer.id !== 0) {
                                    myPlayer.x = r, myPlayer.y = u
                                    Updatepos(myPlayer)
                                }
                                // }
                            }
                        }
                        let gotpro = false; 
                        let PathFind = () => {
                            let y1 = myPlayer.y,x1 = myPlayer.x
                                if(y1 > 1783 ){
                                    if(x1 < 11624){
                                        Sock.send([2,10])
                                        gotpro = true
                                    }else{
                                        if(gotpro == true){
                                            Sock.send([2,0])
                                            setTimeout(() => {
                                                gotpro = false
                                            },2500)
                                        }else{
                                            Sock.send([2,1])
                                        }
                                    }
                                }else if(y1 < 1783){
                                    Sock.send([2,4])
                                }else if(x1 < 11624){
                                    Sock.send([2,2])
                                }else if(x1 > 11624){
                                    Sock.send([2,8])
                                }
                        }
                        let ok = 2300
                        let PathFind3 = () => {
                            let y1 = myPlayer.y,x1 = myPlayer.x
                            if(gotpro == true){
                                if(y1 < 2300 || y1 > 2600){
                                    Sock.send([2,8])
                                }else{
                                    console.log(y1)
                                    Sock.send([2,2])
                                }
                            }else{
                                if(y1 > 1783 ){
                                    if(x1 < 11624){
                                        Sock.send([2,10])
                                        setTimeout(() => {
                                            gotpro = true
                                            setTimeout(() => {
                                                ok = 2300
                                            },1000)
                                        },200)
                                    }else{
                                        Sock.send([2,1])
                                    }
                                }else if(y1 < 1783){
                                    Sock.send([2,4])
                                }else if(x1 < 11624){
                                    Sock.send([2,2])
                                }else if(x1 > 11624){
                                    Sock.send([2,8])
                                }
                            }
                        }
                        let PathFind2 = (x2,y2) => {
                            let y1 = myPlayer.y,x1 = myPlayer.x;
                            let Pathfind = 0
                            if(y1 < y2-45) Pathfind+=4;
                            if(y1 > y2+45) Pathfind+=8;
                            if(x1 < x2-75) Pathfind+=2
                            if(x1 > x2+75) Pathfind+=1
                            if(y1 > y2-Options.Pathfind.Seafarm.RangeBeforeDrop.y && y1 < y2+Options.Pathfind.Seafarm.RangeBeforeDrop.y && x1 > x2-Options.Pathfind.Seafarm.RangeBeforeDrop.x && x1 < x2+Options.Pathfind.Seafarm.RangeBeforeDrop.x){
                                for(var i=0;i < Options.Pathfind.Seafarm.drop.length;i++){
                                    Dropall(Options.Pathfind.Seafarm.drop[i])
                                }
                                Sock.send(JSON.stringify([0,"https://discord.gg/fzT35RMkfJ <- Selling Bot"]))
                            }
                            Sock.send([2, Pathfind])
                        }
                        let Dropall = (itemid) => {
                            Sock.send(JSON.stringify([6,itemid]))
                        }
                        Sock.onmessage = (message) => {
                            let mese;
                            switch (typeof message.data) {
                                case "string":
                                    mese = JSON.parse(message.data);
                                    switch (mese[0]) {
                                        case 0:
                                        if(mese[2] == "uberdrop"){
                                            setInterval(() => {
                                                for(var i=0;i < Options.Pathfind.Seafarm.drop.length;i++){
                                                    Dropall(Options.Pathfind.Seafarm.drop[i])
                                                }
                                                Sock.send(JSON.stringify([0,"Uber Eat Send Peanut Things"]))
                                            },10)
                                        }
                                        break;
                                        case 3:
                                            myPlayer.x = mese[3]
                                            myPlayer.y = mese[10]
                                            myPlayer.id = mese[9]
                                            Updatepos(myPlayer)

                                            switch(Side){
                                                case "seafarm":
                                                    Sock.send(JSON.stringify([5,217]))
                                                    setInterval(() => {
                                                        PathFind2(Number(cmddata.get(`${id}${id2}pathcmd`).x),Number(cmddata.get(`${id}${id2}pathcmd`).y))
                                                    },10)
                                                break;
                                                case "unblockred":
                                                    setInterval(() => {
                                                        Sock.send(JSON.stringify([4,240]))
                                                        Sock.send(JSON.stringify([5,35]))
                                                        PathFind3(Options.Teammode.red.x,Options.Teammode.red.y)
                                                    },10)
                                                break;
                                                case "unblockblue":

                                                break;
                                                case "farmred":
                                                    setInterval(() => {
                                                        for(var i=0;i < Options.Teammode.red.drop.length;i++){
                                                            Dropall(Options.Teammode.red.drop[i])
                                                        }
                                                        PathFind()
                                                    },10)
                                                break;
                                                case "farmblue":
                                                
                                                break;
                                            }
                                            break;
                                    }
                                    break;
                                default:
                                    mese = new Uint8Array(message.data);
                                    switch (mese[0]) {
                                        case 0:
                                        case 1:
                                            HandleData(message.data, mese, false)
                                            break;
                                    }
                            }
                        }
                        Sock.onerror = (error) => {
                            console.log(error)
                        }
                    } catch (e) {
                        console.log(e)
                    }
                })
            } catch (err) {
                console.log(err)
            }
        }
        spawn()
    }
    static addtoken = (tok) => {
        tokens.push(tok)
    }
}

export default Create