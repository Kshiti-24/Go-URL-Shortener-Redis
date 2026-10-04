const form = document.getElementById("shortenForm");
const resultBox = document.getElementById("resultBox");
const errorBox = document.getElementById("errorBox");

const shortenedLink = document.getElementById("shortenedLink");
const rateLimitInfo = document.getElementById("rateLimitInfo");
const expiryInfo = document.getElementById("expiryInfo");

const submitBtn = document.getElementById("submitBtn");
const buttonContent = document.getElementById("buttonContent");
const copyBtn = document.getElementById("copyBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorBox.classList.add("hidden");
  resultBox.classList.add("hidden");

  const urlInput = document.getElementById("urlInput");
  const customShortInput = document.getElementById("customShort");

  const url = urlInput.value.trim();
  const customShort = customShortInput.value.trim();

  if (!url) {
    showError("Please enter a destination URL.");
    urlInput.focus();
    return;
  }

  try {
    new URL(url);
  } catch {
    showError("Please enter a valid URL, including https://");
    urlInput.focus();
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("/api/v1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
        short: customShort || undefined,
        expiry: 24,
      }),
    });

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error("The server returned an invalid response.");
    }

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong. Please try again.");
    }

    if (!data.short) {
      throw new Error("The server did not return a short link.");
    }

    shortenedLink.href = data.short;
    shortenedLink.textContent = data.short;

    if (data["x-rate-limit"] !== undefined) {
      rateLimitInfo.textContent = `Requests remaining: ${data["x-rate-limit"]}`;
    } else {
      rateLimitInfo.textContent = "";
    }

    expiryInfo.textContent = `Expires in ${data.expiry ?? 24}h`;

    resultBox.classList.remove("hidden");
    resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } catch (err) {
    showError(err.message || "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
});

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;

  if (isLoading) {
    buttonContent.innerHTML = `
            <span class="spinner"></span>
            Creating your link...
        `;
  } else {
    buttonContent.innerHTML = `
            Create my link
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6l6 6-6 6"/>
            </svg>
        `;
  }
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");

  errorBox.classList.remove("result-enter");
  void errorBox.offsetWidth;
  errorBox.classList.add("result-enter");
}

async function copyLink() {
  const link = shortenedLink.href;

  if (!link || link === "#") {
    return;
  }

  try {
    await navigator.clipboard.writeText(link);

    copyBtn.textContent = "Copied ✓";
    copyBtn.classList.remove("bg-stone-100", "text-stone-600");
    copyBtn.classList.add("bg-emerald-50", "text-emerald-600", "copy-success");

    setTimeout(() => {
      copyBtn.textContent = "Copy";
      copyBtn.classList.remove(
        "bg-emerald-50",
        "text-emerald-600",
        "copy-success",
      );
      copyBtn.classList.add("bg-stone-100", "text-stone-600");
    }, 2000);
  } catch {
    showError("Could not copy the link. Please copy it manually.");
  }
}
