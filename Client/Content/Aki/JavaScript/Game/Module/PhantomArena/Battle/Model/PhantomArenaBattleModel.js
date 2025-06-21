"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleModel = void 0;
const UE = require("ue"),
  AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
  ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  PhantomArenaBattleController_1 = require("../PhantomArenaBattleController"),
  PhantomArenaBattleData_1 = require("./PhantomArenaBattleData"),
  PhantomArenaBuffEffectData_1 = require("./PhantomArenaBuffEffectData"),
  PhantomArenaOpponentData_1 = require("./PhantomArenaOpponentData"),
  PhantomArenaOwnData_1 = require("./PhantomArenaOwnData"),
  PhantomArenaReplaceCardData_1 = require("./PhantomArenaReplaceCardData"),
  PhantomArenaSelectCardData_1 = require("./PhantomArenaSelectCardData"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
class PhantomArenaBattleModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.LoadingConfig = void 0, this.InstId = 0, this.ReplaceCardData = void 0, this.OwnData = void 0, this.OpponentData = void 0, this.BattleData = void 0, this.BuffEffectData = void 0, this.SelectCardData = void 0, this.IsNeedShowTimeEndConfirm = !0, this.Eiu = 0, this.bou = 0, this.Rou = ConfigManager_1.ConfigManager.CommonConfig.GetPhantomArenaBattleSpeed(), this.Lou = !1, this.msu = !1, this.fD1 = void 0, this.fsu = void 0, this.mCu = !1, this.fCu = new Map, this.ChallengeId = 0, this.IsBattleLoading = !1, this.CurrentLoading = 0, this.OnClickExitButtonConfirm = () => {
      AudioSystem_1.AudioSystem.ExecuteAction("play_music_arena_battle", 0)
    }
  }
  get Round() {
    return this.Eiu
  }
  InitData() {
    this.ReplaceCardData = new PhantomArenaReplaceCardData_1.PhantomArenaReplaceCardData, this.OwnData = new PhantomArenaOwnData_1.PhantomArenaOwnData, this.OpponentData = new PhantomArenaOpponentData_1.PhantomArenaOpponentData, this.BattleData = new PhantomArenaBattleData_1.PhantomArenaBattleData, this.BuffEffectData = new PhantomArenaBuffEffectData_1.PhantomArenaBuffEffectData, this.SelectCardData = new PhantomArenaSelectCardData_1.PhantomArenaSelectCardData
  }
  SetRound(t) {
    this.Eiu = t, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshRound)
  }
  SetReplaceCardToHandCard(t) {
    this.ReplaceCardData.ClearReplaceCardData(), this.OwnData.RefreshCardLibraryNum(t.OM1), this.OwnData.InitHandData(t.wg1), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ReplaceCardFinish)
  }
  SetReplaceCardToHandCardWithoutChange(t) {
    this.OwnData.InitHandData(t)
  }
  RefreshFighterAttr(t, e) {
    t === this.OwnData.FightId ? this.OwnData.RefreshBattleAttr(e) : t === this.OpponentData.FightId ? this.OpponentData.RefreshBattleAttr(e) : (this.OpponentData.RefreshCardAttr(t, e), this.OwnData.RefreshCardAttr(t, e))
  }
  InitTaskData(t) {
    for (const e of t)(0 === e.Cg1 ? this.OpponentData : this.OwnData).InitTaskData(e)
  }
  RefreshTaskData(t) {
    for (const e of t) 0 === e.Cg1 ? this.OpponentData.RefreshTaskData(e) : 1 === e.Cg1 && this.OwnData.RefreshTaskData(e)
  }
  CheckCardEnoughCost(t) {
    var e = this.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleCostPoint);
    const a = t.UseCost;
    if (0 <= e - a) return !0;
    if (t.HasActiveSkill) {
      const a = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleSkillConfig(t.ActiveSkillId).CostConsume;
      if (0 <= e - a) return !0
    }
    return !1
  }
  CheckSkillEnoughCost(t) {
    return 0 <= this.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleCostPoint) - ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleSkillConfig(t).CostConsume
  }
  GetFightIdList(t) {
    var e = [];
    return e.push(...this.OwnData.GetFightIdList(t)), e.push(...this.OpponentData.GetFightIdList(t)), e
  }
  SetSpeedUp() {
    this.bou += 1, this.bou >= this.Rou.length && (this.bou = 0), this.ApplySpeedUp()
  }
  ApplySpeedUp() {
    this.Lou && (UE.GameplayStatics.SetGlobalTimeDilation(GlobalData_1.GlobalData.World, this.Rou[this.bou]), this.ApplySpeedBuff(this.Rou[this.bou]))
  }
  GetSpeedUpText() {
    return this.Rou[this.bou] ?? 1
  }
  SetNormalSpeed() {
    this.ApplySpeedBuff(1), UE.GameplayStatics.SetGlobalTimeDilation(GlobalData_1.GlobalData.World, 1)
  }
  ApplySpeedBuff(t) {
    var t = 1 / t,
      e = Global_1.Global.BaseCharacter;
    void 0 !== e && UE.KismetSystemLibrary.IsValid(e) && (e = e.EntityId, e = EntitySystem_1.EntitySystem.GetComponent(e, 122)) && e.SetForeverTimeScale(13, t)
  }
  SetIsInBattle(t) {
    (this.Lou = t) ? (this.SetTurnCountResultEnd(!1), this.SetDealCardNotify(void 0), this.SetPhantomBattleBoardSettleNotify(void 0), this.ApplySpeedUp()) : this.SetNormalSpeed()
  }
  GetTurnCountResultEnd() {
    return this.msu
  }
  SetTurnCountResultEnd(t) {
    this.msu = t
  }
  SetDealCardNotify(t) {
    this.fD1 = t
  }
  SetPhantomBattleBoardSettleNotify(t) {
    this.fsu = t
  }
  GetDealCardNotify() {
    return this.fD1
  }
  GetPhantomBattleSettleNotify() {
    return this.fsu
  }
  TryPhantomBattleDealCardNotify() {
    this.SetTurnCountResultEnd(!0);
    var t = this.GetDealCardNotify(),
      e = this.GetPhantomBattleSettleNotify();
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 77, "声骸竞技场3D BvB演出完毕", ["canNext", void 0 !== t || void 0 !== e]), t ? PhantomArenaBattleController_1.PhantomArenaBattleController.PhantomBattleDealCardNotify(t) : e && PhantomArenaBattleController_1.PhantomArenaBattleController.PhantomBattleBoardSettleNotify(e)
  }
  GetPhantomTagMap() {
    if (!this.mCu) {
      var t;
      this.mCu = !0;
      for (const e of ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleAllFactor()) e.IsBeforeBattle || StringUtils_1.StringUtils.IsBlank(e.Tag) || (t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.Tag), this.fCu.set(t, e.Id))
    }
    return this.fCu
  }
}
exports.PhantomArenaBattleModel = PhantomArenaBattleModel;
//# sourceMappingURL=PhantomArenaBattleModel.js.map