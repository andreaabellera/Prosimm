let currView = "nav-my-tasks"
let currProject = "project0"
let today = 9 // Assume today is March 9 for due warnings

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
            body.appendChild(taskModal("ADD NEW TASK"))
        else if(currView == "nav-journals")
            body.appendChild(journalModal("ADD NEW JOURNAL"))
        else if(currView == "nav-my-team")
            body.appendChild(inviteModal("INVITE TEAMMATE"))
        else if(currView == "nav-projects")
            body.appendChild(taskModal("ADD NEW TASK"))
    });

    function updateView(){
        content.innerHTML = ""
        add.style.display="block"
        if(currView == "nav-my-tasks")
            loadMyTasks()
        else if(currView == "nav-team-tasks")
            loadTeamTasks()
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
            let fillers = ["Andrea Abellera", "email_address@domain.com", "Winnipeg", "2045582887"]
            for(let i in fields){
                fields[i].value = fillers[i]
            }
            document.getElementsByClassName("heading")[0].addEventListener("click", function f(e) {
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
        let delBtn = document.createElement("button")
        delBtn.innerText = "delete checked"
        delBtn.addEventListener("click", function f(e) {
            let view = document.getElementById("content")
            let cards = view.getElementsByClassName("greyed")
            while(cards.length > 0){
                for(let card of cards)
                    card.parentElement.parentElement.innerHTML = ""
                cards = view.getElementsByClassName("greyed")
            }
        });
        heading.appendChild(delBtn)
        content.appendChild(heading)
        
        // Create placeholder tasks
        let taskNames = ["Finish report", "Annotated outline", "Lab writeup", "Prosimm team meeting"]
        let taskDues = ["9 MAR", "10 MAR", "11 MAR", "14 MAR"]
        for(let i in taskNames)
            content.appendChild(taskCardCreator(taskNames[i], taskDues[i]))
    }
    
    function loadTeamTasks(){
        content.innerHTML = `
            <div class="card"> 
                <div class="card-box team-progress">
                    <div class="team-array team-bars">
                        <div class="team-array-bar"><div id="sbar0" class="subbar"></div><div id="bar0" class="bar"></div></div>
                        <div class="team-array-bar"><div id="sbar1" class="subbar"></div><div id="bar1" class="bar"></div></div>
                        <div class="team-array-bar"><div id="sbar2" class="subbar"></div><div id="bar2" class="bar"></div></div>
                        <div class="team-array-bar"><div id="bar3" class="bar"></div></div>
                    </div>
                    <div class="team-array team-icons">
                        <div class="team-array-icon"><div id="teammate0" class="overlay"></div></div>
                        <div class="team-array-icon"><div id="teammate1" class="overlay"></div></div>
                        <div class="team-array-icon"><div id="teammate2" class="overlay"></div></div>
                        <div class="team-array-icon"><div id="teammate3" class="overlay"></div></div>
                    </div>
                    <div class="team-array team-selects">
                        <div class="team-array-selector"></div>
                        <div class="team-array-selector"></div>
                        <div class="team-array-selector teammate-selected"></div>
                        <div class="team-array-selector"></div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-box card-ttask">
                    <div class="task-status in-progress"></div>
                    <div class="task-info">
                        <div class="task-title"> Annotated outline </div>
                        <div class="impending"> Due tomorrow </div>
                    </div>
                    <div class="task-due">
                        <div class="due-day"> 10 </div>
                        <div class="due-month"> MAR </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-box card-ttask">
                    <div class="task-status unstarted"></div>
                    <div class="task-info">
                        <div class="task-title"> Interview with Maya </div>
                        <div class="impending"> Due in 2 days </div>
                    </div>
                    <div class="task-due">
                        <div class="due-day"> 10 </div>
                        <div class="due-month"> MAR </div>
                    </div>
                </div>
            </div>
        `
    }
    
    function loadJournals(){
        content.innerHTML = `<div class="heading"> JOURNAL ENTRIES </div>`

        // Create placeholder journals
        let teammates = ["Jane Tang", "Andrea Abellera"]
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
                        <div class="teammate-name"> Andrea Abellera </div>
                        <div class="teammate-city greyed"> Winnipeg | 8:03pm</div>
                        <div class="teammate-email"> email_address@domain.com </div>
                        <div class="teammate-phone"> +1(204)444-4444 </div>
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
                    <input placeholder="Full Name">
                </div>
                <div class="card-box card-profile">
                    <div id="setting-email" class="setting-icon"></div>
                    <input placeholder="Email Address">
                </div>
                <div class="card-box card-profile">
                    <div id="setting-time" class="setting-icon"></div>
                    <input placeholder="City">
                </div>
                <div class="card-box card-profile">
                    <div id="setting-avail" class="setting-icon"></div>
                    <input placeholder="Phone number">
                </div>
            </div>
            <div class="heading"> SAVE CHANGES </div>
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
                        body.appendChild(taskModal("EDIT TASK", true))
                    });

                cardInner.appendChild(checkbox)
                cardInner.appendChild(info)
                cardInner.appendChild(due)

            card.appendChild(cardInner)
            return card
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
                            <span class="journaller"> ${teammate} </span>
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
            body.appendChild(journalModal("EDIT JOURNAL", true))
        })
        return card
    }


    /*=================
    III.  MODALS
    ==================*/

    function closeModal(){
        body.removeChild(document.getElementById("modal"))
    }

    var taskModal = (title, edit=false) => {
        let modal = document.createElement("div")
        modal.id = "modal"

            let lightbox = document.createElement("div")
            lightbox.classList.add("lightbox")

                let heading = document.createElement("div")
                heading.classList.add("heading")
                heading.innerText = title

                let lightboxContent = document.createElement("div")
                lightboxContent.id = "lightbox-content"
                lightboxContent.innerText = "Adding new individual task"

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
                        if(!edit)
                            content.appendChild(taskCardCreator("New Task", "15 MAR"))
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

    var journalModal = (title, edit=false) => {
        let modal = document.createElement("div")
        modal.id = "modal"

            let lightbox = document.createElement("div")
            lightbox.classList.add("lightbox")

                let heading = document.createElement("div")
                heading.classList.add("heading")
                heading.innerText = title

                let lightboxContent = document.createElement("div")
                lightboxContent.id = "lightbox-content"
                lightboxContent.innerHTML = `<textarea name="textarea"rows="15" cols="40">Write something here</textarea>`
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
                        if(!edit){
                            content.insertBefore(journalCardCreator("Andrea Abellera", "wrote a new message", theMessage, "March 9"), document.getElementsByClassName("heading")[0])
                            content.insertBefore(document.getElementsByClassName("heading")[0], document.getElementsByClassName("card")[0])
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
})