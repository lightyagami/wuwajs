"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ICommon_1 = require("../../../../../UniverseEditor/Interface/ICommon");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const BehaviorTreeUpdateDelegateProxy_1 = require("../../../GeneralLogicTree/BaseBehaviorTree/BehaviorTreeUpdateDelegateProxy");
const GenericPromptController_1 = require("../../../GenericPrompt/GenericPromptController");
const InstanceDungeonController_1 = require("../../../InstanceDungeon/InstanceDungeonController");
const SplashScreenTask_1 = require("../../../SplashScreen/SplashScreenTask");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const MotorParkourActivityData_1 = require("./Data/MotorParkourActivityData");
const MotorParkourActivitySubView_1 = require("./View/MotorParkourActivitySubView");
class MotorParkourController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.$Tf = 0;
    this.IsNeedShowMotorParkourMainView = false;
    this.WTf = new BehaviorTreeUpdateDelegateProxy_1.BehaviorTreeUpdateDelegateProxy();
    this.QTf = e => {
      for (const r of this.wja()) {
        r.UpdateMotorParkourLevelList(e.MTf);
      }
    };
    this.KTf = e => {
      if (this.CheckInMotorParkourDungeon()) {
        this.XTf(e.i9u);
        this.WTf.AddTreeVarUpdateDelegate(ICommon_1.EMotorParkourSystemVarType.CurLap, this.YTf);
      }
      this.$Tf = MathUtils_1.MathUtils.LongToNumber(e.QL_);
      UiManager_1.UiManager.OpenView("MotorParkourTimerView", this.$Tf);
    };
    this.YTf = (e, r) => {
      var t;
      var r = MathUtils_1.MathUtils.LongToNumber(r.oTs);
      if (this.$Tf !== 0) {
        t = TimeUtil_1.TimeUtil.GetServerStopTimeStamp() - this.$Tf;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorParkourFinishLap, r, t);
      }
    };
    this.zTf = e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MotorParkour", 71, "摩托跑酷结算通知", ["isWin", e.Mws], ["levelId", e.ETf], ["time", e.wTf]);
      }
      this.$Tf = 0;
      if (UiManager_1.UiManager.IsViewOpen("MotorParkourTimerView")) {
        UiManager_1.UiManager.CloseView("MotorParkourTimerView");
      }
      var r;
      var t = this.CheckInMotorParkourDungeon();
      if (t) {
        this.WTf.RemoveTreeVarUpdateDelegate(ICommon_1.EMotorParkourSystemVarType.CurLap, this.YTf);
      }
      if (e.Mws) {
        if (t) {
          t = ConfigManager_1.ConfigManager.MotorParkourConfig.GetMotorParkourLevelById(e.ETf).ActivityId;
          r = (t = this.wPu(t)).UpdateMotorParkourLevelBestRecordTime(e.ETf, MathUtils_1.MathUtils.LongToNumber(e.wTf));
          t = {
            LevelData: t.GetLevelDataById(e.ETf),
            IsNewRecord: r,
            MyScoreTime: MathUtils_1.MathUtils.LongToNumber(e.wTf)
          };
          if (UiManager_1.UiManager.IsViewOpen("MotorParkourBattleView")) {
            UiManager_1.UiManager.CloseView("MotorParkourBattleView");
          }
          UiManager_1.UiManager.OpenView("MotorParkourSettleView", t);
        } else {
          GenericPromptController_1.GenericPromptController.ShowPromptByItsType(5);
        }
      }
    };
    this.nye = () => {
      var e;
      var r;
      if (this.IsNeedShowMotorParkourMainView) {
        this.tHu();
      }
      if (this.CheckInMotorParkourDungeon() && !UiManager_1.UiManager.IsViewOpen("MotorParkourBattleView")) {
        e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
        e = ConfigManager_1.ConfigManager.MotorParkourConfig.GetMotorParkourLevelByInstId(e);
        if (r = this.wPu(e.ActivityId)) {
          r = r.GetLevelDataById(e.Id);
          UiManager_1.UiManager.OpenView("MotorParkourBattleView", r);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MotorParkour", 71, "摩托跑酷活动数据不存在");
        }
      }
    };
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(22872, this.QTf);
    Net_1.Net.Register(24739, this.zTf);
    Net_1.Net.Register(27650, this.KTf);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(22872);
    Net_1.Net.UnRegister(24739);
    Net_1.Net.UnRegister(27650);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
  }
  wja() {
    return ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_MotorParkourActivity);
  }
  wPu(e) {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
  }
  OnOpenView(e) {
    throw new Error("Method not implemented.");
  }
  OnGetActivityResource(e) {
    return "UiItem_MotoParkourActivityMain";
  }
  OnCreateSubPageComponent(e) {
    return new MotorParkourActivitySubView_1.MotorParkourActivitySubView();
  }
  OnCreateActivityData(e) {
    return new MotorParkourActivityData_1.MotorParkourActivityData();
  }
  OnGetIsOpeningActivityRelativeView() {
    for (const e of ["MotorParkourMainView", "MotorParkourRewardView"]) {
      if (UiManager_1.UiManager.IsViewOpen(e)) {
        return true;
      }
    }
    return false;
  }
  async OnOpenSubView(e) {
    var r = this.wja();
    if (r.length === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorParkour", 71, "摩托跑酷活动数据不存在");
      }
      return Promise.resolve(false);
    } else if ((r = r[0]) && e === "MotorParkourMainView") {
      return !!(await UiManager_1.UiManager.OpenViewAsync("MotorParkourMainView", r));
    } else {
      return Promise.resolve(false);
    }
  }
  XTf(e) {
    var r;
    var t;
    var o = new Map();
    for ([r, t] of Object.entries(e)) {
      o.set(r, t);
    }
    this.WTf.SetBehaviorTreeVarRelation(o);
  }
  RequestTaskReward(e) {
    var r = ConfigManager_1.ConfigManager.MotorParkourConfig.GetMotorParkourLevelById(e).ActivityId;
    var r = this.wPu(r).GetLevelDataById(e).GetCanReceiveRewardIndex();
    var t = new Protocol_1.Aki.Protocol.gTf();
    t.ETf = e;
    t.bTf = r;
    Net_1.Net.Call(29747, t, e => {
      if (e && e.fMs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.fMs, 18184);
      }
    });
  }
  EnterMotorParkourDungeonDirectly(e) {
    e = {
      ETf: e
    };
    ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.RTf = e;
    InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(0, [], 0, 0);
  }
  CheckInMotorParkourDungeon() {
    var e;
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && (e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 43);
  }
  LeaveInstanceDungeon() {
    if (this.CheckInMotorParkourDungeon()) {
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
    }
  }
  tHu() {
    var e = this.wja();
    if (e.length === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MotorParkour", 71, "摩托跑酷活动数据不存在");
      }
    } else {
      const r = e[0];
      e = new SplashScreenTask_1.SplashScreenTask(0, 1, () => {
        UiManager_1.UiManager.OpenView("MotorParkourMainView", r);
      });
      ControllerHolder_1.ControllerHolder.SplashScreenController.PushSplashScreenTask(e);
    }
  }
}
exports.MotorParkourController = MotorParkourController;
//# sourceMappingURL=MotorParkourController.js.map