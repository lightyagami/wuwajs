"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordDungeonEvent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_dungeon_event_type_js_1 = require("../fb-action/union-dungeon-event-type.js");
class RecordDungeonEvent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, n) {
    this.bb_pos = e;
    this.bb = n;
    return this;
  }
  static getRootAsRecordDungeonEvent(e, n) {
    return (n || new RecordDungeonEvent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsRecordDungeonEvent(e, n) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (n || new RecordDungeonEvent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  eventConfigType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_dungeon_event_type_js_1.UnionDungeonEventType.NONE;
    }
  }
  eventConfig(e) {
    var n = this.bb.__offset(this.bb_pos, 6);
    if (n) {
      return this.bb.__union(e, this.bb_pos + n);
    } else {
      return undefined;
    }
  }
  static startRecordDungeonEvent(e) {
    e.startObject(2);
  }
  static addEventConfigType(e, n) {
    e.addFieldInt8(0, n, union_dungeon_event_type_js_1.UnionDungeonEventType.NONE);
  }
  static addEventConfig(e, n) {
    e.addFieldOffset(1, n, 0);
  }
  static endRecordDungeonEvent(e) {
    return e.endObject();
  }
  static createRecordDungeonEvent(e, n, t) {
    RecordDungeonEvent.startRecordDungeonEvent(e);
    RecordDungeonEvent.addEventConfigType(e, n);
    RecordDungeonEvent.addEventConfig(e, t);
    return RecordDungeonEvent.endRecordDungeonEvent(e);
  }
}
exports.RecordDungeonEvent = RecordDungeonEvent;
//# sourceMappingURL=record-dungeon-event.js.map