"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotController = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const AutoPilotAreaCheck_1 = require("./AutoPilotAreaCheck");
const AutoPilotDefine_1 = require("./AutoPilotDefine");
const AutoPilotMobileView_1 = require("./AutoPilotMobileView");
const AutoPilotPcView_1 = require("./AutoPilotPcView");
const AutoPilotSkillHighLightLogic_1 = require("./AutoPilotSkillHighLightLogic");
const AutoPilotUtil_1 = require("./AutoPilotUtil");
class AutoPilotController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.sCe();
    this.PauseTick();
    this.AreaCheck.Init();
    this.e$g = new AutoPilotSkillHighLightLogic_1.AutoPilotSkillHighLightLogic();
    return true;
  }
  static OnClear() {
    this.aCe();
    this.AreaCheck.Clear();
    this.bgf();
    this.XAg();
    this.e$g?.Dispose();
    return !(this.e$g = undefined);
  }
  static sCe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BeforeLoadMap, this.SYi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.bpr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.AEa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCircleStateChange, this.Hwf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InfrastructureRoadDataUpdate, this.tRf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.zNf);
  }
  static aCe() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BeforeLoadMap, this.SYi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, this.bpr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.AEa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCircleStateChange, this.Hwf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InfrastructureRoadDataUpdate, this.tRf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.zNf);
  }
  static async EnterAutoPilot() {
    if (ModelManager_1.ModelManager.AutoPilotModel?.GetIsInAutoPilot()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "进入自动巡航失败，已处于自动巡航中");
      }
      return false;
    }
    this.Rgf();
    var t = ModelManager_1.ModelManager.AutoPilotModel?.GetEnableAutoPilot();
    if (t?.Value === 0) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(AutoPilotDefine_1.failReasonTxt[t.DisableReason]);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "进入自动巡航失败，当前状态不可自动巡航", ["reason", t.DisableReason]);
      }
      return false;
    } else if (t = this.wgf()) {
      return this.Lgf(t);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "进入自动巡航失败，获取合成样条线为空");
      }
      return false;
    }
  }
  static Rgf() {
    var t = ModelManager_1.ModelManager.AutoPilotModel?.GetFindPathResult();
    if (t) {
      t.CheckFindPathAutoPilotConditions();
    } else {
      ModelManager_1.ModelManager.AutoPilotModel?.CheckCircleAutoPilotConditions();
    }
  }
  static wgf() {
    var t = ModelManager_1.ModelManager.AutoPilotModel;
    var e = t?.GetFindPathResult();
    if (e) {
      return e.GenerateAutopilotRoute();
    } else {
      return t?.GetCirclePathResult()?.GenerateAutopilotRoute();
    }
  }
  static async Lgf(t) {
    var e = ModelManager_1.ModelManager.AutoPilotModel.VehicleEntity?.GetComponent(121);
    if (!e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "进入自动巡航失败,获取不到MotorcycleSplineMoveComponent");
      }
      return false;
    }
    ModelManager_1.ModelManager.AutoPilotModel.SplineMoveComp = e;
    var o = ModelManager_1.ModelManager.AutoPilotModel?.GetFindPathResult();
    if (o) {
      ModelManager_1.ModelManager.AutoPilotModel?.SetAutoPilotState(1);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "进入自动巡航", ["目标点位置", o.TargetPoint]);
      }
    } else {
      ModelManager_1.ModelManager.AutoPilotModel?.SetAutoPilotState(2);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "进入自动巡航", ["环线Id", ModelManager_1.ModelManager.AutoPilotModel?.GetCirclePathResult()?.CircleId]);
      }
    }
    await this.OpenAutoPilotView();
    e.StartSplineMoveWithAutoPilotRoute(t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AutoPilot", 87, "进入自动巡航成功", ["EnterLocation", ModelManager_1.ModelManager.AutoPilotModel?.ActorComp?.ActorLocationProxy]);
    }
    this.AddTick(this.pvg);
    this.AddTick(this.u8m);
    return true;
  }
  static g3f() {
    ModelManager_1.ModelManager.AutoPilotModel.SplineMoveComp?.EndSplineMoveForAutoPilot();
  }
  static async ExitAutoPilot(t) {
    if (ModelManager_1.ModelManager.AutoPilotModel?.GetIsInAutoPilot()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "退出自动巡航", ["reason", t], ["ExitLocation", ModelManager_1.ModelManager.AutoPilotModel?.ActorComp?.ActorLocationProxy]);
      }
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("AutoPilot_QuitTips");
      this.g3f();
      ModelManager_1.ModelManager.AutoPilotModel?.ClearCirclePathResult();
      ModelManager_1.ModelManager.AutoPilotModel?.ResetAutoPilotTime();
      ModelManager_1.ModelManager.AutoPilotModel?.SetAutoPilotState(0);
      this.RemoveTick(this.pvg);
      this.RemoveTick(this.u8m);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "关闭自动巡航界面,开始退出电影模式");
      }
      await this.s8m?.ExitMovieMode(0);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "关闭自动巡航界面,退出电影模式完成");
      }
      this.bgf();
      this.RefreshHighLightExploreSkill();
    }
  }
  static async OpenAutoPilotView() {
    var t;
    var e;
    if (!this.s8m) {
      ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.HideBattleView(15, [4, 17, 37, 40, 26]);
      if (t = UiManager_1.UiManager.GetViewByName("BattleView")) {
        e = Info_1.Info.IsInTouch();
        this.s8m = new (e ? AutoPilotMobileView_1.AutoPilotMobileView : AutoPilotPcView_1.AutoPilotPcView)();
        await this.s8m.CreateThenShowByResourceIdAsync("UiView_MotorcycleAutoCruise", t.GetRootItem());
        t.AddChild(this.s8m);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AutoPilot", 87, "打开自动巡航界面完成");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AutoPilot", 87, "BattleView is null");
      }
    }
  }
  static bgf() {
    this.s8m?.Destroy(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "关闭自动巡航界面完成");
      }
      ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.ShowBattleView(15);
    });
    this.s8m = undefined;
  }
  static SkipToTarget() {
    var t;
    var e;
    var o;
    var i = ModelManager_1.ModelManager.AutoPilotModel?.GetFindPathResult();
    if (i) {
      if (t = i.GetLastRoadWay()) {
        if (o = t.RoadSpline) {
          e = AutoPilotUtil_1.AutoPilotUtil.GetDistanceAlongSplineAtWorldLocation(o, i.EndPoint);
          o = o.GetRotationAtDistanceAlongSpline(e, 1);
          ControllerHolder_1.ControllerHolder.TeleportController.TeleportPlayerInVehicle({
            ClientReason: "AutoPilotController.SkipToTarget",
            TargetPosition: i.EndPoint.ToUeVector(),
            TargetRotation: o,
            TeleportMode: 0
          });
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("AutoPilot", 87, "最后一条公路的样条组件为空", ["Id", t.Id]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AutoPilot", 87, "找不到寻路数据的最后一条公路");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("AutoPilot", 87, "找不到寻路数据");
    }
  }
  static OnTick(t) {
    if (this.PYi.size > 0) {
      for (const e of this.PYi) {
        e(t);
      }
    }
  }
  static AddTick(t) {
    this.PYi.add(t);
  }
  static RemoveTick(t) {
    this.PYi.delete(t);
  }
  static RefreshHighLightExploreSkill() {
    this.r6d(false);
    if (ModelManager_1.ModelManager.AutoPilotModel?.GetEnableAutoPilot()?.Value === 1) {
      this.r6d(true);
    }
  }
  static r6d(t) {
    var e = ModelManager_1.ModelManager.AutoPilotModel?.ActorComp?.Entity;
    if (this.wrg) {
      if (t) {
        this.e$g?.ShowHighlightExploreSkill();
      } else {
        this.e$g?.HideHighlightExploreSkill();
      }
    } else {
      e = e?.GetComponent(58);
      if (t) {
        e?.ShowHighlightExploreSkill(6006, ModelManager_1.ModelManager.AutoPilotModel?.GetSkillHighLightTime() ?? -1, true, AutoPilotDefine_1.HIGHLIGHT_TAG_NAME);
      } else if (e?.GetHighlightExploreToolId() === 6006) {
        e?.HideHighlightExploreSkill();
      }
    }
  }
  static hqg() {
    var t;
    var e = ModelManager_1.ModelManager.AutoPilotModel?.ActorComp;
    if (e) {
      t = ModelManager_1.ModelManager.MapModel.CurrentWorldMapConfigId;
      ModelManager_1.ModelManager.AutoPilotModel.AutoPilotAreaId = this.GetAutoPilotAreaId(e.ActorLocationProxy, t);
    }
  }
  static GetAutoPilotAreaId(t, e) {
    return this.AreaCheck.BinTest(t, e);
  }
  static SummonMotorAndEnterAutoPilot() {
    ModelManager_1.ModelManager.AutoPilotModel.IsSummonWaitingEnterVehicle = true;
  }
  static async ygg() {
    if (!(await ModelManager_1.ModelManager.AutoPilotModel?.ActorComp?.Entity?.GetComponent(43)?.BeginSkillAsync(AutoPilotDefine_1.SUMMONMOTOR_SKILLID))) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "释放召唤摩托技能失败");
      }
      ModelManager_1.ModelManager.AutoPilotModel.IsSummonWaitingEnterVehicle = false;
    }
  }
  static get AutoPilotViewInstance() {
    return this.s8m;
  }
  static XAg() {
    if (TimerSystem_1.TimerSystem.Has(this.YAg)) {
      TimerSystem_1.TimerSystem.Remove(this.YAg);
      this.YAg = undefined;
    }
  }
}
exports.AutoPilotController = AutoPilotController;
(_a = AutoPilotController).s8m = undefined;
AutoPilotController.AreaCheck = new AutoPilotAreaCheck_1.AutoPilotAreaCheck();
AutoPilotController.Aae = Vector_1.Vector.Create();
AutoPilotController.OSg = Vector_1.Vector.Create();
AutoPilotController.qSg = Vector_1.Vector.Create();
AutoPilotController.PYi = new Set();
AutoPilotController.YAg = undefined;
AutoPilotController.wrg = false;
AutoPilotController.e$g = undefined;
AutoPilotController.nye = () => {
  _a.ResumeTick();
  _a.hqg();
};
AutoPilotController.SYi = () => {
  _a.PauseTick();
};
AutoPilotController.bpr = () => {
  _a.ExitAutoPilot("OnTeleportStart");
  _a.PauseTick();
};
AutoPilotController.AEa = () => {
  _a.ResumeTick();
  _a.hqg();
};
AutoPilotController.Hwf = t => {
  if (t) {
    _a.g3f();
    if (t = ModelManager_1.ModelManager.AutoPilotModel?.GetCirclePathResult()?.GenerateAutopilotRoute()) {
      _a.Lgf(t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("AutoPilot", 87, "进入真正环线巡航，合成样条数据为空");
    }
  }
};
AutoPilotController.u8m = t => {
  if (t) {
    ModelManager_1.ModelManager.AutoPilotModel?.AddAutoPilotTime(t);
  }
};
AutoPilotController.zNf = () => {
  if (ModelManager_1.ModelManager.AutoPilotModel.IsSummonWaitingEnterVehicle) {
    _a.ygg();
  }
};
AutoPilotController.M6l = t => {
  if (t.IsDriver && t.VehicleType === "Motorcycle" && t.IsRolePassenger(true)) {
    if (_a.YAg) {
      _a.XAg();
    } else {
      _a.wrg = true;
      ModelManager_1.ModelManager.AutoPilotModel.VehicleEntity = t.VehicleEntity;
      if (ModelManager_1.ModelManager.AutoPilotModel.IsSummonWaitingEnterVehicle) {
        _a.EnterAutoPilot();
        ModelManager_1.ModelManager.AutoPilotModel.IsSummonWaitingEnterVehicle = false;
      }
      _a.RefreshHighLightExploreSkill();
    }
  }
};
AutoPilotController.E6l = t => {
  if (t.IsDriver && t.VehicleType === "Motorcycle" && t.IsRolePassenger(true)) {
    _a.XAg();
    _a.YAg = TimerSystem_1.TimerSystem.Next(() => {
      _a.YAg = undefined;
      _a.wrg = false;
      _a.ExitAutoPilot("OnLeaveVehicle");
      _a.RefreshHighLightExploreSkill();
    });
  }
};
AutoPilotController.pvg = () => {
  var t;
  var e;
  var o;
  var i;
  if (ModelManager_1.ModelManager.AutoPilotModel.GetIsInAutoPilot() && !ModelManager_1.ModelManager.AutoPilotModel.VehicleEntity?.GetComponent(348)?.GetIsOnNearestRoadway() && (t = ModelManager_1.ModelManager.AutoPilotModel.ActorComp) && (e = ModelManager_1.ModelManager.AutoPilotModel.SplineMoveComp) && e.CurrentSplineMoveParams && (t.ActorLocationProxy.Subtraction(e.SplineLocation, _a.Aae), e.SplineDirection.Multiply(_a.Aae.DotProduct(e.SplineDirection), _a.qSg), _a.Aae.Subtraction(_a.qSg, _a.OSg), t = _a.OSg.SizeSquared(), e = Math.abs(_a.Aae.Z), o = ModelManager_1.ModelManager.AutoPilotModel.AutoPilotExitHorizontalDistThreshold, i = ModelManager_1.ModelManager.AutoPilotModel.AutoPilotExitVerticalDistThreshold, o < t || i < e)) {
    _a.ExitAutoPilot("UnValidDistance");
  }
};
AutoPilotController.tRf = () => {
  ModelManager_1.ModelManager.AutoPilotModel?.UpdateCirclePathData();
}; //# sourceMappingURL=AutoPilotController.js.map