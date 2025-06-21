"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaChooseCardPanel = void 0;
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  PhantomArenaChooseCardItem_1 = require("./PhantomArenaChooseCardItem");
class PhantomArenaChooseCardPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.ViewProxy = void 0, this.SelectedIdSet = new Set, this.LimitCount = 0, this.Layout = void 0, this.CurrentSelectId = -1, this.ConfirmFunc = void 0, this.sGe = () => {
      var t = new PhantomArenaChooseCardItem_1.PhantomArenaChooseCardItem;
      return t.ClickCallback = this.mi1, t
    }, this.F21 = t => {
      t = 1 !== t;
      this.ViewProxy.SetIsMainInVisible(!t, this.RootItem), this.ViewProxy.HideCardTips(), this.GetItem(2).SetUIActive(t)
    }, this.tWt = () => {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleCardSelect(Array.from(this.SelectedIdSet)).then(t => {
        t && (this.ConfirmFunc?.(), this.ConfirmFunc = void 0, this.SetActive(!1))
      })
    }, this.C31 = () => {
      this.OD1()
    }, this.mi1 = (t, i) => {
      if (this.qD1(t.CardId), i && this.SelectedIdSet.size >= this.LimitCount) {
        if (1 < this.LimitCount) return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1079");
        this.p31()
      }
      this.v31(t.CardId, i), this.N21(), this.mGe()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILayoutBase],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIExtendToggle],
      [5, UE.UIButtonComponent],
      [6, UE.UIText]
    ], this.BtnBindInfo = [
      [3, this.tWt],
      [4, this.F21],
      [5, this.C31]
    ]
  }
  OnStart() {
    this.Layout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(0), this.sGe, this.GetItem(1).GetOwner())
  }
  async OnBeforeShowAsyncImplement() {
    this.ViewProxy.RegisterCantDragReason(1), this.SelectedIdSet.clear(), this.CurrentSelectId = -1;
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.SelectCardData.GetSelectCardDataList();
    await this.Layout.RefreshByDataAsync(t), this.LimitCount = ModelManager_1.ModelManager.PhantomArenaBattleModel.SelectCardData.SelectNum, this.N21(), this.mGe(), this.ViewProxy.HideCardTips(), this.ViewProxy.SetCaptionItemActive(!1), this.ViewProxy.IsInPanelInteract = !0, this.ViewProxy.SetIsMainInVisible(!1, this.RootItem)
  }
  OnAfterHide() {
    this.GetItem(2).SetUIActive(!0), this.ViewProxy.HideCardTips(), this.ViewProxy.SetCaptionItemActive(!0), this.ViewProxy.UnRegisterCantDragReason(1), this.ViewProxy.SetIsMainInVisible(!0, this.RootItem), this.ViewProxy.IsInPanelInteract = !1
  }
  v31(t, i) {
    var e = this.Layout.GetLayoutItemByKey(t);
    e && e.SetChooseState(i), i ? this.SelectedIdSet.add(t) : this.SelectedIdSet.delete(t)
  }
  p31() {
    var t;
    this.SelectedIdSet.size <= 0 || (t = this.SelectedIdSet.values().next().value) && (this.v31(t, !1), this.KBt(t))
  }
  qD1(t) {
    var i;
    this.CurrentSelectId !== t && (-1 !== this.CurrentSelectId && this.Layout.GetLayoutItemByKey(this.CurrentSelectId)?.SetSelectState(!1), (i = this.Layout.GetLayoutItemByKey(t)) && (i.SetSelectState(!0), this.ViewProxy.ShowCardTips(i.Card.Data)), this.CurrentSelectId = t)
  }
  OD1() {
    -1 !== this.CurrentSelectId && (this.Layout.GetLayoutItemByKey(this.CurrentSelectId)?.SetSelectState(!1), this.CurrentSelectId = -1, this.ViewProxy.HideCardTips())
  }
  KBt(t) {
    this.Layout.GetLayoutItemByKey(t)?.Card.SetToggleState(0, !1)
  }
  N21() {
    this.GetButton(3).SetSelfInteractive(this.SelectedIdSet.size >= this.LimitCount)
  }
  mGe() {
    var t = this.GetText(6);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, "PhantomBattle_1124", this.SelectedIdSet.size, this.LimitCount)
  }
  RegisterViewProxy(t) {
    this.ViewProxy = t
  }
}
exports.PhantomArenaChooseCardPanel = PhantomArenaChooseCardPanel;
//# sourceMappingURL=PhantomArenaChooseCardPanel.js.map