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
    this.oOd = undefined;
  }
  GetSpecialTransitionParams() {
    return this.oOd;
  }
  SetSpecialTransitionParams(e) {
    if (this.oOd) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Loading", 87, "SpecialTransitionParams已存在,被重复设置");
      }
      return false;
    } else {
      this.oOd = e;
      return true;
    }
  }
  ClearSpecialTransitionParams() {
    this.oOd = undefined;
  }
  OnClear() {
    return !(this.oOd = undefined);
  }
}
exports.SpecialTransitionModel = SpecialTransitionModel;
//# sourceMappingURL=SpecialTransitionModel.js.map