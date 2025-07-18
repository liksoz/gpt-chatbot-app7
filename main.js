const chatbox = document.getElementById("chatbox");
const input = document.getElementById("userInput");
const btn = document.getElementById("sendBtn");

async function sendMessage() {
  const msg = input.value.trim();
  if (!msg) return;
  chatbox.innerHTML += `<div class="message user">🙂 ${msg}</div>`;
  input.value = "";

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({message: msg})
  });
  const data = await res.json();
  chatbox.innerHTML += `<div class="message bot">🤖 ${data.reply}</div>`;
  chatbox.scrollTop = chatbox.scrollHeight;
}

btn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => { if(e.key === "Enter") sendMessage(); });
