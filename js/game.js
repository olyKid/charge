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
var foe = 'Procrastination';
var blockingsize = '230';
var attackingsize = '430';
var chargingsize = '130';
var staysize = '130';
var hitsize = '230';

$(".bar").css("display", "none");
$(".headers").css("display", "none");
$("#leftbar").css("style","width: " + (userLives * 33 + 1) + '%');
$("#rightbar").css("width", (CPULives * 33 + 1) + '%');
$("#chargeleftbar").css("width", (userCharge * 25) + '%');
$("#chargerightbar").css("width", (CPUCharge * 25) + '%');

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
  $("#foe").append("<h3 id='rightlivesheader' class='headers'>Health:</h3><div class='progress' id='lives'><div class='progress-bar' role='progressbar' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 100%' id='rightbar'></div></div><h3 id='rightchargeheader' class='headers'>Charge:</h3><div class='progress' id='charge'><div class='progress-bar' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 0%' id='chargerightbar'></div></div>")
  $("#user").append("<h3 id='leftlivesheader' class='headers'>Health:</h3><div class='progress' id='lives'><div class='progress-bar' role='progressbar' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 100%' id='leftbar'></div></div><h3 id='rightleftheader' class='headers'>Charge:</h3><div class='progress' id='charge'><div class='progress-bar' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 0%' id='chargeleftbar'></div></div>")
 
}

function gui(){
  $("#leftplayer").attr("src", "img/stay.PNG").attr("width", staysize);
  $("#rightplayer").attr("src", "img/stay.PNG").attr("width", staysize);
  $(".gui").append("<div id='movepick'><h3>What move are you going to use?<br></h3><button onclick='charge();'><img src='img/electric.png' class='icon'></button><button onclick='attack();'><img src='img/dualsword.png' class='icon'></button><button onclick='block();'><img src='img/shield.png' class='icon'></button><br><button class='endgame' onclick='endgame();'>End Game</button></div><br class='end'>");
  $(".bar").css("display", "block");
  $(".headers").css("display", "block");
  
}

function turnWrapup() {
  $("#leftbar").css("width", (userLives * 33 + 1) + '%');
  $("#rightbar").css("width", (CPULives * 33 + 1) + '%');
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
function endgame() {
  usermove = "stop";
  resumeGame();
}

function resumeGame(){
    if(CPUCharge > 0){
      cpumove = moves[Math.floor((Math.random() * 3) + 0)];
    } else {
      cpumove = 'Charg';
    }
    $("#comment").html("<h3 id='comment'>"+ foe +" was "+ cpumove +"ing while you were "+ usermove +"ing</h3><br class='end'>");
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
    if(usermove == "stop"){
        $("h4,table,.end").remove();
    } else if(userLives < 1 && CPULives < 1){
      $("h4,table,.end").remove();
      $("body").append("<h1>It's A Tie!</h1>");
    } else {
        if(userLives < 1){
             $("h4,table,.end").remove();
             $("body").append("<h1>"+ foe + " wins!</h1>");
             setTimeout(opWin, waittime);
             $("#leftplayer").attr("src", "").attr("width", "0");
             $("#leftplayer").attr("src", "img/dead.PNG").attr("width", "300");
        } else if(CPULives < 1){
             $("h4,table,.end").remove();
             $("body").append("<h1><b>"+ username + " wins!</b></h1>");
             setTimeout(userWin, waittime);
             $("#rightplayer").attr("src", "").attr("width", "0");
             $("#rightplayer").attr("src", "img/dead.PNG").attr("width", "300");
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
  $("#leftplayer").attr("src", "img/win.gif").attr("width", "300");
}

function opWin(){
  $("#rightplayer").attr("src", "").attr("width", "0");
  $("#rightplayer").attr("src", "img/win.gif").attr("width", "300");
}

function reloadConsole() {
  var container = document.getElementById("console");
  var content = container.innerHTML;
  container.innerHTML= content;
}
