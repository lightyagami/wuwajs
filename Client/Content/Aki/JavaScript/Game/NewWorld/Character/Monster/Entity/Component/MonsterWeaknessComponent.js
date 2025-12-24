"use strict";

var __decorate = this && this.__decorate || function (t, e, s, i) {
  var o;
  var n = arguments.length;
  var r = n < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, s) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, s, i);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (o = t[h]) {
        r = (n < 3 ? o(r) : n > 3 ? o(e, s, r) : o(e, s)) || r;
      }
    }
  }
  if (n > 3 && r) {
    Object.defineProperty(e, s, r);
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
    this.yYf = "";
    this.SYf = 0;
    this.MYf = 0;
    this.EYf = 0;
  }
  get TargetSocket() {
    return this.yYf;
  }
  get HorizontalDistance() {
    return this.SYf;
  }
  get UpDistance() {
    return this.MYf;
  }
  get DownDistance() {
    return this.EYf;
  }
  OnStart() {
    this.vzi = this.Entity.GetComponent(207)?.GetInteractController();
    return true;
  }
  OnEnd() {
    return true;
  }
  ShowWeaknessButton(t, e, s, i) {
    CombatLog_1.CombatLog.Info("Skill", this.Entity, "激活破弱按钮", ["socket", t]);
    this.yYf = t;
    this.SYf = e;
    this.MYf = s;
    this.EYf = i;
    this.Itn = this.vzi?.AddClientInteractOption(new LevelGameplayActionsDefine_1.BreakWeakness(), undefined, "Direct", Number.MAX_SAFE_INTEGER, undefined, 3) ?? 0;
  }
  UpdateTargetSocket(t) {
    if (this.Itn && this.yYf !== t) {
      this.yYf = t;
      CombatLog_1.CombatLog.Info("Skill", this.Entity, "更新破弱按钮Socket", ["socket", t]);
    }
  }
  HideWeaknessButton() {
    if (this.Itn) {
      CombatLog_1.CombatLog.Info("Skill", this.Entity, "移除破弱按钮");
      this.vzi?.RemoveClientInteractOption(this.Itn);
      this.Itn = 0;
      this.yYf = "";
      this.SYf = 0;
      this.MYf = 0;
      this.EYf = 0;
    }
  }
};
MonsterWeaknessComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(92)], MonsterWeaknessComponent);
exports.MonsterWeaknessComponent = MonsterWeaknessComponent; //# sourceMappingURL=MonsterWeaknessComponent.js.map