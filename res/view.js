let currView = "nav-my-tasks"

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("h-left")
    const add = document.getElementById("h-right")
    const navs = document.getElementsByClassName("nav-box")
    const navbar = document.getElementById("navigation")
    const content = document.getElementById("content")
    const body = document.getElementById("body")
    
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
                <div id="lightbox-content">
                    ${temp}
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
        My tasks
        `
    }
    
    function loadTeamTasks(){
        content.innerHTML = `
        Team tasks
        `
    }
    
    function loadJournals(){
        content.innerHTML = `
        Journals
        `
    }
    
    function loadMyTeam(){
        content.innerHTML = `
        My team
        `
    }
    
    function loadProfile(){
        content.innerHTML = `
        My profile
        `
    }
    
    function loadProjects(){
        content.innerHTML = `
        Projects
        `
    }
})

