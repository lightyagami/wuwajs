"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueWeeklyBF = undefined;
class RogueWeeklyBF {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ExchangeRewardId() {
    return this.exchangerewardid();
  }
  get SilentAreaDetectionId() {
    return this.silentareadetectionid();
  }
  get ShowItemId() {
    return this.showitemid();
  }
  get SortId() {
    return this.sortid();
  }
  get IconId1() {
    return this.iconid1();
  }
  get IconId2() {
    return this.iconid2();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRogueWeeklyBF(t, e) {
    return (e || new RogueWeeklyBF()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  exchangerewardid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  silentareadetectionid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showitemid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  iconid1() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  iconid2() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RogueWeeklyBF = RogueWeeklyBF;
//# sourceMappingURL=RogueWeeklyBF.js.map