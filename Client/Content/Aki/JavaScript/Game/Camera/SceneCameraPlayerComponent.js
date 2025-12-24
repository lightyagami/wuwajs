"use strict";

var __decorate = this && this.__decorate || function (e, t, r, o) {
  var i;
  var n = arguments.length;
  var a = n < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, r) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(e, t, r, o);
  } else {
    for (var l = e.length - 1; l >= 0; l--) {
      if (i = e[l]) {
        a = (n < 3 ? i(a) : n > 3 ? i(t, r, a) : i(t, r)) || a;
      }
    }
  }
  if (n > 3 && a) {
    Object.defineProperty(t, r, a);
  }
  return a;
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
  EnterFixSceneSubCamera(e, t, r, o, i, n, a, l = 0, s = 0, h = 0, d = 0, C = false, _ = undefined) {
    if (!ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot()) {
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetIsDitherEffectEnable(false);
      (n = this.ZPr.GetUnBoundSceneCamera(n)).FadeIn = o;
      n.FadeInFunc = l;
      n.FadeInExp = s;
      n.FadeOut = i;
      n.FadeOutFunc = h;
      n.FadeOutExp = d;
      n.Camera.GetCineCameraComponent().SetFieldOfView(r);
      n.Camera.CameraComponent.bConstrainAspectRatio = false;
      n.IsCameraAberrationEnable = C;
      n.CameraAberrationView = _;
      n.Camera.D_K2_SetActorTransform(new UE.TransformDouble(t.ToUeRotator(), e.ToUeVector(), new UE.VectorDouble(1, 1, 1)), false, undefined, true);
      this.fxr.push(n);
      if (ModelManager_1.ModelManager.CameraModel.CameraMode === 3) {
        this.EnterSceneSubCamera(n);
      } else {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Shadow.EnableCSMStable 0");
        ControllerHolder_1.ControllerHolder.CameraController.EnterCameraMode(3, o, l, s, a);
        this.ZPr?.EnableExtraCameraAction();
      }
    }
  }
  ExitFixSceneSubCamera(e = undefined, t = true) {
    var r = () => {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Shadow.EnableCSMStable 1");
      if (e) {
        e();
      }
    };
    if (this.fxr.length) {
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetIsDitherEffectEnable(true);
      let e = undefined;
      for (this.ZPr.CurSceneSubCamera.Type === 1 && this.ZPr.DefaultSceneSubCamera !== this.ZPr.CurSceneSubCamera && (e = this.ZPr.CurSceneSubCamera); this.fxr.length;) {
        var o = this.fxr.pop();
        this.ZPr.RemoveBoundSceneCamera(o);
      }
      if (this.ZPr.IsIdle()) {
        if (ModelManager_1.ModelManager.CameraModel.IsInHigherMode(3)) {
          this.ExitCameraMode(r);
          return;
        } else {
          if (e) {
            this.ZPr.DefaultSceneSubCamera.CopyData(e);
            this.ZPr.UpdateViewTarget(0);
          }
          if (t) {
            ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(new UE.Rotator(ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraRotation.Pitch, this.ZPr.CineCamera.K2_GetActorRotation().Yaw, ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraRotation.Roll));
          }
          ControllerHolder_1.ControllerHolder.CameraController.ExitCameraMode(3, this.ZPr.DefaultSceneSubCamera.FadeOut, this.ZPr.DefaultSceneSubCamera.FadeOutFunc, this.ZPr.DefaultSceneSubCamera.FadeOutExp, r);
          return;
        }
      }
      this.ZPr.UpdateViewTarget();
    }
  }
  IsCameraAberrationEnable() {
    return this.ZPr.CurSceneSubCamera.IsCameraAberrationEnable;
  }
  EnableOrthographicToPerspectiveView(e = undefined) {
    this.ZPr.EnableOrthographicToPerspectiveView(e);
  }
  IsDefaultSubCameraValid() {
    return this.ZPr?.DefaultSceneSubCamera?.Camera?.IsValid() ?? false;
  }
};
SceneCameraPlayerComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(8)], SceneCameraPlayerComponent);
exports.SceneCameraPlayerComponent = SceneCameraPlayerComponent; //# sourceMappingURL=SceneCameraPlayerComponent.js.map