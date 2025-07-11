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
    this.Gnu = 0;
    this.mhu = 0;
    this.fhu = ConfigManager_1.ConfigManager.CommonConfig.GetPhantomArenaBattleSpeed();
    this.ghu = false;
    this.quu = false;
    this.HD1 = undefined;
    this.Guu = undefined;
    this._jc = false;
    this.cjc = new Map();
    this.ChallengeId = 0;
    this.IsBattleLoading = false;
    this.CurrentLoading = 0;
    this.OnClickExitButtonConfirm = () => {
      this.SetIsInBattle(false);
      AudioSystem_1.AudioSystem.ExecuteAction("play_music_arena_battle", 0);
    };
  }
  get Round() {
    return this.Gnu;
  }
  InitData() {
    this.Gnu = 1;
    this.ReplaceCardData = new PhantomArenaReplaceCardData_1.PhantomArenaReplaceCardData();
    this.OwnData = new PhantomArenaOwnData_1.PhantomArenaOwnData();
    this.OpponentData = new PhantomArenaOpponentData_1.PhantomArenaOpponentData();
    this.BattleData = new PhantomArenaBattleData_1.PhantomArenaBattleData();
    this.BuffEffectData = new PhantomArenaBuffEffectData_1.PhantomArenaBuffEffectData();
    this.SelectCardData = new PhantomArenaSelectCardData_1.PhantomArenaSelectCardData();
  }
  SetRound(t) {
    this.Gnu = t;
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
  RefreshTaskData(t) {
    for (const e of t) {
      if (e.Fg1 === 0) {
        this.OpponentData.RefreshTaskData(e);
      } else if (e.Fg1 === 1) {
        this.OwnData.RefreshTaskData(e);
      }
    }
  }
  CheckCardEnoughCost(t) {
    var e = this.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleCostPoint);
    const a = t.UseCost;
    if (e - a >= 0) {
      return true;
    }
    if (t.HasActiveSkill) {
      const a = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleSkillConfig(t.ActiveSkillId).CostConsume;
      if (e - a >= 0) {
        return true;
      }
    }
    return false;
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
    this.mhu += 1;
    if (this.mhu >= this.fhu.length) {
      this.mhu = 0;
    }
    this.ApplySpeedUp();
  }
  ApplySpeedUp() {
    if (this.ghu) {
      ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(this.fhu[this.mhu], 2);
      this.ApplySpeedBuff(this.fhu[this.mhu]);
    }
  }
  GetSpeedUpText() {
    return this.fhu[this.mhu] ?? 1;
  }
  SetNormalSpeed() {
    this.ApplySpeedBuff(1);
    ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(1, 2);
  }
  ApplySpeedBuff(t) {
    var t = 1 / t;
    var e = Global_1.Global.BaseCharacter;
    if (e !== undefined && UE.KismetSystemLibrary.IsValid(e) && (e = e.EntityId, e = EntitySystem_1.EntitySystem.GetComponent(e, 122))) {
      e.SetForeverTimeScale(13, t);
    }
  }
  SetIsInBattle(t) {
    if (this.ghu = t) {
      this.SetTurnCountResultEnd(false);
      this.SetDealCardNotify(undefined);
      this.SetPhantomBattleBoardSettleNotify(undefined);
      this.ApplySpeedUp();
    } else {
      this.SetNormalSpeed();
    }
  }
  GetTurnCountResultEnd() {
    return this.quu;
  }
  SetTurnCountResultEnd(t) {
    this.quu = t;
  }
  SetDealCardNotify(t) {
    this.HD1 = t;
  }
  SetPhantomBattleBoardSettleNotify(t) {
    this.Guu = t;
  }
  GetDealCardNotify() {
    return this.HD1;
  }
  GetPhantomBattleSettleNotify() {
    return this.Guu;
  }
  TryPhantomBattleDealCardNotify() {
    this.SetTurnCountResultEnd(true);
    var t = this.GetDealCardNotify();
    var e = this.GetPhantomBattleSettleNotify();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 77, "声骸竞技场3D BvB演出完毕", ["canNext", t !== undefined || e !== undefined]);
    }
    if (t) {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.PhantomBattleDealCardNotify(t);
    } else if (e) {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.PhantomBattleBoardSettleNotify(e);
    }
  }
  GetPhantomTagMap() {
    if (!this._jc) {
      var t;
      this._jc = true;
      for (const e of ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleAllFactor()) {
        if (!e.IsBeforeBattle && !StringUtils_1.StringUtils.IsBlank(e.Tag)) {
          t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.Tag);
          this.cjc.set(t, e.Id);
        }
      }
    }
    return this.cjc;
  }
}
exports.PhantomArenaBattleModel = PhantomArenaBattleModel;
//# sourceMappingURL=PhantomArenaBattleModel.js.map