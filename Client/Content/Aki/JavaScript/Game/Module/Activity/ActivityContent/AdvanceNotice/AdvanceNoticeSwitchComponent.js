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
    this.qym = undefined;
    this.Oym = undefined;
    this.Nym = undefined;
    this.Vym = undefined;
    this.jym = undefined;
    this.kPt = false;
    this.Hym = () => {
      var t = new AdvanceNoticeThumbItem_1.AdvanceNoticeThumbItem();
      t.OnItemToggleClickDelegate = this.$ym;
      t.CanItemToggleChangeDelegate = this.NLm;
      return t;
    };
    this.H0d = () => {
      var t;
      if (this.Nym?.IsValid() && this.yil && (t = this.jym?.GetScrollItemByIndex(this.yil.CurrentSubTabIndex))) {
        this.jym?.LateScrollTo(t.GetRootItem());
      }
    };
    this.$ym = (t, i) => {
      if (this.VLm(t.TabId)) {
        this.SelectThumb(i);
      }
    };
    this.NLm = (t, i) => this.VLm(t.TabId);
  }
  Initialize(t, i, h, s) {
    if (!this.kPt) {
      this.kPt = true;
      this.qym = t;
      this.Oym = i;
      this.Nym = h;
      this.Vym = s;
      this.jym = new GenericScrollViewNew_1.GenericScrollViewNew(this.Nym, this.Hym, this.Vym.GetOwner());
    }
  }
  Refresh(t) {
    this.yil = t;
    this.DataCheck();
    this.jym?.RefreshByData(this.yil.AdvanceNoticeThumbItemDataList, this.H0d);
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
  VLm(t) {
    return t === this.yil.TabId;
  }
  SelectThumb(t) {
    var i;
    if (this.yil && this.CheckIndexInRange(t) && this.yil.CurrentSubTabIndex !== t) {
      if ((i = this.yil.CurrentSubTabIndex) !== -1 && (i = this.jym?.GetScrollItemByIndex(i))) {
        i.RefreshToggleState(false);
      }
      this.yil.CurrentSubTabIndex = t;
      if (i = this.jym?.GetScrollItemByIndex(t)) {
        i.RefreshToggleState(true);
        this.Nym?.ScrollTo(i.GetRootItem(), true);
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
      this.qym.RootUIComp.SetUIActive(this.yil.CurrentSubTabIndex > 0);
      this.Oym.RootUIComp.SetUIActive(this.yil.CurrentSubTabIndex < t - 1);
    }
  }
}
exports.AdvanceNoticeSwitchComponent = AdvanceNoticeSwitchComponent;
//# sourceMappingURL=AdvanceNoticeSwitchComponent.js.map