"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CatchSignalDifficulty = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class CatchSignalDifficulty {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Name() {
    return this.name();
  }
  get SpeedRate() {
    return this.speedrate();
  }
  get TapTimeWindow() {
    return this.taptimewindow();
  }
  get PressTimeWindow() {
    return this.presstimewindow();
  }
  get ReleaseTimeWindow() {
    return this.releasetimewindow();
  }
  get TargetCompletion() {
    return this.targetcompletion();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsCatchSignalDifficulty(t, i) {
    return (i || new CatchSignalDifficulty()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  speedrate() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  taptimewindow() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100;
    }
  }
  presstimewindow() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100;
    }
  }
  releasetimewindow() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100;
    }
  }
  targetcompletion() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 80;
    }
  }
}
exports.CatchSignalDifficulty = CatchSignalDifficulty;
//# sourceMappingURL=CatchSignalDifficulty.js.map