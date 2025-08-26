"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseLevelStarItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class TrapDefenseLevelStarItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ItemData = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  Refresh(e) {
    this.ItemData = e;
    this.GetItem(0)?.SetUIActive(e);
  }
}
exports.TrapDefenseLevelStarItem = TrapDefenseLevelStarItem;
//# sourceMappingURL=TrapDefenseLevelStarItem.js.map