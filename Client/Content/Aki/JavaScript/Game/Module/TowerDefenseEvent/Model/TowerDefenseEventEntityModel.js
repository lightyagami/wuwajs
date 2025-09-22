"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseEventEntityModelBuilder = exports.TowerDefenseEventSpecialCellModel = exports.TowerDefenseEventTrapModel = exports.TowerDefenseEventMonsterModel = exports.TowerDefenseEventEntityModel = exports.LandFireExtraInfo = exports.CombatExtraInfoBase = exports.isTypeOfConfigInfo = exports.isTypeOfMonsterInfo = exports.isTypeOfTrapInfo = exports.isTypeOfTrapBaseInfo = exports.isTypeOfSpecialCellBaseInfo = undefined;
const Pool_1 = require("../../../../Core/Container/Pool");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TowerDefenseEventUtility_1 = require("../TowerDefenseEventUtility");
const ENTITY_POOL_SIZE = 100;
function isTypeOfSpecialCellBaseInfo(e) {
  return e && typeof e.CellType == "number";
}
function isTypeOfTrapBaseInfo(e) {
  return e && typeof e.TrapId == "number" && typeof e.Level == "number" && typeof e.GridSize == "object";
}
function isTypeOfTrapInfo(e) {
  return e && typeof e.GridId == "string" && typeof e.Coords == "object" && typeof e.Degree == "number";
}
function isTypeOfMonsterInfo(e) {
  return e && typeof e.ConfigId == "number" && typeof e.DeathType == "number" && typeof e.BuffRadius == "number" && typeof e.PolluteRadius == "number";
}
function isTypeOfConfigInfo(e) {
  return e && typeof e.ConfigId == "number";
}
exports.isTypeOfSpecialCellBaseInfo = isTypeOfSpecialCellBaseInfo;
exports.isTypeOfTrapBaseInfo = isTypeOfTrapBaseInfo;
exports.isTypeOfTrapInfo = isTypeOfTrapInfo;
exports.isTypeOfMonsterInfo = isTypeOfMonsterInfo;
exports.isTypeOfConfigInfo = isTypeOfConfigInfo;
class TowerDefenseEventEntityBaseModel {
  static BuildModel(e, t) {}
  static Clear() {}
}
class CombatExtraInfoBase {}
class LandFireExtraInfo extends (exports.CombatExtraInfoBase = CombatExtraInfoBase) {
  constructor() {
    super(...arguments);
    this.Params = undefined;
  }
}
exports.LandFireExtraInfo = LandFireExtraInfo;
class TowerDefenseEventEntityModel extends TowerDefenseEventEntityBaseModel {
  constructor() {
    super(...arguments);
    this.Uid = 0;
    this.OwnerId = 0;
    this.TemplateId = 0;
    this.CombatId = 0;
    this.SubTypeId = 0;
    this.PrefabPath = undefined;
    this.AssetPath = undefined;
    this.PropertyId = 0;
    this.SplineId = undefined;
    this.BuffIdLayers = undefined;
    this.Position = Vector_1.Vector.Create(0, 0, 0);
    this.Rotation = Rotator_1.Rotator.Create(0, 0, 0);
    this.ExtraInfo = undefined;
  }
  static BuildModel(t, s) {
    if (s.has("sEu")) {
      let e = this.NNu.Get();
      (e = e || this.NNu.Create()).InitFromProto(t, s);
      return e;
    }
  }
  static Clear() {
    this.NNu.Clear();
  }
  InitFromProto(e, t) {
    t = t.get("sEu").sEu;
    this.Uid = MathUtils_1.MathUtils.LongToNumber(e.s5n);
    this.OwnerId = MathUtils_1.MathUtils.LongToNumber(e.JE_);
    this.TemplateId = e.v9n;
    this.CombatId = 0;
    this.SubTypeId = t.aEu;
    this.PrefabPath = undefined;
    this.AssetPath = undefined;
    this.PropertyId = 0;
    this.BuffIdLayers = t.JHu;
    if (t.XDd) {
      this.SplineId = t.XDd.v9n;
    }
    t = e.l8n;
    if (t) {
      this.Position.Set(t.X, t.Y, t.Z);
    }
    t = e._8n;
    if (t) {
      this.Rotation.Set(t.Pitch, t.Yaw, t.Roll);
    }
  }
  Update(e) {
    this.Uid = e.Uid;
    this.OwnerId = e.OwnerId;
    this.TemplateId = e.TemplateId;
    this.CombatId = e.CombatId;
    this.SubTypeId = e.SubTypeId;
    this.PrefabPath = e.PrefabPath;
    this.AssetPath = e.AssetPath;
    this.PropertyId = e.PropertyId;
    this.SplineId = e.SplineId;
    this.BuffIdLayers = e.BuffIdLayers;
    this.Position.Set(e.Position.X, e.Position.Y, e.Position.Z);
    this.Rotation.Set(e.Rotation.Pitch, e.Rotation.Yaw, e.Rotation.Roll);
  }
  IsValid() {
    return this.Uid > 0;
  }
  Reset() {
    this.Uid = 0;
    this.OwnerId = 0;
    this.TemplateId = 0;
    this.CombatId = 0;
    this.SubTypeId = 0;
    this.PrefabPath = undefined;
    this.AssetPath = undefined;
    this.PropertyId = 0;
    this.SplineId = undefined;
    this.BuffIdLayers = undefined;
    this.Position.Set(0, 0, 0);
    this.Rotation.Set(0, 0, 0);
  }
  Release() {
    this.Reset();
    TowerDefenseEventEntityModel.NNu.Put(this);
  }
  Clone() {
    let e = TowerDefenseEventEntityModel.NNu.Get();
    (e = e || TowerDefenseEventEntityModel.NNu.Create()).Update(this);
    return e;
  }
}
(exports.TowerDefenseEventEntityModel = TowerDefenseEventEntityModel).NNu = new Pool_1.Pool(ENTITY_POOL_SIZE, () => new TowerDefenseEventEntityModel());
class TowerDefenseEventMonsterModel extends TowerDefenseEventEntityModel {
  constructor() {
    super(...arguments);
    this.ConfigId = 0;
    this.DeathType = 0;
    this.BuffRadius = 0;
    this.BuffIds = undefined;
    this.SpawnIds = undefined;
    this.PolluteRadius = 0;
  }
  static InitFromConfigId(e) {
    let t = this.pYu.Get();
    (t = t || this.pYu.Create()).ConfigId = e;
    return t;
  }
  static BuildModel(t, s) {
    if (s.has("sEu") && s.has("WVu") && s.get("WVu").WVu.SKu) {
      let e = this.pYu.Get();
      (e = e || this.pYu.Create()).InitFromProto(t, s);
      return e;
    }
  }
  static Clear() {
    this.pYu.Clear();
  }
  InitFromProto(e, t) {
    super.InitFromProto(e, t);
    e = t.get("WVu").WVu;
    this.ConfigId = e.SKu.v9n;
    this.DeathType = 0;
    this.BuffRadius = 0;
    this.BuffIds = undefined;
    this.SpawnIds = undefined;
    this.PolluteRadius = 0;
  }
  Update(e) {
    super.Update(e);
    if (isTypeOfMonsterInfo(e)) {
      this.ConfigId = e.ConfigId;
      this.DeathType = e.DeathType;
      this.BuffRadius = e.BuffRadius;
      this.BuffIds = e.BuffIds;
      this.SpawnIds = e.SpawnIds;
      this.PolluteRadius = e.PolluteRadius;
    } else {
      this.ConfigId = 0;
      this.DeathType = 0;
      this.BuffRadius = 0;
      this.BuffIds = undefined;
      this.SpawnIds = undefined;
      this.PolluteRadius = 0;
    }
  }
  Reset() {
    super.Reset();
    this.ConfigId = 0;
    this.DeathType = 0;
    this.BuffRadius = 0;
    this.BuffIds = undefined;
    this.SpawnIds = undefined;
    this.PolluteRadius = 0;
  }
  Release() {
    this.Reset();
    TowerDefenseEventMonsterModel.pYu.Put(this);
  }
  Clone() {
    let e = TowerDefenseEventMonsterModel.pYu.Get();
    (e = e || TowerDefenseEventMonsterModel.pYu.Create()).Update(this);
    return e;
  }
}
(exports.TowerDefenseEventMonsterModel = TowerDefenseEventMonsterModel).pYu = new Pool_1.Pool(ENTITY_POOL_SIZE, () => new TowerDefenseEventMonsterModel());
class TowerDefenseEventTrapModel extends TowerDefenseEventEntityModel {
  constructor() {
    super(...arguments);
    this.ConfigId = 0;
    this.TrapId = 0;
    this.Level = 0;
    this.BranchId = 0;
    this.DefaultCost = 0;
    this.DeconstructReturn = 0;
    this.GridSize = new Vector2D_1.Vector2D();
    this.PlacementType = 1;
    this.CanRotate = true;
    this.GridId = undefined;
    this.Coords = new Vector2D_1.Vector2D();
    this.Degree = 0;
  }
  static BuildModel(t, s) {
    if (s.has("sEu") && s.has("qfu") && s.has("WVu") && s.get("WVu").WVu.QVu) {
      let e = this.VNu.Get();
      (e = e || this.VNu.Create()).InitFromProto(t, s);
      return e;
    }
  }
  static Clear() {
    this.VNu.Clear();
  }
  static GetTrapModel(e) {
    let t = this.VNu.Get();
    (t = t || this.VNu.Create()).Update(e);
    return t;
  }
  InitFromProto(e, t) {
    super.InitFromProto(e, t);
    e = t.get("qfu").qfu;
    this.GridId = e.Gfu.bPu;
    this.Coords.Set(e.Gfu.iPs, e.Gfu.rPs);
    this.Degree = TowerDefenseEventUtility_1.TowerDefenseEventUtility.ConvertDirection2Degree(e.Gfu.Nfu);
    e = t.get("WVu").WVu;
    this.ConfigId = e.QVu.v9n;
    this.TrapId = 0;
    this.Level = e.QVu.a0d;
    this.BranchId = 0;
    this.DefaultCost = 0;
    this.DeconstructReturn = e.QVu.AJc;
    this.GridSize.Set(0, 0);
    this.PlacementType = 1;
    this.CanRotate = true;
  }
  Update(e) {
    super.Update(e);
    var t = e;
    if (isTypeOfTrapBaseInfo(t)) {
      this.ConfigId = t.ConfigId;
      this.TrapId = t.TrapId;
      this.Level = t.Level;
      this.BranchId = t.BranchId;
      this.DefaultCost = t.DefaultCost;
      this.GridSize.Set(t.GridSize.X, t.GridSize.Y);
      this.PlacementType = t.PlacementType;
      this.CanRotate = t.CanRotate;
      this.Degree = t.Degree;
    } else {
      this.ConfigId = 0;
      this.TrapId = 0;
      this.Level = 0;
      this.BranchId = 0;
      this.DefaultCost = 0;
      this.GridSize.Set(0, 0);
      this.PlacementType = 1;
      this.CanRotate = true;
      this.Degree = 0;
    }
    var t = e;
    if (isTypeOfTrapInfo(t)) {
      this.GridId = t.GridId;
      this.Coords.Set(t.Coords.X, t.Coords.Y);
    } else {
      this.GridId = undefined;
      this.Coords.Set(0, 0);
    }
  }
  UpdateTransform(e, t) {
    this.Position.Set(e.X, e.Y, e.Z);
    this.Rotation.Set(t.Pitch, t.Yaw, t.Roll);
  }
  UpdateData(e, t) {
    this.GridId = e;
    this.Coords.Set(t.X, t.Y);
  }
  Reset() {
    super.Reset();
    this.ConfigId = 0;
    this.TrapId = 0;
    this.Level = 0;
    this.BranchId = 0;
    this.DefaultCost = 0;
    this.GridSize.Set(0, 0);
    this.PlacementType = 1;
    this.CanRotate = true;
    this.GridId = undefined;
    this.Coords.Set(0, 0);
    this.Degree = 0;
  }
  Release() {
    this.Reset();
    TowerDefenseEventTrapModel.VNu.Put(this);
  }
  Clone() {
    let e = TowerDefenseEventTrapModel.VNu.Get();
    (e = e || TowerDefenseEventTrapModel.VNu.Create()).Update(this);
    return e;
  }
}
(exports.TowerDefenseEventTrapModel = TowerDefenseEventTrapModel).VNu = new Pool_1.Pool(ENTITY_POOL_SIZE, () => new TowerDefenseEventTrapModel());
class TowerDefenseEventSpecialCellModel extends TowerDefenseEventEntityModel {
  constructor() {
    super(...arguments);
    this.ConfigId = 0;
    this.CellType = 0;
    this.GridSize = new Vector2D_1.Vector2D();
    this.GridId = undefined;
    this.Coords = new Vector2D_1.Vector2D();
  }
  static BuildModel(t, s) {
    if (s.has("sEu") && s.has("qfu") && s.has("WVu") && s.get("WVu").WVu.Wrd) {
      let e = this.zud.Get();
      (e = e || this.zud.Create()).InitFromProto(t, s);
      return e;
    }
  }
  static Clear() {
    this.zud.Clear();
  }
  static GetSpecialCellModel(e) {
    let t = this.zud.Get();
    (t = t || this.zud.Create()).Update(e);
    return t;
  }
  InitFromProto(e, t) {
    super.InitFromProto(e, t);
    e = t.get("qfu").qfu;
    this.GridId = e.Gfu.bPu;
    this.Coords.Set(e.Gfu.iPs, e.Gfu.rPs);
    this.GridSize.Set(0, 0);
    e = t.get("WVu").WVu;
    this.ConfigId = e.Wrd.v9n;
  }
  Update(e) {
    super.Update(e);
    if (isTypeOfSpecialCellBaseInfo(e)) {
      this.ConfigId = e.ConfigId;
      this.CellType = e.CellType;
      this.GridId = e.GridId;
      this.GridSize.Set(e.GridSize.X, e.GridSize.Y);
      this.Coords.Set(e.Coords.X, e.Coords.Y);
    } else {
      this.ConfigId = 0;
      this.CellType = 0;
      this.GridId = undefined;
      this.GridSize.Set(0, 0);
      this.Coords.Set(0, 0);
    }
  }
  UpdateTransform(e, t) {
    this.Position.Set(e.X, e.Y, e.Z);
    this.Rotation.Set(t.Pitch, t.Yaw, t.Roll);
  }
  UpdateData(e, t) {
    this.GridId = e;
    this.Coords.Set(t.X, t.Y);
  }
  Reset() {
    super.Reset();
    this.ConfigId = 0;
    this.GridId = undefined;
    this.Coords.Set(0, 0);
    this.GridSize.Set(0, 0);
  }
  Release() {
    this.Reset();
    TowerDefenseEventSpecialCellModel.zud.Put(this);
  }
  Clone() {
    let e = TowerDefenseEventSpecialCellModel.zud.Get();
    (e = e || TowerDefenseEventSpecialCellModel.zud.Create()).Update(this);
    return e;
  }
}
(exports.TowerDefenseEventSpecialCellModel = TowerDefenseEventSpecialCellModel).zud = new Pool_1.Pool(ENTITY_POOL_SIZE, () => new TowerDefenseEventSpecialCellModel());
class TowerDefenseEventEntityModelBuilder {
  static Get(e, t) {
    for (const i of this.jNu) {
      var s = i.BuildModel(e, t);
      if (s) {
        return s;
      }
    }
  }
  static Clear() {
    for (const e of this.jNu) {
      e.Clear();
    }
  }
}
(exports.TowerDefenseEventEntityModelBuilder = TowerDefenseEventEntityModelBuilder).jNu = [TowerDefenseEventSpecialCellModel, TowerDefenseEventTrapModel, TowerDefenseEventMonsterModel, TowerDefenseEventEntityModel];
//# sourceMappingURL=TowerDefenseEventEntityModel.js.map