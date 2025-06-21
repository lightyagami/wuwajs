"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsIconBulletScreenItem = void 0;
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class RacingBetsIconBulletScreenItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Pe = void 0, this.b01 = void 0, this.xkc = () => {
      this.b01 && this.b01(this.Pe)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [1, UE.UITexture],
      [0, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [0, this.xkc]
    ]
  }
  Refresh(t) {
    this.Pe = t, this.SetTextureShowUntilLoaded(t.Icon, this.GetTexture(1))
  }
  BindClickBulletScreenCallBack(t) {
    this.b01 = t
  }
}
exports.RacingBetsIconBulletScreenItem = RacingBetsIconBulletScreenItem;
//# sourceMappingURL=RacingBetsIconBulletScreenItem.js.map