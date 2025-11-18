"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterBattleConf = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MonsterBattleConf {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RoleMappingId() {
    return this.rolemappingid();
  }
  get ExecutionId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.executionidLength(), this.executionid, this);
  }
  get ExecutionRadius() {
    return this.executionradius();
  }
  get ForceLockOnCoefficient() {
    return this.forcelockoncoefficient();
  }
  get MonsterSizeId() {
    return this.monstersizeid();
  }
  get MonsterPerformanceId() {
    return this.monsterperformanceid();
  }
  get FixedLocation() {
    return this.fixedlocation();
  }
  get WeaknessExploitWeapon() {
    return this.weaknessexploitweapon();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMonsterBattleConf(t, i) {
    return (i || new MonsterBattleConf()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rolemappingid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetExecutionidAt(t) {
    return this.executionid(t);
  }
  executionid(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  executionidLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  executionidArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  executionradius() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 3;
    }
  }
  forcelockoncoefficient() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  monstersizeid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  monsterperformanceid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  fixedlocation() {
    var t = this.J7.__offset(this.z7, 18);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  weaknessexploitweapon() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MonsterBattleConf = MonsterBattleConf;
//# sourceMappingURL=MonsterBattleConf.js.map