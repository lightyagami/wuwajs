"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsIconBulletScreenItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class RacingBetsIconBulletScreenItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.Y01 = undefined;
    this.xkc = () => {
      if (this.Y01) {
        this.Y01(this.Pe);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UITexture], [0, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.xkc]];
  }
  Refresh(t) {
    this.Pe = t;
    this.SetTextureShowUntilLoaded(t.Icon, this.GetTexture(1));
  }
  BindClickBulletScreenCallBack(t) {
    this.Y01 = t;
  }
}
exports.RacingBetsIconBulletScreenItem = RacingBetsIconBulletScreenItem;
//# sourceMappingURL=RacingBetsIconBulletScreenItem.js.map