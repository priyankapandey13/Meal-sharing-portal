// For rating stars

function starsfig(count){ 
  let newrating =[];
let x = `<li id="star"></li>`;
for(i=0; i<count; i++)
{
  newrating += x;
}
return newrating;
}

window.handlefeaturedmealsRequest = params => {
  fetch(`/api/featuredmeals`)
  .then(res => res.json())
  .then(meals =>{

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

          <h2>Our featured meals</h2>
          <div class="meallist featuredmeals">
          <ul>
          ${meals.map(meal=> {
        
            return`
            <li>
              <a href="/meal/${meal.id}">
                <div>
                <span style="background-image:url('${meal.url}');"></span>
                </div> 
              </a>
              <div class="fetureddetails">
                <h4>${meal.title}</h4>

                <ul id="ratings">
                  ${starsfig(meal.stars)}
                </ul>
              </div>

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
  // if any links are added to the dom, use this function
  // make the router handle those links.
  router.updatePageLinks()
}
