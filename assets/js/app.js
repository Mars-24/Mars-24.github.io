// Template Name: Striker
// Template URL: https://techpedia.co.uk/template/striker
// Description:  Striker - Sports Club Html Template
// Version: 1.0.0

(function (window, document, $, undefined) {
  "use strict";
  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.BackToTop();
      Init.header();
      Init.preloader();
      Init.jsSlider();
      Init.dropdown();
      Init.searchToggle();
      Init.billingAddress();
      Init.videoPlay();
      Init.VideoPlayer();
      Init.quantityHandle();
      Init.wishlistButton();
      Init.countdownInit(".countdown", "2026/12/01");
      Init.initializeSlick();
      Init.formValidation();
      Init.contactForm();
      Init.filterToggle();
    },

    w: function (e) {
      this._window.on("load", Init.l).on("scroll", Init.res);
    },

    BackToTop: function () {
      var btn = $("#backto-top");
      $(window).on("scroll", function () {
        if ($(window).scrollTop() > 300) {
          btn.addClass("show");
        } else {
          btn.removeClass("show");
        }
      });
      btn.on("click", function (e) {
        e.preventDefault();
        $("html, body").animate(
          {
            scrollTop: 0,
          },
          "300"
        );
      });
    },

    header: function () {
      function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("https://uiparadox.co.uk/").reverse()[0];

        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("current");
          }
        });
        selector.children("li").each(function () {
          if ($(this).find(".current").length) {
            $(this).addClass("current");
          }
        });
        if ("" == FileName) {
          selector.find("li").eq(0).addClass("current");
        }
      }

      if ($(".main-menu__list").length) {
        let mainNavUL = $(".main-menu__list");
        dynamicCurrentMenuClass(mainNavUL);
      }

      if ($(".main-menu__nav").length && $(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu__nav").innerHTML;
        let mobileNavContainer = document.querySelector(".mobile-nav__container");
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".sticky-header__content").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(".sticky-header__content");
        mobileNavContainer.innerHTML = navContent;
      }

      if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(
          ".mobile-nav__container .main-menu__list .dropdown > a"
        );
        dropdownAnchor.each(function () {
          let self = $(this);
          let toggleBtn = document.createElement("BUTTON");
          toggleBtn.setAttribute("aria-label", "dropdown toggler");
          toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
          self.append(function () {
            return toggleBtn;
          });
          self.find("button").on("click", function (e) {
            e.preventDefault();
            let self = $(this);
            self.toggleClass("expanded");
            self.parent().toggleClass("expanded");
            self.parent().parent().children("ul").slideToggle();
          });
        });
      }

      if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
          e.preventDefault();
          $(".mobile-nav__wrapper").toggleClass("expanded");
          $("body").toggleClass("locked");
        });
      }

      $(window).on("scroll", function () {
        if ($(".stricked-menu").length) {
          var headerScrollPos = 130;
          var stricky = $(".stricked-menu");
          if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass("stricky-fixed");
          } else if ($(this).scrollTop() <= headerScrollPos) {
            stricky.removeClass("stricky-fixed");
          }
        }
      });
      $(window).on("scroll", function () {
        if ($("header").length) {
          var headerScrollPos = 130;
          var stricky = $("header");
          if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass("bg-dark-black position-fixed top-0 shadow-sm");
          } else {
            stricky.removeClass("bg-dark-black position-fixed top-0 shadow-sm");
          }
        }
      });

    },

    preloader: function () {
      setTimeout(function () {
        $("#preloader").hide("slow");
      }, 2000);
    },
    jsSlider: function () {
      if ($(".js-slider").length) {
        $(".js-slider").ionRangeSlider({
          skin: "big",
          type: "double",
          grid: false,
          min: 0,
          max: 100,
          from: 20,
          to: 80,
          hide_min_max: true,
          hide_from_to: true,
        });
      }
    },

    dropdown: function () {
      const selectedAll = document.querySelectorAll(".wrapper-dropdown");

      selectedAll.forEach((selected) => {
        const optionsContainer = selected.children[2];
        const optionsList = selected.querySelectorAll(
          "div.wrapper-dropdown li"
        );

        selected.addEventListener("click", () => {
          let arrow = selected.children[1];

          if (selected.classList.contains("active")) {
            handleDropdown(selected, arrow, false);
          } else {
            let currentActive = document.querySelector(
              ".wrapper-dropdown.active"
            );

            if (currentActive) {
              let anotherArrow = currentActive.children[1];
              handleDropdown(currentActive, anotherArrow, false);
            }

            handleDropdown(selected, arrow, true);
          }
        });

        // update the display of the dropdown
        for (let o of optionsList) {
          o.addEventListener("click", () => {
            selected.querySelector(".selected-display").innerHTML = o.innerHTML;
          });
        }
      });

      // check if anything else ofther than the dropdown is clicked
      window.addEventListener("click", function (e) {
        if (e.target.closest(".wrapper-dropdown") === null) {
          closeAllDropdowns();
        }
      });

      // close all the dropdowns
      function closeAllDropdowns() {
        const selectedAll = document.querySelectorAll(".wrapper-dropdown");
        selectedAll.forEach((selected) => {
          const optionsContainer = selected.children[2];
          let arrow = selected.children[1];

          handleDropdown(selected, arrow, false);
        });
      }

      // open all the dropdowns
      function handleDropdown(dropdown, arrow, open) {
        if (open) {
          arrow.classList.add("rotated");
          dropdown.classList.add("active");
        } else {
          arrow.classList.remove("rotated");
          dropdown.classList.remove("active");
        }
      }
    },

    searchToggle: function () {
      if ($('.search-form').length) {
        $('.search-btn').on('click', function () {
          if ($('.search-form').hasClass('non-active')) {
            $('.search-form').removeClass('non-active');
          } else {
            $('.search-form').addClass('non-active');
          }
          $(this).find("i").toggleClass("fa-search fa-times");
          return false;
        });
      }
    },
    // Search Toggle 
    searchToggle: function () {
      if ($(".search-toggler").length) {
        $(".search-toggler").on("click", function (e) {
          e.preventDefault();
          $(".search-popup").toggleClass("active");
          $(".mobile-nav__wrapper").removeClass("expanded");
          $("body").toggleClass("locked");
        });
      }
    },
    billingAddress: function () {
      if ($("#bill-address").length) {
        $('.billing-address-form').hide();
        $('#bill-address').change(function () {
          if ($(this).is(':checked')) {
            $('.billing-address-form').hide("slow");
          } else {
            $('.billing-address-form').show("slow");
          }
        });
      }
    },
    quantityHandle: function () {
      $(".decrement").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        if (qtyVal > 0) {
          qtyInput.val(qtyVal - 1);
        }
      });
      $(".increment").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        qtyInput.val(parseInt(qtyVal + 1));
      });
    },

    wishlistButton: function () {
      if ($(".wishlist-icon").length) {
        $('.wishlist-icon').on('click', function () {
          $(this).find('.fal').toggleClass('fas');
          return false;
        })
      }
    },


    initializeSlick: function (e) {
      if ($(".featured-glasses-slider").length) {
        $(".featured-glasses-slider").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: false,
          autoplaySpeed: 3000,
          dots: true,
          arrows: false,
          centerPadding: "0",

          cssEase: "linear",
          responsive: [
            {
              breakpoint: 1399,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2,
                dots: false,
              },
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 1,
                dots: false,
              },
            },
          ],
        });
      }
      if ($(".testimonials-area").length) {
        $(".testimonials-area").slick({
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          dots: true,
          arrows: false,
          centerPadding: "0",
          cssEase: "linear",
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 1,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                dots: false,
              },
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 1,
                dots: false,
              },
            },
          ],
        });
      }
      if ($(".glasses-brands-slider").length) {
        $(".glasses-brands-slider").slick({
          infinite: true,
          slidesToShow: 5,
          arrows: false,
          autoplay: true,
          cssEase: 'linear',
          autoplaySpeed: 0,
          speed: 4000,
          pauseOnFocus: false,
          pauseOnHover: false,
          responsive: [
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 2,
              },
            },
          ],
        });
      }

      if ($(".banner-product-slider").length) {
        $(".banner-product-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          dots: false,
          arrows: true,
          cssEase: "linear",
        });
      }
      if ($(".preview-slider").length) {
        $(".preview-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          asNavFor: ".preview-slider-nav",
        });
      }
      if ($(".preview-slider-nav").length) {
        $(".preview-slider-nav").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          asNavFor: ".preview-slider",
          dots: false,
          arrows: false,
          centerMode: false,
          variableWidth: true,
          focusOnSelect: true,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                slidesToShow: 2,
              },
            },
          ],
        });
      }
    },
    VideoPlayer: function () {
      if ($("#video").length) {
        $("#video").aksVideoPlayer({
          file: [
            {
              file: "assets/media/videos/video-1080.mp4",
              label: "1080p"
            },
            {
              file: "assets/media/videos/video-720.mp4",
              label: "720p"
            },
            {
              file: "assets/media/videos/video-540.mp4",
              label: "540p"
            },
            {
              file: "assets/media/videos/video-360.mp4",
              label: "360p"
            },
            {
              file: "assets/media/videos/video-240.mp4",
              label: "240p"
            }
          ],
          poster: "assets/media/streaming/video-img-large.png",
          forward: true,
        });
      }
    },

    videoPlay: function () {
      $('#videoModal').on('hidden.bs.modal', function () {
        $('#videoModal video').get(0).pause();
      });
      $("#closeVideoModalButton").click(function () {
        $("#videoModal").modal("hide");
      });
    },


    countdownInit: function (countdownSelector, countdownTime, countdown) {
      var eventCounter = $(countdownSelector);
      if (eventCounter.length) {
        eventCounter.countdown(countdownTime, function (e) {
          $(this).html(
            e.strftime(
              '<li><h6>%D</h6><h6>Days</h6></li>\
              <li><h6>%H</h6><h6>Hrs</h6></li>\
              <li><h6>%M</h6><h6>Min</h6></li>\
              <li><h6>%S</h6><h6>Sec</h6></li>'
            )
          );
        });
      }
    },
      filterToggle: function () {
      if ($('.filter-block').length) {
        $(".filter-block .title").on("click", function (e) {
          var count = $(this).data('count');
          if ($('.filter-block.box-' + count + ' .content-block').is(':visible')) {
            $('.filter-block.box-' + count + ' i').removeClass('fa-horizontal-rule');
            $('.filter-block.box-' + count + ' i').addClass('fa-plus');
            $('.filter-block.box-' + count + ' .content-block').hide('slow');

          } else {

            $('.filter-block.box-' + count + ' i').removeClass('fa-plus');
            $('.filter-block.box-' + count + ' i').addClass('fa-horizontal-rule');
            $('.filter-block.box-' + count + ' .content-block').show('slow');
          }
        })
      }
    },

    formValidation: function () {
      if ($(".contact-form").length) {
        $(".contact-form").validate();
      }
      if ($(".login-form").length) {
        $(".login-form").validate();
      }
    },
      contactForm: function () {
      $(".contact-form").on("submit", function (e) {
        e.preventDefault();
        if ($(".contact-form").valid()) {
          var _self = $(this);
          _self
            .closest("div")
            .find('button[type="submit"]')
            .attr("disabled", "disabled");
          var data = $(this).serialize();
          $.ajax({
            url: "https://websitemakerz.com/mail/contact.php",
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
              $(".contact-form").trigger("reset");
              _self.find('button[type="submit"]').removeAttr("disabled");
              if (data.success) {
                document.getElementById("alert-message").innerHTML =
                  "<h5 class='color-sec mt-16 mb-16'>Email Sent Successfully</h5>";
              } else {
                document.getElementById("alert-message").innerHTML =
                  "<h5 class='color-sec mt-16 mb-16'>There is an error</h5>";
              }
            $("#alert-message").show("slow");
              $("#alert-message").slideDown("slow");
              setTimeout(function () {
                $("#alert-message").slideUp("hide");
                 $("#alert-message").hide("slow");
              }, 4000);
            },
          });
        } else {
          return !1;
        }
      });
    },
  };
  Init.i();
})(window, document, jQuery);
