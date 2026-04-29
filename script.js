// Show/hide password
function togglePw(id, btn) {
  const el = document.getElementById(id);
  el.type = el.type === "password" ? "text" : "password";
  btn.textContent = el.type === "password" ? "👁" : "🙈";
}

// Password strength
document.getElementById("password").addEventListener("input", function () {
  const v = this.value;
  const score = [v.length >= 8, /[A-Z]/.test(v), /\d/.test(v), /\W/.test(v)].filter(Boolean).length;
  const colors = ["#333", "#f87171", "#fb923c", "#facc15", "#22c55e"];
  const labels = ["", "Weak", "Fair", "Good", "Strong 💪"];

  const fill  = document.getElementById("strengthFill");
  const label = document.getElementById("strengthLabel");

  fill.style.width      = (score * 25) + "%";
  fill.style.background = colors[score];
  label.textContent     = v.length ? labels[score] : "";
  label.style.color     = colors[score];
});

// Submit
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const get = id => document.getElementById(id).value.trim();
  const pw  = get("password");

  const checks = {
    name:     [get("name") === "",                        "Name is required."],
    email:    [!/\S+@\S+\.\S+/.test(get("email")),        "Enter valid email."],
    phone:    [!/^\+?[\d\s\-]{7,15}$/.test(get("phone")), "Enter valid phone."],
    dob:      [get("dob") === "",                         "DOB is required."],
    password: [pw.length < 8,                             "Min 8 characters."],
    confirm:  [get("confirm") !== pw,                     "Passwords don't match."]
  };

  let ok = true;
  for (const [id, [fail, msg]] of Object.entries(checks)) {
    document.getElementById(id + "Err").textContent = fail ? msg : "";
    document.getElementById(id).className = fail ? "invalid" : "valid";
    if (fail) ok = false;
  }

  if (ok) {
    this.style.display = "none";
    document.getElementById("successMsg").style.display = "block";
  }
});