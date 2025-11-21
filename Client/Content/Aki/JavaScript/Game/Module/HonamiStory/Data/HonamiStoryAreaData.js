"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryAreaData = undefined;
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class HonamiStoryAreaData {
  constructor(t) {
    this.L9e = 0;
    this.C5d = 0;
    this.p5d = 0;
    this.L9e = t;
    this.p5d = 0;
  }
  UpdateData(t) {
    this.C5d = t.x4d;
    var e;
    var r;
    var t = t.H6n;
    if (this.p5d === 0 && t === 1 && (e = this.L9e, this.Config.UnLockTips) && !(r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvAreaUnLockTips) ?? new Map()).has(e)) {
      r.set(e, true);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvAreaUnLockTips, r);
    }
    this.p5d = t;
  }
  UpdateCollectMascotState(t) {
    this.C5d = t;
  }
  get CollectMascotState() {
    return this.C5d;
  }
  get Config() {
    return ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryAreaConfig(this.L9e);
  }
  get Id() {
    return this.L9e;
  }
  get Name() {
    return this.Config.Name;
  }
  get Desc() {
    return this.Config.Desc;
  }
  get DropId() {
    return this.Config.DropId;
  }
  get IsAreaUnlock() {
    return this.p5d !== 0;
  }
  get GetAreaState() {
    return this.p5d;
  }
  get IsAreaCanEnter() {
    return this.p5d !== 0;
  }
  get IsSecretFinished() {
    return this.C5d === 1;
  }
  get LevelPlayId() {
    return this.Config.MainBTId;
  }
}
exports.HonamiStoryAreaData = HonamiStoryAreaData;
//# sourceMappingURL=HonamiStoryAreaData.js.map