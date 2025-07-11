"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocomotionUtils = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const ModelManager_1 = require("../../Manager/ModelManager");
const PROFILE_KEY = "DetectCapsuleSizeLocation";
const HIT_TIME_THREHOLD = 0.95;
const SIN_COS_45 = Math.cos(Math.PI / 4);
class LocomotionUtils {
  static Yaa(t, e, o, i, r) {
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, i);
    if (TraceElementCommon_1.TraceElementCommon.ShapeTrace(t, e, PROFILE_KEY, PROFILE_KEY) && e.HitResult) {
      if (e.HitResult.bStartPenetrating || e.HitResult.TimeArray.Get(0) <= MathUtils_1.MathUtils.SmallNumber) {
        return 1;
      } else {
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, i);
        if (TraceElementCommon_1.TraceElementCommon.ShapeTrace(t, o, PROFILE_KEY, PROFILE_KEY) && o.HitResult && o.HitResult.GetHitCount() > 0 && o.HitResult.TimeArray.Get(0) < HIT_TIME_THREHOLD) {
          return 0;
        } else {
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(e.HitResult, 0, r);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Movement", 6, "DetectCapsuleSizeLocation Found", ["Out", r]);
          }
          return 2;
        }
      }
    } else {
      return 0;
    }
  }
  static FindSpaceForExitClimb(t, e, o, i, r) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Movement", 6, "FindSpaceForExitClimb Start", ["Id", t.Entity.Id], ["HalfHeight", e], ["Radius", o], ["MinRadius", i], ["Location", t.ActorLocationProxy]);
    }
    var _;
    var a;
    var s = t.Actor.CapsuleComponent;
    if (s) {
      (_ = ModelManager_1.ModelManager.TraceElementModel.GetCapsuleTrace()).WorldContextObject = t.Actor;
      _.Radius = o;
      _.HalfHeight = e;
      t.ActorUpProxy.Multiply(1, this.Lz);
      this.Lz.AdditionEqual(t.ActorLocationProxy);
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(_, this.Lz);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(_, t.ActorLocationProxy);
      _.ActorsToIgnore.Empty();
      if (TraceElementCommon_1.TraceElementCommon.ShapeTrace(s, _, PROFILE_KEY, PROFILE_KEY) && _.HitResult) {
        if (!_.HitResult.bStartPenetrating && _.HitResult.TimeArray.Get(0) > MathUtils_1.MathUtils.SmallNumber) {
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(_.HitResult, 0, r);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Movement", 6, "FindSpaceForExitClimb No Start Penetrate", ["Out", r]);
          }
          return 2;
        } else {
          (a = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace()).WorldContextObject = t.Actor;
          a.Radius = i;
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(a, t.ActorLocationProxy);
          t.ActorUpProxy.Multiply(e / 2, this.Tz);
          t.ActorLocationProxy.Addition(this.Tz, this.Lz);
          if ((i = this.Yaa(s, _, a, this.Lz, r)) === 2 || i === 1 && (this.Lz.AdditionEqual(this.Tz), this.Yaa(s, _, a, this.Lz, r) === 2) || (t.ActorForwardProxy.Multiply(-o, this.Tz), t.ActorLocationProxy.Addition(this.Tz, this.Lz), (i = this.Yaa(s, _, a, this.Lz, r)) === 2) || i === 1 && (this.Lz.AdditionEqual(this.Tz), this.Yaa(s, _, a, this.Lz, r) === 2) || (t.ActorUpProxy.Multiply(e, this.Lz), this.Tz.AdditionEqual(this.Lz), t.ActorLocationProxy.Addition(this.Tz, this.Lz), (i = this.Yaa(s, _, a, this.Lz, r)) === 2) || i === 1 && (this.Lz.AdditionEqual(this.Tz), this.Yaa(s, _, a, this.Lz, r) === 2)) {
            return 2;
          } else {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Movement", 6, "FindSpaceForExitClimb NoSafety");
            }
            return 1;
          }
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 6, "FindSpaceForExitClimb No Hit");
        }
        return 0;
      }
    } else {
      return 0;
    }
  }
  static FindSpaceForSafety(t, e, o, i) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Movement", 6, "FindSpaceForSafety Start", ["Id", t.Entity.Id], ["HalfHeight", e], ["Radius", o], ["Location", t.ActorLocationProxy]);
    }
    var r = t.Actor.CapsuleComponent;
    if (r) {
      var _ = ModelManager_1.ModelManager.TraceElementModel.GetCapsuleTrace();
      _.WorldContextObject = t.Actor;
      _.Radius = o;
      _.HalfHeight = e;
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(_, t.ActorLocationProxy);
      var a = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
      a.WorldContextObject = t.Actor;
      a.Radius = 1;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(a, t.ActorLocationProxy);
      var o = [Vector_1.Vector.Create(0, 0, e / 2), Vector_1.Vector.Create(o * 4, 0, e / 2), Vector_1.Vector.Create(-o * 4, 0, e / 2), Vector_1.Vector.Create(0, o * 4, e / 2), Vector_1.Vector.Create(0, -o * 4, e / 2), Vector_1.Vector.Create(SIN_COS_45 * o * 4, SIN_COS_45 * o * 4, e / 2), Vector_1.Vector.Create(-SIN_COS_45 * o * 4, SIN_COS_45 * o * 4, e / 2), Vector_1.Vector.Create(SIN_COS_45 * o * 4, -SIN_COS_45 * o * 4, e / 2), Vector_1.Vector.Create(-SIN_COS_45 * o * 4, -SIN_COS_45 * o * 4, e / 2)];
      for (const n of o) {
        t.ActorQuatProxy.RotateVector(n, this.Tz);
        t.ActorLocationProxy.Addition(this.Tz, this.Lz);
        var s = this.Yaa(r, _, a, this.Lz, i);
        if (s === 2) {
          return true;
        }
        if (s === 1 && (this.Lz.AdditionEqual(this.Tz), this.Yaa(r, _, a, this.Lz, i) === 2)) {
          return true;
        }
      }
    }
    return false;
  }
}
(exports.LocomotionUtils = LocomotionUtils).Lz = Vector_1.Vector.Create();
LocomotionUtils.Tz = Vector_1.Vector.Create(); //# sourceMappingURL=LocomotionUtils.js.map