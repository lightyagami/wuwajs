"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportMarkItemChildIconHandle = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const WorldMapDefine_1 = require("../../../../WorldMap/WorldMapDefine");
const MarkItemChildIconHandle_1 = require("./MarkItemChildIconHandle");
class TeleportMarkItemChildIconHandle extends MarkItemChildIconHandle_1.MarkItemChildIconHandle {
  OnUpdate() {
    var e = this.Context.MarkItem;
    if (e.IsDungeonEntrance) {
      this.SetVisible(!e.IsFogUnlock);
      if (!e.IsFogUnlock) {
        this.Context.MarkItemEntity.Resource.ChildIconPath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(WorldMapDefine_1.SUB_ICON_PATH);
      }
    } else {
      super.OnUpdate();
    }
  }
}
exports.TeleportMarkItemChildIconHandle = TeleportMarkItemChildIconHandle;
//# sourceMappingURL=TeleportMarkItemChildIconHandle.js.map