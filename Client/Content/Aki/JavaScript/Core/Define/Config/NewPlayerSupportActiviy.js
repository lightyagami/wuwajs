"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewPlayerSupportActiviy = undefined;
class NewPlayerSupportActiviy {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ContinueDays() {
    return this.continuedays();
  }
  get EnableTime() {
    return this.enabletime();
  }
  get EnableMaxLv() {
    return this.enablemaxlv();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsNewPlayerSupportActiviy(t, i) {
    return (i || new NewPlayerSupportActiviy()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  continuedays() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  enabletime() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  enablemaxlv() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
}
exports.NewPlayerSupportActiviy = NewPlayerSupportActiviy;
//# sourceMappingURL=NewPlayerSupportActiviy.js.map