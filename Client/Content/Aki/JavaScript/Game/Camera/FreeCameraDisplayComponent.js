"use strict";

var __decorate = this && this.__decorate || function (e, t, n, r) {
  var o;
  var i = arguments.length;
  var s = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, n, r);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (o = e[a]) {
        s = (i < 3 ? o(s) : i > 3 ? o(t, n, s) : o(t, n)) || s;
      }
    }
  }
  if (i > 3 && s) {
    Object.defineProperty(t, n, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FreeCameraDisplayComponent = undefined;
const ActorSystem_1 = require("../../Core/Actor/ActorSystem");
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
let FreeCameraDisplayComponent = class FreeCameraDisplayComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.uPr = undefined;
    this.nye = () => {
      this.ti1();
    };
    this.uMe = () => {
      if (this.uPr) {
        ActorSystem_1.ActorSystem.Put("FreeCameraDisplayComponent.OnClearWorld", this.uPr);
        this.uPr = undefined;
      }
    };
  }
  get CameraActor() {
    return this.uPr;
  }
  OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearWorld, this.uMe);
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone) {
      this.ti1();
    }
    return true;
  }
  ti1() {
    if (!this.uPr) {
      this.uPr = ControllerHolder_1.ControllerHolder.CameraController.SpawnCameraActor();
      this.uPr.CustomTimeDilation = this.TimeDilation;
      if (ControllerHolder_1.ControllerHolder.CameraController.Model.CameraMode === 5) {
        ControllerHolder_1.ControllerHolder.CameraController.SetViewTarget(this.uPr, "FreeCamera.OnWorldDone");
      }
    }
  }
  OnClear() {
    if (this.uPr) {
      ActorSystem_1.ActorSystem.Put("FreeCameraDisplayComponent.OnClear", this.uPr);
      this.uPr = undefined;
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
    if (this.uPr?.IsValid()) {
      this.uPr.CustomTimeDilation = e;
    }
  }
};
FreeCameraDisplayComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(287)], FreeCameraDisplayComponent);
exports.FreeCameraDisplayComponent = FreeCameraDisplayComponent; //# sourceMappingURL=FreeCameraDisplayComponent.js.map