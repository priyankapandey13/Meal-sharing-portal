var root = document.location.origin;
var router = new Navigo(root);

// when no route specified it assumes the base route: "/"
router.on(window.handleHomeRequest).resolve();
router.on("/meals", window.handleMealsRequest).resolve();
router.on("/meal/:id", window.handleMealRequest).resolve();
router.on("/reservations/:id", window.handleReservationsRequest).resolve();
router.on("/featuredmeals", window.handlefeaturedmealsRequest).resolve(); 

