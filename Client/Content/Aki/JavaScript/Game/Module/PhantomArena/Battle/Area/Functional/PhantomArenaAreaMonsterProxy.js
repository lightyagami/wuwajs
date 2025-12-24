"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaAreaMonsterProxy = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const PhantomArenaLogicFactory_1 = require("../../Card/Logic/PhantomArenaLogicFactory");
const PhantomArenaCard_1 = require("../../Card/PhantomArenaCard");
const PhantomArenaAssetManager_1 = require("../../PhantomArenaAssetManager");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
const PhantomArenaAreaProxyBase_1 = require("./PhantomArenaAreaProxyBase");
class PhantomArenaAreaMonsterProxy extends PhantomArenaAreaProxyBase_1.PhantomArenaAreaProxyBase {
  constructor() {
    super(...arguments);
    this.AreaItem = undefined;
    this.AreaType = 0;
    this.x31 = undefined;
    this.WD_ = false;
    this.dXu = false;
    this.IsInSkillInteract = false;
  }
  CheckEvolveGuideCondition(t, e) {
    return e !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX || (e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandIndexByCardId(t), this.ParentArea.ParentArea.ViewProxy.GuideManager.CheckCanExecuteAndShowFailTips("BvbEvolution", e, this.Index));
  }
  CheckSettingGuideCondition(t, e) {
    return e !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX || (e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandIndexByCardId(t), this.ParentArea.ParentArea.ViewProxy.GuideManager.CheckCanExecuteAndShowFailTips("BvbDeploy", e, this.Index));
  }
  CheckGuideCondition(t) {
    if (this.Card !== undefined && t !== undefined && this.Card !== t) {
      return this.CheckEvolveGuideCondition(t.Data.CardId, t.Data.Index);
    } else {
      return this.CheckSettingGuideCondition(t.Data.CardId, t.Data.Index);
    }
  }
  CheckSettingCardCondition(t) {
    var [t, e] = t.CardLogic.CheckMonsterSettingCondition(this.Card);
    this.SettingFailReason = e;
    return t;
  }
  async OnHandleAreaByEvolve(t) {
    this.SetCardResetPosition(t);
    if (!(await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleEvolve(t.Data.CardId, this.Index))) {
      return false;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "执行因子继承", ["被继承卡牌", this.Card?.Data.CardId], ["继承卡牌", t?.Data.CardId]);
    }
    var e = this.Card;
    await this.SetCard(t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshHandCardState);
    if (e && (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "LastCard Destroy Start"), await e.DestroyAsync(), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("PhantomArena", 10, "LastCard Destroy End");
    }
    this.AreaItem.SetEvolveActive(true);
    this.ParentArea.ParentArea.ViewProxy.GuideManager.FinishCurrentGuide();
    return true;
  }
  async OnHandleAreaBySetCard(t) {
    this.SetCardResetPosition(t);
    return !!(await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleEnterSlot(t.Data.CardId, this.Index)) && (await this.SetCard(t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshHandCardState), this.ParentArea.ParentArea.ViewProxy.GuideManager.FinishCurrentGuide(), true);
  }
  async OnHandleCardSetting(t) {
    if (this.Card !== undefined && t !== undefined && this.Card !== t) {
      return this.OnHandleAreaByEvolve(t);
    } else {
      return this.OnHandleAreaBySetCard(t);
    }
  }
  GetCardRootItem() {
    return this.AreaItem.GetCardRootItem();
  }
  async SetCard(t) {
    var e = t?.Data.ConfigId;
    var r = this.Card?.Data.ConfigId;
    if (e !== r && (r && this.Card?.Data.IsNormal && PhantomArenaAssetManager_1.PhantomArenaAssetManager.RemovePhantomArenaAssetByCardConfigId(r), e) && t?.Data.IsNormal) {
      PhantomArenaAssetManager_1.PhantomArenaAssetManager.PreloadPhantomArenaAssetByCardConfigId(e);
    }
    await super.SetCard(t);
  }
  async CopyCard(t) {
    var e = new PhantomArenaCard_1.PhantomArenaCard();
    e.RegisterCardLogic(PhantomArenaLogicFactory_1.PhantomArenaLogicFactory.CreateLogic(e, t.GetCardType(), this.ParentArea.ParentArea.ViewProxy));
    await e.InitializePhantomArenaCard(t, this.AreaItem.GetRootItem());
    await this.SetCard(e);
    await e.ShowCopyEffect();
  }
  PointerClickCard(t, e) {
    var r;
    if (this.x31) {
      r = !this.dXu;
      if (this.x31.ReceiveClickData(2, t, this.Index, r)) {
        if (r) {
          this.dXu = true;
          this.Card?.PlaySequence("Point");
        } else {
          this.dXu = false;
          this.Card?.PlaySequence("PointClose");
        }
      } else {
        this.Card?.SetToggleState(0, false);
      }
    } else if (this.Card) {
      this.ParentArea.ParentArea.ViewProxy.ShowCardTips(this.Card.Data, true);
      this.ParentArea.ParentArea.ViewProxy.SetSelectedCardId(t, 2);
    }
  }
  PointerEnterCard() {}
  PointerDownCard(t, e) {
    this.WD_ = this.ieg(t);
    if (this.WD_) {
      this.Card?.RecordLastDragPos(e.pointerPosition);
    }
  }
  ieg(t) {
    return !this.IsInCardTween && !ModelManager_1.ModelManager.PhantomArenaBattleModel.InWaitReconstructCardIdList(t) && this.ParentArea.ParentArea.IsCanDragCard(t);
  }
  PointerBeginDrag(t, e) {
    if (this.Card && this.WD_) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "开始拖动手牌");
      }
      this.Card?.PlayStateSequence("SeleStart");
      this.ParentArea.ParentArea.CardBeginDragByFunctional(this.Card);
      this.Card.PlaySequence("DragUpTabletoHand");
    }
  }
  PointerDragCard(t, e) {
    if (this.Card && this.WD_) {
      e = e.pointerPosition;
      this.Card.MoveCard(e);
      this.ParentArea.ParentArea.CardDraggingByFunctional(this);
    }
  }
  PointerEndDrag(t, e) {
    if (this.Card && this.WD_) {
      this.ParentArea.ParentArea.CardEndDragByFunctional(this.Card, this.Index);
    }
  }
  CheckCanvasSortOrder(t, e) {
    return !!this.Card && !!e.SelectFightIdList.includes(this.Card.Data.FightId) && !!t.includes(0);
  }
  HandleSortOrder() {
    if (this.Card) {
      this.Card.OverrideCanvasSortOrder(true);
      this.Card.PlayStateSequence("PointStart");
      this.IsInSkillInteract = true;
    }
  }
  CancelSortOrder() {
    if (this.Card) {
      this.Card.OverrideCanvasSortOrder(false);
      this.Card.PlayStateSequence("PointClose");
      if (this.Card.GetToggleState() === 1) {
        this.Card.SetToggleState(0, false);
      }
      if (this.dXu) {
        this.Card.PlaySequence("PointClose");
      }
      this.dXu = false;
      this.IsInSkillInteract = false;
    }
  }
  ReceiveUiInteract(t) {
    this.x31 = t;
  }
  async StartSkillInteract() {
    await this.AreaItem.SetIncreaseActive(true);
  }
  CancelSkillInteract() {
    this.AreaItem.SetIncreaseActive(false);
  }
  FinishSkillInteract() {
    this.AreaItem.SetIncreaseActive(false);
    this.Card?.CardLogic?.TryFinishCurrentGuide();
  }
  GetData() {
    return ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.CardSkillTriggerInfo;
  }
}
exports.PhantomArenaAreaMonsterProxy = PhantomArenaAreaMonsterProxy;
//# sourceMappingURL=PhantomArenaAreaMonsterProxy.js.map