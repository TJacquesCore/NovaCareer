document.getElementById("studentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const field = document.getElementById("field").value;
  const filiere = document.getElementById("filiere").value.trim();
  const city = document.getElementById("city").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const goal = document.getElementById("goal").value.trim();
  const additionalInfo = document.getElementById("additionalInfo").value.trim();

  if (!fullname || !email || !phone || !field || !filiere || !city || !dob || !goal) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  console.log({
    fullname,
    email,
    phone,
    field,
    filiere,
    city,
    dob,
    goal,
    additionalInfo
  });

  alert("Merci pour votre inscription, " + fullname + " ! ORIA vous contactera très bientôt.");
  this.reset();
});