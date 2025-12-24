"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCamera = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Stack_1 = require("../../../Core/Container/Stack");
const CameraController_1 = require("../../Camera/CameraController");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiCameraPostEffectComponent_1 = require("./UiCameraComponent/UiCameraPostEffectComponent");
const UiCameraSequenceComponent_1 = require("./UiCameraComponent/UiCameraSequenceComponent");
class UiCamera {
  constructor() {
    this.CameraActor = undefined;
    this.CineCameraComponent = undefined;
    this.$Ro = new Map();
    this.YRo = new Stack_1.Stack();
    this.JRo = false;
  }
  Initialize() {
    var e = CameraController_1.CameraController.WidgetCamera;
    if (e) {
      if ((e = e.GetComponent(12)).Valid) {
        if ((e = e.CineCamera)?.IsValid()) {
          this.CameraActor = e;
          this.CameraActor.SetTickableWhenPaused(true);
          this.CineCameraComponent = e.GetCineCameraComponent();
          this.CineCameraComponent?.SetTickableWhenPaused(true);
          this.AddUiCameraComponent(UiCameraPostEffectComponent_1.UiCameraPostEffectComponent);
          this.AddUiCameraComponent(UiCameraSequenceComponent_1.UiCameraSequenceComponent);
          return true;
        } else {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("UiCamera", 58, "初始化界面摄像机时，CameraActor不可用");
          }
          return false;
        }
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("UiCamera", 58, "初始化界面摄像机时，找不到 WidgetCameraDisplayComponent 组件");
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiCamera", 58, "初始化界面摄像机时，找不到 widgetCamera 组件");
      }
      return false;
    }
  }
  Destroy(e = 0, t = 0, r = 0) {
    this.Exit(e, t, r);
    this.zRo();
    this.CameraActor = undefined;
    this.CineCameraComponent = undefined;
  }
  SetWorldLocation(e) {
    if (this.CameraActor?.IsValid()) {
      this.CameraActor.D_K2_SetActorLocation(e, false, undefined, false);
    }
  }
  SetWorldRotation(e) {
    if (this.CameraActor?.IsValid()) {
      this.CameraActor.K2_SetActorRotation(e, false);
    }
  }
  Enter(e = 0, t = 0, r = 0, o) {
    if (this.JRo) {
      CameraController_1.CameraController.EnterCameraMode(2, e, t, r);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCamera", 58, "进入Ui相机", ["blendTime", e], ["blendFunction", t], ["blendExp", r]);
      }
      for (const i of this.$Ro.values()) {
        i.Activate();
      }
      CameraController_1.CameraController.EnterCameraMode(2, e, t, r, o);
      this.JRo = true;
    }
  }
  Exit(e = 0, t = 0, r = 0) {
    if (this.JRo) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCamera", 58, "退出Ui相机", ["blendTime", e], ["blendFunction", t], ["blendExp", r]);
      }
      if (ModelManager_1.ModelManager.CameraModel.LogicHideHeadEnabled) {
        CameraController_1.CameraController.ExitCameraMode(2, 0, 0, 0);
      } else {
        CameraController_1.CameraController.ExitCameraMode(2, e, t, r);
      }
      for (const o of this.$Ro.values()) {
        o.Deactivate();
      }
      this.ClearStructure();
      this.JRo = false;
    } else {
      CameraController_1.CameraController.ExitCameraMode(2, e, t, r);
    }
  }
  PushStructure(e) {
    if (e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCamera", 45, "PushStructure:", ["this.UiCameraStructureStack.Peek()?.constructor.name", this.YRo.Peek()?.constructor.name], ["uiCameraStructureClass.name", e.name]);
      }
      if (this.YRo.Peek()?.constructor.name === e.name) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCamera", 45, "PushStructure时，已经有相同的UiCameraStructure，直接返回此UiCameraStructure:", ["Name", this.YRo.Peek()?.constructor.name]);
        }
        return this.YRo.Peek();
      } else {
        (e = new e()).Initialize(this);
        e.Activate();
        this.YRo.Push(e);
        return e;
      }
    }
  }
  PopStructure() {
    this.YRo.Pop().Destroy();
    this.YRo.Peek()?.Activate();
  }
  GetStructure() {
    return this.YRo.Peek();
  }
  ClearStructure() {
    for (const e of this.YRo) {
      e.Destroy();
    }
    this.YRo.Clear();
  }
  AddUiCameraComponent(e, t = true) {
    let r = this.$Ro.get(e);
    if (!r) {
      (r = new e()).Initialize(this);
      this.$Ro.set(e, r);
    }
    if (this.JRo && t) {
      r.Activate();
    }
    return r;
  }
  DestroyUiCameraComponent(e) {
    var t = this.$Ro.get(e);
    if (t) {
      t.Destroy();
      this.$Ro.delete(e);
    }
  }
  zRo() {
    for (const e of this.$Ro.values()) {
      e.Destroy();
    }
    this.$Ro.clear();
  }
  GetUiCameraComponent(e) {
    return this.$Ro.get(e);
  }
  GetCameraActor() {
    return this.CameraActor;
  }
  GetCineCameraComponent() {
    return this.CineCameraComponent;
  }
  GetIsEntered() {
    return this.JRo;
  }
}
exports.UiCamera = UiCamera;
//# sourceMappingURL=UiCamera.js.map