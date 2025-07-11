"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyRoundBuffShowItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class DangoMonopolyRoundBuffShowItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  Refresh(o) {
    this.fGt = o;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "DangoRoundBuffShowItem", ["", this.fGt]);
    }
    this.SetTextureByPath(this.fGt.DangoIcon, this.GetTexture(1));
    this.GetText(2).ShowTextNew(this.fGt.DangoName);
    this.GetText(3).ShowTextNew(this.fGt.PropertyDesc);
  }
}
exports.DangoMonopolyRoundBuffShowItem = DangoMonopolyRoundBuffShowItem;
//# sourceMappingURL=DangoMonopolyRoundBuffShowItem.js.map