"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleAreaProgressItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class MoraleAreaProgressItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ItemData = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  Refresh(r) {
    this.ItemData = r;
    this.SetUiProgressByScore(r.StartScore);
  }
  pje(r) {
    if (r >= this.ItemData.TargetScore) {
      return 1;
    } else {
      return (r - this.ItemData.LastTargetScore) / (this.ItemData.TargetScore - this.ItemData.LastTargetScore);
    }
  }
  aiu(r) {
    this.GetSprite(0)?.SetFillAmount(r);
  }
  SetUiProgressByScore(r) {
    this.aiu(this.pje(r));
  }
}
exports.MoraleAreaProgressItem = MoraleAreaProgressItem;
//# sourceMappingURL=MoraleAreaProgressItem.js.map