// Validations start here
const validator = (name, phone, email)=>{
  const phoneno = phone.toString().length;
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!name){
    alert("Please provide name for reservation");
  
  }else if(!phoneno){
    alert("Please provide a phone number");

  }else if(phoneno < 8 || phoneno > 10){
    alert("Please correct the phone number");
  
  }else if(!email){
    alert("Please provide a valid email id");

  }else if(!mailformat.test(email)){
    alert("This is not a valid email");
  
  }
  
}



// Validations ends here


const reserveMeal = (id) => {

  let name = document.getElementById('name').value
  let phone = document.getElementById('phone').value
  let email = document.getElementById('email').value
  
  validator(name, phone, email);

  console.log(name, phone, email);  
  fetch(`/api/reservations/${id}`,{ 
    method : `POST`,
    headers: { "Content-Type": `application/json`},
    body:JSON.stringify(
    {
      name,
      phone,
      email
    })
  })
  .then(res => res.json())
  .then(responses => {
    console.log(responses)
    alert("Your reservation is booked SUCCESSFULLY !!");
  })
}


window.handleReservationsRequest = params => {
  fetch(`/api/reservations/${params.id}`) // 
  .then(res => res.json())
  .then(meal =>{
    // console.log(`meal is : ${meal.id} 
    // And the id is : ${meal.title}`);
    let whenDateTime = meal[0].when.replace("T"," ").replace(".000Z","");  // Replace the iso date : i just visually changed it so that database should be the same
    
    
    document.body.innerHTML = `
        <header>
        <h1><a href="/"><img src="/./images/food-logo.png"></a></h1>
        <ul>
          <li><a href="/" data-navigo>Home</a></li>
          <li><a href="meals" data-navigo>Meals</a></li>
          <li><a href="featuredmeals" data-navigo>Featured Meals</a></li>
        </ul>
        </header>

        <div class="bodycontainer">
          <div class="mealslider"><img src="${meal[0].url}"></div>
          <div class="mealinfo">
            <h1>${meal[0].title}</h1>
            <div class="mealdetail">
            
              <ul>
                
                <li class="fullwidth">
                  <lable>Description : ${meal[0].description}</lable>
                  
                </li>
                <li>
                  <lable>Location : ${meal[0].location}</lable>
                  
                </li>
                <li>
                  <lable>When : ${whenDateTime}</lable>
                  
                </li>
                <li>
                  <lable>Maximum no of reservations : ${meal[0].max_reservations}</lable>
                  
                </li>
                <li>
                  <lable>Price : ${meal[0].price}</lable>
                  
                </li>
              </ul>
              
              <ul>
                <li><input id="name" placeholder="Name"></li>
                <li><input id="phone" placeholder="Phone number"></li>
                <li><input id="email" placeholder="Email ID"></li>
                <li>
                 <button onClick="reserveMeal(${meal[0].id})">Reserve</button>
                </li>
              </ul>
            </div>
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
