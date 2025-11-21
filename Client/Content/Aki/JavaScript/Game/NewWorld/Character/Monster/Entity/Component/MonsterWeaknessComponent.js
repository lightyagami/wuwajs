"use strict";

var __decorate = this && this.__decorate || function (e, t, o, n) {
  var s;
  var i = arguments.length;
  var r = i < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, o, n);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (s = e[a]) {
        r = (i < 3 ? s(r) : i > 3 ? s(t, o, r) : s(t, o)) || r;
      }
    }
  }
  if (i > 3 && r) {
    Object.defineProperty(t, o, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterWeaknessComponent = undefined;
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const LevelGameplayActionsDefine_1 = require("../../../../../LevelGamePlay/LevelGameplayActionsDefine");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
let MonsterWeaknessComponent = class MonsterWeaknessComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.vzi = undefined;
    this.Itn = 0;
  }
  OnStart() {
    this.vzi = this.Entity.GetComponent(201)?.GetInteractController();
    return true;
  }
  ShowWeaknessButton(e) {
    CombatLog_1.CombatLog.Info("Skill", this.Entity, "激活破弱按钮");
    this.Itn = this.vzi?.AddClientInteractOption(new LevelGameplayActionsDefine_1.BreakWeakness(), undefined, "Direct", e, undefined, 3) ?? 0;
  }
  HideWeaknessButton() {
    if (this.Itn) {
      CombatLog_1.CombatLog.Info("Skill", this.Entity, "移除破弱按钮");
      this.vzi?.RemoveClientInteractOption(this.Itn);
      this.Itn = 0;
    }
  }
};
MonsterWeaknessComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(89)], MonsterWeaknessComponent);
exports.MonsterWeaknessComponent = MonsterWeaknessComponent; //# sourceMappingURL=MonsterWeaknessComponent.js.map