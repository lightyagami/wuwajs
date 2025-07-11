"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerBuffItem = undefined;
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class ShipTowerBuffItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.BuffData = undefined;
    this.OnItemClickCallback = undefined;
    this.GetStageIdCallback = undefined;
    this.pZ_ = undefined;
  }
  OnRefresh(e) {
    this.BuffData = e;
    this.UpdateBuffInfo();
    this.UpdateBuffSelected();
    if (e.IsSelected) {
      this.OnExtendToggleStateChanged(1);
    }
  }
  UpdateBuffInfo() {
    var e = this.BuffData;
    var t = this.GetStageIdCallback?.();
    var t = {
      Type: 4,
      ItemConfigId: e.ItemId,
      IsLockVisible: !e.IsUnlock,
      IsDisable: !e.IsCanUse(t),
      Level: e.CanUseCountStr(t),
      BottomTextId: e.ItemNameKey,
      IsNewVisible: e.IsFirstGet(),
      Data: e
    };
    this.Apply(t);
  }
  OnForceSelected() {
    this.SetSelected(true, true);
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
  OnBeforeDestroy() {
    this.BuffData?.ClearSelected();
  }
  OnExtendToggleStateChanged(e) {
    this.BuffData?.SetSelected(true);
    this.ScrollViewDelegate?.SelectGridProxy(this.GridIndex, this.DisplayIndex, false);
    this.OnItemClickCallback?.(this.BuffData);
  }
  OnCanExecuteChange() {
    return !this.BuffData?.IsSelected;
  }
  UpdateBuffState() {
    this.UpdateBuffInfo();
  }
  UpdateBuffSelected() {
    if (this.BuffData?.IsSelected !== this.pZ_) {
      this.SetSelected(!!this.BuffData?.IsSelected, true);
      this.pZ_ = this.BuffData?.IsSelected;
    }
  }
}
exports.ShipTowerBuffItem = ShipTowerBuffItem;
//# sourceMappingURL=ShipTowerBuffItem.js.map