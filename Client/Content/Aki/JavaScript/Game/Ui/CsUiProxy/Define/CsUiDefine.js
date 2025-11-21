"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CsUiDefine = undefined;
const UE = require("ue");
class CsUiDefine {
  static IsRedirectToCs(e) {
    return !!UE.CSharpBlueprintFunctionLibrary.HasCSharpEnvironmentInitialized() && this.zum.has(e);
  }
}
(exports.CsUiDefine = CsUiDefine).zum = new Set(["QuestTreeMainView", "QuestTreeAvailableListView", "QuestTreeChapterView", "QuestTreeNodeDetailView", "QuestTreeNodeImageView", "CsQuestLockPreview", "MailBoxView", "TimeOfDaySecondView", "TimeOfDayLoadingView"]);
//# sourceMappingURL=CsUiDefine.js.map