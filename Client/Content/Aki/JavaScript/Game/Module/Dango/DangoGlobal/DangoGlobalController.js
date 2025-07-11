"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoGlobalController = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const DangoGlobalConfig_1 = require("./DangoGlobalConfig");
class DangoGlobalController extends ControllerBase_1.ControllerBase {
  static InitGlobalConfig(e, o) {
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.BP_DangoGlobalConfig_C, e => {
      if (e?.IsValid) {
        e = DangoGlobalConfig_1.DangoGlobalConfig.Create(e);
        ModelManager_1.ModelManager.DangoGlobalModel.Config = e;
        o?.(true);
      } else {
        o?.(false);
      }
    });
  }
  static ApplyDangoMoveCamera(e) {
    var o = ModelManager_1.ModelManager.DangoGlobalModel.Config;
    if (ModelManager_1.ModelManager.CameraModel.CameraMode === 5 && o) {
      ControllerHolder_1.ControllerHolder.CameraController.FreeCamera.LogicComponent.ApplyCameraBlend(e, undefined, o.MovingCameraArmLength, o.MovingCameraBlendTime, o.MovingCameraCurve, o.MovingCameraFov);
    }
  }
  static ApplyDangoBeforeMoveCamera(o, r) {
    var a = ModelManager_1.ModelManager.DangoGlobalModel.Config;
    var l = ModelManager_1.ModelManager.CameraModel.CameraMode === 5;
    var e = ControllerHolder_1.ControllerHolder.CameraController.FreeCamera.DisplayComponent.CameraActor;
    if (a && l && e?.IsValid()) {
      var l = a.BeforeMoveCameraArmLength;
      var t = Quat_1.Quat.Create();
      var n = Vector_1.Vector.Create();
      var s = Vector_1.Vector.Create();
      t.FromUeQuat(e.K2_GetActorQuaternion());
      t.RotateVector(Vector_1.Vector.ForwardVectorProxy, s);
      s.MultiplyEqual(-l);
      s.AdditionEqual(o);
      n.FromUeVector(e.D_K2_GetActorLocation());
      var t = Vector_1.Vector.Dist(s, n);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Chess", 48, "BeforeMoveCameraDistance", ["distance", t]);
      }
      if (t < a.BeforeMoveCameraTriggerDistance) {
        r?.();
      } else {
        let e = 0;
        e = t > a.BeforeMoveCameraFarDistance ? a.BeforeMoveCameraBlendTimeFar : MathUtils_1.MathUtils.RangeClamp(t, a.BeforeMoveCameraCloseDistanceEdgeMin, a.BeforeMoveCameraCloseDistanceEdgeMax, a.BeforeMoveCameraBlendTimeCloseMin, a.BeforeMoveCameraBlendTimeCloseMax);
        ControllerHolder_1.ControllerHolder.CameraController.FreeCamera.LogicComponent.ApplyCameraBlend(o, undefined, l, e, a.BeforeMoveCameraCurve, a.BeforeMoveCameraFov, r);
      }
    } else {
      r?.();
    }
  }
}
exports.DangoGlobalController = DangoGlobalController;
//# sourceMappingURL=DangoGlobalController.js.map