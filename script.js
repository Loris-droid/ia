const API_URL = "https://api.lorishuon.ovh/ask"; // backend via Cloudflare Tunnel

const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatHistory = document.getElementById("chat-history");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const question = userInput.value.trim();
  if (!question) return;

  // Ajoute message utilisateur
  addMessage("user", question);
  userInput.value = "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    if (!response.ok) {
      addMessage("bot", "❌ Erreur : Impossible de contacter l’API.");
      return;
    }

    const data = await response.json();
    addMessage("bot", data.answer || "Réponse vide de l’IA.");
  } catch (error) {
    addMessage("bot", "⚠️ Erreur de connexion à l’API.");
  }
});

function addMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add(sender === "user" ? "user-message" : "bot-message");
  message.textContent = text;

  const wrapper = document.createElement("div");
  wrapper.appendChild(message);

  chatHistory.appendChild(wrapper);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}
