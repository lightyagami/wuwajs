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
    this.h8m = undefined;
    this.ENf = undefined;
    this.CTn = Vector2D_1.Vector2D.Create();
    this.l8m = Vector2D_1.Vector2D.Create();
    this._8m = Vector2D_1.Vector2D.Create();
    this.u8m = Vector2D_1.Vector2D.Create();
    this.c8m = Vector2D_1.Vector2D.Create();
    this.d8m = Rotator_1.Rotator.Create();
    this.m8m = Rotator_1.Rotator.Create();
    this.f8m = Rotator_1.Rotator.Create();
    this.g8m = 1;
    this.nz = Vector_1.Vector.Create();
    this.LXf = Stats_1.Stat.Create("DrawFindPathHighLightLine");
    this.INf = () => {
      this.CheckAutoPilotLineInfo();
    };
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateAutoPilotLine, this.INf);
  }
  Kzf() {
    var t = this.Map.MapTileMgr?.TotalTileSize;
    if (t) {
      this.h8m?.GetRootItem()?.SetWidth(t.X);
      this.h8m?.GetRootItem()?.SetHeight(t.Y);
    }
  }
  async C8m() {
    if (!this.h8m) {
      this.h8m = new AutoPilotLineComponent();
      this.ENf = this.h8m.CreateThenShowByResourceIdAsync("UiItem_AutoPilot_Line", this.Map.GetRootItem());
    }
    await this.ENf;
  }
  CheckAutoPilotLineInfo() {
    this.TNf();
  }
  async TNf() {
    await this.C8m();
    this.Kzf();
    this.RefreshFindPathLine();
    this.cmf();
    this.bNf();
  }
  Destroy() {
    if (this.h8m) {
      this.h8m.SkipDestroyActor = false;
      this.h8m.Destroy();
      this.h8m = undefined;
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateAutoPilotLine, this.INf);
  }
  RefreshFindPathLine() {
    var t = ModelManager_1.ModelManager.AutoPilotModel?.GetFindPathResult();
    if (!t || t.MapId !== this.Map.MapId && t.MapId !== 105) {
      this.h8m?.FindPathRoot?.SetUIActive(false);
    } else {
      this.h8m?.FindPathRoot?.SetUIActive(true);
      this.SetScale();
      this.y8m(t);
      this.S8m(t);
      this.M8m(t);
      this.E8m(t);
      this.I8m(t);
      this.dmf(t);
    }
  }
  y8m(t) {
    var i = ModelManager_1.ModelManager.WorldMapModel.MapScale <= ModelManager_1.ModelManager.WorldMapModel.MapScaleMin && this.Map.MapType === 2;
    if (!t.GetIsShowStartPoint() || i) {
      this.h8m?.StartPoint?.SetUIActive(false);
    } else {
      this.h8m?.StartPoint?.SetUIActive(true);
      this.CTn.Set(t.StartPoint.X, t.StartPoint.Y);
      MapUtil_1.MapUtil.WorldPosition2UiPosition2D(this.CTn, this.l8m);
      this.h8m?.StartPoint?.SetAnchorOffset(this.l8m.ToUeVector2D(true));
      this.h8m?.StartPoint?.SetUIItemScale(this.nz.ToUeVectorOld(true));
    }
  }
  S8m(t) {
    var i = ModelManager_1.ModelManager.WorldMapModel.MapScale <= ModelManager_1.ModelManager.WorldMapModel.MapScaleMin && this.Map.MapType === 2;
    if (!t.GetIsShowEndPoint() || i) {
      this.h8m?.EndPoint?.SetUIActive(false);
    } else {
      this.h8m?.EndPoint?.SetUIActive(true);
      this.CTn.Set(t.EndPoint.X, t.EndPoint.Y);
      MapUtil_1.MapUtil.WorldPosition2UiPosition2D(this.CTn, this.c8m);
      this.h8m?.EndPoint?.SetAnchorOffset(this.c8m.ToUeVector2D(true));
      this.h8m?.EndPoint?.SetUIItemScale(this.nz.ToUeVectorOld(true));
    }
  }
  M8m(t) {
    if (t.GetIsShowPlayerToStartLine()) {
      this.h8m?.PlayerToStartLine?.SetUIActive(true);
      this.CTn.Set(t.PlayerPoint.X, t.PlayerPoint.Y);
      MapUtil_1.MapUtil.WorldPosition2UiPosition2D(this.CTn, this._8m);
      this.h8m?.PlayerToStartLine?.SetAnchorOffset(this._8m.ToUeVector2D(true));
      this.CTn.Set(t.StartPoint.X, t.StartPoint.Y);
      MapUtil_1.MapUtil.WorldPosition2UiPosition2D(this.CTn, this.l8m);
      t = Vector2D_1.Vector2D.Distance(this._8m, this.l8m);
      t *= this.g8m;
      this.h8m?.PlayerToStartLine?.SetHeight(t);
      this.h8m?.PlayerToStartLine?.SetUIItemScale(this.nz.ToUeVectorOld(true));
      this.d8m.Yaw = Math.atan2(this.l8m.Y - this._8m.Y, this.l8m.X - this._8m.X) * MathUtils_1.MathUtils.RadToDeg - 90;
      this.h8m?.PlayerToStartLine?.SetUIRelativeRotation(this.d8m.ToUeRotator());
    } else {
      this.h8m?.PlayerToStartLine?.SetUIActive(false);
    }
  }
  E8m(t) {
    if (t.GetIsShowEndToTargetLine()) {
      this.h8m?.EndToTargetLine?.SetUIActive(true);
      this.CTn.Set(t.EndPoint.X, t.EndPoint.Y);
      MapUtil_1.MapUtil.WorldPosition2UiPosition2D(this.CTn, this.c8m);
      this.h8m?.EndToTargetLine?.SetAnchorOffset(this.c8m.ToUeVector2D(true));
      this.CTn.Set(t.TargetPoint.X, t.TargetPoint.Y);
      MapUtil_1.MapUtil.WorldPosition2UiPosition2D(this.CTn, this.u8m);
      t = Vector2D_1.Vector2D.Distance(this.c8m, this.u8m);
      t *= this.g8m;
      this.h8m?.EndToTargetLine?.SetHeight(t);
      this.h8m?.EndToTargetLine?.SetUIItemScale(this.nz.ToUeVectorOld(true));
      this.m8m.Yaw = Math.atan2(this.u8m.Y - this.c8m.Y, this.u8m.X - this.c8m.X) * MathUtils_1.MathUtils.RadToDeg - 90;
      this.h8m?.EndToTargetLine?.SetUIRelativeRotation(this.m8m.ToUeRotator());
    } else {
      this.h8m?.EndToTargetLine?.SetUIActive(false);
    }
  }
  I8m(t) {
    if (t.GetIsShowPlayerToTargetLine()) {
      this.h8m?.PlayerToTargetLine?.SetUIActive(true);
      this.CTn.Set(t.PlayerPoint.X, t.PlayerPoint.Y);
      MapUtil_1.MapUtil.WorldPosition2UiPosition2D(this.CTn, this._8m);
      this.h8m?.PlayerToTargetLine?.SetAnchorOffset(this._8m.ToUeVector2D(true));
      this.CTn.Set(t.TargetPoint.X, t.TargetPoint.Y);
      MapUtil_1.MapUtil.WorldPosition2UiPosition2D(this.CTn, this.u8m);
      t = Vector2D_1.Vector2D.Distance(this._8m, this.u8m);
      t *= this.g8m;
      this.h8m?.PlayerToTargetLine?.SetHeight(t);
      this.h8m?.PlayerToTargetLine?.SetUIItemScale(this.nz.ToUeVectorOld(true));
      this.f8m.Yaw = Math.atan2(this.u8m.Y - this._8m.Y, this.u8m.X - this._8m.X) * MathUtils_1.MathUtils.RadToDeg - 90;
      this.h8m?.PlayerToTargetLine?.SetUIRelativeRotation(this.f8m.ToUeRotator());
    } else {
      this.h8m?.PlayerToTargetLine?.SetUIActive(false);
    }
  }
  dmf(t) {
    if (t.GetIsShowHighLightLine()) {
      this.LXf.Start();
      this.h8m?.FindPathHighLightLine?.SetUIActive(true);
      this.h8m?.FindPathHighLightLine?.SetPoints(t.SplinePoints);
      this.LXf.Stop();
    } else {
      this.h8m?.FindPathHighLightLine?.SetUIActive(false);
    }
  }
  SetScale() {
    var t = this.Map.MapType === 1;
    var i = t ? 1 : ModelManager_1.ModelManager.WorldMapModel.MapScale;
    var t = t ? this.Map?.GetRootItem()?.RelativeScale3D.X ?? 1 : 1;
    this.g8m = i * t;
    var i = 1 / this.g8m;
    this.nz.Set(i, i, i);
  }
  cmf() {
    var t = ModelManager_1.ModelManager.AutoPilotModel?.GetCirclePathResult();
    if (!t || t.MapId !== this.Map.MapId && t.MapId !== 105) {
      this.h8m?.CirclePathRoot?.SetUIActive(false);
      this.h8m?.ResetCircleId();
    } else {
      this.h8m?.CirclePathRoot?.SetUIActive(true);
      this.mmf(t);
      this.MIf(t);
    }
  }
  mmf(t) {
    this.h8m?.LoadCirclePathHighLightLine(t.CircleId);
  }
  MIf(t) {
    if (!t || t.GetIsInCircle()) {
      this.h8m?.PathToCircleHighLightLine?.SetUIActive(false);
    } else {
      this.h8m?.PathToCircleHighLightLine?.SetUIActive(true);
      this.h8m?.PathToCircleHighLightLine?.SetPoints(t.PathToCircleSplinePoints);
    }
  }
  OnMiniMapTick() {
    this.CheckAutoPilotLineInfo();
  }
  DrawDebugLine(t) {
    this.h8m?.RecycleDebugLine();
    for (const h of t) {
      var i;
      var s = TransportNetworkController_1.TransportNetworkController.GetTransportSystem().GetRoadWay(h);
      if (s && s.RoadSpline) {
        i = UE.NewArray(UE.Vector2D);
        AutoPilotUtil_1.AutoPilotUtil.GenerateSingleSplinePoints(s.RoadSpline, i);
        this.h8m?.CreateDebugRoadLine(i);
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
    this.h8m?.CreateDebugRoadLine(t);
  }
  bNf() {
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
    this.DXf = new Map();
    this.PathToCircleHighLightLine = undefined;
    this.DebugPathRoot = undefined;
    this.RNf = "/Game/Aki/UI/UIResources/UiWorldMap/Prefabs/UiItem_DebugHighLightLine.UiItem_DebugHighLightLine";
    this.LNf = [];
    this.wNf = [];
    this.LXf = Stats_1.Stat.Create("LoadCirclePathHighLightLine");
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
    let i = this.LNf.shift();
    var s;
    if (!i) {
      s = await LguiUtil_1.LguiUtil.LoadPrefabByAsync(this.RNf, this.DebugPathRoot);
      i = s?.GetComponentByClass(UE.UI2DLineRaw.StaticClass());
    }
    i.SetUIActive(true);
    i?.SetPoints(t);
  }
  RecycleDebugLine() {
    for (const t of this.wNf) {
      t.SetUIActive(false);
      this.LNf.push(t);
    }
    this.wNf.length = 0;
  }
  async LoadCirclePathHighLightLine(i) {
    if (this.CurrentCircleId !== i) {
      this.CurrentCircleId = i;
      for (const t of this.DXf.values()) {
        t.SetUIActive(false);
      }
      let t = this.DXf.get(i);
      if (!t) {
        var s = InfrAutoPilotCircleByAutoPilotCirclePathId_1.configInfrAutoPilotCircleByAutoPilotCirclePathId.GetConfig(i);
        if (!s) {
          return;
        }
        this.LXf.Start();
        s = await LguiUtil_1.LguiUtil.LoadPrefabByAsync(s.PrefabPath, this.CirclePathRoot);
        this.LXf.Stop();
        if (this.IsDestroy) {
          s?.K2_DestroyActor();
          return;
        }
        t = s?.GetComponentByClass(UE.UIItem.StaticClass());
        this.DXf.set(i, t);
      }
      t.SetUIActive(true);
    }
  }
  ResetCircleId() {
    this.CurrentCircleId = 0;
  }
  OnBeforeDestroy() {
    for (const t of this.wNf) {
      UE.LGUIBPLibrary.DestroyActorWithHierarchy(t.GetOwner());
    }
    for (const i of this.LNf) {
      UE.LGUIBPLibrary.DestroyActorWithHierarchy(i.GetOwner());
    }
    for (const s of this.DXf.values()) {
      UE.LGUIBPLibrary.DestroyActorWithHierarchy(s.GetOwner());
    }
    this.LNf.length = 0;
    this.wNf.length = 0;
    this.DXf.clear();
    this.ResetCircleId();
  }
}
exports.AutoPilotLineComponent = AutoPilotLineComponent;
//# sourceMappingURL=AutoPilotLine.js.map