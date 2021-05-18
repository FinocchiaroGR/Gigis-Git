const file_system = require('fs');
const arr = [
    {//1
    programa: 9,
    participantes: [6,7,8,11,12,14,15,20,22,24,27,29,31,33,35,38,42,45,48,49,51,54,59,61,62,65,66,70,71,79,81,82,86,88,91,92,93],
    grupo: 14,
    niveles: [14, 25, 26],
    primObj: [     1,    129,    134],
    cantObj: [    13,      5,      5],
    ciclo: 10,
    maxPunt: 5
    },
    {//2
    programa: 5,
    participantes: [86,46,54,50,31,71,34,95,51,48,23,26,22,45,7,63,14,29],
    grupo: 8,
    niveles: [8, 23],
    primObj: [    14,    119],
    cantObj: [     5,      5],
    ciclo: 10,
    maxPunt: 5
    },
    {//3
    programa: 12,
    participantes: [6,29,30,91,14,11,27],
    grupo: 17,
    niveles: [17],
    primObj: [    19],
    cantObj: [     5],
    ciclo: 10,
    maxPunt: 4
    },
    {//4
    programa: 13,
    participantes: [10,18,24,33,45,46,51,56,61,65,75,78,83,85,96,101,102],
    grupo: 18,
    niveles: [18],
    primObj: [    24],
    cantObj: [     5],
    ciclo: 10,
    maxPunt: 4
    },
    {//5
    programa: 2,
    participantes: [12,92,22,66,45,88,6,29,14,11,27],
    grupo: 5,
    niveles: [5],
    primObj: [    29],
    cantObj: [     5],
    ciclo: 10,
    maxPunt: 4
    },
    {//6
    programa: 4,
    participantes: [2,5,25,40,43,44,55,56,67,78,89,90,98,94,77,76,96,60,13,57,99],
    grupo: 7,
    niveles: [7],
    primObj: [    34],
    cantObj: [     5],
    ciclo: 10,
    maxPunt: 4
    },
    {//7
    programa: 11,
    participantes: [3,27,33,62,14,11,2],
    grupo: 16,
    niveles: [16],
    primObj: [    39],
    cantObj: [     5],
    ciclo: 10,
    maxPunt: 4
    },
    {//8
    programa: 3,
    participantes: [48,85,16,81,53,32,60,64,83],
    grupo: 6,
    niveles: [6],
    primObj: [    44],
    cantObj: [     5],
    ciclo: 10,
    maxPunt: 4
    },
    {//9
    programa: 10,
    participantes: [44,63,53,82,25,95,55,94,56,86,78,83,5,21,97,32,90,40,15],
    grupo: 15,
    niveles: [15],
    primObj: [    49],
    cantObj: [     5],
    ciclo: 10,
    maxPunt: 4
    },
    {//10
    programa: 1,
    participantes: [25,63,78,90,5,39,43,51,56,82,21],
    grupo: 1,
    niveles: [1,2,3,4],
    primObj: [    54,    59,    64,    69],
    cantObj: [     5,     5,     5,     5],
    ciclo: 10,
    maxPunt: 4
    },
    {//11
    programa: 1,
    participantes: [46,86,2,54,30,50,71,79,101,24],
    grupo: 2,
    niveles: [1,2,3,4],
    primObj: [    54,    59,    64,    69],
    cantObj: [     5,     5,     5,     5],
    ciclo: 10,
    maxPunt: 4
    },
    {//12
    programa: 1,
    participantes: [33,18,8,37,72,78,51,81,47,49],
    grupo: 3,
    niveles: [1,2,3,4],
    primObj: [    54,    59,    64,    69],
    cantObj: [     5,     5,     5,     5],
    ciclo: 10,
    maxPunt: 4
    },
    {//13
    programa: 1,
    participantes: [28,91,14,45,53,33,75,6,59,26,10],
    grupo: 4,
    niveles: [1,2,3,4],
    primObj: [    54,    59,    64,    69],
    cantObj: [     5,     5,     5,     5],
    ciclo: 10,
    maxPunt: 4
    },
    {//14
    programa: 19,
    participantes: [91,62,63,14,29,20,38,40,49],
    grupo: 19,
    niveles: [19],
    primObj: [    74],
    cantObj: [     5],
    ciclo: 10,
    cantObj: 5,
    maxPunt: 4
    },
    {//15
    programa: 6,
    participantes: [1,6,7,8,9,10,11,14,15,17,18,19,20,23,24,26,27,28,29,30],
    grupo: 9,
    niveles: [09,10,20],
    primObj: [    79,    84,    89],
    cantObj: [     5,     5,     5],
    ciclo: 10,
    maxPunt: 4
    },
    {//16
    programa: 6,
    participantes: [31,33,35,37,41,42,45,46,47,48,49,50,53,54,58,59,61,62,63],
    grupo: 10,
    niveles: [09,10,20],
    primObj: [    79,    84,    89],
    cantObj: [     5,     5,     5],
    ciclo: 10,
    maxPunt: 4
    },
    {//17
    programa: 6,
    participantes: [65,66,68,70,71,72,73,74,75,80,82,83,86,87,91,92,93,95,97],
    grupo: 20,
    niveles: [09,10,20],
    primObj: [    79,    84,    89],
    cantObj: [     5,     5,     5],
    ciclo: 10,
    maxPunt: 4
    },
    {//18
    programa: 8,
    participantes: [14,15,18,17,24,31,39,80,45,46,50,54,61,71,72,74,82],
    grupo: 13,
    niveles: [13,23],
    primObj: [    94,   119],
    cantObj: [     5,     5],
    ciclo: 10,
    cantObj: 5,
    maxPunt: 4
    },
    {//19
    programa: 7,
    participantes: [1,6,7,8,10,11,14,15,20,23,27,28,29,33,41,45,47,48,51],
    grupo: 11,
    niveles: [11,12,21,22],
    primObj: [    99,   104,   109,   114],
    cantObj: [     5,     5,     5,     5],
    ciclo: 10,
    maxPunt: 5
    },
    {//20
    programa: 7,
    participantes: [53,59,62,63,65,66,68,70,73,74,75,80,81,87,91,93,95],
    grupo: 12,
    niveles: [11,12,21,22],
    primObj: [    99,   104,   109,   114],
    cantObj: [     5,     5,     5,     5],
    ciclo: 10,
    maxPunt: 4
    },
    {//21
    programa: 1,
    participantes: [33,18,8,37,72,78,51,81,47,49,26],
    grupo: 21,
    niveles: [1,2,3,4],
    primObj: [    54,    59,    64,    69],
    cantObj: [     5,     5,     5,     5],
    ciclo: 11,
    maxPunt: 4
    },
    {//22
    programa: 1,
    participantes: [52,59,62,63,65,66,69,70,73,74,75,80,84,87,91,93,95],
    grupo: 22,
    niveles: [1,2,3,4],
    primObj: [    54,    59,    64,    69],
    cantObj: [     5,     5,     5,     5],
    ciclo: 11,
    maxPunt: 4
    }
];

const archivo = "./Participantes_Grupos_Objetivos3.csv";

for(let dato of arr){
    let k = 0;
    for(let participante of dato.participantes){
        for(let numObj = dato.primObj[k]; numObj < dato.primObj[k] + dato.cantObj[k]; numObj++){
            let antePart = "";
            /*let anteObj = "";

            if (numObj < 10){
                anteObj = "O00"
            } else if(numObj < 100){
                anteObj = "O0"
            }else{
                anteObj = "O"
            }*/

            if(participante < 10){
                antePart = "correo00";
            }else if(participante < 100){
                antePart = "correo0";
            }else{
                antePart = "correo";
            }

            let numRand2 = Math.round(Math.random() * (dato.maxPunt-1)) + 1;
            let numRand1 = menorRand(numRand2, dato.maxPunt);
            let nivel = dato.niveles[k];

            let registro = antePart + participante + "," + dato.grupo + "," + nivel + "," + /*anteObj +*/ numObj + "," + numRand1 + "," + numRand2 + "\n";
            file_system.writeFileSync(archivo, registro,{encoding: "utf8",flag: "a+"});
        }
        k++;
        if(k%dato.niveles.length === 0){
            k=0;
        }
    }
}

function menorRand(numMayor, max){
    let numMenor = Math.floor(Math.random() * (max-1)) + 1;
    if(numMenor > numMayor)
        return menorRand(numMayor, max);
    else
        return numMenor;
}