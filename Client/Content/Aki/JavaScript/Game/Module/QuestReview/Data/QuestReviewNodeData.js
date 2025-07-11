"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestReviewNodeData = undefined;
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
class QuestReviewNodeData {
  constructor(e) {
    this.Lo = e;
    this.X$1 = 0;
    this.Cbo = 0;
  }
  get Id() {
    return this.Lo.Id;
  }
  get PosIndex() {
    return this.Lo.PosIndex;
  }
  get QuestLine() {
    return this.Lo.QuestLine;
  }
  get Successor() {
    return this.Lo.SuccessorNodeId;
  }
  get TitleId() {
    return this.Lo.Title;
  }
  get Desc() {
    return this.Lo.Desc;
  }
  get Brief() {
    return this.Lo.Brief;
  }
  get ImageSmall() {
    return this.Y51(this.Lo.ImageSmallMale, this.Lo.ImageSmallFemale);
  }
  get ImageLarge() {
    return this.Y51(this.Lo.ImageLargeMale, this.Lo.ImageLargeFemale);
  }
  get ShowOnceUnlock() {
    return this.Lo.ShowOnceUnlock;
  }
  get State() {
    return this.Cbo;
  }
  get LineType() {
    return 0;
  }
  get IsBranching() {
    var e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewNodeDataById(this.Successor);
    return !!e && this.QuestLine !== e.QuestLine;
  }
  get Predecessor() {
    return this.X$1;
  }
  set Predecessor(e) {
    this.X$1 = e;
  }
  get IsFirstTimeShow() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewNodeUnlockAnim)?.get(this.Id) ?? true;
  }
  set IsFirstTimeShow(e) {
    let t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewNodeUnlockAnim);
    (t = t || new Map()).set(this.Id, e);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewNodeUnlockAnim, t);
  }
  get HasRedDot() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewNodeRedDot)?.get(this.Id) ?? true;
  }
  set HasRedDot(e) {
    let t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewNodeRedDot);
    (t = t || new Map()).set(this.Id, e);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewNodeRedDot, t);
  }
  UpdateByServerData(e) {
    if (e.Dz1) {
      this.Cbo = 3;
    } else if (e.Uz1) {
      this.Cbo = 2;
    } else if (e.xz1) {
      this.Cbo = 1;
    } else {
      this.Cbo = 0;
    }
  }
  Y51(e, t) {
    var r;
    if (e) {
      if (!t || (r = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()) === 1) {
        return e;
      } else if (r === 0) {
        return t;
      } else {
        return "";
      }
    } else {
      return t;
    }
  }
}
exports.QuestReviewNodeData = QuestReviewNodeData;
//# sourceMappingURL=QuestReviewNodeData.js.map