"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsGearItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class RacingBetsGearItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Fxc = undefined;
    this.kqe = () => {
      this.Fxc(this.Lo);
    };
    this.A5e = () => this.GetExtendToggle(0)?.GetToggleState() !== 1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.A5e);
  }
  Refresh(t, e, s) {
    t = (this.Lo = t).Odds + "%";
    this.GetText(1).SetText(t);
    this.GetText(2).SetText(t);
    this.Gxc(e);
  }
  OnSelected(t) {
    this.Gxc(true);
  }
  OnDeselected(t) {
    this.Gxc(false);
  }
  Gxc(t) {
    this.GetExtendToggle(0).SetToggleStateForce(t ? 1 : 0);
  }
  BindClickGearItemCallBack(t) {
    this.Fxc = t;
  }
}
exports.RacingBetsGearItem = RacingBetsGearItem;
//# sourceMappingURL=RacingBetsGearItem.js.map