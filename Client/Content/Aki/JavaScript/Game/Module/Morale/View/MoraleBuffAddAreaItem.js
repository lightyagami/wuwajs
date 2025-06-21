"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleBuffAddAreaItem = void 0;
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class MoraleBuffAddAreaItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.ItemData = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIItem]
    ]
  }
  Refresh(t) {
    this.ItemData = t, this.ItemData.IsAreaBuffActive() ? this.SetActiveState() : this.SetLockState()
  }
  SetActiveState() {
    var t = this.ItemData.IsNewActiveAreaBuff;
    this.aau(!t), this.Uar(t), this.hau(this.ItemData.Config.BuffActiveDesc), this.lau(1)
  }
  SetLockState() {
    this.aau(!1), this.Uar(!1), this.hau(this.ItemData.Config.BuffLockDesc);
    this.lau(.3)
  }
  aau(t) {
    this.GetSprite(2)?.SetUIActive(t)
  }
  hau(t) {
    this.GetText(1)?.ShowTextNew(t)
  }
  lau(t) {
    this.GetItem(0)?.SetAlpha(t)
  }
  Uar(t) {
    this.GetItem(3)?.SetUIActive(t)
  }
}
exports.MoraleBuffAddAreaItem = MoraleBuffAddAreaItem;
//# sourceMappingURL=MoraleBuffAddAreaItem.js.map