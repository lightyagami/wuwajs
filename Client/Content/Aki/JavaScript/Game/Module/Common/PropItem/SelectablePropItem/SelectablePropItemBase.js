"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectablePropItemBase = undefined;
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const SelectablePropTypeItemVariantSelect_1 = require("./SelectablePropTypeItemVariantSelect");
const SelectablePropTypeOne_1 = require("./SelectablePropTypeOne");
class SelectablePropItemBase extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e = 1) {
    super();
    this.PropData = undefined;
    this.OnToggleClick = e => {};
    this.XBt = undefined;
    this.ComponentType = e;
  }
  OnRegisterComponent() {
    if (this.ComponentType === 0) {
      this.XBt = new SelectablePropTypeOne_1.SelectablePropTypeOne(this.RootItem);
    } else if (this.ComponentType === 1) {
      this.XBt = new SelectablePropTypeItemVariantSelect_1.SelectablePropTypeItemVariantSelect(this.RootItem);
    }
    this.XBt.SetToggleClick(this.OnToggleClick);
  }
  GetSelectItem() {
    return this.XBt.GetSelectItem();
  }
  GetReduceButton() {
    return this.XBt.GetReduceButton();
  }
  GetControlItem() {
    return this.XBt.GetControlItem();
  }
  GetFinishSelectItem() {
    return this.XBt.GetFinishSelectItem();
  }
  GetSelectNumberText() {
    return this.XBt.GetSelectNumberText();
  }
  GetSelectableToggle() {
    return this.XBt.GetSelectableToggle();
  }
  SetRoleIconState() {
    this.XBt.SetRoleIconState();
  }
  ShowDefaultDownText() {
    if (this.XBt instanceof SelectablePropTypeItemVariantSelect_1.SelectablePropTypeItemVariantSelect) {
      this.XBt.ShowDefaultDownText();
    }
  }
  RefreshRightDownLockSprite(e) {
    if (this.XBt instanceof SelectablePropTypeItemVariantSelect_1.SelectablePropTypeItemVariantSelect) {
      this.XBt.RefreshRightDownLockSprite(e);
    }
  }
  Refresh(e, t, r) {
    this.PropData = e;
    this.XBt.Refresh(e, t, r);
    this.OnRefresh(t, r);
  }
  OnRefresh(e, t) {}
  Clear() {}
}
exports.SelectablePropItemBase = SelectablePropItemBase;
//# sourceMappingURL=SelectablePropItemBase.js.map