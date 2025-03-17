async function sendMessage() {
    const input = document.getElementById("input").value;
    const chatBox = document.getElementById("chat-box");

    if (!input.trim()) return;

    // Display user's message
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user");
    userMessage.innerHTML = `<p><strong>You:</strong> ${input}</p>`;
    chatBox.appendChild(userMessage);

    // Clear input
    document.getElementById("input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Display bot thinking
    const botMessage = document.createElement("div");
    botMessage.classList.add("message", "bot");
    botMessage.innerHTML = "<p><strong>Lowhealth:</strong> Thinking...</p>";
    chatBox.appendChild(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "deepseek-coder-v2",
                prompt: input,
                stream: false
            })
        });

        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        const data = await response.json();

        // Fix new lines issue
        const formattedText = data.response.replace(/\n/g, "<br>");

        botMessage.innerHTML = `<p><strong>Lowhealth:</strong> ${formattedText}</p>`;
    } catch (error) {
        console.error("Fetch error:", error);
        botMessage.innerHTML = "<p><strong>Lowhealth:</strong> Error connecting!</p>";
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}
