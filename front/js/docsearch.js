(function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.docsearch = e() : t.docsearch = e()
})("undefined" != typeof self ? self : this, function() {
    return function(t) {
        function e(o) {
            if (r[o])
                return r[o].exports;
            var n = r[o] = {
                i: o,
                l: !1,
                exports: {}
            };
            return t[o].call(n.exports, n, n.exports, e),
                n.l = !0,
                n.exports
        }
        var r = {};
        return e.m = t,
            e.c = r,
            e.d = function(t, r, o) {
                e.o(t, r) || Object.defineProperty(t, r, {
                    configurable: !1,
                    enumerable: !0,
                    get: o
                })
            },
            e.n = function(t) {
                var r = t && t.__esModule ? function() {
                        return t.default
                    } :
                    function() {
                        return t
                    };
                return e.d(r, "a", r),
                    r
            },
            e.o = function(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            },
            e.p = "/",
            e(e.s = 11)
    }([function(t, e) {
        var r = Object.prototype.hasOwnProperty,
            o = Object.prototype.toString;
        t.exports = function(t, e, n) {
            if ("[object Function]" !== o.call(e))
                throw new TypeError("iterator must be a function");
            var i = t.length;
            if (i === +i)
                for (var s = 0; s < i; s++)
                    e.call(n, t[s], s, t);
            else
                for (var a in t)
                    r.call(t, a) && e.call(n, t[a], a, t)
        }
    }, function(t, e) {
        t.exports = function(t) {
            return JSON.parse(JSON.stringify(t))
        }
    }, function(t, e, r) {
        "use strict";

        function o(t, e) {
            var o = r(0),
                n = this;
            "function" == typeof Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : n.stack = (new Error).stack || "Cannot get a stacktrace, browser is too old",
                this.name = "AlgoliaSearchError",
                this.message = t || "Unknown error",
                e && o(e, function(t, e) {
                    n[e] = t
                })
        }

        function n(t, e) {
            function r() {
                var r = Array.prototype.slice.call(arguments, 0);
                "string" != typeof r[0] && r.unshift(e),
                    o.apply(this, r),
                    this.name = "AlgoliaSearch" + t + "Error"
            }
            return i(r, o),
                r
        }
        var i = r(8);
        i(o, Error),
            t.exports = {
                AlgoliaSearchError: o,
                UnparsableJSON: n("UnparsableJSON", "Could not parse the incoming response as JSON, see err.more for details"),
                RequestTimeout: n("RequestTimeout", "Request timedout before getting a response"),
                Network: n("Network", "Network issue, see err.more for details"),
                JSONPScriptFail: n("JSONPScriptFail", "<script> was loaded but did not call our provided callback"),
                JSONPScriptError: n("JSONPScriptError", "<script> unable to load due to an `error` event on it"),
                Unknown: n("Unknown", "Unknown error occured")
            }
    }, function(t, e, r) {
        (function(o) {
            function n() {
                return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
            }

            function i(t) {
                var r = this.useColors;
                if (t[0] = (r ? "%c" : "") + this.namespace + (r ? " %c" : " ") + t[0] + (r ? "%c " : " ") + "+" + e.humanize(this.diff),
                    r) {
                    var o = "color: " + this.color;
                    t.splice(1, 0, o, "color: inherit");
                    var n = 0,
                        i = 0;
                    t[0].replace(/%[a-zA-Z%]/g, function(t) {
                            "%%" !== t && (n++,
                                "%c" === t && (i = n))
                        }),
                        t.splice(i, 0, o)
                }
            }

            function s() {
                return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
            }

            function a(t) {
                try {
                    null == t ? e.storage.removeItem("debug") : e.storage.debug = t
                } catch (t) {}
            }

            function c() {
                var t;
                try {
                    t = e.storage.debug
                } catch (t) {}
                return !t && void 0 !== o && "env" in o && (t = o.env.DEBUG),
                    t
            }
            e = t.exports = r(24),
                e.log = s,
                e.formatArgs = i,
                e.save = a,
                e.load = c,
                e.useColors = n,
                e.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
                    try {
                        return window.localStorage
                    } catch (t) {}
                }(),
                e.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"],
                e.formatters.j = function(t) {
                    try {
                        return JSON.stringify(t)
                    } catch (t) {
                        return "[UnexpectedJSONParseError]: " + t.message
                    }
                },
                e.enable(c())
        }).call(e, r(4))
    }, function(t, e) {
        function r() {
            throw new Error("setTimeout has not been defined")
        }

        function o() {
            throw new Error("clearTimeout has not been defined")
        }

        function n(t) {
            if (l === setTimeout)
                return setTimeout(t, 0);
            if ((l === r || !l) && setTimeout)
                return l = setTimeout,
                    setTimeout(t, 0);
            try {
                return l(t, 0)
            } catch (e) {
                try {
                    return l.call(null, t, 0)
                } catch (e) {
                    return l.call(this, t, 0)
                }
            }
        }

        function i(t) {
            if (p === clearTimeout)
                return clearTimeout(t);
            if ((p === o || !p) && clearTimeout)
                return p = clearTimeout,
                    clearTimeout(t);
            try {
                return p(t)
            } catch (e) {
                try {
                    return p.call(null, t)
                } catch (e) {
                    return p.call(this, t)
                }
            }
        }

        function s() {
            y && h && (y = !1,
                h.length ? d = h.concat(d) : m = -1,
                d.length && a())
        }

        function a() {
            if (!y) {
                var t = n(s);
                y = !0;
                for (var e = d.length; e;) {
                    for (h = d,
                        d = []; ++m < e;)
                        h && h[m].run();
                    m = -1,
                        e = d.length
                }
                h = null,
                    y = !1,
                    i(t)
            }
        }

        function c(t, e) {
            this.fun = t,
                this.array = e
        }

        function u() {}
        var l, p, f = t.exports = {};
        (function() {
            try {
                l = "function" == typeof setTimeout ? setTimeout : r
            } catch (t) {
                l = r
            }
            try {
                p = "function" == typeof clearTimeout ? clearTimeout : o
            } catch (t) {
                p = o
            }
        })();
        var h, d = [],
            y = !1,
            m = -1;
        f.nextTick = function(t) {
                var e = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var r = 1; r < arguments.length; r++)
                        e[r - 1] = arguments[r];
                d.push(new c(t, e)),
                    1 !== d.length || y || n(a)
            },
            c.prototype.run = function() {
                this.fun.apply(null, this.array)
            },
            f.title = "browser",
            f.browser = !0,
            f.env = {},
            f.argv = [],
            f.version = "",
            f.versions = {},
            f.on = u,
            f.addListener = u,
            f.once = u,
            f.off = u,
            f.removeListener = u,
            f.removeAllListeners = u,
            f.emit = u,
            f.prependListener = u,
            f.prependOnceListener = u,
            f.listeners = function(t) {
                return []
            },
            f.binding = function(t) {
                throw new Error("process.binding is not supported")
            },
            f.cwd = function() {
                return "/"
            },
            f.chdir = function(t) {
                throw new Error("process.chdir is not supported")
            },
            f.umask = function() {
                return 0
            }
    }, function(t, e) {
        var r = {}.toString;
        t.exports = Array.isArray || function(t) {
            return "[object Array]" == r.call(t)
        }
    }, function(t, e, r) {
        var o = r(0);
        t.exports = function(t, e) {
            var r = [];
            return o(t, function(o, n) {
                    r.push(e(o, n, t))
                }),
                r
        }
    }, function(t, e) {
        var r;
        r = function() {
            return this
        }();
        try {
            r = r || Function("return this")() || (0,
                eval)("this")
        } catch (t) {
            "object" == typeof window && (r = window)
        }
        t.exports = r
    }, function(t, e) {
        "function" == typeof Object.create ? t.exports = function(t, e) {
                t.super_ = e,
                    t.prototype = Object.create(e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    })
            } :
            t.exports = function(t, e) {
                t.super_ = e;
                var r = function() {};
                r.prototype = e.prototype,
                    t.prototype = new r,
                    t.prototype.constructor = t
            }
    }, function(t, e, r) {
        function o(t, e) {
            return function(r, o, i) {
                if ("function" == typeof r && "object" == typeof o || "object" == typeof i)
                    throw new n.AlgoliaSearchError("index.search usage is index.search(query, params, cb)");
                0 === arguments.length || "function" == typeof r ? (i = r,
                        r = "") : 1 !== arguments.length && "function" != typeof o || (i = o,
                        o = void 0),
                    "object" == typeof r && null !== r ? (o = r,
                        r = void 0) : void 0 !== r && null !== r || (r = "");
                var s = "";
                void 0 !== r && (s += t + "=" + encodeURIComponent(r));
                var a;
                return void 0 !== o && (o.additionalUA && (a = o.additionalUA,
                            delete o.additionalUA),
                        s = this.as._getSearchParams(o, s)),
                    this._search(s, e, i, a)
            }
        }
        t.exports = o;
        var n = r(2)
    }, function(t, e, r) {
        "use strict";
        e.a = {
            computed: {
                showLogo: function() {
                    return Boolean(this.$store.state.searchResult)
                }
            }
        }
    }, function(t, e, r) {
        t.exports = r(12)
    }, function(t, e, r) {
        var o = r(13),
            n = r(36).default;
        t.exports = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                e = t.appId,
                r = t.apiKey,
                i = t.indexName,
                s = t.url;
            return function(t) {
                var a = t.store,
                    c = t.registerComponent,
                    u = s || a.state.config.url;
                if (!u)
                    return console.error("docsearch requires a `url` option");
                if (/^http:\/\/localhost/.test(u))
                    return console.error("`url` option cannot be localhost");
                "/" === u.slice(-1) && (u = u.replace(/\/$/, ""));
                var l = new RegExp("^" + u + "(/#)?");
                c("sidebar:start", n),
                    a.registerModule("pluginSearch", {
                        actions: {
                            search: function(t, n) {
                                var s = (t.commit,
                                        t.dispatch),
                                    a = (t.rootState,
                                        t.getters);
                                if (s("updateSearchKeyword", n), !n)
                                    return void s("stopSearching", null);
                                s("startSearching");
                                var c = a.currentTags;
                                o(e, r).search([{
                                    indexName: i,
                                    query: n,
                                    params: {
                                        filters: c.length > 0 ? "(" + c.map(function(t) {
                                            return t = /^.+:.+$/.test(t) ? t : "tags:" + t,
                                                t = t.replace(/\\:/g, ":")
                                        }).join(" OR ") + ")" : ""
                                    }
                                }]).then(function(t) {
                                    var e = t.results[0];
                                    s("stopSearching", e.hits.map(function(t) {
                                        var e = t.url.replace(l, "").replace(/#([\s\S]+)$/, ""),
                                            r = Object.keys(t.hierarchy).sort();
                                        return r.length > 3 && r.shift(),
                                            r = r.filter(function(e) {
                                                return Boolean(t.hierarchy[e])
                                            }).map(function(e) {
                                                return t.hierarchy[e]
                                            }).join(" > "), {
                                                title: r,
                                                path: e,
                                                id: t.anchor,
                                                content: t.content
                                            }
                                    }))
                                })
                            }
                        }
                    })
            }
        }
    }, function(t, e, r) {
        "use strict";
        var o = r(14),
            n = r(26);
        t.exports = n(o, "(lite) ")
    }, function(t, e, r) {
        (function(e) {
            function o(t, e, o) {
                var i = r(3)("algoliasearch"),
                    s = r(1),
                    a = r(5),
                    u = r(6),
                    l = "Usage: algoliasearch(applicationID, apiKey, opts)";
                if (!0 !== o._allowEmptyCredentials && !t)
                    throw new c.AlgoliaSearchError("Please provide an application ID. " + l);
                if (!0 !== o._allowEmptyCredentials && !e)
                    throw new c.AlgoliaSearchError("Please provide an API key. " + l);
                this.applicationID = t,
                    this.apiKey = e,
                    this.hosts = {
                        read: [],
                        write: []
                    },
                    o = o || {};
                var p = o.protocol || "https:";
                if (this._timeouts = o.timeouts || {
                        connect: 1e3,
                        read: 2e3,
                        write: 3e4
                    },
                    o.timeout && (this._timeouts.connect = this._timeouts.read = this._timeouts.write = o.timeout),
                    /:$/.test(p) || (p += ":"),
                    "http:" !== o.protocol && "https:" !== o.protocol)
                    throw new c.AlgoliaSearchError("protocol must be `http:` or `https:` (was `" + o.protocol + "`)");
                if (this._checkAppIdData(),
                    o.hosts)
                    a(o.hosts) ? (this.hosts.read = s(o.hosts),
                        this.hosts.write = s(o.hosts)) : (this.hosts.read = s(o.hosts.read),
                        this.hosts.write = s(o.hosts.write));
                else {
                    var f = u(this._shuffleResult, function(e) {
                        return t + "-" + e + ".algolianet.com"
                    });
                    this.hosts.read = [this.applicationID + "-dsn.algolia.net"].concat(f),
                        this.hosts.write = [this.applicationID + ".algolia.net"].concat(f)
                }
                this.hosts.read = u(this.hosts.read, n(p)),
                    this.hosts.write = u(this.hosts.write, n(p)),
                    this.extraHeaders = [],
                    this.cache = o._cache || {},
                    this._ua = o._ua,
                    this._useCache = !(void 0 !== o._useCache && !o._cache) || o._useCache,
                    this._useFallback = void 0 === o.useFallback || o.useFallback,
                    this._setTimeout = o._setTimeout,
                    i("init done, %j", this)
            }

            function n(t) {
                return function(e) {
                    return t + "//" + e.toLowerCase()
                }
            }

            function i(t) {
                if (void 0 === Array.prototype.toJSON)
                    return JSON.stringify(t);
                var e = Array.prototype.toJSON;
                delete Array.prototype.toJSON;
                var r = JSON.stringify(t);
                return Array.prototype.toJSON = e,
                    r
            }

            function s(t) {
                for (var e, r, o = t.length; 0 !== o;)
                    r = Math.floor(Math.random() * o),
                    o -= 1,
                    e = t[o],
                    t[o] = t[r],
                    t[r] = e;
                return t
            }

            function a(t) {
                var e = {};
                for (var r in t)
                    if (Object.prototype.hasOwnProperty.call(t, r)) {
                        var o;
                        o = "x-algolia-api-key" === r || "x-algolia-application-id" === r ? "**hidden for security purposes**" : t[r],
                            e[r] = o
                    }
                return e
            }
            t.exports = o;
            var c = r(2),
                u = r(15),
                l = r(16),
                p = r(23),
                f = e.env.RESET_APP_DATA_TIMER && parseInt(e.env.RESET_APP_DATA_TIMER, 10) || 12e4;
            o.prototype.initIndex = function(t) {
                    return new l(this, t)
                },
                o.prototype.setExtraHeader = function(t, e) {
                    this.extraHeaders.push({
                        name: t.toLowerCase(),
                        value: e
                    })
                },
                o.prototype.addAlgoliaAgent = function(t) {
                    -1 === this._ua.indexOf(";" + t) && (this._ua += ";" + t)
                },
                o.prototype._jsonRequest = function(t) {
                    function e(r, u) {
                        function g(t) {
                            var e = t && t.body && t.body.message && t.body.status || t.statusCode || t && t.body && 200;
                            s("received response: statusCode: %s, computed statusCode: %d, headers: %j", t.statusCode, e, t.headers);
                            var r = 2 === Math.floor(e / 100),
                                i = new Date;
                            if (m.push({
                                    currentHost: x,
                                    headers: a(n),
                                    content: o || null,
                                    contentLength: void 0 !== o ? o.length : null,
                                    method: u.method,
                                    timeouts: u.timeouts,
                                    url: u.url,
                                    startTime: S,
                                    endTime: i,
                                    duration: i - S,
                                    statusCode: e
                                }),
                                r)
                                return f._useCache && p && (p[_] = t.responseText),
                                    t.body;
                            if (4 !== Math.floor(e / 100))
                                return h += 1,
                                    b();
                            s("unrecoverable error");
                            var l = new c.AlgoliaSearchError(t.body && t.body.message, {
                                debugData: m,
                                statusCode: e
                            });
                            return f._promise.reject(l)
                        }

                        function v(e) {
                            s("error: %s, stack: %s", e.message, e.stack);
                            var r = new Date;
                            return m.push({
                                    currentHost: x,
                                    headers: a(n),
                                    content: o || null,
                                    contentLength: void 0 !== o ? o.length : null,
                                    method: u.method,
                                    timeouts: u.timeouts,
                                    url: u.url,
                                    startTime: S,
                                    endTime: r,
                                    duration: r - S
                                }),
                                e instanceof c.AlgoliaSearchError || (e = new c.Unknown(e && e.message, e)),
                                h += 1,
                                e instanceof c.Unknown || e instanceof c.UnparsableJSON || h >= f.hosts[t.hostType].length && (d || !y) ? (e.debugData = m,
                                    f._promise.reject(e)) : e instanceof c.RequestTimeout ? w() : b()
                        }

                        function b() {
                            return s("retrying request"),
                                f._incrementHostIndex(t.hostType),
                                e(r, u)
                        }

                        function w() {
                            return s("retrying request with higher timeout"),
                                f._incrementHostIndex(t.hostType),
                                f._incrementTimeoutMultipler(),
                                u.timeouts = f._getTimeoutsForRequest(t.hostType),
                                e(r, u)
                        }
                        f._checkAppIdData();
                        var _, S = new Date;
                        if (f._useCache && (_ = t.url),
                            f._useCache && o && (_ += "_body_" + u.body),
                            f._useCache && p && void 0 !== p[_])
                            return s("serving response from cache"),
                                f._promise.resolve(JSON.parse(p[_]));
                        if (h >= f.hosts[t.hostType].length)
                            return !y || d ? (s("could not get any response"),
                                f._promise.reject(new c.AlgoliaSearchError("Cannot connect to the AlgoliaSearch API. Send an email to support@algolia.com to report and resolve the issue. Application id was: " + f.applicationID, {
                                    debugData: m
                                }))) : (s("switching to fallback"),
                                h = 0,
                                u.method = t.fallback.method,
                                u.url = t.fallback.url,
                                u.jsonBody = t.fallback.body,
                                u.jsonBody && (u.body = i(u.jsonBody)),
                                n = f._computeRequestHeaders(l),
                                u.timeouts = f._getTimeoutsForRequest(t.hostType),
                                f._setHostIndexByType(0, t.hostType),
                                d = !0,
                                e(f._request.fallback, u));
                        var x = f._getHostByType(t.hostType),
                            T = x + u.url,
                            j = {
                                body: u.body,
                                jsonBody: u.jsonBody,
                                method: u.method,
                                headers: n,
                                timeouts: u.timeouts,
                                debug: s
                            };
                        return s("method: %s, url: %s, headers: %j, timeouts: %d", j.method, T, j.headers, j.timeouts),
                            r === f._request.fallback && s("using fallback"),
                            r.call(f, T, j).then(g, v)
                    }
                    this._checkAppIdData();
                    var o, n, s = r(3)("algoliasearch:" + t.url),
                        l = t.additionalUA || "",
                        p = t.cache,
                        f = this,
                        h = 0,
                        d = !1,
                        y = f._useFallback && f._request.fallback && t.fallback;
                    this.apiKey.length > 500 && void 0 !== t.body && (void 0 !== t.body.params || void 0 !== t.body.requests) ? (t.body.apiKey = this.apiKey,
                            n = this._computeRequestHeaders(l, !1)) : n = this._computeRequestHeaders(l),
                        void 0 !== t.body && (o = i(t.body)),
                        s("request start");
                    var m = [],
                        g = e(f._request, {
                            url: t.url,
                            method: t.method,
                            body: o,
                            jsonBody: t.body,
                            timeouts: f._getTimeoutsForRequest(t.hostType)
                        });
                    if (!t.callback)
                        return g;
                    g.then(function(e) {
                        u(function() {
                            t.callback(null, e)
                        }, f._setTimeout || setTimeout)
                    }, function(e) {
                        u(function() {
                            t.callback(e)
                        }, f._setTimeout || setTimeout)
                    })
                },
                o.prototype._getSearchParams = function(t, e) {
                    if (void 0 === t || null === t)
                        return e;
                    for (var r in t)
                        null !== r && void 0 !== t[r] && t.hasOwnProperty(r) && (e += "" === e ? "" : "&",
                            e += r + "=" + encodeURIComponent("[object Array]" === Object.prototype.toString.call(t[r]) ? i(t[r]) : t[r]));
                    return e
                },
                o.prototype._computeRequestHeaders = function(t, e) {
                    var o = r(0),
                        n = t ? this._ua + ";" + t : this._ua,
                        i = {
                            "x-algolia-agent": n,
                            "x-algolia-application-id": this.applicationID
                        };
                    return !1 !== e && (i["x-algolia-api-key"] = this.apiKey),
                        this.userToken && (i["x-algolia-usertoken"] = this.userToken),
                        this.securityTags && (i["x-algolia-tagfilters"] = this.securityTags),
                        this.extraHeaders && o(this.extraHeaders, function(t) {
                            i[t.name] = t.value
                        }),
                        i
                },
                o.prototype.search = function(t, e, o) {
                    var n = r(5),
                        i = r(6);
                    if (!n(t))
                        throw new Error("Usage: client.search(arrayOfQueries[, callback])");
                    "function" == typeof e ? (o = e,
                        e = {}) : void 0 === e && (e = {});
                    var s = this,
                        a = {
                            requests: i(t, function(t) {
                                var e = "";
                                return void 0 !== t.query && (e += "query=" + encodeURIComponent(t.query)), {
                                    indexName: t.indexName,
                                    params: s._getSearchParams(t.params, e)
                                }
                            })
                        },
                        c = i(a.requests, function(t, e) {
                            return e + "=" + encodeURIComponent("/1/indexes/" + encodeURIComponent(t.indexName) + "?" + t.params)
                        }).join("&"),
                        u = "/1/indexes/*/queries";
                    return void 0 !== e.strategy && (u += "?strategy=" + e.strategy),
                        this._jsonRequest({
                            cache: this.cache,
                            method: "POST",
                            url: u,
                            body: a,
                            hostType: "read",
                            fallback: {
                                method: "GET",
                                url: "/1/indexes/*",
                                body: {
                                    params: c
                                }
                            },
                            callback: o
                        })
                },
                o.prototype.setSecurityTags = function(t) {
                    if ("[object Array]" === Object.prototype.toString.call(t)) {
                        for (var e = [], r = 0; r < t.length; ++r)
                            if ("[object Array]" === Object.prototype.toString.call(t[r])) {
                                for (var o = [], n = 0; n < t[r].length; ++n)
                                    o.push(t[r][n]);
                                e.push("(" + o.join(",") + ")")
                            } else
                                e.push(t[r]);
                        t = e.join(",")
                    }
                    this.securityTags = t
                },
                o.prototype.setUserToken = function(t) {
                    this.userToken = t
                },
                o.prototype.clearCache = function() {
                    this.cache = {}
                },
                o.prototype.setRequestTimeout = function(t) {
                    t && (this._timeouts.connect = this._timeouts.read = this._timeouts.write = t)
                },
                o.prototype.setTimeouts = function(t) {
                    this._timeouts = t
                },
                o.prototype.getTimeouts = function() {
                    return this._timeouts
                },
                o.prototype._getAppIdData = function() {
                    var t = p.get(this.applicationID);
                    return null !== t && this._cacheAppIdData(t),
                        t
                },
                o.prototype._setAppIdData = function(t) {
                    return t.lastChange = (new Date).getTime(),
                        this._cacheAppIdData(t),
                        p.set(this.applicationID, t)
                },
                o.prototype._checkAppIdData = function() {
                    var t = this._getAppIdData(),
                        e = (new Date).getTime();
                    return null === t || e - t.lastChange > f ? this._resetInitialAppIdData(t) : t
                },
                o.prototype._resetInitialAppIdData = function(t) {
                    var e = t || {};
                    return e.hostIndexes = {
                            read: 0,
                            write: 0
                        },
                        e.timeoutMultiplier = 1,
                        e.shuffleResult = e.shuffleResult || s([1, 2, 3]),
                        this._setAppIdData(e)
                },
                o.prototype._cacheAppIdData = function(t) {
                    this._hostIndexes = t.hostIndexes,
                        this._timeoutMultiplier = t.timeoutMultiplier,
                        this._shuffleResult = t.shuffleResult
                },
                o.prototype._partialAppIdDataUpdate = function(t) {
                    var e = r(0),
                        o = this._getAppIdData();
                    return e(t, function(t, e) {
                            o[e] = t
                        }),
                        this._setAppIdData(o)
                },
                o.prototype._getHostByType = function(t) {
                    return this.hosts[t][this._getHostIndexByType(t)]
                },
                o.prototype._getTimeoutMultiplier = function() {
                    return this._timeoutMultiplier
                },
                o.prototype._getHostIndexByType = function(t) {
                    return this._hostIndexes[t]
                },
                o.prototype._setHostIndexByType = function(t, e) {
                    var o = r(1),
                        n = o(this._hostIndexes);
                    return n[e] = t,
                        this._partialAppIdDataUpdate({
                            hostIndexes: n
                        }),
                        t
                },
                o.prototype._incrementHostIndex = function(t) {
                    return this._setHostIndexByType((this._getHostIndexByType(t) + 1) % this.hosts[t].length, t)
                },
                o.prototype._incrementTimeoutMultipler = function() {
                    var t = Math.max(this._timeoutMultiplier + 1, 4);
                    return this._partialAppIdDataUpdate({
                        timeoutMultiplier: t
                    })
                },
                o.prototype._getTimeoutsForRequest = function(t) {
                    return {
                        connect: this._timeouts.connect * this._timeoutMultiplier,
                        complete: this._timeouts[t] * this._timeoutMultiplier
                    }
                }
        }).call(e, r(4))
    }, function(t, e) {
        t.exports = function(t, e) {
            e(t, 0)
        }
    }, function(t, e, r) {
        function o(t, e) {
            this.indexName = e,
                this.as = t,
                this.typeAheadArgs = null,
                this.typeAheadValueOption = null,
                this.cache = {}
        }
        var n = r(9),
            i = r(17),
            s = r(18);
        t.exports = o,
            o.prototype.clearCache = function() {
                this.cache = {}
            },
            o.prototype.search = n("query"),
            o.prototype.similarSearch = n("similarQuery"),
            o.prototype.browse = function(t, e, o) {
                var n, i, s = r(19),
                    a = this;
                0 === arguments.length || 1 === arguments.length && "function" == typeof arguments[0] ? (n = 0,
                        o = arguments[0],
                        t = void 0) : "number" == typeof arguments[0] ? (n = arguments[0],
                        "number" == typeof arguments[1] ? i = arguments[1] : "function" == typeof arguments[1] && (o = arguments[1],
                            i = void 0),
                        t = void 0,
                        e = void 0) : "object" == typeof arguments[0] ? ("function" == typeof arguments[1] && (o = arguments[1]),
                        e = arguments[0],
                        t = void 0) : "string" == typeof arguments[0] && "function" == typeof arguments[1] && (o = arguments[1],
                        e = void 0),
                    e = s({}, e || {}, {
                        page: n,
                        hitsPerPage: i,
                        query: t
                    });
                var c = this.as._getSearchParams(e, "");
                return this.as._jsonRequest({
                    method: "POST",
                    url: "/1/indexes/" + encodeURIComponent(a.indexName) + "/browse",
                    body: {
                        params: c
                    },
                    hostType: "read",
                    callback: o
                })
            },
            o.prototype.browseFrom = function(t, e) {
                return this.as._jsonRequest({
                    method: "POST",
                    url: "/1/indexes/" + encodeURIComponent(this.indexName) + "/browse",
                    body: {
                        cursor: t
                    },
                    hostType: "read",
                    callback: e
                })
            },
            o.prototype.searchForFacetValues = function(t, e) {
                var o = r(1),
                    n = r(20);
                if (void 0 === t.facetName || void 0 === t.facetQuery)
                    throw new Error("Usage: index.searchForFacetValues({facetName, facetQuery, ...params}[, callback])");
                var i = t.facetName,
                    s = n(o(t), function(t) {
                        return "facetName" === t
                    }),
                    a = this.as._getSearchParams(s, "");
                return this.as._jsonRequest({
                    method: "POST",
                    url: "/1/indexes/" + encodeURIComponent(this.indexName) + "/facets/" + encodeURIComponent(i) + "/query",
                    hostType: "read",
                    body: {
                        params: a
                    },
                    callback: e
                })
            },
            o.prototype.searchFacet = i(function(t, e) {
                return this.searchForFacetValues(t, e)
            }, s("index.searchFacet(params[, callback])", "index.searchForFacetValues(params[, callback])")),
            o.prototype._search = function(t, e, r, o) {
                return this.as._jsonRequest({
                    cache: this.cache,
                    method: "POST",
                    url: e || "/1/indexes/" + encodeURIComponent(this.indexName) + "/query",
                    body: {
                        params: t
                    },
                    hostType: "read",
                    fallback: {
                        method: "GET",
                        url: "/1/indexes/" + encodeURIComponent(this.indexName),
                        body: {
                            params: t
                        }
                    },
                    callback: r,
                    additionalUA: o
                })
            },
            o.prototype.getObject = function(t, e, r) {
                var o = this;
                1 !== arguments.length && "function" != typeof e || (r = e,
                    e = void 0);
                var n = "";
                if (void 0 !== e) {
                    n = "?attributes=";
                    for (var i = 0; i < e.length; ++i)
                        0 !== i && (n += ","),
                        n += e[i]
                }
                return this.as._jsonRequest({
                    method: "GET",
                    url: "/1/indexes/" + encodeURIComponent(o.indexName) + "/" + encodeURIComponent(t) + n,
                    hostType: "read",
                    callback: r
                })
            },
            o.prototype.getObjects = function(t, e, o) {
                var n = r(5),
                    i = r(6);
                if (!n(t))
                    throw new Error("Usage: index.getObjects(arrayOfObjectIDs[, callback])");
                var s = this;
                1 !== arguments.length && "function" != typeof e || (o = e,
                    e = void 0);
                var a = {
                    requests: i(t, function(t) {
                        var r = {
                            indexName: s.indexName,
                            objectID: t
                        };
                        return e && (r.attributesToRetrieve = e.join(",")),
                            r
                    })
                };
                return this.as._jsonRequest({
                    method: "POST",
                    url: "/1/indexes/*/objects",
                    hostType: "read",
                    body: a,
                    callback: o
                })
            },
            o.prototype.as = null,
            o.prototype.indexName = null,
            o.prototype.typeAheadArgs = null,
            o.prototype.typeAheadValueOption = null
    }, function(t, e) {
        t.exports = function(t, e) {
            function r() {
                return o || (console.log(e),
                        o = !0),
                    t.apply(this, arguments)
            }
            var o = !1;
            return r
        }
    }, function(t, e) {
        t.exports = function(t, e) {
            return "algoliasearch: `" + t + "` was replaced by `" + e + "`. Please see https://github.com/algolia/algoliasearch-client-js/wiki/Deprecated#" + t.toLowerCase().replace(".", "").replace("()", "")
        }
    }, function(t, e, r) {
        var o = r(0);
        t.exports = function t(e) {
            var r = Array.prototype.slice.call(arguments);
            return o(r, function(r) {
                    for (var o in r)
                        r.hasOwnProperty(o) && ("object" == typeof e[o] && "object" == typeof r[o] ? e[o] = t({}, e[o], r[o]) : void 0 !== r[o] && (e[o] = r[o]))
                }),
                e
        }
    }, function(t, e, r) {
        t.exports = function(t, e) {
            var o = r(21),
                n = r(0),
                i = {};
            return n(o(t), function(r) {
                    !0 !== e(r) && (i[r] = t[r])
                }),
                i
        }
    }, function(t, e, r) {
        "use strict";
        var o = Object.prototype.hasOwnProperty,
            n = Object.prototype.toString,
            i = Array.prototype.slice,
            s = r(22),
            a = Object.prototype.propertyIsEnumerable,
            c = !a.call({
                toString: null
            }, "toString"),
            u = a.call(function() {}, "prototype"),
            l = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            p = function(t) {
                var e = t.constructor;
                return e && e.prototype === t
            },
            f = {
                $console: !0,
                $external: !0,
                $frame: !0,
                $frameElement: !0,
                $frames: !0,
                $innerHeight: !0,
                $innerWidth: !0,
                $outerHeight: !0,
                $outerWidth: !0,
                $pageXOffset: !0,
                $pageYOffset: !0,
                $parent: !0,
                $scrollLeft: !0,
                $scrollTop: !0,
                $scrollX: !0,
                $scrollY: !0,
                $self: !0,
                $webkitIndexedDB: !0,
                $webkitStorageInfo: !0,
                $window: !0
            },
            h = function() {
                if ("undefined" == typeof window)
                    return !1;
                for (var t in window)
                    try {
                        if (!f["$" + t] && o.call(window, t) && null !== window[t] && "object" == typeof window[t])
                            try {
                                p(window[t])
                            } catch (t) {
                                return !0
                            }
                    } catch (t) {
                        return !0
                    }
                return !1
            }(),
            d = function(t) {
                if ("undefined" == typeof window || !h)
                    return p(t);
                try {
                    return p(t)
                } catch (t) {
                    return !1
                }
            },
            y = function(t) {
                var e = null !== t && "object" == typeof t,
                    r = "[object Function]" === n.call(t),
                    i = s(t),
                    a = e && "[object String]" === n.call(t),
                    p = [];
                if (!e && !r && !i)
                    throw new TypeError("Object.keys called on a non-object");
                var f = u && r;
                if (a && t.length > 0 && !o.call(t, 0))
                    for (var h = 0; h < t.length; ++h)
                        p.push(String(h));
                if (i && t.length > 0)
                    for (var y = 0; y < t.length; ++y)
                        p.push(String(y));
                else
                    for (var m in t)
                        f && "prototype" === m || !o.call(t, m) || p.push(String(m));
                if (c)
                    for (var g = d(t), v = 0; v < l.length; ++v)
                        g && "constructor" === l[v] || !o.call(t, l[v]) || p.push(l[v]);
                return p
            };
        y.shim = function() {
                if (Object.keys) {
                    if (! function() {
                            return 2 === (Object.keys(arguments) || "").length
                        }(1, 2)) {
                        var t = Object.keys;
                        Object.keys = function(e) {
                            return t(s(e) ? i.call(e) : e)
                        }
                    }
                } else
                    Object.keys = y;
                return Object.keys || y
            },
            t.exports = y
    }, function(t, e, r) {
        "use strict";
        var o = Object.prototype.toString;
        t.exports = function(t) {
            var e = o.call(t),
                r = "[object Arguments]" === e;
            return r || (r = "[object Array]" !== e && null !== t && "object" == typeof t && "number" == typeof t.length && t.length >= 0 && "[object Function]" === o.call(t.callee)),
                r
        }
    }, function(t, e, r) {
        (function(e) {
            function o(t, e) {
                return c("localStorage failed with", e),
                    s(),
                    a = l,
                    a.get(t)
            }

            function n(t, e) {
                return 1 === arguments.length ? a.get(t) : a.set(t, e)
            }

            function i() {
                try {
                    return "localStorage" in e && null !== e.localStorage && (e.localStorage[u] || e.localStorage.setItem(u, JSON.stringify({})), !0)
                } catch (t) {
                    return !1
                }
            }

            function s() {
                try {
                    e.localStorage.removeItem(u)
                } catch (t) {}
            }
            var a, c = r(3)("algoliasearch:src/hostIndexState.js"),
                u = "algoliasearch-client-js",
                l = {
                    state: {},
                    set: function(t, e) {
                        return this.state[t] = e,
                            this.state[t]
                    },
                    get: function(t) {
                        return this.state[t] || null
                    }
                },
                p = {
                    set: function(t, r) {
                        l.set(t, r);
                        try {
                            var n = JSON.parse(e.localStorage[u]);
                            return n[t] = r,
                                e.localStorage[u] = JSON.stringify(n),
                                n[t]
                        } catch (e) {
                            return o(t, e)
                        }
                    },
                    get: function(t) {
                        try {
                            return JSON.parse(e.localStorage[u])[t] || null
                        } catch (e) {
                            return o(t, e)
                        }
                    }
                };
            a = i() ? p : l,
                t.exports = {
                    get: n,
                    set: n,
                    supportsLocalStorage: i
                }
        }).call(e, r(7))
    }, function(t, e, r) {
        function o(t) {
            var r, o = 0;
            for (r in t)
                o = (o << 5) - o + t.charCodeAt(r),
                o |= 0;
            return e.colors[Math.abs(o) % e.colors.length]
        }

        function n(t) {
            function r() {
                if (r.enabled) {
                    var t = r,
                        o = +new Date,
                        n = o - (u || o);
                    t.diff = n,
                        t.prev = u,
                        t.curr = o,
                        u = o;
                    for (var i = new Array(arguments.length), s = 0; s < i.length; s++)
                        i[s] = arguments[s];
                    i[0] = e.coerce(i[0]),
                        "string" != typeof i[0] && i.unshift("%O");
                    var a = 0;
                    i[0] = i[0].replace(/%([a-zA-Z%])/g, function(r, o) {
                            if ("%%" === r)
                                return r;
                            a++;
                            var n = e.formatters[o];
                            if ("function" == typeof n) {
                                var s = i[a];
                                r = n.call(t, s),
                                    i.splice(a, 1),
                                    a--
                            }
                            return r
                        }),
                        e.formatArgs.call(t, i);
                    (r.log || e.log || console.log.bind(console)).apply(t, i)
                }
            }
            return r.namespace = t,
                r.enabled = e.enabled(t),
                r.useColors = e.useColors(),
                r.color = o(t),
                "function" == typeof e.init && e.init(r),
                r
        }

        function i(t) {
            e.save(t),
                e.names = [],
                e.skips = [];
            for (var r = ("string" == typeof t ? t : "").split(/[\s,]+/), o = r.length, n = 0; n < o; n++)
                r[n] && (t = r[n].replace(/\*/g, ".*?"),
                    "-" === t[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t + "$")))
        }

        function s() {
            e.enable("")
        }

        function a(t) {
            var r, o;
            for (r = 0,
                o = e.skips.length; r < o; r++)
                if (e.skips[r].test(t))
                    return !1;
            for (r = 0,
                o = e.names.length; r < o; r++)
                if (e.names[r].test(t))
                    return !0;
            return !1
        }

        function c(t) {
            return t instanceof Error ? t.stack || t.message : t
        }
        e = t.exports = n.debug = n.default = n,
            e.coerce = c,
            e.disable = s,
            e.enable = i,
            e.enabled = a,
            e.humanize = r(25),
            e.names = [],
            e.skips = [],
            e.formatters = {};
        var u
    }, function(t, e) {
        function r(t) {
            if (t = String(t), !(t.length > 100)) {
                var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);
                if (e) {
                    var r = parseFloat(e[1]);
                    switch ((e[2] || "ms").toLowerCase()) {
                        case "years":
                        case "year":
                        case "yrs":
                        case "yr":
                        case "y":
                            return r * l;
                        case "days":
                        case "day":
                        case "d":
                            return r * u;
                        case "hours":
                        case "hour":
                        case "hrs":
                        case "hr":
                        case "h":
                            return r * c;
                        case "minutes":
                        case "minute":
                        case "mins":
                        case "min":
                        case "m":
                            return r * a;
                        case "seconds":
                        case "second":
                        case "secs":
                        case "sec":
                        case "s":
                            return r * s;
                        case "milliseconds":
                        case "millisecond":
                        case "msecs":
                        case "msec":
                        case "ms":
                            return r;
                        default:
                            return
                    }
                }
            }
        }

        function o(t) {
            return t >= u ? Math.round(t / u) + "d" : t >= c ? Math.round(t / c) + "h" : t >= a ? Math.round(t / a) + "m" : t >= s ? Math.round(t / s) + "s" : t + "ms"
        }

        function n(t) {
            return i(t, u, "day") || i(t, c, "hour") || i(t, a, "minute") || i(t, s, "second") || t + " ms"
        }

        function i(t, e, r) {
            if (!(t < e))
                return t < 1.5 * e ? Math.floor(t / e) + " " + r : Math.ceil(t / e) + " " + r + "s"
        }
        var s = 1e3,
            a = 60 * s,
            c = 60 * a,
            u = 24 * c,
            l = 365.25 * u;
        t.exports = function(t, e) {
            e = e || {};
            var i = typeof t;
            if ("string" === i && t.length > 0)
                return r(t);
            if ("number" === i && !1 === isNaN(t))
                return e.long ? n(t) : o(t);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t))
        }
    }, function(t, e, r) {
        "use strict";
        var o = r(27),
            n = o.Promise || r(28).Promise;
        t.exports = function(t, e) {
            function i(t, e, o) {
                var n = r(1),
                    a = r(34);
                return o = n(o || {}),
                    void 0 === o.protocol && (o.protocol = a()),
                    o._ua = o._ua || i.ua,
                    new s(t, e, o)
            }

            function s() {
                t.apply(this, arguments)
            }
            var a = r(8),
                c = r(2),
                u = r(30),
                l = r(32),
                p = r(33);
            e = e || "",
                i.version = r(35),
                i.ua = "Algolia for vanilla JavaScript " + e + i.version,
                i.initPlaces = p(i),
                o.__algolia = {
                    debug: r(3),
                    algoliasearch: i
                };
            var f = {
                hasXMLHttpRequest: "XMLHttpRequest" in o,
                hasXDomainRequest: "XDomainRequest" in o
            };
            return f.hasXMLHttpRequest && (f.cors = "withCredentials" in new XMLHttpRequest),
                a(s, t),
                s.prototype._request = function(t, e) {
                    return new n(function(r, o) {
                        function n() {
                            if (!d) {
                                clearTimeout(h);
                                var t;
                                try {
                                    t = {
                                        body: JSON.parse(m.responseText),
                                        responseText: m.responseText,
                                        statusCode: m.status,
                                        headers: m.getAllResponseHeaders && m.getAllResponseHeaders() || {}
                                    }
                                } catch (e) {
                                    t = new c.UnparsableJSON({
                                        more: m.responseText
                                    })
                                }
                                t instanceof c.UnparsableJSON ? o(t) : r(t)
                            }
                        }

                        function i(t) {
                            d || (clearTimeout(h),
                                o(new c.Network({
                                    more: t
                                })))
                        }

                        function s() {
                            d = !0,
                                m.abort(),
                                o(new c.RequestTimeout)
                        }

                        function a() {
                            g = !0,
                                clearTimeout(h),
                                h = setTimeout(s, e.timeouts.complete)
                        }

                        function l() {
                            g || a()
                        }

                        function p() {
                            !g && m.readyState > 1 && a()
                        }
                        if (!f.cors && !f.hasXDomainRequest)
                            return void o(new c.Network("CORS not supported"));
                        t = u(t, e.headers);
                        var h, d, y = e.body,
                            m = f.cors ? new XMLHttpRequest : new XDomainRequest,
                            g = !1;
                        h = setTimeout(s, e.timeouts.connect),
                            m.onprogress = l,
                            "onreadystatechange" in m && (m.onreadystatechange = p),
                            m.onload = n,
                            m.onerror = i,
                            m instanceof XMLHttpRequest ? m.open(e.method, t, !0) : m.open(e.method, t),
                            f.cors && (y && ("POST" === e.method ? m.setRequestHeader("content-type", "application/x-www-form-urlencoded") : m.setRequestHeader("content-type", "application/json")),
                                m.setRequestHeader("accept", "application/json")),
                            m.send(y)
                    })
                },
                s.prototype._request.fallback = function(t, e) {
                    return t = u(t, e.headers),
                        new n(function(r, o) {
                            l(t, e, function(t, e) {
                                if (t)
                                    return void o(t);
                                r(e)
                            })
                        })
                },
                s.prototype._promise = {
                    reject: function(t) {
                        return n.reject(t)
                    },
                    resolve: function(t) {
                        return n.resolve(t)
                    },
                    delay: function(t) {
                        return new n(function(e) {
                            setTimeout(e, t)
                        })
                    }
                },
                i
        }
    }, function(t, e, r) {
        (function(e) {
            var r;
            r = "undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {},
                t.exports = r
        }).call(e, r(7))
    }, function(t, e, r) {
        (function(e, o) {
            (function(e, r) {
                t.exports = r()
            })(0, function() {
                "use strict";

                function t(t) {
                    return "function" == typeof t || "object" == typeof t && null !== t
                }

                function n(t) {
                    return "function" == typeof t
                }

                function i(t) {
                    X = t
                }

                function s(t) {
                    K = t
                }

                function a() {
                    return void 0 !== B ? function() {
                            B(u)
                        } :
                        c()
                }

                function c() {
                    var t = setTimeout;
                    return function() {
                        return t(u, 1)
                    }
                }

                function u() {
                    for (var t = 0; t < L; t += 2) {
                        (0,
                            W[t])(W[t + 1]),
                        W[t] = void 0,
                            W[t + 1] = void 0
                    }
                    L = 0
                }

                function l(t, e) {
                    var r = arguments,
                        o = this,
                        n = new this.constructor(f);
                    void 0 === n[tt] && C(n);
                    var i = o._state;
                    return i ? function() {
                            var t = r[i - 1];
                            K(function() {
                                return k(i, n, t, o._result)
                            })
                        }() : T(o, n, t, e),
                        n
                }

                function p(t) {
                    var e = this;
                    if (t && "object" == typeof t && t.constructor === e)
                        return t;
                    var r = new e(f);
                    return w(r, t),
                        r
                }

                function f() {}

                function h() {
                    return new TypeError("You cannot resolve a promise with itself")
                }

                function d() {
                    return new TypeError("A promises callback cannot return that same promise.")
                }

                function y(t) {
                    try {
                        return t.then
                    } catch (t) {
                        return nt.error = t,
                            nt
                    }
                }

                function m(t, e, r, o) {
                    try {
                        t.call(e, r, o)
                    } catch (t) {
                        return t
                    }
                }

                function g(t, e, r) {
                    K(function(t) {
                        var o = !1,
                            n = m(r, e, function(r) {
                                o || (o = !0,
                                    e !== r ? w(t, r) : S(t, r))
                            }, function(e) {
                                o || (o = !0,
                                    x(t, e))
                            }, "Settle: " + (t._label || " unknown promise"));
                        !o && n && (o = !0,
                            x(t, n))
                    }, t)
                }

                function v(t, e) {
                    e._state === rt ? S(t, e._result) : e._state === ot ? x(t, e._result) : T(e, void 0, function(e) {
                        return w(t, e)
                    }, function(e) {
                        return x(t, e)
                    })
                }

                function b(t, e, r) {
                    e.constructor === t.constructor && r === l && e.constructor.resolve === p ? v(t, e) : r === nt ? (x(t, nt.error),
                        nt.error = null) : void 0 === r ? S(t, e) : n(r) ? g(t, e, r) : S(t, e)
                }

                function w(e, r) {
                    e === r ? x(e, h()) : t(r) ? b(e, r, y(r)) : S(e, r)
                }

                function _(t) {
                    t._onerror && t._onerror(t._result),
                        j(t)
                }

                function S(t, e) {
                    t._state === et && (t._result = e,
                        t._state = rt,
                        0 !== t._subscribers.length && K(j, t))
                }

                function x(t, e) {
                    t._state === et && (t._state = ot,
                        t._result = e,
                        K(_, t))
                }

                function T(t, e, r, o) {
                    var n = t._subscribers,
                        i = n.length;
                    t._onerror = null,
                        n[i] = e,
                        n[i + rt] = r,
                        n[i + ot] = o,
                        0 === i && t._state && K(j, t)
                }

                function j(t) {
                    var e = t._subscribers,
                        r = t._state;
                    if (0 !== e.length) {
                        for (var o = void 0, n = void 0, i = t._result, s = 0; s < e.length; s += 3)
                            o = e[s],
                            n = e[s + r],
                            o ? k(r, o, n, i) : n(i);
                        t._subscribers.length = 0
                    }
                }

                function A() {
                    this.error = null
                }

                function O(t, e) {
                    try {
                        return t(e)
                    } catch (t) {
                        return it.error = t,
                            it
                    }
                }

                function k(t, e, r, o) {
                    var i = n(r),
                        s = void 0,
                        a = void 0,
                        c = void 0,
                        u = void 0;
                    if (i) {
                        if (s = O(r, o),
                            s === it ? (u = !0,
                                a = s.error,
                                s.error = null) : c = !0,
                            e === s)
                            return void x(e, d())
                    } else
                        s = o,
                        c = !0;
                    e._state !== et || (i && c ? w(e, s) : u ? x(e, a) : t === rt ? S(e, s) : t === ot && x(e, s))
                }

                function I(t, e) {
                    try {
                        e(function(e) {
                            w(t, e)
                        }, function(e) {
                            x(t, e)
                        })
                    } catch (e) {
                        x(t, e)
                    }
                }

                function R() {
                    return st++
                }

                function C(t) {
                    t[tt] = st++,
                        t._state = void 0,
                        t._result = void 0,
                        t._subscribers = []
                }

                function E(t, e) {
                    this._instanceConstructor = t,
                        this.promise = new t(f),
                        this.promise[tt] || C(this.promise),
                        H(e) ? (this._input = e,
                            this.length = e.length,
                            this._remaining = e.length,
                            this._result = new Array(this.length),
                            0 === this.length ? S(this.promise, this._result) : (this.length = this.length || 0,
                                this._enumerate(),
                                0 === this._remaining && S(this.promise, this._result))) : x(this.promise, N())
                }

                function N() {
                    return new Error("Array Methods must be provided an Array")
                }

                function q(t) {
                    return new E(this, t).promise
                }

                function P(t) {
                    var e = this;
                    return new e(H(t) ? function(r, o) {
                            for (var n = t.length, i = 0; i < n; i++)
                                e.resolve(t[i]).then(r, o)
                        } :
                        function(t, e) {
                            return e(new TypeError("You must pass an array to race."))
                        }
                    )
                }

                function D(t) {
                    var e = this,
                        r = new e(f);
                    return x(r, t),
                        r
                }

                function U() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }

                function M() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                }

                function J(t) {
                    this[tt] = R(),
                        this._result = this._state = void 0,
                        this._subscribers = [],
                        f !== t && ("function" != typeof t && U(),
                            this instanceof J ? I(this, t) : M())
                }

                function $() {
                    var t = void 0;
                    if (void 0 !== o)
                        t = o;
                    else if ("undefined" != typeof self)
                        t = self;
                    else
                        try {
                            t = Function("return this")()
                        } catch (t) {
                            throw new Error("polyfill failed because global object is unavailable in this environment")
                        }
                    var e = t.Promise;
                    if (e) {
                        var r = null;
                        try {
                            r = Object.prototype.toString.call(e.resolve())
                        } catch (t) {}
                        if ("[object Promise]" === r && !e.cast)
                            return
                    }
                    t.Promise = J
                }
                var F = void 0;
                F = Array.isArray ? Array.isArray : function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                };
                var H = F,
                    L = 0,
                    B = void 0,
                    X = void 0,
                    K = function(t, e) {
                        W[L] = t,
                            W[L + 1] = e,
                            2 === (L += 2) && (X ? X(u) : Z())
                    },
                    V = "undefined" != typeof window ? window : void 0,
                    G = V || {},
                    Y = G.MutationObserver || G.WebKitMutationObserver,
                    z = "undefined" == typeof self && void 0 !== e && "[object process]" === {}.toString.call(e),
                    Q = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                    W = new Array(1e3),
                    Z = void 0;
                Z = z ? function() {
                    return function() {
                        return e.nextTick(u)
                    }
                }() : Y ? function() {
                    var t = 0,
                        e = new Y(u),
                        r = document.createTextNode("");
                    return e.observe(r, {
                            characterData: !0
                        }),
                        function() {
                            r.data = t = ++t % 2
                        }
                }() : Q ? function() {
                    var t = new MessageChannel;
                    return t.port1.onmessage = u,
                        function() {
                            return t.port2.postMessage(0)
                        }
                }() : void 0 === V ? function() {
                    try {
                        var t = r(29);
                        return B = t.runOnLoop || t.runOnContext,
                            a()
                    } catch (t) {
                        return c()
                    }
                }() : c();
                var tt = Math.random().toString(36).substring(16),
                    et = void 0,
                    rt = 1,
                    ot = 2,
                    nt = new A,
                    it = new A,
                    st = 0;
                return E.prototype._enumerate = function() {
                        for (var t = this.length, e = this._input, r = 0; this._state === et && r < t; r++)
                            this._eachEntry(e[r], r)
                    },
                    E.prototype._eachEntry = function(t, e) {
                        var r = this._instanceConstructor,
                            o = r.resolve;
                        if (o === p) {
                            var n = y(t);
                            if (n === l && t._state !== et)
                                this._settledAt(t._state, e, t._result);
                            else if ("function" != typeof n)
                                this._remaining--,
                                this._result[e] = t;
                            else if (r === J) {
                                var i = new r(f);
                                b(i, t, n),
                                    this._willSettleAt(i, e)
                            } else
                                this._willSettleAt(new r(function(e) {
                                    return e(t)
                                }), e)
                        } else
                            this._willSettleAt(o(t), e)
                    },
                    E.prototype._settledAt = function(t, e, r) {
                        var o = this.promise;
                        o._state === et && (this._remaining--,
                                t === ot ? x(o, r) : this._result[e] = r),
                            0 === this._remaining && S(o, this._result)
                    },
                    E.prototype._willSettleAt = function(t, e) {
                        var r = this;
                        T(t, void 0, function(t) {
                            return r._settledAt(rt, e, t)
                        }, function(t) {
                            return r._settledAt(ot, e, t)
                        })
                    },
                    J.all = q,
                    J.race = P,
                    J.resolve = p,
                    J.reject = D,
                    J._setScheduler = i,
                    J._setAsap = s,
                    J._asap = K,
                    J.prototype = {
                        constructor: J,
                        then: l,
                        catch: function(t) {
                            return this.then(null, t)
                        }
                    },
                    J.polyfill = $,
                    J.Promise = J,
                    J
            })
        }).call(e, r(4), r(7))
    }, function(t, e) {}, function(t, e, r) {
        "use strict";

        function o(t, e) {
            return /\?/.test(t) ? t += "&" : t += "?",
                t + n(e)
        }
        t.exports = o;
        var n = r(31)
    }, function(t, e, r) {
        "use strict";

        function o(t, e) {
            if (t.map)
                return t.map(e);
            for (var r = [], o = 0; o < t.length; o++)
                r.push(e(t[o], o));
            return r
        }
        var n = function(t) {
            switch (typeof t) {
                case "string":
                    return t;
                case "boolean":
                    return t ? "true" : "false";
                case "number":
                    return isFinite(t) ? t : "";
                default:
                    return ""
            }
        };
        t.exports = function(t, e, r, a) {
            return e = e || "&",
                r = r || "=",
                null === t && (t = void 0),
                "object" == typeof t ? o(s(t), function(s) {
                    var a = encodeURIComponent(n(s)) + r;
                    return i(t[s]) ? o(t[s], function(t) {
                        return a + encodeURIComponent(n(t))
                    }).join(e) : a + encodeURIComponent(n(t[s]))
                }).join(e) : a ? encodeURIComponent(n(a)) + r + encodeURIComponent(n(t)) : ""
        };
        var i = Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            },
            s = Object.keys || function(t) {
                var e = [];
                for (var r in t)
                    Object.prototype.hasOwnProperty.call(t, r) && e.push(r);
                return e
            }
    }, function(t, e, r) {
        "use strict";

        function o(t, e, r) {
            function o() {
                e.debug("JSONP: success"),
                    m || f || (m = !0,
                        p || (e.debug("JSONP: Fail. Script loaded but did not call the callback"),
                            a(),
                            r(new n.JSONPScriptFail)))
            }

            function s() {
                "loaded" !== this.readyState && "complete" !== this.readyState || o()
            }

            function a() {
                clearTimeout(g),
                    d.onload = null,
                    d.onreadystatechange = null,
                    d.onerror = null,
                    h.removeChild(d)
            }

            function c() {
                try {
                    delete window[y],
                        delete window[y + "_loaded"]
                } catch (t) {
                    window[y] = window[y + "_loaded"] = void 0
                }
            }

            function u() {
                e.debug("JSONP: Script timeout"),
                    f = !0,
                    a(),
                    r(new n.RequestTimeout)
            }

            function l() {
                e.debug("JSONP: Script error"),
                    m || f || (a(),
                        r(new n.JSONPScriptError))
            }
            if ("GET" !== e.method)
                return void r(new Error("Method " + e.method + " " + t + " is not supported by JSONP."));
            e.debug("JSONP: start");
            var p = !1,
                f = !1;
            i += 1;
            var h = document.getElementsByTagName("head")[0],
                d = document.createElement("script"),
                y = "algoliaJSONP_" + i,
                m = !1;
            window[y] = function(t) {
                    if (c(),
                        f)
                        return void e.debug("JSONP: Late answer, ignoring");
                    p = !0,
                        a(),
                        r(null, {
                            body: t
                        })
                },
                t += "&callback=" + y,
                e.jsonBody && e.jsonBody.params && (t += "&" + e.jsonBody.params);
            var g = setTimeout(u, e.timeouts.complete);
            d.onreadystatechange = s,
                d.onload = o,
                d.onerror = l,
                d.async = !0,
                d.defer = !0,
                d.src = t,
                h.appendChild(d)
        }
        t.exports = o;
        var n = r(2),
            i = 0
    }, function(t, e, r) {
        function o(t) {
            return function(e, o, i) {
                var s = r(1);
                i = i && s(i) || {},
                    i.hosts = i.hosts || ["places-dsn.algolia.net", "places-1.algolianet.com", "places-2.algolianet.com", "places-3.algolianet.com"],
                    0 !== arguments.length && "object" != typeof e && void 0 !== e || (e = "",
                        o = "",
                        i._allowEmptyCredentials = !0);
                var a = t(e, o, i),
                    c = a.initIndex("places");
                return c.search = n("query", "/1/places/query"),
                    c
            }
        }
        t.exports = o;
        var n = r(9)
    }, function(t, e, r) {
        "use strict";

        function o() {
            var t = window.document.location.protocol;
            return "http:" !== t && "https:" !== t && (t = "http:"),
                t
        }
        t.exports = o
    }, function(t, e, r) {
        "use strict";
        t.exports = "3.22.1"
    }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = r(10),
            n = r(38),
            i = r(37),
            s = i(o.a, n.a, !1, null, null, null);
        e.default = s.exports
    }, function(t, e) {
        t.exports = function(t, e, r, o, n, i) {
            var s, a = t = t || {},
                c = typeof t.default;
            "object" !== c && "function" !== c || (s = t,
                a = t.default);
            var u = "function" == typeof a ? a.options : a;
            e && (u.render = e.render,
                    u.staticRenderFns = e.staticRenderFns,
                    u._compiled = !0),
                r && (u.functional = !0),
                n && (u._scopeId = n);
            var l;
            if (i ? (l = function(t) {
                        t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext,
                            t || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__),
                            o && o.call(this, t),
                            t && t._registeredComponents && t._registeredComponents.add(i)
                    },
                    u._ssrRegister = l) : o && (l = o),
                l) {
                var p = u.functional,
                    f = p ? u.render : u.beforeCreate;
                p ? (u._injectStyles = l,
                    u.render = function(t, e) {
                        return l.call(e),
                            f(t, e)
                    }
                ) : u.beforeCreate = f ? [].concat(f, l) : [l]
            }
            return {
                esModule: s,
                exports: a,
                options: u
            }
        }
    }, function(t, e, r) {
        "use strict";
        var o = function() {
                var t = this,
                    e = t.$createElement,
                    r = t._self._c || e;
                return t.showLogo ? r("div", {
                    staticClass: "dosearch-logo inner-x"
                }, [t._m(0)]) : t._e()
            },
            n = [function() {
                var t = this,
                    e = t.$createElement,
                    r = t._self._c || e;
                return r("a", {
                    attrs: {
                        href: "https://www.algolia.com/docsearch",
                        target: "_blank"
                    }
                }, [r("img", {
                    attrs: {
                        src: "https://www.algolia.com/static_assets/images/press/downloads/search-by-algolia.svg",
                        alt: "algolia",
                        width: "100"
                    }
                })])
            }],
            i = {
                render: o,
                staticRenderFns: n
            };
        e.a = i
    }])
});
//# sourceMappingURL=docsearch.js.map