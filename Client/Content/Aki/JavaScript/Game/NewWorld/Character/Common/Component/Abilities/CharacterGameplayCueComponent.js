"use strict";

var __decorate = this && this.__decorate || function (e, t, a, n) {
  var r;
  var o = arguments.length;
  var s = o < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, a) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, a, n);
  } else {
    for (var i = e.length - 1; i >= 0; i--) {
      if (r = e[i]) {
        s = (o < 3 ? r(s) : o > 3 ? r(t, a, s) : r(t, a)) || s;
      }
    }
  }
  if (o > 3 && s) {
    Object.defineProperty(t, a, s);
  }
  return s;
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
    this.wqr = new Map();
  }
  OnStart() {
    super.OnStart();
    this.ybr = this.Entity.CheckGetComponent(122);
    return true;
  }
  OnEnable() {
    this.SetHidden(false);
  }
  OnDisable() {
    this.SetHidden(true);
  }
  OnChangeTimeDilation(a) {
    this.wqr.forEach((e, t) => {
      if (EffectSystem_1.EffectSystem.IsValid(t)) {
        EffectUtil_1.EffectUtil.SetEffectTimeScale(t, this.ybr, a, e);
      } else {
        this.wqr.delete(t);
      }
    });
  }
  GetEntityHandle() {
    return ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity);
  }
  AddCueEffectToSet(e, t) {
    this.wqr.set(e, t);
    EffectSystem_1.EffectSystem.AddFinishCallback(e, e => {
      this.wqr.delete(e);
    });
    EffectUtil_1.EffectUtil.SetEffectTimeScale(e, this.ybr, this.Entity.TimeDilation, t);
    if (!this.Active) {
      EffectSystem_1.EffectSystem.SetEffectHidden(e, true, "CharacterGameplayCueComponent.AddCueEffectToSet");
    }
  }
  SetHidden(t) {
    for (const e of this.GetAllCurrentCueRef()) {
      if (t) {
        e.OnDisable();
      } else {
        e.OnEnable();
      }
    }
    this.wqr.forEach(e => {
      if (EffectSystem_1.EffectSystem.IsValid(e)) {
        EffectSystem_1.EffectSystem.SetEffectHidden(e, t, "CharacterGameplayCueComponent.SetHidden");
      } else {
        this.wqr.delete(e);
      }
    });
  }
};
CharacterGameplayCueComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(21)], CharacterGameplayCueComponent);
exports.CharacterGameplayCueComponent = CharacterGameplayCueComponent; //# sourceMappingURL=CharacterGameplayCueComponent.js.map