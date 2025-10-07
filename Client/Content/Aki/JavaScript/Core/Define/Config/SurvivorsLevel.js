"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsLevel = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntString_1 = require("./SubType/DicIntString");
class SurvivorsLevel {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get InstId() {
    return this.instid();
  }
  get UnlockConditionId() {
    return this.unlockconditionid();
  }
  get EndlessMode() {
    return this.endlessmode();
  }
  get InitRoles() {
    return GameUtils_1.GameUtils.ConvertToArray(this.initrolesLength(), this.initroles, this);
  }
  get InitWeapons() {
    return GameUtils_1.GameUtils.ConvertToArray(this.initweaponsLength(), this.initweapons, this);
  }
  get Diff() {
    return this.diff();
  }
  get Icon() {
    return this.icon();
  }
  get Name() {
    return this.name();
  }
  get InstDesc() {
    return GameUtils_1.GameUtils.ConvertToMap(this.instdescLength(), this.instdescKey, this.instdescValue, this);
  }
  instdescKey(t) {
    return this.instdesc(t)?.key();
  }
  instdescValue(t) {
    return this.instdesc(t)?.value();
  }
  get TargetDesc() {
    return GameUtils_1.GameUtils.ConvertToMap(this.targetdescLength(), this.targetdescKey, this.targetdescValue, this);
  }
  targetdescKey(t) {
    return this.targetdesc(t)?.key();
  }
  targetdescValue(t) {
    return this.targetdesc(t)?.value();
  }
  get MonsterSpawnPoints() {
    return GameUtils_1.GameUtils.ConvertToArray(this.monsterspawnpointsLength(), this.monsterspawnpoints, this);
  }
  get ComboCfgId() {
    return this.combocfgid();
  }
  get RewardId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rewardidLength(), this.rewardid, this);
  }
  get BoundsPath() {
    return this.boundspath();
  }
  get LevelInfoType() {
    return this.levelinfotype();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSurvivorsLevel(t, i) {
    return (i || new SurvivorsLevel()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  instid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlockconditionid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  endlessmode() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  GetInitrolesAt(t) {
    return this.initroles(t);
  }
  initroles(t) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  initrolesLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  initrolesArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetInitweaponsAt(t) {
    return this.initweapons(t);
  }
  initweapons(t) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  initweaponsLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  initweaponsArray() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  diff() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 20);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetInstdescAt(t, i) {
    return this.instdesc(t);
  }
  instdesc(t, i) {
    var s = this.J7.__offset(this.z7, 24);
    if (s) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  instdescLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTargetdescAt(t, i) {
    return this.targetdesc(t);
  }
  targetdesc(t, i) {
    var s = this.J7.__offset(this.z7, 26);
    if (s) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  targetdescLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMonsterspawnpointsAt(t) {
    return this.monsterspawnpoints(t);
  }
  monsterspawnpoints(t) {
    var i = this.J7.__offset(this.z7, 28);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  monsterspawnpointsLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  monsterspawnpointsArray() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  combocfgid() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRewardidAt(t) {
    return this.rewardid(t);
  }
  rewardid(t) {
    var i = this.J7.__offset(this.z7, 32);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  rewardidLength() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardidArray() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  boundspath(t) {
    var i = this.J7.__offset(this.z7, 34);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  levelinfotype() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.SurvivorsLevel = SurvivorsLevel;
//# sourceMappingURL=SurvivorsLevel.js.map