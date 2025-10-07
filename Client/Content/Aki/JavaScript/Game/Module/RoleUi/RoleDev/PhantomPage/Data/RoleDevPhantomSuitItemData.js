"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomSuitItemData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
class RoleDevPhantomSuitItemData {
  constructor() {
    this.K0d = 0;
    this.JGi = 0;
    this.Y0d = 0;
  }
  Init(e, t, r = 0) {
    this.K0d = e;
    this.JGi = t;
    this.Y0d = r;
  }
  get SuitId() {
    return this.K0d;
  }
  get RoleId() {
    return this.JGi;
  }
  get UseRate() {
    return this.Y0d;
  }
  get FetterGroupConfig() {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetFetterGroupById(this.K0d);
  }
  get SuitName() {
    return this.FetterGroupConfig?.FetterGroupName ?? "";
  }
  get HasElementIcon() {
    return !!this.FetterGroupConfig?.FetterElementPath;
  }
  get ElementColor() {
    return this.FetterGroupConfig?.FetterElementColor;
  }
  get ElementIconPath() {
    return this.FetterGroupConfig?.FetterElementPath;
  }
  get DungeonId() {
    var e = ConfigManager_1.ConfigManager.RoleDevConfig?.GetPhantomJumpGroupConfig(this.K0d);
    if (e) {
      var e = e.PhantomJumpId;
      var t = ModelManager_1.ModelManager.AdventureGuideModel?.GetAllDetectSilentAreas();
      if (t) {
        for (const n of e) {
          var r = t.get(n);
          if (r && !r.IsLock) {
            return n;
          }
        }
      }
    }
    return 0;
  }
}
exports.RoleDevPhantomSuitItemData = RoleDevPhantomSuitItemData;
//# sourceMappingURL=RoleDevPhantomSuitItemData.js.map