"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectablePropTypeItemVariantSelect = undefined;
const ItemGridVariantSelect_1 = require("../../ItemGrid/ItemGridVariantSelect");
const SelectablePropComponentBase_1 = require("./SelectablePropComponentBase");
class SelectablePropTypeItemVariantSelect extends SelectablePropComponentBase_1.SelectablePropComponentBase {
  constructor() {
    super(...arguments);
    this.ebt = undefined;
  }
  GetSelectableToggle() {
    return this.ebt.GetClickToggle();
  }
  GetSelectItem() {
    return this.ebt.GetFinishSelectItem();
  }
  GetReduceButton() {
    return this.ebt.GetReduceButton();
  }
  GetControlItem() {
    return this.ebt.GetControlItem();
  }
  GetFinishSelectItem() {}
  GetSelectNumberText() {
    return this.ebt.GetDownText();
  }
  ShowDefaultDownText() {
    this.ebt.ShowDefaultDownText();
  }
  RefreshRightDownLockSprite(e) {
    this.ebt.RefreshRightDownLockSprite(e);
  }
  Refresh(e, t, r) {
    e = [{
      IncId: e.IncId,
      ItemId: e.ItemId
    }, e.Count];
    this.ebt.Refresh(e, t, r);
  }
  SetToggleClick(e) {
    this.ebt.SetToggleClickStateEvent(e);
  }
  SetRoleIconState() {}
  OnStart() {
    this.ebt = new ItemGridVariantSelect_1.ItemGridVariantSelect(this.RootItem.GetOwner());
    this.ebt.GetFinishMiddleItem().SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.ebt.Destroy();
  }
}
exports.SelectablePropTypeItemVariantSelect = SelectablePropTypeItemVariantSelect;
//# sourceMappingURL=SelectablePropTypeItemVariantSelect.js.map