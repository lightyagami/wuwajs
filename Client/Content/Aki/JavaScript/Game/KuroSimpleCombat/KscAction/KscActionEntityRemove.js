"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscActionEntityRemove = undefined;
const KscActionBase_1 = require("./KscActionBase");
class KscActionEntityRemove extends KscActionBase_1.KscActionBase {
  constructor(t, s) {
    super(t);
    this.RemoveReason = undefined;
    this.RemoveReason = s;
  }
  async RunContent() {
    var t = this.KscCtrl.CurSubModel.GetLogicProxy(this.EntityId);
    if (t !== undefined) {
      this.KscCtrl.RemoveEntityImpl(t, this.RemoveReason);
    } else {
      this.Warn("Common", "移除战斗实体时找不到Id", ["creatureId", this.EntityId]);
    }
    this.SetResult();
    await this.Promise?.Promise;
  }
}
exports.KscActionEntityRemove = KscActionEntityRemove;
//# sourceMappingURL=KscActionEntityRemove.js.map