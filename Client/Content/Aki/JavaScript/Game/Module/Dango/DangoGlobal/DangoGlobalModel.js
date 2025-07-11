"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoGlobalModel = undefined;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class DangoGlobalModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Config = undefined;
  }
  OnClear() {
    this.qFt();
    return true;
  }
  OnLeaveLevel() {
    this.qFt();
    return true;
  }
  OnChangeMode() {
    this.qFt();
    return true;
  }
  qFt() {
    this.Config = undefined;
  }
}
exports.DangoGlobalModel = DangoGlobalModel;
//# sourceMappingURL=DangoGlobalModel.js.map