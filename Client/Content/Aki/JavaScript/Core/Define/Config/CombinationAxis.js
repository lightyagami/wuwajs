"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CombinationAxis = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicStringFloat_1 = require("./SubType/DicStringFloat");
const DicStringString_1 = require("./SubType/DicStringString");
class CombinationAxis {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get AxisName() {
    return this.axisname();
  }
  get AxisType() {
    return this.axistype();
  }
  get PcKeyMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.pckeymapLength(), this.pckeymapKey, this.pckeymapValue, this);
  }
  pckeymapKey(t) {
    return this.pckeymap(t)?.key();
  }
  pckeymapValue(t) {
    return this.pckeymap(t)?.value();
  }
  get GamepadKeyMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.gamepadkeymapLength(), this.gamepadkeymapKey, this.gamepadkeymapValue, this);
  }
  gamepadkeymapKey(t) {
    return this.gamepadkeymap(t)?.key();
  }
  gamepadkeymapValue(t) {
    return this.gamepadkeymap(t)?.value();
  }
  get SecondaryKeyScaleMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.secondarykeyscalemapLength(), this.secondarykeyscalemapKey, this.secondarykeyscalemapValue, this);
  }
  secondarykeyscalemapKey(t) {
    return this.secondarykeyscalemap(t)?.key();
  }
  secondarykeyscalemapValue(t) {
    return this.secondarykeyscalemap(t)?.value();
  }
  get MobileIconPath() {
    return this.mobileiconpath();
  }
  get DisplayName() {
    return this.displayname();
  }
  get KeyboardVersion() {
    return this.keyboardversion();
  }
  get GamepadVersion() {
    return this.gamepadversion();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsCombinationAxis(t, i) {
    return (i || new CombinationAxis()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  axisname(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  axistype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPckeymapAt(t, i) {
    return this.pckeymap(t);
  }
  pckeymap(t, i) {
    var e = this.J7.__offset(this.z7, 10);
    if (e) {
      return (i || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  pckeymapLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetGamepadkeymapAt(t, i) {
    return this.gamepadkeymap(t);
  }
  gamepadkeymap(t, i) {
    var e = this.J7.__offset(this.z7, 12);
    if (e) {
      return (i || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  gamepadkeymapLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSecondarykeyscalemapAt(t, i) {
    return this.secondarykeyscalemap(t);
  }
  secondarykeyscalemap(t, i) {
    var e = this.J7.__offset(this.z7, 14);
    if (e) {
      return (i || new DicStringFloat_1.DicStringFloat()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  secondarykeyscalemapLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  mobileiconpath(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  displayname(t) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  keyboardversion() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  gamepadversion() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.CombinationAxis = CombinationAxis;
//# sourceMappingURL=CombinationAxis.js.map