"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderBookPage = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class RenderBookPage {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsRenderBookPage(e, t) {
    return (t || new RenderBookPage()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsRenderBookPage(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new RenderBookPage()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  radius() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  centerTargetType() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_target_entity_js_1.UnionTargetEntity.NONE;
    }
  }
  centerTarget(e) {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  akEvent(e) {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startRenderBookPage(e) {
    e.startObject(5);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addRadius(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addCenterTargetType(e, t) {
    e.addFieldInt8(2, t, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addCenterTarget(e, t) {
    e.addFieldOffset(3, t, 0);
  }
  static addAkEvent(e, t) {
    e.addFieldOffset(4, t, 0);
  }
  static endRenderBookPage(e) {
    return e.endObject();
  }
  static createRenderBookPage(e, t, r, i, s, a) {
    RenderBookPage.startRenderBookPage(e);
    RenderBookPage.addType(e, t);
    RenderBookPage.addRadius(e, r);
    RenderBookPage.addCenterTargetType(e, i);
    RenderBookPage.addCenterTarget(e, s);
    RenderBookPage.addAkEvent(e, a);
    return RenderBookPage.endRenderBookPage(e);
  }
}
exports.RenderBookPage = RenderBookPage;
//# sourceMappingURL=render-book-page.js.map