"use strict";
//interfaces
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
// Variables used
const BaseUrl = "https://nbaserver-q21u.onrender.com/";
let pg = {
    position: "PG",
    playerName: "Player G",
    threePercent: 10,
    twoPercent: 15,
    points: 25
};
let sg = {
    position: "SG",
    playerName: "Player S",
    threePercent: 8,
    twoPercent: 12,
    points: 20
};
let sf = {
    position: "SF",
    playerName: "Player F",
    threePercent: 6,
    twoPercent: 10,
    points: 15
};
let pf = {
    position: "PF",
    playerName: "Player F",
    threePercent: 4,
    twoPercent: 8,
    points: 10
};
let c = {
    position: "C",
    playerName: "Player C",
    threePercent: 2,
    twoPercent: 6,
    points: 5
};
//elements
const p = [];
const divPG = document.querySelector(".pg");
const divSG = document.querySelector(".sg");
const divSF = document.querySelector(".sf");
const divPF = document.querySelector(".pf");
const divC = document.querySelector(".c");
const form = document.querySelector("form");
const select = document.querySelector("select");
const playersTable = (_a = document.getElementById("table")) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("tbody")[0];
const divRange1 = document.querySelector(".range1");
const divRange2 = document.querySelector(".range2");
const divRange3 = document.querySelector(".range3");
const range1 = document.querySelector(".r1");
const range2 = document.querySelector(".r2");
const range3 = document.querySelector(".r3");
// functions
//founction to save team in local storage
const saveTeam = () => {
    localStorage.setItem("pg", JSON.stringify(pg));
    localStorage.setItem("sg", JSON.stringify(sg));
    localStorage.setItem("sf", JSON.stringify(sf));
    localStorage.setItem("pf", JSON.stringify(pf));
    localStorage.setItem("c", JSON.stringify(c));
};
// function to load team from local storage
const loadTeam = () => {
    pg = JSON.parse(localStorage.getItem("pg"));
    sg = JSON.parse(localStorage.getItem("sg"));
    sf = JSON.parse(localStorage.getItem("sf"));
    pf = JSON.parse(localStorage.getItem("pf"));
    c = JSON.parse(localStorage.getItem("c"));
    divPG.textContent = `${pg.playerName}  ${pg.points}  ${pg.threePercent} ${pg.twoPercent}  ${pg.points} points`;
    divSG.textContent = `${sg.playerName}  ${sg.points}  ${sg.threePercent} ${sg.twoPercent}  ${sg.points} points`;
    divSF.textContent = `${sf.playerName}  ${sf.points}  ${sf.threePercent} ${sf.twoPercent}  ${sf.points} points`;
    divC.textContent = `${c.playerName}  ${c.points}  ${c.threePercent} ${c.twoPercent}  ${c.points} points`;
    divPF.textContent = `${pf.playerName}  ${pf.points}  ${pf.threePercent} ${pf.twoPercent}  ${pf.points} points`;
};
// founction to get players from APIService by using mathod POST
const getPlayers = (Player) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`${BaseUrl}api/filter`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(Player),
        });
        // console.log(Player);
        const playersRes = yield res.json();
        displayPlayers(playersRes);
        // console.log(players);
    }
    catch (err) {
        console.error(err);
    }
});
// founction to display players in the table
const displayPlayers = (playersRes) => {
    playersTable.innerHTML = "";
    console.log(playersRes);
    playersRes.forEach((player, index) => {
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
};
// function to add player to current team
const AddPlayer = (index) => {
    divC.innerHTML = "";
    divPF.innerHTML = "";
    divSG.innerHTML = "";
    divPG.innerHTML = "";
    divSF.innerHTML = "";
    const h1 = document.createElement("h1");
    h1.textContent = "Point Guard";
    divPG.appendChild(h1);
    const h12 = document.createElement("h1");
    h12.textContent = "Shooting Guard";
    divSG.appendChild(h12);
    const h13 = document.createElement("h1");
    h13.textContent = "Small Forward";
    divSF.appendChild(h13);
    const h14 = document.createElement("h1");
    h14.textContent = "Power Forward";
    divPF.appendChild(h14);
    const h15 = document.createElement("h1");
    h15.textContent = "Center";
    divC.appendChild(h15);
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
};
// event listeners
range1.addEventListener("change", () => {
    divRange1.textContent = range1.value;
});
range2.addEventListener("change", () => {
    divRange2.textContent = range2.value;
});
range3.addEventListener("change", () => {
    console.log(range1.value);
    divRange3.textContent = range3.value;
});
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const position = select.value;
    const threePercent = Number(range1.value);
    const twoPercent = Number(range2.value);
    const points = Number(range3.value);
    const player = {
        position: position,
        threePercent: threePercent,
        twoPercent: twoPercent,
        points: points,
    };
    console.log(player);
    getPlayers(player);
});
//call founction
// getPlayers({
//     position: "C",
//     twoPercent: 20,
//     threePercent: 20,
//     points: 100,
// }).then((()=>console.log(p)));
saveTeam();
// loadTeam();
