"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvanceNoticeSuitItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class AdvanceNoticeSuitItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture]];
  }
  Refresh(e, t, r) {
    this.SetTextureByPath(e, this.GetTexture(1));
  }
}
exports.AdvanceNoticeSuitItem = AdvanceNoticeSuitItem;
//# sourceMappingURL=AdvanceNoticeSuitItem.js.map