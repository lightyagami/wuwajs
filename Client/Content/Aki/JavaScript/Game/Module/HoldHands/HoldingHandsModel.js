"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HoldingHandsModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class HoldingHandsModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Relations = new Map();
  }
  OnInit() {
    return true;
  }
  OnClear() {
    this.Relations.clear();
    return true;
  }
  SetRelation(e, t) {
    this.Relations.set(e, t);
  }
  DeleteRelation(e) {
    this.Relations.delete(e);
  }
  GetRelation(e) {
    return this.Relations.get(e);
  }
}
exports.HoldingHandsModel = HoldingHandsModel;
//# sourceMappingURL=HoldingHandsModel.js.map