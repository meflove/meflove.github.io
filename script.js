// Create floating particles
const particlesContainer = document.getElementById("particles");
const particleCount = 30;

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDelay = Math.random() * 10 + "s";
  particle.style.animationDuration = Math.random() * 10 + 10 + "s";
  particlesContainer.appendChild(particle);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// Magnetic button effect
const magneticButtons = document.querySelectorAll(
  ".social-link, .btn-secondary, .contact-card",
);

magneticButtons.forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});

// Cursor glow effect on cards
const cards = document.querySelectorAll(
  ".about-card, .project-card, .contact-card",
);

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

// Terminal functionality
const terminalInput = document.getElementById("terminal-input");
const terminalOutput = document.getElementById("terminal-output");
const terminalBody = document.getElementById("terminal-body");

let commandHistory = [];
let historyIndex = -1;

const commands = {
  help: {
    description: "Show available commands",
    execute: () => {
      return `
<span class="terminal-success">Available Commands:</span><br><br>

  <span class="terminal-command">help</span>      - Show this help message<br>
  <span class="terminal-command">about</span>     - About me<br>
  <span class="terminal-command">projects</span>  - List my projects<br>
  <span class="terminal-command">stack</span>     - Show my tech stack<br>
  <span class="terminal-command">contact</span>   - Get contact information<br>
  <span class="terminal-command">clear</span>     - Clear terminal<br>
  <span class="terminal-command">whoami</span>    - Display current user<br>
  <span class="terminal-command">date</span>      - Show current date and time<br>
  <span class="terminal-command">neofetch</span>  - Display system info<br><br>

<span class="terminal-info">Tip: Use ↑/↓ arrows to navigate command history</span>
`;
    },
  },
  about: {
    description: "About me",
    execute: () => {
      return `
<span class="terminal-success">👋 Hey there! I'm meflove</span><br><br>

<span class="terminal-info">
I'm a backend engineer passionate about:<br>
  • Building scalable backend systems with Python & PostgreSQL<br>
  • Creating intelligent bots for automation<br>
  • Learning Rust for systems programming<br><br>

  Based: Russia 🇷🇺<br>
  OS: NixOS with Hyprland<br>
  Editor: Neovim<br>
</span>`;
    },
  },
  projects: {
    description: "List projects",
    execute: () => {
      return `
<span class="terminal-success">📁 Featured Projects:</span><br><br>

<span class="terminal-command">telegram-obsidian</span><br>
  <span class="terminal-info">Obsidian integration with Telegram</span><br>
  <span class="terminal-link">https://github.com/meflove/telegram-obsidian</span><br><br>

<span class="terminal-command">nixos-config</span><br>
  <span class="terminal-info">Flake-based NixOS configuration</span><br>
  <span class="terminal-info">🏷️  NixOS, Hyprland, Lix</span><br>
  <span class="terminal-link">https://github.com/meflove/nixos-config</span><br><br>

<span class="terminal-command">angeldust-nixCats</span><br>
  <span class="terminal-info">Neovim configuration with nixCats</span><br>
  <span class="terminal-info">🏷️  Neovim, Lua, Nix</span><br>
  <span class="terminal-link">https://github.com/meflove/angeldust-nixCats</span><br><br>

<span class="terminal-info">View all: <span class="terminal-link">https://github.com/meflove?tab=repositories</span></span>
`;
    },
  },
  stack: {
    description: "Show tech stack",
    execute: () => {
      return `
<span class="terminal-success">🛠️  Tech Stack:</span><br><br>

<span class="terminal-command">Languages:</span><br>
  <span class="terminal-info">Python  Rust  Bash</span><br><br>

<span class="terminal-command">Backend:</span><br>
  <span class="terminal-info">PostgreSQL  Python  FastAPI</span><br><br>

<span class="terminal-command">Tools:</span><br>
  <span class="terminal-info">Neovim  Git  NixOS  Obsidian</span><br><br>

<span class="terminal-command">OS:</span><br>
  <span class="terminal-info">NixOS (flake-based) • Niri • Nvidia</span><br>
`;
    },
  },
  contact: {
    description: "Get contact info",
    execute: () => {
      return `
<span class="terminal-success">📬 Contact Information:</span><br><br>

<span class="terminal-command">Email:</span><br>
  <span class="terminal-info">meflov3r@icloud.com</span><br><br>

<span class="terminal-command">GitHub:</span><br>
  <span class="terminal-info">https://github.com/meflove</span><br><br>

<span class="terminal-command">Telegram:</span><br>
  <span class="terminal-info">@ANG3IDUST</span><br><br>

<span class="terminal-info">Feel free to reach out! 🚀</span>
`;
    },
  },
  clear: {
    description: "Clear terminal",
    execute: () => {
      terminalOutput.innerHTML = "";
      return null;
    },
  },
  whoami: {
    description: "Display current user",
    execute: () => {
      return '<span class="terminal-success">meflove</span>';
    },
  },
  date: {
    description: "Show date and time",
    execute: () => {
      return `<span class="terminal-info">${new Date().toString()}</span>`;
    },
  },
  neofetch: {
    description: "Display system info",
    execute: () => {
      return `
<span class="terminal-success">                 meflove@nixos</span><br>
<span class="terminal-success">                 ----------</span><br>
<span class="terminal-success">                 |  |  | |</span><br>
<span class="terminal-success">                 |  |  | |</span><br>
<span class="terminal-success">                 .  .  . .</span><br>
<span class="terminal-success">                 |  |  | |</span><br>
<span class="terminal-success">                 |  |  | |</span><br>
<span class="terminal-success">                 '  '  ' '</span><br><br>

<span class="terminal-command">OS:</span>         <span class="terminal-info">NixOS Unstable (x86_64)</span><br>
<span class="terminal-command">Host:</span>       <span class="terminal-info">Custom PC</span><br>
<span class="terminal-command">Shell:</span>      <span class="terminal-info">fish</span><br>
<span class="terminal-command">DE:</span>         <span class="terminal-info">Niri</span><br>
<span class="terminal-command">Editor:</span>     <span class="terminal-info">Neovim</span><br>
<span class="terminal-command">Languages:</span>   <span class="terminal-info">Python, Rust, Bash</span><br>
<span class="terminal-command">Theme:</span>      <span class="terminal-info">Catppuccin Mocha</span><br>
`;
    },
  },
};

function addTerminalLine(content, className = "terminal-line") {
  const line = document.createElement("div");
  line.className = className;
  line.innerHTML = content;
  terminalOutput.appendChild(line);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

function typewriterEffect(text, element, speed = 30) {
  return new Promise((resolve) => {
    let i = 0;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }
    type();
  });
}

async function processCommand(cmd) {
  const trimmedCmd = cmd.trim().toLowerCase();
  const parts = trimmedCmd.split(" ");
  const command = parts[0];

  if (command === "") return;

  // Add to history
  commandHistory.push(cmd);
  historyIndex = commandHistory.length;

  // Show the command
  addTerminalLine(`
        <span class="terminal-prompt">meflove@nixos:~$</span>
        <span class="terminal-command">${cmd}</span>
    `);

  if (commands[command]) {
    const result = commands[command].execute();
    if (result) {
      addTerminalLine(result);
    }
  } else {
    addTerminalLine(`<span class="terminal-error">Command not found: ${command}</span><br>
<span class="terminal-info">Type <span class="terminal-command">'help'</span> for available commands.</span>`);
  }

  addTerminalLine("");
}

terminalInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    processCommand(terminalInput.value);
    terminalInput.value = "";
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      terminalInput.value = commandHistory[historyIndex];
    }
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      terminalInput.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      terminalInput.value = "";
    }
  }
});

// Auto-focus terminal input when clicking anywhere in terminal
terminalBody.addEventListener("click", () => {
  terminalInput.focus();
});

// Initial greeting
setTimeout(() => {
  terminalInput.focus();
}, 500);
