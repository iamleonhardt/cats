/**
 * Created by Bill on 1/4/17.
 */

var game;

$(document).ready(function () {
    game = new GameController();
    game.init('#gameArea');
    // $('#loginBtn').click(signIn);
    game.addEventHandlers();
});

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDtSCViay3etU5hS3A2lR70gws6uK29oak",
    authDomain: "hero-59c46.firebaseapp.com",
    databaseURL: "https://hero-59c46.firebaseio.com",
    storageBucket: "hero-59c46.appspot.com",
    messagingSenderId: "484551523140"
};
firebase.initializeApp(config);

var auth = firebase.auth();

// Store elements
var loginBtn = $('#loginBtn');
var createAcctBtn = $('#createAcctBtn');
var emailInput = $('#emailInput');
var passInput = $('#passInput');

// Add login event
loginBtn.click(function(){
    // Get email and Password
    var email = emailInput.val();
    var pass = passInput.val();
    // Sign In
    auth.signInWithEmailAndPassword(email, password);
});

//
// var provider = new firebase.auth.GoogleAuthProvider();
//
// function signIn(){
//     firebase.auth().signInWithRedirect(provider);
// }
//
//
// firebase.auth().getRedirectResult().then(function(result) {
//     if (result.credential) {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         var token = result.credential.accessToken;
//         // ...
//     }
//     // The signed-in user info.
//     var user = result.user;
// }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
// });
