"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CsUiDefine = undefined;
const UE = require("ue");
class CsUiDefine {
  static IsRedirectToCs(e) {
    return !!UE.CSharpBlueprintFunctionLibrary.HasCSharpEnvironmentInitialized() && this.S0m.has(e);
  }
}
(exports.CsUiDefine = CsUiDefine).S0m = new Set(["QuestTreeMainView", "QuestTreeAvailableListView", "QuestTreeChapterView", "QuestTreeNodeDetailView", "QuestTreeNodeImageView", "CsQuestLockPreview", "MailBoxView", "TimeOfDaySecondView", "TimeOfDayLoadingView", "FriendView", "ChatView", "FriendProcessView", "SelectedFriendChatView", "ChatExpressionView", "QuickChatView", "FriendSearchView", "FriendBlackListView"]);
//# sourceMappingURL=CsUiDefine.js.map