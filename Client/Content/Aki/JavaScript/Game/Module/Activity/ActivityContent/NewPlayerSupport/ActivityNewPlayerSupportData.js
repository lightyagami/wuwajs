"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityNewPlayerSupportData = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RoleUtils_1 = require("../../../RoleUi/RoleUtils");
const ActivityData_1 = require("../../ActivityData");
const ActivityNewPlayerSupportTaskData_1 = require("./ActivityNewPlayerSupportTaskData");
class ActivityNewPlayerSupportData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.qkt = [];
    this.UOt = false;
    this.Yig = false;
    this.HaveFinishCarnivalRole = 0;
    this.lVl = (e, t) => e.Id - t.Id;
  }
  get AlreadyStartView() {
    return this.Yig;
  }
  set AlreadyStartView(e) {
    this.Yig = e;
  }
  get IsActivityFirstShow() {
    return this.UOt;
  }
  get CurUseTrialRoleId() {
    return ModelManager_1.ModelManager.TrialRoleModel.GetCurUseTrialRole(2)?.TrialRoleId;
  }
  get CurUseTrialRoleData() {
    return ModelManager_1.ModelManager.TrialRoleModel.GetCurUseTrialRole(2);
  }
  OnInit(e) {
    this.UOt = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityNewPlayerSupportFirstShow) ?? false;
  }
  PhraseEx(e) {
    e = e.NCf;
    if (e) {
      this.Hqf(e.YLf);
      this.jqf(e.nAu);
      this.$qf(e.nRf, e.h_g);
      this.HaveFinishCarnivalRole = e.aVg;
      this.eJf();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivityNewPlayerSupportInfoUpdate);
    }
  }
  $qf(e, t) {
    if (RoleUtils_1.RoleUtils.IsTrialRole(e)) {
      ModelManager_1.ModelManager.TrialRoleModel.SetCurUseTrialRole(e, t);
    }
  }
  Hqf(e) {
    var t;
    var r;
    var a = [];
    var i = new Set();
    for (const n of e) {
      a.push({
        TrialRoleId: n.HCf,
        IsUnlocked: true
      });
      var o = ConfigManager_1.ConfigManager.TrialRoleConfig?.GetTrialRoleGroupId(n.HCf);
      i.add(o);
    }
    for ([t, r] of ConfigManager_1.ConfigManager.TrialRoleConfig?.GetTrialRoleAllConfigByType(2)) {
      if (!i.has(t)) {
        a.push({
          TrialRoleId: r[0].Id,
          IsUnlocked: false
        });
      }
    }
    ModelManager_1.ModelManager.TrialRoleModel.AddTrialRoles(a);
  }
  jqf(e) {
    this.qkt = [];
    this.UpdateTaskData(e);
  }
  Wqf(e) {
    let t = this.GetTaskData(e);
    if (!t) {
      t = new ActivityNewPlayerSupportTaskData_1.ActivityNewPlayerSupportTaskData(e);
      this.qkt.push(t);
    }
    return t;
  }
  GetTaskDataList() {
    this.qkt.sort(this.lVl);
    return this.qkt;
  }
  GetTaskData(t) {
    return this.qkt.find(e => e.Id === t);
  }
  GetCanReceiveTaskIdList() {
    const t = [];
    this.qkt.forEach(e => {
      if (e.CanReceiveReward()) {
        t.push(e.Id);
      }
    });
    return t;
  }
  GetTrialRoleList() {
    return ModelManager_1.ModelManager.TrialRoleModel.GetDataListByType(2);
  }
  GetTrialRoleByGroupId(e) {
    return ModelManager_1.ModelManager.TrialRoleModel.GetDataByGroupId(e);
  }
  UpdateCurUseTrialRole(e, t) {
    ModelManager_1.ModelManager.TrialRoleModel.SetCurUseTrialRole(e, t);
  }
  UpdateTaskData(e) {
    for (const t of e) {
      const e = this.Wqf(t.s5n);
      e.Refresh(t);
    }
  }
  UpdateActivatedTrialRole(e, t) {
    ModelManager_1.ModelManager.TrialRoleModel.SetGroupTrialRoleId(e, t);
  }
  GetDesc() {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.LocalConfig.Desc);
  }
  HasUnlockTrialRole() {
    for (const e of this.GetTrialRoleList()) {
      if (e.IsUnlocked()) {
        return true;
      }
    }
    return false;
  }
  GetFirstUnFinishMainQuestId() {
    return ModelManager_1.ModelManager.QuestNewModel.GetFirstShowQuestByType(1)?.Id;
  }
  GetExDataRedPointShowState() {
    return this.IsHasRewardRedPoint() || this.IsTrialRoleUpgradeRedPoint() || this.IsTrialRoleEntranceRedDot() || this.IsAdventureEntranceRedDot();
  }
  IsHasRewardRedPoint() {
    for (const e of this.qkt) {
      if (e.CanReceiveReward()) {
        return true;
      }
    }
    return false;
  }
  IsTrialRoleUpgradeRedPoint() {
    for (const e of this.GetTrialRoleList()) {
      if (e.CanUpgrade()) {
        return true;
      }
    }
    return false;
  }
  IsTrialRoleEntranceRedDot() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.NewPlayerSupportTrialRoleEntranceRedDot) ?? false;
  }
  IsAdventureEntranceRedDot() {
    return !LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressAdventureRedDotCheckedInPeriod, false);
  }
  SaveTrailRoleEntranceRedDot(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.NewPlayerSupportTrialRoleEntranceRedDot, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivityNewPlayerSupportEntranceRedDotUpdate);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  eJf() {
    if (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityNewPlayerSupportFirstShow) === undefined) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityNewPlayerSupportFirstShow, true);
    }
  }
  RecordActivityFirstShow() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityNewPlayerSupportFirstShow, false);
  }
}
exports.ActivityNewPlayerSupportData = ActivityNewPlayerSupportData;
//# sourceMappingURL=ActivityNewPlayerSupportData.js.map