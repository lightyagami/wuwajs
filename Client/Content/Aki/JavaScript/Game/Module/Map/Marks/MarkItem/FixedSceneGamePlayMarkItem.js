"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixedSceneGameplayMarkItem = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const WorldMapDefine_1 = require("../../../WorldMap/WorldMapDefine");
const FixedSceneGamePlayMarkItemView_1 = require("../MarkItemView/FixedSceneGamePlayMarkItemView");
const ConfigMarkItem_1 = require("./ConfigMarkItem");
class FixedSceneGameplayMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, t, i, r, a, s = 1) {
    super(e, t, i, r, a, s);
    this.InnerView = undefined;
  }
  GetMarkItemViewType() {
    return 12;
  }
  CreateView() {
    return new FixedSceneGamePlayMarkItemView_1.FixedSceneGamePlayMarkItemView(this);
  }
  OnInitialize() {
    super.OnInitialize();
    this.uil();
  }
  InitIcon() {
    var e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(this.MarkConfig.RelativeId);
    if (!e || e.IsClose) {
      this.IconPath = this.MarkConfig.LockMarkPic;
    } else {
      this.IconPath = this.MarkConfig.UnlockMarkPic;
    }
  }
  IsMultiMap() {
    return this.MarkConfig.MultiMapFloorId !== 0;
  }
  GetMultiMapId() {
    return this.MarkConfig.MultiMapFloorId;
  }
  OnUpdate(e) {
    super.OnUpdate(e);
    if (this.MapType === 1) {
      this.uil();
    }
  }
  uil() {
    var e = this.IsSelectThisFloor;
    this.IsSelectThisFloor = this.GetIsSelectThisFloor();
    if (e !== this.IsSelectThisFloor) {
      this.UpdateViewIcon();
    }
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
exports.FixedSceneGameplayMarkItem = FixedSceneGameplayMarkItem;
//# sourceMappingURL=FixedSceneGamePlayMarkItem.js.map