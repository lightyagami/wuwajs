"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestReviewNode = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class QuestReviewNode {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get QuestLine() {
    return this.questline()
  }
  get PosIndex() {
    return this.posindex()
  }
  get SuccessorNodeId() {
    return this.successornodeid()
  }
  get Title() {
    return this.title()
  }
  get Desc() {
    return this.desc()
  }
  get DescFemale() {
    return this.descfemale()
  }
  get Brief() {
    return this.brief()
  }
  get ImageSmallMale() {
    return this.imagesmallmale()
  }
  get ImageSmallFemale() {
    return this.imagesmallfemale()
  }
  get ImageLargeMale() {
    return this.imagelargemale()
  }
  get ImageLargeFemale() {
    return this.imagelargefemale()
  }
  get ShowOnceUnlock() {
    return this.showonceunlock()
  }
  __init(t, e) {
    return this.z7 = t, this.J7 = e, this
  }
  static getRootAsQuestReviewNode(t, e) {
    return (e || new QuestReviewNode).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  questline() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  posindex() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  successornodeid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  title(t) {
    var e = this.J7.__offset(this.z7, 12),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  desc(t) {
    var e = this.J7.__offset(this.z7, 14),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  descfemale(t) {
    var e = this.J7.__offset(this.z7, 16),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  brief(t) {
    var e = this.J7.__offset(this.z7, 18),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  imagesmallmale(t) {
    var e = this.J7.__offset(this.z7, 20),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  imagesmallfemale(t) {
    var e = this.J7.__offset(this.z7, 22),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  imagelargemale(t) {
    var e = this.J7.__offset(this.z7, 24),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  imagelargefemale(t) {
    var e = this.J7.__offset(this.z7, 26),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  showonceunlock() {
    var t = this.J7.__offset(this.z7, 28);
    return !!t && !!this.J7.readInt8(this.z7 + t)
  }
}
exports.QuestReviewNode = QuestReviewNode;
//# sourceMappingURL=QuestReviewNode.js.map