"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestReviewLineData = undefined;
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const QuestReviewDefine_1 = require("../QuestReviewDefine");
class QuestReviewLineData {
  constructor(e) {
    this.Lo = e;
    this.Cbo = 1;
    this.Alu = false;
    this.SkipAnim = false;
  }
  get Id() {
    return this.Lo.Id;
  }
  get DisplayOrder() {
    return this.Lo.DisplayOrder;
  }
  get StartNode() {
    return this.Lo.StartNodeId;
  }
  get LineColorHex() {
    return "#" + this.Lo.LineColor;
  }
  get StarIcon() {
    return this.Lo.StarIcon;
  }
  get RoundIcon() {
    return this.Lo.RoundIcon;
  }
  get ShowSeqName() {
    return this.Lo.ShowSeqName;
  }
  get DestroySeqName() {
    return this.Lo.DestroySeqName;
  }
  get NodeFirstActivateSeqName() {
    switch (this.DisplayOrder) {
      case 1:
        return "FristActivate";
      case 2:
        return "FristActivate2";
      case 3:
        return "FristActivate3";
      default:
        return "FristActivate";
    }
  }
  get State() {
    return this.Cbo;
  }
  get IsShow() {
    if (this.Id === QuestReviewDefine_1.NEW_QUEST_LINE) {
      return this.HasFused;
    } else {
      return this.State !== 0;
    }
  }
  get IsFirstTimeShow() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewLineUnlockAnim)?.get(this.Id) ?? true;
  }
  set IsFirstTimeShow(e) {
    let t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewLineUnlockAnim);
    (t = t || new Map()).set(this.Id, e);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewLineUnlockAnim, t);
  }
  get IsDestroy() {
    return this.State === 2;
  }
  get IsFirstTimeDestroy() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewLineDestroyAnim)?.get(this.Id) ?? true;
  }
  set IsFirstTimeDestroy(e) {
    let t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewLineDestroyAnim);
    (t = t || new Map()).set(this.Id, e);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewLineDestroyAnim, t);
  }
  get IsFusionLine() {
    return this.DestroySeqName === "Change";
  }
  get IsTempLine() {
    return this.Alu;
  }
  set IsTempLine(e) {
    this.Alu = e;
  }
  get HasFused() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewNewLineHasFused) ?? false;
  }
  set HasFused(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewNewLineHasFused, e);
  }
  UpdateByServerData(e) {
    if (e.uJ1) {
      this.Cbo = 2;
    } else if (e._J1) {
      this.Cbo = 1;
    } else {
      this.Cbo = 0;
    }
  }
}
exports.QuestReviewLineData = QuestReviewLineData;
//# sourceMappingURL=QuestReviewLineData.js.map