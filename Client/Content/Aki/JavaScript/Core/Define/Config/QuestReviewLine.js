"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestReviewLine = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class QuestReviewLine {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get DisplayOrder() {
    return this.displayorder()
  }
  get StartNodeId() {
    return this.startnodeid()
  }
  get LineColor() {
    return this.linecolor()
  }
  get ShowSeqName() {
    return this.showseqname()
  }
  get DestroySeqName() {
    return this.destroyseqname()
  }
  get StarIcon() {
    return this.staricon()
  }
  get RoundIcon() {
    return this.roundicon()
  }
  __init(t, e) {
    return this.z7 = t, this.J7 = e, this
  }
  static getRootAsQuestReviewLine(t, e) {
    return (e || new QuestReviewLine).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  displayorder() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  startnodeid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  linecolor(t) {
    var e = this.J7.__offset(this.z7, 10),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  showseqname(t) {
    var e = this.J7.__offset(this.z7, 12),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  destroyseqname(t) {
    var e = this.J7.__offset(this.z7, 14),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  staricon(t) {
    var e = this.J7.__offset(this.z7, 16),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  roundicon(t) {
    var e = this.J7.__offset(this.z7, 18),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
}
exports.QuestReviewLine = QuestReviewLine;
//# sourceMappingURL=QuestReviewLine.js.map