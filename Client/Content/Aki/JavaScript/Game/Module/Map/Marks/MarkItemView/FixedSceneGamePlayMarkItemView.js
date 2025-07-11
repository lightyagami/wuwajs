"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixedSceneGamePlayMarkItemView = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ConfigMarkItemView_1 = require("./ConfigMarkItemView");
class FixedSceneGamePlayMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
  }
  OnAfterShow() {
    super.OnAfterShow();
    this.UpdateIcon();
  }
  OnSafeUpdate(e, r, a) {
    var t = this.Holder;
    var i = t.IconPath;
    var s = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(t.MarkConfig.RelativeId);
    if (!s || s.IsClose) {
      t.IconPath = t.MarkConfig.LockMarkPic;
    } else {
      t.IconPath = t.MarkConfig.UnlockMarkPic;
    }
    if (i !== t.IconPath) {
      this.OnIconPathChanged(t.IconPath);
    }
  }
}
exports.FixedSceneGamePlayMarkItemView = FixedSceneGamePlayMarkItemView;
//# sourceMappingURL=FixedSceneGamePlayMarkItemView.js.map