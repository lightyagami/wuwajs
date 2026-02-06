"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerLevel = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntString_1 = require("./SubType/DicIntString");
class GuessJokerLevel {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get InstId() {
    return this.instid();
  }
  get AiRole() {
    return this.airole();
  }
  get PreLevelId() {
    return this.prelevelid();
  }
  get UnLockCondition() {
    return this.unlockcondition();
  }
  get PassReward() {
    return this.passreward();
  }
  get WhoCardSkill() {
    return this.whocardskill();
  }
  get AiCardSkill() {
    return this.aicardskill();
  }
  get InitHP() {
    return this.inithp();
  }
  get CoinIconPath() {
    return this.coiniconpath();
  }
  get WinEmojiPath() {
    return GameUtils_1.GameUtils.ConvertToArray(this.winemojipathLength(), this.winemojipath, this);
  }
  get FailEmojiPath() {
    return GameUtils_1.GameUtils.ConvertToArray(this.failemojipathLength(), this.failemojipath, this);
  }
  get WinText() {
    return GameUtils_1.GameUtils.ConvertToMap(this.wintextLength(), this.wintextKey, this.wintextValue, this);
  }
  wintextKey(t) {
    return this.wintext(t)?.key();
  }
  wintextValue(t) {
    return this.wintext(t)?.value();
  }
  get FailText() {
    return GameUtils_1.GameUtils.ConvertToMap(this.failtextLength(), this.failtextKey, this.failtextValue, this);
  }
  failtextKey(t) {
    return this.failtext(t)?.key();
  }
  failtextValue(t) {
    return this.failtext(t)?.value();
  }
  get LockText() {
    return this.locktext();
  }
  get FirstEnterFlow() {
    return GameUtils_1.GameUtils.ConvertToArray(this.firstenterflowLength(), this.firstenterflow, this);
  }
  get FirstLeftFlow() {
    return GameUtils_1.GameUtils.ConvertToArray(this.firstleftflowLength(), this.firstleftflow, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsGuessJokerLevel(t, i) {
    return (i || new GuessJokerLevel()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  instid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  airole() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  prelevelid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  passreward() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  whocardskill() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  aicardskill() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  inithp() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  coiniconpath(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetWinemojipathAt(t) {
    return this.winemojipath(t);
  }
  winemojipath(t, i) {
    var s = this.J7.__offset(this.z7, 24);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  winemojipathLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetFailemojipathAt(t) {
    return this.failemojipath(t);
  }
  failemojipath(t, i) {
    var s = this.J7.__offset(this.z7, 26);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  failemojipathLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetWintextAt(t, i) {
    return this.wintext(t);
  }
  wintext(t, i) {
    var s = this.J7.__offset(this.z7, 28);
    if (s) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  wintextLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetFailtextAt(t, i) {
    return this.failtext(t);
  }
  failtext(t, i) {
    var s = this.J7.__offset(this.z7, 30);
    if (s) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  failtextLength() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  locktext(t) {
    var i = this.J7.__offset(this.z7, 32);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetFirstenterflowAt(t) {
    return this.firstenterflow(t);
  }
  firstenterflow(t, i) {
    var s = this.J7.__offset(this.z7, 34);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  firstenterflowLength() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetFirstleftflowAt(t) {
    return this.firstleftflow(t);
  }
  firstleftflow(t, i) {
    var s = this.J7.__offset(this.z7, 36);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  firstleftflowLength() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.GuessJokerLevel = GuessJokerLevel;
//# sourceMappingURL=GuessJokerLevel.js.map