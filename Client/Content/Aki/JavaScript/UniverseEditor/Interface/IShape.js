"use strict";

function checkInBox(p, e, o, r) {
  const T = (e.X ?? 0) + (p.X ?? 0);
  const t = (e.Y ?? 0) + (p.Y ?? 0);
  const s = (e.Z ?? 0) + (p.Z ?? 0);
  var e = r.X ?? 0;
  var p = r.Y ?? 0;
  var r = r.Z ?? 0;
  var i = o.X ?? 0;
  var c = o.Y ?? 0;
  var o = o.Z ?? 0;
  return !(T - e > i) && !(T + e < i) && !(t - p > c) && !(t + p < c) && !(s - r > o) && !(s + r < o);
}
function checkInSphere(p, e, o, r) {
  const T = (e.X ?? 0) + (p.X ?? 0);
  const t = (e.Y ?? 0) + (p.Y ?? 0);
  const s = (e.Z ?? 0) + (p.Z ?? 0);
  e = (o.X ?? 0) - T;
  p = (o.Y ?? 0) - t;
  o = (o.Z ?? 0) - s;
  return !(r * r < e * e + p * p + o * o);
}
var ETipsActorType;
var ETipsActorColorType;
var ETipsActorTransformType;
function pickShapeParam(p) {
  var e = p.Type;
  var e = exports.shapeStructTemplates[e];
  var o = {};
  for (const r of Object.keys(e)) {
    o[r] = p[r];
  }
  return o;
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickShapeParam = exports.shapeStructTemplates = exports.ETipsActorTransformType = exports.ETipsActorColorType = exports.ETipsActorType = exports.checkInSphere = exports.checkInBox = undefined;
exports.checkInBox = checkInBox;
exports.checkInSphere = checkInSphere;
(function (p) {
  p[p.Sphere = 0] = "Sphere";
  p[p.Box = 1] = "Box";
  p[p.Cylinder = 2] = "Cylinder";
  p[p.HollowCylinder = 3] = "HollowCylinder";
  p[p.HollowSphere = 4] = "HollowSphere";
  p[p.Cone = 5] = "Cone";
  p[p.Sector = 6] = "Sector";
  p[p.TargetPoint = 7] = "TargetPoint";
  p[p.Laser = 8] = "Laser";
  p[p.Spline = 9] = "Spline";
  p[p.SplineEffect = 10] = "SplineEffect";
})(ETipsActorType = exports.ETipsActorType ||= {});
(function (p) {
  p[p.Inner = 0] = "Inner";
  p[p.Outer = 1] = "Outer";
})(ETipsActorColorType = exports.ETipsActorColorType ||= {});
(function (p) {
  p[p.Absolute = 0] = "Absolute";
  p[p.Relative = 1] = "Relative";
})(ETipsActorTransformType = exports.ETipsActorTransformType ||= {});
exports.shapeStructTemplates = {
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
    Offset: 0,
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
  },
  [ETipsActorType.SplineEffect]: {
    Type: ETipsActorType.SplineEffect,
    EntityId: 0
  }
};
exports.pickShapeParam = pickShapeParam; //# sourceMappingURL=IShape.js.map