"use strict";

var __decorate = this && this.__decorate || function (e, t, n, r) {
  var o;
  var a = arguments.length;
  var i = a < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, t, n, r);
  } else {
    for (var C = e.length - 1; C >= 0; C--) {
      if (o = e[C]) {
        i = (a < 3 ? o(i) : a > 3 ? o(t, n, i) : o(t, n)) || i;
      }
    }
  }
  if (a > 3 && i) {
    Object.defineProperty(t, n, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceCameraDisplayComponent = undefined;
const ActorSystem_1 = require("../../Core/Actor/ActorSystem");
const Log_1 = require("../../Core/Common/Log");
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const CameraController_1 = require("./CameraController");
let SequenceCameraDisplayComponent = class SequenceCameraDisplayComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.pxr = undefined;
    this.nye = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Camera", 57, "[SequenceCamera] Spawn OnWorldDone");
      }
      this.pxr = CameraController_1.CameraController.SpawnCineCamera();
      if (CameraController_1.CameraController.Model.CameraMode === 1) {
        CameraController_1.CameraController.SetViewTarget(this.pxr, "SequenceCamera.OnWorldDone");
      }
    };
    this.uMe = () => {
      if (this.pxr) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Camera", 57, "[SequenceCamera] Clear OnClearWorld");
        }
        ActorSystem_1.ActorSystem.Put("SequenceCameraDisplayComponent.OnClearWorld", this.pxr);
        this.pxr = undefined;
      }
    };
  }
  get CineCamera() {
    if (!this.pxr?.IsValid()) {
      this.pxr = CameraController_1.CameraController.SpawnCineCamera();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Camera", 57, "[SequenceCamera] 保底生成CineCamera");
      }
    }
    return this.pxr;
  }
  OnInit() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[SequenceCamera] Spawn OnInit");
    }
    this.pxr = CameraController_1.CameraController.SpawnCineCamera();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearWorld, this.uMe);
    return true;
  }
  OnClear() {
    if (this.pxr) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Camera", 57, "[SequenceCamera] Clear OnClear");
      }
      ActorSystem_1.ActorSystem.Put("SequenceCameraDisplayComponent.OnClearWorld", this.pxr);
      this.pxr = undefined;
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WorldDone, this.nye)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.ClearWorld, this.uMe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearWorld, this.uMe);
    }
    return true;
  }
  OnChangeTimeDilation(e) {
    if (this.pxr?.IsValid()) {
      this.pxr.CustomTimeDilation = e;
    }
  }
};
SequenceCameraDisplayComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(9)], SequenceCameraDisplayComponent);
exports.SequenceCameraDisplayComponent = SequenceCameraDisplayComponent; //# sourceMappingURL=SequenceCameraDisplayComponent.js.map