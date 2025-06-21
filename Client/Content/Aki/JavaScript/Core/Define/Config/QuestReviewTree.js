"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestReviewTree = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class QuestReviewTree {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get QuestLines() {
    return GameUtils_1.GameUtils.ConvertToArray(this.questlinesLength(), this.questlines, this)
  }
  __init(t, e) {
    return this.z7 = t, this.J7 = e, this
  }
  static getRootAsQuestReviewTree(t, e) {
    return (e || new QuestReviewTree).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetQuestlinesAt(t) {
    return this.questlines(t)
  }
  questlines(t) {
    var e = this.J7.__offset(this.z7, 6);
    return e ? this.J7.readInt32(this.J7.__vector(this.z7 + e) + 4 * t) : 0
  }
  questlinesLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  questlinesArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
}
exports.QuestReviewTree = QuestReviewTree;
//# sourceMappingURL=QuestReviewTree.js.map