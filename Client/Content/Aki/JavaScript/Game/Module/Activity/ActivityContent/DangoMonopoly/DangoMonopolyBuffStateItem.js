"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyBuffStateItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class DangoMonopolyBuffStateItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.ClickCallBack = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIText], [5, UE.UITexture]];
  }
  Refresh(t) {
    this.fGt = t;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, this.constructor.name, ["", this.fGt]);
    }
    this.GetItem(0)?.SetUIActive(this.fGt.IsActive);
    this.GetItem(1)?.SetUIActive(!this.fGt.IsActive);
    this.GetSprite(2)?.SetUIActive(this.fGt.IsActive);
    this.GetText(3)?.ShowTextNew(this.fGt.PropertyDesc);
    this.GetText(4)?.ShowTextNew(this.fGt.PropertyDesc);
    this.SetTextureByPath(this.fGt.DangoIcon, this.GetTexture(5));
  }
}
exports.DangoMonopolyBuffStateItem = DangoMonopolyBuffStateItem;
//# sourceMappingURL=DangoMonopolyBuffStateItem.js.map