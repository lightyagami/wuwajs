"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateEntityData = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const IEntity_1 = require("../../../UniverseEditor/Interface/IEntity");
const PublicUtil_1 = require("../../Common/PublicUtil");
const ModelManager_1 = require("../../Manager/ModelManager");
class CreateEntityData {
  constructor() {
    this.CreatureDataId = 0;
    this.EntityType = 0;
    this.PbDataId = 0;
    this.ConfigType = undefined;
    this.PrefabId = 0;
    this.EntityData = undefined;
    this.PbEntityInitData = undefined;
    this.PbModelConfigId = undefined;
    this.IsConcealed = false;
    this.ger = undefined;
    this.Priority = 0;
    this.ComponentParamMap = undefined;
    this.RegisterToGameBudgetController = true;
    this.ComponentsKey = 0n;
    this.EnableMovement = false;
    this.TemplateData = undefined;
    this.ComponentDataMap = new Map();
    this.Components = new Array();
    this.ComponentSet = new Set();
  }
  Init(t) {
    this.EntityData = t;
    this.CreatureDataId = MathUtils_1.MathUtils.LongToNumber(t.s5n);
    this.EntityType = this.EntityData.zHn;
    this.PbDataId = this.EntityData.v9n;
    this.ConfigType = this.EntityData.ZHn;
    this.PrefabId = this.EntityData.LEs;
    if (this.InitPbEntityData()) {
      return !!this.InitComponentData();
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[CreateEntityData.Init] InitPbEntityData数据初始化失败。", ["CreatureDataId", this.CreatureDataId], ["EntityType", this.EntityType], ["ConfigType", this.ConfigType], ["PbDataId", this.PbDataId]);
      }
      return false;
    }
  }
  InitPbEntityData() {
    CreateEntityData.arl.Start();
    let t = undefined;
    let e = undefined;
    let i = false;
    switch (this.ConfigType) {
      case Protocol_1.Aki.Protocol.rLs.Proto_Global:
        t = ModelManager_1.ModelManager.CreatureModel.GetDynamicEntityData(this.PbDataId);
        e = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(t.BlueprintType);
        i = true;
        break;
      case Protocol_1.Aki.Protocol.rLs.F6n:
        if (!(t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(this.PbDataId))) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 3, "[CreatureDataComponent.InitPbEntityData]找不到实体配置数据。", ["PbDataId", this.PbDataId]);
          }
          CreateEntityData.arl.Stop();
          return false;
        }
        e = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(t.BlueprintType);
        break;
      case Protocol_1.Aki.Protocol.rLs.Proto_Template:
        if (!(e = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(this.PbDataId))) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 3, "[CreatureDataComponent.InitPbEntityData] Template为空，请检查Template表是否包含该Id。", ["CreatureDataId", this.CreatureDataId], ["EntityType", this.EntityType], ["EntityConfigType", this.ConfigType], ["PbDataId", this.PbDataId], ["TemplateId", this.PbDataId]);
          }
          CreateEntityData.arl.Stop();
          return false;
        }
        t = {
          BlueprintType: e.BlueprintType,
          Name: e.Name,
          Id: e.Id
        };
        i = true;
        break;
      case Protocol_1.Aki.Protocol.rLs.lTs:
        if (t = ModelManager_1.ModelManager.CreatureModel.GetEntityPrefab(this.PrefabId, this.PbDataId)) {
          break;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "[CreatureDataComponent.InitPbEntityData] 找不到Prefab的实体配置数据。", ["PrefabId", this.PrefabId], ["ConfigId", this.PbDataId]);
        }
        CreateEntityData.arl.Stop();
        return false;
    }
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      i = true;
    }
    CreateEntityData.lrl.Start();
    this.TemplateData = e;
    if ((i || !ModelManager_1.ModelManager.CreatureModel.UseFbEntityConfig) && e) {
      this.PbEntityInitData = (0, IEntity_1.decompressEntityData)(t, e);
    } else {
      this.PbEntityInitData = t;
    }
    CreateEntityData.lrl.Stop();
    if (this.PbEntityInitData?.ComponentsData) {
      this.PbModelConfigId = this.PbEntityInitData.BlueprintType;
      this.IsConcealed = !!CreateEntityData.GetBaseInfo(this)?.ScanFunction?.IsConcealed;
    }
    CreateEntityData.arl.Stop();
    return true;
  }
  InitComponentData() {
    CreateEntityData.hrl.Start();
    this.ComponentDataMap.clear();
    var t = this.EntityData.zEs;
    if (t) {
      for (const i of t) {
        var e = i.C3s;
        this.ComponentDataMap.set(e, i);
      }
    }
    CreateEntityData.hrl.Stop();
    return true;
  }
  AddComponent(t) {
    var e = t.Id;
    if (e < 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "组件没有在RegisterComponent注册", ["Type", t.name]);
      }
      return false;
    } else if (this.ComponentSet.has(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "重复注册组件", ["Type", t.name], ["Id", e]);
      }
      return false;
    } else {
      this.Components.push(t);
      this.ComponentSet.add(t);
      this.ComponentsKey |= 1n << BigInt(e);
      return true;
    }
  }
  AddDebugComponent(t) {
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      var e = t.Id;
      if (e < 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "组件没有在RegisterComponent注册", ["Type", t.name]);
        }
        return false;
      }
      if (this.ComponentSet.has(t)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "重复注册组件", ["Type", t.name], ["Id", e]);
        }
        return false;
      }
      this.Components.push(t);
      this.ComponentSet.add(t);
      this.ComponentsKey |= 1n << BigInt(e);
    }
    return true;
  }
  HasComponent(t) {
    return this.ComponentSet.has(t);
  }
  SetParam(t, ...e) {
    this.ComponentParamMap ||= new Map();
    this.ComponentParamMap.set(t, e);
  }
  GetParam(t) {
    if (this.ComponentParamMap) {
      return this.ComponentParamMap.get(t);
    }
  }
  GetPbModelConfig() {
    if (this.PbModelConfigId) {
      this.ger ||= ModelManager_1.ModelManager.CreatureModel.GetEntityModel(this.PbModelConfigId);
      return this.ger;
    }
  }
  static GetBaseInfo(t) {
    if (t.PbEntityInitData) {
      return (0, IComponent_1.getComponent)(t.PbEntityInitData.ComponentsData, "BaseInfoComponent");
    }
  }
  static GetAnimalComponentConfig(t) {
    if (t.PbEntityInitData) {
      return (0, IComponent_1.getComponent)(t.PbEntityInitData.ComponentsData, "AnimalComponent");
    }
  }
  static IsRobot(t) {
    var t = t.PbEntityInitData;
    var e = (0, IComponent_1.getComponent)(t.ComponentsData, "InteractComponent");
    var t = (0, IComponent_1.getComponent)(t.ComponentsData, "BubbleComponent");
    return !!e && !!t;
  }
  static IsFollowShooter(t) {
    return !!t.ComponentDataMap.get("tI_");
  }
  static GetMonsterComponent(t) {
    if (t.PbEntityInitData) {
      return (0, IComponent_1.getComponent)(t.PbEntityInitData.ComponentsData, "MonsterComponent");
    }
  }
  static HasScanInfo(t) {
    t = this.GetBaseInfo(t)?.ScanFunction?.ScanId;
    return !!t && t !== 0;
  }
}
(exports.CreateEntityData = CreateEntityData).arl = Stats_1.Stat.Create("InitPbEntityData");
CreateEntityData.lrl = Stats_1.Stat.Create("DecompressEntityData");
CreateEntityData.hrl = Stats_1.Stat.Create("InitComponentData"); //# sourceMappingURL=CreateEntityData.js.map