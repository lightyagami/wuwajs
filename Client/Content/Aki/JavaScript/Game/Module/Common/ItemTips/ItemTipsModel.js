"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemTipsModel = undefined;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class ItemTipsModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.gxt = undefined;
    this.SharpTempOpenParam = undefined;
  }
  SetCurrentItemTipsData(e) {
    this.gxt = e;
  }
  GetCurrentItemTipsData() {
    return this.gxt;
  }
}
exports.ItemTipsModel = ItemTipsModel;
//# sourceMappingURL=ItemTipsModel.js.map