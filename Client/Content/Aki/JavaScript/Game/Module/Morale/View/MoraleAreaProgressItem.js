"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleAreaProgressItem = void 0;
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class MoraleAreaProgressItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.ItemData = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite]
    ]
  }
  Refresh(r) {
    this.ItemData = r, this.SetUiProgressByScore(r.StartScore)
  }
  pje(r) {
    return r >= this.ItemData.TargetScore ? 1 : (r - this.ItemData.LastTargetScore) / (this.ItemData.TargetScore - this.ItemData.LastTargetScore)
  }
  Feu(r) {
    this.GetSprite(0)?.SetFillAmount(r)
  }
  SetUiProgressByScore(r) {
    this.Feu(this.pje(r))
  }
}
exports.MoraleAreaProgressItem = MoraleAreaProgressItem;
//# sourceMappingURL=MoraleAreaProgressItem.js.map