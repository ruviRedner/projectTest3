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
let team = {};
//elements
const divPG = document.querySelector(".pg");
const divSG = document.querySelector(".sg");
const divSF = document.querySelector(".sf");
const divPF = document.querySelector(".pf");
const divC = document.querySelector(".c");
console.log(divC, divPF, divSG, divPG, divSF);
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
// function to load team from local storage
const loadTeam = () => {
    const savedTeam = localStorage.getItem("team");
    if (savedTeam) {
        team = JSON.parse(savedTeam);
        Object.keys(team).forEach(pos => {
            switch (pos) {
                case "PG":
                    divPG.innerHTML = `<h1>Point Guard</h1>${team[pos].playerName}threePersent:${team[pos].threePercent}% twoPercent:${team[pos].twoPercent}%  points:${team[pos].points} `;
                    // divPG.textContent = `${team[pos].playerName}  ${team[pos].points}  ${team[pos].threePercent} ${team[pos].twoPercent}  ${team[pos].points} `;
                    break;
                case "SG":
                    divSG.innerHTML = `<h1>Shooting Guard</h1>${team[pos].playerName}threePersent:${team[pos].threePercent}% twoPercent:${team[pos].twoPercent}%  points:${team[pos].points} `;
                    break;
                case "SF":
                    divSF.innerHTML = `<h1>Small Forward</h1>${team[pos].playerName}threePersent:${team[pos].threePercent}% twoPercent:${team[pos].twoPercent}%  points:${team[pos].points} `;
                    break;
                case "PF":
                    divPF.innerHTML = `<h1>Power Forward</h1>${team[pos].playerName}threePersent:${team[pos].threePercent}% twoPercent:${team[pos].twoPercent}%  points:${team[pos].points} `;
                    break;
                case "C":
                    divC.innerHTML = `<h1>Center</h1>${team[pos].playerName}threePersent:${team[pos].threePercent}% twoPercent:${team[pos].twoPercent}%  points:${team[pos].points} `;
                    break;
            }
        });
    }
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
        const playersRes = yield res.json();
        displayPlayers(playersRes);
    }
    catch (err) {
        console.error(err);
    }
});
// founction to display players in the table
const displayPlayers = (playersRes) => {
    playersTable.innerHTML = "";
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
    });
};
// function to add player to current team
const AddPlayer = (index) => {
    const selectedPlayer = playersTable.rows[index].cells;
    const player = {
        playerName: selectedPlayer[0].textContent,
        position: selectedPlayer[1].textContent,
        points: parseInt(selectedPlayer[2].textContent),
        twoPercent: parseFloat(selectedPlayer[3].textContent),
        threePercent: parseFloat(selectedPlayer[4].textContent),
    };
    switch (player.position) {
        case "PG":
            divPG.innerHTML = `<h1>Point Guard</h1>${player.playerName}threePersent:${player.threePercent}% twoPercent:${player.twoPercent}%  points:${player.points} `;
            break;
        case "SG":
            divSG.innerHTML = `<h1>Shooting Guard</h1>${player.playerName}threePersent:${player.threePercent}% twoPercent:${player.twoPercent}%  points:${player.points} `;
            break;
        case "SF":
            divSF.innerHTML = `<h1>Small Forward</h1>${player.playerName}threePersent:${player.threePercent}% twoPercent:${player.twoPercent}%  points:${player.points} `;
            break;
        case "PF":
            divPF.innerHTML = `<h1>Power Forward</h1>${player.playerName}threePersent:${player.threePercent}% twoPercent:${player.twoPercent}%  points:${player.points} `;
            break;
        case "C":
            divC.innerHTML = `<h1>Center</h1>${player.playerName}threePersent:${player.threePercent}% twoPercent:${player.twoPercent}%  points:${player.points} `;
            break;
    }
    team[player.position] = player;
    localStorage.setItem("team", JSON.stringify(team));
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
window.onload = loadTeam;
