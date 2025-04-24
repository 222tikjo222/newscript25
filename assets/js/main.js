// DOM Elements
const themeToggle = document.getElementById("themeToggle")
const sidebarToggle = document.getElementById("sidebarToggle")
const sidebar = document.querySelector(".sidebar")
const sidebarOverlay = document.querySelector(".sidebar__overlay")
const sidebarClose = document.querySelector(".sidebar__close")
const searchToggle = document.querySelector(".search-toggle")
const searchOverlay = document.querySelector(".search-overlay")
const searchClose = document.querySelector(".search-close")
const backToTop = document.querySelector(".back-to-top")
const dropdownToggles = document.querySelectorAll(".dropdown-toggle")
const loginModal = document.getElementById("loginModal")
const modalClose = document.querySelector(".modal__close")
const modalOverlay = document.querySelector(".modal__overlay")
const passwordToggle = document.querySelector(".password-toggle")
const logoutButtons = document.querySelectorAll(".logout")
const auctionTimers = document.querySelectorAll(".auction-card__timer")

// Theme Toggle
function initThemeToggle() {
  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem("theme") || "light"
  document.documentElement.setAttribute("data-theme", savedTheme)

  // Update icon based on current theme
  updateThemeIcon()

  // Theme toggle event listener
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "light" ? "dark" : "light"

    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)

    updateThemeIcon()
  })
}

function updateThemeIcon() {
  const currentTheme = document.documentElement.getAttribute("data-theme")

  if (currentTheme === "light") {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
  } else {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  }
}

// Sidebar Toggle
function initSidebar() {
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.add("active")
    document.body.style.overflow = "hidden"
  })

  sidebarClose.addEventListener("click", closeSidebar)
  sidebarOverlay.addEventListener("click", closeSidebar)
}

function closeSidebar() {
  sidebar.classList.remove("active")
  document.body.style.overflow = ""
}

// Search Overlay
function initSearchOverlay() {
  searchToggle.addEventListener("click", () => {
    searchOverlay.classList.add("active")
    document.body.style.overflow = "hidden"
    setTimeout(() => {
      searchOverlay.querySelector(".search-input").focus()
    }, 300)
  })

  searchClose.addEventListener("click", closeSearchOverlay)
  searchOverlay.addEventListener("click", (e) => {
    if (e.target === searchOverlay) {
      closeSearchOverlay()
    }
  })
}

function closeSearchOverlay() {
  searchOverlay.classList.remove("active")
  document.body.style.overflow = ""
}

// Back to Top Button
function initBackToTop() {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("active")
    } else {
      backToTop.classList.remove("active")
    }
  })

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Dropdowns
function initDropdowns() {
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation()
      const dropdown = toggle.nextElementSibling

      // Close all other dropdowns
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        if (menu !== dropdown) {
          menu.classList.remove("show")
        }
      })

      dropdown.classList.toggle("show")
      toggle.classList.toggle("active")
    })
  })

  // Close dropdowns when clicking outside
  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.classList.remove("show")
    })

    document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
      toggle.classList.remove("active")
    })
  })
}

// Login Modal
function initLoginModal() {
  // Open modal from login links
  document.querySelectorAll('[data-modal="login"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      openLoginModal()
    })
  })

  // Close modal
  if (modalClose) {
    modalClose.addEventListener("click", closeLoginModal)
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeLoginModal)
  }

  // Password toggle
  if (passwordToggle) {
    passwordToggle.addEventListener("click", () => {
      const passwordInput = document.getElementById("password")
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
      passwordInput.setAttribute("type", type)

      // Toggle icon
      passwordToggle.innerHTML = type === "password" ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>'
    })
  }
}

function openLoginModal() {
  loginModal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeLoginModal() {
  loginModal.classList.remove("active")
  document.body.style.overflow = ""
}

// Logout Functionality
function initLogout() {
  logoutButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()

      // In a real application, you would make an API call to logout
      // For this demo, we'll just show an alert and redirect to home
      alert("تم تسجيل الخروج بنجاح")
      window.location.href = "index.html"
    })
  })
}

// Auction Countdown Timers
function initAuctionTimers() {
  auctionTimers.forEach((timer) => {
    const countdownDate = new Date(timer.dataset.countdown).getTime()

    // Update the countdown every second
    const countdownInterval = setInterval(() => {
      // Get current date and time
      const now = new Date().getTime()

      // Find the time difference between now and the countdown date
      const distance = countdownDate - now

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      // Display the result
      timer.querySelector(".days").textContent = days.toString().padStart(2, "0")
      timer.querySelector(".hours").textContent = hours.toString().padStart(2, "0")
      timer.querySelector(".minutes").textContent = minutes.toString().padStart(2, "0")
      timer.querySelector(".seconds").textContent = seconds.toString().padStart(2, "0")

      // If the countdown is finished, display expired message
      if (distance < 0) {
        clearInterval(countdownInterval)
        timer.innerHTML = '<span class="expired">انتهى المزاد</span>'
      }
    }, 1000)
  })
}

// Lazy Loading Images
function initLazyLoading() {
  if ("loading" in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.src = img.dataset.src
    })
  } else {
    // Fallback for browsers that don't support lazy loading
    const lazyLoadScript = document.createElement("script")
    lazyLoadScript.src = "assets/js/lazysizes.min.js"
    document.body.appendChild(lazyLoadScript)
  }
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');

\
## ملف الصفحة الرئيسية المجمع (main.css)
