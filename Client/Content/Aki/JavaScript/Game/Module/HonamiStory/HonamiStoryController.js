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
    this.iwm = (e, t) => {
      if (e === 10124 && t) {
        e = Protocol_1.Aki.Protocol.XRm.create();
        t = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetAllActivityConfig();
        let o = 0;
        for (const r of t) {
          o = r.ActivityId;
        }
        if (o !== 0) {
          e.w6n = o;
          Net_1.Net.Call(24170, e, e => {
            if (e && e.y$d) {
              ModelManager_1.ModelManager.HonamiStoryModel.InitActivityInfo(o, e.y$d);
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInstanceChange, HonamiStoryController.Aom);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, HonamiStoryController.FWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenSet, this.iwm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.iwm);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceDungeon, HonamiStoryController.Ja1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInstanceChange, HonamiStoryController.Aom);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, HonamiStoryController.FWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, this.iwm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.iwm);
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(24415, HonamiStoryController._Qd);
    Net_1.Net.Register(17565, HonamiStoryController.OnHonamiStoryInstInfoNotify);
    Net_1.Net.Register(26023, HonamiStoryController.cQd);
    Net_1.Net.Register(15730, HonamiStoryController.dQd);
    Net_1.Net.Register(15621, HonamiStoryController.mQd);
    Net_1.Net.Register(23463, HonamiStoryController.rvm);
    Net_1.Net.Register(25446, HonamiStoryController.fQd);
    Net_1.Net.Register(18872, HonamiStoryController.OnHonamiStoryScoreRewardInfoUpdateNotify);
    Net_1.Net.Register(19355, HonamiStoryController.gQd);
    Net_1.Net.Register(27116, HonamiStoryController.CQd);
    Net_1.Net.Register(15606, HonamiStoryController.pQd);
    Net_1.Net.Register(29317, HonamiStoryController.vQd);
    Net_1.Net.Register(22660, HonamiStoryController.yQd);
    Net_1.Net.Register(20536, HonamiStoryController.eZd);
    Net_1.Net.Register(25791, HonamiStoryController.Jtm);
    Net_1.Net.Register(28981, HonamiStoryController.Gim);
    Net_1.Net.Register(20486, HonamiStoryController.Mnm);
    Net_1.Net.Register(19650, HonamiStoryController.wvm);
    Net_1.Net.Register(17825, HonamiStoryController.Lvm);
    Net_1.Net.Register(25645, HonamiStoryController.Pvm);
    Net_1.Net.Register(16679, HonamiStoryController.lRm);
    Net_1.Net.Register(29192, HonamiStoryController.Pwm);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24415);
    Net_1.Net.UnRegister(17565);
    Net_1.Net.UnRegister(26023);
    Net_1.Net.UnRegister(22660);
    Net_1.Net.UnRegister(15730);
    Net_1.Net.UnRegister(15621);
    Net_1.Net.UnRegister(23463);
    Net_1.Net.UnRegister(25446);
    Net_1.Net.UnRegister(18872);
    Net_1.Net.UnRegister(19355);
    Net_1.Net.UnRegister(27116);
    Net_1.Net.UnRegister(15606);
    Net_1.Net.UnRegister(29317);
    Net_1.Net.UnRegister(20536);
    Net_1.Net.UnRegister(25791);
    Net_1.Net.UnRegister(28981);
    Net_1.Net.UnRegister(20486);
    Net_1.Net.UnRegister(19650);
    Net_1.Net.UnRegister(17825);
    Net_1.Net.UnRegister(25645);
    Net_1.Net.UnRegister(16679);
  }
  static TryHonamiStoryInstLeave(e = false) {
    e = {
      LeaveType: ModelManager_1.ModelManager.HonamiStoryModel.CanSafeLeave ? 0 : 1,
      ShowSafeLeaveUpdate: e,
      ConfirmCallback: () => {
        var e = new Protocol_1.Aki.Protocol.f$d();
        Net_1.Net.Call(17471, e, () => {});
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
  static Dwm(e, o) {
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
    var e = new Protocol_1.Aki.Protocol.JHd();
    e.F$d = o;
    Net_1.Net.Call(28966, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22451);
        } else {
          ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData().GetHonamiStoryMascotData(o).UpdateState(2);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryMascotRewardReceive, o);
          t();
        }
      }
    });
  }
  static SendHonamiStoryAreaSecretRewardRequest(o, t) {
    var e = new Protocol_1.Aki.Protocol.t$d();
    e.k4d = o;
    Net_1.Net.Call(16920, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29232);
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
    ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
    return e;
  }
  static async SendHonamiStoryBagOperateRequest(e) {
    var o = new Protocol_1.Aki.Protocol.DHd();
    o.q$d = e;
    o.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var e = await Net_1.Net.CallAsync(21361, o);
    if (ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 17697)) {
      return false;
    }
    ModelManager_1.ModelManager.HonamiStoryModel.UpdateBackPackContext(o.q$d);
    let t = false;
    for (const e of o.q$d) {
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
    var o = new Protocol_1.Aki.Protocol.BHd();
    o.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    o.Q6n = e;
    Net_1.Net.Call(26719, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27332);
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
    var r = new Protocol_1.Aki.Protocol.a$d();
    r.B$d = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(o, t);
    var a = await Net_1.Net.CallAsync(29385, r);
    if (ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(a, 21231)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("HonamiStory", 77, "Send wrong PickUpItemRequest", ["itemId", o.GetItemId()], ["itemPos", t], ["itemNormalCross", o.GetIsCross()], ["dragCross", o.GetIsDragCross()], ["baseWidth", o.GetBaseGridWidth(false)], ["baseHeight", o.GetBaseGridHeight(false)]);
      }
      return false;
    } else {
      ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(e).UpdateByContext([r.B$d]);
      return true;
    }
  }
  static async HonamiStoryPickAndEquipRequest(e, o) {
    var t = new Protocol_1.Aki.Protocol.DHd();
    var r = [];
    var a = new Protocol_1.Aki.Protocol.q$d();
    a.Qmd = 3;
    var n = new Protocol_1.Aki.Protocol.q$d();
    n.Qmd = 4;
    var l = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(e);
    a.B$d.push(l);
    var l = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(e, o);
    n.B$d.push(l);
    r.push(a);
    r.push(n);
    t.q$d = r;
    t.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var e = await Net_1.Net.CallAsync(21361, t);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 17697) && (ModelManager_1.ModelManager.HonamiStoryModel.UpdateBackPackContext(t.q$d), ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty(), true);
  }
  static SendHonamiStoryDiscardItemRequest(l) {
    const i = new Protocol_1.Aki.Protocol.l$d();
    i.q$d = l;
    Net_1.Net.Call(25658, i, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23922);
        } else {
          let e = l.Qmd === 4;
          if (e || l.Qmd === 3) {
            for (const a of l.B$d) {
              var o = ModelManager_1.ModelManager.HonamiStoryModel.GetEquipItemDataByIncId(a.Xmd);
              if (o) {
                ModelManager_1.ModelManager.HonamiStoryModel.ShowDiscardTips(o);
              }
            }
          } else {
            var t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(2);
            for (const n of l.B$d) {
              var r = t?.GetItemDataByInstanceId(n.Xmd);
              if (r && (ModelManager_1.ModelManager.HonamiStoryModel.ShowDiscardTips(r), r.GetItemType() === 1)) {
                e = true;
                break;
              }
            }
          }
          ModelManager_1.ModelManager.HonamiStoryModel.UpdateBackPackContext([i.q$d]);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, l);
          if (e) {
            ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
          }
        }
      }
    });
  }
  static async RequestHonamiStoryUnlockSlot(e, o) {
    var t = new Protocol_1.Aki.Protocol.OHd();
    var r = e.GetSlotId();
    t.b4d = o;
    t.T4d = r;
    var r = await Net_1.Net.CallAsync(19940, t);
    if (ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(r, 19984)) {
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
    var r = new Protocol_1.Aki.Protocol.DHd();
    var a = [];
    var n = new Protocol_1.Aki.Protocol.q$d();
    n.Qmd = 4;
    var l = new Protocol_1.Aki.Protocol.q$d();
    l.Qmd = t;
    let i = 0;
    for (const M of o) {
      var _ = e[i];
      var m = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(_);
      n.B$d.push(m);
      var m = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(_, M);
      l.B$d.push(m);
      i++;
    }
    a.push(n);
    a.push(l);
    r.q$d = a;
    r.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    t = await Net_1.Net.CallAsync(21361, r);
    if (ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(t, 17697)) {
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
    var e = new Protocol_1.Aki.Protocol.apm();
    e.w6n = a.Id;
    e.cpm = t;
    Net_1.Net.Call(28478, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23478);
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
    var e = new Protocol_1.Aki.Protocol.r$d();
    e.w6n = a.Id;
    e.dpm = t;
    Net_1.Net.Call(27575, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19808);
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
    var o = new Protocol_1.Aki.Protocol.n$d();
    o.w6n = e.Id;
    o.q4d = r;
    Net_1.Net.Call(23924, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19677);
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
    var t = new Protocol_1.Aki.Protocol.FHd();
    t.w4d = e;
    t.b4d = o;
    t.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    Net_1.Net.Call(29103, t, e => {
      var o;
      var t;
      var r;
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17959);
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
        Pom: t,
        w6n: r.Id
      };
      ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.$$d = a;
      e = ModelManager_1.ModelManager.HonamiStoryModel.GetAllRoleIdList();
      o = r.AreaInstId;
      ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(o, e).then(e => {
        ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
      });
    }
  }
  SendHonamiStoryItemCollectionRequest(e) {
    const t = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    var o = new Protocol_1.Aki.Protocol.XHd();
    o.G$d = e;
    o.w6n = t.Id;
    Net_1.Net.Call(26645, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17007);
        } else if (!(e.G$d.length <= 0)) {
          for (const o of e.G$d) {
            t.GetItemCollectionData(o).UpdateState(2);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryItemCollectGetReward);
        }
      }
    });
  }
  static SendHonamiStoryActivateTalentRequest(e, o) {
    var t = new Protocol_1.Aki.Protocol.WHd();
    t.P4d = e;
    Net_1.Net.Call(28744, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22498);
        } else {
          o();
        }
      }
    });
  }
  static async RequestHonamiStoryLifeSupportUp() {
    var e = new Protocol_1.Aki.Protocol.HHd();
    e.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var e = await Net_1.Net.CallAsync(25748, e);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 24666) && (ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerData().SetLifeSupportLevel(e.y4d), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryLifeSupportLevelUp), true);
  }
  static async RequestSwitchItem(e, o, t, r, a, n) {
    var l = new Protocol_1.Aki.Protocol.DHd();
    var i = [];
    var _ = new Protocol_1.Aki.Protocol.q$d();
    _.Qmd = a;
    var m = new Protocol_1.Aki.Protocol.q$d();
    m.Qmd = n;
    var M = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(e);
    _.B$d.push(M);
    var M = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(e, r);
    m.B$d.push(M);
    if (o) {
      e = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(o);
      m.B$d.push(e);
      r = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(o, t);
      _.B$d.push(r);
    }
    i.push(_);
    i.push(m);
    l.q$d = i;
    l.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var M = await Net_1.Net.CallAsync(21361, l);
    if (ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(M, 17697)) {
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
    var r = new Protocol_1.Aki.Protocol.DHd();
    var a = [];
    var n = new Protocol_1.Aki.Protocol.q$d();
    n.Qmd = t;
    var t = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemSwapInfo(e, o);
    n.B$d.push(t);
    a.push(n);
    r.q$d = a;
    r.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var e = await Net_1.Net.CallAsync(21361, r);
    if (ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 17697)) {
      return false;
    }
    ModelManager_1.ModelManager.HonamiStoryModel.UpdateBackPackContext(a);
    for (const l of a) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, l);
    }
    return true;
  }
  static async RequestEquipFromPickUpBox(e, o, t, r) {
    var a = new Protocol_1.Aki.Protocol.DHd();
    var n = [];
    var l = new Protocol_1.Aki.Protocol.q$d();
    l.Qmd = 3;
    var i = new Protocol_1.Aki.Protocol.q$d();
    i.Qmd = 4;
    var _ = new Protocol_1.Aki.Protocol.q$d();
    _.Qmd = 2;
    var m = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(e);
    l.B$d.push(m);
    var m = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(e, t);
    i.B$d.push(m);
    var e = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(o);
    i.B$d.push(e);
    var t = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(o, r);
    _.B$d.push(t);
    n.push(l);
    n.push(i);
    n.push(_);
    a.q$d = n;
    a.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var m = await Net_1.Net.CallAsync(21361, a);
    if (ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(m, 17697)) {
      return false;
    }
    ModelManager_1.ModelManager.HonamiStoryModel.UpdateBackPackContext(a.q$d);
    for (const M of a.q$d) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, M);
    }
    ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
    return true;
  }
  static RequestDiscardItem(e, o) {
    var t = new Protocol_1.Aki.Protocol.q$d();
    t.Qmd = o;
    var o = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(e);
    t.B$d.push(o);
    HonamiStoryController.SendHonamiStoryDiscardItemRequest(t);
  }
  static async RequestHonamiStorySellItem(e) {
    var o = new Protocol_1.Aki.Protocol.VHd();
    o.w6n = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var t = {};
    var r = new Map();
    var a = [];
    for (const d of e) {
      var n = d.BackpackType;
      if (!r.has(n)) {
        (l = new Protocol_1.Aki.Protocol.q$d()).Qmd = n;
        r.set(n, l);
        t[String(n)] = new Protocol_1.Aki.Protocol.qXd();
        a.push(l);
      }
      var l = r.get(n);
      var i = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(d.ItemData);
      l.B$d.push(i);
      t[String(n)].L4d.push(d.ItemData.GetIncId());
    }
    o.kXd = t;
    o = await Net_1.Net.CallAsync(25304, o);
    if (ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(o, 17735)) {
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
    var r = new Protocol_1.Aki.Protocol.DXd();
    r.xXd = o;
    r.Y5n = t;
    r.BXd = e;
    var o = await Net_1.Net.CallAsync(22602, r);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(o, 29741) && (e = t ? "HonamiStory_ItemLocked" : "HonamiStory_ItemUnLocked", ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(e), true);
  }
  static zRm(e) {
    e = ModelManager_1.ModelManager.ItemRewardModel.RefreshCommonRewardDataFromConfig(1009, "HonamiWeaponRewardView", e, undefined);
    if (e) {
      UiManager_1.UiManager.OpenView("HonamiWeaponRewardView", e);
    }
  }
}
exports.HonamiStoryController = HonamiStoryController;
(_a = HonamiStoryController).OnHonamiStoryInstInfoNotify = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.SetIsLastPickUpViewDirty(false);
  ModelManager_1.ModelManager.HonamiStoryModel.InitBackPackInfoList(e.O$d);
  ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
  _a.Dwm(e.v4d, false);
  var o = HonamiStoryDangerLevelById_1.configHonamiStoryDangerLevelById.GetConfig(e.smm);
  if (o) {
    ModelManager_1.ModelManager.HonamiStoryModel.MonsterBaseEnhanceLevel = o.MonsterEnhanceLevel;
    ModelManager_1.ModelManager.HonamiStoryModel.DangerLevel = o.Level;
  }
  ModelManager_1.ModelManager.HonamiStoryModel.PollutionLevel = e.F4d;
  ModelManager_1.ModelManager.HonamiStoryModel.PollutionStarTime = MathUtils_1.MathUtils.LongToNumber(e.OXd);
  let t = ModelManager_1.ModelManager.HonamiStoryModel.PollutionLevelMap;
  if (t) {
    t?.clear();
  } else {
    t = new Map();
    ModelManager_1.ModelManager.HonamiStoryModel.PollutionLevelMap = t;
  }
  var r = e.mpm;
  var o = HonamiStoryPollutionStageById_1.configHonamiStoryPollutionStageById.GetConfig(r);
  if (o) {
    ModelManager_1.ModelManager.HonamiStoryModel.PollutionWarningLevel = o.WarningLevel;
    ModelManager_1.ModelManager.HonamiStoryModel.PollutionDangerLevel = o.DangerLevel;
  }
  var o = HonamiStoryPollutionByActivityId_1.configHonamiStoryPollutionByActivityId.GetConfigList(e.w6n);
  if (o) {
    var a = [];
    for (const n of o) {
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
      t.set(l.PollutionLevel, l);
      e = l;
    }
    ModelManager_1.ModelManager.HonamiStoryModel.PollutionMaxLevel = a[a.length - 1].PollutionLevel;
  }
  ModelManager_1.ModelManager.HonamiStoryModel.MonsterLevelSafeOffset = CommonParamById_1.configCommonParamById.GetIntConfig("HonamiStorySafeLevelOffset") ?? 0;
  ModelManager_1.ModelManager.HonamiStoryModel.MonsterLevelDangerOffset = -(CommonParamById_1.configCommonParamById.GetIntConfig("HonamiStoryDangerLevelOffset") ?? 0);
  ModelManager_1.ModelManager.HonamiStoryModel.CurAreaId = e.N$d;
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryInstInfoUpdate);
};
HonamiStoryController.cQd = e => {
  _a.Dwm(e.v4d, true);
};
HonamiStoryController.eZd = e => {
  var o = ModelManager_1.ModelManager.HonamiStoryModel.PollutionLevel;
  var t = e.F4d;
  var e = MathUtils_1.MathUtils.LongToNumber(e.OXd);
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
HonamiStoryController.yQd = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
  var o = [];
  o.push({
    Name: "HonamiStory_EvacuationInterface_2",
    Value: TimeUtil_1.TimeUtil.GetTimeString(e.Y2s)
  });
  o.push({
    Name: "HonamiStory_EvacuationInterface_8",
    Value: e.fpm.toString()
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
    if (e.R_m) {
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
HonamiStoryController.Mnm = e => {
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
    ControllerHolder_1.ControllerHolder.FormationAttributeController.RemoveValueListener(13, HonamiStoryController.Dom);
  }
};
HonamiStoryController.Aom = () => {
  if (HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon()) {
    ControllerHolder_1.ControllerHolder.FormationAttributeController.AddValueListener(13, HonamiStoryController.Dom);
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
HonamiStoryController.Dom = (e, o, t) => {
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryLifeSupportChanged, t, o);
};
HonamiStoryController.dQd = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData().UpdateHonamiStoryMascotDataList(e.E$d);
  var o = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryMascotUnlockSet) ?? new Set();
  for (const t of e.E$d) {
    if (t.H6n === 1) {
      o.add(t.F$d);
    }
  }
  LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryMascotUnlockSet, o);
};
HonamiStoryController.mQd = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData().UpdateHonamiStoryAreaDataList(e.V$d);
};
HonamiStoryController.CanOpenBackpack = e => ModelManager_1.ModelManager.FunctionModel.IsOpen(10102);
HonamiStoryController.wvm = e => {
  var o = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerBackpackData();
  o.RefreshEquipInfo(e.U$d);
  if (e.Wmd) {
    o.RefreshGridItemInfo(e.Wmd.D$d);
  }
};
HonamiStoryController._Qd = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.UpdateBackpackInfo(e);
  ModelManager_1.ModelManager.HonamiStoryModel.SetQuickAllDirty();
};
HonamiStoryController.Jtm = e => {
  e = e.Iem;
  ModelManager_1.ModelManager.HonamiStoryModel.UpdateBackpackSize(e);
};
HonamiStoryController.rvm = e => {
  var o = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
  o.UpdatePermanentTaskDataList(e.nAu);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, o.Id);
};
HonamiStoryController.fQd = e => {
  var o = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
  o.UpdateLimitTaskDataList(e.nAu);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, o.Id);
};
HonamiStoryController.OnHonamiStoryScoreRewardInfoUpdateNotify = e => {
  var o = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
  o.UpdateScoreRewardDataList(e.b$d);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, o.Id);
};
HonamiStoryController.Gim = e => {
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
    HonamiStoryController.zRm(o);
  }
};
HonamiStoryController.gQd = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData().UpdateItemCollectionDataList(e.M$d);
};
HonamiStoryController.Lvm = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.RefreshTalentInfos(e.e0m);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryTechNodeLevelUpdate);
};
HonamiStoryController.Pvm = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.SetTotalRevenueInternal(e.upm);
};
HonamiStoryController.CQd = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData().InitSubQuestTaskDataList(e.nAu);
};
HonamiStoryController.pQd = e => {
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
HonamiStoryController.vQd = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerBackpackData().RefreshRoleInfo(e.Q6n);
};
HonamiStoryController.lRm = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerData().SetLifeSupportLevel(e.y4d);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryLifeSupportLevelUp);
};
HonamiStoryController.Pwm = e => {
  ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData().RefreshTowerData(e.xnm);
}; //# sourceMappingURL=HonamiStoryController.js.map