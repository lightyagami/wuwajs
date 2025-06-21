"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestReviewEntryData = void 0;
const LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../Common/TimeUtil");
class QuestReviewEntryData {
  constructor(e) {
    this.Lo = e, this.m51 = !1
  }
  get Id() {
    return this.Lo.Id
  }
  get Tabs() {
    return this.Lo.QuestTabs
  }
  get TargetTab() {
    return this.Lo.TargetTab
  }
  get RelatedQuestId() {
    return this.Lo.RelatedQuest
  }
  get ShouldShow() {
    return this.m51
  }
  get TimerDurationMs() {
    return this.Lo.TimerDuration * TimeUtil_1.TimeUtil.InverseMillisecond
  }
  get IsFirstEntry() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewMainViewEntryAnim) ?? !0
  }
  set IsFirstEntry(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewMainViewEntryAnim, e)
  }
  UpdateByServerData(e) {
    this.m51 = e.jY1 && !e.WY1
  }
}
exports.QuestReviewEntryData = QuestReviewEntryData;
//# sourceMappingURL=QuestReviewEntryData.js.map