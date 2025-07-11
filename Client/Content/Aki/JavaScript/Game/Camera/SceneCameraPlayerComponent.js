"use strict";

var __decorate = this && this.__decorate || function (e, t, r, o) {
  var n;
  var i = arguments.length;
  var l = i < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, r) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    l = Reflect.decorate(e, t, r, o);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (n = e[a]) {
        l = (i < 3 ? n(l) : i > 3 ? n(t, r, l) : n(t, r)) || l;
      }
    }
  }
  if (i > 3 && l) {
    Object.defineProperty(t, r, l);
  }
  return l;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneCameraPlayerComponent = undefined;
const UE = require("ue");
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
const GlobalData_1 = require("../GlobalData");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
let SceneCameraPlayerComponent = class SceneCameraPlayerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ZPr = undefined;
    this.fxr = undefined;
  }
  OnStart() {
    this.ZPr = this.Entity.GetComponent(7);
    this.fxr = new Array();
    return this.ZPr.Valid;
  }
  OnEnd() {
    this.ZPr = undefined;
    return !(this.fxr = undefined);
  }
  ExitCameraMode(e = () => {}, t, r) {
    if (!ControllerHolder_1.ControllerHolder.CameraController.ExitCameraMode(3, r && r === 1 ? 0 : t ? t.FadeOut : 1, 0, 0, e)) {
      e();
    }
  }
  ExitSceneSubCamera(e, t = () => {}, r) {
    this.ZPr.RemoveBoundSceneCamera(e);
    if (ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot()) {
      this.ExitCameraMode(t, e, r);
    } else if (this.ZPr.IsIdle()) {
      if (!ModelManager_1.ModelManager.CameraModel.IsInHigherMode(3)) {
        this.ZPr.UpdateViewTarget(0);
        ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(new UE.Rotator(ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraRotation.Pitch, this.ZPr.CineCamera.K2_GetActorRotation().Yaw, ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraRotation.Roll));
      }
      this.ExitCameraMode(t, e, r);
    } else {
      this.ZPr.UpdateViewTarget();
      t();
    }
  }
  EnterSceneSubCamera(e) {
    if (e === this.ZPr.CurSceneSubCamera) {
      this.ZPr.UpdateViewTarget();
    }
  }
  EnterFixSceneSubCamera(e, t, r, o, n, i, l, a = 0, s = 0, h = 0, d = 0) {
    if (!ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot()) {
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetIsDitherEffectEnable(false);
      (i = this.ZPr.GetUnBoundSceneCamera(i)).FadeIn = o;
      i.FadeInFunc = a;
      i.FadeInExp = s;
      i.FadeOut = n;
      i.FadeOutFunc = h;
      i.FadeOutExp = d;
      i.Camera.GetCineCameraComponent().SetFieldOfView(r);
      i.Camera.CameraComponent.bConstrainAspectRatio = false;
      i.Camera.D_K2_SetActorTransform(new UE.TransformDouble(t.ToUeRotator(), e.ToUeVector(), new UE.VectorDouble(1, 1, 1)), false, undefined, true);
      this.fxr.push(i);
      if (ModelManager_1.ModelManager.CameraModel.CameraMode === 3) {
        this.EnterSceneSubCamera(i);
      } else {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Shadow.EnableCSMStable 0");
        ControllerHolder_1.ControllerHolder.CameraController.EnterCameraMode(3, o, a, s, l);
      }
    }
  }
  ExitFixSceneSubCamera(e = undefined) {
    var t = () => {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Shadow.EnableCSMStable 1");
      if (e) {
        e();
      }
    };
    if (this.fxr.length) {
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetIsDitherEffectEnable(true);
      let e = undefined;
      for (this.ZPr.CurSceneSubCamera.Type === 1 && this.ZPr.DefaultSceneSubCamera !== this.ZPr.CurSceneSubCamera && (e = this.ZPr.CurSceneSubCamera); this.fxr.length;) {
        var r = this.fxr.pop();
        this.ZPr.RemoveBoundSceneCamera(r);
      }
      if (this.ZPr.IsIdle()) {
        if (ModelManager_1.ModelManager.CameraModel.IsInHigherMode(3)) {
          this.ExitCameraMode(t);
          return;
        } else {
          if (e) {
            this.ZPr.DefaultSceneSubCamera.CopyData(e);
            this.ZPr.UpdateViewTarget(0);
          }
          ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(new UE.Rotator(ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraRotation.Pitch, this.ZPr.CineCamera.K2_GetActorRotation().Yaw, ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraRotation.Roll));
          ControllerHolder_1.ControllerHolder.CameraController.ExitCameraMode(3, this.ZPr.DefaultSceneSubCamera.FadeOut, this.ZPr.DefaultSceneSubCamera.FadeOutFunc, this.ZPr.DefaultSceneSubCamera.FadeOutExp, t);
          return;
        }
      }
      this.ZPr.UpdateViewTarget();
    }
  }
};
SceneCameraPlayerComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(8)], SceneCameraPlayerComponent);
exports.SceneCameraPlayerComponent = SceneCameraPlayerComponent; //# sourceMappingURL=SceneCameraPlayerComponent.js.map