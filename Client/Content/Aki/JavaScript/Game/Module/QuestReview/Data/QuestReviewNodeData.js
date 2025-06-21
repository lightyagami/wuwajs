"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestReviewNodeData = void 0;
const LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class QuestReviewNodeData {
  constructor(e) {
    this.Lo = e, this.c$1 = 0, this.Cbo = 0
  }
  get Id() {
    return this.Lo.Id
  }
  get PosIndex() {
    return this.Lo.PosIndex
  }
  get QuestLine() {
    return this.Lo.QuestLine
  }
  get Successor() {
    return this.Lo.SuccessorNodeId
  }
  get TitleId() {
    return this.Lo.Title
  }
  get Desc() {
    return this.Lo.Desc
  }
  get Brief() {
    return this.Lo.Brief
  }
  get ImageSmall() {
    return this.f51(this.Lo.ImageSmallMale, this.Lo.ImageSmallFemale)
  }
  get ImageLarge() {
    return this.f51(this.Lo.ImageLargeMale, this.Lo.ImageLargeFemale)
  }
  get ShowOnceUnlock() {
    return this.Lo.ShowOnceUnlock
  }
  get State() {
    return this.Cbo
  }
  get LineType() {
    return 0
  }
  get IsBranching() {
    var e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewNodeDataById(this.Successor);
    return !!e && this.QuestLine !== e.QuestLine
  }
  get Predecessor() {
    return this.c$1
  }
  set Predecessor(e) {
    this.c$1 = e
  }
  get IsFirstTimeShow() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewNodeUnlockAnim)?.get(this.Id) ?? !0
  }
  set IsFirstTimeShow(e) {
    let t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewNodeUnlockAnim);
    (t = t || new Map).set(this.Id, e), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewNodeUnlockAnim, t)
  }
  get HasRedDot() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewNodeRedDot)?.get(this.Id) ?? !0
  }
  set HasRedDot(e) {
    let t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewNodeRedDot);
    (t = t || new Map).set(this.Id, e), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewNodeRedDot, t)
  }
  UpdateByServerData(e) {
    e.NY1 ? this.Cbo = 3 : e.FY1 ? this.Cbo = 2 : e.GY1 ? this.Cbo = 1 : this.Cbo = 0
  }
  f51(e, t) {
    var r;
    return e ? !t || 1 === (r = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()) ? e : 0 === r ? t : "" : t
  }
}
exports.QuestReviewNodeData = QuestReviewNodeData;
//# sourceMappingURL=QuestReviewNodeData.js.map