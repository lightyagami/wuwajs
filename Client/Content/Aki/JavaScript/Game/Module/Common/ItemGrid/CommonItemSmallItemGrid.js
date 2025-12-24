"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonItemSmallItemGrid = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const LoopScrollSmallItemGrid_1 = require("../SmallItemGrid/LoopScrollSmallItemGrid");
class CommonItemSmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.ConfigId = 0;
    this.thl = true;
    this.ShowReceivedCallBack = undefined;
  }
  OnRefresh(e, t, i) {
    this.Refresh(e);
  }
  Refresh(e) {
    var t = e[0];
    var i = e[1];
    this.ConfigId = t.ItemId;
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(this.ConfigId);
    if (t === 1) {
      var o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.ConfigId);
      const s = {
        Data: e,
        ElementId: o.ElementId,
        Type: 2,
        ItemConfigId: this.ConfigId,
        BottomText: i > 0 ? "" + i : "",
        QualityId: o.QualityId,
        IsReceivedVisible: this.ShowReceivedCallBack?.(e)
      };
      this.Apply(s);
    } else if (t === 3) {
      const s = {
        Data: e,
        Type: 3,
        ItemConfigId: this.ConfigId,
        BottomText: i > 0 ? "" + i : "",
        IsReceivedVisible: this.ShowReceivedCallBack?.(e)
      };
      this.Apply(s);
    } else {
      const s = {
        Data: e,
        Type: 4,
        ItemConfigId: this.ConfigId,
        BottomText: i > 0 ? "" + i : "",
        IsReceivedVisible: this.ShowReceivedCallBack?.(e)
      };
      this.Apply(s);
    }
  }
  RefreshByConfigId(e, t, i, o = false) {
    this.ConfigId = e;
    e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(this.ConfigId);
    if (e === 1) {
      var s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.ConfigId);
      const l = {
        Data: i,
        Type: 2,
        ItemConfigId: this.ConfigId,
        BottomText: t && t > 0 ? "" + t : "",
        QualityId: s.QualityId,
        IsReceivedVisible: o
      };
      this.Apply(l);
    } else if (e === 3) {
      const l = {
        Data: i,
        Type: 3,
        BottomText: t && t > 0 ? "" + t : "",
        ItemConfigId: this.ConfigId
      };
      this.Apply(l);
    } else {
      const l = {
        Data: i,
        Type: 4,
        ItemConfigId: this.ConfigId,
        BottomText: t && t > 0 ? "" + t : "",
        IsReceivedVisible: o
      };
      this.Apply(l);
    }
  }
  OnCanExecuteChange() {
    return false;
  }
  SetAllowClickBack(e) {
    this.thl = e;
  }
  OnExtendToggleClicked() {
    if (this.thl) {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.ConfigId);
    }
  }
}
exports.CommonItemSmallItemGrid = CommonItemSmallItemGrid;
//# sourceMappingURL=CommonItemSmallItemGrid.js.map