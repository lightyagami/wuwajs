"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseInputModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const InputEnums_1 = require("../../Input/InputEnums");
class TowerDefenseInputModel extends ModelBase_1.ModelBase {
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  OnStart() {
    return true;
  }
  OnStop() {
    return true;
  }
}
(exports.TowerDefenseInputModel = TowerDefenseInputModel).ActionTypesInclusive = new Set([InputEnums_1.EInputAction.攻击, InputEnums_1.EInputAction.跳跃, InputEnums_1.EInputAction.闪避]);
//# sourceMappingURL=TDInputModel.js.map