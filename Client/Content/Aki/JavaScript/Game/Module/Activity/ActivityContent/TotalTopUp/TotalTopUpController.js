"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiModel_1 = require("../../../../Ui/UiModel");
const ErrorCodeController_1 = require("../../../ErrorCode/ErrorCodeController");
const PayShopRootView_1 = require("../../../PayShop/PayShopRootView");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const TotalTopUpData_1 = require("./TotalTopUpData");
const TotalTopUpDefine_1 = require("./TotalTopUpDefine");
const TotalTopUpView_1 = require("./View/TotalTopUpView");
class TotalTopUpController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.M9g = e => {
      if (e === "PayShopRootView" && (e = this.GetSingleActivityData())) {
        e.HasRequestedScoreInfo = false;
        TotalTopUpDefine_1.TotalTopUpUtil.Debug("商店界面关闭，重置积分信息请求状态");
      }
    };
    this.vxg = e => {
      var t;
      TotalTopUpDefine_1.TotalTopUpUtil.Debug("收到Activity Info Notify");
      if (e.dRf && (t = this.GetSingleActivityData())) {
        t.InitData(e.dRf, t.Id);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityViewRefreshCurrent, t.Id ?? 0);
      }
    };
    this.yxg = e => {
      TotalTopUpDefine_1.TotalTopUpUtil.Debug("收到奖励通知", ["RewardId", e.pRf.map(e => e.s5n).join(",")]);
      var t = this.GetSingleActivityData();
      if (t) {
        t.UpdateReward(e.pRf);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityViewRefreshCurrent, t.Id ?? 0);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.Id ?? 0);
      }
    };
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(25169, this.vxg);
    Net_1.Net.Register(27806, this.yxg);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25169);
    Net_1.Net.UnRegister(27806);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnViewDone, this.M9g);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnViewDone, this.M9g);
  }
  GetSingleActivityData() {
    var e = Protocol_1.Aki.Protocol.uks.Proto_TotalTopUp;
    var e = ModelManager_1.ModelManager.ActivityModel?.GetActivitiesByType(e);
    if (e && !(e.length <= 0)) {
      if (e.length > 1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("ActivityTotalTopUp", 95, "multiple data found: " + e.length);
        }
      } else {
        e = e[0];
        if (e && e.CheckIfInOpenTime()) {
          return e;
        }
      }
    }
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiView_CumulativeRechargeMain";
  }
  OnCreateSubPageComponent(e) {
    return new TotalTopUpView_1.TotalTopUpView();
  }
  OnCreateActivityData(e) {
    var t = new TotalTopUpData_1.TotalTopUpData();
    if (e.dRf) {
      t.InitData(e.dRf, e.s5n);
    }
    return t;
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  RequestClaim(t, e) {
    TotalTopUpDefine_1.TotalTopUpUtil.Debug("发送请求领取奖励");
    var o = new Protocol_1.Aki.Protocol.uRf();
    o.gRf = t;
    if (e !== undefined) {
      o.N9n = [e];
    }
    Net_1.Net.Call(25196, o, e => {
      if (e?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        TotalTopUpDefine_1.TotalTopUpUtil.Error("领取奖励失败", ["RewardId", t], ["ErrorCode", e?.Q4n]);
        ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e?.Q4n ?? Protocol_1.Aki.Protocol.Q4n.Proto_UnKnownError, 25196, []);
      }
    });
  }
  async RequestScoreInfoAsync() {
    var e;
    var t;
    var o = this.GetSingleActivityData();
    if (o && !o.HasRequestedScoreInfo) {
      e = o.Id;
      TotalTopUpDefine_1.TotalTopUpUtil.Debug("发送请求更新积分信息");
      (t = new Protocol_1.Aki.Protocol.aRf()).w6n = e;
      if ((t = await Net_1.Net.CallAsync(24207, t)) && t.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        o.UpdateGoodsScore(t.OUs ?? []);
      } else {
        TotalTopUpDefine_1.TotalTopUpUtil.Error("请求积分信息失败", ["ActivityId", e], ["ErrorCode", t?.Q4n]);
        ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(t?.Q4n ?? Protocol_1.Aki.Protocol.Q4n.Proto_UnKnownError, 24207, []);
      }
    }
  }
  GetGoodsScore(e) {
    var t = this.GetSingleActivityData();
    if (t) {
      return t.GoodsScoreMap.get(e) ?? 0;
    } else {
      return 0;
    }
  }
  GetRechargeItemScore(e) {
    var t = this.GetSingleActivityData();
    if (t) {
      return t.RechargeItemMap.get(e) ?? 0;
    } else {
      return 0;
    }
  }
  CheckCurrentTotalUpRunning() {
    var e = this.GetSingleActivityData();
    return !!e && e.CheckIfInOpenTime();
  }
  SkipToCurrentActivityView() {
    var e = this.GetSingleActivityData();
    if (e) {
      if (!this.TryResumePreviousView("PayShopRootView", "CommonActivityView", () => {
        var e = this.GetSingleActivityData();
        if (e) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityViewChange, e.Id);
        } else {
          TotalTopUpDefine_1.TotalTopUpUtil.Error("恢复累计充值活动界面失败，找不到活动数据");
        }
      })) {
        SkipTaskManager_1.SkipTaskManager.Run(17, e.Id);
      }
    } else {
      TotalTopUpDefine_1.TotalTopUpUtil.Error("跳转累计充值活动界面失败，找不到活动数据");
    }
  }
  SkipToPayShop(t, o) {
    if (!this.TryResumePreviousView("CommonActivityView", "PayShopRootView", e => {
      if (e instanceof PayShopRootView_1.PayShopRootView) {
        TotalTopUpDefine_1.TotalTopUpUtil.Debug("恢复商业化商城界面到指定Tab", ["ShopId", t], ["TabIndex", o]);
        e.SwitchPayShopTabItem(t, o);
      }
    })) {
      SkipTaskManager_1.SkipTaskManager.Run(20, String(t), String(o));
    }
  }
  TryResumePreviousView(e, t, o) {
    var r = UiModel_1.UiModel.PeekNormalView(0);
    return !!r && r.Info?.Name === e && !!(e = UiModel_1.UiModel.PeekNormalView(1)) && e.Info?.Name === t && !(o?.(e), r.CloseMe(), 0);
  }
  GetCurrentScoreIconPath() {
    var e = this.GetSingleActivityData();
    if (e) {
      return e.ViewConfig?.ScoreIcon ?? "";
    } else {
      return "";
    }
  }
}
exports.TotalTopUpController = TotalTopUpController;
//# sourceMappingURL=TotalTopUpController.js.map