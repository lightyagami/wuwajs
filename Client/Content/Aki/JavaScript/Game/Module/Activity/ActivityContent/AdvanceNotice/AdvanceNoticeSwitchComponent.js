"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvanceNoticeSwitchComponent = undefined;
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const AdvanceNoticeThumbItem_1 = require("./AdvanceNoticeThumbItem");
class AdvanceNoticeSwitchComponent {
  constructor() {
    this.yil = undefined;
    this.Pfm = undefined;
    this.Afm = undefined;
    this.xfm = undefined;
    this.Bfm = undefined;
    this.kfm = undefined;
    this.kPt = false;
    this.qfm = () => {
      var t = new AdvanceNoticeThumbItem_1.AdvanceNoticeThumbItem();
      t.OnItemToggleClickDelegate = this.Ofm;
      t.CanItemToggleChangeDelegate = this.uym;
      return t;
    };
    this.Ofm = (t, i) => {
      if (this.cym(t.TabId)) {
        this.SelectThumb(i);
      }
    };
    this.uym = (t, i) => this.cym(t.TabId);
  }
  Initialize(t, i, h, s) {
    if (!this.kPt) {
      this.kPt = true;
      this.Pfm = t;
      this.Afm = i;
      this.xfm = h;
      this.Bfm = s;
      this.kfm = new GenericScrollViewNew_1.GenericScrollViewNew(this.xfm, this.qfm, this.Bfm.GetOwner());
    }
  }
  Refresh(t) {
    this.yil = t;
    this.DataCheck();
    this.kfm?.RefreshByData(this.yil.AdvanceNoticeThumbItemDataList);
    this.RefreshContent();
  }
  RefreshContent() {
    this.RefreshContentArrowActive();
  }
  DataCheck() {
    if (this.yil) {
      var i = this.yil.AdvanceNoticeThumbItemDataList;
      for (let t = 0; t < i.length; t++) {
        i[t].IsSelected = t === this.yil.CurrentSubTabIndex;
      }
    }
  }
  cym(t) {
    return t === this.yil.TabId;
  }
  SelectThumb(t) {
    var i;
    if (this.yil && this.CheckIndexInRange(t) && this.yil.CurrentSubTabIndex !== t) {
      if ((i = this.yil.CurrentSubTabIndex) !== -1 && (i = this.kfm?.GetScrollItemByIndex(i))) {
        i.RefreshToggleState(false);
      }
      this.yil.CurrentSubTabIndex = t;
      if (i = this.kfm?.GetScrollItemByIndex(t)) {
        i.RefreshToggleState(true);
        this.kfm?.ScrollTo(i.GetRootItem());
      }
      this.RefreshContent();
      this.yil.OnSwitchSubTab(t);
    }
  }
  SelectPreviousThumb() {
    if (this.yil) {
      this.SelectThumb(this.yil.CurrentSubTabIndex - 1);
    }
  }
  SelectNextThumb() {
    if (this.yil) {
      this.SelectThumb(this.yil.CurrentSubTabIndex + 1);
    }
  }
  CheckIndexInRange(t) {
    return t >= 0 && t < this.yil.AdvanceNoticeThumbItemDataList.length;
  }
  RefreshContentArrowActive() {
    var t;
    if (this.yil) {
      t = this.yil.AdvanceNoticeThumbItemDataList.length;
      this.Pfm.RootUIComp.SetUIActive(this.yil.CurrentSubTabIndex > 0);
      this.Afm.RootUIComp.SetUIActive(this.yil.CurrentSubTabIndex < t - 1);
    }
  }
}
exports.AdvanceNoticeSwitchComponent = AdvanceNoticeSwitchComponent;
//# sourceMappingURL=AdvanceNoticeSwitchComponent.js.map