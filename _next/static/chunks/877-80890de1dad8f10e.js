"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [877],
  {
    86481: (t, e, i) => {
      i.d(e, { P: () => eh });
      var s = i(64474),
        o = i(96233),
        n = i(16738),
        r = i(29200),
        a = i(35971),
        l = i(38792),
        h = i(65749),
        u = i(66203),
        d = i(14302),
        c = i(21594),
        m = i(15068);
      let p = (t, e) => Math.abs(t - e);
      var f = i(61789),
        g = i(78086);
      class v {
        constructor(
          t,
          e,
          {
            transformPagePoint: i,
            contextWindow: s,
            dragSnapToOrigin: o = !1,
          } = {}
        ) {
          if (
            ((this.startEvent = null),
            (this.lastMoveEvent = null),
            (this.lastMoveEventInfo = null),
            (this.handlers = {}),
            (this.contextWindow = window),
            (this.updatePoint = () => {
              if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
              let t = P(this.lastMoveEventInfo, this.history),
                e = null !== this.startEvent,
                i =
                  (function (t, e) {
                    return Math.sqrt(p(t.x, e.x) ** 2 + p(t.y, e.y) ** 2);
                  })(t.offset, { x: 0, y: 0 }) >= 3;
              if (!e && !i) return;
              let { point: s } = t,
                { timestamp: o } = g.uv;
              this.history.push({ ...s, timestamp: o });
              let { onStart: n, onMove: r } = this.handlers;
              e ||
                (n && n(this.lastMoveEvent, t),
                (this.startEvent = this.lastMoveEvent)),
                r && r(this.lastMoveEvent, t);
            }),
            (this.handlePointerMove = (t, e) => {
              (this.lastMoveEvent = t),
                (this.lastMoveEventInfo = y(e, this.transformPagePoint)),
                g.Gt.update(this.updatePoint, !0);
            }),
            (this.handlePointerUp = (t, e) => {
              this.end();
              let {
                onEnd: i,
                onSessionEnd: s,
                resumeAnimation: o,
              } = this.handlers;
              if (
                (this.dragSnapToOrigin && o && o(),
                !(this.lastMoveEvent && this.lastMoveEventInfo))
              )
                return;
              let n = P(
                "pointercancel" === t.type
                  ? this.lastMoveEventInfo
                  : y(e, this.transformPagePoint),
                this.history
              );
              this.startEvent && i && i(t, n), s && s(t, n);
            }),
            !(0, f.M)(t))
          )
            return;
          (this.dragSnapToOrigin = o),
            (this.handlers = e),
            (this.transformPagePoint = i),
            (this.contextWindow = s || window);
          let n = y((0, u.e)(t), this.transformPagePoint),
            { point: r } = n,
            { timestamp: a } = g.uv;
          this.history = [{ ...r, timestamp: a }];
          let { onSessionStart: l } = e;
          l && l(t, P(n, this.history)),
            (this.removeListeners = (0, m.F)(
              (0, c.h)(
                this.contextWindow,
                "pointermove",
                this.handlePointerMove
              ),
              (0, c.h)(this.contextWindow, "pointerup", this.handlePointerUp),
              (0, c.h)(
                this.contextWindow,
                "pointercancel",
                this.handlePointerUp
              )
            ));
        }
        updateHandlers(t) {
          this.handlers = t;
        }
        end() {
          this.removeListeners && this.removeListeners(),
            (0, g.WG)(this.updatePoint);
        }
      }
      function y(t, e) {
        return e ? { point: e(t.point) } : t;
      }
      function x(t, e) {
        return { x: t.x - e.x, y: t.y - e.y };
      }
      function P({ point: t }, e) {
        return {
          point: t,
          delta: x(t, T(e)),
          offset: x(t, e[0]),
          velocity: (function (t, e) {
            if (t.length < 2) return { x: 0, y: 0 };
            let i = t.length - 1,
              s = null,
              o = T(t);
            for (
              ;
              i >= 0 &&
              ((s = t[i]), !(o.timestamp - s.timestamp > (0, d.f)(0.1)));

            )
              i--;
            if (!s) return { x: 0, y: 0 };
            let n = (0, d.X)(o.timestamp - s.timestamp);
            if (0 === n) return { x: 0, y: 0 };
            let r = { x: (o.x - s.x) / n, y: (o.y - s.y) / n };
            return r.x === 1 / 0 && (r.x = 0), r.y === 1 / 0 && (r.y = 0), r;
          })(e, 0),
        };
      }
      function T(t) {
        return t[t.length - 1];
      }
      var E = i(42561),
        D = i(78674),
        L = i(26781),
        S = i(53935);
      function j(t) {
        return t.max - t.min;
      }
      function A(t, e = 0, i = 0.01) {
        return Math.abs(t - e) <= i;
      }
      function R(t, e, i, s = 0.5) {
        (t.origin = s),
          (t.originPoint = (0, S.j)(e.min, e.max, t.origin)),
          (t.scale = j(i) / j(e)),
          (A(t.scale, 1, 1e-4) || isNaN(t.scale)) && (t.scale = 1),
          (t.translate = (0, S.j)(i.min, i.max, t.origin) - t.originPoint),
          (A(t.translate) || isNaN(t.translate)) && (t.translate = 0);
      }
      function w(t, e, i, s) {
        R(t.x, e.x, i.x, s ? s.originX : void 0),
          R(t.y, e.y, i.y, s ? s.originY : void 0);
      }
      function B(t, e, i) {
        (t.min = i.min + e.min), (t.max = t.min + j(e));
      }
      function b(t, e, i) {
        (t.min = e.min - i.min), (t.max = t.min + j(e));
      }
      function M(t, e, i) {
        b(t.x, e.x, i.x), b(t.y, e.y, i.y);
      }
      var V = i(16611);
      function k(t, e, i) {
        return {
          min: void 0 !== e ? t.min + e : void 0,
          max: void 0 !== i ? t.max + i - (t.max - t.min) : void 0,
        };
      }
      function C(t, e) {
        let i = e.min - t.min,
          s = e.max - t.max;
        return (
          e.max - e.min < t.max - t.min && ([i, s] = [s, i]), { min: i, max: s }
        );
      }
      function U(t, e, i) {
        return { min: F(t, e), max: F(t, i) };
      }
      function F(t, e) {
        return "number" == typeof t ? t : t[e] || 0;
      }
      var G = i(27865);
      function W(t) {
        return [t("x"), t("y")];
      }
      var O = i(77106),
        H = i(65599),
        N = i(85677),
        z = i(43406),
        I = i(46117);
      let X = ({ current: t }) => (t ? t.ownerDocument.defaultView : null),
        $ = new WeakMap();
      class q {
        constructor(t) {
          (this.openGlobalLock = null),
            (this.isDragging = !1),
            (this.currentDirection = null),
            (this.originPoint = { x: 0, y: 0 }),
            (this.constraints = !1),
            (this.hasMutatedConstraints = !1),
            (this.elastic = (0, G.ge)()),
            (this.visualElement = t);
        }
        start(t, { snapToCursor: e = !1 } = {}) {
          let { presenceContext: i } = this.visualElement;
          if (i && !1 === i.isPresent) return;
          let { dragSnapToOrigin: s } = this.getProps();
          this.panSession = new v(
            t,
            {
              onSessionStart: (t) => {
                let { dragSnapToOrigin: i } = this.getProps();
                i ? this.pauseAnimation() : this.stopAnimation(),
                  e && this.snapToCursor((0, u.e)(t, "page").point);
              },
              onStart: (t, e) => {
                let {
                  drag: i,
                  dragPropagation: s,
                  onDragStart: o,
                } = this.getProps();
                if (
                  i &&
                  !s &&
                  (this.openGlobalLock && this.openGlobalLock(),
                  (this.openGlobalLock = (0, E.nQ)(i)),
                  !this.openGlobalLock)
                )
                  return;
                (this.isDragging = !0),
                  (this.currentDirection = null),
                  this.resolveConstraints(),
                  this.visualElement.projection &&
                    ((this.visualElement.projection.isAnimationBlocked = !0),
                    (this.visualElement.projection.target = void 0)),
                  W((t) => {
                    let e = this.getAxisMotionValue(t).get() || 0;
                    if (z.KN.test(e)) {
                      let { projection: i } = this.visualElement;
                      if (i && i.layout) {
                        let s = i.layout.layoutBox[t];
                        s && (e = j(s) * (parseFloat(e) / 100));
                      }
                    }
                    this.originPoint[t] = e;
                  }),
                  o && g.Gt.update(() => o(t, e), !1, !0);
                let { animationState: n } = this.visualElement;
                n && n.setActive("whileDrag", !0);
              },
              onMove: (t, e) => {
                let {
                  dragPropagation: i,
                  dragDirectionLock: s,
                  onDirectionLock: o,
                  onDrag: n,
                } = this.getProps();
                if (!i && !this.openGlobalLock) return;
                let { offset: r } = e;
                if (s && null === this.currentDirection) {
                  (this.currentDirection = (function (t, e = 10) {
                    let i = null;
                    return (
                      Math.abs(t.y) > e
                        ? (i = "y")
                        : Math.abs(t.x) > e && (i = "x"),
                      i
                    );
                  })(r)),
                    null !== this.currentDirection &&
                      o &&
                      o(this.currentDirection);
                  return;
                }
                this.updateAxis("x", e.point, r),
                  this.updateAxis("y", e.point, r),
                  this.visualElement.render(),
                  n && n(t, e);
              },
              onSessionEnd: (t, e) => this.stop(t, e),
              resumeAnimation: () =>
                W((t) => {
                  var e;
                  return (
                    "paused" === this.getAnimationState(t) &&
                    (null === (e = this.getAxisMotionValue(t).animation) ||
                    void 0 === e
                      ? void 0
                      : e.play())
                  );
                }),
            },
            {
              transformPagePoint: this.visualElement.getTransformPagePoint(),
              dragSnapToOrigin: s,
              contextWindow: X(this.visualElement),
            }
          );
        }
        stop(t, e) {
          let i = this.isDragging;
          if ((this.cancel(), !i)) return;
          let { velocity: s } = e;
          this.startAnimation(s);
          let { onDragEnd: o } = this.getProps();
          o && g.Gt.update(() => o(t, e));
        }
        cancel() {
          this.isDragging = !1;
          let { projection: t, animationState: e } = this.visualElement;
          t && (t.isAnimationBlocked = !1),
            this.panSession && this.panSession.end(),
            (this.panSession = void 0);
          let { dragPropagation: i } = this.getProps();
          !i &&
            this.openGlobalLock &&
            (this.openGlobalLock(), (this.openGlobalLock = null)),
            e && e.setActive("whileDrag", !1);
        }
        updateAxis(t, e, i) {
          let { drag: s } = this.getProps();
          if (!i || !Q(t, s, this.currentDirection)) return;
          let o = this.getAxisMotionValue(t),
            n = this.originPoint[t] + i[t];
          this.constraints &&
            this.constraints[t] &&
            (n = (function (t, { min: e, max: i }, s) {
              return (
                void 0 !== e && t < e
                  ? (t = s ? (0, S.j)(e, t, s.min) : Math.max(t, e))
                  : void 0 !== i &&
                    t > i &&
                    (t = s ? (0, S.j)(i, t, s.max) : Math.min(t, i)),
                t
              );
            })(n, this.constraints[t], this.elastic[t])),
            o.set(n);
        }
        resolveConstraints() {
          var t;
          let { dragConstraints: e, dragElastic: i } = this.getProps(),
            s =
              this.visualElement.projection &&
              !this.visualElement.projection.layout
                ? this.visualElement.projection.measure(!1)
                : null === (t = this.visualElement.projection) || void 0 === t
                ? void 0
                : t.layout,
            o = this.constraints;
          e && (0, D.X)(e)
            ? this.constraints ||
              (this.constraints = this.resolveRefConstraints())
            : e && s
            ? (this.constraints = (function (
                t,
                { top: e, left: i, bottom: s, right: o }
              ) {
                return { x: k(t.x, i, o), y: k(t.y, e, s) };
              })(s.layoutBox, e))
            : (this.constraints = !1),
            (this.elastic = (function (t = 0.35) {
              return (
                !1 === t ? (t = 0) : !0 === t && (t = 0.35),
                { x: U(t, "left", "right"), y: U(t, "top", "bottom") }
              );
            })(i)),
            o !== this.constraints &&
              s &&
              this.constraints &&
              !this.hasMutatedConstraints &&
              W((t) => {
                this.getAxisMotionValue(t) &&
                  (this.constraints[t] = (function (t, e) {
                    let i = {};
                    return (
                      void 0 !== e.min && (i.min = e.min - t.min),
                      void 0 !== e.max && (i.max = e.max - t.min),
                      i
                    );
                  })(s.layoutBox[t], this.constraints[t]));
              });
        }
        resolveRefConstraints() {
          var t;
          let { dragConstraints: e, onMeasureDragConstraints: i } =
            this.getProps();
          if (!e || !(0, D.X)(e)) return !1;
          let s = e.current;
          (0, h.V)(
            null !== s,
            "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop."
          );
          let { projection: o } = this.visualElement;
          if (!o || !o.layout) return !1;
          let n = (0, O.L)(
              s,
              o.root,
              this.visualElement.getTransformPagePoint()
            ),
            r = { x: C((t = o.layout.layoutBox).x, n.x), y: C(t.y, n.y) };
          if (i) {
            let t = i((0, H.pA)(r));
            (this.hasMutatedConstraints = !!t), t && (r = (0, H.FY)(t));
          }
          return r;
        }
        startAnimation(t) {
          let {
              drag: e,
              dragMomentum: i,
              dragElastic: s,
              dragTransition: o,
              dragSnapToOrigin: n,
              onDragTransitionEnd: r,
            } = this.getProps(),
            a = this.constraints || {};
          return Promise.all(
            W((r) => {
              if (!Q(r, e, this.currentDirection)) return;
              let l = (a && a[r]) || {};
              n && (l = { min: 0, max: 0 });
              let h = {
                type: "inertia",
                velocity: i ? t[r] : 0,
                bounceStiffness: s ? 200 : 1e6,
                bounceDamping: s ? 40 : 1e7,
                timeConstant: 750,
                restDelta: 1,
                restSpeed: 10,
                ...o,
                ...l,
              };
              return this.startAxisValueAnimation(r, h);
            })
          ).then(r);
        }
        startAxisValueAnimation(t, e) {
          let i = this.getAxisMotionValue(t);
          return i.start((0, I.f)(t, i, 0, e));
        }
        stopAnimation() {
          W((t) => this.getAxisMotionValue(t).stop());
        }
        pauseAnimation() {
          W((t) => {
            var e;
            return null === (e = this.getAxisMotionValue(t).animation) ||
              void 0 === e
              ? void 0
              : e.pause();
          });
        }
        getAnimationState(t) {
          var e;
          return null === (e = this.getAxisMotionValue(t).animation) ||
            void 0 === e
            ? void 0
            : e.state;
        }
        getAxisMotionValue(t) {
          let e = "_drag" + t.toUpperCase(),
            i = this.visualElement.getProps();
          return (
            i[e] ||
            this.visualElement.getValue(
              t,
              (i.initial ? i.initial[t] : void 0) || 0
            )
          );
        }
        snapToCursor(t) {
          W((e) => {
            let { drag: i } = this.getProps();
            if (!Q(e, i, this.currentDirection)) return;
            let { projection: s } = this.visualElement,
              o = this.getAxisMotionValue(e);
            if (s && s.layout) {
              let { min: i, max: n } = s.layout.layoutBox[e];
              o.set(t[e] - (0, S.j)(i, n, 0.5));
            }
          });
        }
        scalePositionWithinConstraints() {
          if (!this.visualElement.current) return;
          let { drag: t, dragConstraints: e } = this.getProps(),
            { projection: i } = this.visualElement;
          if (!(0, D.X)(e) || !i || !this.constraints) return;
          this.stopAnimation();
          let s = { x: 0, y: 0 };
          W((t) => {
            let e = this.getAxisMotionValue(t);
            if (e) {
              let i = e.get();
              s[t] = (function (t, e) {
                let i = 0.5,
                  s = j(t),
                  o = j(e);
                return (
                  o > s
                    ? (i = (0, L.q)(e.min, e.max - s, t.min))
                    : s > o && (i = (0, L.q)(t.min, t.max - o, e.min)),
                  (0, V.q)(0, 1, i)
                );
              })({ min: i, max: i }, this.constraints[t]);
            }
          });
          let { transformTemplate: o } = this.visualElement.getProps();
          (this.visualElement.current.style.transform = o ? o({}, "") : "none"),
            i.root && i.root.updateScroll(),
            i.updateLayout(),
            this.resolveConstraints(),
            W((e) => {
              if (!Q(e, t, null)) return;
              let i = this.getAxisMotionValue(e),
                { min: o, max: n } = this.constraints[e];
              i.set((0, S.j)(o, n, s[e]));
            });
        }
        addListeners() {
          if (!this.visualElement.current) return;
          $.set(this.visualElement, this);
          let t = this.visualElement.current,
            e = (0, c.h)(t, "pointerdown", (t) => {
              let { drag: e, dragListener: i = !0 } = this.getProps();
              e && i && this.start(t);
            }),
            i = () => {
              let { dragConstraints: t } = this.getProps();
              (0, D.X)(t) && (this.constraints = this.resolveRefConstraints());
            },
            { projection: s } = this.visualElement,
            o = s.addEventListener("measure", i);
          s && !s.layout && (s.root && s.root.updateScroll(), s.updateLayout()),
            i();
          let n = (0, N.k)(window, "resize", () =>
              this.scalePositionWithinConstraints()
            ),
            r = s.addEventListener(
              "didUpdate",
              ({ delta: t, hasLayoutChanged: e }) => {
                this.isDragging &&
                  e &&
                  (W((e) => {
                    let i = this.getAxisMotionValue(e);
                    i &&
                      ((this.originPoint[e] += t[e].translate),
                      i.set(i.get() + t[e].translate));
                  }),
                  this.visualElement.render());
              }
            );
          return () => {
            n(), e(), o(), r && r();
          };
        }
        getProps() {
          let t = this.visualElement.getProps(),
            {
              drag: e = !1,
              dragDirectionLock: i = !1,
              dragPropagation: s = !1,
              dragConstraints: o = !1,
              dragElastic: n = 0.35,
              dragMomentum: r = !0,
            } = t;
          return {
            ...t,
            drag: e,
            dragDirectionLock: i,
            dragPropagation: s,
            dragConstraints: o,
            dragElastic: n,
            dragMomentum: r,
          };
        }
      }
      function Q(t, e, i) {
        return (!0 === e || e === t) && (null === i || i === t);
      }
      class Y extends a.X {
        constructor(t) {
          super(t),
            (this.removeGroupControls = l.l),
            (this.removeListeners = l.l),
            (this.controls = new q(t));
        }
        mount() {
          let { dragControls: t } = this.node.getProps();
          t && (this.removeGroupControls = t.subscribe(this.controls)),
            (this.removeListeners = this.controls.addListeners() || l.l);
        }
        unmount() {
          this.removeGroupControls(), this.removeListeners();
        }
      }
      let K = (t) => (e, i) => {
        t && g.Gt.update(() => t(e, i));
      };
      class _ extends a.X {
        constructor() {
          super(...arguments), (this.removePointerDownListener = l.l);
        }
        onPointerDown(t) {
          this.session = new v(t, this.createPanHandlers(), {
            transformPagePoint: this.node.getTransformPagePoint(),
            contextWindow: X(this.node),
          });
        }
        createPanHandlers() {
          let {
            onPanSessionStart: t,
            onPanStart: e,
            onPan: i,
            onPanEnd: s,
          } = this.node.getProps();
          return {
            onSessionStart: K(t),
            onStart: K(e),
            onMove: i,
            onEnd: (t, e) => {
              delete this.session, s && g.Gt.update(() => s(t, e));
            },
          };
        }
        mount() {
          this.removePointerDownListener = (0, c.h)(
            this.node.current,
            "pointerdown",
            (t) => this.onPointerDown(t)
          );
        }
        update() {
          this.session && this.session.updateHandlers(this.createPanHandlers());
        }
        unmount() {
          this.removePointerDownListener(), this.session && this.session.end();
        }
      }
      var Z = i(12115),
        J = i(39656),
        tt = i(64710),
        te = i(15750);
      let ti = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
      function ts(t, e) {
        return e.max === e.min ? 0 : (t / (e.max - e.min)) * 100;
      }
      let to = {
        correct: (t, e) => {
          if (!e.target) return t;
          if ("string" == typeof t) {
            if (!z.px.test(t)) return t;
            t = parseFloat(t);
          }
          let i = ts(t, e.target.x),
            s = ts(t, e.target.y);
          return `${i}% ${s}%`;
        },
      };
      var tn = i(99605),
        tr = i(63154);
      class ta extends Z.Component {
        componentDidMount() {
          let {
              visualElement: t,
              layoutGroup: e,
              switchLayoutGroup: i,
              layoutId: s,
            } = this.props,
            { projection: o } = t;
          (0, tr.$)(th),
            o &&
              (e.group && e.group.add(o),
              i && i.register && s && i.register(o),
              o.root.didUpdate(),
              o.addEventListener("animationComplete", () => {
                this.safeToRemove();
              }),
              o.setOptions({
                ...o.options,
                onExitComplete: () => this.safeToRemove(),
              })),
            (ti.hasEverUpdated = !0);
        }
        getSnapshotBeforeUpdate(t) {
          let {
              layoutDependency: e,
              visualElement: i,
              drag: s,
              isPresent: o,
            } = this.props,
            n = i.projection;
          return (
            n &&
              ((n.isPresent = o),
              s || t.layoutDependency !== e || void 0 === e
                ? n.willUpdate()
                : this.safeToRemove(),
              t.isPresent === o ||
                (o
                  ? n.promote()
                  : n.relegate() ||
                    g.Gt.postRender(() => {
                      let t = n.getStack();
                      (t && t.members.length) || this.safeToRemove();
                    }))),
            null
          );
        }
        componentDidUpdate() {
          let { projection: t } = this.props.visualElement;
          t &&
            (t.root.didUpdate(),
            queueMicrotask(() => {
              !t.currentAnimation && t.isLead() && this.safeToRemove();
            }));
        }
        componentWillUnmount() {
          let {
              visualElement: t,
              layoutGroup: e,
              switchLayoutGroup: i,
            } = this.props,
            { projection: s } = t;
          s &&
            (s.scheduleCheckAfterUnmount(),
            e && e.group && e.group.remove(s),
            i && i.deregister && i.deregister(s));
        }
        safeToRemove() {
          let { safeToRemove: t } = this.props;
          t && t();
        }
        render() {
          return null;
        }
      }
      function tl(t) {
        let [e, i] = (function () {
            let t = (0, Z.useContext)(J.t);
            if (null === t) return [!0, null];
            let { isPresent: e, onExitComplete: i, register: s } = t,
              o = (0, Z.useId)();
            return (
              (0, Z.useEffect)(() => s(o), []),
              !e && i ? [!1, () => i && i(o)] : [!0]
            );
          })(),
          s = (0, Z.useContext)(tt.L);
        return Z.createElement(ta, {
          ...t,
          layoutGroup: s,
          switchLayoutGroup: (0, Z.useContext)(te.N),
          isPresent: e,
          safeToRemove: i,
        });
      }
      let th = {
        borderRadius: {
          ...to,
          applyTo: [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius",
          ],
        },
        borderTopLeftRadius: to,
        borderTopRightRadius: to,
        borderBottomLeftRadius: to,
        borderBottomRightRadius: to,
        boxShadow: {
          correct: (t, { treeScale: e, projectionDelta: i }) => {
            let s = tn.f.parse(t);
            if (s.length > 5) return t;
            let o = tn.f.createTransformer(t),
              n = "number" != typeof s[0] ? 1 : 0,
              r = i.x.scale * e.x,
              a = i.y.scale * e.y;
            (s[0 + n] /= r), (s[1 + n] /= a);
            let l = (0, S.j)(r, a, 0.5);
            return (
              "number" == typeof s[2 + n] && (s[2 + n] /= l),
              "number" == typeof s[3 + n] && (s[3 + n] /= l),
              o(s)
            );
          },
        },
      };
      var tu = i(87945),
        td = i(26575);
      let tc = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
        tm = tc.length,
        tp = (t) => ("string" == typeof t ? parseFloat(t) : t),
        tf = (t) => "number" == typeof t || z.px.test(t);
      function tg(t, e) {
        return void 0 !== t[e] ? t[e] : t.borderRadius;
      }
      let tv = tx(0, 0.5, td.yT),
        ty = tx(0.5, 0.95, l.l);
      function tx(t, e, i) {
        return (s) => (s < t ? 0 : s > e ? 1 : i((0, L.q)(t, e, s)));
      }
      function tP(t, e) {
        (t.min = e.min), (t.max = e.max);
      }
      function tT(t, e) {
        tP(t.x, e.x), tP(t.y, e.y);
      }
      var tE = i(32994);
      function tD(t, e, i, s, o) {
        return (
          (t -= e),
          (t = (0, tE.hq)(t, 1 / i, s)),
          void 0 !== o && (t = (0, tE.hq)(t, 1 / o, s)),
          t
        );
      }
      function tL(t, e, [i, s, o], n, r) {
        !(function (t, e = 0, i = 1, s = 0.5, o, n = t, r = t) {
          if (
            (z.KN.test(e) &&
              ((e = parseFloat(e)),
              (e = (0, S.j)(r.min, r.max, e / 100) - r.min)),
            "number" != typeof e)
          )
            return;
          let a = (0, S.j)(n.min, n.max, s);
          t === n && (a -= e),
            (t.min = tD(t.min, e, i, a, o)),
            (t.max = tD(t.max, e, i, a, o));
        })(t, e[i], e[s], e[o], e.scale, n, r);
      }
      let tS = ["x", "scaleX", "originX"],
        tj = ["y", "scaleY", "originY"];
      function tA(t, e, i, s) {
        tL(t.x, e, tS, i ? i.x : void 0, s ? s.x : void 0),
          tL(t.y, e, tj, i ? i.y : void 0, s ? s.y : void 0);
      }
      var tR = i(77049);
      function tw(t) {
        return 0 === t.translate && 1 === t.scale;
      }
      function tB(t) {
        return tw(t.x) && tw(t.y);
      }
      function tb(t, e) {
        return (
          Math.round(t.x.min) === Math.round(e.x.min) &&
          Math.round(t.x.max) === Math.round(e.x.max) &&
          Math.round(t.y.min) === Math.round(e.y.min) &&
          Math.round(t.y.max) === Math.round(e.y.max)
        );
      }
      function tM(t) {
        return j(t.x) / j(t.y);
      }
      var tV = i(24093);
      class tk {
        constructor() {
          this.members = [];
        }
        add(t) {
          (0, tV.Kq)(this.members, t), t.scheduleRender();
        }
        remove(t) {
          if (
            ((0, tV.Ai)(this.members, t),
            t === this.prevLead && (this.prevLead = void 0),
            t === this.lead)
          ) {
            let t = this.members[this.members.length - 1];
            t && this.promote(t);
          }
        }
        relegate(t) {
          let e;
          let i = this.members.findIndex((e) => t === e);
          if (0 === i) return !1;
          for (let t = i; t >= 0; t--) {
            let i = this.members[t];
            if (!1 !== i.isPresent) {
              e = i;
              break;
            }
          }
          return !!e && (this.promote(e), !0);
        }
        promote(t, e) {
          let i = this.lead;
          if (t !== i && ((this.prevLead = i), (this.lead = t), t.show(), i)) {
            i.instance && i.scheduleRender(),
              t.scheduleRender(),
              (t.resumeFrom = i),
              e && (t.resumeFrom.preserveOpacity = !0),
              i.snapshot &&
                ((t.snapshot = i.snapshot),
                (t.snapshot.latestValues =
                  i.animationValues || i.latestValues)),
              t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
            let { crossfade: s } = t.options;
            !1 === s && i.hide();
          }
        }
        exitAnimationComplete() {
          this.members.forEach((t) => {
            let { options: e, resumingFrom: i } = t;
            e.onExitComplete && e.onExitComplete(),
              i && i.options.onExitComplete && i.options.onExitComplete();
          });
        }
        scheduleRender() {
          this.members.forEach((t) => {
            t.instance && t.scheduleRender(!1);
          });
        }
        removeLeadSnapshot() {
          this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
        }
      }
      function tC(t, e, i) {
        let s = "",
          o = t.x.translate / e.x,
          n = t.y.translate / e.y;
        if (
          ((o || n) && (s = `translate3d(${o}px, ${n}px, 0) `),
          (1 !== e.x || 1 !== e.y) && (s += `scale(${1 / e.x}, ${1 / e.y}) `),
          i)
        ) {
          let { rotate: t, rotateX: e, rotateY: o } = i;
          t && (s += `rotate(${t}deg) `),
            e && (s += `rotateX(${e}deg) `),
            o && (s += `rotateY(${o}deg) `);
        }
        let r = t.x.scale * e.x,
          a = t.y.scale * e.y;
        return (1 !== r || 1 !== a) && (s += `scale(${r}, ${a})`), s || "none";
      }
      var tU = i(62985);
      let tF = (t, e) => t.depth - e.depth;
      class tG {
        constructor() {
          (this.children = []), (this.isDirty = !1);
        }
        add(t) {
          (0, tV.Kq)(this.children, t), (this.isDirty = !0);
        }
        remove(t) {
          (0, tV.Ai)(this.children, t), (this.isDirty = !0);
        }
        forEach(t) {
          this.isDirty && this.children.sort(tF),
            (this.isDirty = !1),
            this.children.forEach(t);
        }
      }
      var tW = i(67365),
        tO = i(18696),
        tH = i(42872);
      let tN = ["", "X", "Y", "Z"],
        tz = { visibility: "hidden" },
        tI = 0,
        tX = {
          type: "projectionFrame",
          totalNodes: 0,
          resolvedTargetDeltas: 0,
          recalculatedProjection: 0,
        };
      function t$({
        attachResizeListener: t,
        defaultParent: e,
        measureScroll: i,
        checkIsScrollRoot: s,
        resetTransform: o,
      }) {
        return class {
          constructor(t = {}, i = null == e ? void 0 : e()) {
            (this.id = tI++),
              (this.animationId = 0),
              (this.children = new Set()),
              (this.options = {}),
              (this.isTreeAnimating = !1),
              (this.isAnimationBlocked = !1),
              (this.isLayoutDirty = !1),
              (this.isProjectionDirty = !1),
              (this.isSharedProjectionDirty = !1),
              (this.isTransformDirty = !1),
              (this.updateManuallyBlocked = !1),
              (this.updateBlockedByResize = !1),
              (this.isUpdating = !1),
              (this.isSVG = !1),
              (this.needsReset = !1),
              (this.shouldResetTransform = !1),
              (this.treeScale = { x: 1, y: 1 }),
              (this.eventHandlers = new Map()),
              (this.hasTreeAnimated = !1),
              (this.updateScheduled = !1),
              (this.projectionUpdateScheduled = !1),
              (this.checkUpdateFailed = () => {
                this.isUpdating &&
                  ((this.isUpdating = !1), this.clearAllSnapshots());
              }),
              (this.updateProjection = () => {
                (this.projectionUpdateScheduled = !1),
                  (tX.totalNodes =
                    tX.resolvedTargetDeltas =
                    tX.recalculatedProjection =
                      0),
                  this.nodes.forEach(tY),
                  this.nodes.forEach(t5),
                  this.nodes.forEach(t6),
                  this.nodes.forEach(tK),
                  window.MotionDebug && window.MotionDebug.record(tX);
              }),
              (this.hasProjected = !1),
              (this.isVisible = !0),
              (this.animationProgress = 0),
              (this.sharedNodes = new Map()),
              (this.latestValues = t),
              (this.root = i ? i.root || i : this),
              (this.path = i ? [...i.path, i] : []),
              (this.parent = i),
              (this.depth = i ? i.depth + 1 : 0);
            for (let t = 0; t < this.path.length; t++)
              this.path[t].shouldResetTransform = !0;
            this.root === this && (this.nodes = new tG());
          }
          addEventListener(t, e) {
            return (
              this.eventHandlers.has(t) ||
                this.eventHandlers.set(t, new tu.v()),
              this.eventHandlers.get(t).add(e)
            );
          }
          notifyListeners(t, ...e) {
            let i = this.eventHandlers.get(t);
            i && i.notify(...e);
          }
          hasListeners(t) {
            return this.eventHandlers.has(t);
          }
          mount(e, i = this.root.hasTreeAnimated) {
            if (this.instance) return;
            (this.isSVG = (0, tO.x)(e)), (this.instance = e);
            let { layoutId: s, layout: o, visualElement: n } = this.options;
            if (
              (n && !n.current && n.mount(e),
              this.root.nodes.add(this),
              this.parent && this.parent.children.add(this),
              i && (o || s) && (this.isLayoutDirty = !0),
              t)
            ) {
              let i;
              let s = () => (this.root.updateBlockedByResize = !1);
              t(e, () => {
                (this.root.updateBlockedByResize = !0),
                  i && i(),
                  (i = (function (t, e) {
                    let i = performance.now(),
                      s = ({ timestamp: e }) => {
                        let o = e - i;
                        o >= 250 && ((0, g.WG)(s), t(o - 250));
                      };
                    return g.Gt.read(s, !0), () => (0, g.WG)(s);
                  })(s, 0)),
                  ti.hasAnimatedSinceResize &&
                    ((ti.hasAnimatedSinceResize = !1), this.nodes.forEach(t1));
              });
            }
            s && this.root.registerSharedNode(s, this),
              !1 !== this.options.animate &&
                n &&
                (s || o) &&
                this.addEventListener(
                  "didUpdate",
                  ({
                    delta: t,
                    hasLayoutChanged: e,
                    hasRelativeTargetChanged: i,
                    layout: s,
                  }) => {
                    if (this.isTreeAnimationBlocked()) {
                      (this.target = void 0), (this.relativeTarget = void 0);
                      return;
                    }
                    let o =
                        this.options.transition ||
                        n.getDefaultTransition() ||
                        t8,
                      {
                        onLayoutAnimationStart: r,
                        onLayoutAnimationComplete: a,
                      } = n.getProps(),
                      l = !this.targetLayout || !tb(this.targetLayout, s) || i,
                      h = !e && i;
                    if (
                      this.options.layoutRoot ||
                      (this.resumeFrom && this.resumeFrom.instance) ||
                      h ||
                      (e && (l || !this.currentAnimation))
                    ) {
                      this.resumeFrom &&
                        ((this.resumingFrom = this.resumeFrom),
                        (this.resumingFrom.resumingFrom = void 0)),
                        this.setAnimationOrigin(t, h);
                      let e = {
                        ...(0, tR.r)(o, "layout"),
                        onPlay: r,
                        onComplete: a,
                      };
                      (n.shouldReduceMotion || this.options.layoutRoot) &&
                        ((e.delay = 0), (e.type = !1)),
                        this.startAnimation(e);
                    } else
                      e || t1(this),
                        this.isLead() &&
                          this.options.onExitComplete &&
                          this.options.onExitComplete();
                    this.targetLayout = s;
                  }
                );
          }
          unmount() {
            this.options.layoutId && this.willUpdate(),
              this.root.nodes.remove(this);
            let t = this.getStack();
            t && t.remove(this),
              this.parent && this.parent.children.delete(this),
              (this.instance = void 0),
              (0, g.WG)(this.updateProjection);
          }
          blockUpdate() {
            this.updateManuallyBlocked = !0;
          }
          unblockUpdate() {
            this.updateManuallyBlocked = !1;
          }
          isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize;
          }
          isTreeAnimationBlocked() {
            return (
              this.isAnimationBlocked ||
              (this.parent && this.parent.isTreeAnimationBlocked()) ||
              !1
            );
          }
          startUpdate() {
            !this.isUpdateBlocked() &&
              ((this.isUpdating = !0),
              this.nodes && this.nodes.forEach(t2),
              this.animationId++);
          }
          getTransformTemplate() {
            let { visualElement: t } = this.options;
            return t && t.getProps().transformTemplate;
          }
          willUpdate(t = !0) {
            if (
              ((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())
            ) {
              this.options.onExitComplete && this.options.onExitComplete();
              return;
            }
            if (
              (this.root.isUpdating || this.root.startUpdate(),
              this.isLayoutDirty)
            )
              return;
            this.isLayoutDirty = !0;
            for (let t = 0; t < this.path.length; t++) {
              let e = this.path[t];
              (e.shouldResetTransform = !0),
                e.updateScroll("snapshot"),
                e.options.layoutRoot && e.willUpdate(!1);
            }
            let { layoutId: e, layout: i } = this.options;
            if (void 0 === e && !i) return;
            let s = this.getTransformTemplate();
            (this.prevTransformTemplateValue = s
              ? s(this.latestValues, "")
              : void 0),
              this.updateSnapshot(),
              t && this.notifyListeners("willUpdate");
          }
          update() {
            if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
              this.unblockUpdate(),
                this.clearAllSnapshots(),
                this.nodes.forEach(tZ);
              return;
            }
            this.isUpdating || this.nodes.forEach(tJ),
              (this.isUpdating = !1),
              this.nodes.forEach(t0),
              this.nodes.forEach(tq),
              this.nodes.forEach(tQ),
              this.clearAllSnapshots();
            let t = performance.now();
            (g.uv.delta = (0, V.q)(0, 1e3 / 60, t - g.uv.timestamp)),
              (g.uv.timestamp = t),
              (g.uv.isProcessing = !0),
              g.Ci.update.process(g.uv),
              g.Ci.preRender.process(g.uv),
              g.Ci.render.process(g.uv),
              (g.uv.isProcessing = !1);
          }
          didUpdate() {
            this.updateScheduled ||
              ((this.updateScheduled = !0),
              queueMicrotask(() => this.update()));
          }
          clearAllSnapshots() {
            this.nodes.forEach(t_), this.sharedNodes.forEach(t3);
          }
          scheduleUpdateProjection() {
            this.projectionUpdateScheduled ||
              ((this.projectionUpdateScheduled = !0),
              g.Gt.preRender(this.updateProjection, !1, !0));
          }
          scheduleCheckAfterUnmount() {
            g.Gt.postRender(() => {
              this.isLayoutDirty
                ? this.root.didUpdate()
                : this.root.checkUpdateFailed();
            });
          }
          updateSnapshot() {
            !this.snapshot && this.instance && (this.snapshot = this.measure());
          }
          updateLayout() {
            if (
              !this.instance ||
              (this.updateScroll(),
              !(this.options.alwaysMeasureLayout && this.isLead()) &&
                !this.isLayoutDirty)
            )
              return;
            if (this.resumeFrom && !this.resumeFrom.instance)
              for (let t = 0; t < this.path.length; t++)
                this.path[t].updateScroll();
            let t = this.layout;
            (this.layout = this.measure(!1)),
              (this.layoutCorrected = (0, G.ge)()),
              (this.isLayoutDirty = !1),
              (this.projectionDelta = void 0),
              this.notifyListeners("measure", this.layout.layoutBox);
            let { visualElement: e } = this.options;
            e &&
              e.notify(
                "LayoutMeasure",
                this.layout.layoutBox,
                t ? t.layoutBox : void 0
              );
          }
          updateScroll(t = "measure") {
            let e = !!(this.options.layoutScroll && this.instance);
            this.scroll &&
              this.scroll.animationId === this.root.animationId &&
              this.scroll.phase === t &&
              (e = !1),
              e &&
                (this.scroll = {
                  animationId: this.root.animationId,
                  phase: t,
                  isRoot: s(this.instance),
                  offset: i(this.instance),
                });
          }
          resetTransform() {
            if (!o) return;
            let t = this.isLayoutDirty || this.shouldResetTransform,
              e = this.projectionDelta && !tB(this.projectionDelta),
              i = this.getTransformTemplate(),
              s = i ? i(this.latestValues, "") : void 0,
              n = s !== this.prevTransformTemplateValue;
            t &&
              (e || (0, tU.HD)(this.latestValues) || n) &&
              (o(this.instance, s),
              (this.shouldResetTransform = !1),
              this.scheduleRender());
          }
          measure(t = !0) {
            var e;
            let i = this.measurePageBox(),
              s = this.removeElementScroll(i);
            return (
              t && (s = this.removeTransform(s)),
              ei((e = s).x),
              ei(e.y),
              {
                animationId: this.root.animationId,
                measuredBox: i,
                layoutBox: s,
                latestValues: {},
                source: this.id,
              }
            );
          }
          measurePageBox() {
            let { visualElement: t } = this.options;
            if (!t) return (0, G.ge)();
            let e = t.measureViewportBox(),
              { scroll: i } = this.root;
            return (
              i && ((0, tE.Ql)(e.x, i.offset.x), (0, tE.Ql)(e.y, i.offset.y)), e
            );
          }
          removeElementScroll(t) {
            let e = (0, G.ge)();
            tT(e, t);
            for (let i = 0; i < this.path.length; i++) {
              let s = this.path[i],
                { scroll: o, options: n } = s;
              if (s !== this.root && o && n.layoutScroll) {
                if (o.isRoot) {
                  tT(e, t);
                  let { scroll: i } = this.root;
                  i &&
                    ((0, tE.Ql)(e.x, -i.offset.x),
                    (0, tE.Ql)(e.y, -i.offset.y));
                }
                (0, tE.Ql)(e.x, o.offset.x), (0, tE.Ql)(e.y, o.offset.y);
              }
            }
            return e;
          }
          applyTransform(t, e = !1) {
            let i = (0, G.ge)();
            tT(i, t);
            for (let t = 0; t < this.path.length; t++) {
              let s = this.path[t];
              !e &&
                s.options.layoutScroll &&
                s.scroll &&
                s !== s.root &&
                (0, tE.Ww)(i, { x: -s.scroll.offset.x, y: -s.scroll.offset.y }),
                (0, tU.HD)(s.latestValues) && (0, tE.Ww)(i, s.latestValues);
            }
            return (
              (0, tU.HD)(this.latestValues) && (0, tE.Ww)(i, this.latestValues),
              i
            );
          }
          removeTransform(t) {
            let e = (0, G.ge)();
            tT(e, t);
            for (let t = 0; t < this.path.length; t++) {
              let i = this.path[t];
              if (!i.instance || !(0, tU.HD)(i.latestValues)) continue;
              (0, tU.vk)(i.latestValues) && i.updateSnapshot();
              let s = (0, G.ge)();
              tT(s, i.measurePageBox()),
                tA(
                  e,
                  i.latestValues,
                  i.snapshot ? i.snapshot.layoutBox : void 0,
                  s
                );
            }
            return (0, tU.HD)(this.latestValues) && tA(e, this.latestValues), e;
          }
          setTargetDelta(t) {
            (this.targetDelta = t),
              this.root.scheduleUpdateProjection(),
              (this.isProjectionDirty = !0);
          }
          setOptions(t) {
            this.options = {
              ...this.options,
              ...t,
              crossfade: void 0 === t.crossfade || t.crossfade,
            };
          }
          clearMeasurements() {
            (this.scroll = void 0),
              (this.layout = void 0),
              (this.snapshot = void 0),
              (this.prevTransformTemplateValue = void 0),
              (this.targetDelta = void 0),
              (this.target = void 0),
              (this.isLayoutDirty = !1);
          }
          forceRelativeParentToResolveTarget() {
            this.relativeParent &&
              this.relativeParent.resolvedRelativeTargetAt !== g.uv.timestamp &&
              this.relativeParent.resolveTargetDelta(!0);
          }
          resolveTargetDelta(t = !1) {
            var e, i, s, o;
            let n = this.getLead();
            this.isProjectionDirty ||
              (this.isProjectionDirty = n.isProjectionDirty),
              this.isTransformDirty ||
                (this.isTransformDirty = n.isTransformDirty),
              this.isSharedProjectionDirty ||
                (this.isSharedProjectionDirty = n.isSharedProjectionDirty);
            let r = !!this.resumingFrom || this !== n;
            if (
              !(
                t ||
                (r && this.isSharedProjectionDirty) ||
                this.isProjectionDirty ||
                (null === (e = this.parent) || void 0 === e
                  ? void 0
                  : e.isProjectionDirty) ||
                this.attemptToResolveRelativeTarget
              )
            )
              return;
            let { layout: a, layoutId: l } = this.options;
            if (this.layout && (a || l)) {
              if (
                ((this.resolvedRelativeTargetAt = g.uv.timestamp),
                !this.targetDelta && !this.relativeTarget)
              ) {
                let t = this.getClosestProjectingParent();
                t && t.layout && 1 !== this.animationProgress
                  ? ((this.relativeParent = t),
                    this.forceRelativeParentToResolveTarget(),
                    (this.relativeTarget = (0, G.ge)()),
                    (this.relativeTargetOrigin = (0, G.ge)()),
                    M(
                      this.relativeTargetOrigin,
                      this.layout.layoutBox,
                      t.layout.layoutBox
                    ),
                    tT(this.relativeTarget, this.relativeTargetOrigin))
                  : (this.relativeParent = this.relativeTarget = void 0);
              }
              if (this.relativeTarget || this.targetDelta) {
                if (
                  ((this.target ||
                    ((this.target = (0, G.ge)()),
                    (this.targetWithTransforms = (0, G.ge)())),
                  this.relativeTarget &&
                    this.relativeTargetOrigin &&
                    this.relativeParent &&
                    this.relativeParent.target)
                    ? (this.forceRelativeParentToResolveTarget(),
                      (i = this.target),
                      (s = this.relativeTarget),
                      (o = this.relativeParent.target),
                      B(i.x, s.x, o.x),
                      B(i.y, s.y, o.y))
                    : this.targetDelta
                    ? (this.resumingFrom
                        ? (this.target = this.applyTransform(
                            this.layout.layoutBox
                          ))
                        : tT(this.target, this.layout.layoutBox),
                      (0, tE.o4)(this.target, this.targetDelta))
                    : tT(this.target, this.layout.layoutBox),
                  this.attemptToResolveRelativeTarget)
                ) {
                  this.attemptToResolveRelativeTarget = !1;
                  let t = this.getClosestProjectingParent();
                  t &&
                  !!t.resumingFrom == !!this.resumingFrom &&
                  !t.options.layoutScroll &&
                  t.target &&
                  1 !== this.animationProgress
                    ? ((this.relativeParent = t),
                      this.forceRelativeParentToResolveTarget(),
                      (this.relativeTarget = (0, G.ge)()),
                      (this.relativeTargetOrigin = (0, G.ge)()),
                      M(this.relativeTargetOrigin, this.target, t.target),
                      tT(this.relativeTarget, this.relativeTargetOrigin))
                    : (this.relativeParent = this.relativeTarget = void 0);
                }
                tX.resolvedTargetDeltas++;
              }
            }
          }
          getClosestProjectingParent() {
            return !this.parent ||
              (0, tU.vk)(this.parent.latestValues) ||
              (0, tU.vF)(this.parent.latestValues)
              ? void 0
              : this.parent.isProjecting()
              ? this.parent
              : this.parent.getClosestProjectingParent();
          }
          isProjecting() {
            return !!(
              (this.relativeTarget ||
                this.targetDelta ||
                this.options.layoutRoot) &&
              this.layout
            );
          }
          calcProjection() {
            var t;
            let e = this.getLead(),
              i = !!this.resumingFrom || this !== e,
              s = !0;
            if (
              ((this.isProjectionDirty ||
                (null === (t = this.parent) || void 0 === t
                  ? void 0
                  : t.isProjectionDirty)) &&
                (s = !1),
              i &&
                (this.isSharedProjectionDirty || this.isTransformDirty) &&
                (s = !1),
              this.resolvedRelativeTargetAt === g.uv.timestamp && (s = !1),
              s)
            )
              return;
            let { layout: o, layoutId: n } = this.options;
            if (
              ((this.isTreeAnimating = !!(
                (this.parent && this.parent.isTreeAnimating) ||
                this.currentAnimation ||
                this.pendingAnimation
              )),
              this.isTreeAnimating ||
                (this.targetDelta = this.relativeTarget = void 0),
              !this.layout || !(o || n))
            )
              return;
            tT(this.layoutCorrected, this.layout.layoutBox);
            let r = this.treeScale.x,
              a = this.treeScale.y;
            (0, tE.OU)(this.layoutCorrected, this.treeScale, this.path, i),
              e.layout &&
                !e.target &&
                (1 !== this.treeScale.x || 1 !== this.treeScale.y) &&
                (e.target = e.layout.layoutBox);
            let { target: l } = e;
            if (!l) {
              this.projectionTransform &&
                ((this.projectionDelta = (0, G.xU)()),
                (this.projectionTransform = "none"),
                this.scheduleRender());
              return;
            }
            this.projectionDelta ||
              ((this.projectionDelta = (0, G.xU)()),
              (this.projectionDeltaWithTransform = (0, G.xU)()));
            let h = this.projectionTransform;
            w(this.projectionDelta, this.layoutCorrected, l, this.latestValues),
              (this.projectionTransform = tC(
                this.projectionDelta,
                this.treeScale
              )),
              (this.projectionTransform !== h ||
                this.treeScale.x !== r ||
                this.treeScale.y !== a) &&
                ((this.hasProjected = !0),
                this.scheduleRender(),
                this.notifyListeners("projectionUpdate", l)),
              tX.recalculatedProjection++;
          }
          hide() {
            this.isVisible = !1;
          }
          show() {
            this.isVisible = !0;
          }
          scheduleRender(t = !0) {
            if (
              (this.options.scheduleRender && this.options.scheduleRender(), t)
            ) {
              let t = this.getStack();
              t && t.scheduleRender();
            }
            this.resumingFrom &&
              !this.resumingFrom.instance &&
              (this.resumingFrom = void 0);
          }
          setAnimationOrigin(t, e = !1) {
            let i;
            let s = this.snapshot,
              o = s ? s.latestValues : {},
              n = { ...this.latestValues },
              r = (0, G.xU)();
            (this.relativeParent && this.relativeParent.options.layoutRoot) ||
              (this.relativeTarget = this.relativeTargetOrigin = void 0),
              (this.attemptToResolveRelativeTarget = !e);
            let a = (0, G.ge)(),
              l =
                (s ? s.source : void 0) !==
                (this.layout ? this.layout.source : void 0),
              h = this.getStack(),
              u = !h || h.members.length <= 1,
              d = !!(
                l &&
                !u &&
                !0 === this.options.crossfade &&
                !this.path.some(t9)
              );
            (this.animationProgress = 0),
              (this.mixTargetDelta = (e) => {
                let s = e / 1e3;
                if (
                  (t7(r.x, t.x, s),
                  t7(r.y, t.y, s),
                  this.setTargetDelta(r),
                  this.relativeTarget &&
                    this.relativeTargetOrigin &&
                    this.layout &&
                    this.relativeParent &&
                    this.relativeParent.layout)
                ) {
                  var h, c, m, p;
                  M(
                    a,
                    this.layout.layoutBox,
                    this.relativeParent.layout.layoutBox
                  ),
                    (m = this.relativeTarget),
                    (p = this.relativeTargetOrigin),
                    t4(m.x, p.x, a.x, s),
                    t4(m.y, p.y, a.y, s),
                    i &&
                      ((h = this.relativeTarget),
                      (c = i),
                      h.x.min === c.x.min &&
                        h.x.max === c.x.max &&
                        h.y.min === c.y.min &&
                        h.y.max === c.y.max) &&
                      (this.isProjectionDirty = !1),
                    i || (i = (0, G.ge)()),
                    tT(i, this.relativeTarget);
                }
                l &&
                  ((this.animationValues = n),
                  (function (t, e, i, s, o, n) {
                    o
                      ? ((t.opacity = (0, S.j)(
                          0,
                          void 0 !== i.opacity ? i.opacity : 1,
                          tv(s)
                        )),
                        (t.opacityExit = (0, S.j)(
                          void 0 !== e.opacity ? e.opacity : 1,
                          0,
                          ty(s)
                        )))
                      : n &&
                        (t.opacity = (0, S.j)(
                          void 0 !== e.opacity ? e.opacity : 1,
                          void 0 !== i.opacity ? i.opacity : 1,
                          s
                        ));
                    for (let o = 0; o < tm; o++) {
                      let n = `border${tc[o]}Radius`,
                        r = tg(e, n),
                        a = tg(i, n);
                      (void 0 !== r || void 0 !== a) &&
                        (r || (r = 0),
                        a || (a = 0),
                        0 === r || 0 === a || tf(r) === tf(a)
                          ? ((t[n] = Math.max((0, S.j)(tp(r), tp(a), s), 0)),
                            (z.KN.test(a) || z.KN.test(r)) && (t[n] += "%"))
                          : (t[n] = a));
                    }
                    (e.rotate || i.rotate) &&
                      (t.rotate = (0, S.j)(e.rotate || 0, i.rotate || 0, s));
                  })(n, o, this.latestValues, s, d, u)),
                  this.root.scheduleUpdateProjection(),
                  this.scheduleRender(),
                  (this.animationProgress = s);
              }),
              this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
          }
          startAnimation(t) {
            this.notifyListeners("animationStart"),
              this.currentAnimation && this.currentAnimation.stop(),
              this.resumingFrom &&
                this.resumingFrom.currentAnimation &&
                this.resumingFrom.currentAnimation.stop(),
              this.pendingAnimation &&
                ((0, g.WG)(this.pendingAnimation),
                (this.pendingAnimation = void 0)),
              (this.pendingAnimation = g.Gt.update(() => {
                (ti.hasAnimatedSinceResize = !0),
                  (this.currentAnimation = (0, tH.z)(0, 1e3, {
                    ...t,
                    onUpdate: (e) => {
                      this.mixTargetDelta(e), t.onUpdate && t.onUpdate(e);
                    },
                    onComplete: () => {
                      t.onComplete && t.onComplete(), this.completeAnimation();
                    },
                  })),
                  this.resumingFrom &&
                    (this.resumingFrom.currentAnimation =
                      this.currentAnimation),
                  (this.pendingAnimation = void 0);
              }));
          }
          completeAnimation() {
            this.resumingFrom &&
              ((this.resumingFrom.currentAnimation = void 0),
              (this.resumingFrom.preserveOpacity = void 0));
            let t = this.getStack();
            t && t.exitAnimationComplete(),
              (this.resumingFrom =
                this.currentAnimation =
                this.animationValues =
                  void 0),
              this.notifyListeners("animationComplete");
          }
          finishAnimation() {
            this.currentAnimation &&
              (this.mixTargetDelta && this.mixTargetDelta(1e3),
              this.currentAnimation.stop()),
              this.completeAnimation();
          }
          applyTransformsToTarget() {
            let t = this.getLead(),
              {
                targetWithTransforms: e,
                target: i,
                layout: s,
                latestValues: o,
              } = t;
            if (e && i && s) {
              if (
                this !== t &&
                this.layout &&
                s &&
                es(
                  this.options.animationType,
                  this.layout.layoutBox,
                  s.layoutBox
                )
              ) {
                i = this.target || (0, G.ge)();
                let e = j(this.layout.layoutBox.x);
                (i.x.min = t.target.x.min), (i.x.max = i.x.min + e);
                let s = j(this.layout.layoutBox.y);
                (i.y.min = t.target.y.min), (i.y.max = i.y.min + s);
              }
              tT(e, i),
                (0, tE.Ww)(e, o),
                w(
                  this.projectionDeltaWithTransform,
                  this.layoutCorrected,
                  e,
                  o
                );
            }
          }
          registerSharedNode(t, e) {
            this.sharedNodes.has(t) || this.sharedNodes.set(t, new tk()),
              this.sharedNodes.get(t).add(e);
            let i = e.options.initialPromotionConfig;
            e.promote({
              transition: i ? i.transition : void 0,
              preserveFollowOpacity:
                i && i.shouldPreserveFollowOpacity
                  ? i.shouldPreserveFollowOpacity(e)
                  : void 0,
            });
          }
          isLead() {
            let t = this.getStack();
            return !t || t.lead === this;
          }
          getLead() {
            var t;
            let { layoutId: e } = this.options;
            return (
              (e &&
                (null === (t = this.getStack()) || void 0 === t
                  ? void 0
                  : t.lead)) ||
              this
            );
          }
          getPrevLead() {
            var t;
            let { layoutId: e } = this.options;
            return e
              ? null === (t = this.getStack()) || void 0 === t
                ? void 0
                : t.prevLead
              : void 0;
          }
          getStack() {
            let { layoutId: t } = this.options;
            if (t) return this.root.sharedNodes.get(t);
          }
          promote({
            needsReset: t,
            transition: e,
            preserveFollowOpacity: i,
          } = {}) {
            let s = this.getStack();
            s && s.promote(this, i),
              t && ((this.projectionDelta = void 0), (this.needsReset = !0)),
              e && this.setOptions({ transition: e });
          }
          relegate() {
            let t = this.getStack();
            return !!t && t.relegate(this);
          }
          resetRotation() {
            let { visualElement: t } = this.options;
            if (!t) return;
            let e = !1,
              { latestValues: i } = t;
            if (
              ((i.rotate || i.rotateX || i.rotateY || i.rotateZ) && (e = !0),
              !e)
            )
              return;
            let s = {};
            for (let e = 0; e < tN.length; e++) {
              let o = "rotate" + tN[e];
              i[o] && ((s[o] = i[o]), t.setStaticValue(o, 0));
            }
            for (let e in (t.render(), s)) t.setStaticValue(e, s[e]);
            t.scheduleRender();
          }
          getProjectionStyles(t) {
            var e, i;
            if (!this.instance || this.isSVG) return;
            if (!this.isVisible) return tz;
            let s = { visibility: "" },
              o = this.getTransformTemplate();
            if (this.needsReset)
              return (
                (this.needsReset = !1),
                (s.opacity = ""),
                (s.pointerEvents =
                  (0, tW.u)(null == t ? void 0 : t.pointerEvents) || ""),
                (s.transform = o ? o(this.latestValues, "") : "none"),
                s
              );
            let n = this.getLead();
            if (!this.projectionDelta || !this.layout || !n.target) {
              let e = {};
              return (
                this.options.layoutId &&
                  ((e.opacity =
                    void 0 !== this.latestValues.opacity
                      ? this.latestValues.opacity
                      : 1),
                  (e.pointerEvents =
                    (0, tW.u)(null == t ? void 0 : t.pointerEvents) || "")),
                this.hasProjected &&
                  !(0, tU.HD)(this.latestValues) &&
                  ((e.transform = o ? o({}, "") : "none"),
                  (this.hasProjected = !1)),
                e
              );
            }
            let r = n.animationValues || n.latestValues;
            this.applyTransformsToTarget(),
              (s.transform = tC(
                this.projectionDeltaWithTransform,
                this.treeScale,
                r
              )),
              o && (s.transform = o(r, s.transform));
            let { x: a, y: l } = this.projectionDelta;
            for (let t in ((s.transformOrigin = `${100 * a.origin}% ${
              100 * l.origin
            }% 0`),
            n.animationValues
              ? (s.opacity =
                  n === this
                    ? null !==
                        (i =
                          null !== (e = r.opacity) && void 0 !== e
                            ? e
                            : this.latestValues.opacity) && void 0 !== i
                      ? i
                      : 1
                    : this.preserveOpacity
                    ? this.latestValues.opacity
                    : r.opacityExit)
              : (s.opacity =
                  n === this
                    ? void 0 !== r.opacity
                      ? r.opacity
                      : ""
                    : void 0 !== r.opacityExit
                    ? r.opacityExit
                    : 0),
            tr.H)) {
              if (void 0 === r[t]) continue;
              let { correct: e, applyTo: i } = tr.H[t],
                o = "none" === s.transform ? r[t] : e(r[t], n);
              if (i) {
                let t = i.length;
                for (let e = 0; e < t; e++) s[i[e]] = o;
              } else s[t] = o;
            }
            return (
              this.options.layoutId &&
                (s.pointerEvents =
                  n === this
                    ? (0, tW.u)(null == t ? void 0 : t.pointerEvents) || ""
                    : "none"),
              s
            );
          }
          clearSnapshot() {
            this.resumeFrom = this.snapshot = void 0;
          }
          resetTree() {
            this.root.nodes.forEach((t) => {
              var e;
              return null === (e = t.currentAnimation) || void 0 === e
                ? void 0
                : e.stop();
            }),
              this.root.nodes.forEach(tZ),
              this.root.sharedNodes.clear();
          }
        };
      }
      function tq(t) {
        t.updateLayout();
      }
      function tQ(t) {
        var e;
        let i =
          (null === (e = t.resumeFrom) || void 0 === e ? void 0 : e.snapshot) ||
          t.snapshot;
        if (t.isLead() && t.layout && i && t.hasListeners("didUpdate")) {
          let { layoutBox: e, measuredBox: s } = t.layout,
            { animationType: o } = t.options,
            n = i.source !== t.layout.source;
          "size" === o
            ? W((t) => {
                let s = n ? i.measuredBox[t] : i.layoutBox[t],
                  o = j(s);
                (s.min = e[t].min), (s.max = s.min + o);
              })
            : es(o, i.layoutBox, e) &&
              W((s) => {
                let o = n ? i.measuredBox[s] : i.layoutBox[s],
                  r = j(e[s]);
                (o.max = o.min + r),
                  t.relativeTarget &&
                    !t.currentAnimation &&
                    ((t.isProjectionDirty = !0),
                    (t.relativeTarget[s].max = t.relativeTarget[s].min + r));
              });
          let r = (0, G.xU)();
          w(r, e, i.layoutBox);
          let a = (0, G.xU)();
          n
            ? w(a, t.applyTransform(s, !0), i.measuredBox)
            : w(a, e, i.layoutBox);
          let l = !tB(r),
            h = !1;
          if (!t.resumeFrom) {
            let s = t.getClosestProjectingParent();
            if (s && !s.resumeFrom) {
              let { snapshot: o, layout: n } = s;
              if (o && n) {
                let r = (0, G.ge)();
                M(r, i.layoutBox, o.layoutBox);
                let a = (0, G.ge)();
                M(a, e, n.layoutBox),
                  tb(r, a) || (h = !0),
                  s.options.layoutRoot &&
                    ((t.relativeTarget = a),
                    (t.relativeTargetOrigin = r),
                    (t.relativeParent = s));
              }
            }
          }
          t.notifyListeners("didUpdate", {
            layout: e,
            snapshot: i,
            delta: a,
            layoutDelta: r,
            hasLayoutChanged: l,
            hasRelativeTargetChanged: h,
          });
        } else if (t.isLead()) {
          let { onExitComplete: e } = t.options;
          e && e();
        }
        t.options.transition = void 0;
      }
      function tY(t) {
        tX.totalNodes++,
          t.parent &&
            (t.isProjecting() ||
              (t.isProjectionDirty = t.parent.isProjectionDirty),
            t.isSharedProjectionDirty ||
              (t.isSharedProjectionDirty = !!(
                t.isProjectionDirty ||
                t.parent.isProjectionDirty ||
                t.parent.isSharedProjectionDirty
              )),
            t.isTransformDirty ||
              (t.isTransformDirty = t.parent.isTransformDirty));
      }
      function tK(t) {
        t.isProjectionDirty =
          t.isSharedProjectionDirty =
          t.isTransformDirty =
            !1;
      }
      function t_(t) {
        t.clearSnapshot();
      }
      function tZ(t) {
        t.clearMeasurements();
      }
      function tJ(t) {
        t.isLayoutDirty = !1;
      }
      function t0(t) {
        let { visualElement: e } = t.options;
        e &&
          e.getProps().onBeforeLayoutMeasure &&
          e.notify("BeforeLayoutMeasure"),
          t.resetTransform();
      }
      function t1(t) {
        t.finishAnimation(),
          (t.targetDelta = t.relativeTarget = t.target = void 0),
          (t.isProjectionDirty = !0);
      }
      function t5(t) {
        t.resolveTargetDelta();
      }
      function t6(t) {
        t.calcProjection();
      }
      function t2(t) {
        t.resetRotation();
      }
      function t3(t) {
        t.removeLeadSnapshot();
      }
      function t7(t, e, i) {
        (t.translate = (0, S.j)(e.translate, 0, i)),
          (t.scale = (0, S.j)(e.scale, 1, i)),
          (t.origin = e.origin),
          (t.originPoint = e.originPoint);
      }
      function t4(t, e, i, s) {
        (t.min = (0, S.j)(e.min, i.min, s)),
          (t.max = (0, S.j)(e.max, i.max, s));
      }
      function t9(t) {
        return t.animationValues && void 0 !== t.animationValues.opacityExit;
      }
      let t8 = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
        et = (t) =>
          "undefined" != typeof navigator &&
          navigator.userAgent.toLowerCase().includes(t),
        ee = et("applewebkit/") && !et("chrome/") ? Math.round : l.l;
      function ei(t) {
        (t.min = ee(t.min)), (t.max = ee(t.max));
      }
      function es(t, e, i) {
        return (
          "position" === t || ("preserve-aspect" === t && !A(tM(e), tM(i), 0.2))
        );
      }
      let eo = t$({
          attachResizeListener: (t, e) => (0, N.k)(t, "resize", e),
          measureScroll: () => ({
            x: document.documentElement.scrollLeft || document.body.scrollLeft,
            y: document.documentElement.scrollTop || document.body.scrollTop,
          }),
          checkIsScrollRoot: () => !0,
        }),
        en = { current: void 0 },
        er = t$({
          measureScroll: (t) => ({ x: t.scrollLeft, y: t.scrollTop }),
          defaultParent: () => {
            if (!en.current) {
              let t = new eo({});
              t.mount(window),
                t.setOptions({ layoutScroll: !0 }),
                (en.current = t);
            }
            return en.current;
          },
          resetTransform: (t, e) => {
            t.style.transform = void 0 !== e ? e : "none";
          },
          checkIsScrollRoot: (t) =>
            "fixed" === window.getComputedStyle(t).position,
        });
      var ea = i(16480);
      let el = {
          ...r.W,
          ...n.n,
          pan: { Feature: _ },
          drag: { Feature: Y, ProjectionNode: er, MeasureLayout: tl },
          layout: { ProjectionNode: er, MeasureLayout: tl },
        },
        eh = (0, s.H)((t, e) => (0, o.P)(t, e, el, ea.J));
    },
    87215: (t, e, i) => {
      let s, o;
      i.d(e, { L: () => C });
      var n = i(93250),
        r = i(99234),
        a = i(12115),
        l = i(65749),
        h = i(29127);
      let u = new WeakMap();
      function d({ target: t, contentRect: e, borderBoxSize: i }) {
        var s;
        null === (s = u.get(t)) ||
          void 0 === s ||
          s.forEach((s) => {
            s({
              target: t,
              contentSize: e,
              get size() {
                return (function (t, e) {
                  if (e) {
                    let { inlineSize: t, blockSize: i } = e[0];
                    return { width: t, height: i };
                  }
                  return t instanceof SVGElement && "getBBox" in t
                    ? t.getBBox()
                    : { width: t.offsetWidth, height: t.offsetHeight };
                })(t, i);
              },
            });
          });
      }
      function c(t) {
        t.forEach(d);
      }
      let m = new Set();
      var p = i(26781),
        f = i(42206);
      let g = () => ({
          current: 0,
          offset: [],
          progress: 0,
          scrollLength: 0,
          targetOffset: 0,
          targetLength: 0,
          containerLength: 0,
          velocity: 0,
        }),
        v = () => ({ time: 0, x: g(), y: g() }),
        y = {
          x: { length: "Width", position: "Left" },
          y: { length: "Height", position: "Top" },
        };
      function x(t, e, i, s) {
        let o = i[e],
          { length: n, position: r } = y[e],
          a = o.current,
          l = i.time;
        (o.current = t["scroll" + r]),
          (o.scrollLength = t["scroll" + n] - t["client" + n]),
          (o.offset.length = 0),
          (o.offset[0] = 0),
          (o.offset[1] = o.scrollLength),
          (o.progress = (0, p.q)(0, o.scrollLength, o.current));
        let h = s - l;
        o.velocity = h > 50 ? 0 : (0, f.f)(o.current - a, h);
      }
      let P = {
          All: [
            [0, 0],
            [1, 1],
          ],
        },
        T = { start: 0, center: 0.5, end: 1 };
      function E(t, e, i = 0) {
        let s = 0;
        if ((void 0 !== T[t] && (t = T[t]), "string" == typeof t)) {
          let e = parseFloat(t);
          t.endsWith("px")
            ? (s = e)
            : t.endsWith("%")
            ? (t = e / 100)
            : t.endsWith("vw")
            ? (s = (e / 100) * document.documentElement.clientWidth)
            : t.endsWith("vh")
            ? (s = (e / 100) * document.documentElement.clientHeight)
            : (t = e);
        }
        return "number" == typeof t && (s = e * t), i + s;
      }
      let D = [0, 0];
      var L = i(49600),
        S = i(53636);
      let j = { x: 0, y: 0 };
      var A = i(78086);
      let R = new WeakMap(),
        w = new WeakMap(),
        B = new WeakMap(),
        b = (t) => (t === document.documentElement ? window : t);
      var M = i(35403);
      function V(t, e) {
        (0, l.$)(
          !!(!e || e.current),
          `You have defined a ${t} options but the provided ref is not yet hydrated, probably because it's defined higher up the tree. Try calling useScroll() in the same component as the ref, or setting its \`layoutEffect: false\` option.`
        );
      }
      let k = () => ({
        scrollX: (0, n.OQ)(0),
        scrollY: (0, n.OQ)(0),
        scrollXProgress: (0, n.OQ)(0),
        scrollYProgress: (0, n.OQ)(0),
      });
      function C({ container: t, target: e, layoutEffect: i = !0, ...n } = {}) {
        let l = (0, r.M)(k);
        return (
          (i ? M.E : a.useEffect)(
            () => (
              V("target", e),
              V("container", t),
              (function (
                t,
                { container: e = document.documentElement, ...i } = {}
              ) {
                let n = B.get(e);
                n || ((n = new Set()), B.set(e, n));
                let r = (function (t, e, i, s = {}) {
                  return {
                    measure: () =>
                      (function (t, e = t, i) {
                        if (
                          ((i.x.targetOffset = 0),
                          (i.y.targetOffset = 0),
                          e !== t)
                        ) {
                          let s = e;
                          for (; s && s !== t; )
                            (i.x.targetOffset += s.offsetLeft),
                              (i.y.targetOffset += s.offsetTop),
                              (s = s.offsetParent);
                        }
                        (i.x.targetLength =
                          e === t ? e.scrollWidth : e.clientWidth),
                          (i.y.targetLength =
                            e === t ? e.scrollHeight : e.clientHeight),
                          (i.x.containerLength = t.clientWidth),
                          (i.y.containerLength = t.clientHeight);
                      })(t, s.target, i),
                    update: (e) => {
                      x(t, "x", i, e),
                        x(t, "y", i, e),
                        (i.time = e),
                        (s.offset || s.target) &&
                          (function (t, e, i) {
                            let { offset: s = P.All } = i,
                              { target: o = t, axis: n = "y" } = i,
                              r = "y" === n ? "height" : "width",
                              a =
                                o !== t
                                  ? (function (t, e) {
                                      let i = { x: 0, y: 0 },
                                        s = t;
                                      for (; s && s !== e; )
                                        if (s instanceof HTMLElement)
                                          (i.x += s.offsetLeft),
                                            (i.y += s.offsetTop),
                                            (s = s.offsetParent);
                                        else if ("svg" === s.tagName) {
                                          let t = s.getBoundingClientRect(),
                                            e = (s =
                                              s.parentElement).getBoundingClientRect();
                                          (i.x += t.left - e.left),
                                            (i.y += t.top - e.top);
                                        } else if (
                                          s instanceof SVGGraphicsElement
                                        ) {
                                          let { x: t, y: e } = s.getBBox();
                                          (i.x += t), (i.y += e);
                                          let o = null,
                                            n = s.parentNode;
                                          for (; !o; )
                                            "svg" === n.tagName && (o = n),
                                              (n = s.parentNode);
                                          s = o;
                                        } else break;
                                      return i;
                                    })(o, t)
                                  : j,
                              l =
                                o === t
                                  ? {
                                      width: t.scrollWidth,
                                      height: t.scrollHeight,
                                    }
                                  : "getBBox" in o && "svg" !== o.tagName
                                  ? o.getBBox()
                                  : {
                                      width: o.clientWidth,
                                      height: o.clientHeight,
                                    },
                              h = {
                                width: t.clientWidth,
                                height: t.clientHeight,
                              };
                            e[n].offset.length = 0;
                            let u = !e[n].interpolate,
                              d = s.length;
                            for (let t = 0; t < d; t++) {
                              let i = (function (t, e, i, s) {
                                let o = Array.isArray(t) ? t : D,
                                  n = 0;
                                return (
                                  "number" == typeof t
                                    ? (o = [t, t])
                                    : "string" == typeof t &&
                                      (o = (t = t.trim()).includes(" ")
                                        ? t.split(" ")
                                        : [t, T[t] ? t : "0"]),
                                  E(o[0], i, s) - E(o[1], e)
                                );
                              })(s[t], h[r], l[r], a[n]);
                              u ||
                                i === e[n].interpolatorOffsets[t] ||
                                (u = !0),
                                (e[n].offset[t] = i);
                            }
                            u &&
                              ((e[n].interpolate = (0, L.G)(
                                e[n].offset,
                                (0, S.Z)(s)
                              )),
                              (e[n].interpolatorOffsets = [...e[n].offset])),
                              (e[n].progress = e[n].interpolate(e[n].current));
                          })(t, i, s);
                    },
                    notify: () => e(i),
                  };
                })(e, t, v(), i);
                if ((n.add(r), !R.has(e))) {
                  let t = () => {
                      for (let t of n) t.measure();
                    },
                    i = () => {
                      for (let t of n) t.update(A.uv.timestamp);
                    },
                    r = () => {
                      for (let t of n) t.notify();
                    },
                    a = () => {
                      A.Gt.read(t, !1, !0),
                        A.Gt.read(i, !1, !0),
                        A.Gt.update(r, !1, !0);
                    };
                  R.set(e, a);
                  let l = b(e);
                  window.addEventListener("resize", a, { passive: !0 }),
                    e !== document.documentElement &&
                      w.set(
                        e,
                        "function" == typeof e
                          ? (m.add(e),
                            o ||
                              ((o = () => {
                                let t = {
                                    width: window.innerWidth,
                                    height: window.innerHeight,
                                  },
                                  e = {
                                    target: window,
                                    size: t,
                                    contentSize: t,
                                  };
                                m.forEach((t) => t(e));
                              }),
                              window.addEventListener("resize", o)),
                            () => {
                              m.delete(e), !m.size && o && (o = void 0);
                            })
                          : (function (t, e) {
                              s ||
                                "undefined" == typeof ResizeObserver ||
                                (s = new ResizeObserver(c));
                              let i = (0, h.K)(t);
                              return (
                                i.forEach((t) => {
                                  let i = u.get(t);
                                  i || ((i = new Set()), u.set(t, i)),
                                    i.add(e),
                                    null == s || s.observe(t);
                                }),
                                () => {
                                  i.forEach((t) => {
                                    let i = u.get(t);
                                    null == i || i.delete(e),
                                      (null == i ? void 0 : i.size) ||
                                        null == s ||
                                        s.unobserve(t);
                                  });
                                }
                              );
                            })(e, a)
                      ),
                    l.addEventListener("scroll", a, { passive: !0 });
                }
                let a = R.get(e);
                return (
                  A.Gt.read(a, !1, !0),
                  () => {
                    var t;
                    (0, A.WG)(a);
                    let i = B.get(e);
                    if (!i || (i.delete(r), i.size)) return;
                    let s = R.get(e);
                    R.delete(e),
                      s &&
                        (b(e).removeEventListener("scroll", s),
                        null === (t = w.get(e)) || void 0 === t || t(),
                        window.removeEventListener("resize", s));
                  }
                );
              })(
                ({ x: t, y: e }) => {
                  l.scrollX.set(t.current),
                    l.scrollXProgress.set(t.progress),
                    l.scrollY.set(e.current),
                    l.scrollYProgress.set(e.progress);
                },
                {
                  ...n,
                  container: (null == t ? void 0 : t.current) || void 0,
                  target: (null == e ? void 0 : e.current) || void 0,
                }
              )
            ),
            [t, e, JSON.stringify(n.offset)]
          ),
          l
        );
      }
    },
    46575: (t, e, i) => {
      i.d(e, { G: () => m });
      var s = i(49600);
      let o = (t) => t && "object" == typeof t && t.mix,
        n = (t) => (o(t) ? t.mix : void 0);
      var r = i(12115),
        a = i(93250),
        l = i(27249),
        h = i(99234),
        u = i(35403),
        d = i(78086);
      function c(t, e) {
        let i = (function (t) {
            let e = (0, h.M)(() => (0, a.OQ)(t)),
              { isStatic: i } = (0, r.useContext)(l.Q);
            if (i) {
              let [, i] = (0, r.useState)(t);
              (0, r.useEffect)(() => e.on("change", i), []);
            }
            return e;
          })(e()),
          s = () => i.set(e());
        return (
          s(),
          (0, u.E)(() => {
            let e = () => d.Gt.update(s, !1, !0),
              i = t.map((t) => t.on("change", e));
            return () => {
              i.forEach((t) => t()), (0, d.WG)(s);
            };
          }),
          i
        );
      }
      function m(t, e, i, o) {
        if ("function" == typeof t)
          return (function (t) {
            (a.bt.current = []), t();
            let e = c(a.bt.current, t);
            return (a.bt.current = void 0), e;
          })(t);
        let r =
          "function" == typeof e
            ? e
            : (function (...t) {
                let e = !Array.isArray(t[0]),
                  i = e ? 0 : -1,
                  o = t[0 + i],
                  r = t[1 + i],
                  a = t[2 + i],
                  l = t[3 + i],
                  h = (0, s.G)(r, a, { mixer: n(a[0]), ...l });
                return e ? h(o) : h;
              })(e, i, o);
        return Array.isArray(t) ? p(t, r) : p([t], ([t]) => r(t));
      }
      function p(t, e) {
        let i = (0, h.M)(() => []);
        return c(t, () => {
          i.length = 0;
          let s = t.length;
          for (let e = 0; e < s; e++) i[e] = t[e].get();
          return e(i);
        });
      }
    },
  },
]);
