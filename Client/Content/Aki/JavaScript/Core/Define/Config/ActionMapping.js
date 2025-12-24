"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionMapping = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class ActionMapping {
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
    return GameUtils_1.GameUtils.ConvertToArray(this.pckeysLength(), this.pckeys, this);
  }
  get FrancePcKeys() {
    return GameUtils_1.GameUtils.ConvertToArray(this.francepckeysLength(), this.francepckeys, this);
  }
  get ThaiPcKeys() {
    return GameUtils_1.GameUtils.ConvertToArray(this.thaipckeysLength(), this.thaipckeys, this);
  }
  get GamepadKeys() {
    return GameUtils_1.GameUtils.ConvertToArray(this.gamepadkeysLength(), this.gamepadkeys, this);
  }
  get MobileIconPath() {
    return this.mobileiconpath();
  }
  get DisplayName() {
    return this.displayname();
  }
  get IsIdleAction() {
    return this.isidleaction();
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
  static getRootAsActionMapping(t, i) {
    return (i || new ActionMapping()).__init(t.readInt32(t.position()) + t.position(), t);
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
  GetPckeysAt(t) {
    return this.pckeys(t);
  }
  pckeys(t, i) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  pckeysLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetFrancepckeysAt(t) {
    return this.francepckeys(t);
  }
  francepckeys(t, i) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  francepckeysLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetThaipckeysAt(t) {
    return this.thaipckeys(t);
  }
  thaipckeys(t, i) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  thaipckeysLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetGamepadkeysAt(t) {
    return this.gamepadkeys(t);
  }
  gamepadkeys(t, i) {
    var s = this.J7.__offset(this.z7, 18);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  gamepadkeysLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  mobileiconpath(t) {
    var i = this.J7.__offset(this.z7, 20);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  displayname(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  isidleaction() {
    var t = this.J7.__offset(this.z7, 24);
    return !!t && !!this.J7.readInt8(this.z7 + t);
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
exports.ActionMapping = ActionMapping;
//# sourceMappingURL=ActionMapping.js.map