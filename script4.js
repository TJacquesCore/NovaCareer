// etudiants.js

document.addEventListener("DOMContentLoaded", function () {
  const stageBtn = document.querySelector(".btn");
  const formationBtn = document.querySelector(".btn-secondary");

  stageBtn.addEventListener("click", function () {
    alert("Redirection vers les offres de stage ORIA...");
    // window.location.href = "stages.html";
  });

  formationBtn.addEventListener("click", function () {
    alert("Redirection vers les formations certifiantes...");
    // window.location.href = "formations.html";
  });
});