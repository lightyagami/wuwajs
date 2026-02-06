"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleModel = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const PhantomArenaBattleData_1 = require("./PhantomArenaBattleData");
const PhantomArenaBuffEffectData_1 = require("./PhantomArenaBuffEffectData");
const PhantomArenaOpponentData_1 = require("./PhantomArenaOpponentData");
const PhantomArenaOwnData_1 = require("./PhantomArenaOwnData");
const PhantomArenaReplaceCardData_1 = require("./PhantomArenaReplaceCardData");
const PhantomArenaSelectCardData_1 = require("./PhantomArenaSelectCardData");
class PhantomArenaBattleModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.LoadingConfig = undefined;
    this.InstId = 0;
    this.ReplaceCardData = undefined;
    this.OwnData = undefined;
    this.OpponentData = undefined;
    this.BattleData = undefined;
    this.BuffEffectData = undefined;
    this.SelectCardData = undefined;
    this.IsNeedShowTimeEndConfirm = true;
    this.usu = 0;
    this.Nhu = 0;
    this.Vhu = ConfigManager_1.ConfigManager.CommonConfig.GetPhantomArenaBattleSpeed();
    this.jhu = false;
    this.Scu = false;
    this.HD1 = undefined;
    this.Mcu = undefined;
    this.L8u = false;
    this.A8u = new Map();
    this.vqm = 0;
    this.IsOldBvb = false;
    this.IsBattleLoading = false;
    this.CurrentLoading = 0;
    this.OnClickExitButtonConfirm = () => {
      this.SetIsInBattle(false);
      AudioSystem_1.AudioSystem.ExecuteAction("play_music_arena_battle", 0);
    };
    this.YPg = new Map();
    this.JPg = new Map();
  }
  get Round() {
    return this.usu;
  }
  get ChallengeId() {
    return this.vqm;
  }
  InitData() {
    this.usu = 1;
    this.ReplaceCardData = new PhantomArenaReplaceCardData_1.PhantomArenaReplaceCardData();
    this.OwnData = new PhantomArenaOwnData_1.PhantomArenaOwnData();
    this.OpponentData = new PhantomArenaOpponentData_1.PhantomArenaOpponentData();
    this.BattleData = new PhantomArenaBattleData_1.PhantomArenaBattleData();
    this.BuffEffectData = new PhantomArenaBuffEffectData_1.PhantomArenaBuffEffectData();
    this.SelectCardData = new PhantomArenaSelectCardData_1.PhantomArenaSelectCardData();
  }
  SetChallengeId(t) {
    this.vqm = t;
    t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(t);
    t = ConfigManager_1.ConfigManager.ActivityConfig.GetActivityConfig(t.ActivityId);
    this.IsOldBvb = t?.Type === Protocol_1.Aki.Protocol.uks.Proto_PhantomBattle;
  }
  SetRound(t) {
    this.usu = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshRound);
  }
  SetReplaceCardToHandCard(t) {
    this.ReplaceCardData.ClearReplaceCardData();
    this.OwnData.RefreshCardLibraryNum(t.aE1);
    this.OwnData.InitHandData(t.Jg1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ReplaceCardFinish);
  }
  SetReplaceCardToHandCardWithoutChange(t) {
    this.OwnData.InitHandData(t);
  }
  RefreshFighterAttr(t, e) {
    if (t === this.OwnData.FightId) {
      this.OwnData.RefreshBattleAttr(e);
    } else if (t === this.OpponentData.FightId) {
      this.OpponentData.RefreshBattleAttr(e);
    } else {
      this.OpponentData.RefreshCardAttr(t, e);
      this.OwnData.RefreshCardAttr(t, e);
    }
  }
  InitTaskData(t) {
    for (const e of t) {
      (e.Fg1 === 0 ? this.OpponentData : this.OwnData).InitTaskData(e);
    }
  }
  InitFieldData() {
    this.OpponentData.InitFieldData();
    this.OwnData.InitFieldData();
  }
  InitRecycleData() {
    this.OpponentData.InitRecycleData();
    this.OwnData.InitRecycleData();
  }
  RefreshFieldAndRecycleLockData(t) {
    for (const e of t) {
      if (e.Tvm === Protocol_1.Aki.Protocol.Dvm.Proto_Retrieve) {
        (e.kg1 === this.OpponentData.FightId ? this.OpponentData : this.OwnData).RefreshRecycleLockData(e.Rvm);
      } else if (e.Tvm === Protocol_1.Aki.Protocol.Dvm.Suc) {
        (e.kg1 === this.OpponentData.FightId ? this.OpponentData : this.OwnData).RefreshFieldLockData(e.Rvm);
      }
    }
  }
  RefreshTaskData(t) {
    for (const e of t) {
      if (e.Fg1 === 0) {
        this.OpponentData.RefreshTaskData(e);
      } else if (e.Fg1 === 1) {
        this.OwnData.RefreshTaskData(e);
      }
    }
  }
  CheckSkillEnoughCost(t) {
    return this.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleCostPoint) - ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleSkillConfig(t).CostConsume >= 0;
  }
  GetFightIdList(t) {
    var e = [];
    e.push(...this.OwnData.GetFightIdList(t));
    e.push(...this.OpponentData.GetFightIdList(t));
    return e;
  }
  SetSpeedUp() {
    this.Nhu += 1;
    if (this.Nhu >= this.Vhu.length) {
      this.Nhu = 0;
    }
    this.ApplySpeedUp();
  }
  ApplySpeedUp() {
    if (this.jhu) {
      ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(this.Vhu[this.Nhu], 3);
      this.ApplySpeedBuff(this.Vhu[this.Nhu]);
    }
  }
  GetSpeedUpText() {
    return this.Vhu[this.Nhu] ?? 1;
  }
  SetNormalSpeed() {
    this.ApplySpeedBuff(1);
    ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(1, 3);
  }
  ApplySpeedBuff(t) {
    var t = 1 / t;
    var e = Global_1.Global.BaseCharacter;
    if (e !== undefined && UE.KismetSystemLibrary.IsValid(e) && (e = e.EntityId, e = EntitySystem_1.EntitySystem.GetComponent(e, 133))) {
      e.SetForeverTimeScale(13, t);
    }
  }
  SetIsInBattle(t) {
    if (this.jhu = t) {
      this.SetTurnCountResultEnd(false);
      this.SetDealCardNotify(undefined);
      this.SetPhantomBattleBoardSettleNotify(undefined);
      this.ApplySpeedUp();
    } else {
      this.SetNormalSpeed();
    }
  }
  GetTurnCountResultEnd() {
    return this.Scu;
  }
  SetTurnCountResultEnd(t) {
    this.Scu = t;
  }
  SetDealCardNotify(t) {
    this.HD1 = t;
  }
  SetPhantomBattleBoardSettleNotify(t) {
    if (this.Mcu = t) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomBattleBoardSettleNotify);
    }
  }
  GetDealCardNotify() {
    return this.HD1;
  }
  GetPhantomBattleSettleNotify() {
    return this.Mcu;
  }
  TryPhantomBattleDealCardNotify() {
    this.SetTurnCountResultEnd(true);
    var t = this.GetDealCardNotify();
    var e = this.GetPhantomBattleSettleNotify();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 77, "声骸竞技场BvB结算表现结束", ["canNext", t !== undefined || e !== undefined]);
    }
    if (t) {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.PhantomBattleDealCardNotify(t);
    } else if (e) {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.TriggerPhantomBattleBoardSettle();
    }
  }
  GetPhantomTagMap() {
    if (!this.L8u) {
      var t;
      this.L8u = true;
      for (const e of ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleAllFactor()) {
        if (!e.IsBeforeBattle && !StringUtils_1.StringUtils.IsBlank(e.Tag)) {
          t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.Tag);
          this.A8u.set(t, e.Id);
        }
      }
    }
    return this.A8u;
  }
  AddWaitCallCardIdList(t) {
    for (const a of t) {
      var e = this.OwnData.GetBattleCardByCardId(a);
      this.YPg.set(a, e.Index);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "添加等待召唤卡牌ID列表", ["CardIdList", t], ["WaitCallCardIdMap", this.YPg.size]);
    }
  }
  RemoveWaitCallCardIdList(t) {
    for (const e of t) {
      this.YPg.delete(e);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "移除等待召唤卡牌ID列表", ["CardIdList", t], ["WaitCallCardIdMap", this.YPg.size]);
    }
  }
  InWaitCallCardIdList(t) {
    return this.YPg.has(t);
  }
  zPg() {
    this.YPg.clear();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "清空等待召唤卡牌ID列表");
    }
  }
  AddWaitReconstructCardIdList(t) {
    for (const a of t) {
      var e = this.OwnData.GetBattleCardByCardId(a);
      this.JPg.set(a, e.Index);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "添加等待重构卡牌ID列表", ["CardIdList", t], ["WaitReconstructCardIdSet", this.JPg.size]);
    }
  }
  RemoveWaitReconstructCardIdList(t) {
    for (const e of t) {
      this.JPg.delete(e);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "移除等待重构卡牌ID列表", ["CardIdList", t], ["WaitReconstructCardIdMap", this.JPg.size]);
    }
  }
  InWaitReconstructCardIdList(t) {
    return this.JPg.has(t);
  }
  ZPg() {
    this.JPg.clear();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "清空等待重构卡牌ID列表");
    }
  }
  CanSetSlotIndex(t) {
    for (const e of this.YPg.values()) {
      if (e === t) {
        return false;
      }
    }
    for (const a of this.JPg.values()) {
      if (a === t) {
        return false;
      }
    }
    return true;
  }
  CanDragCard(t) {
    return !this.InWaitCallCardIdList(t) && !this.InWaitReconstructCardIdList(t);
  }
  ClearWaitBattleData() {
    this.zPg();
    this.ZPg();
  }
}
exports.PhantomArenaBattleModel = PhantomArenaBattleModel;
//# sourceMappingURL=PhantomArenaBattleModel.js.map