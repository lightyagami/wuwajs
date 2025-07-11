"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuffModel = undefined;
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase");
class BuffModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.HandlePrefix = 0;
    this.LastHandle = 1;
    this.SQo = new Map();
  }
  OnClear() {
    this.SQo.clear();
    return true;
  }
  Add(e, s) {
    this.SQo.set(e, s);
  }
  Get(e) {
    return this.SQo.get(e);
  }
}
exports.BuffModel = BuffModel;
//# sourceMappingURL=CharacterBuffModel.js.map