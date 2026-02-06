"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightLevelListPanel = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout");
const MotorFightLevelItem_1 = require("./MotorFightLevelItem");
class MotorFightLevelListPanel extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.GLl = undefined;
    this.oMg = () => new MotorFightLevelItem_1.MotorFightLevelItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout]];
  }
  OnStart() {
    this.GLl = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.oMg);
  }
  async RefreshAsync(e, t, r) {
    await this.GLl.RefreshByDataAsync(e);
  }
  GuideGetLevelItem(e) {
    return this.GLl.GetItemByIndex(e);
  }
  GetLevelNavigationItem() {
    var t = this.GLl.GetDatas();
    let r = 0;
    for (let e = 0; e < t.length; e++) {
      if (!t[e].IsFinished) {
        r = e;
        break;
      }
    }
    return this.GLl.GetLayoutItemByIndex(r)?.GetNavigationItem();
  }
}
exports.MotorFightLevelListPanel = MotorFightLevelListPanel;
//# sourceMappingURL=MotorFightLevelListPanel.js.map