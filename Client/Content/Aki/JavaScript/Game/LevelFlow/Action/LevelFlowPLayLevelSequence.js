"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowPlayLevelSequence = undefined;
const Log_1 = require("../../../Core/Common/Log");
const LevelFlowResourceManager_1 = require("../LevelFlowResourceManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowPlayLevelSequence extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.OPt = undefined;
  }
  Init(e) {
    this.OPt = e;
    return this;
  }
  OnExecute() {
    if (this.OPt) {
      if (!this.OPt.LevelSequencePath) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelFlow", 58, "LevelSequence路径为空", ["Context", context]);
        }
        this.FinishExecute(false);
      }
      LevelFlowResourceManager_1.LevelFlowResourceManager.HandleSequence(this.OPt);
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "参数类型错误");
      }
      this.FinishExecute(false);
    }
  }
  LogExecuteInfo() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "执行行为", ["ActionId", this.ActionId], ["ActionName", this.constructor.name], ["LevelSequencePath", this.OPt.LevelSequencePath], ["Mark", this.OPt.Mark]);
    }
  }
}
exports.LevelFlowPlayLevelSequence = LevelFlowPlayLevelSequence;
//# sourceMappingURL=LevelFlowPLayLevelSequence.js.map