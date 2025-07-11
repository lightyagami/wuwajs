"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiViewStorage = undefined;
const Log_1 = require("../../Core/Common/Log");
class UiTsInfo {
  constructor() {
    this.Ctor = undefined;
    this.ResourceId = "";
  }
}
class UiViewStorage {
  static GetUiTsInfo(e) {
    return UiViewStorage.hgr.get(e);
  }
  static RegisterUiTsInfo(e) {
    for (const r of e) {
      var o = r[0];
      try {
        UiViewStorage.hgr.set(o, {
          Ctor: r[1],
          ResourceId: r[2],
          SourceType: r[3] ?? 0
        });
      } catch (e) {
        if (e instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("UiCore", 16, "[RegisterUiTsInfo]流程执行异常 1", e, ["error", e.message], ["ViewName", o]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 16, "[RegisterUiTsInfo]流程执行异常 2", ["ViewName", o], ["error", e]);
        }
        continue;
      }
    }
  }
}
(exports.UiViewStorage = UiViewStorage).hgr = new Map();
//# sourceMappingURL=UiViewStorage.js.map