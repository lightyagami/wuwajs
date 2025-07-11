"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaChooseCardPanel = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const PhantomArenaChooseCardItem_1 = require("./PhantomArenaChooseCardItem");
class PhantomArenaChooseCardPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ViewProxy = undefined;
    this.SelectedIdSet = new Set();
    this.LimitCount = 0;
    this.Layout = undefined;
    this.CurrentSelectId = -1;
    this.ConfirmFunc = undefined;
    this.sGe = () => {
      var t = new PhantomArenaChooseCardItem_1.PhantomArenaChooseCardItem();
      t.ClickCallback = this.Ui1;
      return t;
    };
    this.CG1 = t => {
      t = t !== 1;
      this.ViewProxy.SetIsMainInVisible(!t);
      this.ViewProxy.HideCardTips();
      this.GetItem(2).SetUIActive(t);
    };
    this.tWt = () => {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleCardSelect(Array.from(this.SelectedIdSet)).then(t => {
        if (t) {
          this.ConfirmFunc?.();
          this.ConfirmFunc = undefined;
          this.SetActive(false);
        }
      });
    };
    this.K31 = () => {
      this.cU1();
    };
    this.Ui1 = (t, i) => {
      this.dU1(t.CardId);
      if (i && this.SelectedIdSet.size >= this.LimitCount) {
        if (this.LimitCount > 1) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1079");
          return;
        }
        this.X31();
      }
      this.Y31(t.CardId, i);
      this.pG1();
      this.mGe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIExtendToggle], [5, UE.UIButtonComponent], [6, UE.UIText]];
    this.BtnBindInfo = [[3, this.tWt], [4, this.CG1], [5, this.K31]];
  }
  OnStart() {
    this.Layout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(0), this.sGe, this.GetItem(1).GetOwner());
  }
  async OnBeforeShowAsyncImplement() {
    this.ViewProxy.RegisterCantDragReason(1);
    this.SelectedIdSet.clear();
    this.CurrentSelectId = -1;
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.SelectCardData.GetSelectCardDataList();
    await this.Layout.RefreshByDataAsync(t);
    this.LimitCount = ModelManager_1.ModelManager.PhantomArenaBattleModel.SelectCardData.SelectNum;
    this.pG1();
    this.mGe();
    this.ViewProxy.HideCardTips();
    this.ViewProxy.SetCaptionItemActive(false);
    this.ViewProxy.IsInPanelInteract = true;
    this.ViewProxy.SetIsMainInVisible(false);
  }
  OnAfterHide() {
    this.GetItem(2).SetUIActive(true);
    this.ViewProxy.HideCardTips();
    this.ViewProxy.SetCaptionItemActive(true);
    this.ViewProxy.UnRegisterCantDragReason(1);
    this.ViewProxy.SetIsMainInVisible(true);
    this.ViewProxy.IsInPanelInteract = false;
  }
  Y31(t, i) {
    var e = this.Layout.GetLayoutItemByKey(t);
    if (e) {
      e.SetChooseState(i);
    }
    if (i) {
      this.SelectedIdSet.add(t);
    } else {
      this.SelectedIdSet.delete(t);
    }
  }
  X31() {
    var t;
    if (!(this.SelectedIdSet.size <= 0)) {
      if (t = this.SelectedIdSet.values().next().value) {
        this.Y31(t, false);
        this.KBt(t);
      }
    }
  }
  dU1(t) {
    var i;
    if (this.CurrentSelectId !== t) {
      if (this.CurrentSelectId !== -1) {
        this.Layout.GetLayoutItemByKey(this.CurrentSelectId)?.SetSelectState(false);
      }
      if (i = this.Layout.GetLayoutItemByKey(t)) {
        i.SetSelectState(true);
        this.ViewProxy.ShowCardTips(i.Card.Data);
      }
      this.CurrentSelectId = t;
    }
  }
  cU1() {
    if (this.CurrentSelectId !== -1) {
      this.Layout.GetLayoutItemByKey(this.CurrentSelectId)?.SetSelectState(false);
      this.CurrentSelectId = -1;
      this.ViewProxy.HideCardTips();
    }
  }
  KBt(t) {
    this.Layout.GetLayoutItemByKey(t)?.Card.SetToggleState(0, false);
  }
  pG1() {
    this.GetButton(3).SetSelfInteractive(this.SelectedIdSet.size >= this.LimitCount);
  }
  mGe() {
    var t = this.GetText(6);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, "PhantomBattle_1124", this.SelectedIdSet.size, this.LimitCount);
  }
  RegisterViewProxy(t) {
    this.ViewProxy = t;
  }
}
exports.PhantomArenaChooseCardPanel = PhantomArenaChooseCardPanel;
//# sourceMappingURL=PhantomArenaChooseCardPanel.js.map