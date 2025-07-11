"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBvbSendSystemEvent = undefined;
const UnionBvbEventDataHelper_1 = require("../Common/UnionBvbEventDataHelper");
class FbBvbSendSystemEvent {
  constructor(t) {
    this.FbDataInternal = t;
    this.yM1 = false;
    this.SM1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBvbSendSystemEvent(t);
    }
  }
  get EventData() {
    var t;
    var e;
    if (!this.yM1 && (this.yM1 = true, t = this.FbDataInternal.eventDataType(), e = UnionBvbEventDataHelper_1.UnionBvbEventDataHelper.GetUnionBvbEventDataObject(t))) {
      this.SM1 = UnionBvbEventDataHelper_1.UnionBvbEventDataHelper.ReadUnionBvbEventData(t, this.FbDataInternal.eventData(e));
    }
    return this.SM1;
  }
}
exports.FbBvbSendSystemEvent = FbBvbSendSystemEvent;
//# sourceMappingURL=FbBvbSendSystemEvent.js.map