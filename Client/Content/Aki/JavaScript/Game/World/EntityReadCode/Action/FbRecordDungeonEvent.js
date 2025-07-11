"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRecordDungeonEvent = undefined;
const UnionDungeonEventTypeHelper_1 = require("./UnionDungeonEventTypeHelper");
class FbRecordDungeonEvent {
  constructor(e) {
    this.FbDataInternal = e;
    this.BEh = false;
    this.qEh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbRecordDungeonEvent(e);
    }
  }
  get EventConfig() {
    var e;
    var n;
    if (!this.BEh && (this.BEh = true, e = this.FbDataInternal.eventConfigType(), n = UnionDungeonEventTypeHelper_1.UnionDungeonEventTypeHelper.GetUnionDungeonEventTypeObject(e))) {
      this.qEh = UnionDungeonEventTypeHelper_1.UnionDungeonEventTypeHelper.ReadUnionDungeonEventType(e, this.FbDataInternal.eventConfig(n));
    }
    return this.qEh;
  }
}
exports.FbRecordDungeonEvent = FbRecordDungeonEvent;
//# sourceMappingURL=FbRecordDungeonEvent.js.map