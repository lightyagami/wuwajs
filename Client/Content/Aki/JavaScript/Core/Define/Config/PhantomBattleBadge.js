"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomBattleBadge = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleBadge {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get GroupId() {
    return this.groupid()
  }
  get ActivityId() {
    return this.activityid()
  }
  get ItemType() {
    return this.itemtype()
  }
  get ShowIcon() {
    return this.showicon()
  }
  get Name() {
    return this.name()
  }
  get Desc() {
    return this.desc()
  }
  get ConditionGroup() {
    return this.conditiongroup()
  }
  get QualityId() {
    return this.qualityid()
  }
  get TypeDescription() {
    return this.typedescription()
  }
  get AttributesDescription() {
    return this.attributesdescription()
  }
  get BgDescription() {
    return this.bgdescription()
  }
  get Icon() {
    return this.icon()
  }
  get IconMiddle() {
    return this.iconmiddle()
  }
  get IconSmall() {
    return this.iconsmall()
  }
  get Mesh() {
    return this.mesh()
  }
  get ObtainedShowDescription() {
    return this.obtainedshowdescription()
  }
  get ShowInBag() {
    return this.showinbag()
  }
  get ItemAccess() {
    return GameUtils_1.GameUtils.ConvertToArray(this.itemaccessLength(), this.itemaccess, this)
  }
  get SortIndex() {
    return this.sortindex()
  }
  get RedDotDisableRule() {
    return this.reddotdisablerule()
  }
  __init(t, i) {
    return this.z7 = t, this.J7 = i, this
  }
  static getRootAsPhantomBattleBadge(t, i) {
    return (i || new PhantomBattleBadge).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  itemtype() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  showicon(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  desc(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  conditiongroup() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  qualityid() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  typedescription(t) {
    var i = this.J7.__offset(this.z7, 22),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  attributesdescription(t) {
    var i = this.J7.__offset(this.z7, 24),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  bgdescription(t) {
    var i = this.J7.__offset(this.z7, 26),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 28),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  iconmiddle(t) {
    var i = this.J7.__offset(this.z7, 30),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  iconsmall(t) {
    var i = this.J7.__offset(this.z7, 32),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  mesh(t) {
    var i = this.J7.__offset(this.z7, 34),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  obtainedshowdescription(t) {
    var i = this.J7.__offset(this.z7, 36),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  showinbag() {
    var t = this.J7.__offset(this.z7, 38);
    return !t || !!this.J7.readInt8(this.z7 + t)
  }
  GetItemaccessAt(t) {
    return this.itemaccess(t)
  }
  itemaccess(t) {
    var i = this.J7.__offset(this.z7, 40);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  itemaccessLength() {
    var t = this.J7.__offset(this.z7, 40);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  itemaccessArray() {
    var t = this.J7.__offset(this.z7, 40);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 42);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  reddotdisablerule() {
    var t = this.J7.__offset(this.z7, 44);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
}
exports.PhantomBattleBadge = PhantomBattleBadge;
//# sourceMappingURL=PhantomBattleBadge.js.map