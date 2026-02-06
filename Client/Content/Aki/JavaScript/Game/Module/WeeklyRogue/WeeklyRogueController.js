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
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const AsyncTask_1 = require("../../World/Task/AsyncTask");
const TaskSystem_1 = require("../../World/Task/TaskSystem");
const ActivityControllerBase_1 = require("../Activity/ActivityControllerBase");
const ActivityManager_1 = require("../Activity/ActivityManager");
const CombatMessage_1 = require("../CombatMessage/CombatMessage");
const ErrorCodeController_1 = require("../ErrorCode/ErrorCodeController");
const ItemHintController_1 = require("../ItemHint/ItemHintController");
const LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController");
const RoguelikeDefine_1 = require("../Roguelike/Define/RoguelikeDefine");
const SplashScreenTask_1 = require("../SplashScreen/SplashScreenTask");
const WeatherController_1 = require("../Weather/WeatherController");
const WeatherModel_1 = require("../Weather/WeatherModel");
const WeeklyRogueSubView_1 = require("./View/WeeklyRogueSubView");
const WeeklyRogueData_1 = require("./WeeklyRogueData");
class WeeklyRogueController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.DSe = (e, o) => {
      ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew?.OnQuestStateChange(e, o);
    };
    this.nye = () => {
      if (ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew?.NeedOpenActivityMainView) {
        this.tHu();
      }
    };
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
    this.FYd = e => {
      UiManager_1.UiManager.OpenView("RoguelikeExitTips", {
        IsLastLayer: true,
        CurrentInGameScore: e.fu1,
        MaxInGameScore: e.tBs
      });
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
      var o;
      if (ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue() && (o = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew)) {
        o.HasNewSettle = true;
      }
      UiManager_1.UiManager.OpenView("WeeklyRogueSettleView", e);
    };
    this.mV_ = n => {
      var e = () => {
        this.GotoNextRoomRequest(false);
      };
      var o = () => {
        var e = new AsyncTask_1.AsyncTask("WeeklyRoguelikeSubLevelChangeTask", async () => {
          ModelManager_1.ModelManager.SubLevelLoadingModel.ScreenEffect = 1;
          const [o, r] = this.UWa(n);
          if (o.length === 0 && r.length === 0) {
            await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(15, 3);
          } else {
            var e = Vector_1.Vector.Create(n.iPs, n.rPs, n.gqs);
            var t = new UE.Rotator(0, n.fqs, 0);
            await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(15, 3);
            const a = new CustomPromise_1.CustomPromise();
            ControllerHolder_1.ControllerHolder.SubLevelController.ChangeSubLevel(o, r, 0, e, t, e => {
              if (e) {
                a.SetResult(true);
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("WeeklyRogue", 34, "周常肉鸽子关卡加载失败", ["unloads", o], ["newLoads", r]);
              }
            });
            await a.Promise;
          }
          await this.GotoNextRoomRequest();
          await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(15, 1);
          return true;
        });
        TaskSystem_1.TaskSystem.AddTask(e);
        TaskSystem_1.TaskSystem.Run();
      };
      if (n.p9u && LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.WeeklyRogueExtraEnterTips, true)) {
        e = {
          CurScore: n.fu1,
          MaxScore: n.tBs,
          ConfirmFunc: o,
          CancelFunc: e
        };
        UiManager_1.UiManager.OpenView("WeeklyRogueExtraRoomConfirmView", e);
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.WeeklyRogueExtraEnterTips, false);
        return;
      }
      o();
    };
    this.j7_ = r => {
      var e = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetCycleBlackFlowerCost();
      let t = false;
      e = {
        SinglePowerCost: e,
        RewardCallBack: (e, o) => {
          t = true;
          this.BlackFlowerRewardRequest(r.A5n, true, e === 2, o);
        },
        CloseCallBack: () => {
          if (!t) {
            this.BlackFlowerRewardRequest(r.A5n, false, false, -1);
          }
        },
        AvailableSilentArea: r.rAf,
        FreeCount: ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.FreeCount,
        FreeMax: ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.FreeCountMax
      };
      UiManager_1.UiManager.OpenView("WeeklyRoguePhantomRewardView", e);
    };
    this.fV_ = e => {
      ModelManager_1.ModelManager.WeeklyRogueModel.UpdateInstInfo(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeeklyRogueInstDataUpdate);
    };
    this.NewLinkStage = Protocol_1.Aki.Protocol.qn1.Proto_NewLinkStageNone;
    this.vBu = undefined;
    this.br1 = e => {
      this.NewLinkStage = e;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("WeeklyRogue", 17, "NewLinkNotify", ["stage", this.NewLinkStage]);
      }
      if (e === Protocol_1.Aki.Protocol.qn1.Proto_Burst) {
        this.cJu();
      } else {
        this.yBu();
      }
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
  tHu() {
    var e = new SplashScreenTask_1.SplashScreenTask(0, 1, () => {
      UiManager_1.UiManager.OpenView("WeeklyRogueActivityView");
    });
    ControllerHolder_1.ControllerHolder.SplashScreenController.PushSplashScreenTask(e);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnNewLinkStatusChanged, this.br1);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnNewLinkStatusChanged, this.br1);
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(29219, this.uV_);
    Net_1.Net.Register(24604, this.dV_);
    Net_1.Net.Register(18888, this.mV_);
    Net_1.Net.Register(16320, this.fV_);
    Net_1.Net.Register(19878, this.j7_);
    Net_1.Net.Register(15369, this.gH_);
    Net_1.Net.Register(21012, this.$_c);
    Net_1.Net.Register(22556, this.FYd);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29219);
    Net_1.Net.UnRegister(24604);
    Net_1.Net.UnRegister(18888);
    Net_1.Net.UnRegister(16320);
    Net_1.Net.UnRegister(19878);
    Net_1.Net.UnRegister(15369);
    Net_1.Net.UnRegister(21012);
    Net_1.Net.UnRegister(22556);
  }
  UWa(o) {
    return [o.fL_.filter(e => !o.mL_.includes(e)), o.mL_.filter(e => !o.fL_.includes(e))];
  }
  SelectOptionRequest(o) {
    var e = new Protocol_1.Aki.Protocol.yN_();
    e.RHn = ModelManager_1.ModelManager.WeeklyRogueModel.CurrentBindId;
    e.c5n = ModelManager_1.ModelManager.WeeklyRogueModel.SelectEntry.c5n;
    Net_1.Net.Call(28807, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28807, e.lvs);
          o?.(false);
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("WeeklyRogue", 34, "选择选项成功", ["选项索引:", ModelManager_1.ModelManager.WeeklyRogueModel.SelectEntry.c5n], ["当前BindId:", ModelManager_1.ModelManager.WeeklyRogueModel.CurrentBindId]);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeeklyRogueSelectOption);
          o?.(true);
        }
      } else {
        o?.(false);
      }
    });
  }
  async SelectArtifactRequest() {
    var e = new Protocol_1.Aki.Protocol.f9u();
    e.bN_ = ModelManager_1.ModelManager.WeeklyRogueModel.CycleId;
    e.c5n = ModelManager_1.ModelManager.WeeklyRogueModel.SelectEntry.c5n;
    var e = await Net_1.Net.CallAsync(17377, e);
    return !!e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17377), false) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("WeeklyRogue", 37, "[WeeklyRogue] 神器选择成功", ["Index", ModelManager_1.ModelManager.WeeklyRogueModel.SelectEntry.c5n]), true));
  }
  InstanceSettleRequest(o) {
    var e = new Protocol_1.Aki.Protocol.CN_();
    Net_1.Net.Call(21052, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21052);
          o?.(false);
        } else {
          if (ModelManager_1.ModelManager.WeeklyRogueModel.HasLastInfo()) {
            ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.LastInstInfo = undefined;
          }
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("WeeklyRogue", 34, "打开结算界面");
          }
          o?.(true);
        }
      } else {
        o?.(false);
      }
    });
  }
  async GotoNextRoomRequest(e = true) {
    var o = new Protocol_1.Aki.Protocol.dN_();
    o.C9u = e;
    var e = await Net_1.Net.CallAsync(19756, o);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19756);
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
  BlackFlowerRewardRequest(e, o, r, t) {
    var a = new Protocol_1.Aki.Protocol.U7_();
    a.A5n = e;
    a.k7_ = r;
    a.lUl = o;
    a.oAf = t;
    Net_1.Net.Call(22411, a, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22411);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("WeeklyRogue", 34, "黑花奖励领取成功");
        }
        if (o) {
          ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.FreeCount = e.iAf - e.tAf;
          ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.FreeCountMax = e.iAf;
        }
      }
    });
  }
  RogueWeeklyStartRequest(e) {
    var o = new Protocol_1.Aki.Protocol.MN_();
    o.bN_ = ModelManager_1.ModelManager.WeeklyRogueModel.CycleId;
    o.fUs = e;
    Net_1.Net.Call(27902, o, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27902);
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("WeeklyRogue", 34, "进入周常成功");
      }
    });
  }
  async RogueWeeklyArtifactSelectStartRequest() {
    var e = new Protocol_1.Aki.Protocol.d9u();
    var e = await Net_1.Net.CallAsync(20630, e);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20630);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("WeeklyRogue", 37, "[WeeklyRogue] 开始神器选择");
        }
        await UiManager_1.UiManager.OpenViewAsync("WeeklyRogueSelectArtifactView", e.UN_);
      }
    }
  }
  MultiRogueWeeklyRewardRequest() {
    var e = new Protocol_1.Aki.Protocol.u8u();
    e.w6n = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.Id;
    const o = ModelManager_1.ModelManager.WeeklyRogueModel.GetScoreRewardData().DataPageList[0].DataList.flatMap(e => e.RewardState === 1 && e.Id !== undefined ? [e.Id] : []);
    if (o.length !== 0) {
      e.v9n = o;
      Net_1.Net.Call(21714, e, e => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21714);
        } else {
          o.forEach(e => {
            ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.SetScoreRewardState(e, Protocol_1.Aki.Protocol.zps.ovs);
          });
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, ModelManager_1.ModelManager.WeeklyRogueModel.GetScoreRewardData());
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.Id);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeeklyRogueRedDotInfoRefresh);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("WeeklyRogue", 34, "周常积分奖励领取成功");
          }
        }
      });
    }
  }
  async RogueWeeklyLastInfoRequest() {
    var e = new Protocol_1.Aki.Protocol.Btc();
    e.w6n = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.Id;
    var e = await Net_1.Net.CallAsync(16237, e);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16237);
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
  RequestNewLinkBurst() {
    var e;
    return this.NewLinkStage === Protocol_1.Aki.Protocol.qn1.CTs && !!(e = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity) && (CombatMessage_1.CombatNet.Send(24998, e, Protocol_1.Aki.Protocol.kn1.create()), Log_1.Log.CheckDebug() && Log_1.Log.Debug("WeeklyRogue", 17, "周常肉鸽Link爆发请求"), true);
  }
  cJu() {
    if (ModelManager_1.ModelManager.WeeklyRogueModel?.CheckIsInWeeklyRogue()) {
      var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity;
      var o = e.GetComponent(185);
      var r = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetCycleConfig()?.LinkId;
      if (r) {
        r = ConfigManager_1.ConfigManager.BattleLinkConfig?.GetLinkDataConfig(r);
        if (r) {
          var t = ControllerHolder_1.ControllerHolder.BattleLinkController.GetMessageId();
          if (t) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("WeeklyRogue", 17, "周常肉鸽进入Link爆发状态, 添加Buff");
            }
            var a = MathUtils_1.MathUtils.LongToBigInt(t);
            for (const l of r.BuffIdsInBrust) {
              var n = Number(l);
              o.AddBuff(n, {
                InstigatorId: o.CreatureDataId,
                Reason: "周常肉鸽link增加buff",
                PreMessageId: a
              });
              this.vBu ||= [];
              this.vBu.push(n);
            }
            for (const i of r.BulletIdsInBrust) {
              ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(e, i.toString(), undefined, {}, a);
            }
          }
        }
      }
    }
  }
  yBu() {
    if (this.vBu && this.vBu.length !== 0) {
      if (ModelManager_1.ModelManager.WeeklyRogueModel?.CheckIsInWeeklyRogue()) {
        var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(185);
        if (e) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("WeeklyRogue", 17, "周常肉鸽离开Link爆发状态, 移除Buff");
          }
          for (const o of this.vBu) {
            e.RemoveBuff(o, -1, "周常肉鸽离开Link爆发状态");
          }
        }
      }
      this.vBu.length = 0;
    }
  }
}
exports.WeeklyRogueController = WeeklyRogueController;
//# sourceMappingURL=WeeklyRogueController.js.map