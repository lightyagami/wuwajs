"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymEntranceSet = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class LordGymEntranceSet {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get PreviewRewardId() {
    return this.previewrewardid();
  }
  get MarkId() {
    return this.markid();
  }
  get DungeonId() {
    return this.dungeonid();
  }
  get LordEntranceList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.lordentrancelistLength(), this.lordentrancelist, this);
  }
  get MapNoteUnlockCondition() {
    return this.mapnoteunlockcondition();
  }
  get Title() {
    return this.title();
  }
  get Description() {
    return this.description();
  }
  get HelpId() {
    return this.helpid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsLordGymEntranceSet(t, i) {
    return (i || new LordGymEntranceSet()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  previewrewardid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  markid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dungeonid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 8;
    }
  }
  GetLordentrancelistAt(t) {
    return this.lordentrancelist(t);
  }
  lordentrancelist(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  lordentrancelistLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  lordentrancelistArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  mapnoteunlockcondition() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  title(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  helpid() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.LordGymEntranceSet = LordGymEntranceSet;
//# sourceMappingURL=LordGymEntranceSet.js.map