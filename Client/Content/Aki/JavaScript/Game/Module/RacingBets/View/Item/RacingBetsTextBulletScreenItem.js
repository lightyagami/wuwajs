"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsTextBulletScreenItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager");
class RacingBetsTextBulletScreenItem extends GridProxyAbstract_1.GridProxyAbstract {
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
    this.ComponentRegisterInfos = [[1, UE.UITexture], [2, UE.UIText], [0, UE.UIButtonComponent], [3, UE.UISprite]];
    this.BtnBindInfo = [[0, this.xkc]];
  }
  Refresh(t) {
    this.Pe = t;
    this.GetText(2).ShowTextNew(t.Name);
    if (t.Type === 2) {
      this.GetTexture(1).SetUIActive(true);
      t = DangoManager_1.DangoManager.GetDangoData(t.DangoId);
      this.SetTextureShowUntilLoaded(t.DangoConfig.IconSmall, this.GetTexture(1));
      this.GetSprite(3).SetUIActive(false);
    } else {
      this.GetTexture(1).SetUIActive(false);
      this.GetSprite(3).SetUIActive(true);
    }
  }
  BindClickBulletScreenCallBack(t) {
    this.Y01 = t;
  }
}
exports.RacingBetsTextBulletScreenItem = RacingBetsTextBulletScreenItem;
//# sourceMappingURL=RacingBetsTextBulletScreenItem.js.map