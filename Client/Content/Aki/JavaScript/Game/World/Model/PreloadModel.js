"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreloadModel = exports.EntityAssetElement = exports.CommonAssetElement = exports.AssetElement = exports.preloadAssetTypeForName = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const PreCreateEffect_1 = require("../../Effect/PreCreateEffect");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
exports.preloadAssetTypeForName = new Map([[0, "Animation"], [5, "AnimationBlueprint"], [2, "Audio"], [1, "Effect"], [4, "Material"], [3, "Mesh"], [6, "Other"]]);
class AssetElement {
  constructor() {
    this.AssetForIndexMap = new Map();
    this.HasError = false;
    this.AssetPathSet = new Set();
    this.AnimationAssetSet = new Set();
    this.MajorAssets = new Set();
    this.EffectAssetSet = new Set();
    this.AudioAssetSet = new Set();
    this.MeshAssetSet = new Set();
    this.MaterialAssetSet = new Set();
    this.OtherAssetSet = new Set();
    this.AnimationBlueprintClassAssetSet = new Set();
  }
  CheckPath(t) {
    return !!t && t.length !== 0 || (Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "搜集资源失败，asset=undefined或asset.length=0。"), false);
  }
  AddPath(t) {
    return !this.AssetPathSet.has(t) && (this.AssetPathSet.add(t), true);
  }
  AddObject(t, e) {}
  AddMajorAsset(t) {
    if (this.CheckPath(t) && this.AddPath(t)) {
      this.MajorAssets.add(t);
    }
  }
  AddAnimationAsset(t) {
    if (this.CheckPath(t) && this.AddPath(t)) {
      this.AnimationAssetSet.add(t);
    }
  }
  AddEffectAsset(t) {
    return !!this.CheckPath(t) && !!this.AddPath(t) && (this.EffectAssetSet.add(t), true);
  }
  AddAudioAsset(t) {
    if (this.CheckPath(t) && this.AddPath(t)) {
      this.AudioAssetSet.add(t);
    }
  }
  AddMeshAsset(t) {
    if (this.CheckPath(t) && this.AddPath(t)) {
      this.MeshAssetSet.add(t);
    }
  }
  AddMaterialAsset(t) {
    if (this.CheckPath(t) && this.AddPath(t)) {
      this.MaterialAssetSet.add(t);
    }
  }
  AddOtherAsset(t) {
    if (this.CheckPath(t) && this.AddPath(t)) {
      this.OtherAssetSet.add(t);
    }
  }
  AddAnimationBlueprintClassAsset(t) {
    if (this.CheckPath(t) && this.AddPath(t)) {
      this.AnimationBlueprintClassAssetSet.add(t);
    }
  }
  NeedLoadCount() {
    var t = this.OtherAssetSet.size;
    var e = this.AnimationAssetSet.size;
    var s = this.AudioAssetSet.size;
    return t + e + this.AudioAssetSet.size + this.EffectAssetSet.size + this.MeshAssetSet.size + s + this.AnimationBlueprintClassAssetSet.size;
  }
  Clear() {
    this.AssetPathSet.clear();
    this.OtherAssetSet.clear();
    this.MaterialAssetSet.clear();
    this.MeshAssetSet.clear();
    this.AnimationAssetSet.clear();
    this.AudioAssetSet.clear();
    this.EffectAssetSet.clear();
    this.AnimationBlueprintClassAssetSet.clear();
  }
  GetLoadPriority() {
    return 100;
  }
  PrintDebugInfo() {}
}
class CommonAssetElement extends (exports.AssetElement = AssetElement) {
  AddObject(t, e) {
    ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.AddCommonAsset(e);
  }
  PrintDebugInfo() {}
  Clear() {
    ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.ClearCommonAsset();
    super.Clear();
  }
}
exports.CommonAssetElement = CommonAssetElement;
class EntityAssetElement extends AssetElement {
  constructor(t) {
    super();
    this.IEr = 100;
    this.uar = 0;
    this.CreatureDataComponent = undefined;
    this.car = false;
    this.Kpo = undefined;
    this.mar = undefined;
    this.TEr = undefined;
    this.LEr = undefined;
    this.DEr = undefined;
    this.IsDestroy = false;
    this.Kpo = t;
    this.CreatureDataComponent = t.Entity.GetComponent(0);
    if (ModelManager_1.ModelManager.PreloadModel.LoadingNeedWaitEntitySet.has(t.Id) || this.CreatureDataComponent.IsRole()) {
      this.IEr = 101;
    }
    t.Priority = this.IEr;
  }
  get LoadState() {
    return this.uar;
  }
  set LoadState(t) {
    this.uar = t;
  }
  get CollectMinorAsset() {
    return this.car;
  }
  set CollectMinorAsset(t) {
    this.car = t;
  }
  get Entity() {
    return this.Kpo?.Entity;
  }
  get EntityHandle() {
    return this.Kpo;
  }
  get BlueprintClassPath() {
    return this.mar;
  }
  set BlueprintClassPath(t) {
    this.mar = t;
  }
  get CharacterPath() {
    return this.TEr;
  }
  set CharacterPath(t) {
    this.TEr = t;
  }
  get PartHitEffectPath() {
    return this.LEr;
  }
  set PartHitEffectPath(t) {
    this.LEr = t;
  }
  get SkillDataTable() {
    return this.DEr;
  }
  set SkillDataTable(t) {
    this.DEr = t;
  }
  AddObject(t, e) {
    if (this.Kpo?.Valid) {
      ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.AddEntityAsset(this.Kpo.Id, e);
    }
  }
  Clear() {
    ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.RemoveEntityAssets(this.Entity.Id);
    this.MajorAssets.clear();
    this.DEr = undefined;
    this.TEr = undefined;
    this.mar = undefined;
    this.Kpo = undefined;
    this.CreatureDataComponent = undefined;
    this.car = false;
    this.uar = 0;
    this.IsDestroy = true;
    super.Clear();
  }
  GetLoadPriority() {
    return this.IEr;
  }
  PrintDebugInfo() {}
}
exports.EntityAssetElement = EntityAssetElement;
class PreloadModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.PreCreateEffect = new PreCreateEffect_1.PreCreateEffect();
    this.CommonAssetElement = new CommonAssetElement();
    this.PreloadAssetMap = new Map();
    this.AllEntityAssetMap = new Map();
    this.REr = undefined;
    this.UEr = true;
    this.LoadAssetOneByOneState = false;
    this.UseEntityProfilerInternal = true;
    this.ResourcesLoadTime = new Array();
    this.LoadingNeedWaitEntitySet = new Set();
  }
  OnInit() {
    if (!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.UEr = true;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Preload", 3, "预加载信息", ["是否开启预加载", this.UEr], ["是否使用LoadOneByOne", this.LoadAssetOneByOneState]);
    }
    this.REr = UE.NewObject(UE.HoldPreloadObject.StaticClass(), GlobalData_1.GlobalData.GameInstance);
    this.PreCreateEffect.RegisterTick();
    this.PreCreateEffect.Init();
    return true;
  }
  OnClear() {
    this.ResourcesLoadTime.length = 0;
    this.REr.Clear();
    if (this.REr?.IsValid()) {
      this.REr.Clear();
    }
    this.REr = undefined;
    this.PreCreateEffect.UnregisterTick();
    this.PreCreateEffect.Clear();
    return true;
  }
  get HoldPreloadObject() {
    return this.REr;
  }
  AddPreloadResource(t) {
    var e;
    if (this.PreloadAssetMap.has(t)) {
      e = this.PreloadAssetMap.get(t);
      this.PreloadAssetMap.set(t, e + 1);
    } else {
      this.PreloadAssetMap.set(t, 1);
    }
  }
  RemovePreloadResource(t) {
    if (!this.PreloadAssetMap.has(t)) {
      return false;
    }
    let e = this.PreloadAssetMap.get(t);
    if (e > 0) {
      e--;
      this.PreloadAssetMap.set(t, e);
    }
    if (e === 0) {
      this.PreloadAssetMap.delete(t);
    }
    return true;
  }
  ClearPreloadResource() {
    this.PreloadAssetMap.clear();
    this.REr.Clear();
    this.LoadingNeedWaitEntitySet.clear();
  }
  AddEntityAsset(t, e) {
    return !this.AllEntityAssetMap.has(t) && (this.AllEntityAssetMap.set(t, e), true);
  }
  RemoveEntityAsset(t) {
    return this.AllEntityAssetMap.delete(t);
  }
  ClearEntityAsset() {
    this.AllEntityAssetMap.clear();
  }
  get IsUsePreload() {
    return this.UEr;
  }
  set IsUsePreload(t) {
    this.UEr = t;
  }
  AddResourcesLoadTime(t) {
    this.ResourcesLoadTime.push(t);
  }
  ClearResourcesLoadTime() {
    this.ResourcesLoadTime.length = 0;
  }
  AddNeedWaitEntity(t) {
    this.LoadingNeedWaitEntitySet.add(t);
  }
  RemoveNeedWaitEntity(t) {
    this.LoadingNeedWaitEntitySet.delete(t);
  }
}
exports.PreloadModel = PreloadModel;
//# sourceMappingURL=PreloadModel.js.map