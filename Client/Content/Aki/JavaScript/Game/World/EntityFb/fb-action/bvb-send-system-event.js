"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbSendSystemEvent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_bvb_event_data_js_1 = require("../fb-common/union-bvb-event-data.js");
class BvbSendSystemEvent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsBvbSendSystemEvent(t, e) {
    return (e || new BvbSendSystemEvent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBvbSendSystemEvent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new BvbSendSystemEvent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  eventDataType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_bvb_event_data_js_1.UnionBvbEventData.NONE;
    }
  }
  eventData(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startBvbSendSystemEvent(t) {
    t.startObject(2);
  }
  static addEventDataType(t, e) {
    t.addFieldInt8(0, e, union_bvb_event_data_js_1.UnionBvbEventData.NONE);
  }
  static addEventData(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endBvbSendSystemEvent(t) {
    return t.endObject();
  }
  static createBvbSendSystemEvent(t, e, n) {
    BvbSendSystemEvent.startBvbSendSystemEvent(t);
    BvbSendSystemEvent.addEventDataType(t, e);
    BvbSendSystemEvent.addEventData(t, n);
    return BvbSendSystemEvent.endBvbSendSystemEvent(t);
  }
}
exports.BvbSendSystemEvent = BvbSendSystemEvent;
//# sourceMappingURL=bvb-send-system-event.js.map