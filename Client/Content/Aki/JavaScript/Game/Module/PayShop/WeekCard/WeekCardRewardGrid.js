"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeekCardRewardGrid = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class WeekCardRewardGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ETt = 0;
    this.hoc = () => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.ETt);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIText]];
    this.BtnBindInfo = [[0, this.hoc]];
  }
  Refresh(r) {
    this.ETt = r.ItemId;
    this.SetItemIcon(this.GetTexture(1), r.ItemId);
    this.GetText(2).SetText(r.Count.toString());
  }
}
exports.WeekCardRewardGrid = WeekCardRewardGrid;
//# sourceMappingURL=WeekCardRewardGrid.js.map