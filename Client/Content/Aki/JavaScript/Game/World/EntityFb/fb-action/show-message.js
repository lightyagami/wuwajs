"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowMessage = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ShowMessage {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, s) {
    this.bb_pos = e;
    this.bb = s;
    return this;
  }
  static getRootAsShowMessage(e, s) {
    return (s || new ShowMessage()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsShowMessage(e, s) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new ShowMessage()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  content(e) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, e);
    } else {
      return undefined;
    }
  }
  static startShowMessage(e) {
    e.startObject(1);
  }
  static addContent(e, s) {
    e.addFieldOffset(0, s, 0);
  }
  static endShowMessage(e) {
    return e.endObject();
  }
  static createShowMessage(e, s) {
    ShowMessage.startShowMessage(e);
    ShowMessage.addContent(e, s);
    return ShowMessage.endShowMessage(e);
  }
}
exports.ShowMessage = ShowMessage;
//# sourceMappingURL=show-message.js.map