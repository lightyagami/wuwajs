"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImmutableMap = undefined;
const Log_1 = require("../Common/Log");
class ImmutableMap extends Map {
  set(e, t) {
    this.ZYa("set");
    return this;
  }
  delete(e) {
    this.ZYa("delete");
    return false;
  }
  clear() {
    this.ZYa("clear");
  }
  ZYa(e) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Core", 62, "ImmutableMap 不允许修改", ["函数名", e]);
    }
  }
}
exports.ImmutableMap = ImmutableMap;
//# sourceMappingURL=ImmutableMap.js.map