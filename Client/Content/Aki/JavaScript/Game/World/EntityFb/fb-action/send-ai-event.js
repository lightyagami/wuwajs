"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendAiEvent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SendAiEvent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSendAiEvent(t, e) {
    return (e || new SendAiEvent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSendAiEvent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SendAiEvent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  eventType(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startSendAiEvent(t) {
    t.startObject(2);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addEventType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endSendAiEvent(t) {
    return t.endObject();
  }
  static createSendAiEvent(t, e, i) {
    SendAiEvent.startSendAiEvent(t);
    SendAiEvent.addEntityId(t, e);
    SendAiEvent.addEventType(t, i);
    return SendAiEvent.endSendAiEvent(t);
  }
}
exports.SendAiEvent = SendAiEvent;
//# sourceMappingURL=send-ai-event.js.map