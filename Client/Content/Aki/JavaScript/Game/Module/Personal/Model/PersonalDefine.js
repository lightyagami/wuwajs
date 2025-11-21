"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playerTitleQualityToColor = exports.PersonalInfoData = exports.RoleShowEntry = exports.PersonalPlayerTitleData = exports.PersonalCardData = exports.STOP_AUDIO_EVENT_NAME = exports.MAX_NAME_LENGTH = exports.MAX_SIGN_LENGTH = undefined;
const BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
exports.MAX_SIGN_LENGTH = 40;
exports.MAX_NAME_LENGTH = 12;
exports.STOP_AUDIO_EVENT_NAME = "stop_gacha_role_audio";
class PersonalCardData {
  constructor(t, e, s) {
    this.CardId = 0;
    this.IsRead = false;
    this.IsUnLock = false;
    this.CardId = t;
    this.IsRead = e;
    this.IsUnLock = s;
  }
  RefreshData(t, e) {
    this.IsRead = t;
    this.IsUnLock = e;
  }
}
exports.PersonalCardData = PersonalCardData;
class PersonalPlayerTitleData {
  constructor(t, e) {
    this.PlayerTitleId = 0;
    this.StarLevel = undefined;
    this.IsUnLock = false;
    this.UnlockTime = undefined;
    this.CurProgress = undefined;
    this.TargetProgress = undefined;
    this.PlayerTitleId = t;
    this.IsUnLock = e;
    if (this.IsUnLock && (e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleRecord) ?? new Map()).get(t) === undefined) {
      e.set(t, true);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleRecord, e);
    }
  }
  SetUnLockProgress(t, e) {
    this.CurProgress = t;
    this.TargetProgress = e;
  }
  UnLock(t) {
    this.IsUnLock = true;
    this.UnlockTime = t;
  }
  SetStarLevel(t) {
    this.StarLevel = t;
  }
  SetUnlockTime(t) {
    this.UnlockTime = t;
  }
  GetIsShowRedDot() {
    return (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleRecord) ?? new Map()).get(this.PlayerTitleId) ?? false;
  }
}
exports.PersonalPlayerTitleData = PersonalPlayerTitleData;
class RoleShowEntry {
  constructor(t, e) {
    this.Q6n = t;
    this.F6n = e;
  }
}
exports.RoleShowEntry = RoleShowEntry;
class PersonalInfoData {
  constructor() {
    this.RoleShowList = [];
    this.CardShowList = [];
    this.CurCardId = undefined;
    this.zk1 = 0;
    this.IsBirthdayDisplay = false;
    this.CardDataList = [];
    this.Signature = "";
    this.HeadPhotoId = undefined;
    this.IsOtherData = false;
    this.Level = 0;
    this.WorldLevel = 0;
    this.Name = "";
    this.PlayerTitleDataList = [];
    this.CurPlayerTitleId = undefined;
    this.CurPlayerTitleLevel = undefined;
    this.Sex = 0;
    this.PlayerId = 0;
    this.LastModifyNameTime = 0;
    this.ModifyName = StringUtils_1.EMPTY_STRING;
    this.PsnUserId = undefined;
    this.PsnOnlineId = undefined;
  }
  GetUnlockCardDataCount() {
    let e = 0;
    this.CardDataList.forEach(t => {
      if (t.IsUnLock) {
        e++;
      }
    });
    return e;
  }
  GetCardList(e) {
    let t = this.CardDataList;
    (t = t.filter(t => !!e || t.IsUnLock)).sort((t, e) => {
      var s;
      var r;
      if (t.IsUnLock !== e.IsUnLock) {
        return Number(e.IsUnLock) - Number(t.IsUnLock);
      } else {
        s = BackgroundCardById_1.configBackgroundCardById.GetConfig(t.CardId);
        r = BackgroundCardById_1.configBackgroundCardById.GetConfig(e.CardId);
        if (s.SortIndex !== r.SortIndex) {
          return r.SortIndex - s.SortIndex;
        } else {
          return e.CardId - t.CardId;
        }
      }
    });
    return t;
  }
  get Birthday() {
    return this.zk1;
  }
  set Birthday(t) {
    ModelManager_1.ModelManager.BirthdayModel.ResetYear = Math.floor(t / 10000);
    this.zk1 = t % 10000;
    if (t < 10000) {
      this.zk1 = 0;
    }
  }
}
exports.PersonalInfoData = PersonalInfoData;
exports.playerTitleQualityToColor = {
  [0]: "FFF7A0FF",
  1: "D3DEFFFF",
  2: "B19370FF"
}; //# sourceMappingURL=PersonalDefine.js.map