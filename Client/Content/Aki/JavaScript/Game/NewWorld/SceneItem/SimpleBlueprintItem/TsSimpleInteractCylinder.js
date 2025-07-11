"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const TsSimpleInteractBase_1 = require("./TsSimpleInteractBase");
const redColor = new UE.LinearColor(1, 0, 0, 1);
const yellowColor = new UE.LinearColor(1, 1, 0, 1);
const greenColor = new UE.LinearColor(0, 1, 0, 1);
const DRAW_TIME = 0.05;
const DEFAULT_THICKNESS = 4;
const DEFAULT_ARROW_SIZE = 50;
const NOT_INTRO_SIZE = 1.5;
const DRAW_ANGLE_PERIOD = 10;
const textColor = new UE.Color(255, 128, 128, 255);
const TEXT_SIZE = 200;
const CHECK_ANGLE_PERIODIC = 1;
const MINUS_180 = -180;
const TRY_GET_ANGLE_PERIODIC = 15;
const PROFILE_KEY_CEHCK_LEGAL = "TsSimpleInteractCylinder_CheckLegal";
const PROFILE_KEY = "TsSimpleInteractCylindere_GetBestTransform";
class AngleLimit {
  constructor() {
    this.Limits = new Array();
  }
  GetAngleFromLimits(i) {
    if (this.Limits.length === 0) {
      return [i, 0];
    }
    let s = 360;
    let h = 360;
    for (const r of this.Limits) {
      if (r[2] === 0) {
        var e = r[0] - i;
        if (e > 0) {
          if (s > e) {
            s = e;
            h = r[0];
          }
          continue;
        }
        if ((e = i - r[1]) > 0) {
          if (s > e) {
            s = e;
            h = r[0];
          }
          continue;
        }
        return [i, 0];
      }
      let t = 0;
      e = r[0] - i;
      if (e > 0) {
        if (s > e) {
          s = e;
          h = r[0];
        }
        ++t;
      }
      if ((e = i - r[1]) > 0) {
        if (s > e) {
          s = e;
          h = r[0];
        }
        ++t;
      }
      if (t < 2) {
        return [i, 0];
      }
    }
    return [h, s];
  }
}
class TsSimpleInteractCylinder extends TsSimpleInteractBase_1.default {
  constructor() {
    super(...arguments);
    this.CylinderHalfHeight = 200;
    this.CylinderRadius = 500;
    this.Intro = false;
    this.Angle = 180;
    this.SelfForward = undefined;
    this.SelfRight = undefined;
    this.SelfUp = undefined;
    this.AngleLimit = undefined;
    this.ActorAngleInSelf = undefined;
    this.TmpResultLocation = undefined;
    this.ActorFinalUp = undefined;
    this.TmpLocation = undefined;
    this.TmpRotator = undefined;
    this.StartLocation = undefined;
    this.EndLocation = undefined;
  }
  Constructor() {
    super.Constructor();
    this.SelfForward = undefined;
    this.SelfRight = undefined;
    this.SelfUp = undefined;
    this.AngleLimit = undefined;
    this.ActorAngleInSelf = undefined;
    this.TmpResultLocation = undefined;
    this.ActorFinalUp = undefined;
    this.TmpLocation = undefined;
    this.TmpRotator = undefined;
    this.StartLocation = undefined;
    this.EndLocation = undefined;
  }
  OnBeginPlay() {
    this.SelfForward = Vector_1.Vector.Create();
    this.SelfRight = Vector_1.Vector.Create();
    this.SelfUp = Vector_1.Vector.Create();
    this.AngleLimit = new AngleLimit();
    this.TmpResultLocation = Vector_1.Vector.Create();
    this.TmpLocation = Vector_1.Vector.Create();
    this.TmpRotator = Rotator_1.Rotator.Create();
    this.StartLocation = Vector_1.Vector.Create();
    this.EndLocation = Vector_1.Vector.Create();
    this.ActorFinalUp = Vector_1.Vector.Create();
    super.OnBeginPlay();
  }
  UpdateData() {
    super.UpdateData();
    var t = this.SelfTransform.GetRotation();
    t.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.SelfForward);
    t.RotateVector(Vector_1.Vector.RightVectorProxy, this.SelfRight);
    this.SelfForward.CrossProduct(this.SelfRight, this.SelfUp);
    if (this.SelfUp.Z < 0) {
      this.ActorFinalUp.Set(-this.SelfUp.X, -this.SelfUp.Y, -this.SelfUp.Z);
    } else {
      this.ActorFinalUp.Set(this.SelfUp.X, this.SelfUp.Y, this.SelfUp.Z);
    }
  }
  CheckLegal() {
    this.TmpLocation ||= Vector_1.Vector.Create();
    this.StartLocation ||= Vector_1.Vector.Create();
    this.EndLocation ||= Vector_1.Vector.Create();
    if (this.IsLegal !== undefined) {
      var t = UE.EditorLevelLibrary.GetSelectedLevelActors();
      if (t.Num() === 0 || t.Get(0) !== this) {
        return this.IsLegal;
      }
    }
    if (!this.LineTrace) {
      this.InitTraceInfo();
    }
    var t = Math.min(180, this.Angle);
    var i = Math.ceil(t * 2 / CHECK_ANGLE_PERIODIC) + 1;
    var s = i > 1 ? t * 2 / (i - 1) * MathUtils_1.MathUtils.DegToRad : 0;
    let h = -t * MathUtils_1.MathUtils.DegToRad;
    for (let t = 0; t < i; ++t) {
      this.TmpLocation.X = Math.cos(h) * this.CylinderRadius;
      this.TmpLocation.Y = Math.sin(h) * this.CylinderRadius;
      this.TmpLocation.Z = -this.CylinderHalfHeight;
      this.SelfTransform.TransformPositionNoScale(this.TmpLocation, this.StartLocation);
      this.TmpLocation.Z = this.CylinderHalfHeight;
      this.SelfTransform.TransformPositionNoScale(this.TmpLocation, this.EndLocation);
      this.LineTrace.WorldContextObject = this;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.LineTrace, this.StartLocation);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.LineTrace, this.EndLocation);
      if (TraceElementCommon_1.TraceElementCommon.LineTrace(this.LineTrace, PROFILE_KEY_CEHCK_LEGAL)) {
        return false;
      }
      h += s;
    }
    return true;
  }
  OnDraw() {
    if (!this.LineTrace) {
      this.InitTraceInfo();
    }
    var i = this.IsLegal ? greenColor : yellowColor;
    var t = Math.min(180, this.Angle);
    var s = Math.floor(t * 2 / DRAW_ANGLE_PERIOD) + 1;
    var h = s > 1 ? t * 2 / (s - 1) * MathUtils_1.MathUtils.DegToRad : 0;
    let e = -t * MathUtils_1.MathUtils.DegToRad;
    var r = Vector_1.Vector.Create();
    var o = Vector_1.Vector.Create();
    var _ = Vector_1.Vector.Create();
    var a = Vector_1.Vector.Create();
    for (let t = 0; t < s; ++t) {
      this.TmpLocation.X = Math.cos(e) * this.CylinderRadius;
      this.TmpLocation.Y = Math.sin(e) * this.CylinderRadius;
      this.TmpLocation.Z = -this.CylinderHalfHeight;
      this.SelfTransform.TransformPositionNoScale(this.TmpLocation, this.StartLocation);
      this.TmpLocation.Z = this.CylinderHalfHeight;
      this.SelfTransform.TransformPositionNoScale(this.TmpLocation, this.EndLocation);
      UE.KismetSystemLibrary.D_DrawDebugLine(this, this.StartLocation.ToUeVector(), this.EndLocation.ToUeVector(), i, DRAW_TIME, DEFAULT_THICKNESS);
      if (t === 0) {
        r.DeepCopy(this.StartLocation);
        o.DeepCopy(this.EndLocation);
      } else {
        UE.KismetSystemLibrary.D_DrawDebugLine(this, _.ToUeVector(), this.StartLocation.ToUeVector(), i, DRAW_TIME, DEFAULT_THICKNESS);
        UE.KismetSystemLibrary.D_DrawDebugLine(this, a.ToUeVector(), this.EndLocation.ToUeVector(), i, DRAW_TIME, DEFAULT_THICKNESS);
      }
      _.DeepCopy(this.StartLocation);
      a.DeepCopy(this.EndLocation);
      e += h;
    }
    if (this.Angle >= 180) {
      UE.KismetSystemLibrary.D_DrawDebugLine(this, _.ToUeVector(), r.ToUeVector(), i, DRAW_TIME, DEFAULT_THICKNESS);
      UE.KismetSystemLibrary.D_DrawDebugLine(this, a.ToUeVector(), o.ToUeVector(), i, DRAW_TIME, DEFAULT_THICKNESS);
    }
    for (let t = 0; t < Math.PI * 2; t += Math.PI * 0.5) {
      this.TmpLocation.X = Math.cos(t) * this.CylinderRadius;
      this.TmpLocation.Y = Math.sin(t) * this.CylinderRadius;
      this.TmpLocation.Z = 0;
      this.SelfTransform.TransformPositionNoScale(this.TmpLocation, this.StartLocation);
      this.TmpLocation.X *= this.Intro ? 0.5 : NOT_INTRO_SIZE;
      this.TmpLocation.Y *= this.Intro ? 0.5 : NOT_INTRO_SIZE;
      this.SelfTransform.TransformPositionNoScale(this.TmpLocation, this.EndLocation);
      UE.KismetSystemLibrary.D_DrawDebugArrow(this, this.StartLocation.ToUeVector(), this.EndLocation.ToUeVector(), DEFAULT_ARROW_SIZE, redColor, DRAW_TIME, DEFAULT_THICKNESS);
    }
  }
  SetText(t) {
    this.Text.HorizontalAlignment = 1;
    this.Text.SetWorldSize(TEXT_SIZE);
    this.Text.SetTextRenderColor(textColor);
    this.Text.Text = "Cylinder " + this.TypeId;
  }
  OnGetBestTransform(t, i, s, h) {
    this.UpdateData();
    var e = this.TmpResult;
    var r = this.Intro ? this.CylinderRadius - h : this.CylinderRadius + h;
    if (r <= 0) {
      e.Success = false;
    } else {
      this.ActorLocation.FromUeVector(t.D_K2_GetActorLocation());
      this.ActorLocation.Subtraction(this.SelfLocation, this.SelfToActor);
      this.MoveOffset.FromUeVector(i);
      if (this.CalAngleLimit(r)) {
        this.TmpVector1.DeepCopy(this.ActorLocation);
        this.TmpVector1.Z += this.MoveOffset.Z;
        var o = this.MoveOffset.SizeSquared2D();
        var _ = this.ActorLocation.Z + this.MoveOffset.Z;
        var a = this.CylinderHalfHeight / this.SelfUp.Z;
        let s = MathUtils_1.MathUtils.LargeNumber;
        e.Success = false;
        let h = 1;
        for (const T of this.AngleLimit.Limits) {
          let t = T[1] - T[0];
          if (T[2] > 0) {
            t += 360;
          }
          var E = Math.ceil(t / TRY_GET_ANGLE_PERIODIC) + 1;
          var l = t / (E - 1) * MathUtils_1.MathUtils.DegToRad;
          let i = T[0] * MathUtils_1.MathUtils.DegToRad;
          for (let t = 0; t < E; ++t) {
            this.SelfForward.Multiply(Math.cos(i) * r, this.TmpVector3);
            this.SelfRight.Multiply(Math.sin(i) * r, this.TmpVector4);
            this.TmpVector3.AdditionEqual(this.TmpVector4);
            this.TmpVector3.AdditionEqual(this.SelfLocation);
            var n = _ - this.TmpVector3.Z;
            this.SelfUp.Multiply(Math.sign(n) * Math.min(Math.abs(n), a) / this.SelfUp.Z, this.TmpVector4);
            this.TmpVector3.AdditionEqual(this.TmpVector4);
            var n = Vector_1.Vector.DistSquared2D(this.TmpVector1, this.TmpVector3);
            var n = MathUtils_1.MathUtils.Square(this.TmpVector1.Z - this.TmpVector3.Z) + n + o - Math.sqrt(n * o) * 2;
            if (Math.abs(s - n) < MathUtils_1.MathUtils.KindaSmallNumber) {
              ++h;
              if (Math.random() * h < 1) {
                this.TmpResultLocation.DeepCopy(this.TmpVector3);
              }
            } else if (s > n) {
              h = 1;
              s = n;
              e.Success = true;
              this.TmpResultLocation.DeepCopy(this.TmpVector3);
            }
            i += l;
          }
        }
        if (e.Success && (this.LineTrace.WorldContextObject = t, TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.LineTrace, this.ActorLocation), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.LineTrace, this.TmpResultLocation), e.Success = !TraceElementCommon_1.TraceElementCommon.LineTrace(this.LineTrace, PROFILE_KEY), this.LineTrace.WorldContextObject = undefined, e.Success)) {
          e.Location = this.TmpResultLocation.ToUeVectorOld();
          e.SquaredOffsetLength = s;
          if (this.Intro) {
            this.TmpResultLocation.Subtraction(this.SelfLocation, this.TmpVector1);
          } else {
            this.SelfLocation.Subtraction(this.TmpResultLocation, this.TmpVector1);
          }
          MathUtils_1.MathUtils.LookRotationUpFirst(this.TmpVector1, this.ActorFinalUp, this.TmpRotator);
          e.Rotator = this.TmpRotator.ToUeRotator();
        }
      } else {
        e.Success = false;
      }
    }
    return e;
  }
  CalAngleLimit(t) {
    this.AngleLimit.Limits.length = 0;
    this.SelfTransform.InverseTransformPositionNoScale(this.ActorLocation, this.TmpVector1);
    var i = this.TmpVector1;
    var t = t * t / i.SizeSquared2D();
    if (t >= 1) {
      return !!this.Intro && (this.Angle < 180 ? this.AngleLimit.Limits.push([-this.Angle, this.Angle, 0]) : this.AngleLimit.Limits.push([MINUS_180, 180, 0]), true);
    }
    t = Math.acos(Math.sqrt(t)) * MathUtils_1.MathUtils.RadToDeg;
    this.ActorAngleInSelf = MathUtils_1.MathUtils.GetAngleByVector2D(i);
    let s = 0;
    let h = 0;
    if (this.Intro) {
      if ((h = this.ActorAngleInSelf - t) < MINUS_180) {
        h += 360;
      }
      if ((s = this.ActorAngleInSelf + t) > 180) {
        s -= 360;
      }
    } else {
      if ((s = this.ActorAngleInSelf - t) < MINUS_180) {
        s += 360;
      }
      if ((h = this.ActorAngleInSelf + t) > 180) {
        h -= 360;
      }
    }
    if (this.Angle < 180) {
      if (s < h) {
        s = Math.max(s, -this.Angle);
        h = Math.min(h, this.Angle);
        return !(s > h) && !(this.AngleLimit.Limits.push([s, h, 0]), 0);
      }
      if (s <= this.Angle && h >= -this.Angle) {
        this.AngleLimit.Limits.push([s, this.Angle, 0]);
      }
      if (h <= this.Angle && h >= -this.Angle) {
        this.AngleLimit.Limits.push([-this.Angle, h, 0]);
      }
      if (this.AngleLimit.Limits.length === 0) {
        if (s * h < 0) {
          return false;
        }
        this.AngleLimit.Limits.push([-this.Angle, this.Angle, 0]);
      }
    } else {
      this.AngleLimit.Limits.push([s, h, s < h ? 0 : 1]);
    }
    return true;
  }
}
exports.default = TsSimpleInteractCylinder;
//# sourceMappingURL=TsSimpleInteractCylinder.js.map