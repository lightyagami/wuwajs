"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkItemTopRightIconHandle = undefined;
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const WorldMapDefine_1 = require("../../../../WorldMap/WorldMapDefine");
const MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class MarkItemTopRightIconHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  OnInit() {
    this.Context.MarkItemEntity.Resource.TopRightIconPath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ComIconFinish");
    this.Update();
    this.ApplyModified();
  }
  OnUpdate() {
    var e = this.Context.MarkItemEntity;
    if (e.GamePlay.IsDisable) {
      this.SetVisible(true);
      e.Resource.TopRightIconPath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(WorldMapDefine_1.BLOCK_MARK_ICON_PATH);
      this.Context.SetSpriteByPathAction(e.Resource.TopRightIconPath, this.Context.TopRightIconSprite, false);
    } else if (e.GamePlay.IsFinish) {
      this.SetVisible(true);
      e.Resource.TopRightIconPath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ComIconFinish");
      this.Context.SetSpriteByPathAction(e.Resource.TopRightIconPath, this.Context.TopRightIconSprite, false);
    } else {
      this.SetVisible(false);
    }
  }
  OnSetVisible(e) {
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(1, e);
  }
  OnApplyModified() {
    var e;
    var n = this.Context.MarkItemEntity.ViewLifeCircle;
    if (n.IsChildViewStateDirty(1)) {
      e = n.IsChildViewVisible(1);
      n.SetChildViewVisibleClean(1);
      this.Context.TopRightIconSprite.SetUIActive(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMarkTopRightIconUpdate);
    }
  }
}
exports.MarkItemTopRightIconHandle = MarkItemTopRightIconHandle;
//# sourceMappingURL=MarkItemTopRightIconHandle.js.map