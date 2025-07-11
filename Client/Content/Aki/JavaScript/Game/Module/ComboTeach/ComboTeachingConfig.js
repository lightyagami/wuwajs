"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboTeachingConfig = undefined;
const ComboTeachingById_1 = require("../../../Core/Define/ConfigQuery/ComboTeachingById");
const ComboTeachingConditionById_1 = require("../../../Core/Define/ConfigQuery/ComboTeachingConditionById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ComboTeachingConfig extends ConfigBase_1.ConfigBase {
  GetComboTeachingConfig(o) {
    return ComboTeachingById_1.configComboTeachingById.GetConfig(o);
  }
  GetComboTeachingConditionConfig(o) {
    return ComboTeachingConditionById_1.configComboTeachingConditionById.GetConfig(o);
  }
}
exports.ComboTeachingConfig = ComboTeachingConfig;
//# sourceMappingURL=ComboTeachingConfig.js.map