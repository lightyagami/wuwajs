"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemDeliverModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class ItemDeliverModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this._gi = undefined;
  }
  OnClear() {
    return !(this._gi = undefined);
  }
  SetItemDeliverData(e) {
    this._gi = e;
  }
  GetItemDeliverData() {
    return this._gi;
  }
}
exports.ItemDeliverModel = ItemDeliverModel;
//# sourceMappingURL=ItemDeliverModel.js.map