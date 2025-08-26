"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBattleData = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const TrapDefenseBattleExploreSkillData_1 = require("../../GameMainView/TrapDefense/Data/TrapDefenseBattleExploreSkillData");
const TrapDefenseBattleSkillData_1 = require("../../GameMainView/TrapDefense/Data/TrapDefenseBattleSkillData");
const TrapDefenseBattleDefine_1 = require("../../GameMainView/TrapDefense/TrapDefenseBattleDefine");
class TrapDefenseBattleData {
  constructor() {
    this.E9c = new Map();
    this.Gdd = new Map();
    this.I9c = new Map();
    this.T9c = new Map();
    this.IsShopOpen = false;
    this.IsSpecialShow = false;
    this.PreviewCountDown = 0;
    this.ComboNum = 0;
    this.HasStartAkEvent = false;
  }
  static Create() {
    var e = new TrapDefenseBattleData();
    e.AU();
    return e;
  }
  AU() {}
  Fdd(e, t) {
    let r = this.Gdd.get(e);
    if (!r) {
      r = new Set();
      this.Gdd.set(e, r);
    }
    r.add(t);
  }
  Ndd(e, t) {
    e = this.Gdd.get(e);
    if (e) {
      e.delete(t);
    }
  }
  Vdd() {
    this.Gdd.clear();
  }
  Clear() {
    this.E9c.clear();
    this.I9c.clear();
    this.T9c.clear();
    this.Vdd();
  }
  AddTreeVarUpdateDelegate(e, t) {
    var r;
    var a = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
    if (a && a.Tree) {
      if (r = this.E9c.get(e)) {
        a.Tree.AddTreeVarUpdateDelegate(r, t);
      } else {
        this.Fdd(e, t);
      }
    }
  }
  RemoveTreeVarUpdateDelegate(e, t) {
    var r;
    var a = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
    if (a && a.Tree) {
      if (r = this.E9c.get(e)) {
        a.Tree.RemoveTreeVarUpdateDelegate(r, t);
      } else {
        this.Ndd(e, t);
      }
    }
  }
  SetBehaviorTreeVar(e) {
    this.E9c.clear();
    var t;
    var r;
    var a = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
    for ([t, r] of Object.entries(e)) {
      var i = t;
      this.E9c.set(i, r);
      var n = this.Gdd.get(i);
      if (n && a && a.Tree) {
        for (const s of n) {
          a.Tree.AddTreeVarUpdateDelegate(r, s);
          s(undefined, a.Tree.GetTreeVarByKey(r));
        }
        this.Gdd.delete(i);
      }
    }
  }
  jdd(e) {
    e = this.E9c.get(e);
    if (e) {
      var t = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
      if (t) {
        return t.Tree?.GetTreeVarByKey(e);
      }
    }
  }
  GetBehaviorTreeVarToNumber(e) {
    e = this.jdd(e);
    return MathUtils_1.MathUtils.LongToNumber(e?.oTs ?? 0);
  }
  GetGoldNum() {
    return this.GetBehaviorTreeVarToNumber(IQuest_1.ETrapDefenseSystemVarType.Gold);
  }
  GetHealth() {
    return this.GetBehaviorTreeVarToNumber(IQuest_1.ETrapDefenseSystemVarType.Health);
  }
  GetBatch() {
    return this.GetBehaviorTreeVarToNumber(IQuest_1.ETrapDefenseSystemVarType.Batch);
  }
  GetMaxBatch() {
    return this.GetBehaviorTreeVarToNumber(IQuest_1.ETrapDefenseSystemVarType.MaxBatch);
  }
  GetTrapCount() {
    return this.GetBehaviorTreeVarToNumber(IQuest_1.ETrapDefenseSystemVarType.TrapCount);
  }
  GetMaxTrapCount() {
    return this.GetBehaviorTreeVarToNumber(IQuest_1.ETrapDefenseSystemVarType.MaxTrapCount);
  }
  GetCurrentPurificationItemCount() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel?.BattleInventoryData.GetItemData(TrapDefenseBattleDefine_1.TRAPDEFENSE_PURIFICATION_ID);
    if (e) {
      return e.InventoryCount;
    } else {
      return 0;
    }
  }
  GetPurificationItemConsume() {
    return ControllerHolder_1.ControllerHolder.TowerDefenseEventController.RaycastResult.PollutedNum;
  }
  get IsPurificationItemEnough() {
    return this.GetCurrentPurificationItemCount() >= this.GetPurificationItemConsume();
  }
  SetTechParamMapVar(e) {
    if (e !== undefined) {
      this.I9c.clear();
      for (var [t, r] of Object.entries(e)) {
        this.I9c.set(Number(t), r);
      }
    }
  }
  GetSlotCount() {
    return this.I9c.get(Protocol_1.Aki.Protocol.f9u.Proto_SlotCount) ?? 0;
  }
  GetAuxiliaryLimit() {
    return this.I9c.get(Protocol_1.Aki.Protocol.f9u.Proto_AuxiliaryCount) ?? 1;
  }
  get IsCanBuildMachine() {
    var e;
    var t = ModelManager_1.ModelManager.TrapDefenseModel.GetCurrentBatchData();
    return !!t && (e = ControllerHolder_1.ControllerHolder.TowerDefenseEventController.IsInPreview(), t.CanBuildMachine) && e;
  }
  SetShopOpen(e) {
    this.IsShopOpen = e;
  }
  SetPreviewCountDown(e) {
    this.PreviewCountDown = e;
  }
  SetComboNum(e) {
    this.ComboNum = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseComboNumChange, e);
  }
  SetSpecialShow(e) {
    this.IsSpecialShow = e;
  }
  GetSkillData(e) {
    let t = this.T9c.get(e);
    if (!t) {
      (t = new (e === InputMappingsDefine_1.actionMappings.塔防道具 ? TrapDefenseBattleExploreSkillData_1.TrapDefenseBattleExploreSkillData : TrapDefenseBattleSkillData_1.TrapDefenseBattleSkillData)()).InitData(e);
      this.T9c.set(e, t);
    }
    return t;
  }
  RefreshExploreSkillData() {
    var e;
    var t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
    var r = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(t);
    if (r && r.SkillType === 5) {
      (r = this.GetSkillData(InputMappingsDefine_1.actionMappings.塔防道具)).SetExploreSkillId(t);
      t = ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen(false);
      e = ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelDataHasShop();
      r.SetVisible(t && e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh, r.GetButtonType());
    }
  }
  w9c(e) {
    for (const t of e.SkillCdInfoMap.keys()) {
      for (const r of this.T9c.values()) {
        if (r.GetSkillId() === t) {
          r.RefreshSkillCd();
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonCdRefresh, r.GetButtonType());
        }
      }
    }
  }
  EquipExplorePhantomSkill() {
    this.RefreshExploreSkillData();
  }
  SkillCountChanged(e) {
    this.w9c(e);
  }
  SkillRemainCdChanged(e) {
    this.w9c(e);
  }
  GetExploreSkillId() {
    return this.GetSkillData(InputMappingsDefine_1.actionMappings.塔防道具).GetSkillId();
  }
  SetHasStartAkEvent(e) {
    this.HasStartAkEvent = e;
  }
}
exports.TrapDefenseBattleData = TrapDefenseBattleData;
//# sourceMappingURL=TrapDefenseBattleData.js.map