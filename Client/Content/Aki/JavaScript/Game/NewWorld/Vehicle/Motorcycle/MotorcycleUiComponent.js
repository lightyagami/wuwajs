"use strict";

var __decorate = this && this.__decorate || function (e, t, o, r) {
  var n;
  var i = arguments.length;
  var s = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, o, r);
  } else {
    for (var l = e.length - 1; l >= 0; l--) {
      if (n = e[l]) {
        s = (i < 3 ? n(s) : i > 3 ? n(t, o, s) : n(t, o)) || s;
      }
    }
  }
  if (i > 3 && s) {
    Object.defineProperty(t, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleUiComponent = undefined;
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
let MotorcycleUiComponent = class MotorcycleUiComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lie = undefined;
    this.ldt = [];
    this.LIf = (e, t) => {
      this.ZRm(74855599, t);
    };
    this.PIf = (e, t) => {
      this.TPm(-731604710, t);
      this.TPm(1217792559, t);
    };
  }
  OnStart() {
    this.Lie = this.Entity.GetComponent(254);
    return true;
  }
  OnActivate() {
    this.mdt(1506180277, this.LIf);
    this.mdt(-1330336472, this.PIf);
  }
  OnEnd() {
    this.AIf();
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    return true;
  }
  mdt(e, t) {
    var o;
    if (this.Lie && (o = this.Lie.ListenForTagAddOrRemove(e, t), this.ldt.push(o), this.Lie.HasTag(e))) {
      t(e, true);
    }
  }
  AIf() {
    if (this.ldt) {
      for (const e of this.ldt) {
        e.EndTask();
      }
      this.ldt.length = 0;
    }
  }
  ZRm(e, t) {
    var o;
    var r = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (ControllerHolder_1.ControllerHolder.FormationDataController.IsPlayerExist(r)) {
      o = ControllerHolder_1.ControllerHolder.FormationDataController.HasPlayerTag(r, e, true);
      if (t && !o) {
        ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(r, e);
      } else if (!t && o) {
        ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(r, e);
      }
    }
  }
  TPm(e, t) {
    var o;
    if (this.Lie) {
      o = this.Lie.HasTag(e);
      if (t && !o) {
        this.Lie.AddTag(e);
      } else if (!t && o) {
        this.Lie.RemoveTag(e);
      }
    }
  }
};
MotorcycleUiComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(271)], MotorcycleUiComponent);
exports.MotorcycleUiComponent = MotorcycleUiComponent; //# sourceMappingURL=MotorcycleUiComponent.js.map