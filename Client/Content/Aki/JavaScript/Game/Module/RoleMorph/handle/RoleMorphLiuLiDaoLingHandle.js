"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleMorphLiuLiDaoLingHandle = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const RoleMorphHandleBase_1 = require("./RoleMorphHandleBase");
class RoleMorphLiuLiDaoLingHandle extends RoleMorphHandleBase_1.RoleMorphHandleBase {
  BeginMorph() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildrenVisible(7, [18, 9, 10], false);
  }
  EndMorph() {
    if (UiManager_1.UiManager.IsViewOpen("LiuLiDaoLingView")) {
      UiManager_1.UiManager.CloseView("LiuLiDaoLingView");
    }
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildrenVisible(7, [18, 9, 10], true);
  }
}
exports.RoleMorphLiuLiDaoLingHandle = RoleMorphLiuLiDaoLingHandle;
//# sourceMappingURL=RoleMorphLiuLiDaoLingHandle.js.map