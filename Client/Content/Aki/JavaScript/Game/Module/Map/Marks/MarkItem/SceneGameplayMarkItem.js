"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneGameplayMarkItem = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const WorldMapDefine_1 = require("../../../WorldMap/WorldMapDefine");
const SceneGameplayMarkItemView_1 = require("../MarkItemView/SceneGameplayMarkItemView");
const ConfigMarkItem_1 = require("./ConfigMarkItem");
class SceneGameplayMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, r, a, t, i, n = 1) {
    super(e, r, a, t, i, n);
    this.InnerView = undefined;
  }
  GetMarkItemViewType() {
    return 20;
  }
  CreateView() {
    return new SceneGameplayMarkItemView_1.SceneGameplayMarkItemView(this);
  }
  CheckCanShowView() {
    var e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(this.MarkConfig.RelativeId);
    return !!e && !e.IsClose && super.CheckCanShowView();
  }
  InitIcon() {
    var e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(this.MarkConfig.RelativeId);
    if (!e || !!e.IsClose) {
      this.IconPath = this.MarkConfig.LockMarkPic;
    }
    this.IconPath = this.MarkConfig.UnlockMarkPic;
  }
  GetSecondaryUiType() {
    if (this.MarkType === 24) {
      return WorldMapDefine_1.ESecondaryPanel.CorniceMeetingPanel;
    } else if (this.IsLordGym() || this.IsNewLordGym()) {
      return WorldMapDefine_1.ESecondaryPanel.LordGymPanel;
    } else {
      return WorldMapDefine_1.ESecondaryPanel.SceneGameplayPanel;
    }
  }
}
exports.SceneGameplayMarkItem = SceneGameplayMarkItem;
//# sourceMappingURL=SceneGameplayMarkItem.js.map