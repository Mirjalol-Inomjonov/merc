window.addEventListener("DOMContentLoaded", () => {
  // LOADER
  const loader = document.querySelector(".loader");
  setTimeout(function () {
    loader.style.opacity = "0";
    setTimeout(function () {
      loader.style.display = "none";
    }, 1500);
  }, 2000);

  // TABS
  const tabs = document.querySelectorAll(".tabheader__item"),
    headerParent = document.querySelector(".tabheader__items"),
    tabContents = document.querySelectorAll(".tabcontent");

  // hideTabContent function start
  function hideTabContent() {
    tabContents.forEach((item) => {
      item.style.display = "none";
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }
  hideTabContent();
  // hideTabContent function end

  // showTabContent function start
  function showTabContent(i = 0) {
    tabContents[i].style.display = "block";
    tabs[i].classList.add("tabheader__item_active");
  }
  showTabContent();
  // showTabContent function end

  headerParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, index) => {
        if (target == item) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });

  // MODAL
  const allModalBtn = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalClose = document.querySelector("[data-close]");

  // openModal function
  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    // clearInterval(modalTimer);
  }

  // closeModal function
  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  allModalBtn.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target == modal) {
      closeModal();
    }
  });

  // After 5s, the modal opens automatically
  // const modalTimer = setTimeout(openModal, 5000);

  function showMyModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showMyModalByScroll);
    }
  }
  window.addEventListener("scroll", showMyModalByScroll);

  // DATA

  const deadline = "2021-12-31";

  function getTime(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date()),
      days = Math.floor(total / (1000 * 60 * 60 * 24)),
      hours = Math.floor(((total / (1000 * 60 * 60)) % 24) - 5),
      minutes = Math.floor((total / (1000 * 60)) % 60),
      seconds = Math.floor((total / 1000) % 60);
    return {
      total: total,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else return num;
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const time = getTime(endTime);
      days.innerHTML = getZero(time.days);
      hours.innerHTML = getZero(time.hours);
      minutes.innerHTML = getZero(time.minutes);
      seconds.innerHTML = getZero(time.seconds);
      if (time.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // CLASS
  class CarCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.trnasfer = 10.67;
      this.changeToUSD();
    }

    changeToUSD() {
      this.price /= this.trnasfer;
    }

    render() {
      const element = document.createElement("div");
      // if-else: class lar bn ishlashga yordam beradi. Yani yangi class qo'shadi

      // if(this.classes.length === 0){
      //   this.classes = "menu__item"
      //   element.classList.add(this.classes);
      // } else {
      //   this.classes.forEach(className => element.classList.add(className))
      // };

      element.innerHTML = `
        <div class="menu__item">
          <img src=${this.src} alt=${this.alt} />
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Price:</div>
            <div class="menu__item-total"><span>${this.price.toFixed(
              3
            )}</span> $</div>
          </div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  new CarCard(
    "img/tabs/1.jpg",
    "vegy",
    "2021 Mercedes-Benz C-Class",
    "The 2021 Mercedes-Benz C-Class finishes in the top half of our luxury small car rankings. It's powerful and upscale, but it has so-so handli...",
    2123.33,
    ".menu .container"
  ).render();

  new CarCard(
    "img/tabs/4.jpg",
    "elite",
    "2021 Mercedes-Benz CLA-Class",
    "The 2021 Mercedes-Benz CLA offers punchy powertrains, an elegant interior, and easy-to-use tech features, but it also has a firm ride and a ..",
    3190.33,
    ".menu .container"
  ).render();

  new CarCard(
    "img/tabs/2.jpg",
    "post",
    "2021 Mercedes-Benz SCLA-Class",
    "The German luxury car-manufacturer has been around for more than a century, having elegantly drifted rough curves of automobile.",
    4257.33,
    ".menu .container"
  ).render();

  // SLIDER FIRST WAY (easy)
  // const slides = document.querySelectorAll(".offer__slide"),
  //   prevBtn = document.querySelector(".offer__slider-prev"),
  //   nextBtn = document.querySelector(".offer__slider-next"),
  //   current = document.querySelector("#current"),
  //   total = document.querySelector("#total");

  // let slideIndex = 1;
  // show(slideIndex);
  // function show(img) {
  //   if (img > slides.length) {
  //     slideIndex = 1;
  //   }
  //   if (img < 1) {
  //     slideIndex = slides.length;
  //   }

  //   slides.forEach((item) => (item.style.cssText = "display: none;"));
  //   slides[slideIndex - 1].style.display = "block";
  //   if (slides.length < 10) {
  //     current.textContent = `0${slideIndex}`;
  //   } else {
  //     current.textContent = slideIndex;
  //   }
  // }

  // function sliderPlus() {
  //   show((slideIndex += 1));
  // }

  // function sliderNegative() {
  //   show((slideIndex -= 1));
  // }

  // prevBtn.addEventListener("click", () => {
  //   sliderNegative(-1);
  // });

  // nextBtn.addEventListener("click", () => {
  //   sliderPlus(1);
  //   console.log("hi");
  // });

  // CARUSEL
  const slides = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector(".offer__slider"),
    prevBtn = document.querySelector(".offer__slider-prev"),
    nextBtn = document.querySelector(".offer__slider-next"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector(".offer__slider-inner");

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "all .8s";
  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";
  let indicator = document.createElement("ol");
  let dots = [];

  indicator.style.cssText = `
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;
  `;

  slider.append(indicator);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    height: 6px;
    width: 30px;
    margin: 0 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `;

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicator.append(dot);
    dots.push(dot);
  }

  let slideIndex = 1,
    offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    // current.textContent = slideIndex;
  }

  nextBtn.addEventListener("click", () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = `0${slideIndex}`;
    }
    if (current.textContent > 9) {
      current.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  prevBtn.addEventListener("click", () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = `0${slideIndex}`;
    }
    if (current.textContent > 9) {
      current.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      console.log(e.target);
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;

      offset = +width.slice(0, width.length - 2) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = `0${slideIndex}`;
      }
      if (current.textContent > 9) {
        current.textContent = slideIndex;
      }

      dots.forEach((dot) => (dot.style.opacity = ".5"));
      dots[slideIndex - 1].style.opacity = 1;
    });
  });

  // ACCORDION
  const accordion = document.querySelectorAll(".accordion");

  accordion.forEach((acc) => {
    acc.addEventListener("click", () => {
      acc.classList.toggle("active");
      const panel = acc.nextElementSibling; // .nextElementSibling - bu acc dan kegin keladigan birinchi ukasi(element) ga murojaat qiladi

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
});
