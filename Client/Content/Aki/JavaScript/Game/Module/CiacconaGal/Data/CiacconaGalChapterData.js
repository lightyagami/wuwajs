"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalChapterData = undefined;
class CiacconaGalChapterData {
  constructor(t) {
    this.Lo = t;
    this.Xbc = [];
    this.jqc = false;
    this.kja = false;
    this.Xbc = [this.Lo.SubEnding1, this.Lo.SubEnding2, this.Lo.SubEnding3];
  }
  get Id() {
    return this.Lo.Id;
  }
  get Title() {
    return this.Lo.Title;
  }
  get Desc() {
    return this.Lo.Desc;
  }
  get StepIds() {
    return this.Lo.Steps;
  }
  get ImageSmallPath() {
    return this.Lo.ChapterImageSmall;
  }
  get ImageLargePath() {
    return this.Lo.ChapterImageLarge;
  }
  get SubEndingIds() {
    return this.Xbc;
  }
  get BranchingStepId() {
    return this.Lo.BranchPoint;
  }
  get IsFinished() {
    return this.jqc;
  }
  get IsUnlocked() {
    return this.kja;
  }
  get MusicEvent() {
    return this.Lo.MusicEvent;
  }
  GetSubEndingId(t) {
    return this.Xbc[t];
  }
  UpdateByServerData(t) {
    for (const e of t.a4c) {
      if (e.a3_) {
        this.jqc = true;
        break;
      }
    }
    this.kja = t.CMs;
  }
}
exports.CiacconaGalChapterData = CiacconaGalChapterData;
//# sourceMappingURL=CiacconaGalChapterData.js.map