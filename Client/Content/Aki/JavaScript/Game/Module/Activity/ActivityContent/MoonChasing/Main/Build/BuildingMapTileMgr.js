"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuildingMapTileMgr = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise");
const ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const COLUMNS_NUM = 8;
const ROW_NUM = 4;
const MAPTILE_NAME_TEMPLATE = "ChasingMoonMap_{0}_{1}";
class BuildingMapTileMgr {
  constructor() {
    this.aRn = new Map();
  }
  async hRn(r, e) {
    const s = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, e => {
      if (e) {
        this.aRn.set(r, e);
      }
      s.SetResult(undefined);
    }, 102);
    return s.Promise;
  }
  CreateTilesPathList() {
    var s = [];
    for (let r = 1; r <= ROW_NUM; r++) {
      for (let e = 1; e <= COLUMNS_NUM; e++) {
        var i = StringUtils_1.StringUtils.Format(MAPTILE_NAME_TEMPLATE, r.toString(), e.toString());
        var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
        s.push(i);
      }
    }
    return s;
  }
  async LoadMapTiles() {
    var s = [];
    for (let r = 1; r <= ROW_NUM; r++) {
      for (let e = 1; e <= COLUMNS_NUM; e++) {
        var i = StringUtils_1.StringUtils.Format(MAPTILE_NAME_TEMPLATE, r.toString(), e.toString());
        var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
        s.push(this.hRn(i, t));
      }
    }
    await Promise.all(s);
  }
}
exports.BuildingMapTileMgr = BuildingMapTileMgr;
//# sourceMappingURL=BuildingMapTileMgr.js.map