"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BabelTowerSettlementDeTermItem = void 0;
const UE = require("ue"),
  BabelTowerDeTermById_1 = require("../../../../../../Core/Define/ConfigQuery/BabelTowerDeTermById"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
class BabelTowerSettlementDeTermItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.evc = 0, this.YP = () => {
      var e = {
        IsDeTerm: !0,
        ConfigId: this.evc,
        ShowWays: !1
      };
      UiManager_1.UiManager.OpenView("BabelTowerItemInfoView", e)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [3, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [3, this.YP]
    ]
  }
  Refresh(e, r, t) {
    this.evc = e;
    e = BabelTowerDeTermById_1.configBabelTowerDeTermById.GetConfig(e);
    this.SetTextureByPath(e.Texture, this.GetTexture(0))
  }
}
exports.BabelTowerSettlementDeTermItem = BabelTowerSettlementDeTermItem;
//# sourceMappingURL=BabelTowerSettlementDeTermItem.js.map