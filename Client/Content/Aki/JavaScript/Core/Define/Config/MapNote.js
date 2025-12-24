"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapNote = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class MapNote {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get MapId() {
    return this.mapid();
  }
  get Icon() {
    return this.icon();
  }
  get Desc() {
    return this.desc();
  }
  get Style() {
    return this.style();
  }
  get Priority() {
    return this.priority();
  }
  get Rank() {
    return this.rank();
  }
  get MarkIdMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.markidmapLength(), this.markidmapKey, this.markidmapValue, this);
  }
  markidmapKey(t) {
    return this.markidmap(t)?.key();
  }
  markidmapValue(t) {
    return this.markidmap(t)?.value();
  }
  get MarkId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.markidLength(), this.markid, this);
  }
  get ConditionId() {
    return this.conditionid();
  }
  get QuestIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.questidlistLength(), this.questidlist, this);
  }
  get Disable() {
    return this.disable();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMapNote(t, i) {
    return (i || new MapNote()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  type() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  desc(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  style() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  priority() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rank() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMarkidmapAt(t, i) {
    return this.markidmap(t);
  }
  markidmap(t, i) {
    var s = this.J7.__offset(this.z7, 20);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  markidmapLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMarkidAt(t) {
    return this.markid(t);
  }
  markid(t) {
    var i = this.J7.__offset(this.z7, 22);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  markidLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  markidArray() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  conditionid() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetQuestidlistAt(t) {
    return this.questidlist(t);
  }
  questidlist(t) {
    var i = this.J7.__offset(this.z7, 26);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  questidlistLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  questidlistArray() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  disable() {
    var t = this.J7.__offset(this.z7, 28);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.MapNote = MapNote;
//# sourceMappingURL=MapNote.js.map