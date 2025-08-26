"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaAreaMonsterProxy = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
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
    this.bZu = false;
    this.IsInSkillInteract = false;
  }
  cD1(t) {
    if (t.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX) {
      if (ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.CanEvolveNum <= 0) {
        return !(this.SettingFailReason = "PhantomBattle_1049");
      }
      t = this.Card.Data.IsOtherCardCanEvolve(t.Data);
      if (!t[0]) {
        this.SettingFailReason = t[1];
        return false;
      }
    }
    return !(this.SettingFailReason = "");
  }
  dD1(t) {
    if (t.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX) {
      if (ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.BattleCardLength >= PhantomArenaDefine_1.LIMIT_BATTLE_CARD_NUM) {
        return !(this.SettingFailReason = "PhantomBattle_1048");
      }
      if (t.Data.ConfigCost === PhantomArenaDefine_1.COST_THREE) {
        return !(this.SettingFailReason = "PhantomBattle_1066");
      }
    }
    return !(this.SettingFailReason = "");
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
    if (t.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX && ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleCostPoint) - t.Data.UseCost < 0) {
      return !(this.SettingFailReason = "PhantomBattle_1051");
    }
    if (t.Data.CanUse) {
      if (this.Card) {
        return this.cD1(t);
      } else {
        return this.dD1(t);
      }
    } else {
      this.SettingFailReason = "";
      return false;
    }
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
    var i = this.Card?.Data.ConfigId;
    if (e !== i && (i && PhantomArenaAssetManager_1.PhantomArenaAssetManager.RemovePhantomArenaAssetByCardConfigId(i), e)) {
      PhantomArenaAssetManager_1.PhantomArenaAssetManager.PreloadPhantomArenaAssetByCardConfigId(e);
    }
    await super.SetCard(t);
  }
  PointerClickCard(t, e) {
    var i;
    if (this.x31) {
      i = !this.bZu;
      if (this.x31.ReceiveClickData(2, t, this.Index, i)) {
        if (i) {
          this.bZu = true;
          this.Card?.PlaySequence("Point");
        } else {
          this.bZu = false;
          this.Card?.PlaySequence("PointClose");
        }
      } else {
        this.Card?.SetToggleState(0, false);
      }
    } else if (this.Card) {
      this.ParentArea.ParentArea.ViewProxy.ShowCardTips(this.Card.Data);
      this.ParentArea.ParentArea.ViewProxy.SetSelectedCardId(t, 2);
    }
  }
  PointerEnterCard() {}
  PointerDownCard(t, e) {
    this.WD_ = this.ParentArea.ParentArea.IsCanDragCard();
    if (this.WD_) {
      this.Card?.RecordLastDragPos(e.pointerPosition);
    }
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
      if (this.bZu) {
        this.Card.PlaySequence("PointClose");
      }
      this.bZu = false;
      this.IsInSkillInteract = false;
    }
  }
  ReceiveUiInteract(t) {
    this.x31 = t;
  }
}
exports.PhantomArenaAreaMonsterProxy = PhantomArenaAreaMonsterProxy;
//# sourceMappingURL=PhantomArenaAreaMonsterProxy.js.map