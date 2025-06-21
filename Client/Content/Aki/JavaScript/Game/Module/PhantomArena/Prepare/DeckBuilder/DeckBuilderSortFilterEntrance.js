"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DeckBuilderSortFilterEntrance = void 0;
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  DynamicMaskButton_1 = require("../../../DynamicMask/DynamicMaskButton"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  DeckBuilderSortFilterItem_1 = require("./DeckBuilderSortFilterItem");
class DeckBuilderSortFilterEntrance extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(), this.ypt = void 0, this.qUt = void 0, this.lLt = void 0, this.IsFilterOrSort = !0, this.pUt = !0, this.RNo = -1, this.OnResultCallBack = void 0, this.NUt = () => {
      var t = this.GetScrollViewWithScrollbar(3).RootUIComp.bIsUIActive;
      this.OUt(!t)
    }, this.sGe = () => {
      var t = new DeckBuilderSortFilterItem_1.DeckBuilderSortFilterItem;
      return t.OnToggleSelect = this.Bco, t
    }, this.Bco = t => {
      this.SelectItemByIndex(t, !0)
    }, this.rV1 = t => {
      this.ChangeSortAscending(1 === t, !1, !0)
    }, this.FUt = () => {
      this.GetExtendToggle(0).SetToggleState(0, !0)
    }, this.IsFilterOrSort = t
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [3, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIExtendToggle],
      [4, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.NUt],
      [2, this.rV1]
    ]
  }
  async OnBeforeStartAsync() {
    var t = this.GetExtendToggle(2);
    this.pUt = !1, t.SetToggleState(0), t.RootUIComp.SetUIActive(!this.IsFilterOrSort), this.qUt = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.sGe, this.GetItem(4).GetOwner()), this.lLt = new DynamicMaskButton_1.DynamicMaskButton, this.lLt.SetButtonFunction(this.FUt), await this.lLt.Init()
  }
  UpdateDataList(t) {
    this.ypt = t, this.qUt?.RefreshByData(this.ypt)
  }
  SelectItemByIndex(t, i) {
    var s;
    this.ypt && 0 !== this.ypt.length && this.ypt[t] && (this.RNo = t, s = this.ypt[t], this.OUt(!1), this.qUt?.SelectGridProxy(t), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.Name), i) && this.OnResultCallBack?.(s.ConfigId, this.pUt)
  }
  OUt(t) {
    this.qUt.SetActive(t), t ? this.MLt() : this.TLt()
  }
  MLt() {
    this.lLt.SetAttachChildItem(this.RootItem), this.lLt.SetActive(!0)
  }
  TLt() {
    this.lLt.ResetItemParent(), this.lLt.SetActive(!1)
  }
  ChangeSortAscending(t, i, s) {
    this.pUt = t, i && this.GetExtendToggle(2).SetToggleState(t ? 1 : 0), s && this.ypt && 0 !== this.ypt.length && (i = this.ypt[this.RNo]) && this.OnResultCallBack?.(i.ConfigId, this.pUt)
  }
  OnBeforeDestroy() {
    this.lLt?.Destroy()
  }
}
exports.DeckBuilderSortFilterEntrance = DeckBuilderSortFilterEntrance;
//# sourceMappingURL=DeckBuilderSortFilterEntrance.js.map