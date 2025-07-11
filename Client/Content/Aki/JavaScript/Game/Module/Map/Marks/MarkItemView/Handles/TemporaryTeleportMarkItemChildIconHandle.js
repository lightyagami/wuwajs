"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemporaryTeleportMarkItemChildIconHandle = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const WorldMapDefine_1 = require("../../../../WorldMap/WorldMapDefine");
const MarkItemChildIconHandle_1 = require("./MarkItemChildIconHandle");
class TemporaryTeleportMarkItemChildIconHandle extends MarkItemChildIconHandle_1.MarkItemChildIconHandle {
  OnUpdate() {
    var e;
    super.OnUpdate();
    if (!this.Context.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(7)) {
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(WorldMapDefine_1.TEMPORARY_TELEPORT_NORMAL_ICON_PATH);
      this.Context.MarkItemEntity.Resource.ChildIconPath = e;
      this.SetVisible(true);
    }
  }
}
exports.TemporaryTeleportMarkItemChildIconHandle = TemporaryTeleportMarkItemChildIconHandle;
//# sourceMappingURL=TemporaryTeleportMarkItemChildIconHandle.js.map