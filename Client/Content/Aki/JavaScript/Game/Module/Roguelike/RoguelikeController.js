"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoguelikeController = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const AsyncTask_1 = require("../../World/Task/AsyncTask");
const TaskSystem_1 = require("../../World/Task/TaskSystem");
const ActivityRogueController_1 = require("../Activity/ActivityContent/RougeActivity/ActivityRogueController");
const BlackScreenController_1 = require("../BlackScreen/BlackScreenController");
const ConfirmBoxController_1 = require("../ConfirmBox/ConfirmBoxController");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonEntranceController_1 = require("../InstanceDungeon/InstanceDungeonEntranceController");
const ItemHintController_1 = require("../ItemHint/ItemHintController");
const ItemRewardController_1 = require("../ItemReward/ItemRewardController");
const ItemRewardDefine_1 = require("../ItemReward/ItemRewardDefine");
const LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController");
const RoleController_1 = require("../RoleUi/RoleController");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const WeatherController_1 = require("../Weather/WeatherController");
const WeatherModel_1 = require("../Weather/WeatherModel");
const EventResult_1 = require("./Define/EventResult");
const RogueGainEntry_1 = require("./Define/RogueGainEntry");
const RoguelikeInfo_1 = require("./Define/RoguelikeInfo");
class RoguelikeController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCloseLoadingView, RoguelikeController.OnCloseLoading);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCloseLoadingView, RoguelikeController.OnCloseLoading);
  }
  static async OpenRoguelikeActivityView() {
    const o = new CustomPromise_1.CustomPromise();
    UiManager_1.UiManager.OpenView("RoguelikeActivityView", undefined, e => {
      o.SetResult(e);
    });
    return o.Promise;
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("RoguelikeActivityView", RoguelikeController.CheckCanOpen, "RoguelikeController.CheckCanOpen");
    UiManager_1.UiManager.AddOpenViewCheckFunction("RoguelikeInstanceView", RoguelikeController.CheckCanOpen, "RoguelikeController.CheckCanOpen");
    UiManager_1.UiManager.AddOpenViewCheckFunction("RoguelikeMemoryPlaceView", RoguelikeController.CheckCanOpen, "RoguelikeController.CheckCanOpen");
    UiManager_1.UiManager.AddOpenViewCheckFunction("RoguelikeSelectRoleView", RoguelikeController.CheckCanOpen, "RoguelikeController.CheckCanOpen");
    UiManager_1.UiManager.AddOpenViewCheckFunction("RoguelikeTokenOverView", RoguelikeController.CheckCanOpen, "RoguelikeController.CheckCanOpen");
    UiManager_1.UiManager.AddOpenViewCheckFunction("RogueInfoView", RoguelikeController.CheckCanOpen, "RoguelikeController.CheckCanOpen");
    UiManager_1.UiManager.AddOpenViewCheckFunction("RoguelikeSkillView", RoguelikeController.CheckCanOpen, "RoguelikeController.CheckCanOpen");
    UiManager_1.UiManager.AddOpenViewCheckFunction("RoguelikeExitTips", RoguelikeController.CheckCanOpenExitTips, "RoguelikeController.CheckCanOpenExitTips");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("RoguelikeActivityView", RoguelikeController.CheckCanOpen);
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("RoguelikeInstanceView", RoguelikeController.CheckCanOpen);
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("RoguelikeMemoryPlaceView", RoguelikeController.CheckCanOpen);
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("RoguelikeSelectRoleView", RoguelikeController.CheckCanOpen);
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("RoguelikeTokenOverView", RoguelikeController.CheckCanOpen);
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("RogueInfoView", RoguelikeController.CheckCanOpen);
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("RoguelikeSkillView", RoguelikeController.CheckCanOpen);
  }
  static async OpenBuffSelectViewByIdAsync(e) {
    var o;
    var r = ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(e);
    if (!r) {
      (o = new Protocol_1.Aki.Protocol.l_s()).c5n = ModelManager_1.ModelManager.RoguelikeModel.CurIndex;
      o.AHn = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount;
      if (r.RoguelikeGainDataType === Protocol_1.Aki.Protocol.a8s.flu) {
        o.c5n = Protocol_1.Aki.Protocol.s8s.Proto_ShopBindId;
      }
      r = await Net_1.Net.CallAsync(22427, o);
      ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeChooseData([r.Q2s]);
    }
    await RoguelikeController.OpenBuffSelectViewById(e);
  }
  static async OpenBuffSelectViewById(e) {
    var o;
    var r = ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(e);
    if (r) {
      o = RoguelikeController.GetViewNameByGainType(r.RoguelikeGainDataType);
      return !!UiManager_1.UiManager.IsViewOpen(o) || (Log_1.Log.CheckInfo() && Log_1.Log.Info("Roguelike", 34, "肉鸽选择界面数据:", ["BindId:", e], ["Data:", r]), (await UiManager_1.UiManager.OpenViewAsync(o, r)) !== undefined);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Roguelike", 8, "没有肉鸽界面数据!");
      }
      return false;
    }
  }
  static GetViewNameByGainType(e) {
    switch (e) {
      case Protocol_1.Aki.Protocol.a8s.hxs:
        if (ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePhantomConfig(ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry.ConfigId)) {
          return "RoguePhantomReplaceView";
        } else {
          return "RoguePhantomSelectView";
        }
      case Protocol_1.Aki.Protocol.a8s.RUs:
        return "RoleReplaceView";
      case Protocol_1.Aki.Protocol.a8s.Proto_CommonBuff:
        return "CommonSelectView";
      case Protocol_1.Aki.Protocol.a8s.Proto_RoleBuff:
        return "RoleBuffSelectView";
      case Protocol_1.Aki.Protocol.a8s.flu:
        return "RogueShopView";
      case Protocol_1.Aki.Protocol.a8s.mlu:
        return "RoguelikeRandomEventView";
      case Protocol_1.Aki.Protocol.a8s.Proto_Miraclecreation:
        return "RoguelikeSelectSpecialView";
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Roguelike", 8, "当前增益类型没有对应的界面数据", ["type", Protocol_1.Aki.Protocol.a8s[e]]);
    }
  }
  static RoguelikeRefreshGainRequest(e) {
    var o = new Protocol_1.Aki.Protocol.a_s();
    o.RHn = e;
    o.AHn = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount;
    Net_1.Net.Call(19314, o, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeScrollingTipsView(e.Q4n, e.lvs);
      } else {
        ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeChooseData([e.Q2s]);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoguelikeRefreshGain, e.Q2s.c5n);
      }
    });
  }
  static async RoguelikeLastInfoRequestAsync() {
    var e = new Protocol_1.Aki.Protocol.C_s();
    var e = await Net_1.Net.CallAsync(25502, e);
    if (e?.oqs) {
      this.RoguelikeResultRequest(e.nqs[0].r6n);
    }
  }
  static EnterCurrentRogueEntrance() {
    var e = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData().SeasonData;
    if (e) {
      e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(e.UHn);
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.EnterEntrance(e.InstanceDungeonEntrance).finally(undefined);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Roguelike", 34, "打开副本选择界面时肉鸽赛季数据为空");
    }
  }
  static OpenRoguelikeInstanceView() {
    var e = new Protocol_1.Aki.Protocol.C_s();
    Net_1.Net.Call(25502, e, o => {
      if (o?.oqs) {
        const r = o.nqs[0];
        o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(135);
        o.IsEscViewTriggerCallBack = false;
        o.SetTextArgs(r.iqs.toString(), r.rqs.toString());
        let e = false;
        o.SetCloseFunction(() => {
          if (UiManager_1.UiManager.IsViewShow("InstanceDungeonEntranceView") && !e) {
            UiManager_1.UiManager.CloseView("InstanceDungeonEntranceView");
          }
        });
        o.FunctionMap.set(1, () => {
          e = true;
          this.RoguelikeResultRequest(r.r6n);
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
        });
        o.FunctionMap.set(2, () => {
          if (ControllerHolder_1.ControllerHolder.RoleController.IsInRoleTrial()) {
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrialRoleDungeonsLimit");
          } else {
            this.RoguelikeStartRequest(true, r.r6n, []);
          }
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
      }
    });
    UiManager_1.UiManager.OpenView("InstanceDungeonEntranceView");
  }
  static OpenRogueInfoView() {
    UiManager_1.UiManager.OpenView("RogueInfoView");
  }
  static OpenRoguelikeSelectRoleView(e) {
    UiManager_1.UiManager.OpenView("RoguelikeSelectRoleView", e);
  }
  static OpenRoguelikeSkillView(e) {
    this.RoguelikeTalentInfoRequest(e).then(() => {
      UiManager_1.UiManager.OpenView("RoguelikeSkillView", e);
    });
  }
  static async RoguelikeTalentInfoRequest(e) {
    var o = Protocol_1.Aki.Protocol.D_s.create();
    o.UHn = e;
    var r = await Net_1.Net.CallAsync(24709, o);
    if (r.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(r.Q4n, 24001);
    } else {
      for (const l of Object.keys(r.Mqs)) {
        ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeSkillData(Number(l), r.Mqs[l]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoguelikeDataUpdate);
    }
  }
  static async RoguelikeRoleRoomSelectRequest(e, o) {
    var r = new Protocol_1.Aki.Protocol.Ara();
    r.Mra = e;
    r.c5n = o;
    var e = await Net_1.Net.CallAsync(26127, r);
    return e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs || (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26849), false);
  }
  static async RoguelikeSeasonRewardReceiveRequest(e, o) {
    var r = new Protocol_1.Aki.Protocol.G_s();
    r.UHn = o ?? 0;
    r.c5n = e;
    var o = await Net_1.Net.CallAsync(22517, r);
    return o.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs || (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 27826), false);
  }
  static async RoguelikeTalentLevelUpRequest(e) {
    var o = Protocol_1.Aki.Protocol.P_s.create();
    o.r5n = e;
    var o = await Net_1.Net.CallAsync(18835, o);
    if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 22921);
    } else {
      ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeSkillData(e, o.F6n);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoguelikeTalentLevelUp, e);
    }
  }
  static async RoguelikeStartRequest(e, o, r) {
    var l = Protocol_1.Aki.Protocol.f_s.create();
    l.xHn = e;
    l.r6n = o;
    l.C5n = r;
    l.UHn = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData().SeasonData.UHn;
    ModelManager_1.ModelManager.RoguelikeModel.CurDungeonId = o;
    BlackScreenController_1.BlackScreenController.AddBlackScreen("None", "LeaveScene");
    var e = await Net_1.Net.CallAsync(20713, l);
    BlackScreenController_1.BlackScreenController.RemoveBlackScreen("None", "LeaveScene");
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28534);
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RevertEntranceFlowStep();
      return false;
    } else {
      ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList = r;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EnterInstanceDungeon);
      return true;
    }
  }
  static RoguelikeQuitRequest() {
    if (!this.Sao) {
      const o = ModelManager_1.ModelManager.RoguelikeModel?.CheckIsGuideDungeon();
      var e = Protocol_1.Aki.Protocol.p_s.create();
      Net_1.Net.Call(24960, e, e => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27189);
        }
        this.Sao = !o;
        ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceDungeonInfo();
      });
    }
  }
  static RoguelikeResultRequest(e) {
    var o;
    if (!this.Sao) {
      (o = Protocol_1.Aki.Protocol.E_s.create()).r6n = e;
      Net_1.Net.Call(25040, o, e => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17680);
        } else {
          this.Sao = ModelManager_1.ModelManager.RoguelikeModel?.CheckInRoguelike();
          UiManager_1.UiManager.OpenView("RoguelikeSettleView", e.dqs);
        }
      });
    }
  }
  static RogueChooseDataResultRequest(l) {
    const t = ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry;
    let n = undefined;
    if (l === 1) {
      n = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry;
    } else if (l === 3) {
      n = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.RoleEntry;
    } else if (l === 6) {
      n = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry;
      var e = t.ShopItemCoinId;
      if (ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeCurrency(e) < (t.CurrentPrice === 0 ? t.OriginalPrice : t.CurrentPrice)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("RoguelikeShopNotEnoughCurrency");
        return;
      }
    } else {
      n = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry;
    }
    const i = new Protocol_1.Aki.Protocol.c_s();
    i.c5n = t?.Index ?? 0;
    i.RHn = t?.BindId ?? 0;
    i.AHn = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount;
    if (l === 7) {
      i.RHn = Protocol_1.Aki.Protocol.s8s.Proto_EventBindId;
    }
    Net_1.Net.Call(20702, i, o => {
      if (o.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_RogueGainIsSelect) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 20702, o.lvs, false);
      } else if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 20702, o.lvs);
      } else {
        var r = ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(i.RHn);
        r.IsSelect = o?.k2s;
        let e = undefined;
        if (l === 1) {
          e = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry;
        } else if (l === 3) {
          e = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.RoleEntry;
        } else if (l === 6) {
          t.IsSell = true;
          e = t;
        } else if (l === 7) {
          if (o.u_s.eqs.length <= 0) {
            r.RogueGainEntryList = [];
          } else {
            o.u_s.eqs.forEach(e => {
              ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeChooseData([e]);
            });
          }
        } else if (l === 8) {
          e = t;
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoguelikeChooseDataResult, e, n, true, i.RHn, o);
      }
    });
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(22084, RoguelikeController.yao);
    Net_1.Net.Register(26152, RoguelikeController.Iao);
    Net_1.Net.Register(25093, RoguelikeController.RoguelikeChooseDataNotify);
    Net_1.Net.Register(19437, RoguelikeController.Tao);
    Net_1.Net.Register(25527, RoguelikeController.Lao);
    Net_1.Net.Register(21251, RoguelikeController.RoguelikeTalentUnlockNotify);
    Net_1.Net.Register(28206, RoguelikeController.RoguelikeCurrencyNotify);
    Net_1.Net.Register(20507, RoguelikeController.RoguelikeCurrencyUpdateNotify);
    Net_1.Net.Register(22791, RoguelikeController.XMa);
    Net_1.Net.Register(26750, RoguelikeController.RoguelikeGainDataUpdateNotify);
    Net_1.Net.Register(16372, RoguelikeController.Sra);
    Net_1.Net.Register(16314, RoguelikeController.Tpl);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(22084);
    Net_1.Net.UnRegister(26152);
    Net_1.Net.UnRegister(25093);
    Net_1.Net.UnRegister(19437);
    Net_1.Net.UnRegister(25527);
    Net_1.Net.UnRegister(21251);
    Net_1.Net.UnRegister(28206);
    Net_1.Net.UnRegister(20507);
    Net_1.Net.UnRegister(22791);
    Net_1.Net.UnRegister(16372);
    Net_1.Net.UnRegister(26750);
  }
  static UWa(o) {
    return [o.fL_.filter(e => !o.mL_.includes(e)), o.mL_.filter(e => !o.fL_.includes(e))];
  }
  static Lpl(e, o) {
    var r = Protocol_1.Aki.Protocol.Vg_.create();
    r.A5n = e;
    r.lUl = o;
    Net_1.Net.Call(18545, r, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20997);
      }
    });
  }
  static async Dao() {
    var e = Protocol_1.Aki.Protocol.T_s.create();
    var e = await Net_1.Net.CallAsync(19029, e);
    if (e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
      if (ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike()) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(15);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Roguelike", 8, "肉鸽副本进入下个房间失败");
    }
  }
  static async RoguelikeGiveUpGainRequest(e) {
    var o = Protocol_1.Aki.Protocol.k_s.create();
    o.RHn = e;
    o.AHn = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount;
    var e = await Net_1.Net.CallAsync(20300, o);
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20300);
    } else {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoguelikeCloseGainSelectView);
    }
  }
  static async RoguelikeTokenReceiveRequest(e, o) {
    var r = Protocol_1.Aki.Protocol.B_s.create();
    r.UHn = e;
    r.s5n = o;
    var e = await Net_1.Net.CallAsync(26842, r);
    return e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs || (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26842), false);
  }
  static async RoguelikePopularEntriesInfoRequest(e) {
    var o = Protocol_1.Aki.Protocol.Ogs.create();
    o.r6n = e;
    o.UHn = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData().SeasonData.UHn;
    var e = await Net_1.Net.CallAsync(27005, o);
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27005);
    }
    return e;
  }
  static async RoguelikeTrialRoleInfoRequest(e) {
    var o = new Protocol_1.Aki.Protocol.Rfs();
    o.UHn = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData().SeasonData.UHn;
    o.Rpl = e;
    var e = await Net_1.Net.CallAsync(16645, o);
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16645);
    }
    let r = [];
    for (const l of e.gL_) {
      r = r.concat(l.Rqs);
    }
    await RoleController_1.RoleController.RobotRolePropRequest(r);
    return e;
  }
  static async RoguelikePopularEntriesChangeRequest(e, o) {
    var r = Protocol_1.Aki.Protocol.Ngs.create();
    r.r6n = e;
    r.BHn = o;
    r.UHn = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData().SeasonData.UHn;
    var e = await Net_1.Net.CallAsync(18753, r);
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18753);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoguelikePopularEntriesChange, o);
  }
}
exports.RoguelikeController = RoguelikeController;
(_a = RoguelikeController).Sao = false;
RoguelikeController.CurrentFlowListName = "";
RoguelikeController.CurrentFlowId = 0;
RoguelikeController.CurrentStateId = 0;
RoguelikeController.RandomEventIndex = 0;
RoguelikeController.OnCloseLoading = () => {
  var e;
  var o;
  if (ModelManager_1.ModelManager.RoguelikeModel.ShowRewardList && ModelManager_1.ModelManager.RoguelikeModel.ShowRewardList.length > 0) {
    _a.Sao = false;
    e = ModelManager_1.ModelManager.RoguelikeModel.ShowRewardList;
    ModelManager_1.ModelManager.RoguelikeModel.ShowRewardList = undefined;
    (o = []).push({
      ButtonTextId: "ConfirmBox_45_ButtonText_1",
      DescriptionTextId: undefined,
      DescriptionArgs: undefined,
      IsTimeDownCloseView: false,
      IsClickedCloseView: false,
      OnClickedCallback: e => {
        if (UiManager_1.UiManager.IsViewShow("ExploreRewardView")) {
          UiManager_1.UiManager.CloseView("ExploreRewardView", e => {
            if (e) {
              _a.OpenRoguelikeActivityView().finally(() => {
                var e;
                var o;
                var r = ModelManager_1.ModelManager.RoguelikeModel?.GetParamConfigBySeasonId();
                if (r !== undefined && r.DungeonList !== undefined && ModelManager_1.ModelManager.RoguelikeModel !== undefined && ModelManager_1.ModelManager.RoguelikeModel.CurDungeonId !== undefined) {
                  e = (o = r.DungeonList.indexOf(ModelManager_1.ModelManager.RoguelikeModel.CurDungeonId)) + 1;
                  if (o !== -1 && e < r.DungeonList.length && (o = ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetConfig(r.DungeonList[e])) && ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(o.Id)) {
                    r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o.MapName);
                    UiManager_1.UiManager.OpenView("RoguelikeUnlockTips", r);
                  }
                  ModelManager_1.ModelManager.RoguelikeModel.CurDungeonId = undefined;
                }
              });
            }
          });
        }
      }
    });
    ItemRewardController_1.ItemRewardController.OpenExploreRewardView(ItemRewardDefine_1.ROGUE_INST_FIRST_REWARD_CONFIG, true, e, undefined, undefined, o);
    ModelManager_1.ModelManager.RoguelikeModel?.RecordRoguelikeShopRedDot(false);
  } else if (_a.Sao) {
    _a.Sao = false;
    _a.OpenRoguelikeActivityView();
  }
  _a.CurrentFlowId = 0;
  _a.CurrentFlowListName = "";
  _a.CurrentStateId = 0;
};
RoguelikeController.CheckCanOpen = () => {
  if (ModelManager_1.ModelManager.RoguelikeModel?.CheckRogueIsOpen()) {
    if (ModelManager_1.ModelManager.GameModeModel?.IsMulti) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Rogue_Multi_Tip");
      return false;
    } else {
      return !_a.Sao || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Rogue_Function_Instance_End_Tip"), false);
    }
  } else {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Rogue_Function_Not_Open_Tip");
    return false;
  }
};
RoguelikeController.CheckCanOpenExitTips = () => !_a.Sao || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Rogue_Function_Instance_End_Tip"), false);
RoguelikeController.RoguelikeCurrencyNotify = e => {
  ModelManager_1.ModelManager.RoguelikeModel.RoguelikeCurrencyDictMap.clear();
  for (const o of Object.keys(e.V2s)) {
    ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeCurrency(Number(o), e.V2s[o]);
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoguelikeCurrencyUpdate);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PayShopGoodsBuy);
};
RoguelikeController.RoguelikeCurrencyUpdateNotify = e => {
  var o = ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId();
  for (const t of Object.keys(e.$2s)) {
    var r = Number(t);
    var l = e.$2s[t];
    ModelManager_1.ModelManager.RoguelikeModel.UpdateRoguelikeCurrency(r, l);
    if (r === o.InsideCurrency && !(l <= 0)) {
      ItemHintController_1.ItemHintController.AddRoguelikeItemList(o.InsideCurrency, l);
    }
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoguelikeCurrencyUpdate);
};
RoguelikeController.XMa = e => {
  _a.RoguelikeEventGainNotify(e);
};
RoguelikeController.RoguelikeEventGainNotify = (e, o) => {
  var r = new Array();
  if (e.z2s.length > 0) {
    for (const l of e.z2s) {
      r.push(new RogueGainEntry_1.RogueGainEntry(l));
    }
    UiManager_1.UiManager.OpenView("RogueEventResultViewOneByOne", new EventResult_1.EventResult(r, o));
  } else if (e.Xna.length > 0) {
    for (const t of e.Xna) {
      r.push(new RogueGainEntry_1.RogueGainEntry(t));
    }
    UiManager_1.UiManager.OpenView("RogueEventResultViewAll", new EventResult_1.EventResult(r, o));
  } else {
    o?.();
  }
};
RoguelikeController.RoguelikeGainDataUpdateNotify = e => {
  if (e.Lqs?.h5n === Protocol_1.Aki.Protocol.a8s.Proto_Miraclecreation) {
    if (e.Tqs === Protocol_1.Aki.Protocol.Tqs.Proto_GainDataUpdate) {
      ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.SpecialEntryList[e.c5n] = new RogueGainEntry_1.RogueGainEntry(e.Lqs);
    } else if (e.Tqs === Protocol_1.Aki.Protocol.Tqs.Proto_GainDataDelete) {
      ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.SpecialEntryList.splice(e.c5n, 1);
    }
  }
};
RoguelikeController.RoguelikeChooseDataNotify = e => {
  ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeChooseData(e.eqs);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoguelikeChooseDataNotify);
};
RoguelikeController.RoguelikeTalentUnlockNotify = e => {
  ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeSkillData(e.r5n, 0);
};
RoguelikeController.Tpl = e => {
  var o;
  var r;
  var l;
  var t = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()?.SeasonData;
  if (t) {
    if ((o = t.US_ - t.xS_) <= 0) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("RogueBlackFlowerRewardNoCount");
    } else {
      (r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(228)).FunctionMap.set(1, () => {
        _a.Lpl(e.A5n, false);
      });
      r.FunctionMap.set(2, () => {
        _a.Lpl(e.A5n, true);
      });
      l = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("RogueBlackFlowerRewardTip");
      r.Tip = StringUtils_1.StringUtils.Format(l, o.toString(), t.US_.toString());
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(r);
    }
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Roguelike", 34, "领取黒石花奖励失败，赛季数据不存在");
  }
};
RoguelikeController.Sra = e => {
  e = {
    Index: e.c5n,
    RoomIdList: e.Pra
  };
  UiManager_1.UiManager.OpenView("RogueCharacterRoomSelectView", e);
};
RoguelikeController.Lao = e => {
  _a.Sao = !ModelManager_1.ModelManager.RoguelikeModel?.CheckIsGuideDungeon();
  if (e.dqs._qs) {
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      UiManager_1.UiManager.OpenView("RoguelikeSettleView", e.dqs);
    }, 2000);
  } else {
    UiManager_1.UiManager.OpenView("RoguelikeSettleView", e.dqs);
  }
};
RoguelikeController.Tao = e => {
  ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount = e.iqs;
  ModelManager_1.ModelManager.RoguelikeModel.TotalRoomCount = e.rqs;
  ModelManager_1.ModelManager.RoguelikeModel.CurRoomId = e.CL_;
  var o = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguelikeRoomPoolConfig(e.CL_);
  var r = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguelikeRoomTypeConfigById(e.vqs);
  ModelManager_1.ModelManager.RoguelikeModel.CurRoomTypeId = r?.RoomType;
  ModelManager_1.ModelManager.RoguelikeModel.CurRoomType = r?.RoomTipsType;
  if (StringUtils_1.StringUtils.IsEmpty(o?.RoomsMusicState)) {
    ModelManager_1.ModelManager.RoguelikeModel.CurRoomMusicState = r?.RoomsMusicState;
  } else {
    ModelManager_1.ModelManager.RoguelikeModel.CurRoomMusicState = o?.RoomsMusicState;
  }
  if (e.pqs !== 0) {
    WeatherModel_1.WeatherModel.GetWorldWeatherActor().ChangeWeather(e.pqs, 0);
  } else {
    WeatherController_1.WeatherController.StopWeather();
  }
};
RoguelikeController.Iao = e => {
  ModelManager_1.ModelManager.RoguelikeModel.RogueInfo = new RoguelikeInfo_1.RoguelikeInfo(e);
};
RoguelikeController.yao = n => {
  var e = new AsyncTask_1.AsyncTask("RoguelikeSubLevelChangeTask", async () => {
    ModelManager_1.ModelManager.SubLevelLoadingModel.ScreenEffect = 1;
    const [o, r] = _a.UWa(n);
    if (o.length === 0 && r.length === 0) {
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(15, 3);
    } else {
      var e = Vector_1.Vector.Create(n.iPs, n.rPs, n.gqs);
      var l = new UE.Rotator(0, n.fqs, 0);
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(15, 3);
      const t = new CustomPromise_1.CustomPromise();
      ControllerHolder_1.ControllerHolder.SubLevelController.ChangeSubLevel(o, r, 0, e, l, e => {
        if (e) {
          t.SetResult(true);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Roguelike", 8, "肉鸽副本子关卡加载失败", ["unloads", o], ["newLoads", r]);
        }
      });
      await t.Promise;
    }
    await RoguelikeController.Dao();
    await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(15, 1);
    return true;
  });
  TaskSystem_1.TaskSystem.AddTask(e);
  TaskSystem_1.TaskSystem.Run();
};
RoguelikeController.CreateCloseViewCallBack = (t, n) => {
  var e = t.$na?.Wna;
  if (e !== undefined && !(e.length <= 0)) {
    const i = new Array();
    for (const o of e) {
      if (o.Qna) {
        i.push(o.Qna);
      }
      if (o.Kna.length <= 0) {
        for (const r of o.Kna) {
          i.push(r);
        }
      }
    }
    if (!(i.length <= 0)) {
      let r = 0;
      let l;
      return l = e => {
        if (e === false && Log_1.Log.CheckError()) {
          Log_1.Log.Error("Roguelike", 8, "CreateCloseViewCallBack err", ["index", r], ["notify", t]);
        }
        if (r >= i.length) {
          n?.();
        } else {
          var o = i[r++];
          switch (o.R5n) {
            case "m_s":
              RoguelikeController.RoguelikeEventGainNotify(o.m_s, l);
              break;
            case "Pns":
              ItemRewardController_1.ItemRewardController.OnItemObtainNotify(o.Pns, l);
          }
        }
      };
    }
  }
  n?.();
}; //# sourceMappingURL=RoguelikeController.js.map