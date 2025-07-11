"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityVoxelInfo = undefined;
class EntityVoxelInfo {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get MapId() {
    return this.mapid();
  }
  get EntityId() {
    return this.entityid();
  }
  get EnvType() {
    return this.envtype();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsEntityVoxelInfo(t, i) {
    return (i || new EntityVoxelInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  entityid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  envtype() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.EntityVoxelInfo = EntityVoxelInfo;
//# sourceMappingURL=EntityVoxelInfo.js.map