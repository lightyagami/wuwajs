"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogCaptureController = undefined;
const Info_1 = require("./Info");
class LogCaptureController {
  static AddCaptureCallback(o) {
    if (o.Callback) {
      LogCaptureController._A++;
      LogCaptureController.RegisterCapture[o.LogLevel] = true;
      LogCaptureController.l9.set(LogCaptureController._A, o);
      if (!LogCaptureController._9.get(o.LogLevel)) {
        LogCaptureController._9.set(o.LogLevel, new Set());
      }
      LogCaptureController._9.get(o.LogLevel).add(LogCaptureController._A);
      return LogCaptureController._A;
    } else {
      return 0;
    }
  }
  static RemoveCaptureCallback(o) {
    var r;
    if (LogCaptureController.l9.has(o)) {
      r = LogCaptureController.l9.get(o).LogLevel;
      LogCaptureController._9.get(r).delete(o);
      LogCaptureController.l9.delete(o);
      LogCaptureController.RegisterCapture[r] = LogCaptureController.l9.size !== 0;
    }
  }
  static LogCapture(o, r, e, t, l) {
    if (LogCaptureController.RegisterCapture[o] && Info_1.Info.IsBuildDevelopmentOrDebug && LogCaptureController._9.get(o)) {
      for (const C of LogCaptureController._9.get(o)) {
        LogCaptureController.l9.get(C)?.Callback(r, e, t, l);
      }
    }
  }
}
(exports.LogCaptureController = LogCaptureController)._A = 0;
LogCaptureController.RegisterCapture = [];
LogCaptureController.l9 = new Map();
LogCaptureController._9 = new Map(); //# sourceMappingURL=LogCaptureController.js.map