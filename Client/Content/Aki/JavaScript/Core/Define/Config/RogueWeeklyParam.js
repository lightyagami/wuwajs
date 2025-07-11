"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueWeeklyParam = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class RogueWeeklyParam {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RoguelikeSettleBgS() {
    return this.roguelikesettlebgs();
  }
  get RoguelikeSettleBgNormal() {
    return this.roguelikesettlebgnormal();
  }
  get RoguelikeRoomFloatTipsNoHeadIcon() {
    return this.roguelikeroomfloattipsnoheadicon();
  }
  get RoguelikeRoomFloatTipsSpecialIcon() {
    return this.roguelikeroomfloattipsspecialicon();
  }
  get RoguelikeSettleS() {
    return this.roguelikesettles();
  }
  get RoguelikeSettleA() {
    return this.roguelikesettlea();
  }
  get RoguelikeSettleB() {
    return this.roguelikesettleb();
  }
  get RoguelikeSettleC() {
    return this.roguelikesettlec();
  }
  get PointItem() {
    return this.pointitem();
  }
  get PointItemMaxCount() {
    return this.pointitemmaxcount();
  }
  get TokenItem() {
    return this.tokenitem();
  }
  get WeekTokenMaxCount() {
    return this.weektokenmaxcount();
  }
  get InsideCurrency() {
    return this.insidecurrency();
  }
  get DungeonList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.dungeonlistLength(), this.dungeonlist, this);
  }
  get ValidRoleOpenTimeMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.validroleopentimemapLength(), this.validroleopentimemapKey, this.validroleopentimemapValue, this);
  }
  validroleopentimemapKey(t) {
    return this.validroleopentimemap(t)?.key();
  }
  validroleopentimemapValue(t) {
    return this.validroleopentimemap(t)?.value();
  }
  get DungeonRoleOpenTimeMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.dungeonroleopentimemapLength(), this.dungeonroleopentimemapKey, this.dungeonroleopentimemapValue, this);
  }
  dungeonroleopentimemapKey(t) {
    return this.dungeonroleopentimemap(t)?.key();
  }
  dungeonroleopentimemapValue(t) {
    return this.dungeonroleopentimemap(t)?.value();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRogueWeeklyParam(t, e) {
    return (e || new RogueWeeklyParam()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roguelikesettlebgs(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  roguelikesettlebgnormal(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  roguelikeroomfloattipsnoheadicon(t) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  roguelikeroomfloattipsspecialicon(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  roguelikesettles() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roguelikesettlea() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roguelikesettleb() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roguelikesettlec() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  pointitem() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  pointitemmaxcount() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tokenitem() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  weektokenmaxcount() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  insidecurrency() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDungeonlistAt(t) {
    return this.dungeonlist(t);
  }
  dungeonlist(t) {
    var e = this.J7.__offset(this.z7, 32);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  dungeonlistLength() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  dungeonlistArray() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetValidroleopentimemapAt(t, e) {
    return this.validroleopentimemap(t);
  }
  validroleopentimemap(t, e) {
    var i = this.J7.__offset(this.z7, 34);
    if (i) {
      return (e || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  validroleopentimemapLength() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDungeonroleopentimemapAt(t, e) {
    return this.dungeonroleopentimemap(t);
  }
  dungeonroleopentimemap(t, e) {
    var i = this.J7.__offset(this.z7, 36);
    if (i) {
      return (e || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  dungeonroleopentimemapLength() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RogueWeeklyParam = RogueWeeklyParam;
//# sourceMappingURL=RogueWeeklyParam.js.map