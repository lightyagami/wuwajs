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
const DEFAULT_ARROW_SIZE = 100;
const DRAW_LENGTH = 200;
const forwardOffset = Vector_1.Vector.Create(DRAW_LENGTH, 0, 0);
const drawPoints = [new UE.Vector(0, -1, -1), new UE.Vector(0, -1, 1), new UE.Vector(0, 1, -1), new UE.Vector(0, 1, 1)];
const textColor = new UE.Color(255, 128, 128, 255);
const TEXT_SIZE = 200;
const LEGAL_CHECK_PERIOD = 100;
const SMALL_VALUE = 0.1;
const PROFILE_KEY_CEHCK_LEGAL = "TsSimpleInteractPlane_CheckLegal";
const PROFILE_KEY = "TsSimpleInteractPlane_GetBestTransform";
class TsSimpleInteractPlane extends TsSimpleInteractBase_1.default {
  constructor() {
    super(...arguments);
    this.PlaneHalfHeight = 500;
    this.PlaneHalfWidth = 500;
    this.SelfForward = undefined;
    this.SelfBackward = undefined;
    this.SelfRight = undefined;
    this.SelfUp = undefined;
    this.IsHorizontalPlane = false;
    this.TmpResultLocation = undefined;
    this.TmpResultRotator = undefined;
    this.ForwardSizeSquared2D = -0;
    this.Forward2D = undefined;
    this.NormalRotator = undefined;
    this.TmpLocation = undefined;
    this.StartLocation = undefined;
    this.EndLocation = undefined;
  }
  Constructor() {
    super.Constructor();
    this.SelfForward = undefined;
    this.SelfBackward = undefined;
    this.SelfRight = undefined;
    this.SelfUp = undefined;
    this.IsHorizontalPlane = false;
    this.TmpResultLocation = undefined;
    this.TmpResultRotator = undefined;
    this.ForwardSizeSquared2D = -0;
    this.Forward2D = undefined;
    this.NormalRotator = undefined;
    this.TmpLocation = undefined;
    this.StartLocation = undefined;
    this.EndLocation = undefined;
  }
  OnBeginPlay() {
    this.SelfForward = Vector_1.Vector.Create();
    this.SelfRight = Vector_1.Vector.Create();
    this.SelfUp = Vector_1.Vector.Create();
    this.SelfBackward = Vector_1.Vector.Create();
    this.Forward2D = Vector_1.Vector.Create();
    this.TmpResultLocation = Vector_1.Vector.Create();
    this.TmpResultRotator = Rotator_1.Rotator.Create();
    this.TmpLocation = Vector_1.Vector.Create();
    this.StartLocation = Vector_1.Vector.Create();
    this.EndLocation = Vector_1.Vector.Create();
    this.NormalRotator = Rotator_1.Rotator.Create();
    super.OnBeginPlay();
  }
  UpdateData() {
    super.UpdateData();
    var t = this.SelfTransform.GetRotation();
    t.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.SelfForward);
    t.RotateVector(Vector_1.Vector.RightVectorProxy, this.SelfRight);
    this.SelfForward.CrossProduct(this.SelfRight, this.SelfUp);
    this.ForwardSizeSquared2D = 1 - MathUtils_1.MathUtils.Square(this.SelfForward.Z);
    if (!this.IsHorizontalPlane) {
      this.Forward2D.DeepCopy(this.SelfForward);
      this.Forward2D.Z = 0;
      this.Forward2D.DivisionEqual(this.ForwardSizeSquared2D);
      MathUtils_1.MathUtils.LookRotationForwardFirst(this.SelfBackward, Vector_1.Vector.UpVectorProxy, this.NormalRotator);
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
    var i = Math.ceil(this.PlaneHalfHeight * 2 / LEGAL_CHECK_PERIOD) + 1;
    var h = i > 1 ? this.PlaneHalfHeight * 2 / (i - 1) : 0;
    let s = -this.PlaneHalfHeight;
    for (let t = 0; t < i; ++t) {
      this.TmpLocation.X = 0;
      this.TmpLocation.Y = -this.PlaneHalfWidth;
      this.TmpLocation.Z = s;
      this.SelfTransform.TransformPositionNoScale(this.TmpLocation, this.StartLocation);
      this.TmpLocation.Y = this.PlaneHalfWidth;
      this.SelfTransform.TransformPositionNoScale(this.TmpLocation, this.EndLocation);
      this.LineTrace.WorldContextObject = this;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.LineTrace, this.StartLocation);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.LineTrace, this.EndLocation);
      if (TraceElementCommon_1.TraceElementCommon.LineTrace(this.LineTrace, PROFILE_KEY_CEHCK_LEGAL)) {
        return false;
      }
      s += h;
    }
    var e = Math.ceil(this.PlaneHalfWidth * 2 / LEGAL_CHECK_PERIOD) + 1;
    var a = e > 1 ? this.PlaneHalfWidth * 2 / (e - 1) : 0;
    let r = -this.PlaneHalfWidth;
    for (let t = 0; t < e; ++t) {
      this.TmpLocation.X = 0;
      this.TmpLocation.Y = r;
      this.TmpLocation.Z = -this.PlaneHalfHeight;
      this.SelfTransform.TransformPositionNoScale(this.TmpLocation, this.StartLocation);
      this.TmpLocation.Z = this.PlaneHalfHeight;
      this.SelfTransform.TransformPositionNoScale(this.TmpLocation, this.EndLocation);
      this.LineTrace.WorldContextObject = this;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.LineTrace, this.StartLocation);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.LineTrace, this.EndLocation);
      if (TraceElementCommon_1.TraceElementCommon.LineTrace(this.LineTrace, PROFILE_KEY_CEHCK_LEGAL)) {
        return false;
      }
      r += a;
    }
    return true;
  }
  OnDraw() {
    var h = this.IsLegal ? greenColor : yellowColor;
    this.TmpLocation.X = 0;
    var s = drawPoints.length;
    for (let i = 0; i < s; ++i) {
      this.TmpLocation.Y = drawPoints[i].Y * this.PlaneHalfWidth;
      this.TmpLocation.Z = drawPoints[i].Z * this.PlaneHalfHeight;
      this.SelfTransform.TransformPositionNoScale(this.TmpLocation, this.StartLocation);
      for (let t = i + 1; t < s; ++t) {
        this.TmpLocation.Y = drawPoints[t].Y * this.PlaneHalfWidth;
        this.TmpLocation.Z = drawPoints[t].Z * this.PlaneHalfHeight;
        this.SelfTransform.TransformPositionNoScale(this.TmpLocation, this.EndLocation);
        UE.KismetSystemLibrary.D_DrawDebugLine(this, this.StartLocation.ToUeVector(), this.EndLocation.ToUeVector(), h, DRAW_TIME, DEFAULT_THICKNESS);
      }
    }
    this.SelfTransform.TransformPositionNoScale(forwardOffset, this.EndLocation);
    UE.KismetSystemLibrary.D_DrawDebugArrow(this, this.D_K2_GetActorLocation(), this.EndLocation.ToUeVector(), DEFAULT_ARROW_SIZE, redColor, DRAW_TIME, DEFAULT_THICKNESS);
  }
  SetText(t) {
    this.Text.HorizontalAlignment = 1;
    this.Text.SetWorldSize(TEXT_SIZE);
    this.Text.SetTextRenderColor(textColor);
    this.Text.Text = "Plane " + this.TypeId;
  }
  OnGetBestTransform(t, i, h, s) {
    this.UpdateData();
    var e = this.TmpResult;
    this.ActorLocation.FromUeVector(t.D_K2_GetActorLocation());
    this.ActorLocation.Subtraction(this.SelfLocation, this.SelfToActor);
    e.Success = this.SelfToActor.DotProduct(this.SelfForward) > s;
    if (e.Success) {
      this.MoveOffset.FromUeVector(i);
      if (this.IsHorizontalPlane) {
        i = this.GetBestTransformHorizontal(h, s);
        e.Location = i[0].ToUeVectorOld();
        e.Rotator = i[1].ToUeRotator();
        e.SquaredOffsetLength = i[2];
      } else {
        i = this.GetBestTransformNotHorizontal(h, s);
        e.Location = i[0].ToUeVectorOld();
        e.Rotator = i[1].ToUeRotator();
        e.SquaredOffsetLength = i[2];
      }
      this.LineTrace.WorldContextObject = t;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.LineTrace, this.ActorLocation);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.LineTrace, e.Location);
      e.Success = !TraceElementCommon_1.TraceElementCommon.LineTrace(this.LineTrace, PROFILE_KEY);
      e.Success;
    }
    return e;
  }
  GetBestTransformHorizontal(t, i) {
    var h = this.SelfRight.DotProduct(this.SelfToActor);
    var s = this.SelfUp.DotProduct(this.SelfToActor);
    var e = h + this.SelfRight.DotProduct(this.MoveOffset);
    var a = s + this.SelfUp.DotProduct(this.MoveOffset);
    var r = Math.abs(e);
    var o = Math.abs(a);
    var _ = this.PlaneHalfWidth;
    var l = this.PlaneHalfHeight;
    if (r < _ && o < l) {
      this.ActorLocation.Addition(this.MoveOffset, this.TmpResultLocation);
      o = (r = this.SelfLocation.Z + this.SelfForward.X * i) - this.TmpResultLocation.Z;
      this.TmpResultLocation.Z = r;
      MathUtils_1.MathUtils.LookRotationForwardFirst(this.SelfBackward, this.MoveOffset, this.TmpResultRotator);
      return [this.TmpResultLocation, this.TmpResultRotator, o * o];
    }
    var r = Math.abs(h);
    var o = Math.abs(s);
    var M = MathUtils_1.MathUtils.Square(r + _) + MathUtils_1.MathUtils.Square(o + l);
    var n = this.MoveOffset.SizeSquared2D();
    if (M <= n) {
      this.TmpResultLocation.X = i;
      this.TmpResultLocation.Y = e > 0 ? -_ : _;
      this.TmpResultLocation.Z = a > 0 ? -l : l;
      this.SelfTransform.TransformPositionNoScale(this.TmpResultLocation, this.TmpResultLocation);
      this.TmpResultLocation.Subtraction(this.ActorLocation, this.TmpVector1);
      MathUtils_1.MathUtils.LookRotationForwardFirst(this.SelfBackward, this.TmpVector1, this.TmpResultRotator);
      const E = MathUtils_1.MathUtils.Square(this.TmpResultLocation.Z - (this.ActorLocation.Z + this.MoveOffset.Z)) + MathUtils_1.MathUtils.Square(Math.sqrt(n) - Math.sqrt(M));
      return [this.TmpResultLocation, this.TmpResultRotator, E];
    }
    if (this.FindHitMatrixAndCircle(_, l, h, s, n, e, a)) {
      this.TmpResultLocation.X = i;
      this.TmpResultLocation.Subtraction(this.ActorLocation, this.TmpVector1);
      MathUtils_1.MathUtils.LookRotationForwardFirst(this.SelfBackward, this.TmpVector1, this.TmpResultRotator);
      const E = MathUtils_1.MathUtils.Square(this.TmpResultLocation.Z - (this.ActorLocation.Z + this.MoveOffset.Z));
      return [this.TmpResultLocation, this.TmpResultRotator, E];
    }
    this.TmpResultLocation.X = i;
    this.TmpResultLocation.Y = e > 0 ? _ : -_;
    this.TmpResultLocation.Z = a > 0 ? l : -l;
    this.SelfTransform.TransformPositionNoScale(this.TmpResultLocation, this.TmpResultLocation);
    this.TmpResultLocation.Subtraction(this.ActorLocation, this.TmpVector1);
    MathUtils_1.MathUtils.LookRotationForwardFirst(this.SelfBackward, this.TmpVector1, this.TmpResultRotator);
    M = MathUtils_1.MathUtils.Square(r - _) + MathUtils_1.MathUtils.Square(o - l);
    const E = MathUtils_1.MathUtils.Square(this.TmpResultLocation.Z - (this.ActorLocation.Z + this.MoveOffset.Z)) + n + M - Math.sqrt(n * M) * 2;
    return [this.TmpResultLocation, this.TmpResultRotator, E];
  }
  FindHitMatrixAndCircle(i, h, s, e, a, r, o) {
    let _ = a * 10;
    for (let t = 0; t < 2; ++t) {
      var l;
      var M;
      var n = t === 0 ? i : -i;
      var E = a - MathUtils_1.MathUtils.Square(s - n);
      if (E > 0 && (l = e - (E = Math.sqrt(E)), Math.abs(l) < h && (M = MathUtils_1.MathUtils.Square(n - r) + MathUtils_1.MathUtils.Square(l - o)) < _ && (_ = M, this.TmpResultLocation.Y = n, this.TmpResultLocation.Z = l), l = e + E, Math.abs(l) < h) && (M = MathUtils_1.MathUtils.Square(n - r) + MathUtils_1.MathUtils.Square(l - o)) < _) {
        _ = M;
        this.TmpResultLocation.Y = n;
        this.TmpResultLocation.Z = l;
      }
    }
    for (let t = 0; t < 2; ++t) {
      var U;
      var c;
      var m = t === 0 ? h : -h;
      var C = a - MathUtils_1.MathUtils.Square(e - m);
      if (C > 0 && (U = s - (C = Math.sqrt(C)), Math.abs(s) < i && (c = MathUtils_1.MathUtils.Square(U - r) + MathUtils_1.MathUtils.Square(m - o)) < _ && (_ = c, this.TmpResultLocation.Y = U, this.TmpResultLocation.Z = m), U = s + C, Math.abs(U) < h) && (c = MathUtils_1.MathUtils.Square(U - r) + MathUtils_1.MathUtils.Square(m - o)) < _) {
        _ = c;
        this.TmpResultLocation.Y = U;
        this.TmpResultLocation.Z = m;
      }
    }
    return _ < a * 10;
  }
  GetBestTransformNotHorizontal(t, i) {
    this.TmpVector1.DeepCopy(this.SelfToActor);
    this.TmpVector1.Z += this.MoveOffset.Z;
    var h = this.SelfForward.DotProduct(this.TmpVector1);
    var s = MathUtils_1.MathUtils.Square(h - i) / this.ForwardSizeSquared2D;
    var e = this.MoveOffset.SizeSquared2D();
    var a = this.PlaneHalfWidth;
    var r = this.PlaneHalfHeight;
    if (e <= s) {
      this.TmpVector2.DeepCopy(this.Forward2D);
      this.TmpVector2.MultiplyEqual(Math.sqrt(e));
      this.TmpVector1.SubtractionEqual(this.TmpVector2);
      this.TmpResultLocation.X = i;
      this.TmpResultLocation.Y = MathUtils_1.MathUtils.Clamp(this.SelfRight.DotProduct(this.TmpVector1), -a, a);
      this.TmpResultLocation.Z = MathUtils_1.MathUtils.Clamp(this.SelfUp.DotProduct(this.TmpVector1), -r, r);
      this.SelfTransform.TransformPositionNoScale(this.TmpResultLocation, this.TmpResultLocation);
      this.TmpResultLocation.Subtraction(this.ActorLocation, this.TmpVector1);
      return [this.TmpResultLocation, this.NormalRotator, MathUtils_1.MathUtils.Square(this.TmpVector1.Size2D() - Math.sqrt(e)) + MathUtils_1.MathUtils.Square(this.TmpVector1.Z - this.MoveOffset.Z)];
    }
    Vector_1.Vector.UpVectorProxy.CrossProduct(this.SelfForward, this.TmpVector1);
    Vector_1.Vector.UpVectorProxy.CrossProduct(this.TmpVector1, this.TmpVector2);
    this.TmpVector2.MultiplyEqual(Math.sign(h - i) * Math.sqrt(s / this.TmpVector2.SizeSquared()));
    this.TmpVector2.AdditionEqual(this.ActorLocation);
    this.TmpVector2.Z += this.MoveOffset.Z;
    this.TmpVector1.MultiplyEqual(Math.sqrt((e - s) / this.TmpVector1.SizeSquared()));
    this.TmpVector2.Addition(this.TmpVector1, this.TmpVector3);
    this.SelfTransform.InverseTransformPositionNoScale(this.TmpVector3, this.TmpVector3);
    let o = MathUtils_1.MathUtils.Square(Math.max(0, Math.abs(this.TmpVector3.Y) - a)) + MathUtils_1.MathUtils.Square(Math.max(0, Math.abs(this.TmpVector3.Z) - r));
    this.TmpVector3.Y = Math.sign(this.TmpVector3.Y) * Math.min(Math.abs(this.TmpVector3.Y), a);
    this.TmpVector3.Z = Math.sign(this.TmpVector3.Z) * Math.min(Math.abs(this.TmpVector3.Z), r);
    this.TmpVector2.Subtraction(this.TmpVector1, this.TmpVector4);
    this.SelfTransform.InverseTransformPositionNoScale(this.TmpVector4, this.TmpVector4);
    h = MathUtils_1.MathUtils.Square(Math.max(0, Math.abs(this.TmpVector4.Y) - a)) + MathUtils_1.MathUtils.Square(Math.max(0, Math.abs(this.TmpVector4.Z) - r));
    if (o > h || Math.abs(o - h) < SMALL_VALUE && Math.random() >= 0.5) {
      o = h;
      this.TmpVector4.Y = Math.sign(this.TmpVector4.Y) * Math.min(Math.abs(this.TmpVector4.Y), a);
      this.TmpVector4.Z = Math.sign(this.TmpVector4.Z) * Math.min(Math.abs(this.TmpVector4.Z), r);
      this.SelfTransform.InverseTransformPositionNoScale(this.TmpVector4, this.TmpResultLocation);
    } else {
      this.TmpVector3.Y = Math.sign(this.TmpVector3.Y) * Math.min(Math.abs(this.TmpVector3.Y), a);
      this.TmpVector3.Z = Math.sign(this.TmpVector3.Z) * Math.min(Math.abs(this.TmpVector3.Z), r);
      this.SelfTransform.InverseTransformPositionNoScale(this.TmpVector3, this.TmpResultLocation);
    }
    return [this.TmpResultLocation, this.NormalRotator, o];
  }
}
exports.default = TsSimpleInteractPlane;
//# sourceMappingURL=TsSimpleInteractPlane.js.map