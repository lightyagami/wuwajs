"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataLayerConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class DataLayerConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get DataLayer() {
    return this.datalayer();
  }
  get CnName() {
    return this.cnname();
  }
  get LevelId() {
    return this.levelid();
  }
  get InitLoad() {
    return this.initload();
  }
  get OnlyActor() {
    return this.onlyactor();
  }
  get EnableSwitchNavMesh() {
    return this.enableswitchnavmesh();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsDataLayerConfig(t, i) {
    return (i || new DataLayerConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  datalayer(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  cnname(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  levelid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  initload() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  onlyactor() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  enableswitchnavmesh() {
    var t = this.J7.__offset(this.z7, 16);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.DataLayerConfig = DataLayerConfig;
//# sourceMappingURL=DataLayerConfig.js.map