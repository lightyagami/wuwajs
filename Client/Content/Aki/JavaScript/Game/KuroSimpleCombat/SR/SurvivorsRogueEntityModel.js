"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueEntityModelBuilder = exports.SurvivorsRogueActivityEntityModel = exports.SurvivorsRogueEntityModel = undefined;
const Pool_1 = require("../../../Core/Container/Pool");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ENTITY_POOL_SIZE = 100;
class SurvivorsRogueEntityBaseModel {
  static BuildModel(t, i) {}
  static Clear() {}
}
class SurvivorsRogueEntityModel extends SurvivorsRogueEntityBaseModel {
  constructor() {
    super(...arguments);
    this.EntityType = 0;
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
    this.AttributeMap = undefined;
    this.Position = Vector_1.Vector.Create(0, 0, 0);
    this.Rotation = Rotator_1.Rotator.Create(0, 0, 0);
  }
  static BuildModel(i, s) {
    if (s.has("sEu")) {
      let t = this.NNu.Get();
      (t = t || this.NNu.Create()).InitFromProto(i, s);
      return t;
    }
  }
  static Clear() {
    this.NNu.Clear();
  }
  InitFromProto(t, i) {
    i = i.get("sEu").sEu;
    this.Uid = MathUtils_1.MathUtils.LongToNumber(t.s5n);
    this.OwnerId = MathUtils_1.MathUtils.LongToNumber(t.JE_);
    this.TemplateId = t.v9n;
    this.CombatId = 0;
    this.SubTypeId = i.aEu;
    this.PrefabPath = undefined;
    this.AssetPath = undefined;
    this.PropertyId = 0;
    this.SplineId = i.eKn;
    this.BuffIdLayers = i.JHu;
    this.AttributeMap = i.t2d;
    i = t.l8n;
    if (i) {
      this.Position.Set(i.X, i.Y, i.Z);
    }
    i = t._8n;
    if (i) {
      this.Rotation.Set(i.Pitch, i.Yaw, i.Roll);
    }
  }
  Update(t) {
    this.Uid = t.Uid;
    this.OwnerId = t.OwnerId;
    this.TemplateId = t.TemplateId;
    this.CombatId = t.CombatId;
    this.SubTypeId = t.SubTypeId;
    this.PrefabPath = t.PrefabPath;
    this.AssetPath = t.AssetPath;
    this.PropertyId = t.PropertyId;
    this.SplineId = t.SplineId;
    this.BuffIdLayers = t.BuffIdLayers;
    this.AttributeMap = t.AttributeMap;
    this.Position.Set(t.Position.X, t.Position.Y, t.Position.Z);
    this.Rotation.Set(t.Rotation.Pitch, t.Rotation.Yaw, t.Rotation.Roll);
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
    this.AttributeMap = undefined;
    this.Position.Set(0, 0, 0);
    this.Rotation.Set(0, 0, 0);
  }
  Release() {
    this.Reset();
    SurvivorsRogueEntityModel.NNu.Put(this);
  }
  Clone() {
    let t = SurvivorsRogueEntityModel.NNu.Get();
    (t = t || SurvivorsRogueEntityModel.NNu.Create()).Update(this);
    return t;
  }
}
(exports.SurvivorsRogueEntityModel = SurvivorsRogueEntityModel).NNu = new Pool_1.Pool(ENTITY_POOL_SIZE, () => new SurvivorsRogueEntityModel());
class SurvivorsRogueActivityEntityModel extends SurvivorsRogueEntityModel {
  constructor() {
    super(...arguments);
    this.ConfigId = 0;
    this.DeathType = 0;
    this.BuffRadius = 0;
    this.BuffIds = undefined;
    this.SpawnIds = undefined;
    this.PolluteRadius = 0;
  }
  static InitFromConfigId(t) {
    let i = this.Nwd.Get();
    (i = i || this.Nwd.Create()).ConfigId = t;
    return i;
  }
  static BuildModel(i, s) {
    if (s.has("sEu") && s.has("OTd") && s.get("OTd").OTd) {
      let t = this.Nwd.Get();
      (t = t || this.Nwd.Create()).InitFromProto(i, s);
      return t;
    }
  }
  static Clear() {
    this.Nwd.Clear();
  }
  InitFromProto(t, i) {
    super.InitFromProto(t, i);
    t = i.get("OTd").OTd;
    this.ConfigId = t.v9n;
    if (t.NTd) {
      this.EntityType = 1;
      this.DeathType = 0;
      this.BuffRadius = 0;
      this.BuffIds = undefined;
      this.SpawnIds = undefined;
      this.PolluteRadius = 0;
    } else if (t.vwd) {
      this.EntityType = 2;
    } else if (t.pwd) {
      this.EntityType = 3;
    } else if (t.YUd) {
      this.EntityType = 4;
    }
  }
  Update(t) {
    super.Update(t);
    this.ConfigId = t.ConfigId;
    this.DeathType = t.DeathType;
    this.BuffRadius = t.BuffRadius;
    this.BuffIds = t.BuffIds;
    this.SpawnIds = t.SpawnIds;
    this.PolluteRadius = t.PolluteRadius;
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
    SurvivorsRogueActivityEntityModel.Nwd.Put(this);
  }
  Clone() {
    let t = SurvivorsRogueActivityEntityModel.Nwd.Get();
    (t = t || SurvivorsRogueActivityEntityModel.Nwd.Create()).Update(this);
    return t;
  }
}
(exports.SurvivorsRogueActivityEntityModel = SurvivorsRogueActivityEntityModel).Nwd = new Pool_1.Pool(ENTITY_POOL_SIZE, () => new SurvivorsRogueActivityEntityModel());
class SurvivorsRogueEntityModelBuilder {
  static Get(t, i) {
    for (const o of this.jNu) {
      var s = o.BuildModel(t, i);
      if (s) {
        return s;
      }
    }
  }
  static Clear() {
    for (const t of this.jNu) {
      t.Clear();
    }
  }
}
(exports.SurvivorsRogueEntityModelBuilder = SurvivorsRogueEntityModelBuilder).jNu = [SurvivorsRogueActivityEntityModel, SurvivorsRogueEntityModel];
//# sourceMappingURL=SurvivorsRogueEntityModel.js.map