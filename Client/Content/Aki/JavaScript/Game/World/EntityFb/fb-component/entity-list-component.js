"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityListComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityListComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsEntityListComponent(t, i) {
    return (i || new EntityListComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityListComponent(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new EntityListComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startEntityListComponent(t) {
    t.startObject(1);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static endEntityListComponent(t) {
    return t.endObject();
  }
  static createEntityListComponent(t, i) {
    EntityListComponent.startEntityListComponent(t);
    EntityListComponent.addDisabled(t, i);
    return EntityListComponent.endEntityListComponent(t);
  }
}
exports.EntityListComponent = EntityListComponent;
//# sourceMappingURL=entity-list-component.js.map