"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.GymStarItem = void 0;
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class GymStarItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite]
    ]
  }
  Refresh(e, t, r) {
    this.GetSprite(0).SetUIActive(!0), this.GetSprite(1).SetUIActive(2 === e.State)
  }
  OnSelected(e) {}
  OnDeselected(e) {}
}
exports.GymStarItem = GymStarItem;
//# sourceMappingURL=PhantomArenaGymStarItem.js.map