"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const BackgroundCardAll_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardAll");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const PlayerTitleById_1 = require("../../../../Core/Define/ConfigQuery/PlayerTitleById");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const LevelGeneralController_1 = require("../../../LevelGamePlay/LevelGeneralController");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PlayerHeadData_1 = require("../Data/PlayerHeadData");
const PersonalDefine_1 = require("./PersonalDefine");
class PersonalModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.UiCachePersonalData = undefined;
    this.p5i = undefined;
    this.C3l = new Map();
    this.g3l = new Map();
    this.Qac = new Map();
    this.e6l = (e, t) => {
      var r = e.Lock ? 1 : 0;
      var a = t.Lock ? 1 : 0;
      if (r != a) {
        return r - a;
      } else if (t.Config.SortIndex !== e.Config.SortIndex) {
        return t.Config.SortIndex - e.Config.SortIndex;
      } else {
        return t.Config.Id - e.Config.Id;
      }
    };
  }
  OnInit() {
    this.p5i ||= new PersonalDefine_1.PersonalInfoData();
    return true;
  }
  InitPlayerHeadData(e) {
    this.C3l.clear();
    var t = ConfigManager_1.ConfigManager.PersonalConfig.GetAllPlayerHeadConfig();
    if (t !== undefined) {
      for (const a of t) {
        var r = new PlayerHeadData_1.PlayerHeadData(a);
        this.C3l.set(r.Id, r);
      }
      this.f3l();
      this.UpdatePlayerHeadData(e);
    }
  }
  f3l() {
    this.g3l.clear();
    for (var [, e] of this.C3l) {
      var t;
      var r = e.Config.RoleSkinId;
      if (!(r <= 0)) {
        if ((t = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(r)) && ModelManager_1.ModelManager.RoleModel.IsMainRole(t.GetRoleId())) {
          this.g3l.set(e.Id, r);
        }
      }
    }
  }
  UpdatePlayerHeadData(e) {
    for (const t of e) {
      this.UnLockPlayerHeadData(t);
    }
  }
  UnLockPlayerHeadData(e) {
    e = this.GetPlayerHeadData(e);
    if (e !== undefined) {
      e.Lock = false;
    }
  }
  OnClear() {
    this.p5i = undefined;
    ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.PersonalDataItem);
    return true;
  }
  GetPersonalInfoData() {
    return this.p5i;
  }
  SetRoleShowList(t) {
    this.p5i.RoleShowList = [];
    var r = t.length;
    for (let e = 0; e < r; e++) {
      var a = t[e];
      this.p5i.RoleShowList.push(new PersonalDefine_1.RoleShowEntry(a.Q6n, a.F6n));
    }
  }
  UpdateRoleShowList(t) {
    this.p5i.RoleShowList = [];
    var r = t.length;
    for (let e = 0; e < r; e++) {
      var a = t[e];
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(a).GetLevelData();
      this.p5i.RoleShowList.push(new PersonalDefine_1.RoleShowEntry(a, i.GetLevel()));
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleShowListChange);
  }
  GetRoleShowList() {
    return this.p5i.RoleShowList;
  }
  SetCardShowList(e) {
    this.p5i.CardShowList = e;
  }
  GetCardShowList() {
    return this.p5i.CardShowList;
  }
  SetCurCardId(e) {
    this.p5i.CurCardId = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCardChange);
  }
  GetCurCardId() {
    if (this.p5i.CurCardId && this.p5i.CurCardId > 0) {
      return this.p5i.CurCardId;
    } else {
      return ConfigManager_1.ConfigManager.FriendConfig.GetDefaultBackgroundCardId();
    }
  }
  SetBirthday(e) {
    this.p5i.Birthday = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBirthChange);
  }
  SetBirthdayDisplay(e) {
    this.p5i.IsBirthdayDisplay = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBirthDisplayChange);
  }
  SetName(e) {
    this.p5i.Name = e;
  }
  SetPlayerId(e) {
    this.p5i.PlayerId = e;
  }
  SetModifyNameInfo(e, t) {
    this.p5i.LastModifyNameTime = Number(MathUtils_1.MathUtils.LongToBigInt(e));
    this.p5i.ModifyName = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnModifyNameStateChange);
  }
  GetBirthday() {
    return this.p5i.Birthday;
  }
  GetBirthdayDisplay() {
    return this.p5i.IsBirthdayDisplay;
  }
  SetSignature(e) {
    this.p5i.Signature = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSignChange);
  }
  GetSignature() {
    return this.p5i.Signature;
  }
  SetHeadPhotoId(e) {
    this.p5i.HeadPhotoId = e;
    ModelManager_1.ModelManager.PlayerInfoModel.ChangeNumberProp(4, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHeadIconChange, e);
  }
  GetHeadPhotoId() {
    var e;
    if (!this.p5i.HeadPhotoId) {
      e = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(4);
      this.p5i.HeadPhotoId = e;
    }
    return this.p5i.HeadPhotoId;
  }
  GetPsnUserId() {
    return this.p5i.PsnUserId;
  }
  SetCardUnlockList(t) {
    this.wha();
    var r = t.length;
    for (let e = 0; e < r; e++) {
      var a = t[e];
      var i = this.Bha(a.J7n);
      if (i === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Personal", 58, "初始化卡牌,无效CardId", ["cardId", a.J7n]);
        }
      } else {
        i.RefreshData(a.qSs ?? false, true);
      }
    }
  }
  wha() {
    this.p5i.CardDataList = [];
    BackgroundCardAll_1.configBackgroundCardAll.GetConfigList().forEach(e => {
      this.p5i.CardDataList.push(new PersonalDefine_1.PersonalCardData(e.Id, false, false));
    });
  }
  Bha(e) {
    for (const t of this.p5i.CardDataList) {
      if (t.CardId === e) {
        return t;
      }
    }
  }
  UpdateCardUnlockList(t, r) {
    var a = this.p5i.CardDataList.length;
    for (let e = 0; e < a; e++) {
      var i = this.p5i.CardDataList[e];
      if (i.CardId === t) {
        i.IsRead = r;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPersonalCardRead, t);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPersonalCardRefreshRedDot);
        break;
      }
    }
  }
  AddCardUnlockList(e, t) {
    var r = this.Bha(e);
    if (r === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Personal", 58, "新解锁卡牌,无效CardId", ["cardId", e]);
      }
    } else {
      r.RefreshData(t, true);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPersonalCardRefreshRedDot);
    }
  }
  GetCardDataList() {
    return this.p5i.CardDataList;
  }
  GetPersonalCardRedDotState() {
    for (const e of this.p5i.CardDataList) {
      if (e.IsUnLock && !e.IsRead) {
        return true;
      }
    }
    return false;
  }
  GetPersonalTitleRedDotState() {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10082)) {
      if (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleUnlockRedDot, true)) {
        return true;
      }
      var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleRecord);
      if (e) {
        for (var [, t] of e) {
          if (t) {
            return true;
          }
        }
      }
    }
    return false;
  }
  GetPersonalModifyNameState() {
    var e;
    var t;
    if (this.p5i.ModifyName !== StringUtils_1.EMPTY_STRING) {
      return 1;
    } else {
      e = TimeUtil_1.TimeUtil.GetServerTime();
      t = CommonParamById_1.configCommonParamById.GetIntConfig("NameModifyCd");
      if (this.p5i.LastModifyNameTime + t < e) {
        return 0;
      } else {
        return 2;
      }
    }
  }
  SetLevel(e) {
    this.p5i.Level = e;
  }
  SetWorldLevel(e) {
    this.p5i.WorldLevel = e;
  }
  CheckCanShowPersonalTip() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("IndividualizationReddotConditionGroup");
    return !!LevelGeneralController_1.LevelGeneralController.CheckCondition(e.toString(), undefined) && (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ShowPersonalTip) ?? true);
  }
  SetPersonalTipState(e) {
    if (this.CheckCanShowPersonalTip() !== e) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ShowPersonalTip, e);
    }
  }
  GetPlayerHeadData(e, t = true) {
    var r = this.C3l.get(e);
    if (r === undefined && t && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Personal", 58, "获取玩家头像数据失败", ["playerHeadId", e]);
    }
    return r;
  }
  GetPlayerShowHeadDataList() {
    var e;
    var t = [];
    var r = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId();
    var a = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinIdByRoleId(r);
    for ([, e] of this.C3l) {
      if (!this.g3l.has(e.Id) || a === this.g3l.get(e.Id)) {
        t.push(e);
      }
    }
    t.sort(this.e6l);
    return t;
  }
  GetUnlockHeadNum() {
    let e = 0;
    for (const t of this.GetPlayerShowHeadDataList()) {
      if (!t.Lock) {
        e++;
      }
    }
    return e;
  }
  SetSex(e) {
    this.p5i.Sex = e;
  }
  GetSex() {
    return this.p5i.Sex;
  }
  InitPlayerTitleData(e) {
    this.Qac.clear();
    for (const a of e) {
      var t;
      var r = new PersonalDefine_1.PersonalPlayerTitleData(a.tnc, a.K6n);
      if (a.GNs !== 0) {
        r.SetStarLevel(a.GNs);
      }
      if (a.yzs !== 0) {
        t = MathUtils_1.MathUtils.LongToNumber(a.yzs);
        r.SetUnlockTime(t);
      }
      this.Qac.set(a.tnc, r);
    }
    this.p5i.PlayerTitleDataList = Array.from(this.Qac.values());
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerTitleRefreshRedDot);
  }
  SetDressedPlayerTitle(e, t = undefined) {
    this.p5i.CurPlayerTitleId = e;
    this.p5i.CurPlayerTitleLevel = t;
    e = this.Qac.get(e);
    if (e && t) {
      e.StarLevel = t;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerTitleChange);
  }
  UpdateUnDressedPlayerTitleList(e) {
    for (const a of e) {
      var t;
      var r = this.Qac.get(a.tnc);
      if (!r) {
        return;
      }
      if (a.GNs) {
        r.SetStarLevel(a.GNs);
      }
      if (a.K6n !== r.IsUnLock) {
        t = MathUtils_1.MathUtils.LongToNumber(a.yzs);
        r.UnLock(t);
        (r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleRecord) ?? new Map()).set(a.tnc, true);
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleRecord, r);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerTitleRefreshRedDot);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerTitleUnlock);
      }
    }
  }
  GetDressedPlayerTitleData() {
    let e = 0;
    if (this.p5i.CurPlayerTitleId && this.p5i.CurPlayerTitleId > 0) {
      e = this.p5i.CurPlayerTitleId;
    }
    return this.Qac.get(e);
  }
  GetDressedPlayerTitleId() {
    if (this.p5i.CurPlayerTitleId && this.p5i.CurPlayerTitleId > 0) {
      return this.p5i.CurPlayerTitleId;
    } else {
      return 0;
    }
  }
  GetDressedPlayerTitleLevel() {
    if (this.p5i.CurPlayerTitleLevel && this.p5i.CurPlayerTitleLevel > 0) {
      return this.p5i.CurPlayerTitleLevel;
    } else {
      return 0;
    }
  }
  GetPlayerTitleData(e) {
    return this.Qac.get(e);
  }
  GetPlayerTitleStarLevel(e) {
    var t = this.Qac.get(e);
    if (t) {
      return t.StarLevel ?? 0;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Personal", 71, "称号id无效", ["playerTitleId", e]);
      }
      return 0;
    }
  }
  GetPlayerTitleList() {
    var e = Array.from(this.Qac.values());
    e.sort((e, t) => {
      var r;
      var a;
      if (e.IsUnLock !== t.IsUnLock) {
        return Number(t.IsUnLock) - Number(e.IsUnLock);
      } else {
        r = PlayerTitleById_1.configPlayerTitleById.GetConfig(e.PlayerTitleId);
        a = PlayerTitleById_1.configPlayerTitleById.GetConfig(t.PlayerTitleId);
        if (r.SortIndex !== a.SortIndex) {
          return a.SortIndex - r.SortIndex;
        } else {
          return t.PlayerTitleId - e.PlayerTitleId;
        }
      }
    });
    return e;
  }
  GetUnlockTitleDataCount() {
    let t = 0;
    this.GetPlayerTitleList().forEach(e => {
      if (e.IsUnLock) {
        t++;
      }
    });
    return t;
  }
  GetPlayerTitleInfoString(e, t, r = false) {
    e = PlayerTitleById_1.configPlayerTitleById.GetConfig(e);
    let a = undefined;
    if (e.ActvityName) {
      a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.ActvityName);
    }
    let i = undefined;
    if (e.SeasonName) {
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.SeasonName);
    }
    e = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.HonorDescription), t.toString());
    if (!a && !i) {
      return e;
    }
    t = r ? "\n" : "";
    let n = "";
    return n = a && i ? `${a}·${i}——${t}${e}` : (a || i) + "——" + t + e;
  }
}
exports.PersonalModel = PersonalModel;
//# sourceMappingURL=PersonalModel.js.map