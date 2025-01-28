(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [138],
  {
    46189: (e, t, o) => {
      Promise.resolve().then(o.bind(o, 96641)),
        Promise.resolve().then(o.bind(o, 32264)),
        Promise.resolve().then(o.bind(o, 39827)),
        Promise.resolve().then(o.bind(o, 79214)),
        Promise.resolve().then(o.t.bind(o, 19717, 23)),
        Promise.resolve().then(o.t.bind(o, 39349, 23)),
        Promise.resolve().then(o.bind(o, 38400)),
        Promise.resolve().then(o.bind(o, 12093)),
        Promise.resolve().then(o.bind(o, 37117)),
        Promise.resolve().then(o.bind(o, 61848)),
        Promise.resolve().then(o.bind(o, 55902)),
        Promise.resolve().then(o.bind(o, 39165)),
        Promise.resolve().then(o.bind(o, 57826)),
        Promise.resolve().then(o.bind(o, 24786)),
        Promise.resolve().then(o.bind(o, 34405)),
        Promise.resolve().then(o.bind(o, 53623)),
        Promise.resolve().then(o.bind(o, 7046)),
        Promise.resolve().then(o.bind(o, 5191)),
        Promise.resolve().then(o.bind(o, 41912)),
        Promise.resolve().then(o.bind(o, 14686)),
        Promise.resolve().then(o.bind(o, 88442)),
        Promise.resolve().then(o.bind(o, 68943)),
        Promise.resolve().then(o.bind(o, 35675)),
        Promise.resolve().then(o.bind(o, 15288)),
        Promise.resolve().then(o.bind(o, 40512));
    },
    37117: (e, t, o) => {
      "use strict";
      o.d(t, { default: () => s });
      var n = o(95155),
        i = o(5908),
        r = o(5191);
      function s(e) {
        let { children: t } = e;
        return (0, n.jsxs)(i.FH, {
          root: !0,
          options: {
            lerp: 0.036,
            normalizeWheel: !0,
            smoothWheel: !0,
            autoRaf: !0,
          },
          children: [(0, n.jsx)(r.default, {}), t],
        });
      }
    },
    7046: (e, t, o) => {
      "use strict";
      o.d(t, { default: () => f });
      var n = o(95155),
        i = o(94245),
        r = o(90011),
        s = o(96356),
        a = o(44753),
        l = o(76316),
        c = o(68929),
        d = o(19612),
        u = o(98653),
        h = o(2796),
        p = o(12115),
        m = o(5908);
      function f() {
        let { toggleMenu: e, isOpen: t } = (0, c.k)(),
          o = (0, r.A)(),
          f = (function (e) {
            let [t, o] = (0, u.l)();
            return (
              (0, p.useEffect)(() => {
                o(
                  e
                    ? [
                        [
                          "div",
                          { transform: "translateY(0%)", opacity: 1 },
                          { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.2 },
                        ],
                        [
                          "li",
                          {
                            transform: "scale(1)",
                            opacity: 1,
                            filter: "blur(0px)",
                          },
                          { delay: (0, h.y)(0.05), at: "-0.1" },
                        ],
                      ]
                    : [
                        [
                          "li",
                          {
                            transform: "scale(0.5)",
                            opacity: 0,
                            filter: "blur(10px)",
                          },
                          { delay: (0, h.y)(0.05, { from: "last" }), at: "<" },
                        ],
                        [
                          "div",
                          { transform: "translateY(-100%)", opacity: 0 },
                          { at: "-0.1" },
                        ],
                      ]
                );
              }, [e, o]),
              t
            );
          })(t),
          { scrollTo: v, isActive: x } = (0, a.A)(),
          w = (0, s.A)(),
          g = (0, m.xP)(),
          y = w === l.BJ;
        return (0, n.jsx)("div", {
          ref: f,
          className: "scope",
          children: (0, n.jsx)("div", {
            className: "menuMobile",
            children: (0, n.jsx)("ul", {
              className: "ulMobile",
              children: Object.entries(d.A).map((t, r) => {
                let [s, { pathname: a, names: l }] = t;
                return (0, n.jsxs)(
                  "li",
                  {
                    onClick: e,
                    className: x(a) ? "linkActive" : "",
                    children: [
                      (0, n.jsx)("p", { children: r + 1 }),
                      (0, n.jsx)(i.A, {
                        href: a,
                        "data-prevent-nprogress": y,
                        "aria-current": x(a),
                        onClick: (e) => {
                          y
                            ? (e.preventDefault(), v(a))
                            : null == g || g.stop();
                        },
                        children: l[o],
                      }),
                    ],
                  },
                  s
                );
              }),
            }),
          }),
        });
      }
    },
    41912: (e, t, o) => {
      "use strict";
      o.d(t, { default: () => g });
      var n = o(95155);
      let i = (() => {
        if ("undefined" == typeof navigator) return;
        let e = navigator.userAgent;
        return {
          info: e,
          Android: () => e.match(/Android/i),
          BlackBerry: () => e.match(/BlackBerry/i),
          IEMobile: () => e.match(/IEMobile/i),
          iOS: () => e.match(/iPhone|iPad|iPod/i),
          iPad: () =>
            e.match(/Mac/) &&
            navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 2,
          OperaMini: () => e.match(/Opera Mini/i),
          any() {
            return !!(
              this.Android() ||
              this.BlackBerry() ||
              this.iOS() ||
              this.iPad() ||
              this.OperaMini() ||
              this.IEMobile()
            );
          },
        };
      })();
      var r = o(31643),
        s = o(1767),
        a = o(48640),
        l = o.n(a),
        c = o(12115),
        d = o(96356),
        u = o(56783);
      let h = 1 / 60,
        p = new r.P(0, 7, 15),
        m = new r.P(0, 7, -15),
        f = (e) => {
          (0, s.D)((t, o) => {
            let { camera: n } = t;
            if (n && n.fov !== e) {
              let t = Math.min(o, h),
                i = (0, r.G)(n.fov, e, 1.4 * t);
              (n.fov = i), n.updateProjectionMatrix();
            }
          });
        },
        v = (e, t, o, n) => {
          (0, s.D)((i, r) => {
            let { camera: s } = i;
            if (s && o) {
              let o = s.position.distanceTo(e),
                i = m.distanceTo(t);
              if (o > 0.35 || i > 0.35) {
                let o = 2 * Math.min(r, h);
                m.lerp(t, o), s.lookAt(m), s.position.lerp(e, o);
              } else p.set(...s.position.toArray()), n(!1);
            }
          }),
            (0, s.D)((e, t) => {
              let { camera: n } = e;
              if (
                n &&
                !o &&
                !(null == i ? void 0 : i.any()) &&
                document.hasFocus()
              ) {
                let e = Math.min(t, h);
                n.position.lerp(p, 1.4 * e), n.lookAt(m);
              }
            });
        },
        x = (e, t, n, r, s, a) => {
          let { width: h, height: m } = (0, u.A)(),
            x = (0, d.A)(),
            w = (0, c.useRef)(null);
          f(a), v(e, t, n, r);
          let g = (0, c.useCallback)(
            (t) => {
              var o;
              if (
                w.current &&
                (!(null === (o = x.match(/\/project\/.+/)) || void 0 === o
                  ? void 0
                  : o.input) ||
                  document.hasFocus())
              ) {
                let o = t.clientX,
                  n = t.clientY;
                w.current.postMessage({
                  mouseX: o,
                  mouseY: n,
                  width: h,
                  height: m,
                  newPosition: e,
                  rotateMove: s,
                  radius: 12,
                });
              }
            },
            [h, m, e, s, x]
          );
          (0, c.useEffect)(() => {
            if (null == i || !i.any())
              return (
                (w.current = new Worker(o.tu(new URL(o.p + o.u(204), o.b)))),
                (w.current.onmessage = function (e) {
                  let { x: t, y: o, z: n } = e.data;
                  p.set(t, o, n);
                }),
                () => {
                  var e;
                  null === (e = w.current) || void 0 === e || e.terminate();
                }
              );
          }, []),
            (0, c.useEffect)(() => {
              if (null == i ? void 0 : i.any()) return;
              let e = l()(g, 100);
              return (
                window.addEventListener("mousemove", e, { passive: !0 }),
                () => {
                  window.removeEventListener("mousemove", e);
                }
              );
            }, [g]);
        };
      var w = o(45393);
      let g = function (e) {
        let {
          FOV: t,
          newLookAt: o,
          newPosition: i,
          isMoving: r,
          setIsMoving: s,
          rotateMove: a,
        } = e;
        return (
          x(i, o, r, s, a, t),
          (0, n.jsx)(w.u, { makeDefault: !0, position: [-1.6, 5, -15] })
        );
      };
    },
    14686: (e, t, o) => {
      "use strict";
      o.d(t, { default: () => l });
      var n = o(95155),
        i = o(5085),
        r = o(47731),
        s = o(12115);
      let a = [
          { scale: 3, width: 500, height: 100, position: [200, 80, -300] },
          { scale: 5, width: -200, height: 75, position: [-80, 20, -330] },
          { scale: 5, width: -200, height: 75, position: [150, 10, -210] },
          { scale: 5, width: -300, height: 105, position: [-190, 90, -240] },
          {
            scale: 5,
            width: -200,
            height: 75,
            position: [150, 60, 0],
            rotation: [0, -Math.PI / 2, 0],
          },
          {
            scale: 1,
            width: 200,
            height: 75,
            position: [270, 10, -100],
            rotation: [0, -Math.PI / 2, 0],
          },
          {
            scale: 2,
            width: -200,
            height: 75,
            position: [270, 20, 200],
            rotation: [0, -Math.PI / 2, 0],
          },
          {
            scale: 1,
            width: -300,
            height: 75,
            position: [200, 60, 340],
            rotation: [0, -Math.PI / 2, 0],
          },
          {
            scale: 3,
            width: 100,
            height: 35,
            position: [-30, 20, 180],
            rotation: [0, 0, 0],
          },
          {
            scale: 2,
            width: -200,
            height: 65,
            position: [-190, 20, 180],
            rotation: [0, 0, 0],
          },
          {
            scale: 1,
            width: -300,
            height: 105,
            position: [80, -30, 290],
            rotation: [0, 0, 0],
          },
          {
            scale: 1,
            width: -280,
            height: 75,
            position: [-20, 80, 200],
            rotation: [0, 0, 0],
          },
        ],
        l = (0, s.memo)(function (e) {
          let {} = e,
            t = (0, i.zo)("/assets/clouds.webp");
          return (0,
          n.jsxs)(r.X8, { limit: a.length, matrixAutoUpdate: !1, children: [(0, n.jsx)("planeGeometry", {}), (0, n.jsx)("meshBasicMaterial", { attach: "material", map: t, side: 2, transparent: !0, color: "#181d7c", opacity: 0.25 }), a.map((e, t) => (0, n.jsx)("group", { scale: e.scale, children: (0, n.jsx)(r.cw, { position: e.position, rotation: e.rotation || [0,
                        0, 0], scale: [e.width, e.height, 1] }) }, t))] });
        });
    },
    88442: (e, t, o) => {
      "use strict";
      o.d(t, { default: () => u });
      var n = o(95155),
        i = o(31643),
        r = o(5085),
        s = o(1767),
        a = o(12115),
        l = o(80337),
        c = o(18504);
      class d extends c.E {}
      (0, s.e)({ Sea: d });
      let u = function () {
        let e = (0, a.useRef)(void 0),
          t = (0, r.zo)("/maps/water_normal.webp");
        t.wrapS = t.wrapT = l.GJx;
        let o = (0, a.useMemo)(() => new l.bdM(200, 200), []),
          c = (0, a.useMemo)(
            () => ({
              alpha: 0.6,
              textureWidth: 512,
              textureHeight: 512,
              waterNormals: t,
              sunPosition: new i.P(0, 100, 0),
              sunColor: "#d19bfd",
              waterColor: "#7f24ff",
              distortionScale: 14.7,
            }),
            [t]
          );
        return (
          (0, s.D)((t, o) => (e.current.material.uniforms.time.value += o / 3)),
          (0, n.jsx)("sea", {
            ref: e,
            args: [o, c],
            "rotation-x": -Math.PI / 2,
          })
        );
      };
    },
    40512: (e, t, o) => {
      "use strict";
      o.d(t, { default: () => Z });
      var n = o(95155),
        i = o(41912),
        r = o(14686),
        s = o(88442),
        a = o(35675);
      o(68943), o(15288);
      let l = {
          home: {
            newRotateMove: "none",
            newLookAt: { x: -1.6, y: 7, z: -15 },
            newPosition: { x: 0, y: 4, z: 9 },
            newFov: 50,
          },
          about: {
            newRotateMove: "rotTheta",
            newLookAt: { x: -1, y: 6.5, z: 18 },
            newPosition: { x: 0, y: 6.5, z: 0 },
            newFov: 26,
          },
          work: {
            newRotateMove: "rotZ",
            newLookAt: { x: 15, y: 3, z: 0 },
            newPosition: { x: 0, y: 2.5, z: 0 },
            newFov: 55,
          },
          else: {
            newRotateMove: "none",
            newLookAt: { x: -1, y: 68, z: -9 },
            newPosition: { x: 0, y: 4, z: 12 },
            newFov: 50,
          },
        },
        c = {
          home: {
            newRotateMove: "none",
            newLookAt: { x: -1.5, y: 5.9, z: -15 },
            newPosition: { x: 0, y: 4.5, z: 9 },
            newFov: 35,
          },
          about: {
            newRotateMove: "rotTheta",
            newLookAt: { x: -3, y: 7, z: 18 },
            newPosition: { x: 0, y: 6.5, z: -4 },
            newFov: 15,
          },
          work: {
            newRotateMove: "rotZ",
            newLookAt: { x: 20, y: 5.5, z: 0 },
            newPosition: { x: 0, y: 5.5, z: 0 },
            newFov: 42,
          },
          else: {
            newRotateMove: "none",
            newLookAt: { x: -1, y: 68, z: -9 },
            newPosition: { x: 0, y: 4, z: 12 },
            newFov: 35,
          },
        };
      var d = o(80461),
        u = o(9696),
        h = o(31643),
        p = o(12115),
        m = o(56783);
      let f = new h.P(-1.6, 7, -15),
        v = new h.P(0, 4, 9);
      var x = o(96356),
        w = o(89130),
        g = o(47731);
      let y = [
        { position: [-16, -5, -11], rotation: [2, -0.3, 0.4], scale: 0.9 },
        { position: [-6, -8, -5], rotation: [2.1, -0.2, 0], scale: 1 },
        {
          position: [14, -8, -33],
          rotation: [Math.PI / 2, 0.3, 0.7],
          scale: 1,
        },
        {
          position: [-14, -8, -33],
          rotation: [Math.PI / 2, 0.3, 0.3],
          scale: 1,
        },
        { position: [8, -4, -7], rotation: [Math.PI / 2, 0, 0.9], scale: 1 },
        { position: [35, -7, -15], rotation: [Math.PI / 2, 0.6, -2], scale: 1 },
        { position: [18, -8, 8.5], rotation: [Math.PI / 2, 0, -2], scale: 1 },
        {
          position: [26, -6, 38],
          rotation: [Math.PI / 2, 0.2, -2],
          scale: 1.5,
        },
        { position: [-12, -6, 30], rotation: [Math.PI / 2, 0.2, -2], scale: 1 },
        {
          position: [-13, -6, 20],
          rotation: [Math.PI / 2, -0.2, -1],
          scale: 1.3,
        },
        {
          position: [15, -6, 48],
          rotation: [Math.PI / 2, -0.8, -2.4],
          scale: 1.4,
        },
        {
          position: [10, -9, 18],
          rotation: [Math.PI / 2, -0.2, -0.4],
          scale: 1,
        },
      ];
      function b(e) {
        let { nodes: t } = (0, w.p)("/gltf/palm.glb");
        return (0, n.jsx)("group", {
          ...e,
          dispose: null,
          children: (0, n.jsxs)(g.X8, {
            geometry: t.Howea_f__A001.geometry,
            limit: y.length,
            range: y.length,
            matrixAutoUpdate: !1,
            children: [
              y.map((e, t) =>
                (0, n.jsx)(
                  g.cw,
                  {
                    position: e.position,
                    rotation: e.rotation,
                    scale: e.scale,
                  },
                  t
                )
              ),
              (0, n.jsx)("meshLambertMaterial", { color: "hsl(180, 9%, 51%)" }),
            ],
          }),
        });
      }
      w.p.preload("/gltf/palm.glb");
      var j = o(57579);
      function P(e) {
        return (0, n.jsxs)("mesh", {
          position: e,
          children: [
            (0, n.jsx)("sphereGeometry", { args: [0.9, 4, 4] }),
            (0, j.b)(),
          ],
        });
      }
      let M = "/gltf/david.glb";
      w.p.preload(M);
      let T = function () {
          let { nodes: e } = (0, w.p)(M);
          return (0, n.jsxs)("group", {
            position: [0, 0, -15],
            dispose: null,
            children: [
              (0, n.jsx)("mesh", {
                geometry: e.david.geometry,
                matrixAutoUpdate: !1,
                children: j.A,
              }),
              P([-2.3, 1.9, 0.25]),
              P([0.3, 3.5, 0.2]),
              (0, n.jsxs)("mesh", {
                position: [-1.9, 4, -2],
                rotation: [1.2, -2.75, 0],
                children: [
                  (0, n.jsx)("ringGeometry", { args: [6.4, 6.3, 62] }),
                  (0, j.b)(),
                ],
              }),
            ],
          });
        },
        E = "/gltf/hand.glb";
      function A(e) {
        let { nodes: t } = (0, w.p)(E);
        return (0, n.jsxs)("group", {
          ...e,
          dispose: null,
          children: [
            (0, n.jsx)("mesh", {
              position: [22, 0, 2.5],
              scale: [10, -10, 10],
              rotation: [0, -Math.PI / 2, 0],
              geometry: t["FreeF&M001"].geometry,
              children: j.A,
            }),
            (0, n.jsx)("mesh", {
              position: [22, 0, -2.5],
              scale: [10, -10, -10],
              rotation: [0, Math.PI / 2, 0],
              geometry: t["FreeF&M001"].geometry,
              children: j.A,
            }),
          ],
        });
      }
      w.p.preload(E);
      var k = o(1767),
        z = o(80337);
      let C = {
        oldTexture: null,
        currentTexture: null,
        textureCache: {},
        dissolveFactor: 0,
      };
      function S(e, t) {
        switch (t.type) {
          case "SET_OLD_TEXTURE":
            return { ...e, oldTexture: t.payload };
          case "SET_CURRENT_TEXTURE":
            return { ...e, currentTexture: t.payload };
          case "CACHE_TEXTURE":
            return {
              ...e,
              textureCache: {
                ...e.textureCache,
                [t.payload.url]: t.payload.texture,
              },
            };
          case "SET_DISSOLVE_FACTOR":
            return { ...e, dissolveFactor: t.payload };
          default:
            return e;
        }
      }
      var F = o(21665);
      let R = (0, o(54206).b)(
        {
          time: 0,
          blueTintFactor: 2,
          oldTextureVar: null,
          newTextureVar: null,
          dissolveFactor: null,
          transparent: !0,
        },
        "\n        varying vec2 vUv;\n        void main() {\n          vUv = uv;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n      ",
        '\n  uniform sampler2D oldTextureVar;\n  uniform sampler2D newTextureVar;\n  uniform float dissolveFactor;\n  uniform float blueTintFactor;\n  uniform float time; \n  varying vec2 vUv;\n\n  void main() {\n      vec4 color2 = texture2D(newTextureVar, vUv);\n      \n      if (color2.a == 0.0) {\n          discard;\n      }\n      \n      // Calculate distance to center\n      vec2 center = vec2(0.5);\n      float distanceToCenter = distance(vUv, center);\n\n      // Create radial transition\n      float transitionEdge = dissolveFactor * 1.4142; // sqrt(2) to cover corners\n      float transition = smoothstep(transitionEdge - 0.3, transitionEdge + 0.3, distanceToCenter);\n      \n      // Create gradient for borders to be smoother\n      float gradient = 1.0 - smoothstep(0.3, 0.5, distanceToCenter);\n      \n      // Coordinates distortion for a "portal" effect\n      float distortion = sin(distanceToCenter * 10.0 + time) * 0.1;\n      vec2 distortedUV = vUv + distortion * (vUv - center);\n      \n      // Get colors from old and new with the distorted UV \n      vec4 color1 = texture2D(oldTextureVar, distortedUV);\n      color2 = texture2D(newTextureVar, distortedUV);\n      \n      // Apply gradient to the colors alpha\n      color1.a *= gradient;\n      color2.a *= gradient;\n\n      // Apply blue tint to the colors\n      color1.b *= blueTintFactor;\n      color2.b *= blueTintFactor;\n\n      // Mix between old and new texture based on transition\n      vec4 finalColor = mix(color2, color1, transition);\n\n      gl_FragColor = finalColor;\n  }\n  '
      );
      (0, k.e)({ TextureMaterial: R });
      let U = function (e) {
          let { activeProject: t } = (0, F.A)(),
            o = (0, p.useMemo)(() => new R(), []);
          return (
            !(function (e) {
              let t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : "/",
                [o, n] = (0, p.useState)(0),
                [{ currentTexture: i, oldTexture: r, textureCache: s }, a] = (0,
                p.useReducer)(S, C);
              (0, p.useEffect)(() => {
                "/" !== t &&
                  (i && a({ type: "SET_OLD_TEXTURE", payload: i }),
                  s[t]
                    ? a({ type: "SET_CURRENT_TEXTURE", payload: s[t] })
                    : new z.Tap().load(t, (e) => {
                        a({
                          type: "CACHE_TEXTURE",
                          payload: { url: t, texture: e },
                        }),
                          a({ type: "SET_CURRENT_TEXTURE", payload: e });
                      }),
                  n(0));
              }, [t]),
                (0, p.useEffect)(() => {
                  (e.uniforms.oldTextureVar.value = r),
                    (e.uniforms.newTextureVar.value = i),
                    (e.uniforms.dissolveFactor.value = o);
                }, [i, r, o]),
                (0, k.D)((t, i) => {
                  o < 1 && n(o + 0.9 * i),
                    (e.uniforms.time.value = 0.002 * performance.now());
                });
            })(o, t.imageLink),
            (0, n.jsxs)("group", {
              ...e,
              children: [
                (0, n.jsxs)("group", {
                  children: [
                    (0, n.jsxs)("mesh", {
                      matrixAutoUpdate: !1,
                      children: [
                        (0, n.jsx)("ringGeometry", { args: [3, 3.08, 62] }),
                        (0, j.b)(t.color || "white"),
                      ],
                    }),
                    (0, n.jsxs)("mesh", {
                      position: [-4, -4.5, -1],
                      rotation: [-1, 0.9, -0.4],
                      children: [
                        (0, n.jsx)("circleGeometry", { args: [0.8, 4, 0] }),
                        (0, j.b)(t.color || "white"),
                      ],
                    }),
                    (0, n.jsxs)("mesh", {
                      position: [4, -4.5, -1],
                      rotation: [-1, -0.9, 0.4],
                      children: [
                        (0, n.jsx)("circleGeometry", { args: [0.8, 4, 0] }),
                        (0, j.b)(t.color || "white"),
                      ],
                    }),
                  ],
                }),
                (0, n.jsx)("mesh", {
                  position: [0, 0, -0.1],
                  material: o,
                  children: (0, n.jsx)("circleGeometry", { args: [3.08, 32] }),
                }),
              ],
            })
          );
        },
        I = function (e) {
          let t = (0, p.useRef)(null);
          return (
            (0, p.useEffect)(() => {
              t.current.updateMatrix();
            }, []),
            (0, n.jsxs)("group", {
              ...e,
              ref: t,
              matrixAutoUpdate: !1,
              children: [
                (0, n.jsxs)("mesh", {
                  rotation: [Math.PI / 4, 0, 0],
                  position: [3, 5.5, 0.5],
                  children: [
                    (0, n.jsx)("torusGeometry", { args: [7, 0.025, 30, 60] }),
                    (0, j.b)(),
                  ],
                }),
                (0, n.jsxs)("mesh", {
                  rotation: [-Math.PI / 4, 0, 0],
                  position: [3, 5.5, 0.5],
                  children: [
                    (0, n.jsx)("torusGeometry", { args: [6.9, 0.025, 30, 60] }),
                    (0, j.b)(),
                  ],
                }),
              ],
            })
          );
        },
        _ = "/gltf/man.glb",
        L = function (e) {
          let { nodes: t } = (0, w.p)(_),
            o = (0, p.useRef)(null);
          return (
            (0, p.useEffect)(() => {
              o.current && o.current.updateMatrix();
            }, []),
            (0, n.jsxs)("group", {
              ...e,
              ref: o,
              matrixAutoUpdate: !1,
              children: [
                (0, n.jsxs)("mesh", {
                  position: [2.7, 6.5, -1.7],
                  rotation: [0, 2, 0],
                  children: [
                    (0, n.jsx)("torusKnotGeometry", {
                      args: [0.35, 0.19, 150, 2, 1, 30],
                    }),
                    (0, n.jsx)("meshStandardMaterial", {
                      color: "#d9a1d9",
                      roughness: 0.1,
                      metalness: 0.3,
                    }),
                  ],
                }),
                (0, n.jsx)("mesh", {
                  geometry: t.man.geometry,
                  position: [0, 2, 0],
                  rotation: [Math.PI / 2, -0.2, -2.4],
                  scale: 0.09,
                  children: j.A,
                }),
              ],
            })
          );
        };
      w.p.preload(_), o(99313);
      var D = o(27490),
        V = o(74310),
        G = o(46536),
        O = o(31333);
      let N = function () {
          return (0, n.jsxs)(n.Fragment, {
            children: [
              (0, n.jsx)("ambientLight", { intensity: 3, color: "#be98fb" }),
              (0, n.jsx)("directionalLight", {
                color: "#db0054",
                position: [10, 1, -1],
                intensity: 0.5,
              }),
              (0, n.jsx)("spotLight", {
                color: "#ed24ff",
                position: [0, 20, 0],
                intensity: 500,
                angle: 20,
                penumbra: 0,
              }),
              (0, n.jsx)("spotLight", {
                color: "#42adfa",
                position: [-30, -8, 0],
                intensity: 800,
                angle: 90,
                penumbra: 0,
              }),
              (0, n.jsx)(s.default, {}),
              (0, n.jsx)(r.default, {}),
              (0, n.jsx)(b, {}),
              (0, n.jsx)(D.A, {
                radius: 80,
                depth: 100,
                count: 2e3,
                factor: 4,
                saturation: 0,
                speed: 2,
              }),
              (0, n.jsx)(V.OH, {
                resolution: 24,
                children: (0, n.jsx)("mesh", {
                  scale: 125,
                  children: (0, n.jsx)(G.az, {
                    children: (0, n.jsx)("meshBasicMaterial", {
                      side: 1,
                      children: (0, n.jsx)(O.M, {
                        stops: [0.1, 0.3, 0.6, 0.9],
                        colors: ["#a6acf7", "#181867", "#9f20df", "#221c57"],
                      }),
                    }),
                  }),
                }),
              }),
            ],
          });
        },
        B = function () {
          return (0, n.jsxs)("group", {
            position: [0, 1, 25],
            rotation: [0, Math.PI / 2, 0],
            children: [
              (0, n.jsx)(L, { position: [0, -0.3, 2], rotation: [0, 0, -0.2] }),
              (0, n.jsx)(I, { rotation: [-0.2, -0.15, -0.1] }),
            ],
          });
        },
        H = function () {
          return (0, n.jsxs)(n.Fragment, {
            children: [
              (0, n.jsx)(U, {
                position: [20, 8, 0],
                rotation: [0, -Math.PI / 2, 0],
              }),
              (0, n.jsx)(A, {}),
            ],
          });
        };
      var X = o(51373),
        W = o(64458),
        q = o(10893),
        K = o(40635),
        Y = o(93721);
      let J = (0, o(77711).default)(
        () => Promise.resolve().then(o.bind(o, 99313)),
        { loadableGenerated: { webpack: () => [99313] }, ssr: !1 }
      );
      function Z() {
        let {
            dpr: e,
            setDpr: t,
            width: o,
            height: r,
            handleDecline: s,
            handleIncline: h,
          } = (function (e) {
            let t = (0, p.useMemo)(() => window.devicePixelRatio, [1.5]),
              { width: o, height: n } = (0, m.A)(),
              i = (0, p.useRef)(e),
              [r, s] = (0, p.useState)(Math.min(t, i.current)),
              a = (0, p.useCallback)(() => {
                s(Math.min(t, i.current));
              }, [i, t]),
              l = (0, p.useCallback)(() => {
                s(0.8);
              }, []);
            return {
              setDpr: s,
              dpr: r,
              width: o,
              height: n,
              handleIncline: a,
              handleDecline: l,
            };
          })(1.5),
          w = (0, x.A)(),
          {
            rotateMove: g,
            isMoving: y,
            setIsMoving: b,
            FOV: j,
            lookAt: P,
            camPosition: M,
          } = (function (e, t, o) {
            let { domUtils: n } = (0, d.A)(),
              [i, r] = (0, p.useState)("none"),
              [s, a] = (0, p.useState)(!1),
              [u, h] = (0, p.useState)(40),
              m = (0, p.useCallback)(() => {
                var t;
                switch (e) {
                  case "/":
                    return n;
                  case null === (t = e.match(/\/project\/.+/)) || void 0 === t
                    ? void 0
                    : t.input:
                    return "work";
                  default:
                    return "else";
                }
              }, [n, e]),
              x = (0, p.useCallback)(() => {
                let {
                  newLookAt: e,
                  newPosition: i,
                  newFov: s,
                  newRotateMove: d,
                } = (function (e, t, o) {
                  let n = e <= 692 || e < t ? l : c,
                    i = n.hasOwnProperty(o) ? o : "else";
                  return { ...n[i] };
                })(t, o, "contact" === n ? "work" : m());
                r(d), h(s);
                let { x: u, y: p, z: x } = e,
                  { x: w, y: g, z: y } = i;
                f.set(u, p, x), v.set(w, g, y), a(!0);
              }, [t, o, m, n]);
            return (
              (0, p.useEffect)(() => {
                x();
              }, [x]),
              {
                rotateMove: i,
                isMoving: s,
                setIsMoving: a,
                FOV: u,
                lookAt: f,
                camPosition: v,
              }
            );
          })(w, o, r),
          { progress: E } = (0, X.p)();
        !(function (e, t) {
          let { setProgress: o, setLoadingComplete: n } = (0, u.A)();
          (0, p.useEffect)(() => {
            o(e);
          }, [e, o]),
            (0, p.useEffect)(() => {
              let o;
              return (
                e >= 100 &&
                  !t &&
                  (o = setTimeout(() => {
                    n(!0);
                  }, 500)),
                () => {
                  clearTimeout(o);
                }
              );
            }, [e, n, t]);
        })(E, y);
        let A = (0, p.useMemo)(() => {
          var e;
          return (
            null === (e = w.match(/\/project\/.+/)) || void 0 === e
              ? void 0
              : e.input
          )
            ? 0
            : 1;
        }, [w]);
        return (0, n.jsx)("div", {
          className: "canvasWrapper",
          style: { opacity: A },
          children: (0, n.jsxs)(Y.Hl, {
            linear: !0,
            shadows: !1,
            gl: { antialias: !1, alpha: !1, stencil: !1, depth: !1 },
            onCreated: (e) => {
              let { gl: t } = e;
              t.setClearColor(0xffffff, 0), (t.autoClear = !1), t.clearDepth();
            },
            dpr: e,
            children: [
              (0, n.jsx)(W.r, {
                bounds: (e) => (e > 90 ? [85, 115] : [30, 59]),
                onIncline: h,
                onDecline: s,
                flipflops: 3,
                onFallback: () => t(1),
              }),
              (0, n.jsx)(q.Q, {}),
              (0, n.jsx)(K.M, {}),
              (0, n.jsx)(a.default, { multisampling: 0, resolutionScale: 1 }),
              (0, n.jsxs)(p.Suspense, {
                fallback: null,
                children: [
                  (0, n.jsx)(i.default, {
                    FOV: j,
                    newLookAt: P,
                    newPosition: M,
                    isMoving: y,
                    setIsMoving: b,
                    rotateMove: g,
                  }),
                  (0, n.jsx)(N, {}),
                  (0, n.jsx)(B, {}),
                  (0, n.jsx)(T, {}),
                  (0, n.jsx)(H, {}),
                  (0, n.jsx)(J, {}),
                ],
              }),
            ],
          }),
        });
      }
    },
    68943: (e, t, o) => {
      "use strict";
      o.d(t, { default: () => r });
      var n = o(12376),
        i = o(32557);
      let r = (0, n.A)(i.bv, { blendFunction: i.cf.ADD });
    },
    35675: (e, t, o) => {
      "use strict";
      o.d(t, { default: () => d });
      var n = o(1767),
        i = o(32557),
        r = o(12115),
        s = o(80337);
      let a = {
          luminanceThreshold: 0.55,
          luminanceSmoothing: 0.9,
          height: 300,
          opacity: 1,
        },
        l = { darkness: 0.75, offset: 0.1 },
        c = (0, r.forwardRef)((e, t) => {
          let {
              enabled: o = !0,
              multisampling: c = 4,
              resolutionScale: d = 1,
            } = e,
            { gl: u, scene: h, camera: p, size: m } = (0, n.C)(),
            [f] = (0, r.useState)(() => {
              let e = new i.s0(u, { multisampling: c, frameBufferType: s.ix0 });
              return e.setSize(m.width * d, m.height * d), e;
            });
          return (
            (0, r.useLayoutEffect)(() => {
              f.setSize(m.width * d, m.height * d);
            }, [f, m, d]),
            (0, r.useEffect)(() => {
              let e = new i.AH(h, p),
                t = new i.bv(a),
                o = new i.K1(l);
              return (
                f.addPass(e),
                f.addPass(new i.Vu(p, t, o)),
                () => {
                  f.removeAllPasses();
                }
              );
            }, [f, h, p]),
            (0, n.D)((e, t) => {
              o && f.render(t);
            }, 1),
            null
          );
        });
      c.displayName = "EffectComposer";
      let d = c;
    },
    15288: (e, t, o) => {
      "use strict";
      o.d(t, { default: () => i });
      var n = o(32557);
      let i = (0, o(12376).A)(n.K1, { technique: n.TU.DEFAULT });
    },
    56783: (e, t, o) => {
      "use strict";
      o.d(t, { A: () => i });
      var n = o(12115);
      let i = () => {
        let [e, t] = (0, n.useState)({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        return (
          (0, n.useEffect)(() => {
            let e = () => {
              t({ width: window.innerWidth, height: window.innerHeight });
            };
            return (
              window.addEventListener("resize", e),
              () => {
                window.removeEventListener("resize", e);
              }
            );
          }, []),
          e
        );
      };
    },
    57579: (e, t, o) => {
      "use strict";
      o.d(t, { A: () => i, b: () => r });
      var n = o(95155);
      let i = (0, n.jsx)("meshStandardMaterial", {
          attach: "material",
          color: "hsl(236, 9%, 63%)",
          roughness: 0.35,
          metalness: 0.8,
        }),
        r = function () {
          let e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : "#ff80bf";
          return (0, n.jsx)("meshStandardMaterial", {
            attach: "material",
            toneMapped: !1,
            color: "white",
            emissive: e,
            emissiveIntensity: 3,
          });
        };
    },
    99313: (e, t, o) => {
      "use strict";
      o.r(t), o.d(t, { default: () => a });
      var n = o(95155),
        i = o(57579),
        r = o(687),
        s = o(4454);
      function a() {
        return (0, n.jsx)("group", {
          position: [-1, 68, -6.5],
          dispose: null,
          children: (0, n.jsxs)(r.o, {
            children: [
              (0, n.jsxs)(s.x, {
                size: 15,
                curveSegments: 15,
                position: [-1.2, 3, -1],
                bevelEnabled: !0,
                bevelSize: 0.7,
                bevelThickness: 5,
                rotation: [1.2, 0, -0.02],
                font: "/fonts/syne.json",
                letterSpacing: -1,
                children: ["404", (0, i.b)()],
              }),
              (0, n.jsxs)(s.x, {
                size: 14,
                curveSegments: 15,
                bevelEnabled: !0,
                bevelSize: 0.7,
                bevelThickness: 5,
                rotation: [1.2, 0, -0.02],
                font: "/fonts/syne.json",
                letterSpacing: -1,
                children: ["404", i.A],
              }),
            ],
          }),
        });
      }
    },
    12376: (e, t, o) => {
      "use strict";
      o.d(t, { A: () => l });
      var n = o(95155),
        i = o(1767),
        r = o(12115);
      let s = 0,
        a = new WeakMap(),
        l = (e, t) =>
          (0, r.forwardRef)(function (o, l) {
            var c, d;
            let {
                blendFunction: u = null == t ? void 0 : t.blendFunction,
                opacity: h = null == t ? void 0 : t.opacity,
                ...p
              } = o,
              m = a.get(e);
            if (!m) {
              let t = "@react-three/postprocessing/"
                .concat(e.name, "-")
                .concat(s++);
              (0, i.e)({ [t]: e }), a.set(e, (m = t));
            }
            let f = (0, i.C)((e) => e.camera),
              v = { ...t, ...p },
              x =
                null !== (c = null == t ? void 0 : t.args) && void 0 !== c
                  ? c
                  : [],
              w = null !== (d = p.args) && void 0 !== d ? d : [v],
              g = (0, r.useMemo)(() => [...x, ...w], [x, w]);
            return (0,
            n.jsx)(m, { camera: f, "blendMode-blendFunction": u, "blendMode-opacity-value": h, ...p, ref: l, args: g });
          });
    },
    31643: (e, t, o) => {
      "use strict";
      function n(e, t, o) {
        return (1 - o) * e + o * t;
      }
      o.d(t, { G: () => n, P: () => i });
      class i {
        set(e, t, o) {
          return (
            void 0 === o && (o = this.z),
            (this.x = e),
            (this.y = t),
            (this.z = o),
            this
          );
        }
        distanceTo(e) {
          return Math.sqrt(this.distanceToSquared(e));
        }
        distanceToSquared(e) {
          let t = this.x - e.x,
            o = this.y - e.y,
            n = this.z - e.z;
          return t * t + o * o + n * n;
        }
        copy(e) {
          return (this.x = e.x), (this.y = e.y), (this.z = e.z), this;
        }
        lerp(e, t) {
          return (
            (this.x += (e.x - this.x) * t),
            (this.y += (e.y - this.y) * t),
            (this.z += (e.z - this.z) * t),
            this
          );
        }
        *[Symbol.iterator]() {
          yield this.x, yield this.y, yield this.z;
        }
        constructor(e = 0, t = 0, o = 0) {
          (this.isVector3 = !0),
            (i.prototype.isVector3 = !0),
            (this.x = e),
            (this.y = t),
            (this.z = o);
        }
      }
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(
      0,
      [288, 548, 367, 831, 664, 413, 554, 439, 82, 513, 460, 441, 517, 358],
      () => t(46189)
    ),
      (_N_E = e.O());
  },
]);
