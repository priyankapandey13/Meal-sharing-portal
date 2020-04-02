// const deleteMeal = (id) => {

// }

const deleteMeal = (id) => {
  // let answer = window.confirm("Save data?")
  if (confirm(`Are you sure you want to delete this meal`)) {
    // delete it!
    // window.location.href= `http://localhost/meals`;
    window.location= `/`;
    fetch(`/api/meals/${id}`,{ 
      method : `DELETE`
    })
    .then(res => res.json())
    .then(responses => {
      console.log(responses)
      window.location= "/meals" 
    })
  
  } else {
    // Do nothing!
    // window.location= `/`;
    // console.log("Testing was successfull")
    
  }

}

window.handleMealsRequest = () => {
  // const response = 
  fetch("/api/meals")
  .then(res => res.json())
  .then(meals => {
    
    console.log(meals);
    document.body.innerHTML = `
    <header>
    <h1><a href="/"><img src="./images/food-logo.png"></a></h1>
    <ul>
      <li><a href="/" data-navigo>Home</a></li>
      <li><a href="meals" data-navigo>Meals</a></li>
      <li><a href="featuredmeals" data-navigo>Featured Meals</a></li>
    </ul>
    </header>
    <div class="bodycontainer">
    <div>Select a meal of your choice...</div>
    <div class="meallist">
      <ul>
      ${meals.map(meal=> {
    
        return`
        <li>
        <a href="/meal/${meal.id}">
          <div>
          <span style="background-image:url('${meal.url}');"></span>
          </div> 
        </a>
        <span>${meal.price} kr</span>
        <h3>
          ${meal.title}
        </h3> 
        <span class="action">
          <a href="/meal/${meal.id}#reservation" alt="Reserve meal">
            <img src="/images/book.png" width="25px">
          </a>
          <a href="/meal/${meal.id}" alt="View meal">
            <img src="/images/eyeicon.png" width="25px" >
          </a>
          <a href="#" onClick="deleteMeal(${meal.id})" alt="Delete meal">
          <img src="/images/bin.png" width="23px" >
          </a>
        </span>
        
        </li>
        `
      }).join('')}
      </ul>
    </div>
    </div>

    <footer>
    <a href="/" data-navigo>Home </a>
    <a href="meals" data-navigo>Meals </a>
    <a href="featuredmeals" data-navigo>Featured Meals</a>
    </footer>
  `  

  })
  .catch(err => console.error(err))
  

  // if any links are added to the dom, use this function
  // make the router handle those links.
  router.updatePageLinks()
}
