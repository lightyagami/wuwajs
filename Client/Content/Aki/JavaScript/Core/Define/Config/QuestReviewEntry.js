"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestReviewEntry = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class QuestReviewEntry {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get QuestTabs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.questtabsLength(), this.questtabs, this)
  }
  get TargetTab() {
    return this.targettab()
  }
  get RelatedQuest() {
    return GameUtils_1.GameUtils.ConvertToArray(this.relatedquestLength(), this.relatedquest, this)
  }
  get TimerDuration() {
    return this.timerduration()
  }
  __init(t, s) {
    return this.z7 = t, this.J7 = s, this
  }
  static getRootAsQuestReviewEntry(t, s) {
    return (s || new QuestReviewEntry).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetQuesttabsAt(t) {
    return this.questtabs(t)
  }
  questtabs(t) {
    var s = this.J7.__offset(this.z7, 6);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0
  }
  questtabsLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  questtabsArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  targettab() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetRelatedquestAt(t) {
    return this.relatedquest(t)
  }
  relatedquest(t) {
    var s = this.J7.__offset(this.z7, 10);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0
  }
  relatedquestLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  relatedquestArray() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  timerduration() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 5
  }
}
exports.QuestReviewEntry = QuestReviewEntry;
//# sourceMappingURL=QuestReviewEntry.js.map