"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CombinationAction = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicStringString_1 = require("./SubType/DicStringString");
class CombinationAction {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ActionName() {
    return this.actionname();
  }
  get ActionType() {
    return this.actiontype();
  }
  get PcKeys() {
    return GameUtils_1.GameUtils.ConvertToMap(this.pckeysLength(), this.pckeysKey, this.pckeysValue, this);
  }
  pckeysKey(t) {
    return this.pckeys(t)?.key();
  }
  pckeysValue(t) {
    return this.pckeys(t)?.value();
  }
  get GamepadKeys() {
    return GameUtils_1.GameUtils.ConvertToMap(this.gamepadkeysLength(), this.gamepadkeysKey, this.gamepadkeysValue, this);
  }
  gamepadkeysKey(t) {
    return this.gamepadkeys(t)?.key();
  }
  gamepadkeysValue(t) {
    return this.gamepadkeys(t)?.value();
  }
  get SecondaryKeyValidTime() {
    return this.secondarykeyvalidtime();
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
  static getRootAsCombinationAction(t, i) {
    return (i || new CombinationAction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  actionname(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  actiontype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPckeysAt(t, i) {
    return this.pckeys(t);
  }
  pckeys(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return (i || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  pckeysLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetGamepadkeysAt(t, i) {
    return this.gamepadkeys(t);
  }
  gamepadkeys(t, i) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return (i || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  gamepadkeysLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  secondarykeyvalidtime() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return -1;
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
exports.CombinationAction = CombinationAction;
//# sourceMappingURL=CombinationAction.js.map