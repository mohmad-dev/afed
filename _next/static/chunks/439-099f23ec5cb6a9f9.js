"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [439],
  {
    77711: (t, e, i) => {
      i.d(e, { default: () => n.a });
      var r = i(21956),
        n = i.n(r);
    },
    21956: (t, e, i) => {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        Object.defineProperty(e, "default", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
      let r = i(60306)._(i(30580));
      function n(t, e) {
        var i;
        let n = {};
        "function" == typeof t && (n.loader = t);
        let s = { ...n, ...e };
        return (0, r.default)({
          ...s,
          modules: null == (i = s.loadableGenerated) ? void 0 : i.modules,
        });
      }
      ("function" == typeof e.default ||
        ("object" == typeof e.default && null !== e.default)) &&
        void 0 === e.default.__esModule &&
        (Object.defineProperty(e.default, "__esModule", { value: !0 }),
        Object.assign(e.default, e),
        (t.exports = e.default));
    },
    39827: (t, e, i) => {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        Object.defineProperty(e, "BailoutToCSR", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
      let r = i(93719);
      function n(t) {
        let { reason: e, children: i } = t;
        if ("undefined" == typeof window) throw new r.BailoutToCSRError(e);
        return i;
      }
    },
    30580: (t, e, i) => {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        Object.defineProperty(e, "default", {
          enumerable: !0,
          get: function () {
            return u;
          },
        });
      let r = i(95155),
        n = i(12115),
        s = i(39827),
        o = i(79214);
      function a(t) {
        return { default: t && "default" in t ? t.default : t };
      }
      let l = {
          loader: () => Promise.resolve(a(() => null)),
          loading: null,
          ssr: !0,
        },
        u = function (t) {
          let e = { ...l, ...t },
            i = (0, n.lazy)(() => e.loader().then(a)),
            u = e.loading;
          function h(t) {
            let a = u
                ? (0, r.jsx)(u, { isLoading: !0, pastDelay: !0, error: null })
                : null,
              l = !e.ssr || !!e.loading,
              h = l ? n.Suspense : n.Fragment,
              c = e.ssr
                ? (0, r.jsxs)(r.Fragment, {
                    children: [
                      "undefined" == typeof window
                        ? (0, r.jsx)(o.PreloadChunks, { moduleIds: e.modules })
                        : null,
                      (0, r.jsx)(i, { ...t }),
                    ],
                  })
                : (0, r.jsx)(s.BailoutToCSR, {
                    reason: "next/dynamic",
                    children: (0, r.jsx)(i, { ...t }),
                  });
            return (0, r.jsx)(h, {
              ...(l ? { fallback: a } : {}),
              children: c,
            });
          }
          return (h.displayName = "LoadableComponent"), h;
        };
    },
    79214: (t, e, i) => {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        Object.defineProperty(e, "PreloadChunks", {
          enumerable: !0,
          get: function () {
            return a;
          },
        });
      let r = i(95155),
        n = i(47650),
        s = i(75861),
        o = i(18284);
      function a(t) {
        let { moduleIds: e } = t;
        if ("undefined" != typeof window) return null;
        let i = s.workAsyncStorage.getStore();
        if (void 0 === i) return null;
        let a = [];
        if (i.reactLoadableManifest && e) {
          let t = i.reactLoadableManifest;
          for (let i of e) {
            if (!t[i]) continue;
            let e = t[i].files;
            a.push(...e);
          }
        }
        return 0 === a.length
          ? null
          : (0, r.jsx)(r.Fragment, {
              children: a.map((t) => {
                let e = i.assetPrefix + "/_next/" + (0, o.encodeURIPath)(t);
                return t.endsWith(".css")
                  ? (0, r.jsx)(
                      "link",
                      {
                        precedence: "dynamic",
                        href: e,
                        rel: "stylesheet",
                        as: "style",
                      },
                      t
                    )
                  : ((0, n.preload)(e, { as: "script", fetchPriority: "low" }),
                    null);
              }),
            });
      }
    },
    69554: (t, e, i) => {
      i.d(e, { o: () => c });
      var r = i(14302),
        n = i(24569),
        s = i(65749),
        o = i(16611);
      function a(t, e) {
        return t * Math.sqrt(1 - e * e);
      }
      let l = ["duration", "bounce"],
        u = ["stiffness", "damping", "mass"];
      function h(t, e) {
        return e.some((e) => void 0 !== t[e]);
      }
      function c({ keyframes: t, restDelta: e, restSpeed: i, ...c }) {
        let d;
        let p = t[0],
          f = t[t.length - 1],
          m = { done: !1, value: p },
          {
            stiffness: v,
            damping: g,
            mass: y,
            duration: w,
            velocity: b,
            isResolvedFromDuration: S,
          } = (function (t) {
            let e = {
              velocity: 0,
              stiffness: 100,
              damping: 10,
              mass: 1,
              isResolvedFromDuration: !1,
              ...t,
            };
            if (!h(t, u) && h(t, l)) {
              let i = (function ({
                duration: t = 800,
                bounce: e = 0.25,
                velocity: i = 0,
                mass: n = 1,
              }) {
                let l, u;
                (0, s.$)(
                  t <= (0, r.f)(10),
                  "Spring duration must be 10 seconds or less"
                );
                let h = 1 - e;
                (h = (0, o.q)(0.05, 1, h)),
                  (t = (0, o.q)(0.01, 10, (0, r.X)(t))),
                  h < 1
                    ? ((l = (e) => {
                        let r = e * h,
                          n = r * t;
                        return 0.001 - ((r - i) / a(e, h)) * Math.exp(-n);
                      }),
                      (u = (e) => {
                        let r = e * h * t,
                          n = Math.pow(h, 2) * Math.pow(e, 2) * t,
                          s = Math.exp(-r),
                          o = a(Math.pow(e, 2), h);
                        return (
                          ((r * i + i - n) * s * (-l(e) + 0.001 > 0 ? -1 : 1)) /
                          o
                        );
                      }))
                    : ((l = (e) =>
                        -0.001 + Math.exp(-e * t) * ((e - i) * t + 1)),
                      (u = (e) => t * t * (i - e) * Math.exp(-e * t)));
                let c = (function (t, e, i) {
                  let r = i;
                  for (let i = 1; i < 12; i++) r -= t(r) / e(r);
                  return r;
                })(l, u, 5 / t);
                if (((t = (0, r.f)(t)), isNaN(c)))
                  return { stiffness: 100, damping: 10, duration: t };
                {
                  let e = Math.pow(c, 2) * n;
                  return {
                    stiffness: e,
                    damping: 2 * h * Math.sqrt(n * e),
                    duration: t,
                  };
                }
              })(t);
              (e = { ...e, ...i, mass: 1 }).isResolvedFromDuration = !0;
            }
            return e;
          })({ ...c, velocity: -(0, r.X)(c.velocity || 0) }),
          x = b || 0,
          V = g / (2 * Math.sqrt(v * y)),
          A = f - p,
          P = (0, r.X)(Math.sqrt(v / y)),
          C = 5 > Math.abs(A);
        if ((i || (i = C ? 0.01 : 2), e || (e = C ? 0.005 : 0.5), V < 1)) {
          let t = a(P, V);
          d = (e) =>
            f -
            Math.exp(-V * P * e) *
              (((x + V * P * A) / t) * Math.sin(t * e) + A * Math.cos(t * e));
        } else if (1 === V)
          d = (t) => f - Math.exp(-P * t) * (A + (x + P * A) * t);
        else {
          let t = P * Math.sqrt(V * V - 1);
          d = (e) => {
            let i = Math.exp(-V * P * e),
              r = Math.min(t * e, 300);
            return (
              f -
              (i * ((x + V * P * A) * Math.sinh(r) + t * A * Math.cosh(r))) / t
            );
          };
        }
        return {
          calculatedDuration: (S && w) || null,
          next: (t) => {
            let r = d(t);
            if (S) m.done = t >= w;
            else {
              let s = x;
              0 !== t && (s = V < 1 ? (0, n.Y)(d, t, r) : 0);
              let o = Math.abs(s) <= i,
                a = Math.abs(f - r) <= e;
              m.done = o && a;
            }
            return (m.value = m.done ? f : r), m;
          },
        };
      }
    },
    63914: (t, e, i) => {
      i.d(e, { Y: () => r, t: () => n });
      let r = 2e4;
      function n(t) {
        let e = 0,
          i = t.next(e);
        for (; !i.done && e < r; ) (e += 50), (i = t.next(e));
        return e >= r ? 1 / 0 : e;
      }
    },
    24569: (t, e, i) => {
      i.d(e, { Y: () => n });
      var r = i(42206);
      function n(t, e, i) {
        let n = Math.max(e - 5, 0);
        return (0, r.f)(i - t(n), e - n);
      }
    },
    46117: (t, e, i) => {
      i.d(e, { f: () => I });
      var r = i(65749),
        n = i(14302);
      let s = { current: !1 },
        o = (t) => Array.isArray(t) && "number" == typeof t[0],
        a = ([t, e, i, r]) => `cubic-bezier(${t}, ${e}, ${i}, ${r})`,
        l = {
          linear: "linear",
          ease: "ease",
          easeIn: "ease-in",
          easeOut: "ease-out",
          easeInOut: "ease-in-out",
          circIn: a([0, 0.65, 0.55, 1]),
          circOut: a([0.55, 0, 1, 0.45]),
          backIn: a([0.31, 0.01, 0.66, -0.59]),
          backOut: a([0.33, 1.53, 0.69, 0.99]),
        };
      var u = i(10972),
        h = i(17492),
        c = i(63127),
        d = i(49600),
        p = i(53636);
      function f({
        duration: t = 300,
        keyframes: e,
        times: i,
        ease: r = "easeInOut",
      }) {
        let n = (0, h.h)(r) ? r.map(c.K) : (0, c.K)(r),
          s = { done: !1, value: e[0] },
          o = (i && i.length === e.length ? i : (0, p.Z)(e)).map((e) => e * t),
          a = (0, d.G)(o, e, {
            ease: Array.isArray(n)
              ? n
              : e.map(() => n || u.am).splice(0, e.length - 1),
          });
        return {
          calculatedDuration: t,
          next: (e) => ((s.value = a(e)), (s.done = e >= t), s),
        };
      }
      var m = i(69554),
        v = i(24569);
      function g({
        keyframes: t,
        velocity: e = 0,
        power: i = 0.8,
        timeConstant: r = 325,
        bounceDamping: n = 10,
        bounceStiffness: s = 500,
        modifyTarget: o,
        min: a,
        max: l,
        restDelta: u = 0.5,
        restSpeed: h,
      }) {
        let c, d;
        let p = t[0],
          f = { done: !1, value: p },
          g = (t) => (void 0 !== a && t < a) || (void 0 !== l && t > l),
          y = (t) =>
            void 0 === a
              ? l
              : void 0 === l
              ? a
              : Math.abs(a - t) < Math.abs(l - t)
              ? a
              : l,
          w = i * e,
          b = p + w,
          S = void 0 === o ? b : o(b);
        S !== b && (w = S - p);
        let x = (t) => -w * Math.exp(-t / r),
          V = (t) => S + x(t),
          A = (t) => {
            let e = x(t),
              i = V(t);
            (f.done = Math.abs(e) <= u), (f.value = f.done ? S : i);
          },
          P = (t) => {
            g(f.value) &&
              ((c = t),
              (d = (0, m.o)({
                keyframes: [f.value, y(f.value)],
                velocity: (0, v.Y)(V, t, f.value),
                damping: n,
                stiffness: s,
                restDelta: u,
                restSpeed: h,
              })));
          };
        return (
          P(0),
          {
            calculatedDuration: null,
            next: (t) => {
              let e = !1;
              return (d || void 0 !== c || ((e = !0), A(t), P(t)),
              void 0 !== c && t > c)
                ? d.next(t - c)
                : (e || A(t), f);
            },
          }
        );
      }
      var y = i(78086);
      let w = (t) => {
        let e = ({ timestamp: e }) => t(e);
        return {
          start: () => y.Gt.update(e, !0),
          stop: () => (0, y.WG)(e),
          now: () => (y.uv.isProcessing ? y.uv.timestamp : performance.now()),
        };
      };
      var b = i(16611),
        S = i(63914);
      let x = { decay: g, inertia: g, tween: f, keyframes: f, spring: m.o };
      function V({
        autoplay: t = !0,
        delay: e = 0,
        driver: i = w,
        keyframes: r,
        type: s = "keyframes",
        repeat: o = 0,
        repeatDelay: a = 0,
        repeatType: l = "loop",
        onPlay: u,
        onStop: h,
        onComplete: c,
        onUpdate: p,
        ...m
      }) {
        let v,
          g,
          y,
          V,
          A,
          P = 1,
          C = !1,
          E = () => {
            g = new Promise((t) => {
              v = t;
            });
          };
        E();
        let M = x[s] || f;
        M !== f &&
          "number" != typeof r[0] &&
          ((V = (0, d.G)([0, 100], r, { clamp: !1 })), (r = [0, 100]));
        let k = M({ ...m, keyframes: r });
        "mirror" === l &&
          (A = M({
            ...m,
            keyframes: [...r].reverse(),
            velocity: -(m.velocity || 0),
          }));
        let T = "idle",
          O = null,
          F = null,
          j = null;
        null === k.calculatedDuration &&
          o &&
          (k.calculatedDuration = (0, S.t)(k));
        let { calculatedDuration: L } = k,
          R = 1 / 0,
          N = 1 / 0;
        null !== L && (N = (R = L + a) * (o + 1) - a);
        let z = 0,
          W = (t) => {
            if (null === F) return;
            P > 0 && (F = Math.min(F, t)),
              P < 0 && (F = Math.min(t - N / P, F));
            let i =
                (z = null !== O ? O : Math.round(t - F) * P) -
                e * (P >= 0 ? 1 : -1),
              n = P >= 0 ? i < 0 : i > N;
            (z = Math.max(i, 0)), "finished" === T && null === O && (z = N);
            let s = z,
              u = k;
            if (o) {
              let t = Math.min(z, N) / R,
                e = Math.floor(t),
                i = t % 1;
              !i && t >= 1 && (i = 1),
                1 === i && e--,
                (e = Math.min(e, o + 1)) % 2 &&
                  ("reverse" === l
                    ? ((i = 1 - i), a && (i -= a / R))
                    : "mirror" === l && (u = A)),
                (s = (0, b.q)(0, 1, i) * R);
            }
            let h = n ? { done: !1, value: r[0] } : u.next(s);
            V && (h.value = V(h.value));
            let { done: c } = h;
            n || null === L || (c = P >= 0 ? z >= N : z <= 0);
            let d = null === O && ("finished" === T || ("running" === T && c));
            return p && p(h.value), d && I(), h;
          },
          D = () => {
            y && y.stop(), (y = void 0);
          },
          B = () => {
            (T = "idle"), D(), v(), E(), (F = j = null);
          },
          I = () => {
            (T = "finished"), c && c(), D(), v();
          },
          _ = () => {
            if (C) return;
            y || (y = i(W));
            let t = y.now();
            u && u(),
              null !== O ? (F = t - O) : (F && "finished" !== T) || (F = t),
              "finished" === T && E(),
              (j = F),
              (O = null),
              (T = "running"),
              y.start();
          };
        t && _();
        let $ = {
          then: (t, e) => g.then(t, e),
          get time() {
            return (0, n.X)(z);
          },
          set time(newTime) {
            (z = newTime = (0, n.f)(newTime)),
              null === O && y && 0 !== P
                ? (F = y.now() - newTime / P)
                : (O = newTime);
          },
          get duration() {
            let t =
              null === k.calculatedDuration
                ? (0, S.t)(k)
                : k.calculatedDuration;
            return (0, n.X)(t);
          },
          get speed() {
            return P;
          },
          set speed(newSpeed) {
            if (newSpeed === P || !y) return;
            (P = newSpeed), ($.time = (0, n.X)(z));
          },
          get state() {
            return T;
          },
          play: _,
          pause: () => {
            (T = "paused"), (O = z);
          },
          stop: () => {
            (C = !0), "idle" !== T && ((T = "idle"), h && h(), B());
          },
          cancel: () => {
            null !== j && W(j), B();
          },
          complete: () => {
            T = "finished";
          },
          sample: (t) => ((F = 0), W(t)),
        };
        return $;
      }
      var A = i(52398),
        P = i(38792);
      let C = (0, A.p)(() =>
          Object.hasOwnProperty.call(Element.prototype, "animate")
        ),
        E = new Set([
          "opacity",
          "clipPath",
          "filter",
          "transform",
          "backgroundColor",
        ]),
        M = (t, e) =>
          "spring" === e.type ||
          "backgroundColor" === t ||
          !(function t(e) {
            return !!(
              !e ||
              ("string" == typeof e && l[e]) ||
              o(e) ||
              (Array.isArray(e) && e.every(t))
            );
          })(e.ease);
      var k = i(31371);
      let T = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
        O = (t) => ({
          type: "spring",
          stiffness: 550,
          damping: 0 === t ? 2 * Math.sqrt(550) : 30,
          restSpeed: 10,
        }),
        F = { type: "keyframes", duration: 0.8 },
        j = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
        L = (t, { keyframes: e }) =>
          e.length > 2
            ? F
            : k.f.has(t)
            ? t.startsWith("scale")
              ? O(e[1])
              : T
            : j;
      var R = i(99605);
      let N = (t, e) =>
        "zIndex" !== t &&
        !!(
          "number" == typeof e ||
          Array.isArray(e) ||
          ("string" == typeof e &&
            (R.f.test(e) || "0" === e) &&
            !e.startsWith("url("))
        );
      var z = i(1435),
        W = i(66879),
        D = i(77049);
      let B = { skipAnimations: !1 },
        I =
          (t, e, i, u = {}) =>
          (h) => {
            let c = (0, D.r)(u, t) || {},
              d = c.delay || u.delay || 0,
              { elapsed: p = 0 } = u;
            p -= (0, n.f)(d);
            let f = (function (t, e, i, r) {
                let n, s;
                let o = N(e, i);
                n = Array.isArray(i) ? [...i] : [null, i];
                let a = void 0 !== r.from ? r.from : t.get(),
                  l = [];
                for (let t = 0; t < n.length; t++) {
                  var u;
                  null === n[t] && (n[t] = 0 === t ? a : n[t - 1]),
                    ("number" == typeof (u = n[t])
                      ? 0 === u
                      : null !== u
                      ? "none" === u || "0" === u || (0, W.$)(u)
                      : void 0) && l.push(t),
                    "string" == typeof n[t] &&
                      "none" !== n[t] &&
                      "0" !== n[t] &&
                      (s = n[t]);
                }
                if (o && l.length && s)
                  for (let t = 0; t < l.length; t++) n[l[t]] = (0, z.J)(e, s);
                return n;
              })(e, t, i, c),
              m = f[0],
              v = f[f.length - 1],
              g = N(t, m),
              w = N(t, v);
            (0, r.$)(
              g === w,
              `You are trying to animate ${t} from "${m}" to "${v}". ${m} is not an animatable value - to enable this animation set ${m} to a value animatable to ${v} via the \`style\` property.`
            );
            let b = {
              keyframes: f,
              velocity: e.getVelocity(),
              ease: "easeOut",
              ...c,
              delay: -p,
              onUpdate: (t) => {
                e.set(t), c.onUpdate && c.onUpdate(t);
              },
              onComplete: () => {
                h(), c.onComplete && c.onComplete();
              },
            };
            if (
              ((0, D.D)(c) || (b = { ...b, ...L(t, b) }),
              b.duration && (b.duration = (0, n.f)(b.duration)),
              b.repeatDelay && (b.repeatDelay = (0, n.f)(b.repeatDelay)),
              !g || !w || s.current || !1 === c.type || B.skipAnimations)
            )
              return (function ({
                keyframes: t,
                delay: e,
                onUpdate: i,
                onComplete: r,
              }) {
                let n = () => (
                  i && i(t[t.length - 1]),
                  r && r(),
                  {
                    time: 0,
                    speed: 1,
                    duration: 0,
                    play: P.l,
                    pause: P.l,
                    stop: P.l,
                    then: (t) => (t(), Promise.resolve()),
                    cancel: P.l,
                    complete: P.l,
                  }
                );
                return e
                  ? V({
                      keyframes: [0, 1],
                      duration: 0,
                      delay: e,
                      onComplete: n,
                    })
                  : n();
              })(s.current ? { ...b, delay: 0 } : b);
            if (
              !u.isHandoff &&
              e.owner &&
              e.owner.current instanceof HTMLElement &&
              !e.owner.getProps().onUpdate
            ) {
              let i = (function (t, e, { onUpdate: i, onComplete: r, ...s }) {
                let u, h;
                if (
                  !(
                    C() &&
                    E.has(e) &&
                    !s.repeatDelay &&
                    "mirror" !== s.repeatType &&
                    0 !== s.damping &&
                    "inertia" !== s.type
                  )
                )
                  return !1;
                let c = !1,
                  d = !1,
                  p = () => {
                    h = new Promise((t) => {
                      u = t;
                    });
                  };
                p();
                let { keyframes: f, duration: m = 300, ease: v, times: g } = s;
                if (M(e, s)) {
                  let t = V({ ...s, repeat: 0, delay: 0 }),
                    e = { done: !1, value: f[0] },
                    i = [],
                    r = 0;
                  for (; !e.done && r < 2e4; )
                    (e = t.sample(r)), i.push(e.value), (r += 10);
                  (g = void 0), (f = i), (m = r - 10), (v = "linear");
                }
                let w = (function (
                    t,
                    e,
                    i,
                    {
                      delay: r = 0,
                      duration: n,
                      repeat: s = 0,
                      repeatType: u = "loop",
                      ease: h,
                      times: c,
                    } = {}
                  ) {
                    let d = { [e]: i };
                    c && (d.offset = c);
                    let p = (function t(e) {
                      if (e)
                        return o(e) ? a(e) : Array.isArray(e) ? e.map(t) : l[e];
                    })(h);
                    return (
                      Array.isArray(p) && (d.easing = p),
                      t.animate(d, {
                        delay: r,
                        duration: n,
                        easing: Array.isArray(p) ? "linear" : p,
                        fill: "both",
                        iterations: s + 1,
                        direction: "reverse" === u ? "alternate" : "normal",
                      })
                    );
                  })(t.owner.current, e, f, {
                    ...s,
                    duration: m,
                    ease: v,
                    times: g,
                  }),
                  b = () => {
                    (d = !1), w.cancel();
                  },
                  S = () => {
                    (d = !0), y.Gt.update(b), u(), p();
                  };
                return (
                  (w.onfinish = () => {
                    d ||
                      (t.set(
                        (function (t, { repeat: e, repeatType: i = "loop" }) {
                          let r =
                            e && "loop" !== i && e % 2 == 1 ? 0 : t.length - 1;
                          return t[r];
                        })(f, s)
                      ),
                      r && r(),
                      S());
                  }),
                  {
                    then: (t, e) => h.then(t, e),
                    attachTimeline: (t) => (
                      (w.timeline = t), (w.onfinish = null), P.l
                    ),
                    get time() {
                      return (0, n.X)(w.currentTime || 0);
                    },
                    set time(newTime) {
                      w.currentTime = (0, n.f)(newTime);
                    },
                    get speed() {
                      return w.playbackRate;
                    },
                    set speed(newSpeed) {
                      w.playbackRate = newSpeed;
                    },
                    get duration() {
                      return (0, n.X)(m);
                    },
                    play: () => {
                      c || (w.play(), (0, y.WG)(b));
                    },
                    pause: () => w.pause(),
                    stop: () => {
                      if (((c = !0), "idle" === w.playState)) return;
                      let { currentTime: e } = w;
                      if (e) {
                        let i = V({ ...s, autoplay: !1 });
                        t.setWithVelocity(
                          i.sample(e - 10).value,
                          i.sample(e).value,
                          10
                        );
                      }
                      S();
                    },
                    complete: () => {
                      d || w.finish();
                    },
                    cancel: S,
                  }
                );
              })(e, t, b);
              if (i) return i;
            }
            return V(b);
          };
    },
    53837: (t, e, i) => {
      i.d(e, { $: () => h });
      var r = i(31371),
        n = i(17539),
        s = i(46117),
        o = i(55114),
        a = i(2987),
        l = i(77049),
        u = i(78086);
      function h(t, e, { delay: i = 0, transitionOverride: c, type: d } = {}) {
        let {
            transition: p = t.getDefaultTransition(),
            transitionEnd: f,
            ...m
          } = t.makeTargetAnimatable(e),
          v = t.getValue("willChange");
        c && (p = c);
        let g = [],
          y = d && t.animationState && t.animationState.getState()[d];
        for (let e in m) {
          let a = t.getValue(e),
            h = m[e];
          if (
            !a ||
            void 0 === h ||
            (y &&
              (function ({ protectedKeys: t, needsAnimating: e }, i) {
                let r = t.hasOwnProperty(i) && !0 !== e[i];
                return (e[i] = !1), r;
              })(y, e))
          )
            continue;
          let c = { delay: i, elapsed: 0, ...(0, l.r)(p || {}, e) };
          if (window.HandoffAppearAnimations) {
            let i = t.getProps()[n.n];
            if (i) {
              let t = window.HandoffAppearAnimations(i, e, a, u.Gt);
              null !== t && ((c.elapsed = t), (c.isHandoff = !0));
            }
          }
          let d =
            !c.isHandoff &&
            !(function (t, e) {
              let i = t.get();
              if (!Array.isArray(e)) return i !== e;
              for (let t = 0; t < e.length; t++) if (e[t] !== i) return !0;
            })(a, h);
          if (
            ("spring" === c.type && (a.getVelocity() || c.velocity) && (d = !1),
            a.animation && (d = !1),
            d)
          )
            continue;
          a.start(
            (0, s.f)(
              e,
              a,
              h,
              t.shouldReduceMotion && r.f.has(e) ? { type: !1 } : c
            )
          );
          let f = a.animation;
          (0, o.k)(v) && (v.add(e), f.then(() => v.remove(e))), g.push(f);
        }
        return (
          f &&
            Promise.all(g).then(() => {
              f && (0, a.Uo)(t, f);
            }),
          g
        );
      }
    },
    17539: (t, e, i) => {
      i.d(e, { n: () => r });
      let r = "data-" + (0, i(42717).I)("framerAppearId");
    },
    5385: (t, e, i) => {
      i.d(e, { N: () => r });
      function r(t) {
        return (
          null !== t && "object" == typeof t && "function" == typeof t.start
        );
      }
    },
    82043: (t, e, i) => {
      i.d(e, { p: () => r });
      let r = (t) => Array.isArray(t);
    },
    77049: (t, e, i) => {
      function r({
        when: t,
        delay: e,
        delayChildren: i,
        staggerChildren: r,
        staggerDirection: n,
        repeat: s,
        repeatType: o,
        repeatDelay: a,
        from: l,
        elapsed: u,
        ...h
      }) {
        return !!Object.keys(h).length;
      }
      function n(t, e) {
        return t[e] || t.default || t;
      }
      i.d(e, { D: () => r, r: () => n });
    },
    76498: (t, e, i) => {
      i.d(e, { F: () => o });
      var r = i(12115),
        n = i(75815),
        s = i(94705);
      function o({ children: t, features: e, strict: i = !1 }) {
        let [, o] = (0, r.useState)(!a(e)),
          l = (0, r.useRef)(void 0);
        if (!a(e)) {
          let { renderer: t, ...i } = e;
          (l.current = t), (0, s.Y)(i);
        }
        return (
          (0, r.useEffect)(() => {
            a(e) &&
              e().then(({ renderer: t, ...e }) => {
                (0, s.Y)(e), (l.current = t), o(!0);
              });
          }, []),
          r.createElement(
            n.Y.Provider,
            { value: { renderer: l.current, strict: i } },
            t
          )
        );
      }
      function a(t) {
        return "function" == typeof t;
      }
    },
    64710: (t, e, i) => {
      i.d(e, { L: () => r });
      let r = (0, i(12115).createContext)({});
    },
    75815: (t, e, i) => {
      i.d(e, { Y: () => r });
      let r = (0, i(12115).createContext)({ strict: !1 });
    },
    27249: (t, e, i) => {
      i.d(e, { Q: () => r });
      let r = (0, i(12115).createContext)({
        transformPagePoint: (t) => t,
        isStatic: !1,
        reducedMotion: "never",
      });
    },
    34358: (t, e, i) => {
      i.d(e, { A: () => r });
      let r = (0, i(12115).createContext)({});
    },
    39656: (t, e, i) => {
      i.d(e, { t: () => r });
      let r = (0, i(12115).createContext)(null);
    },
    15750: (t, e, i) => {
      i.d(e, { N: () => r });
      let r = (0, i(12115).createContext)({});
    },
    26575: (t, e, i) => {
      i.d(e, { po: () => s, tn: () => a, yT: () => o });
      var r = i(35290),
        n = i(94641);
      let s = (t) => 1 - Math.sin(Math.acos(t)),
        o = (0, n.G)(s),
        a = (0, r.V)(s);
    },
    2616: (t, e, i) => {
      i.d(e, { A: () => s });
      var r = i(38792);
      let n = (t, e, i) =>
        (((1 - 3 * i + 3 * e) * t + (3 * i - 6 * e)) * t + 3 * e) * t;
      function s(t, e, i, s) {
        if (t === e && i === s) return r.l;
        let o = (e) =>
          (function (t, e, i, r, s) {
            let o, a;
            let l = 0;
            do (o = n((a = e + (i - e) / 2), r, s) - t) > 0 ? (i = a) : (e = a);
            while (Math.abs(o) > 1e-7 && ++l < 12);
            return a;
          })(e, 0, 1, t, i);
        return (t) => (0 === t || 1 === t ? t : n(o(t), e, s));
      }
    },
    10972: (t, e, i) => {
      i.d(e, { a6: () => n, am: () => o, vT: () => s });
      var r = i(2616);
      let n = (0, r.A)(0.42, 0, 1, 1),
        s = (0, r.A)(0, 0, 0.58, 1),
        o = (0, r.A)(0.42, 0, 0.58, 1);
    },
    35290: (t, e, i) => {
      i.d(e, { V: () => r });
      let r = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2;
    },
    94641: (t, e, i) => {
      i.d(e, { G: () => r });
      let r = (t) => (e) => 1 - t(1 - e);
    },
    17492: (t, e, i) => {
      i.d(e, { h: () => r });
      let r = (t) => Array.isArray(t) && "number" != typeof t[0];
    },
    63127: (t, e, i) => {
      i.d(e, { K: () => f });
      var r = i(65749),
        n = i(2616),
        s = i(38792),
        o = i(10972),
        a = i(26575),
        l = i(35290),
        u = i(94641);
      let h = (0, n.A)(0.33, 1.53, 0.69, 0.99),
        c = (0, u.G)(h),
        d = (0, l.V)(c),
        p = {
          linear: s.l,
          easeIn: o.a6,
          easeInOut: o.am,
          easeOut: o.vT,
          circIn: a.po,
          circInOut: a.tn,
          circOut: a.yT,
          backIn: c,
          backInOut: d,
          backOut: h,
          anticipate: (t) =>
            (t *= 2) < 1 ? 0.5 * c(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))),
        },
        f = (t) => {
          if (Array.isArray(t)) {
            (0, r.V)(
              4 === t.length,
              "Cubic bezier arrays must contain four numerical values."
            );
            let [e, i, s, o] = t;
            return (0, n.A)(e, i, s, o);
          }
          return "string" == typeof t
            ? ((0, r.V)(void 0 !== p[t], `Invalid easing type '${t}'`), p[t])
            : t;
        };
    },
    85677: (t, e, i) => {
      i.d(e, { k: () => r });
      function r(t, e, i, n = { passive: !0 }) {
        return t.addEventListener(e, i, n), () => t.removeEventListener(e, i);
      }
    },
    21594: (t, e, i) => {
      i.d(e, { h: () => s });
      var r = i(85677),
        n = i(66203);
      function s(t, e, i, s) {
        return (0, r.k)(t, e, (0, n.F)(i), s);
      }
    },
    66203: (t, e, i) => {
      i.d(e, { F: () => s, e: () => n });
      var r = i(61789);
      function n(t, e = "page") {
        return { point: { x: t[e + "X"], y: t[e + "Y"] } };
      }
      let s = (t) => (e) => (0, r.M)(e) && t(e, n(e));
    },
    61789: (t, e, i) => {
      i.d(e, { M: () => r });
      let r = (t) =>
        "mouse" === t.pointerType
          ? "number" != typeof t.button || t.button <= 0
          : !1 !== t.isPrimary;
    },
    78086: (t, e, i) => {
      i.d(e, { WG: () => a, Gt: () => o, uv: () => l, Ci: () => u });
      var r = i(38792);
      class n {
        constructor() {
          (this.order = []), (this.scheduled = new Set());
        }
        add(t) {
          if (!this.scheduled.has(t))
            return this.scheduled.add(t), this.order.push(t), !0;
        }
        remove(t) {
          let e = this.order.indexOf(t);
          -1 !== e && (this.order.splice(e, 1), this.scheduled.delete(t));
        }
        clear() {
          (this.order.length = 0), this.scheduled.clear();
        }
      }
      let s = [
          "prepare",
          "read",
          "update",
          "preRender",
          "render",
          "postRender",
        ],
        {
          schedule: o,
          cancel: a,
          state: l,
          steps: u,
        } = (function (t, e) {
          let i = !1,
            r = !0,
            o = { delta: 0, timestamp: 0, isProcessing: !1 },
            a = s.reduce(
              (t, e) => (
                (t[e] = (function (t) {
                  let e = new n(),
                    i = new n(),
                    r = 0,
                    s = !1,
                    o = !1,
                    a = new WeakSet(),
                    l = {
                      schedule: (t, n = !1, o = !1) => {
                        let l = o && s,
                          u = l ? e : i;
                        return (
                          n && a.add(t),
                          u.add(t) && l && s && (r = e.order.length),
                          t
                        );
                      },
                      cancel: (t) => {
                        i.remove(t), a.delete(t);
                      },
                      process: (n) => {
                        if (s) {
                          o = !0;
                          return;
                        }
                        if (
                          ((s = !0),
                          ([e, i] = [i, e]),
                          i.clear(),
                          (r = e.order.length))
                        )
                          for (let i = 0; i < r; i++) {
                            let r = e.order[i];
                            r(n), a.has(r) && (l.schedule(r), t());
                          }
                        (s = !1), o && ((o = !1), l.process(n));
                      },
                    };
                  return l;
                })(() => (i = !0))),
                t
              ),
              {}
            ),
            l = (t) => a[t].process(o),
            u = () => {
              let n = performance.now();
              (i = !1),
                (o.delta = r
                  ? 1e3 / 60
                  : Math.max(Math.min(n - o.timestamp, 40), 1)),
                (o.timestamp = n),
                (o.isProcessing = !0),
                s.forEach(l),
                (o.isProcessing = !1),
                i && e && ((r = !1), t(u));
            },
            h = () => {
              (i = !0), (r = !0), o.isProcessing || t(u);
            };
          return {
            schedule: s.reduce((t, e) => {
              let r = a[e];
              return (
                (t[e] = (t, e = !1, n = !1) => (i || h(), r.schedule(t, e, n))),
                t
              );
            }, {}),
            cancel: (t) => s.forEach((e) => a[e].cancel(t)),
            state: o,
            steps: a,
          };
        })(
          "undefined" != typeof requestAnimationFrame
            ? requestAnimationFrame
            : r.l,
          !0
        );
    },
    42561: (t, e, i) => {
      function r(t) {
        let e = null;
        return () =>
          null === e &&
          ((e = t),
          () => {
            e = null;
          });
      }
      i.d(e, { D3: () => a, nQ: () => o });
      let n = r("dragHorizontal"),
        s = r("dragVertical");
      function o(t) {
        let e = !1;
        if ("y" === t) e = s();
        else if ("x" === t) e = n();
        else {
          let t = n(),
            i = s();
          t && i
            ? (e = () => {
                t(), i();
              })
            : (t && t(), i && i());
        }
        return e;
      }
      function a() {
        let t = o(!0);
        return !t || (t(), !1);
      }
    },
    35971: (t, e, i) => {
      i.d(e, { X: () => r });
      class r {
        constructor(t) {
          (this.isMounted = !1), (this.node = t);
        }
        update() {}
      }
    },
    29200: (t, e, i) => {
      i.d(e, { W: () => w });
      var r = i(5385),
        n = i(82043);
      function s(t, e) {
        if (!Array.isArray(e)) return !1;
        let i = e.length;
        if (i !== t.length) return !1;
        for (let r = 0; r < i; r++) if (e[r] !== t[r]) return !1;
        return !0;
      }
      var o = i(62896),
        a = i(95134),
        l = i(34543),
        u = i(53837);
      function h(t, e, i = {}) {
        let r = (0, a.K)(t, e, i.custom),
          { transition: n = t.getDefaultTransition() || {} } = r || {};
        i.transitionOverride && (n = i.transitionOverride);
        let s = r
            ? () => Promise.all((0, u.$)(t, r, i))
            : () => Promise.resolve(),
          o =
            t.variantChildren && t.variantChildren.size
              ? (r = 0) => {
                  let {
                    delayChildren: s = 0,
                    staggerChildren: o,
                    staggerDirection: a,
                  } = n;
                  return (function (t, e, i = 0, r = 0, n = 1, s) {
                    let o = [],
                      a = (t.variantChildren.size - 1) * r,
                      l = 1 === n ? (t = 0) => t * r : (t = 0) => a - t * r;
                    return (
                      Array.from(t.variantChildren)
                        .sort(c)
                        .forEach((t, r) => {
                          t.notify("AnimationStart", e),
                            o.push(
                              h(t, e, { ...s, delay: i + l(r) }).then(() =>
                                t.notify("AnimationComplete", e)
                              )
                            );
                        }),
                      Promise.all(o)
                    );
                  })(t, e, s + r, o, a, i);
                }
              : () => Promise.resolve(),
          { when: l } = n;
        if (!l) return Promise.all([s(), o(i.delay)]);
        {
          let [t, e] = "beforeChildren" === l ? [s, o] : [o, s];
          return t().then(() => e());
        }
      }
      function c(t, e) {
        return t.sortNodePosition(e);
      }
      let d = [...l.U].reverse(),
        p = l.U.length;
      function f(t = !1) {
        return {
          isActive: t,
          protectedKeys: {},
          needsAnimating: {},
          prevResolvedValues: {},
        };
      }
      var m = i(35971);
      class v extends m.X {
        constructor(t) {
          super(t),
            t.animationState ||
              (t.animationState = (function (t) {
                let e = (e) =>
                    Promise.all(
                      e.map(({ animation: e, options: i }) =>
                        (function (t, e, i = {}) {
                          let r;
                          if ((t.notify("AnimationStart", e), Array.isArray(e)))
                            r = Promise.all(e.map((e) => h(t, e, i)));
                          else if ("string" == typeof e) r = h(t, e, i);
                          else {
                            let n =
                              "function" == typeof e
                                ? (0, a.K)(t, e, i.custom)
                                : e;
                            r = Promise.all((0, u.$)(t, n, i));
                          }
                          return r.then(() => t.notify("AnimationComplete", e));
                        })(t, e, i)
                      )
                    ),
                  i = {
                    animate: f(!0),
                    whileInView: f(),
                    whileHover: f(),
                    whileTap: f(),
                    whileDrag: f(),
                    whileFocus: f(),
                    exit: f(),
                  },
                  l = !0,
                  c = (e, i) => {
                    let r = (0, a.K)(t, i);
                    if (r) {
                      let { transition: t, transitionEnd: i, ...n } = r;
                      e = { ...e, ...n, ...i };
                    }
                    return e;
                  };
                function m(a, u) {
                  let h = t.getProps(),
                    f = t.getVariantContext(!0) || {},
                    m = [],
                    v = new Set(),
                    g = {},
                    y = 1 / 0;
                  for (let e = 0; e < p; e++) {
                    var w;
                    let p = d[e],
                      b = i[p],
                      S = void 0 !== h[p] ? h[p] : f[p],
                      x = (0, o.w)(S),
                      V = p === u ? b.isActive : null;
                    !1 === V && (y = e);
                    let A = S === f[p] && S !== h[p] && x;
                    if (
                      (A && l && t.manuallyAnimateOnMount && (A = !1),
                      (b.protectedKeys = { ...g }),
                      (!b.isActive && null === V) ||
                        (!S && !b.prevProp) ||
                        (0, r.N)(S) ||
                        "boolean" == typeof S)
                    )
                      continue;
                    let P =
                        ((w = b.prevProp),
                        ("string" == typeof S
                          ? S !== w
                          : !!Array.isArray(S) && !s(S, w)) ||
                          (p === u && b.isActive && !A && x) ||
                          (e > y && x)),
                      C = !1,
                      E = Array.isArray(S) ? S : [S],
                      M = E.reduce(c, {});
                    !1 === V && (M = {});
                    let { prevResolvedValues: k = {} } = b,
                      T = { ...k, ...M },
                      O = (t) => {
                        (P = !0),
                          v.has(t) && ((C = !0), v.delete(t)),
                          (b.needsAnimating[t] = !0);
                      };
                    for (let t in T) {
                      let e = M[t],
                        i = k[t];
                      if (!g.hasOwnProperty(t))
                        ((0, n.p)(e) && (0, n.p)(i) ? s(e, i) : e === i)
                          ? void 0 !== e && v.has(t)
                            ? O(t)
                            : (b.protectedKeys[t] = !0)
                          : void 0 !== e
                          ? O(t)
                          : v.add(t);
                    }
                    (b.prevProp = S),
                      (b.prevResolvedValues = M),
                      b.isActive && (g = { ...g, ...M }),
                      l && t.blockInitialAnimation && (P = !1),
                      P &&
                        (!A || C) &&
                        m.push(
                          ...E.map((t) => ({
                            animation: t,
                            options: { type: p, ...a },
                          }))
                        );
                  }
                  if (v.size) {
                    let e = {};
                    v.forEach((i) => {
                      let r = t.getBaseTarget(i);
                      void 0 !== r && (e[i] = r);
                    }),
                      m.push({ animation: e });
                  }
                  let b = !!m.length;
                  return (
                    l &&
                      (!1 === h.initial || h.initial === h.animate) &&
                      !t.manuallyAnimateOnMount &&
                      (b = !1),
                    (l = !1),
                    b ? e(m) : Promise.resolve()
                  );
                }
                return {
                  animateChanges: m,
                  setActive: function (e, r, n) {
                    var s;
                    if (i[e].isActive === r) return Promise.resolve();
                    null === (s = t.variantChildren) ||
                      void 0 === s ||
                      s.forEach((t) => {
                        var i;
                        return null === (i = t.animationState) || void 0 === i
                          ? void 0
                          : i.setActive(e, r);
                      }),
                      (i[e].isActive = r);
                    let o = m(n, e);
                    for (let t in i) i[t].protectedKeys = {};
                    return o;
                  },
                  setAnimateFunction: function (i) {
                    e = i(t);
                  },
                  getState: () => i,
                };
              })(t));
        }
        updateAnimationControlsSubscription() {
          let { animate: t } = this.node.getProps();
          this.unmount(),
            (0, r.N)(t) && (this.unmount = t.subscribe(this.node));
        }
        mount() {
          this.updateAnimationControlsSubscription();
        }
        update() {
          let { animate: t } = this.node.getProps(),
            { animate: e } = this.node.prevProps || {};
          t !== e && this.updateAnimationControlsSubscription();
        }
        unmount() {}
      }
      let g = 0;
      class y extends m.X {
        constructor() {
          super(...arguments), (this.id = g++);
        }
        update() {
          if (!this.node.presenceContext) return;
          let {
              isPresent: t,
              onExitComplete: e,
              custom: i,
            } = this.node.presenceContext,
            { isPresent: r } = this.node.prevPresenceContext || {};
          if (!this.node.animationState || t === r) return;
          let n = this.node.animationState.setActive("exit", !t, {
            custom: null != i ? i : this.node.getProps().custom,
          });
          e && !t && n.then(() => e(this.id));
        }
        mount() {
          let { register: t } = this.node.presenceContext || {};
          t && (this.unmount = t(this.id));
        }
        unmount() {}
      }
      let w = { animation: { Feature: v }, exit: { Feature: y } };
    },
    66247: (t, e, i) => {
      i.d(e, { B: () => n });
      let r = {
          animation: [
            "animate",
            "variants",
            "whileHover",
            "whileTap",
            "exit",
            "whileInView",
            "whileFocus",
            "whileDrag",
          ],
          exit: ["exit"],
          drag: ["drag", "dragControls"],
          focus: ["whileFocus"],
          hover: ["whileHover", "onHoverStart", "onHoverEnd"],
          tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
          pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
          inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
          layout: ["layout", "layoutId"],
        },
        n = {};
      for (let t in r) n[t] = { isEnabled: (e) => r[t].some((t) => !!e[t]) };
    },
    16738: (t, e, i) => {
      i.d(e, { n: () => V });
      var r = i(21594),
        n = i(15068),
        s = i(42561),
        o = i(35971),
        a = i(78086);
      function l(t, e) {
        let i = "onHover" + (e ? "Start" : "End");
        return (0, r.h)(
          t.current,
          "pointer" + (e ? "enter" : "leave"),
          (r, n) => {
            if ("touch" === r.pointerType || (0, s.D3)()) return;
            let o = t.getProps();
            t.animationState &&
              o.whileHover &&
              t.animationState.setActive("whileHover", e),
              o[i] && a.Gt.update(() => o[i](r, n));
          },
          { passive: !t.getProps()[i] }
        );
      }
      class u extends o.X {
        mount() {
          this.unmount = (0, n.F)(l(this.node, !0), l(this.node, !1));
        }
        unmount() {}
      }
      var h = i(85677);
      class c extends o.X {
        constructor() {
          super(...arguments), (this.isActive = !1);
        }
        onFocus() {
          let t = !1;
          try {
            t = this.node.current.matches(":focus-visible");
          } catch (e) {
            t = !0;
          }
          t &&
            this.node.animationState &&
            (this.node.animationState.setActive("whileFocus", !0),
            (this.isActive = !0));
        }
        onBlur() {
          this.isActive &&
            this.node.animationState &&
            (this.node.animationState.setActive("whileFocus", !1),
            (this.isActive = !1));
        }
        mount() {
          this.unmount = (0, n.F)(
            (0, h.k)(this.node.current, "focus", () => this.onFocus()),
            (0, h.k)(this.node.current, "blur", () => this.onBlur())
          );
        }
        unmount() {}
      }
      var d = i(66203);
      let p = (t, e) => !!e && (t === e || p(t, e.parentElement));
      var f = i(38792);
      function m(t, e) {
        if (!e) return;
        let i = new PointerEvent("pointer" + t);
        e(i, (0, d.e)(i));
      }
      class v extends o.X {
        constructor() {
          super(...arguments),
            (this.removeStartListeners = f.l),
            (this.removeEndListeners = f.l),
            (this.removeAccessibleListeners = f.l),
            (this.startPointerPress = (t, e) => {
              if (this.isPressing) return;
              this.removeEndListeners();
              let i = this.node.getProps(),
                s = (0, r.h)(
                  window,
                  "pointerup",
                  (t, e) => {
                    if (!this.checkPressEnd()) return;
                    let {
                      onTap: i,
                      onTapCancel: r,
                      globalTapTarget: n,
                    } = this.node.getProps();
                    a.Gt.update(() => {
                      n || p(this.node.current, t.target)
                        ? i && i(t, e)
                        : r && r(t, e);
                    });
                  },
                  { passive: !(i.onTap || i.onPointerUp) }
                ),
                o = (0, r.h)(
                  window,
                  "pointercancel",
                  (t, e) => this.cancelPress(t, e),
                  { passive: !(i.onTapCancel || i.onPointerCancel) }
                );
              (this.removeEndListeners = (0, n.F)(s, o)), this.startPress(t, e);
            }),
            (this.startAccessiblePress = () => {
              let t = (0, h.k)(this.node.current, "keydown", (t) => {
                  "Enter" !== t.key ||
                    this.isPressing ||
                    (this.removeEndListeners(),
                    (this.removeEndListeners = (0, h.k)(
                      this.node.current,
                      "keyup",
                      (t) => {
                        "Enter" === t.key &&
                          this.checkPressEnd() &&
                          m("up", (t, e) => {
                            let { onTap: i } = this.node.getProps();
                            i && a.Gt.update(() => i(t, e));
                          });
                      }
                    )),
                    m("down", (t, e) => {
                      this.startPress(t, e);
                    }));
                }),
                e = (0, h.k)(this.node.current, "blur", () => {
                  this.isPressing &&
                    m("cancel", (t, e) => this.cancelPress(t, e));
                });
              this.removeAccessibleListeners = (0, n.F)(t, e);
            });
        }
        startPress(t, e) {
          this.isPressing = !0;
          let { onTapStart: i, whileTap: r } = this.node.getProps();
          r &&
            this.node.animationState &&
            this.node.animationState.setActive("whileTap", !0),
            i && a.Gt.update(() => i(t, e));
        }
        checkPressEnd() {
          return (
            this.removeEndListeners(),
            (this.isPressing = !1),
            this.node.getProps().whileTap &&
              this.node.animationState &&
              this.node.animationState.setActive("whileTap", !1),
            !(0, s.D3)()
          );
        }
        cancelPress(t, e) {
          if (!this.checkPressEnd()) return;
          let { onTapCancel: i } = this.node.getProps();
          i && a.Gt.update(() => i(t, e));
        }
        mount() {
          let t = this.node.getProps(),
            e = (0, r.h)(
              t.globalTapTarget ? window : this.node.current,
              "pointerdown",
              this.startPointerPress,
              { passive: !(t.onTapStart || t.onPointerStart) }
            ),
            i = (0, h.k)(this.node.current, "focus", this.startAccessiblePress);
          this.removeStartListeners = (0, n.F)(e, i);
        }
        unmount() {
          this.removeStartListeners(),
            this.removeEndListeners(),
            this.removeAccessibleListeners();
        }
      }
      let g = new WeakMap(),
        y = new WeakMap(),
        w = (t) => {
          let e = g.get(t.target);
          e && e(t);
        },
        b = (t) => {
          t.forEach(w);
        },
        S = { some: 0, all: 1 };
      class x extends o.X {
        constructor() {
          super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
        }
        startObserver() {
          this.unmount();
          let { viewport: t = {} } = this.node.getProps(),
            { root: e, margin: i, amount: r = "some", once: n } = t,
            s = {
              root: e ? e.current : void 0,
              rootMargin: i,
              threshold: "number" == typeof r ? r : S[r],
            };
          return (function (t, e, i) {
            let r = (function ({ root: t, ...e }) {
              let i = t || document;
              y.has(i) || y.set(i, {});
              let r = y.get(i),
                n = JSON.stringify(e);
              return (
                r[n] || (r[n] = new IntersectionObserver(b, { root: t, ...e })),
                r[n]
              );
            })(e);
            return (
              g.set(t, i),
              r.observe(t),
              () => {
                g.delete(t), r.unobserve(t);
              }
            );
          })(this.node.current, s, (t) => {
            let { isIntersecting: e } = t;
            if (
              this.isInView === e ||
              ((this.isInView = e), n && !e && this.hasEnteredView)
            )
              return;
            e && (this.hasEnteredView = !0),
              this.node.animationState &&
                this.node.animationState.setActive("whileInView", e);
            let { onViewportEnter: i, onViewportLeave: r } =
                this.node.getProps(),
              s = e ? i : r;
            s && s(t);
          });
        }
        mount() {
          this.startObserver();
        }
        update() {
          if ("undefined" == typeof IntersectionObserver) return;
          let { props: t, prevProps: e } = this.node;
          ["amount", "margin", "root"].some(
            (function ({ viewport: t = {} }, { viewport: e = {} } = {}) {
              return (i) => t[i] !== e[i];
            })(t, e)
          ) && this.startObserver();
        }
        unmount() {}
      }
      let V = {
        inView: { Feature: x },
        tap: { Feature: v },
        focus: { Feature: c },
        hover: { Feature: u },
      };
    },
    94705: (t, e, i) => {
      i.d(e, { Y: () => n });
      var r = i(66247);
      function n(t) {
        for (let e in t) r.B[e] = { ...r.B[e], ...t[e] };
      }
    },
    59246: (t, e, i) => {
      i.d(e, { z: () => s });
      var r = i(63154),
        n = i(31371);
      function s(t, { layout: e, layoutId: i }) {
        return (
          n.f.has(t) ||
          t.startsWith("origin") ||
          ((e || void 0 !== i) && (!!r.H[t] || "opacity" === t))
        );
      }
    },
    65599: (t, e, i) => {
      function r({ top: t, left: e, right: i, bottom: r }) {
        return { x: { min: e, max: i }, y: { min: t, max: r } };
      }
      function n({ x: t, y: e }) {
        return { top: e.min, right: t.max, bottom: e.max, left: t.min };
      }
      function s(t, e) {
        if (!e) return t;
        let i = e({ x: t.left, y: t.top }),
          r = e({ x: t.right, y: t.bottom });
        return { top: i.y, left: i.x, bottom: r.y, right: r.x };
      }
      i.d(e, { FY: () => r, bS: () => s, pA: () => n });
    },
    32994: (t, e, i) => {
      i.d(e, {
        OU: () => u,
        Ql: () => c,
        Ww: () => m,
        hq: () => s,
        o4: () => l,
      });
      var r = i(53935),
        n = i(62985);
      function s(t, e, i) {
        return i + e * (t - i);
      }
      function o(t, e, i, r, n) {
        return void 0 !== n && (t = r + n * (t - r)), r + i * (t - r) + e;
      }
      function a(t, e = 0, i = 1, r, n) {
        (t.min = o(t.min, e, i, r, n)), (t.max = o(t.max, e, i, r, n));
      }
      function l(t, { x: e, y: i }) {
        a(t.x, e.translate, e.scale, e.originPoint),
          a(t.y, i.translate, i.scale, i.originPoint);
      }
      function u(t, e, i, r = !1) {
        let s, o;
        let a = i.length;
        if (a) {
          e.x = e.y = 1;
          for (let u = 0; u < a; u++) {
            o = (s = i[u]).projectionDelta;
            let a = s.instance;
            (!a || !a.style || "contents" !== a.style.display) &&
              (r &&
                s.options.layoutScroll &&
                s.scroll &&
                s !== s.root &&
                m(t, { x: -s.scroll.offset.x, y: -s.scroll.offset.y }),
              o && ((e.x *= o.x.scale), (e.y *= o.y.scale), l(t, o)),
              r && (0, n.HD)(s.latestValues) && m(t, s.latestValues));
          }
          (e.x = h(e.x)), (e.y = h(e.y));
        }
      }
      function h(t) {
        return Number.isInteger(t)
          ? t
          : t > 1.0000000000001 || t < 0.999999999999
          ? t
          : 1;
      }
      function c(t, e) {
        (t.min = t.min + e), (t.max = t.max + e);
      }
      function d(t, e, [i, n, s]) {
        let o = void 0 !== e[s] ? e[s] : 0.5,
          l = (0, r.j)(t.min, t.max, o);
        a(t, e[i], e[n], l, e.scale);
      }
      let p = ["x", "scaleX", "originX"],
        f = ["y", "scaleY", "originY"];
      function m(t, e) {
        d(t.x, e, p), d(t.y, e, f);
      }
    },
    27865: (t, e, i) => {
      i.d(e, { ge: () => o, xU: () => n });
      let r = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
        n = () => ({ x: r(), y: r() }),
        s = () => ({ min: 0, max: 0 }),
        o = () => ({ x: s(), y: s() });
    },
    63154: (t, e, i) => {
      i.d(e, { $: () => n, H: () => r });
      let r = {};
      function n(t) {
        Object.assign(r, t);
      }
    },
    62985: (t, e, i) => {
      function r(t) {
        return void 0 === t || 1 === t;
      }
      function n({ scale: t, scaleX: e, scaleY: i }) {
        return !r(t) || !r(e) || !r(i);
      }
      function s(t) {
        return n(t) || o(t) || t.z || t.rotate || t.rotateX || t.rotateY;
      }
      function o(t) {
        var e, i;
        return ((e = t.x) && "0%" !== e) || ((i = t.y) && "0%" !== i);
      }
      i.d(e, { HD: () => s, vF: () => o, vk: () => n });
    },
    77106: (t, e, i) => {
      i.d(e, { L: () => o, m: () => s });
      var r = i(65599),
        n = i(32994);
      function s(t, e) {
        return (0, r.FY)((0, r.bS)(t.getBoundingClientRect(), e));
      }
      function o(t, e, i) {
        let r = s(t, i),
          { scroll: o } = e;
        return o && ((0, n.Ql)(r.x, o.offset.x), (0, n.Ql)(r.y, o.offset.y)), r;
      }
    },
    37630: (t, e, i) => {
      i.d(e, { b: () => U });
      var r = i(2987),
        n = i(65749),
        s = i(20555),
        o = i(12271);
      let a = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
      function l(t, e, i = 1) {
        (0, n.V)(
          i <= 4,
          `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`
        );
        let [r, u] = (function (t) {
          let e = a.exec(t);
          if (!e) return [,];
          let [, i, r] = e;
          return [i, r];
        })(t);
        if (!r) return;
        let h = window.getComputedStyle(e).getPropertyValue(r);
        if (h) {
          let t = h.trim();
          return (0, s.i)(t) ? parseFloat(t) : t;
        }
        return (0, o.pG)(u) ? l(u, e, i + 1) : u;
      }
      var u = i(82043),
        h = i(31371),
        c = i(18201),
        d = i(15687),
        p = i(41535),
        f = i(43406);
      let m = new Set([
          "width",
          "height",
          "top",
          "left",
          "right",
          "bottom",
          "x",
          "y",
          "translateX",
          "translateY",
        ]),
        v = (t) => m.has(t),
        g = (t) => Object.keys(t).some(v),
        y = (t) => t === p.ai || t === f.px,
        w = (t, e) => parseFloat(t.split(", ")[e]),
        b =
          (t, e) =>
          (i, { transform: r }) => {
            if ("none" === r || !r) return 0;
            let n = r.match(/^matrix3d\((.+)\)$/);
            if (n) return w(n[1], e);
            {
              let e = r.match(/^matrix\((.+)\)$/);
              return e ? w(e[1], t) : 0;
            }
          },
        S = new Set(["x", "y", "z"]),
        x = h.U.filter((t) => !S.has(t)),
        V = {
          width: ({ x: t }, { paddingLeft: e = "0", paddingRight: i = "0" }) =>
            t.max - t.min - parseFloat(e) - parseFloat(i),
          height: ({ y: t }, { paddingTop: e = "0", paddingBottom: i = "0" }) =>
            t.max - t.min - parseFloat(e) - parseFloat(i),
          top: (t, { top: e }) => parseFloat(e),
          left: (t, { left: e }) => parseFloat(e),
          bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
          right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
          x: b(4, 13),
          y: b(5, 14),
        };
      (V.translateX = V.x), (V.translateY = V.y);
      let A = (t, e, i) => {
          let r = e.measureViewportBox(),
            n = getComputedStyle(e.current),
            { display: s } = n,
            o = {};
          "none" === s && e.setStaticValue("display", t.display || "block"),
            i.forEach((t) => {
              o[t] = V[t](r, n);
            }),
            e.render();
          let a = e.measureViewportBox();
          return (
            i.forEach((i) => {
              let r = e.getValue(i);
              r && r.jump(o[i]), (t[i] = V[i](a, n));
            }),
            t
          );
        },
        P = (t, e, i = {}, r = {}) => {
          (e = { ...e }), (r = { ...r });
          let s = Object.keys(e).filter(v),
            o = [],
            a = !1,
            l = [];
          if (
            (s.forEach((s) => {
              let h;
              let d = t.getValue(s);
              if (!t.hasValue(s)) return;
              let p = i[s],
                m = (0, c.n)(p),
                v = e[s];
              if ((0, u.p)(v)) {
                let t = v.length,
                  e = null === v[0] ? 1 : 0;
                (p = v[e]), (m = (0, c.n)(p));
                for (let i = e; i < t && null !== v[i]; i++)
                  h
                    ? (0, n.V)(
                        (0, c.n)(v[i]) === h,
                        "All keyframes must be of the same type"
                      )
                    : ((h = (0, c.n)(v[i])),
                      (0, n.V)(
                        h === m || (y(m) && y(h)),
                        "Keyframes must be of the same dimension as the current value"
                      ));
              } else h = (0, c.n)(v);
              if (m !== h) {
                if (y(m) && y(h)) {
                  let t = d.get();
                  "string" == typeof t && d.set(parseFloat(t)),
                    "string" == typeof v
                      ? (e[s] = parseFloat(v))
                      : Array.isArray(v) &&
                        h === f.px &&
                        (e[s] = v.map(parseFloat));
                } else
                  (null == m ? void 0 : m.transform) &&
                  (null == h ? void 0 : h.transform) &&
                  (0 === p || 0 === v)
                    ? 0 === p
                      ? d.set(h.transform(p))
                      : (e[s] = m.transform(v))
                    : (a ||
                        ((o = (function (t) {
                          let e = [];
                          return (
                            x.forEach((i) => {
                              let r = t.getValue(i);
                              void 0 !== r &&
                                (e.push([i, r.get()]),
                                r.set(i.startsWith("scale") ? 1 : 0));
                            }),
                            e.length && t.render(),
                            e
                          );
                        })(t)),
                        (a = !0)),
                      l.push(s),
                      (r[s] = void 0 !== r[s] ? r[s] : e[s]),
                      d.jump(v));
              }
            }),
            !l.length)
          )
            return { target: e, transitionEnd: r };
          {
            let i = l.indexOf("height") >= 0 ? window.pageYOffset : null,
              n = A(e, t, l);
            return (
              o.length &&
                o.forEach(([e, i]) => {
                  t.getValue(e).set(i);
                }),
              t.render(),
              d.B && null !== i && window.scrollTo({ top: i }),
              { target: n, transitionEnd: r }
            );
          }
        },
        C = (t, e, i, r) => {
          let n = (function (t, { ...e }, i) {
            let r = t.current;
            if (!(r instanceof Element)) return { target: e, transitionEnd: i };
            for (let n in (i && (i = { ...i }),
            t.values.forEach((t) => {
              let e = t.get();
              if (!(0, o.pG)(e)) return;
              let i = l(e, r);
              i && t.set(i);
            }),
            e)) {
              let t = e[n];
              if (!(0, o.pG)(t)) continue;
              let s = l(t, r);
              s && ((e[n] = s), i || (i = {}), void 0 === i[n] && (i[n] = t));
            }
            return { target: e, transitionEnd: i };
          })(t, e, r);
          return (function (t, e, i, r) {
            return g(e) ? P(t, e, i, r) : { target: e, transitionEnd: r };
          })(t, (e = n.target), i, (r = n.transitionEnd));
        };
      var E = i(27865),
        M = i(78674);
      let k = { current: null },
        T = { current: !1 };
      var O = i(87945),
        F = i(93250),
        j = i(55114),
        L = i(84707),
        R = i(99038),
        N = i(62896),
        z = i(78442),
        W = i(66247),
        D = i(34543),
        B = i(26088),
        I = i(78086);
      let _ = Object.keys(W.B),
        $ = _.length,
        H = [
          "AnimationStart",
          "AnimationComplete",
          "Update",
          "BeforeLayoutMeasure",
          "LayoutMeasure",
          "LayoutAnimationStart",
          "LayoutAnimationComplete",
        ],
        X = D._.length;
      class Y {
        constructor(
          {
            parent: t,
            props: e,
            presenceContext: i,
            reducedMotionConfig: r,
            visualState: n,
          },
          s = {}
        ) {
          (this.current = null),
            (this.children = new Set()),
            (this.isVariantNode = !1),
            (this.isControllingVariants = !1),
            (this.shouldReduceMotion = null),
            (this.values = new Map()),
            (this.features = {}),
            (this.valueSubscriptions = new Map()),
            (this.prevMotionValues = {}),
            (this.events = {}),
            (this.propEventSubscriptions = {}),
            (this.notifyUpdate = () =>
              this.notify("Update", this.latestValues)),
            (this.render = () => {
              this.current &&
                (this.triggerBuild(),
                this.renderInstance(
                  this.current,
                  this.renderState,
                  this.props.style,
                  this.projection
                ));
            }),
            (this.scheduleRender = () => I.Gt.render(this.render, !1, !0));
          let { latestValues: o, renderState: a } = n;
          (this.latestValues = o),
            (this.baseTarget = { ...o }),
            (this.initialValues = e.initial ? { ...o } : {}),
            (this.renderState = a),
            (this.parent = t),
            (this.props = e),
            (this.presenceContext = i),
            (this.depth = t ? t.depth + 1 : 0),
            (this.reducedMotionConfig = r),
            (this.options = s),
            (this.isControllingVariants = (0, R.e)(e)),
            (this.isVariantNode = (0, R.O)(e)),
            this.isVariantNode && (this.variantChildren = new Set()),
            (this.manuallyAnimateOnMount = !!(t && t.current));
          let { willChange: l, ...u } = this.scrapeMotionValuesFromProps(e, {});
          for (let t in u) {
            let e = u[t];
            void 0 !== o[t] &&
              (0, L.S)(e) &&
              (e.set(o[t], !1), (0, j.k)(l) && l.add(t));
          }
        }
        scrapeMotionValuesFromProps(t, e) {
          return {};
        }
        mount(t) {
          (this.current = t),
            B.C.set(t, this),
            this.projection &&
              !this.projection.instance &&
              this.projection.mount(t),
            this.parent &&
              this.isVariantNode &&
              !this.isControllingVariants &&
              (this.removeFromVariantTree = this.parent.addVariantChild(this)),
            this.values.forEach((t, e) => this.bindToMotionValue(e, t)),
            T.current ||
              (function () {
                if (((T.current = !0), d.B)) {
                  if (window.matchMedia) {
                    let t = window.matchMedia("(prefers-reduced-motion)"),
                      e = () => (k.current = t.matches);
                    t.addListener(e), e();
                  } else k.current = !1;
                }
              })(),
            (this.shouldReduceMotion =
              "never" !== this.reducedMotionConfig &&
              ("always" === this.reducedMotionConfig || k.current)),
            this.parent && this.parent.children.add(this),
            this.update(this.props, this.presenceContext);
        }
        unmount() {
          for (let t in (B.C.delete(this.current),
          this.projection && this.projection.unmount(),
          (0, I.WG)(this.notifyUpdate),
          (0, I.WG)(this.render),
          this.valueSubscriptions.forEach((t) => t()),
          this.removeFromVariantTree && this.removeFromVariantTree(),
          this.parent && this.parent.children.delete(this),
          this.events))
            this.events[t].clear();
          for (let t in this.features) this.features[t].unmount();
          this.current = null;
        }
        bindToMotionValue(t, e) {
          let i = h.f.has(t),
            r = e.on("change", (e) => {
              (this.latestValues[t] = e),
                this.props.onUpdate && I.Gt.update(this.notifyUpdate, !1, !0),
                i && this.projection && (this.projection.isTransformDirty = !0);
            }),
            n = e.on("renderRequest", this.scheduleRender);
          this.valueSubscriptions.set(t, () => {
            r(), n();
          });
        }
        sortNodePosition(t) {
          return this.current &&
            this.sortInstanceNodePosition &&
            this.type === t.type
            ? this.sortInstanceNodePosition(this.current, t.current)
            : 0;
        }
        loadFeatures({ children: t, ...e }, i, r, n) {
          let s, o;
          for (let t = 0; t < $; t++) {
            let i = _[t],
              {
                isEnabled: r,
                Feature: n,
                ProjectionNode: a,
                MeasureLayout: l,
              } = W.B[i];
            a && (s = a),
              r(e) &&
                (!this.features[i] && n && (this.features[i] = new n(this)),
                l && (o = l));
          }
          if (
            ("html" === this.type || "svg" === this.type) &&
            !this.projection &&
            s
          ) {
            this.projection = new s(
              this.latestValues,
              this.parent && this.parent.projection
            );
            let {
              layoutId: t,
              layout: i,
              drag: r,
              dragConstraints: o,
              layoutScroll: a,
              layoutRoot: l,
            } = e;
            this.projection.setOptions({
              layoutId: t,
              layout: i,
              alwaysMeasureLayout: !!r || (o && (0, M.X)(o)),
              visualElement: this,
              scheduleRender: () => this.scheduleRender(),
              animationType: "string" == typeof i ? i : "both",
              initialPromotionConfig: n,
              layoutScroll: a,
              layoutRoot: l,
            });
          }
          return o;
        }
        updateFeatures() {
          for (let t in this.features) {
            let e = this.features[t];
            e.isMounted ? e.update() : (e.mount(), (e.isMounted = !0));
          }
        }
        triggerBuild() {
          this.build(
            this.renderState,
            this.latestValues,
            this.options,
            this.props
          );
        }
        measureViewportBox() {
          return this.current
            ? this.measureInstanceViewportBox(this.current, this.props)
            : (0, E.ge)();
        }
        getStaticValue(t) {
          return this.latestValues[t];
        }
        setStaticValue(t, e) {
          this.latestValues[t] = e;
        }
        makeTargetAnimatable(t, e = !0) {
          return this.makeTargetAnimatableFromInstance(t, this.props, e);
        }
        update(t, e) {
          (t.transformTemplate || this.props.transformTemplate) &&
            this.scheduleRender(),
            (this.prevProps = this.props),
            (this.props = t),
            (this.prevPresenceContext = this.presenceContext),
            (this.presenceContext = e);
          for (let e = 0; e < H.length; e++) {
            let i = H[e];
            this.propEventSubscriptions[i] &&
              (this.propEventSubscriptions[i](),
              delete this.propEventSubscriptions[i]);
            let r = t["on" + i];
            r && (this.propEventSubscriptions[i] = this.on(i, r));
          }
          (this.prevMotionValues = (function (t, e, i) {
            let { willChange: r } = e;
            for (let n in e) {
              let s = e[n],
                o = i[n];
              if ((0, L.S)(s)) t.addValue(n, s), (0, j.k)(r) && r.add(n);
              else if ((0, L.S)(o))
                t.addValue(n, (0, F.OQ)(s, { owner: t })),
                  (0, j.k)(r) && r.remove(n);
              else if (o !== s) {
                if (t.hasValue(n)) {
                  let e = t.getValue(n);
                  e.hasAnimated || e.set(s);
                } else {
                  let e = t.getStaticValue(n);
                  t.addValue(n, (0, F.OQ)(void 0 !== e ? e : s, { owner: t }));
                }
              }
            }
            for (let r in i) void 0 === e[r] && t.removeValue(r);
            return e;
          })(
            this,
            this.scrapeMotionValuesFromProps(t, this.prevProps),
            this.prevMotionValues
          )),
            this.handleChildMotionValue && this.handleChildMotionValue();
        }
        getProps() {
          return this.props;
        }
        getVariant(t) {
          return this.props.variants ? this.props.variants[t] : void 0;
        }
        getDefaultTransition() {
          return this.props.transition;
        }
        getTransformPagePoint() {
          return this.props.transformPagePoint;
        }
        getClosestVariantNode() {
          return this.isVariantNode
            ? this
            : this.parent
            ? this.parent.getClosestVariantNode()
            : void 0;
        }
        getVariantContext(t = !1) {
          if (t) return this.parent ? this.parent.getVariantContext() : void 0;
          if (!this.isControllingVariants) {
            let t = (this.parent && this.parent.getVariantContext()) || {};
            return (
              void 0 !== this.props.initial && (t.initial = this.props.initial),
              t
            );
          }
          let e = {};
          for (let t = 0; t < X; t++) {
            let i = D._[t],
              r = this.props[i];
            ((0, N.w)(r) || !1 === r) && (e[i] = r);
          }
          return e;
        }
        addVariantChild(t) {
          let e = this.getClosestVariantNode();
          if (e)
            return (
              e.variantChildren && e.variantChildren.add(t),
              () => e.variantChildren.delete(t)
            );
        }
        addValue(t, e) {
          e !== this.values.get(t) &&
            (this.removeValue(t), this.bindToMotionValue(t, e)),
            this.values.set(t, e),
            (this.latestValues[t] = e.get());
        }
        removeValue(t) {
          this.values.delete(t);
          let e = this.valueSubscriptions.get(t);
          e && (e(), this.valueSubscriptions.delete(t)),
            delete this.latestValues[t],
            this.removeValueFromRenderState(t, this.renderState);
        }
        hasValue(t) {
          return this.values.has(t);
        }
        getValue(t, e) {
          if (this.props.values && this.props.values[t])
            return this.props.values[t];
          let i = this.values.get(t);
          return (
            void 0 === i &&
              void 0 !== e &&
              ((i = (0, F.OQ)(e, { owner: this })), this.addValue(t, i)),
            i
          );
        }
        readValue(t) {
          var e;
          return void 0 === this.latestValues[t] && this.current
            ? null !== (e = this.getBaseTargetFromProps(this.props, t)) &&
              void 0 !== e
              ? e
              : this.readValueFromInstance(this.current, t, this.options)
            : this.latestValues[t];
        }
        setBaseTarget(t, e) {
          this.baseTarget[t] = e;
        }
        getBaseTarget(t) {
          var e;
          let { initial: i } = this.props,
            r =
              "string" == typeof i || "object" == typeof i
                ? null === (e = (0, z.a)(this.props, i)) || void 0 === e
                  ? void 0
                  : e[t]
                : void 0;
          if (i && void 0 !== r) return r;
          let n = this.getBaseTargetFromProps(this.props, t);
          return void 0 === n || (0, L.S)(n)
            ? void 0 !== this.initialValues[t] && void 0 === r
              ? void 0
              : this.baseTarget[t]
            : n;
        }
        on(t, e) {
          return (
            this.events[t] || (this.events[t] = new O.v()),
            this.events[t].add(e)
          );
        }
        notify(t, ...e) {
          this.events[t] && this.events[t].notify(...e);
        }
      }
      class U extends Y {
        sortInstanceNodePosition(t, e) {
          return 2 & t.compareDocumentPosition(e) ? 1 : -1;
        }
        getBaseTargetFromProps(t, e) {
          return t.style ? t.style[e] : void 0;
        }
        removeValueFromRenderState(t, { vars: e, style: i }) {
          delete e[t], delete i[t];
        }
        makeTargetAnimatableFromInstance(
          { transition: t, transitionEnd: e, ...i },
          { transformValues: n },
          s
        ) {
          let o = (0, r.$z)(i, t || {}, this);
          if ((n && (e && (e = n(e)), i && (i = n(i)), o && (o = n(o))), s)) {
            (0, r.TM)(this, i, o);
            let t = C(this, i, o, e);
            (e = t.transitionEnd), (i = t.target);
          }
          return { transition: t, transitionEnd: e, ...i };
        }
      }
    },
    16480: (t, e, i) => {
      i.d(e, { J: () => o });
      var r = i(92872),
        n = i(50100),
        s = i(75526);
      let o = (t, e) =>
        (0, s.Q)(t)
          ? new n.l(e, { enableHardwareAcceleration: !1 })
          : new r.M(e, { enableHardwareAcceleration: !0 });
    },
    97184: (t, e, i) => {
      i.d(e, { l: () => s });
      var r = i(29200),
        n = i(16738);
      let s = { renderer: i(16480).J, ...r.W, ...n.n };
    },
    55204: (t, e, i) => {
      i.d(e, { m: () => s });
      var r = i(64474),
        n = i(96233);
      let s = (0, r.H)(n.P);
    },
    64474: (t, e, i) => {
      i.d(e, { H: () => w });
      var r = i(12115),
        n = i(27249),
        s = i(34358),
        o = i(39656),
        a = i(35403),
        l = i(75815),
        u = i(17539),
        h = i(78674),
        c = i(62896),
        d = i(99038);
      function p(t) {
        return Array.isArray(t) ? t.join(" ") : t;
      }
      var f = i(94705),
        m = i(15687),
        v = i(64710),
        g = i(15750);
      let y = Symbol.for("motionComponentSymbol");
      function w(t) {
        function e(i, w = {}) {
          return (function ({
            preloadedFeatures: t,
            createVisualElement: e,
            useRender: i,
            useVisualState: w,
            Component: b,
          }) {
            t && (0, f.Y)(t);
            let S = (0, r.forwardRef)(function (f, y) {
              var S;
              let x;
              let V = {
                  ...(0, r.useContext)(n.Q),
                  ...f,
                  layoutId: (function ({ layoutId: t }) {
                    let e = (0, r.useContext)(v.L).id;
                    return e && void 0 !== t ? e + "-" + t : t;
                  })(f),
                },
                { isStatic: A } = V,
                P = (function (t) {
                  let { initial: e, animate: i } = (function (t, e) {
                    if ((0, d.e)(t)) {
                      let { initial: e, animate: i } = t;
                      return {
                        initial: !1 === e || (0, c.w)(e) ? e : void 0,
                        animate: (0, c.w)(i) ? i : void 0,
                      };
                    }
                    return !1 !== t.inherit ? e : {};
                  })(t, (0, r.useContext)(s.A));
                  return (0, r.useMemo)(
                    () => ({ initial: e, animate: i }),
                    [p(e), p(i)]
                  );
                })(f),
                C = w(f, A);
              if (!A && m.B) {
                P.visualElement = (function (t, e, i, h) {
                  let { visualElement: c } = (0, r.useContext)(s.A),
                    d = (0, r.useContext)(l.Y),
                    p = (0, r.useContext)(o.t),
                    f = (0, r.useContext)(n.Q).reducedMotion,
                    m = (0, r.useRef)();
                  (h = h || d.renderer),
                    !m.current &&
                      h &&
                      (m.current = h(t, {
                        visualState: e,
                        parent: c,
                        props: i,
                        presenceContext: p,
                        blockInitialAnimation: !!p && !1 === p.initial,
                        reducedMotionConfig: f,
                      }));
                  let v = m.current;
                  (0, r.useInsertionEffect)(() => {
                    v && v.update(i, p);
                  });
                  let g = (0, r.useRef)(!!(i[u.n] && !window.HandoffComplete));
                  return (
                    (0, a.E)(() => {
                      v &&
                        (v.render(),
                        g.current &&
                          v.animationState &&
                          v.animationState.animateChanges());
                    }),
                    (0, r.useEffect)(() => {
                      v &&
                        (v.updateFeatures(),
                        !g.current &&
                          v.animationState &&
                          v.animationState.animateChanges(),
                        g.current &&
                          ((g.current = !1), (window.HandoffComplete = !0)));
                    }),
                    v
                  );
                })(b, C, V, e);
                let i = (0, r.useContext)(g.N),
                  h = (0, r.useContext)(l.Y).strict;
                P.visualElement &&
                  (x = P.visualElement.loadFeatures(V, h, t, i));
              }
              return r.createElement(
                s.A.Provider,
                { value: P },
                x && P.visualElement
                  ? r.createElement(x, { visualElement: P.visualElement, ...V })
                  : null,
                i(
                  b,
                  f,
                  ((S = P.visualElement),
                  (0, r.useCallback)(
                    (t) => {
                      t && C.mount && C.mount(t),
                        S && (t ? S.mount(t) : S.unmount()),
                        y &&
                          ("function" == typeof y
                            ? y(t)
                            : (0, h.X)(y) && (y.current = t));
                    },
                    [S]
                  )),
                  C,
                  A,
                  P.visualElement
                )
              );
            });
            return (S[y] = b), S;
          })(t(i, w));
        }
        if ("undefined" == typeof Proxy) return e;
        let i = new Map();
        return new Proxy(e, {
          get: (t, r) => (i.has(r) || i.set(r, e(r)), i.get(r)),
        });
      }
    },
    42717: (t, e, i) => {
      i.d(e, { I: () => r });
      let r = (t) => t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    },
    96233: (t, e, i) => {
      i.d(e, { P: () => k });
      var r = i(75526),
        n = i(12115),
        s = i(59246),
        o = i(84707),
        a = i(67192);
      let l = () => ({
        style: {},
        transform: {},
        transformOrigin: {},
        vars: {},
      });
      function u(t, e, i) {
        for (let r in e) (0, o.S)(e[r]) || (0, s.z)(r, i) || (t[r] = e[r]);
      }
      let h = new Set([
        "animate",
        "exit",
        "variants",
        "initial",
        "style",
        "values",
        "variants",
        "transition",
        "transformTemplate",
        "transformValues",
        "custom",
        "inherit",
        "onBeforeLayoutMeasure",
        "onAnimationStart",
        "onAnimationComplete",
        "onUpdate",
        "onDragStart",
        "onDrag",
        "onDragEnd",
        "onMeasureDragConstraints",
        "onDirectionLock",
        "onDragTransitionEnd",
        "_dragX",
        "_dragY",
        "onHoverStart",
        "onHoverEnd",
        "onViewportEnter",
        "onViewportLeave",
        "globalTapTarget",
        "ignoreStrict",
        "viewport",
      ]);
      function c(t) {
        return (
          t.startsWith("while") ||
          (t.startsWith("drag") && "draggable" !== t) ||
          t.startsWith("layout") ||
          t.startsWith("onTap") ||
          t.startsWith("onPan") ||
          t.startsWith("onLayout") ||
          h.has(t)
        );
      }
      let d = (t) => !c(t);
      try {
        !(function (t) {
          t && (d = (e) => (e.startsWith("on") ? !c(e) : t(e)));
        })(require("@emotion/is-prop-valid").default);
      } catch (t) {}
      var p = i(71721);
      let f = () => ({ ...l(), attrs: {} });
      var m = i(7986),
        v = i(47928),
        g = i(72126),
        y = i(5385),
        w = i(39656),
        b = i(78442),
        S = i(99234),
        x = i(67365),
        V = i(34358),
        A = i(99038);
      let P = (t) => (e, i) => {
        let r = (0, n.useContext)(V.A),
          s = (0, n.useContext)(w.t),
          o = () =>
            (function (
              {
                scrapeMotionValuesFromProps: t,
                createRenderState: e,
                onMount: i,
              },
              r,
              n,
              s
            ) {
              let o = {
                latestValues: (function (t, e, i, r) {
                  let n = {},
                    s = r(t, {});
                  for (let t in s) n[t] = (0, x.u)(s[t]);
                  let { initial: o, animate: a } = t,
                    l = (0, A.e)(t),
                    u = (0, A.O)(t);
                  e &&
                    u &&
                    !l &&
                    !1 !== t.inherit &&
                    (void 0 === o && (o = e.initial),
                    void 0 === a && (a = e.animate));
                  let h = !!i && !1 === i.initial,
                    c = (h = h || !1 === o) ? a : o;
                  return (
                    c &&
                      "boolean" != typeof c &&
                      !(0, y.N)(c) &&
                      (Array.isArray(c) ? c : [c]).forEach((e) => {
                        let i = (0, b.a)(t, e);
                        if (!i) return;
                        let { transitionEnd: r, transition: s, ...o } = i;
                        for (let t in o) {
                          let e = o[t];
                          if (Array.isArray(e)) {
                            let t = h ? e.length - 1 : 0;
                            e = e[t];
                          }
                          null !== e && (n[t] = e);
                        }
                        for (let t in r) n[t] = r[t];
                      }),
                    n
                  );
                })(r, n, s, t),
                renderState: e(),
              };
              return i && (o.mount = (t) => i(r, t, o)), o;
            })(t, e, r, s);
        return i ? o() : (0, S.M)(o);
      };
      var C = i(78086);
      let E = {
          useVisualState: P({
            scrapeMotionValuesFromProps: g.x,
            createRenderState: f,
            onMount: (t, e, { renderState: i, latestValues: r }) => {
              C.Gt.read(() => {
                try {
                  i.dimensions =
                    "function" == typeof e.getBBox
                      ? e.getBBox()
                      : e.getBoundingClientRect();
                } catch (t) {
                  i.dimensions = { x: 0, y: 0, width: 0, height: 0 };
                }
              }),
                C.Gt.render(() => {
                  (0, p.B)(
                    i,
                    r,
                    { enableHardwareAcceleration: !1 },
                    (0, m.n)(e.tagName),
                    t.transformTemplate
                  ),
                    (0, v.d)(e, i);
                });
            },
          }),
        },
        M = {
          useVisualState: P({
            scrapeMotionValuesFromProps: i(701).x,
            createRenderState: l,
          }),
        };
      function k(t, { forwardMotionProps: e = !1 }, i, s) {
        return {
          ...((0, r.Q)(t) ? E : M),
          preloadedFeatures: i,
          useRender: (function (t = !1) {
            return (e, i, s, { latestValues: h }, v) => {
              let g = (
                  (0, r.Q)(e)
                    ? function (t, e, i, r) {
                        let s = (0, n.useMemo)(() => {
                          let i = f();
                          return (
                            (0, p.B)(
                              i,
                              e,
                              { enableHardwareAcceleration: !1 },
                              (0, m.n)(r),
                              t.transformTemplate
                            ),
                            { ...i.attrs, style: { ...i.style } }
                          );
                        }, [e]);
                        if (t.style) {
                          let e = {};
                          u(e, t.style, t), (s.style = { ...e, ...s.style });
                        }
                        return s;
                      }
                    : function (t, e, i) {
                        let r = {},
                          s = (function (t, e, i) {
                            let r = t.style || {},
                              s = {};
                            return (
                              u(s, r, t),
                              Object.assign(
                                s,
                                (function ({ transformTemplate: t }, e, i) {
                                  return (0, n.useMemo)(() => {
                                    let r = l();
                                    return (
                                      (0, a.O)(
                                        r,
                                        e,
                                        { enableHardwareAcceleration: !i },
                                        t
                                      ),
                                      Object.assign({}, r.vars, r.style)
                                    );
                                  }, [e]);
                                })(t, e, i)
                              ),
                              t.transformValues ? t.transformValues(s) : s
                            );
                          })(t, e, i);
                        return (
                          t.drag &&
                            !1 !== t.dragListener &&
                            ((r.draggable = !1),
                            (s.userSelect =
                              s.WebkitUserSelect =
                              s.WebkitTouchCallout =
                                "none"),
                            (s.touchAction =
                              !0 === t.drag
                                ? "none"
                                : `pan-${"x" === t.drag ? "y" : "x"}`)),
                          void 0 === t.tabIndex &&
                            (t.onTap || t.onTapStart || t.whileTap) &&
                            (r.tabIndex = 0),
                          (r.style = s),
                          r
                        );
                      }
                )(i, h, v, e),
                y = {
                  ...(function (t, e, i) {
                    let r = {};
                    for (let n in t)
                      ("values" !== n || "object" != typeof t.values) &&
                        (d(n) ||
                          (!0 === i && c(n)) ||
                          (!e && !c(n)) ||
                          (t.draggable && n.startsWith("onDrag"))) &&
                        (r[n] = t[n]);
                    return r;
                  })(i, "string" == typeof e, t),
                  ...g,
                  ref: s,
                },
                { children: w } = i,
                b = (0, n.useMemo)(() => ((0, o.S)(w) ? w.get() : w), [w]);
              return (0, n.createElement)(e, { ...y, children: b });
            };
          })(e),
          createVisualElement: s,
          Component: t,
        };
      }
    },
    12271: (t, e, i) => {
      i.d(e, { j4: () => n, pG: () => s, z2: () => o });
      let r = (t) => (e) => "string" == typeof e && e.startsWith(t),
        n = r("--"),
        s = r("var(--"),
        o =
          /var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\)/g;
    },
    75526: (t, e, i) => {
      i.d(e, { Q: () => n });
      let r = [
        "animate",
        "circle",
        "defs",
        "desc",
        "ellipse",
        "g",
        "image",
        "line",
        "filter",
        "marker",
        "mask",
        "metadata",
        "path",
        "pattern",
        "polygon",
        "polyline",
        "rect",
        "stop",
        "switch",
        "symbol",
        "svg",
        "text",
        "tspan",
        "use",
        "view",
      ];
      function n(t) {
        if ("string" != typeof t || t.includes("-"));
        else if (r.indexOf(t) > -1 || /[A-Z]/.test(t)) return !0;
        return !1;
      }
    },
    1435: (t, e, i) => {
      i.d(e, { J: () => o });
      var r = i(99605),
        n = i(20139),
        s = i(99204);
      function o(t, e) {
        let i = (0, s.D)(t);
        return (
          i !== n.p && (i = r.f),
          i.getAnimatableNone ? i.getAnimatableNone(e) : void 0
        );
      }
    },
    99204: (t, e, i) => {
      i.d(e, { D: () => o });
      var r = i(94064),
        n = i(20139);
      let s = {
          ...i(15099).W,
          color: r.y,
          backgroundColor: r.y,
          outlineColor: r.y,
          fill: r.y,
          stroke: r.y,
          borderColor: r.y,
          borderTopColor: r.y,
          borderRightColor: r.y,
          borderBottomColor: r.y,
          borderLeftColor: r.y,
          filter: n.p,
          WebkitFilter: n.p,
        },
        o = (t) => s[t];
    },
    18201: (t, e, i) => {
      i.d(e, { T: () => o, n: () => a });
      var r = i(41535),
        n = i(43406),
        s = i(83510);
      let o = [
          r.ai,
          n.px,
          n.KN,
          n.uj,
          n.vw,
          n.vh,
          { test: (t) => "auto" === t, parse: (t) => t },
        ],
        a = (t) => o.find((0, s.w)(t));
    },
    15099: (t, e, i) => {
      i.d(e, { W: () => o });
      var r = i(41535),
        n = i(43406);
      let s = { ...r.ai, transform: Math.round },
        o = {
          borderWidth: n.px,
          borderTopWidth: n.px,
          borderRightWidth: n.px,
          borderBottomWidth: n.px,
          borderLeftWidth: n.px,
          borderRadius: n.px,
          radius: n.px,
          borderTopLeftRadius: n.px,
          borderTopRightRadius: n.px,
          borderBottomRightRadius: n.px,
          borderBottomLeftRadius: n.px,
          width: n.px,
          maxWidth: n.px,
          height: n.px,
          maxHeight: n.px,
          size: n.px,
          top: n.px,
          right: n.px,
          bottom: n.px,
          left: n.px,
          padding: n.px,
          paddingTop: n.px,
          paddingRight: n.px,
          paddingBottom: n.px,
          paddingLeft: n.px,
          margin: n.px,
          marginTop: n.px,
          marginRight: n.px,
          marginBottom: n.px,
          marginLeft: n.px,
          rotate: n.uj,
          rotateX: n.uj,
          rotateY: n.uj,
          rotateZ: n.uj,
          scale: r.hs,
          scaleX: r.hs,
          scaleY: r.hs,
          scaleZ: r.hs,
          skew: n.uj,
          skewX: n.uj,
          skewY: n.uj,
          distance: n.px,
          translateX: n.px,
          translateY: n.px,
          translateZ: n.px,
          x: n.px,
          y: n.px,
          z: n.px,
          perspective: n.px,
          transformPerspective: n.px,
          opacity: r.X4,
          originX: n.gQ,
          originY: n.gQ,
          originZ: n.px,
          zIndex: s,
          fillOpacity: r.X4,
          strokeOpacity: r.X4,
          numOctaves: s,
        };
    },
    83510: (t, e, i) => {
      i.d(e, { w: () => r });
      let r = (t) => (e) => e.test(t);
    },
    92872: (t, e, i) => {
      i.d(e, { M: () => d });
      var r = i(67192),
        n = i(12271),
        s = i(31371),
        o = i(701),
        a = i(98535),
        l = i(99204),
        u = i(77106),
        h = i(37630),
        c = i(84707);
      class d extends h.b {
        constructor() {
          super(...arguments), (this.type = "html");
        }
        readValueFromInstance(t, e) {
          if (s.f.has(e)) {
            let t = (0, l.D)(e);
            return (t && t.default) || 0;
          }
          {
            let i = window.getComputedStyle(t),
              r = ((0, n.j4)(e) ? i.getPropertyValue(e) : i[e]) || 0;
            return "string" == typeof r ? r.trim() : r;
          }
        }
        measureInstanceViewportBox(t, { transformPagePoint: e }) {
          return (0, u.m)(t, e);
        }
        build(t, e, i, n) {
          (0, r.O)(t, e, i, n.transformTemplate);
        }
        scrapeMotionValuesFromProps(t, e) {
          return (0, o.x)(t, e);
        }
        handleChildMotionValue() {
          this.childSubscription &&
            (this.childSubscription(), delete this.childSubscription);
          let { children: t } = this.props;
          (0, c.S)(t) &&
            (this.childSubscription = t.on("change", (t) => {
              this.current && (this.current.textContent = `${t}`);
            }));
        }
        renderInstance(t, e, i, r) {
          (0, a.e)(t, e, i, r);
        }
      }
    },
    67192: (t, e, i) => {
      i.d(e, { O: () => u });
      var r = i(31371);
      let n = {
          x: "translateX",
          y: "translateY",
          z: "translateZ",
          transformPerspective: "perspective",
        },
        s = r.U.length;
      var o = i(12271);
      let a = (t, e) => (e && "number" == typeof t ? e.transform(t) : t);
      var l = i(15099);
      function u(t, e, i, u) {
        let { style: h, vars: c, transform: d, transformOrigin: p } = t,
          f = !1,
          m = !1,
          v = !0;
        for (let t in e) {
          let i = e[t];
          if ((0, o.j4)(t)) {
            c[t] = i;
            continue;
          }
          let n = l.W[t],
            s = a(i, n);
          if (r.f.has(t)) {
            if (((f = !0), (d[t] = s), !v)) continue;
            i !== (n.default || 0) && (v = !1);
          } else t.startsWith("origin") ? ((m = !0), (p[t] = s)) : (h[t] = s);
        }
        if (
          (!e.transform &&
            (f || u
              ? (h.transform = (function (
                  t,
                  {
                    enableHardwareAcceleration: e = !0,
                    allowTransformNone: i = !0,
                  },
                  o,
                  a
                ) {
                  let l = "";
                  for (let e = 0; e < s; e++) {
                    let i = r.U[e];
                    if (void 0 !== t[i]) {
                      let e = n[i] || i;
                      l += `${e}(${t[i]}) `;
                    }
                  }
                  return (
                    e && !t.z && (l += "translateZ(0)"),
                    (l = l.trim()),
                    a ? (l = a(t, o ? "" : l)) : i && o && (l = "none"),
                    l
                  );
                })(t.transform, i, v, u))
              : h.transform && (h.transform = "none")),
          m)
        ) {
          let { originX: t = "50%", originY: e = "50%", originZ: i = 0 } = p;
          h.transformOrigin = `${t} ${e} ${i}`;
        }
      }
    },
    98535: (t, e, i) => {
      i.d(e, { e: () => r });
      function r(t, { style: e, vars: i }, r, n) {
        for (let s in (Object.assign(t.style, e, n && n.getProjectionStyles(r)),
        i))
          t.style.setProperty(s, i[s]);
      }
    },
    701: (t, e, i) => {
      i.d(e, { x: () => s });
      var r = i(59246),
        n = i(84707);
      function s(t, e) {
        let { style: i } = t,
          s = {};
        for (let o in i)
          ((0, n.S)(i[o]) ||
            (e.style && (0, n.S)(e.style[o])) ||
            (0, r.z)(o, t)) &&
            (s[o] = i[o]);
        return s;
      }
    },
    31371: (t, e, i) => {
      i.d(e, { U: () => r, f: () => n });
      let r = [
          "transformPerspective",
          "x",
          "y",
          "z",
          "translateX",
          "translateY",
          "translateZ",
          "scale",
          "scaleX",
          "scaleY",
          "rotate",
          "rotateX",
          "rotateY",
          "rotateZ",
          "skew",
          "skewX",
          "skewY",
        ],
        n = new Set(r);
    },
    26088: (t, e, i) => {
      i.d(e, { C: () => r });
      let r = new WeakMap();
    },
    50100: (t, e, i) => {
      i.d(e, { l: () => p });
      var r = i(72126),
        n = i(37630),
        s = i(71721),
        o = i(42717),
        a = i(19552),
        l = i(31371),
        u = i(47928),
        h = i(99204),
        c = i(27865),
        d = i(7986);
      class p extends n.b {
        constructor() {
          super(...arguments), (this.type = "svg"), (this.isSVGTag = !1);
        }
        getBaseTargetFromProps(t, e) {
          return t[e];
        }
        readValueFromInstance(t, e) {
          if (l.f.has(e)) {
            let t = (0, h.D)(e);
            return (t && t.default) || 0;
          }
          return (e = a.e.has(e) ? e : (0, o.I)(e)), t.getAttribute(e);
        }
        measureInstanceViewportBox() {
          return (0, c.ge)();
        }
        scrapeMotionValuesFromProps(t, e) {
          return (0, r.x)(t, e);
        }
        build(t, e, i, r) {
          (0, s.B)(t, e, i, this.isSVGTag, r.transformTemplate);
        }
        renderInstance(t, e, i, r) {
          (0, u.d)(t, e, i, r);
        }
        mount(t) {
          (this.isSVGTag = (0, d.n)(t.tagName)), super.mount(t);
        }
      }
    },
    71721: (t, e, i) => {
      i.d(e, { B: () => l });
      var r = i(67192),
        n = i(43406);
      function s(t, e, i) {
        return "string" == typeof t ? t : n.px.transform(e + i * t);
      }
      let o = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
        a = { offset: "strokeDashoffset", array: "strokeDasharray" };
      function l(
        t,
        {
          attrX: e,
          attrY: i,
          attrScale: l,
          originX: u,
          originY: h,
          pathLength: c,
          pathSpacing: d = 1,
          pathOffset: p = 0,
          ...f
        },
        m,
        v,
        g
      ) {
        if (((0, r.O)(t, f, m, g), v)) {
          t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
          return;
        }
        (t.attrs = t.style), (t.style = {});
        let { attrs: y, style: w, dimensions: b } = t;
        y.transform && (b && (w.transform = y.transform), delete y.transform),
          b &&
            (void 0 !== u || void 0 !== h || w.transform) &&
            (w.transformOrigin = (function (t, e, i) {
              let r = s(e, t.x, t.width),
                n = s(i, t.y, t.height);
              return `${r} ${n}`;
            })(b, void 0 !== u ? u : 0.5, void 0 !== h ? h : 0.5)),
          void 0 !== e && (y.x = e),
          void 0 !== i && (y.y = i),
          void 0 !== l && (y.scale = l),
          void 0 !== c &&
            (function (t, e, i = 1, r = 0, s = !0) {
              t.pathLength = 1;
              let l = s ? o : a;
              t[l.offset] = n.px.transform(-r);
              let u = n.px.transform(e),
                h = n.px.transform(i);
              t[l.array] = `${u} ${h}`;
            })(y, c, d, p, !1);
      }
    },
    19552: (t, e, i) => {
      i.d(e, { e: () => r });
      let r = new Set([
        "baseFrequency",
        "diffuseConstant",
        "kernelMatrix",
        "kernelUnitLength",
        "keySplines",
        "keyTimes",
        "limitingConeAngle",
        "markerHeight",
        "markerWidth",
        "numOctaves",
        "targetX",
        "targetY",
        "surfaceScale",
        "specularConstant",
        "specularExponent",
        "stdDeviation",
        "tableValues",
        "viewBox",
        "gradientTransform",
        "pathLength",
        "startOffset",
        "textLength",
        "lengthAdjust",
      ]);
    },
    7986: (t, e, i) => {
      i.d(e, { n: () => r });
      let r = (t) => "string" == typeof t && "svg" === t.toLowerCase();
    },
    47928: (t, e, i) => {
      i.d(e, { d: () => o });
      var r = i(42717),
        n = i(98535),
        s = i(19552);
      function o(t, e, i, o) {
        for (let i in ((0, n.e)(t, e, void 0, o), e.attrs))
          t.setAttribute(s.e.has(i) ? i : (0, r.I)(i), e.attrs[i]);
      }
    },
    72126: (t, e, i) => {
      i.d(e, { x: () => o });
      var r = i(84707),
        n = i(701),
        s = i(31371);
      function o(t, e) {
        let i = (0, n.x)(t, e);
        for (let n in t)
          ((0, r.S)(t[n]) || (0, r.S)(e[n])) &&
            (i[
              -1 !== s.U.indexOf(n)
                ? "attr" + n.charAt(0).toUpperCase() + n.substring(1)
                : n
            ] = t[n]);
        return i;
      }
    },
    99038: (t, e, i) => {
      i.d(e, { O: () => a, e: () => o });
      var r = i(5385),
        n = i(62896),
        s = i(34543);
      function o(t) {
        return (0, r.N)(t.animate) || s._.some((e) => (0, n.w)(t[e]));
      }
      function a(t) {
        return !!(o(t) || t.variants);
      }
    },
    62896: (t, e, i) => {
      i.d(e, { w: () => r });
      function r(t) {
        return "string" == typeof t || Array.isArray(t);
      }
    },
    95134: (t, e, i) => {
      i.d(e, { K: () => n });
      var r = i(78442);
      function n(t, e, i) {
        let n = t.getProps();
        return (0, r.a)(
          n,
          e,
          void 0 !== i ? i : n.custom,
          (function (t) {
            let e = {};
            return t.values.forEach((t, i) => (e[i] = t.get())), e;
          })(t),
          (function (t) {
            let e = {};
            return t.values.forEach((t, i) => (e[i] = t.getVelocity())), e;
          })(t)
        );
      }
    },
    78442: (t, e, i) => {
      i.d(e, { a: () => r });
      function r(t, e, i, n = {}, s = {}) {
        return (
          "function" == typeof e && (e = e(void 0 !== i ? i : t.custom, n, s)),
          "string" == typeof e && (e = t.variants && t.variants[e]),
          "function" == typeof e && (e = e(void 0 !== i ? i : t.custom, n, s)),
          e
        );
      }
    },
    2987: (t, e, i) => {
      i.d(e, { TM: () => v, $z: () => g, Uo: () => m });
      var r = i(20555),
        n = i(66879),
        s = i(55238),
        o = i(93250),
        a = i(99605),
        l = i(1435),
        u = i(94064),
        h = i(18201),
        c = i(83510);
      let d = [...h.T, u.y, a.f],
        p = (t) => d.find((0, c.w)(t));
      var f = i(95134);
      function m(t, e) {
        let i = (0, f.K)(t, e),
          {
            transitionEnd: r = {},
            transition: n = {},
            ...a
          } = i ? t.makeTargetAnimatable(i, !1) : {};
        for (let e in (a = { ...a, ...r })) {
          let i = (0, s.K)(a[e]);
          t.hasValue(e) ? t.getValue(e).set(i) : t.addValue(e, (0, o.OQ)(i));
        }
      }
      function v(t, e, i) {
        var s, u;
        let h = Object.keys(e).filter((e) => !t.hasValue(e)),
          c = h.length;
        if (c)
          for (let d = 0; d < c; d++) {
            let c = h[d],
              f = e[c],
              m = null;
            Array.isArray(f) && (m = f[0]),
              null === m &&
                (m =
                  null !==
                    (u =
                      null !== (s = i[c]) && void 0 !== s
                        ? s
                        : t.readValue(c)) && void 0 !== u
                    ? u
                    : e[c]),
              null != m &&
                ("string" == typeof m && ((0, r.i)(m) || (0, n.$)(m))
                  ? (m = parseFloat(m))
                  : !p(m) && a.f.test(f) && (m = (0, l.J)(c, f)),
                t.addValue(c, (0, o.OQ)(m, { owner: t })),
                void 0 === i[c] && (i[c] = m),
                null !== m && t.setBaseTarget(c, m));
          }
      }
      function g(t, e, i) {
        let r = {};
        for (let n in t) {
          let t = (function (t, e) {
            if (e) return (e[t] || e.default || e).from;
          })(n, e);
          if (void 0 !== t) r[n] = t;
          else {
            let t = i.getValue(n);
            t && (r[n] = t.get());
          }
        }
        return r;
      }
    },
    34543: (t, e, i) => {
      i.d(e, { U: () => r, _: () => n });
      let r = [
          "animate",
          "whileInView",
          "whileFocus",
          "whileHover",
          "whileTap",
          "whileDrag",
          "exit",
        ],
        n = ["initial", ...r];
    },
    24093: (t, e, i) => {
      function r(t, e) {
        -1 === t.indexOf(e) && t.push(e);
      }
      function n(t, e) {
        let i = t.indexOf(e);
        i > -1 && t.splice(i, 1);
      }
      i.d(e, { Ai: () => n, Kq: () => r });
    },
    16611: (t, e, i) => {
      i.d(e, { q: () => r });
      let r = (t, e, i) => Math.min(Math.max(i, t), e);
    },
    65749: (t, e, i) => {
      i.d(e, { $: () => n, V: () => s });
      var r = i(38792);
      let n = r.l,
        s = r.l;
    },
    49600: (t, e, i) => {
      i.d(e, { G: () => C });
      var r = i(65749),
        n = i(94064),
        s = i(16611),
        o = i(53935);
      function a(t, e, i) {
        return (i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6)
          ? t + (e - t) * 6 * i
          : i < 0.5
          ? e
          : i < 2 / 3
          ? t + (e - t) * (2 / 3 - i) * 6
          : t;
      }
      var l = i(98967),
        u = i(2664),
        h = i(83020);
      let c = (t, e, i) => {
          let r = t * t;
          return Math.sqrt(Math.max(0, i * (e * e - r) + r));
        },
        d = [l.u, u.B, h.V],
        p = (t) => d.find((e) => e.test(t));
      function f(t) {
        let e = p(t);
        (0, r.V)(
          !!e,
          `'${t}' is not an animatable color. Use the equivalent color code instead.`
        );
        let i = e.parse(t);
        return (
          e === h.V &&
            (i = (function ({ hue: t, saturation: e, lightness: i, alpha: r }) {
              (t /= 360), (i /= 100);
              let n = 0,
                s = 0,
                o = 0;
              if ((e /= 100)) {
                let r = i < 0.5 ? i * (1 + e) : i + e - i * e,
                  l = 2 * i - r;
                (n = a(l, r, t + 1 / 3)),
                  (s = a(l, r, t)),
                  (o = a(l, r, t - 1 / 3));
              } else n = s = o = i;
              return {
                red: Math.round(255 * n),
                green: Math.round(255 * s),
                blue: Math.round(255 * o),
                alpha: r,
              };
            })(i)),
          i
        );
      }
      let m = (t, e) => {
        let i = f(t),
          r = f(e),
          n = { ...i };
        return (t) => (
          (n.red = c(i.red, r.red, t)),
          (n.green = c(i.green, r.green, t)),
          (n.blue = c(i.blue, r.blue, t)),
          (n.alpha = (0, o.j)(i.alpha, r.alpha, t)),
          u.B.transform(n)
        );
      };
      var v = i(15068),
        g = i(99605);
      let y = (t, e) => (i) => `${i > 0 ? e : t}`;
      function w(t, e) {
        return "number" == typeof t
          ? (i) => (0, o.j)(t, e, i)
          : n.y.test(t)
          ? m(t, e)
          : t.startsWith("var(")
          ? y(t, e)
          : x(t, e);
      }
      let b = (t, e) => {
          let i = [...t],
            r = i.length,
            n = t.map((t, i) => w(t, e[i]));
          return (t) => {
            for (let e = 0; e < r; e++) i[e] = n[e](t);
            return i;
          };
        },
        S = (t, e) => {
          let i = { ...t, ...e },
            r = {};
          for (let n in i)
            void 0 !== t[n] && void 0 !== e[n] && (r[n] = w(t[n], e[n]));
          return (t) => {
            for (let e in r) i[e] = r[e](t);
            return i;
          };
        },
        x = (t, e) => {
          let i = g.f.createTransformer(e),
            n = (0, g.V)(t),
            s = (0, g.V)(e);
          return n.numVars === s.numVars &&
            n.numColors === s.numColors &&
            n.numNumbers >= s.numNumbers
            ? (0, v.F)(b(n.values, s.values), i)
            : ((0, r.$)(
                !0,
                `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`
              ),
              y(t, e));
        };
      var V = i(26781),
        A = i(38792);
      let P = (t, e) => (i) => (0, o.j)(t, e, i);
      function C(t, e, { clamp: i = !0, ease: o, mixer: a } = {}) {
        let l = t.length;
        if (
          ((0, r.V)(
            l === e.length,
            "Both input and output ranges must be the same length"
          ),
          1 === l)
        )
          return () => e[0];
        t[0] > t[l - 1] && ((t = [...t].reverse()), (e = [...e].reverse()));
        let u = (function (t, e, i) {
            let r = [],
              s =
                i ||
                (function (t) {
                  if ("number" == typeof t);
                  else if ("string" == typeof t) return n.y.test(t) ? m : x;
                  else if (Array.isArray(t)) return b;
                  else if ("object" == typeof t) return S;
                  return P;
                })(t[0]),
              o = t.length - 1;
            for (let i = 0; i < o; i++) {
              let n = s(t[i], t[i + 1]);
              if (e) {
                let t = Array.isArray(e) ? e[i] || A.l : e;
                n = (0, v.F)(t, n);
              }
              r.push(n);
            }
            return r;
          })(e, o, a),
          h = u.length,
          c = (e) => {
            let i = 0;
            if (h > 1) for (; i < t.length - 2 && !(e < t[i + 1]); i++);
            let r = (0, V.q)(t[i], t[i + 1], e);
            return u[i](r);
          };
        return i ? (e) => c((0, s.q)(t[0], t[l - 1], e)) : c;
      }
    },
    15687: (t, e, i) => {
      i.d(e, { B: () => r });
      let r = "undefined" != typeof document;
    },
    20555: (t, e, i) => {
      i.d(e, { i: () => r });
      let r = (t) => /^\-?\d*\.?\d+$/.test(t);
    },
    78674: (t, e, i) => {
      i.d(e, { X: () => r });
      function r(t) {
        return (
          t &&
          "object" == typeof t &&
          Object.prototype.hasOwnProperty.call(t, "current")
        );
      }
    },
    66879: (t, e, i) => {
      i.d(e, { $: () => r });
      let r = (t) => /^0[^.\s]+$/.test(t);
    },
    52398: (t, e, i) => {
      i.d(e, { p: () => r });
      function r(t) {
        let e;
        return () => (void 0 === e && (e = t()), e);
      }
    },
    53935: (t, e, i) => {
      i.d(e, { j: () => r });
      let r = (t, e, i) => -i * t + i * e + t;
    },
    38792: (t, e, i) => {
      i.d(e, { l: () => r });
      let r = (t) => t;
    },
    53636: (t, e, i) => {
      i.d(e, { Z: () => n });
      var r = i(37136);
      function n(t) {
        let e = [0];
        return (0, r.f)(e, t.length - 1), e;
      }
    },
    37136: (t, e, i) => {
      i.d(e, { f: () => s });
      var r = i(53935),
        n = i(26781);
      function s(t, e) {
        let i = t[t.length - 1];
        for (let s = 1; s <= e; s++) {
          let o = (0, n.q)(0, e, s);
          t.push((0, r.j)(i, 1, o));
        }
      }
    },
    15068: (t, e, i) => {
      i.d(e, { F: () => n });
      let r = (t, e) => (i) => e(t(i)),
        n = (...t) => t.reduce(r);
    },
    26781: (t, e, i) => {
      i.d(e, { q: () => r });
      let r = (t, e, i) => {
        let r = e - t;
        return 0 === r ? 1 : (i - t) / r;
      };
    },
    55238: (t, e, i) => {
      i.d(e, { B: () => n, K: () => s });
      var r = i(82043);
      let n = (t) => !!(t && "object" == typeof t && t.mix && t.toValue),
        s = (t) => ((0, r.p)(t) ? t[t.length - 1] || 0 : t);
    },
    87945: (t, e, i) => {
      i.d(e, { v: () => n });
      var r = i(24093);
      class n {
        constructor() {
          this.subscriptions = [];
        }
        add(t) {
          return (
            (0, r.Kq)(this.subscriptions, t),
            () => (0, r.Ai)(this.subscriptions, t)
          );
        }
        notify(t, e, i) {
          let r = this.subscriptions.length;
          if (r) {
            if (1 === r) this.subscriptions[0](t, e, i);
            else
              for (let n = 0; n < r; n++) {
                let r = this.subscriptions[n];
                r && r(t, e, i);
              }
          }
        }
        getSize() {
          return this.subscriptions.length;
        }
        clear() {
          this.subscriptions.length = 0;
        }
      }
    },
    14302: (t, e, i) => {
      i.d(e, { X: () => n, f: () => r });
      let r = (t) => 1e3 * t,
        n = (t) => t / 1e3;
    },
    99234: (t, e, i) => {
      i.d(e, { M: () => n });
      var r = i(12115);
      function n(t) {
        let e = (0, r.useRef)(null);
        return null === e.current && (e.current = t()), e.current;
      }
    },
    35403: (t, e, i) => {
      i.d(e, { E: () => n });
      var r = i(12115);
      let n = i(15687).B ? r.useLayoutEffect : r.useEffect;
    },
    42206: (t, e, i) => {
      i.d(e, { f: () => r });
      function r(t, e) {
        return e ? (1e3 / e) * t : 0;
      }
    },
    93250: (t, e, i) => {
      i.d(e, { OQ: () => u, bt: () => a });
      var r = i(87945),
        n = i(42206),
        s = i(78086);
      let o = (t) => !isNaN(parseFloat(t)),
        a = { current: void 0 };
      class l {
        constructor(t, e = {}) {
          (this.version = "10.18.0"),
            (this.timeDelta = 0),
            (this.lastUpdated = 0),
            (this.canTrackVelocity = !1),
            (this.events = {}),
            (this.updateAndNotify = (t, e = !0) => {
              (this.prev = this.current), (this.current = t);
              let { delta: i, timestamp: r } = s.uv;
              this.lastUpdated !== r &&
                ((this.timeDelta = i),
                (this.lastUpdated = r),
                s.Gt.postRender(this.scheduleVelocityCheck)),
                this.prev !== this.current &&
                  this.events.change &&
                  this.events.change.notify(this.current),
                this.events.velocityChange &&
                  this.events.velocityChange.notify(this.getVelocity()),
                e &&
                  this.events.renderRequest &&
                  this.events.renderRequest.notify(this.current);
            }),
            (this.scheduleVelocityCheck = () =>
              s.Gt.postRender(this.velocityCheck)),
            (this.velocityCheck = ({ timestamp: t }) => {
              t !== this.lastUpdated &&
                ((this.prev = this.current),
                this.events.velocityChange &&
                  this.events.velocityChange.notify(this.getVelocity()));
            }),
            (this.hasAnimated = !1),
            (this.prev = this.current = t),
            (this.canTrackVelocity = o(this.current)),
            (this.owner = e.owner);
        }
        onChange(t) {
          return this.on("change", t);
        }
        on(t, e) {
          this.events[t] || (this.events[t] = new r.v());
          let i = this.events[t].add(e);
          return "change" === t
            ? () => {
                i(),
                  s.Gt.read(() => {
                    this.events.change.getSize() || this.stop();
                  });
              }
            : i;
        }
        clearListeners() {
          for (let t in this.events) this.events[t].clear();
        }
        attach(t, e) {
          (this.passiveEffect = t), (this.stopPassiveEffect = e);
        }
        set(t, e = !0) {
          e && this.passiveEffect
            ? this.passiveEffect(t, this.updateAndNotify)
            : this.updateAndNotify(t, e);
        }
        setWithVelocity(t, e, i) {
          this.set(e), (this.prev = t), (this.timeDelta = i);
        }
        jump(t) {
          this.updateAndNotify(t),
            (this.prev = t),
            this.stop(),
            this.stopPassiveEffect && this.stopPassiveEffect();
        }
        get() {
          return a.current && a.current.push(this), this.current;
        }
        getPrevious() {
          return this.prev;
        }
        getVelocity() {
          return this.canTrackVelocity
            ? (0, n.f)(
                parseFloat(this.current) - parseFloat(this.prev),
                this.timeDelta
              )
            : 0;
        }
        start(t) {
          return (
            this.stop(),
            new Promise((e) => {
              (this.hasAnimated = !0),
                (this.animation = t(e)),
                this.events.animationStart &&
                  this.events.animationStart.notify();
            }).then(() => {
              this.events.animationComplete &&
                this.events.animationComplete.notify(),
                this.clearAnimation();
            })
          );
        }
        stop() {
          this.animation &&
            (this.animation.stop(),
            this.events.animationCancel &&
              this.events.animationCancel.notify()),
            this.clearAnimation();
        }
        isAnimating() {
          return !!this.animation;
        }
        clearAnimation() {
          delete this.animation;
        }
        destroy() {
          this.clearListeners(),
            this.stop(),
            this.stopPassiveEffect && this.stopPassiveEffect();
        }
      }
      function u(t, e) {
        return new l(t, e);
      }
    },
    98967: (t, e, i) => {
      i.d(e, { u: () => n });
      var r = i(2664);
      let n = {
        test: (0, i(18279).$)("#"),
        parse: function (t) {
          let e = "",
            i = "",
            r = "",
            n = "";
          return (
            t.length > 5
              ? ((e = t.substring(1, 3)),
                (i = t.substring(3, 5)),
                (r = t.substring(5, 7)),
                (n = t.substring(7, 9)))
              : ((e = t.substring(1, 2)),
                (i = t.substring(2, 3)),
                (r = t.substring(3, 4)),
                (n = t.substring(4, 5)),
                (e += e),
                (i += i),
                (r += r),
                (n += n)),
            {
              red: parseInt(e, 16),
              green: parseInt(i, 16),
              blue: parseInt(r, 16),
              alpha: n ? parseInt(n, 16) / 255 : 1,
            }
          );
        },
        transform: r.B.transform,
      };
    },
    83020: (t, e, i) => {
      i.d(e, { V: () => a });
      var r = i(41535),
        n = i(43406),
        s = i(23163),
        o = i(18279);
      let a = {
        test: (0, o.$)("hsl", "hue"),
        parse: (0, o.q)("hue", "saturation", "lightness"),
        transform: ({ hue: t, saturation: e, lightness: i, alpha: o = 1 }) =>
          "hsla(" +
          Math.round(t) +
          ", " +
          n.KN.transform((0, s.aj)(e)) +
          ", " +
          n.KN.transform((0, s.aj)(i)) +
          ", " +
          (0, s.aj)(r.X4.transform(o)) +
          ")",
      };
    },
    94064: (t, e, i) => {
      i.d(e, { y: () => a });
      var r = i(23163),
        n = i(98967),
        s = i(83020),
        o = i(2664);
      let a = {
        test: (t) => o.B.test(t) || n.u.test(t) || s.V.test(t),
        parse: (t) =>
          o.B.test(t)
            ? o.B.parse(t)
            : s.V.test(t)
            ? s.V.parse(t)
            : n.u.parse(t),
        transform: (t) =>
          (0, r.Kg)(t)
            ? t
            : t.hasOwnProperty("red")
            ? o.B.transform(t)
            : s.V.transform(t),
      };
    },
    2664: (t, e, i) => {
      i.d(e, { B: () => u });
      var r = i(16611),
        n = i(41535),
        s = i(23163),
        o = i(18279);
      let a = (t) => (0, r.q)(0, 255, t),
        l = { ...n.ai, transform: (t) => Math.round(a(t)) },
        u = {
          test: (0, o.$)("rgb", "red"),
          parse: (0, o.q)("red", "green", "blue"),
          transform: ({ red: t, green: e, blue: i, alpha: r = 1 }) =>
            "rgba(" +
            l.transform(t) +
            ", " +
            l.transform(e) +
            ", " +
            l.transform(i) +
            ", " +
            (0, s.aj)(n.X4.transform(r)) +
            ")",
        };
    },
    18279: (t, e, i) => {
      i.d(e, { $: () => n, q: () => s });
      var r = i(23163);
      let n = (t, e) => (i) =>
          !!(
            ((0, r.Kg)(i) && r.Fl.test(i) && i.startsWith(t)) ||
            (e && Object.prototype.hasOwnProperty.call(i, e))
          ),
        s = (t, e, i) => (n) => {
          if (!(0, r.Kg)(n)) return n;
          let [s, o, a, l] = n.match(r.SY);
          return {
            [t]: parseFloat(s),
            [e]: parseFloat(o),
            [i]: parseFloat(a),
            alpha: void 0 !== l ? parseFloat(l) : 1,
          };
        };
    },
    20139: (t, e, i) => {
      i.d(e, { p: () => l });
      var r = i(99605),
        n = i(23163);
      let s = new Set(["brightness", "contrast", "saturate", "opacity"]);
      function o(t) {
        let [e, i] = t.slice(0, -1).split("(");
        if ("drop-shadow" === e) return t;
        let [r] = i.match(n.SY) || [];
        if (!r) return t;
        let o = i.replace(r, ""),
          a = s.has(e) ? 1 : 0;
        return r !== i && (a *= 100), e + "(" + a + o + ")";
      }
      let a = /([a-z-]*)\(.*?\)/g,
        l = {
          ...r.f,
          getAnimatableNone: (t) => {
            let e = t.match(a);
            return e ? e.map(o).join(" ") : t;
          },
        };
    },
    99605: (t, e, i) => {
      i.d(e, { V: () => d, f: () => v });
      var r = i(12271),
        n = i(38792),
        s = i(94064),
        o = i(41535),
        a = i(23163);
      let l = { regex: r.z2, countKey: "Vars", token: "${v}", parse: n.l },
        u = {
          regex: a.ne,
          countKey: "Colors",
          token: "${c}",
          parse: s.y.parse,
        },
        h = {
          regex: a.SY,
          countKey: "Numbers",
          token: "${n}",
          parse: o.ai.parse,
        };
      function c(t, { regex: e, countKey: i, token: r, parse: n }) {
        let s = t.tokenised.match(e);
        s &&
          ((t["num" + i] = s.length),
          (t.tokenised = t.tokenised.replace(e, r)),
          t.values.push(...s.map(n)));
      }
      function d(t) {
        let e = t.toString(),
          i = {
            value: e,
            tokenised: e,
            values: [],
            numVars: 0,
            numColors: 0,
            numNumbers: 0,
          };
        return i.value.includes("var(--") && c(i, l), c(i, u), c(i, h), i;
      }
      function p(t) {
        return d(t).values;
      }
      function f(t) {
        let { values: e, numColors: i, numVars: r, tokenised: n } = d(t),
          o = e.length;
        return (t) => {
          let e = n;
          for (let n = 0; n < o; n++)
            e =
              n < r
                ? e.replace(l.token, t[n])
                : n < r + i
                ? e.replace(u.token, s.y.transform(t[n]))
                : e.replace(h.token, (0, a.aj)(t[n]));
          return e;
        };
      }
      let m = (t) => ("number" == typeof t ? 0 : t),
        v = {
          test: function (t) {
            var e, i;
            return (
              isNaN(t) &&
              (0, a.Kg)(t) &&
              ((null === (e = t.match(a.SY)) || void 0 === e
                ? void 0
                : e.length) || 0) +
                ((null === (i = t.match(a.ne)) || void 0 === i
                  ? void 0
                  : i.length) || 0) >
                0
            );
          },
          parse: p,
          createTransformer: f,
          getAnimatableNone: function (t) {
            let e = p(t);
            return f(t)(e.map(m));
          },
        };
    },
    41535: (t, e, i) => {
      i.d(e, { X4: () => s, ai: () => n, hs: () => o });
      var r = i(16611);
      let n = {
          test: (t) => "number" == typeof t,
          parse: parseFloat,
          transform: (t) => t,
        },
        s = { ...n, transform: (t) => (0, r.q)(0, 1, t) },
        o = { ...n, default: 1 };
    },
    43406: (t, e, i) => {
      i.d(e, {
        KN: () => o,
        gQ: () => h,
        px: () => a,
        uj: () => s,
        vh: () => l,
        vw: () => u,
      });
      var r = i(23163);
      let n = (t) => ({
          test: (e) =>
            (0, r.Kg)(e) && e.endsWith(t) && 1 === e.split(" ").length,
          parse: parseFloat,
          transform: (e) => `${e}${t}`,
        }),
        s = n("deg"),
        o = n("%"),
        a = n("px"),
        l = n("vh"),
        u = n("vw"),
        h = {
          ...o,
          parse: (t) => o.parse(t) / 100,
          transform: (t) => o.transform(100 * t),
        };
    },
    23163: (t, e, i) => {
      i.d(e, {
        Fl: () => o,
        Kg: () => a,
        SY: () => n,
        aj: () => r,
        ne: () => s,
      });
      let r = (t) => Math.round(1e5 * t) / 1e5,
        n = /(-)?([\d]*\.?[\d])+/g,
        s =
          /(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi,
        o =
          /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
      function a(t) {
        return "string" == typeof t;
      }
    },
    55114: (t, e, i) => {
      i.d(e, { k: () => n });
      var r = i(84707);
      function n(t) {
        return !!((0, r.S)(t) && t.add);
      }
    },
    84707: (t, e, i) => {
      i.d(e, { S: () => r });
      let r = (t) => !!(t && t.getVelocity);
    },
    67365: (t, e, i) => {
      i.d(e, { u: () => s });
      var r = i(55238),
        n = i(84707);
      function s(t) {
        let e = (0, n.S)(t) ? t.get() : t;
        return (0, r.B)(e) ? e.toValue() : e;
      }
    },
    5908: (t, e, i) => {
      function r(t, e, i) {
        return Math.max(t, Math.min(e, i));
      }
      i.d(e, { FH: () => m, xP: () => g });
      var n = class {
          isRunning = !1;
          value = 0;
          from = 0;
          to = 0;
          currentTime = 0;
          lerp;
          duration;
          easing;
          onUpdate;
          advance(t) {
            if (!this.isRunning) return;
            let e = !1;
            if (this.duration && this.easing) {
              this.currentTime += t;
              let i = r(0, this.currentTime / this.duration, 1),
                n = (e = i >= 1) ? 1 : this.easing(i);
              this.value = this.from + (this.to - this.from) * n;
            } else if (this.lerp) {
              var i, n, s;
              (this.value =
                ((i = this.value),
                (n = this.to),
                (1 - (s = 1 - Math.exp(-(60 * this.lerp) * t))) * i + s * n)),
                Math.round(this.value) === this.to &&
                  ((this.value = this.to), (e = !0));
            } else (this.value = this.to), (e = !0);
            e && this.stop(), this.onUpdate?.(this.value, e);
          }
          stop() {
            this.isRunning = !1;
          }
          fromTo(
            t,
            e,
            { lerp: i, duration: r, easing: n, onStart: s, onUpdate: o }
          ) {
            (this.from = this.value = t),
              (this.to = e),
              (this.lerp = i),
              (this.duration = r),
              (this.easing = n),
              (this.currentTime = 0),
              (this.isRunning = !0),
              s?.(),
              (this.onUpdate = o);
          }
        },
        s = class {
          constructor(t, e, { autoResize: i = !0, debounce: r = 250 } = {}) {
            (this.wrapper = t),
              (this.content = e),
              i &&
                ((this.debouncedResize = (function (t, e) {
                  let i;
                  return function (...r) {
                    let n = this;
                    clearTimeout(i),
                      (i = setTimeout(() => {
                        (i = void 0), t.apply(n, r);
                      }, e));
                  };
                })(this.resize, r)),
                this.wrapper instanceof Window
                  ? window.addEventListener("resize", this.debouncedResize, !1)
                  : ((this.wrapperResizeObserver = new ResizeObserver(
                      this.debouncedResize
                    )),
                    this.wrapperResizeObserver.observe(this.wrapper)),
                (this.contentResizeObserver = new ResizeObserver(
                  this.debouncedResize
                )),
                this.contentResizeObserver.observe(this.content)),
              this.resize();
          }
          width = 0;
          height = 0;
          scrollHeight = 0;
          scrollWidth = 0;
          debouncedResize;
          wrapperResizeObserver;
          contentResizeObserver;
          destroy() {
            this.wrapperResizeObserver?.disconnect(),
              this.contentResizeObserver?.disconnect(),
              this.wrapper === window &&
                this.debouncedResize &&
                window.removeEventListener("resize", this.debouncedResize, !1);
          }
          resize = () => {
            this.onWrapperResize(), this.onContentResize();
          };
          onWrapperResize = () => {
            this.wrapper instanceof Window
              ? ((this.width = window.innerWidth),
                (this.height = window.innerHeight))
              : ((this.width = this.wrapper.clientWidth),
                (this.height = this.wrapper.clientHeight));
          };
          onContentResize = () => {
            this.wrapper instanceof Window
              ? ((this.scrollHeight = this.content.scrollHeight),
                (this.scrollWidth = this.content.scrollWidth))
              : ((this.scrollHeight = this.wrapper.scrollHeight),
                (this.scrollWidth = this.wrapper.scrollWidth));
          };
          get limit() {
            return {
              x: this.scrollWidth - this.width,
              y: this.scrollHeight - this.height,
            };
          }
        },
        o = class {
          events = {};
          emit(t, ...e) {
            let i = this.events[t] || [];
            for (let t = 0, r = i.length; t < r; t++) i[t]?.(...e);
          }
          on(t, e) {
            return (
              this.events[t]?.push(e) || (this.events[t] = [e]),
              () => {
                this.events[t] = this.events[t]?.filter((t) => e !== t);
              }
            );
          }
          off(t, e) {
            this.events[t] = this.events[t]?.filter((t) => e !== t);
          }
          destroy() {
            this.events = {};
          }
        },
        a = 100 / 6,
        l = { passive: !1 },
        u = class {
          constructor(t, e = { wheelMultiplier: 1, touchMultiplier: 1 }) {
            (this.element = t),
              (this.options = e),
              window.addEventListener("resize", this.onWindowResize, !1),
              this.onWindowResize(),
              this.element.addEventListener("wheel", this.onWheel, l),
              this.element.addEventListener("touchstart", this.onTouchStart, l),
              this.element.addEventListener("touchmove", this.onTouchMove, l),
              this.element.addEventListener("touchend", this.onTouchEnd, l);
          }
          touchStart = { x: 0, y: 0 };
          lastDelta = { x: 0, y: 0 };
          window = { width: 0, height: 0 };
          emitter = new o();
          on(t, e) {
            return this.emitter.on(t, e);
          }
          destroy() {
            this.emitter.destroy(),
              window.removeEventListener("resize", this.onWindowResize, !1),
              this.element.removeEventListener("wheel", this.onWheel, l),
              this.element.removeEventListener(
                "touchstart",
                this.onTouchStart,
                l
              ),
              this.element.removeEventListener(
                "touchmove",
                this.onTouchMove,
                l
              ),
              this.element.removeEventListener("touchend", this.onTouchEnd, l);
          }
          onTouchStart = (t) => {
            let { clientX: e, clientY: i } = t.targetTouches
              ? t.targetTouches[0]
              : t;
            (this.touchStart.x = e),
              (this.touchStart.y = i),
              (this.lastDelta = { x: 0, y: 0 }),
              this.emitter.emit("scroll", { deltaX: 0, deltaY: 0, event: t });
          };
          onTouchMove = (t) => {
            let { clientX: e, clientY: i } = t.targetTouches
                ? t.targetTouches[0]
                : t,
              r = -(e - this.touchStart.x) * this.options.touchMultiplier,
              n = -(i - this.touchStart.y) * this.options.touchMultiplier;
            (this.touchStart.x = e),
              (this.touchStart.y = i),
              (this.lastDelta = { x: r, y: n }),
              this.emitter.emit("scroll", { deltaX: r, deltaY: n, event: t });
          };
          onTouchEnd = (t) => {
            this.emitter.emit("scroll", {
              deltaX: this.lastDelta.x,
              deltaY: this.lastDelta.y,
              event: t,
            });
          };
          onWheel = (t) => {
            let { deltaX: e, deltaY: i, deltaMode: r } = t,
              n = 1 === r ? a : 2 === r ? this.window.width : 1,
              s = 1 === r ? a : 2 === r ? this.window.height : 1;
            (e *= n),
              (i *= s),
              (e *= this.options.wheelMultiplier),
              (i *= this.options.wheelMultiplier),
              this.emitter.emit("scroll", { deltaX: e, deltaY: i, event: t });
          };
          onWindowResize = () => {
            this.window = {
              width: window.innerWidth,
              height: window.innerHeight,
            };
          };
        },
        h = class {
          _isScrolling = !1;
          _isStopped = !1;
          _isLocked = !1;
          _preventNextNativeScrollEvent = !1;
          _resetVelocityTimeout = null;
          __rafID = null;
          isTouching;
          time = 0;
          userData = {};
          lastVelocity = 0;
          velocity = 0;
          direction = 0;
          options;
          targetScroll;
          animatedScroll;
          animate = new n();
          emitter = new o();
          dimensions;
          virtualScroll;
          constructor({
            wrapper: t = window,
            content: e = document.documentElement,
            eventsTarget: i = t,
            smoothWheel: r = !0,
            syncTouch: n = !1,
            syncTouchLerp: o = 0.075,
            touchInertiaMultiplier: a = 35,
            duration: l,
            easing: h = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            lerp: c = 0.1,
            infinite: d = !1,
            orientation: p = "vertical",
            gestureOrientation: f = "vertical",
            touchMultiplier: m = 1,
            wheelMultiplier: v = 1,
            autoResize: g = !0,
            prevent: y,
            virtualScroll: w,
            overscroll: b = !0,
            autoRaf: S = !1,
            anchors: x = !1,
            __experimental__naiveDimensions: V = !1,
          } = {}) {
            (window.lenisVersion = "1.1.20"),
              (t && t !== document.documentElement) || (t = window),
              (this.options = {
                wrapper: t,
                content: e,
                eventsTarget: i,
                smoothWheel: r,
                syncTouch: n,
                syncTouchLerp: o,
                touchInertiaMultiplier: a,
                duration: l,
                easing: h,
                lerp: c,
                infinite: d,
                gestureOrientation: f,
                orientation: p,
                touchMultiplier: m,
                wheelMultiplier: v,
                autoResize: g,
                prevent: y,
                virtualScroll: w,
                overscroll: b,
                autoRaf: S,
                anchors: x,
                __experimental__naiveDimensions: V,
              }),
              (this.dimensions = new s(t, e, { autoResize: g })),
              this.updateClassName(),
              (this.targetScroll = this.animatedScroll = this.actualScroll),
              this.options.wrapper.addEventListener(
                "scroll",
                this.onNativeScroll,
                !1
              ),
              this.options.wrapper.addEventListener(
                "scrollend",
                this.onScrollEnd,
                { capture: !0 }
              ),
              this.options.anchors &&
                this.options.wrapper === window &&
                this.options.wrapper.addEventListener(
                  "click",
                  this.onClick,
                  !1
                ),
              this.options.wrapper.addEventListener(
                "pointerdown",
                this.onPointerDown,
                !1
              ),
              (this.virtualScroll = new u(i, {
                touchMultiplier: m,
                wheelMultiplier: v,
              })),
              this.virtualScroll.on("scroll", this.onVirtualScroll),
              this.options.autoRaf &&
                (this.__rafID = requestAnimationFrame(this.raf));
          }
          destroy() {
            this.emitter.destroy(),
              this.options.wrapper.removeEventListener(
                "scroll",
                this.onNativeScroll,
                !1
              ),
              this.options.wrapper.removeEventListener(
                "scrollend",
                this.onScrollEnd,
                { capture: !0 }
              ),
              this.options.wrapper.removeEventListener(
                "pointerdown",
                this.onPointerDown,
                !1
              ),
              this.options.anchors &&
                this.options.wrapper === window &&
                this.options.wrapper.removeEventListener(
                  "click",
                  this.onClick,
                  !1
                ),
              this.virtualScroll.destroy(),
              this.dimensions.destroy(),
              this.cleanUpClassName(),
              this.__rafID && cancelAnimationFrame(this.__rafID);
          }
          on(t, e) {
            return this.emitter.on(t, e);
          }
          off(t, e) {
            return this.emitter.off(t, e);
          }
          onScrollEnd = (t) => {
            t instanceof CustomEvent ||
              ("smooth" !== this.isScrolling && !1 !== this.isScrolling) ||
              t.stopPropagation();
          };
          dispatchScrollendEvent = () => {
            this.options.wrapper.dispatchEvent(
              new CustomEvent("scrollend", {
                bubbles: this.options.wrapper === window,
                detail: { lenisScrollEnd: !0 },
              })
            );
          };
          setScroll(t) {
            this.isHorizontal
              ? this.options.wrapper.scrollTo({ left: t, behavior: "instant" })
              : this.options.wrapper.scrollTo({ top: t, behavior: "instant" });
          }
          onClick = (t) => {
            let e = t
              .composedPath()
              .find(
                (t) =>
                  t instanceof HTMLAnchorElement &&
                  t.getAttribute("href")?.startsWith("#")
              );
            if (e) {
              let t = e.getAttribute("href");
              if (t) {
                let e =
                  "object" == typeof this.options.anchors &&
                  this.options.anchors
                    ? this.options.anchors
                    : void 0;
                this.scrollTo(t, e);
              }
            }
          };
          onPointerDown = (t) => {
            1 === t.button && this.reset();
          };
          onVirtualScroll = (t) => {
            if (
              "function" == typeof this.options.virtualScroll &&
              !1 === this.options.virtualScroll(t)
            )
              return;
            let { deltaX: e, deltaY: i, event: r } = t;
            if (
              (this.emitter.emit("virtual-scroll", {
                deltaX: e,
                deltaY: i,
                event: r,
              }),
              r.ctrlKey || r.lenisStopPropagation)
            )
              return;
            let n = r.type.includes("touch"),
              s = r.type.includes("wheel");
            this.isTouching = "touchstart" === r.type || "touchmove" === r.type;
            let o = 0 === e && 0 === i;
            if (
              this.options.syncTouch &&
              n &&
              "touchstart" === r.type &&
              o &&
              !this.isStopped &&
              !this.isLocked
            ) {
              this.reset();
              return;
            }
            let a =
              ("vertical" === this.options.gestureOrientation && 0 === i) ||
              ("horizontal" === this.options.gestureOrientation && 0 === e);
            if (o || a) return;
            let l = r.composedPath();
            l = l.slice(0, l.indexOf(this.rootElement));
            let u = this.options.prevent;
            if (
              l.find(
                (t) =>
                  t instanceof HTMLElement &&
                  (("function" == typeof u && u?.(t)) ||
                    t.hasAttribute?.("data-lenis-prevent") ||
                    (n && t.hasAttribute?.("data-lenis-prevent-touch")) ||
                    (s && t.hasAttribute?.("data-lenis-prevent-wheel")))
              )
            )
              return;
            if (this.isStopped || this.isLocked) {
              r.preventDefault();
              return;
            }
            if (
              !(
                (this.options.syncTouch && n) ||
                (this.options.smoothWheel && s)
              )
            ) {
              (this.isScrolling = "native"),
                this.animate.stop(),
                (r.lenisStopPropagation = !0);
              return;
            }
            let h = i;
            "both" === this.options.gestureOrientation
              ? (h = Math.abs(i) > Math.abs(e) ? i : e)
              : "horizontal" === this.options.gestureOrientation && (h = e),
              (!this.options.overscroll ||
                this.options.infinite ||
                (this.options.wrapper !== window &&
                  ((this.animatedScroll > 0 &&
                    this.animatedScroll < this.limit) ||
                    (0 === this.animatedScroll && i > 0) ||
                    (this.animatedScroll === this.limit && i < 0)))) &&
                (r.lenisStopPropagation = !0),
              r.preventDefault();
            let c = n && this.options.syncTouch,
              d = n && "touchend" === r.type && Math.abs(h) > 5;
            d && (h = this.velocity * this.options.touchInertiaMultiplier),
              this.scrollTo(this.targetScroll + h, {
                programmatic: !1,
                ...(c
                  ? { lerp: d ? this.options.syncTouchLerp : 1 }
                  : {
                      lerp: this.options.lerp,
                      duration: this.options.duration,
                      easing: this.options.easing,
                    }),
              });
          };
          resize() {
            this.dimensions.resize(),
              (this.animatedScroll = this.targetScroll = this.actualScroll),
              this.emit();
          }
          emit() {
            this.emitter.emit("scroll", this);
          }
          onNativeScroll = () => {
            if (
              (null !== this._resetVelocityTimeout &&
                (clearTimeout(this._resetVelocityTimeout),
                (this._resetVelocityTimeout = null)),
              this._preventNextNativeScrollEvent)
            ) {
              this._preventNextNativeScrollEvent = !1;
              return;
            }
            if (!1 === this.isScrolling || "native" === this.isScrolling) {
              let t = this.animatedScroll;
              (this.animatedScroll = this.targetScroll = this.actualScroll),
                (this.lastVelocity = this.velocity),
                (this.velocity = this.animatedScroll - t),
                (this.direction = Math.sign(this.animatedScroll - t)),
                this.isStopped || (this.isScrolling = "native"),
                this.emit(),
                0 !== this.velocity &&
                  (this._resetVelocityTimeout = setTimeout(() => {
                    (this.lastVelocity = this.velocity),
                      (this.velocity = 0),
                      (this.isScrolling = !1),
                      this.emit();
                  }, 400));
            }
          };
          reset() {
            (this.isLocked = !1),
              (this.isScrolling = !1),
              (this.animatedScroll = this.targetScroll = this.actualScroll),
              (this.lastVelocity = this.velocity = 0),
              this.animate.stop();
          }
          start() {
            this.isStopped && (this.reset(), (this.isStopped = !1));
          }
          stop() {
            this.isStopped || (this.reset(), (this.isStopped = !0));
          }
          raf = (t) => {
            let e = t - (this.time || t);
            (this.time = t),
              this.animate.advance(0.001 * e),
              this.options.autoRaf &&
                (this.__rafID = requestAnimationFrame(this.raf));
          };
          scrollTo(
            t,
            {
              offset: e = 0,
              immediate: i = !1,
              lock: n = !1,
              duration: s = this.options.duration,
              easing: o = this.options.easing,
              lerp: a = this.options.lerp,
              onStart: l,
              onComplete: u,
              force: h = !1,
              programmatic: c = !0,
              userData: d,
            } = {}
          ) {
            if ((!this.isStopped && !this.isLocked) || h) {
              if ("string" == typeof t && ["top", "left", "start"].includes(t))
                t = 0;
              else if (
                "string" == typeof t &&
                ["bottom", "right", "end"].includes(t)
              )
                t = this.limit;
              else {
                let i;
                if (
                  ("string" == typeof t
                    ? (i = document.querySelector(t))
                    : t instanceof HTMLElement && t?.nodeType && (i = t),
                  i)
                ) {
                  if (this.options.wrapper !== window) {
                    let t = this.rootElement.getBoundingClientRect();
                    e -= this.isHorizontal ? t.left : t.top;
                  }
                  let r = i.getBoundingClientRect();
                  t =
                    (this.isHorizontal ? r.left : r.top) + this.animatedScroll;
                }
              }
              if ("number" == typeof t) {
                if (
                  ((t += e),
                  (t = Math.round(t)),
                  this.options.infinite
                    ? c &&
                      (this.targetScroll = this.animatedScroll = this.scroll)
                    : (t = r(0, t, this.limit)),
                  t === this.targetScroll)
                ) {
                  l?.(this), u?.(this);
                  return;
                }
                if (((this.userData = d ?? {}), i)) {
                  (this.animatedScroll = this.targetScroll = t),
                    this.setScroll(this.scroll),
                    this.reset(),
                    this.preventNextNativeScrollEvent(),
                    this.emit(),
                    u?.(this),
                    (this.userData = {}),
                    requestAnimationFrame(() => {
                      this.dispatchScrollendEvent();
                    });
                  return;
                }
                c || (this.targetScroll = t),
                  this.animate.fromTo(this.animatedScroll, t, {
                    duration: s,
                    easing: o,
                    lerp: a,
                    onStart: () => {
                      n && (this.isLocked = !0),
                        (this.isScrolling = "smooth"),
                        l?.(this);
                    },
                    onUpdate: (t, e) => {
                      (this.isScrolling = "smooth"),
                        (this.lastVelocity = this.velocity),
                        (this.velocity = t - this.animatedScroll),
                        (this.direction = Math.sign(this.velocity)),
                        (this.animatedScroll = t),
                        this.setScroll(this.scroll),
                        c && (this.targetScroll = t),
                        e || this.emit(),
                        e &&
                          (this.reset(),
                          this.emit(),
                          u?.(this),
                          (this.userData = {}),
                          requestAnimationFrame(() => {
                            this.dispatchScrollendEvent();
                          }),
                          this.preventNextNativeScrollEvent());
                    },
                  });
              }
            }
          }
          preventNextNativeScrollEvent() {
            (this._preventNextNativeScrollEvent = !0),
              requestAnimationFrame(() => {
                this._preventNextNativeScrollEvent = !1;
              });
          }
          get rootElement() {
            return this.options.wrapper === window
              ? document.documentElement
              : this.options.wrapper;
          }
          get limit() {
            return this.options.__experimental__naiveDimensions
              ? this.isHorizontal
                ? this.rootElement.scrollWidth - this.rootElement.clientWidth
                : this.rootElement.scrollHeight - this.rootElement.clientHeight
              : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
          }
          get isHorizontal() {
            return "horizontal" === this.options.orientation;
          }
          get actualScroll() {
            let t = this.options.wrapper;
            return this.isHorizontal
              ? t.scrollX ?? t.scrollLeft
              : t.scrollY ?? t.scrollTop;
          }
          get scroll() {
            var t;
            return this.options.infinite
              ? ((this.animatedScroll % (t = this.limit)) + t) % t
              : this.animatedScroll;
          }
          get progress() {
            return 0 === this.limit ? 1 : this.scroll / this.limit;
          }
          get isScrolling() {
            return this._isScrolling;
          }
          set isScrolling(t) {
            this._isScrolling !== t &&
              ((this._isScrolling = t), this.updateClassName());
          }
          get isStopped() {
            return this._isStopped;
          }
          set isStopped(t) {
            this._isStopped !== t &&
              ((this._isStopped = t), this.updateClassName());
          }
          get isLocked() {
            return this._isLocked;
          }
          set isLocked(t) {
            this._isLocked !== t &&
              ((this._isLocked = t), this.updateClassName());
          }
          get isSmooth() {
            return "smooth" === this.isScrolling;
          }
          get className() {
            let t = "lenis";
            return (
              this.isStopped && (t += " lenis-stopped"),
              this.isLocked && (t += " lenis-locked"),
              this.isScrolling && (t += " lenis-scrolling"),
              "smooth" === this.isScrolling && (t += " lenis-smooth"),
              t
            );
          }
          updateClassName() {
            this.cleanUpClassName(),
              (this.rootElement.className =
                `${this.rootElement.className} ${this.className}`.trim());
          }
          cleanUpClassName() {
            this.rootElement.className = this.rootElement.className
              .replace(/lenis(-\w+)?/g, "")
              .trim();
          }
        },
        c = i(12115),
        d = i(95155),
        p = (0, c.createContext)(null),
        f = new (class {
          set(t) {
            for (let e of ((this.state = t), this.listeners)) e(this.state);
          }
          subscribe(t) {
            return (
              (this.listeners = [...this.listeners, t]),
              () => {
                this.listeners = this.listeners.filter((e) => e !== t);
              }
            );
          }
          get() {
            return this.state;
          }
          constructor(t) {
            (this.listeners = []), (this.state = t);
          }
        })(null),
        m = (0, c.forwardRef)((t, e) => {
          let {
              children: i,
              root: r = !1,
              options: n = {},
              className: s,
              autoRaf: o = !0,
              style: a,
              props: l,
            } = t,
            u = (0, c.useRef)(null),
            m = (0, c.useRef)(null),
            [v, g] = (0, c.useState)(void 0);
          (0, c.useImperativeHandle)(
            e,
            () => ({ wrapper: u.current, content: m.current, lenis: v }),
            [v]
          ),
            (0, c.useEffect)(() => {
              var t;
              let e = new h({
                ...n,
                ...(!r && { wrapper: u.current, content: m.current }),
                autoRaf:
                  null !== (t = null == n ? void 0 : n.autoRaf) && void 0 !== t
                    ? t
                    : o,
              });
              return (
                g(e),
                () => {
                  e.destroy(), g(void 0);
                }
              );
            }, [r, JSON.stringify(n)]);
          let y = (0, c.useRef)([]),
            w = (0, c.useCallback)((t, e) => {
              y.current.push({ callback: t, priority: e }),
                y.current.sort((t, e) => t.priority - e.priority);
            }, []),
            b = (0, c.useCallback)((t) => {
              y.current = y.current.filter((e) => e.callback !== t);
            }, []);
          return (
            (0, c.useEffect)(() => {
              if (r && v)
                return (
                  f.set({ lenis: v, addCallback: w, removeCallback: b }),
                  () => f.set(null)
                );
            }, [r, v, w, b]),
            (0, c.useEffect)(() => {
              if (!v) return;
              let t = (t) => {
                for (let i = 0; i < y.current.length; i++) {
                  var e;
                  null === (e = y.current[i]) || void 0 === e || e.callback(t);
                }
              };
              return (
                v.on("scroll", t),
                () => {
                  v.off("scroll", t);
                }
              );
            }, [v]),
            (0, d.jsx)(p.Provider, {
              value: { lenis: v, addCallback: w, removeCallback: b },
              children: r
                ? i
                : (0, d.jsx)("div", {
                    ref: u,
                    className: s,
                    style: a,
                    ...l,
                    children: (0, d.jsx)("div", { ref: m, children: i }),
                  }),
            })
          );
        }),
        v = {};
      function g(t) {
        var e;
        let i =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
          r =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
          n = (0, c.useContext)(p),
          s = (function (t) {
            let [e, i] = (0, c.useState)(t.get());
            return (0, c.useEffect)(() => t.subscribe((t) => i(t)), [t]), e;
          })(f),
          {
            lenis: o,
            addCallback: a,
            removeCallback: l,
          } = null !== (e = null != n ? n : s) && void 0 !== e ? e : v;
        return (
          (0, c.useEffect)(() => {
            if (t && a && l && o)
              return (
                a(t, r),
                t(o),
                () => {
                  l(t);
                }
              );
          }, [o, a, l, r, ...i]),
          o
        );
      }
    },
    99827: (t, e, i) => {
      i.d(e, { v: () => l });
      var r = i(12115);
      let n = (t) => {
          let e;
          let i = new Set(),
            r = (t, r) => {
              let n = "function" == typeof t ? t(e) : t;
              if (!Object.is(n, e)) {
                let t = e;
                (e = (null != r ? r : "object" != typeof n || null === n)
                  ? n
                  : Object.assign({}, e, n)),
                  i.forEach((i) => i(e, t));
              }
            },
            n = () => e,
            s = {
              setState: r,
              getState: n,
              getInitialState: () => o,
              subscribe: (t) => (i.add(t), () => i.delete(t)),
            },
            o = (e = t(r, n, s));
          return s;
        },
        s = (t) => (t ? n(t) : n),
        o = (t) => t,
        a = (t) => {
          let e = s(t),
            i = (t) =>
              (function (t, e = o) {
                let i = r.useSyncExternalStore(
                  t.subscribe,
                  () => e(t.getState()),
                  () => e(t.getInitialState())
                );
                return r.useDebugValue(i), i;
              })(e, t);
          return Object.assign(i, e), i;
        },
        l = (t) => (t ? a(t) : a);
    },
  },
]);
