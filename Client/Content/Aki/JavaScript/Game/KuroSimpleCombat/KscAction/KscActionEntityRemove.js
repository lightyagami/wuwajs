"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscActionEntityRemove = undefined;
const KscActionBase_1 = require("./KscActionBase");
class KscActionEntityRemove extends KscActionBase_1.KscActionBase {
  constructor(t, s, i = -1) {
    super(t);
    this.RemoveReason = undefined;
    this.RemoveReasonType = -1;
    this.RemoveReason = s;
    this.RemoveReasonType = i;
  }
  async RunContent() {
    var t = this.KscCtrl.CurSubModel.GetLogicProxy(this.EntityId);
    if (t !== undefined) {
      if (this.RemoveReason) {
        this.KscCtrl.RemoveEntityImpl(t, this.RemoveReason);
      } else {
        this.KscCtrl.RemoveEntityImplByReasonType(t, this.RemoveReasonType);
      }
    } else {
      this.Warn("Common", "移除战斗实体时找不到Id", ["creatureId", this.EntityId]);
    }
    this.SetResult();
    await this.Promise?.Promise;
  }
}
exports.KscActionEntityRemove = KscActionEntityRemove;
//# sourceMappingURL=KscActionEntityRemove.js.map