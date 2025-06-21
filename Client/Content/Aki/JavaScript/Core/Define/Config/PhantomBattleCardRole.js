"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomBattleCardRole = void 0;
const GameUtils_1 = require("../../../Game/GameUtils"),
  StringArray_1 = require("./SubType/StringArray");
class PhantomBattleCardRole {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get ActivityId() {
    return this.activityid()
  }
  get RoleConfigId() {
    return this.roleconfigid()
  }
  get Type() {
    return this.type()
  }
  get DropId() {
    return this.dropid()
  }
  get ActiveSkillId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.activeskillidLength(), this.activeskillid, this)
  }
  get PassiveSkillId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.passiveskillidLength(), this.passiveskillid, this)
  }
  get SkillIconList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skilliconlistLength(), this.skilliconlist, this)
  }
  get SkillNameList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skillnamelistLength(), this.skillnamelist, this)
  }
  get SkillDescList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skilldesclistLength(), this.skilldesclist, this)
  }
  get SkillDescParamsList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skilldescparamslistLength(), this.skilldescparamslist, this)
  }
  get PassiveSkillIconList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.passiveskilliconlistLength(), this.passiveskilliconlist, this)
  }
  get PassiveSkillNameList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.passiveskillnamelistLength(), this.passiveskillnamelist, this)
  }
  get PassiveSkillDescList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.passiveskilldesclistLength(), this.passiveskilldesclist, this)
  }
  get PassiveSkillDescParamsList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.passiveskilldescparamslistLength(), this.passiveskilldescparamslist, this)
  }
  get UnlockConditionTip() {
    return this.unlockconditiontip()
  }
  get RoleSkillTexture() {
    return this.roleskilltexture()
  }
  get RoleHeadTexture() {
    return this.roleheadtexture()
  }
  get RoleSpinePrefabPath() {
    return this.rolespineprefabpath()
  }
  get RoleTexture() {
    return this.roletexture()
  }
  get RoleMaskTexture() {
    return this.rolemasktexture()
  }
  get LightTextureColor() {
    return this.lighttexturecolor()
  }
  get RolePreviewTexture() {
    return this.rolepreviewtexture()
  }
  get IsTrail() {
    return this.istrail()
  }
  get BgDesc() {
    return this.bgdesc()
  }
  __init(t, i) {
    return this.z7 = t, this.J7 = i, this
  }
  static getRootAsPhantomBattleCardRole(t, i) {
    return (i || new PhantomBattleCardRole).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  roleconfigid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  type() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  dropid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetActiveskillidAt(t) {
    return this.activeskillid(t)
  }
  activeskillid(t) {
    var i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  activeskillidLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  activeskillidArray() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  GetPassiveskillidAt(t) {
    return this.passiveskillid(t)
  }
  passiveskillid(t) {
    var i = this.J7.__offset(this.z7, 16);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  passiveskillidLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  passiveskillidArray() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  GetSkilliconlistAt(t) {
    return this.skilliconlist(t)
  }
  skilliconlist(t, i) {
    var s = this.J7.__offset(this.z7, 18),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  skilliconlistLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  GetSkillnamelistAt(t) {
    return this.skillnamelist(t)
  }
  skillnamelist(t, i) {
    var s = this.J7.__offset(this.z7, 20),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  skillnamelistLength() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  GetSkilldesclistAt(t) {
    return this.skilldesclist(t)
  }
  skilldesclist(t, i) {
    var s = this.J7.__offset(this.z7, 22),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  skilldesclistLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  GetSkilldescparamslistAt(t, i) {
    return this.skilldescparamslist(t)
  }
  skilldescparamslist(t, i) {
    var s = this.J7.__offset(this.z7, 24);
    return s ? (i || new StringArray_1.StringArray).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t), this.J7) : null
  }
  skilldescparamslistLength() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  GetPassiveskilliconlistAt(t) {
    return this.passiveskilliconlist(t)
  }
  passiveskilliconlist(t, i) {
    var s = this.J7.__offset(this.z7, 26),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  passiveskilliconlistLength() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  GetPassiveskillnamelistAt(t) {
    return this.passiveskillnamelist(t)
  }
  passiveskillnamelist(t, i) {
    var s = this.J7.__offset(this.z7, 28),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  passiveskillnamelistLength() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  GetPassiveskilldesclistAt(t) {
    return this.passiveskilldesclist(t)
  }
  passiveskilldesclist(t, i) {
    var s = this.J7.__offset(this.z7, 30),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  passiveskilldesclistLength() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  GetPassiveskilldescparamslistAt(t, i) {
    return this.passiveskilldescparamslist(t)
  }
  passiveskilldescparamslist(t, i) {
    var s = this.J7.__offset(this.z7, 32);
    return s ? (i || new StringArray_1.StringArray).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t), this.J7) : null
  }
  passiveskilldescparamslistLength() {
    var t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  unlockconditiontip(t) {
    var i = this.J7.__offset(this.z7, 34),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  roleskilltexture(t) {
    var i = this.J7.__offset(this.z7, 36),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  roleheadtexture(t) {
    var i = this.J7.__offset(this.z7, 38),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  rolespineprefabpath(t) {
    var i = this.J7.__offset(this.z7, 40),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  roletexture(t) {
    var i = this.J7.__offset(this.z7, 42),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  rolemasktexture(t) {
    var i = this.J7.__offset(this.z7, 44),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  lighttexturecolor(t) {
    var i = this.J7.__offset(this.z7, 46),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  rolepreviewtexture(t) {
    var i = this.J7.__offset(this.z7, 48),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  istrail() {
    var t = this.J7.__offset(this.z7, 50);
    return !!t && !!this.J7.readInt8(this.z7 + t)
  }
  bgdesc(t) {
    var i = this.J7.__offset(this.z7, 52),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
}
exports.PhantomBattleCardRole = PhantomBattleCardRole;
//# sourceMappingURL=PhantomBattleCardRole.js.map