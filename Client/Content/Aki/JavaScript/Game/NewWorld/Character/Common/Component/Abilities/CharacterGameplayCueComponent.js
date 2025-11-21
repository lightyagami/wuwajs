"use strict";

var __decorate = this && this.__decorate || function (e, t, a, n) {
  var r;
  var s = arguments.length;
  var o = s < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, a) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(e, t, a, n);
  } else {
    for (var i = e.length - 1; i >= 0; i--) {
      if (r = e[i]) {
        o = (s < 3 ? r(o) : s > 3 ? r(t, a, o) : r(t, a)) || o;
      }
    }
  }
  if (s > 3 && o) {
    Object.defineProperty(t, a, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterGameplayCueComponent = undefined;
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const EffectSystem_1 = require("../../../../../Effect/EffectSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const EffectUtil_1 = require("../../../../../Utils/EffectUtil");
const BaseGameplayCueComponent_1 = require("./BaseGameplayCueComponent");
let CharacterGameplayCueComponent = class CharacterGameplayCueComponent extends BaseGameplayCueComponent_1.BaseGameplayCueComponent {
  constructor() {
    super(...arguments);
    this.ybr = undefined;
    this.JWu = new Map();
  }
  OnStart() {
    super.OnStart();
    this.ybr = this.Entity.GetComponent(126);
    return true;
  }
  OnEnable() {
    this.SetHidden(false);
  }
  OnDisable() {
    this.SetHidden(true);
  }
  OnChangeTimeDilation(a) {
    this.JWu.forEach((e, t) => {
      if (EffectSystem_1.EffectSystem.IsValid(t)) {
        if (this.ybr) {
          EffectUtil_1.EffectUtil.SetEffectTimeScale(t, this.ybr, a, e);
        }
      } else {
        this.JWu.delete(t);
      }
    });
  }
  GetEntityHandle() {
    return ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity);
  }
  AddCueEffectToSet(e, t) {
    this.JWu.set(e, t);
    EffectSystem_1.EffectSystem.AddFinishCallback(e, e => {
      this.JWu.delete(e);
    });
    if (this.ybr) {
      EffectUtil_1.EffectUtil.SetEffectTimeScale(e, this.ybr, this.Entity.TimeDilation, t);
    }
    if (!this.Active) {
      EffectSystem_1.EffectSystem.SetEffectHidden(e, true, "CharacterGameplayCueComponent.AddCueEffectToSet");
    }
  }
  SetHidden(a) {
    for (const e of this.GetAllCurrentCueRef()) {
      if (a) {
        e.OnDisable();
      } else {
        e.OnEnable();
      }
    }
    this.JWu.forEach((e, t) => {
      if (EffectSystem_1.EffectSystem.IsValid(t)) {
        EffectSystem_1.EffectSystem.SetEffectHidden(t, a, "CharacterGameplayCueComponent.SetHidden");
      } else {
        this.JWu.delete(t);
      }
    });
  }
};
CharacterGameplayCueComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(21)], CharacterGameplayCueComponent);
exports.CharacterGameplayCueComponent = CharacterGameplayCueComponent; //# sourceMappingURL=CharacterGameplayCueComponent.js.map