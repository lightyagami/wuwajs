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
    this.Adu = 0;
    this.Pdu = undefined;
  }
  RefreshBuffData(t) {
    this.NUe = t.Tru;
    this.Mne = t.s5n;
    this.hma = t.Fru;
    this.Adu = t.xru;
    this.Pdu = ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchBuffById(this.Mne);
  }
  GetBuffName() {
    return this.Pdu?.Name ?? "";
  }
  get RemindDay() {
    return this.hma;
  }
  GetPlies() {
    return this.Adu;
  }
  GetInstanceId() {
    return this.NUe;
  }
  GetConfigId() {
    return this.Mne;
  }
  get IsShowOnTip() {
    return this.Pdu.IsShowOnTip;
  }
  get IsShowEffect() {
    return this.Pdu.IsShowEffect;
  }
}
exports.FloroRanchBuffData = FloroRanchBuffData;
//# sourceMappingURL=FloroRanchBuffData.js.map