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
const PhantomCardSkillData_1 = require("./PhantomCardSkillData");
class PhantomCardData {
  constructor(t = false) {
    this.aOm = 0;
    this.IsNpcCard = false;
    this.Index = PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX;
    this.CardId = 0;
    this.FightId = PhantomArenaDefine_1.UNVALID_FIGHT_ID;
    this.ConfigId = 0;
    this.CanUse = false;
    this.IsCopy = false;
    this.EvolveNum = 0;
    this.ConfigCost = 0;
    this.UseCost = 0;
    this.ExtraFactors = [];
    this.UnActiveFactors = [];
    this.AttrMap = new Map();
    this.ActiveSkillId = 0;
    this.ClickActiveSkillId = 0;
    this.CountSkillId = 0;
    this.IsUnLimitEvolve = false;
    this.SkillData = new PhantomCardSkillData_1.PhantomCardSkillData();
    this.LastEffectCount = 0;
    this.IsNpcCard = t;
  }
  get HasActiveSkill() {
    return this.ActiveSkillId > 0;
  }
  get HasClickActiveSkill() {
    return this.ClickActiveSkillId > 0;
  }
  get HasCountSkill() {
    return this.CountSkillId > 0;
  }
  get HasDurability() {
    return this.Durable > 0;
  }
  get InSkillCd() {
    return this.SkillCd > 0;
  }
  get SkillCd() {
    return this.AttrMap.get(Protocol_1.Aki.Protocol.GC1.Proto_CardSkillCD) ?? 0;
  }
  get SkillCdMax() {
    return this.AttrMap.get(Protocol_1.Aki.Protocol.GC1.Proto_CardSkillCDMax) ?? 0;
  }
  get Durable() {
    return this.AttrMap.get(Protocol_1.Aki.Protocol.GC1.Proto_Durable) ?? 0;
  }
  get DurableMax() {
    return this.AttrMap.get(Protocol_1.Aki.Protocol.GC1.Proto_DurableMax) ?? 0;
  }
  get CurEffectCount() {
    return this.AttrMap.get(Protocol_1.Aki.Protocol.GC1.Proto_CurEffectCount) ?? 0;
  }
  get MaxEffectCount() {
    return this.AttrMap.get(Protocol_1.Aki.Protocol.GC1.Proto_MaxEffectCount) ?? 0;
  }
  get IsFourCost() {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaCardCoreCost();
    return this.ConfigCost === t;
  }
  get IsField() {
    return this.aOm === 3;
  }
  get IsTool() {
    return this.aOm === 2;
  }
  get IsNormal() {
    return this.aOm === 1;
  }
  get IsNoAllowDiscard() {
    return this.IsField || this.IsFourCost;
  }
  get IsInFight() {
    return this.Index !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX;
  }
  GetCardType() {
    return this.aOm;
  }
  InitData(t) {
    this.CardId = t.$g1;
    this.ConfigId = t.Wg1;
    this.CanUse = t.Dg1;
    this.EvolveNum = 0;
    this.Index = PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX;
    this.FightId = PhantomArenaDefine_1.UNVALID_FIGHT_ID;
    this.IsUnLimitEvolve = false;
    this.IsCopy = false;
    this.ruf();
    this.QWm();
    this.kU1();
    this.RGt();
    this.yqm();
  }
  InitDataByNpc(t, i) {
    this.CardId = t;
    this.ConfigId = i;
    this.CanUse = true;
    this.EvolveNum = 0;
    this.Index = PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX;
    this.FightId = t;
    this.IsCopy = false;
    this.ruf();
    this.QWm();
    this.kU1();
    this.RGt();
    this.yqm();
  }
  QWm() {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.ConfigId);
    this.ActiveSkillId = t.ActiveSkillId;
    this.ClickActiveSkillId = t.DurableSkillId;
    this.CountSkillId = t.CountSkill;
  }
  kU1() {
    this.AttrMap.clear();
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.ConfigId);
    var i = t.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_AttackAbility);
    this.AttrMap.set(Protocol_1.Aki.Protocol.GC1.Proto_AttackAbility, i);
    var i = t.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_LifeAbility);
    this.AttrMap.set(Protocol_1.Aki.Protocol.GC1.Proto_LifeAbility, i);
    this.AttrMap.set(Protocol_1.Aki.Protocol.GC1.Proto_CostAbility, t.Cost);
    var i = t.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_Crit);
    this.AttrMap.set(Protocol_1.Aki.Protocol.GC1.Proto_Crit, i);
    var i = t.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_CritDamage);
    this.AttrMap.set(Protocol_1.Aki.Protocol.GC1.Proto_CritDamage, i);
    var i = t.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_CardSkillCD);
    this.AttrMap.set(Protocol_1.Aki.Protocol.GC1.Proto_CardSkillCD, i);
    var i = t.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_CardSkillCDMax);
    this.AttrMap.set(Protocol_1.Aki.Protocol.GC1.Proto_CardSkillCDMax, i);
    var i = t.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_Durable);
    this.AttrMap.set(Protocol_1.Aki.Protocol.GC1.Proto_Durable, i);
    var i = t.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_DurableMax);
    this.AttrMap.set(Protocol_1.Aki.Protocol.GC1.Proto_DurableMax, i);
    var i = t.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_CurEffectCount);
    this.AttrMap.set(Protocol_1.Aki.Protocol.GC1.Proto_CurEffectCount, i);
    var i = t.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_MaxEffectCount);
    this.AttrMap.set(Protocol_1.Aki.Protocol.GC1.Proto_MaxEffectCount, i);
  }
  RGt() {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.ConfigId);
    this.ConfigCost = t.Cost;
    this.UseCost = this.IsFourCost ? 0 : this.ConfigCost;
  }
  yqm() {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.ConfigId);
    this.aOm = t.Type;
  }
  RefreshFightData(t) {
    var i = t.Gg1;
    this.RefreshFightAttr(i.Kg1);
    this.CardId = i.$g1;
    this.ConfigId = i.Wg1;
    this.Index = i.Qg1;
    this.FightId = t.kg1;
    this.IsCopy = i.Xxm;
    this.ouf(i.YM1, i.y1f);
    this.QWm();
    this.CanUse = true;
    this.EvolveNum = i.XM1;
    this.IsUnLimitEvolve = i.__u;
    this.RGt();
    this.yqm();
    this.SkillData.RefreshData(i._Gm);
  }
  RefreshFightAttr(t) {
    this.LastEffectCount = this.CurEffectCount;
    this.AttrMap.clear();
    for (const e of Object.keys(t)) {
      var i = Number(e);
      this.AttrMap.set(i, t[e]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaCardAttrRefresh, this.CardId);
  }
  ruf() {
    this.ExtraFactors = [];
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.ConfigId);
    this.UnActiveFactors = [...t.CardFactorId];
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaCardFactorsRefresh, this.CardId);
  }
  ouf(t, i) {
    this.ExtraFactors = [];
    this.UnActiveFactors = [];
    for (const e of t) {
      this.ExtraFactors.push(e);
    }
    for (const s of i) {
      this.UnActiveFactors.push(s);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaCardFactorsRefresh, this.CardId);
  }
  NotifyRefreshCardData(t, i, e) {
    this.ExtraFactors = [];
    this.UnActiveFactors = [];
    for (const o of Object.keys(t)) {
      var s = Number(o);
      var h = t[s];
      for (let t = 0; t < h; t++) {
        this.ExtraFactors.push(s);
      }
    }
    for (const r of i) {
      this.UnActiveFactors.push(r);
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
    var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.ConfigId);
    var e = this.AttrMap.get(t);
    let s = 0;
    if (e === (s = t === Protocol_1.Aki.Protocol.GC1.Proto_CostAbility ? i.Cost : i.InitAttack.get(t) ?? 0)) {
      return 0;
    } else if (e > s) {
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
    } else if (this.aOm === 2) {
      return [false, "PhantomBattle_1181"];
    } else if ((t = t.ConfigCost) === PhantomArenaDefine_1.COST_ONE && (this.EvolveNum > 0 || this.ConfigCost === PhantomArenaDefine_1.COST_THREE)) {
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