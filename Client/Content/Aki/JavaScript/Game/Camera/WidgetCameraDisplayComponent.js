"use strict";

var __decorate = this && this.__decorate || function (e, t, n, r) {
  var i;
  var o = arguments.length;
  var s = o < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, n, r);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (i = e[a]) {
        s = (o < 3 ? i(s) : o > 3 ? i(t, n, s) : i(t, n)) || s;
      }
    }
  }
  if (o > 3 && s) {
    Object.defineProperty(t, n, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WidgetCameraDisplayComponent = undefined;
const ActorSystem_1 = require("../../Core/Actor/ActorSystem");
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const CameraController_1 = require("./CameraController");
let WidgetCameraDisplayComponent = class WidgetCameraDisplayComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.pxr = undefined;
    this.nye = () => {
      this.pxr = CameraController_1.CameraController.SpawnCineCamera();
      if (CameraController_1.CameraController.Model.CameraMode === 2) {
        CameraController_1.CameraController.SetViewTarget(this.pxr, "WidgetCamera.OnWorldDone");
      }
    };
    this.Kza = () => {
      if (this.pxr) {
        ActorSystem_1.ActorSystem.Put("WidgetCameraDisplayComponent.OnUiManagerClearAsync", this.pxr);
        this.pxr = undefined;
      }
    };
  }
  get CineCamera() {
    return this.pxr;
  }
  OnInit() {
    this.pxr = CameraController_1.CameraController.SpawnCineCamera();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUiManagerClearAsync, this.Kza);
    return !!this.pxr;
  }
  OnClear() {
    if (this.pxr) {
      ActorSystem_1.ActorSystem.Put("WidgetCameraDisplayComponent.OnClear", this.pxr);
      this.pxr = undefined;
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WorldDone, this.nye)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnUiManagerClearAsync, this.Kza)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUiManagerClearAsync, this.Kza);
    }
    return true;
  }
  OnChangeTimeDilation(e) {
    if (this.pxr?.IsValid()) {
      this.pxr.CustomTimeDilation = e;
    }
  }
};
WidgetCameraDisplayComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(12)], WidgetCameraDisplayComponent);
exports.WidgetCameraDisplayComponent = WidgetCameraDisplayComponent; //# sourceMappingURL=WidgetCameraDisplayComponent.js.map