"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchActionType = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicStringString_1 = require("./SubType/DicStringString");
class FloroRanchActionType {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Param1() {
    return GameUtils_1.GameUtils.ConvertToMap(this.param1Length(), this.param1Key, this.param1Value, this);
  }
  param1Key(t) {
    return this.param1(t)?.key();
  }
  param1Value(t) {
    return this.param1(t)?.value();
  }
  get Param2() {
    return GameUtils_1.GameUtils.ConvertToMap(this.param2Length(), this.param2Key, this.param2Value, this);
  }
  param2Key(t) {
    return this.param2(t)?.key();
  }
  param2Value(t) {
    return this.param2(t)?.value();
  }
  get Param3() {
    return GameUtils_1.GameUtils.ConvertToMap(this.param3Length(), this.param3Key, this.param3Value, this);
  }
  param3Key(t) {
    return this.param3(t)?.key();
  }
  param3Value(t) {
    return this.param3(t)?.value();
  }
  get Param4() {
    return GameUtils_1.GameUtils.ConvertToMap(this.param4Length(), this.param4Key, this.param4Value, this);
  }
  param4Key(t) {
    return this.param4(t)?.key();
  }
  param4Value(t) {
    return this.param4(t)?.value();
  }
  get Param5() {
    return GameUtils_1.GameUtils.ConvertToMap(this.param5Length(), this.param5Key, this.param5Value, this);
  }
  param5Key(t) {
    return this.param5(t)?.key();
  }
  param5Value(t) {
    return this.param5(t)?.value();
  }
  get Param6() {
    return GameUtils_1.GameUtils.ConvertToMap(this.param6Length(), this.param6Key, this.param6Value, this);
  }
  param6Key(t) {
    return this.param6(t)?.key();
  }
  param6Value(t) {
    return this.param6(t)?.value();
  }
  get Param7() {
    return GameUtils_1.GameUtils.ConvertToMap(this.param7Length(), this.param7Key, this.param7Value, this);
  }
  param7Key(t) {
    return this.param7(t)?.key();
  }
  param7Value(t) {
    return this.param7(t)?.value();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsFloroRanchActionType(t, r) {
    return (r || new FloroRanchActionType()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetParam1At(t, r) {
    return this.param1(t);
  }
  param1(t, r) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return (r || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  param1Length() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetParam2At(t, r) {
    return this.param2(t);
  }
  param2(t, r) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return (r || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  param2Length() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetParam3At(t, r) {
    return this.param3(t);
  }
  param3(t, r) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return (r || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  param3Length() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetParam4At(t, r) {
    return this.param4(t);
  }
  param4(t, r) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return (r || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  param4Length() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetParam5At(t, r) {
    return this.param5(t);
  }
  param5(t, r) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return (r || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  param5Length() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetParam6At(t, r) {
    return this.param6(t);
  }
  param6(t, r) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return (r || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  param6Length() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetParam7At(t, r) {
    return this.param7(t);
  }
  param7(t, r) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return (r || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  param7Length() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.FloroRanchActionType = FloroRanchActionType;
//# sourceMappingURL=FloroRanchActionType.js.map