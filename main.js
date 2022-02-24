const repoWrapper = document.querySelector(".repoWrapper")
const headerWrapper = document.querySelector(".header")
const mainWrapper = document.querySelector(".mainWrapper")
const formSection = document.querySelector(".formSection")






const sort = (items)=>{
    items.sort((a,b)=>{
        const latestA = a.updated_at
        const latestB = b.updated_at
            if(latestA <latestB){
                return 1
            }else if(latestA > latestB){
                return -1
            } else{
                return 0
            }
    })
    }

const fetchGithub = async (username) =>{
    const Github_Repo = `https://api.github.com/users/${username}/repos` 
    const response = await fetch(Github_Repo);
    const data = await response.json();
    return data
}

const cardComponent = (repo)=> `
<div class="repoCard">
<h1 class="repoName">${repo.name}</h1>
<h2 class="latestPush">Latest push ${repo.pushed_at}</h2>
<button class="linkBtn" data-id="${repo.id}">Check it out</button>
</div>
`
const headerComponent = (data)=>`
<img class="githubImg" src="${data[0].owner.avatar_url}" alt="avatar"></img>
    <h2 class="userName">${data[0].owner.login}</h2>
    <label for="user">Write a github username</label>
    <input type="text" name="name" id="user">
    <button onclick="${() => {findBtn()}}" class="submitBtn">Find</button>
`    



fetchGithub("albinglindell")
.then(data => {
    sort(data)
repoWrapper.innerHTML= data.map(cardComponent).join("")
mainWrapper.innerHTML= headerComponent(data)

const submitBtn = document.querySelector(".submitBtn")
let userInput = document.querySelector("#user")



submitBtn.addEventListener("click", ()=>{
findBtn()
    })


    let findBtn =()=>{
    
        fetchGithub(userInput.value)
        .then(data=>{
            sort(data)
            repoWrapper.innerHTML= data.map(cardComponent).join("")
            mainWrapper.innerHTML= headerComponent(data)
            })
        }

   







window.addEventListener("mouseover",(e)=>{
    document.body.style.backgroundColor=`rgb(${e.screenY}, ${e.screenX}, 70)`

})



const linkBtn = document.querySelectorAll(".linkBtn")
linkBtn.forEach(button =>{
    button.addEventListener("click", ()=>{
        let dataId = button.getAttribute("data-id") 
        const rightBtn =  data.find(button =>{
            return button.id == dataId
        })
       if(rightBtn){
           location.href=rightBtn.html_url
       }
    })
})
})

