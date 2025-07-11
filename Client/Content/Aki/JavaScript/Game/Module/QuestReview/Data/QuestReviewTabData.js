"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestReviewTabData = undefined;
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
class QuestReviewTabData {
  constructor(e) {
    this.Lo = e;
    this.tVc = false;
    this.Y$1 = false;
  }
  get Id() {
    return this.Lo.Id;
  }
  get QuestTree() {
    return this.Lo.QuestTree;
  }
  get NameId() {
    return this.Lo.TabName;
  }
  get IsUnlocked() {
    return this.tVc;
  }
  get IsSelected() {
    return this.Y$1;
  }
  set IsSelected(e) {
    this.Y$1 = e;
  }
  get IsFirstTimeShow() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewTabUnlockAnim)?.get(this.Id) ?? true;
  }
  set IsFirstTimeShow(e) {
    let t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewTabUnlockAnim);
    (t = t || new Map()).set(this.Id, e);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewTabUnlockAnim, t);
  }
  UpdateByServerData(e) {
    if (e.xz1) {
      this.tVc = true;
    }
  }
}
exports.QuestReviewTabData = QuestReviewTabData;
//# sourceMappingURL=QuestReviewTabData.js.map