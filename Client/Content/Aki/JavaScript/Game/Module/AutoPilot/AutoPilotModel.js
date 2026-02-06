"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotModel = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const AutoPilotCirclesById_1 = require("../../../Core/Define/ConfigQuery/AutoPilotCirclesById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const TransportNetworkController_1 = require("../Transport/TransportNetworkController");
const AutoPilotCirclePathResult_1 = require("./AutoPilotCirclePathResult");
const AutoPilotDefine_1 = require("./AutoPilotDefine");
const AutoPilotFindPathResult_1 = require("./AutoPilotFindPathResult");
const AutoPilotUtil_1 = require("./AutoPilotUtil");
class AutoPilotModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.A8m = false;
    this.D8m = false;
    this.U8m = undefined;
    this.x8m = undefined;
    this.xgf = undefined;
    this.k8m = 0;
    this.q8m = 0;
    this.O8m = -1;
    this.G8m = 0;
    this.F8m = 0;
    this.N8m = 0;
    this.V8m = 0;
    this.j8m = 0;
    this.Bgf = undefined;
    this.kgf = false;
    this.IsDebugMode = false;
    this.IsSkipConfirmBoxShow = true;
    this.MapIdToCirclePathMap = new Map();
    this.AutoPilotMovieCameraRowName = "";
    this.AutoPilotMovieCameraInitialIndex = 0;
    this.EnterCircleRoadId = 0;
    this.n8m = {
      Value: 0
    };
    this.RideShareBtnProgress = 0;
    this.HideQuickTransferConfirmBox = false;
    this.IsAllowExitByMove = false;
    this.DebugRoadWayIds = [];
    this.DebugCircleId = 0;
    this.LastActorLocation = Vector_1.Vector.Create();
    this.SplineMoveComp = undefined;
    this.IsSummonWaitingEnterVehicle = false;
    this.JZf = 0;
    this.VehicleEntity = undefined;
    this.ExitMovieModeWithRideShareQuitPromise = undefined;
    this.EnterRideSharePromise = undefined;
    this.HighLightSampleDist = 0;
    this.AutoPilotRoadWayWidthOffset = 0;
    this.AutoPilotExitHorizontalDistThreshold = 0;
    this.AutoPilotExitVerticalDistThreshold = 0;
    this.RefreshFindPath = () => {
      if (this.ActorComp) {
        let t = false;
        if (!this.x8m) {
          this.x8m = new AutoPilotFindPathResult_1.AutoPilotFindPathResult();
          t = true;
        }
        if (this.A8m) {
          this.x8m.RefreshDataInAutoPilot();
        } else if (t || this.x8m.IsNeedRefreshByFindPath(this.ActorComp.ActorLocationProxy)) {
          var e = this.Bgf.TargetPos;
          let t = undefined;
          if (Vector_1.Vector.DistSquared2D(this.ActorComp.ActorLocationProxy, e) > this.k8m && !(t = TransportNetworkController_1.TransportNetworkController.FindPath(this.ActorComp.ActorLocationProxy, e, true, false, ModelManager_1.ModelManager.AutoPilotModel?.IsDebugMode))) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("AutoPilot", 87, "TransportNetworkController.FindPath return null");
            }
          } else {
            this.x8m.RefreshData(this.Bgf.MapId, this.ActorComp.ActorLocationProxy, e, t);
          }
        }
      }
    };
    this.cqg = 0;
    this.n21 = t => {
      if (!!this.U8m && !ModelManager_1.ModelManager.TrackModel?.IsTracking(this.U8m.TrackSource, this.U8m.MarkId)) {
        this.SetTrackingMarkItem(undefined);
      }
    };
    this.$gf = (t, e) => {
      (t ? this.EnterRideSharePromise : this.ExitMovieModeWithRideShareQuitPromise)?.SetResult(e);
    };
  }
  get ActorComp() {
    return ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.GetComponent(3);
  }
  OnInit() {
    this.iRf();
    this.Ore();
    return true;
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UnTrackMark, this.n21);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMovieMotorRideSharingModeChangeResponse, this.$gf);
  }
  iRf() {
    this.k8m = Math.pow(CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotPlayerToTargetDistanceThreshold") ?? 0, 2);
    this.q8m = CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotSplineDistanceThreshold") ?? 0;
    this.O8m = CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotSkillHighLightTime") ?? -1;
    this.G8m = CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotEnterMovieModeTimeThreshold") ?? 0;
    this.F8m = Math.pow(CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotEnterMovieModeDistanceThreshold") ?? 0, 2);
    this.N8m = CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotCanSkipTimeThreshold") ?? 0;
    this.V8m = Math.pow(CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotCanSkipDistanceThreshold") ?? 0, 2);
    this.AutoPilotMovieCameraRowName = CommonParamById_1.configCommonParamById.GetStringConfig("AutoPilotMovieCameraRowName") ?? "3.0大世界电影镜头";
    this.AutoPilotMovieCameraInitialIndex = CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotMovieCameraInitialIndex") ?? 0;
    this.IsAllowExitByMove = CommonParamById_1.configCommonParamById.GetBoolConfig("AutoPilotExitByMove") ?? false;
    this.AutoPilotRoadWayWidthOffset = CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotRoadWayWidthOffset") ?? 0;
    this.AutoPilotExitHorizontalDistThreshold = Math.pow(CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotExitHorizontalDistanceThreshold") ?? 1800, 2);
    this.AutoPilotExitVerticalDistThreshold = CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotExitVerticalDistanceThreshold") ?? 1200;
    this.HighLightSampleDist = AutoPilotDefine_1.HIGHLIGHTLINEDISTANCEINTERVAL;
    this.UpdateCirclePathData();
  }
  UpdateCirclePathData() {
    this.MapIdToCirclePathMap.clear();
    this.MapIdToCirclePathMap.set(105, {
      RoadBuildIdArray: [0],
      CircleIds: [0]
    });
    var t;
    var e;
    var i;
    var o = ConfigManager_1.ConfigManager.InfrastructureConfig?.GetAutoPilotCircle();
    if (o && !(o.length <= 0)) {
      for (const r of o) {
        if (this.NDf(r.RoadBuildIdArray)) {
          t = r.MapId;
          e = r.AutoPilotCirclePathId;
          if (this.MapIdToCirclePathMap.has(t)) {
            i = this.MapIdToCirclePathMap.get(t);
            if (r.RoadBuildIdArray.length > i.RoadBuildIdArray.length) {
              i.RoadBuildIdArray = Array.from(r.RoadBuildIdArray);
              i.CircleIds.length = 0;
              i.CircleIds.push(e);
            } else if (r.RoadBuildIdArray.length === i.RoadBuildIdArray.length) {
              i.CircleIds.push(e);
            }
          } else {
            this.MapIdToCirclePathMap.set(t, {
              RoadBuildIdArray: Array.from(r.RoadBuildIdArray),
              CircleIds: [e]
            });
          }
        }
      }
    }
  }
  NDf(t) {
    for (const i of t) {
      var e = ModelManager_1.ModelManager.InfrastructureModel?.GetRoadDataByRoadId(i);
      if (!e || e.Status !== Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusComplete) {
        return false;
      }
    }
    return true;
  }
  GetIsTracking(t) {
    return this.U8m?.MarkId === t;
  }
  SetTrackingMarkItem(t) {
    var e;
    if (this.U8m?.MarkId !== t?.MarkId && (this.ClearTrackingData(), e = this.U8m, this.U8m = t, this.U8m && (this.SetTrackingData({
      TargetPos: this.U8m.WorldPosition,
      MapId: this.U8m.MapId
    }), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMarkItemAutoPilotTrackStateChange, this.U8m.MarkType, this.U8m.MarkId)), e)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMarkItemAutoPilotTrackStateChange, e.MarkType, e.MarkId);
    }
  }
  ClearData() {
    this.ClearTrackingData();
    this.ClearCirclePathResult();
  }
  ClearFindPathResult() {
    this.x8m?.Clear();
    this.x8m = undefined;
  }
  ClearCirclePathResult() {
    this.xgf = undefined;
  }
  SetTrackingData(t) {
    this.Bgf = t;
    this.RefreshFindPath();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnUpdateAutoPilotLine);
    ControllerHolder_1.ControllerHolder.AutoPilotController.AddTick(this.RefreshFindPath);
  }
  ClearTrackingData() {
    ControllerHolder_1.ControllerHolder.AutoPilotController.ExitAutoPilot("ClearTrackingData");
    this.Bgf = undefined;
    this.ClearFindPathResult();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnUpdateAutoPilotLine);
    ControllerHolder_1.ControllerHolder.AutoPilotController.RemoveTick(this.RefreshFindPath);
  }
  GetSplineDistanceThreshold() {
    return this.q8m;
  }
  GetFindPathResult() {
    return this.x8m;
  }
  GetCirclePathResult() {
    return this.xgf;
  }
  RefreshCirclePath(t, e) {
    this.xgf ||= new AutoPilotCirclePathResult_1.AutoPilotCirclePathResult(t, e);
    this.xgf.RefreshPathToCircleData();
  }
  GetIsInAutoPilot() {
    return this.A8m;
  }
  GetAutoPilotState() {
    return this.JZf;
  }
  SetAutoPilotState(t) {
    var e;
    var t = (this.JZf = t) !== 0;
    if (this.A8m !== t) {
      this.A8m = t;
      e = ModelManager_1.ModelManager.AutoPilotModel?.ActorComp?.Entity?.GetComponent(242)?.VehicleEntity?.GetComponent(217);
      if (t) {
        if (!e?.HasTag(AutoPilotDefine_1.autoPilotTag)) {
          e?.AddTag(AutoPilotDefine_1.autoPilotTag);
        }
      } else if (e?.HasTag(AutoPilotDefine_1.autoPilotTag)) {
        e?.RemoveTag(AutoPilotDefine_1.autoPilotTag);
      }
      AudioSystem_1.AudioSystem.PostEvent(t ? "play_ui_moto_autopilot_tips_enter" : "play_ui_moto_autopilot_tips_exit");
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAutoPilotStateChange, t);
    }
  }
  GetIsInMovieMode() {
    return this.D8m;
  }
  SetIsInMovieMode(t) {
    this.D8m = t;
    InputDistributeController_1.InputDistributeController.RefreshInputTag();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorInMovieModeChange, t);
  }
  GetPlayerToTargetDistanceThreshold() {
    return this.k8m;
  }
  GetEnterMovieModeTimeThreshold() {
    return this.G8m;
  }
  GetEnterMovieModeDistanceThreshold() {
    return this.F8m;
  }
  GetCanSkipTimeThreshold() {
    return this.N8m;
  }
  GetCanSkipDistanceThreshold() {
    return this.V8m;
  }
  GetSkillHighLightTime() {
    return this.O8m;
  }
  GetAutoPilotTime() {
    return this.j8m;
  }
  AddAutoPilotTime(t) {
    this.j8m += t;
  }
  ResetAutoPilotTime() {
    this.j8m = 0;
  }
  get AutoPilotAreaId() {
    return this.cqg;
  }
  set AutoPilotAreaId(t) {
    if (this.cqg !== t) {
      if (this.Bgf) {
        this.SetTrackingMarkItem(undefined);
      }
      this.cqg = t;
    }
  }
  GetIsCanShowSkipBtn() {
    return this.kgf;
  }
  SetIsCanShowSkipBtn(t) {
    this.kgf = t;
  }
  GetEnableAutoPilot() {
    return this.n8m;
  }
  SetEnableAutoPilot(t, e) {
    if (this.n8m?.Value !== t || this.n8m?.DisableReason !== e) {
      this.n8m.Value = t;
      this.n8m.DisableReason = e;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "设置可巡航的状态", ["value", t], ["reason", e]);
      }
      ControllerHolder_1.ControllerHolder.AutoPilotController.RefreshHighLightExploreSkill();
      if (t === 1 && ModelManager_1.ModelManager.FunctionModel?.IsOpen(10098)) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("AutoPilot_RoutePointTips");
      }
    }
  }
  CheckCommonConditions() {
    var t;
    if (this.A8m) {
      this.SetEnableAutoPilot(0, 4);
      return false;
    } else {
      return (t = this.ActorComp?.CreatureData.GetRoleId()) && !ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t)?.IsTrialRole() || (this.SetEnableAutoPilot(0, 3), false);
    }
  }
  CheckCircleAutoPilotConditions() {
    if (this.CheckCommonConditions()) {
      var t = this.MapIdToCirclePathMap.get(ModelManager_1.ModelManager.MapModel.CurrentWorldMapConfigId);
      if (t) {
        var e = this.VehicleEntity?.GetComponent(348);
        if (e?.GetIsOnNearestRoadway()) {
          var i = e?.GetNearestRoadway()?.Roadway;
          if (i) {
            for (const r of t.CircleIds) {
              var o = AutoPilotCirclesById_1.configAutoPilotCirclesById.GetConfig(r)?.WaySplines;
              if (o && o.includes(i.Id)) {
                this.RefreshCirclePath(r, true);
                this.SetEnableAutoPilot(2);
                return;
              }
            }
            if (this.fAg(i.Id, t.CircleIds) || this.gAg(t.CircleIds)) {
              this.SetEnableAutoPilot(2);
            } else {
              this.SetEnableAutoPilot(0, 0);
            }
          } else {
            this.SetEnableAutoPilot(0, 0);
          }
        } else {
          this.SetEnableAutoPilot(0, 2);
        }
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AutoPilot", 87, "当前没有环路数据");
        }
        this.SetEnableAutoPilot(0, 0);
      }
    }
  }
  fAg(t, e) {
    var i = ControllerHolder_1.ControllerHolder.TransportController.GetTransportSystem();
    var t = i.GetIntersectionId(t);
    if (t) {
      var o = (0, puerts_1.$ref)(UE.NewArray(UE.BuiltinInt));
      i.GetRoadwaysAtSameIntersection(t, o);
      var r = (0, puerts_1.$unref)(o);
      var s = r.Num();
      for (let t = 0; t < s; t++) {
        var h = i.GetRoadWay(r.Get(t));
        if (h) {
          for (const l of e) {
            var n = AutoPilotCirclesById_1.configAutoPilotCirclesById.GetConfig(l)?.WaySplines;
            if (n) {
              var a = ModelManager_1.ModelManager.AutoPilotModel?.ActorComp;
              if (n.includes(h.Id) && a && AutoPilotUtil_1.AutoPilotUtil.IsNearRoadWay(h, a.ActorLocationProxy)) {
                ModelManager_1.ModelManager.AutoPilotModel?.RefreshCirclePath(l, true);
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }
  gAg(t) {
    for (const o of t) {
      var e = AutoPilotCirclesById_1.configAutoPilotCirclesById.GetConfig(o)?.WaySplines;
      if (e) {
        var i = ModelManager_1.ModelManager.AutoPilotModel?.ActorComp;
        if (i && this.Jwf(i.ActorLocationProxy, e)) {
          ModelManager_1.ModelManager.AutoPilotModel?.RefreshCirclePath(o, false);
          return true;
        }
      }
    }
    return false;
  }
  Jwf(t, e) {
    var i = ControllerHolder_1.ControllerHolder.TransportController.GetTransportSystem().GetRoadWay(e[0]);
    if (i) {
      i = i?.RoadSpline?.D_GetLocationAtSplinePoint(1, 1);
      if (i) {
        MathUtils_1.MathUtils.CommonTempVector.DeepCopy(i);
        var o = ControllerHolder_1.ControllerHolder.TransportController.FindPath(t, MathUtils_1.MathUtils.CommonTempVector, true, false, ModelManager_1.ModelManager.AutoPilotModel?.IsDebugMode);
        if (o) {
          var r = o.Roadways.Num();
          for (let t = 0; t < r; t++) {
            var s = o.Roadways.Get(t);
            if (ModelManager_1.ModelManager.AutoPilotModel?.IsDebugMode && Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("AutoPilot", 87, "检查路径是否包含环路", ["RoadWayId", s.Id]);
            }
            if (e.includes(s.Id)) {
              ModelManager_1.ModelManager.AutoPilotModel.EnterCircleRoadId = s.Id;
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UnTrackMark, this.n21);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMovieMotorRideSharingModeChangeResponse, this.$gf);
  }
  OnClear() {
    this.ClearData();
    this.MapIdToCirclePathMap.clear();
    this.kre();
    this.EnterRideSharePromise = undefined;
    return !(this.ExitMovieModeWithRideShareQuitPromise = undefined);
  }
}
exports.AutoPilotModel = AutoPilotModel;
//# sourceMappingURL=AutoPilotModel.js.map