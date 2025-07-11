"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestReviewEntry = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class QuestReviewEntry {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get QuestTabs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.questtabsLength(), this.questtabs, this);
  }
  get TargetTab() {
    return this.targettab();
  }
  get RelatedQuest() {
    return GameUtils_1.GameUtils.ConvertToArray(this.relatedquestLength(), this.relatedquest, this);
  }
  get TimerDuration() {
    return this.timerduration();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsQuestReviewEntry(t, s) {
    return (s || new QuestReviewEntry()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetQuesttabsAt(t) {
    return this.questtabs(t);
  }
  questtabs(t) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  questtabsLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  questtabsArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  targettab() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRelatedquestAt(t) {
    return this.relatedquest(t);
  }
  relatedquest(t) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  relatedquestLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  relatedquestArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  timerduration() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 5;
    }
  }
}
exports.QuestReviewEntry = QuestReviewEntry;
//# sourceMappingURL=QuestReviewEntry.js.map