"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaAiManager = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  Queue_1 = require("../../../../../Core/Container/Queue");
class PhantomArenaAiManager {
  constructor(e) {
    this.BattleProxy = e, this.gWt = new Queue_1.Queue, this.IsClear = !1
  }
  SetOperationList(e) {
    for (const t of e) this.gWt.Push(t)
  }
  async ExecuteAllOperation() {
    var e;
    this.gWt.Empty || (e = this.gWt.Pop(), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "开始执行Npc操作", ["operationName", e.constructor.name]), await e.ExecuteAiOperation(this.BattleProxy), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "完成执行Npc操作", ["operationName", e.constructor.name]), await this.ExecuteAllOperation())
  }
  ClearAllOperation() {
    this.gWt.Clear()
  }
  Clear() {
    this.gWt.Clear(), this.IsClear = !0
  }
}
exports.PhantomArenaAiManager = PhantomArenaAiManager;
//# sourceMappingURL=PhantomArenaAiManager.js.map