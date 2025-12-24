"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructureShopMenuItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const InfrastructureDefine_1 = require("../../InfrastructureDefine");
class InfrastructureShopMenuItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Level = 0;
    this.yVm = undefined;
    this.SVm = t => {
      if (t === 1) {
        this.yVm?.(this.Level);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.SVm]];
  }
  Refresh(t) {
    this.Level = t;
    this.GetText(1).ShowTextNew(InfrastructureDefine_1.infrShopTabMenuName[this.Level] ?? "");
  }
  SetOnClickToggleItem(t) {
    this.yVm = t;
  }
  SetDeselect() {
    this.GetExtendToggle(0).SetToggleState(0);
  }
  SetSelect() {
    this.GetExtendToggle(0).SetToggleState(1);
  }
}
exports.InfrastructureShopMenuItem = InfrastructureShopMenuItem;
//# sourceMappingURL=InfrastructureShopMenuItem.js.map