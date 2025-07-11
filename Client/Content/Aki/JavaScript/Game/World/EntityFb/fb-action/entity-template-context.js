"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityTemplateContext = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityTemplateContext {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsEntityTemplateContext(t, e) {
    return (e || new EntityTemplateContext()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityTemplateContext(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new EntityTemplateContext()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  id(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startEntityTemplateContext(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addId(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endEntityTemplateContext(t) {
    return t.endObject();
  }
  static createEntityTemplateContext(t, e, i) {
    EntityTemplateContext.startEntityTemplateContext(t);
    EntityTemplateContext.addType(t, e);
    EntityTemplateContext.addId(t, i);
    return EntityTemplateContext.endEntityTemplateContext(t);
  }
}
exports.EntityTemplateContext = EntityTemplateContext;
//# sourceMappingURL=entity-template-context.js.map