"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CombinationAction = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
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
  get ExclusiveType() {
    return this.exclusivetype();
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
  get FrancePcKeys() {
    return GameUtils_1.GameUtils.ConvertToMap(this.francepckeysLength(), this.francepckeysKey, this.francepckeysValue, this);
  }
  francepckeysKey(t) {
    return this.francepckeys(t)?.key();
  }
  francepckeysValue(t) {
    return this.francepckeys(t)?.value();
  }
  get ThaiPcKeys() {
    return GameUtils_1.GameUtils.ConvertToMap(this.thaipckeysLength(), this.thaipckeysKey, this.thaipckeysValue, this);
  }
  thaipckeysKey(t) {
    return this.thaipckeys(t)?.key();
  }
  thaipckeysValue(t) {
    return this.thaipckeys(t)?.value();
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
  get KeyboardVersionMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.keyboardversionmapLength(), this.keyboardversionmapKey, this.keyboardversionmapValue, this);
  }
  keyboardversionmapKey(t) {
    return this.keyboardversionmap(t)?.key();
  }
  keyboardversionmapValue(t) {
    return this.keyboardversionmap(t)?.value();
  }
  get GamepadVersion() {
    return this.gamepadversion();
  }
  get GamepadVersionMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.gamepadversionmapLength(), this.gamepadversionmapKey, this.gamepadversionmapValue, this);
  }
  gamepadversionmapKey(t) {
    return this.gamepadversionmap(t)?.key();
  }
  gamepadversionmapValue(t) {
    return this.gamepadversionmap(t)?.value();
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
  exclusivetype() {
    var t = this.J7.__offset(this.z7, 10);
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
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return (i || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  pckeysLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetFrancepckeysAt(t, i) {
    return this.francepckeys(t);
  }
  francepckeys(t, i) {
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return (i || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  francepckeysLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetThaipckeysAt(t, i) {
    return this.thaipckeys(t);
  }
  thaipckeys(t, i) {
    var s = this.J7.__offset(this.z7, 16);
    if (s) {
      return (i || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  thaipckeysLength() {
    var t = this.J7.__offset(this.z7, 16);
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
    var s = this.J7.__offset(this.z7, 18);
    if (s) {
      return (i || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  gamepadkeysLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  secondarykeyvalidtime() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return -1;
    }
  }
  mobileiconpath(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  displayname(t) {
    var i = this.J7.__offset(this.z7, 24);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  keyboardversion() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetKeyboardversionmapAt(t, i) {
    return this.keyboardversionmap(t);
  }
  keyboardversionmap(t, i) {
    var s = this.J7.__offset(this.z7, 28);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  keyboardversionmapLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  gamepadversion() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetGamepadversionmapAt(t, i) {
    return this.gamepadversionmap(t);
  }
  gamepadversionmap(t, i) {
    var s = this.J7.__offset(this.z7, 32);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  gamepadversionmapLength() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.CombinationAction = CombinationAction;
//# sourceMappingURL=CombinationAction.js.map