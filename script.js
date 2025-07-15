document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("moodForm");
  const entriesContainer = document.getElementById("entriesContainer");

  // 🔹 SAVE ENTRY
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const mood = document.getElementById("mood").value;
      const title = document.getElementById("title").value;
      const note = document.getElementById("note").value;

      const entry = {
        mood,
        title,
        note,
        date: new Date().toLocaleString()
      };

      const existing = JSON.parse(localStorage.getItem("moodEntries")) || [];
      existing.push(entry);
      localStorage.setItem("moodEntries", JSON.stringify(existing));

      alert("🌟 Mood entry saved!");
      form.reset();
    });
  }

  // 🔹 DISPLAY & DELETE ENTRY
  if (entriesContainer) {
    let entries = JSON.parse(localStorage.getItem("moodEntries")) || [];

    if (entries.length === 0) {
      entriesContainer.innerHTML = "<p>No entries yet. Try adding one!</p>";
      return;
    }

    entries.reverse().forEach((entry, index) => {
      const card = document.createElement("div");
      card.className = "entry-card";

      card.innerHTML = `
        <h2>${entry.mood} - ${entry.title}</h2>
        <p><strong>Date:</strong> ${entry.date}</p>
        <p>${entry.note}</p>
        <button class="delete-btn" data-index="${index}">🗑 Delete</button>
      `;

      entriesContainer.appendChild(card);
    });

    // Delete logic
    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        const all = JSON.parse(localStorage.getItem("moodEntries")) || [];
        all.splice(all.length - 1 - index, 1); // Reverse fix
        localStorage.setItem("moodEntries", JSON.stringify(all));
        location.reload();
      });
    });
  }
});
