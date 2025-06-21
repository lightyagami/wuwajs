"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FlagArea = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class FlagArea {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get FlagEntityId() {
    return this.flagentityid()
  }
  get FlagAreaId() {
    return this.flagareaid()
  }
  get MapId() {
    return this.mapid()
  }
  get FlagType() {
    return this.flagtype()
  }
  get MarkId() {
    return this.markid()
  }
  get TreasureBoxEntitys() {
    return GameUtils_1.GameUtils.ConvertToArray(this.treasureboxentitysLength(), this.treasureboxentitys, this)
  }
  get FlagName() {
    return this.flagname()
  }
  get FlagPlotList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.flagplotlistLength(), this.flagplotlist, this)
  }
  get FlagPosPlotId() {
    return this.flagposplotid()
  }
  get MaxMonsterLv() {
    return this.maxmonsterlv()
  }
  get MonsterIconPath() {
    return this.monstericonpath()
  }
  get MonsterDesc() {
    return this.monsterdesc()
  }
  get BoxRewardId() {
    return this.boxrewardid()
  }
  get Index() {
    return this.index()
  }
  __init(t, s) {
    return this.z7 = t, this.J7 = s, this
  }
  static getRootAsFlagArea(t, s) {
    return (s || new FlagArea).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  flagentityid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  flagareaid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  flagtype() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  markid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetTreasureboxentitysAt(t) {
    return this.treasureboxentitys(t)
  }
  treasureboxentitys(t) {
    var s = this.J7.__offset(this.z7, 16);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0
  }
  treasureboxentitysLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  treasureboxentitysArray() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  flagname(t) {
    var s = this.J7.__offset(this.z7, 18),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  GetFlagplotlistAt(t) {
    return this.flagplotlist(t)
  }
  flagplotlist(t) {
    var s = this.J7.__offset(this.z7, 20);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0
  }
  flagplotlistLength() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  flagplotlistArray() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  flagposplotid() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  maxmonsterlv() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  monstericonpath(t) {
    var s = this.J7.__offset(this.z7, 26),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  monsterdesc(t) {
    var s = this.J7.__offset(this.z7, 28),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  boxrewardid() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  index(t) {
    var s = this.J7.__offset(this.z7, 32),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
}
exports.FlagArea = FlagArea;
//# sourceMappingURL=FlagArea.js.map