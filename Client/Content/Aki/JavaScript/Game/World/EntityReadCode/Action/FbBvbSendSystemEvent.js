"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbBvbSendSystemEvent = void 0;
const UnionBvbEventDataHelper_1 = require("../Common/UnionBvbEventDataHelper");
class FbBvbSendSystemEvent {
  constructor(t) {
    this.FbDataInternal = t, this.YS1 = !1, this.zS1 = void 0
  }
  static Create(t) {
    if (t) return new FbBvbSendSystemEvent(t)
  }
  get EventData() {
    var t, e;
    return !this.YS1 && (this.YS1 = !0, t = this.FbDataInternal.eventDataType(), e = UnionBvbEventDataHelper_1.UnionBvbEventDataHelper.GetUnionBvbEventDataObject(t)) && (this.zS1 = UnionBvbEventDataHelper_1.UnionBvbEventDataHelper.ReadUnionBvbEventData(t, this.FbDataInternal.eventData(e))), this.zS1
  }
}
exports.FbBvbSendSystemEvent = FbBvbSendSystemEvent;
//# sourceMappingURL=FbBvbSendSystemEvent.js.map