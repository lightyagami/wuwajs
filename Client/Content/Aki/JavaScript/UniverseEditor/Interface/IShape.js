"use strict";

function checkInBox(o, p, e, r) {
  const T = (p.X ?? 0) + (o.X ?? 0),
    t = (p.Y ?? 0) + (o.Y ?? 0),
    s = (p.Z ?? 0) + (o.Z ?? 0);
  var p = r.X ?? 0,
    o = r.Y ?? 0,
    r = r.Z ?? 0,
    i = e.X ?? 0,
    c = e.Y ?? 0,
    e = e.Z ?? 0;
  return !(T - p > i || T + p < i || t - o > c || t + o < c || s - r > e || s + r < e)
}

function checkInSphere(o, p, e, r) {
  const T = (p.X ?? 0) + (o.X ?? 0),
    t = (p.Y ?? 0) + (o.Y ?? 0),
    s = (p.Z ?? 0) + (o.Z ?? 0);
  p = (e.X ?? 0) - T, o = (e.Y ?? 0) - t, e = (e.Z ?? 0) - s;
  return !(r * r < p * p + o * o + e * e)
}
var ETipsActorType, ETipsActorColorType, ETipsActorTransformType;

function pickShapeParam(o) {
  var p = o.Type,
    p = exports.shapeStructTemplates[p],
    e = {};
  for (const r of Object.keys(p)) e[r] = o[r];
  return e
}
Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.pickShapeParam = exports.shapeStructTemplates = exports.ETipsActorTransformType = exports.ETipsActorColorType = exports.ETipsActorType = exports.checkInSphere = exports.checkInBox = void 0, exports.checkInBox = checkInBox, exports.checkInSphere = checkInSphere,
  function(o) {
    o[o.Sphere = 0] = "Sphere", o[o.Box = 1] = "Box", o[o.Cylinder = 2] = "Cylinder", o[o.HollowCylinder = 3] = "HollowCylinder", o[o.HollowSphere = 4] = "HollowSphere", o[o.Cone = 5] = "Cone", o[o.Sector = 6] = "Sector", o[o.TargetPoint = 7] = "TargetPoint", o[o.Laser = 8] = "Laser", o[o.Spline = 9] = "Spline"
  }(ETipsActorType = exports.ETipsActorType || (exports.ETipsActorType = {})),
  function(o) {
    o[o.Inner = 0] = "Inner", o[o.Outer = 1] = "Outer"
  }(ETipsActorColorType = exports.ETipsActorColorType || (exports.ETipsActorColorType = {})),
  function(o) {
    o[o.Absolute = 0] = "Absolute", o[o.Relative = 1] = "Relative"
  }(ETipsActorTransformType = exports.ETipsActorTransformType || (exports.ETipsActorTransformType = {})), exports.shapeStructTemplates = {
    [ETipsActorType.Box]: {
      X: 0,
      Y: 0,
      Z: 0,
      ColorType: ETipsActorColorType.Inner,
      Type: ETipsActorType.Box
    },
    [ETipsActorType.Sphere]: {
      Radius: 0,
      ColorType: ETipsActorColorType.Inner,
      Type: ETipsActorType.Sphere
    },
    [ETipsActorType.HollowSphere]: {
      Radius: 50,
      InnerRadius: 0,
      ColorType: ETipsActorColorType.Inner,
      Type: ETipsActorType.HollowSphere
    },
    [ETipsActorType.Cylinder]: {
      Radius: 0,
      Height: 0,
      ColorType: ETipsActorColorType.Inner,
      Type: ETipsActorType.Cylinder
    },
    [ETipsActorType.HollowCylinder]: {
      Radius: 10,
      Height: 0,
      InnerRadius: 0,
      ColorType: ETipsActorColorType.Inner,
      Type: ETipsActorType.HollowCylinder
    },
    [ETipsActorType.Cone]: {
      Radius: 0,
      Height: 0,
      ColorType: ETipsActorColorType.Inner,
      Type: ETipsActorType.Cone
    },
    [ETipsActorType.Sector]: {
      Radius: 0,
      Angle: 0,
      ColorType: ETipsActorColorType.Inner,
      Type: ETipsActorType.Sector
    },
    [ETipsActorType.TargetPoint]: {
      ColorType: ETipsActorColorType.Inner,
      Type: ETipsActorType.TargetPoint,
      Label: ""
    },
    [ETipsActorType.Laser]: {
      Height: 0,
      Radius: 0,
      ColorType: ETipsActorColorType.Inner,
      Type: ETipsActorType.Laser
    },
    [ETipsActorType.Spline]: {
      Type: ETipsActorType.Spline,
      EntityId: 0
    }
  }, exports.pickShapeParam = pickShapeParam;
//# sourceMappingURL=IShape.js.map