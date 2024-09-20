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

let team :{ [key: string]: Player  } = {};

//elements
const divPG:HTMLDivElement = document.querySelector(".pg")!;
const divSG:HTMLDivElement = document.querySelector(".sg")!;
const divSF:HTMLDivElement = document.querySelector(".sf")!;
const divPF:HTMLDivElement = document.querySelector(".pf")!;
const divC:HTMLDivElement = document.querySelector(".c")!;
console.log(divC, divPF, divSG, divPG, divSF);
const form: HTMLFormElement = document.querySelector("form")!;
const select = document.querySelector("select")!;

const playersTable = document.getElementById("table")?.getElementsByTagName("tbody")[0]!as HTMLTableSectionElement
const divRange1:HTMLDivElement = document.querySelector(".range1")!;
const divRange2:HTMLDivElement = document.querySelector(".range2")!;
const divRange3:HTMLDivElement = document.querySelector(".range3")!;

const range1:HTMLInputElement = document.querySelector(".r1")!;
const range2: HTMLInputElement = document.querySelector(".r2")!;
const range3: HTMLInputElement = document.querySelector(".r3")!;

// functions

// function to load team from local storage
const loadTeam = () => {
    const savedTeam = localStorage.getItem("team");
    if(savedTeam){
        team = JSON.parse(savedTeam);
        Object.keys(team).forEach(pos => {
            switch (pos) {
                case "PG":divPG.innerHTML = `<h1>Point Guard</h1>${team[pos].playerName}threePersent:${team[pos].threePercent}% twoPercent:${team[pos].twoPercent}%  points:${team[pos].points} `;
                // divPG.textContent = `${team[pos].playerName}  ${team[pos].points}  ${team[pos].threePercent} ${team[pos].twoPercent}  ${team[pos].points} `;
                break;
                case "SG": divSG.innerHTML = `<h1>Shooting Guard</h1>${team[pos].playerName}threePersent:${team[pos].threePercent}% twoPercent:${team[pos].twoPercent}%  points:${team[pos].points} `;
                break;
                case "SF": divSF.innerHTML = `<h1>Small Forward</h1>${team[pos].playerName}threePersent:${team[pos].threePercent}% twoPercent:${team[pos].twoPercent}%  points:${team[pos].points} `;
                break;
                case "PF": divPF.innerHTML = `<h1>Power Forward</h1>${team[pos].playerName}threePersent:${team[pos].threePercent}% twoPercent:${team[pos].twoPercent}%  points:${team[pos].points} `;
                break;
                case "C": divC.innerHTML = `<h1>Center</h1>${team[pos].playerName}threePersent:${team[pos].threePercent}% twoPercent:${team[pos].twoPercent}%  points:${team[pos].points} `;
                break;  
            }
        })
    }    
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
        const playersRes:Player[] = await res.json();
        displayPlayers(playersRes)
       } catch (err) {
        console.error(err);
       }}

// founction to display players in the table
const displayPlayers = (playersRes:Player[]) => {
    playersTable.innerHTML = "";
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
    });
}
 
// function to add player to current team
const AddPlayer = (index: number) => {
    const selectedPlayer = playersTable.rows[index].cells;
    const player:Player = {
        playerName: selectedPlayer[0].textContent!,
        position: selectedPlayer[1].textContent!,
        points: parseInt(selectedPlayer[2].textContent!),
        twoPercent: parseFloat(selectedPlayer[3].textContent!),
        threePercent: parseFloat(selectedPlayer[4].textContent!),
    }
    switch(player.position) {
        case "PG":divPG.innerHTML = `<h1>Point Guard</h1>${player.playerName}threePersent:${player.threePercent}% twoPercent:${player.twoPercent}%  points:${player.points} `;
        break;
        case "SG": divSG.innerHTML = `<h1>Shooting Guard</h1>${player.playerName}threePersent:${player.threePercent}% twoPercent:${player.twoPercent}%  points:${player.points} `;
        break;
        case "SF": divSF.innerHTML = `<h1>Small Forward</h1>${player.playerName}threePersent:${player.threePercent}% twoPercent:${player.twoPercent}%  points:${player.points} `;
        break;
        case "PF": divPF.innerHTML = `<h1>Power Forward</h1>${player.playerName}threePersent:${player.threePercent}% twoPercent:${player.twoPercent}%  points:${player.points} `;
        break;
        case "C": divC.innerHTML = `<h1>Center</h1>${player.playerName}threePersent:${player.threePercent}% twoPercent:${player.twoPercent}%  points:${player.points} `;
        break;
    }
    team[player.position] = player;
     localStorage.setItem("team", JSON.stringify(team));
    
   
           
         
        
          
           
   
    
}

// event listeners
range1.addEventListener("change",()=>{
    divRange1.textContent = range1.value;

})
range2.addEventListener("change",()=>{
    divRange2.textContent = range2.value
})

range3.addEventListener("change",()=>{
    console.log(range1.value);
    
    divRange3.textContent = range3.value
})


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const position = select.value;
    const threePercent = Number(range1.value);
    const twoPercent = Number(range2.value);
    const points = Number(range3.value);
    const player: Partial<Player> = {
        position : position,
        threePercent: threePercent,
        twoPercent:twoPercent,
        points:points,
    }
    console.log(player);
    
    getPlayers(player);
    });
       
//call founction
window.onload = loadTeam;









    


