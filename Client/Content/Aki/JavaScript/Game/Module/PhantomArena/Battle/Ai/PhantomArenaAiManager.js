"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaAiManager = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Queue_1 = require("../../../../../Core/Container/Queue");
class PhantomArenaAiManager {
  constructor(e) {
    this.BattleProxy = e;
    this.gWt = new Queue_1.Queue();
    this.IsClear = false;
    this.ExecCount = 0;
  }
  SetOperationList(e) {
    for (const t of e) {
      this.gWt.Push(t);
    }
    this.ExecCount = 0;
  }
  async ExecuteAllOperation() {
    var e;
    if (!this.gWt.Empty) {
      e = this.gWt.Pop();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "开始执行Npc操作", ["operationName", e.constructor.name]);
      }
      await e.ExecuteAiOperation(this.BattleProxy);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "完成执行Npc操作", ["operationName", e.constructor.name]);
      }
      this.ExecCount++;
      await this.ExecuteAllOperation();
    }
  }
  ClearAllOperation() {
    this.gWt.Clear();
  }
  Clear() {
    this.gWt.Clear();
    this.IsClear = true;
  }
}
exports.PhantomArenaAiManager = PhantomArenaAiManager;
//# sourceMappingURL=PhantomArenaAiManager.js.map