"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FrameItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class FrameItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.LCf = e => {};
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.LCf]];
  }
  Refresh(e, r, t) {}
}
exports.FrameItem = FrameItem;
//# sourceMappingURL=MotorcycleDiyFrameItem.js.map