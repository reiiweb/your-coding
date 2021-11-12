$(function () {
  const setFillHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  let vw = window.innerWidth;

  window.addEventListener("resize", () => {
    if (vw === window.innerWidth) {
      // 画面の横幅にサイズ変動がないので処理を終える
      return;
    }

    // 画面の横幅のサイズ変動があった時のみ高さを再計算する
    vw = window.innerWidth;
    setFillHeight();
  });

  // 初期化
  setFillHeight();

  // Aos
  AOS.init({
    offset: 200,
    duration: 900,
    easing: "ease",
    delay: 80,
    once: true,
    anchorPlacement: "bottom-center",
  });

  // ハンバーガーメニュー
  $("#js-hamburger").click(function () {
    $("body").toggleClass("is-drawerActive");
    $("body").toggleClass("noscroll");
    if ($(this).attr("aria-expanded") == "false") {
      $(this).attr("aria-expanded", true);
      $("#js-global-menu").attr("area-hidden", "false");
      $("#js-global-menu").fadeIn(500);
    } else {
      $(this).attr("aria-expanded", false);
      $("#js-global-menu").attr("area-hidden", "true");
      $("#js-global-menu").fadeOut(500);
    }
  });

  $("#js-global-menu a").click(function () {
    if ($(window).width() < 810) {
      $("#js-global-menu").fadeOut(100); //.nav-wrapperが0.1秒でフェードアウト(メニューのフェードアウト)
      $("#js-hamburger").attr("aria-expanded", false);
      $("#js-global-menu").attr("area-hidden", "true");
      $("body").removeClass("noscroll"); //bodyのnoscrollクラスを削除
    }
  });

  // 画面幅広げてもリストなくならないように
  window.matchMedia("(max-width: 810px)").addEventListener("change", (e) => {
    if (!e.matches) $("#js-global-menu").attr("style", null);
  });

  // 内部リンク
  $(".js-nav").click(function () {
    var id = $(this).attr("href");
    var position = $(id).offset().top - 94;
    $("html, body").animate(
      {
        scrollTop: position,
      },
      800
    );
    return false;
  });

  // アコーディオン
  // 最初開ける↓
  $(".jsAccordionContent-first").addClass("is-open");
  $(".jsAccordionTitle-first").addClass("is-active");
  $(".jsAccordionTitle").on("click", function () {
    $(this).next().toggleClass("is-open");
    $(this).toggleClass("is-active");
  });

  // swiper
  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      960: {
        slidesPerView: 3.75,
        spaceBetween: 56,
      },
      720: {
        slidesPerView: 3,
        spaceBetween: 36,
      },
      0: {
        slidesPerView: 1.45,
        spaceBetween: 20,
      },
    },

    // Navigation arrows
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev",
    // },
  });

  // form
  const $submitBtn = $("#js-submit");
  $("#form input,#form textarea").on("change", function () {
    if (
      $('#form input[type="text"]').val() !== "" &&
      $('#form input[type="email"]').val() !== "" &&
      $("#form textarea").val() !== "" &&
      $("#form #check").prop("checked") === true
    ) {
      $submitBtn.prop("disabled", false);
    } else {
      $submitBtn.prop("disabled", true);
    }
  });

  // goggle-form
  $("#form").submit(function (event) {
    var formData = $("#form").serialize();
    $.ajax({
      url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdrIdgBNrWX23giVjwTG8W3ZprJm37vqMiY8-F2YGLj8_wuGQ/formResponse",
      data: formData,
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          $(".end-message").slideDown();
          $(".form-submit").fadeOut();
          window.location.href = "thanks.html";
        },
        200: function () {
          $(".false-message").slideDown();
        },
      },
    });
    event.preventDefault();
  });
});
