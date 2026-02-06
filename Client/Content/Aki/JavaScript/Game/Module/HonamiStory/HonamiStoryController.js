"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryController = undefined;
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const HonamiStoryDangerLevelById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryDangerLevelById");
const HonamiStoryPollutionByActivityId_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryPollutionByActivityId");
const HonamiStoryPollutionStageById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryPollutionStageById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ActivityControllerBase_1 = require("../Activity/ActivityControllerBase");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const RewardItemData_1 = require("../ItemReward/RewardData/RewardItemData");
const HonamiStoryActivityData_1 = require("./Data/HonamiStoryActivityData");
const HonamiStoryUtil_1 = require("./HonamiStoryUtil");
const HonamiStoryActivityView_1 = require("./View/HonamiStoryActivityView");
class HonamiStoryController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.Tif = (e, t) => {
      if (e === 10124 && t) {
        e = Protocol_1.Aki.Protocol.fif.create();
        t = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetAllActivityConfig();
        let o = 0;
        for (const r of t) {
          o = r.ActivityId;
        }
        if (o !== 0) {
          e.w6n = o;
          Net_1.Net.Call(28839, e, e => {
            if (e && e.I$d) {
              ModelManager_1.ModelManager.HonamiStoryModel.InitActivityInfo(o, e.I$d);
            }
          });
        }
      }
    };
  }
  OnShowActivityFirstUnlockView(e) {
    UiManager_1.UiManager.OpenView("HonamiStoryUnlockTipView");
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityHonamiStoryGuide";
  }
  OnCreateSubPageComponent(e) {
    return new HonamiStoryActivityView_1.HonamiStoryActivityView();
  }
  OnCreateActivityData(e) {
    var o = new HonamiStoryActivityData_1.HonamiStoryActivityData();
    ModelManager_1.ModelManager.HonamiStoryModel.SetActivityData(o);
    return o;
  }
  OnGetIsOpeningActivityRelativeView() {
    throw new Error("Method not implemented.");
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceDungeon, HonamiStoryController.Ja1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInstanceChange, HonamiStoryController.o1m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, HonamiStoryController.FWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenSet, this.Tif);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.Tif);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceDungeon, HonamiStoryController.Ja1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInstanceChange, HonamiStoryController.o1m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, HonamiStoryController.FWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, this.Tif);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.Tif);
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(21616, HonamiStoryController.mQd);
    Net_1.Net.Register(27401, HonamiStoryController.OnHonamiStoryInstInfoNotify);
    Net_1.Net.Register(16919, HonamiStoryController.gQd);
    Net_1.Net.Register(28216, HonamiStoryController.CQd);
    Net_1.Net.Register(16075, HonamiStoryController.pQd);
    Net_1.Net.Register(18230, HonamiStoryController.dwm);
    Net_1.Net.Register(16359, HonamiStoryController.vQd);
    Net_1.Net.Register(28866, HonamiStoryController.OnHonamiStoryScoreRewardInfoUpdateNotify);
    Net_1.Net.Register(16604, HonamiStoryController.yQd);
    Net_1.Net.Register(20559, HonamiStoryController.SQd);
    Net_1.Net.Register(22267, HonamiStoryController.MQd);
    Net_1.Net.Register(16991, HonamiStoryController.EQd);
    Net_1.Net.Register(19448, HonamiStoryController.IQd);
    Net_1.Net.Register(24727, HonamiStoryController.Rem);
    Net_1.Net.Register(25471, HonamiStoryController.wnm);
    Net_1.Net.Register(21961, HonamiStoryController.tam);
    Net_1.Net.Register(19498, HonamiStoryController.Elm);
    Net_1.Net.Register(17936, HonamiStoryController.hLm);
    Net_1.Net.Register(15034, HonamiStoryController.lLm);
    Net_1.Net.Register(29702, HonamiStoryController._Lm);
    Net_1.Net.Register(25882, HonamiStoryController.yQm);
    Net_1.Net.Register(23192, HonamiStoryController.R1f);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21616);
    Net_1.Net.UnRegister(27401);
    Net_1.Net.UnRegister(16919);
    Net_1.Net.UnRegister(19448);
    Net_1.Net.UnRegister(28216);
    Net_1.Net.UnRegister(16075);
    Net_1.Net.UnRegister(18230);
    Net_1.Net.UnRegister(16359);
    Net_1.Net.UnRegister(28866);
    Net_1.Net.UnRegister(16604);
    Net_1.Net.UnRegister(20559);
    Net_1.Net.UnRegister(22267);
    Net_1.Net.UnRegister(16991);
    Net_1.Net.UnRegister(24727);
    Net_1.Net.UnRegister(25471);
    Net_1.Net.UnRegister(21961);
    Net_1.Net.UnRegister(19498);
    Net_1.Net.UnRegister(17936);
    Net_1.Net.UnRegister(15034);
    Net_1.Net.UnRegister(29702);
    Net_1.Net.UnRegister(25882);
  }
  static TryHonamiStoryInstLeave(e = false) {
    e = {
      LeaveType: ModelManager_1.ModelManager.HonamiStoryModel.CanSafeLeave ? 0 : 1,
      ShowSafeLeaveUpdate: e,
      ConfirmCallback: () => {
        var e = new Protocol_1.Aki.Protocol.v$d();
        Net_1.Net.Call(23818, e, () => {});
      }
    };
    UiManager_1.UiManager.OpenView("HonamiStoryLeaveTip", e);
  }
  static async OpenHonamiStoryBag() {
    let e = undefined;
    if (!HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon()) {
      return (e = await UiManager_1.UiManager.OpenViewAsync("HonamiStoryBackpackView")) !== undefined;
    }
    var o = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetPickUpRange();
    var o = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemDataInRange(o);
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(3);
    var r = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(2);
    if (o.length <= 0) {
      t.SetCapacity(r.GetCapacity());
      t.ClearBackpack();
      if (ModelManager_1.ModelManager.HonamiStoryModel.GetIsLastPickUpViewDirty()) {
        ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
      }
      ModelManager_1.ModelManager.HonamiStoryModel.SetIsLastPickUpViewDirty(false);
      return (e = await UiManager_1.UiManager.OpenViewAsync("HonamiStoryBackpackView")) !== undefined;
    }
    t.SetCapacity(r.GetCapacity());
    t.ClearBackpack();
    r = ModelManager_1.ModelManager.HonamiStoryModel.GetIsLastPickUpViewDirty();
    let a = false;
    for (const l of o) {
      var n = t.PushItemData(l);
      if (l.GetItemType() === 1) {
        a = true;
      }
      if (!n) {
        break;
      }
    }
    if (r || a) {
      ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
    }
    ModelManager_1.ModelManager.HonamiStoryModel.SetIsLastPickUpViewDirty(a);
    t.ShaveCapacity();
    return (e = HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView() ? await UiManager_1.UiManager.OpenViewAsync("HonamiStoryPickUpMobileView") : await UiManager_1.UiManager.OpenViewAsync("HonamiStoryPickUpBackpackView")) !== undefined;
  }
  static SetHonamiStoryLoadingInfoByResult(e) {
    e = e ? 4 : 3;
    HonamiStoryController.SetHonamiStoryLoadingInfoByTimingOnly(e);
  }
  static SetHonamiStoryLoadingInfoByTimingOnly(e) {
    e = {
      Timing: e
    };
    ModelManager_1.ModelManager.HonamiStoryModel.SetGamePlayLoadingData(e);
  }
  static SetHonamiStoryLoadingInfoByBtId(e) {
    e = {
      Timing: 2,
      BtId: e
    };
    ModelManager_1.ModelManager.HonamiStoryModel.SetGamePlayLoadingData(e);
  }
  static r_f(e, o) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HonamiStory", 48, "穗波安全撤离更新", ["Safe", e]);
    }
    if (ModelManager_1.ModelManager.HonamiStoryModel.CanSafeLeave === e) {
      if (e && o) {
        this.TryHonamiStoryInstLeave(false);
      }
    } else if (ModelManager_1.ModelManager.HonamiStoryModel.CanSafeLeave = e) {
      if (o) {
        this.TryHonamiStoryInstLeave(true);
      } else {
        this.ShowSafeLeaveUpdate();
      }
    }
  }
  static ShowSafeLeaveUpdate() {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed) {
      UiManager_1.UiManager.OpenView("HonamiStorySafeLeaveUpdateView");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryLeaveButtonUpdate);
    } else {
      ModelManager_1.ModelManager.HonamiStoryModel.CacheShowSafeLeaveUpdate = true;
    }
  }
  static SendHonamiStoryMascotRewardRequest(o, t) {
    var e = new Protocol_1.Aki.Protocol.i$d();
    e.H$d = o;
    Net_1.Net.Call(23249, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15732);
        } else {
          ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData().GetHonamiStoryMascotData(o).UpdateState(2);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryMascotRewardReceive, o);
          t();
        }
      }
    });
  }
  static SendHonamiStoryAreaSecretRewardRequest(o, t) {
    var e = new Protocol_1.Aki.Protocol.n$d();
    e.k4d = o;
    Net_1.Net.Call(24290, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21571);
        } else {
          ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData().GetHonamiStoryAreaData(o).UpdateCollectMascotState(2);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryAreaSecretRewardReceive, o);
          t();
        }
      }
    });
  }
  static async LeaveHonamiDungeon() {
    var e = await ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
    ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty(false);
    return e;
  }
  static async SendHonamiStoryBagOperateRequest(e) {
    var o = new Protocol_1.Aki.Protocol.kHd();
    o.V$d = e;
    o.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var e = await Net_1.Net.CallAsync(22130, o);
    if (ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 15228)) {
      return false;
    }
    ModelManager_1.ModelManager.HonamiStoryModel.UpdateBackPackContext(o.V$d);
    let t = false;
    for (const e of o.V$d) {
      if (e.Qmd === 3) {
        t = true;
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, e);
    }
    if (t) {
      ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
    }
    return true;
  }
  static RequestHonamiStoryEquipRole(e) {
    var o = new Protocol_1.Aki.Protocol.GHd();
    o.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    o.Q6n = e;
    Net_1.Net.Call(21287, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21461);
        } else {
          e = e.Q6n;
          ModelManager_1.ModelManager.HonamiStoryModel.UpdateRoleList(e);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryRoleEquipChanged);
          ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
        }
      }
    });
  }
  static async SendHonamiStoryPickUpItemRequest(e, o, t) {
    var r = new Protocol_1.Aki.Protocol.u$d();
    r.G$d = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(o, t);
    var a = await Net_1.Net.CallAsync(19202, r);
    if (ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(a, 16807)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("HonamiStory", 77, "Send wrong PickUpItemRequest", ["itemId", o.GetItemId()], ["itemPos", t], ["itemNormalCross", o.GetIsCross()], ["dragCross", o.GetIsDragCross()], ["baseWidth", o.GetBaseGridWidth(false)], ["baseHeight", o.GetBaseGridHeight(false)]);
      }
      return false;
    } else {
      ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(e).UpdateByContext([r.G$d]);
      return true;
    }
  }
  static async HonamiStoryPickAndEquipRequest(e, o) {
    var t = new Protocol_1.Aki.Protocol.kHd();
    var r = [];
    var a = new Protocol_1.Aki.Protocol.V$d();
    a.Qmd = 3;
    var n = new Protocol_1.Aki.Protocol.V$d();
    n.Qmd = 4;
    var l = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(e);
    a.G$d.push(l);
    var l = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(e, o);
    n.G$d.push(l);
    r.push(a);
    r.push(n);
    t.V$d = r;
    t.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var e = await Net_1.Net.CallAsync(22130, t);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 15228) && (ModelManager_1.ModelManager.HonamiStoryModel.UpdateBackPackContext(t.V$d), ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty(), true);
  }
  static SendHonamiStoryDiscardItemRequest(l) {
    const i = new Protocol_1.Aki.Protocol.d$d();
    i.V$d = l;
    Net_1.Net.Call(26583, i, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15668);
        } else {
          let e = l.Qmd === 4;
          if (e || l.Qmd === 3) {
            for (const a of l.G$d) {
              var o = ModelManager_1.ModelManager.HonamiStoryModel.GetEquipItemDataByIncId(a.Xmd);
              if (o) {
                ModelManager_1.ModelManager.HonamiStoryModel.ShowDiscardTips(o);
              }
            }
          } else {
            var t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(2);
            for (const n of l.G$d) {
              var r = t?.GetItemDataByInstanceId(n.Xmd);
              if (r && (ModelManager_1.ModelManager.HonamiStoryModel.ShowDiscardTips(r), r.GetItemType() === 1)) {
                e = true;
                break;
              }
            }
          }
          ModelManager_1.ModelManager.HonamiStoryModel.UpdateBackPackContext([i.V$d]);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, l);
          if (e) {
            ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
          }
        }
      }
    });
  }
  static async RequestHonamiStoryUnlockSlot(e, o) {
    var t = new Protocol_1.Aki.Protocol.NHd();
    var r = e.GetSlotId();
    t.b4d = o;
    t.T4d = r;
    var r = await Net_1.Net.CallAsync(27611, t);
    if (ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(r, 21359)) {
      return false;
    }
    e.SetIsUnlock(true);
    t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic();
    if (t) {
      t.OnUnlockSlot(o);
    }
    ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
    return true;
  }
  static async RequestHonamiStoryQuickUnloadAll(e, o, t) {
    var r = new Protocol_1.Aki.Protocol.kHd();
    var a = [];
    var n = new Protocol_1.Aki.Protocol.V$d();
    n.Qmd = 4;
    var l = new Protocol_1.Aki.Protocol.V$d();
    l.Qmd = t;
    let i = 0;
    for (const M of o) {
      var _ = e[i];
      var m = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(_);
      n.G$d.push(m);
      var m = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(_, M);
      l.G$d.push(m);
      i++;
    }
    a.push(n);
    a.push(l);
    r.V$d = a;
    r.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    t = await Net_1.Net.CallAsync(22130, r);
    if (ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(t, 15228)) {
      return false;
    }
    ModelManager_1.ModelManager.HonamiStoryModel.UpdateBackPackContext(a);
    for (const d of a) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, d);
    }
    return true;
  }
  static SendHonamiStoryPermanentTaskRewardRequest(t, r) {
    const a = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    var e = new Protocol_1.Aki.Protocol.ibm();
    e.w6n = a.Id;
    e.abm = t;
    Net_1.Net.Call(20838, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25445);
        } else {
          for (const o of t) {
            a.GetPermanentTaskData(o).UpdateState(2);
          }
          r();
        }
      }
    });
  }
  static SendHonamiStoryLimitTaskRewardRequest(t, r) {
    const a = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    var e = new Protocol_1.Aki.Protocol.a$d();
    e.w6n = a.Id;
    e.hbm = t;
    Net_1.Net.Call(27060, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20102);
        } else {
          for (const o of t) {
            a.GetLimitTaskData(o).UpdateState(2);
          }
          r();
        }
      }
    });
  }
  static SendHonamiStoryScoreRewardRequest(r, a) {
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    var o = new Protocol_1.Aki.Protocol.l$d();
    o.w6n = e.Id;
    o.q4d = r;
    Net_1.Net.Call(15728, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17538);
        } else {
          var o = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
          for (const t of r) {
            o.GetScoreRewardData(t).UpdateState(2);
          }
          a();
        }
      }
    });
  }
  static SendHonamiStoryWeaponDressRequest(e, o, a) {
    var t = new Protocol_1.Aki.Protocol.HHd();
    t.w4d = e;
    t.b4d = o;
    t.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    Net_1.Net.Call(24824, t, e => {
      var o;
      var t;
      var r;
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28702);
        } else {
          o = e.w4d;
          e = e.b4d;
          if (t = ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponEquipState(o)) {
            t = t.GetPosition();
            r = ModelManager_1.ModelManager.HonamiStoryModel.GetRoleEquipDataByPosition(e)?.GetWeaponId() ?? 0;
            ModelManager_1.ModelManager.HonamiStoryModel.UpdateWeaponByPosition(r, t);
          }
          ModelManager_1.ModelManager.HonamiStoryModel.UpdateWeaponByPosition(o, e);
          a();
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryRoleEquipChanged);
          ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
        }
      }
    });
  }
  static SendHonamiStoryItemEnterRequest(e, o, t) {
    var r = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    var a = r.GetHonamiStoryAreaDataList().length;
    if (!e && o <= a && !r.GetHonamiStoryAreaData(o).IsAreaCanEnter) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_LevelUnlockedPrompt");
    } else {
      a = {
        $4d: e,
        G4d: o,
        Zhm: t,
        w6n: r.Id
      };
      ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.X$d = a;
      e = ModelManager_1.ModelManager.HonamiStoryModel.GetAllRoleIdList();
      o = r.AreaInstId;
      ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(o, e).then(e => {
        ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
      });
    }
  }
  SendHonamiStoryItemCollectionRequest(e) {
    const t = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    var o = new Protocol_1.Aki.Protocol.ZHd();
    o.j$d = e;
    o.w6n = t.Id;
    Net_1.Net.Call(26068, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21687);
        } else if (!(e.j$d.length <= 0)) {
          for (const o of e.j$d) {
            t.GetItemCollectionData(o).UpdateState(2);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryItemCollectGetReward);
        }
      }
    });
  }
  static SendHonamiStoryActivateTalentRequest(e, o) {
    var t = new Protocol_1.Aki.Protocol.YHd();
    t.P4d = e;
    Net_1.Net.Call(20877, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28981);
        } else {
          o();
        }
      }
    });
  }
  static async RequestHonamiStoryLifeSupportUp() {
    var e = new Protocol_1.Aki.Protocol.KHd();
    e.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var e = await Net_1.Net.CallAsync(26488, e);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 24682) && (ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerData().SetLifeSupportLevel(e.y4d), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryLifeSupportLevelUp), true);
  }
  static async RequestSwitchItem(e, o, t, r, a, n) {
    var l = new Protocol_1.Aki.Protocol.kHd();
    var i = [];
    var _ = new Protocol_1.Aki.Protocol.V$d();
    _.Qmd = a;
    var m = new Protocol_1.Aki.Protocol.V$d();
    m.Qmd = n;
    var M = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(e);
    _.G$d.push(M);
    var M = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(e, r);
    m.G$d.push(M);
    if (o) {
      e = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(o);
      m.G$d.push(e);
      r = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(o, t);
      _.G$d.push(r);
    }
    i.push(_);
    i.push(m);
    l.V$d = i;
    l.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var M = await Net_1.Net.CallAsync(22130, l);
    if (ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(M, 15228)) {
      return false;
    }
    ModelManager_1.ModelManager.HonamiStoryModel.UpdateBackPackContext(i);
    for (const d of i) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, d);
    }
    if (a === 3 || n === 3) {
      ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
    }
    return true;
  }
  static async RequestSwitchInSameBag(e, o, t) {
    var r = new Protocol_1.Aki.Protocol.kHd();
    var a = [];
    var n = new Protocol_1.Aki.Protocol.V$d();
    n.Qmd = t;
    var t = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemSwapInfo(e, o);
    n.G$d.push(t);
    a.push(n);
    r.V$d = a;
    r.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var e = await Net_1.Net.CallAsync(22130, r);
    if (ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 15228)) {
      return false;
    }
    ModelManager_1.ModelManager.HonamiStoryModel.UpdateBackPackContext(a);
    for (const l of a) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, l);
    }
    return true;
  }
  static async RequestEquipFromPickUpBox(e, o, t, r) {
    var a = new Protocol_1.Aki.Protocol.kHd();
    var n = [];
    var l = new Protocol_1.Aki.Protocol.V$d();
    l.Qmd = 3;
    var i = new Protocol_1.Aki.Protocol.V$d();
    i.Qmd = 4;
    var _ = new Protocol_1.Aki.Protocol.V$d();
    _.Qmd = 2;
    var m = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(e);
    l.G$d.push(m);
    var m = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(e, t);
    i.G$d.push(m);
    var e = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(o);
    i.G$d.push(e);
    var t = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(o, r);
    _.G$d.push(t);
    n.push(l);
    n.push(i);
    n.push(_);
    a.V$d = n;
    a.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var m = await Net_1.Net.CallAsync(22130, a);
    if (ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(m, 15228)) {
      return false;
    }
    ModelManager_1.ModelManager.HonamiStoryModel.UpdateBackPackContext(a.V$d);
    for (const M of a.V$d) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, M);
    }
    ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
    return true;
  }
  static RequestDiscardItem(e, o) {
    var t = new Protocol_1.Aki.Protocol.V$d();
    t.Qmd = o;
    var o = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(e);
    t.G$d.push(o);
    HonamiStoryController.SendHonamiStoryDiscardItemRequest(t);
  }
  static async RequestHonamiStorySellItem(e) {
    var o = new Protocol_1.Aki.Protocol.WHd();
    o.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var t = {};
    var r = new Map();
    var a = [];
    for (const d of e) {
      var n = d.BackpackType;
      if (!r.has(n)) {
        (l = new Protocol_1.Aki.Protocol.V$d()).Qmd = n;
        r.set(n, l);
        t[String(n)] = new Protocol_1.Aki.Protocol.gYd();
        a.push(l);
      }
      var l = r.get(n);
      var i = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(d.ItemData);
      l.G$d.push(i);
      t[String(n)].L4d.push(d.ItemData.GetIncId());
    }
    o.mYd = t;
    o = await Net_1.Net.CallAsync(28801, o);
    if (ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(o, 29808)) {
      return false;
    }
    let _ = 0;
    for (const S of e) {
      var m = S.ItemData;
      _ += m.GetSellPrice();
    }
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_SellSuccess", _);
    let M = false;
    for (const y of e) {
      if (y.ItemData.GetItemType() === 1) {
        M = true;
        break;
      }
    }
    AudioSystem_1.AudioSystem.PostEvent("play_ui_honamistory_backpack_coin");
    ModelManager_1.ModelManager.HonamiStoryModel.UpdateBackPackContext(a);
    for (const s of a) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, s);
    }
    if (M) {
      ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
    }
    return true;
  }
  static async RequestHonamiStoryLockItem(e, o, t) {
    var r = new Protocol_1.Aki.Protocol._Yd();
    r.cYd = o;
    r.Y5n = t;
    r.dYd = e;
    var o = await Net_1.Net.CallAsync(17753, r);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(o, 20124) && (e = t ? "HonamiStory_ItemLocked" : "HonamiStory_ItemUnLocked", ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(e), true);
  }
  static iif(e) {
    e = ModelManager_1.ModelManager.ItemRewardModel.RefreshCommonRewardDataFromConfig(1009, "HonamiWeaponRewardView", e, undefined);
    if (e) {
      UiManager_1.UiManager.OpenView("HonamiWeaponRewardView", e);
    }
  }
}
exports.HonamiStoryController = HonamiStoryController;
(_a = HonamiStoryController).OnHonamiStoryInstInfoNotify = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.SetIsLastPickUpViewDirty(false);
  ModelManager_1.ModelManager.HonamiStoryModel.InitBackPackInfoList(e.N$d);
  ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
  _a.r_f(e.v4d, false);
  var t = e.$pm;
  if (t > 0) {
    t = HonamiStoryDangerLevelById_1.configHonamiStoryDangerLevelById.GetConfig(t);
    if (t) {
      ModelManager_1.ModelManager.HonamiStoryModel.MonsterBaseEnhanceLevel = t.MonsterEnhanceLevel;
      ModelManager_1.ModelManager.HonamiStoryModel.DangerLevel = t.Level;
    }
    ModelManager_1.ModelManager.HonamiStoryModel.PollutionLevel = e.F4d;
    ModelManager_1.ModelManager.HonamiStoryModel.PollutionStarTime = MathUtils_1.MathUtils.LongToNumber(e.fYd);
    let o = ModelManager_1.ModelManager.HonamiStoryModel.PollutionLevelMap;
    if (o) {
      o?.clear();
    } else {
      o = new Map();
      ModelManager_1.ModelManager.HonamiStoryModel.PollutionLevelMap = o;
    }
    var r = e.lbm;
    var t = HonamiStoryPollutionStageById_1.configHonamiStoryPollutionStageById.GetConfig(r);
    if (t) {
      ModelManager_1.ModelManager.HonamiStoryModel.PollutionWarningLevel = t.WarningLevel;
      ModelManager_1.ModelManager.HonamiStoryModel.PollutionDangerLevel = t.DangerLevel;
    }
    var t = HonamiStoryPollutionByActivityId_1.configHonamiStoryPollutionByActivityId.GetConfigList(e.w6n);
    if (t) {
      var a = [];
      for (const n of t) {
        if (n.Group === r) {
          a.push({
            PollutionLevel: n.Level,
            PersistMilliseconds: n.PersistSecond * MathUtils_1.MathUtils.SecondToMillisecond,
            MonsterEnhanceLevel: n.MonsterEnhanceLevel
          });
        }
      }
      a.sort((e, o) => e.PollutionLevel - o.PollutionLevel);
      let e = undefined;
      for (const l of a) {
        if (e) {
          l.MonsterEnhanceLevel += e.MonsterEnhanceLevel;
        }
        o.set(l.PollutionLevel, l);
        e = l;
      }
      ModelManager_1.ModelManager.HonamiStoryModel.PollutionMaxLevel = a[a.length - 1].PollutionLevel;
    }
  }
  ModelManager_1.ModelManager.HonamiStoryModel.MonsterLevelSafeOffset = CommonParamById_1.configCommonParamById.GetIntConfig("HonamiStorySafeLevelOffset") ?? 0;
  ModelManager_1.ModelManager.HonamiStoryModel.MonsterLevelDangerOffset = -(CommonParamById_1.configCommonParamById.GetIntConfig("HonamiStoryDangerLevelOffset") ?? 0);
  ModelManager_1.ModelManager.HonamiStoryModel.CurAreaId = e.$$d;
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryInstInfoUpdate);
};
HonamiStoryController.gQd = e => {
  _a.r_f(e.v4d, true);
};
HonamiStoryController.Rem = e => {
  var o = ModelManager_1.ModelManager.HonamiStoryModel.PollutionLevel;
  var t = e.F4d;
  var e = MathUtils_1.MathUtils.LongToNumber(e.fYd);
  ModelManager_1.ModelManager.HonamiStoryModel.PollutionLevel = t;
  ModelManager_1.ModelManager.HonamiStoryModel.PollutionStarTime = e;
  var r = ModelManager_1.ModelManager.HonamiStoryModel.PollutionLevelMap;
  var a = r?.get(t)?.MonsterEnhanceLevel ?? 0;
  if (o !== 0 && o < t && e > 0) {
    e = {
      PollutionLevel: t,
      MonsterIncreaseLevel: a - (r?.get(o)?.MonsterEnhanceLevel ?? 0)
    };
    UiManager_1.UiManager.OpenView("HonamiStoryPollutionLevelUpdateView", e);
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryPollutionUpdate, a);
};
HonamiStoryController.IQd = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
  var o = [];
  o.push({
    Name: "HonamiStory_EvacuationInterface_2",
    Value: TimeUtil_1.TimeUtil.GetTimeString(e.Y2s)
  });
  o.push({
    Name: "HonamiStory_EvacuationInterface_8",
    Value: e._bm.toString()
  });
  o.push({
    Name: "HonamiStory_EvacuationInterface_1",
    Value: e.D9d.toString()
  });
  var t = e.V4d;
  if (t > 0) {
    o.push({
      Name: "HonamiStory_EvacuationInterface_3",
      Value: t.toString()
    });
  }
  HonamiStoryController.SetHonamiStoryLoadingInfoByResult(e.Mws);
  if (e.Mws) {
    const r = {
      DisplayItems: o,
      TotalReward: e.j4d,
      IsNewRecord: e.A9d
    };
    UiManager_1.UiManager.OpenView("HonamiStorySettleSuccessView", r);
  } else {
    const r = {
      DisplayItems: o,
      TotalReward: e.j4d,
      IsNewRecord: e.A9d,
      FailAddProportion: Math.round(e.U9d / 100)
    };
    if (e.Vfm) {
      UiManager_1.UiManager.ResetToBattleView();
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        UiManager_1.UiManager.ResetToBattleView(() => {
          UiManager_1.UiManager.OpenView("HonamiStorySettleFailView", r);
        });
      }, 3000);
    } else {
      UiManager_1.UiManager.OpenView("HonamiStorySettleFailView", r);
    }
  }
};
HonamiStoryController.Elm = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
  let o = 0;
  let t = 0;
  var r = ModelManager_1.ModelManager.HonamiStoryModel.DangerLevel;
  if (r > 0) {
    r = HonamiStoryDangerLevelById_1.configHonamiStoryDangerLevelById.GetConfig(r)?.ConsumeItems;
    if (r && r.size > 0) {
      for (var [a, n] of r) {
        o = a;
        t = n;
        break;
      }
    }
  }
  r = [];
  r.push({
    ButtonTextId: "ConfirmBox_217_ButtonText_0",
    DescriptionTextId: undefined,
    IsTimeDownCloseView: false,
    IsClickedCloseView: false,
    OnClickedCallback: () => {
      HonamiStoryController.SetHonamiStoryLoadingInfoByTimingOnly(9);
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
    }
  });
  const l = o > 0 && t > 0;
  var i = [];
  if (l) {
    var _ = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(o);
    let e = _.toString();
    if (_ < t) {
      e = `<color=#c25757>${_}</color>`;
    }
    i.push(e);
    _ = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(o).IconSmall;
    i.push(`<texture=${_}/>`);
  }
  r.push({
    ButtonTextId: "ConfirmBox_133_ButtonText_1",
    DescriptionTextId: l ? "Text_RemainText_Text" : undefined,
    DescriptionArgs: l ? i : undefined,
    IsTimeDownCloseView: false,
    IsClickedCloseView: false,
    OnClickedCallback: () => {
      var e;
      if (l) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(422)).FunctionMap.set(2, () => {
          if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(o) < t) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_InsufficientBalance");
          } else {
            HonamiStoryController.SetHonamiStoryLoadingInfoByTimingOnly(7);
            ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.RestartInstanceDungeon();
          }
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      } else {
        HonamiStoryController.SetHonamiStoryLoadingInfoByTimingOnly(7);
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.RestartInstanceDungeon();
      }
    }
  });
  var m = [];
  for (const d of e.gws) {
    var M = new RewardItemData_1.RewardItemData(d.s5n, d.m9n);
    m.push(M);
  }
  _ = [];
  _.push({
    RecordName: "HonamiStory_EvacuationInterface_5",
    RecordValue: e.G4d.toString()
  });
  _.push({
    RecordName: "HonamiStory_EvacuationInterface_6",
    RecordValue: e.x9d.toString()
  });
  _.push({
    RecordName: "HonamiStory_EvacuationInterface_7",
    RecordValue: TimeUtil_1.TimeUtil.GetTimeString(e.Y2s)
  });
  i = {
    RecordItemList: _,
    RewardItemList: m
  };
  ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
  ControllerHolder_1.ControllerHolder.ItemRewardController.OpenExploreRewardViewNew({
    ConfigId: 3031,
    IsSuccess: true,
    ButtonInfoList: r,
    HonamiTowerSuccessData: i,
    IsBagFull: false
  });
};
HonamiStoryController.Ja1 = () => {
  var e;
  if (HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon()) {
    if ((e = ModelManager_1.ModelManager.HonamiStoryModel.CurTrackTaskData) && (e = e.GetLevelPlayInfo())) {
      e.ResetTrackPriorityOverride();
    }
    ModelManager_1.ModelManager.HonamiStoryModel.RemoveBackPack(2);
    ModelManager_1.ModelManager.HonamiStoryModel.RemoveBackPack(3);
    ControllerHolder_1.ControllerHolder.FormationAttributeController.RemoveValueListener(13, HonamiStoryController.n1m);
  }
};
HonamiStoryController.o1m = () => {
  if (HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon()) {
    ControllerHolder_1.ControllerHolder.FormationAttributeController.AddValueListener(13, HonamiStoryController.n1m);
  }
};
HonamiStoryController.FWe = () => {
  if (ModelManager_1.ModelManager.HonamiStoryModel.CacheShowSafeLeaveUpdate) {
    _a.ShowSafeLeaveUpdate();
  }
  if (HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryAreaDungeon()) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("HonamiStory", 78, "OnWorldDoneAndCloseLoading 自动追踪第一个未完成的支线任务");
    }
    ModelManager_1.ModelManager.HonamiStoryModel.InitSubQuestTrack();
  }
};
HonamiStoryController.n1m = (e, o, t) => {
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryLifeSupportChanged, t, o);
};
HonamiStoryController.CQd = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData().UpdateHonamiStoryMascotDataList(e.R$d);
  var o = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryMascotUnlockSet) ?? new Set();
  for (const t of e.R$d) {
    if (t.H6n === 1) {
      o.add(t.H$d);
    }
  }
  LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryMascotUnlockSet, o);
};
HonamiStoryController.pQd = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData().UpdateHonamiStoryAreaDataList(e.W$d);
};
HonamiStoryController.CanOpenBackpack = e => ModelManager_1.ModelManager.FunctionModel.IsOpen(10102);
HonamiStoryController.hLm = e => {
  var o = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerBackpackData();
  o.RefreshEquipInfo(e.O$d);
  if (e.Wmd) {
    o.RefreshGridItemInfo(e.Wmd.k$d);
  }
  ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
};
HonamiStoryController.mQd = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.UpdateBackpackInfo(e);
  ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
};
HonamiStoryController.wnm = e => {
  e = e.rrm;
  ModelManager_1.ModelManager.HonamiStoryModel.UpdateBackpackSize(e);
};
HonamiStoryController.dwm = e => {
  var o = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
  o.UpdatePermanentTaskDataList(e.nAu);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, o.Id);
};
HonamiStoryController.vQd = e => {
  var o = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
  o.UpdateLimitTaskDataList(e.nAu);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, o.Id);
};
HonamiStoryController.OnHonamiStoryScoreRewardInfoUpdateNotify = e => {
  var o = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
  o.UpdateScoreRewardDataList(e.P$d);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, o.Id);
};
HonamiStoryController.tam = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.UpdateWeaponDataList(e.R4d);
  var o = [];
  for (const r of e.R4d) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryWeaponUnlockSet) ?? new Set();
    t.add(r);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryWeaponUnlockSet, t);
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponData(r);
    if (t && t.IsShowReward) {
      t = new RewardItemData_1.RewardItemData(r, 1);
      o.push(t);
    }
  }
  if (o.length > 0) {
    HonamiStoryController.iif(o);
  }
};
HonamiStoryController.yQd = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData().UpdateItemCollectionDataList(e.b$d);
};
HonamiStoryController.lLm = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.RefreshTalentInfos(e.kMm);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryTechNodeLevelUpdate);
};
HonamiStoryController._Lm = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.SetTotalRevenueInternal(e.sbm);
};
HonamiStoryController.SQd = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData().InitSubQuestTaskDataList(e.nAu);
};
HonamiStoryController.MQd = e => {
  var o = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
  o.UpdateSubQuestTaskDataList(e.nAu);
  for (const r of e.nAu) {
    var t = o.GetSubQuestTaskData(r.s5n);
    if (t?.IsFinished()) {
      UiManager_1.UiManager.OpenView("HonamiStoryQuestFinishView", t);
      ModelManager_1.ModelManager.HonamiStoryModel.InitSubQuestTrack();
    }
  }
};
HonamiStoryController.EQd = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerBackpackData().RefreshRoleInfo(e.Q6n);
};
HonamiStoryController.yQm = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerData().SetLifeSupportLevel(e.y4d);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryLifeSupportLevelUp);
};
HonamiStoryController.R1f = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData().RefreshTowerData(e.i1m);
}; //# sourceMappingURL=HonamiStoryController.js.map