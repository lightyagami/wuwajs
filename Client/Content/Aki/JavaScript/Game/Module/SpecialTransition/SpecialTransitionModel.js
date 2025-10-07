"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialTransitionModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class SpecialTransitionModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.KeepShowPromise = undefined;
    this.rBd = undefined;
  }
  GetSpecialTransitionParams() {
    return this.rBd;
  }
  SetSpecialTransitionParams(e) {
    if (this.rBd) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Loading", 87, "SpecialTransitionParams已存在,被重复设置");
      }
      return false;
    } else {
      this.rBd = e;
      return true;
    }
  }
  ClearSpecialTransitionParams() {
    this.rBd = undefined;
  }
  OnClear() {
    this.KeepShowPromise = undefined;
    return !(this.rBd = undefined);
  }
}
exports.SpecialTransitionModel = SpecialTransitionModel;
//# sourceMappingURL=SpecialTransitionModel.js.map