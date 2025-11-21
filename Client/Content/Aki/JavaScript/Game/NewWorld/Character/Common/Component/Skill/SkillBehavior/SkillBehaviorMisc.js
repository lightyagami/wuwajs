"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compare = exports.traceGroundWithGravity = exports.traceWall = exports.getLocationAndDirection = exports.getEndSkillBehaviorParamList = exports.CONTEXT = exports.paramMap = exports.angles = undefined;
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../../../../../Core/Define/QueryTypeDefine");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../../../../../Core/Utils/TraceElementCommon");
const ColorUtils_1 = require("../../../../../../Utils/ColorUtils");
const CharacterSwimComponent_1 = require("../../CharacterSwimComponent");
exports.angles = [0, 270, 90, 180];
exports.paramMap = new Map();
exports.CONTEXT = "SkillBehaviorAction.SetLocation";
const DELTA_HEIGHT = 2500;
let lineTraceStatic = undefined;
let lineTraceWater = undefined;
function getEndSkillBehaviorParamList(e) {
  if (!exports.paramMap.has(e)) {
    exports.paramMap.set(e, []);
  }
  return exports.paramMap.get(e);
}
function getLocationAndDirection(e) {
  return [e.D_K2_GetActorLocation(), e.D_GetActorForwardVector()];
}
function setupLineTrace(r, e, t, o) {
  r.bIsSingle = true;
  r.bIgnoreSelf = true;
  r.DrawTime = 5;
  TraceElementCommon_1.TraceElementCommon.SetTraceColor(r, e);
  TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(r, t);
  if (o instanceof Array) {
    o.forEach(e => {
      r.AddObjectTypeQuery(e);
    });
  } else {
    r.SetTraceTypeQuery(o);
  }
}
function getLineTrace(e, r, t) {
  let o = undefined;
  switch (t) {
    case 0:
      if (!lineTraceStatic) {
        setupLineTrace(lineTraceStatic = UE.NewObject(UE.TraceLineElement.StaticClass()), ColorUtils_1.ColorUtils.LinearGreen, ColorUtils_1.ColorUtils.LinearRed, [QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic, QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet]);
      }
      o = lineTraceStatic;
      break;
    case 1:
      if (!lineTraceWater) {
        setupLineTrace(lineTraceWater = UE.NewObject(UE.TraceLineElement.StaticClass()), ColorUtils_1.ColorUtils.LinearBlue, ColorUtils_1.ColorUtils.LinearYellow, QueryTypeDefine_1.KuroTraceTypeQuery.Water);
      }
      o = lineTraceWater;
  }
  if (r) {
    o.SetDrawDebugTrace(2);
  } else {
    o.SetDrawDebugTrace(0);
  }
  o.WorldContextObject = e;
  o.ClearCacheData();
  return o;
}
function backward(e, r, t, o) {
  var n = Vector_1.Vector.Create();
  t.Subtraction(r, n);
  n.Normalize();
  n.Multiply(e, n);
  o.Subtraction(n, o);
}
function traceWall(e, r, t, o) {
  var o = getLineTrace(e.Actor, o, 0);
  TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, r);
  TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, t);
  var n = TraceElementCommon_1.TraceElementCommon.LineTrace(o, exports.CONTEXT + ".traceWall");
  var o = o.HitResult;
  if (n && o.bBlockingHit) {
    TraceElementCommon_1.TraceElementCommon.GetHitLocation(o, 0, t);
    if (r.Equals(t)) {
      return undefined;
    } else {
      backward(e.ScaledRadius, r, t, t);
      return [o, t];
    }
  } else {
    return [undefined, t];
  }
}
function traceWater(e, r, t, o) {
  e = getLineTrace(e.Actor, o, 1);
  TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, r);
  TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, t);
  o = TraceElementCommon_1.TraceElementCommon.LineTrace(e, exports.CONTEXT + ".traceWater");
  r = e.HitResult;
  if (o && r.bBlockingHit) {
    t = Vector_1.Vector.Create();
    TraceElementCommon_1.TraceElementCommon.GetHitLocation(r, 0, t);
    return [true, t];
  } else {
    return [false, undefined];
  }
}
function traceGroundWithGravity(e, r, t, o = DELTA_HEIGHT) {
  var n = e.Entity.GetComponent(182);
  var a = e.Entity.GetComponent(77);
  var i = Vector_1.Vector.Create();
  var c = i;
  n.GravityUp.Multiply(o, c);
  r.Subtraction(c, i);
  var o = getLineTrace(e.Actor, t, 0);
  TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, r);
  TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, i);
  var r = TraceElementCommon_1.TraceElementCommon.LineTrace(o, exports.CONTEXT + ".traceGround");
  var i = o.HitResult;
  if (r && i.bBlockingHit) {
    o = Vector_1.Vector.Create();
    r = Vector_1.Vector.Create();
    TraceElementCommon_1.TraceElementCommon.GetHitLocation(i, 0, o);
    n.GravityUp.Multiply(e.ScaledHalfHeight, c);
    e.ActorLocationProxy.Addition(c, r);
    i = traceWater(e, r, o, t);
    if (i[0]) {
      if (i[1].Subtraction(o, r).DotProduct(n.GravityUp) >= e.ScaledHalfHeight * 2 * CharacterSwimComponent_1.LEAVE_SWIM_LESS_THAN_THIS) {
        return [false, undefined];
      }
    }
    if (a?.CheckUpWaterSurface()) {
      return [false, undefined];
    } else {
      o.AdditionEqual(c);
      return [true, o];
    }
  }
  return [false, undefined];
}
function compare(e, r, t, o, n) {
  switch (e) {
    case 0:
      return t < r;
    case 1:
      return t <= r;
    case 2:
      return r === t;
    case 3:
      return r < t;
    case 4:
      return r <= t;
    case 5:
      return o <= r && r <= n;
    default:
      return false;
  }
}
exports.getEndSkillBehaviorParamList = getEndSkillBehaviorParamList;
exports.getLocationAndDirection = getLocationAndDirection;
exports.traceWall = traceWall;
exports.traceGroundWithGravity = traceGroundWithGravity;
exports.compare = compare; //# sourceMappingURL=SkillBehaviorMisc.js.map