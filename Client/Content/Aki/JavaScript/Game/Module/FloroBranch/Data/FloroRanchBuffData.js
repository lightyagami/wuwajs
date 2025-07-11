"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchBuffData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class FloroRanchBuffData {
  constructor() {
    this.NUe = 0;
    this.Mne = 0;
    this.hma = 0;
    this.Qcu = 0;
    this.Kcu = undefined;
  }
  RefreshBuffData(t) {
    this.NUe = t.Ziu;
    this.Mne = t.s5n;
    this.hma = t.dru;
    this.Qcu = t.nru;
    this.Kcu = ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchBuffById(this.Mne);
  }
  GetBuffName() {
    return this.Kcu?.Name ?? "";
  }
  get RemindDay() {
    return this.hma;
  }
  GetPlies() {
    return this.Qcu;
  }
  GetInstanceId() {
    return this.NUe;
  }
  GetConfigId() {
    return this.Mne;
  }
  get IsShowOnTip() {
    return this.Kcu.IsShowOnTip;
  }
  get IsShowEffect() {
    return this.Kcu.IsShowEffect;
  }
}
exports.FloroRanchBuffData = FloroRanchBuffData;
//# sourceMappingURL=FloroRanchBuffData.js.map