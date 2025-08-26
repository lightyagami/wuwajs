"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomManageConfigRenameInputView = undefined;
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const CommonInputViewBase_1 = require("./CommonInputViewBase");
class PhantomManageConfigRenameInputView extends CommonInputViewBase_1.CommonInputViewBase {
  GetMaxLimit() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PhantomSettingNameLength") ?? 20;
  }
  InitExtraParam() {
    this.Hqe();
  }
  RefreshDuplicateName(e) {
    this.Hqe();
  }
  IsAllowMultiLine() {
    return false;
  }
  Hqe() {
    var e = this.InputText.Text !== this.InputData.InputText;
    var t = StringUtils_1.StringUtils.GetStringRealCount(this.InputText.Text) > this.GetMaxLimit();
    this.ConfirmButton.SetSelfInteractive(e && !t);
  }
}
exports.PhantomManageConfigRenameInputView = PhantomManageConfigRenameInputView;
//# sourceMappingURL=PhantomManageConfigRenameInputView.js.map