;(function ($) {
    "use strict"

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($("#spinner").length > 0) {
                $("#spinner").removeClass("show")
            }
        }, 1)
    }
    spinner()

    // Initiate the wowjs
    new WOW().init()

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $(".navbar").addClass("sticky-top shadow-sm")
        } else {
            $(".navbar").removeClass("sticky-top shadow-sm")
        }
    })

    // Dropdown on mouse hover
    const $dropdown = $(".dropdown")
    const $dropdownToggle = $(".dropdown-toggle")
    const $dropdownMenu = $(".dropdown-menu")
    const showClass = "show"

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this)
                    $this.addClass(showClass)
                    $this.find($dropdownToggle).attr("aria-expanded", "true")
                    $this.find($dropdownMenu).addClass(showClass)
                },
                function () {
                    const $this = $(this)
                    $this.removeClass(showClass)
                    $this.find($dropdownToggle).attr("aria-expanded", "false")
                    $this.find($dropdownMenu).removeClass(showClass)
                }
            )
        } else {
            $dropdown.off("mouseenter mouseleave")
        }
    })

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $(".back-to-top").fadeIn("slow")
        } else {
            $(".back-to-top").fadeOut("slow")
        }
    })
    $(".back-to-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo")
        return false
    })

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000,
    })

    // Modal Video
    $(document).ready(function () {
        var $videoSrc
        $(".btn-play").click(function () {
            $videoSrc = $(this).data("src")
        })
        console.log($videoSrc)

        $("#videoModal").on("shown.bs.modal", function (e) {
            $("#video").attr(
                "src",
                $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
            )
        })

        $("#videoModal").on("hide.bs.modal", function (e) {
            $("#video").attr("src", $videoSrc)
        })
    })

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
        },
    })
})(jQuery)

$(document).ready(function () {
    var isExpanded = false
    function toggleText() {
        if (isExpanded) {
            $("#text").slideUp()
            $("#toggle").text("Read More")
        } else {
            $("#text").slideDown()
            $("#toggle").text("Read Less")
        }
        isExpanded = !isExpanded
    }
    $("#toggle").click(function (e) {
        e.preventDefault()
        toggleText()
    })
})

//load more for projects

// Assume you have an array of image URLs
var imageArray = [
    "img/house-1.jpeg",
    "img/house-2.jpeg",
    "img/house-3.jpeg",
    "img/house-4.jpeg",
    "img/interior-1.jpeg",
    "img/interior-2.jpeg",
    "img/interior-3.jpeg",
    "img/interior-4.jpeg",
    "img/house-5.jpeg",
    "img/house-6.jpeg",
    "img/house-7.jpeg",
    "img/house-8.jpeg",
    "img/interior-5.jpeg",
    "img/interior-6.jpeg",
    "img/interior-7.jpeg",
    "img/interior-8.jpeg",
    // Add more image URLs here
]

var batchSize = 3 // Number of images to load at a time
var currentIndex = 0 // Index to track the current batch

// Function to load images
function loadImages(startIndex, endIndex) {
    for (var i = startIndex; i < endIndex; i++) {
        var imageUrl = imageArray[i]

        // Check if imageUrl is defined before appending
        if (imageUrl !== undefined) {
            var imageElement =
                '<div class="col-12 col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.3s">' +
                '<div class="project-item">' +
                '<div class="project-img">' +
                '<img src="' +
                imageUrl +
                '" class="img-fluid w-100 rounded" alt="">' +
                '<div class="project-border"></div>' +
                "</div>" +
                "</div>" +
                "</div>"
            $("#imagesContainer").append(imageElement)
        } else {
            console.warn("Undefined imageUrl at index:", i)
            // You may want to handle this case differently, depending on your requirements
        }
    }
}

// Initial load
loadImages(currentIndex, currentIndex + batchSize)
currentIndex += batchSize

// Load more button click event
$("#toggle-img").on("click", function (event) {
    event.preventDefault()
    if (currentIndex < imageArray.length) {
        loadImages(currentIndex, currentIndex + batchSize)
        currentIndex += batchSize

        // Disable the button if all images are loaded
        if (currentIndex >= imageArray.length) {
            $(this).attr("hidden", true)
        }
    }
})

//form validation

// $(document).ready(function () {
//     $("#submitBtn").click(function (event) {
//         event.preventDefault()
//         validateForm()
//     })

//     function validateForm() {
//         var name = $("#name").val()
//         var phone = $("#phone").val()
//         var subject = $("#subject").val()
//         var message = $("#message").val()

//         // Reset error messages
//         $(".text-danger").text("")

//         // Validate Name
//         if (!name) {
//             $("#name-error").text("Name is required")
//         } else if (!/^[a-zA-Z]{3,}$/.test(name)) {
//             $("#name-error").text("Invalid name")
//         } else {
//             $("#name-error").text("")
//         }
//         if (!phone) {
//             // Validate Phone
//             $("#phone-error").text("Phone is required")
//         } else if (!/^\d{10}$/.test(phone)) {
//             $("#phone-error").text("Invalid phone number")
//         } else {
//             $("#phone-error").text("")
//         }

//         // Validate Subject
//         if (!subject) {
//             $("#subject-error").text("Subject is required")
//         } else {
//             $("#subject-error").text("")
//         }

//         // Validate Message
//         if (!message) {
//             $("#message-error").text("Message is required")
//         } else {
//             $("#message-error").text("")
//         }

//         // If there are no errors, you can submit the form or perform additional actions
//         if ($('#name-error').text() === '' && $('#phone-error').text() === '' && $('#subject-error').text() === '' && $('#message-error').text() === '') {
//                uploadForm()         // Uncomment this line to submit the form
//         }
//     }
// })


//load more animation

const button = document.querySelector(".btn-loading")
const buttonText = button.querySelector("span")

button.addEventListener("click", () => {
    button.classList.add("animation")
    button.disabled = true
    buttonText.style.top = "-" + buttonText.offsetHeight + "px"
    setTimeout(() => {
        button.classList.add("active")
    }, 600)

    setTimeout(() => {
        button.classList.remove("animation")
        button.disabled = false
        button.querySelector("span").style.top = "0"
    }, 1000)
})


// function uploadForm(){


//      $("#submit-form").submit((e) => {
//          e.preventDefault()
//          $('#loader').show()
//          $.ajax({
//              url: "https://script.google.com/macros/s/AKfycbyOHi-JeRNT5brB4ZQoh0o5QUohYDtht9oWyc4iQM87KvDjXRKuDxdCjxMXwTbEz88xmQ/exec",
//              data: $("#submit-form").serialize(),
//              method: "post",
//              success: function (response) {
//                  $('#loader').hide()
//                  alert("Form submitted successfully")
//                  window.location.reload()
//              },
//              error: function (err) {
//                  alert("Something Error")
//              },
//          })
//      })

//     }
 

    $(document).ready(function () {
        $("#submitBtn").click(function (event) {
            event.preventDefault()
            validateForm()
        })

        function validateForm() {
            var name = $("#name").val()
            var phone = $("#phone").val()
            var subject = $("#subject").val()
            var message = $("#message").val()

            // Reset error messages
            $(".text-danger").text("")

            // Validate Name
            if (!name) {
                $("#name-error").text("Name is required")
            } else if (!/^[a-zA-Z]{3,}$/.test(name)) {
                $("#name-error").text("Invalid name")
            }

            // Validate Phone
            if (!phone) {
                $("#phone-error").text("Phone is required")
            } else if (!/^\d{10}$/.test(phone)) {
                $("#phone-error").text("Invalid phone number")
            }

            // Validate Subject
            if (!subject) {
                $("#subject-error").text("Subject is required")
            }

            // Validate Message
            if (!message) {
                $("#message-error").text("Message is required")
            }

            // If there are no errors, submit the form
            if (
                $("#name-error").text() === "" &&
                $("#phone-error").text() === "" &&
                $("#subject-error").text() === "" &&
                $("#message-error").text() === ""
            ) {
                $("#loader").show()
                $.ajax({
                    url: "https://script.google.com/macros/s/AKfycbyOHi-JeRNT5brB4ZQoh0o5QUohYDtht9oWyc4iQM87KvDjXRKuDxdCjxMXwTbEz88xmQ/exec",
                    data: $("#submit-form").serialize(),
                    method: "post",
                    success: function (response) {
                        $("#loader").hide()
                        alert("Form submitted successfully")
                        window.location.reload()
                    },
                    error: function (err) {
                        $("#loader").hide()
                        alert("Something went wrong. Please try again.")
                    },
                })
            }
        }
    })
