//interfaces

interface  Player {
    position: string;
    name: string;
    threePercent: number;
    twoPercent: number;
    points: number;
}


// Variables used

let players: Player[] = [];
const BaseUrl: string = "https://nbaserver-q21u.onrender.com/"
let pg: Player = {
    position: "PG",
    name: "Player G",
    threePercent: 10,
    twoPercent: 15,
    points: 25
    
} ;
let sg: Player ={
    position: "SG",
    name: "Player S",
    threePercent: 8,
    twoPercent: 12,
    points: 20
} ;
let sf: Player ={
    position: "SF",
    name: "Player F",
    threePercent: 6,
    twoPercent: 10,
    points: 15
    
} ;
let pf: Player ={
    position: "PF",
    name: "Player F",
    threePercent: 4,
    twoPercent: 8,
    points: 10
} ;
let c: Player ={
    position: "C",
    name: "Center",
    threePercent: 2,
    twoPercent: 4,
    points: 5
} ;



//elements
const divPG:HTMLDivElement = document.querySelector(".pg")!;
const divSG:HTMLDivElement = document.querySelector(".sg")!;
const divSF:HTMLDivElement = document.querySelector(".sf")!;
const divPF:HTMLDivElement = document.querySelector(".pf")!;
const divC:HTMLDivElement = document.querySelector(".c")!;
const form: HTMLFormElement = document.querySelector("form")!;
const playersTable:HTMLElement = document.getElementById("table")?.getElementsByTagName("tbody")[0]!as HTMLTableSectionElement



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
    div1.textContent = `Player G: ${pg.name}, 3P: ${pg.threePercent}, 2P: ${pg.twoPercent}, Points: ${pg.points}`;
    divPG.appendChild(div1);
    sg = JSON.parse(localStorage.getItem("sg")!);
    const div2 = document.createElement("div");
    div2.textContent = `Player S: ${sg.name}, 3P: ${sg.threePercent}, 2P: ${sg.twoPercent}, Points: ${sg.points}`;
    divSG.appendChild(div2);
    sf = JSON.parse(localStorage.getItem("sf")!);
    const div3 = document.createElement("div");
    div3.textContent = `Player F: ${sf.name}, 3P: ${sf.threePercent}, 2P: ${sf.twoPercent}, Points: ${sf.points}`;
    divSF.appendChild(div3);
    pf = JSON.parse(localStorage.getItem("pf")!);
    const div4 = document.createElement("div");
    div4.textContent = `Player F: ${pf.name}, 3P: ${pf.threePercent}, 2P: ${pf.twoPercent}, Points: ${pf.points}`;
    divPF.appendChild(div4);
    c = JSON.parse(localStorage.getItem("c")!);
    const div5 = document.createElement("div");
    div5.textContent = `Center: ${c.name}, 3P: ${c.threePercent}, 2P: ${c.twoPercent}, Points: ${c.points}`;
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
        console.log(Player);
        
        const playersRes:Player = await res.json();
        players.push(playersRes)
        console.log(playersRes);

        console.log(players);
        
       } catch (err) {
        console.error(err);
       }}

// founction to display players in the table

const displayPlayers = () => {
    players.forEach((player) => {
        const row = document.createElement("tr");
        const positionCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const threePercentCell = document.createElement("td");
        const twoPercentCell = document.createElement("td");
        const pointsCell = document.createElement("td");

        positionCell.textContent = player.position;
        nameCell.textContent = player.name;
        threePercentCell.textContent = `${player.threePercent}%`;
        twoPercentCell.textContent = `${player.twoPercent}%`;
        pointsCell.textContent = `${player.points}`;

        row.appendChild(positionCell);
        row.appendChild(nameCell);
        row.appendChild(threePercentCell);
        row.appendChild(twoPercentCell);
        row.appendChild(pointsCell);

        playersTable.appendChild(row);
    });
}

        
        











//call founction
saveTeam();
loadTeam();

getPlayers({
    position: "C",
    twoPercent: 20,
    threePercent: 20,
    points: 100,
});

displayPlayers();
console.log(players);

    


