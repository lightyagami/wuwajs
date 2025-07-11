"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbyssLittleRole = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class AbyssLittleRole {
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
  get CastType() {
    return this.casttype();
  }
  get LevelGroupId() {
    return this.levelgroupid();
  }
  get SkillDesc() {
    return this.skilldesc();
  }
  get AbyssRoleBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(this.abyssrolebuffLength(), this.abyssrolebuff, this);
  }
  get AbyssRolePhantomBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(this.abyssrolephantombuffLength(), this.abyssrolephantombuff, this);
  }
  get TagList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.taglistLength(), this.taglist, this);
  }
  get FormationIcon() {
    return this.formationicon();
  }
  get Icon() {
    return this.icon();
  }
  get UnlockDesc() {
    return this.unlockdesc();
  }
  get Name() {
    return this.name();
  }
  get Quality() {
    return this.quality();
  }
  get PhantomItemId() {
    return this.phantomitemid();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsAbyssLittleRole(t, s) {
    return (s || new AbyssLittleRole()).__init(t.readInt32(t.position()) + t.position(), t);
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
  casttype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  levelgroupid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skilldesc(t) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetAbyssrolebuffAt(t) {
    return this.abyssrolebuff(t);
  }
  abyssrolebuff(t) {
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + s) + t * 8);
    } else {
      return 0;
    }
  }
  abyssrolebuffLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  abyssrolebuffArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetAbyssrolephantombuffAt(t) {
    return this.abyssrolephantombuff(t);
  }
  abyssrolephantombuff(t) {
    var s = this.J7.__offset(this.z7, 16);
    if (s) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + s) + t * 8);
    } else {
      return 0;
    }
  }
  abyssrolephantombuffLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  abyssrolephantombuffArray() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetTaglistAt(t) {
    return this.taglist(t);
  }
  taglist(t) {
    var s = this.J7.__offset(this.z7, 18);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  taglistLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  taglistArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  formationicon(t) {
    var s = this.J7.__offset(this.z7, 20);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  icon(t) {
    var s = this.J7.__offset(this.z7, 22);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  unlockdesc(t) {
    var s = this.J7.__offset(this.z7, 24);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 26);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  quality() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  phantomitemid() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.AbyssLittleRole = AbyssLittleRole;
//# sourceMappingURL=AbyssLittleRole.js.map