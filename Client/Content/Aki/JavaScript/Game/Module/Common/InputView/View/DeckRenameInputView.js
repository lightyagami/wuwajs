"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckRenameInputView = undefined;
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const CommonInputViewBase_1 = require("./CommonInputViewBase");
class DeckRenameInputView extends CommonInputViewBase_1.CommonInputViewBase {
  GetMinLimit() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig("GroupNameLimit")[0];
  }
  GetMaxLimit() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig("GroupNameLimit")[1];
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
    var i = StringUtils_1.StringUtils.GetStringRealCount(this.InputText.Text) > this.GetMaxLimit();
    this.ConfirmButton.SetSelfInteractive(e && !i);
  }
}
exports.DeckRenameInputView = DeckRenameInputView;
//# sourceMappingURL=DeckRenameInputView.js.map