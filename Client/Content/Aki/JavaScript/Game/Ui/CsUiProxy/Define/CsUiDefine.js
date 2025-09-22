"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CsUiDefine = undefined;
const ue_1 = require("ue");
class CsUiDefine {
  static IsRedirectToCs(e) {
    return !!ue_1.KuroStaticLibrary.IsEnableCSharpEnv() && this.E5d.has(e);
  }
}
(exports.CsUiDefine = CsUiDefine).E5d = new Set(["QuestTreeMainView", "QuestTreeAvailableListView", "QuestTreeChapterView", "QuestTreeNodeDetailView", "QuestTreeNodeImageView", "CsQuestLockPreview"]);
//# sourceMappingURL=CsUiDefine.js.map