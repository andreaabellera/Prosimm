let currView = "nav-my-tasks"
let currProject = "project0"
let today = 9 // Assume today is March 9 for due warnings
let user = "Andrea Abellera"
let city = "Winnipeg"
let email = "email_address@domain.com"
let phone = "+1(204)444-4444"

let andrea = [ // Progress, Task Names, Task Dues
    ["IP","IP","IP","NS"],
    ["Finish report", "Annotated outline", "Lab writeup", "Prosimm team meeting"],
    ["9 MAR", "10 MAR", "11 MAR", "14 MAR"]
]

let yuhan = [
    ["IP","IP","NS","NS","NS"],
    ["Buy giftcards", "Interview with Ghub", "Interview conclusions", "Prosimm icon set", "Prosimm logo"],
    ["7 MAR", "9 MAR", "11 MAR", "12 MAR", "14 MAR"]
]

let lyka = [
    ["IP","IP","NS"],
    ["Interview with Maya", "Interview notes", "Get college respondent"],
    ["9 MAR", "12 MAR", "14 MAR"]
]

let jane = [[],[],[]] // Jane has no tasks and can steal

let team = [andrea, yuhan, lyka, jane]

let befores = []
let afters = []

// endl me now
let barEnds = [60, 80, 40, 0]
let sbarEnds = [40, 30, 30, 0]

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("h-left")
    const add = document.getElementById("h-right")
    const navs = document.getElementsByClassName("nav-box")
    const navbar = document.getElementById("navigation")
    const content = document.getElementById("content")
    const body = document.getElementById("body")

    // Load landing view
    updateView();
    
    for(let nav of navs){
        nav.addEventListener("click", function f(e) {
            clearActive()
            e.currentTarget.classList.add("nav-active")
            currView = e.currentTarget.id
            updateView()
        });
    }

    header.addEventListener("click", function f(e) {
        navbar.style.display = "none"
        currView = "nav-projects"
        updateView()
    });

    add.addEventListener("click", function f(e) {
        if(currView == "nav-my-tasks")
            body.appendChild(taskModal("ADD NEW TASK"))
        else if(currView == "nav-team-tasks")
            body.appendChild(taskModal("ADD NEW TASK", false, true))
        else if(currView == "nav-journals")
            body.appendChild(journalModal("ADD NEW JOURNAL"))
        else if(currView == "nav-my-team")
            body.appendChild(inviteModal("INVITE TEAMMATE"))
        else if(currView == "nav-projects")
            body.appendChild(projectModal("ADD NEW PROJECT"))
    });

    function updateView(){
        content.innerHTML = ""
        add.style.display="block"
        if(currView == "nav-my-tasks")
            loadMyTasks()
        else if(currView == "nav-team-tasks"){
            loadTeamTasks()

            // Animate bars
            let bars = []
            let sbars = []
            for(let i=0; i<team.length; i++){
                bars.push(document.getElementById("bar" + i))
                sbars.push(document.getElementById("sbar" + i))
            }

            for (let i in bars){
                let endH = barEnds[i]
                var id = setInterval(frame, 80);
                var pos = 100;
                function frame() {
                    if (pos < endH) {
                        clearInterval(id);
                        bars[i].style.height = endH + "%";
                    } else {
                        pos--;
                        bars[i].style.height = pos + "%";
                    }
                }
            }
            for (let i in sbars){
                let endH = sbarEnds[i]
                var id = setInterval(frame, 80);
                var pos = 100;
                function frame() {
                    if (pos < endH) {
                        clearInterval(id);
                        sbars[i].style.height = endH + "%";
                    } else {
                        pos--;
                        sbars[i].style.height = pos + "%";
                    }
                }
            }

            // Add selection to teammate icons
            let icons = document.getElementsByClassName("overlay")
            for(let icon of icons){
                icon.addEventListener("click", function f(e) { 
                    let id = e.currentTarget.id
                    let num = id[id.length-1]
                    selectorId = "selector" + num

                    // Clear selectors
                    let selectors = document.getElementsByClassName("team-array-selector")
                    for(let selector of selectors){
                        selector.classList.remove("teammate-selected")
                    }

                    // Add selection
                    document.getElementById(selectorId).classList.add("teammate-selected")
                    loadTeammateTasks(num)
                });
            }
        }
        else if(currView == "nav-journals")
            loadJournals()
        else if(currView == "nav-my-team"){
            loadMyTeam()
            let helpBtns = document.getElementsByClassName("help-btn")
            for(let btn of helpBtns){
                btn.addEventListener("click", function f(e) {
                    var parent = btn.parentElement
                    var name = parent.getElementsByClassName("teammate-name")[0].innerText
                    alert("Asking for "+ name +" for help")
                });
            }
        }
        else if(currView == "nav-profile"){
            loadProfile()
            add.style.display="none"
            let fields = document.getElementsByTagName("input")
            let fillers = [user, email, city, phone]
            for(let i in fields){
                fields[i].value = fillers[i]
            }
            document.getElementById("save-changes").addEventListener("click", function f(e) {
                user = document.getElementById("set-name").value
                console.log(user)
                city = document.getElementById("set-city").value
                email = document.getElementById("set-email").value
                phone = document.getElementById("set-phone").value
                alert("Profile saved")
            });
        }
        else if(currView == "nav-projects")
            loadProjects()
    }

    function clearActive(){
        for(let nav of navs)
            nav.classList.remove("nav-active")
    }
    
      /*=================
      I.  LOADERS
      ==================*/
    function loadMyTasks(){
        let heading = document.createElement("div")
        heading.classList.add("heading")
        heading.innerText = "INDIVIDUAL TASKS"
        content.appendChild(heading)
        
        // Create placeholder tasks
        let taskNames = ["Finish report", "Annotated outline", "Lab writeup", "Prosimm team meeting"]
        let taskDues = ["9 MAR", "10 MAR", "11 MAR", "14 MAR"]
        for(let i in taskNames)
            content.appendChild(taskCardCreator(taskNames[i], taskDues[i]))

        let delBtn = document.createElement("button")
        delBtn.id = "del-btn"
        delBtn.innerText = "Delete selected tasks"
        delBtn.addEventListener("click", function f(e) {
            let view = document.getElementById("content")
            let cards = view.getElementsByClassName("greyed")
            while(cards.length > 0){
                for(let card of cards)
                    card.parentElement.parentElement.innerHTML = ""
                cards = view.getElementsByClassName("greyed")
            }
        });
        content.appendChild(delBtn)
    }
    
    function loadTeamTasks(){
        // HELP ME I AM VERY UGLY AND I NEED TO FIX THIS
        content.innerHTML = `
            <div class="notcard"> 
                <div class="card-box team-progress">
                    <div class="team-array team-bars">
                        <div class="team-array-bar"><div id="sbar0" class="subbar"></div><div id="bar0" class="bar"></div></div>
                        <div class="team-array-bar"><div id="sbar1" class="subbar"></div><div id="bar1" class="bar"></div></div>
                        <div class="team-array-bar"><div id="sbar2" class="subbar"></div><div id="bar2" class="bar"></div></div>
                        <div class="team-array-bar"></div>
                    </div>
                    <div class="team-array team-icons">
                        <div class="team-array-icon"><div id="teammate0" class="overlay"></div></div>
                        <div class="team-array-icon"><div id="teammate1" class="overlay"></div></div>
                        <div class="team-array-icon"><div id="teammate2" class="overlay"></div></div>
                        <div class="team-array-icon"><div id="teammate3" class="overlay"></div></div>
                    </div>
                    <div class="team-array team-selects">
                        <div id="selector0" class="team-array-selector teammate-selected"></div>
                        <div id="selector1" class="team-array-selector"></div>
                        <div id="selector2" class="team-array-selector"></div>
                        <div id="selector3" class="team-array-selector"></div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-box card-ttask">
                    <div class="task-status in-progress"></div>
                    <div class="task-info">
                        <div class="task-title"> Finish report </div>
                        <div class="impending"> Due today </div>
                    </div>
                    <div class="task-due">
                        <div class="due-day"> 9 </div>
                        <div class="due-month"> MAR </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-box card-ttask">
                    <div class="task-status in-progress"></div>
                    <div class="task-info">
                        <div class="task-title"> Annotated outline </div>
                        <div class="impending"> Due in 1 day </div>
                    </div>
                    <div class="task-due">
                        <div class="due-day"> 10 </div>
                        <div class="due-month"> MAR </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-box card-ttask">
                    <div class="task-status in-progress"></div>
                    <div class="task-info">
                        <div class="task-title"> Lab writeup </div>
                        <div class="impending"> Due in 2 days </div>
                    </div>
                    <div class="task-due">
                        <div class="due-day"> 11 </div>
                        <div class="due-month"> MAR </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-box card-ttask">
                    <div class="task-status unstarted"></div>
                    <div class="task-info">
                        <div class="task-title"> Prosimm team meeting </div>
                    </div>
                    <div class="task-due">
                        <div class="due-day"> 14 </div>
                        <div class="due-month"> MAR </div>
                    </div>
                </div>
            </div>
        `
    }

    function loadTeammateTasks(num){
        let currCards = document.getElementsByClassName("card")
        while(currCards.length > 0){
            for(card of currCards)
                card.parentElement.removeChild(card)
            currCards = document.getElementsByClassName("card")
        }
        if(team[num][0].length == 0){ // IT IS A JANE!!!
            befores = []
            afters = []
            let bars = document.getElementsByClassName("team-array-bar")
            let lastBar = bars[bars.length - 1]
            lastBar.innerHTML = ""
            let stealC = document.createElement("div")
            stealC.classList.add("card")
            stealC.id="steal-card"
            let stealInfo = document.createElement("div")
            stealInfo.classList.add("card-box")
            stealInfo.id="steal-info"
            stealInfo.innerHTML = "No tasks left.<br><b>Steal a task?</b>"
            stealC.appendChild(stealInfo)
            content.appendChild(stealC)

            // Get suggested tasks
            for(let mate of team){
                let statuses = mate[0]
                for(let s in statuses){
                    if(statuses[s] == "NS"){
                        content.appendChild(ttaskCardCreator(statuses[s], mate[1][s], mate[2][s], true))
                    }
                }
            }
        }
        else{
            for(let item in team[num][0]){
                let status = team[num][0][item]
                let task = team[num][1][item]
                let due = team[num][2][item]
                content.appendChild(ttaskCardCreator(status, task, due))
            }
        }
    }
    
    function loadJournals(){
        content.innerHTML = `<div class="heading"> JOURNAL ENTRIES </div>`

        // Create placeholder journals
        let teammates = ["Jane Tang", user]
        let acts = ["finished a task", "editted a task"]
        let messages = ["Woohoo yay", "Give me one more day to fix the bugs"]
        let dates = ["March 5", "March 6"]
        for(let i in teammates){
            content.insertBefore(journalCardCreator(teammates[i], acts[i], messages[i], dates[i]), document.getElementsByClassName("heading")[0])
            content.insertBefore(document.getElementsByClassName("heading")[0], document.getElementsByClassName("card")[0])
        }
    }
    
    function loadMyTeam(){
        content.innerHTML = `
            <div class="card">
                <div class="card-box card-task">
                    <div class="teammate-pfp"><div id="teammate0" class="overlay"></div></div>
                    <div class="teammate-info">
                        <div class="teammate-name"> ${user} </div>
                        <div class="teammate-city greyed"> ${city} | 8:03pm</div>
                        <div class="teammate-email"> ${email} </div>
                        <div class="teammate-phone"> ${phone} </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-box card-task">
                    <div class="teammate-pfp"><div id="teammate1" class="overlay"></div></div>
                    <div class="teammate-info">
                        <div class="teammate-name"> Yu Han </div>
                        <div class="teammate-city greyed"> Beijing | 9:03am</div>
                        <div class="teammate-email"> email_address@domain.com </div>
                        <div class="teammate-phone"> +1(204)555-5555 </div>
                    </div>
                    <div class="help-btn"></div>
                </div>
            </div>
            <div class="card">
                <div class="card-box card-task">
                    <div class="teammate-pfp"><div id="teammate2" class="overlay"></div></div>
                    <div class="teammate-info">
                        <div class="teammate-name"> Lyka Sal-long </div>
                        <div class="teammate-city greyed"> Manila | 9:03am</div>
                        <div class="teammate-email"> email_address@domain.com </div>
                        <div class="teammate-phone"> +1(204)777-7777 </div>
                    </div>
                    <div class="help-btn"></div>
                </div>
                <div class="card">
                    <div class="card-box card-task">
                        <div class="teammate-pfp"><div id="teammate3" class="overlay"></div></div>
                        <div class="teammate-info">
                            <div class="teammate-name"> Jane Tang </div>
                            <div class="teammate-city greyed"> Hanoi | 8:03am</div>
                            <div class="teammate-email"> email_address@domain.com </div>
                            <div class="teammate-phone"> +1(204)888-8888 </div>
                        </div>
                        <div class="help-btn"></div>
                    </div>
                </div>
            </div>
        `
    }
    
    function loadProfile(){
        content.innerHTML = `
            <div class="card">
                <div class="card-box card-profile">
                    <div id="setting-name" class="setting-icon"></div>
                    <input id="set-name" placeholder="Full Name">
                </div>
                <div class="card-box card-profile">
                    <div id="setting-email" class="setting-icon"></div>
                    <input id="set-email" placeholder="Email Address">
                </div>
                <div class="card-box card-profile">
                    <div id="setting-time" class="setting-icon"></div>
                    <input id="set-city" placeholder="City">
                </div>
                <div class="card-box card-profile">
                    <div id="setting-avail" class="setting-icon"></div>
                    <input id="set-phone" placeholder="Phone number">
                </div>
            </div>
            <div id="save-changes" class="heading"> SAVE CHANGES </div>
        `
    }
    
    function loadProjects(){
        content.innerHTML = ""
        let projNames = ["HCI 2", "MISA merch project", "Club room renovation"]
        let projDues = ["March 28", "April 16", "June 23"]

        for(let i in projNames){
            let card = document.createElement("div")
            card.classList.add("card")
            card.id = "project" + i
            card.innerHTML = `
                <div class="card-box card-project">
                    <div id="pie${i}" class="pie"></div>
                    <div class="project-info">
                        <div class="project-name"> ${projNames[i]} </div>
                        <div class="project-desc"> Next milestone due: </div>
                        <div class="project-due impending"> ${projDues[i]} </div>
                    </div>
                </div>
            `
            card.addEventListener("click", function f(e){
                currProject = e.currentTarget.id
                navbar.style.display = "grid"
                clearActive();
                document.getElementById("nav-my-tasks").classList.add("nav-active")
                currView = "nav-my-tasks"
                updateView()
            })
            content.appendChild(card)
        }
        getCurrProject()
    }

    function getCurrProject(){
        let p = document.getElementById(currProject)
        p.getElementsByClassName("card-box")[0].classList.add("project-select")
    }

    function getDueMessage(deadline){
        let diff = deadline - today
        if(diff < 0)
            return "Overdue by " + Math.abs(diff) + " days"
        else if(diff == 0)
            return "Due today"
        else if(diff < 4)
            return "Due in " + diff + " days"
        else
            return ""
    }

    /*=================
    II. CARD CREATORS
    ==================*/

    function taskCardCreator(name,dueDate){
        let card = document.createElement("div")
            card.classList.add("card")
            
                let cardInner = document.createElement("div")
                cardInner.classList.add("card-box")
                cardInner.classList.add("card-task")

                    let checkbox = document.createElement("div")
                    checkbox.classList.add("task-checkbox")
                    checkbox.addEventListener("click", function f(e) { // When you click the beautiful box
                        let haveSomething = (e.currentTarget.innerHTML == "") ? false : true
                        let theCard = e.currentTarget.parentElement
                        if(haveSomething){ // untick
                            e.currentTarget.innerHTML = ""
                            theCard.getElementsByClassName("task-info")[0].classList.remove("strike")
                            theCard.getElementsByClassName("task-due")[0].classList.remove("greyed")
                        }
                        else{ // tick
                            e.currentTarget.innerHTML = `<div class="tick"></div>`
                            theCard.getElementsByClassName("task-info")[0].classList.add("strike")
                            theCard.getElementsByClassName("task-due")[0].classList.add("greyed")
                        }
                    });

                    let due = document.createElement("div")
                    due.classList.add("task-due")
                    let toks = dueDate.split(" ")
                    due.innerHTML = `<div class="due-day"> ${toks[0]} </div>
                    <div class="due-month"> ${toks[1]} </div>`

                    let info = document.createElement("div")
                    info.classList.add("task-info")
                    info.innerHTML = `<div class="task-title"> ${name} </div>
                                    <div class="impending"> ${getDueMessage(toks[0])} </div>`
                    info.addEventListener("click", function f(e) {
                        body.appendChild(taskModal("EDIT TASK", true,false,e.currentTarget.parentElement.parentElement))
                    });

                cardInner.appendChild(checkbox)
                cardInner.appendChild(info)
                cardInner.appendChild(due)

            card.appendChild(cardInner)
            return card
    }

    function ttaskCardCreator(status, name, due, stealing=false){
        let card = document.createElement("div")
            card.classList.add("card")
            
                let cardInner = document.createElement("div")
                cardInner.classList.add("card-box")
                cardInner.classList.add("card-ttask")

                    let taskStatus = document.createElement("div")
                    taskStatus.classList.add("task-status")
                    switch(status){
                        case "NS": taskStatus.classList.add("unstarted"); break;
                        case "IP": taskStatus.classList.add("in-progress"); break;
                        case "P": taskStatus.classList.add("paused"); break;
                        case "CP": taskStatus.classList.add("completed"); break;
                    }
                    
                    let taskDue = document.createElement("div")
                    taskDue.classList.add("task-due")
                    let toks = due.split(" ")
                    taskDue.innerHTML = `<div class="due-day"> ${toks[0]} </div>
                    <div class="due-month"> ${toks[1]} </div>`

                    let taskInfo = document.createElement("div")
                    taskInfo.classList.add("task-info")
                    taskInfo.innerHTML = `<div class="task-title"> ${name} </div>
                                    <div class="impending"> ${getDueMessage(toks[0])} </div>`

                cardInner.appendChild(taskStatus)
                cardInner.appendChild(taskInfo)
                cardInner.appendChild(taskDue)

            card.appendChild(cardInner)

            if(stealing){
                card.addEventListener("click", function f(e) {
                    let stolenCard = e.currentTarget
                    shift(stolenCard)
                });
            }
            return card
    }

    function shift(card){
        let confirmSteal = document.createElement("button")
        confirmSteal.classList.add("steal-btn")
        confirmSteal.innerHTML = "Confirm task steal"
        if(isMobile)
            confirmSteal.style.fontSize = "30px"
        confirmSteal.addEventListener("click", function f(e) {
            let stealCard = document.getElementById("steal-card")
            let stealInfo = document.getElementById("steal-info")
            stealCard.removeChild(stealInfo)
            let currCards = content.getElementsByClassName("card")
            while(currCards.length > 0){
                for(theCard of currCards)
                    theCard.parentElement.removeChild(theCard)
                currCards = content.getElementsByClassName("card")
            }
            let stealBtns = content.getElementsByClassName("steal-btn")
            while(stealBtns.length > 0){
                for(btn of stealBtns)
                    btn.parentElement.removeChild(btn)
                stealBtns = content.getElementsByClassName("steal-btn")
            }
            
            let bars = document.getElementsByClassName("team-array-bar")
            let lastBar = bars[bars.length-1]
            let h = 0
            for(bCard of befores){
                h += 20
                content.appendChild(bCard)
            }
            let newBar = document.createElement("div")
            newBar.id="bar3"
            newBar.classList.add("bar")
            newBar.style.height = h + "%"
            lastBar.appendChild(newBar)
        });
        
        let stealInfo = document.getElementById("steal-info")
        if(!befores.includes(card)){ // move card to top of stealInfo
            stealInfo.before(card)
            befores.push(card)
            if(afters.includes(card)){
                afters.pop(card)
            }
        } else { // move card to bottom of stealInfo
            stealInfo.after(card)
            afters.push(card)
            befores.pop(card)
        }

        if(befores.length > 0){
            content.appendChild(confirmSteal)
        } else {
            let stealBtn = document.getElementById("steal-btn")
            content.removeChild(stealBtn)
        }
        
    }

    function journalCardCreator(teammate,act,message,date){
        let card = document.createElement("div")
        card.classList.add("card")
        let numCards = document.getElementsByClassName("card").length
        if(numCards % 2 == 0)
            card.classList.add("even")
        else
            card.classList.add("odd")
            
            let cardInner = document.createElement("div")
            cardInner.classList.add("card-box")
            cardInner.classList.add("card-journal")

                let journalHead = document.createElement("div")
                journalHead.classList.add("journal-head")

                    journalHead.innerHTML = `
                        <div>
                            <span class="journaller">${teammate}</span>
                            <span class="journal-act"> ${act} </span>
                        </div>
                        <span class="journal-date"> ${date} </span>
                    `


                let journalDesc = document.createElement("div")
                journalDesc.classList.add("journal-desc")
                journalDesc.innerText = message

            cardInner.appendChild(journalHead)
            cardInner.appendChild(journalDesc)

        card.appendChild(cardInner)
        card.addEventListener("click", function f(e){
            let journaller = card.getElementsByClassName("journaller")[0].innerText.replace(" ","")
            let theUser = user.replace(" ","")
            if (journaller == theUser)
                body.appendChild(journalModal("EDIT JOURNAL", true,e.currentTarget))
        })
        return card
    }


    /*=================
    III.  MODALS
    ==================*/

    function closeModal(){
        body.removeChild(document.getElementById("modal"))
    }

    var taskModal = (title, edit=false, team=false, card=null) => {
        let modal = document.createElement("div")
        modal.id = "modal"

            let lightbox = document.createElement("div")
            lightbox.classList.add("lightbox")

                let heading = document.createElement("div")
                heading.classList.add("heading")
                heading.innerText = title

                let lightboxContent = document.createElement("div")
                lightboxContent.id = "lightbox-content"

                    if(team){ 
                        /*let taskAssignee = document.createElement("div")
                        taskAssignee.classList.add("task-assignee")
                            let tai1 = document.createElement("div")
                            tai1.classList.add("team-array-icon")
                            tai1.id = "assigned"
                            tai1.innerHTML =`<div id="teammate0" class="overlay"></div>`
                            let tai2 = document.createElement("div")
                            tai2.classList.add("team-array-icon")
                            tai2.innerHTML =`<div id="teammate1" class="overlay"></div>`
                            let tai3 = document.createElement("div")
                            tai3.classList.add("team-array-icon")
                            tai3.innerHTML =`<div id="teammate2" class="overlay"></div>`
                            let tai4 = document.createElement("div")
                            tai4.classList.add("team-array-icon")
                            tai4.innerHTML =`<div id="teammate3" class="overlay"></div>`

                            let tais = [tai1,tai2,tai3,tai4]
                            for (let tai of tais){
                                tai.addEventListener("click", function f(e){
                                    let p = e.currentTarget.parentElement
                                    let icons = p.getElementsByClassName("team-array-icon")
                                    for (let icon of icons){
                                        icon.id = ""
                                    }
                                    e.currentTarget.id = "assigned"
                                })
                            }

                            taskAssignee.appendChild(tai1)
                            taskAssignee.appendChild(tai2)
                            taskAssignee.appendChild(tai3)
                            taskAssignee.appendChild(tai4)

                        lightboxContent.appendChild(taskAssignee)*/
                    }

                    let taskName = document.createElement("div")
                    taskName.classList.add("task-name")
                        taskName.innerHTML = `<input id="new-task-name" placeholder="Enter task name">`

                    let taskCalendar = document.createElement("div")
                    taskCalendar.classList.add("task-calendar")
                    taskCalendar.id="calendar"
                        taskCalendar.innerHTML = `Due Date <input id="dd" placeholder="DD"><input id="mm" placeholder="MM">`

                    let taskProgress = document.createElement("div")
                    taskProgress.classList.add("task-progress")
                        let pb1 = document.createElement("div")
                        pb1.classList.add("progress-box")
                        pb1.classList.add("unstarted")
                        pb1.classList.add("box-select")
                        let pb2 = document.createElement("div")
                        pb2.classList.add("progress-box")
                        pb2.classList.add("in-progress")
                        let pb3 = document.createElement("div")
                        pb3.classList.add("progress-box")
                        pb3.classList.add("paused")
                        let pb4 = document.createElement("div")
                        pb4.classList.add("progress-box")
                        pb4.classList.add("completed")

                        taskProgress.addEventListener("click", function f(e){
                            if(e.target.classList.contains("progress-box")){
                                let pbs = e.currentTarget.getElementsByClassName("progress-box")
                                for(pb of pbs){
                                    pb.classList.remove("box-select")
                                }
                                e.target.classList.add("box-select")
                            }
                        })
                        
                        
                        taskProgress.appendChild(pb1)
                        taskProgress.innerHTML += "Not Started"
                        taskProgress.appendChild(pb2)
                        taskProgress.innerHTML += "In Progress"
                        taskProgress.appendChild(pb3)
                        taskProgress.innerHTML += "Paused"
                        taskProgress.appendChild(pb4)
                        taskProgress.innerHTML += "Completed"

                    let taskJournal = document.createElement("div")
                    taskJournal.classList.add("task-journal")
                        let taskCheckbox = document.createElement("div")
                        taskCheckbox.classList.add("task-modal-checkbox")
                        taskJournal.addEventListener("click", function f(e){
                            let tick = e.currentTarget.children[0]
                            let haveSomething = (tick.innerHTML == "") ? false : true
                            if(haveSomething) // untick
                                tick.innerHTML = ""
                            else // tick
                                tick.innerHTML = `<div class="tick"></div>`
                        })
                        taskJournal.appendChild(taskCheckbox)
                        taskJournal.innerHTML += `<div> Write a journal </div>`

                    lightboxContent.appendChild(taskName)
                    lightboxContent.appendChild(taskCalendar)
                    lightboxContent.appendChild(taskProgress)
                    lightboxContent.appendChild(taskJournal)

                let options = document.createElement("div")
                options.classList.add("options")

                    let cancel = document.createElement("div")
                    cancel.id = "cancel"
                    cancel.innerText = "CANCEL"
                    cancel.onclick = closeModal

                    let confirm = document.createElement("div")
                    confirm.id = "confirm"
                    confirm.innerText = "CONFIRM"
                    confirm.addEventListener("click", function f(e){
                        let shouldJournal = document.getElementsByClassName("task-modal-checkbox")[0].innerHTML == "" ? false : true
                        let newTaskName = document.getElementById("new-task-name").value
                            if(newTaskName.length < 1)
                                newTaskName = "Untitled Task"
                            let newDueDay = document.getElementById("dd").value
                            if(newDueDay.length < 1)
                                newDueDay = "9"
                            let newDueMonth = document.getElementById("mm").value
                            switch(newDueMonth){
                                case "01": newDueMonth = "JAN"; break;
                                case "02": newDueMonth = "FEB"; break;
                                case "03": newDueMonth = "MAR"; break;
                                case "04": newDueMonth = "APR"; break;
                                case "05": newDueMonth = "MAY"; break;
                                case "06": newDueMonth = "JUN"; break;
                                case "07": newDueMonth = "JUL"; break;
                                case "08": newDueMonth = "AUG"; break;
                                case "09": newDueMonth = "SEP"; break;
                                case "10": newDueMonth = "OCT"; break;
                                case "11": newDueMonth = "NOV"; break;
                                case "12": newDueMonth = "DEC"; break;
                                case "" : newDueMonth = "MAR"; break;
                            }
                            let newDueDate = newDueDay + " " + newDueMonth
                        
                        if(!edit){
                            if(team)
                                content.appendChild(ttaskCardCreator("NS", newTaskName, newDueDate))
                            else{
                                content.appendChild(taskCardCreator(newTaskName, newDueDate))
                                content.appendChild(document.getElementById("del-btn"))
                            }
                        } else { // is edit
                            console.log(card.innerHTML)
                            let info = card.getElementsByClassName("task-info")[0]
                            info.innerHTML = `<div class="task-title"> ${newTaskName} </div>
                                    <div class="impending"> ${getDueMessage(newDueDay)} </div>`
                            let due = card.getElementsByClassName("task-due")[0]
                            due.innerHTML = `<div class="due-day"> ${newDueDay} </div>
                            <div class="due-month"> ${newDueMonth} </div>`
                        }
                        closeModal()

                        if(shouldJournal)
                            body.appendChild(journalModal("NEW JOURNAL", true))
                    })

                options.appendChild(cancel)
                options.appendChild(confirm)

            lightbox.appendChild(heading)
            lightbox.appendChild(lightboxContent)
            lightbox.appendChild(options)
        
        modal.appendChild(lightbox)
        body.appendChild(modal)
        return modal
    }

    var journalModal = (title, edit=false, card=null) => {
        let modal = document.createElement("div")
        modal.id = "modal"

            let lightbox = document.createElement("div")
            lightbox.classList.add("lightbox")

                let heading = document.createElement("div")
                heading.classList.add("heading")
                heading.innerText = title

                let lightboxContent = document.createElement("div")
                lightboxContent.id = "lightbox-content"
                lightboxContent.innerHTML = `<textarea id="journal-area" name="textarea">Write something here</textarea>`
                theMessage = "Sample message"

                let options = document.createElement("div")
                options.classList.add("options")

                    let cancel = document.createElement("div")
                    cancel.id = "cancel"
                    cancel.innerText = "CANCEL"
                    cancel.onclick = closeModal

                    let confirm = document.createElement("div")
                    confirm.id = "confirm"
                    confirm.innerText = "CONFIRM"
                    confirm.addEventListener("click", function f(e){
                        let entry = document.getElementById("journal-area").value
                        if(entry.length < 1 || entry == "Write something here")
                            entry = theMessage
                        if(!edit){
                            content.insertBefore(journalCardCreator(user, "wrote a new message", entry, "March 9"), document.getElementsByClassName("heading")[0])
                            content.insertBefore(document.getElementsByClassName("heading")[0], document.getElementsByClassName("card")[0])
                        } else if(edit && card!=null) { // edit
                            card.getElementsByClassName("journal-desc")[0].innerText = entry
                        }
                            closeModal()
                    })

                options.appendChild(cancel)
                options.appendChild(confirm)

            lightbox.appendChild(heading)
            lightbox.appendChild(lightboxContent)
            lightbox.appendChild(options)
        
        modal.appendChild(lightbox)
        body.appendChild(modal)
        return modal
    }
    
    var inviteModal = (title) => {
        let modal = document.createElement("div")
        modal.id = "modal"

            let lightbox = document.createElement("div")
            lightbox.classList.add("lightbox")

                let heading = document.createElement("div")
                heading.classList.add("heading")
                heading.innerText = title

                let lightboxContent = document.createElement("div")
                lightboxContent.id = "lightbox-content"
                lightboxContent.innerHTML = `<input placeholder="Enter teammate's email address here">`

                let options = document.createElement("div")
                options.classList.add("options")

                    let cancel = document.createElement("div")
                    cancel.id = "cancel"
                    cancel.innerText = "CANCEL"
                    cancel.onclick = closeModal

                    let confirm = document.createElement("div")
                    confirm.id = "confirm"
                    confirm.innerText = "SEND"
                    confirm.addEventListener("click", function f(e){
                        closeModal()
                        alert("Invitation sent!")
                    })

                options.appendChild(cancel)
                options.appendChild(confirm)

            lightbox.appendChild(heading)
            lightbox.appendChild(lightboxContent)
            lightbox.appendChild(options)
        
        modal.appendChild(lightbox)
        body.appendChild(modal)
        return modal
    }

    var projectModal = (title) => {
        let modal = document.createElement("div")
        modal.id = "modal"

            let lightbox = document.createElement("div")
            lightbox.classList.add("lightbox")

                let heading = document.createElement("div")
                heading.classList.add("heading")
                heading.innerText = title

                let lightboxContent = document.createElement("div")
                lightboxContent.id = "lightbox-content"
                lightboxContent.innerText = `Adding new project.\n\nThis interface had been intentionally left out of the prototype.`

                let options = document.createElement("div")
                options.classList.add("options")

                    let cancel = document.createElement("div")
                    cancel.id = "cancel"
                    cancel.innerText = "CANCEL"
                    cancel.onclick = closeModal

                    let confirm = document.createElement("div")
                    confirm.id = "confirm"
                    confirm.innerText = "CONFIRM"
                    confirm.onclick = closeModal

                options.appendChild(cancel)
                options.appendChild(confirm)

            lightbox.appendChild(heading)
            lightbox.appendChild(lightboxContent)
            lightbox.appendChild(options)
        
        modal.appendChild(lightbox)
        body.appendChild(modal)
        return modal
    }



    // Stabilize sizes to mobile
    var isMobile = false;
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
        isMobile = true;

    if (isMobile) {
        console.log("Loaded Prosimm for Mobile")
        body.style.fontSize = "36px"
        header.style.fontSize = "72px"
        add.style.fontSize = "72px"
        document.getElementById("del-btn").style.fontSize = "30px"
    }
})