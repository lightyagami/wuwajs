"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MingSuNpcTopRightIconHandle = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const WorldMapDefine_1 = require("../../../../WorldMap/WorldMapDefine");
const MarkItemTopRightIconHandle_1 = require("./MarkItemTopRightIconHandle");
class MingSuNpcTopRightIconHandle extends MarkItemTopRightIconHandle_1.MarkItemTopRightIconHandle {
  OnUpdate() {
    var a = this.Context.MarkItemEntity;
    if (a.GamePlay.IsDisable) {
      this.SetVisible(true);
      a.Resource.TopRightIconPath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(WorldMapDefine_1.BLOCK_MARK_ICON_PATH);
      this.Context.SetSpriteByPathAction(a.Resource.TopRightIconPath, this.Context.TopRightIconSprite, false);
    } else {
      var n = a.GetComponent(15).MapMarkConfig;
      var r = n.RelativeType;
      var i = n.RelativeSubType;
      let e = false;
      if (r === 1 && i === 5 && (r = n.RelativeId, i = ModelManager_1.ModelManager.MingSuModel.GetDarkCoastDeliveryDataByLevelPlayId(r).GetDarkCoastDeliveryGuardState(), e = i === 4)) {
        n = a.Resource.TopRightIconPath;
        this.Context.SetSpriteByPathAction(n, this.Context.TopRightIconSprite, false);
      }
      this.SetVisible(e);
    }
  }
}
exports.MingSuNpcTopRightIconHandle = MingSuNpcTopRightIconHandle;
//# sourceMappingURL=MingSuNpcTopRightIconHandle.js.map