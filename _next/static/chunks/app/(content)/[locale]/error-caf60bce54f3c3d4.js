(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [613],
  {
    191: (r, e, n) => {
      Promise.resolve().then(n.bind(n, 63030));
    },
    63030: (r, e, n) => {
      "use strict";
      n.r(e), n.d(e, { default: () => i });
      var o = n(95155),
        s = n(12115),
        t = n(35318),
        c = n.n(t);
      function i(r) {
        let { error: e, reset: n } = r;
        return (
          (0, s.useEffect)(() => {
            console.error(e);
          }, [e]),
          (0, o.jsxs)("div", {
            className: c().error,
            children: [
              (0, o.jsx)("h2", { children: "Something went wrong!" }),
              (0, o.jsx)("button", {
                onClick: () => n(),
                children: "Try again",
              }),
            ],
          })
        );
      }
    },
    35318: (r) => {
      r.exports = { colorPrimary: "#eee9ff", error: "Error_error__TCxYr" };
    },
  },
  (r) => {
    var e = (e) => r((r.s = e));
    r.O(0, [689, 441, 517, 358], () => e(191)), (_N_E = r.O());
  },
]);
