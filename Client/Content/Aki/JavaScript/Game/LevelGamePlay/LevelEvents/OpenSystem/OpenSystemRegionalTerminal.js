"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemRegionalTerminal = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemRegionalTerminal extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, o) {
    var r = ModelManager_1.ModelManager.RegionalTerminalModel?.GameplayDataMap.get(e.BoardId);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 87, "OpenSystemRegionalTerminal failed, 找不到对应的终端配置数据", ["id", e.BoardId]);
      }
      return false;
    }
    const n = new CustomPromise_1.CustomPromise();
    r.TerminalFunction(e => {
      n.SetResult(e);
    });
    return n.Promise;
  }
  GetViewName(e, o) {}
}
exports.OpenSystemRegionalTerminal = OpenSystemRegionalTerminal;
//# sourceMappingURL=OpenSystemRegionalTerminal.js.map