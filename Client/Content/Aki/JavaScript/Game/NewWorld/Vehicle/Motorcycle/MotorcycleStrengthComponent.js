"use strict";

var __decorate = this && this.__decorate || function (t, e, o, r) {
  var n;
  var i = arguments.length;
  var s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, o, r);
  } else {
    for (var l = t.length - 1; l >= 0; l--) {
      if (n = t[l]) {
        s = (i < 3 ? n(s) : i > 3 ? n(e, o, s) : n(e, o)) || s;
      }
    }
  }
  if (i > 3 && s) {
    Object.defineProperty(e, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleStrengthComponent = undefined;
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../Module/Abilities/FormationAttributeController");
const BANNED_SPRINT_THRESHOLD_MIN = 1;
const BANNED_SPRINT_THRESHOLD_MAX = 20;
let MotorcycleStrengthComponent = class MotorcycleStrengthComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.TagComp = undefined;
    this.IsCtrlByMe = false;
    this.Mrm = false;
    this.Pni = (t, e, o) => {
      if (this.Mrm) {
        if (e > BANNED_SPRINT_THRESHOLD_MAX) {
          this.Mrm = false;
          this.TagComp?.RemoveTag(1541213379);
        }
      } else if (e < BANNED_SPRINT_THRESHOLD_MIN) {
        this.Mrm = true;
        this.TagComp?.AddTag(1541213379);
      }
    };
  }
  OnStart() {
    var t;
    this.TagComp = this.Entity.GetComponent(215);
    return !!this.TagComp && (t = this.Entity.GetComponent(0), this.IsCtrlByMe = ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === t?.GetPlayerId(), this.IsCtrlByMe && FormationAttributeController_1.FormationAttributeController.AddValueListener(14, this.Pni), true);
  }
  OnEnd() {
    if (this.IsCtrlByMe) {
      FormationAttributeController_1.FormationAttributeController.RemoveValueListener(14, this.Pni);
    }
    return true;
  }
};
MotorcycleStrengthComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(273)], MotorcycleStrengthComponent);
exports.MotorcycleStrengthComponent = MotorcycleStrengthComponent; //# sourceMappingURL=MotorcycleStrengthComponent.js.map