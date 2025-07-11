"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssItemSmallItemGrid = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
class DangoAbyssItemSmallItemGrid extends SmallItemGrid_1.SmallItemGrid {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
  }
  Refresh(e) {
    var t = e.GetConfig();
    var r = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityByPluginItemId(e.GetConfigId());
    if (t && r) {
      r = {
        Type: 4,
        Data: e,
        ItemConfigId: e.GetConfigId(),
        BottomTextId: t.Name,
        IsLockVisible: e.GetIsLock()
      };
      this.Apply(r);
    }
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
}
exports.DangoAbyssItemSmallItemGrid = DangoAbyssItemSmallItemGrid;
//# sourceMappingURL=DangoAbyssItemSmallItemGrid.js.map