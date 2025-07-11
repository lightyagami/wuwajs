"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeItemModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class RangeItemModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ksr = undefined;
  }
  OnInit() {
    this.ksr = new Map();
    return true;
  }
  AddBoxRange(e, o) {
    if (this.ksr.has(e) && Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneGameplay", 29, "[RangeItemModel] Box Range Id 重复", ["BoxRangeItem", o.GetName()]);
    }
    this.ksr.set(e, o);
  }
  RemoveBoxRange(e) {
    this.ksr.delete(e);
  }
  GetBoxRange(e) {
    return this.ksr.get(e);
  }
  OnClear() {
    return !(this.ksr = undefined);
  }
}
exports.RangeItemModel = RangeItemModel;
//# sourceMappingURL=RangeItemModel.js.map