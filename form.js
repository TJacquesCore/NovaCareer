document.getElementById("studentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const field = document.getElementById("field").value;
  const goal = document.getElementById("goal").value.trim();

  if (!fullname || !email || !phone || !field || !goal) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  alert("Merci pour votre inscription, " + fullname + " ! Nova Career vous contactera très bientôt.");
  this.reset();
});