"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonMultiInputView = undefined;
const CommonInputViewDefine_1 = require("../Model/CommonInputViewDefine");
const CommonInputViewBase_1 = require("./CommonInputViewBase");
class CommonMultiInputView extends CommonInputViewBase_1.CommonInputViewBase {
  GetMaxLimit() {
    return CommonInputViewDefine_1.MAX_MULTI_LENGTH;
  }
  IsAllowMultiLine() {
    return true;
  }
}
exports.CommonMultiInputView = CommonMultiInputView;
//# sourceMappingURL=CommonMultiInputView.js.map