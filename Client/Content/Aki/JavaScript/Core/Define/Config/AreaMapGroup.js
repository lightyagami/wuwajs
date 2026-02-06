"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaMapGroup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const PosRectangle_1 = require("./SubType/PosRectangle");
class AreaMapGroup {
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
  get BlockBorder() {
    return GameUtils_1.GameUtils.ConvertToArray(this.blockborderLength(), this.blockborder, this);
  }
  get InstanceDungeon() {
    return GameUtils_1.GameUtils.ConvertToArray(this.instancedungeonLength(), this.instancedungeon, this);
  }
  get UnlockCondition() {
    return this.unlockcondition();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsAreaMapGroup(t, s) {
    return (s || new AreaMapGroup()).__init(t.readInt32(t.position()) + t.position(), t);
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
      return 8;
    }
  }
  GetBlockborderAt(t, s) {
    return this.blockborder(t);
  }
  blockborder(t, s) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return (s || new PosRectangle_1.PosRectangle()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  blockborderLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetInstancedungeonAt(t) {
    return this.instancedungeon(t);
  }
  instancedungeon(t) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  instancedungeonLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  instancedungeonArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.AreaMapGroup = AreaMapGroup;
//# sourceMappingURL=AreaMapGroup.js.map