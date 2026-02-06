"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerAiConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class GuessJokerAiConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get RoleId() {
    return this.roleid();
  }
  get NpcId() {
    return this.npcid();
  }
  get ChairId() {
    return this.chairid();
  }
  get GamePlayCameraId() {
    return this.gameplaycameraid();
  }
  get SelectRoleCameraId() {
    return this.selectrolecameraid();
  }
  get SettleCameraId() {
    return this.settlecameraid();
  }
  get UseSkillText() {
    return this.useskilltext();
  }
  get GiveUpSkillText() {
    return this.giveupskilltext();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsGuessJokerAiConfig(t, e) {
    return (e || new GuessJokerAiConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  npcid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  chairid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  gameplaycameraid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  selectrolecameraid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  settlecameraid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  useskilltext(t) {
    var e = this.J7.__offset(this.z7, 16);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  giveupskilltext(t) {
    var e = this.J7.__offset(this.z7, 18);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.GuessJokerAiConfig = GuessJokerAiConfig;
//# sourceMappingURL=GuessJokerAiConfig.js.map