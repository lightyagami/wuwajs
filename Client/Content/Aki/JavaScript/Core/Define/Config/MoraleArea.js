"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleArea = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class MoraleArea {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get ExploreBox() {
    return GameUtils_1.GameUtils.ConvertToArray(this.exploreboxLength(), this.explorebox, this)
  }
  get Name() {
    return this.name()
  }
  get PlotIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.plotidlistLength(), this.plotidlist, this)
  }
  get DescBigBgPath() {
    return this.descbigbgpath()
  }
  get DescGridBgPath() {
    return this.descgridbgpath()
  }
  get DescGridBgAddX() {
    return this.descgridbgaddx()
  }
  get BuffLockDesc() {
    return this.bufflockdesc()
  }
  get BuffActiveDesc() {
    return this.buffactivedesc()
  }
  get BuffId() {
    return this.buffid()
  }
  get MonsterIconPath() {
    return this.monstericonpath()
  }
  __init(t, s) {
    return this.z7 = t, this.J7 = s, this
  }
  static getRootAsMoraleArea(t, s) {
    return (s || new MoraleArea).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetExploreboxAt(t) {
    return this.explorebox(t)
  }
  explorebox(t) {
    var s = this.J7.__offset(this.z7, 6);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0
  }
  exploreboxLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  exploreboxArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  GetPlotidlistAt(t) {
    return this.plotidlist(t)
  }
  plotidlist(t) {
    var s = this.J7.__offset(this.z7, 10);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0
  }
  plotidlistLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  plotidlistArray() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  descbigbgpath(t) {
    var s = this.J7.__offset(this.z7, 12),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  descgridbgpath(t) {
    var s = this.J7.__offset(this.z7, 14),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  descgridbgaddx() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  bufflockdesc(t) {
    var s = this.J7.__offset(this.z7, 18),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  buffactivedesc(t) {
    var s = this.J7.__offset(this.z7, 20),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  buffid() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  monstericonpath(t) {
    var s = this.J7.__offset(this.z7, 24),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
}
exports.MoraleArea = MoraleArea;
//# sourceMappingURL=MoraleArea.js.map