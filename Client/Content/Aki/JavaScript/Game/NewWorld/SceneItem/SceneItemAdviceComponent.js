"use strict";

var __decorate = this && this.__decorate || function (e, t, i, n) {
  var o;
  var r = arguments.length;
  var s = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, i, n);
  } else {
    for (var m = e.length - 1; m >= 0; m--) {
      if (o = e[m]) {
        s = (r < 3 ? o(s) : r > 3 ? o(t, i, s) : o(t, i)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(t, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemAdviceComponent = undefined;
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const REVERTIME = 3000;
let SceneItemAdviceComponent = class SceneItemAdviceComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Xte = undefined;
    this.c9e = undefined;
    this.Mmn = () => {
      this.jm();
      if (this.Xte.HasTag(-3775711)) {
        this.Xte.ChangeLocalLevelTag(-1152559349, -3775711);
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, -1152559349, true);
      }
    };
  }
  OnActivate() {
    var t = this.Entity.GetComponent(207);
    if (t && t.GetInteractController()) {
      t = this.Entity.GetComponent(0);
      if (t) {
        t = t.GetAdviceInfo();
        if (t) {
          var i = this.Entity.GetComponent(126);
          if (i) {
            this.Xte = this.Entity.GetComponent(206);
            let e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceInteractText();
            e = e.replace("{PlayerName}", t.GetPlayerName());
            i.PawnName = e;
          }
        }
      }
    }
  }
  DoInteract() {
    this.jm();
    if (this.Xte.HasTag(-1152559349)) {
      this.Xte.ChangeLocalLevelTag(-3775711, -1152559349);
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, -3775711, false);
      this.jm();
      this.c9e = TimerSystem_1.TimerSystem.Delay(this.Mmn, REVERTIME);
    }
  }
  jm() {
    if (this.c9e !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.c9e);
      this.c9e = undefined;
    }
  }
  OnEnd() {
    this.jm();
    return true;
  }
};
SceneItemAdviceComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(152)], SceneItemAdviceComponent);
exports.SceneItemAdviceComponent = SceneItemAdviceComponent; //# sourceMappingURL=SceneItemAdviceComponent.js.map