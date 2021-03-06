/*! simpler-sidebar v1.4.11 (https://github.com/dcdeiv/simpler-sidebar#readme)
** Copyright (c) 2015 - 2016 Davide Di Criscito
** Dual licensed under MIT and GPL-2.0
*/
!function(a) {
    a.fn.simplerSidebar = function(b) {
        var c = a.extend(!0, a.fn.simplerSidebar.settings, b);
        return this.each(function() {
            var b, d, e, f, g, h, i = c.attr, j = a(this), k = a(c.opener), l = c.sidebar.closingLinks, m = c.animation.duration, n = c.sidebar.width, o = c.sidebar.gap, p = n + o, q = a(window).width(), r = {}, s = {}, t = function() {
                a("body, html").css("overflow", "hidden")
            }, u = function() {
                a("body, html").css("overflow", "auto")
            }, v = {
                duration: m,
                easing: c.animation.easing,
                complete: t
            }, w = {
                duration: m,
                easing: c.animation.easing,
                complete: u
            }, x = function() {
                j.animate(r, v).attr("data-" + i, "active"), A.fadeIn(m)
            }, y = function() {
                j.animate(s, w).attr("data-" + i, "disabled"), A.fadeOut(m)
            }, z = function() {
                var a = j.attr("data-" + i), c = j.width();
                s[b] =- c, "active" === a && y()
            }, A = a("<div>").attr("data-" + i, "mask");
            - 1 !== [void 0, "right"].indexOf(c.sidebar.align) ? b = "right" : "left" === c.sidebar.align ? b = "left" : console.log('ERR sidebar.align: you typed "' + c.sidebar.align + '". You should choose between"right" or "left".'), d = p > q ? q - o : n, e = {
                position: "fixed",
                top: c.top,
                bottom: 0,
                width: d
            }, e[b] =- d, r[b] = 0, f = a.extend(!0, e, c.sidebar.css), j.css(f).attr("data-" + i, "disabled"), g = {
                position: "fixed",
                top: c.top,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: c.sidebar.css.zIndex - 1,
                display: "none"
            }, h = a.extend(!0, g, c.mask.css), - 1 !== [!0, "true", !1, "false"].indexOf(c.mask.display)?-1 !== [!0, "true"].indexOf(c.mask.display) && A.appendTo("body").css(h) : console.log('ERR mask.display: you typed "' + c.mask.display + '". You should choose between true or false.'), k.click(function() {
                var a = j.attr("data-" + i), c = j.width();
                s[b] =- c, "disabled" === a ? x() : "active" === a && y()
            }), A.click(z), j.on("click", l, z), a(window).resize(function() {
                var c, d, e = j.attr("data-" + i), f = a(window).width();
                c = p > f ? f - o : n, d = {
                    width: c
                }, "disabled" === e ? (d[b] =- c, j.css(d)) : "active" === e && j.css(d)
            })
        })
    }, a.fn.simplerSidebar.settings = {
        attr: "simplersidebar",
        top: 0,
        animation: {
            duration: 500,
            easing: "swing"
        },
        sidebar: {
            width: 300,
            gap: 64,
            closingLinks: "a",
            css: {
                zIndex: 3e3
            }
        },
        mask: {
            display: !0,
            css: {
                backgroundColor: "black",
                opacity: .5,
                filter: "Alpha(opacity=50)"
            }
        }
    }
}(jQuery);
