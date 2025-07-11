"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const TickSystem_1 = require("../../../../Core/Tick/TickSystem");
class UiCameraComponent {
  constructor() {
    this.OwnerUiCamera = undefined;
    this.CameraActor = undefined;
    this.CineCameraComponent = undefined;
    this.UYi = TickSystem_1.TickSystem.InvalidId;
    this.ZRo = false;
    this.r6 = t => {
      this.OnTick(t);
    };
  }
  Initialize(t) {
    this.OwnerUiCamera = t;
    this.CameraActor = this.OwnerUiCamera.GetCameraActor();
    this.CameraActor.SetTickableWhenPaused(true);
    this.CineCameraComponent = this.OwnerUiCamera.GetCineCameraComponent();
    this.CineCameraComponent?.SetTickableWhenPaused(true);
    this.OnInitialize();
  }
  Destroy() {
    this.CameraActor = undefined;
    this.CineCameraComponent = undefined;
    this.Deactivate();
    this.OnDestroy();
  }
  Activate() {
    if (!this.ZRo) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCamera", 58, "激活相机组件", ["Name", this.constructor.name]);
      }
      this.OnAddEvents();
      this.OnActivate();
      this.ZRo = true;
    }
  }
  Deactivate() {
    if (this.ZRo) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCamera", 58, "休眠相机组件", ["Name", this.constructor.name]);
      }
      this.RemoveTick();
      this.OnRemoveEvents();
      this.OnDeactivate();
      this.ZRo = false;
    }
  }
  EnableTick() {
    if (this.UYi === TickSystem_1.TickSystem.InvalidId) {
      this.UYi = TickSystem_1.TickSystem.Add(this.r6, this.constructor.name, 0, true, undefined, true).Id;
    }
  }
  ResumeTick() {
    if (this.UYi !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Resume(this.UYi);
    }
  }
  PauseTick() {
    if (this.UYi !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Pause(this.UYi);
    }
  }
  RemoveTick() {
    if (this.UYi !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.UYi);
      this.UYi = TickSystem_1.TickSystem.InvalidId;
    }
  }
  OnInitialize() {}
  OnDestroy() {}
  OnActivate() {}
  OnDeactivate() {}
  OnAddEvents() {}
  OnRemoveEvents() {}
  OnTick(t) {}
  GetIsActivate() {
    return this.ZRo;
  }
  GetCameraStructure() {
    return this.OwnerUiCamera.GetStructure();
  }
}
exports.UiCameraComponent = UiCameraComponent;
//# sourceMappingURL=UiCameraComponent.js.map