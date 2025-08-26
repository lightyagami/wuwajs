"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTouchUiEditConfig = undefined;
const CommonTouchUiEditByEditGroup_1 = require("../../../../Core/Define/ConfigQuery/CommonTouchUiEditByEditGroup");
const CommonTouchUiEditById_1 = require("../../../../Core/Define/ConfigQuery/CommonTouchUiEditById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class CommonTouchUiEditConfig extends ConfigBase_1.ConfigBase {
  GetConfigListByEditGroup(o) {
    return CommonTouchUiEditByEditGroup_1.configCommonTouchUiEditByEditGroup.GetConfigList(o);
  }
  GetConfigById(o) {
    return CommonTouchUiEditById_1.configCommonTouchUiEditById.GetConfig(o);
  }
}
exports.CommonTouchUiEditConfig = CommonTouchUiEditConfig;
//# sourceMappingURL=CommonTouchUiEditConfig.js.map