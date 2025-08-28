function showToast(message, newLink, type = "success") {
    const oldToast = document.querySelector(".my-toast");
    if (oldToast) oldToast.remove();
    const toast = document.createElement("div");
    toast.className = `my-toast ${type}`;
  
    const msg = document.createElement("div");
    msg.className = "my-toast-msg";
    msg.innerText = message;
  
    const actions = document.createElement("div");
    actions.className = "my-toast-actions";
    const copyBtn = document.createElement("button");
    copyBtn.innerText = "📋 کپی";
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(newLink).then(() => {
        copyBtn.innerText = "✅ کپی شد";
        setTimeout(() => (copyBtn.innerText = "📋 کپی"), 2000);
      });
    };
  
    const openBtn = document.createElement("button");
    openBtn.innerText = "🌐 بازکردن";
    openBtn.onclick = () => {
      window.open(newLink, "_blank");
    };
  
    const closeBtn = document.createElement("button");
    closeBtn.innerText = "❌";
    closeBtn.onclick = () => toast.remove();
  
    actions.appendChild(copyBtn);
    actions.appendChild(openBtn);
    actions.appendChild(closeBtn);
  
    toast.appendChild(msg);
    toast.appendChild(actions);
    document.body.appendChild(toast);
  
    setTimeout(() => toast.classList.add("show"), 50);
  
    setTimeout(() => {
      if (document.body.contains(toast)) {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 500);
      }
    }, 8000);
  }
  