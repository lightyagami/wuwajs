"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CiacconaGalChapterData = void 0;
class CiacconaGalChapterData {
  constructor(t) {
    this.Lo = t, this.Xbc = [], this.jqc = !1, this.kja = !1, this.Xbc = [this.Lo.SubEnding1, this.Lo.SubEnding2, this.Lo.SubEnding3]
  }
  get Id() {
    return this.Lo.Id
  }
  get Title() {
    return this.Lo.Title
  }
  get Desc() {
    return this.Lo.Desc
  }
  get StepIds() {
    return this.Lo.Steps
  }
  get ImageSmallPath() {
    return this.Lo.ChapterImageSmall
  }
  get ImageLargePath() {
    return this.Lo.ChapterImageLarge
  }
  get SubEndingIds() {
    return this.Xbc
  }
  get BranchingStepId() {
    return this.Lo.BranchPoint
  }
  get IsFinished() {
    return this.jqc
  }
  get IsUnlocked() {
    return this.kja
  }
  get MusicEvent() {
    return this.Lo.MusicEvent
  }
  GetSubEndingId(t) {
    return this.Xbc[t]
  }
  UpdateByServerData(t) {
    for (const e of t.a4c)
      if (e.a3_) {
        this.jqc = !0;
        break
      } this.kja = t.CMs
  }
}
exports.CiacconaGalChapterData = CiacconaGalChapterData;
//# sourceMappingURL=CiacconaGalChapterData.js.map