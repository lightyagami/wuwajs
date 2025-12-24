"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrMaterialsDeliveryEffectItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class InfrMaterialsDeliveryEffectItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  Refresh(e, r, t) {
    this.GetText(0).SetText(e);
  }
}
exports.InfrMaterialsDeliveryEffectItem = InfrMaterialsDeliveryEffectItem;
//# sourceMappingURL=InfrMaterialsDeliveryEffectItem.js.map