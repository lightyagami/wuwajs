"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HardnessMode = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class HardnessMode {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ReductionData() {
    return GameUtils_1.GameUtils.ConvertToArray(this.reductiondataLength(), this.reductiondata, this);
  }
  get AttackTypeData() {
    return GameUtils_1.GameUtils.ConvertToArray(this.attacktypedataLength(), this.attacktypedata, this);
  }
  get CorrectData() {
    return GameUtils_1.GameUtils.ConvertToArray(this.correctdataLength(), this.correctdata, this);
  }
  get WeaponReduction() {
    return GameUtils_1.GameUtils.ConvertToArray(this.weaponreductionLength(), this.weaponreduction, this);
  }
  get SkillTypeParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skilltypeparamLength(), this.skilltypeparam, this);
  }
  get Percent() {
    return this.percent();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsHardnessMode(t, s) {
    return (s || new HardnessMode()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetReductiondataAt(t) {
    return this.reductiondata(t);
  }
  reductiondata(t) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  reductiondataLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  reductiondataArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetAttacktypedataAt(t) {
    return this.attacktypedata(t);
  }
  attacktypedata(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  attacktypedataLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  attacktypedataArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetCorrectdataAt(t) {
    return this.correctdata(t);
  }
  correctdata(t) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  correctdataLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  correctdataArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetWeaponreductionAt(t) {
    return this.weaponreduction(t);
  }
  weaponreduction(t) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  weaponreductionLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  weaponreductionArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetSkilltypeparamAt(t) {
    return this.skilltypeparam(t);
  }
  skilltypeparam(t) {
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  skilltypeparamLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  skilltypeparamArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  percent() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.HardnessMode = HardnessMode;
//# sourceMappingURL=HardnessMode.js.map