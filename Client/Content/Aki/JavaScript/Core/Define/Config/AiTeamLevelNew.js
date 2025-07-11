"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiTeamLevelNew = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const FloatRange_1 = require("./SubType/FloatRange");
class AiTeamLevelNew {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get PositionId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.positionidLength(), this.positionid, this);
  }
  get AllocationPeriodic() {
    return this.allocationperiodic();
  }
  get AttackerNum() {
    return this.attackernum();
  }
  get AttackCountDown() {
    return this.attackcountdown();
  }
  get NoAttackCountDown() {
    return this.noattackcountdown();
  }
  get BeAttackCountDown() {
    return this.beattackcountdown();
  }
  get EliteRatio() {
    return GameUtils_1.GameUtils.ConvertToArray(this.eliteratioLength(), this.eliteratio, this);
  }
  get RangeRatio() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rangeratioLength(), this.rangeratio, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsAiTeamLevelNew(t, i) {
    return (i || new AiTeamLevelNew()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  GetPositionidAt(t) {
    return this.positionid(t);
  }
  positionid(t) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  positionidLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  positionidArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  allocationperiodic(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  attackernum() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 2;
    }
  }
  attackcountdown(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  noattackcountdown(t) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  beattackcountdown(t) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  GetEliteratioAt(t) {
    return this.eliteratio(t);
  }
  eliteratio(t) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  eliteratioLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  eliteratioArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetRangeratioAt(t) {
    return this.rangeratio(t);
  }
  rangeratio(t) {
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  rangeratioLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  rangeratioArray() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.AiTeamLevelNew = AiTeamLevelNew;
//# sourceMappingURL=AiTeamLevelNew.js.map