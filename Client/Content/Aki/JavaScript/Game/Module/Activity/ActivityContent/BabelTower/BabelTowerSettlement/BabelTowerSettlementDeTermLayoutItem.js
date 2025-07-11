"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerSettlementDeTermLayoutItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const BabelTowerSettlementDeTermItem_1 = require("./BabelTowerSettlementDeTermItem");
class BabelTowerSettlementDeTermLayoutItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.TemplateActor = undefined;
    this.Roc = undefined;
    this.ARc = () => new BabelTowerSettlementDeTermItem_1.BabelTowerSettlementDeTermItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout]];
  }
  OnStart() {
    this.Roc = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.ARc, this.TemplateActor);
  }
  Refresh(e, t, r) {
    this.Roc?.RefreshByData(e);
  }
  SetLayoutPadding(e) {
    this.GetHorizontalLayout(0).SetPadding(e);
  }
}
exports.BabelTowerSettlementDeTermLayoutItem = BabelTowerSettlementDeTermLayoutItem;
//# sourceMappingURL=BabelTowerSettlementDeTermLayoutItem.js.map