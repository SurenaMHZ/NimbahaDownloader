chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "showDownloadLink",
    title: "تبدیل به لینک نیم بها",
    contexts: ["link"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "showDownloadLink") {
    const url = info.linkUrl;
    try {
      const response = await fetch("https://anten.xo.je/nimbaha.php?url=" + encodeURIComponent(url));
      const data = await response.json();
      if (data.download_url) {
        await chrome.scripting.insertCSS({
          target: { tabId: tab.id },
          files: ["toast.css"]
        });

        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["toast.js"]
        });
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: (newLink) => showToast("✅ لینک نیم‌بها آماده شد 👇", newLink, "success"),
          args: [data.download_url]
        });
      } else {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => alert("خطا: سرور لینک نیم‌بها نداد ❌")
        });
      }
    } catch (e) {
      console.error(e);
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => alert("مشکل در ارتباط با سرور ❌")
      });
    }
  }
});
