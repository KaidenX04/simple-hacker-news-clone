/*
Fetch Fundamentals
In this example we're going to get the top news stories from 
1. Select all stories and get stories button.
    - Add an event listener on the button that will load the stories
    (function for this cretaed below.)
*/
document.querySelector(".fetch-stories").addEventListener("click", (event) => {
    document.querySelector(".hn-stories").innerHTML = ""
    loadAllStoryIds()
})

/*
2. Create a function that will load all of the story ids.
    - you'll use the fetch api on the top stories endpoint to do this.
    - Documentation for top stories api endpoint https://github.com/HackerNews/API#new-top-and-best-stories
*/
const loadAllStoryIds = () => {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty").then((response) => {
        return response.json()
    }).then((data) => {
        for (i = 0; i < 10; i++){
            fetchAndDisplayStory(data[i])
        }
    })
}

/*
3. Create a function that will fetch the story data using the id and
    display is on the page.
    - you'll use the fetch api on the items end point to do this.
    - Documentation for items api endpoint https://github.com/HackerNews/API#items
    - The HTML 
    <a href="URL HERE" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">TITLE HERE</h5>
        <small>STORY SCORE HERE</small>
        </div>
        <p class="mb-1">TIMESTAMP HERE </p>
        <small>AUTHOR HERE</small>
    </a>
*/

const getStory = (id) => {
}

const fetchAndDisplayStory = (id) => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((response) => {
        return response.json()
    }).then((data) => {
        document.querySelector(".hn-stories").innerHTML += `
        <a href="${data.url}" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${data.title}</h5>
                <small>${data.score}</small>
            </div>
            <p class="mb-1">${convertDate(data.time)}</p>
            <small>${data.by}</small>
        </a>
    ` 
    })
}

/*
4. Create a function that will convert the date into something readable
    rather than a timestamp.
*/

const convertDate = (date) => {
    let convertedDate = new Date(date * 1000)
    let currentDate = new Date()

    if (Math.round(Math.abs(convertedDate - currentDate) / (60*60*1000)) > 0){
        return `${Math.round(Math.abs(convertedDate - currentDate) / (60*60*1000))} hours ago`
    }
    else if (Math.round(Math.abs(convertedDate - currentDate) / (60*1000)) > 0){
        return `${Math.round(Math.abs(convertedDate - currentDate) / (60*1000))} minutes ago`
    }
    else {
        return `${Math.round(Math.abs(convertedDate - currentDate) / (1000))} seconds ago`
    }
}


// async function
const getTopSories = async () => {
    const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
    const storyIds = await response.json()
    return storyIds
}