"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssItemMediumItemGrid = exports.DangoAbyssItemPropMediumItemGrid = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const SelectablePropMediumItemGrid_1 = require("../../../Common/PropItem/SelectablePropItem/SelectablePropMediumItemGrid");
class DangoAbyssItemPropMediumItemGrid extends SelectablePropMediumItemGrid_1.SelectablePropMediumItemGrid {
  constructor() {
    super(...arguments);
    this.StateForEquip = true;
  }
  RefreshUi(e) {
    var o;
    var i = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(e.IncId);
    var t = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityByPluginItemId(e.ItemId);
    if (i && t) {
      t = i.GetConfig();
      o = {
        DangoConfigId: i.GetRoleId()
      };
      t = {
        Type: 4,
        Data: e,
        ItemConfigId: e.ItemId,
        BottomTextId: t.Name,
        IsLockVisible: i.GetIsLock(),
        DangoRoleHeadInfo: o,
        IsDisable: !this.StateForEquip && !i.GetCanRecovery()
      };
      if (this.StateForEquip) {
        this.SetReduceButton(undefined);
      } else {
        o = {
          IsVisible: e.SelectedCount > 0,
          LongPressConfigId: 1
        };
        t.ReduceButtonInfo = o;
      }
      this.Apply(t);
    }
  }
  OnSelected(e) {
    if (e) {
      this.SetSelected(true, true);
      if (this.StateForEquip) {
        this.SetReduceButton(undefined);
      } else {
        this.SetReduceButton({
          IsVisible: true,
          LongPressConfigId: 1
        });
      }
    }
  }
}
exports.DangoAbyssItemPropMediumItemGrid = DangoAbyssItemPropMediumItemGrid;
class DangoAbyssItemMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, o, i) {
    var t;
    var s = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityByPluginItemId(e.GetConfigId());
    if (e && s) {
      s = e.GetConfig();
      t = {
        DangoConfigId: e.GetRoleId()
      };
      s = {
        Type: 4,
        Data: e,
        ItemConfigId: e.GetConfigId(),
        BottomTextId: s.Name,
        IsLockVisible: e.GetIsLock(),
        DangoRoleHeadInfo: t
      };
      this.SetReduceButton(undefined);
      this.Apply(s);
      this.SetSelected(o);
    }
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
}
exports.DangoAbyssItemMediumItemGrid = DangoAbyssItemMediumItemGrid;
//# sourceMappingURL=DangoAbyssItemMediumItemGrid.js.map