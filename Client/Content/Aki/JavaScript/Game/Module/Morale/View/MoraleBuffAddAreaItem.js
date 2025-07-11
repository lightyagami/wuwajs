"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleBuffAddAreaItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class MoraleBuffAddAreaItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ItemData = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIItem]];
  }
  Refresh(t) {
    this.ItemData = t;
    if (this.ItemData.IsAreaBuffActive()) {
      this.SetActiveState();
    } else {
      this.SetLockState();
    }
  }
  SetActiveState() {
    this.ddu(true);
    this.Uar(false);
    this.mdu(this.ItemData.Config.BuffActiveDesc);
    this.fdu(1);
  }
  SetLockState() {
    this.ddu(false);
    this.Uar(false);
    this.mdu(this.ItemData.Config.BuffLockDesc);
    this.fdu(0.3);
  }
  ddu(t) {
    this.GetSprite(2)?.SetUIActive(t);
  }
  mdu(t) {
    this.GetText(1)?.ShowTextNew(t);
  }
  fdu(t) {
    this.GetItem(0)?.SetAlpha(t);
  }
  Uar(t) {
    this.GetItem(3)?.SetUIActive(t);
  }
}
exports.MoraleBuffAddAreaItem = MoraleBuffAddAreaItem;
//# sourceMappingURL=MoraleBuffAddAreaItem.js.map