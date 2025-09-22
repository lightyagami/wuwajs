"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseEventRaycastResult = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const TowerDefenseEventUtility_1 = require("./TowerDefenseEventUtility");
const RAYCAST_DISTANCE = 10000;
class TowerDefenseEventRaycastResult {
  constructor() {
    this.dku = new UE.KuroBuildingGridRaycastResult();
    this.Start = Vector_1.Vector.Create();
    this.End = Vector_1.Vector.Create();
    this.Target = undefined;
    this.RaycastTarget = undefined;
    this.Grid = undefined;
    this.Location = Vector_1.Vector.Create();
    this.Rotation = Rotator_1.Rotator.Create();
    this.Coords = Vector2D_1.Vector2D.Create(0, 0);
    this.Degree = 0;
    this.Normal = Vector_1.Vector.Create();
    this.PlacementType = 1;
    this.IsStateDirty = false;
    this.IsInvalidPlacement = false;
    this.IsCanPlace = false;
    this.IsCanBuild = false;
    this.IsPolluted = false;
    this.PollutedNum = 0;
    this.IsCanRecycle = false;
  }
  Raycast(t, i, s, e) {
    this.Start.DeepCopy(ModelManager_1.ModelManager.CameraModel.CameraLocation);
    ModelManager_1.ModelManager.CameraModel.CameraRotator.Vector(this.End);
    this.End.MultiplyEqual(RAYCAST_DISTANCE);
    this.End.AdditionEqual(this.Start);
    this.PlacementType = i;
    this.dku.Target = t;
    this.dku.DegreeAlongNormal = s;
    i = (this.dku.RaycastTarget = undefined, puerts_1.$ref)(this.dku);
    s = UE.KuroBuildingGridSubsystem.K2_RaycastGrid(GlobalData_1.GlobalData.World, this.Start.ToUeVector(), this.End.ToUeVector(), i);
    if (s) {
      this.dku = (0, puerts_1.$unref)(i);
      this.Target = this.dku.Target;
      this.RaycastTarget = this.dku.RaycastTarget;
      this.Grid = this.dku.Grid;
      this.Location.DeepCopy(this.dku.Location);
      this.Rotation.DeepCopy(this.dku.Rotation.Rotator());
      this.Coords.Set(this.dku.Coords.X, this.dku.Coords.Y);
      this.Degree = this.dku.DegreeAlongNormal;
      this.Normal.DeepCopy(this.dku.Normal);
      this.IsStateDirty = this.Z$u(t, e);
    } else {
      this.Reset();
    }
    return s;
  }
  Reset() {
    this.dku.Target = undefined;
    this.dku.RaycastTarget = undefined;
    this.Target = undefined;
    this.RaycastTarget = undefined;
    this.Grid = undefined;
    this.Location.Set(0, 0, 0);
    this.Rotation.Set(0, 0, 0);
    this.Coords.Set(0, 0);
    this.Degree = 0;
    this.Normal.Set(0, 0, 0);
    this.IsStateDirty = this.Z$u(this.Target, false);
  }
  Z$u(t, i) {
    t = this.tKc(t);
    i = this.iKc(i);
    return t || i;
  }
  tKc(t) {
    let i = false;
    let s = false;
    let e = false;
    let h = false;
    this.PollutedNum = 0;
    if (t && t === this.Target) {
      if (TowerDefenseEventUtility_1.TowerDefenseEventUtility.ValidatePlacementWithGridNormal(this.PlacementType, this.Normal)) {
        s = true;
        t = t.UpdateBuildState(this.Grid, this.Coords, this.Degree, this.Location, this.Rotation, this);
        e = (t & 1) == 1;
        h = (t & 2) == 2;
      } else {
        i = true;
      }
    }
    t = this.IsInvalidPlacement !== i || this.IsCanPlace !== s || this.IsCanBuild !== e || this.IsPolluted !== h;
    this.IsInvalidPlacement = i;
    this.IsCanPlace = s;
    this.IsCanBuild = e;
    this.IsPolluted = h;
    return t;
  }
  iKc(t) {
    var t = t && !!this.RaycastTarget;
    var i = this.IsCanRecycle !== t;
    this.IsCanRecycle = t;
    return i;
  }
}
exports.TowerDefenseEventRaycastResult = TowerDefenseEventRaycastResult;
//# sourceMappingURL=TowerDefenseEventRaycastResult.js.map