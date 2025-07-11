"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonSingleInputView = undefined;
const CommonInputViewDefine_1 = require("../Model/CommonInputViewDefine");
const CommonInputViewBase_1 = require("./CommonInputViewBase");
class CommonSingleInputView extends CommonInputViewBase_1.CommonInputViewBase {
  GetMaxLimit() {
    return CommonInputViewDefine_1.MAX_SINGLE_LENGTH;
  }
  IsAllowMultiLine() {
    return false;
  }
}
exports.CommonSingleInputView = CommonSingleInputView;
//# sourceMappingURL=CommonSingleInputView.js.map