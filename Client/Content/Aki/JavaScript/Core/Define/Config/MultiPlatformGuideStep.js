"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiPlatformGuideStep = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MultiPlatformGuideStep {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get KeyboardStepId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.keyboardstepidLength(), this.keyboardstepid, this);
  }
  get GamepadStepId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.gamepadstepidLength(), this.gamepadstepid, this);
  }
  get MobileStepId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.mobilestepidLength(), this.mobilestepid, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMultiPlatformGuideStep(t, i) {
    return (i || new MultiPlatformGuideStep()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetKeyboardstepidAt(t) {
    return this.keyboardstepid(t);
  }
  keyboardstepid(t) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  keyboardstepidLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  keyboardstepidArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetGamepadstepidAt(t) {
    return this.gamepadstepid(t);
  }
  gamepadstepid(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  gamepadstepidLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  gamepadstepidArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetMobilestepidAt(t) {
    return this.mobilestepid(t);
  }
  mobilestepid(t) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  mobilestepidLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  mobilestepidArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.MultiPlatformGuideStep = MultiPlatformGuideStep;
//# sourceMappingURL=MultiPlatformGuideStep.js.map