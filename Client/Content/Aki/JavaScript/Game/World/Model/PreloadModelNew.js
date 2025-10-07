"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreloadModelNew = exports.PreloadSkillSaveData = exports.PreloadModelConfigSaveData = exports.PreloadSaveData = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const BulletPreloadByActorBlueprintAndBulletId_1 = require("../../../Core/Define/ConfigQuery/BulletPreloadByActorBlueprintAndBulletId");
const BulletPreloadByAll_1 = require("../../../Core/Define/ConfigQuery/BulletPreloadByAll");
const CommonSkillPreloadAll_1 = require("../../../Core/Define/ConfigQuery/CommonSkillPreloadAll");
const EntitySkillPreloadByActorBlueprint_1 = require("../../../Core/Define/ConfigQuery/EntitySkillPreloadByActorBlueprint");
const EntitySkillPreloadByAll_1 = require("../../../Core/Define/ConfigQuery/EntitySkillPreloadByAll");
const ModelConfigPreloadByAll_1 = require("../../../Core/Define/ConfigQuery/ModelConfigPreloadByAll");
const ModelConfigPreloadById_1 = require("../../../Core/Define/ConfigQuery/ModelConfigPreloadById");
const PbDataPreloadAll_1 = require("../../../Core/Define/ConfigQuery/PbDataPreloadAll");
const StateMachinePreloadByAll_1 = require("../../../Core/Define/ConfigQuery/StateMachinePreloadByAll");
const StateMachinePreloadByFsmKey_1 = require("../../../Core/Define/ConfigQuery/StateMachinePreloadByFsmKey");
const TemplateDataPreloadByAll_1 = require("../../../Core/Define/ConfigQuery/TemplateDataPreloadByAll");
const TemplateDataPreloadById_1 = require("../../../Core/Define/ConfigQuery/TemplateDataPreloadById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const PreCreateEffect_1 = require("../../Effect/PreCreateEffect");
const GlobalData_1 = require("../../GlobalData");
const CloudGameManager_1 = require("../../Manager/CloudGameManager");
const PreloadDefine_1 = require("../../Preload/PreloadDefine");
class PreloadSaveData {
  constructor() {
    this.Animations = undefined;
    this.Others = [];
  }
}
class PreloadModelConfigSaveData extends (exports.PreloadSaveData = PreloadSaveData) {
  constructor() {
    super(...arguments);
    this.ActorClassPath = undefined;
  }
}
exports.PreloadModelConfigSaveData = PreloadModelConfigSaveData;
class PreloadSkillSaveData extends PreloadSaveData {
  constructor() {
    super(...arguments);
    this.SkillId = undefined;
  }
}
exports.PreloadSkillSaveData = PreloadSkillSaveData;
class PreloadModelNew extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.EnablePreloadLog = false;
    this.ProjectPath = undefined;
    this.JsonExportRootPath = undefined;
    this.ModelConfigJsonExportPath = undefined;
    this.SkillJsonExportPath = undefined;
    this.CommonSkillJsonExportPath = undefined;
    this.BulletJsonExportPath = undefined;
    this.StateMachineJsonExportPath = undefined;
    this.PreCreateEffect = new PreCreateEffect_1.PreCreateEffect();
    this.CommonAssetElement = new PreloadDefine_1.CommonAssetElement(undefined);
    this.PreloadAssetMap = new Map();
    this.PbDataPreloadDataMap = new Map();
    this.AllEntityAssetMap = new Map();
    this.AllPbEntityAssetMap = new Map();
    this.PlotAssetManager = new PreloadDefine_1.PlotAssetManager();
    this.PEr = new Map();
    this.REr = undefined;
    this.BulletPreloadDataMap = new Map();
    this.CommonSkillPreloadDataMap = [];
    this.ModelConfigPreloadDataMap = new Map();
    this.StateMachinePreloadDataMap = new Map();
    this.TemplatePreloadDataMap = new Map();
    this.SkillPreloadDataMap = new Map();
    this.LoadingNeedWaitEntitySet = new Set();
  }
  get HoldPreloadObject() {
    return this.REr;
  }
  OnInit() {
    this.ProjectPath = UE.KismetSystemLibrary.ConvertToAbsolutePath(UE.BlueprintPathsLibrary.ProjectDir());
    this.JsonExportRootPath = UE.KismetSystemLibrary.ConvertToAbsolutePath(this.ProjectPath + "../Config/Client/Preload/");
    this.ModelConfigJsonExportPath = this.JsonExportRootPath + "ModelConfig/";
    this.SkillJsonExportPath = this.JsonExportRootPath + "SkillInfo/";
    this.CommonSkillJsonExportPath = this.JsonExportRootPath + "CommonSkillInfo/";
    this.BulletJsonExportPath = this.JsonExportRootPath + "BulletInfo/";
    this.StateMachineJsonExportPath = this.JsonExportRootPath + "EntityFsm/";
    this.REr = UE.NewObject(UE.HoldPreloadObject.StaticClass(), GlobalData_1.GlobalData.GameInstance);
    this.PreCreateEffect.RegisterTick();
    this.PreCreateEffect.Init();
    if (Info_1.Info.IsPs5Platform() || CloudGameManager_1.CloudGameManager.IsCloudGame) {
      PreloadDefine_1.PreloadSetting.LoadAllPreloadData = true;
    }
    this.G4a();
    this.yFl();
    if (PreloadDefine_1.PreloadSetting.LoadAllPreloadData) {
      this.EFl();
      this.IFl();
      this.TFl();
      this.LFl();
      this.UFl();
    }
    this.PlotAssetManager.Init();
    return true;
  }
  G4a() {
    for (const e of PbDataPreloadAll_1.configPbDataPreloadAll.GetConfigList()) {
      if (!this.PbDataPreloadDataMap.has(e.MapId)) {
        this.PbDataPreloadDataMap.set(e.MapId, new Map());
      }
      this.PbDataPreloadDataMap.get(e.MapId)?.set(e.PbDataId, e);
    }
  }
  EFl() {
    for (const e of BulletPreloadByAll_1.configBulletPreloadByAll.GetConfigList()) {
      if (!this.BulletPreloadDataMap.has(e.ActorBlueprint)) {
        this.BulletPreloadDataMap.set(e.ActorBlueprint, new Map());
      }
      this.BulletPreloadDataMap.get(e.ActorBlueprint)?.set(e.BulletId, this.AFl(e));
    }
  }
  GetBulletPreloadData(e, t) {
    if (PreloadDefine_1.PreloadSetting.LoadAllPreloadData) {
      return this.BulletPreloadDataMap.get(e)?.get(t);
    } else {
      return BulletPreloadByActorBlueprintAndBulletId_1.configBulletPreloadByActorBlueprintAndBulletId.GetConfig(e, t);
    }
  }
  yFl() {
    CommonSkillPreloadAll_1.configCommonSkillPreloadAll.GetConfigList()?.forEach(e => {
      this.CommonSkillPreloadDataMap?.push(e);
    });
  }
  GetCommonSkillPreloadData() {
    return this.CommonSkillPreloadDataMap;
  }
  IFl() {
    var e;
    for (const t of ModelConfigPreloadByAll_1.configModelConfigPreloadByAll.GetConfigList()) {
      if (!this.ModelConfigPreloadDataMap.has(t.Id)) {
        (e = this.AFl(t)).ActorClassPath = t.ActorClassPath;
        this.ModelConfigPreloadDataMap.set(t.Id, e);
      }
    }
  }
  GetModelConfigPreloadData(e) {
    if (PreloadDefine_1.PreloadSetting.LoadAllPreloadData) {
      return this.ModelConfigPreloadDataMap.get(e);
    } else {
      return ModelConfigPreloadById_1.configModelConfigPreloadById.GetConfig(e);
    }
  }
  TFl() {
    for (const e of StateMachinePreloadByAll_1.configStateMachinePreloadByAll.GetConfigList()) {
      if (!this.StateMachinePreloadDataMap.has(e.FsmKey)) {
        this.StateMachinePreloadDataMap.set(e.FsmKey, this.AFl(e));
      }
    }
  }
  GetStateMachinePreloadData(e) {
    if (PreloadDefine_1.PreloadSetting.LoadAllPreloadData) {
      return this.StateMachinePreloadDataMap.get(e);
    } else {
      return StateMachinePreloadByFsmKey_1.configStateMachinePreloadByFsmKey.GetConfig(e);
    }
  }
  LFl() {
    for (const e of TemplateDataPreloadByAll_1.configTemplateDataPreloadByAll.GetConfigList()) {
      if (!this.TemplatePreloadDataMap.has(e.Id)) {
        this.TemplatePreloadDataMap.set(e.Id, this.AFl(e));
      }
    }
  }
  GetTemplatePreloadData(e) {
    if (PreloadDefine_1.PreloadSetting.LoadAllPreloadData) {
      return this.TemplatePreloadDataMap.get(e);
    } else {
      return TemplateDataPreloadById_1.configTemplateDataPreloadById.GetConfig(e);
    }
  }
  UFl() {
    for (const t of EntitySkillPreloadByAll_1.configEntitySkillPreloadByAll.GetConfigList()) {
      var e = this.AFl(t);
      e.SkillId = t.SkillId;
      if (this.SkillPreloadDataMap.has(t.ActorBlueprint)) {
        this.SkillPreloadDataMap.get(t.ActorBlueprint)?.push(e);
      } else {
        this.SkillPreloadDataMap.set(t.ActorBlueprint, [e]);
      }
    }
  }
  GetSkillPreloadData(e) {
    if (PreloadDefine_1.PreloadSetting.LoadAllPreloadData) {
      return this.SkillPreloadDataMap.get(e);
    } else {
      return EntitySkillPreloadByActorBlueprint_1.configEntitySkillPreloadByActorBlueprint.GetConfigList(e);
    }
  }
  AFl(e) {
    var t = new PreloadSaveData();
    if (e.ActorClass.length > 0) {
      t.Others = t.Others?.concat(Array.from(e.ActorClass));
    }
    if (e.Animations.length > 0) {
      t.Animations = Array.from(e.Animations);
    }
    if (e.Effects.length > 0) {
      t.Others = t.Others?.concat(Array.from(e.Effects));
    }
    if (e.Audios.length > 0) {
      t.Others = t.Others?.concat(Array.from(e.Audios));
    }
    if (e.Materials.length > 0) {
      t.Others = t.Others?.concat(Array.from(e.Materials));
    }
    if (e.Meshes.length > 0) {
      t.Others = t.Others?.concat(Array.from(e.Meshes));
    }
    if (e.AnimationBlueprints.length > 0) {
      t.Others = t.Others?.concat(Array.from(e.AnimationBlueprints));
    }
    if (e.Others.length > 0) {
      t.Others = t.Others?.concat(Array.from(e.Others));
    }
    return t;
  }
  OnClear() {
    this.REr.Clear();
    if (this.REr?.IsValid()) {
      this.REr.Clear();
    }
    this.REr = undefined;
    this.PreCreateEffect.UnregisterTick();
    this.PreCreateEffect.Clear();
    this.PEr.clear();
    this.PlotAssetManager.Clear();
    return true;
  }
  AddPreloadResource(e) {
    var t;
    if (this.PreloadAssetMap.has(e)) {
      t = this.PreloadAssetMap.get(e);
      this.PreloadAssetMap.set(e, t + 1);
    } else {
      this.PreloadAssetMap.set(e, 1);
    }
  }
  RemovePreloadResource(e) {
    if (!this.PreloadAssetMap.has(e)) {
      return false;
    }
    let t = this.PreloadAssetMap.get(e);
    if (t > 0) {
      t--;
      this.PreloadAssetMap.set(e, t);
    }
    if (t === 0) {
      this.PreloadAssetMap.delete(e);
    }
    return true;
  }
  ClearPreloadResource() {
    this.PreloadAssetMap.clear();
    this.REr.Clear();
    this.LoadingNeedWaitEntitySet.clear();
  }
  AddEntityAsset(e, t) {
    return !this.AllEntityAssetMap.has(e) && (this.AllEntityAssetMap.set(e, t), true);
  }
  HasEntityAsset(e) {
    return this.AllEntityAssetMap.has(e);
  }
  GetEntityAssetElement(e) {
    return this.AllEntityAssetMap.get(e);
  }
  RemoveEntityAsset(e) {
    return this.AllEntityAssetMap.delete(e);
  }
  ClearEntityAsset() {
    this.AllEntityAssetMap.clear();
  }
  AddPbEntityAsset(e, t) {
    return !this.AllPbEntityAssetMap.has(e) && (this.AllPbEntityAssetMap.set(e, t), true);
  }
  HasPbEntityAsset(e) {
    return this.AllPbEntityAssetMap.has(e);
  }
  GetPbEntityAssetElement(e) {
    return this.AllPbEntityAssetMap.get(e);
  }
  RemovePbEntityAsset(e) {
    return this.AllPbEntityAssetMap.delete(e);
  }
  ClearPbEntityAsset() {
    this.AllPbEntityAssetMap.forEach((e, t) => {
      e.Clear();
    });
    this.AllPbEntityAssetMap.clear();
  }
  CleanPlotAsset() {
    this.PlotAssetManager.RemoveAllPreload();
  }
  AddNeedWaitEntity(e) {
    this.LoadingNeedWaitEntitySet.add(e);
  }
  RemoveNeedWaitEntity(e) {
    this.LoadingNeedWaitEntitySet.delete(e);
  }
  AddCommonSkill(e, t, r) {
    if (this.PEr.has(e)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Preload", 4, "[预加载] 重复添加技能", ["SkillId", e]);
      }
      return false;
    } else {
      this.PEr.set(e, [t, r]);
      return true;
    }
  }
  IsCommonSkill(e) {
    return this.PEr.has(e);
  }
  GetCommonSkill(e) {
    return this.PEr.get(e);
  }
}
exports.PreloadModelNew = PreloadModelNew;
//# sourceMappingURL=PreloadModelNew.js.map