"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestReviewLineData = void 0;
const LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  QuestReviewDefine_1 = require("../QuestReviewDefine");
class QuestReviewLineData {
  constructor(e) {
    this.Lo = e, this.Cbo = 1, this.Vou = !1, this.SkipAnim = !1
  }
  get Id() {
    return this.Lo.Id
  }
  get DisplayOrder() {
    return this.Lo.DisplayOrder
  }
  get StartNode() {
    return this.Lo.StartNodeId
  }
  get LineColorHex() {
    return "#" + this.Lo.LineColor
  }
  get StarIcon() {
    return this.Lo.StarIcon
  }
  get RoundIcon() {
    return this.Lo.RoundIcon
  }
  get ShowSeqName() {
    return this.Lo.ShowSeqName
  }
  get DestroySeqName() {
    return this.Lo.DestroySeqName
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
        return "FristActivate"
    }
  }
  get State() {
    return this.Cbo
  }
  get IsShow() {
    return this.Id === QuestReviewDefine_1.NEW_QUEST_LINE ? this.HasFused : 0 !== this.State
  }
  get IsFirstTimeShow() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewLineUnlockAnim)?.get(this.Id) ?? !0
  }
  set IsFirstTimeShow(e) {
    let t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewLineUnlockAnim);
    (t = t || new Map).set(this.Id, e), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewLineUnlockAnim, t)
  }
  get IsDestroy() {
    return 2 === this.State
  }
  get IsFirstTimeDestroy() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewLineDestroyAnim)?.get(this.Id) ?? !0
  }
  set IsFirstTimeDestroy(e) {
    let t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewLineDestroyAnim);
    (t = t || new Map).set(this.Id, e), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewLineDestroyAnim, t)
  }
  get IsFusionLine() {
    return "Change" === this.DestroySeqName
  }
  get IsTempLine() {
    return this.Vou
  }
  set IsTempLine(e) {
    this.Vou = e
  }
  get HasFused() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewNewLineHasFused) ?? !1
  }
  set HasFused(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewNewLineHasFused, e)
  }
  UpdateByServerData(e) {
    e.HY1 ? this.Cbo = 2 : e.jY1 ? this.Cbo = 1 : this.Cbo = 0
  }
}
exports.QuestReviewLineData = QuestReviewLineData;
//# sourceMappingURL=QuestReviewLineData.js.map