//interfaces

interface  Player {
    position: string;
    playerName: string;
    threePercent: number;
    twoPercent: number;
    points: number;
}


// Variables used

const BaseUrl: string = "https://nbaserver-q21u.onrender.com/"
let pg: Player = {
    position: "PG",
    playerName: "Player G",
    threePercent: 10,
    twoPercent: 15,
    points: 25
    
} ;
let sg: Player ={
    position: "SG",
    playerName: "Player S",
    threePercent: 8,
    twoPercent: 12,
    points: 20
} ;
let sf: Player ={
    position: "SF",
    playerName: "Player F",
    threePercent: 6,
    twoPercent: 10,
    points: 15
    
} ;
let pf: Player ={
    position: "PF",
    playerName: "Player F",
    threePercent: 4,
    twoPercent: 8,
    points: 10
} ;
let c: Player
 



//elements
const p: Player[] =[];
const divPG:HTMLDivElement = document.querySelector(".pg")!;
const divSG:HTMLDivElement = document.querySelector(".sg")!;
const divSF:HTMLDivElement = document.querySelector(".sf")!;
const divPF:HTMLDivElement = document.querySelector(".pf")!;
const divC:HTMLDivElement = document.querySelector(".c")!;
const form: HTMLFormElement = document.querySelector("form")!;
const select = document.querySelector("select")!;

const playersTable:HTMLElement = document.getElementById("table")?.getElementsByTagName("tbody")[0]!as HTMLTableSectionElement
const divRange1:HTMLInputElement = document.querySelector(".range1")!;
const divRange2:HTMLInputElement = document.querySelector(".range2")!;
const divRange3:HTMLInputElement = document.querySelector(".range3")!;

const range1:HTMLInputElement = document.querySelector(".r1")!;
const range2: HTMLInputElement = document.querySelector(".r2")!;
const range3: HTMLInputElement = document.querySelector(".r3")!;




// functions

//founction to save team in local storage
const saveTeam = () => {
    localStorage.setItem("pg", JSON.stringify(pg));
    localStorage.setItem("sg", JSON.stringify(sg));
    localStorage.setItem("sf", JSON.stringify(sf));
    localStorage.setItem("pf", JSON.stringify(pf));
    localStorage.setItem("c", JSON.stringify(c));
}

// function to load team from local storage

const loadTeam = () => {
    pg = JSON.parse(localStorage.getItem("pg")!);
    const div1 = document.createElement("div");
    div1.textContent = ` ${pg.playerName} ${pg.threePercent} ${pg.twoPercent} ${pg.points}`;
    divPG.appendChild(div1);
    sg = JSON.parse(localStorage.getItem("sg")!);
    const div2 = document.createElement("div");
    div2.textContent = ` ${sg.playerName} ${sg.threePercent} ${sg.twoPercent} ${sg.points}`;
    divSG.appendChild(div2);
    sf = JSON.parse(localStorage.getItem("sf")!);
    const div3 = document.createElement("div");
    div3.textContent = ` ${sf.playerName} ${sf.threePercent} ${sf.twoPercent} ${sf.points}`;
    divSF.appendChild(div3);
    pf = JSON.parse(localStorage.getItem("pf")!);
    const div4 = document.createElement("div");
    div4.textContent = ` ${pf.playerName} ${pf.threePercent} ${pf.twoPercent} ${pf.points}`;
    divPF.appendChild(div4);
    c = JSON.parse(localStorage.getItem("c")!);
    const div5 = document.createElement("div");
    div5.textContent = ` ${c.playerName} ${c.threePercent} ${c.twoPercent} ${c.points}`;
    divC.appendChild(div5);
}

// founction to get players from APIService by using mathod POST

const getPlayers = async (Player:Partial<Player>) :Promise<void> => {
    try {
        const res:Response = await fetch(`${BaseUrl}api/filter`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(Player),
        });
        // console.log(Player);
        
        const playersRes:Player[] = await res.json();
        displayPlayers(playersRes);

        // console.log(players);
        
       } catch (err) {
        console.error(err);
       }}

// founction to display players in the table

const displayPlayers = (playersRes:Player[]) => {
    playersTable.innerHTML = "";
    console.log(playersRes);
    
    playersRes.forEach((player,index) => {

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${player.playerName}</td>
            <td>${player.position}</td>
            <td>${player.points}</td>
            <td>${player.twoPercent}</td>
            <td>${player.threePercent}</td>
            <td><button onclick="AddPlayer(${index})">Add ${player.playerName} To Current Team</button></td>
        `;
        playersTable.appendChild(row);
        p.push(player);
    });
}
 
// function to add player to current team

const AddPlayer = (index: number) => {
    divC.textContent = "";
    divPF.textContent = "";
    divSG.textContent = "";
    divPG.textContent = "";
    divSF.textContent = "";
    switch (p[index].position) {
        case "PG":
            pg = p[index];
            break;
        case "SG":
            sg = p[index];
            break;
        case "SF":
            sf = p[index];
            break;
        case "PF":
            pf = p[index];
            break;
        case "C":
            c = p[index];
            break;
    }
    saveTeam();
    loadTeam();
}


// event listeners
// range1.addEventListener("change",()=>{
//     divRange1.textContent = range1.value

// })

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const position = select.value;
    const threePercent = Number(range1.value);
    const twoPercent = Number(range2.value);
    const points = Number(range3.value);
    const player: Partial<Player> = {
        position,
        threePercent,
        twoPercent,
        points,
    }
    getPlayers(player);
    });

        
        











//call founction
// saveTeam();
// loadTeam();

getPlayers({
    position: "C",
    twoPercent: 20,
    threePercent: 20,
    points: 100,
}).then((()=>console.log(p)));





    


