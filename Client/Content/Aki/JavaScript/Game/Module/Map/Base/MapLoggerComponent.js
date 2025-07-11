"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapLoggerComponent = undefined;
const MapLogger_1 = require("../Misc/MapLogger");
const MapComponent_1 = require("./MapComponent");
class MapLoggerComponent extends MapComponent_1.MapComponent {
  get ComponentType() {
    return 0;
  }
  get EnableLog() {
    return this.PropertyMap.tryGet(0, true);
  }
  set EnableLog(e) {
    this.PropertyMap.set(0, e);
  }
  LogInfo(e, o, ...t) {
    if (this.EnableLog) {
      MapLogger_1.MapLogger.Info(e, o, ...t);
    }
  }
  LogWarn(e, o, ...t) {
    if (this.EnableLog) {
      MapLogger_1.MapLogger.Warn(e, o, ...t);
    }
  }
  LogError(e, o, ...t) {
    if (this.EnableLog) {
      MapLogger_1.MapLogger.Error(e, o, ...t);
    }
  }
}
exports.MapLoggerComponent = MapLoggerComponent;
//# sourceMappingURL=MapLoggerComponent.js.map