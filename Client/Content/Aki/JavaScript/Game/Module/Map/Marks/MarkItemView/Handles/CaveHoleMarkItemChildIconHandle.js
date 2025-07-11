"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaveHoleMarkItemChildIconHandle = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const WorldMapDefine_1 = require("../../../../WorldMap/WorldMapDefine");
const MarkItemChildIconHandle_1 = require("./MarkItemChildIconHandle");
class CaveHoleMarkItemChildIconHandle extends MarkItemChildIconHandle_1.MarkItemChildIconHandle {
  OnUpdate() {
    var e;
    var a = this.Context.MarkItem;
    if (a.IsMultiMap()) {
      e = a.IsSelectThisFloor;
      a = a.LocateInGround();
      this.SetVisible(!a || !e);
      this.Context.MarkItemEntity.Resource.ChildIconPath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e ? WorldMapDefine_1.MULTI_MAP_SELECT_ICON_PATH : WorldMapDefine_1.MULTI_MAP_ICON_PATH);
    } else {
      this.SetVisible(false);
    }
  }
}
exports.CaveHoleMarkItemChildIconHandle = CaveHoleMarkItemChildIconHandle;
//# sourceMappingURL=CaveHoleMarkItemChildIconHandle.js.map