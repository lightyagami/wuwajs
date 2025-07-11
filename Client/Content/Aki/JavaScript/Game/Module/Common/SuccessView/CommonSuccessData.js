"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonSuccessData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class CommonSuccessData {
  constructor() {
    this.HGe = "";
    this.ybt = "";
    this.Ibt = "";
    this.Tbt = undefined;
    this.lCt = "";
    this.Lbt = true;
  }
  SetTitleText(t) {
    this.HGe = t;
  }
  SetSubTitleText(t) {
    this.ybt = t;
  }
  SetClickText(t) {
    this.Ibt = t;
  }
  GetTitleText() {
    return this.HGe;
  }
  GetSubTitleText() {
    return this.ybt;
  }
  GetClickText() {
    return this.Ibt;
  }
  SetClickFunction(t) {
    this.Tbt = t;
  }
  GetClickFunction() {
    return this.Tbt;
  }
  SetAudioId(t) {
    t = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(t);
    this.lCt = t.Path;
  }
  GetAudioPath() {
    return this.lCt;
  }
  SetNeedDelay(t) {
    this.Lbt = t;
  }
  GetNeedDelay() {
    return this.Lbt;
  }
}
exports.CommonSuccessData = CommonSuccessData;
//# sourceMappingURL=CommonSuccessData.js.map