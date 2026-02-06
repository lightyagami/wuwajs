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
  static Fod(e, t, s, a) {
    var r = e.GetComponent(185);
    var e = r?.BuffEffectManager;
    if (e) {
      for (const i of e.FilterById(76)) {
        if (i.Check({}, r) && !i.OZc?.has(t.SkillId)) {
          let e = undefined;
          switch (i.LNc) {
            case 1:
              e = i.Execute(s);
              break;
            case 2:
              if (i.KXo.includes(t.SkillId)) {
                e = i.Execute(s);
              }
              break;
            case 3:
              if (i.wNc.includes(t.SkillInfo.SkillGenre)) {
                e = i.Execute(s);
              }
          }
          if (e) {
            a.push(e);
          }
        }
      }
    }
  }
  static ApplyEffects(e, t) {
    t.BattleContext = {
      BattleFlags: [],
      VisionId: 0
    };
    var s = t.BattleContext.BattleFlags;
    this.Fod(e, t, false, s);
    var e = e.GetComponent(0);
    var a = e?.IsVision();
    var e = e?.GetSummonerId();
    if (a && e && (a = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Entity)) {
      this.Fod(a, t, true, s);
    }
    s.length;
  }
}
exports.AddBattleFlag = AddBattleFlag;
//# sourceMappingURL=ExtraEffectAddBattleFlag.js.map