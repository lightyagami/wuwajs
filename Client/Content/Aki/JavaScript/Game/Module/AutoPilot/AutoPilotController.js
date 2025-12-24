"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const AutoPilotCirclesById_1 = require("../../../Core/Define/ConfigQuery/AutoPilotCirclesById");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const AutoPilotAreaCheck_1 = require("./AutoPilotAreaCheck");
const AutoPilotDefine_1 = require("./AutoPilotDefine");
const AutoPilotMobileView_1 = require("./AutoPilotMobileView");
const AutoPilotPcView_1 = require("./AutoPilotPcView");
const AutoPilotUtil_1 = require("./AutoPilotUtil");
class AutoPilotController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.sCe();
    this.PauseTick();
    this.AreaCheck.Init();
    return true;
  }
  static OnClear() {
    this.aCe();
    this.AreaCheck.Clear();
    this.amf();
    return true;
  }
  static sCe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BeforeLoadMap, this.SYi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.bpr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.AEa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCircleStateChange, this.cIf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InfrastructureRoadDataUpdate, this.IIf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.skf);
  }
  static aCe() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BeforeLoadMap, this.SYi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, this.bpr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.AEa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCircleStateChange, this.cIf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InfrastructureRoadDataUpdate, this.IIf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.skf);
  }
  static async EnterAutoPilot() {
    if (ModelManager_1.ModelManager.AutoPilotModel?.GetIsInAutoPilot()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "进入自动巡航失败，已处于自动巡航中");
      }
      return false;
    }
    this.hmf();
    var t = ModelManager_1.ModelManager.AutoPilotModel?.GetEnableAutoPilot();
    if (t?.Value === 0) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(AutoPilotDefine_1.failReasonTxt[t.DisableReason]);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "进入自动巡航失败，当前状态不可自动巡航", ["reason", t.DisableReason]);
      }
      return false;
    }
    this.wXf.Start();
    t = this.lmf();
    this.wXf.Stop();
    if (t) {
      return this._mf(t);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "进入自动巡航失败，获取合成样条线为空");
      }
      return false;
    }
  }
  static hmf() {
    if (ModelManager_1.ModelManager.AutoPilotModel?.GetFindPathResult()) {
      this.CheckFindPathAutoPilotConditions();
    } else {
      this.gIf();
    }
  }
  static PYf() {
    var t;
    if (ModelManager_1.ModelManager.AutoPilotModel?.GetIsInAutoPilot()) {
      this.CIf(0, 4);
      return false;
    } else if (ModelManager_1.ModelManager.AutoPilotModel?.IsPlayerInAutoPilotArea) {
      return (t = ModelManager_1.ModelManager.AutoPilotModel?.ActorComp?.CreatureData.GetRoleId()) && !ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t)?.IsTrialRole() || (this.CIf(0, 3), false);
    } else {
      this.CIf(0, 1);
      return false;
    }
  }
  static lmf() {
    var t = ModelManager_1.ModelManager.AutoPilotModel;
    var e = t?.GetFindPathResult();
    if (e) {
      return e.GenerateAutopilotRoute();
    } else {
      return t?.GetCirclePathResult()?.GenerateAutopilotRoute();
    }
  }
  static async _mf(t) {
    var e = ModelManager_1.ModelManager.AutoPilotModel?.ActorComp?.Entity?.GetComponent(242);
    if (e?.VehicleType !== "Motorcycle") {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, `进入自动巡航失败,EVehicleType${e?.VehicleType}不是Motorcycle`);
      }
      return false;
    }
    ModelManager_1.ModelManager.AutoPilotModel.VehicleEntity = e?.VehicleEntity;
    e = e?.VehicleEntity?.GetComponent(119);
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
    this.PXf.Start();
    await this.OpenAutoPilotView();
    this.PXf.Stop();
    e.StartSplineMoveWithAutoPilotRoute(t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AutoPilot", 87, "进入自动巡航成功", ["EnterLocation", ModelManager_1.ModelManager.AutoPilotModel?.ActorComp?.ActorLocationProxy]);
    }
    return true;
  }
  static Skf() {
    ModelManager_1.ModelManager.AutoPilotModel?.VehicleEntity?.GetComponent(119)?.EndSplineMoveForAutoPilot();
  }
  static async ExitAutoPilot(t) {
    if (ModelManager_1.ModelManager.AutoPilotModel?.GetIsInAutoPilot()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "退出自动巡航", ["reason", t], ["ExitLocation", ModelManager_1.ModelManager.AutoPilotModel?.ActorComp?.ActorLocationProxy]);
      }
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("AutoPilot_QuitTips");
      this.Skf();
      ModelManager_1.ModelManager.AutoPilotModel?.ClearCirclePathResult();
      ModelManager_1.ModelManager.AutoPilotModel?.ResetAutoPilotTime();
      ModelManager_1.ModelManager.AutoPilotModel?.SetAutoPilotState(0);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "关闭自动巡航界面,开始退出电影模式");
      }
      await this.t8m?.ExitMovieMode(0);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "关闭自动巡航界面,退出电影模式完成");
      }
      this.amf();
      this.l$f();
    }
  }
  static async OpenAutoPilotView() {
    var t;
    var e;
    if (!this.t8m) {
      ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.HideBattleView(15, [4, 17, 37, 40, 26]);
      if (t = UiManager_1.UiManager.GetViewByName("BattleView")) {
        e = Info_1.Info.IsInTouch();
        this.t8m = new (e ? AutoPilotMobileView_1.AutoPilotMobileView : AutoPilotPcView_1.AutoPilotPcView)();
        await this.t8m.CreateThenShowByResourceIdAsync("UiView_MotorcycleAutoCruise", t.GetRootItem());
        t.AddChild(this.t8m);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AutoPilot", 87, "打开自动巡航界面完成");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AutoPilot", 87, "BattleView is null");
      }
    }
  }
  static amf() {
    ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.ShowBattleView(15);
    this.t8m?.Destroy(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "关闭自动巡航界面完成");
      }
    });
    this.t8m = undefined;
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
    this._7f();
    this.iWf();
    this.u7f();
    this.c7f();
    this.s8m(t);
    this.i8m();
    this.dIf();
    this.rZf();
  }
  static u7f() {
    var t;
    var e;
    var o;
    var i;
    var r = ModelManager_1.ModelManager.AutoPilotModel?.ActorComp;
    if (r && !ModelManager_1.ModelManager.AutoPilotModel?.LastActorLocation.Equals(r.ActorLocationProxy, 1) && (ModelManager_1.ModelManager.AutoPilotModel?.LastActorLocation.DeepCopy(r.ActorLocationProxy), o = ControllerHolder_1.ControllerHolder.TransportController.GetTransportSystem(), t = (0, puerts_1.$ref)(undefined), i = (0, puerts_1.$ref)(undefined), e = (0, puerts_1.$ref)(undefined), o = o.D_GetNearestRoadwayAtWorldPosition(r.ActorLocation, t, i, e), r = (0, puerts_1.$unref)(t), this.AXf.Start(), ModelManager_1.ModelManager.AutoPilotModel?.SetNearestRoadway(r, o), this.AXf.Stop(), ModelManager_1.ModelManager.AutoPilotModel?.IsDebugMode)) {
      i = new UE.LinearColor(1, 1, 0, 0);
      UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, r, 30, 30, i, 30);
    }
  }
  static i8m() {
    ModelManager_1.ModelManager.AutoPilotModel?.RefreshFindPath();
  }
  static dIf() {
    var t;
    if (ModelManager_1.ModelManager.AutoPilotModel?.GetIsInAutoPilot() && (t = ModelManager_1.ModelManager.AutoPilotModel?.GetCirclePathResult())) {
      t.RefreshPathToCircleDataInAutoPilot();
    }
  }
  static c7f() {
    this.CheckFindPathAutoPilotConditions();
  }
  static CheckFindPathAutoPilotConditions() {
    var t;
    if (this.PYf()) {
      if (t = ModelManager_1.ModelManager.AutoPilotModel?.GetFindPathResult()) {
        if (t.GetIsShowPlayerToTargetLine()) {
          this.CIf(0, 6);
        } else {
          t.RefreshHasArriveStartPoint();
          if (t.GetHasArriveStartPoint()) {
            this.CIf(1);
          } else {
            this.CIf(0, 2);
          }
        }
      } else {
        this.CIf(0, 5);
      }
    }
  }
  static gIf() {
    if (this.PYf()) {
      var t = ModelManager_1.ModelManager.AutoPilotModel?.MapIdToCirclePathMap.get(ModelManager_1.ModelManager.MapModel.CurrentWorldMapConfigId);
      if (t) {
        var e = ModelManager_1.ModelManager.AutoPilotModel?.ActorComp;
        if (e) {
          var o = ModelManager_1.ModelManager.AutoPilotModel?.GetIsOnNearestRoadway();
          if (ModelManager_1.ModelManager.AutoPilotModel.IsDebugMode && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("AutoPilot", 87, "判断是否在路上", ["isOnNearestRoadway", o]);
          }
          if (o) {
            var i = ModelManager_1.ModelManager.AutoPilotModel?.GetNearestRoadway()?.Roadway;
            if (i) {
              for (const a of t.CircleIds) {
                var r = AutoPilotCirclesById_1.configAutoPilotCirclesById.GetConfig(a)?.WaySplines;
                if (r && r.includes(i.Id)) {
                  ModelManager_1.ModelManager.AutoPilotModel?.RefreshCirclePath(a, true);
                  this.CIf(2);
                  return;
                }
              }
              if (this.itg(i.Id, t.CircleIds, e.ActorLocationProxy) || this.rtg(t.CircleIds, e.ActorLocationProxy)) {
                this.CIf(2);
              } else {
                this.CIf(0, 0);
              }
            } else {
              this.CIf(0, 0);
            }
          } else {
            this.CIf(0, 2);
          }
        } else {
          this.CIf(0, 0);
        }
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AutoPilot", 87, "当前没有环路数据");
        }
        this.CIf(0, 0);
      }
    }
  }
  static itg(t, e, o) {
    var i = ControllerHolder_1.ControllerHolder.TransportController.GetTransportSystem();
    var t = i.GetIntersectionId(t);
    if (t) {
      var r = (0, puerts_1.$ref)(UE.NewArray(UE.BuiltinInt));
      i.GetRoadwaysAtSameIntersection(t, r);
      var a = (0, puerts_1.$unref)(r);
      var l = a.Num();
      for (let t = 0; t < l; t++) {
        var n = i.GetRoadWay(a.Get(t));
        if (n) {
          for (const s of e) {
            var _ = AutoPilotCirclesById_1.configAutoPilotCirclesById.GetConfig(s)?.WaySplines;
            if (_ && _.includes(n.Id) && AutoPilotUtil_1.AutoPilotUtil.IsNearRoadWay(n, o)) {
              ModelManager_1.ModelManager.AutoPilotModel?.RefreshCirclePath(s, true);
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  static rtg(t, e) {
    for (const i of t) {
      var o = AutoPilotCirclesById_1.configAutoPilotCirclesById.GetConfig(i)?.WaySplines;
      if (o && this.SIf(e, o)) {
        ModelManager_1.ModelManager.AutoPilotModel?.RefreshCirclePath(i, false);
        return true;
      }
    }
    return false;
  }
  static SIf(t, e) {
    var o = ControllerHolder_1.ControllerHolder.TransportController.GetTransportSystem().GetRoadWay(e[0]);
    if (o) {
      o = o?.RoadSpline?.D_GetLocationAtSplinePoint(1, 1);
      if (o) {
        MathUtils_1.MathUtils.CommonTempVector.DeepCopy(o);
        var i = ControllerHolder_1.ControllerHolder.TransportController.FindPath(t, MathUtils_1.MathUtils.CommonTempVector, true, false, ModelManager_1.ModelManager.AutoPilotModel?.IsDebugMode);
        if (i) {
          var r = i.Roadways.Num();
          for (let t = 0; t < r; t++) {
            var a = i.Roadways.Get(t);
            if (ModelManager_1.ModelManager.AutoPilotModel?.IsDebugMode && Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("AutoPilot", 87, "检查路径是否包含环路", ["RoadWayId", a.Id]);
            }
            if (e.includes(a.Id)) {
              ModelManager_1.ModelManager.AutoPilotModel.EnterCircleRoadId = a.Id;
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  static CIf(t, e) {
    var o = ModelManager_1.ModelManager.AutoPilotModel?.GetEnableAutoPilot();
    if (o?.Value !== t || o?.DisableReason !== e) {
      ModelManager_1.ModelManager.AutoPilotModel?.SetEnableAutoPilot(t, e);
      this.l$f();
      if (t === 1 && ModelManager_1.ModelManager.FunctionModel?.IsOpen(10098)) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("AutoPilot_RoutePointTips");
      }
    }
  }
  static l$f() {
    this.r6d(false);
    if (ModelManager_1.ModelManager.AutoPilotModel?.GetEnableAutoPilot()?.Value === 1) {
      this.r6d(true);
    }
  }
  static r6d(t) {
    var e = ModelManager_1.ModelManager.AutoPilotModel?.ActorComp?.Entity;
    let o = undefined;
    var i = ModelManager_1.ModelManager.AutoPilotModel?.IsOnMotor;
    o = i ? e?.GetComponent(242)?.VehicleEntity?.GetComponent(57) : e?.GetComponent(56);
    if (t) {
      o?.ShowHighlightExploreSkill(i ? 6001 : 6006, ModelManager_1.ModelManager.AutoPilotModel?.GetSkillHighLightTime() ?? -1, true, AutoPilotDefine_1.HIGHLIGHT_TAG_NAME);
    } else {
      o?.HideHighlightExploreSkill();
    }
  }
  static _7f() {
    var t;
    var e = ModelManager_1.ModelManager.AutoPilotModel?.ActorComp;
    if (e) {
      this._zf.Start();
      t = ModelManager_1.ModelManager.MapModel.CurrentWorldMapConfigId;
      e = this.CheckIsInAutoPilotArea(e.ActorLocationProxy, t);
      ModelManager_1.ModelManager.AutoPilotModel.IsPlayerInAutoPilotArea = e;
      this._zf.Stop();
    }
  }
  static CheckIsInAutoPilotArea(t, e) {
    return this.AreaCheck.BinTest(t, e);
  }
  static s8m(t) {
    if (ModelManager_1.ModelManager.AutoPilotModel?.GetIsInAutoPilot()) {
      ModelManager_1.ModelManager.AutoPilotModel?.AddAutoPilotTime(t);
    }
  }
  static SummonMotorAndEnterAutoPilot() {
    ModelManager_1.ModelManager.AutoPilotModel.IsSummonWaitingEnterVehicle = true;
  }
  static async hzf() {
    if (!(await ModelManager_1.ModelManager.AutoPilotModel?.ActorComp?.Entity?.GetComponent(41)?.BeginSkillAsync(AutoPilotDefine_1.SUMMONMOTOR_SKILLID))) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "释放召唤摩托技能失败");
      }
      ModelManager_1.ModelManager.AutoPilotModel.IsSummonWaitingEnterVehicle = false;
    }
  }
  static iWf() {
    if (ModelManager_1.ModelManager.AutoPilotModel?.IsOnMotor !== this._$f) {
      ModelManager_1.ModelManager.AutoPilotModel.IsOnMotor = this._$f;
      if (ModelManager_1.ModelManager.AutoPilotModel.IsOnMotor) {
        if (ModelManager_1.ModelManager.AutoPilotModel?.IsSummonWaitingEnterVehicle) {
          this.EnterAutoPilot();
          ModelManager_1.ModelManager.AutoPilotModel.IsSummonWaitingEnterVehicle = false;
        }
      } else if (ModelManager_1.ModelManager.AutoPilotModel?.GetIsInAutoPilot()) {
        this.ExitAutoPilot("OnLeaveVehicle");
      }
      this.l$f();
    }
  }
  static rZf() {
    var t;
    var e;
    var o;
    var i;
    if (ModelManager_1.ModelManager.AutoPilotModel?.GetIsInAutoPilot() && !ModelManager_1.ModelManager.AutoPilotModel?.GetIsOnNearestRoadway() && (t = ModelManager_1.ModelManager.AutoPilotModel?.ActorComp) && (e = ModelManager_1.ModelManager.AutoPilotModel?.SplineMoveComp) && e.CurrentSplineMoveParams && (t.ActorLocationProxy.Subtraction(e.SplineLocation, this.Aae), e.SplineDirection.Multiply(this.Aae.DotProduct(e.SplineDirection), this.DZf), this.Aae.Subtraction(this.DZf, this.UZf), t = this.UZf.SizeSquared(), e = Math.abs(this.Aae.Z), o = ModelManager_1.ModelManager.AutoPilotModel.AutoPilotExitHorizontalDistThreshold, i = ModelManager_1.ModelManager.AutoPilotModel.AutoPilotExitVerticalDistThreshold, o < t || i < e)) {
      this.ExitAutoPilot("UnValidDistance");
    }
  }
}
exports.AutoPilotController = AutoPilotController;
(_a = AutoPilotController).t8m = undefined;
AutoPilotController.AreaCheck = new AutoPilotAreaCheck_1.AutoPilotAreaCheck();
AutoPilotController._$f = false;
AutoPilotController.wXf = Stats_1.Stat.Create("GetAutoPilotRoute");
AutoPilotController.AXf = Stats_1.Stat.Create("SetNearestRoadway");
AutoPilotController.PXf = Stats_1.Stat.Create("OpenAutoPilotView");
AutoPilotController._zf = Stats_1.Stat.Create("CheckIsInAutoPilotArea");
AutoPilotController.Aae = Vector_1.Vector.Create();
AutoPilotController.UZf = Vector_1.Vector.Create();
AutoPilotController.DZf = Vector_1.Vector.Create();
AutoPilotController.nye = () => {
  _a.ResumeTick();
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
};
AutoPilotController.cIf = t => {
  if (t) {
    _a.Skf();
    if (t = ModelManager_1.ModelManager.AutoPilotModel?.GetCirclePathResult()?.GenerateAutopilotRoute()) {
      _a._mf(t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("AutoPilot", 87, "进入真正环线巡航，合成样条数据为空");
    }
  }
};
AutoPilotController.skf = () => {
  if (ModelManager_1.ModelManager.AutoPilotModel.IsSummonWaitingEnterVehicle) {
    _a.hzf();
  }
};
AutoPilotController.M6l = t => {
  if (t.IsDriver && t.VehicleType === "Motorcycle" && t.IsRolePassenger(true)) {
    _a._$f = true;
  }
};
AutoPilotController.E6l = t => {
  if (t.IsDriver && t.VehicleType === "Motorcycle" && t.IsRolePassenger(true)) {
    _a._$f = false;
  }
};
AutoPilotController.IIf = () => {
  ModelManager_1.ModelManager.AutoPilotModel?.UpdateCirclePathData();
}; //# sourceMappingURL=AutoPilotController.js.map