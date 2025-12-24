"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTechTreeLevelItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class MotorcycleTechTreeLevelItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  Refresh(e, r, t) {
    e = e.TargetLevel <= e.CurLevel;
    this.GetSprite(0).SetUIActive(e);
  }
}
exports.MotorcycleTechTreeLevelItem = MotorcycleTechTreeLevelItem;
//# sourceMappingURL=MotorcycleTechTreeLevelItem.js.map