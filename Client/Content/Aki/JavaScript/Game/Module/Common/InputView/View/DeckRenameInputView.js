"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DeckRenameInputView = void 0;
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CommonInputViewBase_1 = require("./CommonInputViewBase");
class DeckRenameInputView extends CommonInputViewBase_1.CommonInputViewBase {
  GetMinLimit() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.ActivityId;
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(e).GroupNameLimit[0]
  }
  GetMaxLimit() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.ActivityId;
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(e).GroupNameLimit[1]
  }
  InitExtraParam() {
    this.Hqe()
  }
  RefreshDuplicateName(e) {
    this.Hqe()
  }
  IsAllowMultiLine() {
    return !1
  }
  Hqe() {
    var e = this.InputText.Text !== this.InputData.InputText,
      i = StringUtils_1.StringUtils.GetStringRealCount(this.InputText.Text) > this.GetMaxLimit();
    this.ConfirmButton.SetSelfInteractive(e && !i)
  }
}
exports.DeckRenameInputView = DeckRenameInputView;
//# sourceMappingURL=DeckRenameInputView.js.map