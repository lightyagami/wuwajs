"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PbEntityAssetElement = exports.PbPreloadAssetElement = exports.PlotAssetManager = exports.ModelAssetElement = exports.ModelAssetBulletManager = exports.ModelAssetSkillManager = exports.PreloadSetting = exports.EntityAssetElement = exports.FightAssetManager = exports.TemplateDataAssetManager = exports.PbDataAssetManager = exports.BulletAssetManager = exports.SkillAssetManager = exports.CommonAssetElement = exports.AssetElement = exports.EntityMainAssetRecord = exports.PbDataAssetRecord = exports.CharacterAssetRecord = exports.TemplateDataAssetRecord = exports.StateMachineAssetRecord = exports.BulletAssetRecord = exports.SkillAssetRecord = exports.AssetRecord = exports.USE_DB = void 0;
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  PriorityQueue_1 = require("../../Core/Container/PriorityQueue"),
  Macro_1 = require("../../Core/Preprocessor/Macro"),
  ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../Core/Utils/DataTableUtil"),
  MapUtils_1 = require("../../Core/Utils/MapUtils"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  GameModePromise_1 = require("../World/Define/GameModePromise"),
  FORBID_PATH = (exports.USE_DB = !1, "/Game/Aki/Scene/Assets/Temp");
class AssetRecord {
  constructor() {
    this.AssetSet = new Set, this.ActorClass = new Array, this.Animations = new Array, this.Effects = new Array, this.Audios = new Array, this.Meshes = new Array, this.Materials = new Array, this.AnimationBlueprints = new Array, this.Others = new Array
  }
  AddActorClass(t) {
    return !!this.lar(t) && (this.ActorClass.push(t), !0)
  }
  AddAnimation(t) {
    this.lar(t) && this.Animations.push(t)
  }
  TryAddEffect(t) {
    let s = t;
    return t.includes("GA_") && (s = t.concat("_C")), (UE.KuroEditorUtilityLibrary.GetAssetData(s)?.AssetClass?.toString())?.startsWith("EffectModel") ? [t = this.AddEffect(s), t] : [this.AddOther(s), !1]
  }
  AddEffect(t) {
    return !!this.lar(t) && (this.Effects.push(t), !0)
  }
  AddAudio(t) {
    this.lar(t) && this.Audios.push(t)
  }
  AddMesh(t) {
    this.lar(t) && this.Meshes.push(t)
  }
  AddMaterial(t) {
    this.lar(t) && this.Materials.push(t)
  }
  AddAnimationBlueprint(t) {
    this.lar(t) && this.AnimationBlueprints.push(t)
  }
  AddOther(t) {
    return !!this.lar(t) && (this.Others.push(t), !0)
  }
  lar(t) {
    return !(!t?.length || (t.startsWith(FORBID_PATH) ? (Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 3, "[预加载] 不能搜集该目录的资源", ["Path", t]), 1) : this.AssetSet.has(t) || (this.AssetSet.add(t), 0)))
  }
  Copy(t) {
    for (const s of t.ActorClass) this.AddActorClass(s);
    for (const e of t.Animations) this.AddAnimation(e);
    for (const i of t.Effects) this.AddEffect(i);
    for (const r of t.Audios) this.AddAudio(r);
    for (const h of t.Meshes) this.AddMesh(h);
    for (const o of t.Materials) this.AddMaterial(o);
    for (const a of t.AnimationBlueprints) this.AddAnimationBlueprint(a);
    for (const n of t.Others) this.AddOther(n);
    return !0
  }
}
exports.AssetRecord = AssetRecord;
class SkillAssetRecord {
  constructor() {
    this.SkillId = 0, this.ActorBlueprint = "", this.IsCommon = !1, this.HasMontagePath = !1, this.AssetRecord = new AssetRecord
  }
}
exports.SkillAssetRecord = SkillAssetRecord;
class BulletAssetRecord {
  constructor() {
    this.BulletId = "", this.ActorBlueprint = "", this.AssetRecord = new AssetRecord
  }
}
exports.BulletAssetRecord = BulletAssetRecord;
class StateMachineAssetRecord {
  constructor() {
    this.FsmKey = "", this.AssetRecord = new AssetRecord
  }
}
exports.StateMachineAssetRecord = StateMachineAssetRecord;
class TemplateDataAssetRecord {
  constructor() {
    this.TemplateDataId = 0, this.AssetRecord = new AssetRecord
  }
}
exports.TemplateDataAssetRecord = TemplateDataAssetRecord;
class CharacterAssetRecord {
  constructor() {
    this.RoleId = 0, this.AiId = 0, this.AssetRecord = new AssetRecord
  }
}
exports.CharacterAssetRecord = CharacterAssetRecord;
class PbDataAssetRecord {
  constructor() {
    this.PbDataId = 0, this.AssetRecord = new AssetRecord
  }
}
exports.PbDataAssetRecord = PbDataAssetRecord;
class EntityMainAssetRecord {
  constructor() {
    this.ModelId = 0, this.ActorClassPath = void 0, this.AssetRecord = new AssetRecord
  }
}
exports.EntityMainAssetRecord = EntityMainAssetRecord;
class AssetElement {
  constructor(t) {
    this.XJr = void 0, this.AssetForIndexMap = new Map, this.HasError = !1, this.AssetPathSet = new Set, this.NeedLoadAssets = new Array, this.NeedLoadAssetTypes = new Array, this.LoadingSet = new Set, this.LoadedSet = new Set, this.AddObjectCallback = void 0, this.LoadPriority = 100, this.ReplaceEffectMap = new Map, this.ReplaceMontageMap = new Map, this.GG1 = void 0, this.B7 = void 0, (this.XJr = t)?.MainAsset?.ReplaceEffectMap && (this.ReplaceEffectMap = t?.MainAsset.ReplaceEffectMap), t?.MainAsset?.ReplaceMontageMap && (this.ReplaceMontageMap = t?.MainAsset.ReplaceMontageMap)
  }
  SetupReplaceEffect(t) {
    t = ResourceSystem_1.ResourceSystem.Load(t, UE.DataTable), t = DataTableUtil_1.DataTableUtil.GetDataTableAllRowFromTable(t);
    if (t.length)
      for (const e of t) {
        let s = e.NewEffect?.ToAssetPathName();
        if (s?.length && "None" !== s) {
          let t = e.OldEffect.ToAssetPathName();
          s.includes("GA_") && (s = s.concat("_C"), t = t.concat("_C")), this.ReplaceEffectMap.set(t, s)
        }
      }
  }
  SetupReplaceMontage(t) {
    t = ResourceSystem_1.ResourceSystem.Load(t, UE.DataTable), t = DataTableUtil_1.DataTableUtil.GetDataTableAllRowFromTable(t);
    if (t.length)
      for (const e of t) {
        var s = e.NewMontage?.ToAssetPathName();
        s?.length && "None" !== s && this.ReplaceMontageMap.set(e.OldMontage.ToAssetPathName(), e.NewMontage.ToAssetPathName())
      }
  }
  GetEntityAssetElement() {
    return this.XJr
  }
  AddPromise(t) {
    t && (this.GG1 || (this.GG1 = new Set), this.GG1.add(t))
  }
  SetPromiseResult(t) {
    if (this.GG1) {
      var s = this.GG1;
      if (this.GG1 = void 0, "boolean" == typeof t)
        for (const e of s) e instanceof GameModePromise_1.GameModePromise ? e.SetResult(t) : e.SetResult(t ? 3 : 4);
      else
        for (const i of s) i instanceof GameModePromise_1.GameModePromise ? i.SetResult(3 === t) : i.SetResult(t)
    }
  }
  SetCallback(t) {
    this.B7 = t
  }
  ExecuteCallback() {
    var t = this.B7;
    this.B7 = void 0, t?.(!this.HasError)
  }
  CheckPath(t) {
    return !(!t || 0 === t.length) || (Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "搜集资源失败，asset=undefined或asset.length=0。"), !1)
  }
  AddPath(t) {
    return !this.AssetPathSet.has(t) && (this.AssetPathSet.add(t), !0)
  }
  AddObject(t, s) {
    return !this.LoadedSet.has(t) && (this.LoadedSet.add(t), this.AddObjectCallback?.(s, t), !0)
  }
  AddActorClass(t) {
    return !!this.CheckPath(t) && !!this.AddPath(t) && (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(0), !0)
  }
  AddAnimation(t) {
    return !!this.CheckPath(t) && (t = this.ReplaceMontageMap.get(t) ?? t, !!this.AddPath(t)) && (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(1), !0)
  }
  AddEffect(t) {
    return !!this.CheckPath(t) && (t = this.ReplaceEffectMap.get(t) ?? t, !!this.AddPath(t)) && (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(2), !0)
  }
  AddAudio(t) {
    return !!this.CheckPath(t) && !!this.AddPath(t) && (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(3), !0)
  }
  AddMesh(t) {
    return !!this.CheckPath(t) && !!this.AddPath(t) && (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(4), !0)
  }
  AddMaterial(t) {
    return !!this.CheckPath(t) && !!this.AddPath(t) && (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(5), !0)
  }
  AddOther(t) {
    return !!this.CheckPath(t) && (t = this.ReplaceEffectMap.get(t) ?? t, !!this.AddPath(t)) && (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(7), !0)
  }
  AddAnimationBlueprint(t) {
    return !!this.CheckPath(t) && !!this.AddPath(t) && (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(6), !0)
  }
  AddAsset(t, s) {
    switch (t) {
      case 0:
        return this.AddActorClass(s);
      case 1:
        return this.AddAnimation(s);
      case 2:
        return this.AddEffect(s);
      case 3:
        return this.AddAudio(s);
      case 4:
        return this.AddMesh(s);
      case 5:
        return this.AddMaterial(s);
      case 6:
        return this.AddAnimationBlueprint(s);
      case 7:
        return this.AddOther(s)
    }
    return !0
  }
  NeedLoadCount() {
    return this.NeedLoadAssets.length
  }
  AddLoading(t) {
    return !this.LoadedSet.has(t) && !this.LoadingSet.has(t) && (this.LoadingSet.add(t), !0)
  }
  RemoveLoading(t) {
    return this.LoadingSet.delete(t)
  }
  RemoveLoaded(t) {
    return this.LoadedSet.delete(t)
  }
  Loading() {
    return 0 < this.NeedLoadAssets.length || 0 < this.LoadingSet.size
  }
  Clear() {
    this.AssetForIndexMap.clear(), this.AssetPathSet.clear(), this.LoadedSet.clear(), this.LoadingSet.clear()
  }
  PrintDebugInfo() {}
}
class CommonAssetElement extends(exports.AssetElement = AssetElement) {
  AddObject(t, s) {
    return !!super.AddObject(t, s) && (this.AssetForIndexMap.set(t, ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject.CommonAssets.Num()), ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject.AddCommonAsset(s), !0)
  }
  PrintDebugInfo() {
    var s = ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject.CommonAssets;
    let e = `
预加载的公共资源列表如下(数量:${s.Num()}):
`;
    var t, i, r = new Map;
    for ([t, i] of this.AssetForIndexMap) r.set(i, t);
    for (let t = 0; t < s.Num(); ++t) {
      var h = s.Get(t),
        o = r.get(t);
      e += `    索引:${t}, Path:${o}, IsValid:${h?.IsValid()}, Name:${h?.IsValid()?h.GetName():void 0}
`
    }
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 3, e)
  }
  Clear() {
    ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject.ClearCommonAsset(), super.Clear()
  }
}
exports.CommonAssetElement = CommonAssetElement;
class SkillAssetManager {
  constructor(t) {
    this.FightAssetManager = t, this.V$a = void 0, this.SkillAssetMap = new Map, this._ar = void 0
  }
  GetEntitySkillPreload(t) {
    var s;
    return this.V$a || (this.V$a = new Map, (s = this.FightAssetManager.EntityAssetElement.BlueprintClassPath)?.length && ModelManager_1.ModelManager.PreloadModelNew.GetSkillPreloadData(s)?.forEach(t => {
      this.V$a.set(t.SkillId, t)
    })), this.V$a.get(t)
  }
  AddSkill(e, t) {
    return void 0 === this._ar && (SkillAssetManager.uMc.Start(), this._ar = UE.NewObject(UE.HoldPreloadObject.StaticClass(), GlobalData_1.GlobalData.GameInstance), SkillAssetManager.uMc.Stop()), this.SkillAssetMap.has(e) && Log_1.Log.CheckDebug() && Log_1.Log.Debug("World", 3, "[预加载] 覆盖添加技能", ["SkillId", e]), t ? (this.SkillAssetMap.set(e, t), t.AddObjectCallback = (t, s) => {
      4 !== this.FightAssetManager.EntityAssetElement.LoadState && this._ar.AddEntityAsset(e, t)
    }, !0) : (Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "[预加载] assetElement无效，添加技能失败", ["SkillId", e]), !1)
  }
  RemoveSkill(t) {
    var s = this.SkillAssetMap.get(t);
    return !!s && (s.SetPromiseResult(4), this.SkillAssetMap.delete(t), this._ar?.RemoveEntityAssets(t), !0)
  }
  GetSkill(t) {
    t = this.SkillAssetMap.get(t);
    if (t) return t
  }
  Clear() {
    for (var [, t] of this.SkillAssetMap) t.SetPromiseResult(4);
    this.SkillAssetMap.clear(), this._ar?.Clear()
  }
}(exports.SkillAssetManager = SkillAssetManager).uMc = Stats_1.Stat.Create("Preload.AddSkill.NewObject");
class BulletAssetManager {
  constructor(t) {
    this.FightAssetManager = t, this.BulletMapping = new Map, this.IndexMapping = new Map, this.BulletAssetMap = new Map, this._ar = void 0, this.jEe = -1
  }
  AddBullet(t, s) {
    if (void 0 === this._ar && (this._ar = UE.NewObject(UE.HoldPreloadObject.StaticClass(), GlobalData_1.GlobalData.GameInstance)), this.BulletMapping.has(t)) return Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "[预加载] 重复添加子弹", ["BulletId", t]), !1;
    if (!s) return Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "[预加载] assetElement无效，添加子弹失败", ["bulletId", t]), !1;
    const e = ++this.jEe;
    return this.BulletMapping.set(t, e), this.IndexMapping.set(e, t), this.BulletAssetMap.set(e, s), s.AddObjectCallback = (t, s) => {
      4 !== this.FightAssetManager.EntityAssetElement.LoadState && this._ar.AddEntityAsset(e, t)
    }, !0
  }
  GetBullet(t) {
    t = this.BulletMapping.get(t);
    if (void 0 !== t) return this.BulletAssetMap.get(t)
  }
  RemoveBullet(t) {
    var s, e = this.BulletMapping.get(t);
    return void 0 !== e && ((s = this.BulletAssetMap.get(e)) && s.SetPromiseResult(4), this.IndexMapping.delete(e), this.BulletMapping.delete(t), this.BulletAssetMap.delete(e), this._ar?.RemoveEntityAssets(e), !0)
  }
  Clear() {
    for (var [, t] of this.BulletAssetMap) t.SetPromiseResult(4);
    this.jEe = -1, this.BulletMapping.clear(), this.IndexMapping.clear(), this.BulletAssetMap.clear(), this._ar?.Clear()
  }
}
exports.BulletAssetManager = BulletAssetManager;
class PbDataAssetManager {
  constructor(t) {
    this.FightAssetManager = t, this._ar = void 0, this._Gt = 1
  }
  InitPbData(t) {
    return void 0 === this._ar && (this._ar = UE.NewObject(UE.HoldPreloadObject.StaticClass(), GlobalData_1.GlobalData.GameInstance)), t ? (t.AddObjectCallback = (t, s) => {
      4 !== this.FightAssetManager.EntityAssetElement.LoadState && this._ar.AddEntityAsset(this._Gt, t)
    }, !0) : (Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "[预加载] assetElement无效"), !1)
  }
  Clear() {
    this._ar?.Clear()
  }
}
exports.PbDataAssetManager = PbDataAssetManager;
class TemplateDataAssetManager {
  constructor(t) {
    this.FightAssetManager = t, this._ar = void 0, this._Gt = 1
  }
  InitTemplateData(t) {
    return void 0 === this._ar && (this._ar = UE.NewObject(UE.HoldPreloadObject.StaticClass(), GlobalData_1.GlobalData.GameInstance)), t ? (t.AddObjectCallback = (t, s) => {
      4 !== this.FightAssetManager.EntityAssetElement.LoadState && this._ar.AddEntityAsset(this._Gt, t)
    }, !0) : (Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "[预加载] assetElement无效"), !1)
  }
  Clear() {
    this._ar?.Clear()
  }
}
exports.TemplateDataAssetManager = TemplateDataAssetManager;
class FightAssetManager {
  constructor(t) {
    this.EntityAssetElement = t, this.SkillAssetManager = new SkillAssetManager(this), this.BulletAssetManager = new BulletAssetManager(this), this.PbDataAssetManager = new PbDataAssetManager(this), this.TemplateDataAssetManager = new TemplateDataAssetManager(this)
  }
  Clear() {
    this.SkillAssetManager.Clear(), this.BulletAssetManager.Clear(), this.PbDataAssetManager.Clear(), this.TemplateDataAssetManager.Clear()
  }
}
exports.FightAssetManager = FightAssetManager;
class EntityAssetElement {
  constructor(t) {
    this.Promise = void 0, this.MainAsset = new AssetElement(this), this.FightAssetManager = new FightAssetManager(this), this.EntityHandle = void 0, this.CreatureDataComponent = void 0, this.Callbacks = void 0, this.LoadPriority = 100, this.uar = 0, this.car = !1, this.mar = void 0, this.IsDestroy = !1, this.EntityHandle = t, this.CreatureDataComponent = t.Entity.GetComponent(0), (ModelManager_1.ModelManager.PreloadModelNew.LoadingNeedWaitEntitySet.has(t.Id) || this.CreatureDataComponent.IsRole()) && (this.LoadPriority = 101), t.Priority = Math.max(this.LoadPriority, t.Priority)
  }
  get LoadState() {
    return this.uar
  }
  set LoadState(t) {
    this.uar = t
  }
  get CollectMinorAsset() {
    return this.car
  }
  set CollectMinorAsset(t) {
    this.car = t
  }
  get Entity() {
    return this.EntityHandle?.Entity
  }
  get BlueprintClassPath() {
    return this.mar
  }
  set BlueprintClassPath(t) {
    this.mar = t
  }
  AddCallback(t) {
    t && (this.Callbacks || (this.Callbacks = new Array), this.Callbacks.push(t))
  }
  DoCallback(t) {
    if (this.Callbacks?.length) {
      for (const s of this.Callbacks) s(t);
      this.Callbacks = void 0
    }
  }
  ClearCallback() {
    this.Callbacks = void 0
  }
  Clear() {
    var t = this.Entity?.GetComponent(0)?.GetCreatureDataId();
    ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject.RemoveEntityAssets(t), this.FightAssetManager.Clear(), this.mar = void 0, this.EntityHandle = void 0, this.CreatureDataComponent = void 0, this.car = !1, this.Callbacks && this.DoCallback(4), this.Callbacks = void 0, this.uar = 0, this.IsDestroy = !0
  }
  PrintDebugInfo() {}
}
exports.EntityAssetElement = EntityAssetElement;
class PreloadSetting {
  static get UseNewPreload() {
    return PreloadSetting.dar
  }
  static SetUseNewPreload(t) {
    PreloadSetting.dar = t
  }
}(exports.PreloadSetting = PreloadSetting).Default = new PreloadSetting, PreloadSetting.dar = !0, PreloadSetting.LoadAllPreloadData = !1;
class ModelAssetSkillManager {
  constructor(t) {
    this.ModelAssetElement = t, this.ty1 = void 0, this.SkillAssetMap = new Map, this._ar = void 0
  }
  GetEntitySkillPreload(t) {
    var s;
    return this.ty1 || (this.ty1 = new Map, (s = this.ModelAssetElement.BlueprintClassPath)?.length && ModelManager_1.ModelManager.PreloadModelNew.GetSkillPreloadData(s)?.forEach(t => {
      this.ty1.set(t.SkillId, t)
    })), this.ty1.get(t)
  }
  AddSkill(e, t) {
    return void 0 === this._ar && (ModelAssetSkillManager.uMc.Start(), this._ar = UE.NewObject(UE.HoldPreloadObject.StaticClass(), GlobalData_1.GlobalData.GameInstance), ModelAssetSkillManager.uMc.Stop()), this.SkillAssetMap.has(e) && Log_1.Log.CheckDebug() && Log_1.Log.Debug("World", 3, "[预加载] 覆盖添加技能", ["SkillId", e]), t ? (this.SkillAssetMap.set(e, t), t.AddObjectCallback = (t, s) => {
      this.ModelAssetElement.IsDestroy || this._ar.AddEntityAsset(e, t)
    }, !0) : (Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "[预加载] assetElement无效，添加技能失败", ["SkillId", e]), !1)
  }
  Clear() {
    this.ty1?.clear(), this.SkillAssetMap.clear(), this._ar?.Clear()
  }
}(exports.ModelAssetSkillManager = ModelAssetSkillManager).uMc = Stats_1.Stat.Create("Preload.AddSkill.NewObject");
class ModelAssetBulletManager {
  constructor(t) {
    this.ModelAssetElement = t, this.ValueMapping = new Map, this.IndexMapping = new Map, this.AssetMap = new Map, this._ar = void 0, this.jEe = -1
  }
  AddAsset(t, s) {
    if (void 0 === this._ar && (ModelAssetBulletManager.Pmu.Start(), this._ar = UE.NewObject(UE.HoldPreloadObject.StaticClass(), GlobalData_1.GlobalData.GameInstance), ModelAssetBulletManager.Pmu.Stop()), this.ValueMapping.has(t)) return Log_1.Log.CheckDebug() && Log_1.Log.Debug("World", 3, "[预加载] 重复添加", ["Id", t]), !1;
    if (!s) return Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "[预加载] assetElement无效，添加失败", ["Id", t]), !1;
    const e = ++this.jEe;
    return this.ValueMapping.set(t, e), this.IndexMapping.set(e, t), this.AssetMap.set(e, s), s.AddObjectCallback = (t, s) => {
      this.ModelAssetElement.IsDestroy || this._ar.AddEntityAsset(e, t)
    }, !0
  }
  Clear() {
    this.jEe = -1, this.ValueMapping.clear(), this.IndexMapping.clear(), this.AssetMap.clear(), this._ar?.Clear()
  }
}(exports.ModelAssetBulletManager = ModelAssetBulletManager).Pmu = Stats_1.Stat.Create("Preload.AddStat1.NewObject");
class ModelAssetElement {
  constructor() {
    this.Promise = void 0, this.MainAsset = new AssetElement(void 0), this.SkillAssetManager = new ModelAssetSkillManager(this), this.BulletAssetManager = new ModelAssetBulletManager(this), this.Callbacks = void 0, this.IsDestroy = !1, this.LoadPriority = 101, this.uar = 0, this.mar = void 0
  }
  get LoadState() {
    return this.uar
  }
  set LoadState(t) {
    this.uar = t
  }
  get BlueprintClassPath() {
    return this.mar
  }
  set BlueprintClassPath(t) {
    this.mar = t
  }
  AddCallback(t) {
    t && (this.Callbacks || (this.Callbacks = new Array), this.Callbacks.push(t))
  }
  DoCallback(t) {
    if (this.Callbacks?.length) {
      for (const s of this.Callbacks) s(t);
      this.Callbacks = void 0
    }
  }
  ClearCallback() {
    this.Callbacks = void 0
  }
  Clear() {
    this.IsDestroy = !0, this.Callbacks && this.DoCallback(4), this.SkillAssetManager.Clear(), this.BulletAssetManager.Clear(), this.Callbacks = void 0, this.uar = 0
  }
  PrintDebugInfo() {}
}
exports.ModelAssetElement = ModelAssetElement;
class PlotAssetManager {
  constructor() {
    this.zv1 = new Map, this.PE1 = new Map, this.xE1 = 1, this.Mfe = void 0, this.IdPendingMap = new Map, this.PendingList = new PriorityQueue_1.PriorityQueue((t, s) => s.Priority - t.Priority), this.UE1 = (t, s) => {
      var e;
      this.PE1.has(s) ? (e = this.PE1.get(s), this.Mfe.AddEntityAsset(e, t), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 加载完毕，持有引用", ["key", e], ["path", s])) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 加载完成时剧情已移除", ["path", s])
    }
  }
  Init() {
    this.Mfe = UE.NewObject(UE.HoldPreloadObject.StaticClass(), GlobalData_1.GlobalData.GameInstance)
  }
  CheckCanLoad(t, s) {
    return 100 < s || 0 === this.zv1.size
  }
  AddPending(t, s) {
    var e;
    this.zv1.has(t) || (this.IdPendingMap.has(t) ? ((e = this.IdPendingMap.get(t)).Priority = s, this.PendingList.Update(e)) : (this.IdPendingMap.set(t, e = {
      Id: t,
      Priority: s
    }), this.PendingList.Push(e)))
  }
  RemovePending(t) {
    this.IdPendingMap.has(t) && this.PendingList.Remove(this.IdPendingMap.get(t))
  }
  CheckAndGetPendingPreload() {
    var t;
    if (0 !== this.PendingList.Size) return t = this.PendingList.Top, this.CheckCanLoad(t.Id, t.Priority) ? this.PendingList.Pop() : void 0
  }
  AddPlotAssetElement(t) {
    var s;
    if (!this.zv1.has(t)) return (s = new AssetElement(void 0)).AddObjectCallback = this.UE1, this.zv1.set(t, s), s;
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 剧情预加载重复", ["id", t])
  }
  RemovePlotAssetElement(t) {
    var s;
    return !!this.zv1.has(t) && ((s = this.zv1.get(t)).LoadingSet.forEach(t => {
      this.PE1.delete(t)
    }), s.LoadedSet.forEach(t => {
      var s = this.PE1.get(t);
      this.Mfe.RemoveEntityAssets(s), this.PE1.delete(t), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 卸载资源，移除引用", ["key", s])
    }), this.zv1.delete(t), !0)
  }
  AddPath(t, s) {
    t.AddOther(s) && (t = this.xE1++, this.PE1.set(s, t))
  }
  RemoveAllPreload() {
    this.PendingList.Clear(), this.IdPendingMap.clear(), this.zv1.clear(), this.PE1.clear(), this.Mfe && this.Mfe.Clear(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 清理所有预载剧情")
  }
  Clear() {
    this.RemoveAllPreload(), this.Mfe = void 0
  }
  CheckIsLoading(t) {
    var s = this.zv1.get(t);
    return s ? s.Loading() : !!this.IdPendingMap.get(t)
  }
  GetAsset(t, s, e) {
    var i;
    return this.PE1.has(t) ? (i = this.PE1.get(t), (i = this.Mfe.EntityAssetMap.Get(i)) && 0 < i.Assets.Num() ? (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 加载完成的资产", ["path", t]), e(i.Assets.Get(0), t)) : e(void 0, t), ResourceSystem_1.ResourceSystem.InvalidId) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 需要加载的资产", ["path", t]), ResourceSystem_1.ResourceSystem.LoadAsync(t, s, e))
  }
  DebugLog() {}
}
exports.PlotAssetManager = PlotAssetManager;
class PbPreloadAssetElement extends AssetElement {
  constructor(t) {
    super(void 0), this.PbDataId = void 0, this.PbDataId = t
  }
  get GetPbDataId() {
    return this.PbDataId
  }
  get qj1() {
    return -(this.PbDataId ?? 0)
  }
  AddObject(t, s) {
    return !!super.AddObject(t, s) && (ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject.AddEntityAsset(this.qj1, s), !0)
  }
}
exports.PbPreloadAssetElement = PbPreloadAssetElement;
class AssetElementBundleBase {
  constructor() {
    this.Promise = void 0, this.Callbacks = void 0, this.LoadPriority = 100, this.LoadStateInternal = 0, this.IsDestroy = !1
  }
  get LoadState() {
    return this.LoadStateInternal
  }
  set LoadState(t) {
    this.LoadStateInternal = t
  }
  AddCallback(t) {
    t && (this.Callbacks || (this.Callbacks = new Array), this.Callbacks.push(t))
  }
  DoCallback(t) {
    if (this.Callbacks?.length) {
      for (const s of this.Callbacks) s(t);
      this.Callbacks = void 0
    }
  }
  ClearCallback() {
    this.Callbacks = void 0
  }
  Clear() {
    this.Callbacks && this.DoCallback(4), this.Callbacks = void 0, this.LoadStateInternal = 0, this.IsDestroy = !0
  }
  PrintDebugInfo() {}
}
class PbEntityAssetElement extends AssetElementBundleBase {
  constructor(t) {
    super(), this.PbDataId = void 0, this.Promise = void 0, this.MainAsset = void 0, this.FightAssetManager = new FightAssetManager(this), this.car = !1, this.mar = void 0, this.PbDataId = t, this.LoadPriority = 101, this.MainAsset = new PbPreloadAssetElement(t)
  }
  get CollectMinorAsset() {
    return this.car
  }
  set CollectMinorAsset(t) {
    this.car = t
  }
  get BlueprintClassPath() {
    return this.mar
  }
  set BlueprintClassPath(t) {
    this.mar = t
  }
  get qj1() {
    return -(this.PbDataId ?? 0)
  }
  Clear() {
    super.Clear(), ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject.RemoveEntityAssets(this.qj1), this.FightAssetManager.Clear(), this.mar = void 0, this.car = !1, this.Callbacks && this.DoCallback(4), this.Callbacks = void 0, this.LoadStateInternal = 0, this.IsDestroy = !0
  }
}
exports.PbEntityAssetElement = PbEntityAssetElement;
//# sourceMappingURL=PreloadDefine.js.map