"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaCardLogic = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const PhantomArenaSkillInteractFactory_1 = require("../../SkillInteract/PhantomArenaSkillInteractFactory");
class PhantomArenaCardLogic {
  constructor(t, e) {
    this.Card = undefined;
    this.ViewProxy = undefined;
    this.SkillBtnClick = () => {
      this.tkm();
    };
    this.Card = t;
    this.ViewProxy = e;
  }
  CheckRecycleSettingConditionFromHead() {
    return this.OnCheckRecycleSettingConditionFromHead();
  }
  CheckRecycleSettingConditionFromFunctional() {
    return this.OnCheckRecycleSettingConditionFromFunctional();
  }
  BeforeStart() {
    this.OnBeforeStart();
  }
  GetComponentsDataList() {
    return [];
  }
  Refresh(t) {
    this.Card.Data = t;
    this.OnRefresh();
  }
  SetSelectedState(t) {
    this.OnSetSelectedState(t);
  }
  async RefreshEffect(t) {
    await this.OnRefreshEffect(t);
  }
  TryFinishCurrentGuide() {
    var t = {
      CardId: this.Card.Data.CardId
    };
    this.ViewProxy.GuideManager.TryFinishGuideByType("BvbUseItemCardSkill", t);
  }
  OnBeforeStart() {}
  OnRefresh() {}
  OnSetSelectedState(t) {}
  async OnRefreshEffect(t) {
    return Promise.resolve();
  }
  async tkm() {
    var t;
    var e;
    var r;
    if (this.Card.Data.HasClickActiveSkill && !this.ViewProxy.InCantDragState() && this.ViewProxy.GuideManager.CheckCanExecuteAndShowFailTips("BvbUseItemCardSkill", this.Card.Data.Index) && (this.ViewProxy?.GuideManager.TryCacheGuideData("BvbUseItemCardSkill", this.Card.Data.CardId, this.Card.Data.ClickActiveSkillId), await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleCardTargetInfo(this.Card.Data.CardId, this.Card.Data.ClickActiveSkillId, true, true))) {
      if (t = ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.CardSkillTriggerInfo) {
        this.ViewProxy?.HideCardTips();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行卡牌技能", ["卡牌配置id", this.Card.Data.ConfigId]);
        }
        e = PhantomArenaSkillInteractFactory_1.PhantomArenaSkillInteractFactory.GetSkillInteract(t.InteractType);
        r = this.ViewProxy.OwnArea.FunctionalArea.GetCardProxyByIndex(this.Card.Data.Index);
        e = await e.Execute(this.ViewProxy, r);
        r = {
          CardId: this.Card.Data.CardId,
          BuffType: t.InteractType
        };
        this.ViewProxy.GuideManager.TryFinishGuideByType("BvbUseItemCardSkill", e, r);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 10, "卡牌技能触发信息不存在");
      }
    }
  }
}
exports.PhantomArenaCardLogic = PhantomArenaCardLogic;
//# sourceMappingURL=PhantomArenaCardLogic.js.map