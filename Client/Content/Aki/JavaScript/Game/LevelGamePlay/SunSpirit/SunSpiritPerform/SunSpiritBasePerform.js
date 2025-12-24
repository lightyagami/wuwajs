"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SunSpiritBasePerform = undefined;
const Log_1 = require("../../../../Core/Common/Log");
class SunSpiritBasePerform {
  constructor(r) {
    this.SunSpiritData = r;
  }
  Init() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SunSpirit", 39, "日灵: 初始化Perform", ["PerformName", this.constructor.name]);
    }
    var r = this.OnInit();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SunSpirit", 39, "日灵: 初始化Perform结束", ["PerformName", this.constructor.name], ["Result", r]);
    }
    return r;
  }
  OnInit() {
    return true;
  }
  Destroy() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SunSpirit", 39, "日灵: 销毁Perform", ["PerformName", this.constructor.name]);
    }
    this.OnDestroy();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SunSpirit", 39, "日灵: 销毁Perform结束", ["PerformName", this.constructor.name]);
    }
  }
  OnDestroy() {}
}
exports.SunSpiritBasePerform = SunSpiritBasePerform;
//# sourceMappingURL=SunSpiritBasePerform.js.map