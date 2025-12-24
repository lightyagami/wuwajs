"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaDiscardCardPanel = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const PhantomArenaDiscardCardItem_1 = require("./PhantomArenaDiscardCardItem");
class PhantomArenaDiscardCardPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ViewProxy = undefined;
    this.Scroll = undefined;
    this.SelectedIdSet = new Set();
    this.Data = undefined;
    this.CurrentSelectId = -1;
    this.sGe = () => {
      var t = new PhantomArenaDiscardCardItem_1.PhantomArenaDiscardCardItem();
      t.ClickCallback = this.Ui1;
      return t;
    };
    this.CG1 = t => {
      t = t !== 1;
      this.ViewProxy.SetIsMainInVisible(!t);
      this.ViewProxy.HideCardTips();
      this.GetItem(3).SetUIActive(t);
    };
    this.tWt = () => {
      this.Data.ConfirmFunc(Array.from(this.SelectedIdSet)).finally(() => {
        if (this.Data.GuideType) {
          this.ViewProxy.GuideManager.TryFinishGuideByType(this.Data.GuideType);
        }
      });
    };
    this.z31 = () => {
      this.ViewProxy.HideCardTips();
    };
    this.Ui1 = (t, i) => {
      var e = t.CardId;
      this.dU1(e);
      if (!i || !this.Data.GuideType || this.ViewProxy.GuideManager.CheckCanExecuteAndShowFailTips(this.Data.GuideType, t.ConfigId)) {
        if (i && this.SelectedIdSet.size >= this.Data.LimitCount) {
          if (this.Data.LimitCount > 1) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(this.Data.SelectedTips);
            return;
          }
          this.X31();
        }
        this.Y31(e, i);
        this.mGe();
        this.pG1();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIExtendToggle], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIText]];
    this.BtnBindInfo = [[4, this.CG1], [5, this.tWt], [6, this.z31]];
  }
  OnStart() {
    this.Scroll = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.sGe, this.GetItem(2).GetOwner());
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaChooseCardPanelShow);
  }
  async OnBeforeShowAsyncImplement() {
    this.ViewProxy.RegisterCantDragReason(1);
    this.SelectedIdSet.clear();
    await this.Scroll.RefreshByDataAsync(this.Data.CardDataList);
    this.mGe();
    this.GLf();
    this.pG1();
    this.ViewProxy.HideCardTips();
    this.ViewProxy.SetCaptionItemActive(false);
    this.ViewProxy.SetInPanelInteractType(2);
    this.ViewProxy.SetIsMainInVisible(false);
  }
  OnAfterHide() {
    this.GetItem(3).SetUIActive(true);
    this.ViewProxy.HideCardTips();
    this.ViewProxy.SetCaptionItemActive(true);
    this.ViewProxy.UnRegisterCantDragReason(1);
    this.ViewProxy.SetIsMainInVisible(true);
    this.ViewProxy.SetInPanelInteractType(0);
  }
  Y31(t, i) {
    var e = this.Scroll.GetScrollItemByKey(t);
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
  KBt(t) {
    this.Scroll.GetScrollItemByKey(t)?.Card.SetToggleState(0, false);
  }
  dU1(t) {
    var i;
    if (this.CurrentSelectId !== t) {
      if (this.CurrentSelectId !== -1) {
        this.Scroll.GetScrollItemByKey(this.CurrentSelectId)?.SetSelectState(false);
      }
      if (i = this.Scroll.GetScrollItemByKey(t)) {
        i.SetSelectState(true);
        this.ViewProxy.ShowCardTips(i.Card.Data, false);
      }
      this.CurrentSelectId = t;
    }
  }
  mGe() {
    this.GetText(0).SetText(this.SelectedIdSet.size + "/" + this.Data.LimitCount);
  }
  GLf() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), this.Data.TitleTips);
  }
  pG1() {
    this.GetButton(5).SetSelfInteractive(this.SelectedIdSet.size >= this.Data.LimitCount);
  }
  RegisterViewProxy(t) {
    this.ViewProxy = t;
  }
  SetDiscardCardData(t) {
    this.Data = t;
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (!(t.length <= 0) && t[0] === "BattleCardDiscardById") {
      var i = Number(t[1]);
      for (const s of this.Scroll.GetScrollItemList()) {
        if (s.Card.Data.ConfigId === i) {
          var e = s.Card.GetRootItem();
          if (e) {
            return [e, e];
          }
        }
      }
    }
  }
}
exports.PhantomArenaDiscardCardPanel = PhantomArenaDiscardCardPanel;
//# sourceMappingURL=PhantomArenaDiscardCardPanel.js.map