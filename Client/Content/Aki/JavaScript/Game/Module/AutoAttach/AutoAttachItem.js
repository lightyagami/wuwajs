"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoAttachItem = undefined;
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class AutoAttachItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.CurrentShowItemIndex = 0;
    this.DKe = 0;
    this.RKe = 0;
    this.SelectState = false;
    this.UKe = false;
    this.AKe = false;
    this.SourceView = undefined;
    this.CurrentMoveDirection = undefined;
    this.AllData = undefined;
    this.DragState = false;
    if (t) {
      this.CreateThenShowByActor(t);
    }
  }
  SetData(t) {
    this.AllData = t;
  }
  SetIfNeedShowFakeItem(t) {
    this.AKe = t;
  }
  SetSourceView(t) {
    this.SourceView = t;
    this.CurrentMoveDirection = this.SourceView.GetCurrentMoveDirection();
  }
  SetItemIndex(t) {
    this.DKe = t;
  }
  GetItemIndex() {
    return this.DKe;
  }
  InitItem() {
    this.RKe = this.SourceView.GetDataLength();
    if (this.DKe < this.RKe) {
      this.CurrentShowItemIndex = this.DKe;
    } else {
      this.CurrentShowItemIndex = this.DKe - this.SourceView.GetShowItemNum();
    }
    this.PKe();
  }
  PKe() {
    this.xKe();
    if (this.SourceView) {
      var i = Math.floor(this.SourceView.GetShowItemNum() / 2);
      var s = this.SourceView.GetItemSize();
      var h = this.SourceView.GetGap();
      let t = 0;
      t = this.SourceView.GetIfCircle() || this.CurrentMoveDirection === 0 ? (this.DKe - i) * (s + h) : (i - this.DKe) * (s + h);
      this.MoveItem(t);
    }
  }
  xKe() {
    this.RootItem.SetAnchorOffsetX(0);
    this.RootItem.SetAnchorOffsetY(0);
  }
  MoveItem(t) {
    var i = this.CurrentShowItemIndex;
    var t = this.wKe(t);
    this.CurrentShowItemIndex = t[1];
    if (this.CurrentMoveDirection === 0) {
      this.RootItem.SetAnchorOffsetX(t[0]);
    } else {
      this.RootItem.SetAnchorOffsetY(t[0]);
    }
    if (!this.SourceView.GetIfCircle() && !this.UKe) {
      t = this.CurrentShowItemIndex >= 0 && this.CurrentShowItemIndex < this.RKe || this.AKe;
      this.RootItem.SetUIActive(t);
    }
    if (i !== this.CurrentShowItemIndex) {
      this.RefreshItem();
    }
    this.OnMoveItem();
  }
  GetCurrentMovePercentage() {
    var t = this.SourceView.GetViewSize();
    return (this.GetCurrentPosition() + t / 2) / t;
  }
  wKe(t) {
    t = this.GetCurrentPosition() + t;
    if (this.SourceView.GetIfCircle()) {
      return this.BKe(t);
    } else {
      return this.bKe(t);
    }
  }
  BKe(t) {
    let i = t;
    let s = this.CurrentShowItemIndex;
    var h = this.SourceView.GetItemSize();
    var e = this.SourceView.GetGap();
    var r = this.SourceView.GetShowItemNum();
    if (this.qKe(i)) {
      if (!this.GKe(i)) {
        while (!this.GKe(i)) {
          i += (h + e) * Math.ceil(r + 1);
          s += r + 1;
        }
        while (s >= this.RKe) {
          s -= this.RKe;
        }
      }
    } else {
      while (!this.qKe(i)) {
        i -= (h + e) * Math.ceil(r + 1);
        s -= r + 1;
      }
      while (s < 0) {
        s = this.RKe + s;
      }
    }
    return [i, s];
  }
  bKe(t) {
    let i = t;
    let s = this.CurrentShowItemIndex;
    var h = this.SourceView.GetItemSize();
    var e = this.SourceView.GetGap();
    var r = this.SourceView.GetShowItemNum();
    if (this.qKe(i)) {
      if (!this.GKe(i)) {
        while (!this.GKe(i)) {
          i += (h + e) * Math.ceil(r + 1);
          if (this.CurrentMoveDirection === 0) {
            s += r + 1;
          } else {
            s -= r + 1;
          }
        }
      }
    } else {
      while (!this.qKe(i)) {
        i -= (h + e) * Math.ceil(r + 1);
        if (this.CurrentMoveDirection === 0) {
          s -= r + 1;
        } else {
          s += r + 1;
        }
      }
    }
    return [i, s];
  }
  GetCurrentShowItemIndex() {
    return this.CurrentShowItemIndex;
  }
  GetCurrentSelectedState() {
    return this.SourceView.GetCurrentSelectIndex() === this.GetCurrentShowItemIndex();
  }
  GetSelectedState() {
    return this.SelectState;
  }
  Select() {
    if (!this.SelectState) {
      this.SelectState = true;
      this.OnSelect();
    }
  }
  OnControllerDragStart() {
    this.DragState = true;
  }
  OnControllerDragEnd() {
    this.DragState = false;
  }
  ForceUnSelectItem() {
    this.SelectState = false;
    this.OnUnSelect();
  }
  GetCurrentPosition() {
    if (this.CurrentMoveDirection === 0) {
      return this.RootItem.GetAnchorOffsetX();
    } else {
      return this.RootItem.GetAnchorOffsetY();
    }
  }
  RefreshItem() {
    var t = this.AllData[this.CurrentShowItemIndex];
    if (this.UKe || t !== undefined) {
      this.OnRefreshItem(t);
    } else if (this.AKe) {
      this.OnRefreshItem(undefined);
    }
  }
  qKe(t) {
    var i = this.SourceView.GetItemSize();
    var s = this.SourceView.GetGap();
    var h = this.SourceView.GetShowItemNum();
    return !((i + s) * Math.ceil((h + 1) / 2) < t);
  }
  GKe(t) {
    var i = this.SourceView.GetItemSize();
    var s = this.SourceView.GetGap();
    var h = this.SourceView.GetShowItemNum();
    return !(t < -(i + s) * Math.ceil(h / 2));
  }
}
exports.AutoAttachItem = AutoAttachItem;
//# sourceMappingURL=AutoAttachItem.js.map