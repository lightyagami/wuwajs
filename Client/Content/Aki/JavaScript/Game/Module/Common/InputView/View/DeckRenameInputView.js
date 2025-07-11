"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckRenameInputView = undefined;
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CommonInputViewBase_1 = require("./CommonInputViewBase");
class DeckRenameInputView extends CommonInputViewBase_1.CommonInputViewBase {
  GetMinLimit() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.ActivityId;
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(e).GroupNameLimit[0];
  }
  GetMaxLimit() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel.ActivityId;
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(e).GroupNameLimit[1];
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