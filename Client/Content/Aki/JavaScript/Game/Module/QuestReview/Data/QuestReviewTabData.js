"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestReviewTabData = void 0;
const LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
class QuestReviewTabData {
  constructor(e) {
    this.Lo = e, this.tVc = !1, this.d$1 = !1
  }
  get Id() {
    return this.Lo.Id
  }
  get QuestTree() {
    return this.Lo.QuestTree
  }
  get NameId() {
    return this.Lo.TabName
  }
  get IsUnlocked() {
    return this.tVc
  }
  get IsSelected() {
    return this.d$1
  }
  set IsSelected(e) {
    this.d$1 = e
  }
  get IsFirstTimeShow() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewTabUnlockAnim)?.get(this.Id) ?? !0
  }
  set IsFirstTimeShow(e) {
    let t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewTabUnlockAnim);
    (t = t || new Map).set(this.Id, e), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewTabUnlockAnim, t)
  }
  UpdateByServerData(e) {
    e.GY1 && (this.tVc = !0)
  }
}
exports.QuestReviewTabData = QuestReviewTabData;
//# sourceMappingURL=QuestReviewTabData.js.map