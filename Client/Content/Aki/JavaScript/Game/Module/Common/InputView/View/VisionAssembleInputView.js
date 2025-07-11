"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionAssembleInputView = undefined;
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const CommonInputViewDefine_1 = require("../Model/CommonInputViewDefine");
const CommonInputViewBase_1 = require("./CommonInputViewBase");
class VisionAssembleInputView extends CommonInputViewBase_1.CommonInputViewBase {
  OnAddEventListener() {
    super.OnAddEventListener();
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener();
  }
  GetMaxLimit() {
    return CommonInputViewDefine_1.MAX_VISION_NAME_LENGTH;
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
exports.VisionAssembleInputView = VisionAssembleInputView;
//# sourceMappingURL=VisionAssembleInputView.js.map