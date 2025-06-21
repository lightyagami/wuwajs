"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomCardData = void 0;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  PhantomArenaDefine_1 = require("../PhantomArenaDefine");
class PhantomCardData {
  constructor() {
    this.Index = PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX, this.CardId = 0, this.FightId = PhantomArenaDefine_1.UNVALID_FIGHT_ID, this.ConfigId = 0, this.CanUse = !1, this.EvolveNum = 0, this.ConfigCost = 0, this.UseCost = 0, this.ExtraFactors = [], this.AttrMap = new Map, this.ActiveSkillId = 0, this.IsUnLimitEvolve = !1
  }
  get HasActiveSkill() {
    return 0 < this.ActiveSkillId
  }
  get IsFourCost() {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaCardCoreCost();
    return this.ConfigCost === t
  }
  InitData(t) {
    this.CardId = t.Mg1, this.ConfigId = t.Eg1, this.CanUse = t.cg1, this.EvolveNum = 0, this.Index = PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX, this.FightId = PhantomArenaDefine_1.UNVALID_FIGHT_ID, this.IsUnLimitEvolve = !1, this.RefreshFactorsByList([]), this.sU1(), this.aU1(), this.RGt()
  }
  InitDataByNpc(t, e) {
    this.CardId = t, this.ConfigId = e, this.CanUse = !0, this.EvolveNum = 0, this.Index = PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX, this.FightId = PhantomArenaDefine_1.UNVALID_FIGHT_ID, this.RefreshFactorsByList([]), this.sU1(), this.aU1(), this.RGt()
  }
  sU1() {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.ConfigId);
    this.ActiveSkillId = t.ActiveSkillId
  }
  aU1() {
    this.AttrMap.clear();
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.ConfigId),
      e = t.InitAttack.get(Protocol_1.Aki.Protocol.gC1.Proto_AttackAbility),
      e = (this.AttrMap.set(Protocol_1.Aki.Protocol.gC1.Proto_AttackAbility, e), t.InitAttack.get(Protocol_1.Aki.Protocol.gC1.Proto_LifeAbility)),
      e = (this.AttrMap.set(Protocol_1.Aki.Protocol.gC1.Proto_LifeAbility, e), this.AttrMap.set(Protocol_1.Aki.Protocol.gC1.Proto_CostAbility, t.Cost), t.InitAttack.get(Protocol_1.Aki.Protocol.gC1.Proto_Crit)),
      e = (this.AttrMap.set(Protocol_1.Aki.Protocol.gC1.Proto_Crit, e), t.InitAttack.get(Protocol_1.Aki.Protocol.gC1.Proto_CritDamage));
    this.AttrMap.set(Protocol_1.Aki.Protocol.gC1.Proto_CritDamage, e)
  }
  RGt() {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.ConfigId);
    this.ConfigCost = t.Cost, this.UseCost = this.IsFourCost ? 0 : this.ConfigCost
  }
  RefreshFightData(t) {
    var e = t.gg1;
    this.RefreshFightAttr(e.Tg1), this.CardId = e.Mg1, this.ConfigId = e.Eg1, this.Index = e.Ig1, this.FightId = t.dg1, this.RefreshFactorsByList(e.bM1), this.CanUse = !0, this.EvolveNum = e.TM1, this.IsUnLimitEvolve = e.cnu, this.RGt()
  }
  RefreshFightAttr(t) {
    this.AttrMap.clear();
    for (const i of Object.keys(t)) {
      var e = Number(i);
      this.AttrMap.set(e, t[i])
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaCardAttrRefresh, this.CardId)
  }
  RefreshFactorsByList(t) {
    this.ExtraFactors = [];
    for (const e of t) this.ExtraFactors.push(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaCardFactorsRefresh, this.CardId)
  }
  NotifyRefreshCardData(t, e) {
    this.ExtraFactors = [];
    for (const h of Object.keys(t)) {
      var i = Number(h),
        s = t[i];
      for (let t = 0; t < s; t++) this.ExtraFactors.push(i)
    }
    this.IsUnLimitEvolve = e, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaCardFactorsRefresh, this.CardId)
  }
  GetFightValueByAttr(t) {
    return void 0 === this.AttrMap.get(t) ? 0 : this.AttrMap.get(t)
  }
  ValueChangeTypeByBuff(t) {
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.ConfigId),
      i = this.AttrMap.get(t);
    let s = 0;
    return i === (s = t === Protocol_1.Aki.Protocol.gC1.Proto_CostAbility ? e.Cost : e.InitAttack.get(t) ?? 0) ? 0 : i > s ? 1 : 2
  }
  IsOtherCardCanEvolve(t) {
    return t.IsFourCost ? [!1, "PhantomBattle_1126"] : this.IsFourCost ? [!1, "PhantomBattle_1127"] : this.IsUnLimitEvolve ? [!0, ""] : (t = t.ConfigCost) === PhantomArenaDefine_1.COST_ONE && 0 < this.EvolveNum ? [!1, "PhantomBattle_1130"] : t === PhantomArenaDefine_1.COST_THREE && 1 !== this.EvolveNum ? [!1, "PhantomBattle_1128"] : [!0, ""]
  }
}
exports.PhantomCardData = PhantomCardData;
//# sourceMappingURL=PhantomCardData.js.map