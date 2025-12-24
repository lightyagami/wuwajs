"use strict";

var __decorate = this && this.__decorate || function (t, i, e, o) {
  var r;
  var s = arguments.length;
  var n = s < 3 ? i : o === null ? o = Object.getOwnPropertyDescriptor(i, e) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, i, e, o);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (r = t[h]) {
        n = (s < 3 ? r(n) : s > 3 ? r(i, e, n) : r(i, e)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(i, e, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanoramicPointComponent = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiActorPool_1 = require("../../Ui/UiActorPool");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const EnvironmentalPerceptionController_1 = require("../../World/Enviroment/EnvironmentalPerceptionController");
const PanoramicDefine_1 = require("./PanoramicDefine");
const PanoramicPointView_1 = require("./PanoramicPointView");
let PanoramicPointComponent = class PanoramicPointComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.uoe = undefined;
    this.Hte = undefined;
    this.jBr = undefined;
    this.Jq1 = undefined;
    this.sKe = 0;
    this.Kr = false;
    this.e21 = true;
    this.Zq1 = undefined;
    this.Eqi = undefined;
    this.yB = undefined;
    this.n8 = "";
    this.Lqi = undefined;
    this.PointView = undefined;
    this.zq1 = undefined;
    this.xe = -1;
    this.Angle = 180;
    this.AngleRange = 180;
    this.Range = 100;
    this.SafeRange = 100;
    this.TargetPos = Vector_1.Vector.Create();
    this.toh = true;
    this.BVm = false;
    this.kVm = false;
    this.qVm = false;
    this.M91 = t => {
      if (this.PointView && this.e21 && this.toh) {
        this.UpdateCondition();
        this.PointView.Update();
      }
    };
    this.DestroyShowSpotEvent = () => {
      if (this.Jq1) {
        EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(this.Jq1);
        this.Jq1 = undefined;
      }
    };
    this.OnSceneItemStateChange = (t, i) => {
      if (t === -1278190765 && (this.DZs(), this.Yfe(), TickSystem_1.TickSystem.Has(this.sKe))) {
        TickSystem_1.TickSystem.Remove(this.sKe);
      }
    };
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(1);
    var t;
    var i = this.Hte?.CreatureData?.GetPbEntityInitData();
    if (i && (this.xe = this.Hte?.CreatureData?.GetPbDataId() ?? -1, i = (0, IComponent_1.getComponent)(i.ComponentsData, "InteractComponent")) && i?.InteractStyleType) {
      this.AngleRange = i.InteractStyleType.TriggerAngle ?? 180;
      this.Range = i.InteractStyleType.TriggerRange ?? 200;
      this.SafeRange = i.InteractStyleType.ProtectRange ?? -1;
      this.TargetPos.X = i.InteractStyleType.TargetPos.X ?? 0;
      this.TargetPos.Y = i.InteractStyleType.TargetPos.Y ?? 0;
      this.TargetPos.Z = i.InteractStyleType.TargetPos.Z ?? 0;
      this.jBr = this.Entity.GetComponent(128);
      if (this.jBr) {
        this.jBr.SetSightRange(this.Range);
      }
      if (i?.InteractStyleType?.TargetPos && (t = this.Entity.GameBudgetManagedToken, this.Jq1 = EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent(), this.Jq1.Init(this.Range, t, () => {
        this.s21();
      }, () => {
        this.a21();
      }, this.DestroyShowSpotEvent), t)) {
        cpp_1.FKuroPerceptionInterface.MarkElementDisable(t, !this.Entity.Active);
      }
      if ((t = i?.PointIconConfig?.Offset) !== undefined) {
        this.yB = Vector_1.Vector.Create();
        this.yB.FromConfigVector(t);
      }
      this.LZs();
      this.sKe = TickSystem_1.TickSystem.Add(this.M91, "PanoramicPointComponent", 5, true, undefined, true).Id;
      this.toh = true;
    }
    return true;
  }
  OnEnd() {
    this.DZs();
    this.Yfe();
    if (TickSystem_1.TickSystem.Has(this.sKe)) {
      TickSystem_1.TickSystem.Remove(this.sKe);
    }
    return true;
  }
  LZs() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.OnSceneItemStateChange);
  }
  DZs() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.OnSceneItemStateChange)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.OnSceneItemStateChange);
    }
  }
  async u21() {
    this.n8 = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("UiItem_LookAroundItem");
    var t = UiLayer_1.UiLayer.GetBattleViewUnit(1);
    this.Eqi = await UiActorPool_1.UiActorPool.GetAsync(this.n8, t);
    if (this.Kr) {
      UiActorPool_1.UiActorPool.RecycleAsync(this.Eqi, this.n8);
      return false;
    } else {
      this.Eqi.Actor.SetActorHiddenInGame(false);
      this.PointView = new PanoramicPointView_1.PanoramicPointView();
      this.PointView.SetTargetPos(this.TargetPos);
      await this.PointView.CreateByActorAsync(this.Eqi.Actor);
      this.PointView.Id = this.GetId();
      return !this.Kr && (this.e21 = true);
    }
  }
  Yfe() {
    this.Kr = true;
    if (this.PointView) {
      this.PointView.DestroySelf(() => {
        if (this.Eqi) {
          this.Eqi.Actor?.DetachRootComponentFromParent();
          UiActorPool_1.UiActorPool.RecycleAsync(this.Eqi, this.n8);
          this.Eqi = undefined;
        }
        this.PointView = undefined;
      });
    }
    ModelManager_1.ModelManager.PanoramicModel.RemovePoint(this.xe);
    ControllerHolder_1.ControllerHolder.PanoramicController.RemoveInputLayer();
    this.Zq1 = undefined;
    this.e21 = false;
    this.toh = false;
  }
  s21() {
    if (!this.Zq1) {
      this.Zq1 = new CustomPromise_1.CustomPromise();
      this.l21();
    }
  }
  async l21() {
    this.Kr = false;
    this.e21 = true;
    var t = this.Hte?.CreatureData?.GetPbDataId();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Panoramic", 45, "[环视]等待交互点组件创建(开始)", ["pbDataId", t]);
    }
    var i = await this._21();
    if (i) {
      ModelManager_1.ModelManager.PanoramicModel.AddPoint(this.xe, this);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Panoramic", 45, "[环视]等待交互点组件创建(完毕)", ["pbDataId", t]);
    }
    if (this.Zq1) {
      this.Zq1.SetResult();
      this.toh = true;
    } else {
      this.Yfe();
    }
  }
  async _21() {
    if (!UiManager_1.UiManager.IsInited) {
      this.Lqi = new CustomPromise_1.CustomPromise();
      this.zq1 = () => {
        this.Lqi.SetResult(undefined);
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UiManagerInit, this.zq1);
      };
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UiManagerInit, this.zq1);
      await this.Lqi.Promise;
    }
    return this.u21();
  }
  a21() {
    if (this.Zq1 && (this.Lqi?.IsPending() && this.Lqi.SetResult(), this.Yfe(), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Panoramic", 45, "[环视]交互点组件销毁", ["PbDataId", this.xe]);
    }
  }
  ChangeSpotHidden(t) {
    if (this.PointView && this.PointView.GetActive() !== !t && (this.PointView.SetUiActive(!t), this.e21 = !t, this.PointView.ChangePointType(0), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Panoramic", 45, "[环视]交互点组件显隐", ["PbDataId", this.xe], ["value", !t]);
    }
  }
  ChangeSpotType(t) {
    if (this.PointView) {
      this.PointView.ChangePointType(t);
    }
  }
  k7r() {
    var t = UE.NewObject(UE.TraceLineElement.StaticClass());
    t.WorldContextObject = GlobalData_1.GlobalData.World;
    t.bIsSingle = true;
    t.bTraceComplex = false;
    t.bIgnoreSelf = true;
    t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera);
    this.uoe = t;
  }
  Imu() {
    if (this.uoe === undefined) {
      this.k7r();
    }
    var t = this.uoe;
    if (Global_1.Global.BaseCharacter) {
      t.ActorsToIgnore.Add(Global_1.Global.BaseCharacter);
    }
    var i = CameraController_1.CameraController.FightCamera.LogicComponent.PlayerLocation;
    if (i) {
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, CameraController_1.CameraController.CameraLocation);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.TargetPos);
      var e = TraceElementCommon_1.TraceElementCommon.LineTrace(t, "InteractSpotLineTrace" + (this.xe ?? -1));
      var o = t.HitResult;
      if (o) {
        for (let t = 0; t < o.Actors.Num(); t++) {
          var r = o.Actors.Get(t);
          if (r && Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Panoramic", 45, "[环视]射线检测被遮挡", ["PbDataId", this.xe], ["actor", r.GetName()]);
          }
        }
        if (e && o.bBlockingHit) {
          this.qVm = true;
          this.Angle = PanoramicDefine_1.PANORAMIC_MAX_ANGLE;
          return;
        }
      }
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, i);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.TargetPos);
      var e = TraceElementCommon_1.TraceElementCommon.LineTrace(t, "InteractSpotLineTrace" + (this.xe ?? -1));
      var s = t.HitResult;
      if (s) {
        for (let t = 0; t < s.Actors.Num(); t++) {
          var n = s.Actors.Get(t);
          if (n && Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Panoramic", 45, "[环视]射线检测被遮挡", ["PbDataId", this.xe], ["actor", n.GetName()]);
          }
        }
        if (e && s.bBlockingHit) {
          this.qVm = true;
          this.Angle = PanoramicDefine_1.PANORAMIC_MAX_ANGLE;
          return;
        }
      }
      this.qVm = false;
      var h;
      var a;
      var _;
      var i = ControllerHolder_1.ControllerHolder.CameraController?.Model?.CurrentCameraActor;
      if (i) {
        t = Vector_1.Vector.Create();
        e = Vector_1.Vector.Create();
        h = Vector_1.Vector.Create();
        a = Vector_1.Vector.Create();
        _ = Vector_1.Vector.Create();
        e.FromUeVector(i.D_K2_GetActorLocation());
        this.TargetPos.Subtraction(e, t);
        t.GetSafeNormal(h, MathUtils_1.MathUtils.SmallNumber);
        a.FromUeVector(i.GetActorForwardVector());
        a.GetSafeNormal(_, MathUtils_1.MathUtils.SmallNumber);
        e = Vector_1.Vector.DotProduct(h, _);
        this.Angle = Math.acos(e) * MathUtils_1.MathUtils.RadToDeg;
      }
    }
  }
  GetId() {
    return this.xe;
  }
  CheckInCircle() {
    var t;
    var i;
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return !!e && !!(e = e.Entity.GetComponent(1)?.ActorLocationProxy) && !(t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(this.xe), i = Vector_1.Vector.Create(), t && t?.Transform && i.FromConfigVector(t?.Transform?.Pos), Vector_1.Vector.Dist2D(e, i) < this.SafeRange && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Panoramic", 45, "[环视]CheckInShowRange 在保护范围内", ["pbDataId", this.xe]), 1));
  }
  CheckInAngle() {
    var t;
    var i;
    var e;
    var o;
    var r;
    var s = ControllerHolder_1.ControllerHolder.CameraController?.Model?.CurrentCameraActor;
    let n = PanoramicDefine_1.PANORAMIC_MAX_ANGLE;
    if (s) {
      t = Vector_1.Vector.Create();
      r = Vector_1.Vector.Create();
      i = Vector_1.Vector.Create();
      e = Vector_1.Vector.Create();
      o = Vector_1.Vector.Create();
      r.FromUeVector(s.D_K2_GetActorLocation());
      this.TargetPos.Subtraction(r, t);
      t.GetSafeNormal(i, MathUtils_1.MathUtils.SmallNumber);
      e.FromUeVector(s.GetActorForwardVector());
      e.GetSafeNormal(o, MathUtils_1.MathUtils.SmallNumber);
      r = Vector_1.Vector.DotProduct(i, o);
      n = Math.acos(r) * MathUtils_1.MathUtils.RadToDeg;
    }
    return !(n > this.AngleRange) || !(Log_1.Log.CheckDebug() && Log_1.Log.Debug("Panoramic", 45, "[环视]CheckInShowRange 不在范围角度内", ["pbDataId", this.xe]), 1);
  }
  UpdateCondition() {
    this.kVm = this.CheckInCircle();
    this.BVm = this.CheckInAngle();
    if (this.kVm && this.BVm) {
      this.Imu();
    } else {
      this.Angle = PanoramicDefine_1.PANORAMIC_MAX_ANGLE;
    }
  }
  CheckCondition() {
    return this.kVm && this.BVm && this.toh && (this.PointView ?? false) && this.e21 && !this.qVm;
  }
  ChangeNeedTickCheck(t) {
    this.toh = t;
  }
  DestroyPointComponent() {
    this.DZs();
    this.Yfe();
    if (TickSystem_1.TickSystem.Has(this.sKe)) {
      TickSystem_1.TickSystem.Remove(this.sKe);
    }
    this.DestroyShowSpotEvent();
  }
};
PanoramicPointComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(340)], PanoramicPointComponent);
exports.PanoramicPointComponent = PanoramicPointComponent; //# sourceMappingURL=PanoramicPointComponent.js.map