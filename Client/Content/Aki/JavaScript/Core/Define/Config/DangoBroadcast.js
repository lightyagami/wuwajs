"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoBroadcast = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class DangoBroadcast {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get GroupStageCheerText1() {
    return this.groupstagecheertext1();
  }
  get GroupStageCheerText2() {
    return this.groupstagecheertext2();
  }
  get GroupStageChampText() {
    return this.groupstagechamptext();
  }
  get AdvanceStageCheerText1() {
    return this.advancestagecheertext1();
  }
  get AdvanceStageCheerText2() {
    return this.advancestagecheertext2();
  }
  get AdvanceStageChampText() {
    return this.advancestagechamptext();
  }
  get FinalStageCheerText1() {
    return this.finalstagecheertext1();
  }
  get FinalStageCheerText2() {
    return this.finalstagecheertext2();
  }
  get FinalStageChampText() {
    return this.finalstagechamptext();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsDangoBroadcast(t, e) {
    return (e || new DangoBroadcast()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  groupstagecheertext1(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  groupstagecheertext2(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  groupstagechamptext(t) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  advancestagecheertext1(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  advancestagecheertext2(t) {
    var e = this.J7.__offset(this.z7, 14);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  advancestagechamptext(t) {
    var e = this.J7.__offset(this.z7, 16);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  finalstagecheertext1(t) {
    var e = this.J7.__offset(this.z7, 18);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  finalstagecheertext2(t) {
    var e = this.J7.__offset(this.z7, 20);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  finalstagechamptext(t) {
    var e = this.J7.__offset(this.z7, 22);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.DangoBroadcast = DangoBroadcast;
//# sourceMappingURL=DangoBroadcast.js.map