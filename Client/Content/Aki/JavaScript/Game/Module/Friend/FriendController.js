"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FriendController = exports.FriendItemSt = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ChatController_1 = require("../Chat/ChatController");
const LoginDefine_1 = require("../Login/Data/LoginDefine");
const FriendDefine_1 = require("./Data/FriendDefine");
const FriendData_1 = require("./FriendData");
const CHECKGAP = 30000;
const APPLYFRIENDCD = 1000;
const SERVERREQUESTCD = 2500;
class FriendItemSt {
  constructor() {
    this.Id = 0;
    this.OperationType = 0;
    this.ShowingView = undefined;
  }
}
exports.FriendItemSt = FriendItemSt;
class FriendController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.OnAddEvents();
    this.OnRegisterNetEvent();
    return true;
  }
  static OnClear() {
    this.OnRemoveEvents();
    this.OnUnRegisterNetEvent();
    this.R6t();
    this.U6t = false;
    return !(this.A6t = false);
  }
  static P3e() {
    this.R6t();
    FriendController.P6t = TimerSystem_1.GameplayTimerSystem.Forever(FriendController.x6t, CHECKGAP);
  }
  static R6t() {
    if (FriendController.P6t !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(FriendController.P6t);
      FriendController.P6t = undefined;
    }
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeModeFinish, FriendController.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, FriendController.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, FriendController.Q5e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RedDotStart, FriendController.w6t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ScenePlayerChanged, FriendController.Qze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LoadTestFriendsByGm, FriendController.B6t);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeModeFinish, FriendController.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, FriendController.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, FriendController.Q5e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RedDotStart, FriendController.w6t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ScenePlayerChanged, FriendController.Qze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LoadTestFriendsByGm, FriendController.B6t);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(24912, FriendController.b6t);
    Net_1.Net.Register(23770, FriendController.q6t);
    Net_1.Net.Register(21702, FriendController.G6t);
    Net_1.Net.Register(29283, FriendController.N6t);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24912);
    Net_1.Net.UnRegister(23770);
    Net_1.Net.UnRegister(21702);
    Net_1.Net.UnRegister(29283);
  }
  static async Fxa(e) {
    if (e === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Friend", 27, "RequestAllFriend Null", ["当前登录状态", ModelManager_1.ModelManager.LoginModel.GetLoginStatus()]);
      }
    } else {
      var r = await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkBlockingUser();
      if (r) {
        ModelManager_1.ModelManager.KuroSdkModel.OnGetSdkBlockUserMap(r);
      }
      const o = ModelManager_1.ModelManager.FriendModel.SelectedPlayerId;
      ModelManager_1.ModelManager.FriendModel.SelectedPlayerId = undefined;
      r = e.xUs.map(async e => {
        if (ModelManager_1.ModelManager.FriendModel.HasFriend(e.YVn.W5n)) {
          return ModelManager_1.ModelManager.FriendModel.GetFriendById(e.YVn.W5n).SetFriendDataAttribute(e);
        }
        {
          const r = new FriendData_1.FriendData();
          return r.SetFriendDataAttribute(e).then(() => {
            ModelManager_1.ModelManager.FriendModel.AddFriend(r);
            if (o && o === r.PlayerId) {
              ModelManager_1.ModelManager.FriendModel.SelectedPlayerId = r.PlayerId;
            }
          });
        }
      });
      await Promise.all(r);
      r = e.bUs.map(async e => {
        if (ModelManager_1.ModelManager.FriendModel.HasFriendApplication(e.YVn.W5n)) {
          return ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(e.YVn.W5n).SetPlayerBasicInfo(e.YVn);
        }
        {
          const r = new FriendData_1.FriendApplyData();
          return r.InitializeFriendApply(e).then(() => {
            ModelManager_1.ModelManager.FriendModel.AddFriendApplication(r);
          });
        }
      });
      await Promise.all(r);
      ModelManager_1.ModelManager.FriendModel.LoadLocalFriendApplication();
    }
  }
  static async Vxa(e) {
    var r;
    if (ModelManager_1.ModelManager.FriendModel.HasFriend(e.YVn.YVn.W5n)) {
      await ModelManager_1.ModelManager.FriendModel.GetFriendById(e.YVn.YVn.W5n).SetFriendDataAttribute(e.YVn);
    } else {
      await (r = new FriendData_1.FriendData()).SetFriendDataAttribute(e.YVn);
      ModelManager_1.ModelManager.FriendModel.AddFriend(r);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FriendAdded);
  }
  static async Hxa(e) {
    var r;
    if (ModelManager_1.ModelManager.FriendModel.HasFriendApplication(e.BUs.YVn.W5n)) {
      await ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(e.BUs.YVn.W5n).SetPlayerBasicInfo(e.BUs.YVn);
    } else {
      await (r = new FriendData_1.FriendApplyData()).InitializeFriendApply(e.BUs);
      ModelManager_1.ModelManager.FriendModel.AddFriendApplication(r);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFriendApplicationRedDot);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FriendApplyReceived);
  }
  static RequestFriendApplyAddSend(e, r) {
    if (FriendController.O6t !== 0 && Time_1.Time.Now - FriendController.O6t <= APPLYFRIENDCD) {
      return;
    }
    this.O6t = Time_1.Time.Now;
    const o = new Protocol_1.Aki.Protocol.xrs();
    o.s5n = e;
    o.XVn = r;
    Net_1.Net.Call(15982, o, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrReceiverApplyListCountMax) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RecipientFriendListFull");
          return;
        }
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrFriendApplySended) {
          ModelManager_1.ModelManager.FriendModel.AddPlayerToApplyFriendList(o.s5n);
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FriendApplicationSent");
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ApplicationSent, o.s5n);
          return;
        }
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrAlreadyOnFriendApplyList) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FriendApplicationSent");
          return;
        }
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrIsBlockedPlayer) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("IsBlockedPlayer");
          return;
        }
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrYouAreBlocked) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("YouAreBlocked");
          return;
        }
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrFriendApplyRequestLimit) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ApplicationTimesLimit");
          return;
        }
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrAlreadyOnFriendList) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("AlreadyOnFriendList");
          return;
        }
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19400);
      }
      ModelManager_1.ModelManager.FriendModel.AddPlayerToApplyFriendList(o.s5n);
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FriendApplicationSent");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ApplicationSent, o.s5n);
    });
  }
  static RequestFriendApplyHandle(d, s) {
    const v = new Protocol_1.Aki.Protocol.Brs();
    if (d.length === 0) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FriendApplicationListUpdate);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFriendApplicationRedDot);
    } else {
      v.BVn = d;
      v.$Vn = s;
      Net_1.Net.Call(26377, v, e => {
        let r = FriendController.k6t(e.Q4n);
        var o = v.BVn.length > 1;
        let n = 0;
        if (v.$Vn === Protocol_1.Aki.Protocol.A6s.Proto_Approve) {
          for (const a of Object.keys(e.qUs)) {
            var t;
            var l = e.qUs[a];
            if (l === Protocol_1.Aki.Protocol.Q4n.KRs) {
              if (t = ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(Number(a))) {
                ModelManager_1.ModelManager.FriendModel.AddFriend(t);
              }
            } else {
              if (l === Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlayerAccountDeactivation) {
                ModelManager_1.ModelManager.FriendModel.DeleteFriendApplication(Number(a));
              }
              if (r === "") {
                r = FriendController.k6t(l);
              }
            }
          }
        }
        for (const _ of Object.keys(e.qUs)) {
          var i = e.qUs[_];
          if (i === Protocol_1.Aki.Protocol.Q4n.KRs) {
            n++;
            ModelManager_1.ModelManager.FriendModel.DeleteFriendApplication(Number(_));
            if (v.$Vn === Protocol_1.Aki.Protocol.A6s.Proto_Approve) {
              ModelManager_1.ModelManager.FriendModel.AddPlayerToApproveFriendList(Number(_));
            } else if (v.$Vn === Protocol_1.Aki.Protocol.A6s.Proto_Reject) {
              ModelManager_1.ModelManager.FriendModel.AddPlayerToRefuseFriendList(Number(_));
            }
          } else if (r === "") {
            r = FriendController.k6t(i);
          }
        }
        if (r !== "" && (!o || n === 0)) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(r);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FriendApplicationListUpdate);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFriendApplicationRedDot);
        if (s === Protocol_1.Aki.Protocol.A6s.Proto_Reject) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ApplicationHandled, 3, d);
        } else if (s === Protocol_1.Aki.Protocol.A6s.Proto_Approve) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ApplicationHandled, 2, d);
        }
      });
    }
  }
  static k6t(e) {
    if (e !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      if (e === Protocol_1.Aki.Protocol.Q4n.Proto_ErrInitiatorFriendListCountMax) {
        return "ApplicantFriendListFull";
      } else if (e === Protocol_1.Aki.Protocol.Q4n.Proto_ErrFriendListCountMax) {
        return "FriendListFull";
      } else if (e === Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlayerAccountDeactivation) {
        return "PlayerDeleteSelf";
      } else {
        return "FriendApplicationInvalid";
      }
    } else {
      return "";
    }
  }
  static LocalRemoveApplicationFriend(e) {
    ModelManager_1.ModelManager.FriendModel.DeleteFriendApplication(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FriendApplicationListUpdate);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFriendApplicationRedDot);
  }
  static RequestFriendDelete(r) {
    var e = new Protocol_1.Aki.Protocol.krs();
    e.s5n = r;
    Net_1.Net.Call(24999, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrNotOnFriendList) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotOnFriendList");
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateFriendViewShow);
          return;
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20257);
          return;
        }
      }
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FriendDeleteSuccess");
      ModelManager_1.ModelManager.FriendModel.DeleteFriend(r);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateFriendViewShow);
    });
  }
  static async jxa(e) {
    e = e.hLs.map(async e => {
      if (ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(e.W5n)) {
        return ModelManager_1.ModelManager.FriendModel.GetBlockedPlayerById(e.W5n).InitializeFriendBlackListData(e);
      }
      {
        const r = new FriendData_1.FriendBlackListData();
        return r.InitializeFriendBlackListData(e).then(() => {
          ModelManager_1.ModelManager.FriendModel.AddToBlackList(r);
        });
      }
    });
    await Promise.all(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateBlackListShow);
  }
  static async Wxa(e, r) {
    if (ModelManager_1.ModelManager.FriendModel.IsMyFriend(e)) {
      ModelManager_1.ModelManager.FriendModel.DeleteFriend(e);
    }
    if (ModelManager_1.ModelManager.FriendModel.HasFriendApplication(e)) {
      ModelManager_1.ModelManager.FriendModel.DeleteFriendApplication(e);
    }
    e = new FriendData_1.FriendBlackListData();
    await e.InitializeFriendBlackListData(r.YVn);
    ModelManager_1.ModelManager.FriendModel.AddToBlackList(e);
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("BlockedPlayerSucceed", e.GetBlockedPlayerData.PlayerName);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateFriendViewShow);
  }
  static RequestSearchPlayerBasicInfoBySdkId(e) {
    var r = new Protocol_1.Aki.Protocol.Rm_();
    r.Qxa = e;
    Net_1.Net.Call(29008, r, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_InvalidUserId) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("InvalidUserId");
          return;
        } else if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrCanNotGetSelfBasicInfo) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("CanNotSearchSelf");
          return;
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18787);
          return;
        }
      }
      FriendController.Kxa(e.YVn);
    });
  }
  static RequestPlayerCurrentDeactivationState(e, r) {
    var o = new Protocol_1.Aki.Protocol.pYn();
    o.s5n = e;
    Net_1.Net.Call(22661, o, e => {
      if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlayerAccountDeactivation) {
        r(true);
      } else {
        r(false);
      }
    });
  }
  static RequestSearchPlayerBasicInfo(o, n = false) {
    var e = new Protocol_1.Aki.Protocol.pYn();
    e.s5n = o;
    Net_1.Net.Call(22661, e, e => {
      var r;
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && !n) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_InvalidUserId) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("InvalidUserId");
          return;
        } else if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrCanNotGetSelfBasicInfo) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("CanNotSearchSelf");
          return;
        } else if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlayerAccountDeactivation) {
          r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PlayerDeleteSelf");
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, undefined, undefined, [r]);
          return;
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27842);
          return;
        }
      }
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && n) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Friend", 27, "RequestSearchPlayerBasicInfo Error", ["错误码", e.Q4n], ["PlayerId", o]);
        }
      } else {
        FriendController.Kxa(e.YVn);
      }
    });
  }
  static async Kxa(e) {
    var r = new FriendData_1.FriendData();
    await r.SetPlayerBasicInfo(e);
    var e = await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkBlockingUser();
    if (e && e.get(r.GetAccountId())) {
      return;
    }
    ModelManager_1.ModelManager.FriendModel.AddFriendSearchResults(r);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SearchPlayerInfo, r.PlayerId);
  }
  static GetOfflineSection(e) {
    e = TimeUtil_1.TimeUtil.CalculateDayTimeStampGapBetweenNow(e, false);
    let r = 0;
    let o = "FriendOfflineToday";
    if (e <= 1) {
      r = 0;
      o = "FriendOfflineToday";
    } else if (e > 1 && e <= CommonDefine_1.DAY_PER_WEEK) {
      r = 1;
      o = "FriendOfflineInWeek";
    } else if (e > 1 && e <= CommonDefine_1.DAY_PER_MONTH) {
      r = 2;
      o = "FriendOfflineInMonth";
    } else if (e > CommonDefine_1.DAY_PER_MONTH) {
      r = 3;
      o = "FriendOfflineOverMonth";
    }
    return [o, r];
  }
  static CheckRemarkIsValid(e) {
    return e !== undefined && e !== "";
  }
  static CreateFriendItemSt(e, r) {
    var o = new Array();
    for (const t of e) {
      var n = new FriendItemSt();
      n.Id = t;
      n.OperationType = r;
      o.push(n);
    }
    return o;
  }
  static CheckHasAnyApplied(e) {
    var r = ModelManager_1.ModelManager.FriendModel;
    for (const o of e) {
      if (r.HasFriendApplication(o)) {
        return true;
      }
    }
    return false;
  }
  static GetSortedFriendListByRules(r, e) {
    var o = new Array();
    for (let e = r.length - 1; e >= 0; e--) {
      o.push(r[e]);
    }
    o.sort(e);
    return o;
  }
  static GetSortedBlackOrApplyList(r) {
    var o = new Array();
    for (let e = r.length - 1; e >= 0; e--) {
      o.push(r[e]);
    }
    return o;
  }
  static RequestFriendRecentlyTeam() {
    var e = Protocol_1.Aki.Protocol.Frs.create();
    Net_1.Net.Call(25911, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.FriendModel.InitRecentlyTeamDataByResponse(e.OUs);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16082);
        }
      }
    });
  }
  static GetOfflineTimeString(e) {
    if (e <= 1) {
      return "FriendOfflineToday";
    } else if (e > 1 && e <= CommonDefine_1.DAY_PER_MONTH) {
      return "FriendOfflineSomeDay";
    } else if (e > CommonDefine_1.DAY_PER_MONTH) {
      return "FriendOfflineOverMonth";
    } else {
      return "FriendOfflineToday";
    }
  }
}
exports.FriendController = FriendController;
(_a = FriendController).P6t = undefined;
FriendController.U6t = false;
FriendController.A6t = false;
FriendController.O6t = 0;
FriendController.x6t = () => {
  _a.RequestAllFriend();
};
FriendController.Qze = () => {
  FriendController.RequestAllFriend(true);
};
FriendController.nye = () => {
  if (FriendController.U6t) {
    if (FriendController.A6t !== ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Friend", 27, "好友模式改变");
      }
      FriendController.RequestAllFriend(true, () => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGetFriendInitData);
      });
    }
    FriendController.A6t = ModelManager_1.ModelManager.GameModeModel.IsMulti;
  } else {
    FriendController.U6t = true;
  }
};
FriendController.Q5e = () => {
  FriendController.RequestAllFriend(true, () => {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGetFriendInitData);
  });
  _a.P3e();
};
FriendController.w6t = () => {
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFriendApplicationRedDot);
};
FriendController.F6t = 0;
FriendController.V6t = 0;
FriendController.RequestAllFriend = (e = false, r = undefined) => {
  var o;
  if (!(TimeUtil_1.TimeUtil.GetServerTime() <= FriendController.F6t) && !!ModelManager_1.ModelManager.LoginModel.IsLoginStatus(LoginDefine_1.ELoginStatus.EnterGameRet) || !!e) {
    o = SERVERREQUESTCD / 1000;
    if (e && TimeUtil_1.TimeUtil.GetServerTime() - FriendController.V6t < o) {
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        _a.RequestAllFriend(e, r);
      }, SERVERREQUESTCD);
    } else {
      o = new Protocol_1.Aki.Protocol.Rrs();
      FriendController.F6t = TimeUtil_1.TimeUtil.GetServerTime() + FriendDefine_1.FRIEND_ALL_UPDATE_INTERVAL_MINUTES * CommonDefine_1.SECOND_PER_MINUTE;
      FriendController.V6t = TimeUtil_1.TimeUtil.GetServerTime();
      if (Net_1.Net.IsServerConnected()) {
        Net_1.Net.Call(29777, o, e => {
          r?.();
          FriendController.Fxa(e);
        });
      }
    }
  }
};
FriendController.b6t = e => {
  FriendController.Vxa(e);
};
FriendController.q6t = e => {
  e = e.s5n;
  ChatController_1.ChatController.TryActiveDeleteFriendTips(e);
  ModelManager_1.ModelManager.FriendModel.DeleteFriend(e);
};
FriendController.G6t = e => {
  _a.Hxa(e);
};
FriendController.N6t = e => {
  ModelManager_1.ModelManager.FriendModel.DeleteFriendApplication(e.s5n);
};
FriendController.RequestFriendRemarkChange = async (e, r) => {
  var o;
  if (e) {
    (o = new Protocol_1.Aki.Protocol.Grs()).s5n = e;
    o.JVn = r;
    if ((e = await Net_1.Net.CallAsync(20141, o)).Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19400);
      if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrFriendRemarkLengthLimit) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FriendRemarkLengthLimit);
      } else if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ContainsDirtyWord) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FriendRemarkContainsDirtyWord);
      }
    } else {
      if (ModelManager_1.ModelManager.FriendModel.IsMyFriend(o.s5n)) {
        ModelManager_1.ModelManager.FriendModel.GetFriendById(o.s5n).FriendRemark = o.JVn;
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateFriendViewShow);
    }
    return e.Q4n;
  } else {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Friend", 27, "RequestFriendRemarkChange id is null");
    }
    return Protocol_1.Aki.Protocol.Q4n.Proto_ErrFriendApplyNotExists;
  }
};
FriendController.RequestBlackList = () => {
  var e = new Protocol_1.Aki.Protocol.HJn();
  Net_1.Net.Call(24407, e, e => {
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20191);
    } else {
      FriendController.jxa(e);
    }
  });
};
FriendController.RequestBlockPlayer = r => {
  var e = new Protocol_1.Aki.Protocol.WJn();
  e.s5n = r;
  Net_1.Net.Call(16511, e, e => {
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrIsBlockedPlayer) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("IsBlockedPlayer");
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateBlackListShow);
        return;
      } else if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrBlockListCountMax) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("BlackListFull");
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateBlackListShow);
        return;
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21188);
        return;
      }
    }
    FriendController.Wxa(r, e);
  });
};
FriendController.RequestUnBlockPlayer = r => {
  var e = new Protocol_1.Aki.Protocol.QJn();
  e.s5n = r;
  Net_1.Net.Call(26121, e, e => {
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrIsNotBlockedPlayer) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("IsNotBlockedPlayer");
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateBlackListShow);
        return;
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27792);
        return;
      }
    }
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RemoveFromBlackListSucceeded", ModelManager_1.ModelManager.FriendModel.GetBlockedPlayerById(r).GetBlockedPlayerData.PlayerName);
    ModelManager_1.ModelManager.FriendModel.DeleteBlockedPlayer(r);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateBlackListShow);
  });
};
FriendController.FriendListSortHook = (e, r) => {
  e = ModelManager_1.ModelManager.FriendModel.GetFriendById(e);
  r = ModelManager_1.ModelManager.FriendModel.GetFriendById(r);
  return FriendController.H6t(e, r);
};
FriendController.H6t = (e, r) => e && r ? e.PlayerIsOnline !== r.PlayerIsOnline ? !e.PlayerIsOnline && r.PlayerIsOnline ? 1 : -1 : e.PlayerIsOnline && r.PlayerIsOnline || FriendController.GetOfflineSection(e.PlayerLastOfflineTime)[1] === FriendController.GetOfflineSection(r.PlayerLastOfflineTime)[1] ? e.PlayerLevel === r.PlayerLevel ? e.PlayerId - r.PlayerId : -(e.PlayerLevel - r.PlayerLevel) : -(FriendController.GetOfflineSection(e.PlayerLastOfflineTime)[1] - FriendController.GetOfflineSection(r.PlayerLastOfflineTime)[1]) : 1;
FriendController.B6t = r => {
  ModelManager_1.ModelManager.FriendModel.ClearTestFriendData();
  for (let e = 0; e < r; ++e) {
    var o = new FriendData_1.FriendData();
    o.PlayerId = e + 1;
    o.PlayerName = "测试员" + (e + 1);
    o.FriendRemark = "仅供展示使用" + (e + 1);
    o.PlayerLevel = 1;
    o.PlayerIsOnline = true;
    o.PlayerLastOfflineTime = Date.parse(new Date().toString()) / CommonDefine_1.MILLIONSECOND_PER_SECOND;
    o.Debug = true;
    var n = new FriendData_1.FriendApplyData();
    var t = new FriendData_1.FriendBlackListData();
    n.ApplyPlayerData = o;
    n.ApplyCreatedTime = o.PlayerLastOfflineTime + e;
    n.Fresh = false;
    t.GetBlockedPlayerData = o;
    ModelManager_1.ModelManager.FriendModel.AddFriend(o);
    ModelManager_1.ModelManager.FriendModel.AddFriendApplication(n);
    ModelManager_1.ModelManager.FriendModel.AddToBlackList(t);
    ModelManager_1.ModelManager.FriendModel.AddFriendSearchResults(o);
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateFriendViewShow);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateBlackListShow);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SearchPlayerInfo, r);
  return ModelManager_1.ModelManager.FriendModel.TestDataLoaded = true;
}; //# sourceMappingURL=FriendController.js.map