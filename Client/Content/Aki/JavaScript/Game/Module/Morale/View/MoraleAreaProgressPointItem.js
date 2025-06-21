"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleAreaProgressPointItem = void 0;
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class MoraleAreaProgressPointItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.ItemData = void 0, this.ClickCallBack = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem]
    ]
  }
  Refresh(r) {
    this.ItemData = r, this.SetUiProgressByScore(r.StartScore)
  }
  Neu(r) {
    this.GetItem(0)?.SetUIActive(r)
  }
  SetUiProgressByScore(r) {
    r = r >= this.ItemData.TargetScore;
    this.Neu(r)
  }
}
exports.MoraleAreaProgressPointItem = MoraleAreaProgressPointItem;
//# sourceMappingURL=MoraleAreaProgressPointItem.js.map