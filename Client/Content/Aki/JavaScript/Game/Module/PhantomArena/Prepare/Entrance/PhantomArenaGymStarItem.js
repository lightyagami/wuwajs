"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GymStarItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class GymStarItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite]];
  }
  Refresh(e, t, r) {
    this.GetSprite(0).SetUIActive(true);
    this.GetSprite(1).SetUIActive(e.State === 2);
  }
  OnSelected(e) {}
  OnDeselected(e) {}
}
exports.GymStarItem = GymStarItem;
//# sourceMappingURL=PhantomArenaGymStarItem.js.map