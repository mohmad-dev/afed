(self.onmessage = function (t) {
  let {
      mouseX: a,
      mouseY: o,
      width: s,
      height: e,
      newPosition: h,
      rotateMove: M,
      radius: n,
    } = t.data,
    r = (a / s - 0.5) * Math.PI * 0.2,
    f = (o / e - 0.5) * Math.PI * 0.05,
    i = h.y + n * Math.sin(-f),
    l = h.x + n * Math.sin("rotTwo" === M || "rotTheta" === M ? -r : r),
    x = h.z * Math.cos(r);
  self.postMessage(
    "rotZ" === M || "rotTwo" === M ? { x: x, y: i, z: l } : { x: l, y: i, z: x }
  );
}),
  (_N_E = {});
