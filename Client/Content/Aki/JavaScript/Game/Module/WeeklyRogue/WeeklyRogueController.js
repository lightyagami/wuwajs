"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueController = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const AsyncTask_1 = require("../../World/Task/AsyncTask");
const TaskSystem_1 = require("../../World/Task/TaskSystem");
const ActivityControllerBase_1 = require("../Activity/ActivityControllerBase");
const ActivityManager_1 = require("../Activity/ActivityManager");
const ErrorCodeController_1 = require("../ErrorCode/ErrorCodeController");
const ItemHintController_1 = require("../ItemHint/ItemHintController");
const LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController");
const RoguelikeDefine_1 = require("../Roguelike/Define/RoguelikeDefine");
const WeatherController_1 = require("../Weather/WeatherController");
const WeatherModel_1 = require("../Weather/WeatherModel");
const WeeklyRogueSubView_1 = require("./View/WeeklyRogueSubView");
const WeeklyRogueData_1 = require("./WeeklyRogueData");
class WeeklyRogueController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.uV_ = e => {
      ModelManager_1.ModelManager.WeeklyRogueModel.CurrentLayer = e.iqs;
      ModelManager_1.ModelManager.WeeklyRogueModel.MaxLayer = e.rqs;
      var o = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRoomPoolConfig(e.CL_);
      var r = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyRoomType(e.vqs);
      ModelManager_1.ModelManager.WeeklyRogueModel.CurrentRoomTypeId = r.RoomType;
      ModelManager_1.ModelManager.WeeklyRogueModel.CurrentRoomId = e.CL_;
      if (StringUtils_1.StringUtils.IsEmpty(o?.RoomsMusicState)) {
        ModelManager_1.ModelManager.WeeklyRogueModel.CurrentRoomMusicState = r.RoomsMusicState;
      } else {
        ModelManager_1.ModelManager.WeeklyRogueModel.CurrentRoomMusicState = o.RoomsMusicState;
      }
      if (e.pqs !== 0) {
        WeatherModel_1.WeatherModel.GetWorldWeatherActor().ChangeWeather(e.pqs, 0);
      } else {
        WeatherController_1.WeatherController.StopWeather();
      }
    };
    this.gH_ = e => {
      for (const r of Object.keys(e.V2s)) {
        var o = e.V2s[r];
        ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeCurrency(Number(r), o);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerCurrencyChange, Number(r));
      }
    };
    this.$_c = e => {
      for (const t of Object.keys(e.V2s)) {
        var o = ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeCurrency(RoguelikeDefine_1.INSIDE_CURRENCY_ID);
        var r = e.V2s[t];
        var o = o + r;
        if (r > 0) {
          ItemHintController_1.ItemHintController.AddRoguelikeItemList(RoguelikeDefine_1.INSIDE_CURRENCY_ID, r);
        }
        ModelManager_1.ModelManager.RoguelikeModel.SetRoguelikeCurrency(Number(t), o);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerCurrencyChange, Number(t));
      }
    };
    this.dV_ = e => {
      UiManager_1.UiManager.OpenView("WeeklyRogueSettleView", e);
    };
    this.mV_ = a => {
      var e = new AsyncTask_1.AsyncTask("WeeklyRoguelikeSubLevelChangeTask", async () => {
        ModelManager_1.ModelManager.SubLevelLoadingModel.ScreenEffect = 1;
        const [o, r] = this.UWa(a);
        if (o.length === 0 && r.length === 0) {
          await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(15, 3);
        } else {
          var e = Vector_1.Vector.Create(a.iPs, a.rPs, a.gqs);
          var t = new UE.Rotator(0, a.fqs, 0);
          await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(15, 3);
          const n = new CustomPromise_1.CustomPromise();
          ControllerHolder_1.ControllerHolder.SubLevelController.ChangeSubLevel(o, r, 0, e, t, e => {
            if (e) {
              n.SetResult(true);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("WeeklyRogue", 34, "周常肉鸽子关卡加载失败", ["unloads", o], ["newLoads", r]);
            }
          });
          await n.Promise;
        }
        await this.GotoNextRoomRequest();
        await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(15, 1);
        return true;
      });
      TaskSystem_1.TaskSystem.AddTask(e);
      TaskSystem_1.TaskSystem.Run();
    };
    this.j7_ = o => {
      var e = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetCycleBlackFlowerCost();
      let r = false;
      e = {
        SinglePowerCost: e,
        RewardCallBack: e => {
          r = true;
          this.BlackFlowerRewardRequest(o.A5n, true, e === 2);
        },
        CloseCallBack: () => {
          if (!r) {
            this.BlackFlowerRewardRequest(o.A5n, false, false);
          }
        }
      };
      UiManager_1.UiManager.OpenView("PowerMagnificationRewardPopView", e);
    };
    this.fV_ = e => {
      ModelManager_1.ModelManager.WeeklyRogueModel.UpdateInstInfo(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeeklyRogueInstDataUpdate);
    };
  }
  static get Instance() {
    var e = ActivityManager_1.ActivityManager.GetActivityController(Protocol_1.Aki.Protocol.uks.Proto_RogueWeekly);
    if (e) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("WeeklyRogue", 34, "OpenSystemWeeklyRogueToken controller is null");
    }
  }
  OnOpenView(e) {
    throw new Error("Method not implemented.");
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivityRogue21";
  }
  OnCreateSubPageComponent(e) {
    return new WeeklyRogueSubView_1.WeeklyRogueSubView();
  }
  OnCreateActivityData(e) {
    return new WeeklyRogueData_1.WeeklyRogueData();
  }
  OnGetIsOpeningActivityRelativeView() {
    throw new Error("Method not implemented.");
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(27220, this.uV_);
    Net_1.Net.Register(24163, this.dV_);
    Net_1.Net.Register(27130, this.mV_);
    Net_1.Net.Register(16131, this.fV_);
    Net_1.Net.Register(22895, this.j7_);
    Net_1.Net.Register(26163, this.gH_);
    Net_1.Net.Register(21627, this.$_c);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27220);
    Net_1.Net.UnRegister(24163);
    Net_1.Net.UnRegister(27130);
    Net_1.Net.UnRegister(16131);
    Net_1.Net.UnRegister(22895);
    Net_1.Net.UnRegister(26163);
  }
  UWa(o) {
    return [o.fL_.filter(e => !o.mL_.includes(e)), o.mL_.filter(e => !o.fL_.includes(e))];
  }
  SelectOptionRequest(o) {
    var e = new Protocol_1.Aki.Protocol.yN_();
    e.RHn = ModelManager_1.ModelManager.WeeklyRogueModel.CurrentBindId;
    e.c5n = ModelManager_1.ModelManager.WeeklyRogueModel.SelectEntry.c5n;
    Net_1.Net.Call(18469, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18469, e.lvs);
          o?.();
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("WeeklyRogue", 34, "选择选项成功", ["选项索引:", ModelManager_1.ModelManager.WeeklyRogueModel.SelectEntry.c5n], ["当前BindId:", ModelManager_1.ModelManager.WeeklyRogueModel.CurrentBindId]);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeeklyRogueSelectOption);
        }
      }
    });
  }
  InstanceSettleRequest() {
    var e = new Protocol_1.Aki.Protocol.CN_();
    Net_1.Net.Call(23863, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23863);
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("WeeklyRogue", 34, "打开结算界面");
        }
      }
    });
  }
  async GotoNextRoomRequest() {
    var e = new Protocol_1.Aki.Protocol.dN_();
    var e = await Net_1.Net.CallAsync(22317, e);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22317);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("WeeklyRogue", 34, "进入下一层成功");
        }
        if (ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(15);
        }
      }
    }
  }
  BlackFlowerRewardRequest(e, o, r) {
    var t = new Protocol_1.Aki.Protocol.U7_();
    t.A5n = e;
    t.k7_ = r;
    t.lUl = o;
    Net_1.Net.Call(22514, t, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22514);
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("WeeklyRogue", 34, "黑花奖励领取成功");
      }
    });
  }
  RogueWeeklyStartRequest(e) {
    var o = new Protocol_1.Aki.Protocol.MN_();
    o.bN_ = ModelManager_1.ModelManager.WeeklyRogueModel.CycleId;
    o.fUs = e;
    Net_1.Net.Call(15554, o, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15554);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("WeeklyRogue", 34, "进入周常成功");
        }
        ModelManager_1.ModelManager.EditBattleTeamModel?.SetInstanceDungeonId(undefined);
      }
    });
  }
  RogueWeeklyScoreRewardRequest(o) {
    var e = new Protocol_1.Aki.Protocol._N_();
    e.w6n = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.Id;
    e.v9n = o;
    Net_1.Net.Call(18329, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18329);
      } else {
        ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.SetScoreRewardState(o, Protocol_1.Aki.Protocol.zps.ovs);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, ModelManager_1.ModelManager.WeeklyRogueModel.GetScoreRewardData());
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.Id);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("WeeklyRogue", 34, "周常积分奖励领取成功");
        }
      }
    });
  }
  async RogueWeeklyLastInfoRequest() {
    var e = new Protocol_1.Aki.Protocol.Btc();
    e.w6n = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.Id;
    var e = await Net_1.Net.CallAsync(25953, e);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25953);
      } else {
        ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.LastInstInfo = e.LN_;
      }
    }
  }
  async OpenTokenSelectViewById(e) {
    ModelManager_1.ModelManager.WeeklyRogueModel.CurrentBindId = e;
    var o;
    var r = ModelManager_1.ModelManager.WeeklyRogueModel.GetOptionByBindId(e);
    if (r) {
      if (o = this.GetViewNameByType(r.h5n)) {
        return (await UiManager_1.UiManager.OpenViewAsync(o, r)) !== undefined;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("WeeklyRogue", 34, "获取视图名失败", ["boardId", e]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("WeeklyRogue", 34, "获取选项数据失败", ["boardId", e]);
      }
      return false;
    }
  }
  GetViewNameByType(e) {
    switch (e) {
      case Protocol_1.Aki.Protocol.HN_.Proto_Goods:
        return "WeeklyRogueShop";
      case Protocol_1.Aki.Protocol.HN_.Proto_CommonBuff:
        return "WeeklyRogueSelectToken";
      case Protocol_1.Aki.Protocol.HN_.Proto_Unknow:
        return;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("WeeklyRogue", 34, "未知选项类型", ["optionType", e]);
        }
        return;
    }
  }
}
exports.WeeklyRogueController = WeeklyRogueController;
//# sourceMappingURL=WeeklyRogueController.js.map