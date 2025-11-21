"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryPlayerData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const INVALID_NUM = -1;
class HonamiStoryPlayerData {
  constructor() {
    this.PowerLevel = INVALID_NUM;
    this.LifeSupportLevel = INVALID_NUM;
    this.LifeSupportId = INVALID_NUM;
    this.Oum = "";
    this.Gum = "";
    this.Fum = "";
    this.w6d = new Map();
  }
  static Create() {
    return new HonamiStoryPlayerData();
  }
  SetLifeSupportLevel(e) {
    if (this.w6d.size === 0) {
      var r = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
      var r = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetLifeSupportList(r);
      if (!r) {
        return;
      }
      for (const t of r) {
        this.w6d.set(t.Level, t.Id);
      }
    }
    r = this.w6d.get(e);
    if (r &&= ConfigManager_1.ConfigManager.HonamiStoryConfig.GetLifeSupport(r)) {
      this.LifeSupportLevel = e;
      this.LifeSupportId = r.Id;
    }
  }
  GetCurLevelId(e) {
    return this.w6d.get(e) ?? 0;
  }
  GetCurMaxValue() {
    var e = this.w6d.get(this.LifeSupportLevel);
    if (e) {
      return ConfigManager_1.ConfigManager.HonamiStoryConfig.GetLifeSupport(e).SteadyValue;
    } else {
      return 0;
    }
  }
  UpdatePowerLevel() {
    this.PowerLevel = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerBackpackData().GetPowerLevel(true);
  }
  GetLifeSupportMaxLevel() {
    let e = 0;
    for (var [r] of this.w6d) {
      e = Math.max(r, e);
    }
    return e;
  }
  GetLifeSupportIcon() {
    var e;
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10105)) {
      e = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetValue(13);
      if (ControllerHolder_1.ControllerHolder.FormationAttributeController.GetMax(13) / 2 < e) {
        if (this.Oum === "") {
          this.Oum = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_MainBarIcon");
        }
        return this.Oum;
      } else {
        if (this.Gum === "") {
          this.Gum = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_MainBarIconDanger");
        }
        return this.Gum;
      }
    } else {
      if (this.Fum === "") {
        this.Fum = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_MainBarIconFirst");
      }
      return this.Fum;
    }
  }
}
exports.HonamiStoryPlayerData = HonamiStoryPlayerData;
//# sourceMappingURL=HonamiStoryPlayerData.js.map