"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksController = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
class DrinksController extends UiControllerBase_1.UiControllerBase {
  static OpenMainView(e) {
    UiManager_1.UiManager.OpenView("DrinksSelectRoleView", e);
  }
  static async SelectRoleAndPlaySeq(e, r, o) {
    var a;
    var t = ModelManager_1.ModelManager.DrinksModel;
    t.GameplayIsMainQuest = o !== undefined;
    var n = await this.RequestMixDrinkRoleInvite(e);
    if (n) {
      a = ModelManager_1.ModelManager.DrinksModel.GetSceneController();
      t.GameplayOpenWay = r;
      t.InitGame(e, o);
      a.UpdateCupActor(undefined, 0);
    } else {
      UiLayer_1.UiLayer.SetShowMaskLayer("DrinksSelectRoleView", false);
    }
    return n;
  }
  static OpenPlayView() {
    UiManager_1.UiManager.OpenView("DrinksGameplayView");
  }
  static async RequestMixDrinkSettle() {
    var e = ModelManager_1.ModelManager.DrinksModel;
    var r = e.GetCurrentPlayData();
    var o = Protocol_1.Aki.Protocol.y7f.create();
    o.I7f = r.RequireId;
    o.T7f = r.DrinkBase;
    o.R7f = r.Ornament;
    var [a] = e.GetRoleState();
    o.L7f = a;
    if (r.Batching) {
      o.b7f = r.Batching;
    }
    var o = await Net_1.Net.CallAsync(21057, o);
    return !!o && (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 23090), Log_1.Log.CheckError() && Log_1.Log.Error("Drinks", 77, "Error LikenessScore", ["data", r], ["like", a]), false) : (o = e.GetRoleId(), r = e.GetLikenessMax(), this.ReportDrinksGameplayResult(), e.SetUnlockConfig(o, a > 0, r <= a), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnDrinksUnlockClickedNotify), true));
  }
  static async RequestMixDrinkRoleInvite(e) {
    var r = Protocol_1.Aki.Protocol.OOg.create();
    r.Q6n = e;
    var r = await Net_1.Net.CallAsync(18150, r);
    return !!r && (r.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(r.Q4n, 26541), false) : (ModelManager_1.ModelManager.DrinksModel.GameplayStamp = TimeUtil_1.TimeUtil.GetServerTimeStamp(), this.ReportDrinksGameplayInvite(), ModelManager_1.ModelManager.DrinksModel.SetUnlockConfig(e, undefined, undefined), true));
  }
  static async RequestMixDrinkRoleReward(e, r) {
    var o = Protocol_1.Aki.Protocol.P3g.create();
    o.B3g = e;
    var e = await Net_1.Net.CallAsync(22549, o);
    return !!e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28567), false) : (ModelManager_1.ModelManager.DrinksModel.SetRewardReceived(r), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnDrinksUnlockClickedNotify), true));
  }
  static async GmTestScoreCheck() {
    var o = [...ConfigManager_1.ConfigManager.DrinksConfig.GetRequireListByRole(1207), ...ConfigManager_1.ConfigManager.DrinksConfig.GetRequireListByRole(1409), ...ConfigManager_1.ConfigManager.DrinksConfig.GetRequireListByRole(1209)];
    var a = ConfigManager_1.ConfigManager.DrinksConfig.GetAllDrinkBase();
    var t = ConfigManager_1.ConfigManager.DrinksConfig.GetAllBatching();
    var n = ConfigManager_1.ConfigManager.DrinksConfig.GetAllOrnament();
    for (let r = 0; r < a.length; r++) {
      var i = {
        RequireId: 0,
        DrinkBase: [],
        Ornament: 0,
        Batching: []
      };
      for (let e = r; e < a.length; e++) {
        i.DrinkBase = [a[r].Id, a[e].Id];
        for (let r = -1; r < t.length; r++) {
          var l = [];
          if (r !== -1) {
            l.push(t[r].Id);
          }
          for (let e = r; e < t.length; e++) {
            var _ = [...l];
            if (e !== r) {
              _.push(t[e].Id);
            }
            i.Batching = _;
            for (const s of n) {
              i.Ornament = s.Id;
              for (const g of o) {
                i.RequireId = g.Id;
                ModelManager_1.ModelManager.DrinksModel.GmTestCode(i, g.RoleId);
                await DrinksController.RequestMixDrinkSettle();
              }
            }
          }
        }
      }
    }
  }
  static GmTestCupActor(e) {
    var r = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("Cups"), 0);
    if (r) {
      ModelManager_1.ModelManager.DrinksModel.GetSceneController().UpdateWaterById(r, e, [], 1207, false, true);
    }
  }
  static ReportDrinksGameplayInvite() {
    var e = new LogReportDefine_1.DrinksGameplayInviteLogEvent();
    var r = ModelManager_1.ModelManager.DrinksModel;
    var o = ModelManager_1.ModelManager.SpringManorModel.ActivityData;
    var a = r.GetRoleId();
    e.i_activity_id = o.Id;
    e.i_role_id = a;
    e.i_inst_id = r.GameplayOpenWay;
    if (r.GameplayIsMainQuest) {
      e.i_first_pass = 0;
    } else if ((o = o.GetDrinksProgressMap()).has(a)) {
      e.i_first_pass = o.get(a).FirstPass ? 3 : 2;
      r.GameplayFirstInvite = false;
    } else {
      e.i_first_pass = 1;
      r.GameplayFirstInvite = true;
    }
    e.s_trace_id = String(r.GameplayStamp);
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
  }
  static ReportDrinksGameplayResult() {
    var e = new LogReportDefine_1.DrinksGameplayResultLogEvent();
    var r = ModelManager_1.ModelManager.DrinksModel;
    var o = ModelManager_1.ModelManager.SpringManorModel.ActivityData;
    var a = r.GetRoleId();
    var t = r.GetCurrentPlayData();
    e.i_activity_id = o.Id;
    e.i_role_id = a;
    e.i_inst_id = r.GameplayOpenWay;
    var o = o.GetDrinksProgressMap();
    var [n, i] = r.GetRoleState();
    var l = r.GetLikenessMax();
    if (r.GameplayIsMainQuest) {
      e.i_first_pass = 0;
    } else if (r.GameplayFirstInvite) {
      e.i_first_pass = 1;
    } else {
      e.i_first_pass = o.get(a).FirstPass ? 3 : 2;
    }
    e.i_result = n <= 0 ? 1 : l <= n ? 3 : 2;
    var o = ConfigManager_1.ConfigManager.DrinksConfig.GetDrinkBase(t.DrinkBase[0]);
    e.i_first_tab = o.DrinkId;
    e.i_first_count = o.QTENum;
    var a = ConfigManager_1.ConfigManager.DrinksConfig.GetDrinkBase(t.DrinkBase[1]);
    e.i_second_tab = a.DrinkId;
    e.i_second_count = a.QTENum;
    e.i_third_tab = t.Batching && t.Batching.length > 0 ? t.Batching[0] : -1;
    e.i_fourth_tab = t.Batching && t.Batching.length > 1 ? t.Batching[1] : -1;
    e.i_fifth_tab = t.Ornament === 0 ? -1 : t.Ornament;
    e.i_cost_time = (TimeUtil_1.TimeUtil.GetServerTimeStamp() - r.GameplayStamp) * TimeUtil_1.TimeUtil.Millisecond;
    e.i_require_id = t.RequireId;
    e.o_score_buff = [];
    for (const _ of i) {
      e.o_score_buff.push(_.Completed ? 1 : 0);
    }
    e.s_trace_id = String(r.GameplayStamp);
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
  }
}
exports.DrinksController = DrinksController;
//# sourceMappingURL=DrinksController.js.map