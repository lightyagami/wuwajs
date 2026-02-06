"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurniturePresetGridItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FurniturePresetGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem]];
  }
  Refresh(t) {
    this.Pe = t;
    this.$eg();
    this.RefreshDetail();
  }
  $eg() {
    var t = this.Pe?.IsLock ?? false;
    var e = this.Pe?.IsFinished ?? false;
    this.GetItem(1)?.SetUIActive(t);
    this.GetItem(2)?.SetUIActive(e);
  }
  RefreshDetail() {
    var t = this.Pe?.FurnitureConfig?.Name ?? "";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t);
  }
}
exports.FurniturePresetGridItem = FurniturePresetGridItem;
//# sourceMappingURL=FurniturePresetGridItem.js.map