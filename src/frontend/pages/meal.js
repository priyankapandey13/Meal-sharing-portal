const updateMeal = (id) => {
  let title = document.getElementById("meal-title").value;
  let description = document.getElementById("meal-desc").value;
  let location = document.getElementById("meal-location").value;
  let when = document.getElementById("meal-when").value;
  let max_reservations = document.getElementById("meal-maxreserv").value;
  let price = document.getElementById("meal-price").value;
  // let created_date = document.getElementById('meal-createddate').value

  console.log(title, description, location, when, max_reservations, price);
  fetch(`/api/meals/${id}`, {
    method: `PUT`,
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify({
      title,
      description,
      location,
      when,
      max_reservations,
      price,
    }),
  })
    .then((res) => res.json())
    .then((responses) => {
      console.log(responses);
      alert("Your information is successfully updated");
    });
};

const reservemeal = (id) => {
  let x = document.getElementById("reservation");
  let y = document.getElementById("showreviews");
  let z = document.getElementById("updatemeal");
  if (x.style.display === "none") {
    x.style.height = "100%";
    x.style.display = "block";
    x.style.transitionDuration = "5s";
    x.style.transitionProperty = "height";
    x.style.marginBottom = "70px";
    y.style.display = "none";
    z.style.display = "none";
  } else {
    x.style.display = "none";
  }
};

const showReviews = (id) => {
  let x = document.getElementById("reservation");
  let y = document.getElementById("showreviews");
  let z = document.getElementById("updatemeal");
  if (y.style.display === "none") {
    y.style.height = "100%";
    y.style.display = "block";
    y.style.transitionDuration = "5s";
    y.style.transitionProperty = "height";
    y.style.marginBottom = "70px";
    x.style.display = "none";
    z.style.display = "none";
  } else {
    y.style.display = "none";
  }
};

function menutoggle() {
  let x = document.getElementById("reservation");
  let y = document.getElementById("showreviews");
  let z = document.getElementById("updatemeal");
  if (z.style.display === "none") {
    z.style.height = "100%";
    z.style.display = "block";
    z.style.transitionDuration = "5s";
    z.style.transitionProperty = "height";
    z.style.marginBottom = "70px";
    x.style.display = "none";
    y.style.display = "none";
  } else {
    z.style.display = "none";
  }
}

// For rating stars

function starsfig(count) {
  let newrating = [];
  let x = `<li id="star"></li>`;
  for (i = 0; i < count; i++) {
    newrating += x;
  }
  return newrating;
}

// meal Slider

let i = 0;
let time = 2000;  
let foodImgArray;
const imagelinkarray=[];


// Change of images
function showSlides() {
  document.slide.src = imagelinkarray[i];
  if(i< imagelinkarray.length -1){
    i++;
}else{
  i=0;
}

  setTimeout("showSlides()", time);
}

// Validations start here
const mealReservation = (id) => {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;

  // validator(name, phone, email);
  testing(name, phone, email);

  console.log(name, phone, email);
  fetch(`/api/reservations/${id}`, {
    method: `POST`,
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify({
      name,
      phone,
      email,
    }),
  })
    .then((res) => res.json())
    .then((responses) => {
      alert("Your reservation is booked SUCCESSFULLY !!");
    });
};

function testing(name, phone, email) {
  const phoneno = phone.toString().length;
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!name) {
    alert("Please provide name for reservation");
  } else if (!phoneno) {
    alert("Please provide a phone number");
  } else if (phoneno < 8 || phoneno > 10) {
    alert("Please correct the phone number");
  } else if (!email) {
    alert("Please provide a valid email id");
  } else if (!mailformat.test(email)) {
    alert("This is not a valid email");
  }
  console.log("I reached here " + name + ` ` + phone + ` ` + email + ` `);
}

// Validations ends here

window.handleMealRequest = (params) => {
  fetch(`/api/meals/${params.id}`)
    .then((res) => res.json())
    .then((meal) => {
      let whenDT = meal[0].when.toString();
      console.log("Hi");
      let whenDateTime;
      meal.map(link =>{
        imagelinkarray.push(link.url)
      });
      // console.log(imagelinkarray);

      if (whenDT.includes("T", "Z") == true) {
        whenDateTime = meal[0].when.replace("T", " ").replace(".000Z", ""); // Replace the iso date : i just visually changed it so that database should be the same
      }

      document.body.innerHTML = `
      <header>
        <h1><a href="/"><img src="/images/food-logo.png"></a></h1>
        <ul>
          <li><a href="/" data-navigo>Home</a></li>
          <li><a href="/meals" data-navigo>Meals</a></li>
          <li><a href="featuredmeals" data-navigo>Featured Meals</a></li>
        </ul>
      </header>
        
      <div class="bodycontainer">
            <div class="mealslider" style="background-image:url('${meal[0].url}');">
              <div class="slideshow-container">
                <img name="slide" style="height:100%;width:100%">
              </div>
            </div>
        
          <div class="mealinfo" >
            <h2>${meal[0].title}</h2>
            <ul>
              <li class="fullwidth">
                <p>${meal[0].description}</p>
              </li>
              <li>
                <span><img src="/images/when.png" width=""></span>
                ${whenDateTime}
              </li>
              <li>
                <span><img src="/images/booking.png" width=""></span>
                ${meal[0].max_reservations}
              </li>
              <li>
                <span><img src="/images/money.png" width=""></span>
                ${meal[0].price}
              </li>
              <li>
                <span><img src="/images/location.png" width=""></span>
                ${meal[0].location}
              </li>
            </ul>

            <span class="dropmenu">
              <label onClick="reservemeal()" alt="Reserve Meal" style="background-image:url('/images/reserve.png');"></label>
              <label onClick="menutoggle()" alt="Edit Meal" style="background-image:url('/images/settings.png');"></label>
              <label onClick="deleteMeal(${
                meal.id
              })" alt="Delete Meal" style="background-image:url('/images/delete.png');"></label>
              <label onClick="showReviews(${
                meal.id
              })" alt="Meal Reviews" style="background-image:url('/images/testimonial.png');"></label>
            </span>

            <iframe name="blankframe" style="display:none" src="about:blank"></iframe>
            
            <div id="updatemeal" style="display: none;">
              <h3>Edit / Update Meal </h3>
              <form autocomplete="on" target="blankframe" action="about:blank">
                <ul>
                  <li>
                    <lable>Meal Title</lable>
                    <input value="${meal[0].title}" id='meal-title'>
                  </li>
                  <li>
                    <lable>Location</lable>
                    <input value='${meal[0].location}' id='meal-location'>
                  </li>
                  <li>
                    <lable>When</lable>
                    <input value='${whenDateTime}' id='meal-when'>
                  </li>
                  <li>
                    <lable>Maximum no of reservations</lable>
                    <input value='${
                      meal[0].max_reservations
                    }' id='meal-maxreserv'>
                  </li>
                  <li>
                    <lable>Price</lable>
                    <input value='${meal[0].price}' id='meal-price'>
                  </li>
                  <li class="fullwidth">
                    <lable>Description</lable>
                    <textarea placeholder='${
                      meal[0].description
                    }' id='meal-desc'>${meal[0].description}</textarea>
                  </li>
                </ul>
                <button onClick="updateMeal(${meal[0].id})">Update Meal</button>
              </form>
            </div>

            <div id="showreviews" style="display: none;">
              <h3>What our clients say. </h3>       
              <ul>
                <li>
                  <div class="userpic">
                    <img src="../images/user-pic.png">
                  </div>
                  <div class="mealreviews">
                    <h3>${meal[0].review_title}</h3>
                    <p>${meal[0].review_description}</p>
                    <ul id="ratings">
                    ${starsfig(meal[0].stars)}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            <div id="reservation" style="display: none;">
              <h3>Meal Reservation !!! </h3>
              <ul>
                <li><input id="name" placeholder="Name"></li>
                <li><input id="phone" placeholder="Phone number"></li>
                <li><input id="email" placeholder="Email ID"></li>
                <li>
                  <button onClick="mealReservation(${
                    meal[0].id
                  })">Reserve</button>
                </li>
              </ul>
            </div>

          </div>
        
      </div>


      

      <footer>
        <a href="/" data-navigo>Home </a>
        <a href="meals" data-navigo>Meals </a>
        <a href="featuredmeals" data-navigo>featured Meals</a>
      </footer>
      `;
      showSlides(imagelinkarray);
    });

  // if any links are added to the dom, use this function
  // make the router handle those links.
  router.updatePageLinks();
};
