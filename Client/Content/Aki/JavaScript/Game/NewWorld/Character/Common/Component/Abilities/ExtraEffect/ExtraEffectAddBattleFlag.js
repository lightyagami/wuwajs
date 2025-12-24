"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddBattleFlag = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CombatLog_1 = require("../../../../../../Utils/CombatLog");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class AddBattleFlag extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.LNc = 1;
    this.KXo = [];
    this.wNc = [];
    this.OZc = undefined;
    this.God = true;
    this.RNc = "";
  }
  InitParameters(e) {
    this.LNc = Number(e.ExtraEffectParameters[0]);
    this.RNc = e.ExtraEffectParameters[2];
    switch (this.LNc) {
      case 2:
        this.KXo = e.ExtraEffectParameters[1].split("#").map(e => Number(e));
        break;
      case 3:
        this.wNc = e.ExtraEffectParameters[1].split("#").map(e => Number(e));
    }
    var t = e.ExtraEffectParameters[3];
    if (t) {
      this.OZc = new Set(t.split("#").map(e => Number(e)));
    }
    this.God = Number(e.ExtraEffectParameters[4] ?? 1) === 1;
  }
  OnExecute(e) {
    if (!e || this.God) {
      return this.RNc;
    }
  }
  GetDebugEffectString() {
    let e = "";
    switch (this.LNc) {
      case 1:
        e = "所有技能";
        break;
      case 2:
        e = "技能Id " + this.KXo;
        break;
      case 3:
        e = "技能类型 " + this.wNc;
    }
    return `添加战斗标记 ${this.RNc} 到 ${e}`;
  }
  CheckExecutable() {
    return this.OwnerBuffComponent?.HasBuffAuthority() ?? false;
  }
  static Fod(e, t, s) {
    var r = e.GetComponent(183);
    var e = r?.BuffEffectManager;
    if (e) {
      for (const a of e.FilterById(76)) {
        if (a.Check({}, r) && !a.OZc?.has(t.SkillId)) {
          let e = undefined;
          switch (a.LNc) {
            case 1:
              e = a.Execute(s);
              break;
            case 2:
              if (a.KXo.includes(t.SkillId)) {
                e = a.Execute(s);
              }
              break;
            case 3:
              if (a.wNc.includes(t.SkillInfo.SkillGenre)) {
                e = a.Execute(s);
              }
          }
          if (e) {
            t.BattleFlags.push(e);
          }
        }
      }
    }
  }
  static ApplyEffects(e, t) {
    t.BattleFlags = [];
    this.Fod(e, t, false);
    var e = e.GetComponent(0);
    var s = e?.IsVision();
    var e = e?.GetSummonerId();
    if (s && e && (s = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Entity)) {
      this.Fod(s, t, true);
    }
    t.BattleFlags.length;
  }
}
exports.AddBattleFlag = AddBattleFlag;
//# sourceMappingURL=ExtraEffectAddBattleFlag.js.map