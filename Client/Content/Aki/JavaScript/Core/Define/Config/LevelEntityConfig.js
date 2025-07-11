"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEntityConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntVector_1 = require("./SubType/IntVector");
class LevelEntityConfig {
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
  get BlueprintType() {
    return this.blueprinttype();
  }
  get Name() {
    return this.name();
  }
  get InSleep() {
    return this.insleep();
  }
  get IsHidden() {
    return this.ishidden();
  }
  get AreaId() {
    return this.areaid();
  }
  get IsScaleEnabled() {
    return this.isscaleenabled();
  }
  get Transform() {
    return GameUtils_1.GameUtils.ConvertToArray(this.transformLength(), this.transform, this);
  }
  get ComponentsData() {
    return this.componentsdata();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsLevelEntityConfig(t, i) {
    return (i || new LevelEntityConfig()).__init(t.readInt32(t.position()) + t.position(), t);
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
  blueprinttype(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  insleep() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  ishidden() {
    var t = this.J7.__offset(this.z7, 16);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  areaid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isscaleenabled() {
    var t = this.J7.__offset(this.z7, 20);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  GetTransformAt(t, i) {
    return this.transform(t);
  }
  transform(t, i) {
    var s = this.J7.__offset(this.z7, 22);
    if (s) {
      return (i || new IntVector_1.IntVector()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  transformLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  componentsdata(t) {
    var i = this.J7.__offset(this.z7, 24);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.LevelEntityConfig = LevelEntityConfig;
//# sourceMappingURL=LevelEntityConfig.js.map