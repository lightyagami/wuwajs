"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrialRoleInfo = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntPair_1 = require("./SubType/IntPair");
class TrialRoleInfo {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get GroupId() {
    return this.groupid();
  }
  get Type() {
    return this.type();
  }
  get WorldLevel() {
    return this.worldlevel();
  }
  get Gender() {
    return this.gender();
  }
  get OnlyTrial() {
    return this.onlytrial();
  }
  get HideTrialLabel() {
    return this.hidetriallabel();
  }
  get ParentId() {
    return this.parentid();
  }
  get Level() {
    return this.level();
  }
  get ResonanceLevel() {
    return this.resonancelevel();
  }
  get UnlockSkillLevel() {
    return this.unlockskilllevel();
  }
  get UnlockSkillNodeList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.unlockskillnodelistLength(), this.unlockskillnodelist, this);
  }
  get DefaultSkillBranchId() {
    return this.defaultskillbranchid();
  }
  get RoleSkin() {
    return this.roleskin();
  }
  get TrailWeapon() {
    return this.trailweapon();
  }
  get PhantomEquipList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.phantomequiplistLength(), this.phantomequiplist, this);
  }
  get SpinePrefabResource() {
    return this.spineprefabresource();
  }
  get ContentTexturePath() {
    return this.contenttexturepath();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsTrialRoleInfo(t, i) {
    return (i || new TrialRoleInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  type() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  worldlevel() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  gender() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return -1;
    }
  }
  onlytrial() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  hidetriallabel() {
    var t = this.J7.__offset(this.z7, 16);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  parentid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  level() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  resonancelevel() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlockskilllevel() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  GetUnlockskillnodelistAt(t) {
    return this.unlockskillnodelist(t);
  }
  unlockskillnodelist(t) {
    var i = this.J7.__offset(this.z7, 26);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  unlockskillnodelistLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlockskillnodelistArray() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  defaultskillbranchid() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roleskin() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  trailweapon() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPhantomequiplistAt(t, i) {
    return this.phantomequiplist(t);
  }
  phantomequiplist(t, i) {
    var s = this.J7.__offset(this.z7, 34);
    if (s) {
      return (i || new IntPair_1.IntPair()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  phantomequiplistLength() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  spineprefabresource(t) {
    var i = this.J7.__offset(this.z7, 36);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  contenttexturepath(t) {
    var i = this.J7.__offset(this.z7, 38);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.TrialRoleInfo = TrialRoleInfo;
//# sourceMappingURL=TrialRoleInfo.js.map