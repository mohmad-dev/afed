"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [664],
  {
    32557: (e, t, i) => {
      i.d(t, {
        AH: () => H,
        K1: () => G,
        TU: () => O,
        Vu: () => $,
        bv: () => D,
        cf: () => E,
        s0: () => p,
      });
      var r = i(80337),
        s = class {
          constructor() {
            (this.startTime = performance.now()),
              (this.previousTime = 0),
              (this.currentTime = 0),
              (this._delta = 0),
              (this._elapsed = 0),
              (this._fixedDelta = 1e3 / 60),
              (this.timescale = 1),
              (this.useFixedDelta = !1),
              (this._autoReset = !1);
          }
          get autoReset() {
            return this._autoReset;
          }
          set autoReset(e) {
            "undefined" != typeof document &&
              void 0 !== document.hidden &&
              (e
                ? document.addEventListener("visibilitychange", this)
                : document.removeEventListener("visibilitychange", this),
              (this._autoReset = e));
          }
          get delta() {
            return 0.001 * this._delta;
          }
          get fixedDelta() {
            return 0.001 * this._fixedDelta;
          }
          set fixedDelta(e) {
            this._fixedDelta = 1e3 * e;
          }
          get elapsed() {
            return 0.001 * this._elapsed;
          }
          update(e) {
            this.useFixedDelta
              ? (this._delta = this.fixedDelta)
              : ((this.previousTime = this.currentTime),
                (this.currentTime =
                  (void 0 !== e ? e : performance.now()) - this.startTime),
                (this._delta = this.currentTime - this.previousTime)),
              (this._delta *= this.timescale),
              (this._elapsed += this._delta);
          }
          reset() {
            (this._delta = 0),
              (this._elapsed = 0),
              (this.currentTime = performance.now() - this.startTime);
          }
          getDelta() {
            return this.delta;
          }
          getElapsed() {
            return this.elapsed;
          }
          handleEvent(e) {
            document.hidden ||
              (this.currentTime = performance.now() - this.startTime);
          }
          dispose() {
            this.autoReset = !1;
          }
        },
        n = (() => {
          let e = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]),
            t = new Float32Array([0, 0, 2, 0, 0, 2]),
            i = new r.LoY();
          return (
            i.setAttribute("position", new r.THS(e, 3)),
            i.setAttribute("uv", new r.THS(t, 2)),
            i
          );
        })(),
        a = class e {
          static get fullscreenGeometry() {
            return n;
          }
          constructor(e = "Pass", t = new r.Z58(), i = new r.i7d()) {
            (this.name = e),
              (this.renderer = null),
              (this.scene = t),
              (this.camera = i),
              (this.screen = null),
              (this.rtt = !0),
              (this.needsSwap = !0),
              (this.needsDepthTexture = !1),
              (this.enabled = !0);
          }
          get renderToScreen() {
            return !this.rtt;
          }
          set renderToScreen(e) {
            if (this.rtt === e) {
              let t = this.fullscreenMaterial;
              null !== t && (t.needsUpdate = !0), (this.rtt = !e);
            }
          }
          set mainScene(e) {}
          set mainCamera(e) {}
          setRenderer(e) {
            this.renderer = e;
          }
          isEnabled() {
            return this.enabled;
          }
          setEnabled(e) {
            this.enabled = e;
          }
          get fullscreenMaterial() {
            return null !== this.screen ? this.screen.material : null;
          }
          set fullscreenMaterial(t) {
            let i = this.screen;
            null !== i
              ? (i.material = t)
              : (((i = new r.eaF(e.fullscreenGeometry, t)).frustumCulled = !1),
                null === this.scene && (this.scene = new r.Z58()),
                this.scene.add(i),
                (this.screen = i));
          }
          getFullscreenMaterial() {
            return this.fullscreenMaterial;
          }
          setFullscreenMaterial(e) {
            this.fullscreenMaterial = e;
          }
          getDepthTexture() {
            return null;
          }
          setDepthTexture(e, t = r.Rkk) {}
          render(e, t, i, r, s) {
            throw Error("Render method not implemented!");
          }
          setSize(e, t) {}
          initialize(e, t, i) {}
          dispose() {
            for (let t of Object.keys(this)) {
              let i = this[t];
              (i instanceof r.nWS ||
                i instanceof r.imn ||
                i instanceof r.gPd ||
                i instanceof e) &&
                this[t].dispose();
            }
            null !== this.fullscreenMaterial &&
              this.fullscreenMaterial.dispose();
          }
        },
        l = class extends a {
          constructor() {
            super("ClearMaskPass", null, null), (this.needsSwap = !1);
          }
          render(e, t, i, r, s) {
            let n = e.state.buffers.stencil;
            n.setLocked(!1), n.setTest(!1);
          }
        },
        o =
          "varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",
        u = class extends r.BKk {
          constructor() {
            super({
              name: "CopyMaterial",
              uniforms: { inputBuffer: new r.nc$(null), opacity: new r.nc$(1) },
              blending: r.XIg,
              toneMapped: !1,
              depthWrite: !1,
              depthTest: !1,
              fragmentShader:
                "#include <common>\n#include <dithering_pars_fragment>\n#ifdef FRAMEBUFFER_PRECISION_HIGH\nuniform mediump sampler2D inputBuffer;\n#else\nuniform lowp sampler2D inputBuffer;\n#endif\nuniform float opacity;varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);gl_FragColor=opacity*texel;\n#include <colorspace_fragment>\n#include <dithering_fragment>\n}",
              vertexShader: o,
            });
          }
          set inputBuffer(e) {
            this.uniforms.inputBuffer.value = e;
          }
          setInputBuffer(e) {
            this.uniforms.inputBuffer.value = e;
          }
          getOpacity(e) {
            return this.uniforms.opacity.value;
          }
          setOpacity(e) {
            this.uniforms.opacity.value = e;
          }
        },
        h = class extends a {
          constructor(e, t = !0) {
            super("CopyPass"),
              (this.fullscreenMaterial = new u()),
              (this.needsSwap = !1),
              (this.renderTarget = e),
              void 0 === e &&
                ((this.renderTarget = new r.nWS(1, 1, {
                  minFilter: r.k6q,
                  magFilter: r.k6q,
                  stencilBuffer: !1,
                  depthBuffer: !1,
                })),
                (this.renderTarget.texture.name = "CopyPass.Target")),
              (this.autoResize = t);
          }
          get resize() {
            return this.autoResize;
          }
          set resize(e) {
            this.autoResize = e;
          }
          get texture() {
            return this.renderTarget.texture;
          }
          getTexture() {
            return this.renderTarget.texture;
          }
          setAutoResizeEnabled(e) {
            this.autoResize = e;
          }
          render(e, t, i, r, s) {
            (this.fullscreenMaterial.inputBuffer = t.texture),
              e.setRenderTarget(this.renderToScreen ? null : this.renderTarget),
              e.render(this.scene, this.camera);
          }
          setSize(e, t) {
            this.autoResize && this.renderTarget.setSize(e, t);
          }
          initialize(e, t, i) {
            void 0 !== i &&
              ((this.renderTarget.texture.type = i),
              i !== r.OUM
                ? (this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH =
                    "1")
                : null !== e &&
                  e.outputColorSpace === r.er$ &&
                  (this.renderTarget.texture.colorSpace = r.er$));
          }
        },
        c = new r.Q1f(),
        d = class extends a {
          constructor(e = !0, t = !0, i = !1) {
            super("ClearPass", null, null),
              (this.needsSwap = !1),
              (this.color = e),
              (this.depth = t),
              (this.stencil = i),
              (this.overrideClearColor = null),
              (this.overrideClearAlpha = -1);
          }
          setClearFlags(e, t, i) {
            (this.color = e), (this.depth = t), (this.stencil = i);
          }
          getOverrideClearColor() {
            return this.overrideClearColor;
          }
          setOverrideClearColor(e) {
            this.overrideClearColor = e;
          }
          getOverrideClearAlpha() {
            return this.overrideClearAlpha;
          }
          setOverrideClearAlpha(e) {
            this.overrideClearAlpha = e;
          }
          render(e, t, i, r, s) {
            let n = this.overrideClearColor,
              a = this.overrideClearAlpha,
              l = e.getClearAlpha(),
              o = null !== n,
              u = a >= 0;
            o
              ? (e.getClearColor(c), e.setClearColor(n, u ? a : l))
              : u && e.setClearAlpha(a),
              e.setRenderTarget(this.renderToScreen ? null : t),
              e.clear(this.color, this.depth, this.stencil),
              o ? e.setClearColor(c, l) : u && e.setClearAlpha(l);
          }
        },
        f = class extends a {
          constructor(e, t) {
            super("MaskPass", e, t),
              (this.needsSwap = !1),
              (this.clearPass = new d(!1, !1, !0)),
              (this.inverse = !1);
          }
          set mainScene(e) {
            this.scene = e;
          }
          set mainCamera(e) {
            this.camera = e;
          }
          get inverted() {
            return this.inverse;
          }
          set inverted(e) {
            this.inverse = e;
          }
          get clear() {
            return this.clearPass.enabled;
          }
          set clear(e) {
            this.clearPass.enabled = e;
          }
          getClearPass() {
            return this.clearPass;
          }
          isInverted() {
            return this.inverted;
          }
          setInverted(e) {
            this.inverted = e;
          }
          render(e, t, i, r, s) {
            let n = e.getContext(),
              a = e.state.buffers,
              l = this.scene,
              o = this.camera,
              u = this.clearPass,
              h = this.inverted ? 0 : 1;
            a.color.setMask(!1),
              a.depth.setMask(!1),
              a.color.setLocked(!0),
              a.depth.setLocked(!0),
              a.stencil.setTest(!0),
              a.stencil.setOp(n.REPLACE, n.REPLACE, n.REPLACE),
              a.stencil.setFunc(n.ALWAYS, h, 0xffffffff),
              a.stencil.setClear(1 - h),
              a.stencil.setLocked(!0),
              this.clearPass.enabled &&
                (this.renderToScreen
                  ? u.render(e, null)
                  : (u.render(e, t), u.render(e, i))),
              this.renderToScreen
                ? e.setRenderTarget(null)
                : (e.setRenderTarget(t), e.render(l, o), e.setRenderTarget(i)),
              e.render(l, o),
              a.color.setLocked(!1),
              a.depth.setLocked(!1),
              a.stencil.setLocked(!1),
              a.stencil.setFunc(n.EQUAL, 1, 0xffffffff),
              a.stencil.setOp(n.KEEP, n.KEEP, n.KEEP),
              a.stencil.setLocked(!0);
          }
        },
        p = class {
          constructor(
            e = null,
            {
              depthBuffer: t = !0,
              stencilBuffer: i = !1,
              multisampling: r = 0,
              frameBufferType: n,
            } = {}
          ) {
            (this.renderer = null),
              (this.inputBuffer = this.createBuffer(t, i, n, r)),
              (this.outputBuffer = this.inputBuffer.clone()),
              (this.copyPass = new h()),
              (this.depthTexture = null),
              (this.passes = []),
              (this.timer = new s()),
              (this.autoRenderToScreen = !0),
              this.setRenderer(e);
          }
          get multisampling() {
            return this.inputBuffer.samples || 0;
          }
          set multisampling(e) {
            let t = this.inputBuffer,
              i = this.multisampling;
            i > 0 && e > 0
              ? ((this.inputBuffer.samples = e),
                (this.outputBuffer.samples = e),
                this.inputBuffer.dispose(),
                this.outputBuffer.dispose())
              : i !== e &&
                (this.inputBuffer.dispose(),
                this.outputBuffer.dispose(),
                (this.inputBuffer = this.createBuffer(
                  t.depthBuffer,
                  t.stencilBuffer,
                  t.texture.type,
                  e
                )),
                (this.inputBuffer.depthTexture = this.depthTexture),
                (this.outputBuffer = this.inputBuffer.clone()));
          }
          getTimer() {
            return this.timer;
          }
          getRenderer() {
            return this.renderer;
          }
          setRenderer(e) {
            if (((this.renderer = e), null !== e)) {
              let t = e.getSize(new r.I9Y()),
                i = e.getContext().getContextAttributes().alpha,
                s = this.inputBuffer.texture.type;
              for (let n of (s === r.OUM &&
                e.outputColorSpace === r.er$ &&
                ((this.inputBuffer.texture.colorSpace = r.er$),
                (this.outputBuffer.texture.colorSpace = r.er$),
                this.inputBuffer.dispose(),
                this.outputBuffer.dispose()),
              (e.autoClear = !1),
              this.setSize(t.width, t.height),
              this.passes))
                n.initialize(e, i, s);
            }
          }
          replaceRenderer(e, t = !0) {
            let i = this.renderer,
              r = i.domElement.parentNode;
            return (
              this.setRenderer(e),
              t &&
                null !== r &&
                (r.removeChild(i.domElement), r.appendChild(e.domElement)),
              i
            );
          }
          createDepthTexture() {
            let e = (this.depthTexture = new r.VCu());
            return (
              (this.inputBuffer.depthTexture = e),
              this.inputBuffer.dispose(),
              this.inputBuffer.stencilBuffer
                ? ((e.format = r.dcC), (e.type = r.V3x))
                : (e.type = r.bkx),
              e
            );
          }
          deleteDepthTexture() {
            if (null !== this.depthTexture)
              for (let e of (this.depthTexture.dispose(),
              (this.depthTexture = null),
              (this.inputBuffer.depthTexture = null),
              this.inputBuffer.dispose(),
              this.passes))
                e.setDepthTexture(null);
          }
          createBuffer(e, t, i, s) {
            let n = this.renderer,
              a =
                null === n ? new r.I9Y() : n.getDrawingBufferSize(new r.I9Y()),
              l = {
                minFilter: r.k6q,
                magFilter: r.k6q,
                stencilBuffer: t,
                depthBuffer: e,
                type: i,
              },
              o = new r.nWS(a.width, a.height, l);
            return (
              s > 0 &&
                ((o.ignoreDepthForMultisampleCopy = !1), (o.samples = s)),
              i === r.OUM &&
                null !== n &&
                n.outputColorSpace === r.er$ &&
                (o.texture.colorSpace = r.er$),
              (o.texture.name = "EffectComposer.Buffer"),
              (o.texture.generateMipmaps = !1),
              o
            );
          }
          setMainScene(e) {
            for (let t of this.passes) t.mainScene = e;
          }
          setMainCamera(e) {
            for (let t of this.passes) t.mainCamera = e;
          }
          addPass(e, t) {
            let i = this.passes,
              s = this.renderer,
              n = s.getDrawingBufferSize(new r.I9Y()),
              a = s.getContext().getContextAttributes().alpha,
              l = this.inputBuffer.texture.type;
            if (
              (e.setRenderer(s),
              e.setSize(n.width, n.height),
              e.initialize(s, a, l),
              this.autoRenderToScreen &&
                (i.length > 0 && (i[i.length - 1].renderToScreen = !1),
                e.renderToScreen && (this.autoRenderToScreen = !1)),
              void 0 !== t ? i.splice(t, 0, e) : i.push(e),
              this.autoRenderToScreen && (i[i.length - 1].renderToScreen = !0),
              e.needsDepthTexture || null !== this.depthTexture)
            ) {
              if (null === this.depthTexture) {
                let t = this.createDepthTexture();
                for (e of i) e.setDepthTexture(t);
              } else e.setDepthTexture(this.depthTexture);
            }
          }
          removePass(e) {
            let t = this.passes,
              i = t.indexOf(e);
            -1 !== i &&
              t.splice(i, 1).length > 0 &&
              (null === this.depthTexture ||
                t.reduce((e, t) => e || t.needsDepthTexture, !1) ||
                (e.getDepthTexture() === this.depthTexture &&
                  e.setDepthTexture(null),
                this.deleteDepthTexture()),
              this.autoRenderToScreen &&
                i === t.length &&
                ((e.renderToScreen = !1),
                t.length > 0 && (t[t.length - 1].renderToScreen = !0)));
          }
          removeAllPasses() {
            let e = this.passes;
            this.deleteDepthTexture(),
              e.length > 0 &&
                (this.autoRenderToScreen &&
                  (e[e.length - 1].renderToScreen = !1),
                (this.passes = []));
          }
          render(e) {
            let t, i, r;
            let s = this.renderer,
              n = this.copyPass,
              a = this.inputBuffer,
              o = this.outputBuffer,
              u = !1;
            for (let h of (void 0 === e &&
              (this.timer.update(), (e = this.timer.getDelta())),
            this.passes))
              h.enabled &&
                (h.render(s, a, o, e, u),
                h.needsSwap &&
                  (u &&
                    ((n.renderToScreen = h.renderToScreen),
                    (t = s.getContext()),
                    (i = s.state.buffers.stencil).setFunc(
                      t.NOTEQUAL,
                      1,
                      0xffffffff
                    ),
                    n.render(s, a, o, e, u),
                    i.setFunc(t.EQUAL, 1, 0xffffffff)),
                  (r = a),
                  (a = o),
                  (o = r)),
                h instanceof f ? (u = !0) : h instanceof l && (u = !1));
          }
          setSize(e, t, i) {
            let s = this.renderer,
              n = s.getSize(new r.I9Y());
            (void 0 === e || void 0 === t) && ((e = n.width), (t = n.height)),
              (n.width !== e || n.height !== t) && s.setSize(e, t, i);
            let a = s.getDrawingBufferSize(new r.I9Y());
            for (let e of (this.inputBuffer.setSize(a.width, a.height),
            this.outputBuffer.setSize(a.width, a.height),
            this.passes))
              e.setSize(a.width, a.height);
          }
          reset() {
            this.dispose(), (this.autoRenderToScreen = !0);
          }
          dispose() {
            for (let e of this.passes) e.dispose();
            (this.passes = []),
              null !== this.inputBuffer && this.inputBuffer.dispose(),
              null !== this.outputBuffer && this.outputBuffer.dispose(),
              this.deleteDepthTexture(),
              this.copyPass.dispose(),
              this.timer.dispose(),
              a.fullscreenGeometry.dispose();
          }
        },
        v = { NONE: 0, DEPTH: 1, CONVOLUTION: 2 },
        m = {
          FRAGMENT_HEAD: "FRAGMENT_HEAD",
          FRAGMENT_MAIN_UV: "FRAGMENT_MAIN_UV",
          FRAGMENT_MAIN_IMAGE: "FRAGMENT_MAIN_IMAGE",
          VERTEX_HEAD: "VERTEX_HEAD",
          VERTEX_MAIN_SUPPORT: "VERTEX_MAIN_SUPPORT",
        },
        g = class {
          constructor() {
            (this.shaderParts = new Map([
              [m.FRAGMENT_HEAD, null],
              [m.FRAGMENT_MAIN_UV, null],
              [m.FRAGMENT_MAIN_IMAGE, null],
              [m.VERTEX_HEAD, null],
              [m.VERTEX_MAIN_SUPPORT, null],
            ])),
              (this.defines = new Map()),
              (this.uniforms = new Map()),
              (this.blendModes = new Map()),
              (this.extensions = new Set()),
              (this.attributes = v.NONE),
              (this.varyings = new Set()),
              (this.uvTransformation = !1),
              (this.readDepth = !1),
              (this.colorSpace = r.Zr2);
          }
        };
      function S(e) {
        let t;
        if (0 === e) t = new Float64Array(0);
        else if (1 === e) t = new Float64Array([1]);
        else if (e > 1) {
          let i = new Float64Array(e),
            r = new Float64Array(e);
          for (let s = 1; s <= e; ++s) {
            for (let e = 0; e < s; ++e)
              r[e] = 0 === e || e === s - 1 ? 1 : i[e - 1] + i[e];
            (t = r), (r = i), (i = t);
          }
        }
        return t;
      }
      var x = !1,
        y = class {
          constructor(e = null) {
            (this.originalMaterials = new Map()),
              (this.material = null),
              (this.materials = null),
              (this.materialsBackSide = null),
              (this.materialsDoubleSide = null),
              (this.materialsFlatShaded = null),
              (this.materialsFlatShadedBackSide = null),
              (this.materialsFlatShadedDoubleSide = null),
              this.setMaterial(e),
              (this.meshCount = 0),
              (this.replaceMaterial = (e) => {
                if (e.isMesh) {
                  let t;
                  if (e.material.flatShading)
                    switch (e.material.side) {
                      case r.$EB:
                        t = this.materialsFlatShadedDoubleSide;
                        break;
                      case r.hsX:
                        t = this.materialsFlatShadedBackSide;
                        break;
                      default:
                        t = this.materialsFlatShaded;
                    }
                  else
                    switch (e.material.side) {
                      case r.$EB:
                        t = this.materialsDoubleSide;
                        break;
                      case r.hsX:
                        t = this.materialsBackSide;
                        break;
                      default:
                        t = this.materials;
                    }
                  this.originalMaterials.set(e, e.material),
                    e.isSkinnedMesh
                      ? (e.material = t[2])
                      : e.isInstancedMesh
                      ? (e.material = t[1])
                      : (e.material = t[0]),
                    ++this.meshCount;
                }
              });
          }
          cloneMaterial(e) {
            if (!(e instanceof r.BKk)) return e.clone();
            let t = e.uniforms,
              i = new Map();
            for (let e in t) {
              let r = t[e].value;
              r.isRenderTargetTexture && ((t[e].value = null), i.set(e, r));
            }
            let s = e.clone();
            for (let e of i)
              (t[e[0]].value = e[1]), (s.uniforms[e[0]].value = e[1]);
            return s;
          }
          setMaterial(e) {
            if ((this.disposeMaterials(), (this.material = e), null !== e)) {
              let t = (this.materials = [
                this.cloneMaterial(e),
                this.cloneMaterial(e),
                this.cloneMaterial(e),
              ]);
              for (let i of t)
                (i.uniforms = Object.assign({}, e.uniforms)), (i.side = r.hB5);
              (t[2].skinning = !0),
                (this.materialsBackSide = t.map((t) => {
                  let i = this.cloneMaterial(t);
                  return (
                    (i.uniforms = Object.assign({}, e.uniforms)),
                    (i.side = r.hsX),
                    i
                  );
                })),
                (this.materialsDoubleSide = t.map((t) => {
                  let i = this.cloneMaterial(t);
                  return (
                    (i.uniforms = Object.assign({}, e.uniforms)),
                    (i.side = r.$EB),
                    i
                  );
                })),
                (this.materialsFlatShaded = t.map((t) => {
                  let i = this.cloneMaterial(t);
                  return (
                    (i.uniforms = Object.assign({}, e.uniforms)),
                    (i.flatShading = !0),
                    i
                  );
                })),
                (this.materialsFlatShadedBackSide = t.map((t) => {
                  let i = this.cloneMaterial(t);
                  return (
                    (i.uniforms = Object.assign({}, e.uniforms)),
                    (i.flatShading = !0),
                    (i.side = r.hsX),
                    i
                  );
                })),
                (this.materialsFlatShadedDoubleSide = t.map((t) => {
                  let i = this.cloneMaterial(t);
                  return (
                    (i.uniforms = Object.assign({}, e.uniforms)),
                    (i.flatShading = !0),
                    (i.side = r.$EB),
                    i
                  );
                }));
            }
          }
          render(e, t, i) {
            let r = e.shadowMap.enabled;
            if (((e.shadowMap.enabled = !1), x)) {
              let r = this.originalMaterials;
              for (let s of ((this.meshCount = 0),
              t.traverse(this.replaceMaterial),
              e.render(t, i),
              r))
                s[0].material = s[1];
              this.meshCount !== r.size && r.clear();
            } else {
              let r = t.overrideMaterial;
              (t.overrideMaterial = this.material),
                e.render(t, i),
                (t.overrideMaterial = r);
            }
            e.shadowMap.enabled = r;
          }
          disposeMaterials() {
            if (null !== this.material)
              for (let e of this.materials
                .concat(this.materialsBackSide)
                .concat(this.materialsDoubleSide)
                .concat(this.materialsFlatShaded)
                .concat(this.materialsFlatShadedBackSide)
                .concat(this.materialsFlatShadedDoubleSide))
                e.dispose();
          }
          dispose() {
            this.originalMaterials.clear(), this.disposeMaterials();
          }
          static get workaroundEnabled() {
            return x;
          }
          static set workaroundEnabled(e) {
            x = e;
          }
        },
        T = class extends r.Qev {
          constructor(e, t = -1, i = -1, s = 1) {
            super(),
              (this.resizable = e),
              (this.baseSize = new r.I9Y(1, 1)),
              (this.preferredSize = new r.I9Y(t, i)),
              (this.target = this.preferredSize),
              (this.s = s),
              (this.effectiveSize = new r.I9Y()),
              this.addEventListener("change", () => this.updateEffectiveSize()),
              this.updateEffectiveSize();
          }
          updateEffectiveSize() {
            let e = this.baseSize,
              t = this.preferredSize,
              i = this.effectiveSize,
              r = this.scale;
            -1 !== t.width
              ? (i.width = t.width)
              : -1 !== t.height
              ? (i.width = Math.round(
                  t.height * (e.width / Math.max(e.height, 1))
                ))
              : (i.width = Math.round(e.width * r)),
              -1 !== t.height
                ? (i.height = t.height)
                : -1 !== t.width
                ? (i.height = Math.round(
                    t.width / Math.max(e.width / Math.max(e.height, 1), 1)
                  ))
                : (i.height = Math.round(e.height * r));
          }
          get width() {
            return this.effectiveSize.width;
          }
          set width(e) {
            this.preferredWidth = e;
          }
          get height() {
            return this.effectiveSize.height;
          }
          set height(e) {
            this.preferredHeight = e;
          }
          getWidth() {
            return this.width;
          }
          getHeight() {
            return this.height;
          }
          get scale() {
            return this.s;
          }
          set scale(e) {
            this.s !== e &&
              ((this.s = e),
              this.preferredSize.setScalar(-1),
              this.dispatchEvent({ type: "change" }),
              this.resizable.setSize(
                this.baseSize.width,
                this.baseSize.height
              ));
          }
          getScale() {
            return this.scale;
          }
          setScale(e) {
            this.scale = e;
          }
          get baseWidth() {
            return this.baseSize.width;
          }
          set baseWidth(e) {
            this.baseSize.width !== e &&
              ((this.baseSize.width = e),
              this.dispatchEvent({ type: "change" }),
              this.resizable.setSize(
                this.baseSize.width,
                this.baseSize.height
              ));
          }
          getBaseWidth() {
            return this.baseWidth;
          }
          setBaseWidth(e) {
            this.baseWidth = e;
          }
          get baseHeight() {
            return this.baseSize.height;
          }
          set baseHeight(e) {
            this.baseSize.height !== e &&
              ((this.baseSize.height = e),
              this.dispatchEvent({ type: "change" }),
              this.resizable.setSize(
                this.baseSize.width,
                this.baseSize.height
              ));
          }
          getBaseHeight() {
            return this.baseHeight;
          }
          setBaseHeight(e) {
            this.baseHeight = e;
          }
          setBaseSize(e, t) {
            (this.baseSize.width !== e || this.baseSize.height !== t) &&
              (this.baseSize.set(e, t),
              this.dispatchEvent({ type: "change" }),
              this.resizable.setSize(
                this.baseSize.width,
                this.baseSize.height
              ));
          }
          get preferredWidth() {
            return this.preferredSize.width;
          }
          set preferredWidth(e) {
            this.preferredSize.width !== e &&
              ((this.preferredSize.width = e),
              this.dispatchEvent({ type: "change" }),
              this.resizable.setSize(
                this.baseSize.width,
                this.baseSize.height
              ));
          }
          getPreferredWidth() {
            return this.preferredWidth;
          }
          setPreferredWidth(e) {
            this.preferredWidth = e;
          }
          get preferredHeight() {
            return this.preferredSize.height;
          }
          set preferredHeight(e) {
            this.preferredSize.height !== e &&
              ((this.preferredSize.height = e),
              this.dispatchEvent({ type: "change" }),
              this.resizable.setSize(
                this.baseSize.width,
                this.baseSize.height
              ));
          }
          getPreferredHeight() {
            return this.preferredHeight;
          }
          setPreferredHeight(e) {
            this.preferredHeight = e;
          }
          setPreferredSize(e, t) {
            (this.preferredSize.width !== e ||
              this.preferredSize.height !== t) &&
              (this.preferredSize.set(e, t),
              this.dispatchEvent({ type: "change" }),
              this.resizable.setSize(
                this.baseSize.width,
                this.baseSize.height
              ));
          }
          copy(e) {
            (this.s = e.scale),
              this.baseSize.set(e.baseWidth, e.baseHeight),
              this.preferredSize.set(e.preferredWidth, e.preferredHeight),
              this.dispatchEvent({ type: "change" }),
              this.resizable.setSize(this.baseSize.width, this.baseSize.height);
          }
          static get AUTO_SIZE() {
            return -1;
          }
        },
        E = {
          SKIP: 9,
          SET: 30,
          ADD: 0,
          ALPHA: 1,
          AVERAGE: 2,
          COLOR: 3,
          COLOR_BURN: 4,
          COLOR_DODGE: 5,
          DARKEN: 6,
          DIFFERENCE: 7,
          DIVIDE: 8,
          DST: 9,
          EXCLUSION: 10,
          HARD_LIGHT: 11,
          HARD_MIX: 12,
          HUE: 13,
          INVERT: 14,
          INVERT_RGB: 15,
          LIGHTEN: 16,
          LINEAR_BURN: 17,
          LINEAR_DODGE: 18,
          LINEAR_LIGHT: 19,
          LUMINOSITY: 20,
          MULTIPLY: 21,
          NEGATION: 22,
          NORMAL: 23,
          OVERLAY: 24,
          PIN_LIGHT: 25,
          REFLECT: 26,
          SATURATION: 27,
          SCREEN: 28,
          SOFT_LIGHT: 29,
          SRC: 30,
          SUBTRACT: 31,
          VIVID_LIGHT: 32,
        },
        w = new Map([
          [
            E.ADD,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y,opacity);}",
          ],
          [
            E.ALPHA,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,min(y.a,opacity));}",
          ],
          [
            E.AVERAGE,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y)*0.5,opacity);}",
          ],
          [
            E.COLOR,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.rg,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",
          ],
          [
            E.COLOR_BURN,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(step(0.0,y)*(1.0-min(vec4(1.0),(1.0-x)/y)),vec4(1.0),step(1.0,x));return mix(x,z,opacity);}",
          ],
          [
            E.COLOR_DODGE,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=step(0.0,x)*mix(min(vec4(1.0),x/max(1.0-y,1e-9)),vec4(1.0),step(1.0,y));return mix(x,z,opacity);}",
          ],
          [
            E.DARKEN,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x,y),opacity);}",
          ],
          [
            E.DIFFERENCE,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,abs(x-y),opacity);}",
          ],
          [
            E.DIVIDE,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x/max(y,1e-12),opacity);}",
          ],
          [E.DST, null],
          [
            E.EXCLUSION,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y-2.0*x*y),opacity);}",
          ],
          [
            E.HARD_LIGHT,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 a=min(x,1.0),b=min(y,1.0);vec4 z=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,y));return mix(x,z,opacity);}",
          ],
          [
            E.HARD_MIX,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,step(1.0,x+y),opacity);}",
          ],
          [
            E.HUE,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.r,xHSL.gb));return vec4(mix(x.rgb,z,opacity),y.a);}",
          ],
          [
            E.INVERT,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-y,opacity);}",
          ],
          [
            E.INVERT_RGB,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y*(1.0-x),opacity);}",
          ],
          [
            E.LIGHTEN,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x,y),opacity);}",
          ],
          [
            E.LINEAR_BURN,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(y+x-1.0,0.0,1.0),opacity);}",
          ],
          [
            E.LINEAR_DODGE,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x+y,1.0),opacity);}",
          ],
          [
            E.LINEAR_LIGHT,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(2.0*y+x-1.0,0.0,1.0),opacity);}",
          ],
          [
            E.LUMINOSITY,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.rg,yHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",
          ],
          [
            E.MULTIPLY,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x*y,opacity);}",
          ],
          [
            E.NEGATION,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-abs(1.0-x-y),opacity);}",
          ],
          [
            E.NORMAL,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,opacity);}",
          ],
          [
            E.OVERLAY,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(2.0*y*x,1.0-2.0*(1.0-y)*(1.0-x),step(0.5,x));return mix(x,z,opacity);}",
          ],
          [
            E.PIN_LIGHT,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 z=mix(mix(y2,x,step(0.5*x,y)),max(vec4(0.0),y2-1.0),step(x,(y2-1.0)));return mix(x,z,opacity);}",
          ],
          [
            E.REFLECT,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(min(x*x/max(1.0-y,1e-12),1.0),y,step(1.0,y));return mix(x,z,opacity);}",
          ],
          [
            E.SATURATION,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.r,yHSL.g,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",
          ],
          [
            E.SCREEN,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y-min(x*y,1.0),opacity);}",
          ],
          [
            E.SOFT_LIGHT,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 w=step(0.5,y);vec4 z=mix(x-(1.0-y2)*x*(1.0-x),mix(x+(y2-1.0)*(sqrt(x)-x),x+(y2-1.0)*x*((16.0*x-12.0)*x+3.0),w*(1.0-step(0.25,x))),w);return mix(x,z,opacity);}",
          ],
          [
            E.SRC,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return y;}",
          ],
          [
            E.SUBTRACT,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x+y-1.0,0.0),opacity);}",
          ],
          [
            E.VIVID_LIGHT,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(max(1.0-min((1.0-x)/(2.0*y),1.0),0.0),min(x/(2.0*(1.0-y)),1.0),step(0.5,y));return mix(x,z,opacity);}",
          ],
        ]),
        U = class extends r.Qev {
          constructor(e, t = 1) {
            super(), (this._blendFunction = e), (this.opacity = new r.nc$(t));
          }
          getOpacity() {
            return this.opacity.value;
          }
          setOpacity(e) {
            this.opacity.value = e;
          }
          get blendFunction() {
            return this._blendFunction;
          }
          set blendFunction(e) {
            (this._blendFunction = e), this.dispatchEvent({ type: "change" });
          }
          getBlendFunction() {
            return this.blendFunction;
          }
          setBlendFunction(e) {
            this.blendFunction = e;
          }
          getShaderCode() {
            return w.get(this.blendFunction);
          }
        },
        A = { MEDIUM: 2, LARGE: 3 },
        M = [
          new Float32Array([0, 0]),
          new Float32Array([0, 1, 1]),
          new Float32Array([0, 1, 1, 2]),
          new Float32Array([0, 1, 2, 2, 3]),
          new Float32Array([0, 1, 2, 3, 4, 4, 5]),
          new Float32Array([0, 1, 2, 3, 4, 5, 7, 8, 9, 10]),
        ],
        B = class extends r.BKk {
          constructor(e = new r.IUQ()) {
            super({
              name: "KawaseBlurMaterial",
              uniforms: {
                inputBuffer: new r.nc$(null),
                texelSize: new r.nc$(new r.IUQ()),
                scale: new r.nc$(1),
                kernel: new r.nc$(0),
              },
              blending: r.XIg,
              toneMapped: !1,
              depthWrite: !1,
              depthTest: !1,
              fragmentShader:
                "#ifdef FRAMEBUFFER_PRECISION_HIGH\nuniform mediump sampler2D inputBuffer;\n#else\nuniform lowp sampler2D inputBuffer;\n#endif\nvarying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;\n#include <colorspace_fragment>\n}",
              vertexShader:
                "uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",
            }),
              this.setTexelSize(e.x, e.y),
              (this.kernelSize = A.MEDIUM);
          }
          set inputBuffer(e) {
            this.uniforms.inputBuffer.value = e;
          }
          setInputBuffer(e) {
            this.inputBuffer = e;
          }
          get kernelSequence() {
            return M[this.kernelSize];
          }
          get scale() {
            return this.uniforms.scale.value;
          }
          set scale(e) {
            this.uniforms.scale.value = e;
          }
          getScale() {
            return this.uniforms.scale.value;
          }
          setScale(e) {
            this.uniforms.scale.value = e;
          }
          getKernel() {
            return null;
          }
          get kernel() {
            return this.uniforms.kernel.value;
          }
          set kernel(e) {
            this.uniforms.kernel.value = e;
          }
          setKernel(e) {
            this.kernel = e;
          }
          setTexelSize(e, t) {
            this.uniforms.texelSize.value.set(e, t, 0.5 * e, 0.5 * t);
          }
          setSize(e, t) {
            let i = 1 / e,
              r = 1 / t;
            this.uniforms.texelSize.value.set(i, r, 0.5 * i, 0.5 * r);
          }
        },
        R = class extends a {
          constructor({
            kernelSize: e = A.MEDIUM,
            resolutionScale: t = 0.5,
            width: i = T.AUTO_SIZE,
            height: s = T.AUTO_SIZE,
            resolutionX: n = i,
            resolutionY: a = s,
          } = {}) {
            super("KawaseBlurPass"),
              (this.renderTargetA = new r.nWS(1, 1, { depthBuffer: !1 })),
              (this.renderTargetA.texture.name = "Blur.Target.A"),
              (this.renderTargetB = this.renderTargetA.clone()),
              (this.renderTargetB.texture.name = "Blur.Target.B");
            let l = (this.resolution = new T(this, n, a, t));
            l.addEventListener("change", (e) =>
              this.setSize(l.baseWidth, l.baseHeight)
            ),
              (this._blurMaterial = new B()),
              (this._blurMaterial.kernelSize = e),
              (this.copyMaterial = new u());
          }
          getResolution() {
            return this.resolution;
          }
          get blurMaterial() {
            return this._blurMaterial;
          }
          set blurMaterial(e) {
            this._blurMaterial = e;
          }
          get dithering() {
            return this.copyMaterial.dithering;
          }
          set dithering(e) {
            this.copyMaterial.dithering = e;
          }
          get kernelSize() {
            return this.blurMaterial.kernelSize;
          }
          set kernelSize(e) {
            this.blurMaterial.kernelSize = e;
          }
          get width() {
            return this.resolution.width;
          }
          set width(e) {
            this.resolution.preferredWidth = e;
          }
          get height() {
            return this.resolution.height;
          }
          set height(e) {
            this.resolution.preferredHeight = e;
          }
          get scale() {
            return this.blurMaterial.scale;
          }
          set scale(e) {
            this.blurMaterial.scale = e;
          }
          getScale() {
            return this.blurMaterial.scale;
          }
          setScale(e) {
            this.blurMaterial.scale = e;
          }
          getKernelSize() {
            return this.kernelSize;
          }
          setKernelSize(e) {
            this.kernelSize = e;
          }
          getResolutionScale() {
            return this.resolution.scale;
          }
          setResolutionScale(e) {
            this.resolution.scale = e;
          }
          render(e, t, i, r, s) {
            let n = this.scene,
              a = this.camera,
              l = this.renderTargetA,
              o = this.renderTargetB,
              u = this.blurMaterial,
              h = u.kernelSequence,
              c = t;
            this.fullscreenMaterial = u;
            for (let t = 0, i = h.length; t < i; ++t) {
              let i = (1 & t) == 0 ? l : o;
              (u.kernel = h[t]),
                (u.inputBuffer = c.texture),
                e.setRenderTarget(i),
                e.render(n, a),
                (c = i);
            }
            (this.fullscreenMaterial = this.copyMaterial),
              (this.copyMaterial.inputBuffer = c.texture),
              e.setRenderTarget(this.renderToScreen ? null : i),
              e.render(n, a);
          }
          setSize(e, t) {
            let i = this.resolution;
            i.setBaseSize(e, t);
            let r = i.width,
              s = i.height;
            this.renderTargetA.setSize(r, s),
              this.renderTargetB.setSize(r, s),
              this.blurMaterial.setSize(e, t);
          }
          initialize(e, t, i) {
            void 0 !== i &&
              ((this.renderTargetA.texture.type = i),
              (this.renderTargetB.texture.type = i),
              i !== r.OUM
                ? ((this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH = "1"),
                  (this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH = "1"))
                : null !== e &&
                  e.outputColorSpace === r.er$ &&
                  ((this.renderTargetA.texture.colorSpace = r.er$),
                  (this.renderTargetB.texture.colorSpace = r.er$)));
          }
          static get AUTO_SIZE() {
            return T.AUTO_SIZE;
          }
        },
        b = class extends r.BKk {
          constructor(e = !1, t = null) {
            super({
              name: "LuminanceMaterial",
              defines: { THREE_REVISION: r.sPf.replace(/\D+/g, "") },
              uniforms: {
                inputBuffer: new r.nc$(null),
                threshold: new r.nc$(0),
                smoothing: new r.nc$(1),
                range: new r.nc$(null),
              },
              blending: r.XIg,
              toneMapped: !1,
              depthWrite: !1,
              depthTest: !1,
              fragmentShader:
                "#include <common>\n#ifdef FRAMEBUFFER_PRECISION_HIGH\nuniform mediump sampler2D inputBuffer;\n#else\nuniform lowp sampler2D inputBuffer;\n#endif\n#ifdef RANGE\nuniform vec2 range;\n#elif defined(THRESHOLD)\nuniform float threshold;uniform float smoothing;\n#endif\nvarying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);float l=luminance(texel.rgb);\n#ifdef RANGE\nfloat low=step(range.x,l);float high=step(l,range.y);l*=low*high;\n#elif defined(THRESHOLD)\nl=smoothstep(threshold,threshold+smoothing,l)*l;\n#endif\n#ifdef COLOR\ngl_FragColor=vec4(texel.rgb*clamp(l,0.0,1.0),l);\n#else\ngl_FragColor=vec4(l);\n#endif\n}",
              vertexShader: o,
            }),
              (this.colorOutput = e),
              (this.luminanceRange = t);
          }
          set inputBuffer(e) {
            this.uniforms.inputBuffer.value = e;
          }
          setInputBuffer(e) {
            this.uniforms.inputBuffer.value = e;
          }
          get threshold() {
            return this.uniforms.threshold.value;
          }
          set threshold(e) {
            this.smoothing > 0 || e > 0
              ? (this.defines.THRESHOLD = "1")
              : delete this.defines.THRESHOLD,
              (this.uniforms.threshold.value = e);
          }
          getThreshold() {
            return this.threshold;
          }
          setThreshold(e) {
            this.threshold = e;
          }
          get smoothing() {
            return this.uniforms.smoothing.value;
          }
          set smoothing(e) {
            this.threshold > 0 || e > 0
              ? (this.defines.THRESHOLD = "1")
              : delete this.defines.THRESHOLD,
              (this.uniforms.smoothing.value = e);
          }
          getSmoothingFactor() {
            return this.smoothing;
          }
          setSmoothingFactor(e) {
            this.smoothing = e;
          }
          get useThreshold() {
            return this.threshold > 0 || this.smoothing > 0;
          }
          set useThreshold(e) {}
          get colorOutput() {
            return void 0 !== this.defines.COLOR;
          }
          set colorOutput(e) {
            e ? (this.defines.COLOR = "1") : delete this.defines.COLOR,
              (this.needsUpdate = !0);
          }
          isColorOutputEnabled(e) {
            return this.colorOutput;
          }
          setColorOutputEnabled(e) {
            this.colorOutput = e;
          }
          get useRange() {
            return null !== this.luminanceRange;
          }
          set useRange(e) {
            this.luminanceRange = null;
          }
          get luminanceRange() {
            return this.uniforms.range.value;
          }
          set luminanceRange(e) {
            null !== e ? (this.defines.RANGE = "1") : delete this.defines.RANGE,
              (this.uniforms.range.value = e),
              (this.needsUpdate = !0);
          }
          getLuminanceRange() {
            return this.luminanceRange;
          }
          setLuminanceRange(e) {
            this.luminanceRange = e;
          }
        },
        I = class extends a {
          constructor({
            renderTarget: e,
            luminanceRange: t,
            colorOutput: i,
            resolutionScale: s = 1,
            width: n = T.AUTO_SIZE,
            height: a = T.AUTO_SIZE,
            resolutionX: l = n,
            resolutionY: o = a,
          } = {}) {
            super("LuminancePass"),
              (this.fullscreenMaterial = new b(i, t)),
              (this.needsSwap = !1),
              (this.renderTarget = e),
              void 0 === this.renderTarget &&
                ((this.renderTarget = new r.nWS(1, 1, { depthBuffer: !1 })),
                (this.renderTarget.texture.name = "LuminancePass.Target"));
            let u = (this.resolution = new T(this, l, o, s));
            u.addEventListener("change", (e) =>
              this.setSize(u.baseWidth, u.baseHeight)
            );
          }
          get texture() {
            return this.renderTarget.texture;
          }
          getTexture() {
            return this.renderTarget.texture;
          }
          getResolution() {
            return this.resolution;
          }
          render(e, t, i, r, s) {
            (this.fullscreenMaterial.inputBuffer = t.texture),
              e.setRenderTarget(this.renderToScreen ? null : this.renderTarget),
              e.render(this.scene, this.camera);
          }
          setSize(e, t) {
            let i = this.resolution;
            i.setBaseSize(e, t), this.renderTarget.setSize(i.width, i.height);
          }
          initialize(e, t, i) {
            void 0 !== i &&
              i !== r.OUM &&
              ((this.renderTarget.texture.type = i),
              (this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH =
                "1"));
          }
        },
        z = class extends r.BKk {
          constructor() {
            super({
              name: "DownsamplingMaterial",
              uniforms: {
                inputBuffer: new r.nc$(null),
                texelSize: new r.nc$(new r.I9Y()),
              },
              blending: r.XIg,
              toneMapped: !1,
              depthWrite: !1,
              depthTest: !1,
              fragmentShader:
                "#ifdef FRAMEBUFFER_PRECISION_HIGH\nuniform mediump sampler2D inputBuffer;\n#else\nuniform lowp sampler2D inputBuffer;\n#endif\n#define WEIGHT_INNER 0.125\n#define WEIGHT_OUTER 0.0555555\nvarying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;\n#include <colorspace_fragment>\n}",
              vertexShader:
                "uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",
            });
          }
          set inputBuffer(e) {
            this.uniforms.inputBuffer.value = e;
          }
          setSize(e, t) {
            this.uniforms.texelSize.value.set(1 / e, 1 / t);
          }
        },
        F = class extends r.BKk {
          constructor() {
            super({
              name: "UpsamplingMaterial",
              uniforms: {
                inputBuffer: new r.nc$(null),
                supportBuffer: new r.nc$(null),
                texelSize: new r.nc$(new r.I9Y()),
                radius: new r.nc$(0.85),
              },
              blending: r.XIg,
              toneMapped: !1,
              depthWrite: !1,
              depthTest: !1,
              fragmentShader:
                "#ifdef FRAMEBUFFER_PRECISION_HIGH\nuniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;\n#else\nuniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;\n#endif\nuniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);\n#include <colorspace_fragment>\n}",
              vertexShader:
                "uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",
            });
          }
          set inputBuffer(e) {
            this.uniforms.inputBuffer.value = e;
          }
          set supportBuffer(e) {
            this.uniforms.supportBuffer.value = e;
          }
          get radius() {
            return this.uniforms.radius.value;
          }
          set radius(e) {
            this.uniforms.radius.value = e;
          }
          setSize(e, t) {
            this.uniforms.texelSize.value.set(1 / e, 1 / t);
          }
        },
        _ = class extends a {
          constructor() {
            super("MipmapBlurPass"),
              (this.needsSwap = !1),
              (this.renderTarget = new r.nWS(1, 1, { depthBuffer: !1 })),
              (this.renderTarget.texture.name = "Upsampling.Mipmap0"),
              (this.downsamplingMipmaps = []),
              (this.upsamplingMipmaps = []),
              (this.downsamplingMaterial = new z()),
              (this.upsamplingMaterial = new F()),
              (this.resolution = new r.I9Y());
          }
          get texture() {
            return this.renderTarget.texture;
          }
          get levels() {
            return this.downsamplingMipmaps.length;
          }
          set levels(e) {
            if (this.levels !== e) {
              let t = this.renderTarget;
              this.dispose(),
                (this.downsamplingMipmaps = []),
                (this.upsamplingMipmaps = []);
              for (let i = 0; i < e; ++i) {
                let e = t.clone();
                (e.texture.name = "Downsampling.Mipmap" + i),
                  this.downsamplingMipmaps.push(e);
              }
              this.upsamplingMipmaps.push(t);
              for (let i = 1, r = e - 1; i < r; ++i) {
                let e = t.clone();
                (e.texture.name = "Upsampling.Mipmap" + i),
                  this.upsamplingMipmaps.push(e);
              }
              this.setSize(this.resolution.x, this.resolution.y);
            }
          }
          get radius() {
            return this.upsamplingMaterial.radius;
          }
          set radius(e) {
            this.upsamplingMaterial.radius = e;
          }
          render(e, t, i, r, s) {
            let { scene: n, camera: a } = this,
              { downsamplingMaterial: l, upsamplingMaterial: o } = this,
              { downsamplingMipmaps: u, upsamplingMipmaps: h } = this,
              c = t;
            this.fullscreenMaterial = l;
            for (let t = 0, i = u.length; t < i; ++t) {
              let i = u[t];
              l.setSize(c.width, c.height),
                (l.inputBuffer = c.texture),
                e.setRenderTarget(i),
                e.render(n, a),
                (c = i);
            }
            this.fullscreenMaterial = o;
            for (let t = h.length - 1; t >= 0; --t) {
              let i = h[t];
              o.setSize(c.width, c.height),
                (o.inputBuffer = c.texture),
                (o.supportBuffer = u[t].texture),
                e.setRenderTarget(i),
                e.render(n, a),
                (c = i);
            }
          }
          setSize(e, t) {
            let i = this.resolution;
            i.set(e, t);
            let r = i.width,
              s = i.height;
            for (let e = 0, t = this.downsamplingMipmaps.length; e < t; ++e)
              (r = Math.round(0.5 * r)),
                (s = Math.round(0.5 * s)),
                this.downsamplingMipmaps[e].setSize(r, s),
                e < this.upsamplingMipmaps.length &&
                  this.upsamplingMipmaps[e].setSize(r, s);
          }
          initialize(e, t, i) {
            if (void 0 !== i) {
              let t = this.downsamplingMipmaps.concat(this.upsamplingMipmaps);
              for (let e of t) e.texture.type = i;
              if (i !== r.OUM)
                (this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH =
                  "1"),
                  (this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH =
                    "1");
              else if (null !== e && e.outputColorSpace === r.er$)
                for (let e of t) e.texture.colorSpace = r.er$;
            }
          }
          dispose() {
            for (let e of (super.dispose(),
            this.downsamplingMipmaps.concat(this.upsamplingMipmaps)))
              e.dispose();
          }
        },
        C = class extends r.Qev {
          constructor(
            e,
            t,
            {
              attributes: i = v.NONE,
              blendFunction: s = E.NORMAL,
              defines: n = new Map(),
              uniforms: a = new Map(),
              extensions: l = null,
              vertexShader: o = null,
            } = {}
          ) {
            super(),
              (this.name = e),
              (this.renderer = null),
              (this.attributes = i),
              (this.fragmentShader = t),
              (this.vertexShader = o),
              (this.defines = n),
              (this.uniforms = a),
              (this.extensions = l),
              (this.blendMode = new U(s)),
              this.blendMode.addEventListener("change", (e) =>
                this.setChanged()
              ),
              (this._inputColorSpace = r.Zr2),
              (this._outputColorSpace = r.jf0);
          }
          get inputColorSpace() {
            return this._inputColorSpace;
          }
          set inputColorSpace(e) {
            (this._inputColorSpace = e), this.setChanged();
          }
          get outputColorSpace() {
            return this._outputColorSpace;
          }
          set outputColorSpace(e) {
            (this._outputColorSpace = e), this.setChanged();
          }
          set mainScene(e) {}
          set mainCamera(e) {}
          getName() {
            return this.name;
          }
          setRenderer(e) {
            this.renderer = e;
          }
          getDefines() {
            return this.defines;
          }
          getUniforms() {
            return this.uniforms;
          }
          getExtensions() {
            return this.extensions;
          }
          getBlendMode() {
            return this.blendMode;
          }
          getAttributes() {
            return this.attributes;
          }
          setAttributes(e) {
            (this.attributes = e), this.setChanged();
          }
          getFragmentShader() {
            return this.fragmentShader;
          }
          setFragmentShader(e) {
            (this.fragmentShader = e), this.setChanged();
          }
          getVertexShader() {
            return this.vertexShader;
          }
          setVertexShader(e) {
            (this.vertexShader = e), this.setChanged();
          }
          setChanged() {
            this.dispatchEvent({ type: "change" });
          }
          setDepthTexture(e, t = r.Rkk) {}
          update(e, t, i) {}
          setSize(e, t) {}
          initialize(e, t, i) {}
          dispose() {
            for (let e of Object.keys(this)) {
              let t = this[e];
              (t instanceof r.nWS ||
                t instanceof r.imn ||
                t instanceof r.gPd ||
                t instanceof a) &&
                this[e].dispose();
            }
          }
        },
        D = class extends C {
          constructor({
            blendFunction: e = E.SCREEN,
            luminanceThreshold: t = 0.9,
            luminanceSmoothing: i = 0.025,
            mipmapBlur: s = !1,
            intensity: n = 1,
            radius: a = 0.85,
            levels: l = 8,
            kernelSize: o = A.LARGE,
            resolutionScale: u = 0.5,
            width: h = T.AUTO_SIZE,
            height: c = T.AUTO_SIZE,
            resolutionX: d = h,
            resolutionY: f = c,
          } = {}) {
            super(
              "BloomEffect",
              "#ifdef FRAMEBUFFER_PRECISION_HIGH\nuniform mediump sampler2D map;\n#else\nuniform lowp sampler2D map;\n#endif\nuniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 texel=texture2D(map,uv);outputColor=vec4(texel.rgb*intensity,texel.a);}",
              {
                blendFunction: e,
                uniforms: new Map([
                  ["map", new r.nc$(null)],
                  ["intensity", new r.nc$(n)],
                ]),
              }
            ),
              (this.renderTarget = new r.nWS(1, 1, { depthBuffer: !1 })),
              (this.renderTarget.texture.name = "Bloom.Target"),
              (this.blurPass = new R({ kernelSize: o })),
              (this.luminancePass = new I({ colorOutput: !0 })),
              (this.luminanceMaterial.threshold = t),
              (this.luminanceMaterial.smoothing = i),
              (this.mipmapBlurPass = new _()),
              (this.mipmapBlurPass.enabled = s),
              (this.mipmapBlurPass.radius = a),
              (this.mipmapBlurPass.levels = l),
              (this.uniforms.get("map").value = s
                ? this.mipmapBlurPass.texture
                : this.renderTarget.texture);
            let p = (this.resolution = new T(this, d, f, u));
            p.addEventListener("change", (e) =>
              this.setSize(p.baseWidth, p.baseHeight)
            );
          }
          get texture() {
            return this.mipmapBlurPass.enabled
              ? this.mipmapBlurPass.texture
              : this.renderTarget.texture;
          }
          getTexture() {
            return this.texture;
          }
          getResolution() {
            return this.resolution;
          }
          getBlurPass() {
            return this.blurPass;
          }
          getLuminancePass() {
            return this.luminancePass;
          }
          get luminanceMaterial() {
            return this.luminancePass.fullscreenMaterial;
          }
          getLuminanceMaterial() {
            return this.luminancePass.fullscreenMaterial;
          }
          get width() {
            return this.resolution.width;
          }
          set width(e) {
            this.resolution.preferredWidth = e;
          }
          get height() {
            return this.resolution.height;
          }
          set height(e) {
            this.resolution.preferredHeight = e;
          }
          get dithering() {
            return this.blurPass.dithering;
          }
          set dithering(e) {
            this.blurPass.dithering = e;
          }
          get kernelSize() {
            return this.blurPass.kernelSize;
          }
          set kernelSize(e) {
            this.blurPass.kernelSize = e;
          }
          get distinction() {
            return console.warn(this.name, "distinction was removed"), 1;
          }
          set distinction(e) {
            console.warn(this.name, "distinction was removed");
          }
          get intensity() {
            return this.uniforms.get("intensity").value;
          }
          set intensity(e) {
            this.uniforms.get("intensity").value = e;
          }
          getIntensity() {
            return this.intensity;
          }
          setIntensity(e) {
            this.intensity = e;
          }
          getResolutionScale() {
            return this.resolution.scale;
          }
          setResolutionScale(e) {
            this.resolution.scale = e;
          }
          update(e, t, i) {
            let r = this.renderTarget,
              s = this.luminancePass;
            s.enabled
              ? (s.render(e, t),
                this.mipmapBlurPass.enabled
                  ? this.mipmapBlurPass.render(e, s.renderTarget)
                  : this.blurPass.render(e, s.renderTarget, r))
              : this.mipmapBlurPass.enabled
              ? this.mipmapBlurPass.render(e, t)
              : this.blurPass.render(e, t, r);
          }
          setSize(e, t) {
            let i = this.resolution;
            i.setBaseSize(e, t),
              this.renderTarget.setSize(i.width, i.height),
              this.blurPass.resolution.copy(i),
              this.luminancePass.setSize(e, t),
              this.mipmapBlurPass.setSize(e, t);
          }
          initialize(e, t, i) {
            this.blurPass.initialize(e, t, i),
              this.luminancePass.initialize(e, t, i),
              this.mipmapBlurPass.initialize(e, t, i),
              void 0 !== i &&
                ((this.renderTarget.texture.type = i),
                null !== e &&
                  e.outputColorSpace === r.er$ &&
                  (this.renderTarget.texture.colorSpace = r.er$));
          }
        };
      r.BKk;
      r.BKk, r.BKk, r.GYF;
      var H =
        (r.BKk,
        r.BKk,
        class extends a {
          constructor(e, t, i = null) {
            super("RenderPass", e, t),
              (this.needsSwap = !1),
              (this.clearPass = new d()),
              (this.overrideMaterialManager = null === i ? null : new y(i)),
              (this.ignoreBackground = !1),
              (this.skipShadowMapUpdate = !1),
              (this.selection = null);
          }
          set mainScene(e) {
            this.scene = e;
          }
          set mainCamera(e) {
            this.camera = e;
          }
          get renderToScreen() {
            return super.renderToScreen;
          }
          set renderToScreen(e) {
            (super.renderToScreen = e), (this.clearPass.renderToScreen = e);
          }
          get overrideMaterial() {
            let e = this.overrideMaterialManager;
            return null !== e ? e.material : null;
          }
          set overrideMaterial(e) {
            let t = this.overrideMaterialManager;
            null !== e
              ? null !== t
                ? t.setMaterial(e)
                : (this.overrideMaterialManager = new y(e))
              : null !== t &&
                (t.dispose(), (this.overrideMaterialManager = null));
          }
          getOverrideMaterial() {
            return this.overrideMaterial;
          }
          setOverrideMaterial(e) {
            this.overrideMaterial = e;
          }
          get clear() {
            return this.clearPass.enabled;
          }
          set clear(e) {
            this.clearPass.enabled = e;
          }
          getSelection() {
            return this.selection;
          }
          setSelection(e) {
            this.selection = e;
          }
          isBackgroundDisabled() {
            return this.ignoreBackground;
          }
          setBackgroundDisabled(e) {
            this.ignoreBackground = e;
          }
          isShadowMapDisabled() {
            return this.skipShadowMapUpdate;
          }
          setShadowMapDisabled(e) {
            this.skipShadowMapUpdate = e;
          }
          getClearPass() {
            return this.clearPass;
          }
          render(e, t, i, r, s) {
            let n = this.scene,
              a = this.camera,
              l = this.selection,
              o = a.layers.mask,
              u = n.background,
              h = e.shadowMap.autoUpdate,
              c = this.renderToScreen ? null : t;
            null !== l && a.layers.set(l.getLayer()),
              this.skipShadowMapUpdate && (e.shadowMap.autoUpdate = !1),
              (this.ignoreBackground ||
                null !== this.clearPass.overrideClearColor) &&
                (n.background = null),
              this.clearPass.enabled && this.clearPass.render(e, t),
              e.setRenderTarget(c),
              null !== this.overrideMaterialManager
                ? this.overrideMaterialManager.render(e, n, a)
                : e.render(n, a),
              (a.layers.mask = o),
              (n.background = u),
              (e.shadowMap.autoUpdate = h);
          }
        });
      function P(e, t, i) {
        let r = document.createElement("canvas"),
          s = r.getContext("2d");
        if (((r.width = e), (r.height = t), i instanceof Image))
          s.drawImage(i, 0, 0);
        else {
          let r = s.createImageData(e, t);
          r.data.set(i), s.putImageData(r, 0, 0);
        }
        return r;
      }
      var N = (r.dYF, { FULL: 0 }),
        O = { DEFAULT: 0, ESKIL: 1 },
        G =
          (r.BKk,
          r.BKk,
          r.BKk,
          r.BKk,
          r.BKk,
          r.BKk,
          r.BKk,
          class extends C {
            constructor({
              blendFunction: e,
              eskil: t = !1,
              technique: i = t ? O.ESKIL : O.DEFAULT,
              offset: s = 0.5,
              darkness: n = 0.5,
            } = {}) {
              super(
                "VignetteEffect",
                "uniform float offset;uniform float darkness;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){const vec2 center=vec2(0.5);vec3 color=inputColor.rgb;\n#if VIGNETTE_TECHNIQUE == 0\nfloat d=distance(uv,center);color*=smoothstep(0.8,offset*0.799,d*(darkness+offset));\n#else\nvec2 coord=(uv-center)*vec2(offset);color=mix(color,vec3(1.0-darkness),dot(coord,coord));\n#endif\noutputColor=vec4(color,inputColor.a);}",
                {
                  blendFunction: e,
                  defines: new Map([["VIGNETTE_TECHNIQUE", i.toFixed(0)]]),
                  uniforms: new Map([
                    ["offset", new r.nc$(s)],
                    ["darkness", new r.nc$(n)],
                  ]),
                }
              );
            }
            get technique() {
              return Number(this.defines.get("VIGNETTE_TECHNIQUE"));
            }
            set technique(e) {
              this.technique !== e &&
                (this.defines.set("VIGNETTE_TECHNIQUE", e.toFixed(0)),
                this.setChanged());
            }
            get eskil() {
              return this.technique === O.ESKIL;
            }
            set eskil(e) {
              this.technique = e ? O.ESKIL : O.DEFAULT;
            }
            getTechnique() {
              return this.technique;
            }
            setTechnique(e) {
              this.technique = e;
            }
            get offset() {
              return this.uniforms.get("offset").value;
            }
            set offset(e) {
              this.uniforms.get("offset").value = e;
            }
            getOffset() {
              return this.offset;
            }
            setOffset(e) {
              this.offset = e;
            }
            get darkness() {
              return this.uniforms.get("darkness").value;
            }
            set darkness(e) {
              this.uniforms.get("darkness").value = e;
            }
            getDarkness() {
              return this.darkness;
            }
            setDarkness(e) {
              this.darkness = e;
            }
          }),
        L =
          (r.BKk,
          r.BKk,
          class extends r.BKk {
            constructor(e, t, i, s, n = !1) {
              super({
                name: "EffectMaterial",
                defines: {
                  THREE_REVISION: r.sPf.replace(/\D+/g, ""),
                  DEPTH_PACKING: "0",
                  ENCODE_OUTPUT: "1",
                },
                uniforms: {
                  inputBuffer: new r.nc$(null),
                  depthBuffer: new r.nc$(null),
                  resolution: new r.nc$(new r.I9Y()),
                  texelSize: new r.nc$(new r.I9Y()),
                  cameraNear: new r.nc$(0.3),
                  cameraFar: new r.nc$(1e3),
                  aspect: new r.nc$(1),
                  time: new r.nc$(0),
                },
                blending: r.XIg,
                toneMapped: !1,
                depthWrite: !1,
                depthTest: !1,
                dithering: n,
              }),
                e && this.setShaderParts(e),
                t && this.setDefines(t),
                i && this.setUniforms(i),
                this.copyCameraSettings(s);
            }
            set inputBuffer(e) {
              this.uniforms.inputBuffer.value = e;
            }
            setInputBuffer(e) {
              this.uniforms.inputBuffer.value = e;
            }
            get depthBuffer() {
              return this.uniforms.depthBuffer.value;
            }
            set depthBuffer(e) {
              this.uniforms.depthBuffer.value = e;
            }
            get depthPacking() {
              return Number(this.defines.DEPTH_PACKING);
            }
            set depthPacking(e) {
              (this.defines.DEPTH_PACKING = e.toFixed(0)),
                (this.needsUpdate = !0);
            }
            setDepthBuffer(e, t = r.Rkk) {
              (this.depthBuffer = e), (this.depthPacking = t);
            }
            setShaderData(e) {
              this.setShaderParts(e.shaderParts),
                this.setDefines(e.defines),
                this.setUniforms(e.uniforms),
                this.setExtensions(e.extensions);
            }
            setShaderParts(e) {
              return (
                (this.fragmentShader =
                  "#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#define packFloatToRGBA(v) packDepthToRGBA(v)\n#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)\n#ifdef FRAMEBUFFER_PRECISION_HIGH\nuniform mediump sampler2D inputBuffer;\n#else\nuniform lowp sampler2D inputBuffer;\n#endif\n#if DEPTH_PACKING == 3201\nuniform lowp sampler2D depthBuffer;\n#elif defined(GL_FRAGMENT_PRECISION_HIGH)\nuniform highp sampler2D depthBuffer;\n#else\nuniform mediump sampler2D depthBuffer;\n#endif\nuniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;vec4 sRGBToLinear(const in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}float readDepth(const in vec2 uv){\n#if DEPTH_PACKING == 3201\nreturn unpackRGBAToDepth(texture2D(depthBuffer,uv));\n#else\nreturn texture2D(depthBuffer,uv).r;\n#endif\n}float getViewZ(const in float depth){\n#ifdef PERSPECTIVE_CAMERA\nreturn perspectiveDepthToViewZ(depth,cameraNear,cameraFar);\n#else\nreturn orthographicDepthToViewZ(depth,cameraNear,cameraFar);\n#endif\n}vec3 RGBToHCV(const in vec3 RGB){vec4 P=mix(vec4(RGB.bg,-1.0,2.0/3.0),vec4(RGB.gb,0.0,-1.0/3.0),step(RGB.b,RGB.g));vec4 Q=mix(vec4(P.xyw,RGB.r),vec4(RGB.r,P.yzx),step(P.x,RGB.r));float C=Q.x-min(Q.w,Q.y);float H=abs((Q.w-Q.y)/(6.0*C+EPSILON)+Q.z);return vec3(H,C,Q.x);}vec3 RGBToHSL(const in vec3 RGB){vec3 HCV=RGBToHCV(RGB);float L=HCV.z-HCV.y*0.5;float S=HCV.y/(1.0-abs(L*2.0-1.0)+EPSILON);return vec3(HCV.x,S,L);}vec3 HueToRGB(const in float H){float R=abs(H*6.0-3.0)-1.0;float G=2.0-abs(H*6.0-2.0);float B=2.0-abs(H*6.0-4.0);return clamp(vec3(R,G,B),0.0,1.0);}vec3 HSLToRGB(const in vec3 HSL){vec3 RGB=HueToRGB(HSL.x);float C=(1.0-abs(2.0*HSL.z-1.0))*HSL.y;return(RGB-0.5)*C+HSL.z;}FRAGMENT_HEAD void main(){FRAGMENT_MAIN_UV vec4 color0=texture2D(inputBuffer,UV);vec4 color1=vec4(0.0);FRAGMENT_MAIN_IMAGE color0.a=clamp(color0.a,0.0,1.0);gl_FragColor=color0;\n#ifdef ENCODE_OUTPUT\n#include <colorspace_fragment>\n#endif\n#include <dithering_fragment>\n}"
                    .replace(m.FRAGMENT_HEAD, e.get(m.FRAGMENT_HEAD) || "")
                    .replace(
                      m.FRAGMENT_MAIN_UV,
                      e.get(m.FRAGMENT_MAIN_UV) || ""
                    )
                    .replace(
                      m.FRAGMENT_MAIN_IMAGE,
                      e.get(m.FRAGMENT_MAIN_IMAGE) || ""
                    )),
                (this.vertexShader =
                  "uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}"
                    .replace(m.VERTEX_HEAD, e.get(m.VERTEX_HEAD) || "")
                    .replace(
                      m.VERTEX_MAIN_SUPPORT,
                      e.get(m.VERTEX_MAIN_SUPPORT) || ""
                    )),
                (this.needsUpdate = !0),
                this
              );
            }
            setDefines(e) {
              for (let t of e.entries()) this.defines[t[0]] = t[1];
              return (this.needsUpdate = !0), this;
            }
            setUniforms(e) {
              for (let t of e.entries()) this.uniforms[t[0]] = t[1];
              return this;
            }
            setExtensions(e) {
              for (let t of ((this.extensions = {}), e))
                this.extensions[t] = !0;
              return this;
            }
            get encodeOutput() {
              return void 0 !== this.defines.ENCODE_OUTPUT;
            }
            set encodeOutput(e) {
              this.encodeOutput !== e &&
                (e
                  ? (this.defines.ENCODE_OUTPUT = "1")
                  : delete this.defines.ENCODE_OUTPUT,
                (this.needsUpdate = !0));
            }
            isOutputEncodingEnabled(e) {
              return this.encodeOutput;
            }
            setOutputEncodingEnabled(e) {
              this.encodeOutput = e;
            }
            get time() {
              return this.uniforms.time.value;
            }
            set time(e) {
              this.uniforms.time.value = e;
            }
            setDeltaTime(e) {
              this.uniforms.time.value += e;
            }
            adoptCameraSettings(e) {
              this.copyCameraSettings(e);
            }
            copyCameraSettings(e) {
              e &&
                ((this.uniforms.cameraNear.value = e.near),
                (this.uniforms.cameraFar.value = e.far),
                e instanceof r.ubm
                  ? (this.defines.PERSPECTIVE_CAMERA = "1")
                  : delete this.defines.PERSPECTIVE_CAMERA,
                (this.needsUpdate = !0));
            }
            setSize(e, t) {
              let i = this.uniforms;
              i.resolution.value.set(e, t),
                i.texelSize.value.set(1 / e, 1 / t),
                (i.aspect.value = e / t);
            }
            static get Section() {
              return m;
            }
          }),
        k = (r.BKk, r.sPf.replace(/\D+/g, ""), 255 / 256);
      function V(e, t, i) {
        for (let r of t) {
          let t = "$1" + e + r.charAt(0).toUpperCase() + r.slice(1),
            s = RegExp("([^\\.])(\\b" + r + "\\b)", "g");
          for (let e of i.entries())
            null !== e[1] && i.set(e[0], e[1].replace(s, t));
        }
      }
      new Float32Array([
        255 / 256 / 0x1000000,
        255 / 256 / 65536,
        255 / 256 / 256,
        255 / 256,
      ]),
        new Float32Array([k, k / 256, k / 65536, 1 / 0x1000000]);
      var $ = class extends a {
        constructor(e, ...t) {
          super("EffectPass"),
            (this.fullscreenMaterial = new L(null, null, null, e)),
            (this.listener = (e) => this.handleEvent(e)),
            (this.effects = []),
            this.setEffects(t),
            (this.skipRendering = !1),
            (this.minTime = 1),
            (this.maxTime = Number.POSITIVE_INFINITY),
            (this.timeScale = 1);
        }
        set mainScene(e) {
          for (let t of this.effects) t.mainScene = e;
        }
        set mainCamera(e) {
          for (let t of (this.fullscreenMaterial.copyCameraSettings(e),
          this.effects))
            t.mainCamera = e;
        }
        get encodeOutput() {
          return this.fullscreenMaterial.encodeOutput;
        }
        set encodeOutput(e) {
          this.fullscreenMaterial.encodeOutput = e;
        }
        get dithering() {
          return this.fullscreenMaterial.dithering;
        }
        set dithering(e) {
          let t = this.fullscreenMaterial;
          (t.dithering = e), (t.needsUpdate = !0);
        }
        setEffects(e) {
          for (let e of this.effects)
            e.removeEventListener("change", this.listener);
          for (let t of ((this.effects = e.sort(
            (e, t) => t.attributes - e.attributes
          )),
          this.effects))
            t.addEventListener("change", this.listener);
        }
        updateMaterial() {
          let e = new g(),
            t = 0;
          for (let i of this.effects)
            if (i.blendMode.blendFunction === E.DST)
              e.attributes |= i.getAttributes() & v.DEPTH;
            else if ((e.attributes & i.getAttributes() & v.CONVOLUTION) != 0)
              throw Error(`Convolution effects cannot be merged (${i.name})`);
            else
              !(function (e, t, i) {
                let s = t.getFragmentShader(),
                  n = t.getVertexShader(),
                  a = void 0 !== s && /mainImage/.test(s),
                  l = void 0 !== s && /mainUv/.test(s);
                if (((i.attributes |= t.getAttributes()), void 0 === s))
                  throw Error(`Missing fragment shader (${t.name})`);
                if (l && (i.attributes & v.CONVOLUTION) != 0)
                  throw Error(
                    `Effects that transform UVs are incompatible with convolution effects (${t.name})`
                  );
                if (a || l) {
                  let o = /\w+\s+(\w+)\([\w\s,]*\)\s*{/g,
                    u = i.shaderParts,
                    h = u.get(m.FRAGMENT_HEAD) || "",
                    c = u.get(m.FRAGMENT_MAIN_UV) || "",
                    d = u.get(m.FRAGMENT_MAIN_IMAGE) || "",
                    f = u.get(m.VERTEX_HEAD) || "",
                    p = u.get(m.VERTEX_MAIN_SUPPORT) || "",
                    g = new Set(),
                    S = new Set();
                  if (
                    (l &&
                      ((c += `	${e}MainUv(UV);
`),
                      (i.uvTransformation = !0)),
                    null !== n && /mainSupport/.test(n))
                  ) {
                    let t = /mainSupport *\([\w\s]*?uv\s*?\)/.test(n);
                    for (let r of ((p += `	${e}MainSupport(`),
                    (p += t ? "vUv);\n" : ");\n"),
                    n.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g)))
                      for (let e of r[1].split(/\s*,\s*/))
                        i.varyings.add(e), g.add(e), S.add(e);
                    for (let e of n.matchAll(o)) S.add(e[1]);
                  }
                  for (let e of s.matchAll(o)) S.add(e[1]);
                  for (let e of t.defines.keys())
                    S.add(e.replace(/\([\w\s,]*\)/g, ""));
                  for (let e of t.uniforms.keys()) S.add(e);
                  S.delete("while"),
                    S.delete("for"),
                    S.delete("if"),
                    t.uniforms.forEach((t, r) =>
                      i.uniforms.set(
                        e + r.charAt(0).toUpperCase() + r.slice(1),
                        t
                      )
                    ),
                    t.defines.forEach((t, r) =>
                      i.defines.set(
                        e + r.charAt(0).toUpperCase() + r.slice(1),
                        t
                      )
                    );
                  let x = new Map([
                    ["fragment", s],
                    ["vertex", n],
                  ]);
                  V(e, S, i.defines),
                    V(e, S, x),
                    (s = x.get("fragment")),
                    (n = x.get("vertex"));
                  let y = t.blendMode;
                  if ((i.blendModes.set(y.blendFunction, y), a)) {
                    null !== t.inputColorSpace &&
                      t.inputColorSpace !== i.colorSpace &&
                      (d +=
                        t.inputColorSpace === r.er$
                          ? "color0 = sRGBTransferOETF(color0);\n	"
                          : "color0 = sRGBToLinear(color0);\n	"),
                      t.outputColorSpace !== r.jf0
                        ? (i.colorSpace = t.outputColorSpace)
                        : null !== t.inputColorSpace &&
                          (i.colorSpace = t.inputColorSpace),
                      (d += `${e}MainImage(color0, UV, `),
                      (i.attributes & v.DEPTH) != 0 &&
                        /MainImage *\([\w\s,]*?depth[\w\s,]*?\)/.test(s) &&
                        ((d += "depth, "), (i.readDepth = !0)),
                      (d += "color1);\n	");
                    let n = e + "BlendOpacity";
                    i.uniforms.set(n, y.opacity),
                      (d += `color0 = blend${y.blendFunction}(color0, color1, ${n});

	`),
                      (h += `uniform float ${n};

`);
                  }
                  if (
                    ((h += s + "\n"),
                    null !== n && (f += n + "\n"),
                    u.set(m.FRAGMENT_HEAD, h),
                    u.set(m.FRAGMENT_MAIN_UV, c),
                    u.set(m.FRAGMENT_MAIN_IMAGE, d),
                    u.set(m.VERTEX_HEAD, f),
                    u.set(m.VERTEX_MAIN_SUPPORT, p),
                    null !== t.extensions)
                  )
                    for (let e of t.extensions) i.extensions.add(e);
                } else
                  throw Error(
                    `Could not find mainImage or mainUv function (${t.name})`
                  );
              })("e" + t++, i, e);
          let i = e.shaderParts.get(m.FRAGMENT_HEAD),
            s = e.shaderParts.get(m.FRAGMENT_MAIN_IMAGE),
            n = e.shaderParts.get(m.FRAGMENT_MAIN_UV),
            a = /\bblend\b/g;
          for (let t of e.blendModes.values())
            i += t.getShaderCode().replace(a, `blend${t.blendFunction}`) + "\n";
          for (let [t, a] of ((e.attributes & v.DEPTH) != 0
            ? (e.readDepth && (s = "float depth = readDepth(UV);\n\n	" + s),
              (this.needsDepthTexture = null === this.getDepthTexture()))
            : (this.needsDepthTexture = !1),
          e.colorSpace === r.er$ && (s += "color0 = sRGBToLinear(color0);\n	"),
          e.uvTransformation
            ? ((n = "vec2 transformedUv = vUv;\n" + n),
              e.defines.set("UV", "transformedUv"))
            : e.defines.set("UV", "vUv"),
          e.shaderParts.set(m.FRAGMENT_HEAD, i),
          e.shaderParts.set(m.FRAGMENT_MAIN_IMAGE, s),
          e.shaderParts.set(m.FRAGMENT_MAIN_UV, n),
          e.shaderParts))
            null !== a && e.shaderParts.set(t, a.trim().replace(/^#/, "\n#"));
          (this.skipRendering = 0 === t),
            (this.needsSwap = !this.skipRendering),
            this.fullscreenMaterial.setShaderData(e);
        }
        recompile() {
          this.updateMaterial();
        }
        getDepthTexture() {
          return this.fullscreenMaterial.depthBuffer;
        }
        setDepthTexture(e, t = r.Rkk) {
          for (let i of ((this.fullscreenMaterial.depthBuffer = e),
          (this.fullscreenMaterial.depthPacking = t),
          this.effects))
            i.setDepthTexture(e, t);
        }
        render(e, t, i, r, s) {
          for (let i of this.effects) i.update(e, t, r);
          if (!this.skipRendering || this.renderToScreen) {
            let s = this.fullscreenMaterial;
            (s.inputBuffer = t.texture),
              (s.time += r * this.timeScale),
              e.setRenderTarget(this.renderToScreen ? null : i),
              e.render(this.scene, this.camera);
          }
        }
        setSize(e, t) {
          for (let i of (this.fullscreenMaterial.setSize(e, t), this.effects))
            i.setSize(e, t);
        }
        initialize(e, t, i) {
          for (let r of ((this.renderer = e), this.effects))
            r.initialize(e, t, i);
          this.updateMaterial(),
            void 0 !== i &&
              i !== r.OUM &&
              (this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH =
                "1");
        }
        dispose() {
          for (let e of (super.dispose(), this.effects))
            e.removeEventListener("change", this.listener), e.dispose();
        }
        handleEvent(e) {
          "change" === e.type && this.recompile();
        }
      };
      new Float32Array(3),
        new Float32Array(3),
        new Float32Array(3),
        new Float32Array(3),
        new Float32Array(3),
        new Float32Array(3),
        new Float32Array([0, 0, 0]),
        new Float32Array([1, 0, 0]),
        new Float32Array([1, 1, 0]),
        new Float32Array([1, 1, 1]),
        new Float32Array([0, 0, 0]),
        new Float32Array([1, 0, 0]),
        new Float32Array([1, 0, 1]),
        new Float32Array([1, 1, 1]),
        new Float32Array([0, 0, 0]),
        new Float32Array([0, 0, 1]),
        new Float32Array([1, 0, 1]),
        new Float32Array([1, 1, 1]),
        new Float32Array([0, 0, 0]),
        new Float32Array([0, 1, 0]),
        new Float32Array([1, 1, 0]),
        new Float32Array([1, 1, 1]),
        new Float32Array([0, 0, 0]),
        new Float32Array([0, 1, 0]),
        new Float32Array([0, 1, 1]),
        new Float32Array([1, 1, 1]),
        new Float32Array([0, 0, 0]),
        new Float32Array([0, 0, 1]),
        new Float32Array([0, 1, 1]),
        new Float32Array([1, 1, 1]);
      var K = [new Float32Array(2), new Float32Array(2)],
        W =
          (new Float32Array([0, -0.25, 0.25, -0.125, 0.125, -0.375, 0.375]),
          new Float32Array([0, 0]),
          new Float32Array([0.25, -0.25]),
          new Float32Array([-0.25, 0.25]),
          new Float32Array([0.125, -0.125]),
          new Float32Array([-0.125, 0.125]),
          new Uint8Array([0, 0]),
          new Uint8Array([3, 0]),
          new Uint8Array([0, 3]),
          new Uint8Array([3, 3]),
          new Uint8Array([1, 0]),
          new Uint8Array([4, 0]),
          new Uint8Array([1, 3]),
          new Uint8Array([4, 3]),
          new Uint8Array([0, 1]),
          new Uint8Array([3, 1]),
          new Uint8Array([0, 4]),
          new Uint8Array([3, 4]),
          new Uint8Array([1, 1]),
          new Uint8Array([4, 1]),
          new Uint8Array([1, 4]),
          new Uint8Array([4, 4]),
          [
            new Uint8Array([0, 0]),
            new Uint8Array([1, 0]),
            new Uint8Array([0, 2]),
            new Uint8Array([1, 2]),
            new Uint8Array([2, 0]),
            new Uint8Array([3, 0]),
            new Uint8Array([2, 2]),
            new Uint8Array([3, 2]),
            new Uint8Array([0, 1]),
            new Uint8Array([1, 1]),
            new Uint8Array([0, 3]),
            new Uint8Array([1, 3]),
            new Uint8Array([2, 1]),
            new Uint8Array([3, 1]),
            new Uint8Array([2, 3]),
            new Uint8Array([3, 3]),
          ]);
      function X(e, t, i, r, s, n) {
        let a = 0;
        for (let l = 0; l < 30; ++l)
          for (let o = 0; o < 30; ++o)
            (function (e, t, i, r, s, n) {
              let a = e === i && t === r;
              return (
                a ||
                  (a =
                    (r - t) * (s - (e + i) / 2) + (e - i) * (n - (t + r) / 2) >
                    0),
                a
              );
            })(e, t, i, r, s + o / 29, n + l / 29) && ++a;
        return a / 900;
      }
      function Y(e, t, i, r) {
        var s;
        return (s = e + (t - e) * 0.75) + (i + (r - i) * 0.75 - s) * 0.875;
      }
      Y(0, 0, 0, 0),
        new Float32Array([0, 0, 0, 0]),
        Y(0, 0, 0, 1),
        new Float32Array([0, 0, 0, 1]),
        Y(0, 0, 1, 0),
        new Float32Array([0, 0, 1, 0]),
        Y(0, 0, 1, 1),
        new Float32Array([0, 0, 1, 1]),
        Y(0, 1, 0, 0),
        new Float32Array([0, 1, 0, 0]),
        Y(0, 1, 0, 1),
        new Float32Array([0, 1, 0, 1]),
        Y(0, 1, 1, 0),
        new Float32Array([0, 1, 1, 0]),
        Y(0, 1, 1, 1),
        new Float32Array([0, 1, 1, 1]),
        Y(1, 0, 0, 0),
        new Float32Array([1, 0, 0, 0]),
        Y(1, 0, 0, 1),
        new Float32Array([1, 0, 0, 1]),
        Y(1, 0, 1, 0),
        new Float32Array([1, 0, 1, 0]),
        Y(1, 0, 1, 1),
        new Float32Array([1, 0, 1, 1]),
        Y(1, 1, 0, 0),
        new Float32Array([1, 1, 0, 0]),
        Y(1, 1, 0, 1),
        new Float32Array([1, 1, 0, 1]),
        Y(1, 1, 1, 0),
        new Float32Array([1, 1, 1, 0]),
        Y(1, 1, 1, 1),
        new Float32Array([1, 1, 1, 1]);
    },
  },
]);
