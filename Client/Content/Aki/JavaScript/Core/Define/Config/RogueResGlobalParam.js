"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueResGlobalParam = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueResGlobalParam {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get LimitedRoles() {
    return GameUtils_1.GameUtils.ConvertToArray(this.limitedrolesLength(), this.limitedroles, this);
  }
  get EventStartSeqType() {
    return GameUtils_1.GameUtils.ConvertToArray(this.eventstartseqtypeLength(), this.eventstartseqtype, this);
  }
  get EventStartSpineType() {
    return GameUtils_1.GameUtils.ConvertToArray(this.eventstartspinetypeLength(), this.eventstartspinetype, this);
  }
  get GridTakeTipsEventType() {
    return GameUtils_1.GameUtils.ConvertToArray(this.gridtaketipseventtypeLength(), this.gridtaketipseventtype, this);
  }
  get GridTakeSpineEventType() {
    return GameUtils_1.GameUtils.ConvertToArray(this.gridtakespineeventtypeLength(), this.gridtakespineeventtype, this);
  }
  get EventDisappearEventType() {
    return GameUtils_1.GameUtils.ConvertToArray(this.eventdisappeareventtypeLength(), this.eventdisappeareventtype, this);
  }
  get ShowMoodChangeEventType() {
    return GameUtils_1.GameUtils.ConvertToArray(this.showmoodchangeeventtypeLength(), this.showmoodchangeeventtype, this);
  }
  get ShowLvChangeEventType() {
    return GameUtils_1.GameUtils.ConvertToArray(this.showlvchangeeventtypeLength(), this.showlvchangeeventtype, this);
  }
  get ShowCurrencyChangeEventType() {
    return GameUtils_1.GameUtils.ConvertToArray(this.showcurrencychangeeventtypeLength(), this.showcurrencychangeeventtype, this);
  }
  get FocusTime() {
    return this.focustime();
  }
  get MainHelpImageDesc() {
    return GameUtils_1.GameUtils.ConvertToArray(this.mainhelpimagedescLength(), this.mainhelpimagedesc, this);
  }
  get MainHelpImageFig() {
    return GameUtils_1.GameUtils.ConvertToArray(this.mainhelpimagefigLength(), this.mainhelpimagefig, this);
  }
  get MainHelpRuleDesc() {
    return this.mainhelpruledesc();
  }
  get GridValidRangeTolerance() {
    return this.gridvalidrangetolerance();
  }
  get OpenMapViewBlackScreen() {
    return this.openmapviewblackscreen();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRogueResGlobalParam(t, e) {
    return (e || new RogueResGlobalParam()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLimitedrolesAt(t) {
    return this.limitedroles(t);
  }
  limitedroles(t) {
    var e = this.J7.__offset(this.z7, 6);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  limitedrolesLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  limitedrolesArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetEventstartseqtypeAt(t) {
    return this.eventstartseqtype(t);
  }
  eventstartseqtype(t) {
    var e = this.J7.__offset(this.z7, 8);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  eventstartseqtypeLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  eventstartseqtypeArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetEventstartspinetypeAt(t) {
    return this.eventstartspinetype(t);
  }
  eventstartspinetype(t) {
    var e = this.J7.__offset(this.z7, 10);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  eventstartspinetypeLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  eventstartspinetypeArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetGridtaketipseventtypeAt(t) {
    return this.gridtaketipseventtype(t);
  }
  gridtaketipseventtype(t) {
    var e = this.J7.__offset(this.z7, 12);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  gridtaketipseventtypeLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  gridtaketipseventtypeArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetGridtakespineeventtypeAt(t) {
    return this.gridtakespineeventtype(t);
  }
  gridtakespineeventtype(t) {
    var e = this.J7.__offset(this.z7, 14);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  gridtakespineeventtypeLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  gridtakespineeventtypeArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetEventdisappeareventtypeAt(t) {
    return this.eventdisappeareventtype(t);
  }
  eventdisappeareventtype(t) {
    var e = this.J7.__offset(this.z7, 16);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  eventdisappeareventtypeLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  eventdisappeareventtypeArray() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetShowmoodchangeeventtypeAt(t) {
    return this.showmoodchangeeventtype(t);
  }
  showmoodchangeeventtype(t) {
    var e = this.J7.__offset(this.z7, 18);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  showmoodchangeeventtypeLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  showmoodchangeeventtypeArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetShowlvchangeeventtypeAt(t) {
    return this.showlvchangeeventtype(t);
  }
  showlvchangeeventtype(t) {
    var e = this.J7.__offset(this.z7, 20);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  showlvchangeeventtypeLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  showlvchangeeventtypeArray() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetShowcurrencychangeeventtypeAt(t) {
    return this.showcurrencychangeeventtype(t);
  }
  showcurrencychangeeventtype(t) {
    var e = this.J7.__offset(this.z7, 22);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  showcurrencychangeeventtypeLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  showcurrencychangeeventtypeArray() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  focustime() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 500;
    }
  }
  GetMainhelpimagedescAt(t) {
    return this.mainhelpimagedesc(t);
  }
  mainhelpimagedesc(t, e) {
    var i = this.J7.__offset(this.z7, 26);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, e) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  mainhelpimagedescLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMainhelpimagefigAt(t) {
    return this.mainhelpimagefig(t);
  }
  mainhelpimagefig(t, e) {
    var i = this.J7.__offset(this.z7, 28);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, e) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  mainhelpimagefigLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  mainhelpruledesc(t) {
    var e = this.J7.__offset(this.z7, 30);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  gridvalidrangetolerance() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1000;
    }
  }
  openmapviewblackscreen() {
    var t = this.J7.__offset(this.z7, 34);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
}
exports.RogueResGlobalParam = RogueResGlobalParam;
//# sourceMappingURL=RogueResGlobalParam.js.map