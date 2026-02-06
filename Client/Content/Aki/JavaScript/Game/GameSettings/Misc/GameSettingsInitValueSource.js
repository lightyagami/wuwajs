"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameSettingsInitValueSource = undefined;
const Log_1 = require("../../../Core/Common/Log");
const GameSettingsDefine_1 = require("../GameSettingsDefine");
class GameSettingsInitValueSource {
  constructor(e) {
    this.awi = e;
    this.mac = new Map();
  }
  CacheValue(e, t) {
    var i;
    if (this.mac.has(t)) {
      if ((i = this.mac.get(t)) === e) {
        return undefined;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GameSettings", 64, "收集设置数据时，出现来源重复且值不一致。当前数据弃置", ["functionId", this.awi], ["sourceType", t], ["existValue", i], ["newValue", e]);
        }
        return;
      }
    }
    this.mac.set(t, e);
  }
  get ValidInitValue() {
    for (const t of GameSettingsDefine_1.gameSettingsInitSourceTypePriority) {
      var e = this.mac.get(t);
      if (e !== undefined) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("GameSettings", 64, "拿到ValidInitValue", ["functionId", this.awi], ["sourceType", t], ["value", e]);
        }
        return e;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GameSettings", 64, "不能获得有效的数据缓存，返回undefined", ["functionId", this.awi]);
    }
  }
}
exports.GameSettingsInitValueSource = GameSettingsInitValueSource;
//# sourceMappingURL=GameSettingsInitValueSource.js.map