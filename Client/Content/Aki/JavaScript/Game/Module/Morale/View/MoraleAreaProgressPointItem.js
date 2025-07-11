"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleAreaProgressPointItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class MoraleAreaProgressPointItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ItemData = undefined;
    this.ClickCallBack = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  Refresh(r) {
    this.ItemData = r;
    this.SetUiProgressByScore(r.StartScore);
  }
  ktu(r) {
    this.GetItem(0)?.SetUIActive(r);
  }
  SetUiProgressByScore(r) {
    r = r >= this.ItemData.TargetScore;
    this.ktu(r);
  }
}
exports.MoraleAreaProgressPointItem = MoraleAreaProgressPointItem;
//# sourceMappingURL=MoraleAreaProgressPointItem.js.map