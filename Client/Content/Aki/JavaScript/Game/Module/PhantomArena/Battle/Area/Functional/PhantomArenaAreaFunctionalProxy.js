"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaAreaFunctionalProxy = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
const PhantomArenaSkillInteractFactory_1 = require("../../SkillInteract/PhantomArenaSkillInteractFactory");
const PhantomArenaAreaProxyBase_1 = require("./PhantomArenaAreaProxyBase");
class PhantomArenaAreaFunctionalProxy extends PhantomArenaAreaProxyBase_1.PhantomArenaAreaProxyBase {
  constructor() {
    super(...arguments);
    this.AreaItem = undefined;
    this.AreaType = 1;
    this.InSkillInteract = false;
  }
  uhu() {
    if (this.Card) {
      this.Card.MagicUse();
      this.Card = undefined;
    }
  }
  async OnHandleAreaBySetCard() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.CardSkillTriggerInfo;
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 10, "卡牌技能触发信息不存在");
      }
      return false;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "执行卡牌技能", ["卡牌配置id", this.Card.Data.ConfigId]);
    }
    t = await PhantomArenaSkillInteractFactory_1.PhantomArenaSkillInteractFactory.GetSkillInteract(t.InteractType).Execute(this.ParentArea.ParentArea.ViewProxy, this);
    if (t === 0) {
      this.uhu();
      return true;
    } else {
      return t !== 1;
    }
  }
  ResetCardProxy() {
    var t;
    if (this.Card) {
      if (this.Card.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX) {
        t = this.ParentArea.ParentArea.HandArea.GetCardProxy(this.Card.Data.CardId);
        this.Card.SetCardProxy(t);
      } else {
        t = this.ParentArea.ParentArea.FunctionalArea.GetCardProxyByIndex(this.Card.Data.Index);
        this.Card.SetCardProxy(t);
      }
      this.SetCard(undefined);
    }
  }
  async OnHandleCardSetting(t) {
    this.SetCardResetPosition(t);
    return !!(await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleCardTargetInfo(t.Data.CardId, t.Data.Index)) && (await this.SetCard(t), (await this.OnHandleAreaBySetCard()) ? (this.ParentArea.ParentArea.ViewProxy.GuideManager.FinishCurrentGuide(), true) : (this.ResetCardProxy(), false));
  }
  CheckGuideCondition(t) {
    var e;
    if (t.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX) {
      e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandIndexByCardId(t.Data.CardId);
      return this.ParentArea.ParentArea.ViewProxy.GuideManager.CheckCanExecuteAndShowFailTips("BvbChangeHandCard", e);
    } else {
      return this.ParentArea.ParentArea.ViewProxy.GuideManager.CheckCanExecuteAndShowFailTips("BvbChangeBoardCard", t.Data.Index);
    }
  }
  CheckSettingCardCondition(t) {
    if (this.Card) {
      return false;
    }
    if (t.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX) {
      var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleCostPoint);
      var r = t.Data.HasActiveSkill;
      if (r) {
        if (e - ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleSkillConfig(t.Data.ActiveSkillId).CostConsume < 0) {
          return !(this.SettingFailReason = "PhantomBattle_1051");
        }
      }
    }
    if (t.Data.CanUse) {
      if (t.Data.HasActiveSkill) {
        return !(this.SettingFailReason = "");
      } else {
        return !(this.SettingFailReason = "PhantomBattle_1064");
      }
    } else {
      this.SettingFailReason = "";
      return false;
    }
  }
  GetCardRootItem() {
    return this.AreaItem.GetCardRootItem();
  }
  CheckCanvasSortOrder() {
    return !!this.Card;
  }
  HandleSortOrder() {
    if (this.Card) {
      this.Card.OverrideCanvasSortOrder(true);
      this.AreaItem.GetCardRootItem().GetRenderCanvas()?.SetSortOrderNew(2);
      this.Card.PlayStateSequence("PointStart");
      this.InSkillInteract = true;
    }
  }
  CancelSortOrder() {
    if (this.Card) {
      this.Card.OverrideCanvasSortOrder(false);
      this.AreaItem.GetCardRootItem().GetRenderCanvas()?.SetSortOrderNew(0);
      this.Card.PlayStateSequence("PointClose");
      this.InSkillInteract = false;
    }
  }
  async StartSkillInteract() {
    await this.AreaItem.SetIncreaseActive(true);
  }
  CancelSkillInteract(t) {
    this.AreaItem.SetIncreaseActive(false);
    if (this.Card) {
      if (t !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX) {
        this.ParentArea.ParentArea.FunctionalArea.ResetFunctionalToMonster(this.Card, t, this.Index);
      } else {
        this.ParentArea.ParentArea.ResetFunctionalToHand(this.Card, this.Index);
      }
    }
  }
  GetData() {
    return ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.CardSkillTriggerInfo;
  }
  FinishSkillInteract() {
    this.AreaItem.SetIncreaseActive(false);
    this.DestroyCard();
    this.ParentArea.FinishBuffEffect(this.Index);
  }
}
exports.PhantomArenaAreaFunctionalProxy = PhantomArenaAreaFunctionalProxy;
//# sourceMappingURL=PhantomArenaAreaFunctionalProxy.js.map