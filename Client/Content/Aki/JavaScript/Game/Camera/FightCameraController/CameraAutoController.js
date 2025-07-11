"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraAutoController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../GlobalData");
const CameraUtility_1 = require("../CameraUtility");
const CameraControllerBase_1 = require("./CameraControllerBase");
const IS_DEBUG = false;
class CameraAutoController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments);
    this.AutoCameraArmLengthWhenTargetNearer = 0;
    this.AutoCameraScreenStandardRectangleBottom = 0;
    this.AutoCameraArmOffsetRateVertical = 0;
    this.AutoCameraArmPullLagSpeed = 0;
    this.AutoCameraArmMoveLagSpeed = 0;
    this.CheckAdjustInScreenMinX = 0;
    this.CheckAdjustInScreenMaxX = 0;
    this.CheckAdjustInScreenMinY = 0;
    this.CheckAdjustInScreenMaxY = 0;
    this.AutoCameraArmOffsetSpeedVertical = 0;
    this.ExtraArmLengthMinByDist = 0;
    this.ExtraArmLengthMaxByDist = 0;
    this.ExtraArmLengthDist = 0;
    this.ExtraArmLengthCurveByDist = undefined;
    this.ExtraArmLengthMinByHeight = 0;
    this.ExtraArmLengthMaxByHeight = 0;
    this.ExtraArmLengthHeight = 0;
    this.ExtraArmLengthCurveByHeight = undefined;
    this.ExtraArmHorizontalMinByDist = 0;
    this.ExtraArmHorizontalMaxByDist = 0;
    this.ExtraArmHorizontalDist = 0;
    this.ExtraArmHorizontalCurveByDist = undefined;
    this.ExtraArmVerticalMinByHeight = 0;
    this.ExtraArmVerticalMaxByHeight = 0;
    this.ExtraArmVerticalHeightMin = 0;
    this.ExtraArmVerticalHeightMax = 0;
    this.ExtraArmVerticalCurveByHeight = undefined;
    this.CurrentAutoCameraArmLengthAddition = 0;
    this.ule = 0;
    this.CurrentAutoCameraArmOffset = Vector_1.Vector.Create();
    this.cle = Vector_1.Vector.Create();
    this.DesiredOffsetHeight = 0;
    this.CurrentOffsetHeight = 0;
    this.mle = new Set();
    this.ResultPositionRef = (0, puerts_1.$ref)(undefined);
    this.Lz = Vector_1.Vector.Create();
    this.Tz = Vector_1.Vector.Create();
  }
  Name() {
    return "AutoController";
  }
  OnInit() {
    this.SetConfigMap(1, "AutoCameraArmLengthWhenTargetNearer");
    this.SetConfigMap(6, "AutoCameraScreenStandardRectangleBottom");
    this.SetConfigMap(7, "AutoCameraArmOffsetRateVertical");
    this.SetConfigMap(11, "AutoCameraArmPullLagSpeed");
    this.SetConfigMap(12, "AutoCameraArmMoveLagSpeed");
    this.SetConfigMap(13, "CheckAdjustInScreenMinX");
    this.SetConfigMap(14, "CheckAdjustInScreenMaxX");
    this.SetConfigMap(15, "CheckAdjustInScreenMinY");
    this.SetConfigMap(16, "CheckAdjustInScreenMaxY");
    this.SetConfigMap(22, "AutoCameraArmOffsetSpeedVertical");
    this.SetConfigMap(2, "ExtraArmLengthMinByDist");
    this.SetConfigMap(3, "ExtraArmLengthMaxByDist");
    this.SetConfigMap(4, "ExtraArmLengthDist");
    this.SetCurveConfigMap(4, "ExtraArmLengthCurveByDist");
    this.SetConfigMap(5, "ExtraArmLengthMinByHeight");
    this.SetConfigMap(8, "ExtraArmLengthMaxByHeight");
    this.SetConfigMap(9, "ExtraArmLengthHeight");
    this.SetCurveConfigMap(9, "ExtraArmLengthCurveByHeight");
    this.SetConfigMap(10, "ExtraArmHorizontalMinByDist");
    this.SetConfigMap(17, "ExtraArmHorizontalMaxByDist");
    this.SetConfigMap(18, "ExtraArmHorizontalDist");
    this.SetCurveConfigMap(18, "ExtraArmHorizontalCurveByDist");
    this.SetConfigMap(19, "ExtraArmVerticalMinByHeight");
    this.SetConfigMap(20, "ExtraArmVerticalMaxByHeight");
    this.SetConfigMap(23, "ExtraArmVerticalHeightMin");
    this.SetConfigMap(21, "ExtraArmVerticalHeightMax");
    this.SetCurveConfigMap(21, "ExtraArmVerticalCurveByHeight");
  }
  OnEnable() {
    this.DesiredOffsetHeight = 0;
    this.CurrentOffsetHeight = 0;
    this.Camera.CameraSidestepController.Lock(this);
  }
  OnDisable() {
    this.Camera.CameraSidestepController.Unlock(this);
  }
  EnableForce(t) {
    this.mle.add(t);
  }
  DisableForce(t) {
    this.mle.delete(t);
  }
  UpdateCustomEnableCondition() {
    return !!this.Camera.TargetEntity && (this.mle.size > 0 || (CameraUtility_1.CameraUtility.GetSocketLocation(undefined, this.Camera.TargetSocketName, this.Lz, this.Camera.TargetEntity), this.IsActivate && this.Camera.CheckPositionInScreen(this.Lz, this.CheckAdjustInScreenMinX, this.CheckAdjustInScreenMaxX, this.CheckAdjustInScreenMinY, this.CheckAdjustInScreenMaxY)));
  }
  UpdateInternal(t) {
    var i;
    var s;
    var h;
    var e;
    var r;
    if (this.Camera.TargetEntity && this.Camera.IsTargetLocationValid) {
      i = this.Camera.PlayerLocation;
      e = this.Camera.TargetLocation;
      h = this.Camera.CameraForward;
      r = Vector_1.Vector.Create();
      e.Subtraction(i, r);
      s = !r.IsNearlyZero() && !h.IsNearlyZero();
      r = r.CosineAngle2D(h);
      h = Vector_1.Vector.Dist(i, e);
      CameraUtility_1.CameraUtility.GetVectorInGravity(e, this.Lz);
      this.ule = MathUtils_1.MathUtils.Lerp(this.ExtraArmLengthMinByDist, this.ExtraArmLengthMaxByDist, this.ExtraArmLengthCurveByDist.GetCurrentValue(h / this.ExtraArmLengthDist)) + MathUtils_1.MathUtils.Lerp(this.ExtraArmLengthMinByHeight, this.ExtraArmLengthMaxByHeight, this.ExtraArmLengthCurveByHeight.GetCurrentValue(Math.abs(this.Camera.PlayerLocationInGravity.Z - this.Lz.Z) / this.ExtraArmLengthHeight));
      if (s && r < 0) {
        this.ule += this.AutoCameraArmLengthWhenTargetNearer;
      }
      s = Vector_1.Vector.Create();
      r = this.Tz;
      e.Subtraction(i, s);
      CameraUtility_1.CameraUtility.GetVectorInGravity(s, r);
      e = MathUtils_1.MathUtils.Lerp(this.ExtraArmHorizontalMinByDist, this.ExtraArmHorizontalMaxByDist, this.ExtraArmHorizontalCurveByDist.GetCurrentValue(h / this.ExtraArmHorizontalDist));
      r.Z = 0;
      if (r.IsNearlyZero()) {
        this.cle.Reset();
      } else {
        r.Multiply(e / r.Size2D(), this.cle);
      }
      s = this.Lz.Z - this.Camera.PlayerLocationInGravity.Z;
      h = MathUtils_1.MathUtils.Lerp(this.ExtraArmVerticalMinByHeight, this.ExtraArmVerticalMaxByHeight, this.ExtraArmVerticalCurveByHeight.GetCurrentValue(MathUtils_1.MathUtils.RangeClamp(s, this.ExtraArmVerticalHeightMin, this.ExtraArmVerticalHeightMax, 0, 1)));
      e = this.dle(i);
      this.DesiredOffsetHeight = (this.AutoCameraScreenStandardRectangleBottom - e) * this.AutoCameraArmOffsetRateVertical;
      r = this.DesiredOffsetHeight - this.CurrentOffsetHeight;
      this.CurrentOffsetHeight += Math.abs(r) > this.AutoCameraArmOffsetSpeedVertical ? Math.sign(r) * this.AutoCameraArmOffsetSpeedVertical : r;
      h += this.CurrentOffsetHeight;
      if (this.Camera.IsInNormalGravityMode()) {
        this.cle.Z = h;
      } else {
        CameraUtility_1.CameraUtility.SetZnInGravity(this.cle, h, this.cle);
      }
      this.Cle(t, true);
    }
  }
  UpdateDeactivateInternal(t) {
    this.ule = 0;
    this.cle.Reset();
    this.Cle(t, false);
  }
  Cle(t, i) {
    var s;
    var h;
    if (!this.Camera.CameraModifyController?.ModifySettings?.IsModifiedArmLength && !this.Camera.CameraModifyController?.ModifyFadeOutData?.ModifyArmLength) {
      this.CurrentAutoCameraArmLengthAddition = MathUtils_1.MathUtils.InterpTo(this.CurrentAutoCameraArmLengthAddition, this.ule, t, this.AutoCameraArmPullLagSpeed);
    }
    if (!this.Camera.CameraModifyController?.ModifySettings?.IsLerpArmLocation) {
      MathUtils_1.MathUtils.VectorInterpTo(this.CurrentAutoCameraArmOffset, this.cle, t, this.AutoCameraArmMoveLagSpeed, this.CurrentAutoCameraArmOffset);
    }
    if (IS_DEBUG && (t = this.Camera.PlayerLocation, (s = Vector_1.Vector.Create(t)).AdditionEqual(this.CurrentAutoCameraArmOffset), (h = Vector_1.Vector.Create(t)).AdditionEqual(this.cle), UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, t.ToUeVector(), s.ToUeVector(), new UE.LinearColor(0, 1, 0, 1), 0, 5), UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, s.ToUeVector(), h.ToUeVector(), new UE.LinearColor(1, 1, 0, 1), 0, 5), i) && this.Camera.IsTargetLocationValid) {
      t = this.Camera.TargetLocation;
      UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, t.ToUeVector(), h.ToUeVector(), new UE.LinearColor(1, 0, 0, 1), 0, 5);
    }
  }
  dle(t) {
    if (!this.Camera.CharacterController) {
      return 0;
    }
    UE.GameplayStatics.D_ProjectWorldToScreen(this.Camera.CharacterController, t.ToUeVector(), this.ResultPositionRef, false);
    var t = (0, puerts_1.$unref)(this.ResultPositionRef);
    var i = (0, puerts_1.$ref)(0);
    var s = (0, puerts_1.$ref)(0);
    this.Camera.CharacterController.GetViewportSize(i, s);
    if (MathUtils_1.MathUtils.IsNearlyZero((0, puerts_1.$unref)(s), MathUtils_1.MathUtils.KindaSmallNumber)) {
      return 0;
    } else {
      return t.Y / (0, puerts_1.$unref)(s);
    }
  }
}
exports.CameraAutoController = CameraAutoController;
//# sourceMappingURL=CameraAutoController.js.map