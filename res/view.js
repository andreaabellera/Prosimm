let currView = "nav-my-tasks"
let currProject = "project0"

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
        let temp = "Lightbox content"

        if(currView == "nav-my-tasks")
            temp = "Adding new individual task"
        else if(currView == "nav-team-tasks")
            temp = "Adding new team task"
        else if(currView == "nav-journals")
            temp = "Adding new journal"
        else if(currView == "nav-my-team")
            temp = "Adding new teammate"
        else if(currView == "nav-projects")
            temp = "Adding new project"

        let modal = document.createElement("div")
        modal.id = "modal"
        modal.innerHTML=`
            <div class="lightbox">
                <div class="heading"> POPUP DETAILS </div>
                <div id="lightbox-content">
                    ${temp}
                </div>
                <div class="options">
                    <div id="cancel"> CANCEL </div>
                    <div id="confirm"> CONFIRM </div>
                </div>
            </div>
        `
        body.appendChild(modal)
        modal.onclick = closeModal
    });

    function updateView(){
        add.style.display="block"
        if(currView == "nav-my-tasks")
            loadMyTasks()
        else if(currView == "nav-team-tasks")
            loadTeamTasks()
        else if(currView == "nav-journals")
            loadJournals()
        else if(currView == "nav-my-team")
            loadMyTeam()
        else if(currView == "nav-profile"){
            loadProfile()
            add.style.display="none"
        }
        else if(currView == "nav-projects")
            loadProjects()
    }

    function clearActive(){
        for(let nav of navs)
            nav.classList.remove("nav-active")
    }

    function closeModal(){
        body.removeChild(document.getElementById("modal"))
    }
    
      /*=================
      //  LOAD CONTENT
      ==================*/
    function loadMyTasks(){
        content.innerHTML = `
            <div class="heading"> THIS WEEK'S TASKS </div>
            <div class="card">
                <div class="card-box card-task">
                    <div class="task-checkbox"><div class="tick"></div></div>
                    <div class="task-info strike">
                        <div class="task-title"> Finish report </div>
                    </div>
                    <div class="task-due greyed">
                        <div class="due-day"> 9 </div>
                        <div class="due-month"> MAR </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-box card-task">
                    <div class="task-checkbox"></div>
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
                <div class="card-box card-task">
                    <div class="task-checkbox"></div>
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
                <div class="card-box card-task">
                    <div class="task-checkbox"></div>
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
        content.innerHTML = `
            <div class="heading"> JOURNAL ENTRIES </div>
            <div class="card odd">
                <div class="card-box card-journal">
                    <div class="journal-head">
                        <div>
                            <span class="journaller"> Jane Tang </span>
                            <span class="journal-act"> finished a task </span>
                        </div>
                        <span class="journal-date"> March 5 </span>
                    </div>
                    <div class="journal-desc">
                        Woohoo yay
                    </div>
                </div>
            </div>
            <div class="card even">
                <div class="card-box card-journal">
                    <div class="journal-head">
                        <div>
                            <span class="journaller"> Andrea Abellera </span>
                            <span class="journal-act"> editted a task </span>
                        </div>
                        <span class="journal-date"> March 6 </span>
                    </div>
                    <div class="journal-desc">
                        Give me one more day to fix the bugs
                    </div>
                </div>
            </div>
        `
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
                    <div class="help-btn"></div>
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
                    <input placeholder="Availabilities">
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
})