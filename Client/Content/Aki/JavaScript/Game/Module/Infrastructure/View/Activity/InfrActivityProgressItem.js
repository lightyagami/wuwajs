"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrActivityProgressItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class InfrActivityProgressItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  Refresh(r) {
    this.GetItem(0).SetUIActive(r[0]);
    this.GetItem(1).SetUIActive(r[1]);
  }
}
exports.InfrActivityProgressItem = InfrActivityProgressItem;
//# sourceMappingURL=InfrActivityProgressItem.js.map