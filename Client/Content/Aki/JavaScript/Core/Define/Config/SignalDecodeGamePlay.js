"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalDecodeGamePlay = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class SignalDecodeGamePlay {
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
  get SignalData1() {
    return this.signaldata1();
  }
  get SignalData2() {
    return this.signaldata2();
  }
  get SignalData3() {
    return this.signaldata3();
  }
  get SignalData4() {
    return this.signaldata4();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSignalDecodeGamePlay(t, i) {
    return (i || new SignalDecodeGamePlay()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id(t) {
    var i = this.J7.__offset(this.z7, 4);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  signaldata1() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  signaldata2() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  signaldata3() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  signaldata4() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.SignalDecodeGamePlay = SignalDecodeGamePlay;
//# sourceMappingURL=SignalDecodeGamePlay.js.map