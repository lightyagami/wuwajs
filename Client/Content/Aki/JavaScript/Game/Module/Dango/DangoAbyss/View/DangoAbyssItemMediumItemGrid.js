"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoAbyssItemMediumItemGrid = exports.DangoAbyssItemPropMediumItemGrid = void 0;
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
  SelectablePropMediumItemGrid_1 = require("../../../Common/PropItem/SelectablePropItem/SelectablePropMediumItemGrid");
class DangoAbyssItemPropMediumItemGrid extends SelectablePropMediumItemGrid_1.SelectablePropMediumItemGrid {
  constructor() {
    super(...arguments), this.StateForEquip = !0
  }
  RefreshUi(e) {
    var o, i = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(e.IncId),
      t = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityByPluginItemId(e.ItemId);
    i && t && (t = i.GetConfig(), o = {
      DangoConfigId: i.GetRoleId()
    }, t = {
      Type: 4,
      Data: e,
      ItemConfigId: e.ItemId,
      BottomTextId: t.Name,
      IsLockVisible: i.GetIsLock(),
      DangoRoleHeadInfo: o,
      IsDisable: !this.StateForEquip && !i.GetCanRecovery()
    }, this.StateForEquip ? this.SetReduceButton(void 0) : (o = {
      IsVisible: 0 < e.SelectedCount,
      LongPressConfigId: 1
    }, t.ReduceButtonInfo = o), this.Apply(t))
  }
  OnSelected(e) {
    e && (this.SetSelected(!0, !0), this.StateForEquip ? this.SetReduceButton(void 0) : this.SetReduceButton({
      IsVisible: !0,
      LongPressConfigId: 1
    }))
  }
}
exports.DangoAbyssItemPropMediumItemGrid = DangoAbyssItemPropMediumItemGrid;
class DangoAbyssItemMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, o, i) {
    var t, s = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityByPluginItemId(e.GetConfigId());
    e && s && (s = e.GetConfig(), t = {
      DangoConfigId: e.GetRoleId()
    }, s = {
      Type: 4,
      Data: e,
      ItemConfigId: e.GetConfigId(),
      BottomTextId: s.Name,
      IsLockVisible: e.GetIsLock(),
      DangoRoleHeadInfo: t
    }, this.SetReduceButton(void 0), this.Apply(s), this.SetSelected(o))
  }
  OnSelected(e) {
    this.SetSelected(!0)
  }
  OnDeselected(e) {
    this.SetSelected(!1)
  }
}
exports.DangoAbyssItemMediumItemGrid = DangoAbyssItemMediumItemGrid;
//# sourceMappingURL=DangoAbyssItemMediumItemGrid.js.map