"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightMainLevel = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MotorFightMainLevel {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get LevelId() {
    return this.levelid();
  }
  get InstId() {
    return this.instid();
  }
  get PreLevelId() {
    return this.prelevelid();
  }
  get LevelType() {
    return this.leveltype();
  }
  get SubLevels() {
    return GameUtils_1.GameUtils.ConvertToArray(this.sublevelsLength(), this.sublevels, this);
  }
  get PlayerHp() {
    return this.playerhp();
  }
  get BaseWorldSpeed() {
    return this.baseworldspeed();
  }
  get SceneSegmentLength() {
    return this.scenesegmentlength();
  }
  get Effects() {
    return GameUtils_1.GameUtils.ConvertToArray(this.effectsLength(), this.effects, this);
  }
  get BigScore() {
    return this.bigscore();
  }
  get SkillEnable() {
    return this.skillenable();
  }
  get NormalMusic() {
    return this.normalmusic();
  }
  get BossMusic() {
    return this.bossmusic();
  }
  get StopMusic() {
    return this.stopmusic();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsMotorFightMainLevel(t, s) {
    return (s || new MotorFightMainLevel()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  levelid() {
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
  prelevelid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  leveltype() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSublevelsAt(t) {
    return this.sublevels(t);
  }
  sublevels(t) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  sublevelsLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  sublevelsArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  playerhp() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  baseworldspeed() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 100;
    }
  }
  scenesegmentlength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  GetEffectsAt(t) {
    return this.effects(t);
  }
  effects(t) {
    var s = this.J7.__offset(this.z7, 20);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  effectsLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  effectsArray() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  bigscore() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 20;
    }
  }
  skillenable() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  normalmusic(t) {
    var s = this.J7.__offset(this.z7, 26);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  bossmusic(t) {
    var s = this.J7.__offset(this.z7, 28);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  stopmusic(t) {
    var s = this.J7.__offset(this.z7, 30);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.MotorFightMainLevel = MotorFightMainLevel;
//# sourceMappingURL=MotorFightMainLevel.js.map