"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendNpcMail = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SendNpcMail {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSendNpcMail(t, e) {
    return (e || new SendNpcMail()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSendNpcMail(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SendNpcMail()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  mailId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startSendNpcMail(t) {
    t.startObject(1);
  }
  static addMailId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endSendNpcMail(t) {
    return t.endObject();
  }
  static createSendNpcMail(t, e) {
    SendNpcMail.startSendNpcMail(t);
    SendNpcMail.addMailId(t, e);
    return SendNpcMail.endSendNpcMail(t);
  }
}
exports.SendNpcMail = SendNpcMail;
//# sourceMappingURL=send-npc-mail.js.map