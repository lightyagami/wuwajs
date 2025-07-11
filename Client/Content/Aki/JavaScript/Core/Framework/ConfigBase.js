"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigBase = undefined;
class ConfigBase {
  Init() {
    return this.OnInit();
  }
  Clear() {
    return this.OnClear();
  }
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
}
exports.ConfigBase = ConfigBase;
//# sourceMappingURL=ConfigBase.js.map