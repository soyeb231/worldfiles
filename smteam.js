  const popup = document.getElementById("wc-fs");
  const clock = document.getElementById("clock");
  const flashSaleTime = "December 24, 2024 23:59:59"; // Countdown deadline
  const popupDelay = 3000; // Show popup after 3 seconds
  const redirectLink = "https://example.com"; // "Shop Now" link
  const newTab = true; // Open in new tab or same tab

  function showPopup() {
    popup.classList.add("show");
    startCountdown(flashSaleTime);
  }

  function closePopup() {
    popup.classList.remove("show");
  }

  function openLink() {
    if (newTab) {
      window.open(redirectLink, "_blank");
    } else {
      window.location.href = redirectLink;
    }
  }

  function startCountdown(endTime) {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = new Date(endTime).getTime() - now;

      if (distance < 0) {
        clearInterval(countdown);
        clock.innerHTML = "<p>Promo Ended!</p>";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = days < 10 ? "0" + days : days;
      hoursEl.textContent = hours < 10 ? "0" + hours : hours;
      minutesEl.textContent = minutes < 10 ? "0" + minutes : minutes;
      secondsEl.textContent = seconds < 10 ? "0" + seconds : seconds;
    }

    updateCountdown();
    const countdown = setInterval(updateCountdown, 1000);
  }

  // Show popup after delay
  setTimeout(showPopup, popupDelay);
