"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeFlowTemplate = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const flow_template_mode_js_1 = require("../fb-action/flow-template-mode.js");
const pos_a_js_1 = require("../fb-action/pos-a.js");
class ChangeFlowTemplate {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsChangeFlowTemplate(t, e) {
    return (e || new ChangeFlowTemplate()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChangeFlowTemplate(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ChangeFlowTemplate()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  templateMode(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return (t || new flow_template_mode_js_1.FlowTemplateMode()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  targetPos(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new pos_a_js_1.PosA()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  actorIdArray(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  actorIdArrayLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  actorIdArrayArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  talkerIds(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  talkerIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  talkerIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  static startChangeFlowTemplate(t) {
    t.startObject(4);
  }
  static addTemplateMode(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTargetPos(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addActorIdArray(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createActorIdArrayVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addInt32(r[t]);
    }
    return e.endVector();
  }
  static startActorIdArrayVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addTalkerIds(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createTalkerIdsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addInt32(r[t]);
    }
    return e.endVector();
  }
  static startTalkerIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endChangeFlowTemplate(t) {
    return t.endObject();
  }
}
exports.ChangeFlowTemplate = ChangeFlowTemplate;
//# sourceMappingURL=change-flow-template.js.map