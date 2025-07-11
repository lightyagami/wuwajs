"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HotFixUtils = undefined;
const Log_1 = require("../../Core/Common/Log");
class HotFixUtils {
  static EvalScript(script) {
    try {
      const ret = String(eval(script));
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Game", 19, "script evaluated", ["result", ret]);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Game", 19, "evaluate script error", error, ["err", error.name], ["msg", error.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Game", 19, "evaluate script error", ["error", String(error)]);
      }
    }
  }
}
exports.HotFixUtils = HotFixUtils;
//# sourceMappingURL=HotFixUtils.js.map