

let body = document.querySelector("body")
let name = document.querySelector("#name")
let savedGames = document.querySelector("#savedGames")
let rules = document.querySelector("#rules")

let tablesOfSavedGames = []

//copy of a winning table
let table2

//black tile and numbers on level1
const blackTileSeven = [
    { x: 0, y: 3, v: 1},
    { x: 1, y: 1, v: 0},
    { x: 1, y: 5, v: 2},
    { x: 3, y: 0, v: -1},
    { x: 3, y: 3, v: -1},
    { x: 3, y: 6, v: -1},
    { x: 5, y: 1, v: -1},
    { x: 5, y: 5, v: 2},
    { x: 6, y: 3, v: 3},

]
//black tile and numbers on level2
const blackTileSevenInter = [
    { x: 0, y: 2, v: 0},
    { x: 0, y: 4, v: -1},
    { x: 2, y: 0, v: -1},
    { x: 2, y: 2, v: -1},
    { x: 2, y: 4, v: 3},
    { x: 2, y: 6, v: -1},
    { x: 3, y: 3, v: 1},
    { x: 4, y: 0, v: 2},
    { x: 4, y: 2, v: -1},
    { x: 4, y: 4, v: -1},
    { x: 4, y: 6, v: -1},
    { x: 6, y: 2, v: -1},
    { x: 6, y: 4, v: 2},
]
//black tile and numbers on level3
const blackTileTenExtreme = [
    { x: 0, y: 1, v: -1},
    { x: 1, y: 5, v: 3},
    { x: 1, y: 7, v: 2},
    { x: 1, y: 9, v: -1},
    { x: 2, y: 1, v: 0},
    { x: 2, y: 2, v: -1},
    { x: 2, y: 7, v: -1},
    { x: 3, y: 4, v: -1},
    { x: 4, y: 1, v: 1},
    { x: 4, y: 4, v: -1},
    { x: 4, y: 5, v: 1},
    { x: 4, y: 6, v: -1},
    { x: 5, y: 3, v: -1},
    { x: 5, y: 4, v: -1},
    { x: 5, y: 5, v: -1},
    { x: 5, y: 8, v: 3},
    { x: 6, y: 5, v: -1},
    { x: 7, y: 2, v: 1},
    { x: 7, y: 7, v: 0},
    { x: 7, y: 8, v: -1},
    { x: 8, y: 0, v: 3},
    { x: 8, y: 2, v: -1},
    { x: 8, y: 4, v: 0},
    { x: 9, y: 8, v: 0},
]

//timer
let timer
function time(sec) {
    timer = setInterval(() => {
        document.querySelector("p#timer").innerHTML = "Idő: " + sec + " mp"
        sec += 1
        // console.log(sec)
    },1000)
}
function pause() {
    clearInterval(timer)
}

//gets all the tiles which are numbered
function getNumberedTiles(m) {
    let numberedTile = []
    m.forEach(e => {
        if(e.v != -1){numberedTile.push(e)}
    })
    return numberedTile
}

//list of objects containing the black tiles that have numbers on them
let sevenNumbers = getNumberedTiles(blackTileSeven)
let sevenInterNumbers = getNumberedTiles(blackTileSevenInter)
let tenNumbers = getNumberedTiles(blackTileTenExtreme)


//checks if there are the correct amount of lights placed next to the black tiles that have numbers
function checkNumbers(level, table) {
    switch (level) {
        case "seven":
            sevenNumbers.forEach(e => {
                let target = e.v
                let counter = 0

                if(e.x -1 >= 0 && (table.rows[e.x-1].cells[e.y].style.backgroundColor === "orange" || table.rows[e.x-1].cells[e.y].style.backgroundColor === "red")) counter += 1
                if(e.x +1 <= 6 && (table.rows[e.x+1].cells[e.y].style.backgroundColor === "orange" || table.rows[e.x+1].cells[e.y].style.backgroundColor === "red")) counter += 1
                if(e.y -1 >= 0 && (table.rows[e.x].cells[e.y-1].style.backgroundColor === "orange" || table.rows[e.x].cells[e.y-1].style.backgroundColor === "red")) counter += 1
                if(e.y +1 <= 6 && (table.rows[e.x].cells[e.y+1].style.backgroundColor === "orange" || table.rows[e.x].cells[e.y+1].style.backgroundColor === "red")) counter += 1
                if(target === counter) {
                    table.rows[e.x].cells[e.y].style.color = "green"
                }
                else table.rows[e.x].cells[e.y].style.color = "red"
            })
            break;
        case "sevenInter":
            sevenInterNumbers.forEach(e => {
                let target = e.v
                let counter = 0

                if(e.x -1 >= 0 && (table.rows[e.x-1].cells[e.y].style.backgroundColor === "orange" || table.rows[e.x-1].cells[e.y].style.backgroundColor === "red")) counter += 1
                if(e.x +1 <= 6 && (table.rows[e.x+1].cells[e.y].style.backgroundColor === "orange" || table.rows[e.x+1].cells[e.y].style.backgroundColor === "red")) counter += 1
                if(e.y -1 >= 0 && (table.rows[e.x].cells[e.y-1].style.backgroundColor === "orange" || table.rows[e.x].cells[e.y-1].style.backgroundColor === "red")) counter += 1
                if(e.y +1 <= 6 && (table.rows[e.x].cells[e.y+1].style.backgroundColor === "orange" || table.rows[e.x].cells[e.y+1].style.backgroundColor === "red")) counter += 1
                if(target === counter) {
                    table.rows[e.x].cells[e.y].style.color = "green"
                }
                else table.rows[e.x].cells[e.y].style.color = "red"
            })
            break;
        default:
            tenNumbers.forEach(e => {
                let target = e.v
                let counter = 0

                if(e.x -1 >= 0 && (table.rows[e.x-1].cells[e.y].style.backgroundColor === "orange" || table.rows[e.x-1].cells[e.y].style.backgroundColor === "red")) counter += 1
                if(e.x +1 <= 9 && (table.rows[e.x+1].cells[e.y].style.backgroundColor === "orange" || table.rows[e.x+1].cells[e.y].style.backgroundColor === "red")) counter += 1
                if(e.y -1 >= 0 && (table.rows[e.x].cells[e.y-1].style.backgroundColor === "orange" || table.rows[e.x].cells[e.y-1].style.backgroundColor === "red")) counter += 1
                if(e.y +1 <= 9 && (table.rows[e.x].cells[e.y+1].style.backgroundColor === "orange" || table.rows[e.x].cells[e.y+1].style.backgroundColor === "red")) counter += 1
                if(target === counter) {
                    table.rows[e.x].cells[e.y].style.color = "green"
                }
                else table.rows[e.x].cells[e.y].style.color = "red"
            })
            break;
    }
}

//makes nxn table
//checks lights colliding
//adds lights
function generateTable(n, level){ 
    table = document.createElement("table")
    for(let i = 0; i < n; i++) {
        let row = document.createElement("tr")
        for(let j = 0; j < n; j++) {
            let index = j+1 + n*i
            let cell = document.createElement("td")
            cell.value = index
            cell.innerHTML = 0
            cell.style.color = "rgba(0,0,0,0.0)"
            row.append(cell)
        }
        table.append(row)
    }
    body.children[0].after(table)
    table.style.width = "auto"
    table.style.margin = "auto"
    let n1 = document.createElement("p")
    n1.setAttribute("id", "playerName")
    n1.style.textAlign = "center"
    n1.innerHTML = "Játékos: " + name.value
    table.after(n1)
    let t = document.createElement("p")
    t.style.textAlign = "center"
    t.setAttribute("id", "timer")
    time(1)
    t.innerHTML = "Idő: 0 mp"
    n1.after(t)
    //making lights clickable
    table.addEventListener("click", e => eventClickCell(e,n, level))
}

//handles everything to do with clicking the cells
function eventClickCell(e,n,level) {
    let i = e.target.parentNode.rowIndex
    let j = e.target.cellIndex
    //removing a light
    if(e.target.matches("td") && (e.target.style.backgroundColor === "orange" || e.target.style.backgroundColor === "red"))  {
        deleteAllDirections(table, i, j, n)
    }
    //adding a light
    else if(e.target.matches("td") && e.target.style.backgroundColor === "yellow") {

        e.target.style.backgroundColor = "red"
        colorAllDirections(table, i, j, n, "yellow", 50)
    }
    // else if(e.target.matches("td") && e.target.style.backgroundColor != "black" && e.target.style.backgroundColor === "" ) {
    else if(e.target.matches("td") && e.target.style.backgroundColor != "black") {
        e.target.style.backgroundColor = "orange"
        colorAllDirections(table, i, j, n, "yellow", 50)
    }
        
    checkNumbers(level, table)
}

//checks if the current solution is a winning one
function checkForWin(table, n, color) {
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            if(table.rows[i].cells[j].style.backgroundColor != color && table.rows[i].cells[j].style.backgroundColor != "black" && table.rows[i].cells[j].style.backgroundColor != "orange") return false
            if(table.rows[i].cells[j].style.backgroundColor === "black" && table.rows[i].cells[j].style.color === "red") return false
        }
    }
    return true
}

let maxtime
//adds lights in all directions
function colorAllDirections(table, i, j, n, color, animationSpeed) {
    let maxtime = animationSpeed
    let iH = table.rows[i].cells[j].innerHTML
    table.rows[i].cells[j].innerHTML = parseInt(iH) + 2
    //left
    let time = animationSpeed
    for(let left = j-1; left >= 0 && table.rows[i].cells[left].style.backgroundColor != "black" ; left--) {
        iH = table.rows[i].cells[left].innerHTML
        table.rows[i].cells[left].innerHTML = parseInt(iH) + 1
        setTimeout(() => {
            if(table.rows[i].cells[left].style.backgroundColor === "orange" || table.rows[i].cells[left].style.backgroundColor === "red"){
                table.rows[i].cells[left].style.backgroundColor = "red"
            }
            else table.rows[i].cells[left].style.backgroundColor = color
        }, time)
        time += animationSpeed
        if(time > maxtime) maxtime = time
    }
    //right
    time = animationSpeed
    for(let right = j+1; right < n && table.rows[i].cells[right].style.backgroundColor != "black"; right++) {
        iH = table.rows[i].cells[right].innerHTML
        table.rows[i].cells[right].innerHTML = parseInt(iH) + 1
        setTimeout(() => {
            if(table.rows[i].cells[right].style.backgroundColor === "orange" || table.rows[i].cells[right].style.backgroundColor === "red"){
                table.rows[i].cells[right].style.backgroundColor = "red"
            }
            else table.rows[i].cells[right].style.backgroundColor = color
        }, time)
        time += animationSpeed
        if(time > maxtime) maxtime = time
    }
    //up
    time = animationSpeed
    for(let up = i-1; up >= 0 && table.rows[up].cells[j].style.backgroundColor != "black"; up--) {
        iH = table.rows[up].cells[j].innerHTML
        table.rows[up].cells[j].innerHTML = parseInt(iH) + 1
        setTimeout(() => {
            if(table.rows[up].cells[j].style.backgroundColor === "orange" || table.rows[up].cells[j].style.backgroundColor === "red"){
                table.rows[up].cells[j].style.backgroundColor = "red"
            }
            else table.rows[up].cells[j].style.backgroundColor = color
        }, time)
        time += animationSpeed
        if(time > maxtime) maxtime = time
    }
    //down
    time = animationSpeed
    for(let down = i+1; down < n && table.rows[down].cells[j].style.backgroundColor != "black"; down++) {
        iH = table.rows[down].cells[j].innerHTML
        table.rows[down].cells[j].innerHTML = parseInt(iH) + 1
        setTimeout(() => {
            if(table.rows[down].cells[j].style.backgroundColor === "orange" || table.rows[down].cells[j].style.backgroundColor === "red"){
                table.rows[down].cells[j].style.backgroundColor = "red"
            }
            else table.rows[down].cells[j].style.backgroundColor = color
        }, time)
        time += animationSpeed
        if(time > maxtime) maxtime = time
    }
    setTimeout(() => {
        if(checkForWin(table, n, "yellow")) {
            pause()
            // console.log("WIN")
            let p = document.createElement("p")
            // p.innerHTML = "YOU WIN!"
            // p.style.color = "black"
            // p.setAttribute('id','winP');
            // p.style.padding = "0"
            // p.style.margin = "none"
            // p.style.fontSize = "12pt"
            // btnBack.after(p)
            body.lastChild.after(p)
            table2 = table.cloneNode(true)
            table2.setAttribute('id','table2');
            table.remove()
            body.children[0].after(table2)
            setTimeout(() => {
                alert("Nyertél!")
            }, 250)
        }
    }, maxtime + 1)
}

//removes lights in all directions
function deleteAllDirections(table, i, j, n) {
    let iH = table.rows[i].cells[j].innerHTML
    let c = table.rows[i].cells[j].backgroundColor
    table.rows[i].cells[j].innerHTML = parseInt(iH) - 2
    iH = table.rows[i].cells[j].innerHTML
    if(parseInt(iH) === 0) table.rows[i].cells[j].style.backgroundColor = ""
    else if(parseInt(iH) >= 1) table.rows[i].cells[j].style.backgroundColor = "yellow"
    //left
    for(let left = j-1; left >= 0 && table.rows[i].cells[left].style.backgroundColor != "black" ; left--) {
        iH = table.rows[i].cells[left].innerHTML
        table.rows[i].cells[left].innerHTML = parseInt(iH) - 1
        iH = table.rows[i].cells[left].innerHTML
        if(parseInt(iH) === 2 && c == "red") table.rows[i].cells[left].style.backgroundColor = "orange"
        else if(parseInt(iH) === 2 && table.rows[i].cells[left].style.backgroundColor == "yellow") {}
        else if(parseInt(iH) === 2) table.rows[i].cells[left].style.backgroundColor = "orange"
        else if (parseInt(iH) === 1) table.rows[i].cells[left].style.backgroundColor = "yellow"
        else if (parseInt(iH) === 0) table.rows[i].cells[left].style.backgroundColor = ""
    }
    //right
    for(let right = j+1; right < n && table.rows[i].cells[right].style.backgroundColor != "black"; right++) {
        iH = table.rows[i].cells[right].innerHTML
        table.rows[i].cells[right].innerHTML = parseInt(iH) - 1
        iH = table.rows[i].cells[right].innerHTML
        if(parseInt(iH) === 2 && c == "red") table.rows[i].cells[right].style.backgroundColor = "orange"
        else if(parseInt(iH) === 2 && table.rows[i].cells[right].style.backgroundColor == "yellow") {}
        else if(parseInt(iH) === 2) table.rows[i].cells[right].style.backgroundColor = "orange"
        else if (parseInt(iH) === 1) table.rows[i].cells[right].style.backgroundColor = "yellow"
        else if (parseInt(iH) === 0) table.rows[i].cells[right].style.backgroundColor = ""
    }
    //up
    for(let up = i-1; up >= 0 && table.rows[up].cells[j].style.backgroundColor != "black"; up--) {
        iH = table.rows[up].cells[j].innerHTML
        table.rows[up].cells[j].innerHTML = parseInt(iH) - 1
        iH = table.rows[up].cells[j].innerHTML
        if(parseInt(iH) === 2 && c == "red") table.rows[up].cells[j].style.backgroundColor = "orange"
        else if(parseInt(iH) === 2 && table.rows[up].cells[j].style.backgroundColor == "yellow") {}
        else if(parseInt(iH) === 2) table.rows[up].cells[j].style.backgroundColor = "orange"
        else if (parseInt(iH) === 1) table.rows[up].cells[j].style.backgroundColor = "yellow"
        else if (parseInt(iH) === 0) table.rows[up].cells[j].style.backgroundColor = ""
    }
    //down
    for(let down = i+1; down < n && table.rows[down].cells[j].style.backgroundColor != "black"; down++) {
        iH = table.rows[down].cells[j].innerHTML
        table.rows[down].cells[j].innerHTML = parseInt(iH) - 1
        iH = table.rows[down].cells[j].innerHTML
        stop = false
        if(parseInt(iH) === 2 && c == "red") table.rows[down].cells[j].style.backgroundColor = "orange"
        else if(parseInt(iH) === 2 && table.rows[down].cells[j].style.backgroundColor == "yellow") {}
        else if(parseInt(iH) === 2) table.rows[down].cells[j].style.backgroundColor = "orange"
        else if (parseInt(iH) === 1) table.rows[down].cells[j].style.backgroundColor = "yellow"
        else if (parseInt(iH) === 0) table.rows[down].cells[j].style.backgroundColor = ""
    }
    setTimeout(() => {
        if(checkForWin(table, n, "yellow")) {
            // console.log("WIN")
            pause()
            let p = document.createElement("p")
            // p.innerHTML = "YOU WIN!"
            // p.style.color = "black"
            // p.setAttribute('id','winP');
            // p.style.fontSize = "12pt"
            // body.append(p)
            table2 = table.cloneNode(true)
            table2.setAttribute('id','table2');
            table.remove()
            // btnBack.before(table2)
            body.children[0].after(table2)
            setTimeout(() => {
                alert("Nyertél!")
            }, 250)
        }
    }, maxtime + 1)
}

//fills the table with the appropriate black tiles
function generateNumbers(level) {
    if(level === "ten") {
        blackTileTenExtreme.forEach(tile => {
            if(tile.v != -1) {
                table.rows[tile.x].cells[tile.y].innerHTML = tile.v
            }
            else table.rows[tile.x].cells[tile.y].innerHTML = ""
            table.rows[tile.x].cells[tile.y].style.backgroundColor = "black"
            table.rows[tile.x].cells[tile.y].style.color = "white"
        })
    } else if (level === "sevenInter") {
        blackTileSevenInter.forEach(tile => {
            if(tile.v != -1) {
                table.rows[tile.x].cells[tile.y].innerHTML = tile.v
            }
            else table.rows[tile.x].cells[tile.y].innerHTML = ""
            table.rows[tile.x].cells[tile.y].style.backgroundColor = "black"
            table.rows[tile.x].cells[tile.y].style.color = "white"
        })
    } else {
        blackTileSeven.forEach(tile => {
            if(tile.v != -1) {
                table.rows[tile.x].cells[tile.y].innerHTML = tile.v
            }
            else table.rows[tile.x].cells[tile.y].innerHTML = ""
            table.rows[tile.x].cells[tile.y].style.backgroundColor = "black"
            table.rows[tile.x].cells[tile.y].style.color = "white"
        })
    }
}

//buttons for the 3 levels
let btn1 = document.querySelector("#btn1")
let btn2 = document.querySelector("#btn2")
let btn3 = document.querySelector("#btn3")
//buttons for going back to main screen and saving the game
let btnBack = document.querySelector("#back")
let btnSave = document.querySelector("#save")
let savedGamesP = document.querySelector("#savedGamesP")

//level of current game
let currentGame

//buttons for navigation
btn1.addEventListener("click", () => {
    if(name.value != ""){
        currentGame = "7x7"
        btn1.style.display = "none"
        btn2.style.display = "none"
        btn3.style.display = "none"
        rules.style.display = "none"
        generateTable(7, "seven")
        generateNumbers("seven")
        btnBack.style.display = "revert"
        btnSave.style.display = "revert"
        savedGamesP.style.display = "none"
        savedGames.style.display = "none"
        name.style.display = "none"
        name.value = ""
    } else alert("Töltsd ki a neved!")

})
btn2.addEventListener("click", () => {
    if(name.value != ""){
        currentGame = "7x7 haladó"
        btn1.style.display = "none"
        btn2.style.display = "none"
        btn3.style.display = "none"
        rules.style.display = "none"
        generateTable(7, "sevenInter")
        generateNumbers("sevenInter")
        btnBack.style.display = "revert"
        btnSave.style.display = "revert"
        savedGamesP.style.display = "none"
        savedGames.style.display = "none"
        name.style.display = "none"
        name.value = ""
    } else alert("Töltsd ki a neved!")
})
btn3.addEventListener("click", () => {
    if(name.value != ""){
        currentGame = "10x10 extrém"
        btn1.style.display = "none"
        btn2.style.display = "none"
        btn3.style.display = "none"
        rules.style.display = "none"
        generateTable(10, "ten")
        generateNumbers("ten")
        btnBack.style.display = "revert"
        btnSave.style.display = "revert"
        savedGamesP.style.display = "none"
        savedGames.style.display = "none"
        name.style.display = "none"
        name.value = ""
    } else alert("Töltsd ki a neved!")
})
btnBack.addEventListener("click", () => {
    btn1.style.display = "revert"
    btn2.style.display = "revert"
    btn3.style.display = "revert"
    table.style.display = "none"
    btnBack.style.display = "none"
    btnSave.style.display = "none"
    rules.style.display = "revert"
    if(localStorage.length != 0) {
        savedGamesP.style.display = "revert"
        savedGames.style.display = "table"
    }
    name.style.display = "revert"
    name.value = ""
    table.remove()
    pause()
    if(document.querySelector("p#timer")) document.querySelector("p#timer").remove()
    if(document.querySelector("p#playerName")) document.querySelector("p#playerName").remove()
    if(document.querySelector("#table2")) table2.remove()
    if(document.querySelector("#winP")) document.querySelector("#winP").remove()
})
btnSave.addEventListener("click", () => {
    let row = document.createElement("tr")
    let nameOfLevel = document.createElement("td")
    nameOfLevel.innerHTML = currentGame
    row.append(nameOfLevel)
    let nameOfPlayer = document.createElement("td")
    nameOfPlayer.innerHTML = document.querySelector("#playerName").innerHTML.substring(8,)
    row.append(nameOfPlayer)
    let timeOfGame = document.createElement("td")
    timeOfGame.innerHTML = document.querySelector("p#timer").innerHTML.substring(5,)
    row.append(timeOfGame)
    // savedGames.lastChild.append(row)
    // savedGames.prepend(row)
    savedGames.children[0].after(row)
    tablesOfSavedGames.push(table)
    let gameSave =    
        {
            table : table.outerHTML, 
            game : currentGame, 
            name : document.querySelector("#playerName").innerHTML.substring(8,), 
            time : document.querySelector("p#timer").innerHTML.substring(5,),
            // win : checkForWin(table, table.rows.length, "yellow")
        }

    localStorage.setItem(localStorage.length+1, JSON.stringify(gameSave))
    // console.log(tablesOfSavedGames)
})

window.addEventListener("load", () =>{
        if(localStorage.length === 0) {
            document.querySelector("#savedGamesP").style.display = "none"
            document.querySelector("#savedGames").style.display = "none"
            console.log("hello")
        }
        for(let i = 0; i < localStorage.length; i++){
            let row = document.createElement("tr")
            let nameOfLevel = document.createElement("td")
            nameOfLevel.innerHTML = JSON.parse(localStorage.getItem(i+1)).game
            row.append(nameOfLevel)
            let nameOfPlayer = document.createElement("td")
            nameOfPlayer.innerHTML = JSON.parse(localStorage.getItem(i+1)).name
            row.append(nameOfPlayer)
            let timeOfGame = document.createElement("td")
            timeOfGame.innerHTML = JSON.parse(localStorage.getItem(i+1)).time
            row.append(timeOfGame)
            // savedGames.lastChild.append(row)
            savedGames.children[0].after(row)
        }
})

//restarting saved games
savedGames.addEventListener("click", (e) => {
    if(e.target.matches("td") && e.target.parentNode.rowIndex != 0) {
        rules.style.display = "none"
        // console.log(localStorage.length-e.target.parentNode.rowIndex+1)
        let i = localStorage.length-e.target.parentNode.rowIndex+1
        const temp = document.createElement('div')
        // console.log(JSON.parse(localStorage.getItem(i)).win)
        table = document.createElement("table")
        temp.innerHTML = JSON.parse(localStorage.getItem(i)).table
        table = temp.children[0]
        body.children[0].after(table)
        table.style.width = "auto"
        table.style.margin = "auto"
        let n1 = document.createElement("p")
        n1.style.textAlign = "center"
        n1.setAttribute("id", "playerName")
        n1.innerHTML = "Játékos: " + JSON.parse(localStorage.getItem(i)).name
        table.after(n1)
        let t = document.createElement("p")
        t.style.textAlign = "center"
        t.setAttribute("id", "timer")
        let s = JSON.parse(localStorage.getItem(i)).time
        t.innerHTML = "Idő: " + s
        n1.after(t)
        let s1 = ""
        for(let i = 0; i < s.length && s[i] != " "; i++){
            s1 = s1 + s[i]
        }
        // time(parseInt(s1)+1)
        if(JSON.parse(localStorage.getItem(i)).game === "7x7" && !checkForWin(table, table.rows.length, "yellow")){
            table.addEventListener("click", e => eventClickCell(e,table.rows.length, "seven"))
            time(parseInt(s1)+1)
            n1.after(t)
            currentGame = "7x7"
        } else if (JSON.parse(localStorage.getItem(i)).game === "7x7 haladó" && !checkForWin(table, table.rows.length, "yellow")) {
            table.addEventListener("click", e => eventClickCell(e,table.rows.length, "sevenInter"))
            time(parseInt(s1)+1)
            n1.after(t)
            currentGame = "7x7 haladó"
        } else if(!checkForWin(table, table.rows.length, "yellow")){
            table.addEventListener("click", e => eventClickCell(e,table.rows.length, "ten"))
            time(parseInt(s1)+1)
            n1.after(t)
            currentGame = "10x10 extrém"
        }
        // console.log(s)
        // console.log(s1)
        btn1.style.display = "none"
        btn2.style.display = "none"
        btn3.style.display = "none"
        btnBack.style.display = "revert"
        btnSave.style.display = "revert"
        savedGamesP.style.display = "none"
        savedGames.style.display = "none"
        name.style.display = "none"
        name.value = ""
    }
})
