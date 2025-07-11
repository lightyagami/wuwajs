"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DarkCoastDeliveryLevelUpItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class DarkCoastDeliveryLevelUpItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  Refresh(e, r, t) {
    e = e.Config.VisionTexture;
    this.SetTextureShowUntilLoaded(e, this.GetTexture(0));
  }
}
exports.DarkCoastDeliveryLevelUpItem = DarkCoastDeliveryLevelUpItem;
//# sourceMappingURL=DarkCoastDeliveryLevelUpItem.js.map