(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [513],
  {
    10893: (e, t, r) => {
      "use strict";
      r.d(t, { Q: () => a });
      var n = r(12115),
        i = r(1767);
      function a() {
        let e = (0, i.C)((e) => e.get),
          t = (0, i.C)((e) => e.setEvents),
          r = (0, i.C)((e) => e.performance.current);
        return (
          n.useEffect(() => {
            let r = e().events.enabled;
            return () => t({ enabled: r });
          }, []),
          n.useEffect(() => t({ enabled: 1 === r }), [r]),
          null
        );
      }
    },
    687: (e, t, r) => {
      "use strict";
      r.d(t, { o: () => o });
      var n = r(85407),
        i = r(80337),
        a = r(12115);
      let o = a.forwardRef(function (
        {
          children: e,
          disable: t,
          disableX: r,
          disableY: o,
          disableZ: s,
          left: l,
          right: u,
          top: c,
          bottom: d,
          front: f,
          back: A,
          onCentered: h,
          precise: p = !0,
          cacheKey: m = 0,
          ...B
        },
        C
      ) {
        let g = a.useRef(null),
          v = a.useRef(null),
          b = a.useRef(null);
        return (
          a.useLayoutEffect(() => {
            v.current.matrixWorld.identity();
            let e = new i.NRn().setFromObject(b.current, p),
              n = new i.Pq0(),
              a = new i.iyt(),
              m = e.max.x - e.min.x,
              B = e.max.y - e.min.y,
              C = e.max.z - e.min.z;
            e.getCenter(n), e.getBoundingSphere(a);
            let y = c ? B / 2 : d ? -B / 2 : 0,
              E = l ? -m / 2 : u ? m / 2 : 0,
              M = f ? C / 2 : A ? -C / 2 : 0;
            v.current.position.set(
              t || r ? 0 : -n.x + E,
              t || o ? 0 : -n.y + y,
              t || s ? 0 : -n.z + M
            ),
              void 0 !== h &&
                h({
                  parent: g.current.parent,
                  container: g.current,
                  width: m,
                  height: B,
                  depth: C,
                  boundingBox: e,
                  boundingSphere: a,
                  center: n,
                  verticalAlignment: y,
                  horizontalAlignment: E,
                  depthAlignment: M,
                });
          }, [m, h, c, l, f, t, r, o, s, p, u, d, A]),
          a.useImperativeHandle(C, () => g.current, []),
          a.createElement(
            "group",
            (0, n.A)({ ref: g }, B),
            a.createElement(
              "group",
              { ref: v },
              a.createElement("group", { ref: b }, e)
            )
          )
        );
      });
    },
    74310: (e, t, r) => {
      "use strict";
      let n;
      r.d(t, { OH: () => eZ });
      var i = r(85407),
        a = r(12115),
        o = r(1767),
        s = r(80337),
        l = r(14104);
      let u = (e) => e && e.isCubeTexture;
      class c extends s.eaF {
        constructor(e, t) {
          var r, n;
          let i = u(e),
            a = Math.floor(
              Math.log2(
                (null !=
                (n = i
                  ? null == (r = e.image[0])
                    ? void 0
                    : r.width
                  : e.image.width)
                  ? n
                  : 1024) / 4
              )
            ),
            o = Math.pow(2, a),
            c = 3 * Math.max(o, 112),
            d = `
        varying vec3 vWorldPosition;
        void main() 
        {
            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `,
            f =
              [
                i ? "#define ENVMAP_TYPE_CUBE" : "",
                `#define CUBEUV_TEXEL_WIDTH ${1 / c}`,
                `#define CUBEUV_TEXEL_HEIGHT ${1 / (4 * o)}`,
                `#define CUBEUV_MAX_MIP ${a}.0`,
              ].join("\n") +
              `
        #define ENVMAP_TYPE_CUBE_UV
        varying vec3 vWorldPosition;
        uniform float radius;
        uniform float height;
        uniform float angle;
        #ifdef ENVMAP_TYPE_CUBE
            uniform samplerCube map;
        #else
            uniform sampler2D map;
        #endif
        // From: https://www.shadertoy.com/view/4tsBD7
        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
        {
            float d = dot ( rd, n );
            
            if( d > 0.0 ) { return 1e6; }
            
            vec3  o = ro - c;
            float t = - dot( n, o ) / d;
            vec3  q = o + rd * t;
            
            return ( dot( q, q ) < r * r ) ? t : 1e6;
        }
        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) 
        {
            vec3 oc = ro - ce;
            float b = dot( oc, rd );
            float c = dot( oc, oc ) - ra * ra;
            float h = b * b - c;
            
            if( h < 0.0 ) { return -1.0; }
            
            h = sqrt( h );
            
            return - b + h;
        }
        vec3 project() 
        {
            vec3 p = normalize( vWorldPosition );
            vec3 camPos = cameraPosition;
            camPos.y -= height;
            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
            if( intersection > 0.0 ) {
                
                vec3 h = vec3( 0.0, - height, 0.0 );
                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;
            } else {
                p = vec3( 0.0, 1.0, 0.0 );
            }
            return p;
        }
        #include <common>
        #include <cube_uv_reflection_fragment>
        void main() 
        {
            vec3 projectedWorldPosition = project();
            
            #ifdef ENVMAP_TYPE_CUBE
                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;
            #else
                vec3 direction = normalize( projectedWorldPosition );
                vec2 uv = equirectUv( direction );
                vec3 outcolor = texture2D( map, uv ).rgb;
            #endif
            gl_FragColor = vec4( outcolor, 1.0 );
            #include <tonemapping_fragment>
            #include <${
              l.r >= 154 ? "colorspace_fragment" : "encodings_fragment"
            }>
        }
        `;
          super(
            new s.WBB(1, 16),
            new s.BKk({
              uniforms: {
                map: { value: e },
                height: { value: (null == t ? void 0 : t.height) || 15 },
                radius: { value: (null == t ? void 0 : t.radius) || 100 },
              },
              fragmentShader: f,
              vertexShader: d,
              side: s.$EB,
            })
          );
        }
        set radius(e) {
          this.material.uniforms.radius.value = e;
        }
        get radius() {
          return this.material.uniforms.radius.value;
        }
        set height(e) {
          this.material.uniforms.height.value = e;
        }
        get height() {
          return this.material.uniforms.height.value;
        }
      }
      class d extends s.BRH {
        constructor(e) {
          super(e), (this.type = s.ix0);
        }
        parse(e) {
          let t, r, n;
          let i = function (e, t) {
              switch (e) {
                case 1:
                  throw Error("THREE.RGBELoader: Read Error: " + (t || ""));
                case 2:
                  throw Error("THREE.RGBELoader: Write Error: " + (t || ""));
                case 3:
                  throw Error(
                    "THREE.RGBELoader: Bad File Format: " + (t || "")
                  );
                default:
                  throw Error("THREE.RGBELoader: Memory Error: " + (t || ""));
              }
            },
            a = function (e, t, r) {
              t = t || 1024;
              let n = e.pos,
                i = -1,
                a = 0,
                o = "",
                s = String.fromCharCode.apply(
                  null,
                  new Uint16Array(e.subarray(n, n + 128))
                );
              for (; 0 > (i = s.indexOf("\n")) && a < t && n < e.byteLength; )
                (o += s),
                  (a += s.length),
                  (n += 128),
                  (s += String.fromCharCode.apply(
                    null,
                    new Uint16Array(e.subarray(n, n + 128))
                  ));
              return (
                -1 < i && (!1 !== r && (e.pos += a + i + 1), o + s.slice(0, i))
              );
            },
            o = new Uint8Array(e);
          o.pos = 0;
          let l = (function (e) {
              let t, r;
              let n = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,
                o = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,
                s = /^\s*FORMAT=(\S+)\s*$/,
                l = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,
                u = {
                  valid: 0,
                  string: "",
                  comments: "",
                  programtype: "RGBE",
                  format: "",
                  gamma: 1,
                  exposure: 1,
                  width: 0,
                  height: 0,
                };
              for (
                (!(e.pos >= e.byteLength) && (t = a(e))) ||
                  i(1, "no header found"),
                  (r = t.match(/^#\?(\S+)/)) || i(3, "bad initial token"),
                  u.valid |= 1,
                  u.programtype = r[1],
                  u.string += t + "\n";
                !1 !== (t = a(e));

              ) {
                if (((u.string += t + "\n"), "#" === t.charAt(0))) {
                  u.comments += t + "\n";
                  continue;
                }
                if (
                  ((r = t.match(n)) && (u.gamma = parseFloat(r[1])),
                  (r = t.match(o)) && (u.exposure = parseFloat(r[1])),
                  (r = t.match(s)) && ((u.valid |= 2), (u.format = r[1])),
                  (r = t.match(l)) &&
                    ((u.valid |= 4),
                    (u.height = parseInt(r[1], 10)),
                    (u.width = parseInt(r[2], 10))),
                  2 & u.valid && 4 & u.valid)
                )
                  break;
              }
              return (
                2 & u.valid || i(3, "missing format specifier"),
                4 & u.valid || i(3, "missing image size specifier"),
                u
              );
            })(o),
            u = l.width,
            c = l.height,
            d = (function (e, t, r) {
              if (t < 8 || t > 32767 || 2 !== e[0] || 2 !== e[1] || 128 & e[2])
                return new Uint8Array(e);
              t !== ((e[2] << 8) | e[3]) && i(3, "wrong scanline width");
              let n = new Uint8Array(4 * t * r);
              n.length || i(4, "unable to allocate buffer space");
              let a = 0,
                o = 0,
                s = 4 * t,
                l = new Uint8Array(4),
                u = new Uint8Array(s),
                c = r;
              for (; c > 0 && o < e.byteLength; ) {
                o + 4 > e.byteLength && i(1),
                  (l[0] = e[o++]),
                  (l[1] = e[o++]),
                  (l[2] = e[o++]),
                  (l[3] = e[o++]),
                  (2 != l[0] || 2 != l[1] || ((l[2] << 8) | l[3]) != t) &&
                    i(3, "bad rgbe scanline format");
                let r = 0,
                  d;
                for (; r < s && o < e.byteLength; ) {
                  let t = (d = e[o++]) > 128;
                  if (
                    (t && (d -= 128),
                    (0 === d || r + d > s) && i(3, "bad scanline data"),
                    t)
                  ) {
                    let t = e[o++];
                    for (let e = 0; e < d; e++) u[r++] = t;
                  } else u.set(e.subarray(o, o + d), r), (r += d), (o += d);
                }
                for (let e = 0; e < t; e++) {
                  let r = 0;
                  (n[a] = u[e + r]),
                    (r += t),
                    (n[a + 1] = u[e + r]),
                    (r += t),
                    (n[a + 2] = u[e + r]),
                    (r += t),
                    (n[a + 3] = u[e + r]),
                    (a += 4);
                }
                c--;
              }
              return n;
            })(o.subarray(o.pos), u, c);
          switch (this.type) {
            case s.RQf:
              let f = new Float32Array(4 * (n = d.length / 4));
              for (let e = 0; e < n; e++)
                !(function (e, t, r, n) {
                  let i = Math.pow(2, e[t + 3] - 128) / 255;
                  (r[n + 0] = e[t + 0] * i),
                    (r[n + 1] = e[t + 1] * i),
                    (r[n + 2] = e[t + 2] * i),
                    (r[n + 3] = 1);
                })(d, 4 * e, f, 4 * e);
              (t = f), (r = s.RQf);
              break;
            case s.ix0:
              let A = new Uint16Array(4 * (n = d.length / 4));
              for (let e = 0; e < n; e++)
                !(function (e, t, r, n) {
                  let i = Math.pow(2, e[t + 3] - 128) / 255;
                  (r[n + 0] = s.GxU.toHalfFloat(Math.min(e[t + 0] * i, 65504))),
                    (r[n + 1] = s.GxU.toHalfFloat(
                      Math.min(e[t + 1] * i, 65504)
                    )),
                    (r[n + 2] = s.GxU.toHalfFloat(
                      Math.min(e[t + 2] * i, 65504)
                    )),
                    (r[n + 3] = s.GxU.toHalfFloat(1));
                })(d, 4 * e, A, 4 * e);
              (t = A), (r = s.ix0);
              break;
            default:
              throw Error("THREE.RGBELoader: Unsupported type: " + this.type);
          }
          return {
            width: u,
            height: c,
            data: t,
            header: l.string,
            gamma: l.gamma,
            exposure: l.exposure,
            type: r,
          };
        }
        setDataType(e) {
          return (this.type = e), this;
        }
        load(e, t, r, n) {
          return super.load(
            e,
            function (e, r) {
              switch (e.type) {
                case s.RQf:
                case s.ix0:
                  "colorSpace" in e
                    ? (e.colorSpace = "srgb-linear")
                    : (e.encoding = 3e3),
                    (e.minFilter = s.k6q),
                    (e.magFilter = s.k6q),
                    (e.generateMipmaps = !1),
                    (e.flipY = !0);
              }
              t && t(e, r);
            },
            r,
            n
          );
        }
      }
      var f = {},
        A = function (e, t, r, n, i) {
          var a = new Worker(
            f[t] ||
              (f[t] = URL.createObjectURL(
                new Blob([e], { type: "text/javascript" })
              ))
          );
          return (
            (a.onerror = function (e) {
              return i(e.error, null);
            }),
            (a.onmessage = function (e) {
              return i(null, e.data);
            }),
            a.postMessage(r, n),
            a
          );
        },
        h = Uint8Array,
        p = Uint16Array,
        m = Uint32Array,
        B = new h([
          0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,
          4, 5, 5, 5, 5, 0, 0, 0, 0,
        ]),
        C = new h([
          0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
          10, 11, 11, 12, 12, 13, 13, 0, 0,
        ]),
        g = new h([
          16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
        ]),
        v = function (e, t) {
          for (var r = new p(31), n = 0; n < 31; ++n) r[n] = t += 1 << e[n - 1];
          for (var i = new m(r[30]), n = 1; n < 30; ++n)
            for (var a = r[n]; a < r[n + 1]; ++a) i[a] = ((a - r[n]) << 5) | n;
          return [r, i];
        },
        b = v(B, 2),
        y = b[0],
        E = b[1];
      (y[28] = 258), (E[258] = 28);
      for (
        var M = v(C, 0), w = M[0], F = M[1], I = new p(32768), R = 0;
        R < 32768;
        ++R
      ) {
        var x = ((43690 & R) >>> 1) | ((21845 & R) << 1);
        (x =
          ((61680 & (x = ((52428 & x) >>> 2) | ((13107 & x) << 2))) >>> 4) |
          ((3855 & x) << 4)),
          (I[R] = (((65280 & x) >>> 8) | ((255 & x) << 8)) >>> 1);
      }
      for (
        var G = function (e, t, r) {
            for (var n, i = e.length, a = 0, o = new p(t); a < i; ++a)
              ++o[e[a] - 1];
            var s = new p(t);
            for (a = 0; a < t; ++a) s[a] = (s[a - 1] + o[a - 1]) << 1;
            if (r) {
              n = new p(1 << t);
              var l = 15 - t;
              for (a = 0; a < i; ++a)
                if (e[a])
                  for (
                    var u = (a << 4) | e[a],
                      c = t - e[a],
                      d = s[e[a] - 1]++ << c,
                      f = d | ((1 << c) - 1);
                    d <= f;
                    ++d
                  )
                    n[I[d] >>> l] = u;
            } else
              for (a = 0, n = new p(i); a < i; ++a)
                e[a] && (n[a] = I[s[e[a] - 1]++] >>> (15 - e[a]));
            return n;
          },
          D = new h(288),
          R = 0;
        R < 144;
        ++R
      )
        D[R] = 8;
      for (var R = 144; R < 256; ++R) D[R] = 9;
      for (var R = 256; R < 280; ++R) D[R] = 7;
      for (var R = 280; R < 288; ++R) D[R] = 8;
      for (var T = new h(32), R = 0; R < 32; ++R) T[R] = 5;
      var H = G(D, 9, 1),
        S = G(T, 5, 1),
        P = function (e) {
          for (var t = e[0], r = 1; r < e.length; ++r) e[r] > t && (t = e[r]);
          return t;
        },
        O = function (e, t, r) {
          var n = (t / 8) | 0;
          return ((e[n] | (e[n + 1] << 8)) >> (7 & t)) & r;
        },
        _ = function (e, t) {
          var r = (t / 8) | 0;
          return (e[r] | (e[r + 1] << 8) | (e[r + 2] << 16)) >> (7 & t);
        },
        J = function (e) {
          return ((e / 8) | 0) + (7 & e && 1);
        },
        L = function (e, t, r) {
          (null == t || t < 0) && (t = 0),
            (null == r || r > e.length) && (r = e.length);
          var n = new (e instanceof p ? p : e instanceof m ? m : h)(r - t);
          return n.set(e.subarray(t, r)), n;
        },
        U = function (e, t, r) {
          var n = e.length;
          if (!n || (r && !r.l && n < 5)) return t || new h(0);
          var i = !t || r,
            a = !r || r.i;
          r || (r = {}), t || (t = new h(3 * n));
          var o = function (e) {
              var r = t.length;
              if (e > r) {
                var n = new h(Math.max(2 * r, e));
                n.set(t), (t = n);
              }
            },
            s = r.f || 0,
            l = r.p || 0,
            u = r.b || 0,
            c = r.l,
            d = r.d,
            f = r.m,
            A = r.n,
            p = 8 * n;
          do {
            if (!c) {
              r.f = s = O(e, l, 1);
              var m = O(e, l + 1, 3);
              if (((l += 3), m)) {
                if (1 == m) (c = H), (d = S), (f = 9), (A = 5);
                else if (2 == m) {
                  var v = O(e, l, 31) + 257,
                    b = O(e, l + 10, 15) + 4,
                    E = v + O(e, l + 5, 31) + 1;
                  l += 14;
                  for (var M = new h(E), F = new h(19), I = 0; I < b; ++I)
                    F[g[I]] = O(e, l + 3 * I, 7);
                  l += 3 * b;
                  for (
                    var R = P(F), x = (1 << R) - 1, D = G(F, R, 1), I = 0;
                    I < E;

                  ) {
                    var T = D[O(e, l, x)];
                    l += 15 & T;
                    var U = T >>> 4;
                    if (U < 16) M[I++] = U;
                    else {
                      var k = 0,
                        j = 0;
                      for (
                        16 == U
                          ? ((j = 3 + O(e, l, 3)), (l += 2), (k = M[I - 1]))
                          : 17 == U
                          ? ((j = 3 + O(e, l, 7)), (l += 3))
                          : 18 == U && ((j = 11 + O(e, l, 127)), (l += 7));
                        j--;

                      )
                        M[I++] = k;
                    }
                  }
                  var K = M.subarray(0, v),
                    N = M.subarray(v);
                  (f = P(K)), (A = P(N)), (c = G(K, f, 1)), (d = G(N, A, 1));
                } else throw "invalid block type";
              } else {
                var U = J(l) + 4,
                  Q = e[U - 4] | (e[U - 3] << 8),
                  X = U + Q;
                if (X > n) {
                  if (a) throw "unexpected EOF";
                  break;
                }
                i && o(u + Q),
                  t.set(e.subarray(U, X), u),
                  (r.b = u += Q),
                  (r.p = l = 8 * X);
                continue;
              }
              if (l > p) {
                if (a) throw "unexpected EOF";
                break;
              }
            }
            i && o(u + 131072);
            for (var Y = (1 << f) - 1, W = (1 << A) - 1, Z = l; ; Z = l) {
              var k = c[_(e, l) & Y],
                q = k >>> 4;
              if ((l += 15 & k) > p) {
                if (a) throw "unexpected EOF";
                break;
              }
              if (!k) throw "invalid length/literal";
              if (q < 256) t[u++] = q;
              else if (256 == q) {
                (Z = l), (c = null);
                break;
              } else {
                var z = q - 254;
                if (q > 264) {
                  var I = q - 257,
                    V = B[I];
                  (z = O(e, l, (1 << V) - 1) + y[I]), (l += V);
                }
                var $ = d[_(e, l) & W],
                  ee = $ >>> 4;
                if (!$) throw "invalid distance";
                l += 15 & $;
                var N = w[ee];
                if (ee > 3) {
                  var V = C[ee];
                  (N += _(e, l) & ((1 << V) - 1)), (l += V);
                }
                if (l > p) {
                  if (a) throw "unexpected EOF";
                  break;
                }
                i && o(u + 131072);
                for (var et = u + z; u < et; u += 4)
                  (t[u] = t[u - N]),
                    (t[u + 1] = t[u + 1 - N]),
                    (t[u + 2] = t[u + 2 - N]),
                    (t[u + 3] = t[u + 3 - N]);
                u = et;
              }
            }
            (r.l = c),
              (r.p = Z),
              (r.b = u),
              c && ((s = 1), (r.m = f), (r.d = d), (r.n = A));
          } while (!s);
          return u == t.length ? t : L(t, 0, u);
        },
        k = function (e, t, r) {
          r <<= 7 & t;
          var n = (t / 8) | 0;
          (e[n] |= r), (e[n + 1] |= r >>> 8);
        },
        j = function (e, t, r) {
          r <<= 7 & t;
          var n = (t / 8) | 0;
          (e[n] |= r), (e[n + 1] |= r >>> 8), (e[n + 2] |= r >>> 16);
        },
        K = function (e, t) {
          for (var r = [], n = 0; n < e.length; ++n)
            e[n] && r.push({ s: n, f: e[n] });
          var i = r.length,
            a = r.slice();
          if (!i) return [q, 0];
          if (1 == i) {
            var o = new h(r[0].s + 1);
            return (o[r[0].s] = 1), [o, 1];
          }
          r.sort(function (e, t) {
            return e.f - t.f;
          }),
            r.push({ s: -1, f: 25001 });
          var s = r[0],
            l = r[1],
            u = 0,
            c = 1,
            d = 2;
          for (r[0] = { s: -1, f: s.f + l.f, l: s, r: l }; c != i - 1; )
            (s = r[r[u].f < r[d].f ? u++ : d++]),
              (l = r[u != c && r[u].f < r[d].f ? u++ : d++]),
              (r[c++] = { s: -1, f: s.f + l.f, l: s, r: l });
          for (var f = a[0].s, n = 1; n < i; ++n) a[n].s > f && (f = a[n].s);
          var A = new p(f + 1),
            m = N(r[c - 1], A, 0);
          if (m > t) {
            var n = 0,
              B = 0,
              C = m - t,
              g = 1 << C;
            for (
              a.sort(function (e, t) {
                return A[t.s] - A[e.s] || e.f - t.f;
              });
              n < i;
              ++n
            ) {
              var v = a[n].s;
              if (A[v] > t) (B += g - (1 << (m - A[v]))), (A[v] = t);
              else break;
            }
            for (B >>>= C; B > 0; ) {
              var b = a[n].s;
              A[b] < t ? (B -= 1 << (t - A[b]++ - 1)) : ++n;
            }
            for (; n >= 0 && B; --n) {
              var y = a[n].s;
              A[y] == t && (--A[y], ++B);
            }
            m = t;
          }
          return [new h(A), m];
        },
        N = function (e, t, r) {
          return -1 == e.s
            ? Math.max(N(e.l, t, r + 1), N(e.r, t, r + 1))
            : (t[e.s] = r);
        },
        Q = function (e) {
          for (var t = e.length; t && !e[--t]; );
          for (
            var r = new p(++t),
              n = 0,
              i = e[0],
              a = 1,
              o = function (e) {
                r[n++] = e;
              },
              s = 1;
            s <= t;
            ++s
          )
            if (e[s] == i && s != t) ++a;
            else {
              if (!i && a > 2) {
                for (; a > 138; a -= 138) o(32754);
                a > 2 &&
                  (o(a > 10 ? ((a - 11) << 5) | 28690 : ((a - 3) << 5) | 12305),
                  (a = 0));
              } else if (a > 3) {
                for (o(i), --a; a > 6; a -= 6) o(8304);
                a > 2 && (o(((a - 3) << 5) | 8208), (a = 0));
              }
              for (; a--; ) o(i);
              (a = 1), (i = e[s]);
            }
          return [r.subarray(0, n), t];
        },
        X = function (e, t) {
          for (var r = 0, n = 0; n < t.length; ++n) r += e[n] * t[n];
          return r;
        },
        Y = function (e, t, r) {
          var n = r.length,
            i = J(t + 2);
          (e[i] = 255 & n),
            (e[i + 1] = n >>> 8),
            (e[i + 2] = 255 ^ e[i]),
            (e[i + 3] = 255 ^ e[i + 1]);
          for (var a = 0; a < n; ++a) e[i + a + 4] = r[a];
          return (i + 4 + n) * 8;
        },
        W = function (e, t, r, n, i, a, o, s, l, u, c) {
          k(t, c++, r), ++i[256];
          for (
            var d,
              f,
              A,
              h,
              m = K(i, 15),
              v = m[0],
              b = m[1],
              y = K(a, 15),
              E = y[0],
              M = y[1],
              w = Q(v),
              F = w[0],
              I = w[1],
              R = Q(E),
              x = R[0],
              H = R[1],
              S = new p(19),
              P = 0;
            P < F.length;
            ++P
          )
            S[31 & F[P]]++;
          for (var P = 0; P < x.length; ++P) S[31 & x[P]]++;
          for (
            var O = K(S, 7), _ = O[0], J = O[1], L = 19;
            L > 4 && !_[g[L - 1]];
            --L
          );
          var U = (u + 5) << 3,
            N = X(i, D) + X(a, T) + o,
            W =
              X(i, v) +
              X(a, E) +
              o +
              14 +
              3 * L +
              X(S, _) +
              (2 * S[16] + 3 * S[17] + 7 * S[18]);
          if (U <= N && U <= W) return Y(t, c, e.subarray(l, l + u));
          if ((k(t, c, 1 + (W < N)), (c += 2), W < N)) {
            (d = G(v, b, 0)), (f = v), (A = G(E, M, 0)), (h = E);
            var Z = G(_, J, 0);
            k(t, c, I - 257),
              k(t, c + 5, H - 1),
              k(t, c + 10, L - 4),
              (c += 14);
            for (var P = 0; P < L; ++P) k(t, c + 3 * P, _[g[P]]);
            c += 3 * L;
            for (var q = [F, x], z = 0; z < 2; ++z)
              for (var V = q[z], P = 0; P < V.length; ++P) {
                var $ = 31 & V[P];
                k(t, c, Z[$]),
                  (c += _[$]),
                  $ > 15 && (k(t, c, (V[P] >>> 5) & 127), (c += V[P] >>> 12));
              }
          } else (d = null), (f = D), (A = null), (h = T);
          for (var P = 0; P < s; ++P)
            if (n[P] > 255) {
              var $ = (n[P] >>> 18) & 31;
              j(t, c, d[$ + 257]),
                (c += f[$ + 257]),
                $ > 7 && (k(t, c, (n[P] >>> 23) & 31), (c += B[$]));
              var ee = 31 & n[P];
              j(t, c, A[ee]),
                (c += h[ee]),
                ee > 3 && (j(t, c, (n[P] >>> 5) & 8191), (c += C[ee]));
            } else j(t, c, d[n[P]]), (c += f[n[P]]);
          return j(t, c, d[256]), c + f[256];
        },
        Z = new m([
          65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560,
          2117632,
        ]),
        q = new h(0),
        z = function (e, t, r, n, i, a) {
          var o = e.length,
            s = new h(n + o + 5 * (1 + Math.ceil(o / 7e3)) + i),
            l = s.subarray(n, s.length - i),
            u = 0;
          if (!t || o < 8)
            for (var c = 0; c <= o; c += 65535) {
              var d = c + 65535;
              d < o
                ? (u = Y(l, u, e.subarray(c, d)))
                : ((l[c] = a), (u = Y(l, u, e.subarray(c, o))));
            }
          else {
            for (
              var f = Z[t - 1],
                A = f >>> 13,
                g = 8191 & f,
                v = (1 << r) - 1,
                b = new p(32768),
                y = new p(v + 1),
                M = Math.ceil(r / 3),
                w = 2 * M,
                I = function (t) {
                  return (e[t] ^ (e[t + 1] << M) ^ (e[t + 2] << w)) & v;
                },
                R = new m(25e3),
                x = new p(288),
                G = new p(32),
                D = 0,
                T = 0,
                c = 0,
                H = 0,
                S = 0,
                P = 0;
              c < o;
              ++c
            ) {
              var O = I(c),
                _ = 32767 & c,
                U = y[O];
              if (((b[_] = U), (y[O] = _), S <= c)) {
                var k = o - c;
                if ((D > 7e3 || H > 24576) && k > 423) {
                  (u = W(e, l, 0, R, x, G, T, H, P, c - P, u)),
                    (H = D = T = 0),
                    (P = c);
                  for (var j = 0; j < 286; ++j) x[j] = 0;
                  for (var j = 0; j < 30; ++j) G[j] = 0;
                }
                var K = 2,
                  N = 0,
                  Q = g,
                  X = (_ - U) & 32767;
                if (k > 2 && O == I(c - X))
                  for (
                    var z = Math.min(A, k) - 1,
                      V = Math.min(32767, c),
                      $ = Math.min(258, k);
                    X <= V && --Q && _ != U;

                  ) {
                    if (e[c + K] == e[c + K - X]) {
                      for (
                        var ee = 0;
                        ee < $ && e[c + ee] == e[c + ee - X];
                        ++ee
                      );
                      if (ee > K) {
                        if (((K = ee), (N = X), ee > z)) break;
                        for (
                          var et = Math.min(X, ee - 2), er = 0, j = 0;
                          j < et;
                          ++j
                        ) {
                          var en = (c - X + j + 32768) & 32767,
                            ei = b[en],
                            ea = (en - ei + 32768) & 32767;
                          ea > er && ((er = ea), (U = en));
                        }
                      }
                    }
                    (U = b[(_ = U)]), (X += (_ - U + 32768) & 32767);
                  }
                if (N) {
                  R[H++] = 0x10000000 | (E[K] << 18) | F[N];
                  var eo = 31 & E[K],
                    es = 31 & F[N];
                  (T += B[eo] + C[es]),
                    ++x[257 + eo],
                    ++G[es],
                    (S = c + K),
                    ++D;
                } else (R[H++] = e[c]), ++x[e[c]];
              }
            }
            (u = W(e, l, a, R, x, G, T, H, P, c - P, u)),
              !a && 7 & u && (u = Y(l, u + 1, q));
          }
          return L(s, 0, n + J(u) + i);
        },
        V = function (e, t) {
          var r = {};
          for (var n in e) r[n] = e[n];
          for (var n in t) r[n] = t[n];
          return r;
        },
        $ = function (e, t, r) {
          for (
            var n = e(),
              i = e.toString(),
              a = i
                .slice(i.indexOf("[") + 1, i.lastIndexOf("]"))
                .replace(/ /g, "")
                .split(","),
              o = 0;
            o < n.length;
            ++o
          ) {
            var s = n[o],
              l = a[o];
            if ("function" == typeof s) {
              t += ";" + l + "=";
              var u = s.toString();
              if (s.prototype) {
                if (-1 != u.indexOf("[native code]")) {
                  var c = u.indexOf(" ", 8) + 1;
                  t += u.slice(c, u.indexOf("(", c));
                } else
                  for (var d in ((t += u), s.prototype))
                    t +=
                      ";" +
                      l +
                      ".prototype." +
                      d +
                      "=" +
                      s.prototype[d].toString();
              } else t += u;
            } else r[l] = s;
          }
          return [t, r];
        },
        ee = function (e) {
          var t = [];
          for (var r in e)
            (e[r] instanceof h || e[r] instanceof p || e[r] instanceof m) &&
              t.push((e[r] = new e[r].constructor(e[r])).buffer);
          return t;
        },
        et = function (e, t, r, n) {
          if (!null[r]) {
            for (var i, a = "", o = {}, s = e.length - 1, l = 0; l < s; ++l)
              (a = (i = $(e[l], a, o))[0]), (o = i[1]);
            null[r] = $(e[s], a, o);
          }
          var u = V({}, null[r][1]);
          return A(
            null[r][0] +
              ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" +
              t.toString() +
              "}",
            r,
            u,
            ee(u),
            n
          );
        },
        er = function (e) {
          return postMessage(e, [e.buffer]);
        },
        en = function (e) {
          return e && e.size && new h(e.size);
        },
        ei = function (e, t) {
          return e[t] | (e[t + 1] << 8);
        },
        ea = function (e, t) {
          return (
            (e[t] | (e[t + 1] << 8) | (e[t + 2] << 16) | (e[t + 3] << 24)) >>> 0
          );
        },
        eo = function (e, t) {
          return ea(e, t) + 0x100000000 * ea(e, t + 4);
        },
        es = function (e, t, r) {
          for (; r; ++t) (e[t] = r), (r >>>= 8);
        },
        el = function (e) {
          if ((15 & e[0]) != 8 || e[0] >>> 4 > 7 || ((e[0] << 8) | e[1]) % 31)
            throw "invalid zlib data";
          if (32 & e[1])
            throw "invalid zlib data: preset dictionaries not supported";
        };
      function eu(e, t) {
        return U(e, t);
      }
      function ec(e, t) {
        return U((el(e), e.subarray(2, -4)), t);
      }
      var ed = "undefined" != typeof TextDecoder && new TextDecoder();
      try {
        ed.decode(q, { stream: !0 });
      } catch (e) {}
      let ef = l.r >= 152;
      class eA extends s.BRH {
        constructor(e) {
          super(e), (this.type = s.ix0);
        }
        parse(e) {
          let t = { l: 0, c: 0, lc: 0 };
          function r(e, r, n, i, a) {
            for (; n < e; ) (r = (r << 8) | F(i, a)), (n += 8);
            (n -= e), (t.l = (r >> n) & ((1 << e) - 1)), (t.c = r), (t.lc = n);
          }
          let n = Array(59),
            i = { c: 0, lc: 0 };
          function a(e, t, r, n) {
            (e = (e << 8) | F(r, n)), (t += 8), (i.c = e), (i.lc = t);
          }
          let o = { c: 0, lc: 0 };
          function l(e, t, r, n, s, l, u, c, d, f) {
            if (e == t) {
              n < 8 && (a(r, n, s, u), (r = i.c), (n = i.lc));
              var A = r >> (n -= 8),
                A = new Uint8Array([A])[0];
              if (d.value + A > f) return !1;
              for (var h = c[d.value - 1]; A-- > 0; ) c[d.value++] = h;
            } else {
              if (!(d.value < f)) return !1;
              c[d.value++] = e;
            }
            (o.c = r), (o.lc = n);
          }
          function u(e) {
            var t = 65535 & e;
            return t > 32767 ? t - 65536 : t;
          }
          let c = { a: 0, b: 0 };
          function d(e, t) {
            var r = u(e),
              n = u(t),
              i = r + (1 & n) + (n >> 1),
              a = i - n;
            (c.a = i), (c.b = a);
          }
          function f(e, t) {
            var r = 65535 & t,
              n = ((65535 & e) - (r >> 1)) & 65535;
            (c.a = (r + n - 32768) & 65535), (c.b = n);
          }
          function A(e, s, u, c, d, f) {
            var A = u.value,
              h = w(s, u),
              p = w(s, u);
            u.value += 4;
            var m = w(s, u);
            if (((u.value += 4), h < 0 || h >= 65537 || p < 0 || p >= 65537))
              throw "Something wrong with HUF_ENCSIZE";
            var B = Array(65537),
              C = Array(16384);
            !(function (e) {
              for (var t = 0; t < 16384; t++)
                (e[t] = {}), (e[t].len = 0), (e[t].lit = 0), (e[t].p = null);
            })(C);
            var g = c - (u.value - A);
            if (
              (!(function (e, i, a, o, s, l, u) {
                for (var c = 0, d = 0; s <= l; s++) {
                  if (a.value - a.value > o) return !1;
                  r(6, c, d, e, a);
                  var f = t.l;
                  if (((c = t.c), (d = t.lc), (u[s] = f), 63 == f)) {
                    if (a.value - a.value > o)
                      throw "Something wrong with hufUnpackEncTable";
                    r(8, c, d, e, a);
                    var A = t.l + 6;
                    if (((c = t.c), (d = t.lc), s + A > l + 1))
                      throw "Something wrong with hufUnpackEncTable";
                    for (; A--; ) u[s++] = 0;
                    s--;
                  } else if (f >= 59) {
                    var A = f - 59 + 2;
                    if (s + A > l + 1)
                      throw "Something wrong with hufUnpackEncTable";
                    for (; A--; ) u[s++] = 0;
                    s--;
                  }
                }
                !(function (e) {
                  for (var t = 0; t <= 58; ++t) n[t] = 0;
                  for (var t = 0; t < 65537; ++t) n[e[t]] += 1;
                  for (var r = 0, t = 58; t > 0; --t) {
                    var i = (r + n[t]) >> 1;
                    (n[t] = r), (r = i);
                  }
                  for (var t = 0; t < 65537; ++t) {
                    var a = e[t];
                    a > 0 && (e[t] = a | (n[a]++ << 6));
                  }
                })(u);
              })(e, 0, u, g, h, p, B),
              m > 8 * (c - (u.value - A)))
            )
              throw "Something wrong with hufUncompress";
            !(function (e, t, r, n) {
              for (; t <= r; t++) {
                var i = e[t] >> 6,
                  a = 63 & e[t];
                if (i >> a) throw "Invalid table entry";
                if (a > 14) {
                  var o = n[i >> (a - 14)];
                  if (o.len) throw "Invalid table entry";
                  if ((o.lit++, o.p)) {
                    var s = o.p;
                    o.p = Array(o.lit);
                    for (var l = 0; l < o.lit - 1; ++l) o.p[l] = s[l];
                  } else o.p = [,];
                  o.p[o.lit - 1] = t;
                } else if (a)
                  for (var u = 0, l = 1 << (14 - a); l > 0; l--) {
                    var o = n[(i << (14 - a)) + u];
                    if (o.len || o.p) throw "Invalid table entry";
                    (o.len = a), (o.lit = t), u++;
                  }
              }
            })(B, h, p, C),
              (function (e, t, r, n, s, u, c, d, f, A) {
                for (
                  var h = 0, p = 0, m = Math.trunc(s.value + (u + 7) / 8);
                  s.value < m;

                )
                  for (a(h, p, r, s), h = i.c, p = i.lc; p >= 14; ) {
                    var B = t[(h >> (p - 14)) & 16383];
                    if (B.len)
                      (p -= B.len),
                        l(B.lit, c, h, p, r, n, s, f, A, d),
                        (h = o.c),
                        (p = o.lc);
                    else {
                      if (!B.p) throw "hufDecode issues";
                      for (C = 0; C < B.lit; C++) {
                        for (var C, g = 63 & e[B.p[C]]; p < g && s.value < m; )
                          a(h, p, r, s), (h = i.c), (p = i.lc);
                        if (
                          p >= g &&
                          e[B.p[C]] >> 6 == ((h >> (p - g)) & ((1 << g) - 1))
                        ) {
                          (p -= g),
                            l(B.p[C], c, h, p, r, n, s, f, A, d),
                            (h = o.c),
                            (p = o.lc);
                          break;
                        }
                      }
                      if (C == B.lit) throw "hufDecode issues";
                    }
                  }
                var v = (8 - u) & 7;
                for (h >>= v, p -= v; p > 0; ) {
                  var B = t[(h << (14 - p)) & 16383];
                  if (B.len)
                    (p -= B.len),
                      l(B.lit, c, h, p, r, n, s, f, A, d),
                      (h = o.c),
                      (p = o.lc);
                  else throw "hufDecode issues";
                }
              })(B, C, e, s, u, m, p, f, d, { value: 0 });
          }
          function h(e) {
            for (var t = 1; t < e.length; t++) {
              var r = e[t - 1] + e[t] - 128;
              e[t] = r;
            }
          }
          function p(e, t) {
            for (
              var r = 0,
                n = Math.floor((e.length + 1) / 2),
                i = 0,
                a = e.length - 1;
              !(i > a) && ((t[i++] = e[r++]), !(i > a));

            )
              t[i++] = e[n++];
          }
          function m(e) {
            for (
              var t = e.byteLength, r = [], n = 0, i = new DataView(e);
              t > 0;

            ) {
              var a = i.getInt8(n++);
              if (a < 0) {
                var o = -a;
                t -= o + 1;
                for (var s = 0; s < o; s++) r.push(i.getUint8(n++));
              } else {
                var o = a;
                t -= 2;
                for (var l = i.getUint8(n++), s = 0; s < o + 1; s++) r.push(l);
              }
            }
            return r;
          }
          function B(e) {
            return new DataView(e.array.buffer, e.offset.value, e.size);
          }
          function C(e) {
            var t = new Uint8Array(
                m(
                  e.viewer.buffer.slice(e.offset.value, e.offset.value + e.size)
                )
              ),
              r = new Uint8Array(t.length);
            return h(t), p(t, r), new DataView(r.buffer);
          }
          function g(e) {
            var t = ec(e.array.slice(e.offset.value, e.offset.value + e.size)),
              r = new Uint8Array(t.length);
            return h(t), p(t, r), new DataView(r.buffer);
          }
          function v(e) {
            for (
              var t = e.viewer,
                r = { value: e.offset.value },
                n = new Uint16Array(
                  e.width * e.scanlineBlockSize * (e.channels * e.type)
                ),
                i = new Uint8Array(8192),
                a = 0,
                o = Array(e.channels),
                s = 0;
              s < e.channels;
              s++
            )
              (o[s] = {}),
                (o[s].start = a),
                (o[s].end = o[s].start),
                (o[s].nx = e.width),
                (o[s].ny = e.lines),
                (o[s].size = e.type),
                (a += o[s].nx * o[s].ny * o[s].size);
            var l = T(t, r),
              u = T(t, r);
            if (u >= 8192)
              throw "Something is wrong with PIZ_COMPRESSION BITMAP_SIZE";
            if (l <= u) for (var s = 0; s < u - l + 1; s++) i[s + l] = I(t, r);
            var h = new Uint16Array(65536),
              p = (function (e, t) {
                for (var r = 0, n = 0; n < 65536; ++n)
                  (0 == n || e[n >> 3] & (1 << (7 & n))) && (t[r++] = n);
                for (var i = r - 1; r < 65536; ) t[r++] = 0;
                return i;
              })(i, h),
              m = w(t, r);
            A(e.array, t, r, m, n, a);
            for (var s = 0; s < e.channels; ++s)
              for (var B = o[s], C = 0; C < o[s].size; ++C)
                !(function (e, t, r, n, i, a, o) {
                  for (var s = o < 16384, l = r > i ? i : r, u = 1; u <= l; )
                    u <<= 1;
                  for (u >>= 1, A = u, u >>= 1; u >= 1; ) {
                    for (
                      var A,
                        h,
                        p,
                        m,
                        B,
                        C = 0,
                        g = 0 + a * (i - A),
                        v = a * u,
                        b = a * A,
                        y = n * u,
                        E = n * A;
                      C <= g;
                      C += b
                    ) {
                      for (var M = C, w = C + n * (r - A); M <= w; M += E) {
                        var F = M + y,
                          I = M + v,
                          R = I + y;
                        s
                          ? (d(e[M + t], e[I + t]),
                            (h = c.a),
                            (m = c.b),
                            d(e[F + t], e[R + t]),
                            (p = c.a),
                            (B = c.b),
                            d(h, p),
                            (e[M + t] = c.a),
                            (e[F + t] = c.b),
                            d(m, B))
                          : (f(e[M + t], e[I + t]),
                            (h = c.a),
                            (m = c.b),
                            f(e[F + t], e[R + t]),
                            (p = c.a),
                            (B = c.b),
                            f(h, p),
                            (e[M + t] = c.a),
                            (e[F + t] = c.b),
                            f(m, B)),
                          (e[I + t] = c.a),
                          (e[R + t] = c.b);
                      }
                      if (r & u) {
                        var I = M + v;
                        s ? d(e[M + t], e[I + t]) : f(e[M + t], e[I + t]),
                          (h = c.a),
                          (e[I + t] = c.b),
                          (e[M + t] = h);
                      }
                    }
                    if (i & u)
                      for (var M = C, w = C + n * (r - A); M <= w; M += E) {
                        var F = M + y;
                        s ? d(e[M + t], e[F + t]) : f(e[M + t], e[F + t]),
                          (h = c.a),
                          (e[F + t] = c.b),
                          (e[M + t] = h);
                      }
                    (A = u), (u >>= 1);
                  }
                })(n, B.start + C, B.nx, B.size, B.ny, B.nx * B.size, p);
            !(function (e, t, r) {
              for (var n = 0; n < r; ++n) t[n] = e[t[n]];
            })(h, n, a);
            for (
              var g = 0, v = new Uint8Array(n.buffer.byteLength), b = 0;
              b < e.lines;
              b++
            )
              for (var y = 0; y < e.channels; y++) {
                var B = o[y],
                  E = B.nx * B.size,
                  M = new Uint8Array(n.buffer, 2 * B.end, 2 * E);
                v.set(M, g), (g += 2 * E), (B.end += E);
              }
            return new DataView(v.buffer);
          }
          function b(e) {
            var t = ec(e.array.slice(e.offset.value, e.offset.value + e.size));
            let r = e.lines * e.channels * e.width,
              n = 1 == e.type ? new Uint16Array(r) : new Uint32Array(r),
              i = 0,
              a = 0,
              o = [, , , ,];
            for (let r = 0; r < e.lines; r++)
              for (let r = 0; r < e.channels; r++) {
                let r = 0;
                switch (e.type) {
                  case 1:
                    (o[0] = i), (o[1] = o[0] + e.width), (i = o[1] + e.width);
                    for (let i = 0; i < e.width; ++i)
                      (r += (t[o[0]++] << 8) | t[o[1]++]), (n[a] = r), a++;
                    break;
                  case 2:
                    (o[0] = i),
                      (o[1] = o[0] + e.width),
                      (o[2] = o[1] + e.width),
                      (i = o[2] + e.width);
                    for (let i = 0; i < e.width; ++i)
                      (r +=
                        (t[o[0]++] << 24) |
                        (t[o[1]++] << 16) |
                        (t[o[2]++] << 8)),
                        (n[a] = r),
                        a++;
                }
              }
            return new DataView(n.buffer);
          }
          function y(e) {
            var t = e.viewer,
              r = { value: e.offset.value },
              n = new Uint8Array(e.width * e.lines * (e.channels * e.type * 2)),
              i = {
                version: R(t, r),
                unknownUncompressedSize: R(t, r),
                unknownCompressedSize: R(t, r),
                acCompressedSize: R(t, r),
                dcCompressedSize: R(t, r),
                rleCompressedSize: R(t, r),
                rleUncompressedSize: R(t, r),
                rleRawSize: R(t, r),
                totalAcUncompressedCount: R(t, r),
                totalDcUncompressedCount: R(t, r),
                acCompression: R(t, r),
              };
            if (i.version < 2)
              throw (
                "EXRLoader.parse: " +
                _.compression +
                " version " +
                i.version +
                " is unsupported"
              );
            for (var a = [], o = T(t, r) - 2; o > 0; ) {
              var l = E(t.buffer, r),
                u = I(t, r),
                c = (u >> 2) & 3,
                d = new Int8Array([(u >> 4) - 1])[0],
                f = I(t, r);
              a.push({ name: l, index: d, type: f, compression: c }),
                (o -= l.length + 3);
            }
            for (
              var h = _.channels, p = Array(e.channels), B = 0;
              B < e.channels;
              ++B
            ) {
              var C = (p[B] = {}),
                v = h[B];
              (C.name = v.name),
                (C.compression = 0),
                (C.decoded = !1),
                (C.type = v.pixelType),
                (C.pLinear = v.pLinear),
                (C.width = e.width),
                (C.height = e.lines);
            }
            for (var b = { idx: [, , ,] }, y = 0; y < e.channels; ++y)
              for (var C = p[y], B = 0; B < a.length; ++B) {
                var M = a[B];
                C.name == M.name &&
                  ((C.compression = M.compression),
                  M.index >= 0 && (b.idx[M.index] = y),
                  (C.offset = y));
              }
            if (i.acCompressedSize > 0)
              switch (i.acCompression) {
                case 0:
                  var w = new Uint16Array(i.totalAcUncompressedCount);
                  A(
                    e.array,
                    t,
                    r,
                    i.acCompressedSize,
                    w,
                    i.totalAcUncompressedCount
                  );
                  break;
                case 1:
                  var F = e.array.slice(
                      r.value,
                      r.value + i.totalAcUncompressedCount
                    ),
                    x = ec(F),
                    w = new Uint16Array(x.buffer);
                  r.value += i.totalAcUncompressedCount;
              }
            if (i.dcCompressedSize > 0) {
              var G = new Uint16Array(
                g({
                  array: e.array,
                  offset: r,
                  size: i.dcCompressedSize,
                }).buffer
              );
              r.value += i.dcCompressedSize;
            }
            if (i.rleRawSize > 0) {
              var F = e.array.slice(r.value, r.value + i.rleCompressedSize),
                x = ec(F),
                H = m(x.buffer);
              r.value += i.rleCompressedSize;
            }
            for (var S = 0, P = Array(p.length), B = 0; B < P.length; ++B)
              P[B] = [];
            for (var O = 0; O < e.lines; ++O)
              for (var J = 0; J < p.length; ++J)
                P[J].push(S), (S += p[J].width * e.type * 2);
            !(function (e, t, r, n, i, a) {
              var o = new DataView(a.buffer),
                l = r[e.idx[0]].width,
                u = r[e.idx[0]].height,
                c = Math.floor(l / 8),
                d = Math.ceil(l / 8),
                f = Math.ceil(u / 8),
                A = l - (d - 1) * 8,
                h = u - (f - 1) * 8,
                p = { value: 0 },
                m = [, , ,],
                B = [, , ,],
                C = [, , ,],
                g = [, , ,],
                v = [, , ,];
              for (let r = 0; r < 3; ++r)
                (v[r] = t[e.idx[r]]),
                  (m[r] = r < 1 ? 0 : m[r - 1] + d * f),
                  (B[r] = new Float32Array(64)),
                  (C[r] = new Uint16Array(64)),
                  (g[r] = new Uint16Array(64 * d));
              for (let t = 0; t < f; ++t) {
                var b,
                  y,
                  E = 8;
                t == f - 1 && (E = h);
                var M = 8;
                for (let e = 0; e < d; ++e) {
                  e == d - 1 && (M = A);
                  for (let e = 0; e < 3; ++e)
                    C[e].fill(0),
                      (C[e][0] = i[m[e]++]),
                      (function (e, t, r) {
                        for (var n, i = 1; i < 64; )
                          65280 == (n = t[e.value])
                            ? (i = 64)
                            : n >> 8 == 255
                            ? (i += 255 & n)
                            : ((r[i] = n), i++),
                            e.value++;
                      })(p, n, C[e]),
                      (b = C[e]),
                      ((y = B[e])[0] = D(b[0])),
                      (y[1] = D(b[1])),
                      (y[2] = D(b[5])),
                      (y[3] = D(b[6])),
                      (y[4] = D(b[14])),
                      (y[5] = D(b[15])),
                      (y[6] = D(b[27])),
                      (y[7] = D(b[28])),
                      (y[8] = D(b[2])),
                      (y[9] = D(b[4])),
                      (y[10] = D(b[7])),
                      (y[11] = D(b[13])),
                      (y[12] = D(b[16])),
                      (y[13] = D(b[26])),
                      (y[14] = D(b[29])),
                      (y[15] = D(b[42])),
                      (y[16] = D(b[3])),
                      (y[17] = D(b[8])),
                      (y[18] = D(b[12])),
                      (y[19] = D(b[17])),
                      (y[20] = D(b[25])),
                      (y[21] = D(b[30])),
                      (y[22] = D(b[41])),
                      (y[23] = D(b[43])),
                      (y[24] = D(b[9])),
                      (y[25] = D(b[11])),
                      (y[26] = D(b[18])),
                      (y[27] = D(b[24])),
                      (y[28] = D(b[31])),
                      (y[29] = D(b[40])),
                      (y[30] = D(b[44])),
                      (y[31] = D(b[53])),
                      (y[32] = D(b[10])),
                      (y[33] = D(b[19])),
                      (y[34] = D(b[23])),
                      (y[35] = D(b[32])),
                      (y[36] = D(b[39])),
                      (y[37] = D(b[45])),
                      (y[38] = D(b[52])),
                      (y[39] = D(b[54])),
                      (y[40] = D(b[20])),
                      (y[41] = D(b[22])),
                      (y[42] = D(b[33])),
                      (y[43] = D(b[38])),
                      (y[44] = D(b[46])),
                      (y[45] = D(b[51])),
                      (y[46] = D(b[55])),
                      (y[47] = D(b[60])),
                      (y[48] = D(b[21])),
                      (y[49] = D(b[34])),
                      (y[50] = D(b[37])),
                      (y[51] = D(b[47])),
                      (y[52] = D(b[50])),
                      (y[53] = D(b[56])),
                      (y[54] = D(b[59])),
                      (y[55] = D(b[61])),
                      (y[56] = D(b[35])),
                      (y[57] = D(b[36])),
                      (y[58] = D(b[48])),
                      (y[59] = D(b[49])),
                      (y[60] = D(b[57])),
                      (y[61] = D(b[58])),
                      (y[62] = D(b[62])),
                      (y[63] = D(b[63])),
                      (function (e) {
                        let t = 0.5 * Math.cos(3.14159 / 16),
                          r = 0.5 * Math.cos(3.14159 / 8),
                          n = 0.5 * Math.cos((3 * 3.14159) / 16),
                          i = 0.5 * Math.cos((3 * 3.14159) / 8);
                        for (
                          var a = [, , , ,],
                            o = [, , , ,],
                            s = [, , , ,],
                            l = [, , , ,],
                            u = 0;
                          u < 8;
                          ++u
                        ) {
                          var c = 8 * u;
                          (a[0] = r * e[c + 2]),
                            (a[1] = i * e[c + 2]),
                            (a[2] = r * e[c + 6]),
                            (a[3] = i * e[c + 6]),
                            (o[0] =
                              t * e[c + 1] +
                              n * e[c + 3] +
                              0.2777854612564676 * e[c + 5] +
                              0.09754573032714427 * e[c + 7]),
                            (o[1] =
                              n * e[c + 1] -
                              0.09754573032714427 * e[c + 3] -
                              t * e[c + 5] -
                              0.2777854612564676 * e[c + 7]),
                            (o[2] =
                              0.2777854612564676 * e[c + 1] -
                              t * e[c + 3] +
                              0.09754573032714427 * e[c + 5] +
                              n * e[c + 7]),
                            (o[3] =
                              0.09754573032714427 * e[c + 1] -
                              0.2777854612564676 * e[c + 3] +
                              n * e[c + 5] -
                              t * e[c + 7]),
                            (s[0] =
                              0.35355362513961314 * (e[c + 0] + e[c + 4])),
                            (s[3] =
                              0.35355362513961314 * (e[c + 0] - e[c + 4])),
                            (s[1] = a[0] + a[3]),
                            (s[2] = a[1] - a[2]),
                            (l[0] = s[0] + s[1]),
                            (l[1] = s[3] + s[2]),
                            (l[2] = s[3] - s[2]),
                            (l[3] = s[0] - s[1]),
                            (e[c + 0] = l[0] + o[0]),
                            (e[c + 1] = l[1] + o[1]),
                            (e[c + 2] = l[2] + o[2]),
                            (e[c + 3] = l[3] + o[3]),
                            (e[c + 4] = l[3] - o[3]),
                            (e[c + 5] = l[2] - o[2]),
                            (e[c + 6] = l[1] - o[1]),
                            (e[c + 7] = l[0] - o[0]);
                        }
                        for (var d = 0; d < 8; ++d)
                          (a[0] = r * e[16 + d]),
                            (a[1] = i * e[16 + d]),
                            (a[2] = r * e[48 + d]),
                            (a[3] = i * e[48 + d]),
                            (o[0] =
                              t * e[8 + d] +
                              n * e[24 + d] +
                              0.2777854612564676 * e[40 + d] +
                              0.09754573032714427 * e[56 + d]),
                            (o[1] =
                              n * e[8 + d] -
                              0.09754573032714427 * e[24 + d] -
                              t * e[40 + d] -
                              0.2777854612564676 * e[56 + d]),
                            (o[2] =
                              0.2777854612564676 * e[8 + d] -
                              t * e[24 + d] +
                              0.09754573032714427 * e[40 + d] +
                              n * e[56 + d]),
                            (o[3] =
                              0.09754573032714427 * e[8 + d] -
                              0.2777854612564676 * e[24 + d] +
                              n * e[40 + d] -
                              t * e[56 + d]),
                            (s[0] = 0.35355362513961314 * (e[d] + e[32 + d])),
                            (s[3] = 0.35355362513961314 * (e[d] - e[32 + d])),
                            (s[1] = a[0] + a[3]),
                            (s[2] = a[1] - a[2]),
                            (l[0] = s[0] + s[1]),
                            (l[1] = s[3] + s[2]),
                            (l[2] = s[3] - s[2]),
                            (l[3] = s[0] - s[1]),
                            (e[0 + d] = l[0] + o[0]),
                            (e[8 + d] = l[1] + o[1]),
                            (e[16 + d] = l[2] + o[2]),
                            (e[24 + d] = l[3] + o[3]),
                            (e[32 + d] = l[3] - o[3]),
                            (e[40 + d] = l[2] - o[2]),
                            (e[48 + d] = l[1] - o[1]),
                            (e[56 + d] = l[0] - o[0]);
                      })(B[e]);
                  !(function (e) {
                    for (var t = 0; t < 64; ++t) {
                      var r = e[0][t],
                        n = e[1][t],
                        i = e[2][t];
                      (e[0][t] = r + 1.5747 * i),
                        (e[1][t] = r - 0.1873 * n - 0.4682 * i),
                        (e[2][t] = r + 1.8556 * n);
                    }
                  })(B);
                  for (let t = 0; t < 3; ++t)
                    !(function (e, t, r) {
                      for (var n, i = 0; i < 64; ++i)
                        t[r + i] = s.GxU.toHalfFloat(
                          (n = e[i]) <= 1
                            ? Math.sign(n) * Math.pow(Math.abs(n), 2.2)
                            : Math.sign(n) *
                                Math.pow(9.025013291561939, Math.abs(n) - 1)
                        );
                    })(B[t], g[t], 64 * e);
                }
                let a = 0;
                for (let n = 0; n < 3; ++n) {
                  let i = r[e.idx[n]].type;
                  for (let e = 8 * t; e < 8 * t + E; ++e) {
                    a = v[n][e];
                    for (let t = 0; t < c; ++t) {
                      let r = 64 * t + (7 & e) * 8;
                      o.setUint16(a + 0 * i, g[n][r + 0], !0),
                        o.setUint16(a + 2 * i, g[n][r + 1], !0),
                        o.setUint16(a + 4 * i, g[n][r + 2], !0),
                        o.setUint16(a + 6 * i, g[n][r + 3], !0),
                        o.setUint16(a + 8 * i, g[n][r + 4], !0),
                        o.setUint16(a + 10 * i, g[n][r + 5], !0),
                        o.setUint16(a + 12 * i, g[n][r + 6], !0),
                        o.setUint16(a + 14 * i, g[n][r + 7], !0),
                        (a += 16 * i);
                    }
                  }
                  if (c != d)
                    for (let e = 8 * t; e < 8 * t + E; ++e) {
                      let t = v[n][e] + 8 * c * 2 * i,
                        r = 64 * c + (7 & e) * 8;
                      for (let e = 0; e < M; ++e)
                        o.setUint16(t + 2 * e * i, g[n][r + e], !0);
                    }
                }
              }
              for (
                var w = new Uint16Array(l), o = new DataView(a.buffer), F = 0;
                F < 3;
                ++F
              ) {
                r[e.idx[F]].decoded = !0;
                var I = r[e.idx[F]].type;
                if (2 == r[F].type)
                  for (var R = 0; R < u; ++R) {
                    let e = v[F][R];
                    for (var x = 0; x < l; ++x)
                      w[x] = o.getUint16(e + 2 * x * I, !0);
                    for (var x = 0; x < l; ++x)
                      o.setFloat32(e + 2 * x * I, D(w[x]), !0);
                  }
              }
            })(b, P, p, w, G, n);
            for (var B = 0; B < p.length; ++B) {
              var C = p[B];
              if (!C.decoded) {
                if (2 === C.compression)
                  for (var L = 0, U = 0, O = 0; O < e.lines; ++O) {
                    for (var k = P[B][L], j = 0; j < C.width; ++j) {
                      for (var K = 0; K < 2 * C.type; ++K)
                        n[k++] = H[U + K * C.width * C.height];
                      U++;
                    }
                    L++;
                  }
                else throw "EXRLoader.parse: unsupported channel compression";
              }
            }
            return new DataView(n.buffer);
          }
          function E(e, t) {
            for (var r = new Uint8Array(e), n = 0; 0 != r[t.value + n]; )
              n += 1;
            var i = new TextDecoder().decode(r.slice(t.value, t.value + n));
            return (t.value = t.value + n + 1), i;
          }
          function M(e, t) {
            var r = e.getInt32(t.value, !0);
            return (t.value = t.value + 4), r;
          }
          function w(e, t) {
            var r = e.getUint32(t.value, !0);
            return (t.value = t.value + 4), r;
          }
          function F(e, t) {
            var r = e[t.value];
            return (t.value = t.value + 1), r;
          }
          function I(e, t) {
            var r = e.getUint8(t.value);
            return (t.value = t.value + 1), r;
          }
          let R = function (e, t) {
            let r;
            return (
              "getBigInt64" in DataView.prototype
                ? (r = Number(e.getBigInt64(t.value, !0)))
                : (r =
                    e.getUint32(t.value + 4, !0) +
                    Number(e.getUint32(t.value, !0) << 32)),
              (t.value += 8),
              r
            );
          };
          function x(e, t) {
            var r = e.getFloat32(t.value, !0);
            return (t.value += 4), r;
          }
          function G(e, t) {
            return s.GxU.toHalfFloat(x(e, t));
          }
          function D(e) {
            var t = (31744 & e) >> 10,
              r = 1023 & e;
            return (
              (e >> 15 ? -1 : 1) *
              (t
                ? 31 === t
                  ? r
                    ? NaN
                    : 1 / 0
                  : Math.pow(2, t - 15) * (1 + r / 1024)
                : (r / 1024) * 6103515625e-14)
            );
          }
          function T(e, t) {
            var r = e.getUint16(t.value, !0);
            return (t.value += 2), r;
          }
          function H(e, t) {
            return D(T(e, t));
          }
          let S = new DataView(e),
            P = new Uint8Array(e),
            O = { value: 0 },
            _ = (function (e, t, r) {
              let n = {};
              if (0x1312f76 != e.getUint32(0, !0))
                throw "THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.";
              n.version = e.getUint8(4);
              let i = e.getUint8(5);
              (n.spec = {
                singleTile: !!(2 & i),
                longName: !!(4 & i),
                deepFormat: !!(8 & i),
                multiPart: !!(16 & i),
              }),
                (r.value = 8);
              for (var a = !0; a; ) {
                var o = E(t, r);
                if (0 == o) a = !1;
                else {
                  var s = E(t, r),
                    l = w(e, r),
                    u = (function (e, t, r, n, i) {
                      var a, o, s, l, u;
                      if (
                        "string" === n ||
                        "stringvector" === n ||
                        "iccProfile" === n
                      )
                        return (
                          (a = new TextDecoder().decode(
                            new Uint8Array(t).slice(r.value, r.value + i)
                          )),
                          (r.value = r.value + i),
                          a
                        );
                      if ("chlist" === n)
                        return (function (e, t, r, n) {
                          for (var i = r.value, a = []; r.value < i + n - 1; ) {
                            var o = E(t, r),
                              s = M(e, r),
                              l = I(e, r);
                            r.value += 3;
                            var u = M(e, r),
                              c = M(e, r);
                            a.push({
                              name: o,
                              pixelType: s,
                              pLinear: l,
                              xSampling: u,
                              ySampling: c,
                            });
                          }
                          return (r.value += 1), a;
                        })(e, t, r, i);
                      if ("chromaticities" === n)
                        return (
                          (o = x(e, r)),
                          (s = x(e, r)),
                          (l = x(e, r)),
                          (u = x(e, r)),
                          {
                            redX: o,
                            redY: s,
                            greenX: l,
                            greenY: u,
                            blueX: x(e, r),
                            blueY: x(e, r),
                            whiteX: x(e, r),
                            whiteY: x(e, r),
                          }
                        );
                      if ("compression" === n)
                        return [
                          "NO_COMPRESSION",
                          "RLE_COMPRESSION",
                          "ZIPS_COMPRESSION",
                          "ZIP_COMPRESSION",
                          "PIZ_COMPRESSION",
                          "PXR24_COMPRESSION",
                          "B44_COMPRESSION",
                          "B44A_COMPRESSION",
                          "DWAA_COMPRESSION",
                          "DWAB_COMPRESSION",
                        ][I(e, r)];
                      if ("box2i" === n)
                        return {
                          xMin: w(e, r),
                          yMin: w(e, r),
                          xMax: w(e, r),
                          yMax: w(e, r),
                        };
                      if ("lineOrder" === n) return ["INCREASING_Y"][I(e, r)];
                      if ("float" === n) return x(e, r);
                      else if ("v2f" === n) return [x(e, r), x(e, r)];
                      else if ("v3f" === n) return [x(e, r), x(e, r), x(e, r)];
                      else if ("int" === n) return M(e, r);
                      else if ("rational" === n) return [M(e, r), w(e, r)];
                      else if ("timecode" === n) return [w(e, r), w(e, r)];
                      else
                        return "preview" === n
                          ? ((r.value += i), "skipped")
                          : void (r.value += i);
                    })(e, t, r, s, l);
                  void 0 === u
                    ? console.warn(
                        `EXRLoader.parse: skipped unknown header attribute type '${s}'.`
                      )
                    : (n[o] = u);
                }
              }
              if ((-5 & i) != 0)
                throw (
                  (console.error("EXRHeader:", n),
                  "THREE.EXRLoader: provided file is currently unsupported.")
                );
              return n;
            })(S, e, O),
            J = (function (e, t, r, n, i) {
              let a = {
                size: 0,
                viewer: t,
                array: r,
                offset: n,
                width: e.dataWindow.xMax - e.dataWindow.xMin + 1,
                height: e.dataWindow.yMax - e.dataWindow.yMin + 1,
                channels: e.channels.length,
                bytesPerLine: null,
                lines: null,
                inputSize: null,
                type: e.channels[0].pixelType,
                uncompress: null,
                getter: null,
                format: null,
                [ef ? "colorSpace" : "encoding"]: null,
              };
              switch (e.compression) {
                case "NO_COMPRESSION":
                  (a.lines = 1), (a.uncompress = B);
                  break;
                case "RLE_COMPRESSION":
                  (a.lines = 1), (a.uncompress = C);
                  break;
                case "ZIPS_COMPRESSION":
                  (a.lines = 1), (a.uncompress = g);
                  break;
                case "ZIP_COMPRESSION":
                  (a.lines = 16), (a.uncompress = g);
                  break;
                case "PIZ_COMPRESSION":
                  (a.lines = 32), (a.uncompress = v);
                  break;
                case "PXR24_COMPRESSION":
                  (a.lines = 16), (a.uncompress = b);
                  break;
                case "DWAA_COMPRESSION":
                  (a.lines = 32), (a.uncompress = y);
                  break;
                case "DWAB_COMPRESSION":
                  (a.lines = 256), (a.uncompress = y);
                  break;
                default:
                  throw "EXRLoader.parse: " + e.compression + " is unsupported";
              }
              if (((a.scanlineBlockSize = a.lines), 1 == a.type))
                switch (i) {
                  case s.RQf:
                    (a.getter = H), (a.inputSize = 2);
                    break;
                  case s.ix0:
                    (a.getter = T), (a.inputSize = 2);
                }
              else if (2 == a.type)
                switch (i) {
                  case s.RQf:
                    (a.getter = x), (a.inputSize = 4);
                    break;
                  case s.ix0:
                    (a.getter = G), (a.inputSize = 4);
                }
              else
                throw (
                  "EXRLoader.parse: unsupported pixelType " +
                  a.type +
                  " for " +
                  e.compression +
                  "."
                );
              a.blockCount = (e.dataWindow.yMax + 1) / a.scanlineBlockSize;
              for (var o = 0; o < a.blockCount; o++) R(t, n);
              a.outputChannels = 3 == a.channels ? 4 : a.channels;
              let l = a.width * a.height * a.outputChannels;
              switch (i) {
                case s.RQf:
                  (a.byteArray = new Float32Array(l)),
                    a.channels < a.outputChannels && a.byteArray.fill(1, 0, l);
                  break;
                case s.ix0:
                  (a.byteArray = new Uint16Array(l)),
                    a.channels < a.outputChannels &&
                      a.byteArray.fill(15360, 0, l);
                  break;
                default:
                  console.error("THREE.EXRLoader: unsupported type: ", i);
              }
              return (
                (a.bytesPerLine = a.width * a.inputSize * a.channels),
                4 == a.outputChannels ? (a.format = s.GWd) : (a.format = s.VT0),
                ef ? (a.colorSpace = "srgb-linear") : (a.encoding = 3e3),
                a
              );
            })(_, S, P, O, this.type),
            L = { value: 0 },
            U = { R: 0, G: 1, B: 2, A: 3, Y: 0 };
          for (let e = 0; e < J.height / J.scanlineBlockSize; e++) {
            let t = w(S, O);
            (J.size = w(S, O)),
              (J.lines =
                t + J.scanlineBlockSize > J.height
                  ? J.height - t
                  : J.scanlineBlockSize);
            let r = J.size < J.lines * J.bytesPerLine ? J.uncompress(J) : B(J);
            O.value += J.size;
            for (let t = 0; t < J.scanlineBlockSize; t++) {
              let n = t + e * J.scanlineBlockSize;
              if (n >= J.height) break;
              for (let e = 0; e < J.channels; e++) {
                let i = U[_.channels[e].name];
                for (let a = 0; a < J.width; a++) {
                  L.value =
                    (t * (J.channels * J.width) + e * J.width + a) *
                    J.inputSize;
                  let o =
                    (J.height - 1 - n) * (J.width * J.outputChannels) +
                    a * J.outputChannels +
                    i;
                  J.byteArray[o] = J.getter(r, L);
                }
              }
            }
          }
          return {
            header: _,
            width: J.width,
            height: J.height,
            data: J.byteArray,
            format: J.format,
            [ef ? "colorSpace" : "encoding"]: J[ef ? "colorSpace" : "encoding"],
            type: this.type,
          };
        }
        setDataType(e) {
          return (this.type = e), this;
        }
        load(e, t, r, n) {
          return super.load(
            e,
            function (e, r) {
              ef ? (e.colorSpace = r.colorSpace) : (e.encoding = r.encoding),
                (e.minFilter = s.k6q),
                (e.magFilter = s.k6q),
                (e.generateMipmaps = !1),
                (e.flipY = !1),
                t && t(e, r);
            },
            r,
            n
          );
        }
      }
      var eh = r(27274);
      let ep = (e, t, r) => {
          let n;
          switch (e) {
            case s.OUM:
              n = new Uint8ClampedArray(t * r * 4);
              break;
            case s.ix0:
              n = new Uint16Array(t * r * 4);
              break;
            case s.bkx:
              n = new Uint32Array(t * r * 4);
              break;
            case s.tJf:
              n = new Int8Array(t * r * 4);
              break;
            case s.fBL:
              n = new Int16Array(t * r * 4);
              break;
            case s.Yuy:
              n = new Int32Array(t * r * 4);
              break;
            case s.RQf:
              n = new Float32Array(t * r * 4);
              break;
            default:
              throw Error("Unsupported data type");
          }
          return n;
        },
        em = (e, t, r, i) => {
          if (void 0 !== n) return n;
          let a = new s.nWS(1, 1, i);
          t.setRenderTarget(a);
          let o = new s.eaF(new s.bdM(), new s.V9B({ color: 0xffffff }));
          t.render(o, r), t.setRenderTarget(null);
          let l = ep(e, a.width, a.height);
          return (
            t.readRenderTargetPixels(a, 0, 0, a.width, a.height, l),
            a.dispose(),
            o.geometry.dispose(),
            o.material.dispose(),
            (n = 0 !== l[0])
          );
        };
      class eB {
        constructor(e) {
          var t, r, n, i, a, o, l, u, c, d, f, A, h, p, m, B;
          (this._rendererIsDisposable = !1),
            (this._supportsReadPixels = !0),
            (this.render = () => {
              this._renderer.setRenderTarget(this._renderTarget);
              try {
                this._renderer.render(this._scene, this._camera);
              } catch (e) {
                throw (this._renderer.setRenderTarget(null), e);
              }
              this._renderer.setRenderTarget(null);
            }),
            (this._width = e.width),
            (this._height = e.height),
            (this._type = e.type),
            (this._colorSpace = e.colorSpace);
          let C = {
            format: s.GWd,
            depthBuffer: !1,
            stencilBuffer: !1,
            type: this._type,
            colorSpace: this._colorSpace,
            anisotropy:
              (null === (t = e.renderTargetOptions) || void 0 === t
                ? void 0
                : t.anisotropy) !== void 0
                ? null === (r = e.renderTargetOptions) || void 0 === r
                  ? void 0
                  : r.anisotropy
                : 1,
            generateMipmaps:
              (null === (n = e.renderTargetOptions) || void 0 === n
                ? void 0
                : n.generateMipmaps) !== void 0 &&
              (null === (i = e.renderTargetOptions) || void 0 === i
                ? void 0
                : i.generateMipmaps),
            magFilter:
              (null === (a = e.renderTargetOptions) || void 0 === a
                ? void 0
                : a.magFilter) !== void 0
                ? null === (o = e.renderTargetOptions) || void 0 === o
                  ? void 0
                  : o.magFilter
                : s.k6q,
            minFilter:
              (null === (l = e.renderTargetOptions) || void 0 === l
                ? void 0
                : l.minFilter) !== void 0
                ? null === (u = e.renderTargetOptions) || void 0 === u
                  ? void 0
                  : u.minFilter
                : s.k6q,
            samples:
              (null === (c = e.renderTargetOptions) || void 0 === c
                ? void 0
                : c.samples) !== void 0
                ? null === (d = e.renderTargetOptions) || void 0 === d
                  ? void 0
                  : d.samples
                : void 0,
            wrapS:
              (null === (f = e.renderTargetOptions) || void 0 === f
                ? void 0
                : f.wrapS) !== void 0
                ? null === (A = e.renderTargetOptions) || void 0 === A
                  ? void 0
                  : A.wrapS
                : s.ghU,
            wrapT:
              (null === (h = e.renderTargetOptions) || void 0 === h
                ? void 0
                : h.wrapT) !== void 0
                ? null === (p = e.renderTargetOptions) || void 0 === p
                  ? void 0
                  : p.wrapT
                : s.ghU,
          };
          if (
            ((this._material = e.material),
            e.renderer
              ? (this._renderer = e.renderer)
              : ((this._renderer = eB.instantiateRenderer()),
                (this._rendererIsDisposable = !0)),
            (this._scene = new s.Z58()),
            (this._camera = new s.qUd()),
            this._camera.position.set(0, 0, 10),
            (this._camera.left = -0.5),
            (this._camera.right = 0.5),
            (this._camera.top = 0.5),
            (this._camera.bottom = -0.5),
            this._camera.updateProjectionMatrix(),
            !em(this._type, this._renderer, this._camera, C))
          ) {
            let e;
            this._type === s.ix0 &&
              (e = this._renderer.extensions.has("EXT_color_buffer_float")
                ? s.RQf
                : void 0),
              void 0 !== e
                ? (console.warn(
                    `This browser does not support reading pixels from ${this._type} RenderTargets, switching to ${s.RQf}`
                  ),
                  (this._type = e))
                : ((this._supportsReadPixels = !1),
                  console.warn(
                    "This browser dos not support toArray or toDataTexture, calls to those methods will result in an error thrown"
                  ));
          }
          (this._quad = new s.eaF(new s.bdM(), this._material)),
            this._quad.geometry.computeBoundingBox(),
            this._scene.add(this._quad),
            (this._renderTarget = new s.nWS(this.width, this.height, C)),
            (this._renderTarget.texture.mapping =
              (null === (m = e.renderTargetOptions) || void 0 === m
                ? void 0
                : m.mapping) !== void 0
                ? null === (B = e.renderTargetOptions) || void 0 === B
                  ? void 0
                  : B.mapping
                : s.UTZ);
        }
        static instantiateRenderer() {
          let e = new eh.WebGLRenderer();
          return e.setSize(128, 128), e;
        }
        toArray() {
          if (!this._supportsReadPixels)
            throw Error("Can't read pixels in this browser");
          let e = ep(this._type, this._width, this._height);
          return (
            this._renderer.readRenderTargetPixels(
              this._renderTarget,
              0,
              0,
              this._width,
              this._height,
              e
            ),
            e
          );
        }
        toDataTexture(e) {
          let t = new s.GYF(
            this.toArray(),
            this.width,
            this.height,
            s.GWd,
            this._type,
            (null == e ? void 0 : e.mapping) || s.UTZ,
            (null == e ? void 0 : e.wrapS) || s.ghU,
            (null == e ? void 0 : e.wrapT) || s.ghU,
            (null == e ? void 0 : e.magFilter) || s.k6q,
            (null == e ? void 0 : e.minFilter) || s.k6q,
            (null == e ? void 0 : e.anisotropy) || 1,
            s.Zr2
          );
          return (
            (t.generateMipmaps =
              (null == e ? void 0 : e.generateMipmaps) !== void 0 &&
              (null == e ? void 0 : e.generateMipmaps)),
            t
          );
        }
        disposeOnDemandRenderer() {
          this._renderer.setRenderTarget(null),
            this._rendererIsDisposable &&
              (this._renderer.dispose(), this._renderer.forceContextLoss());
        }
        dispose(e) {
          this.disposeOnDemandRenderer(),
            e && this.renderTarget.dispose(),
            this.material instanceof s.BKk &&
              Object.values(this.material.uniforms).forEach((e) => {
                e.value instanceof s.gPd && e.value.dispose();
              }),
            Object.values(this.material).forEach((e) => {
              e instanceof s.gPd && e.dispose();
            }),
            this.material.dispose(),
            this._quad.geometry.dispose();
        }
        get width() {
          return this._width;
        }
        set width(e) {
          (this._width = e),
            this._renderTarget.setSize(this._width, this._height);
        }
        get height() {
          return this._height;
        }
        set height(e) {
          (this._height = e),
            this._renderTarget.setSize(this._width, this._height);
        }
        get renderer() {
          return this._renderer;
        }
        get renderTarget() {
          return this._renderTarget;
        }
        set renderTarget(e) {
          (this._renderTarget = e),
            (this._width = e.width),
            (this._height = e.height);
        }
        get material() {
          return this._material;
        }
        get type() {
          return this._type;
        }
        get colorSpace() {
          return this._colorSpace;
        }
      }
      let eC = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
        eg = `
// min half float value
#define HALF_FLOAT_MIN vec3( -65504, -65504, -65504 )
// max half float value
#define HALF_FLOAT_MAX vec3( 65504, 65504, 65504 )

uniform sampler2D sdr;
uniform sampler2D gainMap;
uniform vec3 gamma;
uniform vec3 offsetHdr;
uniform vec3 offsetSdr;
uniform vec3 gainMapMin;
uniform vec3 gainMapMax;
uniform float weightFactor;

varying vec2 vUv;

void main() {
  vec3 rgb = texture2D( sdr, vUv ).rgb;
  vec3 recovery = texture2D( gainMap, vUv ).rgb;
  vec3 logRecovery = pow( recovery, gamma );
  vec3 logBoost = gainMapMin * ( 1.0 - logRecovery ) + gainMapMax * logRecovery;
  vec3 hdrColor = (rgb + offsetSdr) * exp2( logBoost * weightFactor ) - offsetHdr;
  vec3 clampedHdrColor = max( HALF_FLOAT_MIN, min( HALF_FLOAT_MAX, hdrColor ));
  gl_FragColor = vec4( clampedHdrColor , 1.0 );
}
`;
      class ev extends s.BKk {
        constructor({
          gamma: e,
          offsetHdr: t,
          offsetSdr: r,
          gainMapMin: n,
          gainMapMax: i,
          maxDisplayBoost: a,
          hdrCapacityMin: o,
          hdrCapacityMax: l,
          sdr: u,
          gainMap: c,
        }) {
          super({
            name: "GainMapDecoderMaterial",
            vertexShader: eC,
            fragmentShader: eg,
            uniforms: {
              sdr: { value: u },
              gainMap: { value: c },
              gamma: { value: new s.Pq0(1 / e[0], 1 / e[1], 1 / e[2]) },
              offsetHdr: { value: new s.Pq0().fromArray(t) },
              offsetSdr: { value: new s.Pq0().fromArray(r) },
              gainMapMin: { value: new s.Pq0().fromArray(n) },
              gainMapMax: { value: new s.Pq0().fromArray(i) },
              weightFactor: { value: (Math.log2(a) - o) / (l - o) },
            },
            blending: s.XIg,
            depthTest: !1,
            depthWrite: !1,
          }),
            (this._maxDisplayBoost = a),
            (this._hdrCapacityMin = o),
            (this._hdrCapacityMax = l),
            (this.needsUpdate = !0),
            (this.uniformsNeedUpdate = !0);
        }
        get sdr() {
          return this.uniforms.sdr.value;
        }
        set sdr(e) {
          this.uniforms.sdr.value = e;
        }
        get gainMap() {
          return this.uniforms.gainMap.value;
        }
        set gainMap(e) {
          this.uniforms.gainMap.value = e;
        }
        get offsetHdr() {
          return this.uniforms.offsetHdr.value.toArray();
        }
        set offsetHdr(e) {
          this.uniforms.offsetHdr.value.fromArray(e);
        }
        get offsetSdr() {
          return this.uniforms.offsetSdr.value.toArray();
        }
        set offsetSdr(e) {
          this.uniforms.offsetSdr.value.fromArray(e);
        }
        get gainMapMin() {
          return this.uniforms.gainMapMin.value.toArray();
        }
        set gainMapMin(e) {
          this.uniforms.gainMapMin.value.fromArray(e);
        }
        get gainMapMax() {
          return this.uniforms.gainMapMax.value.toArray();
        }
        set gainMapMax(e) {
          this.uniforms.gainMapMax.value.fromArray(e);
        }
        get gamma() {
          let e = this.uniforms.gamma.value;
          return [1 / e.x, 1 / e.y, 1 / e.z];
        }
        set gamma(e) {
          let t = this.uniforms.gamma.value;
          (t.x = 1 / e[0]), (t.y = 1 / e[1]), (t.z = 1 / e[2]);
        }
        get hdrCapacityMin() {
          return this._hdrCapacityMin;
        }
        set hdrCapacityMin(e) {
          (this._hdrCapacityMin = e), this.calculateWeight();
        }
        get hdrCapacityMax() {
          return this._hdrCapacityMax;
        }
        set hdrCapacityMax(e) {
          (this._hdrCapacityMax = e), this.calculateWeight();
        }
        get maxDisplayBoost() {
          return this._maxDisplayBoost;
        }
        set maxDisplayBoost(e) {
          (this._maxDisplayBoost = Math.max(1, Math.min(65504, e))),
            this.calculateWeight();
        }
        calculateWeight() {
          let e =
            (Math.log2(this._maxDisplayBoost) - this._hdrCapacityMin) /
            (this._hdrCapacityMax - this._hdrCapacityMin);
          this.uniforms.weightFactor.value = Math.max(0, Math.min(1, e));
        }
      }
      class eb extends Error {}
      class ey extends Error {}
      let eE = (e, t, r) => {
          let n = RegExp(`${t}="([^"]*)"`, "i").exec(e);
          if (n) return n[1];
          let i = RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`, "i").exec(e);
          if (i) {
            let e = i[1].match(/<rdf:li>([^<]*)<\/rdf:li>/g);
            return e && 3 === e.length
              ? e.map((e) => e.replace(/<\/?rdf:li>/g, ""))
              : i[1].trim();
          }
          if (void 0 !== r) return r;
          throw Error(`Can't find ${t} in gainmap metadata`);
        },
        eM = (e) => {
          let t;
          "undefined" != typeof TextDecoder
            ? (t = new TextDecoder().decode(e))
            : (t = e.toString());
          let r = t.indexOf("<x:xmpmeta");
          for (; -1 !== r; ) {
            let e = t.indexOf("x:xmpmeta>", r),
              n = t.slice(r, e + 10);
            try {
              let e = eE(n, "hdrgm:GainMapMin", "0"),
                t = eE(n, "hdrgm:GainMapMax"),
                r = eE(n, "hdrgm:Gamma", "1"),
                i = eE(n, "hdrgm:OffsetSDR", "0.015625"),
                a = eE(n, "hdrgm:OffsetHDR", "0.015625"),
                o = /hdrgm:HDRCapacityMin="([^"]*)"/.exec(n),
                s = o ? o[1] : "0",
                l = /hdrgm:HDRCapacityMax="([^"]*)"/.exec(n);
              if (!l) throw Error("Incomplete gainmap metadata");
              let u = l[1];
              return {
                gainMapMin: Array.isArray(e)
                  ? e.map((e) => parseFloat(e))
                  : [parseFloat(e), parseFloat(e), parseFloat(e)],
                gainMapMax: Array.isArray(t)
                  ? t.map((e) => parseFloat(e))
                  : [parseFloat(t), parseFloat(t), parseFloat(t)],
                gamma: Array.isArray(r)
                  ? r.map((e) => parseFloat(e))
                  : [parseFloat(r), parseFloat(r), parseFloat(r)],
                offsetSdr: Array.isArray(i)
                  ? i.map((e) => parseFloat(e))
                  : [parseFloat(i), parseFloat(i), parseFloat(i)],
                offsetHdr: Array.isArray(a)
                  ? a.map((e) => parseFloat(e))
                  : [parseFloat(a), parseFloat(a), parseFloat(a)],
                hdrCapacityMin: parseFloat(s),
                hdrCapacityMax: parseFloat(u),
              };
            } catch (e) {}
            r = t.indexOf("<x:xmpmeta", e);
          }
        };
      class ew {
        constructor(e) {
          this.options = {
            debug: !!e && void 0 !== e.debug && e.debug,
            extractFII: !e || void 0 === e.extractFII || e.extractFII,
            extractNonFII: !e || void 0 === e.extractNonFII || e.extractNonFII,
          };
        }
        extract(e) {
          return new Promise((t, r) => {
            let n;
            let i = this.options.debug,
              a = new DataView(e.buffer);
            if (65496 !== a.getUint16(0)) {
              r(Error("Not a valid jpeg"));
              return;
            }
            let o = a.byteLength,
              s = 2,
              l = 0;
            for (; s < o; ) {
              if (++l > 250) {
                r(Error(`Found no marker after ${l} loops 😵`));
                return;
              }
              if (255 !== a.getUint8(s)) {
                r(
                  Error(
                    `Not a valid marker at offset 0x${s.toString(
                      16
                    )}, found: 0x${a.getUint8(s).toString(16)}`
                  )
                );
                return;
              }
              if (
                ((n = a.getUint8(s + 1)),
                i && console.log(`Marker: ${n.toString(16)}`),
                226 === n)
              ) {
                i && console.log("Found APP2 marker (0xffe2)");
                let e = s + 4;
                if (0x4d504600 === a.getUint32(e)) {
                  let n;
                  let i = e + 4;
                  if (18761 === a.getUint16(i)) n = !1;
                  else if (19789 === a.getUint16(i)) n = !0;
                  else {
                    r(Error("No valid endianness marker found in TIFF header"));
                    return;
                  }
                  if (42 !== a.getUint16(i + 2, !n)) {
                    r(Error("Not valid TIFF data! (no 0x002A marker)"));
                    return;
                  }
                  let o = a.getUint32(i + 4, !n);
                  if (o < 8) {
                    r(Error("Not valid TIFF data! (First offset less than 8)"));
                    return;
                  }
                  let s = i + o,
                    l = a.getUint16(s, !n),
                    u = s + 2,
                    c = 0;
                  for (let e = u; e < u + 12 * l; e += 12)
                    45057 === a.getUint16(e, !n) &&
                      (c = a.getUint32(e + 8, !n));
                  let d = s + 2 + 12 * l + 4,
                    f = [];
                  for (let e = d; e < d + 16 * c; e += 16) {
                    let t = {
                      MPType: a.getUint32(e, !n),
                      size: a.getUint32(e + 4, !n),
                      dataOffset: a.getUint32(e + 8, !n),
                      dependantImages: a.getUint32(e + 12, !n),
                      start: -1,
                      end: -1,
                      isFII: !1,
                    };
                    t.dataOffset
                      ? ((t.start = i + t.dataOffset), (t.isFII = !1))
                      : ((t.start = 0), (t.isFII = !0)),
                      (t.end = t.start + t.size),
                      f.push(t);
                  }
                  if (this.options.extractNonFII && f.length) {
                    let e = new Blob([a]),
                      r = [];
                    for (let t of f) {
                      if (t.isFII && !this.options.extractFII) continue;
                      let n = e.slice(t.start, t.end + 1, "image/jpeg");
                      r.push(n);
                    }
                    t(r);
                  }
                }
              }
              s += 2 + a.getUint16(s + 2);
            }
          });
        }
      }
      let eF = async (e) => {
          let t = eM(e);
          if (!t) throw new ey("Gain map XMP metadata not found");
          let r = new ew({ extractFII: !0, extractNonFII: !0 }),
            n = await r.extract(e);
          if (2 !== n.length) throw new eb("Gain map recovery image not found");
          return {
            sdr: new Uint8Array(await n[0].arrayBuffer()),
            gainMap: new Uint8Array(await n[1].arrayBuffer()),
            metadata: t,
          };
        },
        eI = (e) =>
          new Promise((t, r) => {
            let n = document.createElement("img");
            (n.onload = () => {
              t(n);
            }),
              (n.onerror = (e) => {
                r(e);
              }),
              (n.src = URL.createObjectURL(e));
          });
      class eR extends s.aHM {
        constructor(e, t) {
          super(t),
            e && (this._renderer = e),
            (this._internalLoadingManager = new s.KPJ());
        }
        setRenderer(e) {
          return (this._renderer = e), this;
        }
        setRenderTargetOptions(e) {
          return (this._renderTargetOptions = e), this;
        }
        prepareQuadRenderer() {
          this._renderer ||
            console.warn(
              "WARNING: An existing WebGL Renderer was not passed to this Loader constructor or in setRenderer, the result of this Loader will need to be converted to a Data Texture with toDataTexture() before you can use it in your renderer."
            );
          let e = new ev({
            gainMapMax: [1, 1, 1],
            gainMapMin: [0, 0, 0],
            gamma: [1, 1, 1],
            offsetHdr: [1, 1, 1],
            offsetSdr: [1, 1, 1],
            hdrCapacityMax: 1,
            hdrCapacityMin: 0,
            maxDisplayBoost: 1,
            gainMap: new s.gPd(),
            sdr: new s.gPd(),
          });
          return new eB({
            width: 16,
            height: 16,
            type: s.ix0,
            colorSpace: s.Zr2,
            material: e,
            renderer: this._renderer,
            renderTargetOptions: this._renderTargetOptions,
          });
        }
        async render(e, t, r, n) {
          let i, a;
          let o = n ? new Blob([n], { type: "image/jpeg" }) : void 0,
            l = new Blob([r], { type: "image/jpeg" }),
            u = !1;
          if ("undefined" == typeof createImageBitmap) {
            let e = await Promise.all([
              o ? eI(o) : Promise.resolve(void 0),
              eI(l),
            ]);
            (a = e[0]), (i = e[1]), (u = !0);
          } else {
            let e = await Promise.all([
              o
                ? createImageBitmap(o, { imageOrientation: "flipY" })
                : Promise.resolve(void 0),
              createImageBitmap(l, { imageOrientation: "flipY" }),
            ]);
            (a = e[0]), (i = e[1]);
          }
          let c = new s.gPd(
            a || new ImageData(2, 2),
            s.UTZ,
            s.ghU,
            s.ghU,
            s.k6q,
            s.NZq,
            s.GWd,
            s.OUM,
            1,
            s.Zr2
          );
          (c.flipY = u), (c.needsUpdate = !0);
          let d = new s.gPd(
            i,
            s.UTZ,
            s.ghU,
            s.ghU,
            s.k6q,
            s.NZq,
            s.GWd,
            s.OUM,
            1,
            s.er$
          );
          (d.flipY = u),
            (d.needsUpdate = !0),
            (e.width = i.width),
            (e.height = i.height),
            (e.material.gainMap = c),
            (e.material.sdr = d),
            (e.material.gainMapMin = t.gainMapMin),
            (e.material.gainMapMax = t.gainMapMax),
            (e.material.offsetHdr = t.offsetHdr),
            (e.material.offsetSdr = t.offsetSdr),
            (e.material.gamma = t.gamma),
            (e.material.hdrCapacityMin = t.hdrCapacityMin),
            (e.material.hdrCapacityMax = t.hdrCapacityMax),
            (e.material.maxDisplayBoost = Math.pow(2, t.hdrCapacityMax)),
            (e.material.needsUpdate = !0),
            e.render();
        }
      }
      class ex extends eR {
        load([e, t, r], n, i, a) {
          let o, l, u;
          let c = this.prepareQuadRenderer(),
            d = async () => {
              if (o && l && u) {
                try {
                  await this.render(c, u, o, l);
                } catch (n) {
                  this.manager.itemError(e),
                    this.manager.itemError(t),
                    this.manager.itemError(r),
                    "function" == typeof a && a(n),
                    c.disposeOnDemandRenderer();
                  return;
                }
                "function" == typeof n && n(c),
                  this.manager.itemEnd(e),
                  this.manager.itemEnd(t),
                  this.manager.itemEnd(r),
                  c.disposeOnDemandRenderer();
              }
            },
            f = !0,
            A = 0,
            h = 0,
            p = !0,
            m = 0,
            B = 0,
            C = !0,
            g = 0,
            v = 0,
            b = () => {
              "function" == typeof i &&
                i(
                  new ProgressEvent("progress", {
                    lengthComputable: f && p && C,
                    loaded: h + B + v,
                    total: A + m + g,
                  })
                );
            };
          this.manager.itemStart(e),
            this.manager.itemStart(t),
            this.manager.itemStart(r);
          let y = new s.Y9S(this._internalLoadingManager);
          y.setResponseType("arraybuffer"),
            y.setRequestHeader(this.requestHeader),
            y.setPath(this.path),
            y.setWithCredentials(this.withCredentials),
            y.load(
              e,
              async (e) => {
                if ("string" == typeof e) throw Error("Invalid sdr buffer");
                (o = e), await d();
              },
              (e) => {
                (f = e.lengthComputable), (h = e.loaded), (A = e.total), b();
              },
              (t) => {
                this.manager.itemError(e), "function" == typeof a && a(t);
              }
            );
          let E = new s.Y9S(this._internalLoadingManager);
          E.setResponseType("arraybuffer"),
            E.setRequestHeader(this.requestHeader),
            E.setPath(this.path),
            E.setWithCredentials(this.withCredentials),
            E.load(
              t,
              async (e) => {
                if ("string" == typeof e) throw Error("Invalid gainmap buffer");
                (l = e), await d();
              },
              (e) => {
                (p = e.lengthComputable), (B = e.loaded), (m = e.total), b();
              },
              (e) => {
                this.manager.itemError(t), "function" == typeof a && a(e);
              }
            );
          let M = new s.Y9S(this._internalLoadingManager);
          return (
            M.setRequestHeader(this.requestHeader),
            M.setPath(this.path),
            M.setWithCredentials(this.withCredentials),
            M.load(
              r,
              async (e) => {
                if ("string" != typeof e)
                  throw Error("Invalid metadata string");
                (u = JSON.parse(e)), await d();
              },
              (e) => {
                (C = e.lengthComputable), (v = e.loaded), (g = e.total), b();
              },
              (e) => {
                this.manager.itemError(r), "function" == typeof a && a(e);
              }
            ),
            c
          );
        }
      }
      class eG extends eR {
        load(e, t, r, n) {
          let i = this.prepareQuadRenderer(),
            a = new s.Y9S(this._internalLoadingManager);
          return (
            a.setResponseType("arraybuffer"),
            a.setRequestHeader(this.requestHeader),
            a.setPath(this.path),
            a.setWithCredentials(this.withCredentials),
            this.manager.itemStart(e),
            a.load(
              e,
              async (r) => {
                let a, o, s;
                if ("string" == typeof r)
                  throw Error(
                    "Invalid buffer, received [string], was expecting [ArrayBuffer]"
                  );
                let l = new Uint8Array(r);
                try {
                  let e = await eF(l);
                  (a = e.sdr), (o = e.gainMap), (s = e.metadata);
                } catch (t) {
                  if (t instanceof ey || t instanceof eb)
                    console.warn(
                      `Failure to reconstruct an HDR image from ${e}: Gain map metadata not found in the file, HDRJPGLoader will render the SDR jpeg`
                    ),
                      (s = {
                        gainMapMin: [0, 0, 0],
                        gainMapMax: [1, 1, 1],
                        gamma: [1, 1, 1],
                        hdrCapacityMin: 0,
                        hdrCapacityMax: 1,
                        offsetHdr: [0, 0, 0],
                        offsetSdr: [0, 0, 0],
                      }),
                      (a = l);
                  else throw t;
                }
                try {
                  await this.render(i, s, a, o);
                } catch (t) {
                  this.manager.itemError(e),
                    "function" == typeof n && n(t),
                    i.disposeOnDemandRenderer();
                  return;
                }
                "function" == typeof t && t(i),
                  this.manager.itemEnd(e),
                  i.disposeOnDemandRenderer();
              },
              r,
              (t) => {
                this.manager.itemError(e), "function" == typeof n && n(t);
              }
            ),
            i
          );
        }
      }
      let eD = {
        apartment: "lebombo_1k.hdr",
        city: "potsdamer_platz_1k.hdr",
        dawn: "kiara_1_dawn_1k.hdr",
        forest: "forest_slope_1k.hdr",
        lobby: "st_fagans_interior_1k.hdr",
        night: "dikhololo_night_1k.hdr",
        park: "rooitou_park_1k.hdr",
        studio: "studio_small_03_1k.hdr",
        sunset: "venice_sunset_1k.hdr",
        warehouse: "empty_warehouse_01_1k.hdr",
      };
      var eT = r(38029);
      let eH =
          "https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/",
        eS = (e) => Array.isArray(e),
        eP = ["/px.png", "/nx.png", "/py.png", "/ny.png", "/pz.png", "/nz.png"];
      function eO({
        files: e = eP,
        path: t = "",
        preset: r,
        encoding: n,
        extensions: i,
      } = {}) {
        let l = null,
          u = !1;
        r && (eL(r), (e = eD[r]), (t = eH)), (u = eS(e));
        let { extension: c, isCubemap: d } = eU(e);
        if (!(l = ek(c)))
          throw Error("useEnvironment: Unrecognized file extension: " + e);
        let f = (0, o.C)((e) => e.gl);
        (0, a.useLayoutEffect)(() => {
          ("webp" === c || "jpg" === c || "jpeg" === c) &&
            f.domElement.addEventListener(
              "webglcontextlost",
              function () {
                o.G.clear(l, u ? [e] : e);
              },
              { once: !0 }
            );
        }, [e, f.domElement]);
        let A = (0, o.G)(l, u ? [e] : e, (e) => {
            ("webp" === c || "jpg" === c || "jpeg" === c) && e.setRenderer(f),
              null == e.setPath || e.setPath(t),
              i && i(e);
          }),
          h = u ? A[0] : A;
        if ("jpg" === c || "jpeg" === c || "webp" === c) {
          var p;
          h = null == (p = h.renderTarget) ? void 0 : p.texture;
        }
        return (
          (h.mapping = d ? s.hy7 : s.wfO),
          "colorSpace" in h
            ? (h.colorSpace = (null != n ? n : d) ? "srgb" : "srgb-linear")
            : (h.encoding = (null != n ? n : d) ? eT.S2 : eT.tg),
          h
        );
      }
      let e_ = { files: eP, path: "", preset: void 0, extensions: void 0 };
      eO.preload = (e) => {
        let t = { ...e_, ...e },
          { files: r, path: n = "" } = t,
          { preset: i, extensions: a } = t;
        i && (eL(i), (r = eD[i]), (n = eH));
        let { extension: s } = eU(r);
        if ("webp" === s || "jpg" === s || "jpeg" === s)
          throw Error("useEnvironment: Preloading gainmaps is not supported");
        let l = ek(s);
        if (!l)
          throw Error("useEnvironment: Unrecognized file extension: " + r);
        o.G.preload(l, eS(r) ? [r] : r, (e) => {
          null == e.setPath || e.setPath(n), a && a(e);
        });
      };
      let eJ = { files: eP, preset: void 0 };
      function eL(e) {
        if (!(e in eD))
          throw Error("Preset must be one of: " + Object.keys(eD).join(", "));
      }
      function eU(e) {
        var t;
        let r = eS(e) && 6 === e.length,
          n = eS(e) && 3 === e.length && e.some((e) => e.endsWith("json")),
          i = eS(e) ? e[0] : e;
        return {
          extension: r
            ? "cube"
            : n
            ? "webp"
            : i.startsWith("data:application/exr")
            ? "exr"
            : i.startsWith("data:application/hdr")
            ? "hdr"
            : i.startsWith("data:image/jpeg")
            ? "jpg"
            : null == (t = i.split(".").pop()) ||
              null == (t = t.split("?")) ||
              null == (t = t.shift())
            ? void 0
            : t.toLowerCase(),
          isCubemap: r,
          isGainmap: n,
        };
      }
      function ek(e) {
        return "cube" === e
          ? s.ScU
          : "hdr" === e
          ? d
          : "exr" === e
          ? eA
          : "jpg" === e || "jpeg" === e
          ? eG
          : "webp" === e
          ? ex
          : null;
      }
      eO.clear = (e) => {
        let t = { ...eJ, ...e },
          { files: r } = t,
          { preset: n } = t;
        n && (eL(n), (r = eD[n]));
        let { extension: i } = eU(r),
          a = ek(i);
        if (!a)
          throw Error("useEnvironment: Unrecognized file extension: " + r);
        o.G.clear(a, eS(r) ? [r] : r);
      };
      let ej = (e) => e.current && e.current.isScene,
        eK = (e) => (ej(e) ? e.current : e);
      function eN(e, t, r, n, i = {}) {
        var a, s, l, u;
        i = {
          backgroundBlurriness: 0,
          backgroundIntensity: 1,
          backgroundRotation: [0, 0, 0],
          environmentIntensity: 1,
          environmentRotation: [0, 0, 0],
          ...i,
        };
        let c = eK(t || r),
          d = c.background,
          f = c.environment,
          A = {
            backgroundBlurriness: c.backgroundBlurriness,
            backgroundIntensity: c.backgroundIntensity,
            backgroundRotation:
              null !==
                (a =
                  null == (s = c.backgroundRotation) || null == s.clone
                    ? void 0
                    : s.clone()) && void 0 !== a
                ? a
                : [0, 0, 0],
            environmentIntensity: c.environmentIntensity,
            environmentRotation:
              null !==
                (l =
                  null == (u = c.environmentRotation) || null == u.clone
                    ? void 0
                    : u.clone()) && void 0 !== l
                ? l
                : [0, 0, 0],
          };
        return (
          "only" !== e && (c.environment = n),
          e && (c.background = n),
          (0, o.s)(c, i),
          () => {
            "only" !== e && (c.environment = f),
              e && (c.background = d),
              (0, o.s)(c, A);
          }
        );
      }
      function eQ({ scene: e, background: t = !1, map: r, ...n }) {
        let i = (0, o.C)((e) => e.scene);
        return (
          a.useLayoutEffect(() => {
            if (r) return eN(t, e, i, r, n);
          }),
          null
        );
      }
      function eX({
        background: e = !1,
        scene: t,
        blur: r,
        backgroundBlurriness: n,
        backgroundIntensity: i,
        backgroundRotation: s,
        environmentIntensity: l,
        environmentRotation: u,
        ...c
      }) {
        let d = eO(c),
          f = (0, o.C)((e) => e.scene);
        return (
          a.useLayoutEffect(() =>
            eN(e, t, f, d, {
              backgroundBlurriness: null != r ? r : n,
              backgroundIntensity: i,
              backgroundRotation: s,
              environmentIntensity: l,
              environmentRotation: u,
            })
          ),
          a.useEffect(
            () => () => {
              d.dispose();
            },
            [d]
          ),
          null
        );
      }
      function eY({
        children: e,
        near: t = 0.1,
        far: r = 1e3,
        resolution: n = 256,
        frames: i = 1,
        map: l,
        background: u = !1,
        blur: c,
        backgroundBlurriness: d,
        backgroundIntensity: f,
        backgroundRotation: A,
        environmentIntensity: h,
        environmentRotation: p,
        scene: m,
        files: B,
        path: C,
        preset: g,
        extensions: v,
      }) {
        let b = (0, o.C)((e) => e.gl),
          y = (0, o.C)((e) => e.scene),
          E = a.useRef(null),
          [M] = a.useState(() => new s.Z58()),
          w = a.useMemo(() => {
            let e = new s.o6l(n);
            return (e.texture.type = s.ix0), e;
          }, [n]);
        a.useEffect(
          () => () => {
            w.dispose();
          },
          [w]
        ),
          a.useLayoutEffect(() => {
            if (1 === i) {
              let e = b.autoClear;
              (b.autoClear = !0), E.current.update(b, M), (b.autoClear = e);
            }
            return eN(u, m, y, w.texture, {
              backgroundBlurriness: null != c ? c : d,
              backgroundIntensity: f,
              backgroundRotation: A,
              environmentIntensity: h,
              environmentRotation: p,
            });
          }, [e, M, w.texture, m, y, u, i, b]);
        let F = 1;
        return (
          (0, o.D)(() => {
            if (i === 1 / 0 || F < i) {
              let e = b.autoClear;
              (b.autoClear = !0),
                E.current.update(b, M),
                (b.autoClear = e),
                F++;
            }
          }),
          a.createElement(
            a.Fragment,
            null,
            (0, o.p)(
              a.createElement(
                a.Fragment,
                null,
                e,
                a.createElement("cubeCamera", { ref: E, args: [t, r, w] }),
                B || g
                  ? a.createElement(eX, {
                      background: !0,
                      files: B,
                      preset: g,
                      path: C,
                      extensions: v,
                    })
                  : l
                  ? a.createElement(eQ, {
                      background: !0,
                      map: l,
                      extensions: v,
                    })
                  : null
              ),
              M
            )
          )
        );
      }
      function eW(e) {
        var t, r, n, s;
        let l = eO(e),
          u = e.map || l;
        a.useMemo(() => (0, o.e)({ GroundProjectedEnvImpl: c }), []),
          a.useEffect(
            () => () => {
              l.dispose();
            },
            [l]
          );
        let d = a.useMemo(() => [u], [u]),
          f = null == (t = e.ground) ? void 0 : t.height,
          A = null == (r = e.ground) ? void 0 : r.radius,
          h =
            null !== (n = null == (s = e.ground) ? void 0 : s.scale) &&
            void 0 !== n
              ? n
              : 1e3;
        return a.createElement(
          a.Fragment,
          null,
          a.createElement(eQ, (0, i.A)({}, e, { map: u })),
          a.createElement("groundProjectedEnvImpl", {
            args: d,
            scale: h,
            height: f,
            radius: A,
          })
        );
      }
      function eZ(e) {
        return e.ground
          ? a.createElement(eW, e)
          : e.map
          ? a.createElement(eQ, e)
          : e.children
          ? a.createElement(eY, e)
          : a.createElement(eX, e);
      }
    },
    89130: (e, t, r) => {
      "use strict";
      let n;
      r.d(t, { p: () => ec }), r(12115);
      var i = r(80337);
      let a = new WeakMap();
      class o extends i.aHM {
        constructor(e) {
          super(e),
            (this.decoderPath = ""),
            (this.decoderConfig = {}),
            (this.decoderBinary = null),
            (this.decoderPending = null),
            (this.workerLimit = 4),
            (this.workerPool = []),
            (this.workerNextTaskID = 1),
            (this.workerSourceURL = ""),
            (this.defaultAttributeIDs = {
              position: "POSITION",
              normal: "NORMAL",
              color: "COLOR",
              uv: "TEX_COORD",
            }),
            (this.defaultAttributeTypes = {
              position: "Float32Array",
              normal: "Float32Array",
              color: "Float32Array",
              uv: "Float32Array",
            });
        }
        setDecoderPath(e) {
          return (this.decoderPath = e), this;
        }
        setDecoderConfig(e) {
          return (this.decoderConfig = e), this;
        }
        setWorkerLimit(e) {
          return (this.workerLimit = e), this;
        }
        load(e, t, r, n) {
          let a = new i.Y9S(this.manager);
          a.setPath(this.path),
            a.setResponseType("arraybuffer"),
            a.setRequestHeader(this.requestHeader),
            a.setWithCredentials(this.withCredentials),
            a.load(
              e,
              (e) => {
                let r = {
                  attributeIDs: this.defaultAttributeIDs,
                  attributeTypes: this.defaultAttributeTypes,
                  useUniqueIDs: !1,
                };
                this.decodeGeometry(e, r).then(t).catch(n);
              },
              r,
              n
            );
        }
        decodeDracoFile(e, t, r, n) {
          let i = {
            attributeIDs: r || this.defaultAttributeIDs,
            attributeTypes: n || this.defaultAttributeTypes,
            useUniqueIDs: !!r,
          };
          this.decodeGeometry(e, i).then(t);
        }
        decodeGeometry(e, t) {
          let r;
          for (let e in t.attributeTypes) {
            let r = t.attributeTypes[e];
            void 0 !== r.BYTES_PER_ELEMENT && (t.attributeTypes[e] = r.name);
          }
          let n = JSON.stringify(t);
          if (a.has(e)) {
            let t = a.get(e);
            if (t.key === n) return t.promise;
            if (0 === e.byteLength)
              throw Error(
                "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
              );
          }
          let i = this.workerNextTaskID++,
            o = e.byteLength,
            s = this._getWorker(i, o)
              .then(
                (n) => (
                  (r = n),
                  new Promise((n, a) => {
                    (r._callbacks[i] = { resolve: n, reject: a }),
                      r.postMessage(
                        { type: "decode", id: i, taskConfig: t, buffer: e },
                        [e]
                      );
                  })
                )
              )
              .then((e) => this._createGeometry(e.geometry));
          return (
            s
              .catch(() => !0)
              .then(() => {
                r && i && this._releaseTask(r, i);
              }),
            a.set(e, { key: n, promise: s }),
            s
          );
        }
        _createGeometry(e) {
          let t = new i.LoY();
          e.index && t.setIndex(new i.THS(e.index.array, 1));
          for (let r = 0; r < e.attributes.length; r++) {
            let n = e.attributes[r],
              a = n.name,
              o = n.array,
              s = n.itemSize;
            t.setAttribute(a, new i.THS(o, s));
          }
          return t;
        }
        _loadLibrary(e, t) {
          let r = new i.Y9S(this.manager);
          return (
            r.setPath(this.decoderPath),
            r.setResponseType(t),
            r.setWithCredentials(this.withCredentials),
            new Promise((t, n) => {
              r.load(e, t, void 0, n);
            })
          );
        }
        preload() {
          return this._initDecoder(), this;
        }
        _initDecoder() {
          if (this.decoderPending) return this.decoderPending;
          let e =
              "object" != typeof WebAssembly ||
              "js" === this.decoderConfig.type,
            t = [];
          return (
            e
              ? t.push(this._loadLibrary("draco_decoder.js", "text"))
              : (t.push(this._loadLibrary("draco_wasm_wrapper.js", "text")),
                t.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))),
            (this.decoderPending = Promise.all(t).then((t) => {
              let r = t[0];
              e || (this.decoderConfig.wasmBinary = t[1]);
              let n = s.toString(),
                i = [
                  "/* draco decoder */",
                  r,
                  "",
                  "/* worker */",
                  n.substring(n.indexOf("{") + 1, n.lastIndexOf("}")),
                ].join("\n");
              this.workerSourceURL = URL.createObjectURL(new Blob([i]));
            })),
            this.decoderPending
          );
        }
        _getWorker(e, t) {
          return this._initDecoder().then(() => {
            if (this.workerPool.length < this.workerLimit) {
              let e = new Worker(this.workerSourceURL);
              (e._callbacks = {}),
                (e._taskCosts = {}),
                (e._taskLoad = 0),
                e.postMessage({
                  type: "init",
                  decoderConfig: this.decoderConfig,
                }),
                (e.onmessage = function (t) {
                  let r = t.data;
                  switch (r.type) {
                    case "decode":
                      e._callbacks[r.id].resolve(r);
                      break;
                    case "error":
                      e._callbacks[r.id].reject(r);
                      break;
                    default:
                      console.error(
                        'THREE.DRACOLoader: Unexpected message, "' +
                          r.type +
                          '"'
                      );
                  }
                }),
                this.workerPool.push(e);
            } else
              this.workerPool.sort(function (e, t) {
                return e._taskLoad > t._taskLoad ? -1 : 1;
              });
            let r = this.workerPool[this.workerPool.length - 1];
            return (r._taskCosts[e] = t), (r._taskLoad += t), r;
          });
        }
        _releaseTask(e, t) {
          (e._taskLoad -= e._taskCosts[t]),
            delete e._callbacks[t],
            delete e._taskCosts[t];
        }
        debug() {
          console.log(
            "Task load: ",
            this.workerPool.map((e) => e._taskLoad)
          );
        }
        dispose() {
          for (let e = 0; e < this.workerPool.length; ++e)
            this.workerPool[e].terminate();
          return (this.workerPool.length = 0), this;
        }
      }
      function s() {
        let e, t;
        onmessage = function (r) {
          let n = r.data;
          switch (n.type) {
            case "init":
              (e = n.decoderConfig),
                (t = new Promise(function (t) {
                  (e.onModuleLoaded = function (e) {
                    t({ draco: e });
                  }),
                    DracoDecoderModule(e);
                }));
              break;
            case "decode":
              let i = n.buffer,
                a = n.taskConfig;
              t.then((e) => {
                let t = e.draco,
                  r = new t.Decoder(),
                  o = new t.DecoderBuffer();
                o.Init(new Int8Array(i), i.byteLength);
                try {
                  let e = (function (e, t, r, n) {
                      let i, a;
                      let o = n.attributeIDs,
                        s = n.attributeTypes,
                        l = t.GetEncodedGeometryType(r);
                      if (l === e.TRIANGULAR_MESH)
                        (i = new e.Mesh()), (a = t.DecodeBufferToMesh(r, i));
                      else if (l === e.POINT_CLOUD)
                        (i = new e.PointCloud()),
                          (a = t.DecodeBufferToPointCloud(r, i));
                      else
                        throw Error(
                          "THREE.DRACOLoader: Unexpected geometry type."
                        );
                      if (!a.ok() || 0 === i.ptr)
                        throw Error(
                          "THREE.DRACOLoader: Decoding failed: " + a.error_msg()
                        );
                      let u = { index: null, attributes: [] };
                      for (let r in o) {
                        let a, l;
                        let c = self[s[r]];
                        if (n.useUniqueIDs)
                          (l = o[r]), (a = t.GetAttributeByUniqueId(i, l));
                        else {
                          if (-1 === (l = t.GetAttributeId(i, e[o[r]])))
                            continue;
                          a = t.GetAttribute(i, l);
                        }
                        u.attributes.push(
                          (function (e, t, r, n, i, a) {
                            let o = a.num_components(),
                              s = r.num_points() * o,
                              l = s * i.BYTES_PER_ELEMENT,
                              u = (function (e, t) {
                                switch (t) {
                                  case Float32Array:
                                    return e.DT_FLOAT32;
                                  case Int8Array:
                                    return e.DT_INT8;
                                  case Int16Array:
                                    return e.DT_INT16;
                                  case Int32Array:
                                    return e.DT_INT32;
                                  case Uint8Array:
                                    return e.DT_UINT8;
                                  case Uint16Array:
                                    return e.DT_UINT16;
                                  case Uint32Array:
                                    return e.DT_UINT32;
                                }
                              })(e, i),
                              c = e._malloc(l);
                            t.GetAttributeDataArrayForAllPoints(r, a, u, l, c);
                            let d = new i(e.HEAPF32.buffer, c, s).slice();
                            return (
                              e._free(c), { name: n, array: d, itemSize: o }
                            );
                          })(e, t, i, r, c, a)
                        );
                      }
                      return (
                        l === e.TRIANGULAR_MESH &&
                          (u.index = (function (e, t, r) {
                            let n = 3 * r.num_faces(),
                              i = 4 * n,
                              a = e._malloc(i);
                            t.GetTrianglesUInt32Array(r, i, a);
                            let o = new Uint32Array(
                              e.HEAPF32.buffer,
                              a,
                              n
                            ).slice();
                            return e._free(a), { array: o, itemSize: 1 };
                          })(e, t, i)),
                        e.destroy(i),
                        u
                      );
                    })(t, r, o, a),
                    i = e.attributes.map((e) => e.array.buffer);
                  e.index && i.push(e.index.array.buffer),
                    self.postMessage(
                      { type: "decode", id: n.id, geometry: e },
                      i
                    );
                } catch (e) {
                  console.error(e),
                    self.postMessage({
                      type: "error",
                      id: n.id,
                      error: e.message,
                    });
                } finally {
                  t.destroy(o), t.destroy(r);
                }
              });
          }
        };
      }
      let l = () => {
        let e;
        if (n) return n;
        let t = new Uint8Array([
            0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 3, 2, 0, 0, 5, 3,
            1, 0, 1, 12, 1, 0, 10, 22, 2, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10,
            0, 0, 11, 7, 0, 65, 0, 253, 15, 26, 11,
          ]),
          r = new Uint8Array([
            32, 0, 65, 253, 3, 1, 2, 34, 4, 106, 6, 5, 11, 8, 7, 20, 13, 33, 12,
            16, 128, 9, 116, 64, 19, 113, 127, 15, 10, 21, 22, 14, 255, 66, 24,
            54, 136, 107, 18, 23, 192, 26, 114, 118, 132, 17, 77, 101, 130, 144,
            27, 87, 131, 44, 45, 74, 156, 154, 70, 167,
          ]);
        if ("object" != typeof WebAssembly) return { supported: !1 };
        let i =
          "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";
        WebAssembly.validate(t) &&
          (i =
            "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");
        let a = WebAssembly.instantiate(
          (function (e) {
            let t = new Uint8Array(e.length);
            for (let r = 0; r < e.length; ++r) {
              let n = e.charCodeAt(r);
              t[r] =
                n > 96
                  ? n - 71
                  : n > 64
                  ? n - 65
                  : n > 47
                  ? n + 4
                  : n > 46
                  ? 63
                  : 62;
            }
            let n = 0;
            for (let i = 0; i < e.length; ++i)
              t[n++] = t[i] < 60 ? r[t[i]] : (t[i] - 60) * 64 + t[++i];
            return t.buffer.slice(0, n);
          })(i),
          {}
        ).then((t) => {
          (e = t.instance).exports.__wasm_call_ctors();
        });
        function o(t, r, n, i, a, o) {
          let s = e.exports.sbrk,
            l = (n + 3) & -4,
            u = s(l * i),
            c = s(a.length),
            d = new Uint8Array(e.exports.memory.buffer);
          d.set(a, c);
          let f = t(u, n, i, c, a.length);
          if (
            (0 === f && o && o(u, l, i),
            r.set(d.subarray(u, u + n * i)),
            s(u - s(0)),
            0 !== f)
          )
            throw Error(`Malformed buffer data: ${f}`);
        }
        let s = {
            0: "",
            1: "meshopt_decodeFilterOct",
            2: "meshopt_decodeFilterQuat",
            3: "meshopt_decodeFilterExp",
            NONE: "",
            OCTAHEDRAL: "meshopt_decodeFilterOct",
            QUATERNION: "meshopt_decodeFilterQuat",
            EXPONENTIAL: "meshopt_decodeFilterExp",
          },
          l = {
            0: "meshopt_decodeVertexBuffer",
            1: "meshopt_decodeIndexBuffer",
            2: "meshopt_decodeIndexSequence",
            ATTRIBUTES: "meshopt_decodeVertexBuffer",
            TRIANGLES: "meshopt_decodeIndexBuffer",
            INDICES: "meshopt_decodeIndexSequence",
          };
        return (n = {
          ready: a,
          supported: !0,
          decodeVertexBuffer(t, r, n, i, a) {
            o(
              e.exports.meshopt_decodeVertexBuffer,
              t,
              r,
              n,
              i,
              e.exports[s[a]]
            );
          },
          decodeIndexBuffer(t, r, n, i) {
            o(e.exports.meshopt_decodeIndexBuffer, t, r, n, i);
          },
          decodeIndexSequence(t, r, n, i) {
            o(e.exports.meshopt_decodeIndexSequence, t, r, n, i);
          },
          decodeGltfBuffer(t, r, n, i, a, u) {
            o(e.exports[l[a]], t, r, n, i, e.exports[s[u]]);
          },
        });
      };
      var u = r(97477),
        c = r(14104);
      function d(e) {
        if ("undefined" != typeof TextDecoder)
          return new TextDecoder().decode(e);
        let t = "";
        for (let r = 0, n = e.length; r < n; r++)
          t += String.fromCharCode(e[r]);
        try {
          return decodeURIComponent(escape(t));
        } catch (e) {
          return t;
        }
      }
      let f = "srgb",
        A = "srgb-linear";
      class h extends i.aHM {
        constructor(e) {
          super(e),
            (this.dracoLoader = null),
            (this.ktx2Loader = null),
            (this.meshoptDecoder = null),
            (this.pluginCallbacks = []),
            this.register(function (e) {
              return new v(e);
            }),
            this.register(function (e) {
              return new b(e);
            }),
            this.register(function (e) {
              return new G(e);
            }),
            this.register(function (e) {
              return new D(e);
            }),
            this.register(function (e) {
              return new T(e);
            }),
            this.register(function (e) {
              return new E(e);
            }),
            this.register(function (e) {
              return new M(e);
            }),
            this.register(function (e) {
              return new w(e);
            }),
            this.register(function (e) {
              return new F(e);
            }),
            this.register(function (e) {
              return new g(e);
            }),
            this.register(function (e) {
              return new I(e);
            }),
            this.register(function (e) {
              return new y(e);
            }),
            this.register(function (e) {
              return new x(e);
            }),
            this.register(function (e) {
              return new R(e);
            }),
            this.register(function (e) {
              return new B(e);
            }),
            this.register(function (e) {
              return new H(e);
            }),
            this.register(function (e) {
              return new S(e);
            });
        }
        load(e, t, r, n) {
          let a;
          let o = this;
          if ("" !== this.resourcePath) a = this.resourcePath;
          else if ("" !== this.path) {
            let t = i.r6x.extractUrlBase(e);
            a = i.r6x.resolveURL(t, this.path);
          } else a = i.r6x.extractUrlBase(e);
          this.manager.itemStart(e);
          let s = function (t) {
              n ? n(t) : console.error(t),
                o.manager.itemError(e),
                o.manager.itemEnd(e);
            },
            l = new i.Y9S(this.manager);
          l.setPath(this.path),
            l.setResponseType("arraybuffer"),
            l.setRequestHeader(this.requestHeader),
            l.setWithCredentials(this.withCredentials),
            l.load(
              e,
              function (r) {
                try {
                  o.parse(
                    r,
                    a,
                    function (r) {
                      t(r), o.manager.itemEnd(e);
                    },
                    s
                  );
                } catch (e) {
                  s(e);
                }
              },
              r,
              s
            );
        }
        setDRACOLoader(e) {
          return (this.dracoLoader = e), this;
        }
        setDDSLoader() {
          throw Error(
            'THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".'
          );
        }
        setKTX2Loader(e) {
          return (this.ktx2Loader = e), this;
        }
        setMeshoptDecoder(e) {
          return (this.meshoptDecoder = e), this;
        }
        register(e) {
          return (
            -1 === this.pluginCallbacks.indexOf(e) &&
              this.pluginCallbacks.push(e),
            this
          );
        }
        unregister(e) {
          return (
            -1 !== this.pluginCallbacks.indexOf(e) &&
              this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1),
            this
          );
        }
        parse(e, t, r, n) {
          let i;
          let a = {},
            o = {};
          if ("string" == typeof e) i = JSON.parse(e);
          else if (e instanceof ArrayBuffer) {
            if (d(new Uint8Array(e.slice(0, 4))) === P) {
              try {
                a[m.KHR_BINARY_GLTF] = new _(e);
              } catch (e) {
                n && n(e);
                return;
              }
              i = JSON.parse(a[m.KHR_BINARY_GLTF].content);
            } else i = JSON.parse(d(new Uint8Array(e)));
          } else i = e;
          if (void 0 === i.asset || i.asset.version[0] < 2) {
            n &&
              n(
                Error(
                  "THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."
                )
              );
            return;
          }
          let s = new ei(i, {
            path: t || this.resourcePath || "",
            crossOrigin: this.crossOrigin,
            requestHeader: this.requestHeader,
            manager: this.manager,
            ktx2Loader: this.ktx2Loader,
            meshoptDecoder: this.meshoptDecoder,
          });
          s.fileLoader.setRequestHeader(this.requestHeader);
          for (let e = 0; e < this.pluginCallbacks.length; e++) {
            let t = this.pluginCallbacks[e](s);
            t.name ||
              console.error(
                "THREE.GLTFLoader: Invalid plugin found: missing name"
              ),
              (o[t.name] = t),
              (a[t.name] = !0);
          }
          if (i.extensionsUsed)
            for (let e = 0; e < i.extensionsUsed.length; ++e) {
              let t = i.extensionsUsed[e],
                r = i.extensionsRequired || [];
              switch (t) {
                case m.KHR_MATERIALS_UNLIT:
                  a[t] = new C();
                  break;
                case m.KHR_DRACO_MESH_COMPRESSION:
                  a[t] = new J(i, this.dracoLoader);
                  break;
                case m.KHR_TEXTURE_TRANSFORM:
                  a[t] = new L();
                  break;
                case m.KHR_MESH_QUANTIZATION:
                  a[t] = new U();
                  break;
                default:
                  r.indexOf(t) >= 0 &&
                    void 0 === o[t] &&
                    console.warn(
                      'THREE.GLTFLoader: Unknown extension "' + t + '".'
                    );
              }
            }
          s.setExtensions(a), s.setPlugins(o), s.parse(r, n);
        }
        parseAsync(e, t) {
          let r = this;
          return new Promise(function (n, i) {
            r.parse(e, t, n, i);
          });
        }
      }
      function p() {
        let e = {};
        return {
          get: function (t) {
            return e[t];
          },
          add: function (t, r) {
            e[t] = r;
          },
          remove: function (t) {
            delete e[t];
          },
          removeAll: function () {
            e = {};
          },
        };
      }
      let m = {
        KHR_BINARY_GLTF: "KHR_binary_glTF",
        KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
        KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
        KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
        KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
        KHR_MATERIALS_IOR: "KHR_materials_ior",
        KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
        KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
        KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
        KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
        KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
        KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
        KHR_MATERIALS_VOLUME: "KHR_materials_volume",
        KHR_TEXTURE_BASISU: "KHR_texture_basisu",
        KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
        KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
        KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
        EXT_MATERIALS_BUMP: "EXT_materials_bump",
        EXT_TEXTURE_WEBP: "EXT_texture_webp",
        EXT_TEXTURE_AVIF: "EXT_texture_avif",
        EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
        EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing",
      };
      class B {
        constructor(e) {
          (this.parser = e),
            (this.name = m.KHR_LIGHTS_PUNCTUAL),
            (this.cache = { refs: {}, uses: {} });
        }
        _markDefs() {
          let e = this.parser,
            t = this.parser.json.nodes || [];
          for (let r = 0, n = t.length; r < n; r++) {
            let n = t[r];
            n.extensions &&
              n.extensions[this.name] &&
              void 0 !== n.extensions[this.name].light &&
              e._addNodeRef(this.cache, n.extensions[this.name].light);
          }
        }
        _loadLight(e) {
          let t;
          let r = this.parser,
            n = "light:" + e,
            a = r.cache.get(n);
          if (a) return a;
          let o = r.json,
            s = (((o.extensions && o.extensions[this.name]) || {}).lights ||
              [])[e],
            l = new i.Q1f(0xffffff);
          void 0 !== s.color && l.setRGB(s.color[0], s.color[1], s.color[2], A);
          let u = void 0 !== s.range ? s.range : 0;
          switch (s.type) {
            case "directional":
              (t = new i.ZyN(l)).target.position.set(0, 0, -1), t.add(t.target);
              break;
            case "point":
              (t = new i.HiM(l)).distance = u;
              break;
            case "spot":
              ((t = new i.nCl(l)).distance = u),
                (s.spot = s.spot || {}),
                (s.spot.innerConeAngle =
                  void 0 !== s.spot.innerConeAngle ? s.spot.innerConeAngle : 0),
                (s.spot.outerConeAngle =
                  void 0 !== s.spot.outerConeAngle
                    ? s.spot.outerConeAngle
                    : Math.PI / 4),
                (t.angle = s.spot.outerConeAngle),
                (t.penumbra =
                  1 - s.spot.innerConeAngle / s.spot.outerConeAngle),
                t.target.position.set(0, 0, -1),
                t.add(t.target);
              break;
            default:
              throw Error("THREE.GLTFLoader: Unexpected light type: " + s.type);
          }
          return (
            t.position.set(0, 0, 0),
            (t.decay = 2),
            ee(t, s),
            void 0 !== s.intensity && (t.intensity = s.intensity),
            (t.name = r.createUniqueName(s.name || "light_" + e)),
            (a = Promise.resolve(t)),
            r.cache.add(n, a),
            a
          );
        }
        getDependency(e, t) {
          if ("light" === e) return this._loadLight(t);
        }
        createNodeAttachment(e) {
          let t = this,
            r = this.parser,
            n = r.json.nodes[e],
            i = ((n.extensions && n.extensions[this.name]) || {}).light;
          return void 0 === i
            ? null
            : this._loadLight(i).then(function (e) {
                return r._getNodeRef(t.cache, i, e);
              });
        }
      }
      class C {
        constructor() {
          this.name = m.KHR_MATERIALS_UNLIT;
        }
        getMaterialType() {
          return i.V9B;
        }
        extendParams(e, t, r) {
          let n = [];
          (e.color = new i.Q1f(1, 1, 1)), (e.opacity = 1);
          let a = t.pbrMetallicRoughness;
          if (a) {
            if (Array.isArray(a.baseColorFactor)) {
              let t = a.baseColorFactor;
              e.color.setRGB(t[0], t[1], t[2], A), (e.opacity = t[3]);
            }
            void 0 !== a.baseColorTexture &&
              n.push(r.assignTexture(e, "map", a.baseColorTexture, f));
          }
          return Promise.all(n);
        }
      }
      class g {
        constructor(e) {
          (this.parser = e), (this.name = m.KHR_MATERIALS_EMISSIVE_STRENGTH);
        }
        extendMaterialParams(e, t) {
          let r = this.parser.json.materials[e];
          if (!r.extensions || !r.extensions[this.name])
            return Promise.resolve();
          let n = r.extensions[this.name].emissiveStrength;
          return void 0 !== n && (t.emissiveIntensity = n), Promise.resolve();
        }
      }
      class v {
        constructor(e) {
          (this.parser = e), (this.name = m.KHR_MATERIALS_CLEARCOAT);
        }
        getMaterialType(e) {
          let t = this.parser.json.materials[e];
          return t.extensions && t.extensions[this.name] ? i.uSd : null;
        }
        extendMaterialParams(e, t) {
          let r = this.parser,
            n = r.json.materials[e];
          if (!n.extensions || !n.extensions[this.name])
            return Promise.resolve();
          let a = [],
            o = n.extensions[this.name];
          if (
            (void 0 !== o.clearcoatFactor && (t.clearcoat = o.clearcoatFactor),
            void 0 !== o.clearcoatTexture &&
              a.push(r.assignTexture(t, "clearcoatMap", o.clearcoatTexture)),
            void 0 !== o.clearcoatRoughnessFactor &&
              (t.clearcoatRoughness = o.clearcoatRoughnessFactor),
            void 0 !== o.clearcoatRoughnessTexture &&
              a.push(
                r.assignTexture(
                  t,
                  "clearcoatRoughnessMap",
                  o.clearcoatRoughnessTexture
                )
              ),
            void 0 !== o.clearcoatNormalTexture &&
              (a.push(
                r.assignTexture(
                  t,
                  "clearcoatNormalMap",
                  o.clearcoatNormalTexture
                )
              ),
              void 0 !== o.clearcoatNormalTexture.scale))
          ) {
            let e = o.clearcoatNormalTexture.scale;
            t.clearcoatNormalScale = new i.I9Y(e, e);
          }
          return Promise.all(a);
        }
      }
      class b {
        constructor(e) {
          (this.parser = e), (this.name = m.KHR_MATERIALS_DISPERSION);
        }
        getMaterialType(e) {
          let t = this.parser.json.materials[e];
          return t.extensions && t.extensions[this.name] ? i.uSd : null;
        }
        extendMaterialParams(e, t) {
          let r = this.parser.json.materials[e];
          if (!r.extensions || !r.extensions[this.name])
            return Promise.resolve();
          let n = r.extensions[this.name];
          return (
            (t.dispersion = void 0 !== n.dispersion ? n.dispersion : 0),
            Promise.resolve()
          );
        }
      }
      class y {
        constructor(e) {
          (this.parser = e), (this.name = m.KHR_MATERIALS_IRIDESCENCE);
        }
        getMaterialType(e) {
          let t = this.parser.json.materials[e];
          return t.extensions && t.extensions[this.name] ? i.uSd : null;
        }
        extendMaterialParams(e, t) {
          let r = this.parser,
            n = r.json.materials[e];
          if (!n.extensions || !n.extensions[this.name])
            return Promise.resolve();
          let i = [],
            a = n.extensions[this.name];
          return (
            void 0 !== a.iridescenceFactor &&
              (t.iridescence = a.iridescenceFactor),
            void 0 !== a.iridescenceTexture &&
              i.push(
                r.assignTexture(t, "iridescenceMap", a.iridescenceTexture)
              ),
            void 0 !== a.iridescenceIor &&
              (t.iridescenceIOR = a.iridescenceIor),
            void 0 === t.iridescenceThicknessRange &&
              (t.iridescenceThicknessRange = [100, 400]),
            void 0 !== a.iridescenceThicknessMinimum &&
              (t.iridescenceThicknessRange[0] = a.iridescenceThicknessMinimum),
            void 0 !== a.iridescenceThicknessMaximum &&
              (t.iridescenceThicknessRange[1] = a.iridescenceThicknessMaximum),
            void 0 !== a.iridescenceThicknessTexture &&
              i.push(
                r.assignTexture(
                  t,
                  "iridescenceThicknessMap",
                  a.iridescenceThicknessTexture
                )
              ),
            Promise.all(i)
          );
        }
      }
      class E {
        constructor(e) {
          (this.parser = e), (this.name = m.KHR_MATERIALS_SHEEN);
        }
        getMaterialType(e) {
          let t = this.parser.json.materials[e];
          return t.extensions && t.extensions[this.name] ? i.uSd : null;
        }
        extendMaterialParams(e, t) {
          let r = this.parser,
            n = r.json.materials[e];
          if (!n.extensions || !n.extensions[this.name])
            return Promise.resolve();
          let a = [];
          (t.sheenColor = new i.Q1f(0, 0, 0)),
            (t.sheenRoughness = 0),
            (t.sheen = 1);
          let o = n.extensions[this.name];
          if (void 0 !== o.sheenColorFactor) {
            let e = o.sheenColorFactor;
            t.sheenColor.setRGB(e[0], e[1], e[2], A);
          }
          return (
            void 0 !== o.sheenRoughnessFactor &&
              (t.sheenRoughness = o.sheenRoughnessFactor),
            void 0 !== o.sheenColorTexture &&
              a.push(
                r.assignTexture(t, "sheenColorMap", o.sheenColorTexture, f)
              ),
            void 0 !== o.sheenRoughnessTexture &&
              a.push(
                r.assignTexture(t, "sheenRoughnessMap", o.sheenRoughnessTexture)
              ),
            Promise.all(a)
          );
        }
      }
      class M {
        constructor(e) {
          (this.parser = e), (this.name = m.KHR_MATERIALS_TRANSMISSION);
        }
        getMaterialType(e) {
          let t = this.parser.json.materials[e];
          return t.extensions && t.extensions[this.name] ? i.uSd : null;
        }
        extendMaterialParams(e, t) {
          let r = this.parser,
            n = r.json.materials[e];
          if (!n.extensions || !n.extensions[this.name])
            return Promise.resolve();
          let i = [],
            a = n.extensions[this.name];
          return (
            void 0 !== a.transmissionFactor &&
              (t.transmission = a.transmissionFactor),
            void 0 !== a.transmissionTexture &&
              i.push(
                r.assignTexture(t, "transmissionMap", a.transmissionTexture)
              ),
            Promise.all(i)
          );
        }
      }
      class w {
        constructor(e) {
          (this.parser = e), (this.name = m.KHR_MATERIALS_VOLUME);
        }
        getMaterialType(e) {
          let t = this.parser.json.materials[e];
          return t.extensions && t.extensions[this.name] ? i.uSd : null;
        }
        extendMaterialParams(e, t) {
          let r = this.parser,
            n = r.json.materials[e];
          if (!n.extensions || !n.extensions[this.name])
            return Promise.resolve();
          let a = [],
            o = n.extensions[this.name];
          (t.thickness = void 0 !== o.thicknessFactor ? o.thicknessFactor : 0),
            void 0 !== o.thicknessTexture &&
              a.push(r.assignTexture(t, "thicknessMap", o.thicknessTexture)),
            (t.attenuationDistance = o.attenuationDistance || 1 / 0);
          let s = o.attenuationColor || [1, 1, 1];
          return (
            (t.attenuationColor = new i.Q1f().setRGB(s[0], s[1], s[2], A)),
            Promise.all(a)
          );
        }
      }
      class F {
        constructor(e) {
          (this.parser = e), (this.name = m.KHR_MATERIALS_IOR);
        }
        getMaterialType(e) {
          let t = this.parser.json.materials[e];
          return t.extensions && t.extensions[this.name] ? i.uSd : null;
        }
        extendMaterialParams(e, t) {
          let r = this.parser.json.materials[e];
          if (!r.extensions || !r.extensions[this.name])
            return Promise.resolve();
          let n = r.extensions[this.name];
          return (t.ior = void 0 !== n.ior ? n.ior : 1.5), Promise.resolve();
        }
      }
      class I {
        constructor(e) {
          (this.parser = e), (this.name = m.KHR_MATERIALS_SPECULAR);
        }
        getMaterialType(e) {
          let t = this.parser.json.materials[e];
          return t.extensions && t.extensions[this.name] ? i.uSd : null;
        }
        extendMaterialParams(e, t) {
          let r = this.parser,
            n = r.json.materials[e];
          if (!n.extensions || !n.extensions[this.name])
            return Promise.resolve();
          let a = [],
            o = n.extensions[this.name];
          (t.specularIntensity =
            void 0 !== o.specularFactor ? o.specularFactor : 1),
            void 0 !== o.specularTexture &&
              a.push(
                r.assignTexture(t, "specularIntensityMap", o.specularTexture)
              );
          let s = o.specularColorFactor || [1, 1, 1];
          return (
            (t.specularColor = new i.Q1f().setRGB(s[0], s[1], s[2], A)),
            void 0 !== o.specularColorTexture &&
              a.push(
                r.assignTexture(
                  t,
                  "specularColorMap",
                  o.specularColorTexture,
                  f
                )
              ),
            Promise.all(a)
          );
        }
      }
      class R {
        constructor(e) {
          (this.parser = e), (this.name = m.EXT_MATERIALS_BUMP);
        }
        getMaterialType(e) {
          let t = this.parser.json.materials[e];
          return t.extensions && t.extensions[this.name] ? i.uSd : null;
        }
        extendMaterialParams(e, t) {
          let r = this.parser,
            n = r.json.materials[e];
          if (!n.extensions || !n.extensions[this.name])
            return Promise.resolve();
          let i = [],
            a = n.extensions[this.name];
          return (
            (t.bumpScale = void 0 !== a.bumpFactor ? a.bumpFactor : 1),
            void 0 !== a.bumpTexture &&
              i.push(r.assignTexture(t, "bumpMap", a.bumpTexture)),
            Promise.all(i)
          );
        }
      }
      class x {
        constructor(e) {
          (this.parser = e), (this.name = m.KHR_MATERIALS_ANISOTROPY);
        }
        getMaterialType(e) {
          let t = this.parser.json.materials[e];
          return t.extensions && t.extensions[this.name] ? i.uSd : null;
        }
        extendMaterialParams(e, t) {
          let r = this.parser,
            n = r.json.materials[e];
          if (!n.extensions || !n.extensions[this.name])
            return Promise.resolve();
          let i = [],
            a = n.extensions[this.name];
          return (
            void 0 !== a.anisotropyStrength &&
              (t.anisotropy = a.anisotropyStrength),
            void 0 !== a.anisotropyRotation &&
              (t.anisotropyRotation = a.anisotropyRotation),
            void 0 !== a.anisotropyTexture &&
              i.push(r.assignTexture(t, "anisotropyMap", a.anisotropyTexture)),
            Promise.all(i)
          );
        }
      }
      class G {
        constructor(e) {
          (this.parser = e), (this.name = m.KHR_TEXTURE_BASISU);
        }
        loadTexture(e) {
          let t = this.parser,
            r = t.json,
            n = r.textures[e];
          if (!n.extensions || !n.extensions[this.name]) return null;
          let i = n.extensions[this.name],
            a = t.options.ktx2Loader;
          if (!a) {
            if (
              !(
                r.extensionsRequired &&
                r.extensionsRequired.indexOf(this.name) >= 0
              )
            )
              return null;
            throw Error(
              "THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures"
            );
          }
          return t.loadTextureImage(e, i.source, a);
        }
      }
      class D {
        constructor(e) {
          (this.parser = e),
            (this.name = m.EXT_TEXTURE_WEBP),
            (this.isSupported = null);
        }
        loadTexture(e) {
          let t = this.name,
            r = this.parser,
            n = r.json,
            i = n.textures[e];
          if (!i.extensions || !i.extensions[t]) return null;
          let a = i.extensions[t],
            o = n.images[a.source],
            s = r.textureLoader;
          if (o.uri) {
            let e = r.options.manager.getHandler(o.uri);
            null !== e && (s = e);
          }
          return this.detectSupport().then(function (i) {
            if (i) return r.loadTextureImage(e, a.source, s);
            if (n.extensionsRequired && n.extensionsRequired.indexOf(t) >= 0)
              throw Error(
                "THREE.GLTFLoader: WebP required by asset but unsupported."
              );
            return r.loadTexture(e);
          });
        }
        detectSupport() {
          return (
            this.isSupported ||
              (this.isSupported = new Promise(function (e) {
                let t = new Image();
                (t.src =
                  "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"),
                  (t.onload = t.onerror =
                    function () {
                      e(1 === t.height);
                    });
              })),
            this.isSupported
          );
        }
      }
      class T {
        constructor(e) {
          (this.parser = e),
            (this.name = m.EXT_TEXTURE_AVIF),
            (this.isSupported = null);
        }
        loadTexture(e) {
          let t = this.name,
            r = this.parser,
            n = r.json,
            i = n.textures[e];
          if (!i.extensions || !i.extensions[t]) return null;
          let a = i.extensions[t],
            o = n.images[a.source],
            s = r.textureLoader;
          if (o.uri) {
            let e = r.options.manager.getHandler(o.uri);
            null !== e && (s = e);
          }
          return this.detectSupport().then(function (i) {
            if (i) return r.loadTextureImage(e, a.source, s);
            if (n.extensionsRequired && n.extensionsRequired.indexOf(t) >= 0)
              throw Error(
                "THREE.GLTFLoader: AVIF required by asset but unsupported."
              );
            return r.loadTexture(e);
          });
        }
        detectSupport() {
          return (
            this.isSupported ||
              (this.isSupported = new Promise(function (e) {
                let t = new Image();
                (t.src =
                  "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI="),
                  (t.onload = t.onerror =
                    function () {
                      e(1 === t.height);
                    });
              })),
            this.isSupported
          );
        }
      }
      class H {
        constructor(e) {
          (this.name = m.EXT_MESHOPT_COMPRESSION), (this.parser = e);
        }
        loadBufferView(e) {
          let t = this.parser.json,
            r = t.bufferViews[e];
          if (!r.extensions || !r.extensions[this.name]) return null;
          {
            let e = r.extensions[this.name],
              n = this.parser.getDependency("buffer", e.buffer),
              i = this.parser.options.meshoptDecoder;
            if (!i || !i.supported) {
              if (
                !(
                  t.extensionsRequired &&
                  t.extensionsRequired.indexOf(this.name) >= 0
                )
              )
                return null;
              throw Error(
                "THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files"
              );
            }
            return n.then(function (t) {
              let r = e.byteOffset || 0,
                n = e.byteLength || 0,
                a = e.count,
                o = e.byteStride,
                s = new Uint8Array(t, r, n);
              return i.decodeGltfBufferAsync
                ? i
                    .decodeGltfBufferAsync(a, o, s, e.mode, e.filter)
                    .then(function (e) {
                      return e.buffer;
                    })
                : i.ready.then(function () {
                    let t = new ArrayBuffer(a * o);
                    return (
                      i.decodeGltfBuffer(
                        new Uint8Array(t),
                        a,
                        o,
                        s,
                        e.mode,
                        e.filter
                      ),
                      t
                    );
                  });
            });
          }
        }
      }
      class S {
        constructor(e) {
          (this.name = m.EXT_MESH_GPU_INSTANCING), (this.parser = e);
        }
        createNodeMesh(e) {
          let t = this.parser.json,
            r = t.nodes[e];
          if (!r.extensions || !r.extensions[this.name] || void 0 === r.mesh)
            return null;
          for (let e of t.meshes[r.mesh].primitives)
            if (
              e.mode !== N.TRIANGLES &&
              e.mode !== N.TRIANGLE_STRIP &&
              e.mode !== N.TRIANGLE_FAN &&
              void 0 !== e.mode
            )
              return null;
          let n = r.extensions[this.name].attributes,
            a = [],
            o = {};
          for (let e in n)
            a.push(
              this.parser
                .getDependency("accessor", n[e])
                .then((t) => ((o[e] = t), o[e]))
            );
          return a.length < 1
            ? null
            : (a.push(this.parser.createNodeMesh(e)),
              Promise.all(a).then((e) => {
                let t = e.pop(),
                  r = t.isGroup ? t.children : [t],
                  n = e[0].count,
                  a = [];
                for (let e of r) {
                  let t = new i.kn4(),
                    r = new i.Pq0(),
                    s = new i.PTz(),
                    l = new i.Pq0(1, 1, 1),
                    u = new i.ZLX(e.geometry, e.material, n);
                  for (let e = 0; e < n; e++)
                    o.TRANSLATION && r.fromBufferAttribute(o.TRANSLATION, e),
                      o.ROTATION && s.fromBufferAttribute(o.ROTATION, e),
                      o.SCALE && l.fromBufferAttribute(o.SCALE, e),
                      u.setMatrixAt(e, t.compose(r, s, l));
                  for (let t in o)
                    if ("_COLOR_0" === t) {
                      let e = o[t];
                      u.instanceColor = new i.uWO(
                        e.array,
                        e.itemSize,
                        e.normalized
                      );
                    } else
                      "TRANSLATION" !== t &&
                        "ROTATION" !== t &&
                        "SCALE" !== t &&
                        e.geometry.setAttribute(t, o[t]);
                  i.B69.prototype.copy.call(u, e),
                    this.parser.assignFinalMaterial(u),
                    a.push(u);
                }
                return t.isGroup ? (t.clear(), t.add(...a), t) : a[0];
              }));
        }
      }
      let P = "glTF",
        O = { JSON: 0x4e4f534a, BIN: 5130562 };
      class _ {
        constructor(e) {
          (this.name = m.KHR_BINARY_GLTF),
            (this.content = null),
            (this.body = null);
          let t = new DataView(e, 0, 12);
          if (
            ((this.header = {
              magic: d(new Uint8Array(e.slice(0, 4))),
              version: t.getUint32(4, !0),
              length: t.getUint32(8, !0),
            }),
            this.header.magic !== P)
          )
            throw Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
          if (this.header.version < 2)
            throw Error("THREE.GLTFLoader: Legacy binary file detected.");
          let r = this.header.length - 12,
            n = new DataView(e, 12),
            i = 0;
          for (; i < r; ) {
            let t = n.getUint32(i, !0);
            i += 4;
            let r = n.getUint32(i, !0);
            if (((i += 4), r === O.JSON)) {
              let r = new Uint8Array(e, 12 + i, t);
              this.content = d(r);
            } else if (r === O.BIN) {
              let r = 12 + i;
              this.body = e.slice(r, r + t);
            }
            i += t;
          }
          if (null === this.content)
            throw Error("THREE.GLTFLoader: JSON content not found.");
        }
      }
      class J {
        constructor(e, t) {
          if (!t)
            throw Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
          (this.name = m.KHR_DRACO_MESH_COMPRESSION),
            (this.json = e),
            (this.dracoLoader = t),
            this.dracoLoader.preload();
        }
        decodePrimitive(e, t) {
          let r = this.json,
            n = this.dracoLoader,
            i = e.extensions[this.name].bufferView,
            a = e.extensions[this.name].attributes,
            o = {},
            s = {},
            l = {};
          for (let e in a) o[Z[e] || e.toLowerCase()] = a[e];
          for (let t in e.attributes) {
            let n = Z[t] || t.toLowerCase();
            if (void 0 !== a[t]) {
              let i = r.accessors[e.attributes[t]],
                a = Q[i.componentType];
              (l[n] = a.name), (s[n] = !0 === i.normalized);
            }
          }
          return t.getDependency("bufferView", i).then(function (e) {
            return new Promise(function (t, r) {
              n.decodeDracoFile(
                e,
                function (e) {
                  for (let t in e.attributes) {
                    let r = e.attributes[t],
                      n = s[t];
                    void 0 !== n && (r.normalized = n);
                  }
                  t(e);
                },
                o,
                l,
                A,
                r
              );
            });
          });
        }
      }
      class L {
        constructor() {
          this.name = m.KHR_TEXTURE_TRANSFORM;
        }
        extendTexture(e, t) {
          return (
            ((void 0 === t.texCoord || t.texCoord === e.channel) &&
              void 0 === t.offset &&
              void 0 === t.rotation &&
              void 0 === t.scale) ||
              ((e = e.clone()),
              void 0 !== t.texCoord && (e.channel = t.texCoord),
              void 0 !== t.offset && e.offset.fromArray(t.offset),
              void 0 !== t.rotation && (e.rotation = t.rotation),
              void 0 !== t.scale && e.repeat.fromArray(t.scale),
              (e.needsUpdate = !0)),
            e
          );
        }
      }
      class U {
        constructor() {
          this.name = m.KHR_MESH_QUANTIZATION;
        }
      }
      class k extends i.lGw {
        constructor(e, t, r, n) {
          super(e, t, r, n);
        }
        copySampleValue_(e) {
          let t = this.resultBuffer,
            r = this.sampleValues,
            n = this.valueSize,
            i = e * n * 3 + n;
          for (let e = 0; e !== n; e++) t[e] = r[i + e];
          return t;
        }
        interpolate_(e, t, r, n) {
          let i = this.resultBuffer,
            a = this.sampleValues,
            o = this.valueSize,
            s = 2 * o,
            l = 3 * o,
            u = n - t,
            c = (r - t) / u,
            d = c * c,
            f = d * c,
            A = e * l,
            h = A - l,
            p = -2 * f + 3 * d,
            m = f - d,
            B = 1 - p,
            C = m - d + c;
          for (let e = 0; e !== o; e++) {
            let t = a[h + e + o],
              r = a[h + e + s] * u,
              n = a[A + e + o],
              l = a[A + e] * u;
            i[e] = B * t + C * r + p * n + m * l;
          }
          return i;
        }
      }
      let j = new i.PTz();
      class K extends k {
        interpolate_(e, t, r, n) {
          let i = super.interpolate_(e, t, r, n);
          return j.fromArray(i).normalize().toArray(i), i;
        }
      }
      let N = {
          POINTS: 0,
          LINES: 1,
          LINE_LOOP: 2,
          LINE_STRIP: 3,
          TRIANGLES: 4,
          TRIANGLE_STRIP: 5,
          TRIANGLE_FAN: 6,
        },
        Q = {
          5120: Int8Array,
          5121: Uint8Array,
          5122: Int16Array,
          5123: Uint16Array,
          5125: Uint32Array,
          5126: Float32Array,
        },
        X = {
          9728: i.hxR,
          9729: i.k6q,
          9984: i.pHI,
          9985: i.kRr,
          9986: i.Cfg,
          9987: i.$_I,
        },
        Y = { 33071: i.ghU, 33648: i.kTW, 10497: i.GJx },
        W = {
          SCALAR: 1,
          VEC2: 2,
          VEC3: 3,
          VEC4: 4,
          MAT2: 4,
          MAT3: 9,
          MAT4: 16,
        },
        Z = {
          POSITION: "position",
          NORMAL: "normal",
          TANGENT: "tangent",
          ...(c.r >= 152
            ? {
                TEXCOORD_0: "uv",
                TEXCOORD_1: "uv1",
                TEXCOORD_2: "uv2",
                TEXCOORD_3: "uv3",
              }
            : { TEXCOORD_0: "uv", TEXCOORD_1: "uv2" }),
          COLOR_0: "color",
          WEIGHTS_0: "skinWeight",
          JOINTS_0: "skinIndex",
        },
        q = {
          scale: "scale",
          translation: "position",
          rotation: "quaternion",
          weights: "morphTargetInfluences",
        },
        z = { CUBICSPLINE: void 0, LINEAR: i.PJ3, STEP: i.ljd },
        V = { OPAQUE: "OPAQUE", MASK: "MASK", BLEND: "BLEND" };
      function $(e, t, r) {
        for (let n in r.extensions)
          void 0 === e[n] &&
            ((t.userData.gltfExtensions = t.userData.gltfExtensions || {}),
            (t.userData.gltfExtensions[n] = r.extensions[n]));
      }
      function ee(e, t) {
        void 0 !== t.extras &&
          ("object" == typeof t.extras
            ? Object.assign(e.userData, t.extras)
            : console.warn(
                "THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras
              ));
      }
      function et(e) {
        let t = "",
          r = Object.keys(e).sort();
        for (let n = 0, i = r.length; n < i; n++)
          t += r[n] + ":" + e[r[n]] + ";";
        return t;
      }
      function er(e) {
        switch (e) {
          case Int8Array:
            return 1 / 127;
          case Uint8Array:
            return 1 / 255;
          case Int16Array:
            return 1 / 32767;
          case Uint16Array:
            return 1 / 65535;
          default:
            throw Error(
              "THREE.GLTFLoader: Unsupported normalized accessor component type."
            );
        }
      }
      let en = new i.kn4();
      class ei {
        constructor(e = {}, t = {}) {
          (this.json = e),
            (this.extensions = {}),
            (this.plugins = {}),
            (this.options = t),
            (this.cache = new p()),
            (this.associations = new Map()),
            (this.primitiveCache = {}),
            (this.nodeCache = {}),
            (this.meshCache = { refs: {}, uses: {} }),
            (this.cameraCache = { refs: {}, uses: {} }),
            (this.lightCache = { refs: {}, uses: {} }),
            (this.sourceCache = {}),
            (this.textureCache = {}),
            (this.nodeNamesUsed = {});
          let r = !1,
            n = !1,
            a = -1;
          "undefined" != typeof navigator &&
            void 0 !== navigator.userAgent &&
            ((r =
              !0 ===
              /^((?!chrome|android).)*safari/i.test(navigator.userAgent)),
            (a = (n = navigator.userAgent.indexOf("Firefox") > -1)
              ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]
              : -1)),
            "undefined" == typeof createImageBitmap || r || (n && a < 98)
              ? (this.textureLoader = new i.Tap(this.options.manager))
              : (this.textureLoader = new i.Kzg(this.options.manager)),
            this.textureLoader.setCrossOrigin(this.options.crossOrigin),
            this.textureLoader.setRequestHeader(this.options.requestHeader),
            (this.fileLoader = new i.Y9S(this.options.manager)),
            this.fileLoader.setResponseType("arraybuffer"),
            "use-credentials" === this.options.crossOrigin &&
              this.fileLoader.setWithCredentials(!0);
        }
        setExtensions(e) {
          this.extensions = e;
        }
        setPlugins(e) {
          this.plugins = e;
        }
        parse(e, t) {
          let r = this,
            n = this.json,
            i = this.extensions;
          this.cache.removeAll(),
            (this.nodeCache = {}),
            this._invokeAll(function (e) {
              return e._markDefs && e._markDefs();
            }),
            Promise.all(
              this._invokeAll(function (e) {
                return e.beforeRoot && e.beforeRoot();
              })
            )
              .then(function () {
                return Promise.all([
                  r.getDependencies("scene"),
                  r.getDependencies("animation"),
                  r.getDependencies("camera"),
                ]);
              })
              .then(function (t) {
                let a = {
                  scene: t[0][n.scene || 0],
                  scenes: t[0],
                  animations: t[1],
                  cameras: t[2],
                  asset: n.asset,
                  parser: r,
                  userData: {},
                };
                return (
                  $(i, a, n),
                  ee(a, n),
                  Promise.all(
                    r._invokeAll(function (e) {
                      return e.afterRoot && e.afterRoot(a);
                    })
                  ).then(function () {
                    for (let e of a.scenes) e.updateMatrixWorld();
                    e(a);
                  })
                );
              })
              .catch(t);
        }
        _markDefs() {
          let e = this.json.nodes || [],
            t = this.json.skins || [],
            r = this.json.meshes || [];
          for (let r = 0, n = t.length; r < n; r++) {
            let n = t[r].joints;
            for (let t = 0, r = n.length; t < r; t++) e[n[t]].isBone = !0;
          }
          for (let t = 0, n = e.length; t < n; t++) {
            let n = e[t];
            void 0 !== n.mesh &&
              (this._addNodeRef(this.meshCache, n.mesh),
              void 0 !== n.skin && (r[n.mesh].isSkinnedMesh = !0)),
              void 0 !== n.camera &&
                this._addNodeRef(this.cameraCache, n.camera);
          }
        }
        _addNodeRef(e, t) {
          void 0 !== t &&
            (void 0 === e.refs[t] && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
        }
        _getNodeRef(e, t, r) {
          if (e.refs[t] <= 1) return r;
          let n = r.clone(),
            i = (e, t) => {
              let r = this.associations.get(e);
              for (let [n, a] of (null != r && this.associations.set(t, r),
              e.children.entries()))
                i(a, t.children[n]);
            };
          return i(r, n), (n.name += "_instance_" + e.uses[t]++), n;
        }
        _invokeOne(e) {
          let t = Object.values(this.plugins);
          t.push(this);
          for (let r = 0; r < t.length; r++) {
            let n = e(t[r]);
            if (n) return n;
          }
          return null;
        }
        _invokeAll(e) {
          let t = Object.values(this.plugins);
          t.unshift(this);
          let r = [];
          for (let n = 0; n < t.length; n++) {
            let i = e(t[n]);
            i && r.push(i);
          }
          return r;
        }
        getDependency(e, t) {
          let r = e + ":" + t,
            n = this.cache.get(r);
          if (!n) {
            switch (e) {
              case "scene":
                n = this.loadScene(t);
                break;
              case "node":
                n = this._invokeOne(function (e) {
                  return e.loadNode && e.loadNode(t);
                });
                break;
              case "mesh":
                n = this._invokeOne(function (e) {
                  return e.loadMesh && e.loadMesh(t);
                });
                break;
              case "accessor":
                n = this.loadAccessor(t);
                break;
              case "bufferView":
                n = this._invokeOne(function (e) {
                  return e.loadBufferView && e.loadBufferView(t);
                });
                break;
              case "buffer":
                n = this.loadBuffer(t);
                break;
              case "material":
                n = this._invokeOne(function (e) {
                  return e.loadMaterial && e.loadMaterial(t);
                });
                break;
              case "texture":
                n = this._invokeOne(function (e) {
                  return e.loadTexture && e.loadTexture(t);
                });
                break;
              case "skin":
                n = this.loadSkin(t);
                break;
              case "animation":
                n = this._invokeOne(function (e) {
                  return e.loadAnimation && e.loadAnimation(t);
                });
                break;
              case "camera":
                n = this.loadCamera(t);
                break;
              default:
                if (
                  !(n = this._invokeOne(function (r) {
                    return (
                      r != this && r.getDependency && r.getDependency(e, t)
                    );
                  }))
                )
                  throw Error("Unknown type: " + e);
            }
            this.cache.add(r, n);
          }
          return n;
        }
        getDependencies(e) {
          let t = this.cache.get(e);
          if (!t) {
            let r = this;
            (t = Promise.all(
              (this.json[e + ("mesh" === e ? "es" : "s")] || []).map(function (
                t,
                n
              ) {
                return r.getDependency(e, n);
              })
            )),
              this.cache.add(e, t);
          }
          return t;
        }
        loadBuffer(e) {
          let t = this.json.buffers[e],
            r = this.fileLoader;
          if (t.type && "arraybuffer" !== t.type)
            throw Error(
              "THREE.GLTFLoader: " + t.type + " buffer type is not supported."
            );
          if (void 0 === t.uri && 0 === e)
            return Promise.resolve(this.extensions[m.KHR_BINARY_GLTF].body);
          let n = this.options;
          return new Promise(function (e, a) {
            r.load(i.r6x.resolveURL(t.uri, n.path), e, void 0, function () {
              a(
                Error(
                  'THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'
                )
              );
            });
          });
        }
        loadBufferView(e) {
          let t = this.json.bufferViews[e];
          return this.getDependency("buffer", t.buffer).then(function (e) {
            let r = t.byteLength || 0,
              n = t.byteOffset || 0;
            return e.slice(n, n + r);
          });
        }
        loadAccessor(e) {
          let t = this,
            r = this.json,
            n = this.json.accessors[e];
          if (void 0 === n.bufferView && void 0 === n.sparse) {
            let e = W[n.type],
              t = Q[n.componentType],
              r = !0 === n.normalized,
              a = new t(n.count * e);
            return Promise.resolve(new i.THS(a, e, r));
          }
          let a = [];
          return (
            void 0 !== n.bufferView
              ? a.push(this.getDependency("bufferView", n.bufferView))
              : a.push(null),
            void 0 !== n.sparse &&
              (a.push(
                this.getDependency("bufferView", n.sparse.indices.bufferView)
              ),
              a.push(
                this.getDependency("bufferView", n.sparse.values.bufferView)
              )),
            Promise.all(a).then(function (e) {
              let a, o;
              let s = e[0],
                l = W[n.type],
                u = Q[n.componentType],
                c = u.BYTES_PER_ELEMENT,
                d = c * l,
                f = n.byteOffset || 0,
                A =
                  void 0 !== n.bufferView
                    ? r.bufferViews[n.bufferView].byteStride
                    : void 0,
                h = !0 === n.normalized;
              if (A && A !== d) {
                let e = Math.floor(f / A),
                  r =
                    "InterleavedBuffer:" +
                    n.bufferView +
                    ":" +
                    n.componentType +
                    ":" +
                    e +
                    ":" +
                    n.count,
                  d = t.cache.get(r);
                d ||
                  ((a = new u(s, e * A, (n.count * A) / c)),
                  (d = new i.eB$(a, A / c)),
                  t.cache.add(r, d)),
                  (o = new i.eHs(d, l, (f % A) / c, h));
              } else (a = null === s ? new u(n.count * l) : new u(s, f, n.count * l)), (o = new i.THS(a, l, h));
              if (void 0 !== n.sparse) {
                let t = W.SCALAR,
                  r = Q[n.sparse.indices.componentType],
                  a = n.sparse.indices.byteOffset || 0,
                  c = n.sparse.values.byteOffset || 0,
                  d = new r(e[1], a, n.sparse.count * t),
                  f = new u(e[2], c, n.sparse.count * l);
                null !== s &&
                  (o = new i.THS(o.array.slice(), o.itemSize, o.normalized));
                for (let e = 0, t = d.length; e < t; e++) {
                  let t = d[e];
                  if (
                    (o.setX(t, f[e * l]),
                    l >= 2 && o.setY(t, f[e * l + 1]),
                    l >= 3 && o.setZ(t, f[e * l + 2]),
                    l >= 4 && o.setW(t, f[e * l + 3]),
                    l >= 5)
                  )
                    throw Error(
                      "THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute."
                    );
                }
              }
              return o;
            })
          );
        }
        loadTexture(e) {
          let t = this.json,
            r = this.options,
            n = t.textures[e].source,
            i = t.images[n],
            a = this.textureLoader;
          if (i.uri) {
            let e = r.manager.getHandler(i.uri);
            null !== e && (a = e);
          }
          return this.loadTextureImage(e, n, a);
        }
        loadTextureImage(e, t, r) {
          let n = this,
            a = this.json,
            o = a.textures[e],
            s = a.images[t],
            l = (s.uri || s.bufferView) + ":" + o.sampler;
          if (this.textureCache[l]) return this.textureCache[l];
          let u = this.loadImageSource(t, r)
            .then(function (t) {
              (t.flipY = !1),
                (t.name = o.name || s.name || ""),
                "" === t.name &&
                  "string" == typeof s.uri &&
                  !1 === s.uri.startsWith("data:image/") &&
                  (t.name = s.uri);
              let r = (a.samplers || {})[o.sampler] || {};
              return (
                (t.magFilter = X[r.magFilter] || i.k6q),
                (t.minFilter = X[r.minFilter] || i.$_I),
                (t.wrapS = Y[r.wrapS] || i.GJx),
                (t.wrapT = Y[r.wrapT] || i.GJx),
                n.associations.set(t, { textures: e }),
                t
              );
            })
            .catch(function () {
              return null;
            });
          return (this.textureCache[l] = u), u;
        }
        loadImageSource(e, t) {
          let r = this.json,
            n = this.options;
          if (void 0 !== this.sourceCache[e])
            return this.sourceCache[e].then((e) => e.clone());
          let a = r.images[e],
            o = self.URL || self.webkitURL,
            s = a.uri || "",
            l = !1;
          if (void 0 !== a.bufferView)
            s = this.getDependency("bufferView", a.bufferView).then(function (
              e
            ) {
              l = !0;
              let t = new Blob([e], { type: a.mimeType });
              return (s = o.createObjectURL(t));
            });
          else if (void 0 === a.uri)
            throw Error(
              "THREE.GLTFLoader: Image " + e + " is missing URI and bufferView"
            );
          let u = Promise.resolve(s)
            .then(function (e) {
              return new Promise(function (r, a) {
                let o = r;
                !0 === t.isImageBitmapLoader &&
                  (o = function (e) {
                    let t = new i.gPd(e);
                    (t.needsUpdate = !0), r(t);
                  }),
                  t.load(i.r6x.resolveURL(e, n.path), o, void 0, a);
              });
            })
            .then(function (e) {
              var t;
              return (
                !0 === l && o.revokeObjectURL(s),
                ee(e, a),
                (e.userData.mimeType =
                  a.mimeType ||
                  ((t = a.uri).search(/\.jpe?g($|\?)/i) > 0 ||
                  0 === t.search(/^data\:image\/jpeg/)
                    ? "image/jpeg"
                    : t.search(/\.webp($|\?)/i) > 0 ||
                      0 === t.search(/^data\:image\/webp/)
                    ? "image/webp"
                    : "image/png")),
                e
              );
            })
            .catch(function (e) {
              throw (
                (console.error("THREE.GLTFLoader: Couldn't load texture", s), e)
              );
            });
          return (this.sourceCache[e] = u), u;
        }
        assignTexture(e, t, r, n) {
          let i = this;
          return this.getDependency("texture", r.index).then(function (a) {
            if (!a) return null;
            if (
              (void 0 !== r.texCoord &&
                r.texCoord > 0 &&
                ((a = a.clone()).channel = r.texCoord),
              i.extensions[m.KHR_TEXTURE_TRANSFORM])
            ) {
              let e =
                void 0 !== r.extensions
                  ? r.extensions[m.KHR_TEXTURE_TRANSFORM]
                  : void 0;
              if (e) {
                let t = i.associations.get(a);
                (a = i.extensions[m.KHR_TEXTURE_TRANSFORM].extendTexture(a, e)),
                  i.associations.set(a, t);
              }
            }
            return (
              void 0 !== n &&
                ("number" == typeof n && (n = 3001 === n ? f : A),
                "colorSpace" in a
                  ? (a.colorSpace = n)
                  : (a.encoding = n === f ? 3001 : 3e3)),
              (e[t] = a),
              a
            );
          });
        }
        assignFinalMaterial(e) {
          let t = e.geometry,
            r = e.material,
            n = void 0 === t.attributes.tangent,
            a = void 0 !== t.attributes.color,
            o = void 0 === t.attributes.normal;
          if (e.isPoints) {
            let e = "PointsMaterial:" + r.uuid,
              t = this.cache.get(e);
            t ||
              ((t = new i.BH$()),
              i.imn.prototype.copy.call(t, r),
              t.color.copy(r.color),
              (t.map = r.map),
              (t.sizeAttenuation = !1),
              this.cache.add(e, t)),
              (r = t);
          } else if (e.isLine) {
            let e = "LineBasicMaterial:" + r.uuid,
              t = this.cache.get(e);
            t ||
              ((t = new i.mrM()),
              i.imn.prototype.copy.call(t, r),
              t.color.copy(r.color),
              (t.map = r.map),
              this.cache.add(e, t)),
              (r = t);
          }
          if (n || a || o) {
            let e = "ClonedMaterial:" + r.uuid + ":";
            n && (e += "derivative-tangents:"),
              a && (e += "vertex-colors:"),
              o && (e += "flat-shading:");
            let t = this.cache.get(e);
            t ||
              ((t = r.clone()),
              a && (t.vertexColors = !0),
              o && (t.flatShading = !0),
              n &&
                (t.normalScale && (t.normalScale.y *= -1),
                t.clearcoatNormalScale && (t.clearcoatNormalScale.y *= -1)),
              this.cache.add(e, t),
              this.associations.set(t, this.associations.get(r))),
              (r = t);
          }
          e.material = r;
        }
        getMaterialType() {
          return i._4j;
        }
        loadMaterial(e) {
          let t;
          let r = this,
            n = this.json,
            a = this.extensions,
            o = n.materials[e],
            s = {},
            l = o.extensions || {},
            u = [];
          if (l[m.KHR_MATERIALS_UNLIT]) {
            let e = a[m.KHR_MATERIALS_UNLIT];
            (t = e.getMaterialType()), u.push(e.extendParams(s, o, r));
          } else {
            let n = o.pbrMetallicRoughness || {};
            if (
              ((s.color = new i.Q1f(1, 1, 1)),
              (s.opacity = 1),
              Array.isArray(n.baseColorFactor))
            ) {
              let e = n.baseColorFactor;
              s.color.setRGB(e[0], e[1], e[2], A), (s.opacity = e[3]);
            }
            void 0 !== n.baseColorTexture &&
              u.push(r.assignTexture(s, "map", n.baseColorTexture, f)),
              (s.metalness =
                void 0 !== n.metallicFactor ? n.metallicFactor : 1),
              (s.roughness =
                void 0 !== n.roughnessFactor ? n.roughnessFactor : 1),
              void 0 !== n.metallicRoughnessTexture &&
                (u.push(
                  r.assignTexture(s, "metalnessMap", n.metallicRoughnessTexture)
                ),
                u.push(
                  r.assignTexture(s, "roughnessMap", n.metallicRoughnessTexture)
                )),
              (t = this._invokeOne(function (t) {
                return t.getMaterialType && t.getMaterialType(e);
              })),
              u.push(
                Promise.all(
                  this._invokeAll(function (t) {
                    return (
                      t.extendMaterialParams && t.extendMaterialParams(e, s)
                    );
                  })
                )
              );
          }
          !0 === o.doubleSided && (s.side = i.$EB);
          let c = o.alphaMode || V.OPAQUE;
          if (
            (c === V.BLEND
              ? ((s.transparent = !0), (s.depthWrite = !1))
              : ((s.transparent = !1),
                c === V.MASK &&
                  (s.alphaTest =
                    void 0 !== o.alphaCutoff ? o.alphaCutoff : 0.5)),
            void 0 !== o.normalTexture &&
              t !== i.V9B &&
              (u.push(r.assignTexture(s, "normalMap", o.normalTexture)),
              (s.normalScale = new i.I9Y(1, 1)),
              void 0 !== o.normalTexture.scale))
          ) {
            let e = o.normalTexture.scale;
            s.normalScale.set(e, e);
          }
          if (
            (void 0 !== o.occlusionTexture &&
              t !== i.V9B &&
              (u.push(r.assignTexture(s, "aoMap", o.occlusionTexture)),
              void 0 !== o.occlusionTexture.strength &&
                (s.aoMapIntensity = o.occlusionTexture.strength)),
            void 0 !== o.emissiveFactor && t !== i.V9B)
          ) {
            let e = o.emissiveFactor;
            s.emissive = new i.Q1f().setRGB(e[0], e[1], e[2], A);
          }
          return (
            void 0 !== o.emissiveTexture &&
              t !== i.V9B &&
              u.push(r.assignTexture(s, "emissiveMap", o.emissiveTexture, f)),
            Promise.all(u).then(function () {
              let n = new t(s);
              return (
                o.name && (n.name = o.name),
                ee(n, o),
                r.associations.set(n, { materials: e }),
                o.extensions && $(a, n, o),
                n
              );
            })
          );
        }
        createUniqueName(e) {
          let t = i.Nwf.sanitizeNodeName(e || "");
          return t in this.nodeNamesUsed
            ? t + "_" + ++this.nodeNamesUsed[t]
            : ((this.nodeNamesUsed[t] = 0), t);
        }
        loadGeometries(e) {
          let t = this,
            r = this.extensions,
            n = this.primitiveCache,
            a = [];
          for (let o = 0, s = e.length; o < s; o++) {
            let s = e[o],
              l = (function (e) {
                let t;
                let r =
                  e.extensions && e.extensions[m.KHR_DRACO_MESH_COMPRESSION];
                if (
                  ((t = r
                    ? "draco:" +
                      r.bufferView +
                      ":" +
                      r.indices +
                      ":" +
                      et(r.attributes)
                    : e.indices + ":" + et(e.attributes) + ":" + e.mode),
                  void 0 !== e.targets)
                )
                  for (let r = 0, n = e.targets.length; r < n; r++)
                    t += ":" + et(e.targets[r]);
                return t;
              })(s),
              u = n[l];
            if (u) a.push(u.promise);
            else {
              let e;
              (e =
                s.extensions && s.extensions[m.KHR_DRACO_MESH_COMPRESSION]
                  ? (function (e) {
                      return r[m.KHR_DRACO_MESH_COMPRESSION]
                        .decodePrimitive(e, t)
                        .then(function (r) {
                          return ea(r, e, t);
                        });
                    })(s)
                  : ea(new i.LoY(), s, t)),
                (n[l] = { primitive: s, promise: e }),
                a.push(e);
            }
          }
          return Promise.all(a);
        }
        loadMesh(e) {
          let t = this,
            r = this.json,
            n = this.extensions,
            a = r.meshes[e],
            o = a.primitives,
            s = [];
          for (let e = 0, t = o.length; e < t; e++) {
            var l;
            let t =
              void 0 === o[e].material
                ? (void 0 === (l = this.cache).DefaultMaterial &&
                    (l.DefaultMaterial = new i._4j({
                      color: 0xffffff,
                      emissive: 0,
                      metalness: 1,
                      roughness: 1,
                      transparent: !1,
                      depthTest: !0,
                      side: i.hB5,
                    })),
                  l.DefaultMaterial)
                : this.getDependency("material", o[e].material);
            s.push(t);
          }
          return (
            s.push(t.loadGeometries(o)),
            Promise.all(s).then(function (r) {
              let s = r.slice(0, r.length - 1),
                l = r[r.length - 1],
                c = [];
              for (let r = 0, d = l.length; r < d; r++) {
                let d;
                let f = l[r],
                  A = o[r],
                  h = s[r];
                if (
                  A.mode === N.TRIANGLES ||
                  A.mode === N.TRIANGLE_STRIP ||
                  A.mode === N.TRIANGLE_FAN ||
                  void 0 === A.mode
                )
                  !0 ===
                    (d =
                      !0 === a.isSkinnedMesh
                        ? new i.I46(f, h)
                        : new i.eaF(f, h)).isSkinnedMesh &&
                    d.normalizeSkinWeights(),
                    A.mode === N.TRIANGLE_STRIP
                      ? (d.geometry = (0, u._c)(d.geometry, i.O49))
                      : A.mode === N.TRIANGLE_FAN &&
                        (d.geometry = (0, u._c)(d.geometry, i.rYR));
                else if (A.mode === N.LINES) d = new i.DXC(f, h);
                else if (A.mode === N.LINE_STRIP) d = new i.N1A(f, h);
                else if (A.mode === N.LINE_LOOP) d = new i.FCc(f, h);
                else if (A.mode === N.POINTS) d = new i.ONl(f, h);
                else
                  throw Error(
                    "THREE.GLTFLoader: Primitive mode unsupported: " + A.mode
                  );
                Object.keys(d.geometry.morphAttributes).length > 0 &&
                  (function (e, t) {
                    if ((e.updateMorphTargets(), void 0 !== t.weights))
                      for (let r = 0, n = t.weights.length; r < n; r++)
                        e.morphTargetInfluences[r] = t.weights[r];
                    if (t.extras && Array.isArray(t.extras.targetNames)) {
                      let r = t.extras.targetNames;
                      if (e.morphTargetInfluences.length === r.length) {
                        e.morphTargetDictionary = {};
                        for (let t = 0, n = r.length; t < n; t++)
                          e.morphTargetDictionary[r[t]] = t;
                      } else
                        console.warn(
                          "THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names."
                        );
                    }
                  })(d, a),
                  (d.name = t.createUniqueName(a.name || "mesh_" + e)),
                  ee(d, a),
                  A.extensions && $(n, d, A),
                  t.assignFinalMaterial(d),
                  c.push(d);
              }
              for (let r = 0, n = c.length; r < n; r++)
                t.associations.set(c[r], { meshes: e, primitives: r });
              if (1 === c.length) return a.extensions && $(n, c[0], a), c[0];
              let d = new i.YJl();
              a.extensions && $(n, d, a), t.associations.set(d, { meshes: e });
              for (let e = 0, t = c.length; e < t; e++) d.add(c[e]);
              return d;
            })
          );
        }
        loadCamera(e) {
          let t;
          let r = this.json.cameras[e],
            n = r[r.type];
          if (!n) {
            console.warn("THREE.GLTFLoader: Missing camera parameters.");
            return;
          }
          return (
            "perspective" === r.type
              ? (t = new i.ubm(
                  i.cj9.radToDeg(n.yfov),
                  n.aspectRatio || 1,
                  n.znear || 1,
                  n.zfar || 2e6
                ))
              : "orthographic" === r.type &&
                (t = new i.qUd(
                  -n.xmag,
                  n.xmag,
                  n.ymag,
                  -n.ymag,
                  n.znear,
                  n.zfar
                )),
            r.name && (t.name = this.createUniqueName(r.name)),
            ee(t, r),
            Promise.resolve(t)
          );
        }
        loadSkin(e) {
          let t = this.json.skins[e],
            r = [];
          for (let e = 0, n = t.joints.length; e < n; e++)
            r.push(this._loadNodeShallow(t.joints[e]));
          return (
            void 0 !== t.inverseBindMatrices
              ? r.push(this.getDependency("accessor", t.inverseBindMatrices))
              : r.push(null),
            Promise.all(r).then(function (e) {
              let r = e.pop(),
                n = [],
                a = [];
              for (let o = 0, s = e.length; o < s; o++) {
                let s = e[o];
                if (s) {
                  n.push(s);
                  let e = new i.kn4();
                  null !== r && e.fromArray(r.array, 16 * o), a.push(e);
                } else
                  console.warn(
                    'THREE.GLTFLoader: Joint "%s" could not be found.',
                    t.joints[o]
                  );
              }
              return new i.EAD(n, a);
            })
          );
        }
        loadAnimation(e) {
          let t = this.json,
            r = this,
            n = t.animations[e],
            a = n.name ? n.name : "animation_" + e,
            o = [],
            s = [],
            l = [],
            u = [],
            c = [];
          for (let e = 0, t = n.channels.length; e < t; e++) {
            let t = n.channels[e],
              r = n.samplers[t.sampler],
              i = t.target,
              a = i.node,
              d = void 0 !== n.parameters ? n.parameters[r.input] : r.input,
              f = void 0 !== n.parameters ? n.parameters[r.output] : r.output;
            void 0 !== i.node &&
              (o.push(this.getDependency("node", a)),
              s.push(this.getDependency("accessor", d)),
              l.push(this.getDependency("accessor", f)),
              u.push(r),
              c.push(i));
          }
          return Promise.all([
            Promise.all(o),
            Promise.all(s),
            Promise.all(l),
            Promise.all(u),
            Promise.all(c),
          ]).then(function (e) {
            let t = e[0],
              n = e[1],
              o = e[2],
              s = e[3],
              l = e[4],
              u = [];
            for (let e = 0, i = t.length; e < i; e++) {
              let i = t[e],
                a = n[e],
                c = o[e],
                d = s[e],
                f = l[e];
              if (void 0 === i) continue;
              i.updateMatrix && i.updateMatrix();
              let A = r._createAnimationTracks(i, a, c, d, f);
              if (A) for (let e = 0; e < A.length; e++) u.push(A[e]);
            }
            return new i.tz3(a, void 0, u);
          });
        }
        createNodeMesh(e) {
          let t = this.json,
            r = this,
            n = t.nodes[e];
          return void 0 === n.mesh
            ? null
            : r.getDependency("mesh", n.mesh).then(function (e) {
                let t = r._getNodeRef(r.meshCache, n.mesh, e);
                return (
                  void 0 !== n.weights &&
                    t.traverse(function (e) {
                      if (e.isMesh)
                        for (let t = 0, r = n.weights.length; t < r; t++)
                          e.morphTargetInfluences[t] = n.weights[t];
                    }),
                  t
                );
              });
        }
        loadNode(e) {
          let t = this.json.nodes[e],
            r = this._loadNodeShallow(e),
            n = [],
            i = t.children || [];
          for (let e = 0, t = i.length; e < t; e++)
            n.push(this.getDependency("node", i[e]));
          let a =
            void 0 === t.skin
              ? Promise.resolve(null)
              : this.getDependency("skin", t.skin);
          return Promise.all([r, Promise.all(n), a]).then(function (e) {
            let t = e[0],
              r = e[1],
              n = e[2];
            null !== n &&
              t.traverse(function (e) {
                e.isSkinnedMesh && e.bind(n, en);
              });
            for (let e = 0, n = r.length; e < n; e++) t.add(r[e]);
            return t;
          });
        }
        _loadNodeShallow(e) {
          let t = this.json,
            r = this.extensions,
            n = this;
          if (void 0 !== this.nodeCache[e]) return this.nodeCache[e];
          let a = t.nodes[e],
            o = a.name ? n.createUniqueName(a.name) : "",
            s = [],
            l = n._invokeOne(function (t) {
              return t.createNodeMesh && t.createNodeMesh(e);
            });
          return (
            l && s.push(l),
            void 0 !== a.camera &&
              s.push(
                n.getDependency("camera", a.camera).then(function (e) {
                  return n._getNodeRef(n.cameraCache, a.camera, e);
                })
              ),
            n
              ._invokeAll(function (t) {
                return t.createNodeAttachment && t.createNodeAttachment(e);
              })
              .forEach(function (e) {
                s.push(e);
              }),
            (this.nodeCache[e] = Promise.all(s).then(function (t) {
              let s;
              if (
                (s =
                  !0 === a.isBone
                    ? new i.$Kf()
                    : t.length > 1
                    ? new i.YJl()
                    : 1 === t.length
                    ? t[0]
                    : new i.B69()) !== t[0]
              )
                for (let e = 0, r = t.length; e < r; e++) s.add(t[e]);
              if (
                (a.name && ((s.userData.name = a.name), (s.name = o)),
                ee(s, a),
                a.extensions && $(r, s, a),
                void 0 !== a.matrix)
              ) {
                let e = new i.kn4();
                e.fromArray(a.matrix), s.applyMatrix4(e);
              } else void 0 !== a.translation && s.position.fromArray(a.translation), void 0 !== a.rotation && s.quaternion.fromArray(a.rotation), void 0 !== a.scale && s.scale.fromArray(a.scale);
              return (
                n.associations.has(s) || n.associations.set(s, {}),
                (n.associations.get(s).nodes = e),
                s
              );
            })),
            this.nodeCache[e]
          );
        }
        loadScene(e) {
          let t = this.extensions,
            r = this.json.scenes[e],
            n = this,
            a = new i.YJl();
          r.name && (a.name = n.createUniqueName(r.name)),
            ee(a, r),
            r.extensions && $(t, a, r);
          let o = r.nodes || [],
            s = [];
          for (let e = 0, t = o.length; e < t; e++)
            s.push(n.getDependency("node", o[e]));
          return Promise.all(s).then(function (e) {
            for (let t = 0, r = e.length; t < r; t++) a.add(e[t]);
            return (
              (n.associations = ((e) => {
                let t = new Map();
                for (let [e, r] of n.associations)
                  (e instanceof i.imn || e instanceof i.gPd) && t.set(e, r);
                return (
                  e.traverse((e) => {
                    let r = n.associations.get(e);
                    null != r && t.set(e, r);
                  }),
                  t
                );
              })(a)),
              a
            );
          });
        }
        _createAnimationTracks(e, t, r, n, a) {
          let o;
          let s = [],
            l = e.name ? e.name : e.uuid,
            u = [];
          switch (
            (q[a.path] === q.weights
              ? e.traverse(function (e) {
                  e.morphTargetInfluences && u.push(e.name ? e.name : e.uuid);
                })
              : u.push(l),
            q[a.path])
          ) {
            case q.weights:
              o = i.Hit;
              break;
            case q.rotation:
              o = i.MBL;
              break;
            case q.position:
            case q.scale:
              o = i.RiT;
              break;
            default:
              o = 1 === r.itemSize ? i.Hit : i.RiT;
          }
          let c = void 0 !== n.interpolation ? z[n.interpolation] : i.PJ3,
            d = this._getArrayFromAccessor(r);
          for (let e = 0, r = u.length; e < r; e++) {
            let r = new o(u[e] + "." + q[a.path], t.array, d, c);
            "CUBICSPLINE" === n.interpolation &&
              this._createCubicSplineTrackInterpolant(r),
              s.push(r);
          }
          return s;
        }
        _getArrayFromAccessor(e) {
          let t = e.array;
          if (e.normalized) {
            let e = er(t.constructor),
              r = new Float32Array(t.length);
            for (let n = 0, i = t.length; n < i; n++) r[n] = t[n] * e;
            t = r;
          }
          return t;
        }
        _createCubicSplineTrackInterpolant(e) {
          (e.createInterpolant = function (e) {
            return new (this instanceof i.MBL ? K : k)(
              this.times,
              this.values,
              this.getValueSize() / 3,
              e
            );
          }),
            (e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline =
              !0);
        }
      }
      function ea(e, t, r) {
        let n = t.attributes,
          a = [];
        for (let t in n) {
          let i = Z[t] || t.toLowerCase();
          i in e.attributes ||
            a.push(
              (function (t, n) {
                return r.getDependency("accessor", t).then(function (t) {
                  e.setAttribute(n, t);
                });
              })(n[t], i)
            );
        }
        if (void 0 !== t.indices && !e.index) {
          let n = r.getDependency("accessor", t.indices).then(function (t) {
            e.setIndex(t);
          });
          a.push(n);
        }
        return (
          ee(e, t),
          !(function (e, t, r) {
            let n = t.attributes,
              a = new i.NRn();
            if (void 0 === n.POSITION) return;
            {
              let e = r.json.accessors[n.POSITION],
                t = e.min,
                o = e.max;
              if (void 0 !== t && void 0 !== o) {
                if (
                  (a.set(
                    new i.Pq0(t[0], t[1], t[2]),
                    new i.Pq0(o[0], o[1], o[2])
                  ),
                  e.normalized)
                ) {
                  let t = er(Q[e.componentType]);
                  a.min.multiplyScalar(t), a.max.multiplyScalar(t);
                }
              } else {
                console.warn(
                  "THREE.GLTFLoader: Missing min/max properties for accessor POSITION."
                );
                return;
              }
            }
            let o = t.targets;
            if (void 0 !== o) {
              let e = new i.Pq0(),
                t = new i.Pq0();
              for (let n = 0, i = o.length; n < i; n++) {
                let i = o[n];
                if (void 0 !== i.POSITION) {
                  let n = r.json.accessors[i.POSITION],
                    a = n.min,
                    o = n.max;
                  if (void 0 !== a && void 0 !== o) {
                    if (
                      (t.setX(Math.max(Math.abs(a[0]), Math.abs(o[0]))),
                      t.setY(Math.max(Math.abs(a[1]), Math.abs(o[1]))),
                      t.setZ(Math.max(Math.abs(a[2]), Math.abs(o[2]))),
                      n.normalized)
                    ) {
                      let e = er(Q[n.componentType]);
                      t.multiplyScalar(e);
                    }
                    e.max(t);
                  } else
                    console.warn(
                      "THREE.GLTFLoader: Missing min/max properties for accessor POSITION."
                    );
                }
              }
              a.expandByVector(e);
            }
            e.boundingBox = a;
            let s = new i.iyt();
            a.getCenter(s.center),
              (s.radius = a.min.distanceTo(a.max) / 2),
              (e.boundingSphere = s);
          })(e, t, r),
          Promise.all(a).then(function () {
            return void 0 !== t.targets
              ? (function (e, t, r) {
                  let n = !1,
                    i = !1,
                    a = !1;
                  for (let e = 0, r = t.length; e < r; e++) {
                    let r = t[e];
                    if (
                      (void 0 !== r.POSITION && (n = !0),
                      void 0 !== r.NORMAL && (i = !0),
                      void 0 !== r.COLOR_0 && (a = !0),
                      n && i && a)
                    )
                      break;
                  }
                  if (!n && !i && !a) return Promise.resolve(e);
                  let o = [],
                    s = [],
                    l = [];
                  for (let u = 0, c = t.length; u < c; u++) {
                    let c = t[u];
                    if (n) {
                      let t =
                        void 0 !== c.POSITION
                          ? r.getDependency("accessor", c.POSITION)
                          : e.attributes.position;
                      o.push(t);
                    }
                    if (i) {
                      let t =
                        void 0 !== c.NORMAL
                          ? r.getDependency("accessor", c.NORMAL)
                          : e.attributes.normal;
                      s.push(t);
                    }
                    if (a) {
                      let t =
                        void 0 !== c.COLOR_0
                          ? r.getDependency("accessor", c.COLOR_0)
                          : e.attributes.color;
                      l.push(t);
                    }
                  }
                  return Promise.all([
                    Promise.all(o),
                    Promise.all(s),
                    Promise.all(l),
                  ]).then(function (t) {
                    let r = t[0],
                      o = t[1],
                      s = t[2];
                    return (
                      n && (e.morphAttributes.position = r),
                      i && (e.morphAttributes.normal = o),
                      a && (e.morphAttributes.color = s),
                      (e.morphTargetsRelative = !0),
                      e
                    );
                  });
                })(e, t.targets, r)
              : e;
          })
        );
      }
      var eo = r(1767);
      let es = null,
        el = "https://www.gstatic.com/draco/versioned/decoders/1.5.5/";
      function eu(e = !0, t = !0, r) {
        return (n) => {
          r && r(n),
            e &&
              (es || (es = new o()),
              es.setDecoderPath("string" == typeof e ? e : el),
              n.setDRACOLoader(es)),
            t && n.setMeshoptDecoder("function" == typeof l ? l() : l);
        };
      }
      let ec = (e, t, r, n) => (0, eo.G)(h, e, eu(t, r, n));
      (ec.preload = (e, t, r, n) => eo.G.preload(h, e, eu(t, r, n))),
        (ec.clear = (e) => eo.G.clear(h, e)),
        (ec.setDecoderPath = (e) => {
          el = e;
        });
    },
    31333: (e, t, r) => {
      "use strict";
      r.d(t, { M: () => l });
      var n = r(85407),
        i = r(12115),
        a = r(1767),
        o = r(80337);
      let s = (function (e) {
        return (e.Linear = "linear"), (e.Radial = "radial"), e;
      })({});
      function l({
        stops: e,
        colors: t,
        size: r = 1024,
        width: l = 16,
        type: u = s.Linear,
        innerCircleRadius: c = 0,
        outerCircleRadius: d = "auto",
        ...f
      }) {
        let A = (0, a.C)((e) => e.gl),
          h = i.useMemo(() => {
            let n;
            let i = document.createElement("canvas"),
              a = i.getContext("2d");
            if (((i.width = l), (i.height = r), u === s.Linear))
              n = a.createLinearGradient(0, 0, 0, r);
            else {
              let e = i.width / 2,
                t = i.height / 2,
                r =
                  "auto" !== d
                    ? Math.abs(Number(d))
                    : Math.sqrt(e ** 2 + t ** 2);
              n = a.createRadialGradient(e, t, Math.abs(c), e, t, r);
            }
            let f = new o.Q1f(),
              A = e.length;
            for (; A--; ) n.addColorStop(e[A], f.set(t[A]).getStyle());
            return (
              a.save(),
              (a.fillStyle = n),
              a.fillRect(0, 0, l, r),
              a.restore(),
              i
            );
          }, [e]);
        return i.createElement(
          "canvasTexture",
          (0, n.A)(
            { colorSpace: A.outputColorSpace, args: [h], attach: "map" },
            f
          )
        );
      }
    },
    47731: (e, t, r) => {
      "use strict";
      r.d(t, { cw: () => E, X8: () => M });
      var n = r(85407),
        i = r(80337),
        a = r(12115),
        o = r(1767),
        s = r(81996),
        l = r.n(s);
      l().func.isRequired,
        l().arrayOf(l().oneOfType([l().element, l().func])).isRequired;
      var u = r(38029);
      let c = new i.kn4(),
        d = new i.kn4(),
        f = [],
        A = new i.eaF();
      class h extends i.YJl {
        constructor() {
          super(),
            (this.color = new i.Q1f("white")),
            (this.instance = { current: void 0 }),
            (this.instanceKey = { current: void 0 });
        }
        get geometry() {
          var e;
          return null == (e = this.instance.current) ? void 0 : e.geometry;
        }
        raycast(e, t) {
          let r = this.instance.current;
          if (!r || !r.geometry || !r.material) return;
          A.geometry = r.geometry;
          let n = r.matrixWorld,
            a = r.userData.instances.indexOf(this.instanceKey);
          if (-1 !== a && !(a > r.count)) {
            r.getMatrixAt(a, c),
              d.multiplyMatrices(n, c),
              (A.matrixWorld = d),
              r.material instanceof i.imn
                ? (A.material.side = r.material.side)
                : (A.material.side = r.material[0].side),
              A.raycast(e, f);
            for (let e = 0, r = f.length; e < r; e++) {
              let r = f[e];
              (r.instanceId = a), (r.object = this), t.push(r);
            }
            f.length = 0;
          }
        }
      }
      let p = a.createContext(null),
        m = new i.kn4(),
        B = new i.kn4(),
        C = new i.kn4(),
        g = new i.Pq0(),
        v = new i.PTz(),
        b = new i.Pq0(),
        y = (e) => e.isInstancedBufferAttribute,
        E = a.forwardRef(({ context: e, children: t, ...r }, i) => {
          a.useMemo(() => (0, o.e)({ PositionMesh: h }), []);
          let s = a.useRef();
          a.useImperativeHandle(i, () => s.current, []);
          let { subscribe: l, getParent: u } = a.useContext(e || p);
          return (
            a.useLayoutEffect(() => l(s), []),
            a.createElement(
              "positionMesh",
              (0, n.A)({ instance: u(), instanceKey: s, ref: s }, r),
              t
            )
          );
        }),
        M = a.forwardRef(
          (
            {
              context: e,
              children: t,
              range: r,
              limit: s = 1e3,
              frames: l = 1 / 0,
              ...c
            },
            d
          ) => {
            let [{ localContext: f, instance: A }] = a.useState(() => {
                let e = a.createContext(null);
                return {
                  localContext: e,
                  instance: a.forwardRef((t, r) =>
                    a.createElement(E, (0, n.A)({ context: e }, t, { ref: r }))
                  ),
                };
              }),
              h = a.useRef(null);
            a.useImperativeHandle(d, () => h.current, []);
            let [M, w] = a.useState([]),
              [[F, I]] = a.useState(() => {
                let e = new Float32Array(16 * s);
                for (let t = 0; t < s; t++) C.identity().toArray(e, 16 * t);
                return [e, new Float32Array([...Array(3 * s)].map(() => 1))];
              });
            a.useEffect(() => {
              h.current.instanceMatrix.needsUpdate = !0;
            });
            let R = 0,
              x = 0,
              G = a.useRef([]);
            a.useLayoutEffect(() => {
              G.current = Object.entries(h.current.geometry.attributes).filter(
                ([e, t]) => y(t)
              );
            }),
              (0, o.D)(() => {
                if (l === 1 / 0 || R < l) {
                  h.current.updateMatrix(),
                    h.current.updateMatrixWorld(),
                    m.copy(h.current.matrixWorld).invert(),
                    (x = Math.min(s, void 0 !== r ? r : s, M.length)),
                    (h.current.count = x),
                    (0, u.xH)(h.current.instanceMatrix, {
                      offset: 0,
                      count: 16 * x,
                    }),
                    (0, u.xH)(h.current.instanceColor, {
                      offset: 0,
                      count: 3 * x,
                    });
                  for (let e = 0; e < M.length; e++) {
                    let t = M[e].current;
                    t.matrixWorld.decompose(g, v, b),
                      B.compose(g, v, b).premultiply(m),
                      B.toArray(F, 16 * e),
                      (h.current.instanceMatrix.needsUpdate = !0),
                      t.color.toArray(I, 3 * e),
                      (h.current.instanceColor.needsUpdate = !0);
                  }
                  R++;
                }
              });
            let D = a.useMemo(
              () => ({
                getParent: () => h,
                subscribe: (e) => (
                  w((t) => [...t, e]),
                  () => w((t) => t.filter((t) => t.current !== e.current))
                ),
              }),
              []
            );
            return a.createElement(
              "instancedMesh",
              (0, n.A)(
                {
                  userData: { instances: M, limit: s, frames: l },
                  matrixAutoUpdate: !1,
                  ref: h,
                  args: [null, null, 0],
                  raycast: () => null,
                },
                c
              ),
              a.createElement("instancedBufferAttribute", {
                attach: "instanceMatrix",
                count: F.length / 16,
                array: F,
                itemSize: 16,
                usage: i.Vnu,
              }),
              a.createElement("instancedBufferAttribute", {
                attach: "instanceColor",
                count: I.length / 3,
                array: I,
                itemSize: 3,
                usage: i.Vnu,
              }),
              "function" == typeof t
                ? a.createElement(f.Provider, { value: D }, t(A))
                : e
                ? a.createElement(e.Provider, { value: D }, t)
                : a.createElement(p.Provider, { value: D }, t)
            );
          }
        );
    },
    64458: (e, t, r) => {
      "use strict";
      r.d(t, { r: () => o });
      var n = r(12115),
        i = r(1767);
      let a = (0, n.createContext)(null);
      function o({
        iterations: e = 10,
        ms: t = 250,
        threshold: r = 0.75,
        step: o = 0.1,
        factor: s = 0.5,
        flipflops: l = 1 / 0,
        bounds: u = (e) => (e > 100 ? [60, 100] : [40, 60]),
        onIncline: c,
        onDecline: d,
        onChange: f,
        onFallback: A,
        children: h,
      }) {
        let [p, m] = (0, n.useState)(() => ({
            fps: 0,
            index: 0,
            factor: s,
            flipped: 0,
            refreshrate: 0,
            fallback: !1,
            frames: [],
            averages: [],
            subscriptions: new Map(),
            subscribe: (e) => {
              let t = Symbol();
              return (
                p.subscriptions.set(t, e.current),
                () => void p.subscriptions.delete(t)
              );
            },
          })),
          B = 0;
        return (
          (0, i.D)(() => {
            let { frames: n, averages: i } = p;
            if (!p.fallback && i.length < e) {
              n.push(performance.now());
              let a = n[n.length - 1] - n[0];
              if (a >= t) {
                if (
                  ((p.fps = Math.round((n.length / a) * 1e3) / 1),
                  (p.refreshrate = Math.max(p.refreshrate, p.fps)),
                  (i[p.index++ % e] = p.fps),
                  i.length === e)
                ) {
                  let [t, n] = u(p.refreshrate),
                    a = i.filter((e) => e >= n),
                    s = i.filter((e) => e < t);
                  a.length > e * r &&
                    ((p.factor = Math.min(1, p.factor + o)),
                    p.flipped++,
                    c && c(p),
                    p.subscriptions.forEach(
                      (e) => e.onIncline && e.onIncline(p)
                    )),
                    s.length > e * r &&
                      ((p.factor = Math.max(0, p.factor - o)),
                      p.flipped++,
                      d && d(p),
                      p.subscriptions.forEach(
                        (e) => e.onDecline && e.onDecline(p)
                      )),
                    B !== p.factor &&
                      ((B = p.factor),
                      f && f(p),
                      p.subscriptions.forEach(
                        (e) => e.onChange && e.onChange(p)
                      )),
                    p.flipped > l &&
                      !p.fallback &&
                      ((p.fallback = !0),
                      A && A(p),
                      p.subscriptions.forEach(
                        (e) => e.onFallback && e.onFallback(p)
                      )),
                    (p.averages = []);
                }
                p.frames = [];
              }
            }
          }),
          n.createElement(a.Provider, { value: p }, h)
        );
      }
    },
    45393: (e, t, r) => {
      "use strict";
      r.d(t, { u: () => l });
      var n = r(85407),
        i = r(12115),
        a = r(1767),
        o = r(80337);
      let s = (e) => "function" == typeof e,
        l = i.forwardRef(
          (
            {
              envMap: e,
              resolution: t = 256,
              frames: r = 1 / 0,
              makeDefault: l,
              children: u,
              ...c
            },
            d
          ) => {
            let f = (0, a.C)(({ set: e }) => e),
              A = (0, a.C)(({ camera: e }) => e),
              h = (0, a.C)(({ size: e }) => e),
              p = i.useRef(null);
            i.useImperativeHandle(d, () => p.current, []);
            let m = i.useRef(null),
              B = (function (e, t, r) {
                let n = (0, a.C)((e) => e.size),
                  s = (0, a.C)((e) => e.viewport),
                  l = "number" == typeof e ? e : n.width * s.dpr,
                  u = n.height * s.dpr,
                  {
                    samples: c = 0,
                    depth: d,
                    ...f
                  } = ("number" == typeof e ? void 0 : e) || {},
                  A = i.useMemo(() => {
                    let e = new o.nWS(l, u, {
                      minFilter: o.k6q,
                      magFilter: o.k6q,
                      type: o.ix0,
                      ...f,
                    });
                    return (
                      d && (e.depthTexture = new o.VCu(l, u, o.RQf)),
                      (e.samples = c),
                      e
                    );
                  }, []);
                return (
                  i.useLayoutEffect(() => {
                    A.setSize(l, u), c && (A.samples = c);
                  }, [c, A, l, u]),
                  i.useEffect(() => () => A.dispose(), []),
                  A
                );
              })(t);
            i.useLayoutEffect(() => {
              c.manual || (p.current.aspect = h.width / h.height);
            }, [h, c]),
              i.useLayoutEffect(() => {
                p.current.updateProjectionMatrix();
              });
            let C = 0,
              g = null,
              v = s(u);
            return (
              (0, a.D)((t) => {
                v &&
                  (r === 1 / 0 || C < r) &&
                  ((m.current.visible = !1),
                  t.gl.setRenderTarget(B),
                  (g = t.scene.background),
                  e && (t.scene.background = e),
                  t.gl.render(t.scene, p.current),
                  (t.scene.background = g),
                  t.gl.setRenderTarget(null),
                  (m.current.visible = !0),
                  C++);
              }),
              i.useLayoutEffect(() => {
                if (l)
                  return (
                    f(() => ({ camera: p.current })),
                    () => f(() => ({ camera: A }))
                  );
              }, [p, l, f]),
              i.createElement(
                i.Fragment,
                null,
                i.createElement(
                  "perspectiveCamera",
                  (0, n.A)({ ref: p }, c),
                  !v && u
                ),
                i.createElement("group", { ref: m }, v && u(B.texture))
              )
            );
          }
        );
    },
    40635: (e, t, r) => {
      "use strict";
      r.d(t, { M: () => o });
      var n = r(80337),
        i = r(12115),
        a = r(1767);
      function o({ all: e, scene: t, camera: r }) {
        let o = (0, a.C)(({ gl: e }) => e),
          s = (0, a.C)(({ camera: e }) => e),
          l = (0, a.C)(({ scene: e }) => e);
        return (
          i.useLayoutEffect(() => {
            let i = [];
            e &&
              (t || l).traverse((e) => {
                !1 === e.visible && (i.push(e), (e.visible = !0));
              }),
              o.compile(t || l, r || s);
            let a = new n.o6l(128);
            new n.F1T(0.01, 1e5, a).update(o, t || l),
              a.dispose(),
              i.forEach((e) => (e.visible = !1));
          }, []),
          null
        );
      }
    },
    51373: (e, t, r) => {
      "use strict";
      r.d(t, { p: () => o }), r(12115);
      var n = r(80337),
        i = r(99827);
      let a = 0,
        o = (0, i.v)(
          (e) => (
            (n.h_9.onStart = (t, r, n) => {
              e({
                active: !0,
                item: t,
                loaded: r,
                total: n,
                progress: ((r - a) / (n - a)) * 100,
              });
            }),
            (n.h_9.onLoad = () => {
              e({ active: !1 });
            }),
            (n.h_9.onError = (t) => e((e) => ({ errors: [...e.errors, t] }))),
            (n.h_9.onProgress = (t, r, n) => {
              r === n && (a = n),
                e({
                  active: !0,
                  item: t,
                  loaded: r,
                  total: n,
                  progress: ((r - a) / (n - a)) * 100 || 100,
                });
            }),
            {
              errors: [],
              active: !1,
              progress: 0,
              item: "",
              loaded: 0,
              total: 0,
            }
          )
        );
    },
    27490: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => u });
      var n = r(12115),
        i = r(1767),
        a = r(80337);
      let o = parseInt(a.sPf.replace(/\D+/g, ""));
      class s extends a.BKk {
        constructor() {
          super({
            uniforms: { time: { value: 0 }, fade: { value: 1 } },
            vertexShader: `
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,
            fragmentShader: `
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${o >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
      }`,
          });
        }
      }
      let l = (e) =>
          new a.Pq0().setFromSpherical(
            new a.YHV(
              e,
              Math.acos(1 - 2 * Math.random()),
              2 * Math.random() * Math.PI
            )
          ),
        u = n.forwardRef(
          (
            {
              radius: e = 100,
              depth: t = 50,
              count: r = 5e3,
              saturation: o = 0,
              factor: u = 4,
              fade: c = !1,
              speed: d = 1,
            },
            f
          ) => {
            let A = n.useRef(),
              [h, p, m] = n.useMemo(() => {
                let n = [],
                  i = [],
                  s = Array.from(
                    { length: r },
                    () => (0.5 + 0.5 * Math.random()) * u
                  ),
                  c = new a.Q1f(),
                  d = e + t,
                  f = t / r;
                for (let e = 0; e < r; e++)
                  (d -= f * Math.random()),
                    n.push(...l(d).toArray()),
                    c.setHSL(e / r, o, 0.9),
                    i.push(c.r, c.g, c.b);
                return [
                  new Float32Array(n),
                  new Float32Array(i),
                  new Float32Array(s),
                ];
              }, [r, t, u, e, o]);
            (0, i.D)(
              (e) =>
                A.current &&
                (A.current.uniforms.time.value = e.clock.getElapsedTime() * d)
            );
            let [B] = n.useState(() => new s());
            return n.createElement(
              "points",
              { ref: f },
              n.createElement(
                "bufferGeometry",
                null,
                n.createElement("bufferAttribute", {
                  attach: "attributes-position",
                  args: [h, 3],
                }),
                n.createElement("bufferAttribute", {
                  attach: "attributes-color",
                  args: [p, 3],
                }),
                n.createElement("bufferAttribute", {
                  attach: "attributes-size",
                  args: [m, 1],
                })
              ),
              n.createElement("primitive", {
                ref: A,
                object: B,
                attach: "material",
                blending: a.EZo,
                "uniforms-fade-value": c,
                depthWrite: !1,
                transparent: !0,
                vertexColors: !0,
              })
            );
          }
        );
    },
    4454: (e, t, r) => {
      "use strict";
      r.d(t, { x: () => b });
      var n = r(85407),
        i = r(12115),
        a = r(1767),
        o = r(80337);
      class s extends o.QCA {
        constructor(e, t = {}) {
          let {
            bevelEnabled: r = !1,
            bevelSize: n = 8,
            bevelThickness: i = 10,
            font: a,
            height: o = 50,
            size: s = 100,
            lineHeight: l = 1,
            letterSpacing: u = 0,
            ...c
          } = t;
          void 0 === a
            ? super()
            : super(
                a.generateShapes(e, s, { lineHeight: l, letterSpacing: u }),
                {
                  ...c,
                  bevelEnabled: r,
                  bevelSize: n,
                  bevelThickness: i,
                  depth: o,
                }
              ),
            (this.type = "TextGeometry");
        }
      }
      var l = r(97477),
        u = Object.defineProperty,
        c = (e, t, r) =>
          t in e
            ? u(e, t, {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: r,
              })
            : (e[t] = r),
        d = (e, t, r) => (c(e, "symbol" != typeof t ? t + "" : t, r), r);
      class f extends o.aHM {
        constructor(e) {
          super(e);
        }
        load(e, t, r, n) {
          let i = new o.Y9S(this.manager);
          i.setPath(this.path),
            i.setRequestHeader(this.requestHeader),
            i.setWithCredentials(this.withCredentials),
            i.load(
              e,
              (e) => {
                if ("string" != typeof e) throw Error("unsupported data type");
                let r = JSON.parse(e),
                  n = this.parse(r);
                t && t(n);
              },
              r,
              n
            );
        }
        loadAsync(e, t) {
          return super.loadAsync(e, t);
        }
        parse(e) {
          return new A(e);
        }
      }
      class A {
        constructor(e) {
          d(this, "data"),
            d(this, "isFont", !0),
            d(this, "type", "Font"),
            (this.data = e);
        }
        generateShapes(e, t = 100, r) {
          let n = [],
            i = { letterSpacing: 0, lineHeight: 1, ...r },
            a = (function (e, t, r, n) {
              let i = Array.from(e),
                a = t / r.resolution,
                s =
                  (r.boundingBox.yMax -
                    r.boundingBox.yMin +
                    r.underlineThickness) *
                  a,
                l = [],
                u = 0,
                c = 0;
              for (let e = 0; e < i.length; e++) {
                let t = i[e];
                if ("\n" === t) (u = 0), (c -= s * n.lineHeight);
                else {
                  let e = (function (e, t, r, n, i) {
                    let a, s, l, u, c, d, f, A;
                    let h = i.glyphs[e] || i.glyphs["?"];
                    if (!h) {
                      console.error(
                        'THREE.Font: character "' +
                          e +
                          '" does not exists in font family ' +
                          i.familyName +
                          "."
                      );
                      return;
                    }
                    let p = new o.Ld9();
                    if (h.o) {
                      let e =
                        h._cachedOutline || (h._cachedOutline = h.o.split(" "));
                      for (let i = 0, o = e.length; i < o; )
                        switch (e[i++]) {
                          case "m":
                            (a = parseInt(e[i++]) * t + r),
                              (s = parseInt(e[i++]) * t + n),
                              p.moveTo(a, s);
                            break;
                          case "l":
                            (a = parseInt(e[i++]) * t + r),
                              (s = parseInt(e[i++]) * t + n),
                              p.lineTo(a, s);
                            break;
                          case "q":
                            (l = parseInt(e[i++]) * t + r),
                              (u = parseInt(e[i++]) * t + n),
                              (c = parseInt(e[i++]) * t + r),
                              (d = parseInt(e[i++]) * t + n),
                              p.quadraticCurveTo(c, d, l, u);
                            break;
                          case "b":
                            (l = parseInt(e[i++]) * t + r),
                              (u = parseInt(e[i++]) * t + n),
                              (c = parseInt(e[i++]) * t + r),
                              (d = parseInt(e[i++]) * t + n),
                              (f = parseInt(e[i++]) * t + r),
                              (A = parseInt(e[i++]) * t + n),
                              p.bezierCurveTo(c, d, f, A, l, u);
                        }
                    }
                    return { offsetX: h.ha * t, path: p };
                  })(t, a, u, c, r);
                  e && ((u += e.offsetX + n.letterSpacing), l.push(e.path));
                }
              }
              return l;
            })(e, t, this.data, i);
          for (let e = 0, t = a.length; e < t; e++)
            Array.prototype.push.apply(n, a[e].toShapes(!1));
          return n;
        }
      }
      var h = r(52947);
      let p = null;
      async function m(e) {
        return "string" == typeof e ? await (await fetch(e)).json() : e;
      }
      async function B(e) {
        var t;
        return (t = await m(e)), p || (p = new f()), p.parse(t);
      }
      function C(e) {
        return (0, h.DY)(B, [e]);
      }
      (C.preload = (e) => (0, h.uv)(B, [e])), (C.clear = (e) => (0, h.IU)([e]));
      let g = ["string", "number"],
        v = (e) => {
          let t = "",
            r = [];
          return (
            i.Children.forEach(e, (e) => {
              g.includes(typeof e) ? (t += e + "") : r.push(e);
            }),
            [t, ...r]
          );
        },
        b = i.forwardRef(
          (
            {
              font: e,
              letterSpacing: t = 0,
              lineHeight: r = 1,
              size: o = 1,
              height: u = 0.2,
              bevelThickness: c = 0.1,
              bevelSize: d = 0.01,
              bevelEnabled: f = !1,
              bevelOffset: A = 0,
              bevelSegments: h = 4,
              curveSegments: p = 8,
              smooth: m,
              children: B,
              ...g
            },
            b
          ) => {
            i.useMemo(() => (0, a.e)({ RenamedTextGeometry: s }), []);
            let y = i.useRef(null),
              E = C(e),
              M = (0, i.useMemo)(
                () => ({
                  font: E,
                  size: o,
                  height: u,
                  bevelThickness: c,
                  bevelSize: d,
                  bevelEnabled: f,
                  bevelSegments: h,
                  bevelOffset: A,
                  curveSegments: p,
                  letterSpacing: t,
                  lineHeight: r,
                }),
                [E, o, u, c, d, f, h, A, p, t, r]
              ),
              [w, ...F] = (0, i.useMemo)(() => v(B), [B]),
              I = i.useMemo(() => [w, M], [w, M]);
            return (
              i.useLayoutEffect(() => {
                m &&
                  ((y.current.geometry = (0, l.ec)(y.current.geometry, m)),
                  y.current.geometry.computeVertexNormals());
              }, [I, m]),
              i.useImperativeHandle(b, () => y.current, []),
              i.createElement(
                "mesh",
                (0, n.A)({}, g, { ref: y }),
                i.createElement("renamedTextGeometry", { args: I }),
                F
              )
            );
          }
        );
    },
    5085: (e, t, r) => {
      "use strict";
      r.d(t, { zo: () => s });
      var n = r(12115),
        i = r(80337),
        a = r(1767);
      let o = (e) =>
        e === Object(e) && !Array.isArray(e) && "function" != typeof e;
      function s(e, t) {
        let r = (0, a.C)((e) => e.gl),
          s = (0, a.G)(i.Tap, o(e) ? Object.values(e) : e);
        return (
          (0, n.useLayoutEffect)(() => {
            null == t || t(s);
          }, [t]),
          (0, n.useEffect)(() => {
            if ("initTexture" in r) {
              let e = [];
              Array.isArray(s)
                ? (e = s)
                : s instanceof i.gPd
                ? (e = [s])
                : o(s) && (e = Object.values(s)),
                e.forEach((e) => {
                  e instanceof i.gPd && r.initTexture(e);
                });
            }
          }, [r, s]),
          (0, n.useMemo)(() => {
            if (!o(e)) return s;
            {
              let t = {},
                r = 0;
              for (let n in e) t[n] = s[r++];
              return t;
            }
          }, [e, s])
        );
      }
      (s.preload = (e) => a.G.preload(i.Tap, e)),
        (s.clear = (e) => a.G.clear(i.Tap, e));
    },
    54206: (e, t, r) => {
      "use strict";
      r.d(t, { b: () => i });
      var n = r(80337);
      function i(e, t, r, i) {
        let a = class extends n.BKk {
          constructor(a = {}) {
            let o = Object.entries(e);
            super({
              uniforms: o.reduce((e, [t, r]) => {
                let i = n.LlO.clone({ [t]: { value: r } });
                return { ...e, ...i };
              }, {}),
              vertexShader: t,
              fragmentShader: r,
            }),
              (this.key = ""),
              o.forEach(([e]) =>
                Object.defineProperty(this, e, {
                  get: () => this.uniforms[e].value,
                  set: (t) => (this.uniforms[e].value = t),
                })
              ),
              Object.assign(this, a),
              i && i(this);
          }
        };
        return (a.key = n.cj9.generateUUID()), a;
      }
    },
    46536: (e, t, r) => {
      "use strict";
      r.d(t, { az: () => a });
      var n = r(85407),
        i = r(12115);
      let a = i.forwardRef(({ args: e, children: t, ...r }, a) => {
        let o = i.useRef(null);
        return (
          i.useImperativeHandle(a, () => o.current),
          i.useLayoutEffect(() => void 0),
          i.createElement(
            "mesh",
            (0, n.A)({ ref: o }, r),
            i.createElement("boxGeometry", { attach: "geometry", args: e }),
            t
          )
        );
      });
    },
    38029: (e, t, r) => {
      "use strict";
      r.d(t, { S2: () => a, tg: () => i, xH: () => n });
      let n = (e, t) => {
          "updateRanges" in e ? (e.updateRanges[0] = t) : (e.updateRange = t);
        },
        i = 3e3,
        a = 3001;
    },
    1767: (e, t, r) => {
      "use strict";
      let n, i, a, o, s;
      r.d(t, {
        B: () => T,
        C: () => en,
        D: () => ei,
        E: () => H,
        G: () => el,
        a: () => G,
        b: () => x,
        c: () => eR,
        d: () => eG,
        e: () => ef,
        f: () => eQ,
        i: () => R,
        p: () => eD,
        s: () => Y,
        u: () => D,
      });
      var l = r(80337),
        u = r(27274),
        c = r(12115),
        d = r(26188),
        f = r(18010);
      let A = (e) => {
          let t;
          let r = new Set(),
            n = (e, n) => {
              let i = "function" == typeof e ? e(t) : e;
              if (!Object.is(i, t)) {
                let e = t;
                (t = (null != n ? n : "object" != typeof i || null === i)
                  ? i
                  : Object.assign({}, t, i)),
                  r.forEach((r) => r(t, e));
              }
            },
            i = () => t,
            a = {
              setState: n,
              getState: i,
              getInitialState: () => o,
              subscribe: (e) => (r.add(e), () => r.delete(e)),
              destroy: () => {
                console.warn(
                  "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
                ),
                  r.clear();
              },
            },
            o = (t = e(n, i, a));
          return a;
        },
        h = (e) => (e ? A(e) : A),
        { useDebugValue: p } = c,
        { useSyncExternalStoreWithSelector: m } = f,
        B = (e) => e,
        C = (e, t) => {
          let r = h(e),
            n = (e, n = t) =>
              (function (e, t = B, r) {
                let n = m(
                  e.subscribe,
                  e.getState,
                  e.getServerState || e.getInitialState,
                  t,
                  r
                );
                return p(n), n;
              })(r, e, n);
          return Object.assign(n, r), n;
        },
        g = (e, t) => (e ? C(e, t) : C);
      var v = r(5193),
        b = r.n(v),
        y = r(39084),
        E = r(52947),
        M = r(95155),
        w = r(42353);
      function F(e) {
        let t = e.root;
        for (; t.getState().previousRoot; ) t = t.getState().previousRoot;
        return t;
      }
      r(87358), c.act;
      let I = (e) => e && e.isOrthographicCamera,
        R = (e) => e && e.hasOwnProperty("current"),
        x = ((e, t) =>
          "undefined" != typeof window &&
          ((null == (e = window.document) ? void 0 : e.createElement) ||
            (null == (t = window.navigator) ? void 0 : t.product) ===
              "ReactNative"))()
          ? c.useLayoutEffect
          : c.useEffect;
      function G(e) {
        let t = c.useRef(e);
        return x(() => void (t.current = e), [e]), t;
      }
      function D() {
        let e = (0, w.u5)(),
          t = (0, w.y3)();
        return c.useMemo(
          () =>
            ({ children: r }) => {
              let n = (0, w.Nz)(e, !0, (e) => e.type === c.StrictMode)
                ? c.StrictMode
                : c.Fragment;
              return (0, M.jsx)(n, {
                children: (0, M.jsx)(t, { children: r }),
              });
            },
          [e, t]
        );
      }
      function T({ set: e }) {
        return x(() => (e(new Promise(() => null)), () => e(!1)), [e]), null;
      }
      let H = ((e) => (
        ((e = class extends c.Component {
          constructor(...e) {
            super(...e), (this.state = { error: !1 });
          }
          componentDidCatch(e) {
            this.props.set(e);
          }
          render() {
            return this.state.error ? null : this.props.children;
          }
        }).getDerivedStateFromError = () => ({ error: !0 })),
        e
      ))();
      function S(e) {
        var t;
        let r =
          "undefined" != typeof window
            ? null != (t = window.devicePixelRatio)
              ? t
              : 2
            : 1;
        return Array.isArray(e) ? Math.min(Math.max(e[0], r), e[1]) : e;
      }
      function P(e) {
        var t;
        return null == (t = e.__r3f) ? void 0 : t.root.getState();
      }
      let O = {
          obj: (e) => e === Object(e) && !O.arr(e) && "function" != typeof e,
          fun: (e) => "function" == typeof e,
          str: (e) => "string" == typeof e,
          num: (e) => "number" == typeof e,
          boo: (e) => "boolean" == typeof e,
          und: (e) => void 0 === e,
          arr: (e) => Array.isArray(e),
          equ(
            e,
            t,
            {
              arrays: r = "shallow",
              objects: n = "reference",
              strict: i = !0,
            } = {}
          ) {
            let a;
            if (typeof e != typeof t || !!e != !!t) return !1;
            if (O.str(e) || O.num(e) || O.boo(e)) return e === t;
            let o = O.obj(e);
            if (o && "reference" === n) return e === t;
            let s = O.arr(e);
            if (s && "reference" === r) return e === t;
            if ((s || o) && e === t) return !0;
            for (a in e) if (!(a in t)) return !1;
            if (o && "shallow" === r && "shallow" === n) {
              for (a in i ? t : e)
                if (!O.equ(e[a], t[a], { strict: i, objects: "reference" }))
                  return !1;
            } else for (a in i ? t : e) if (e[a] !== t[a]) return !1;
            if (O.und(a)) {
              if (
                (s && 0 === e.length && 0 === t.length) ||
                (o &&
                  0 === Object.keys(e).length &&
                  0 === Object.keys(t).length)
              )
                return !0;
              if (e !== t) return !1;
            }
            return !0;
          },
        },
        _ = ["children", "key", "ref"];
      function J(e, t, r, n) {
        let i = null == e ? void 0 : e.__r3f;
        return (
          !i &&
            ((i = {
              root: t,
              type: r,
              parent: null,
              children: [],
              props: (function (e) {
                let t = {};
                for (let r in e) _.includes(r) || (t[r] = e[r]);
                return t;
              })(n),
              object: e,
              eventCount: 0,
              handlers: {},
              isHidden: !1,
            }),
            e && ((e.__r3f = i), r && Y(e, i.props))),
          i
        );
      }
      function L(e, t) {
        var r;
        let n = e[t];
        if (!t.includes("-")) return { root: e, key: t, target: n };
        let i = t.split("-");
        return (
          (n = i.reduce((e, t) => e[t], e)),
          (t = i.pop()),
          (null != (r = n) && r.set) || (e = i.reduce((e, t) => e[t], e)),
          { root: e, key: t, target: n }
        );
      }
      let U = /-\d+$/;
      function k(e, t) {
        if (O.str(t.props.attach)) {
          if (U.test(t.props.attach)) {
            let r = t.props.attach.replace(U, ""),
              { root: n, key: i } = L(e.object, r);
            Array.isArray(n[i]) || (n[i] = []);
          }
          let { root: r, key: n } = L(e.object, t.props.attach);
          (t.previousAttach = r[n]), (r[n] = t.object);
        } else
          O.fun(t.props.attach) &&
            (t.previousAttach = t.props.attach(e.object, t.object));
      }
      function j(e, t) {
        if (O.str(t.props.attach)) {
          let { root: r, key: n } = L(e.object, t.props.attach),
            i = t.previousAttach;
          void 0 === i ? delete r[n] : (r[n] = i);
        } else null == t.previousAttach || t.previousAttach(e.object, t.object);
        delete t.previousAttach;
      }
      let K = [
          ..._,
          "args",
          "dispose",
          "attach",
          "object",
          "onUpdate",
          "dispose",
        ],
        N = new Map(),
        Q = [
          "map",
          "emissiveMap",
          "sheenColorMap",
          "specularColorMap",
          "envMap",
        ],
        X = /^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/;
      function Y(e, t) {
        var r, n;
        let i = e.__r3f,
          a = i && F(i).getState(),
          o = null == i ? void 0 : i.eventCount;
        for (let r in t) {
          let o = t[r];
          if (
            K.includes(r) ||
            (i &&
              X.test(r) &&
              ("function" == typeof o
                ? (i.handlers[r] = o)
                : delete i.handlers[r],
              (i.eventCount = Object.keys(i.handlers).length)),
            void 0 === o)
          )
            continue;
          let { root: s, key: u, target: c } = L(e, r);
          null != c &&
          c.copy &&
          null != o &&
          o.constructor &&
          c.constructor === o.constructor
            ? c.copy(o)
            : c instanceof l.zgK && o instanceof l.zgK
            ? (c.mask = o.mask)
            : null != c && c.set && Array.isArray(o)
            ? c.fromArray
              ? c.fromArray(o)
              : c.set(...o)
            : null != c && c.set && "object" != typeof o
            ? (null == c ? void 0 : c.isColor) ||
              !c.setScalar ||
              "number" != typeof o
              ? c.set(o)
              : c.setScalar(o)
            : ((s[u] = o),
              a &&
                !a.linear &&
                Q.includes(u) &&
                null != (n = s[u]) &&
                n.isTexture &&
                s[u].format === l.GWd &&
                s[u].type === l.OUM &&
                (s[u].colorSpace = l.er$));
        }
        if (
          null != i &&
          i.parent &&
          null != a &&
          a.internal &&
          null != (r = i.object) &&
          r.isObject3D &&
          o !== i.eventCount
        ) {
          let e = i.object,
            t = a.internal.interaction.indexOf(e);
          t > -1 && a.internal.interaction.splice(t, 1),
            i.eventCount &&
              null !== e.raycast &&
              a.internal.interaction.push(e);
        }
        return (
          i &&
            void 0 === i.props.attach &&
            (i.object.isBufferGeometry
              ? (i.props.attach = "geometry")
              : i.object.isMaterial && (i.props.attach = "material")),
          i && W(i),
          e
        );
      }
      function W(e) {
        var t;
        if (!e.parent) return;
        null == e.props.onUpdate || e.props.onUpdate(e.object);
        let r =
          null == (t = e.root)
            ? void 0
            : null == t.getState
            ? void 0
            : t.getState();
        r && 0 === r.internal.frames && r.invalidate();
      }
      function Z(e, t) {
        e.manual ||
          (I(e)
            ? ((e.left = -(t.width / 2)),
              (e.right = t.width / 2),
              (e.top = t.height / 2),
              (e.bottom = -(t.height / 2)))
            : (e.aspect = t.width / t.height),
          e.updateProjectionMatrix());
      }
      let q = (e) => (null == e ? void 0 : e.isObject3D);
      function z(e) {
        return (e.eventObject || e.object).uuid + "/" + e.index + e.instanceId;
      }
      function V(e, t, r, n) {
        let i = r.get(t);
        i &&
          (r.delete(t),
          0 === r.size && (e.delete(n), i.target.releasePointerCapture(n)));
      }
      let $ = (e) => !!(null != e && e.render),
        ee = c.createContext(null),
        et = (e, t) => {
          let r = g((r, n) => {
              let i;
              let a = new l.Pq0(),
                o = new l.Pq0(),
                s = new l.Pq0();
              function u(e = n().camera, t = o, r = n().size) {
                let { width: i, height: l, top: c, left: d } = r,
                  f = i / l;
                t.isVector3 ? s.copy(t) : s.set(...t);
                let A = e.getWorldPosition(a).distanceTo(s);
                if (I(e))
                  return {
                    width: i / e.zoom,
                    height: l / e.zoom,
                    top: c,
                    left: d,
                    factor: 1,
                    distance: A,
                    aspect: f,
                  };
                {
                  let t = 2 * Math.tan((e.fov * Math.PI) / 180 / 2) * A,
                    r = (i / l) * t;
                  return {
                    width: r,
                    height: t,
                    top: c,
                    left: d,
                    factor: i / r,
                    distance: A,
                    aspect: f,
                  };
                }
              }
              let d = (e) =>
                  r((t) => ({ performance: { ...t.performance, current: e } })),
                f = new l.I9Y();
              return {
                set: r,
                get: n,
                gl: null,
                camera: null,
                raycaster: null,
                events: { priority: 1, enabled: !0, connected: !1 },
                scene: null,
                xr: null,
                invalidate: (t = 1) => e(n(), t),
                advance: (e, r) => t(e, r, n()),
                legacy: !1,
                linear: !1,
                flat: !1,
                controls: null,
                clock: new l.zD7(),
                pointer: f,
                mouse: f,
                frameloop: "always",
                onPointerMissed: void 0,
                performance: {
                  current: 1,
                  min: 0.5,
                  max: 1,
                  debounce: 200,
                  regress: () => {
                    let e = n();
                    i && clearTimeout(i),
                      e.performance.current !== e.performance.min &&
                        d(e.performance.min),
                      (i = setTimeout(
                        () => d(n().performance.max),
                        e.performance.debounce
                      ));
                  },
                },
                size: { width: 0, height: 0, top: 0, left: 0 },
                viewport: {
                  initialDpr: 0,
                  dpr: 0,
                  width: 0,
                  height: 0,
                  top: 0,
                  left: 0,
                  aspect: 0,
                  distance: 0,
                  factor: 0,
                  getCurrentViewport: u,
                },
                setEvents: (e) =>
                  r((t) => ({ ...t, events: { ...t.events, ...e } })),
                setSize: (e, t, i = 0, a = 0) => {
                  let s = n().camera,
                    l = { width: e, height: t, top: i, left: a };
                  r((e) => ({
                    size: l,
                    viewport: { ...e.viewport, ...u(s, o, l) },
                  }));
                },
                setDpr: (e) =>
                  r((t) => {
                    let r = S(e);
                    return {
                      viewport: {
                        ...t.viewport,
                        dpr: r,
                        initialDpr: t.viewport.initialDpr || r,
                      },
                    };
                  }),
                setFrameloop: (e = "always") => {
                  let t = n().clock;
                  t.stop(),
                    (t.elapsedTime = 0),
                    "never" !== e && (t.start(), (t.elapsedTime = 0)),
                    r(() => ({ frameloop: e }));
                },
                previousRoot: void 0,
                internal: {
                  interaction: [],
                  hovered: new Map(),
                  subscribers: [],
                  initialClick: [0, 0],
                  initialHits: [],
                  capturedMap: new Map(),
                  lastEvent: c.createRef(),
                  active: !1,
                  frames: 0,
                  priority: 0,
                  subscribe: (e, t, r) => {
                    let i = n().internal;
                    return (
                      (i.priority = i.priority + (t > 0 ? 1 : 0)),
                      i.subscribers.push({ ref: e, priority: t, store: r }),
                      (i.subscribers = i.subscribers.sort(
                        (e, t) => e.priority - t.priority
                      )),
                      () => {
                        let r = n().internal;
                        null != r &&
                          r.subscribers &&
                          ((r.priority = r.priority - (t > 0 ? 1 : 0)),
                          (r.subscribers = r.subscribers.filter(
                            (t) => t.ref !== e
                          )));
                      }
                    );
                  },
                },
              };
            }),
            n = r.getState(),
            i = n.size,
            a = n.viewport.dpr,
            o = n.camera;
          return (
            r.subscribe(() => {
              let {
                camera: e,
                size: t,
                viewport: n,
                gl: s,
                set: l,
              } = r.getState();
              if (t.width !== i.width || t.height !== i.height || n.dpr !== a) {
                (i = t), (a = n.dpr), Z(e, t), s.setPixelRatio(n.dpr);
                let r =
                  "undefined" != typeof HTMLCanvasElement &&
                  s.domElement instanceof HTMLCanvasElement;
                s.setSize(t.width, t.height, r);
              }
              e !== o &&
                ((o = e),
                l((t) => ({
                  viewport: {
                    ...t.viewport,
                    ...t.viewport.getCurrentViewport(e),
                  },
                })));
            }),
            r.subscribe((t) => e(t)),
            r
          );
        };
      function er() {
        let e = c.useContext(ee);
        if (!e)
          throw Error(
            "R3F: Hooks can only be used within the Canvas component!"
          );
        return e;
      }
      function en(e = (e) => e, t) {
        return er()(e, t);
      }
      function ei(e, t = 0) {
        let r = er(),
          n = r.getState().internal.subscribe,
          i = G(e);
        return x(() => n(i, t, r), [t, n, r]), null;
      }
      let ea = new WeakMap(),
        eo = (e) => {
          var t;
          return (
            "function" == typeof e &&
            (null == e
              ? void 0
              : null == (t = e.prototype)
              ? void 0
              : t.constructor) === e
          );
        };
      function es(e, t) {
        return function (r, ...n) {
          let i;
          return (
            eo(r) ? (i = ea.get(r)) || ((i = new r()), ea.set(r, i)) : (i = r),
            e && e(i),
            Promise.all(
              n.map(
                (e) =>
                  new Promise((r, n) =>
                    i.load(
                      e,
                      (e) => {
                        q(null == e ? void 0 : e.scene) &&
                          Object.assign(
                            e,
                            (function (e) {
                              let t = { nodes: {}, materials: {} };
                              return (
                                e &&
                                  e.traverse((e) => {
                                    e.name && (t.nodes[e.name] = e),
                                      e.material &&
                                        !t.materials[e.material.name] &&
                                        (t.materials[e.material.name] =
                                          e.material);
                                  }),
                                t
                              );
                            })(e.scene)
                          ),
                          r(e);
                      },
                      t,
                      (t) =>
                        n(
                          Error(
                            `Could not load ${e}: ${
                              null == t ? void 0 : t.message
                            }`
                          )
                        )
                    )
                  )
              )
            )
          );
        };
      }
      function el(e, t, r, n) {
        let i = Array.isArray(t) ? t : [t],
          a = (0, E.DY)(es(r, n), [e, ...i], { equal: O.equ });
        return Array.isArray(t) ? a : a[0];
      }
      (el.preload = function (e, t, r) {
        let n = Array.isArray(t) ? t : [t];
        return (0, E.uv)(es(r), [e, ...n]);
      }),
        (el.clear = function (e, t) {
          let r = Array.isArray(t) ? t : [t];
          return (0, E.IU)([e, ...r]);
        });
      let eu = {},
        ec = 0,
        ed = (e) => "function" == typeof e;
      function ef(e) {
        if (ed(e)) {
          let t = `${ec++}`;
          return (eu[t] = e), t;
        }
        Object.assign(eu, e);
      }
      function eA(e, t) {
        let r = `${e[0].toUpperCase()}${e.slice(1)}`,
          n = eu[r];
        if ("primitive" !== e && !n)
          throw Error(
            `R3F: ${r} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`
          );
        if ("primitive" === e && !t.object)
          throw Error("R3F: Primitives without 'object' are invalid!");
        if (void 0 !== t.args && !Array.isArray(t.args))
          throw Error("R3F: The args prop must be an array!");
      }
      function eh(e) {
        if (e.isHidden) {
          var t;
          e.props.attach && null != (t = e.parent) && t.object
            ? k(e.parent, e)
            : q(e.object) && !1 !== e.props.visible && (e.object.visible = !0),
            (e.isHidden = !1),
            W(e);
        }
      }
      function ep(e, t, r) {
        let n = t.root.getState();
        if (e.parent || e.object === n.scene) {
          if (!t.object) {
            var i, a;
            let e = eu[`${t.type[0].toUpperCase()}${t.type.slice(1)}`];
            (t.object =
              null != (i = t.props.object)
                ? i
                : new e(...(null != (a = t.props.args) ? a : []))),
              (t.object.__r3f = t),
              Y(t.object, t.props);
          }
          if (t.props.attach) k(e, t);
          else if (q(t.object) && q(e.object)) {
            let n = e.object.children.indexOf(null == r ? void 0 : r.object);
            r && -1 !== n
              ? ((t.object.parent = e.object),
                e.object.children.splice(n, 0, t.object),
                t.object.dispatchEvent({ type: "added" }),
                e.object.dispatchEvent({ type: "childadded", child: t.object }))
              : e.object.add(t.object);
          }
          for (let e of t.children) ep(t, e);
          W(t);
        }
      }
      function em(e, t) {
        t && ((t.parent = e), e.children.push(t), ep(e, t));
      }
      function eB(e, t, r) {
        if (!t || !r) return;
        t.parent = e;
        let n = e.children.indexOf(r);
        -1 !== n ? e.children.splice(n, 0, t) : e.children.push(t), ep(e, t, r);
      }
      function eC(e) {
        if ("function" == typeof e.dispose) {
          let t = () => {
            try {
              e.dispose();
            } catch {}
          };
          "undefined" != typeof IS_REACT_ACT_ENVIRONMENT
            ? t()
            : (0, y.unstable_scheduleCallback)(y.unstable_IdlePriority, t);
        }
      }
      function eg(e, t, r) {
        if (!t) return;
        t.parent = null;
        let n = e.children.indexOf(t);
        -1 !== n && e.children.splice(n, 1),
          t.props.attach
            ? j(e, t)
            : q(t.object) &&
              q(e.object) &&
              (e.object.remove(t.object),
              (function (e, t) {
                let { internal: r } = e.getState();
                (r.interaction = r.interaction.filter((e) => e !== t)),
                  (r.initialHits = r.initialHits.filter((e) => e !== t)),
                  r.hovered.forEach((e, n) => {
                    (e.eventObject === t || e.object === t) &&
                      r.hovered.delete(n);
                  }),
                  r.capturedMap.forEach((e, n) => {
                    V(r.capturedMap, t, e, n);
                  });
              })(F(t), t.object));
        let i = null !== t.props.dispose && !1 !== r;
        for (let e = t.children.length - 1; e >= 0; e--) {
          let r = t.children[e];
          eg(t, r, i);
        }
        (t.children.length = 0),
          delete t.object.__r3f,
          i &&
            "primitive" !== t.type &&
            "Scene" !== t.object.type &&
            eC(t.object),
          void 0 === r && W(t);
      }
      let ev = [],
        eb = () => {},
        ey = {},
        eE = 0,
        eM = (function (e) {
          let t = b()(e);
          return (
            t.injectIntoDevTools({
              bundleType: 0,
              rendererPackageName: "@react-three/fiber",
              version: c.version,
            }),
            t
          );
        })({
          isPrimaryRenderer: !1,
          warnsIfNotActing: !1,
          supportsMutation: !0,
          supportsPersistence: !1,
          supportsHydration: !1,
          createInstance: function (e, t, r) {
            var n;
            return (
              eA(e, t),
              "primitive" === e &&
                null != (n = t.object) &&
                n.__r3f &&
                delete t.object.__r3f,
              J(t.object, r, e, t)
            );
          },
          removeChild: eg,
          appendChild: em,
          appendInitialChild: em,
          insertBefore: eB,
          appendChildToContainer(e, t) {
            let r = e.getState().scene.__r3f;
            t && r && em(r, t);
          },
          removeChildFromContainer(e, t) {
            let r = e.getState().scene.__r3f;
            t && r && eg(r, t);
          },
          insertInContainerBefore(e, t, r) {
            let n = e.getState().scene.__r3f;
            t && r && n && eB(n, t, r);
          },
          getRootHostContext: () => ey,
          getChildHostContext: () => ey,
          commitUpdate(e, t, r, n, i) {
            var a, o, s;
            eA(t, n);
            let l = !1;
            if (
              ("primitive" === e.type && r.object !== n.object
                ? (l = !0)
                : (null == (a = n.args) ? void 0 : a.length) !==
                  (null == (o = r.args) ? void 0 : o.length)
                ? (l = !0)
                : null != (s = n.args) &&
                  s.some((e, t) => {
                    var n;
                    return e !== (null == (n = r.args) ? void 0 : n[t]);
                  }) &&
                  (l = !0),
              l)
            )
              ev.push([e, { ...n }, i]);
            else {
              let t = (function (e, t) {
                let r = {};
                for (let n in t)
                  if (!K.includes(n) && !O.equ(t[n], e.props[n]))
                    for (let e in ((r[n] = t[n]), t))
                      e.startsWith(`${n}-`) && (r[e] = t[e]);
                for (let n in e.props) {
                  if (K.includes(n) || t.hasOwnProperty(n)) continue;
                  let { root: i, key: a } = L(e.object, n);
                  if (i.constructor && 0 === i.constructor.length) {
                    let e = N.get(i.constructor);
                    e || ((e = new i.constructor()), N.set(i.constructor, e)),
                      (r[a] = e[a]);
                  } else r[a] = 0;
                }
                return r;
              })(e, n);
              Object.keys(t).length &&
                (Object.assign(e.props, t), Y(e.object, t));
            }
            (null === i.sibling || (4 & i.flags) == 0) &&
              (function () {
                for (let [e] of ev) {
                  let t = e.parent;
                  if (t)
                    for (let r of (e.props.attach
                      ? j(t, e)
                      : q(e.object) && q(t.object) && t.object.remove(e.object),
                    e.children))
                      r.props.attach
                        ? j(e, r)
                        : q(r.object) &&
                          q(e.object) &&
                          e.object.remove(r.object);
                  e.isHidden && eh(e),
                    e.object.__r3f && delete e.object.__r3f,
                    "primitive" !== e.type && eC(e.object);
                }
                for (let [r, n, i] of ev) {
                  r.props = n;
                  let a = r.parent;
                  if (a) {
                    var e, t;
                    let n = eu[`${r.type[0].toUpperCase()}${r.type.slice(1)}`];
                    for (let o of ((r.object =
                      null != (e = r.props.object)
                        ? e
                        : new n(...(null != (t = r.props.args) ? t : []))),
                    (r.object.__r3f = r),
                    !(function (e, t) {
                      for (let r of [e, e.alternate])
                        if (null !== r) {
                          if ("function" == typeof r.ref) {
                            null == r.refCleanup || r.refCleanup();
                            let e = r.ref(t);
                            "function" == typeof e && (r.refCleanup = e);
                          } else r.ref && (r.ref.current = t);
                        }
                    })(i, r.object),
                    Y(r.object, r.props),
                    r.props.attach
                      ? k(a, r)
                      : q(r.object) && q(a.object) && a.object.add(r.object),
                    r.children))
                      o.props.attach
                        ? k(r, o)
                        : q(o.object) && q(r.object) && r.object.add(o.object);
                    W(r);
                  }
                }
                ev.length = 0;
              })();
          },
          finalizeInitialChildren: () => !1,
          commitMount() {},
          getPublicInstance: (e) => (null == e ? void 0 : e.object),
          prepareForCommit: () => null,
          preparePortalMount: (e) => J(e.getState().scene, e, "", {}),
          resetAfterCommit: () => {},
          shouldSetTextContent: () => !1,
          clearContainer: () => !1,
          hideInstance: function (e) {
            if (!e.isHidden) {
              var t;
              e.props.attach && null != (t = e.parent) && t.object
                ? j(e.parent, e)
                : q(e.object) && (e.object.visible = !1),
                (e.isHidden = !0),
                W(e);
            }
          },
          unhideInstance: eh,
          createTextInstance: eb,
          hideTextInstance: eb,
          unhideTextInstance: eb,
          scheduleTimeout:
            "function" == typeof setTimeout ? setTimeout : void 0,
          cancelTimeout:
            "function" == typeof clearTimeout ? clearTimeout : void 0,
          noTimeout: -1,
          getInstanceFromNode: () => null,
          beforeActiveInstanceBlur() {},
          afterActiveInstanceBlur() {},
          detachDeletedInstance() {},
          prepareScopeUpdate() {},
          getInstanceFromScope: () => null,
          shouldAttemptEagerTransition: () => !1,
          trackSchedulerEvent: () => {},
          resolveEventType: () => null,
          resolveEventTimeStamp: () => -1.1,
          requestPostPaintCallback() {},
          maySuspendCommit: () => !1,
          preloadInstance: () => !0,
          startSuspendingCommit() {},
          suspendInstance() {},
          waitForCommitToBeReady: () => null,
          NotPendingTransition: null,
          HostTransitionContext: c.createContext(null),
          setCurrentUpdatePriority(e) {
            eE = e;
          },
          getCurrentUpdatePriority: () => eE,
          resolveUpdatePriority() {
            var e;
            if (0 !== eE) return eE;
            switch (
              "undefined" != typeof window &&
              (null == (e = window.event) ? void 0 : e.type)
            ) {
              case "click":
              case "contextmenu":
              case "dblclick":
              case "pointercancel":
              case "pointerdown":
              case "pointerup":
                return d.DiscreteEventPriority;
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerenter":
              case "pointerleave":
              case "wheel":
                return d.ContinuousEventPriority;
              default:
                return d.DefaultEventPriority;
            }
          },
          resetFormInstance() {},
        }),
        ew = new Map(),
        eF = { objects: "shallow", strict: !1 },
        eI = (e, t) => {
          let r = "function" == typeof e ? e(t) : e;
          return $(r)
            ? r
            : new u.WebGLRenderer({
                powerPreference: "high-performance",
                canvas: t,
                antialias: !0,
                alpha: !0,
                ...e,
              });
        };
      function eR(e) {
        let t, r;
        let n = ew.get(e),
          i = null == n ? void 0 : n.fiber,
          a = null == n ? void 0 : n.store;
        n && console.warn("R3F.createRoot should only be called once!");
        let o = "function" == typeof reportError ? reportError : console.error,
          s = a || et(ej, eK),
          u =
            i ||
            eM.createContainer(
              s,
              d.ConcurrentRoot,
              null,
              !1,
              null,
              "",
              o,
              o,
              o,
              null
            );
        n || ew.set(e, { fiber: u, store: s });
        let c = !1;
        return {
          configure(n = {}) {
            var i, a;
            let {
                gl: o,
                size: u,
                scene: d,
                events: f,
                onCreated: A,
                shadows: h = !1,
                linear: p = !1,
                flat: m = !1,
                legacy: B = !1,
                orthographic: C = !1,
                frameloop: g = "always",
                dpr: v = [1, 2],
                performance: b,
                raycaster: y,
                camera: E,
                onPointerMissed: M,
              } = n,
              w = s.getState(),
              F = w.gl;
            w.gl || w.set({ gl: (F = eI(o, e)) });
            let I = w.raycaster;
            I || w.set({ raycaster: (I = new l.tBo()) });
            let { params: R, ...x } = y || {};
            if (
              (O.equ(x, I, eF) || Y(I, { ...x }),
              O.equ(R, I.params, eF) || Y(I, { params: { ...I.params, ...R } }),
              !w.camera || (w.camera === r && !O.equ(r, E, eF)))
            ) {
              r = E;
              let e = null == E ? void 0 : E.isCamera,
                t = e
                  ? E
                  : C
                  ? new l.qUd(0, 0, 0, 0, 0.1, 1e3)
                  : new l.ubm(75, 0, 0.1, 1e3);
              e ||
                ((t.position.z = 5),
                E &&
                  (Y(t, E),
                  !t.manual &&
                    ("aspect" in E ||
                      "left" in E ||
                      "right" in E ||
                      "bottom" in E ||
                      "top" in E) &&
                    ((t.manual = !0), t.updateProjectionMatrix())),
                w.camera || (null != E && E.rotation) || t.lookAt(0, 0, 0)),
                w.set({ camera: t }),
                (I.camera = t);
            }
            if (!w.scene) {
              let e;
              null != d && d.isScene
                ? J((e = d), s, "", {})
                : (J((e = new l.Z58()), s, "", {}), d && Y(e, d)),
                w.set({ scene: e });
            }
            if (!w.xr) {
              let e = (e, t) => {
                  let r = s.getState();
                  "never" !== r.frameloop && eK(e, !0, r, t);
                },
                t = () => {
                  let t = s.getState();
                  (t.gl.xr.enabled = t.gl.xr.isPresenting),
                    t.gl.xr.setAnimationLoop(t.gl.xr.isPresenting ? e : null),
                    t.gl.xr.isPresenting || ej(t);
                },
                r = {
                  connect() {
                    let e = s.getState().gl;
                    e.xr.addEventListener("sessionstart", t),
                      e.xr.addEventListener("sessionend", t);
                  },
                  disconnect() {
                    let e = s.getState().gl;
                    e.xr.removeEventListener("sessionstart", t),
                      e.xr.removeEventListener("sessionend", t);
                  },
                };
              "function" ==
                typeof (null == (i = F.xr) ? void 0 : i.addEventListener) &&
                r.connect(),
                w.set({ xr: r });
            }
            if (F.shadowMap) {
              let e = F.shadowMap.enabled,
                t = F.shadowMap.type;
              if (((F.shadowMap.enabled = !!h), O.boo(h)))
                F.shadowMap.type = l.Wk7;
              else if (O.str(h)) {
                let e = {
                  basic: l.bTm,
                  percentage: l.QP0,
                  soft: l.Wk7,
                  variance: l.RyA,
                };
                F.shadowMap.type = null != (a = e[h]) ? a : l.Wk7;
              } else O.obj(h) && Object.assign(F.shadowMap, h);
              (e !== F.shadowMap.enabled || t !== F.shadowMap.type) &&
                (F.shadowMap.needsUpdate = !0);
            }
            (l.ppV.enabled = !B),
              c ||
                ((F.outputColorSpace = p ? l.Zr2 : l.er$),
                (F.toneMapping = m ? l.y_p : l.FV)),
              w.legacy !== B && w.set(() => ({ legacy: B })),
              w.linear !== p && w.set(() => ({ linear: p })),
              w.flat !== m && w.set(() => ({ flat: m })),
              !o || O.fun(o) || $(o) || O.equ(o, F, eF) || Y(F, o),
              f && !w.events.handlers && w.set({ events: f(s) });
            let G = (function (e, t) {
              if (
                !t &&
                "undefined" != typeof HTMLCanvasElement &&
                e instanceof HTMLCanvasElement &&
                e.parentElement
              ) {
                let {
                  width: t,
                  height: r,
                  top: n,
                  left: i,
                } = e.parentElement.getBoundingClientRect();
                return { width: t, height: r, top: n, left: i };
              }
              return !t &&
                "undefined" != typeof OffscreenCanvas &&
                e instanceof OffscreenCanvas
                ? { width: e.width, height: e.height, top: 0, left: 0 }
                : { width: 0, height: 0, top: 0, left: 0, ...t };
            })(e, u);
            return (
              O.equ(G, w.size, eF) ||
                w.setSize(G.width, G.height, G.top, G.left),
              v && w.viewport.dpr !== S(v) && w.setDpr(v),
              w.frameloop !== g && w.setFrameloop(g),
              w.onPointerMissed || w.set({ onPointerMissed: M }),
              b &&
                !O.equ(b, w.performance, eF) &&
                w.set((e) => ({ performance: { ...e.performance, ...b } })),
              (t = A),
              (c = !0),
              this
            );
          },
          render(r) {
            return (
              c || this.configure(),
              eM.updateContainer(
                (0, M.jsx)(ex, {
                  store: s,
                  children: r,
                  onCreated: t,
                  rootElement: e,
                }),
                u,
                null,
                () => void 0
              ),
              s
            );
          },
          unmount() {
            eG(e);
          },
        };
      }
      function ex({ store: e, children: t, onCreated: r, rootElement: n }) {
        return (
          x(() => {
            let t = e.getState();
            t.set((e) => ({ internal: { ...e.internal, active: !0 } })),
              r && r(t),
              e.getState().events.connected ||
                null == t.events.connect ||
                t.events.connect(n);
          }, []),
          (0, M.jsx)(ee.Provider, { value: e, children: t })
        );
      }
      function eG(e, t) {
        let r = ew.get(e),
          n = null == r ? void 0 : r.fiber;
        if (n) {
          let i = null == r ? void 0 : r.store.getState();
          i && (i.internal.active = !1),
            eM.updateContainer(null, n, null, () => {
              i &&
                setTimeout(() => {
                  try {
                    var r, n, a, o;
                    null == i.events.disconnect || i.events.disconnect(),
                      null == (r = i.gl) ||
                        null == (n = r.renderLists) ||
                        null == n.dispose ||
                        n.dispose(),
                      null == (a = i.gl) ||
                        null == a.forceContextLoss ||
                        a.forceContextLoss(),
                      null != (o = i.gl) && o.xr && i.xr.disconnect(),
                      (function (e) {
                        for (let t in ("Scene" !== e.type &&
                          (null == e.dispose || e.dispose()),
                        e)) {
                          let r = e[t];
                          (null == r ? void 0 : r.type) !== "Scene" &&
                            (null == r || null == r.dispose || r.dispose());
                        }
                      })(i.scene),
                      ew.delete(e),
                      t && t(e);
                  } catch (e) {}
                }, 500);
            });
        }
      }
      function eD(e, t, r) {
        return (0, M.jsx)(eT, { children: e, container: t, state: r });
      }
      function eT({ state: e = {}, children: t, container: r }) {
        let { events: n, size: i, ...a } = e,
          o = er(),
          [s] = c.useState(() => new l.tBo()),
          [u] = c.useState(() => new l.I9Y()),
          d = G((e, t) => {
            let a;
            if (t.camera && i) {
              let r = t.camera;
              (a = e.viewport.getCurrentViewport(r, new l.Pq0(), i)),
                r !== e.camera && Z(r, i);
            }
            return {
              ...e,
              ...t,
              scene: r,
              raycaster: s,
              pointer: u,
              mouse: u,
              previousRoot: o,
              events: { ...e.events, ...t.events, ...n },
              size: { ...e.size, ...i },
              viewport: { ...e.viewport, ...a },
              setEvents: (e) =>
                t.set((t) => ({ ...t, events: { ...t.events, ...e } })),
            };
          }),
          f = c.useMemo(() => {
            let e = g((e, t) => ({ ...a, set: e, get: t })),
              t = (t) => e.setState((e) => d.current(t, e));
            return t(o.getState()), o.subscribe(t), e;
          }, [o, r]);
        return (0, M.jsx)(M.Fragment, {
          children: eM.createPortal(
            (0, M.jsx)(ee.Provider, { value: f, children: t }),
            f,
            null
          ),
        });
      }
      let eH = new Set(),
        eS = new Set(),
        eP = new Set();
      function eO(e, t) {
        if (e.size) for (let { callback: r } of e.values()) r(t);
      }
      function e_(e, t) {
        switch (e) {
          case "before":
            return eO(eH, t);
          case "after":
            return eO(eS, t);
          case "tail":
            return eO(eP, t);
        }
      }
      function eJ(e, t, r) {
        let a = t.clock.getDelta();
        "never" === t.frameloop &&
          "number" == typeof e &&
          ((a = e - t.clock.elapsedTime),
          (t.clock.oldTime = t.clock.elapsedTime),
          (t.clock.elapsedTime = e)),
          (n = t.internal.subscribers);
        for (let e = 0; e < n.length; e++)
          (i = n[e]).ref.current(i.store.getState(), a, r);
        return (
          !t.internal.priority && t.gl.render && t.gl.render(t.scene, t.camera),
          (t.internal.frames = Math.max(0, t.internal.frames - 1)),
          "always" === t.frameloop ? 1 : t.internal.frames
        );
      }
      let eL = !1,
        eU = !1;
      function ek(e) {
        for (let r of ((o = requestAnimationFrame(ek)),
        (eL = !0),
        (a = 0),
        e_("before", e),
        (eU = !0),
        ew.values())) {
          var t;
          (s = r.store.getState()).internal.active &&
            ("always" === s.frameloop || s.internal.frames > 0) &&
            !(null != (t = s.gl.xr) && t.isPresenting) &&
            (a += eJ(e, s));
        }
        if (((eU = !0), e_("after", e), 0 === a))
          return e_("tail", e), (eL = !1), cancelAnimationFrame(o);
      }
      function ej(e, t = 1) {
        var r;
        if (!e) return ew.forEach((e) => ej(e.store.getState(), t));
        (null != (r = e.gl.xr) && r.isPresenting) ||
          !e.internal.active ||
          "never" === e.frameloop ||
          (t > 1
            ? (e.internal.frames = Math.min(60, e.internal.frames + t))
            : eU
            ? (e.internal.frames = 2)
            : (e.internal.frames = 1),
          eL || ((eL = !0), requestAnimationFrame(ek)));
      }
      function eK(e, t = !0, r, n) {
        if ((t && e_("before", e), r)) eJ(e, r, n);
        else for (let t of ew.values()) eJ(e, t.store.getState());
        t && e_("after", e);
      }
      let eN = {
        onClick: ["click", !1],
        onContextMenu: ["contextmenu", !1],
        onDoubleClick: ["dblclick", !1],
        onWheel: ["wheel", !0],
        onPointerDown: ["pointerdown", !0],
        onPointerUp: ["pointerup", !0],
        onPointerLeave: ["pointerleave", !0],
        onPointerMove: ["pointermove", !0],
        onPointerCancel: ["pointercancel", !0],
        onLostPointerCapture: ["lostpointercapture", !0],
      };
      function eQ(e) {
        let { handlePointer: t } = (function (e) {
          function t(e) {
            return e.filter((e) =>
              ["Move", "Over", "Enter", "Out", "Leave"].some((t) => {
                var r;
                return null == (r = e.__r3f)
                  ? void 0
                  : r.handlers["onPointer" + t];
              })
            );
          }
          function r(t) {
            let { internal: r } = e.getState();
            for (let e of r.hovered.values())
              if (
                !t.length ||
                !t.find(
                  (t) =>
                    t.object === e.object &&
                    t.index === e.index &&
                    t.instanceId === e.instanceId
                )
              ) {
                let n = e.eventObject.__r3f;
                if ((r.hovered.delete(z(e)), null != n && n.eventCount)) {
                  let r = n.handlers,
                    i = { ...e, intersections: t };
                  null == r.onPointerOut || r.onPointerOut(i),
                    null == r.onPointerLeave || r.onPointerLeave(i);
                }
              }
          }
          function n(e, t) {
            for (let r = 0; r < t.length; r++) {
              let n = t[r].__r3f;
              null == n ||
                null == n.handlers.onPointerMissed ||
                n.handlers.onPointerMissed(e);
            }
          }
          return {
            handlePointer: function (i) {
              switch (i) {
                case "onPointerLeave":
                case "onPointerCancel":
                  return () => r([]);
                case "onLostPointerCapture":
                  return (t) => {
                    let { internal: n } = e.getState();
                    "pointerId" in t &&
                      n.capturedMap.has(t.pointerId) &&
                      requestAnimationFrame(() => {
                        n.capturedMap.has(t.pointerId) &&
                          (n.capturedMap.delete(t.pointerId), r([]));
                      });
                  };
              }
              return function (a) {
                let { onPointerMissed: o, internal: s } = e.getState();
                s.lastEvent.current = a;
                let u = "onPointerMove" === i,
                  c =
                    "onClick" === i ||
                    "onContextMenu" === i ||
                    "onDoubleClick" === i,
                  d = (function (t, r) {
                    let n = e.getState(),
                      i = new Set(),
                      a = [],
                      o = r
                        ? r(n.internal.interaction)
                        : n.internal.interaction;
                    for (let e = 0; e < o.length; e++) {
                      let t = P(o[e]);
                      t && (t.raycaster.camera = void 0);
                    }
                    n.previousRoot ||
                      null == n.events.compute ||
                      n.events.compute(t, n);
                    let s = o
                      .flatMap(function (e) {
                        let r = P(e);
                        if (
                          !r ||
                          !r.events.enabled ||
                          null === r.raycaster.camera
                        )
                          return [];
                        if (void 0 === r.raycaster.camera) {
                          var n;
                          null == r.events.compute ||
                            r.events.compute(
                              t,
                              r,
                              null == (n = r.previousRoot)
                                ? void 0
                                : n.getState()
                            ),
                            void 0 === r.raycaster.camera &&
                              (r.raycaster.camera = null);
                        }
                        return r.raycaster.camera
                          ? r.raycaster.intersectObject(e, !0)
                          : [];
                      })
                      .sort((e, t) => {
                        let r = P(e.object),
                          n = P(t.object);
                        return (
                          (r && n && n.events.priority - r.events.priority) ||
                          e.distance - t.distance
                        );
                      })
                      .filter((e) => {
                        let t = z(e);
                        return !i.has(t) && (i.add(t), !0);
                      });
                    for (let e of (n.events.filter &&
                      (s = n.events.filter(s, n)),
                    s)) {
                      let t = e.object;
                      for (; t; ) {
                        var l;
                        null != (l = t.__r3f) &&
                          l.eventCount &&
                          a.push({ ...e, eventObject: t }),
                          (t = t.parent);
                      }
                    }
                    if (
                      "pointerId" in t &&
                      n.internal.capturedMap.has(t.pointerId)
                    )
                      for (let e of n.internal.capturedMap
                        .get(t.pointerId)
                        .values())
                        i.has(z(e.intersection)) || a.push(e.intersection);
                    return a;
                  })(a, u ? t : void 0),
                  f = c
                    ? (function (t) {
                        let { internal: r } = e.getState(),
                          n = t.offsetX - r.initialClick[0],
                          i = t.offsetY - r.initialClick[1];
                        return Math.round(Math.sqrt(n * n + i * i));
                      })(a)
                    : 0;
                "onPointerDown" === i &&
                  ((s.initialClick = [a.offsetX, a.offsetY]),
                  (s.initialHits = d.map((e) => e.eventObject))),
                  c && !d.length && f <= 2 && (n(a, s.interaction), o && o(a)),
                  u && r(d),
                  (function (e, t, n, i) {
                    if (e.length) {
                      let a = { stopped: !1 };
                      for (let o of e) {
                        let s = P(o.object);
                        if (s) {
                          let {
                              raycaster: u,
                              pointer: c,
                              camera: d,
                              internal: f,
                            } = s,
                            A = new l.Pq0(c.x, c.y, 0).unproject(d),
                            h = (e) => {
                              var t, r;
                              return (
                                null !=
                                  (t =
                                    null == (r = f.capturedMap.get(e))
                                      ? void 0
                                      : r.has(o.eventObject)) && t
                              );
                            },
                            p = (e) => {
                              let r = { intersection: o, target: t.target };
                              f.capturedMap.has(e)
                                ? f.capturedMap.get(e).set(o.eventObject, r)
                                : f.capturedMap.set(
                                    e,
                                    new Map([[o.eventObject, r]])
                                  ),
                                t.target.setPointerCapture(e);
                            },
                            m = (e) => {
                              let t = f.capturedMap.get(e);
                              t && V(f.capturedMap, o.eventObject, t, e);
                            },
                            B = {};
                          for (let e in t) {
                            let r = t[e];
                            "function" != typeof r && (B[e] = r);
                          }
                          let C = {
                            ...o,
                            ...B,
                            pointer: c,
                            intersections: e,
                            stopped: a.stopped,
                            delta: n,
                            unprojectedPoint: A,
                            ray: u.ray,
                            camera: d,
                            stopPropagation() {
                              let n =
                                "pointerId" in t &&
                                f.capturedMap.get(t.pointerId);
                              (!n || n.has(o.eventObject)) &&
                                ((C.stopped = a.stopped = !0),
                                f.hovered.size &&
                                  Array.from(f.hovered.values()).find(
                                    (e) => e.eventObject === o.eventObject
                                  ) &&
                                  r([...e.slice(0, e.indexOf(o)), o]));
                            },
                            target: {
                              hasPointerCapture: h,
                              setPointerCapture: p,
                              releasePointerCapture: m,
                            },
                            currentTarget: {
                              hasPointerCapture: h,
                              setPointerCapture: p,
                              releasePointerCapture: m,
                            },
                            nativeEvent: t,
                          };
                          if ((i(C), !0 === a.stopped)) break;
                        }
                      }
                    }
                  })(d, a, f, function (e) {
                    let t = e.eventObject,
                      r = t.__r3f;
                    if (!(null != r && r.eventCount)) return;
                    let o = r.handlers;
                    if (u) {
                      if (
                        o.onPointerOver ||
                        o.onPointerEnter ||
                        o.onPointerOut ||
                        o.onPointerLeave
                      ) {
                        let t = z(e),
                          r = s.hovered.get(t);
                        r
                          ? r.stopped && e.stopPropagation()
                          : (s.hovered.set(t, e),
                            null == o.onPointerOver || o.onPointerOver(e),
                            null == o.onPointerEnter || o.onPointerEnter(e));
                      }
                      null == o.onPointerMove || o.onPointerMove(e);
                    } else {
                      let r = o[i];
                      r
                        ? (!c || s.initialHits.includes(t)) &&
                          (n(
                            a,
                            s.interaction.filter(
                              (e) => !s.initialHits.includes(e)
                            )
                          ),
                          r(e))
                        : c &&
                          s.initialHits.includes(t) &&
                          n(
                            a,
                            s.interaction.filter(
                              (e) => !s.initialHits.includes(e)
                            )
                          );
                    }
                  });
              };
            },
          };
        })(e);
        return {
          priority: 1,
          enabled: !0,
          compute(e, t, r) {
            t.pointer.set(
              (e.offsetX / t.size.width) * 2 - 1,
              -(2 * (e.offsetY / t.size.height)) + 1
            ),
              t.raycaster.setFromCamera(t.pointer, t.camera);
          },
          connected: void 0,
          handlers: Object.keys(eN).reduce((e, r) => ({ ...e, [r]: t(r) }), {}),
          update: () => {
            var t;
            let { events: r, internal: n } = e.getState();
            null != (t = n.lastEvent) &&
              t.current &&
              r.handlers &&
              r.handlers.onPointerMove(n.lastEvent.current);
          },
          connect: (t) => {
            let { set: r, events: n } = e.getState();
            if (
              (null == n.disconnect || n.disconnect(),
              r((e) => ({ events: { ...e.events, connected: t } })),
              n.handlers)
            )
              for (let e in n.handlers) {
                let r = n.handlers[e],
                  [i, a] = eN[e];
                t.addEventListener(i, r, { passive: a });
              }
          },
          disconnect: () => {
            let { set: t, events: r } = e.getState();
            if (r.connected) {
              if (r.handlers)
                for (let e in r.handlers) {
                  let t = r.handlers[e],
                    [n] = eN[e];
                  r.connected.removeEventListener(n, t);
                }
              t((e) => ({ events: { ...e.events, connected: void 0 } }));
            }
          },
        };
      }
    },
    93721: (e, t, r) => {
      "use strict";
      r.d(t, { Hl: () => A });
      var n = r(1767),
        i = r(12115),
        a = r(27274),
        o = r(13758),
        s = r.n(o),
        l = r(42353),
        u = r(95155);
      r(26188), r(5193), r(39084);
      let c = ["x", "y", "top", "bottom", "left", "right", "width", "height"],
        d = (e, t) => c.every((r) => e[r] === t[r]);
      function f({
        ref: e,
        children: t,
        fallback: r,
        resize: o,
        style: l,
        gl: c,
        events: f = n.f,
        eventSource: A,
        eventPrefix: h,
        shadows: p,
        linear: m,
        flat: B,
        legacy: C,
        orthographic: g,
        frameloop: v,
        dpr: b,
        performance: y,
        raycaster: E,
        camera: M,
        scene: w,
        onPointerMissed: F,
        onCreated: I,
        ...R
      }) {
        i.useMemo(() => (0, n.e)(a), []);
        let x = (0, n.u)(),
          [G, D] = (function (
            { debounce: e, scroll: t, polyfill: r, offsetSize: n } = {
              debounce: 0,
              scroll: !1,
              offsetSize: !1,
            }
          ) {
            var a;
            let o =
                r || ("undefined" != typeof window && window.ResizeObserver),
              [l, u] = (0, i.useState)({
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                bottom: 0,
                right: 0,
                x: 0,
                y: 0,
              });
            if (!o)
              return (
                (l.width = 1280), (l.height = 800), [() => {}, l, () => {}]
              );
            let c = (0, i.useRef)({
                element: null,
                scrollContainers: null,
                resizeObserver: null,
                lastBounds: l,
                orientationHandler: null,
              }),
              f = e ? ("number" == typeof e ? e : e.scroll) : null,
              A = e ? ("number" == typeof e ? e : e.resize) : null,
              h = (0, i.useRef)(!1);
            (0, i.useEffect)(
              () => ((h.current = !0), () => void (h.current = !1))
            );
            let [p, m, B] = (0, i.useMemo)(() => {
              let e = () => {
                if (!c.current.element) return;
                let {
                    left: e,
                    top: t,
                    width: r,
                    height: i,
                    bottom: a,
                    right: o,
                    x: s,
                    y: l,
                  } = c.current.element.getBoundingClientRect(),
                  f = {
                    left: e,
                    top: t,
                    width: r,
                    height: i,
                    bottom: a,
                    right: o,
                    x: s,
                    y: l,
                  };
                c.current.element instanceof HTMLElement &&
                  n &&
                  ((f.height = c.current.element.offsetHeight),
                  (f.width = c.current.element.offsetWidth)),
                  Object.freeze(f),
                  h.current &&
                    !d(c.current.lastBounds, f) &&
                    u((c.current.lastBounds = f));
              };
              return [e, A ? s()(e, A) : e, f ? s()(e, f) : e];
            }, [u, n, f, A]);
            function C() {
              c.current.scrollContainers &&
                (c.current.scrollContainers.forEach((e) =>
                  e.removeEventListener("scroll", B, !0)
                ),
                (c.current.scrollContainers = null)),
                c.current.resizeObserver &&
                  (c.current.resizeObserver.disconnect(),
                  (c.current.resizeObserver = null)),
                c.current.orientationHandler &&
                  ("orientation" in screen &&
                  "removeEventListener" in screen.orientation
                    ? screen.orientation.removeEventListener(
                        "change",
                        c.current.orientationHandler
                      )
                    : "onorientationchange" in window &&
                      window.removeEventListener(
                        "orientationchange",
                        c.current.orientationHandler
                      ));
            }
            function g() {
              var e;
              c.current.element &&
                ((c.current.resizeObserver = new o(m)),
                null == (e = c.current.resizeObserver) ||
                  e.observe(c.current.element),
                t &&
                  c.current.scrollContainers &&
                  c.current.scrollContainers.forEach((e) =>
                    e.addEventListener("scroll", B, {
                      capture: !0,
                      passive: !0,
                    })
                  ),
                (c.current.orientationHandler = () => {
                  B();
                }),
                "orientation" in screen &&
                "addEventListener" in screen.orientation
                  ? screen.orientation.addEventListener(
                      "change",
                      c.current.orientationHandler
                    )
                  : "onorientationchange" in window &&
                    window.addEventListener(
                      "orientationchange",
                      c.current.orientationHandler
                    ));
            }
            return (
              (a = !!t),
              (0, i.useEffect)(() => {
                if (a)
                  return (
                    window.addEventListener("scroll", B, {
                      capture: !0,
                      passive: !0,
                    }),
                    () => void window.removeEventListener("scroll", B, !0)
                  );
              }, [B, a]),
              (0, i.useEffect)(
                () => (
                  window.addEventListener("resize", m),
                  () => void window.removeEventListener("resize", m)
                ),
                [m]
              ),
              (0, i.useEffect)(() => {
                C(), g();
              }, [t, B, m]),
              (0, i.useEffect)(() => C, []),
              [
                (e) => {
                  e &&
                    e !== c.current.element &&
                    (C(),
                    (c.current.element = e),
                    (c.current.scrollContainers = (function e(t) {
                      let r = [];
                      if (!t || t === document.body) return r;
                      let {
                        overflow: n,
                        overflowX: i,
                        overflowY: a,
                      } = window.getComputedStyle(t);
                      return (
                        [n, i, a].some((e) => "auto" === e || "scroll" === e) &&
                          r.push(t),
                        [...r, ...e(t.parentElement)]
                      );
                    })(e)),
                    g());
                },
                l,
                p,
              ]
            );
          })({ scroll: !0, debounce: { scroll: 50, resize: 0 }, ...o }),
          T = i.useRef(null),
          H = i.useRef(null);
        i.useImperativeHandle(e, () => T.current);
        let S = (0, n.a)(F),
          [P, O] = i.useState(!1),
          [_, J] = i.useState(!1);
        if (P) throw P;
        if (_) throw _;
        let L = i.useRef(null);
        (0, n.b)(() => {
          let e = T.current;
          D.width > 0 &&
            D.height > 0 &&
            e &&
            (L.current || (L.current = (0, n.c)(e)),
            L.current.configure({
              gl: c,
              scene: w,
              events: f,
              shadows: p,
              linear: m,
              flat: B,
              legacy: C,
              orthographic: g,
              frameloop: v,
              dpr: b,
              performance: y,
              raycaster: E,
              camera: M,
              size: D,
              onPointerMissed: (...e) =>
                null == S.current ? void 0 : S.current(...e),
              onCreated: (e) => {
                null == e.events.connect ||
                  e.events.connect(
                    A ? ((0, n.i)(A) ? A.current : A) : H.current
                  ),
                  h &&
                    e.setEvents({
                      compute: (e, t) => {
                        let r = e[h + "X"],
                          n = e[h + "Y"];
                        t.pointer.set(
                          (r / t.size.width) * 2 - 1,
                          -(2 * (n / t.size.height)) + 1
                        ),
                          t.raycaster.setFromCamera(t.pointer, t.camera);
                      },
                    }),
                  null == I || I(e);
              },
            }),
            L.current.render(
              (0, u.jsx)(x, {
                children: (0, u.jsx)(n.E, {
                  set: J,
                  children: (0, u.jsx)(i.Suspense, {
                    fallback: (0, u.jsx)(n.B, { set: O }),
                    children: t,
                  }),
                }),
              })
            ));
        }),
          i.useEffect(() => {
            let e = T.current;
            if (e) return () => (0, n.d)(e);
          }, []);
        let U = A ? "none" : "auto";
        return (0, u.jsx)("div", {
          ref: H,
          style: {
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            pointerEvents: U,
            ...l,
          },
          ...R,
          children: (0, u.jsx)("div", {
            ref: G,
            style: { width: "100%", height: "100%" },
            children: (0, u.jsx)("canvas", {
              ref: T,
              style: { display: "block" },
              children: r,
            }),
          }),
        });
      }
      function A(e) {
        return (0, u.jsx)(l.Af, { children: (0, u.jsx)(f, { ...e }) });
      }
    },
    13758: (e) => {
      function t(e, t, r) {
        function n() {
          var u = Date.now() - s;
          u < t && u >= 0
            ? (i = setTimeout(n, t - u))
            : ((i = null), r || ((l = e.apply(o, a)), (o = a = null)));
        }
        null == t && (t = 100);
        var i,
          a,
          o,
          s,
          l,
          u = function () {
            (o = this), (a = arguments), (s = Date.now());
            var u = r && !i;
            return (
              i || (i = setTimeout(n, t)),
              u && ((l = e.apply(o, a)), (o = a = null)),
              l
            );
          };
        return (
          (u.clear = function () {
            i && (clearTimeout(i), (i = null));
          }),
          (u.flush = function () {
            i &&
              ((l = e.apply(o, a)),
              (o = a = null),
              clearTimeout(i),
              (i = null));
          }),
          u
        );
      }
      (t.debounce = t), (e.exports = t);
    },
    65192: (e, t, r) => {
      "use strict";
      var n = r(80859);
      function i() {}
      function a() {}
      (a.resetWarningCache = i),
        (e.exports = function () {
          function e(e, t, r, i, a, o) {
            if (o !== n) {
              var s = Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
              );
              throw ((s.name = "Invariant Violation"), s);
            }
          }
          function t() {
            return e;
          }
          e.isRequired = e;
          var r = {
            array: e,
            bigint: e,
            bool: e,
            func: e,
            number: e,
            object: e,
            string: e,
            symbol: e,
            any: e,
            arrayOf: t,
            element: e,
            elementType: e,
            instanceOf: t,
            node: e,
            objectOf: t,
            oneOf: t,
            oneOfType: t,
            shape: t,
            exact: t,
            checkPropTypes: a,
            resetWarningCache: i,
          };
          return (r.PropTypes = r), r;
        });
    },
    81996: (e, t, r) => {
      e.exports = r(65192)();
    },
    80859: (e) => {
      "use strict";
      e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    },
    47077: (e, t) => {
      "use strict";
      (t.ConcurrentRoot = 1),
        (t.ContinuousEventPriority = 8),
        (t.DefaultEventPriority = 32),
        (t.DiscreteEventPriority = 2);
    },
    26188: (e, t, r) => {
      "use strict";
      e.exports = r(47077);
    },
    5193: (e, t, r) => {
      "use strict";
      e.exports = r(22733);
    },
    53177: (e, t) => {
      "use strict";
      function r(e, t) {
        var r = e.length;
        for (e.push(t); 0 < r; ) {
          var n = (r - 1) >>> 1,
            i = e[n];
          if (0 < a(i, t)) (e[n] = t), (e[r] = i), (r = n);
          else break;
        }
      }
      function n(e) {
        return 0 === e.length ? null : e[0];
      }
      function i(e) {
        if (0 === e.length) return null;
        var t = e[0],
          r = e.pop();
        if (r !== t) {
          e[0] = r;
          for (var n = 0, i = e.length, o = i >>> 1; n < o; ) {
            var s = 2 * (n + 1) - 1,
              l = e[s],
              u = s + 1,
              c = e[u];
            if (0 > a(l, r))
              u < i && 0 > a(c, l)
                ? ((e[n] = c), (e[u] = r), (n = u))
                : ((e[n] = l), (e[s] = r), (n = s));
            else if (u < i && 0 > a(c, r)) (e[n] = c), (e[u] = r), (n = u);
            else break;
          }
        }
        return t;
      }
      function a(e, t) {
        var r = e.sortIndex - t.sortIndex;
        return 0 !== r ? r : e.id - t.id;
      }
      if (
        ((t.unstable_now = void 0),
        "object" == typeof performance && "function" == typeof performance.now)
      ) {
        var o,
          s = performance;
        t.unstable_now = function () {
          return s.now();
        };
      } else {
        var l = Date,
          u = l.now();
        t.unstable_now = function () {
          return l.now() - u;
        };
      }
      var c = [],
        d = [],
        f = 1,
        A = null,
        h = 3,
        p = !1,
        m = !1,
        B = !1,
        C = "function" == typeof setTimeout ? setTimeout : null,
        g = "function" == typeof clearTimeout ? clearTimeout : null,
        v = "undefined" != typeof setImmediate ? setImmediate : null;
      function b(e) {
        for (var t = n(d); null !== t; ) {
          if (null === t.callback) i(d);
          else if (t.startTime <= e)
            i(d), (t.sortIndex = t.expirationTime), r(c, t);
          else break;
          t = n(d);
        }
      }
      function y(e) {
        if (((B = !1), b(e), !m)) {
          if (null !== n(c)) (m = !0), D();
          else {
            var t = n(d);
            null !== t && T(y, t.startTime - e);
          }
        }
      }
      var E = !1,
        M = -1,
        w = 5,
        F = -1;
      function I() {
        return !(t.unstable_now() - F < w);
      }
      function R() {
        if (E) {
          var e = t.unstable_now();
          F = e;
          var r = !0;
          try {
            e: {
              (m = !1), B && ((B = !1), g(M), (M = -1)), (p = !0);
              var a = h;
              try {
                t: {
                  for (
                    b(e), A = n(c);
                    null !== A && !(A.expirationTime > e && I());

                  ) {
                    var s = A.callback;
                    if ("function" == typeof s) {
                      (A.callback = null), (h = A.priorityLevel);
                      var l = s(A.expirationTime <= e);
                      if (((e = t.unstable_now()), "function" == typeof l)) {
                        (A.callback = l), b(e), (r = !0);
                        break t;
                      }
                      A === n(c) && i(c), b(e);
                    } else i(c);
                    A = n(c);
                  }
                  if (null !== A) r = !0;
                  else {
                    var u = n(d);
                    null !== u && T(y, u.startTime - e), (r = !1);
                  }
                }
                break e;
              } finally {
                (A = null), (h = a), (p = !1);
              }
              r = void 0;
            }
          } finally {
            r ? o() : (E = !1);
          }
        }
      }
      if ("function" == typeof v)
        o = function () {
          v(R);
        };
      else if ("undefined" != typeof MessageChannel) {
        var x = new MessageChannel(),
          G = x.port2;
        (x.port1.onmessage = R),
          (o = function () {
            G.postMessage(null);
          });
      } else
        o = function () {
          C(R, 0);
        };
      function D() {
        E || ((E = !0), o());
      }
      function T(e, r) {
        M = C(function () {
          e(t.unstable_now());
        }, r);
      }
      (t.unstable_IdlePriority = 5),
        (t.unstable_ImmediatePriority = 1),
        (t.unstable_LowPriority = 4),
        (t.unstable_NormalPriority = 3),
        (t.unstable_Profiling = null),
        (t.unstable_UserBlockingPriority = 2),
        (t.unstable_cancelCallback = function (e) {
          e.callback = null;
        }),
        (t.unstable_continueExecution = function () {
          m || p || ((m = !0), D());
        }),
        (t.unstable_forceFrameRate = function (e) {
          0 > e || 125 < e
            ? console.error(
                "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
              )
            : (w = 0 < e ? Math.floor(1e3 / e) : 5);
        }),
        (t.unstable_getCurrentPriorityLevel = function () {
          return h;
        }),
        (t.unstable_getFirstCallbackNode = function () {
          return n(c);
        }),
        (t.unstable_next = function (e) {
          switch (h) {
            case 1:
            case 2:
            case 3:
              var t = 3;
              break;
            default:
              t = h;
          }
          var r = h;
          h = t;
          try {
            return e();
          } finally {
            h = r;
          }
        }),
        (t.unstable_pauseExecution = function () {}),
        (t.unstable_requestPaint = function () {}),
        (t.unstable_runWithPriority = function (e, t) {
          switch (e) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
              break;
            default:
              e = 3;
          }
          var r = h;
          h = e;
          try {
            return t();
          } finally {
            h = r;
          }
        }),
        (t.unstable_scheduleCallback = function (e, i, a) {
          var o = t.unstable_now();
          switch (
            ((a =
              "object" == typeof a &&
              null !== a &&
              "number" == typeof (a = a.delay) &&
              0 < a
                ? o + a
                : o),
            e)
          ) {
            case 1:
              var s = -1;
              break;
            case 2:
              s = 250;
              break;
            case 5:
              s = 0x3fffffff;
              break;
            case 4:
              s = 1e4;
              break;
            default:
              s = 5e3;
          }
          return (
            (s = a + s),
            (e = {
              id: f++,
              callback: i,
              priorityLevel: e,
              startTime: a,
              expirationTime: s,
              sortIndex: -1,
            }),
            a > o
              ? ((e.sortIndex = a),
                r(d, e),
                null === n(c) &&
                  e === n(d) &&
                  (B ? (g(M), (M = -1)) : (B = !0), T(y, a - o)))
              : ((e.sortIndex = s), r(c, e), m || p || ((m = !0), D())),
            e
          );
        }),
        (t.unstable_shouldYield = I),
        (t.unstable_wrapCallback = function (e) {
          var t = h;
          return function () {
            var r = h;
            h = t;
            try {
              return e.apply(this, arguments);
            } finally {
              h = r;
            }
          };
        });
    },
    39084: (e, t, r) => {
      "use strict";
      e.exports = r(53177);
    },
    52947: (e, t, r) => {
      "use strict";
      r.d(t, { DY: () => s, IU: () => u, uv: () => l });
      let n = (e) => "object" == typeof e && "function" == typeof e.then,
        i = [];
      function a(e, t, r = (e, t) => e === t) {
        if (e === t) return !0;
        if (!e || !t) return !1;
        let n = e.length;
        if (t.length !== n) return !1;
        for (let i = 0; i < n; i++) if (!r(e[i], t[i])) return !1;
        return !0;
      }
      function o(e, t = null, r = !1, s = {}) {
        for (let n of (null === t && (t = [e]), i))
          if (a(t, n.keys, n.equal)) {
            if (r) return;
            if (Object.prototype.hasOwnProperty.call(n, "error")) throw n.error;
            if (Object.prototype.hasOwnProperty.call(n, "response"))
              return (
                s.lifespan &&
                  s.lifespan > 0 &&
                  (n.timeout && clearTimeout(n.timeout),
                  (n.timeout = setTimeout(n.remove, s.lifespan))),
                n.response
              );
            if (!r) throw n.promise;
          }
        let l = {
          keys: t,
          equal: s.equal,
          remove: () => {
            let e = i.indexOf(l);
            -1 !== e && i.splice(e, 1);
          },
          promise: (n(e) ? e : e(...t))
            .then((e) => {
              (l.response = e),
                s.lifespan &&
                  s.lifespan > 0 &&
                  (l.timeout = setTimeout(l.remove, s.lifespan));
            })
            .catch((e) => (l.error = e)),
        };
        if ((i.push(l), !r)) throw l.promise;
      }
      let s = (e, t, r) => o(e, t, !1, r),
        l = (e, t, r) => void o(e, t, !0, r),
        u = (e) => {
          if (void 0 === e || 0 === e.length) i.splice(0, i.length);
          else {
            let t = i.find((t) => a(e, t.keys, t.equal));
            t && t.remove();
          }
        };
    },
    73027: (e, t, r) => {
      "use strict";
      var n = r(12115),
        i =
          "function" == typeof Object.is
            ? Object.is
            : function (e, t) {
                return (
                  (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t)
                );
              },
        a = n.useState,
        o = n.useEffect,
        s = n.useLayoutEffect,
        l = n.useDebugValue;
      function u(e) {
        var t = e.getSnapshot;
        e = e.value;
        try {
          var r = t();
          return !i(e, r);
        } catch (e) {
          return !0;
        }
      }
      var c =
        "undefined" == typeof window ||
        void 0 === window.document ||
        void 0 === window.document.createElement
          ? function (e, t) {
              return t();
            }
          : function (e, t) {
              var r = t(),
                n = a({ inst: { value: r, getSnapshot: t } }),
                i = n[0].inst,
                c = n[1];
              return (
                s(
                  function () {
                    (i.value = r), (i.getSnapshot = t), u(i) && c({ inst: i });
                  },
                  [e, r, t]
                ),
                o(
                  function () {
                    return (
                      u(i) && c({ inst: i }),
                      e(function () {
                        u(i) && c({ inst: i });
                      })
                    );
                  },
                  [e]
                ),
                l(r),
                r
              );
            };
      t.useSyncExternalStore =
        void 0 !== n.useSyncExternalStore ? n.useSyncExternalStore : c;
    },
    44564: (e, t, r) => {
      "use strict";
      var n = r(12115),
        i = r(94236),
        a =
          "function" == typeof Object.is
            ? Object.is
            : function (e, t) {
                return (
                  (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t)
                );
              },
        o = i.useSyncExternalStore,
        s = n.useRef,
        l = n.useEffect,
        u = n.useMemo,
        c = n.useDebugValue;
      t.useSyncExternalStoreWithSelector = function (e, t, r, n, i) {
        var d = s(null);
        if (null === d.current) {
          var f = { hasValue: !1, value: null };
          d.current = f;
        } else f = d.current;
        var A = o(
          e,
          (d = u(
            function () {
              function e(e) {
                if (!l) {
                  if (
                    ((l = !0), (o = e), (e = n(e)), void 0 !== i && f.hasValue)
                  ) {
                    var t = f.value;
                    if (i(t, e)) return (s = t);
                  }
                  return (s = e);
                }
                if (((t = s), a(o, e))) return t;
                var r = n(e);
                return void 0 !== i && i(t, r)
                  ? ((o = e), t)
                  : ((o = e), (s = r));
              }
              var o,
                s,
                l = !1,
                u = void 0 === r ? null : r;
              return [
                function () {
                  return e(t());
                },
                null === u
                  ? void 0
                  : function () {
                      return e(u());
                    },
              ];
            },
            [t, r, n, i]
          ))[0],
          d[1]
        );
        return (
          l(
            function () {
              (f.hasValue = !0), (f.value = A);
            },
            [A]
          ),
          c(A),
          A
        );
      };
    },
    94236: (e, t, r) => {
      "use strict";
      e.exports = r(73027);
    },
    18010: (e, t, r) => {
      "use strict";
      e.exports = r(44564);
    },
    19717: (e) => {
      e.exports = {
        style: {
          fontFamily: "'Outfit', 'Outfit Fallback'",
          fontStyle: "normal",
        },
        className: "__className_ad50fd",
        variable: "__variable_ad50fd",
      };
    },
    39349: (e) => {
      e.exports = {
        style: { fontFamily: "'dreamFont', 'dreamFont Fallback'" },
        className: "__className_662c80",
        variable: "__variable_662c80",
      };
    },
    85407: (e, t, r) => {
      "use strict";
      function n() {
        return (n = Object.assign
          ? Object.assign.bind()
          : function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                  ({}.hasOwnProperty.call(r, n) && (e[n] = r[n]));
              }
              return e;
            }).apply(null, arguments);
      }
      r.d(t, { A: () => n });
    },
    96641: (e, t, r) => {
      "use strict";
      r.d(t, { Analytics: () => A });
      var n = r(12115),
        i = r(76046),
        a = () => {
          window.va ||
            (window.va = function () {
              for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
                t[r] = arguments[r];
              (window.vaq = window.vaq || []).push(t);
            });
        };
      function o() {
        return "undefined" != typeof window;
      }
      function s() {
        return "production";
      }
      function l() {
        return "development" === ((o() ? window.vam : s()) || "production");
      }
      function u(e) {
        return new RegExp(
          "/".concat(e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "(?=[/?#]|$)")
        );
      }
      function c(e) {
        return (
          (0, n.useEffect)(() => {
            var t;
            e.beforeSend &&
              (null == (t = window.va) ||
                t.call(window, "beforeSend", e.beforeSend));
          }, [e.beforeSend]),
          (0, n.useEffect)(() => {
            !(function () {
              var e;
              let t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : { debug: !0 };
              if (!o()) return;
              (function () {
                let e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : "auto";
                if ("auto" === e) {
                  window.vam = s();
                  return;
                }
                window.vam = e;
              })(t.mode),
                a(),
                t.beforeSend &&
                  (null == (e = window.va) ||
                    e.call(window, "beforeSend", t.beforeSend));
              let r =
                t.scriptSrc ||
                (l()
                  ? "https://va.vercel-scripts.com/v1/script.debug.js"
                  : "/_vercel/insights/script.js");
              if (document.head.querySelector('script[src*="'.concat(r, '"]')))
                return;
              let n = document.createElement("script");
              (n.src = r),
                (n.defer = !0),
                (n.dataset.sdkn =
                  "@vercel/analytics" +
                  (t.framework ? "/".concat(t.framework) : "")),
                (n.dataset.sdkv = "1.4.1"),
                t.disableAutoTrack && (n.dataset.disableAutoTrack = "1"),
                t.endpoint && (n.dataset.endpoint = t.endpoint),
                t.dsn && (n.dataset.dsn = t.dsn),
                (n.onerror = () => {
                  let e = l()
                    ? "Please check if any ad blockers are enabled and try again."
                    : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
                  console.log(
                    "[Vercel Web Analytics] Failed to load script from "
                      .concat(r, ". ")
                      .concat(e)
                  );
                }),
                l() && !1 === t.debug && (n.dataset.debug = "false"),
                document.head.appendChild(n);
            })({
              framework: e.framework || "react",
              ...(void 0 !== e.route && { disableAutoTrack: !0 }),
              ...e,
            });
          }, []),
          (0, n.useEffect)(() => {
            e.route &&
              e.path &&
              (function (e) {
                var t;
                let { route: r, path: n } = e;
                null == (t = window.va) ||
                  t.call(window, "pageview", { route: r, path: n });
              })({ route: e.route, path: e.path });
          }, [e.route, e.path]),
          null
        );
      }
      var d = () => {
        let e = (0, i.useParams)(),
          t = (0, i.useSearchParams)(),
          r = (0, i.usePathname)();
        return e
          ? {
              route: (function (e, t) {
                if (!e || !t) return e;
                let r = e;
                try {
                  let e = Object.entries(t);
                  for (let [t, n] of e)
                    if (!Array.isArray(n)) {
                      let e = u(n);
                      e.test(r) && (r = r.replace(e, "/[".concat(t, "]")));
                    }
                  for (let [t, n] of e)
                    if (Array.isArray(n)) {
                      let e = u(n.join("/"));
                      e.test(r) && (r = r.replace(e, "/[...".concat(t, "]")));
                    }
                  return r;
                } catch (t) {
                  return e;
                }
              })(
                r,
                Object.keys(e).length ? e : Object.fromEntries(t.entries())
              ),
              path: r,
            }
          : { route: null, path: r };
      };
      function f(e) {
        let { route: t, path: r } = d();
        return n.createElement(c, {
          path: r,
          route: t,
          ...e,
          framework: "next",
        });
      }
      function A(e) {
        return n.createElement(
          n.Suspense,
          { fallback: null },
          n.createElement(f, { ...e })
        );
      }
    },
    32264: (e, t, r) => {
      "use strict";
      r.d(t, { SpeedInsights: () => h });
      var n = r(12115),
        i = r(76046),
        a = () => {
          window.si ||
            (window.si = function () {
              for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
                t[r] = arguments[r];
              (window.siq = window.siq || []).push(t);
            });
        };
      function o() {
        return false;
      }
      function s(e) {
        return new RegExp(
          "/".concat(e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "(?=[/?#]|$)")
        );
      }
      var l = "https://va.vercel-scripts.com/v1/speed-insights",
        u = "".concat(l, "/script.js"),
        c = "".concat(l, "/script.debug.js");
      function d(e) {
        (0, n.useEffect)(() => {
          var t;
          e.beforeSend &&
            (null == (t = window.si) ||
              t.call(window, "beforeSend", e.beforeSend));
        }, [e.beforeSend]);
        let t = (0, n.useRef)(null);
        return (
          (0, n.useEffect)(() => {
            if (t.current) e.route && t.current(e.route);
            else {
              let r = (function () {
                var e;
                let t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
                if (!("undefined" != typeof window) || null === t.route)
                  return null;
                a();
                let r = !!t.dsn,
                  n =
                    t.scriptSrc ||
                    (r ? u : "/_vercel/speed-insights/script.js");
                if (
                  document.head.querySelector('script[src*="'.concat(n, '"]'))
                )
                  return null;
                t.beforeSend &&
                  (null == (e = window.si) ||
                    e.call(window, "beforeSend", t.beforeSend));
                let i = document.createElement("script");
                return (
                  (i.src = n),
                  (i.defer = !0),
                  (i.dataset.sdkn =
                    "@vercel/speed-insights" +
                    (t.framework ? "/".concat(t.framework) : "")),
                  (i.dataset.sdkv = "1.1.0"),
                  t.sampleRate &&
                    (i.dataset.sampleRate = t.sampleRate.toString()),
                  t.route && (i.dataset.route = t.route),
                  t.endpoint && (i.dataset.endpoint = t.endpoint),
                  t.dsn && (i.dataset.dsn = t.dsn),
                  (i.onerror = () => {
                    console.log(
                      "[Vercel Speed Insights] Failed to load script from ".concat(
                        n,
                        ". Please check if any content blockers are enabled and try again."
                      )
                    );
                  }),
                  document.head.appendChild(i),
                  {
                    setRoute: (e) => {
                      i.dataset.route = null != e ? e : void 0;
                    },
                  }
                );
              })({ framework: e.framework || "react", ...e });
              r && (t.current = r.setRoute);
            }
          }, [e.route]),
          null
        );
      }
      var f = () => {
        let e = (0, i.useParams)(),
          t = (0, i.useSearchParams)() || new URLSearchParams(),
          r = (0, i.usePathname)();
        return e
          ? (function (e, t) {
              if (!e || !t) return e;
              let r = e;
              try {
                let e = Object.entries(t);
                for (let [t, n] of e)
                  if (!Array.isArray(n)) {
                    let e = s(n);
                    e.test(r) && (r = r.replace(e, "/[".concat(t, "]")));
                  }
                for (let [t, n] of e)
                  if (Array.isArray(n)) {
                    let e = s(n.join("/"));
                    e.test(r) && (r = r.replace(e, "/[...".concat(t, "]")));
                  }
                return r;
              } catch (t) {
                return e;
              }
            })(r, Object.keys(e).length ? e : Object.fromEntries(t.entries()))
          : null;
      };
      function A(e) {
        let t = f();
        return n.createElement(d, { route: t, ...e, framework: "next" });
      }
      function h(e) {
        return n.createElement(
          n.Suspense,
          { fallback: null },
          n.createElement(A, { ...e })
        );
      }
    },
    98653: (e, t, r) => {
      "use strict";
      r.d(t, { l: () => o });
      var n = r(99234),
        i = r(12115),
        a = r(8467);
      function o() {
        var e;
        let t = (0, n.M)(() => ({ current: null, animations: [] })),
          r = (0, n.M)(() => (0, a.W)(t));
        return (
          (e = () => {
            t.animations.forEach((e) => e.stop());
          }),
          (0, i.useEffect)(() => () => e(), []),
          [t, r]
        );
      }
    },
    2796: (e, t, r) => {
      "use strict";
      r.d(t, { y: () => i });
      var n = r(63127);
      function i(e = 0.1, { startDelay: t = 0, from: r = 0, ease: a } = {}) {
        return (i, o) => {
          let s =
            e *
            Math.abs(
              ("number" == typeof r
                ? r
                : (function (e, t) {
                    if ("first" === e) return 0;
                    {
                      let r = t - 1;
                      return "last" === e ? r : r / 2;
                    }
                  })(r, o)) - i
            );
          if (a) {
            let t = o * e;
            s = (0, n.K)(a)(s / t) * t;
          }
          return t + s;
        };
      }
    },
    42353: (e, t, r) => {
      "use strict";
      r.d(t, { Af: () => g, Nz: () => p, u5: () => v, y3: () => b });
      var n,
        i,
        a = r(12115),
        o = Object.defineProperty,
        s = Object.defineProperties,
        l = Object.getOwnPropertyDescriptors,
        u = Object.getOwnPropertySymbols,
        c = Object.prototype.hasOwnProperty,
        d = Object.prototype.propertyIsEnumerable,
        f = (e, t, r) =>
          t in e
            ? o(e, t, {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: r,
              })
            : (e[t] = r),
        A = (e, t) => {
          for (var r in t || (t = {})) c.call(t, r) && f(e, r, t[r]);
          if (u) for (var r of u(t)) d.call(t, r) && f(e, r, t[r]);
          return e;
        },
        h = (e, t) => s(e, l(t));
      function p(e, t, r) {
        if (!e) return;
        if (!0 === r(e)) return e;
        let n = t ? e.return : e.child;
        for (; n; ) {
          let e = p(n, t, r);
          if (e) return e;
          n = t ? null : n.sibling;
        }
      }
      function m(e) {
        try {
          return Object.defineProperties(e, {
            _currentRenderer: { get: () => null, set() {} },
            _currentRenderer2: { get: () => null, set() {} },
          });
        } catch (t) {
          return e;
        }
      }
      "undefined" != typeof window &&
      ((null == (n = window.document) ? void 0 : n.createElement) ||
        (null == (i = window.navigator) ? void 0 : i.product) === "ReactNative")
        ? a.useLayoutEffect
        : a.useEffect;
      let B = console.error;
      console.error = function () {
        let e = [...arguments].join("");
        if (
          (null == e ? void 0 : e.startsWith("Warning:")) &&
          e.includes("useContext")
        ) {
          console.error = B;
          return;
        }
        return B.apply(this, arguments);
      };
      let C = m(a.createContext(null));
      class g extends a.Component {
        render() {
          return a.createElement(
            C.Provider,
            { value: this._reactInternals },
            this.props.children
          );
        }
      }
      function v() {
        let e = a.useContext(C);
        if (null === e)
          throw Error(
            "its-fine: useFiber must be called within a <FiberProvider />!"
          );
        let t = a.useId();
        return a.useMemo(() => {
          for (let r of [e, null == e ? void 0 : e.alternate]) {
            if (!r) continue;
            let e = p(r, !1, (e) => {
              let r = e.memoizedState;
              for (; r; ) {
                if (r.memoizedState === t) return !0;
                r = r.next;
              }
            });
            if (e) return e;
          }
        }, [e, t]);
      }
      function b() {
        let e = (function () {
          let e = v(),
            [t] = a.useState(() => new Map());
          t.clear();
          let r = e;
          for (; r; ) {
            if (r.type && "object" == typeof r.type) {
              let e =
                void 0 === r.type._context && r.type.Provider === r.type
                  ? r.type
                  : r.type._context;
              e && e !== C && !t.has(e) && t.set(e, a.useContext(m(e)));
            }
            r = r.return;
          }
          return t;
        })();
        return a.useMemo(
          () =>
            Array.from(e.keys()).reduce(
              (t, r) => (n) =>
                a.createElement(
                  t,
                  null,
                  a.createElement(r.Provider, h(A({}, n), { value: e.get(r) }))
                ),
              (e) => a.createElement(g, A({}, e))
            ),
          [e]
        );
      }
    },
    14104: (e, t, r) => {
      "use strict";
      r.d(t, { r: () => n });
      let n = parseInt(r(80337).sPf.replace(/\D+/g, ""));
    },
    18504: (e, t, r) => {
      "use strict";
      r.d(t, { E: () => o });
      var n = r(80337),
        i = r(27274),
        a = r(14104);
      class o extends n.eaF {
        constructor(e, t = {}) {
          super(e), (this.isWater = !0);
          let r = this,
            o = void 0 !== t.textureWidth ? t.textureWidth : 512,
            s = void 0 !== t.textureHeight ? t.textureHeight : 512,
            l = void 0 !== t.clipBias ? t.clipBias : 0,
            u = void 0 !== t.alpha ? t.alpha : 1,
            c = void 0 !== t.time ? t.time : 0,
            d = void 0 !== t.waterNormals ? t.waterNormals : null,
            f =
              void 0 !== t.sunDirection
                ? t.sunDirection
                : new n.Pq0(0.70707, 0.70707, 0),
            A = new n.Q1f(void 0 !== t.sunColor ? t.sunColor : 0xffffff),
            h = new n.Q1f(void 0 !== t.waterColor ? t.waterColor : 8355711),
            p = void 0 !== t.eye ? t.eye : new n.Pq0(0, 0, 0),
            m = void 0 !== t.distortionScale ? t.distortionScale : 20,
            B = void 0 !== t.side ? t.side : n.hB5,
            C = void 0 !== t.fog && t.fog,
            g = new n.Zcv(),
            v = new n.Pq0(),
            b = new n.Pq0(),
            y = new n.Pq0(),
            E = new n.kn4(),
            M = new n.Pq0(0, 0, -1),
            w = new n.IUQ(),
            F = new n.Pq0(),
            I = new n.Pq0(),
            R = new n.IUQ(),
            x = new n.kn4(),
            G = new n.ubm(),
            D = new n.nWS(o, s),
            T = {
              uniforms: n.LlO.merge([
                i.UniformsLib.fog,
                i.UniformsLib.lights,
                {
                  normalSampler: { value: null },
                  mirrorSampler: { value: null },
                  alpha: { value: 1 },
                  time: { value: 0 },
                  size: { value: 1 },
                  distortionScale: { value: 20 },
                  textureMatrix: { value: new n.kn4() },
                  sunColor: { value: new n.Q1f(8355711) },
                  sunDirection: { value: new n.Pq0(0.70707, 0.70707, 0) },
                  eye: { value: new n.Pq0() },
                  waterColor: { value: new n.Q1f(5592405) },
                },
              ]),
              vertexShader: `
				uniform mat4 textureMatrix;
				uniform float time;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				#include <common>
				#include <fog_pars_vertex>
				#include <shadowmap_pars_vertex>
				#include <logdepthbuf_pars_vertex>

				void main() {
					mirrorCoord = modelMatrix * vec4( position, 1.0 );
					worldPosition = mirrorCoord.xyzw;
					mirrorCoord = textureMatrix * mirrorCoord;
					vec4 mvPosition =  modelViewMatrix * vec4( position, 1.0 );
					gl_Position = projectionMatrix * mvPosition;

				#include <beginnormal_vertex>
				#include <defaultnormal_vertex>
				#include <logdepthbuf_vertex>
				#include <fog_vertex>
				#include <shadowmap_vertex>
			}`,
              fragmentShader: `
				uniform sampler2D mirrorSampler;
				uniform float alpha;
				uniform float time;
				uniform float size;
				uniform float distortionScale;
				uniform sampler2D normalSampler;
				uniform vec3 sunColor;
				uniform vec3 sunDirection;
				uniform vec3 eye;
				uniform vec3 waterColor;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				vec4 getNoise( vec2 uv ) {
					vec2 uv0 = ( uv / 103.0 ) + vec2(time / 17.0, time / 29.0);
					vec2 uv1 = uv / 107.0-vec2( time / -19.0, time / 31.0 );
					vec2 uv2 = uv / vec2( 8907.0, 9803.0 ) + vec2( time / 101.0, time / 97.0 );
					vec2 uv3 = uv / vec2( 1091.0, 1027.0 ) - vec2( time / 109.0, time / -113.0 );
					vec4 noise = texture2D( normalSampler, uv0 ) +
						texture2D( normalSampler, uv1 ) +
						texture2D( normalSampler, uv2 ) +
						texture2D( normalSampler, uv3 );
					return noise * 0.5 - 1.0;
				}

				void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor ) {
					vec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );
					float direction = max( 0.0, dot( eyeDirection, reflection ) );
					specularColor += pow( direction, shiny ) * sunColor * spec;
					diffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;
				}

				#include <common>
				#include <packing>
				#include <bsdfs>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <lights_pars_begin>
				#include <shadowmap_pars_fragment>
				#include <shadowmask_pars_fragment>

				void main() {

					#include <logdepthbuf_fragment>
					vec4 noise = getNoise( worldPosition.xz * size );
					vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );

					vec3 diffuseLight = vec3(0.0);
					vec3 specularLight = vec3(0.0);

					vec3 worldToEye = eye-worldPosition.xyz;
					vec3 eyeDirection = normalize( worldToEye );
					sunLight( surfaceNormal, eyeDirection, 100.0, 2.0, 0.5, diffuseLight, specularLight );

					float distance = length(worldToEye);

					vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;
					vec3 reflectionSample = vec3( texture2D( mirrorSampler, mirrorCoord.xy / mirrorCoord.w + distortion ) );

					float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
					float rf0 = 0.3;
					float reflectance = rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 );
					vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;
					vec3 albedo = mix( ( sunColor * diffuseLight * 0.3 + scatter ) * getShadowMask(), ( vec3( 0.1 ) + reflectionSample * 0.9 + reflectionSample * specularLight ), reflectance);
					vec3 outgoingLight = albedo;
					gl_FragColor = vec4( outgoingLight, alpha );

					#include <tonemapping_fragment>
					#include <${a.r >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
					#include <fog_fragment>	
				}`,
            },
            H = new n.BKk({
              fragmentShader: T.fragmentShader,
              vertexShader: T.vertexShader,
              uniforms: n.LlO.clone(T.uniforms),
              lights: !0,
              side: B,
              fog: C,
            });
          (H.uniforms.mirrorSampler.value = D.texture),
            (H.uniforms.textureMatrix.value = x),
            (H.uniforms.alpha.value = u),
            (H.uniforms.time.value = c),
            (H.uniforms.normalSampler.value = d),
            (H.uniforms.sunColor.value = A),
            (H.uniforms.waterColor.value = h),
            (H.uniforms.sunDirection.value = f),
            (H.uniforms.distortionScale.value = m),
            (H.uniforms.eye.value = p),
            (r.material = H),
            (r.onBeforeRender = function (e, t, n) {
              if (
                (b.setFromMatrixPosition(r.matrixWorld),
                y.setFromMatrixPosition(n.matrixWorld),
                E.extractRotation(r.matrixWorld),
                v.set(0, 0, 1),
                v.applyMatrix4(E),
                F.subVectors(b, y),
                F.dot(v) > 0)
              )
                return;
              F.reflect(v).negate(),
                F.add(b),
                E.extractRotation(n.matrixWorld),
                M.set(0, 0, -1),
                M.applyMatrix4(E),
                M.add(y),
                I.subVectors(b, M),
                I.reflect(v).negate(),
                I.add(b),
                G.position.copy(F),
                G.up.set(0, 1, 0),
                G.up.applyMatrix4(E),
                G.up.reflect(v),
                G.lookAt(I),
                (G.far = n.far),
                G.updateMatrixWorld(),
                G.projectionMatrix.copy(n.projectionMatrix),
                x.set(
                  0.5,
                  0,
                  0,
                  0.5,
                  0,
                  0.5,
                  0,
                  0.5,
                  0,
                  0,
                  0.5,
                  0.5,
                  0,
                  0,
                  0,
                  1
                ),
                x.multiply(G.projectionMatrix),
                x.multiply(G.matrixWorldInverse),
                g.setFromNormalAndCoplanarPoint(v, b),
                g.applyMatrix4(G.matrixWorldInverse),
                w.set(g.normal.x, g.normal.y, g.normal.z, g.constant);
              let i = G.projectionMatrix;
              (R.x = (Math.sign(w.x) + i.elements[8]) / i.elements[0]),
                (R.y = (Math.sign(w.y) + i.elements[9]) / i.elements[5]),
                (R.z = -1),
                (R.w = (1 + i.elements[10]) / i.elements[14]),
                w.multiplyScalar(2 / w.dot(R)),
                (i.elements[2] = w.x),
                (i.elements[6] = w.y),
                (i.elements[10] = w.z + 1 - l),
                (i.elements[14] = w.w),
                p.setFromMatrixPosition(n.matrixWorld);
              let a = e.getRenderTarget(),
                o = e.xr.enabled,
                s = e.shadowMap.autoUpdate;
              (r.visible = !1),
                (e.xr.enabled = !1),
                (e.shadowMap.autoUpdate = !1),
                e.setRenderTarget(D),
                e.state.buffers.depth.setMask(!0),
                !1 === e.autoClear && e.clear(),
                e.render(t, G),
                (r.visible = !0),
                (e.xr.enabled = o),
                (e.shadowMap.autoUpdate = s),
                e.setRenderTarget(a);
              let u = n.viewport;
              void 0 !== u && e.state.viewport(u);
            });
        }
      }
    },
    97477: (e, t, r) => {
      "use strict";
      r.d(t, { _c: () => a, ec: () => i });
      var n = r(80337);
      function i(e, t = 1e-4) {
        t = Math.max(t, Number.EPSILON);
        let r = {},
          a = e.getIndex(),
          o = e.getAttribute("position"),
          s = a ? a.count : o.count,
          l = 0,
          u = Object.keys(e.attributes),
          c = {},
          d = {},
          f = [],
          A = ["getX", "getY", "getZ", "getW"];
        for (let t = 0, r = u.length; t < r; t++) {
          let r = u[t];
          c[r] = [];
          let n = e.morphAttributes[r];
          n &&
            (d[r] = Array(n.length)
              .fill(0)
              .map(() => []));
        }
        let h = Math.pow(10, Math.log10(1 / t));
        for (let t = 0; t < s; t++) {
          let n = a ? a.getX(t) : t,
            i = "";
          for (let t = 0, r = u.length; t < r; t++) {
            let r = u[t],
              a = e.getAttribute(r),
              o = a.itemSize;
            for (let e = 0; e < o; e++) i += `${~~(a[A[e]](n) * h)},`;
          }
          if (i in r) f.push(r[i]);
          else {
            for (let t = 0, r = u.length; t < r; t++) {
              let r = u[t],
                i = e.getAttribute(r),
                a = e.morphAttributes[r],
                o = i.itemSize,
                s = c[r],
                l = d[r];
              for (let e = 0; e < o; e++) {
                let t = A[e];
                if ((s.push(i[t](n)), a))
                  for (let e = 0, r = a.length; e < r; e++)
                    l[e].push(a[e][t](n));
              }
            }
            (r[i] = l), f.push(l), l++;
          }
        }
        let p = e.clone();
        for (let t = 0, r = u.length; t < r; t++) {
          let r = u[t],
            i = e.getAttribute(r),
            a = new i.array.constructor(c[r]),
            o = new n.THS(a, i.itemSize, i.normalized);
          if ((p.setAttribute(r, o), r in d))
            for (let t = 0; t < d[r].length; t++) {
              let i = e.morphAttributes[r][t],
                a = new i.array.constructor(d[r][t]),
                o = new n.THS(a, i.itemSize, i.normalized);
              p.morphAttributes[r][t] = o;
            }
        }
        return p.setIndex(f), p;
      }
      function a(e, t) {
        if (t === n.RJ4)
          return (
            console.warn(
              "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."
            ),
            e
          );
        if (t !== n.rYR && t !== n.O49)
          return (
            console.error(
              "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",
              t
            ),
            e
          );
        {
          let r = e.getIndex();
          if (null === r) {
            let t = [],
              n = e.getAttribute("position");
            if (void 0 === n)
              return (
                console.error(
                  "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."
                ),
                e
              );
            for (let e = 0; e < n.count; e++) t.push(e);
            e.setIndex(t), (r = e.getIndex());
          }
          let i = r.count - 2,
            a = [];
          if (r) {
            if (t === n.rYR)
              for (let e = 1; e <= i; e++)
                a.push(r.getX(0)), a.push(r.getX(e)), a.push(r.getX(e + 1));
            else
              for (let e = 0; e < i; e++)
                e % 2 == 0
                  ? (a.push(r.getX(e)),
                    a.push(r.getX(e + 1)),
                    a.push(r.getX(e + 2)))
                  : (a.push(r.getX(e + 2)),
                    a.push(r.getX(e + 1)),
                    a.push(r.getX(e)));
          }
          a.length / 3 !== i &&
            console.error(
              "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."
            );
          let o = e.clone();
          return o.setIndex(a), o.clearGroups(), o;
        }
      }
    },
  },
]);
