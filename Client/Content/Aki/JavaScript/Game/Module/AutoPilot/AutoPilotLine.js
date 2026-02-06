"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotLineComponent = exports.AutoPilotLine = undefined;
const UE = require("ue");
const Stats_1 = require("../../../Core/Common/Stats");
const AutoPilotCirclesById_1 = require("../../../Core/Define/ConfigQuery/AutoPilotCirclesById");
const InfrAutoPilotCircleByAutoPilotCirclePathId_1 = require("../../../Core/Define/ConfigQuery/InfrAutoPilotCircleByAutoPilotCirclePathId");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const MapUtil_1 = require("../Map/MapUtil");
const TransportNetworkController_1 = require("../Transport/TransportNetworkController");
const LguiUtil_1 = require("../Util/LguiUtil");
const AutoPilotUtil_1 = require("./AutoPilotUtil");
class AutoPilotLine {
  constructor(t) {
    this.Map = t;
    this.d8m = undefined;
    this.aHf = undefined;
    this.CTn = Vector2D_1.Vector2D.Create();
    this.m8m = Vector2D_1.Vector2D.Create();
    this.f8m = Vector2D_1.Vector2D.Create();
    this.g8m = Vector2D_1.Vector2D.Create();
    this.C8m = Vector2D_1.Vector2D.Create();
    this.p8m = Rotator_1.Rotator.Create();
    this.v8m = Rotator_1.Rotator.Create();
    this.y8m = Rotator_1.Rotator.Create();
    this.S8m = 1;
    this.nz = Vector_1.Vector.Create();
    this.O_g = Stats_1.Stat.Create("DrawFindPathHighLightLine");
    this.hHf = () => {
      this.CheckAutoPilotLineInfo();
    };
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateAutoPilotLine, this.hHf);
  }
  Vgg() {
    var t = this.Map.MapTileMgr?.TotalTileSize;
    if (t) {
      this.d8m?.GetRootItem()?.SetWidth(t.X);
      this.d8m?.GetRootItem()?.SetHeight(t.Y);
    }
  }
  async M8m() {
    if (!this.d8m) {
      this.d8m = new AutoPilotLineComponent();
      this.aHf = this.d8m.CreateThenShowByResourceIdAsync("UiItem_AutoPilot_Line", this.Map.GetRootItem());
    }
    await this.aHf;
  }
  CheckAutoPilotLineInfo() {
    this.lHf();
  }
  async lHf() {
    await this.M8m();
    this.Vgg();
    this.RefreshFindPathLine();
    this.Agf();
    this._Hf();
  }
  Destroy() {
    if (this.d8m) {
      this.d8m.SkipDestroyActor = false;
      this.d8m.Destroy();
      this.d8m = undefined;
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateAutoPilotLine, this.hHf);
  }
  RefreshFindPathLine() {
    var t = ModelManager_1.ModelManager.AutoPilotModel?.GetFindPathResult();
    if (!t || t.MapId !== this.Map.MapId && t.MapId !== 105) {
      this.d8m?.FindPathRoot?.SetUIActive(false);
    } else {
      this.d8m?.FindPathRoot?.SetUIActive(true);
      this.SetScale();
      this.T8m(t);
      this.b8m(t);
      this.R8m(t);
      this.w8m(t);
      this.L8m(t);
      this.Dgf(t);
    }
  }
  T8m(t) {
    var i = ModelManager_1.ModelManager.WorldMapModel.MapScale <= ModelManager_1.ModelManager.WorldMapModel.MapScaleMin && this.Map.MapType === 2;
    if (!t.GetIsShowStartPoint() || i) {
      this.d8m?.StartPoint?.SetUIActive(false);
    } else {
      this.d8m?.StartPoint?.SetUIActive(true);
      this.CTn.Set(t.StartPoint.X, t.StartPoint.Y);
      MapUtil_1.MapUtil.WorldPosition2UiPosition2D(this.CTn, this.m8m);
      this.d8m?.StartPoint?.SetAnchorOffset(this.m8m.ToUeVector2D(true));
      this.d8m?.StartPoint?.SetUIItemScale(this.nz.ToUeVectorOld(true));
    }
  }
  b8m(t) {
    var i = ModelManager_1.ModelManager.WorldMapModel.MapScale <= ModelManager_1.ModelManager.WorldMapModel.MapScaleMin && this.Map.MapType === 2;
    if (!t.GetIsShowEndPoint() || i) {
      this.d8m?.EndPoint?.SetUIActive(false);
    } else {
      this.d8m?.EndPoint?.SetUIActive(true);
      this.CTn.Set(t.EndPoint.X, t.EndPoint.Y);
      MapUtil_1.MapUtil.WorldPosition2UiPosition2D(this.CTn, this.C8m);
      this.d8m?.EndPoint?.SetAnchorOffset(this.C8m.ToUeVector2D(true));
      this.d8m?.EndPoint?.SetUIItemScale(this.nz.ToUeVectorOld(true));
    }
  }
  R8m(t) {
    if (t.GetIsShowPlayerToStartLine()) {
      this.d8m?.PlayerToStartLine?.SetUIActive(true);
      this.CTn.Set(t.PlayerPoint.X, t.PlayerPoint.Y);
      MapUtil_1.MapUtil.WorldPosition2UiPosition2D(this.CTn, this.f8m);
      this.d8m?.PlayerToStartLine?.SetAnchorOffset(this.f8m.ToUeVector2D(true));
      this.CTn.Set(t.StartPoint.X, t.StartPoint.Y);
      MapUtil_1.MapUtil.WorldPosition2UiPosition2D(this.CTn, this.m8m);
      t = Vector2D_1.Vector2D.Distance(this.f8m, this.m8m);
      t *= this.S8m;
      this.d8m?.PlayerToStartLine?.SetHeight(t);
      this.d8m?.PlayerToStartLine?.SetUIItemScale(this.nz.ToUeVectorOld(true));
      this.p8m.Yaw = Math.atan2(this.m8m.Y - this.f8m.Y, this.m8m.X - this.f8m.X) * MathUtils_1.MathUtils.RadToDeg - 90;
      this.d8m?.PlayerToStartLine?.SetUIRelativeRotation(this.p8m.ToUeRotator());
    } else {
      this.d8m?.PlayerToStartLine?.SetUIActive(false);
    }
  }
  w8m(t) {
    if (t.GetIsShowEndToTargetLine()) {
      this.d8m?.EndToTargetLine?.SetUIActive(true);
      this.CTn.Set(t.EndPoint.X, t.EndPoint.Y);
      MapUtil_1.MapUtil.WorldPosition2UiPosition2D(this.CTn, this.C8m);
      this.d8m?.EndToTargetLine?.SetAnchorOffset(this.C8m.ToUeVector2D(true));
      this.CTn.Set(t.TargetPoint.X, t.TargetPoint.Y);
      MapUtil_1.MapUtil.WorldPosition2UiPosition2D(this.CTn, this.g8m);
      t = Vector2D_1.Vector2D.Distance(this.C8m, this.g8m);
      t *= this.S8m;
      this.d8m?.EndToTargetLine?.SetHeight(t);
      this.d8m?.EndToTargetLine?.SetUIItemScale(this.nz.ToUeVectorOld(true));
      this.v8m.Yaw = Math.atan2(this.g8m.Y - this.C8m.Y, this.g8m.X - this.C8m.X) * MathUtils_1.MathUtils.RadToDeg - 90;
      this.d8m?.EndToTargetLine?.SetUIRelativeRotation(this.v8m.ToUeRotator());
    } else {
      this.d8m?.EndToTargetLine?.SetUIActive(false);
    }
  }
  L8m(t) {
    if (t.GetIsShowPlayerToTargetLine()) {
      this.d8m?.PlayerToTargetLine?.SetUIActive(true);
      this.CTn.Set(t.PlayerPoint.X, t.PlayerPoint.Y);
      MapUtil_1.MapUtil.WorldPosition2UiPosition2D(this.CTn, this.f8m);
      this.d8m?.PlayerToTargetLine?.SetAnchorOffset(this.f8m.ToUeVector2D(true));
      this.CTn.Set(t.TargetPoint.X, t.TargetPoint.Y);
      MapUtil_1.MapUtil.WorldPosition2UiPosition2D(this.CTn, this.g8m);
      t = Vector2D_1.Vector2D.Distance(this.f8m, this.g8m);
      t *= this.S8m;
      this.d8m?.PlayerToTargetLine?.SetHeight(t);
      this.d8m?.PlayerToTargetLine?.SetUIItemScale(this.nz.ToUeVectorOld(true));
      this.y8m.Yaw = Math.atan2(this.g8m.Y - this.f8m.Y, this.g8m.X - this.f8m.X) * MathUtils_1.MathUtils.RadToDeg - 90;
      this.d8m?.PlayerToTargetLine?.SetUIRelativeRotation(this.y8m.ToUeRotator());
    } else {
      this.d8m?.PlayerToTargetLine?.SetUIActive(false);
    }
  }
  Dgf(t) {
    if (t.GetIsShowHighLightLine()) {
      this.O_g.Start();
      this.d8m?.FindPathHighLightLine?.SetUIActive(true);
      this.d8m?.FindPathHighLightLine?.SetPoints(t.SplinePoints);
      this.O_g.Stop();
    } else {
      this.d8m?.FindPathHighLightLine?.SetUIActive(false);
    }
  }
  SetScale() {
    var t = this.Map.MapType === 1;
    var i = t ? 1 : ModelManager_1.ModelManager.WorldMapModel.MapScale;
    var t = t ? this.Map?.GetRootItem()?.RelativeScale3D.X ?? 1 : 1;
    this.S8m = i * t;
    var i = 1 / this.S8m;
    this.nz.Set(i, i, i);
  }
  Agf() {
    var t = ModelManager_1.ModelManager.AutoPilotModel?.GetCirclePathResult();
    if (!t || t.MapId !== this.Map.MapId && t.MapId !== 105) {
      this.d8m?.CirclePathRoot?.SetUIActive(false);
      this.d8m?.ResetCircleId();
    } else {
      this.d8m?.CirclePathRoot?.SetUIActive(true);
      this.Ugf(t);
      this.Zwf(t);
    }
  }
  Ugf(t) {
    this.d8m?.LoadCirclePathHighLightLine(t.CircleId);
  }
  Zwf(t) {
    if (!t || t.GetIsInCircle()) {
      this.d8m?.PathToCircleHighLightLine?.SetUIActive(false);
    } else {
      this.d8m?.PathToCircleHighLightLine?.SetUIActive(true);
      this.d8m?.PathToCircleHighLightLine?.SetPoints(t.PathToCircleSplinePoints);
    }
  }
  OnMiniMapTick() {
    this.CheckAutoPilotLineInfo();
  }
  DrawDebugLine(t) {
    this.d8m?.RecycleDebugLine();
    for (const h of t) {
      var i;
      var s = TransportNetworkController_1.TransportNetworkController.GetTransportSystem().GetRoadWay(h);
      if (s && s.RoadSpline) {
        i = UE.NewArray(UE.Vector2D);
        AutoPilotUtil_1.AutoPilotUtil.GenerateSingleSplinePoints(s.RoadSpline, i);
        this.d8m?.CreateDebugRoadLine(i);
      }
    }
  }
  DebugDrawCircle(t) {
    var i = [];
    for (const h of t) {
      var s = TransportNetworkController_1.TransportNetworkController.GetTransportSystem().GetRoadWay(h);
      if (s && s.RoadSpline) {
        i.push(s);
      }
    }
    t = UE.NewArray(UE.Vector2D);
    AutoPilotUtil_1.AutoPilotUtil.GenerateAllSplinePoints(i, t);
    this.d8m?.CreateDebugRoadLine(t);
  }
  _Hf() {
    if (this.Map.MapType === 2) {
      let t = undefined;
      if (ModelManager_1.ModelManager.AutoPilotModel.DebugCircleId !== 0) {
        if ((t = AutoPilotCirclesById_1.configAutoPilotCirclesById.GetConfig(ModelManager_1.ModelManager.AutoPilotModel.DebugCircleId)?.WaySplines) && t.length !== 0) {
          this.DebugDrawCircle(t);
          ModelManager_1.ModelManager.AutoPilotModel.DebugCircleId = 0;
          return;
        } else {
          return undefined;
        }
      }
      if ((t = ModelManager_1.ModelManager.AutoPilotModel?.DebugRoadWayIds) && t.length !== 0) {
        this.DrawDebugLine(t);
        ModelManager_1.ModelManager.AutoPilotModel.DebugRoadWayIds.length = 0;
      }
    }
  }
}
exports.AutoPilotLine = AutoPilotLine;
class AutoPilotLineComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.StartPoint = undefined;
    this.EndPoint = undefined;
    this.PlayerToStartLine = undefined;
    this.EndToTargetLine = undefined;
    this.PlayerToTargetLine = undefined;
    this.FindPathHighLightLine = undefined;
    this.FindPathRoot = undefined;
    this.CirclePathRoot = undefined;
    this.V_g = new Map();
    this.PathToCircleHighLightLine = undefined;
    this.DebugPathRoot = undefined;
    this.uHf = "/Game/Aki/UI/UIResources/UiWorldMap/Prefabs/UiItem_DebugHighLightLine.UiItem_DebugHighLightLine";
    this.cHf = [];
    this.dHf = [];
    this.O_g = Stats_1.Stat.Create("LoadCirclePathHighLightLine");
    this.CurrentCircleId = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
  }
  OnStart() {
    this.StartPoint = this.GetItem(4);
    this.EndPoint = this.GetItem(5);
    this.PlayerToStartLine = this.GetItem(0);
    this.EndToTargetLine = this.GetItem(1);
    this.PlayerToTargetLine = this.GetItem(2);
    this.FindPathHighLightLine = this.GetItem(3)?.GetOwner()?.GetComponentByClass(UE.UI2DLineRaw.StaticClass());
    this.FindPathRoot = this.GetItem(6);
    this.CirclePathRoot = this.GetItem(7);
    this.PathToCircleHighLightLine = this.GetItem(8)?.GetOwner()?.GetComponentByClass(UE.UI2DLineRaw.StaticClass());
    this.DebugPathRoot = this.GetItem(9);
  }
  async CreateDebugRoadLine(t) {
    let i = this.cHf.shift();
    var s;
    if (!i) {
      s = await LguiUtil_1.LguiUtil.LoadPrefabByAsync(this.uHf, this.DebugPathRoot);
      i = s?.GetComponentByClass(UE.UI2DLineRaw.StaticClass());
    }
    i.SetUIActive(true);
    i?.SetPoints(t);
  }
  RecycleDebugLine() {
    for (const t of this.dHf) {
      t.SetUIActive(false);
      this.cHf.push(t);
    }
    this.dHf.length = 0;
  }
  async LoadCirclePathHighLightLine(i) {
    if (this.CurrentCircleId !== i) {
      this.CurrentCircleId = i;
      for (const t of this.V_g.values()) {
        t.SetUIActive(false);
      }
      let t = this.V_g.get(i);
      if (!t) {
        var s = InfrAutoPilotCircleByAutoPilotCirclePathId_1.configInfrAutoPilotCircleByAutoPilotCirclePathId.GetConfig(i);
        if (!s) {
          return;
        }
        this.O_g.Start();
        s = await LguiUtil_1.LguiUtil.LoadPrefabByAsync(s.PrefabPath, this.CirclePathRoot);
        this.O_g.Stop();
        if (this.IsDestroy) {
          s?.K2_DestroyActor();
          return;
        }
        t = s?.GetComponentByClass(UE.UIItem.StaticClass());
        this.V_g.set(i, t);
      }
      t.SetUIActive(true);
    }
  }
  ResetCircleId() {
    this.CurrentCircleId = 0;
  }
  OnBeforeDestroy() {
    for (const t of this.dHf) {
      UE.LGUIBPLibrary.DestroyActorWithHierarchy(t.GetOwner());
    }
    for (const i of this.cHf) {
      UE.LGUIBPLibrary.DestroyActorWithHierarchy(i.GetOwner());
    }
    for (const s of this.V_g.values()) {
      UE.LGUIBPLibrary.DestroyActorWithHierarchy(s.GetOwner());
    }
    this.cHf.length = 0;
    this.dHf.length = 0;
    this.V_g.clear();
    this.ResetCircleId();
  }
}
exports.AutoPilotLineComponent = AutoPilotLineComponent;
//# sourceMappingURL=AutoPilotLine.js.map