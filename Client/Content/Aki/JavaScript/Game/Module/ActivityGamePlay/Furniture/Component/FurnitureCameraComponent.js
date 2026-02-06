"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureCameraComponent = undefined;
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FurnitureDefine_1 = require("../FurnitureDefine");
class FurnitureCameraComponent {
  constructor() {
    this.H4g = 0;
    this.j4g = undefined;
    this.O5g = undefined;
    this.W4g = undefined;
  }
  EnterAreaCamera(e, r) {
    this.H4g = 1;
    this.W4g = {
      AreaCameraId: e
    };
    var e = ConfigManager_1.ConfigManager.FurnitureConfig.GetAreaCameraConfig(e);
    var t = Vector_1.Vector.Create();
    t.FromConfigVector(e.CameraLocation);
    var o = e.CameraRotator;
    var t = {
      Pos: t,
      Rot: Rotator_1.Rotator.Create(o.Y, o.Z, o.X),
      Fov: e.CameraFov
    };
    var o = r ?? {
      FadeInTime: FurnitureDefine_1.FURNITURE_AREA_CAMERA_FADE_IN_TIME,
      FadeInExp: FurnitureDefine_1.FURNITURE_AREA_CAMERA_FADE_IN_EXP
    };
    this.Q4g(t, o);
  }
  EnterSlotCamera(t, o) {
    this.H4g = 2;
    this.O5g = t;
    var a = ModelManager_1.ModelManager.FurnitureModel.MapId;
    var i = t.SlotEntityId;
    var a = ModelManager_1.ModelManager.FurnitureModel.GetSceneSlotEntitySlotComponentData(a, i);
    if (a) {
      i = t.SubSlotIndex;
      t = i === FurnitureDefine_1.FURNITURE_SCENE_SLOT_SUB_SLOT_INDEX;
      let r = a.FurnitureCamera;
      if (r) {
        if (!t) {
          if (t = a.Slots[i]?.SlotCamera) {
            r = t;
          }
        }
        var a = Vector_1.Vector.Create();
        a.FromConfigVector(r.Pos);
        var i = Rotator_1.Rotator.Create(r.Rot.Y ?? 0, r.Rot.Z ?? 0, r.Rot.X ?? 0);
        var t = {
          Pos: a,
          Rot: i,
          Fov: r.Fov ?? FurnitureDefine_1.FURNITURE_SLOT_CAMERA_FOV
        };
        let e = o;
        if (!e) {
          a = r.FadeInTime;
          o = (i = r.FadeInCurve?.BlendExp) !== undefined;
          a = a !== undefined ? a : FurnitureDefine_1.FURNITURE_SLOT_CAMERA_FADE_IN_TIME;
          o = o ? i : FurnitureDefine_1.FURNITURE_SLOT_CAMERA_FADE_IN_EXP;
          e = {
            FadeInTime: a,
            FadeInExp: o
          };
        }
        this.Q4g(t, e);
      }
    }
  }
  Q4g(e, r) {
    this.j4g = e;
    var t = ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent;
    if (t) {
      t.EnterFixSceneSubCamera(e.Pos, e.Rot, e.Fov, r.FadeInTime, 0, 1, undefined, 3, r.FadeInExp, 0, 0);
    }
  }
  ExitFurnitureCamera() {
    ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitFixSceneSubCamera();
  }
  GetCameraMode() {
    return this.H4g;
  }
  GetCameraContext() {
    return this.j4g;
  }
  GetSlotContext() {
    return this.O5g;
  }
  GetAreaCameraContext() {
    return this.W4g;
  }
}
exports.FurnitureCameraComponent = FurnitureCameraComponent;
//# sourceMappingURL=FurnitureCameraComponent.js.map