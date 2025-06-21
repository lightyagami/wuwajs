"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaAreaFunctionalProxy = void 0;
const Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine"),
  PhantomArenaSkillInteractFactory_1 = require("../../SkillInteract/PhantomArenaSkillInteractFactory"),
  PhantomArenaAreaProxyBase_1 = require("./PhantomArenaAreaProxyBase");
class PhantomArenaAreaFunctionalProxy extends PhantomArenaAreaProxyBase_1.PhantomArenaAreaProxyBase {
  constructor() {
    super(...arguments), this.AreaItem = void 0, this.AreaType = 1, this.InSkillInteract = !1
  }
  Yru() {
    this.Card && (this.Card.MagicUse(), this.Card = void 0)
  }
  async OnHandleAreaBySetCard() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.CardSkillTriggerInfo;
    if (!t) return Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "卡牌技能触发信息不存在"), !1;
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "执行卡牌技能", ["卡牌配置id", this.Card.Data.ConfigId]);
    t = await PhantomArenaSkillInteractFactory_1.PhantomArenaSkillInteractFactory.GetSkillInteract(t.InteractType).Execute(this.ParentArea.ParentArea.ViewProxy, this);
    return 0 === t ? (this.Yru(), !0) : 1 !== t || (this.ResetToHand(), !1)
  }
  ResetToHand() {
    var t;
    this.Card && (t = this.ParentArea.ParentArea.HandArea.GetCardProxy(this.Card.Data.CardId), this.Card?.SetCardProxy(t), this.SetCard(void 0))
  }
  async OnHandleCardSetting(t) {
    return this.SetCardResetPosition(t), !!await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleCardTargetInfo(t.Data.CardId, t.Data.Index) && (await this.SetCard(t), !!await this.OnHandleAreaBySetCard()) && (this.ParentArea.ParentArea.ViewProxy.GuideManager.FinishCurrentGuide(), !0)
  }
  CheckGuideCondition(t) {
    var e;
    return t.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX ? (e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandIndexByCardId(t.Data.CardId), this.ParentArea.ParentArea.ViewProxy.GuideManager.CheckCanExecuteAndShowFailTips("BvbChangeHandCard", e)) : this.ParentArea.ParentArea.ViewProxy.GuideManager.CheckCanExecuteAndShowFailTips("BvbChangeBoardCard", t.Data.Index)
  }
  CheckSettingCardCondition(t) {
    if (this.Card) return !1;
    if (t.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX) {
      var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleCostPoint),
        r = t.Data.HasActiveSkill;
      if (r)
        if (e - ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleSkillConfig(t.Data.ActiveSkillId).CostConsume < 0) return !(this.SettingFailReason = "PhantomBattle_1051")
    }
    return t.Data.CanUse ? !!t.Data.HasActiveSkill || !(this.SettingFailReason = "PhantomBattle_1064") : (this.SettingFailReason = "", !1)
  }
  GetCardRootItem() {
    return this.AreaItem.GetCardRootItem()
  }
  CheckCanvasSortOrder() {
    return !!this.Card
  }
  HandleSortOrder() {
    this.Card && (this.Card.OverrideCanvasSortOrder(!0), this.AreaItem.GetCardRootItem().GetRenderCanvas()?.SetSortOrderNew(2), this.Card.PlayStateSequence("PointStart"), this.InSkillInteract = !0)
  }
  CancelSortOrder() {
    this.Card && (this.Card.OverrideCanvasSortOrder(!1), this.AreaItem.GetCardRootItem().GetRenderCanvas()?.SetSortOrderNew(0), this.Card.PlayStateSequence("PointClose"), this.InSkillInteract = !1)
  }
  async StartSkillInteract() {
    await this.AreaItem.SetIncreaseActive(!0)
  }
  CancelSkillInteract(t) {
    this.AreaItem.SetIncreaseActive(!1), this.Card && (t !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX ? this.ParentArea.ParentArea.FunctionalArea.ResetFunctionalToMonster(this.Card, t, this.Index) : this.ParentArea.ParentArea.ResetFunctionalToHand(this.Card, this.Index))
  }
  GetData() {
    return ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.CardSkillTriggerInfo
  }
  FinishSkillInteract() {
    this.AreaItem.SetIncreaseActive(!1), this.DestroyCard(), this.ParentArea.FinishBuffEffect(this.Index)
  }
}
exports.PhantomArenaAreaFunctionalProxy = PhantomArenaAreaFunctionalProxy;
//# sourceMappingURL=PhantomArenaAreaFunctionalProxy.js.map