"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraSplineMoveController = undefined;
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const CameraUtility_1 = require("../CameraUtility");
const CameraControllerBase_1 = require("./CameraControllerBase");
class CameraSplineMoveController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments);
    this.YawAngle = 0;
    this.PitchAngle = 0;
    this.RollAngle = 0;
    this.FadeInTime = -0;
    this.SplineId = undefined;
    this.Spline = undefined;
    this.fle = Rotator_1.Rotator.Create();
    this.Bce = Vector_1.Vector.Create();
    this.bce = 0;
    this.Gue = Rotator_1.Rotator.Create();
  }
  Name() {
    return "SplineMoveController";
  }
  OnInit() {
    this.Lock(this);
  }
  ApplyCameraSpline(t, i, s, h) {
    var e;
    if (this.SplineId === t) {
      this.ApplyCameraSplineInternal(t, this.Spline, i, s, h);
    } else {
      if (this.SplineId) {
        ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(this.SplineId, this.Camera.Entity.Id, 1);
      }
      e = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(t, this.Camera.Entity.Id, 1);
      this.ApplyCameraSplineInternal(t, e, i, s, h);
    }
  }
  ApplyCameraSplineInternal(t, i, s, h, e) {
    if (!this.SplineId) {
      this.Unlock(this);
    }
    this.Gue.Set(h, s, 0);
    CameraUtility_1.CameraUtility.GetRotatorInGravity(this.Gue, this.Gue);
    this.SplineId = t;
    this.Spline = i;
    this.YawAngle = this.Gue.Yaw;
    this.PitchAngle = this.Gue.Pitch;
    this.RollAngle = this.Gue.Roll;
    this.FadeInTime = e;
    this.bce = 0;
    this.fle.DeepCopy(this.Camera.CameraRotationInGravity);
  }
  EndCameraSpline() {
    if (this.SplineId) {
      ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(this.SplineId, this.Camera.Entity.Id, 1);
      this.SplineId = undefined;
      this.Spline = undefined;
      this.Lock(this);
    }
  }
  OnEnable() {
    this.Camera.CameraAdjustController.Lock(this);
    this.Camera.CameraInputController.Lock(this);
    this.Camera.CameraClimbController.Lock(this);
    this.Camera.CameraFocusController.Lock(this);
    this.Camera.CameraModifyController.Lock(this);
  }
  OnDisable() {
    this.Camera.CameraAdjustController.Unlock(this);
    this.Camera.CameraInputController.Unlock(this);
    this.Camera.CameraClimbController.Unlock(this);
    this.Camera.CameraFocusController.Unlock(this);
    this.Camera.CameraModifyController.Unlock(this);
  }
  UpdateInternal(t) {
    var i;
    if (this.Spline && Global_1.Global.BaseCharacter) {
      i = this.Spline.D_FindInputKeyClosestToWorldLocation(Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy.ToUeVector());
      this.Bce.FromUeVector(this.Spline.GetDirectionAtSplineInputKey(i, 1));
      i = this.Bce.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg;
      if (this.bce < this.FadeInTime) {
        this.bce = Math.min(this.FadeInTime, this.bce + t);
        t = MathUtils_1.MathUtils.GetCubicValue(this.bce / this.FadeInTime);
        this.Gue.Set(this.PitchAngle, i + this.YawAngle, this.RollAngle);
        Rotator_1.Rotator.Lerp(this.fle, this.Gue, t, this.Gue);
      } else {
        this.Gue.Set(this.PitchAngle, i + this.YawAngle, 0);
      }
      CameraUtility_1.CameraUtility.SetRotatorInGravity(this.Camera.DesiredCamera.ArmRotation, this.Gue);
      this.Camera.IsModifiedArmRotationPitch = true;
      this.Camera.IsModifiedArmRotationYaw = true;
    }
  }
}
exports.CameraSplineMoveController = CameraSplineMoveController;
//# sourceMappingURL=CameraSplineMoveController.js.map