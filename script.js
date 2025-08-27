const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  // Afficher le message de l'utilisateur
  chatBox.innerHTML = `<div class="text-right mb-2"><span class="bg-blue-500 text-white px-3 py-2 rounded-lg inline-block">${message}</span></div>` + chatBox.innerHTML;

  userInput.value = "";

  try {
    // Envoi au backend (API)
    const response = await fetch("https://api.lorishuon.ovh/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    if (!response.ok) throw new Error("Erreur serveur");

    const data = await response.json();
    const reply = data.reply || "Désolé, je n’ai pas compris.";

    // Afficher la réponse de l’IA
    chatBox.innerHTML = `<div class="text-left mb-2"><span class="bg-gray-200 px-3 py-2 rounded-lg inline-block">${reply}</span></div>` + chatBox.innerHTML;

  } catch (err) {
    chatBox.innerHTML = `<div class="text-left mb-2 text-red-500">❌ Erreur de connexion à l’API.</div>` + chatBox.innerHTML;
  }
});
