# ecomfrontend

## Project info

- Set up a new project in vue named ecomfrontend. Have used Vuex to manage our application state,Vue router for navigation and Axios to fetch data from the API.

## Setup(Install required packages)

- Vuex -> npm install vuex --save
.Data stored in the Vuex store can be accessed from any component in the application.In the index.js of the store path, imported the modules of vuex.

- Vue Router -> npm install vue-router --save
.Vue router helps us to navigate the pages of our application.Created Roter folder and index.js file(src/router/index.js)

- Axios -> npm i axios vue-axios --save
.We can send data and retrieve data through the Rest API.

- Vuelidate -> npm install vuelidate --save
.For validations.All the above are imported in main.js file.

- Common folder(src/common/)
.Created JWTtoken.js to save token, Service.js to export all api functions(all backend api calls) and url.js to export main api url.

- localStorage 
.To set the data-> localStorage.setItem(key,value)
.To read data-> localStorage.getItem(key)
.To remove data->localStorage.removeItem(key)

## Homepage 

- Homepage integration is done using the given theme.

- Create necessary components
-Created includes folder in which slider.vue and sidebar.vue components are stored.
.Created all other necessary ecommerce vue components

## User Registration and Login
- Frontend users can register and login. Role type for front end user is customer

## Cart and wishlist

- User can add products to cart. User will be able to add the product to his wish list and should be logged in to the system in order to save this in wish list.

## Checkout

- User have to provide address and can apply coupon by entering it to the textbox and clicking apply coupon and price would be reduced. For successful checkout, order is placed.
Otherwise, have to add address and apply valid coupon code if something went wrong.

## My Account

- After logging in user will be able to view profile, edit profile and can change passwords.

## Track orders

- User can see the order details and status in Track orders.

## Contact us

- User will be able to post the queries from frontend form. Admin will be able to see those in backend.

## To run the project
- npm install
- npm run serve
- For test login Email:first@gmail.com Password:1234567890
