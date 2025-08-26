"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const Stats_1 = require("../../../../Core/Common/Stats");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TWEEN_DURATION = 0.1;
class TsTowerDefenseEventActor extends UE.KuroGridLevelActor {
  constructor() {
    super(...arguments);
    this.TrapData = undefined;
    this.PrefabPath = "";
    this.TrapSize = Vector2D_1.Vector2D.Create(0, 0);
    this.Coords = Vector2D_1.Vector2D.Create(0, 0);
    this.CurrentLayerStates = new Map();
    this.IsVisibleInternal = false;
    this.IsPreRemove = false;
    this.PositionTweener = undefined;
    this.RotationTweener = undefined;
  }
  Constructor() {
    this.TrapData = undefined;
    this.PrefabPath = "";
    this.TrapSize = Vector2D_1.Vector2D.Create(0, 0);
    this.Coords = Vector2D_1.Vector2D.Create(0, 0);
    this.CurrentLayerStates = new Map();
    this.IsVisibleInternal = false;
    this.IsPreRemove = false;
    this.PositionTweener = undefined;
    this.RotationTweener = undefined;
  }
  static GetTrapActor(e) {
    return TsTowerDefenseEventActor.AllTrapActors.get(e);
  }
  static UpdateTrapRangeState() {
    TsTowerDefenseEventActor.AllTrapActors.forEach(e => {
      e.UpdateRangeState();
    });
  }
  get IsVisible() {
    return this.IsVisibleInternal;
  }
  GetTapModel() {
    return this.TrapData;
  }
  Init(e, t) {
    this.TrapData = e;
    this.UpdateGridLevel();
    var s = e;
    let r = this.OccupiedGrid?.IsValid();
    if (!!r && (!e.IsValid() || !this.TrapSize.Equals(e.GridSize) || this.OccupiedGrid !== t || !this.Coords.Equals(s.Coords))) {
      this.OccupiedGrid.UnoccupyTarget(this);
      r = false;
    }
    if (e.IsValid()) {
      if (!r && t) {
        TsTowerDefenseEventActor.BuildingGridCellVectorTemp.X = s.Coords.X;
        TsTowerDefenseEventActor.BuildingGridCellVectorTemp.Y = s.Coords.Y;
        if (!t.OccupyTarget(TsTowerDefenseEventActor.BuildingGridCellVectorTemp, this, e.Degree)) {
          return "占用格子失败";
        }
        this.Coords.Set(s.Coords.X, s.Coords.Y);
      }
      this.Built();
      TsTowerDefenseEventActor.AllTrapActors.set(e.Uid, this);
    } else {
      this.Hide();
    }
  }
  Destroy(e) {
    if (this.OccupiedGrid?.IsValid()) {
      this.OccupiedGrid.UnoccupyTarget(this);
    }
    if (this.TrapData?.IsValid()) {
      TsTowerDefenseEventActor.AllTrapActors.delete(this.TrapData.Uid);
    }
    this.TrapData = undefined;
    this.UpdateGridLevel();
    this.Coords.Set(0, 0);
    ActorSystem_1.ActorSystem.Put(e, this, TsTowerDefenseEventActor.ClearPooledActor);
  }
  UpdateGridLevel() {
    let e = "";
    let t = 0;
    let s = 0;
    var r;
    if (this.TrapData) {
      e = this.TrapData.PrefabPath;
      t = this.TrapData.GridSize.X;
      s = this.TrapData.GridSize.Y;
    }
    if (this.PrefabPath !== e || this.TrapSize.X !== t || this.TrapSize.Y !== s) {
      this.PrefabPath = e;
      this.TrapSize.Set(t, s);
      TsTowerDefenseEventActor.BuildingGridCellVectorTemp.X = t;
      TsTowerDefenseEventActor.BuildingGridCellVectorTemp.Y = s;
      r = UE.KismetSystemLibrary.MakeSoftObjectPath(e);
      r = UE.KismetSystemLibrary.Conv_SoftObjPathToSoftObjRef(r);
      this.Initialize(r, TsTowerDefenseEventActor.BuildingGridCellVectorTemp);
    }
  }
  UpdateBuildState(e, t, s, r, o, n) {
    TsTowerDefenseEventActor.UpdateBuildStateStat.Start();
    this.UpdateBuildPosition(r, o);
    let i = 0;
    if (ModelManager_1.ModelManager.TowerDefenseEventModel.ValidateBuildTrap(this.TrapData)) {
      r = this.GetPollutedCellNum(e, t, s);
      if ((n.PollutedNum = r) > 0) {
        i = 2;
        if (ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetCurrentPurificationItemCount() >= r) {
          i |= 1;
        }
      } else {
        i = 1;
      }
    }
    o = (i & 1) == 1;
    e = o ? TsTowerDefenseEventActor.HaveMoney : TsTowerDefenseEventActor.NoMoney;
    this.SetMaterialState(e);
    this.SetNormalState(TsTowerDefenseEventActor.Preview);
    t = o ? TsTowerDefenseEventActor.HaveMoneyRange : TsTowerDefenseEventActor.NoMoneyRange;
    this.SetRangeState(t);
    TsTowerDefenseEventActor.UpdateBuildStateStat.Stop();
    return i;
  }
  UpdateBuildPosition(s, r) {
    if (this.TrapData) {
      let e = false;
      let t = false;
      var o;
      if (!this.IsVisibleInternal || !(e = !this.TrapData.Position.Equals(s), t = !this.TrapData.Rotation.Equals(r), !e) || !!t) {
        if (this.IsVisibleInternal) {
          if (e) {
            this.PositionTweener?.Kill();
            o = MathUtils_1.MathUtils.CommonTempVector;
            ControllerHolder_1.ControllerHolder.WorldController.ToWorldRelativeLocation(s, o);
            this.PositionTweener = UE.LTweenBPLibrary.WorldPositionTo(this.RootComponent, o.ToUeVectorOld(), TWEEN_DURATION);
          }
          if (t) {
            this.RotationTweener?.Kill();
            this.RotationTweener = UE.LTweenBPLibrary.WorldRotatorTo(this.RootComponent, r.ToUeRotator(), true, TWEEN_DURATION);
          }
        } else {
          this.D_K2_SetActorLocationAndRotation(s.ToUeVector(), r.ToUeRotator(), false, undefined, false);
        }
      }
    }
  }
  GetPollutedCellNum(s, r, e) {
    var o;
    var n = s.GetBuildingGridGuidString();
    var i = TsTowerDefenseEventActor.GridSizeTemp;
    this.UpdateSizeByDegree(i, e);
    var T = TsTowerDefenseEventActor.BuildingGridCellVectorTemp;
    var h = new Set();
    for (let t = 0; t < i.Y; t++) {
      for (let e = 0; e < i.X; e++) {
        T.X = r.X + e;
        T.Y = r.Y + t;
        if (s.GetCellIndex(T, TsTowerDefenseEventActor.GridCellIndex) && (o = ModelManager_1.ModelManager.BuildingGridModel.IsCellPolluted(n, (0, puerts_1.$unref)(TsTowerDefenseEventActor.GridCellIndex))) > 0) {
          h.add(o);
        }
      }
    }
    return h.size;
  }
  UpdateSizeByDegree(e, t) {
    var s = this.TrapData.GridSize;
    if (t > 45 && t < 135 || t > -135 && t < -45) {
      e.X = s.Y;
      e.Y = s.X;
    } else {
      e.X = s.X;
      e.Y = s.Y;
    }
  }
  PrepareRemove() {
    this.IsPreRemove = true;
    if (this.IsLevelShown()) {
      this.SetMaterialState(TsTowerDefenseEventActor.PreviewRemove);
    }
  }
  OnLevelShown() {
    super.OnLevelShown();
    if (this.IsPreRemove) {
      this.PrepareRemove();
    }
  }
  ResetRemove() {
    this.IsPreRemove = false;
    this.SetMaterialState(TsTowerDefenseEventActor.Normal);
  }
  Hide() {
    this.SetRangeState(TsTowerDefenseEventActor.Attack);
    this.SetMaterialState(TsTowerDefenseEventActor.Normal);
    this.SetNormalState(TsTowerDefenseEventActor.Hidden);
  }
  Built() {
    this.SetMaterialState(TsTowerDefenseEventActor.Normal);
    this.SetNormalState(TsTowerDefenseEventActor.Idle);
    this.UpdateRangeState();
  }
  SetNormalState(e) {
    this.CurrentLayerStates.set(TsTowerDefenseEventActor.NormalLayer, e);
    this.SetLayerState(TsTowerDefenseEventActor.NormalLayer, e);
    this.IsVisibleInternal = e !== TsTowerDefenseEventActor.Hidden;
    if (!this.IsVisibleInternal) {
      this.PositionTweener?.Kill();
      this.PositionTweener = undefined;
      this.RotationTweener?.Kill();
      this.RotationTweener = undefined;
    }
  }
  SetMaterialState(e) {
    if (this.CurrentLayerStates.has(TsTowerDefenseEventActor.MaterialLayer) && this.CurrentLayerStates.get(TsTowerDefenseEventActor.MaterialLayer) === e) {
      return;
    }
    this.CurrentLayerStates.set(TsTowerDefenseEventActor.MaterialLayer, e);
    this.SetLayerState(TsTowerDefenseEventActor.MaterialLayer, e);
  }
  UpdateRangeState() {
    var e;
    if (this.TrapData?.IsValid()) {
      e = ControllerHolder_1.ControllerHolder.TowerDefenseEventController.IsFighting() ? TsTowerDefenseEventActor.Attack : TsTowerDefenseEventActor.HaveMoneyRange;
      this.SetRangeState(e);
    }
  }
  SetRangeState(e) {
    if (this.CurrentLayerStates.has(TsTowerDefenseEventActor.RangeLayer) && this.CurrentLayerStates.get(TsTowerDefenseEventActor.RangeLayer) === e) {
      return;
    }
    this.CurrentLayerStates.set(TsTowerDefenseEventActor.RangeLayer, e);
    this.SetLayerState(TsTowerDefenseEventActor.RangeLayer, e);
  }
}
TsTowerDefenseEventActor.UpdateBuildStateStat = Stats_1.Stat.Create("TsTowerDefenseEventActor.UpdateBuildState");
TsTowerDefenseEventActor.NormalLayer = FNameUtil_1.FNameUtil.GetDynamicFName("NormalLayer");
TsTowerDefenseEventActor.Preview = FNameUtil_1.FNameUtil.GetDynamicFName("Preview");
TsTowerDefenseEventActor.Idle = FNameUtil_1.FNameUtil.GetDynamicFName("Idle");
TsTowerDefenseEventActor.Hidden = FNameUtil_1.FNameUtil.GetDynamicFName("Hidden");
TsTowerDefenseEventActor.MaterialLayer = FNameUtil_1.FNameUtil.GetDynamicFName("MaterialLayer");
TsTowerDefenseEventActor.Normal = FNameUtil_1.FNameUtil.GetDynamicFName("Normal");
TsTowerDefenseEventActor.HaveMoney = FNameUtil_1.FNameUtil.GetDynamicFName("HaveMoney");
TsTowerDefenseEventActor.NoMoney = FNameUtil_1.FNameUtil.GetDynamicFName("NoMoney");
TsTowerDefenseEventActor.PreviewRemove = FNameUtil_1.FNameUtil.GetDynamicFName("PreviewRemove");
TsTowerDefenseEventActor.RangeLayer = FNameUtil_1.FNameUtil.GetDynamicFName("RangeLayer");
TsTowerDefenseEventActor.Attack = FNameUtil_1.FNameUtil.GetDynamicFName("Attack");
TsTowerDefenseEventActor.HaveMoneyRange = FNameUtil_1.FNameUtil.GetDynamicFName("HaveMoneyRange");
TsTowerDefenseEventActor.NoMoneyRange = FNameUtil_1.FNameUtil.GetDynamicFName("NoMoneyRange");
TsTowerDefenseEventActor.BuildingGridCellVectorTemp = new UE.KuroBuildingGridCellVector();
TsTowerDefenseEventActor.GridSizeTemp = Vector2D_1.Vector2D.Create(0, 0);
TsTowerDefenseEventActor.GridCellIndex = (0, puerts_1.$ref)(0);
TsTowerDefenseEventActor.AllTrapActors = new Map();
TsTowerDefenseEventActor.ClearPooledActor = e => {
  UE.KuroActorManager.ClearAcquiredComponents(e);
  UE.KuroActorManager.ResetDelegates(e);
  e.K2_DetachFromActor();
  e.SetActorHiddenInGame(true);
  var t = e.K2_GetComponentsByClass(UE.ActorComponent.StaticClass());
  for (let e = 0; e < t.Num(); e++) {
    UE.KuroActorManager.UnregisterComponent(t.Get(e));
  }
  e.SetActorTickEnabled(false);
  e.SetActorEnableCollision(false);
};
exports.default = TsTowerDefenseEventActor; //# sourceMappingURL=TsTowerDefenseEventActor.js.map