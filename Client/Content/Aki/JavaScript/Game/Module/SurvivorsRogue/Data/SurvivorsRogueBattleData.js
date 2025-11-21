"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueBattleData = undefined;
const IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const SurvivorsRogueBattleSkillData_1 = require("../../GameMainView/SurvivorsRogue/Data/SurvivorsRogueBattleSkillData");
const BehaviorTreeUpdateDelegateProxy_1 = require("../../GeneralLogicTree/BaseBehaviorTree/BehaviorTreeUpdateDelegateProxy");
const ACTIVE_SKILL_ID = 220003;
const DODGE_SKILL_ID = 100001;
class SurvivorsRogueBattleData {
  constructor() {
    this.BehaviorDelegate = new BehaviorTreeUpdateDelegateProxy_1.BehaviorTreeUpdateDelegateProxy();
    this.fXc = new Map();
  }
  static Create() {
    return new SurvivorsRogueBattleData();
  }
  InitBattleSkillData() {
    this.fXc.set(InputMappingsDefine_1.actionMappings.技能1, this.pxd(ACTIVE_SKILL_ID, InputMappingsDefine_1.actionMappings.技能1));
    this.fXc.set(InputMappingsDefine_1.actionMappings.闪避, this.pxd(DODGE_SKILL_ID, InputMappingsDefine_1.actionMappings.闪避));
  }
  pxd(e, t) {
    e = new SurvivorsRogueBattleSkillData_1.SurvivorsRogueBattleSkillData(e);
    e.InitData(t);
    return e;
  }
  GetBattleSkillData(e) {
    return this.fXc.get(e);
  }
  Clear() {
    this.BehaviorDelegate?.Clear();
    this.fXc.clear();
  }
  IsCoinEfficiencyEnhance() {
    return true;
  }
  SetBehaviorTreeVar(e) {
    var t;
    var r;
    var i = new Map();
    for ([t, r] of Object.entries(e)) {
      i.set(t, r);
    }
    this.BehaviorDelegate.SetBehaviorTreeVarRelation(i);
  }
  GetBehaviorTreeVar(e) {
    return this.BehaviorDelegate.GetBehaviorTreeVar(e);
  }
  GetBehaviorTreeVarToNumber(e) {
    return this.BehaviorDelegate.GetBehaviorTreeVarToNumber(e);
  }
  GetCurrencyCount() {
    return this.GetBehaviorTreeVarToNumber(IQuest_1.ESurvivorsRougeSystemVarType.Gold);
  }
  GetBatch() {
    return this.GetBehaviorTreeVarToNumber(IQuest_1.ESurvivorsRougeSystemVarType.Batch);
  }
  GetMaxBatch() {
    return this.GetBehaviorTreeVarToNumber(IQuest_1.ESurvivorsRougeSystemVarType.MaxBatch);
  }
  GetChestCount() {
    return this.GetBehaviorTreeVarToNumber(IQuest_1.ESurvivorsRougeSystemVarType.TreasureBoxCount);
  }
  GetComboKillCount() {
    return this.GetBehaviorTreeVarToNumber(IQuest_1.ESurvivorsRougeSystemVarType.ConsecutiveKillCount);
  }
  GetGoldGainEfficiency() {
    return this.GetBehaviorTreeVarToNumber(IQuest_1.ESurvivorsRougeSystemVarType.GoldGainEfficiency);
  }
  get EndlessWaveEnabled() {
    return this.GetBehaviorTreeVarToNumber(IQuest_1.ESurvivorsRougeSystemVarType.EndlessBatchLimit) === 1;
  }
  EquipExplorePhantomSkill() {}
  SkillCountChanged(e) {
    this.nYc(e);
  }
  SkillRemainCdChanged(e) {
    this.nYc(e);
  }
  nYc(e) {
    for (const t of e.SkillCdInfoMap.keys()) {
      for (const r of this.fXc.values()) {
        if (r.GetSkillId() === t) {
          r.RefreshSkillCd();
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonCdRefresh, r.GetButtonType());
        }
      }
    }
  }
}
exports.SurvivorsRogueBattleData = SurvivorsRogueBattleData;
//# sourceMappingURL=SurvivorsRogueBattleData.js.map