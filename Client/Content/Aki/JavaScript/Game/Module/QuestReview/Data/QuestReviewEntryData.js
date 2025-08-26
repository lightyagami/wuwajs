"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestReviewEntryData = undefined;
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
class QuestReviewEntryData {
  constructor(e) {
    this.Lo = e;
    this.X51 = false;
  }
  get Id() {
    return this.Lo.Id;
  }
  get Tabs() {
    return this.Lo.QuestTabs;
  }
  get TargetTab() {
    return this.Lo.TargetTab;
  }
  get RelatedQuestId() {
    return this.Lo.RelatedQuest;
  }
  get ShouldShow() {
    return this.X51;
  }
  get TimerDurationMs() {
    return this.Lo.TimerDuration * TimeUtil_1.TimeUtil.InverseMillisecond;
  }
  get IsFirstEntry() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewMainViewEntryAnim) ?? true;
  }
  set IsFirstEntry(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewMainViewEntryAnim, e);
  }
  UpdateByServerData(e) {
    this.X51 = e._J1 && !e.dJ1;
  }
}
exports.QuestReviewEntryData = QuestReviewEntryData;
//# sourceMappingURL=QuestReviewEntryData.js.map