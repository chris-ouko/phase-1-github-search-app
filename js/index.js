// Wait for the DOM to load before executing code
document.addEventListener("DOMContentLoaded", () => {
    // Get the form element by its ID
    let form = document.getElementById("github-form")
    
    // Add an event listener for form submission
    form.addEventListener("submit", (e) => {
      // Prevent the default form submission behavior
      e.preventDefault()
      
      // Get the input value (GitHub username) from the form
      let input = document.getElementById("search").value
      
      // Call the fetchNames function to fetch user data from GitHub API
      fetchNames(input)
    })
  })
  
  // Function to fetch user data from GitHub API
  function fetchNames(users) {
    // Make a GET request to the GitHub API with the provided username
    fetch(https://api.github.com/users/${users}, {
      headers: {
        // Add the Accept header as specified in the instructions
        'Accept': 'application/vnd.github.v3+json'
      }
    })
      .then((response) => response.json())
      .then((user) => renderUsers(user))
  }
  
  // Function to render user data to the page
  function renderUsers(user) {
    console.log(user)
    
    // Get the user-list and create a new list item
    let ul = document.getElementById("user-list")
    let li = document.createElement("li")
    li.innerHTML = `
      <a href="${user.html_url}"><img src="${user.avatar_url}" />${user.login}</a>
      <h3>${user.login}</h3>
      <p style="font-style: italic">${user.public_repos} repositories</p>
      <button id="repositories">View Repositories</button>
    `
    ul.appendChild(li)
    
    // Define the link to fetch user repositories
    let link = https://api.github.com/users/${user.login}/repos
    
    // Get the "View Repositories" button and add a click event listener
    let repo = document.getElementById("repositories")
    repo.addEventListener("click", () => {
      repoLink(link)
    })
  }
  
  // Function to fetch user repositories
  function repoLink(userRepos) {
    fetch(userRepos, {
      headers: {
        // Add the Accept header as specified in the instructions
        'Accept': 'application/vnd.github.v3+json'
      }
    })
      .then((resp) => resp.json())
      .then((names) => {
        repoNames(names)
      })
  }
  
  let clicked = true
  // Function to render user repositories to the page
  function repoNames(names) {
    if (clicked) {
      names.forEach((name) => {
        // Get the repos-list and create a new list item for each repository
        let repoContainer = document.getElementById("repos-list")
        let li = document.createElement("li")
        li.textContent = name.name
        repoContainer.appendChild(li)
      })
      clicked = false
    }
  }