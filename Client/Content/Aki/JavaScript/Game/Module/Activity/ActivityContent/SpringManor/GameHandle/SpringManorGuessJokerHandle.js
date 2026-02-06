"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorGuessJokerHandle = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
class SpringManorGuessJokerHandle {
  GetCurrentProgress() {
    return ModelManager_1.ModelManager.SpringManorModel?.ActivityData.GetGuessJokerCurrentProgress() ?? 0;
  }
  GetTotalProgress() {
    return ModelManager_1.ModelManager.SpringManorModel?.ActivityData.GetGuessJokerTotalProgress() ?? 0;
  }
  EnterGame() {
    ModelManager_1.ModelManager.GuessJokerGamePlayModel.ShowAllGuessJokerNpc();
    UiManager_1.UiManager.CloseAndOpenView("Spring26GameplayEntryView", "GuessJokerSelectRoleView");
  }
  GetRedDotName() {
    return "GuessJokerUnlockLevel";
  }
}
exports.SpringManorGuessJokerHandle = SpringManorGuessJokerHandle;
//# sourceMappingURL=SpringManorGuessJokerHandle.js.map