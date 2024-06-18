# Beach Umbrella Booking App

## Overview
This Vue 3 web application is a Front-end of the Ombrellone project (Back-end can be found [here](https://github.com/Zophirel/ombrellone-server))

The app allows users to book beach umbrellas and other services. The app offer features like user authentication, account management, booking management, and in-app payments.
The payments are made via Stripe or PayPal, after the payment the user can view past bookings, the booked page displays detailed information about the booking and includes a QR code for verification in order to verify it on site.

## Features
- **User Authentication**
  - Login
  - Signup
  - Password Recovery
- **Account Management**
  - Edit Account Information
- **Booking Management**
  - Book an Umbrella
  - View Past Bookings
- **Payment Integration**
  - Stripe Card Payment
  - PayPal Payment


## Project Structure
The project follows the Clean Architecture foundamentals
```
.
|   .env
|   .gitignore
|   index.html
|   LICENSE
|   package-lock.json
|   package.json
|   README.md
|   vite.config.js
|  
+---src
    |   App.vue
    |   authModals.css
    |   main.js
    |   router.js
    |   style.css
    |   
    +---assets
    |   |   ...
    |           
    +---data
    |   +---datasources
    |   |       payment.js
    |   |       place.js
    |   |       user.js
    |   |       
    |   +---entities
    |   |       user.js
    |   |       
    |   +---mappers
    |   |       userMapper.js
    |   |       
    |   +---repository
    |           place.js
    |           user.js
    |           
    +---domain
    |   +---place
    |   |       place.js
    |   |       placeStore.js
    |   |       
    |   +---user
    |           user.js
    |           userStore.js
    |           
    +---presentation
        +---components
            |   HomePage.vue
            |   
            +---auth
            |       AuthModal.vue
            |       LoginModal.vue
            |       LostPassModal.vue
            |       ResetPassModal.vue
            |       ResponseNotification.vue
            |       SignupModal.vue
            |       
            +---logged
            |       AccountModal.vue
            |       BookedInfo.vue
            |       BookedModal.vue
            |       LoggedIn.vue
            |       
            +---reservation
                    BookingPage.vue
                    Calendar.vue
                    CalendarCell.vue
                    Ombrellone.vue
                    Payment.vue
                    PaymentSuccess.vue
                    PayPalButton.vue
                    PlaceList.vue
                    ReservationModal.vue
                    SeatCounter.vue
```
## Installation
1. **Clone the repository** 
```bash
git clone https://github.com/Zophirel/ombrellone-vue.git
cd ombrellone-vue
```
2. **Install dependencies**
```
npm install
```
3. **Create a .env file, set your Stripe and Paypal API keys**
```
VITE_PAYPAL_KEY=...
VITE_STRIPE_KEY=...
```
4. **Run the project** 
```
(in order to access all the app pages and features is necessary that the Back-end is running too)
npm run dev
```

## Views (Presentations)
the main views of the app are rapresented by:
1. `HomePage.vue`: Landing page.
2. `LoggedIn.vue`: Page presented to the user after logging in.
3. `BookingPage.vue`: Graphical beach map representation to facilitate umbrella selection.
4. `Payment.vue`: Page presented to the user after selecting booking options.

The navigation across the features of the app can be found in the LoggedIn component which presents a menu that let the user book a new reservation, edit its account data or check new / old reservations 

## Screenshots 
<details>
  <summary>Home Page</summary>
  <img width="200" src="https://i.imgur.com/GGTIOHa.png" alt="Home Page"/>
  <img width="200" src="https://i.imgur.com/QrNvl4U.png" alt="Login Modal"/>
</details>
<details>
  <summary>Logged In Page</summary>
  <img width="200" src="https://i.imgur.com/OuQdQJr.png" alt="Logged In Page"/>
  <img width="200" src="https://i.imgur.com/g6gpu1C.png" alt="Edit User Info Modal"/>
  <img width="200" src="https://i.imgur.com/7Z5WTQz.png" alt="Booked Modal"/>
  <img width="200" src="https://i.imgur.com/WBeimrJ.png" alt="Booked Info Page"/>
</details>
<details>
  <summary>Booking</summary>
  <img width="200" src="https://i.imgur.com/91B40VY.png" alt="Booking Modal"/>
  <img width="200" src="https://i.imgur.com/5jJfqGc.png" alt="Booked Modal Calendar Open"/>
  <img width="200" src="https://i.imgur.com/RT959GV.png" alt="Booking Map Page"/>
  <img width="200" src="https://i.imgur.com/YzBvrQG.png" alt="Payment Page"/>
</details>

## State Managment
[Pinia](https://pinia.vuejs.org/ "Pinia") is used in order to persist components states inside the App, the implementations can be found under the `/domain/*store.js` folder, while the routing is handled by [Vue Router](https://router.vuejs.org/guide/advanced/composition-api "Vue Router") and can be found in the `router.js` file

## To-do
- [ ] Web Socket communication in order to sync bookings across clients
- [ ] Delete / Modify reservations
- [ ] Add email service (right now the password can be changed by accessing the `/resetpassword/<token>` route, the token is sent to the client directly)
