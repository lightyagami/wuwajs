"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPromptQuestChapterUI = undefined;
class FbPromptQuestChapterUI {
  constructor(t) {
    this.FbDataInternal = t;
    this.g0h = false;
    this.f0h = undefined;
    this.Qch = false;
    this.Kch = 0;
  }
  static Create(t) {
    if (t) {
      return new FbPromptQuestChapterUI(t);
    }
  }
  get ChapterState() {
    if (!this.g0h) {
      this.g0h = true;
      this.f0h = this.FbDataInternal.chapterState();
    }
    return this.f0h;
  }
  get QuestId() {
    if (!this.Qch) {
      this.Qch = true;
      this.Kch = this.FbDataInternal.questId();
    }
    return this.Kch;
  }
}
exports.FbPromptQuestChapterUI = FbPromptQuestChapterUI;
//# sourceMappingURL=FbPromptQuestChapterUI.js.map