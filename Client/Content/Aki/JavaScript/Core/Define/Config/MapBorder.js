"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapBorder = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MapBorder {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get BorderId() {
    return this.borderid();
  }
  get MapId() {
    return this.mapid();
  }
  get InstanceDungeonId() {
    return this.instancedungeonid();
  }
  get GravityFlip() {
    return this.gravityflip();
  }
  get instanceDungeonIdMapType() {
    return this.instancedungeonidmaptype();
  }
  get ConditionId() {
    return this.conditionid();
  }
  get PrefabPath() {
    return this.prefabpath();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMapBorder(t, i) {
    return (i || new MapBorder()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  borderid() {
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
  instancedungeonid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  gravityflip() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  instancedungeonidmaptype() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditionid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  prefabpath(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.MapBorder = MapBorder;
//# sourceMappingURL=MapBorder.js.map