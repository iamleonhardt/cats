/**
 * Created by Bill on 1/4/17.
 */

var game;

$(document).ready(function () {
    game = new GameController();
    game.init('#gameArea');
    $('#loginBtn').click(logIn);
    $('#signUpBtn').click(signUp);
    $('#logoutBtn').click(logOut);
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
var database = firebase.database();

function logIn (){
    console.log('login clicked');
    // Get email and Password
    var email = $('#emailInput').val();
    var pass = $('#passInput').val();
    // Sign In
    var promise = auth.signInWithEmailAndPassword(email, pass);
    $('#emailInput').val('');
    $('#passInput').val('');
    promise.catch(function(data){
        console.log(data.message)
    })
}

function signUp (){
    // console.log('signUp clicked');
    // Get email and Password
    var name = $('#nameInput').val();
    var email = $('#emailInput').val();
    var pass = $('#passInput').val();

    // Sign Up
    var promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
        .then(function(){
            var uid = auth.currentUser.uid;
            var userRef = database.ref().child('users').child(uid);
            var values = {'username': name, 'email': email};
            userRef.update(values);
        })
        .catch(function(data){
        console.log('catch data : ', data.message)
    })
}

function logOut (){
    firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(function(firebaseUser){
    // User is logged in
    if(firebaseUser){
        // console.log('firebaseUser is : ', firebaseUser);
        var uid = auth.currentUser.uid;
        var userRef =  firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
            var username = snapshot.val().username;
            $('#userNameHUD').text(username);
            game.makeHero(username,200, 200);
        });

        $('#logoutBtn').removeClass('hide');
        $('#loginUI').addClass('hide');

        $('#heroHUDContainer').removeClass('hide');

        // User is logged out
    } else {
        console.log('User not logged in');
        $('#settingsUI').toggleClass('hide');
        $('#loginUI').toggleClass('hide');
        $('#heroHUDContainer').addClass('hide');
    }
});