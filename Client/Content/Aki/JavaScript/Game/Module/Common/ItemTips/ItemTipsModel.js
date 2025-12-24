"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemTipsModel = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class ItemTipsModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.gxt = undefined;
    this.SharpTempOpenParam = undefined;
    this.zDf = 0;
  }
  get DebugCacheTipsItemId() {
    return this.zDf;
  }
  SetCurrentItemTipsData(e) {
    this.gxt = e;
    if (!Info_1.Info.IsBuildShipping && e) {
      this.zDf = e.ConfigId;
    }
  }
  GetCurrentItemTipsData() {
    return this.gxt;
  }
}
exports.ItemTipsModel = ItemTipsModel;
//# sourceMappingURL=ItemTipsModel.js.map