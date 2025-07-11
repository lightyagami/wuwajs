"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StartFlowTemplate = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const flow_template_mode_js_1 = require("../fb-action/flow-template-mode.js");
const pos_a_js_1 = require("../fb-action/pos-a.js");
class StartFlowTemplate {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsStartFlowTemplate(t, r) {
    return (r || new StartFlowTemplate()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStartFlowTemplate(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new StartFlowTemplate()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  templateMode(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return (t || new flow_template_mode_js_1.FlowTemplateMode()).__init(this.bb.__indirect(this.bb_pos + r), this.bb);
    } else {
      return undefined;
    }
  }
  targetPos(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return (t || new pos_a_js_1.PosA()).__init(this.bb.__indirect(this.bb_pos + r), this.bb);
    } else {
      return undefined;
    }
  }
  actorIdArray(t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    if (r) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + r) + t * 4);
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
    var r = this.bb.__offset(this.bb_pos, 10);
    if (r) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + r) + t * 4);
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
  static startStartFlowTemplate(t) {
    t.startObject(4);
  }
  static addTemplateMode(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addTargetPos(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static addActorIdArray(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static createActorIdArrayVector(r, s) {
    r.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      r.addInt32(s[t]);
    }
    return r.endVector();
  }
  static startActorIdArrayVector(t, r) {
    t.startVector(4, r, 4);
  }
  static addTalkerIds(t, r) {
    t.addFieldOffset(3, r, 0);
  }
  static createTalkerIdsVector(r, s) {
    r.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      r.addInt32(s[t]);
    }
    return r.endVector();
  }
  static startTalkerIdsVector(t, r) {
    t.startVector(4, r, 4);
  }
  static endStartFlowTemplate(t) {
    return t.endObject();
  }
}
exports.StartFlowTemplate = StartFlowTemplate;
//# sourceMappingURL=start-flow-template.js.map