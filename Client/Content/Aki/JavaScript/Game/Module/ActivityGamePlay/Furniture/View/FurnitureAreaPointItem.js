"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureAreaPointItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class FurnitureAreaPointItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.aui = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle]];
  }
  Refresh(t) {
    this.aui = t;
    this.RefreshItemToggle();
  }
  RefreshItemToggle() {
    this.GetExtendToggle(0).SetToggleState(this.aui ? 1 : 0);
  }
}
exports.FurnitureAreaPointItem = FurnitureAreaPointItem;
//# sourceMappingURL=FurnitureAreaPointItem.js.map