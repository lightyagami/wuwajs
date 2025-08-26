"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelCustomPrimitiveData = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class LevelCustomPrimitiveData {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get PbDataId() {
    return this.pbdataid();
  }
  get CustomPrimitiveDataIndex0() {
    return GameUtils_1.GameUtils.ConvertToArray(this.customprimitivedataindex0Length(), this.customprimitivedataindex0, this);
  }
  get CustomPrimitiveDataIndex1() {
    return GameUtils_1.GameUtils.ConvertToArray(this.customprimitivedataindex1Length(), this.customprimitivedataindex1, this);
  }
  get CustomPrimitiveDataIndex2() {
    return GameUtils_1.GameUtils.ConvertToArray(this.customprimitivedataindex2Length(), this.customprimitivedataindex2, this);
  }
  get CustomPrimitiveDataIndex3() {
    return GameUtils_1.GameUtils.ConvertToArray(this.customprimitivedataindex3Length(), this.customprimitivedataindex3, this);
  }
  get CustomPrimitiveDataIndex4() {
    return GameUtils_1.GameUtils.ConvertToArray(this.customprimitivedataindex4Length(), this.customprimitivedataindex4, this);
  }
  get CustomPrimitiveDataIndex5() {
    return GameUtils_1.GameUtils.ConvertToArray(this.customprimitivedataindex5Length(), this.customprimitivedataindex5, this);
  }
  get CustomPrimitiveDataIndex6() {
    return GameUtils_1.GameUtils.ConvertToArray(this.customprimitivedataindex6Length(), this.customprimitivedataindex6, this);
  }
  get CustomPrimitiveDataIndex7() {
    return GameUtils_1.GameUtils.ConvertToArray(this.customprimitivedataindex7Length(), this.customprimitivedataindex7, this);
  }
  get CustomPrimitiveDataIndex8() {
    return GameUtils_1.GameUtils.ConvertToArray(this.customprimitivedataindex8Length(), this.customprimitivedataindex8, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsLevelCustomPrimitiveData(t, i) {
    return (i || new LevelCustomPrimitiveData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  pbdataid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetCustomprimitivedataindex0At(t) {
    return this.customprimitivedataindex0(t);
  }
  customprimitivedataindex0(t) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  customprimitivedataindex0Length() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  customprimitivedataindex0Array() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetCustomprimitivedataindex1At(t) {
    return this.customprimitivedataindex1(t);
  }
  customprimitivedataindex1(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  customprimitivedataindex1Length() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  customprimitivedataindex1Array() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetCustomprimitivedataindex2At(t) {
    return this.customprimitivedataindex2(t);
  }
  customprimitivedataindex2(t) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  customprimitivedataindex2Length() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  customprimitivedataindex2Array() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetCustomprimitivedataindex3At(t) {
    return this.customprimitivedataindex3(t);
  }
  customprimitivedataindex3(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  customprimitivedataindex3Length() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  customprimitivedataindex3Array() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetCustomprimitivedataindex4At(t) {
    return this.customprimitivedataindex4(t);
  }
  customprimitivedataindex4(t) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  customprimitivedataindex4Length() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  customprimitivedataindex4Array() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetCustomprimitivedataindex5At(t) {
    return this.customprimitivedataindex5(t);
  }
  customprimitivedataindex5(t) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  customprimitivedataindex5Length() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  customprimitivedataindex5Array() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetCustomprimitivedataindex6At(t) {
    return this.customprimitivedataindex6(t);
  }
  customprimitivedataindex6(t) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  customprimitivedataindex6Length() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  customprimitivedataindex6Array() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetCustomprimitivedataindex7At(t) {
    return this.customprimitivedataindex7(t);
  }
  customprimitivedataindex7(t) {
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  customprimitivedataindex7Length() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  customprimitivedataindex7Array() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetCustomprimitivedataindex8At(t) {
    return this.customprimitivedataindex8(t);
  }
  customprimitivedataindex8(t) {
    var i = this.J7.__offset(this.z7, 22);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  customprimitivedataindex8Length() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  customprimitivedataindex8Array() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.LevelCustomPrimitiveData = LevelCustomPrimitiveData;
//# sourceMappingURL=LevelCustomPrimitiveData.js.map