"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkItemTopRightIconHandle = undefined;
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const WorldMapDefine_1 = require("../../../../WorldMap/WorldMapDefine");
const MapDefine_1 = require("../../../MapDefine");
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
    } else {
      var n = e.GamePlay.IsFinish;
      var i = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e.GamePlay.MarkId);
      var i = MapDefine_1.canDisableGameplayFinishMarkType.has(e.GamePlay.MarkType) && i?.IsDisableGameplayFinishIcon;
      if (n && !i) {
        this.SetVisible(true);
        e.Resource.TopRightIconPath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ComIconFinish");
        this.Context.SetSpriteByPathAction(e.Resource.TopRightIconPath, this.Context.TopRightIconSprite, false);
      } else {
        n = this.Context.MarkItem;
        if (n && n.MarkConfig && (n.MarkConfig.RelativeSubType === 9 || n.MarkConfig.RelativeSubType === 10)) {
          i = ModelManager_1.ModelManager.AdventureGuideModel.GetNightMareTarget(n.MarkConfig.MapId, n.MarkConfig.RelativeId);
          if (i[0] === i[1] && i[1] > 0) {
            this.SetVisible(true);
            e.Resource.TopRightIconPath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_MarkTimeLimit");
            this.Context.SetSpriteByPathAction(e.Resource.TopRightIconPath, this.Context.TopRightIconSprite, false);
            return;
          }
        }
        if (n && n.MarkType === 43) {
          i = ConfigManager_1.ConfigManager.InfrastructureConfig.GetRoadConfigByMarkId(n.MarkId);
          if (ModelManager_1.ModelManager.InfrastructureModel.GetRoadMaterialEnough(i.Id)) {
            this.SetVisible(true);
            e.Resource.TopRightIconPath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_InfrastructureUpgradeIcon");
            this.Context.SetSpriteByPathAction(e.Resource.TopRightIconPath, this.Context.TopRightIconSprite, false);
            return;
          }
        }
        this.SetVisible(false);
      }
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