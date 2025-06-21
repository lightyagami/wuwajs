"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MingSuNpcTopRightIconHandle = void 0;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  WorldMapDefine_1 = require("../../../../WorldMap/WorldMapDefine"),
  MarkItemTopRightIconHandle_1 = require("./MarkItemTopRightIconHandle");
class MingSuNpcTopRightIconHandle extends MarkItemTopRightIconHandle_1.MarkItemTopRightIconHandle {
  OnUpdate() {
    var a = this.Context.MarkItemEntity;
    if (a.GamePlay.IsDisable) this.SetVisible(!0), a.Resource.TopRightIconPath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(WorldMapDefine_1.BLOCK_MARK_ICON_PATH), this.Context.SetSpriteByPathAction(a.Resource.TopRightIconPath, this.Context.TopRightIconSprite, !1);
    else {
      var n = a.GetComponent(15).MapMarkConfig,
        r = n.RelativeType,
        i = n.RelativeSubType;
      let e = !1;
      1 === r && 5 === i && (r = n.RelativeId, i = ModelManager_1.ModelManager.MingSuModel.GetDarkCoastDeliveryDataByLevelPlayId(r).GetDarkCoastDeliveryGuardState(), e = 4 === i) && (n = a.Resource.TopRightIconPath, this.Context.SetSpriteByPathAction(n, this.Context.TopRightIconSprite, !1)), this.SetVisible(e)
    }
  }
}
exports.MingSuNpcTopRightIconHandle = MingSuNpcTopRightIconHandle;
//# sourceMappingURL=MingSuNpcTopRightIconHandle.js.map