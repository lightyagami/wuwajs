"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryMascotData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class HonamiStoryMascotData {
  constructor(t) {
    this.FFe = 0;
    this.Cbo = 0;
    this.FFe = t;
  }
  get Config() {
    return ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryMascotConfig(this.FFe);
  }
  UpdateState(t) {
    this.Cbo = t;
  }
  get State() {
    return this.Cbo;
  }
  get Id() {
    return this.FFe;
  }
  get Name() {
    return this.Config.Name;
  }
  get FeatureDesc() {
    return this.Config.FeatureDesc;
  }
  get ClueDesc() {
    return this.Config.ClueDesc;
  }
  get DropId() {
    return this.Config.DropId;
  }
  get AreaId() {
    return this.Config.AreaId;
  }
}
exports.HonamiStoryMascotData = HonamiStoryMascotData;
//# sourceMappingURL=HonamiStoryMascotData.js.map