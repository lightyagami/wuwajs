"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubPackageController = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const VideoResUpdate_1 = require("../../../Launcher/DiffPatch/Update/VideoResUpdate");
const NetworkDefine_1 = require("../../../Launcher/NetworkDefine");
const ResourceUpdateManager_1 = require("../../../Launcher/Update/ResourceDiffUpdate/ResourceUpdateManager");
const LauncherTextLib_1 = require("../../../Launcher/Util/LauncherTextLib");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const SubPackageDefine_1 = require("./SubPackageDefine");
const ENTER_AREA_CD = 10000;
class SubPackageController extends UiControllerBase_1.UiControllerBase {
  static DeleteUnneededResourceOnInit() {
    if (!this.zwm) {
      this.zwm = true;
      if (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SubDownLoadClearOnLogin)) {
        this.DeleteUnneededResource(false);
      }
    }
  }
  static rTm() {
    ModelManager_1.ModelManager.SubPackageDownLoadModel.PauseSubPackageId = 0;
    if (!ModelManager_1.ModelManager.SubPackageDownLoadModel.DownLoadingSubPackageId) {
      var e = ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList.shift();
      if (e) {
        if (ModelManager_1.ModelManager.SubPackageDownLoadModel.IsKeyPackageDownLoadingPause() && e !== SubPackageDefine_1.KEY_SUBPACKAGE_ID) {
          ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList.unshift(e);
        } else if (ModelManager_1.ModelManager.SubPackageDownLoadModel.HaveNotEnoughSpace(e)) {
          ModelManager_1.ModelManager.SubPackageDownLoadModel.SetSubPackageDownLoadItemStateMap(e, 2);
          if (!UiManager_1.UiManager.IsViewOpen("SubPackageDownLoadFreeSpaceTipsView")) {
            UiManager_1.UiManager.OpenView("SubPackageDownLoadFreeSpaceTipsView", e);
          }
        } else {
          ModelManager_1.ModelManager.SubPackageDownLoadModel.SetSubPackageDownLoadItemStateMap(e, 1);
          var a = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemUpdater(e) ?? [];
          for (const o of a) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("SubPackageDownLoad", 5, "update.UpdateResourceProcedure()", ["id", e], ["TotalProgress", o.ViewInfo.TotalSize], ["CurProgress", o.ViewInfo.SavedSize], ["updater", o.Name]);
            }
            o.UpdateResourceProcedure();
          }
          for (const r of a) {
            this.ReportSubPackageDownLoadLogEvent(e, 1, r);
          }
          if (e === SubPackageDefine_1.KEY_SUBPACKAGE_ID) {
            this.ClearLocalDownLoadList();
            this.ReportSubPackageKeySubPackageLogEvent(0, 1);
          } else {
            this.SaveLocalDownLoadList();
          }
        }
      }
    }
  }
  static async PushSubPackageDownLoading(e, a) {
    var o = await this.ewm();
    if (!o) {
      for (const r of e) {
        if (ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(r) !== 5 && ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(r) !== 1) {
          ModelManager_1.ModelManager.SubPackageDownLoadModel.SetSubPackageDownLoadItemStateMap(r, 3);
          if (r !== ModelManager_1.ModelManager.SubPackageDownLoadModel.KeyPackageStateId) {
            ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList.push(r);
          } else {
            ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList.unshift(r);
          }
        }
      }
      if (!ModelManager_1.ModelManager.SubPackageDownLoadModel.PauseSubPackageId) {
        this.rTm();
      }
      a?.();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshSubPackageDownLoadByPriority);
      this.SaveLocalDownLoadList();
    }
  }
  static async RestartSubPackageDownLoading(e, a) {
    if (!(await this.ewm())) {
      if (ModelManager_1.ModelManager.SubPackageDownLoadModel.PauseSubPackageId) {
        ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList.unshift(ModelManager_1.ModelManager.SubPackageDownLoadModel.PauseSubPackageId);
        ModelManager_1.ModelManager.SubPackageDownLoadModel.SetSubPackageDownLoadItemStateMap(ModelManager_1.ModelManager.SubPackageDownLoadModel.PauseSubPackageId, 3);
      }
      this.rTm();
      a?.();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshSubPackageDownLoadByPriority);
      this.SaveLocalDownLoadList();
    }
  }
  static async PrioritySubPackageDownLoading(a, e) {
    var o = await this.ewm();
    if (!o) {
      var o = ModelManager_1.ModelManager.SubPackageDownLoadModel.PauseSubPackageId;
      if (o && !a.includes(o)) {
        ModelManager_1.ModelManager.SubPackageDownLoadModel.SetSubPackageDownLoadItemStateMap(o, 3);
        ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList.unshift(o);
      }
      var r = ModelManager_1.ModelManager.SubPackageDownLoadModel.DownLoadingSubPackageId;
      if (r && !a.includes(r)) {
        this.StopSubPackageDownLoading(r);
        ModelManager_1.ModelManager.SubPackageDownLoadModel.SetSubPackageDownLoadItemStateMap(r, 3);
        ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList.unshift(r);
      }
      ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList = ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList.filter(e => !a.includes(e));
      var n = [];
      for (const t of a) {
        if (ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(t) !== 5 && t !== r) {
          n.push(t);
        }
      }
      for (const _ of n) {
        ModelManager_1.ModelManager.SubPackageDownLoadModel.SetSubPackageDownLoadItemStateMap(_, 3);
      }
      ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList.unshift(...n);
      this.rTm();
      e?.();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshSubPackageDownLoadByPriority);
      this.SaveLocalDownLoadList();
    }
  }
  static StopSubPackageDownLoading(e, a) {
    if (ModelManager_1.ModelManager.SubPackageDownLoadModel.DownLoadingSubPackageId === e && e) {
      ModelManager_1.ModelManager.SubPackageDownLoadModel.SetSubPackageDownLoadItemStateMap(e, 2);
      for (const o of ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemUpdater(e) ?? []) {
        o.Stop();
      }
      ModelManager_1.ModelManager.SubPackageDownLoadModel.DownLoadingSubPackageId = 0;
      a?.();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshSubPackageDownLoadByPriority);
      this.SaveLocalDownLoadList();
    }
  }
  static CancelSubPackageDownLoading(a) {
    if (ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(a) !== 5) {
      ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList = ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList.filter(e => e !== a);
      ModelManager_1.ModelManager.SubPackageDownLoadModel.SetSubPackageDownLoadItemStateMap(a, 4);
      if (a === ModelManager_1.ModelManager.SubPackageDownLoadModel.PauseSubPackageId) {
        ModelManager_1.ModelManager.SubPackageDownLoadModel.PauseSubPackageId = 0;
        this.rTm();
      }
      if (a === ModelManager_1.ModelManager.SubPackageDownLoadModel.DownLoadingSubPackageId) {
        ModelManager_1.ModelManager.SubPackageDownLoadModel.DownLoadingSubPackageId = 0;
        this.rTm();
      }
      for (const e of ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemUpdater(a) ?? []) {
        e.Stop();
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshSubPackageDownLoadByPriority);
      this.SaveLocalDownLoadList();
    }
  }
  static CancelSubPackageDownLoadingList(e) {
    var a = [];
    for (const o of ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList) {
      if (!e.includes(o) && ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(o) !== 5) {
        a.push(o);
      }
    }
    ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList = a;
    for (const r of e) {
      if (ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(r) !== 5) {
        ModelManager_1.ModelManager.SubPackageDownLoadModel.SetSubPackageDownLoadItemStateMap(r, 4);
        if (r === ModelManager_1.ModelManager.SubPackageDownLoadModel.PauseSubPackageId) {
          ModelManager_1.ModelManager.SubPackageDownLoadModel.PauseSubPackageId = 0;
          this.rTm();
        }
        if (r === ModelManager_1.ModelManager.SubPackageDownLoadModel.DownLoadingSubPackageId) {
          ModelManager_1.ModelManager.SubPackageDownLoadModel.DownLoadingSubPackageId = 0;
          this.rTm();
        }
        for (const n of ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemUpdater(r) ?? []) {
          n.Stop();
        }
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshSubPackageDownLoadByPriority);
    this.SaveLocalDownLoadList();
  }
  static DeleteUnneededResource(e) {
    this.ReportSubPackageClearSpaceLogEvent();
    var a = ModelManager_1.ModelManager.QuestNewModel.GetFinishQuestList();
    ControllerHolder_1.ControllerHolder.ResourceManagerController.DeleteUnneededResource(a);
    if (e) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SubPackageDownLoad_Clear_Tips");
    }
    this.ReportSubPackageClearSpaceFinishLogEvent(!e);
  }
  static async ewm() {
    const e = new CustomPromise_1.CustomPromise();
    var a;
    if (!(LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SubDownLoadAgreeUseCellData) ?? false) && ModelManager_1.ModelManager.SubPackageDownLoadModel.NetworkListener.GetNetworkType() === NetworkDefine_1.ENetworkType.Cell) {
      (a = new ConfirmBoxDefine_1.ConfirmBoxDataNew(398)).FunctionMap.set(1, () => {
        e?.SetResult(true);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
      });
      a.FunctionMap.set(2, () => {
        e?.SetResult(false);
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SubDownLoadAgreeUseCellData, true);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshSubPackUseCellData);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(a);
    } else {
      e?.SetResult(false);
    }
    return e.Promise;
  }
  static AutoDownLoadKeySubPackage() {
    this.PrioritySubPackageDownLoading([SubPackageDefine_1.KEY_SUBPACKAGE_ID]);
    if (!(LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SubDownLoadAgreeUseCellData) ?? false) && ModelManager_1.ModelManager.SubPackageDownLoadModel.NetworkListener.GetNetworkType() === NetworkDefine_1.ENetworkType.Cell) {
      ModelManager_1.ModelManager.SubPackageDownLoadModel.SetSubPackageDownLoadItemStateMap(SubPackageDefine_1.KEY_SUBPACKAGE_ID, 2);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshSubPackageDownLoadByPriority);
    }
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(19636, this.aTm);
    Net_1.Net.Register(24355, this.hTm);
    Net_1.Net.Register(16918, this.lTm);
    Net_1.Net.Register(21065, this._Tm);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19636);
    Net_1.Net.UnRegister(24355);
    Net_1.Net.UnRegister(16918);
    Net_1.Net.UnRegister(21065);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EnterAreaNotify, this.nbm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleChangeEnd, this.Ylo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.p5a);
    ModelManager_1.ModelManager.SubPackageDownLoadModel.NetworkListener.NetworkChangeDelegate.Add(this.cso);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnterAreaNotify, this.nbm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleChangeEnd, this.Ylo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.p5a);
    ModelManager_1.ModelManager.SubPackageDownLoadModel.NetworkListener.NetworkChangeDelegate.Clear();
  }
  static SceneBlockChangePush(e, a = []) {
    e = Protocol_1.Aki.Protocol.BSm.create({
      VSm: e,
      jSm: a
    });
    Net_1.Net.Send(24293, e);
  }
  static SceneBlockSplitClientLoginPush(e) {
    e = Protocol_1.Aki.Protocol.xSm.create({
      VSm: e
    });
    Net_1.Net.Send(29799, e);
  }
  static DownLoadFinish() {
    const a = ModelManager_1.ModelManager.SubPackageDownLoadModel.DownLoadingSubPackageId;
    if (a) {
      for (const r of ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemUpdater(a) ?? []) {
        if (!r.IsCompleteDownloaded()) {
          return;
        }
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SubPackageDownLoad", 5, "DownLoadFinish", ["id", a]);
      }
      if (a === SubPackageDefine_1.KEY_SUBPACKAGE_ID) {
        ModelManager_1.ModelManager.SubPackageDownLoadModel.UpdaterDownLoadSize();
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(400)).FunctionMap.set(1, () => {
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
        });
        e.FunctionMap.set(2, () => {
          if (UiManager_1.UiManager.IsViewOpen("SubPackageDownLoadView")) {
            UiManager_1.UiManager.CloseView("SubPackageDownLoadView");
          }
          ControllerHolder_1.ControllerHolder.ResourceManagerController.LoginPrepareResCheckPromise?.SetResult();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(e);
      }
      ModelManager_1.ModelManager.SubPackageDownLoadModel.SetSubPackageDownLoadItemStateMap(a, 5);
      ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList = ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList.filter(e => e !== a);
      var e = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageById(a);
      if (e.Type === 4) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SubPackageDownLoad_Gender_Tips");
      } else {
        if (e.Type === 2) {
          var o = [];
          for (const n of e.Area) {
            if (!ControllerHolder_1.ControllerHolder.ResourceManagerController.IsNeedReOpenMap(n)) {
              o.push(n);
            }
          }
          this.SceneBlockChangePush(o);
        }
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Title);
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SubPackageDownLoad_Finish_Tips", e);
      }
      ControllerHolder_1.ControllerHolder.ResourceManagerController.UpdateServerQuestState();
      ModelManager_1.ModelManager.SubPackageDownLoadModel.DownLoadingSubPackageId = 0;
      this.rTm();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshSubPackageDownLoadByPriority);
      this.SaveLocalDownLoadList();
    }
  }
  static CheckBlockHaveDownLoad(e) {
    return !ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit() || (e = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetBlockBelongToSubPackage(e), ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(e) === 5);
  }
  static SaveLocalDownLoadList() {
    var e = [];
    e.push(...ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList);
    var a = ModelManager_1.ModelManager.SubPackageDownLoadModel.DownLoadingSubPackageId;
    if (a) {
      e.unshift(a);
    }
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SubDownLoadLastDownLoadList, e);
  }
  static ClearLocalDownLoadList() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SubDownLoadLastDownLoadList, []);
  }
  static ReportSubPackageKeySubPackageLogEvent(e, a) {
    var o = new LogReportDefine_1.SubPackageKeySubPackageLogEvent();
    o.i_download_time = e;
    o.i_download_status = a;
    o.o_phantoms = ModelManager_1.ModelManager.SubPackageDownLoadModel.KeyIncludeSubPackageList;
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(o);
  }
  static ReportSubPackageDownLoadLogEvent(e, a, o) {
    var r = new LogReportDefine_1.SubPackageDownLoadLogEvent();
    r.s_suit_name = o.Name;
    r.b_if_storage_alert = ModelManager_1.ModelManager.SubPackageDownLoadModel.HaveTipsOutOfSpaceList.includes(e);
    r.i_peak_speed = Number(o.ViewInfo.DownloadSpeedMax) / LauncherTextLib_1.NUMBER_MB;
    r.i_download_time = 0;
    r.i_download_status = a;
    var a = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageById(e);
    r.i_resource_type = a.Type;
    r.i_resource_size = Number(o.ViewInfo.TotalSize) / LauncherTextLib_1.NUMBER_MB;
    r.i_state = ModelManager_1.ModelManager.GameModeModel.WorldDone ? 2 : 1;
    r.i_role_id = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1 ? 1 : 2;
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(r);
  }
  static ReportSubPackageOutOfSpaceLogEvent(e, a, o) {
    var r = new LogReportDefine_1.SubPackageOutOfSpaceLogEvent();
    r.s_suit_name = e.toString();
    r.b_if_storage_alert = ModelManager_1.ModelManager.SubPackageDownLoadModel.HaveTipsOutOfSpaceList.includes(e);
    var e = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageById(e);
    r.i_resource_type = e.Type;
    r.i_required_space = Number(a) / LauncherTextLib_1.NUMBER_MB;
    r.i_remaining_space = Number(o) / LauncherTextLib_1.NUMBER_MB;
    r.i_role_id = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1 ? 1 : 2;
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(r);
  }
  static ReportSubPackageClearSpaceLogEvent() {
    var e = new LogReportDefine_1.SubPackageClearSpaceLogEvent();
    var a = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SubDownLoadClearOnLogin);
    e.b_if_storage_alert = a ?? false;
    e.i_required_space = Number(ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageCanClearSpace()) / LauncherTextLib_1.NUMBER_MB;
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
  }
  static ReportSubPackageClearSpaceFinishLogEvent(e) {
    var a = new LogReportDefine_1.SubPackageClearSpaceFinishLogEvent();
    a.b_if_storage_alert = e;
    a.i_required_space = Number(ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageCanClearSpace()) / LauncherTextLib_1.NUMBER_MB;
    a.i_remaining_space = Number(VideoResUpdate_1.VideoResUpdate.GetFreeSpace()) / LauncherTextLib_1.NUMBER_MB;
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(a);
  }
}
exports.SubPackageController = SubPackageController;
(_a = SubPackageController).zwm = false;
SubPackageController.cso = e => {
  const a = ModelManager_1.ModelManager.SubPackageDownLoadModel.DownLoadingSubPackageId;
  var o = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SubDownLoadAgreeUseCellData) ?? false;
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("SubPackageDownLoad", 5, "OnNetworkTypeChange", ["newType", e], ["downLoadingId", a], ["isAgreeUseCell", o]);
  }
  if (e !== NetworkDefine_1.ENetworkType.WiFi && a && !o) {
    _a.StopSubPackageDownLoading(a);
    (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(398)).FunctionMap.set(1, () => {
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
    });
    e.FunctionMap.set(2, () => {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SubDownLoadAgreeUseCellData, true);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshSubPackUseCellData);
      _a.RestartSubPackageDownLoading(a);
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(e);
  }
};
SubPackageController.aTm = e => {};
SubPackageController.hTm = e => {};
SubPackageController.lTm = e => {};
SubPackageController._Tm = e => {
  var a = e.$Sm;
  if (ControllerHolder_1.ControllerHolder.ResourceManagerController.IsNeedReOpenMap(a)) {
    ModelManager_1.ModelManager.SubPackageDownLoadModel.OpenBlockNeedReLoginConfirm();
  } else {
    ModelManager_1.ModelManager.SubPackageDownLoadModel.OpenSubPackageDownLoadConfirm("SubPackageDownLoad_CommonLock_Confirm", [e.$Sm]);
  }
};
SubPackageController.$Lm = 0;
SubPackageController.nbm = e => {
  if (!ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen()) {
    var a = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetBlockBelongToSubPackage(e);
    if (ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(a) === 1) {
      if (_a.$Lm > TimeUtil_1.TimeUtil.GetServerTimeStamp()) {
        return undefined;
      } else {
        _a.$Lm = TimeUtil_1.TimeUtil.GetServerTimeStamp() + ENTER_AREA_CD;
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SubPackageDownLoad_Downloading");
        return;
      }
    }
    if (!_a.CheckBlockHaveDownLoad(e)) {
      ModelManager_1.ModelManager.SubPackageDownLoadModel.OpenSubPackageDownLoadConfirm("SubPackageDownLoad_CommonLock_Confirm", [e], undefined, ENTER_AREA_CD);
    }
    if (ControllerHolder_1.ControllerHolder.ResourceManagerController.IsNeedReOpenMap(e)) {
      ModelManager_1.ModelManager.SubPackageDownLoadModel.OpenBlockNeedReLoginConfirm();
    }
  }
};
SubPackageController.Ylo = () => {
  if (ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit()) {
    ControllerHolder_1.ControllerHolder.ResourceManagerController.UpdateServerQuestState();
  }
};
SubPackageController.p5a = () => {
  if (ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit()) {
    _a.DeleteUnneededResourceOnInit();
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SubDownLoadLastDownLoadList);
    if (e && !(e.length <= 0)) {
      for (const a of e) {
        if (ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(a) !== 5 && a !== ModelManager_1.ModelManager.SubPackageDownLoadModel.DownLoadingSubPackageId && a !== ModelManager_1.ModelManager.SubPackageDownLoadModel.PauseSubPackageId && !ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList.includes(a)) {
          ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList.push(a);
          ModelManager_1.ModelManager.SubPackageDownLoadModel.SetSubPackageDownLoadItemStateMap(a, 3);
        }
      }
      if (!ModelManager_1.ModelManager.SubPackageDownLoadModel.PauseSubPackageId) {
        _a.rTm();
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshSubPackageDownLoadByPriority);
      _a.SaveLocalDownLoadList();
    }
  }
}; //# sourceMappingURL=SubPackageController.js.map