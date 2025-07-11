"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideGroup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class GuideGroup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Step() {
    return GameUtils_1.GameUtils.ConvertToArray(this.stepLength(), this.step, this);
  }
  get OpenLimitCondition() {
    return this.openlimitcondition();
  }
  get AutoOpenCondition() {
    return this.autoopencondition();
  }
  get LimitRepeat() {
    return GameUtils_1.GameUtils.ConvertToArray(this.limitrepeatLength(), this.limitrepeat, this);
  }
  get DungeonId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.dungeonidLength(), this.dungeonid, this);
  }
  get DungeonSets() {
    return GameUtils_1.GameUtils.ConvertToArray(this.dungeonsetsLength(), this.dungeonsets, this);
  }
  get ResetInDungeon() {
    return this.resetindungeon();
  }
  get OnlineMode() {
    return this.onlinemode();
  }
  get Priority() {
    return this.priority();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsGuideGroup(t, i) {
    return (i || new GuideGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetStepAt(t) {
    return this.step(t);
  }
  step(t) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  stepLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  stepArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  openlimitcondition() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  autoopencondition() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLimitrepeatAt(t) {
    return this.limitrepeat(t);
  }
  limitrepeat(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  limitrepeatLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  limitrepeatArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetDungeonidAt(t) {
    return this.dungeonid(t);
  }
  dungeonid(t) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  dungeonidLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  dungeonidArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetDungeonsetsAt(t) {
    return this.dungeonsets(t);
  }
  dungeonsets(t, i) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  dungeonsetsLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  resetindungeon() {
    var t = this.J7.__offset(this.z7, 18);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  onlinemode() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  priority() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.GuideGroup = GuideGroup;
//# sourceMappingURL=GuideGroup.js.map