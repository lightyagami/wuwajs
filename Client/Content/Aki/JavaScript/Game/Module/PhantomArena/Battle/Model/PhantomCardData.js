"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomCardData = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const PhantomArenaDefine_1 = require("../PhantomArenaDefine");
class PhantomCardData {
  constructor(t = false) {
    this.IsNpcCard = false;
    this.Index = PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX;
    this.CardId = 0;
    this.FightId = PhantomArenaDefine_1.UNVALID_FIGHT_ID;
    this.ConfigId = 0;
    this.CanUse = false;
    this.EvolveNum = 0;
    this.ConfigCost = 0;
    this.UseCost = 0;
    this.ExtraFactors = [];
    this.AttrMap = new Map();
    this.ActiveSkillId = 0;
    this.IsUnLimitEvolve = false;
    this.IsNpcCard = t;
  }
  get HasActiveSkill() {
    return this.ActiveSkillId > 0;
  }
  get IsFourCost() {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaCardCoreCost();
    return this.ConfigCost === t;
  }
  InitData(t) {
    this.CardId = t.$g1;
    this.ConfigId = t.Wg1;
    this.CanUse = t.Dg1;
    this.EvolveNum = 0;
    this.Index = PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX;
    this.FightId = PhantomArenaDefine_1.UNVALID_FIGHT_ID;
    this.IsUnLimitEvolve = false;
    this.RefreshFactorsByList([]);
    this.BU1();
    this.kU1();
    this.RGt();
  }
  InitDataByNpc(t, e) {
    this.CardId = t;
    this.ConfigId = e;
    this.CanUse = true;
    this.EvolveNum = 0;
    this.Index = PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX;
    this.FightId = PhantomArenaDefine_1.UNVALID_FIGHT_ID;
    this.RefreshFactorsByList([]);
    this.BU1();
    this.kU1();
    this.RGt();
  }
  BU1() {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.ConfigId);
    this.ActiveSkillId = t.ActiveSkillId;
  }
  kU1() {
    this.AttrMap.clear();
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.ConfigId);
    var e = t.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_AttackAbility);
    this.AttrMap.set(Protocol_1.Aki.Protocol.GC1.Proto_AttackAbility, e);
    var e = t.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_LifeAbility);
    this.AttrMap.set(Protocol_1.Aki.Protocol.GC1.Proto_LifeAbility, e);
    this.AttrMap.set(Protocol_1.Aki.Protocol.GC1.Proto_CostAbility, t.Cost);
    var e = t.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_Crit);
    this.AttrMap.set(Protocol_1.Aki.Protocol.GC1.Proto_Crit, e);
    var e = t.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_CritDamage);
    this.AttrMap.set(Protocol_1.Aki.Protocol.GC1.Proto_CritDamage, e);
  }
  RGt() {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.ConfigId);
    this.ConfigCost = t.Cost;
    this.UseCost = this.IsFourCost ? 0 : this.ConfigCost;
  }
  RefreshFightData(t) {
    var e = t.Gg1;
    this.RefreshFightAttr(e.Kg1);
    this.CardId = e.$g1;
    this.ConfigId = e.Wg1;
    this.Index = e.Qg1;
    this.FightId = t.kg1;
    this.RefreshFactorsByList(e.YM1);
    this.CanUse = true;
    this.EvolveNum = e.XM1;
    this.IsUnLimitEvolve = e.Rlu;
    this.RGt();
  }
  RefreshFightAttr(t) {
    this.AttrMap.clear();
    for (const i of Object.keys(t)) {
      var e = Number(i);
      this.AttrMap.set(e, t[i]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaCardAttrRefresh, this.CardId);
  }
  RefreshFactorsByList(t) {
    this.ExtraFactors = [];
    for (const e of t) {
      this.ExtraFactors.push(e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaCardFactorsRefresh, this.CardId);
  }
  NotifyRefreshCardData(t, e) {
    this.ExtraFactors = [];
    for (const h of Object.keys(t)) {
      var i = Number(h);
      var s = t[i];
      for (let t = 0; t < s; t++) {
        this.ExtraFactors.push(i);
      }
    }
    this.IsUnLimitEvolve = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaCardFactorsRefresh, this.CardId);
  }
  GetFightValueByAttr(t) {
    if (this.AttrMap.get(t) === undefined) {
      return 0;
    } else {
      return this.AttrMap.get(t);
    }
  }
  ValueChangeTypeByBuff(t) {
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.ConfigId);
    var i = this.AttrMap.get(t);
    let s = 0;
    if (i === (s = t === Protocol_1.Aki.Protocol.GC1.Proto_CostAbility ? e.Cost : e.InitAttack.get(t) ?? 0)) {
      return 0;
    } else if (i > s) {
      return 1;
    } else {
      return 2;
    }
  }
  IsOtherCardCanEvolve(t) {
    if (t.IsFourCost) {
      return [false, "PhantomBattle_1126"];
    } else if (this.IsFourCost) {
      return [false, "PhantomBattle_1127"];
    } else if (this.IsUnLimitEvolve) {
      return [true, ""];
    } else if ((t = t.ConfigCost) === PhantomArenaDefine_1.COST_ONE && this.EvolveNum > 0) {
      return [false, "PhantomBattle_1130"];
    } else if (t === PhantomArenaDefine_1.COST_THREE && this.EvolveNum !== 1) {
      return [false, "PhantomBattle_1128"];
    } else {
      return [true, ""];
    }
  }
}
exports.PhantomCardData = PhantomCardData;
//# sourceMappingURL=PhantomCardData.js.map