/*
Michael Owen & Durias Thomas
Spring 2018
cis 269
Team Project
Week 9
Project from: https://github.com/Hydrosaur/charge
*/

var stop = false;
var usermove = "";
var moves = ["Charg","Block","Attack"];
var userCharge = 0;
var CPUCharge = 0;
var userLives = 3;
var clientuser;
var username = 'UnknownHero'; // Changed default username
var CPULives = 3;
var turns = 0;
var cpumove = moves[Math.floor((Math.random() * 3) + 0)];
var foe = generateEnemyName(); // generate random name for enemy
var blockingsize = '230';
var attackingsize = '230';
var chargingsize = '130';
var staysize = '130';
var hitsize = '230';

function start() {
  clientuser = prompt("Username:");

  // set username
  if (clientuser != null && clientuser != "") {
    username = clientuser
  };
  gui();
  $("#username").text(username); // add user name to health bar
  $("#foename").text(foe); // add foe name to health bar
  $("#startbtn").css("display", "none");

  // add foe and user elements
  $("#foe").append("<h5 id='rightlivesheader' class='headers'>Health:</h5><div class='progress' id='lives'><div class='progress-bar' role='progressbar' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 100%' id='rightbar'></div></div><h5 id='rightchargeheader' class='headers'>Charge:</h5><div class='progress' id='charge'><div class='progress-bar' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 0%' id='chargerightbar'></div></div>");
  $("#user").append("<h5 id='leftlivesheader' class='headers'>Health:</h5><div class='progress' id='lives'><div class='progress-bar' role='progressbar' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 100%' id='leftbar'></div></div><h5 id='leftchargeheader' class='headers'>Charge:</h5><div class='progress' id='charge'><div class='progress-bar' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 0%' id='chargeleftbar'></div></div>");
}

// function to generate random enemy names
function generateEnemyName() {
  var a = ["xX", "xx"];
  var b = ["Dara", "Barrett", "Patience", "Dalton", "Quincy", "Davis", "Jack", "Oren", "Xander", "Yoshio", "Zia", "Jeanette", "Lionel", "Griffin", "Pascale", "Casey", "Jacqueline", "Charde",
      "Vance", "Ezra", "Sarah", "Reece", "Barbara", "Aaron", "Zelenia", "Kimberley", "Imogene", "Casey", "Reese", "Shannon", "Drake", "Ferris", "Malachi", "Nissim", "Odessa", "Giselle",
      "Brent", "Tarik", "Zena", "Herman", "Ria", "Aileen", "Raya", "Logan", "Brody", "Prescott", "Donovan", "Gregory", "Eaton", "Leroy", "Alexis", "Paul", "Keely", "Thaddeus",
      "Shannon", "Dane", "Price", "Charde", "Gabriel", "Sarah", "Jemima", "Ian", "Arando", "Thaddeus", "Paki", "Dylan", "Aline", "Malachi", "Buffy", "Callum", "Hollee", "Lionel",
      "Autumn", "Cody", "Janna", "Nathaniel", "Giselle", "Christopher", "Quinn", "Gabriel", "Mohammad", "Dieter", "Chandler", "Juliet", "Keely", "Charlotte", "Callum", "Ira", "Darrel",
      "Gavin", "Rahim", "Voldemort", "Buckminster", "Demetria", "Procrastination", "Nevada", "Hammett", "Hayley", "Jana", "Zahir"];
  var c = ["Xx", "xx"];
  var rA = Math.floor(Math.random() * a.length);
  var rB = Math.floor(Math.random() * b.length);
  var rC = Math.floor(Math.random() * c.length);
  var name = a[rA] + b[rB] + c[rC];
  return name;
}


function beginAgain() {
  location = location
}

function gui(){
  $("#leftplayer").attr("src", "img/stay.PNG").attr("width", staysize);
  $("#rightplayer").attr("src", "img/stay.PNG").attr("width", staysize);
  $(".gui").append("<div id='movepick'><h3>What move are you going to use?<br></h3><button onclick='charge();'><img src='img/electric.png' class='icon'></button><button onclick='attack();'><img src='img/dualsword.png' class='icon'></button><button onclick='block();'><img src='img/shield.png' class='icon'>");
  $(".headers").css("display", "block");
  
}

function turnWrapup() {
  $("#leftbar").css("width", (userLives * 33.3) + '%');
  $("#rightbar").css("width", (CPULives * 33.3) + '%');
  $("#chargeleftbar").css("width", (userCharge * 25) + '%');
  $("#chargerightbar").css("width", (CPUCharge * 25) + '%');
  turns++;
}

function charge() {
  usermove = "Charg";
  resumeGame();
}
function attack() {
  usermove = "Attack";
  resumeGame();
}
function block() {
  usermove = "Block";
  resumeGame();
}

function resumeGame(){
    if(CPUCharge > 0){
      cpumove = moves[Math.floor((Math.random() * 3) + 0)];
    } else {
      cpumove = 'Charg';
    }
    $("#comment").html("<h3 id='comment'>"+ foe +" was "+ cpumove +"ing while " + username +  " was "+ usermove +"ing</h3><br class='end'>");
    console.log("Text Replaced");

    // Speed up game play by decreasing waittime from 3500 to 2000
    waittime = 2000;
    if(usermove == "Charg"){
        $("#leftplayer").attr("src", "").attr("width", "0");
        $("#leftplayer").attr("src", "img/charging.gif").attr("width", chargingsize);
        if(userCharge < 4) {
          userCharge++;
        }
    }
    if(cpumove == "Charg"){
        $("#rightplayer").attr("src", "").attr("width", "0");
        $("#rightplayer").attr("src", "img/charging.gif").attr("width", chargingsize);
        if(CPUCharge < 4) {
          CPUCharge++;
        }
    }
    if (usermove == "Block") {
      $("#leftplayer").attr("src", "").attr("width", "0");
      $("#leftplayer").attr("src", "img/blocking.gif").attr("width", blockingsize);
    }
    if (cpumove == "Block") {
      $("#rightplayer").attr("src", "").attr("width", "0");
      $("#rightplayer").attr("src", "img/blocking.gif").attr("width", blockingsize);
    }
    if (usermove == "Attack") {
      if(userCharge > 0){
        $("#rightplayer").attr("src", "").attr("width", "0");
        $("#rightplayer").attr("src", "img/hit.gif").attr("width", hitsize);
        $("#leftplayer").attr("src", "").attr("width", "0");
        $("#leftplayer").attr("src", "img/attacking.gif").attr("width", attackingsize);
      } else {
        gametip();
        setTimeout(gametip, 3000)
      }
    }
    if (cpumove == "Attack") {
      $("#rightplayer").attr("src", "").attr("width", "0");
      $("#rightplayer").attr("src", "img/attacking.gif").attr("width", attackingsize);
      $("#leftplayer").attr("src", "").attr("width", "0");
      $("#leftplayer").attr("src", "img/hit.gif").attr("width", hitsize);
    }
    if(usermove == "Attack"){
        if(userCharge > 0) {
          userCharge--;
          if(cpumove != "Block"){
              CPULives--;
          } else {
            $("#rightplayer").attr("src", "").attr("width", "0");
            $("#rightplayer").attr("src", "img/blocking.gif").attr("width", blockingsize);
          }
        }
    }
    if(cpumove == "Attack"){
        if(CPUCharge > 0){
          CPUCharge--;
          if(usermove != "Block"){
              userLives--;
          } else {
            $("#leftplayer").attr("src", "").attr("width", "0");
            $("#leftplayer").attr("src", "img/blocking.gif").attr("width", blockingsize);
          }
        }
    }
    if(cpumove == "Attack" && usermove == "Attack"){
      if(userCharge > 0) {
        $("#leftplayer").attr("src", "").attr("width", "0");
        $("#leftplayer").attr("src", "img/attacking.gif").attr("width", blockingsize);
        $("#rightplayer").attr("src", "").attr("width", "0");
        $("#rightplayer").attr("src", "img/attacking.gif").attr("width", blockingsize);
        waittime = 5000;
        setTimeout(doubleKill, 1500);
      }
    }
    turnWrapup();
    if (userLives < 1 && CPULives < 1){
      $("h4,table,.end").remove();
      $("#playarea").append("<div class='endtext' id='endtie'><h1>It's A Tie!</h1></div>");
      $(".endarea").css("visibility", "visible"); // makes restart button visible
    } else {
        if(userLives < 1){
             $("h4,table,.end").remove();
             $("#playarea").append("<div class='endtext' id='endfoe'><h1>"+ foe + " Wins!</h1></div>");
             setTimeout(opWin, waittime);
             $("#leftplayer").attr("src", "").attr("width", "0");
             $("#leftplayer").attr("src", "img/dead.PNG").attr("width", "200");
             $(".endarea").css("visibility", "visible");  // makes restart button visible
        } else if(CPULives < 1){
             $("h4,table,.end").remove();
             $("#playarea").append("<div class='endtext' id='enduser'><h1>"+ username + " Wins!</h1></div>");
             setTimeout(userWin, waittime);
             $("#rightplayer").attr("src", "").attr("width", "0");
             $("#rightplayer").attr("src", "img/dead.PNG").attr("width", "200");
             $(".endarea").css("visibility", "visible"); // makes restart button visible
        } else {
            $("#movepick").remove();
            setTimeout(gui, waittime);
            $(".end").remove();
        }
    }
}

function doubleKill(){
  $("#leftplayer").attr("src", "").attr("width", "0");
  $("#leftplayer").attr("src", "img/hit.gif").attr("width", hitsize);
  $("#rightplayer").attr("src", "").attr("width", "0");
  $("#rightplayer").attr("src", "img/hit.gif").attr("width", hitsize);
}

function gametip() {
  var popup = document.getElementById('gametips');
  popup.classList.toggle('show');
}

function userWin(){
  $("#leftplayer").attr("src", "").attr("width", "0");
  $("#leftplayer").attr("src", "img/win.gif").attr("width", "200");
}

function opWin(){
  $("#rightplayer").attr("src", "").attr("width", "0");
  $("#rightplayer").attr("src", "img/win.gif").attr("width", "200");
}

function reloadConsole() {
  var container = document.getElementById("console");
  var content = container.innerHTML;
  container.innerHTML= content;
}
