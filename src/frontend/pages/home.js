window.handleHomeRequest = () => {
  document.body.innerHTML = `
    <header>
      <h1><a href="/"><img src="./images/food-logo.png"></a></h1>
      <ul>
        <li><a href="/" data-navigo>Home</a></li>
        <li><a href="meals" data-navigo>Meals</a></li>
        <li><a href="featuredmeals" data-navigo>Featured Meals</a></li>
        <li><a href="Login" data-navigo>Login</a></li>
      </ul>
    </header>
    <div class="slidercontainer">
      <img src="./images/Foodbanner1.jpg">
      
    </div>
    <footer>
    <a href="/" data-navigo>Home </a>
    <a href="meals" data-navigo>Meals </a>
    <a href="featuredmeals" data-navigo>Featured Meal</a>
    </footer>
  `

  // if any links are added to the dom, use this function
  // make the router handle those links.
  router.updatePageLinks()

}

// ${getHeader(`header`)}