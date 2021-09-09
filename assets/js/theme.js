(function() {
    "use strict";

    /**
     * ------------------------------------------------------------------------
     * Functions
     * ------------------------------------------------------------------------
     */
    // Back to top button
    const myBacktotop = function() {
        // browser window scroll 
        var offset = 300,
            offset_opacity = 1200,
            back_to_top = document.querySelector(".back-top"),
            scrollpos = window.scrollY;

        var add_class_back_scroll = function add_class_back_scroll() {
            return back_to_top.classList.add("backtop-is-visible");
        };

        var add_class_offset_scroll = function add_class_offset_scroll() {
            return back_to_top.classList.add("backtop-fade-out");
        };

        var remove_class_back_scroll = function remove_class_back_scroll() {
            return back_to_top.classList.remove("backtop-is-visible", "backtop-fade-out");
        };

        // back to top by es6-scroll-to
        var defaults = {
            duration: 400,
            easing: function easing(t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            to: 0
        };
        var animatedScrollTo = function animatedScrollTo(args) {
            if (isInteger(args)) {
                args = {
                    to: args
                };
            }
            var options = extend(defaults, args);
            options.startingYOffset = window.pageYOffset;
            options.distanceYOffset = parseInt(options.to, 10) - options.startingYOffset;
            window.requestAnimationFrame(function(timestamp) {
                return animateScroll(options, timestamp);
            });
        };
        var animateScroll = function animateScroll(options, now) {
            if (!options.startTime) {
                options.startTime = now;
            }
            var currentTime = now - options.startTime;
            var newYOffset = Math.round(options.easing(currentTime, options.startingYOffset, options.distanceYOffset, options.duration));
            if (currentTime < options.duration) {
                window.requestAnimationFrame(function(timestamp) {
                    return animateScroll(options, timestamp);
                });
            } else {
                newYOffset = options.to;
            }
            setScrollTopPosition(newYOffset);
        };
        var setScrollTopPosition = function setScrollTopPosition(newYOffset) {
            document.documentElement.scrollTop = newYOffset;
            document.body.scrollTop = newYOffset;
        };
        var isInteger = function isInteger(value) {
            if (Number.isInteger) {
                return Number.isInteger(value);
            } else {
                return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
            }
        };
        var extend = function extend(defaults, options) {
            var extendedOptions = {};
            for (var key in defaults) {
                extendedOptions[key] = options[key] || defaults[key];
            }
            return extendedOptions;
        };
        var easeInQuint = function easeInQuint(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        };

        const scroll_a = document.querySelectorAll('.back-top');
        if (scroll_a != null) {
            for (var i = 0; i < scroll_a.length; i++) {
                scroll_a[i].addEventListener("click", function() {
                    animatedScrollTo({
                        easing: easeInQuint,
                        duration: 800
                    });
                });
            }
        }

        window.addEventListener('scroll', function() {
            scrollpos = window.scrollY;
            if (scrollpos > offset) {
                add_class_back_scroll();
            } else {
                remove_class_back_scroll();
            }
            if (scrollpos > offset_opacity) {
                add_class_offset_scroll();
            }
        });
    }

    // Sub Dropdown
    const sub_dropdown_js = function() {
        // submenu
        const onekit_submenu = function onekit_submenu() {
            var onekit_toggle = document.querySelectorAll(".dropdown-menu a.dropdown-toggle");
            var _loop = function _loop(i) {
                onekit_toggle[i].addEventListener("click", function(event) {
                    event.stopPropagation();
                    event.preventDefault();

                    onekit_toggle[i].nextElementSibling.classList.toggle("show");
                    onekit_toggle[i].parentNode.classList.toggle("show");
                });
                window.addEventListener("mouseup", function(event) {
                    if (event.target != onekit_toggle[i].nextElementSibling && event.target.parentNode != onekit_toggle[i].nextElementSibling && event.target.classList.contains("dropdown-toggle") != true) {
                        onekit_toggle[i].nextElementSibling.classList.remove("show");
                        onekit_toggle[i].parentNode.classList.remove("show");
                    }
                });
            };

            for (var i = 0; i < onekit_toggle.length; i++) {
                _loop(i);
            }
        };

        // close if dropdown click
        const close_all_submenu = function close_all_submenu() {
            var dropdown_x = document.querySelectorAll(".dropdown");
            var dropdown_submenu_x = document.querySelectorAll(".dropdown-menu li .dropdown-menu");

            var _loop2 = function _loop2(i) {
                dropdown_x[i].addEventListener('hide.bs.dropdown', function() {
                    for (var j = 0; j < dropdown_submenu_x.length; j++) {
                        if (i != j) {
                            dropdown_submenu_x[j].classList.remove("show");
                            dropdown_submenu_x[j].parentNode.classList.remove("show");
                        }
                    }
                });
            };

            for (var i = 0; i < dropdown_x.length; i++) {
                _loop2(i);
            }
        };

        // close submenu
        const close_submenu = function close_submenu() {
            var dropdown_a = document.querySelectorAll(".dropdown > .dropdown-menu > li > .dropdown-toggle");
            var dropdownMenu_a = document.querySelectorAll(".dropdown > .dropdown-menu > li > .dropdown-menu");
            var dropdownSubMenu_a = document.querySelectorAll(".dropdown > .dropdown-menu > li > .dropdown-menu > li > .dropdown-menu");

            var _loop2 = function _loop2(i) {
                dropdown_a[i].addEventListener("click", function() {
                    for (var j = 0; j < dropdownMenu_a.length; j++) {
                        if (i != j) {
                            dropdownMenu_a[j].parentNode.classList.remove("show");
                            dropdownMenu_a[j].classList.remove("show");
                            if (dropdownSubMenu_a[j] === undefined) {} else {
                                dropdownSubMenu_a[j].parentNode.classList.remove("show");
                                dropdownSubMenu_a[j].classList.remove("show");
                            }
                        }
                    }
                });
            };

            for (var i = 0; i < dropdown_a.length; i++) {
                _loop2(i);
            }
        };

        // close child submenu & dropdown reverse
        const close_child_submenu = function close_child_submenu() {
            var dropdown_b = document.querySelectorAll(".dropdown > .dropdown-menu > li > .dropdown-menu > li > .dropdown-toggle");
            var dropdownMenu_b = document.querySelectorAll(".dropdown > .dropdown-menu > li > .dropdown-menu > li > .dropdown-menu");

            var _loop3 = function _loop3(i) {
                dropdown_b[i].addEventListener("click", function() {
                    for (var j = 0; j < dropdownMenu_b.length; j++) {
                        if (i != j) {
                            if (dropdownMenu_b[j] === undefined) {} else {
                                dropdownMenu_b[j].parentNode.classList.remove("show");
                                dropdownMenu_b[j].classList.remove("show");
                            }
                        }
                    }
                });

                // dropdown reverse
                dropdown_b[i].addEventListener("mouseenter", function() {
                    for (var j = 0; j < dropdownMenu_b.length; j++) {
                        var elm = dropdownMenu_b[j];
                        var rect = elm.getBoundingClientRect();
                        var l = rect.left;
                        var w = elm.offsetWidth;
                        var docW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                        var isEntirelyVisible = l + w;

                        if (isEntirelyVisible > docW) {
                            elm.classList.add('dropdown-reverse');
                        }
                    }
                });
            };

            for (var i = 0; i < dropdown_b.length; i++) {
                _loop3(i);
            }
        };

        var ef = document.querySelector(".dropdown > .dropdown-menu > li");
        if (ef != null) {
            onekit_submenu();
            close_all_submenu();
            close_submenu();
            close_child_submenu();
        }
    }

    // Mobile menu close
    const myMobile = function() {
        var x = document.querySelectorAll(".back-menu");
        if (x != null) {
            for (var v = 0; v < x.length; v++) {
                x[v].addEventListener("click", function() {
                    var y = document.getElementsByClassName("push");
                    for (var i = 0; i < y.length; i++) {
                        y[i].classList.remove('push-open');
                    }

                    var b = document.querySelectorAll(".mobile-side");
                    for (var i = 0; i < b.length; i++) {
                        b[i].classList.remove('sidenav-body-open');
                    }
                });
            }
        }
    }

    // Mobile menu open
    const myOpen = function() {
        var x = document.querySelectorAll(".sidebar-menu-trigger");
        if (x != null) {
            for (var z = 0; z < x.length; z++) {
                x[z].addEventListener("click", function() {
                    var y = document.getElementsByClassName("push");
                    for (var i = 0; i < y.length; i++) {
                        y[i].classList.add('push-open');
                    }

                    var b = document.querySelectorAll(".mobile-side");
                    for (var i = 0; i < b.length; i++) {
                        b[i].classList.add('sidenav-body-open');
                    }
                });
            }
        }
    }

    // Show Nav scroll up
    const myScrollUp = function() {
        var previousTop = 0;
        window.addEventListener("scroll", function() {
            var show_back_top = document.querySelector('.showbacktop');
            var currentTop = document.body.scrollTop || document.documentElement.scrollTop;
            var min_header = document.querySelector('.header').offsetHeight;
            if (show_back_top != null) {
                if (currentTop >= previousTop) {
                    //scroll down
                    if (currentTop >= min_header) {
                        show_back_top.classList.add("is-fixed");
                    }
                } else {
                    //scroll up
                    if (currentTop >= min_header) {
                        show_back_top.classList.add("is-visible");
                    } else {
                        show_back_top.classList.remove("is-visible", "is-fixed");
                    }
                }
            }
            previousTop = currentTop <= 0 ? 0 : currentTop;
        }, false);
    }

    // Mobile sticky nav
    const myMobileSticky = function() {
        var mobileQuery = window.matchMedia('(max-width: 991px)');
        if (mobileQuery.matches) {
            var previousTop = 0;
            window.addEventListener("scroll", function() {
                var show_sticky = document.querySelector('.mobile-sticky');
                var top_menu = document.querySelector('.top-menu');
                var currentTop = document.body.scrollTop || document.documentElement.scrollTop;
                if (show_sticky != null) {
                    var height_sticky = document.querySelector('.mobile-sticky').offsetHeight;
                    var height_stickypx = height_sticky + 'px';
                    if (top_menu != null) {
                        var min_header = document.querySelector('.top-menu').offsetHeight;
                    } else {
                        var min_header = document.querySelector('.header').offsetHeight;
                    }
                    if (currentTop >= previousTop) {
                        //scroll down
                        if (currentTop >= min_header) {
                            show_sticky.classList.add("is-sticky");
                            document.body.style.paddingTop = height_stickypx;
                        }
                    } else {
                        //scroll up
                        if (currentTop <= min_header) {
                            show_sticky.classList.remove("is-sticky");
                            document.body.style.paddingTop = '0'
                        }
                    }
                }
                previousTop = currentTop <= 0 ? 0 : currentTop;
            }, false);
        }
    }


    // Show suggestion post
    const mySuggestion = function() {
        var previousTop = 0;

        window.addEventListener("scroll", function() {
            var suggestion_box = document.querySelector('.suggestion-box');
            var currentTop = document.body.scrollTop || document.documentElement.scrollTop;

            if (suggestion_box != null) {
                var min_header = document.querySelector('.post-content').offsetHeight;

                if (currentTop >= previousTop) {
                    //scroll down
                    if (currentTop >= min_header) {
                        suggestion_box.classList.add("show");
                    }
                } else {
                    //scroll up
                    if (currentTop <= min_header) {
                        suggestion_box.classList.remove("show");
                    }
                }
            }
            previousTop = currentTop <= 0 ? 0 : currentTop;
        }, false);
    }

    // Mobile menu open
    const myCloseSuggestion = function() {
        var x = document.querySelectorAll(".close-suggestion");
        if (x != null) {
            for (var z = 0; z < x.length; z++) {
                x[z].addEventListener("click", function() {
                    var y = document.getElementsByClassName("suggestion-box");
                    for (var i = 0; i < y.length; i++) {
                        y[i].classList.add('close');
                    }
                });
            }
        }
    }

    // Lazy load images
    const myLazyload = function() {
        // lazy load in all
        var lazys = document.querySelector('.lazy');
        if (lazys != null) {
            var lazyLoadInstance = new LazyLoad({
                elements_selector: ".lazy",
                callback_reveal: function(el) {
                    if (el.complete && el.naturalWidth !== 0) {
                        el.classList.remove('loading'),
                            el.classList.add('loaded');
                    }
                }
            });
        }
    }

    // Sticky element
    const mySticky = function() {
        // sticky
        var stickys = document.querySelectorAll('.sticky');
        if (stickys != null) {
            for (var i = 0; i < stickys.length; i++) {
                new hcSticky(stickys[i], {
                    stickTo: stickys[i].parentNode,
                    top: 20,
                    bottomEnd: 30
                });
            }
        }
    }

    // vertical tabs
    const myVertical_tabs = function() {
        var droptab_a = document.querySelectorAll('.dropdown-menu a[data-bs-toggle="tab"]');
        for (var i = 0; i < droptab_a.length; i++) {
            droptab_a[i].addEventListener("click", function(e) {
                e.stopPropagation();
            });
        }
    }

    // Bootstrap JS
    const myBootstrap = function() {
        // Tooltip
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        if (tooltipTriggerList != null) {
            tooltipTriggerList.map(function(tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl)
            });
        }

        // validation
        const formsx = document.querySelectorAll('.needs-validation')
        if (formsx != null) {
            // Loop over them and prevent submission
            Array.prototype.slice.call(formsx)
                .forEach(function(form) {
                    form.addEventListener('submit', function(event) {
                        if (!form.checkValidity()) {
                            event.preventDefault()
                            event.stopPropagation()
                        }

                        form.classList.add('was-validated')
                    }, false)
                });
        }

        // popovers
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        if (popoverTriggerList != null) {
            popoverTriggerList.map(function(popoverTriggerEl) {
                return new bootstrap.Popover(popoverTriggerEl)
            });
        }

        const toastElList = [].slice.call(document.querySelectorAll('.toast'));
        if (toastElList != null) {
            toastElList.map(function(toastEl) {
                return new bootstrap.Toast(toastEl, option)
            });
        }
    }

    // Custom JS
    const myCustom = function() {

        // insert your javascript in here

    }


    /**
     * ------------------------------------------------------------------------
     * Launch Functions
     * ------------------------------------------------------------------------
     */

    myBacktotop();
    sub_dropdown_js();
    myMobile();
    myOpen();
    myScrollUp();
    mySuggestion();
    myCloseSuggestion();
    myLazyload();
    mySticky();
    myMobileSticky();
    myVertical_tabs();
    myBootstrap();
    myCustom();

})();