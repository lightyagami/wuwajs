"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaDiscardCardPanel = void 0;
const UE = require("ue"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController"),
  GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew"),
  PhantomArenaDiscardCardItem_1 = require("./PhantomArenaDiscardCardItem");
class PhantomArenaDiscardCardPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.ViewProxy = void 0, this.Scroll = void 0, this.SelectedIdSet = new Set, this.Data = void 0, this.sGe = () => {
      var i = new PhantomArenaDiscardCardItem_1.PhantomArenaDiscardCardItem;
      return i.ClickCallback = this.mi1, i
    }, this.F21 = i => {
      i = 1 !== i;
      this.ViewProxy.SetIsMainInVisible(!i, this.RootItem), this.ViewProxy.HideCardTips(), this.GetItem(3).SetUIActive(i)
    }, this.tWt = () => {
      this.Data.ConfirmFunc(Array.from(this.SelectedIdSet))
    }, this.y31 = () => {
      this.ViewProxy.HideCardTips()
    }, this.mi1 = (i, t) => {
      this.jt_(i), t && this.SelectedIdSet.size >= this.Data.LimitCount ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1046") : (t ? this.SelectedIdSet.add(i) : this.SelectedIdSet.delete(i), this.qD1(i, t), this.mGe(), this.N21())
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIExtendToggle],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [4, this.F21],
      [5, this.tWt],
      [6, this.y31]
    ]
  }
  OnStart() {
    this.Scroll = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.sGe, this.GetItem(2).GetOwner())
  }
  async OnBeforeShowAsyncImplement() {
    this.ViewProxy.RegisterCantDragReason(2), this.SelectedIdSet.clear(), await this.Scroll.RefreshByDataAsync(this.Data.CardDataList), this.mGe(), this.N21(), this.ViewProxy.HideCardTips(), this.ViewProxy.SetCaptionItemActive(!1), this.ViewProxy.IsInPanelInteract = !0, this.ViewProxy.SetIsMainInVisible(!1, this.RootItem)
  }
  OnAfterHide() {
    this.GetItem(3).SetUIActive(!0), this.ViewProxy.HideCardTips(), this.ViewProxy.SetCaptionItemActive(!0), this.ViewProxy.UnRegisterCantDragReason(2), this.ViewProxy.SetIsMainInVisible(!0, this.RootItem), this.ViewProxy.IsInPanelInteract = !1
  }
  qD1(i, t) {
    i = this.Scroll.GetScrollItemByKey(i);
    i && i.SetSelectState(t)
  }
  mGe() {
    this.GetText(0).SetText(this.SelectedIdSet.size + "/" + this.Data.LimitCount)
  }
  N21() {
    this.GetButton(5).SetSelfInteractive(this.SelectedIdSet.size >= this.Data.LimitCount)
  }
  jt_(i) {
    i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandCardDataByCardId(i);
    this.ViewProxy.ShowCardTips(i)
  }
  RegisterViewProxy(i) {
    this.ViewProxy = i
  }
  SetDiscardCardData(i) {
    this.Data = i
  }
}
exports.PhantomArenaDiscardCardPanel = PhantomArenaDiscardCardPanel;
//# sourceMappingURL=PhantomArenaDiscardCardPanel.js.map