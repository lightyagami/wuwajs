"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientTagModel = undefined;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class ClientTagModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.AUd = undefined;
  }
  OnInit() {
    this.AUd = new Map();
    return true;
  }
  OnClear() {
    this.AUd?.clear();
    return !(this.AUd = undefined);
  }
  ClientAddTagToTarget(e, t) {
    if (!this.AUd.has(e)) {
      this.AUd.set(e, new Set());
    }
    this.AUd.get(e).add(t);
  }
  ClearTargetTagAdded(e) {
    return this.AUd.delete(e);
  }
  ClientRemoveTagFromTarget(e, t) {
    return !!this.AUd.has(e) && this.AUd.get(e).delete(t);
  }
}
exports.ClientTagModel = ClientTagModel;
//# sourceMappingURL=ClientTagModel.js.map