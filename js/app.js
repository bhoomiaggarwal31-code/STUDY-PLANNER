const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click",() => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")){
    toggleBtn.textContent = "☀️ Light Mode";
    localStorage.setItem("theme","dark");
  }else{
    toggleBtn.tectContent = "🌙 Dark Mode";
    localStorage.setItem("theme","light");
  }
})


//remember the theme on reload
if (localStorage.getItem("theme") === "dark"){
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️ Light Mode";
}  
