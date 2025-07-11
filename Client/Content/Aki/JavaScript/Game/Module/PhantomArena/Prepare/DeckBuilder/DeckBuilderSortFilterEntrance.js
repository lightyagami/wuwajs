"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckBuilderSortFilterEntrance = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const DynamicMaskButton_1 = require("../../../DynamicMask/DynamicMaskButton");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const DeckBuilderSortFilterItem_1 = require("./DeckBuilderSortFilterItem");
class DeckBuilderSortFilterEntrance extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.ypt = undefined;
    this.qUt = undefined;
    this.lLt = undefined;
    this.IsFilterOrSort = true;
    this.pUt = true;
    this.RNo = -1;
    this.OnResultCallBack = undefined;
    this.NUt = () => {
      var t = this.GetScrollViewWithScrollbar(3).RootUIComp.bIsUIActive;
      this.OUt(!t);
    };
    this.sGe = () => {
      var t = new DeckBuilderSortFilterItem_1.DeckBuilderSortFilterItem();
      t.OnToggleSelect = this.Bco;
      return t;
    };
    this.Bco = t => {
      this.SelectItemByIndex(t, true);
    };
    this.UV1 = t => {
      this.ChangeSortAscending(t === 1, false, true);
    };
    this.FUt = () => {
      this.GetExtendToggle(0).SetToggleState(0, true);
    };
    this.IsFilterOrSort = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [3, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIExtendToggle], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.NUt], [2, this.UV1]];
  }
  async OnBeforeStartAsync() {
    var t = this.GetExtendToggle(2);
    this.pUt = false;
    t.SetToggleState(0);
    t.RootUIComp.SetUIActive(!this.IsFilterOrSort);
    this.qUt = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.sGe, this.GetItem(4).GetOwner());
    this.lLt = new DynamicMaskButton_1.DynamicMaskButton();
    this.lLt.SetButtonFunction(this.FUt);
    await this.lLt.Init();
  }
  UpdateDataList(t) {
    this.ypt = t;
    this.qUt?.RefreshByData(this.ypt);
  }
  SelectItemByIndex(t, i) {
    var s;
    if (this.ypt && this.ypt.length !== 0 && this.ypt[t] && (this.RNo = t, s = this.ypt[t], this.OUt(false), this.qUt?.SelectGridProxy(t), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.Name), i)) {
      this.OnResultCallBack?.(s.ConfigId, this.pUt);
    }
  }
  OUt(t) {
    this.qUt.SetActive(t);
    if (t) {
      this.MLt();
    } else {
      this.TLt();
    }
  }
  MLt() {
    this.lLt.SetAttachChildItem(this.RootItem);
    this.lLt.SetActive(true);
  }
  TLt() {
    this.lLt.ResetItemParent();
    this.lLt.SetActive(false);
  }
  ChangeSortAscending(t, i, s) {
    this.pUt = t;
    if (i) {
      this.GetExtendToggle(2).SetToggleState(t ? 1 : 0);
    }
    if (s && this.ypt && this.ypt.length !== 0 && (i = this.ypt[this.RNo])) {
      this.OnResultCallBack?.(i.ConfigId, this.pUt);
    }
  }
  OnBeforeDestroy() {
    this.lLt?.Destroy();
  }
}
exports.DeckBuilderSortFilterEntrance = DeckBuilderSortFilterEntrance;
//# sourceMappingURL=DeckBuilderSortFilterEntrance.js.map