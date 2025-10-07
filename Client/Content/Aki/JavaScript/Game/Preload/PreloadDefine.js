"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PbEntityAssetElement = exports.PbPreloadAssetElement = exports.PlotAssetManager = exports.ModelAssetElement = exports.ModelAssetBulletManager = exports.ModelAssetSkillManager = exports.PreloadSetting = exports.EntityAssetElement = exports.FightAssetManager = exports.TemplateDataAssetManager = exports.PbDataAssetManager = exports.BulletAssetManager = exports.SkillAssetManager = exports.CommonAssetElement = exports.AssetElement = exports.EntityMainAssetRecord = exports.PbDataAssetRecord = exports.CharacterAssetRecord = exports.TemplateDataAssetRecord = exports.StateMachineAssetRecord = exports.BulletAssetRecord = exports.SkillAssetRecord = exports.AssetRecord = exports.USE_DB = undefined;
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const PriorityQueue_1 = require("../../Core/Container/PriorityQueue");
const Macro_1 = require("../../Core/Preprocessor/Macro");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../Core/Utils/DataTableUtil");
const MapUtils_1 = require("../../Core/Utils/MapUtils");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
const GameModePromise_1 = require("../World/Define/GameModePromise");
exports.USE_DB = false;
const FORBID_PATH = "/Game/Aki/Scene/Assets/Temp";
class AssetRecord {
  constructor() {
    this.AssetSet = new Set();
    this.ActorClass = new Array();
    this.Animations = new Array();
    this.Effects = new Array();
    this.Audios = new Array();
    this.Meshes = new Array();
    this.Materials = new Array();
    this.AnimationBlueprints = new Array();
    this.Others = new Array();
  }
  AddActorClass(t) {
    return !!this.lar(t) && (this.ActorClass.push(t), true);
  }
  AddAnimation(t) {
    if (this.lar(t)) {
      this.Animations.push(t);
    }
  }
  TryAddEffect(t) {
    let s = t;
    if (t.includes("GA_")) {
      s = t.concat("_C");
    }
    if (UE.KuroEditorUtilityLibrary.GetAssetData(s)?.AssetClass?.toString()?.startsWith("EffectModel")) {
      return [t = this.AddEffect(s), t];
    } else {
      return [this.AddOther(s), false];
    }
  }
  AddEffect(t) {
    return !!this.lar(t) && (this.Effects.push(t), true);
  }
  AddAudio(t) {
    if (this.lar(t)) {
      this.Audios.push(t);
    }
  }
  AddMesh(t) {
    if (this.lar(t)) {
      this.Meshes.push(t);
    }
  }
  AddMaterial(t) {
    if (this.lar(t)) {
      this.Materials.push(t);
    }
  }
  AddAnimationBlueprint(t) {
    if (this.lar(t)) {
      this.AnimationBlueprints.push(t);
    }
  }
  AddOther(t) {
    return !!this.lar(t) && (this.Others.push(t), true);
  }
  lar(t) {
    return !!t?.length && !(t.startsWith(FORBID_PATH) ? (Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 3, "[预加载] 不能搜集该目录的资源", ["Path", t]), 1) : this.AssetSet.has(t) || (this.AssetSet.add(t), 0));
  }
  Copy(t) {
    for (const s of t.ActorClass) {
      this.AddActorClass(s);
    }
    for (const e of t.Animations) {
      this.AddAnimation(e);
    }
    for (const i of t.Effects) {
      this.AddEffect(i);
    }
    for (const r of t.Audios) {
      this.AddAudio(r);
    }
    for (const h of t.Meshes) {
      this.AddMesh(h);
    }
    for (const o of t.Materials) {
      this.AddMaterial(o);
    }
    for (const a of t.AnimationBlueprints) {
      this.AddAnimationBlueprint(a);
    }
    for (const n of t.Others) {
      this.AddOther(n);
    }
    return true;
  }
}
exports.AssetRecord = AssetRecord;
class SkillAssetRecord {
  constructor() {
    this.SkillId = 0;
    this.ActorBlueprint = "";
    this.LoadType = 0;
    this.IsCommon = false;
    this.HasMontagePath = false;
    this.AssetRecord = new AssetRecord();
  }
}
exports.SkillAssetRecord = SkillAssetRecord;
class BulletAssetRecord {
  constructor() {
    this.BulletId = "";
    this.ActorBlueprint = "";
    this.AssetRecord = new AssetRecord();
  }
}
exports.BulletAssetRecord = BulletAssetRecord;
class StateMachineAssetRecord {
  constructor() {
    this.FsmKey = "";
    this.AssetRecord = new AssetRecord();
  }
}
exports.StateMachineAssetRecord = StateMachineAssetRecord;
class TemplateDataAssetRecord {
  constructor() {
    this.TemplateDataId = 0;
    this.AssetRecord = new AssetRecord();
  }
}
exports.TemplateDataAssetRecord = TemplateDataAssetRecord;
class CharacterAssetRecord {
  constructor() {
    this.RoleId = 0;
    this.AiId = 0;
    this.AssetRecord = new AssetRecord();
  }
}
exports.CharacterAssetRecord = CharacterAssetRecord;
class PbDataAssetRecord {
  constructor() {
    this.PbDataId = 0;
    this.AssetRecord = new AssetRecord();
  }
}
exports.PbDataAssetRecord = PbDataAssetRecord;
class EntityMainAssetRecord {
  constructor() {
    this.ModelId = 0;
    this.ActorClassPath = undefined;
    this.AssetRecord = new AssetRecord();
  }
}
exports.EntityMainAssetRecord = EntityMainAssetRecord;
class AssetElement {
  constructor(t) {
    this.XJr = undefined;
    this.AssetForIndexMap = new Map();
    this.HasError = false;
    this.AssetPathSet = new Set();
    this.NeedLoadAssets = new Array();
    this.NeedLoadAssetTypes = new Array();
    this.LoadingSet = new Set();
    this.LoadedSet = new Set();
    this.AddObjectCallback = undefined;
    this.LoadPriority = 100;
    this.ReplaceEffectMap = new Map();
    this.ReplaceMontageMap = new Map();
    this.gF1 = undefined;
    this.B7 = undefined;
    if ((this.XJr = t)?.MainAsset?.ReplaceEffectMap) {
      this.ReplaceEffectMap = t?.MainAsset.ReplaceEffectMap;
    }
    if (t?.MainAsset?.ReplaceMontageMap) {
      this.ReplaceMontageMap = t?.MainAsset.ReplaceMontageMap;
    }
  }
  SetupReplaceEffect(t) {
    t = ResourceSystem_1.ResourceSystem.Load(t, UE.DataTable);
    t = DataTableUtil_1.DataTableUtil.GetDataTableAllRowFromTable(t);
    if (t.length) {
      for (const e of t) {
        let s = e.NewEffect?.ToAssetPathName();
        if (s?.length && s !== "None") {
          let t = e.OldEffect.ToAssetPathName();
          if (s.includes("GA_")) {
            s = s.concat("_C");
            t = t.concat("_C");
          }
          this.ReplaceEffectMap.set(t, s);
        }
      }
    }
  }
  SetupReplaceMontage(t) {
    t = ResourceSystem_1.ResourceSystem.Load(t, UE.DataTable);
    t = DataTableUtil_1.DataTableUtil.GetDataTableAllRowFromTable(t);
    if (t.length) {
      for (const e of t) {
        var s = e.NewMontage?.ToAssetPathName();
        if (s?.length && s !== "None") {
          this.ReplaceMontageMap.set(e.OldMontage.ToAssetPathName(), e.NewMontage.ToAssetPathName());
        }
      }
    }
  }
  GetEntityAssetElement() {
    return this.XJr;
  }
  AddPromise(t) {
    if (t) {
      this.gF1 ||= new Set();
      this.gF1.add(t);
    }
  }
  SetPromiseResult(t) {
    if (this.gF1) {
      var s = this.gF1;
      this.gF1 = undefined;
      if (typeof t == "boolean") {
        for (const e of s) {
          if (e instanceof GameModePromise_1.GameModePromise) {
            e.SetResult(t);
          } else {
            e.SetResult(t ? 3 : 4);
          }
        }
      } else {
        for (const i of s) {
          if (i instanceof GameModePromise_1.GameModePromise) {
            i.SetResult(t === 3);
          } else {
            i.SetResult(t);
          }
        }
      }
    }
  }
  SetCallback(t) {
    this.B7 = t;
  }
  ExecuteCallback() {
    var t = this.B7;
    this.B7 = undefined;
    t?.(!this.HasError);
  }
  CheckPath(t) {
    return !!t && t.length !== 0 || (Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "搜集资源失败，asset=undefined或asset.length=0。"), false);
  }
  AddPath(t) {
    return !this.AssetPathSet.has(t) && (this.AssetPathSet.add(t), true);
  }
  AddObject(t, s) {
    return !this.LoadedSet.has(t) && (this.LoadedSet.add(t), this.AddObjectCallback?.(s, t), true);
  }
  AddActorClass(t) {
    return !!this.CheckPath(t) && !!this.AddPath(t) && (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(0), true);
  }
  AddAnimation(t) {
    return !!this.CheckPath(t) && (t = this.ReplaceMontageMap.get(t) ?? t, !!this.AddPath(t)) && (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(1), true);
  }
  AddEffect(t) {
    return !!this.CheckPath(t) && (t = this.ReplaceEffectMap.get(t) ?? t, !!this.AddPath(t)) && (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(2), true);
  }
  AddAudio(t) {
    return !!this.CheckPath(t) && !!this.AddPath(t) && (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(3), true);
  }
  AddMesh(t) {
    return !!this.CheckPath(t) && !!this.AddPath(t) && (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(4), true);
  }
  AddMaterial(t) {
    return !!this.CheckPath(t) && !!this.AddPath(t) && (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(5), true);
  }
  AddOther(t) {
    return !!this.CheckPath(t) && (t = this.ReplaceEffectMap.get(t) ?? t, !!this.AddPath(t)) && (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(7), true);
  }
  AddAnimationBlueprint(t) {
    return !!this.CheckPath(t) && !!this.AddPath(t) && (this.NeedLoadAssets.push(t), this.NeedLoadAssetTypes.push(6), true);
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
        return this.AddOther(s);
    }
    return true;
  }
  NeedLoadCount() {
    return this.NeedLoadAssets.length;
  }
  AddLoading(t) {
    return !this.LoadedSet.has(t) && !this.LoadingSet.has(t) && (this.LoadingSet.add(t), true);
  }
  RemoveLoading(t) {
    return this.LoadingSet.delete(t);
  }
  RemoveLoaded(t) {
    return this.LoadedSet.delete(t);
  }
  Loading() {
    return this.NeedLoadAssets.length > 0 || this.LoadingSet.size > 0;
  }
  Clear() {
    this.AssetForIndexMap.clear();
    this.AssetPathSet.clear();
    this.LoadedSet.clear();
    this.LoadingSet.clear();
  }
  PrintDebugInfo() {}
}
class CommonAssetElement extends (exports.AssetElement = AssetElement) {
  AddObject(t, s) {
    return !!super.AddObject(t, s) && (this.AssetForIndexMap.set(t, ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject.CommonAssets.Num()), ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject.AddCommonAsset(s), true);
  }
  PrintDebugInfo() {
    var s = ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject.CommonAssets;
    let e = `
预加载的公共资源列表如下(数量:${s.Num()}):
`;
    var t;
    var i;
    var r = new Map();
    for ([t, i] of this.AssetForIndexMap) {
      r.set(i, t);
    }
    for (let t = 0; t < s.Num(); ++t) {
      var h = s.Get(t);
      var o = r.get(t);
      e += `    索引:${t}, Path:${o}, IsValid:${h?.IsValid()}, Name:${h?.IsValid() ? h.GetName() : undefined}
`;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Preload", 3, e);
    }
  }
  Clear() {
    ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject.ClearCommonAsset();
    super.Clear();
  }
}
exports.CommonAssetElement = CommonAssetElement;
class SkillAssetManager {
  constructor(t) {
    this.FightAssetManager = t;
    this.V$a = undefined;
    this.SkillAssetMap = new Map();
    this._ar = undefined;
    this.LoadTypeList = undefined;
  }
  GetEntitySkillPreload(t) {
    var s;
    if (!this.V$a) {
      this.V$a = new Map();
      if ((s = this.FightAssetManager.EntityAssetElement.BlueprintClassPath)?.length) {
        ModelManager_1.ModelManager.PreloadModelNew.GetSkillPreloadData(s)?.forEach(t => {
          if (this.LoadTypeList?.includes(t.LoadType) || t.LoadType === 0 && !this.V$a.has(t.SkillId)) {
            this.V$a.set(t.SkillId, t);
          }
        });
      }
    }
    return this.V$a.get(t);
  }
  AddSkill(e, t) {
    if (this._ar === undefined) {
      SkillAssetManager.uMc.Start();
      this._ar = UE.NewObject(UE.HoldPreloadObject.StaticClass(), GlobalData_1.GlobalData.GameInstance);
      SkillAssetManager.uMc.Stop();
    }
    if (this.SkillAssetMap.has(e) && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("World", 3, "[预加载] 覆盖添加技能", ["SkillId", e]);
    }
    if (t) {
      this.SkillAssetMap.set(e, t);
      t.AddObjectCallback = (t, s) => {
        if (this.FightAssetManager.EntityAssetElement.LoadState !== 4) {
          this._ar.AddEntityAsset(e, t);
        }
      };
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[预加载] assetElement无效，添加技能失败", ["SkillId", e]);
      }
      return false;
    }
  }
  RemoveSkill(t) {
    var s = this.SkillAssetMap.get(t);
    return !!s && (s.SetPromiseResult(4), this.SkillAssetMap.delete(t), this._ar?.RemoveEntityAssets(t), true);
  }
  GetSkill(t) {
    t = this.SkillAssetMap.get(t);
    if (t) {
      return t;
    }
  }
  Clear() {
    for (var [, t] of this.SkillAssetMap) {
      t.SetPromiseResult(4);
    }
    this.SkillAssetMap.clear();
    this._ar?.Clear();
  }
}
(exports.SkillAssetManager = SkillAssetManager).uMc = Stats_1.Stat.Create("Preload.AddSkill.NewObject");
class BulletAssetManager {
  constructor(t) {
    this.FightAssetManager = t;
    this.BulletMapping = new Map();
    this.IndexMapping = new Map();
    this.BulletAssetMap = new Map();
    this._ar = undefined;
    this.jEe = -1;
  }
  AddBullet(t, s) {
    if (this._ar === undefined) {
      this._ar = UE.NewObject(UE.HoldPreloadObject.StaticClass(), GlobalData_1.GlobalData.GameInstance);
    }
    if (this.BulletMapping.has(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[预加载] 重复添加子弹", ["BulletId", t]);
      }
      return false;
    }
    if (!s) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[预加载] assetElement无效，添加子弹失败", ["bulletId", t]);
      }
      return false;
    }
    const e = ++this.jEe;
    this.BulletMapping.set(t, e);
    this.IndexMapping.set(e, t);
    this.BulletAssetMap.set(e, s);
    s.AddObjectCallback = (t, s) => {
      if (this.FightAssetManager.EntityAssetElement.LoadState !== 4) {
        this._ar.AddEntityAsset(e, t);
      }
    };
    return true;
  }
  GetBullet(t) {
    t = this.BulletMapping.get(t);
    if (t !== undefined) {
      return this.BulletAssetMap.get(t);
    }
  }
  RemoveBullet(t) {
    var s;
    var e = this.BulletMapping.get(t);
    return e !== undefined && ((s = this.BulletAssetMap.get(e)) && s.SetPromiseResult(4), this.IndexMapping.delete(e), this.BulletMapping.delete(t), this.BulletAssetMap.delete(e), this._ar?.RemoveEntityAssets(e), true);
  }
  Clear() {
    for (var [, t] of this.BulletAssetMap) {
      t.SetPromiseResult(4);
    }
    this.jEe = -1;
    this.BulletMapping.clear();
    this.IndexMapping.clear();
    this.BulletAssetMap.clear();
    this._ar?.Clear();
  }
}
exports.BulletAssetManager = BulletAssetManager;
class PbDataAssetManager {
  constructor(t) {
    this.FightAssetManager = t;
    this._ar = undefined;
    this._Gt = 1;
  }
  InitPbData(t) {
    if (this._ar === undefined) {
      this._ar = UE.NewObject(UE.HoldPreloadObject.StaticClass(), GlobalData_1.GlobalData.GameInstance);
    }
    if (t) {
      t.AddObjectCallback = (t, s) => {
        if (this.FightAssetManager.EntityAssetElement.LoadState !== 4) {
          this._ar.AddEntityAsset(this._Gt, t);
        }
      };
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[预加载] assetElement无效");
      }
      return false;
    }
  }
  Clear() {
    this._ar?.Clear();
  }
}
exports.PbDataAssetManager = PbDataAssetManager;
class TemplateDataAssetManager {
  constructor(t) {
    this.FightAssetManager = t;
    this._ar = undefined;
    this._Gt = 1;
  }
  InitTemplateData(t) {
    if (this._ar === undefined) {
      this._ar = UE.NewObject(UE.HoldPreloadObject.StaticClass(), GlobalData_1.GlobalData.GameInstance);
    }
    if (t) {
      t.AddObjectCallback = (t, s) => {
        if (this.FightAssetManager.EntityAssetElement.LoadState !== 4) {
          this._ar.AddEntityAsset(this._Gt, t);
        }
      };
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[预加载] assetElement无效");
      }
      return false;
    }
  }
  Clear() {
    this._ar?.Clear();
  }
}
exports.TemplateDataAssetManager = TemplateDataAssetManager;
class FightAssetManager {
  constructor(t) {
    this.EntityAssetElement = t;
    this.SkillAssetManager = new SkillAssetManager(this);
    this.BulletAssetManager = new BulletAssetManager(this);
    this.PbDataAssetManager = new PbDataAssetManager(this);
    this.TemplateDataAssetManager = new TemplateDataAssetManager(this);
  }
  Clear() {
    this.SkillAssetManager.Clear();
    this.BulletAssetManager.Clear();
    this.PbDataAssetManager.Clear();
    this.TemplateDataAssetManager.Clear();
  }
}
exports.FightAssetManager = FightAssetManager;
class EntityAssetElement {
  constructor(t) {
    this.Promise = undefined;
    this.MainAsset = new AssetElement(this);
    this.FightAssetManager = new FightAssetManager(this);
    this.EntityHandle = undefined;
    this.CreatureDataComponent = undefined;
    this.Callbacks = undefined;
    this.LoadPriority = 100;
    this.uar = 0;
    this.car = false;
    this.mar = undefined;
    this.IsDestroy = false;
    this.EntityHandle = t;
    this.CreatureDataComponent = t.Entity.GetComponent(0);
    if (ModelManager_1.ModelManager.PreloadModelNew.LoadingNeedWaitEntitySet.has(t.Id) || this.CreatureDataComponent.IsRole()) {
      this.LoadPriority = 101;
    }
    t.Priority = Math.max(this.LoadPriority, t.Priority);
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
    return this.EntityHandle?.Entity;
  }
  get BlueprintClassPath() {
    return this.mar;
  }
  set BlueprintClassPath(t) {
    this.mar = t;
  }
  AddCallback(t) {
    if (t) {
      this.Callbacks ||= new Array();
      this.Callbacks.push(t);
    }
  }
  DoCallback(t) {
    if (this.Callbacks?.length) {
      for (const s of this.Callbacks) {
        s(t);
      }
      this.Callbacks = undefined;
    }
  }
  ClearCallback() {
    this.Callbacks = undefined;
  }
  Clear() {
    var t = this.Entity?.GetComponent(0)?.GetCreatureDataId();
    ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject.RemoveEntityAssets(t);
    this.FightAssetManager.Clear();
    this.mar = undefined;
    this.EntityHandle = undefined;
    this.CreatureDataComponent = undefined;
    this.car = false;
    if (this.Callbacks) {
      this.DoCallback(4);
    }
    this.Callbacks = undefined;
    this.uar = 0;
    this.IsDestroy = true;
  }
  PrintDebugInfo() {}
}
exports.EntityAssetElement = EntityAssetElement;
class PreloadSetting {
  static get UseNewPreload() {
    return PreloadSetting.dar;
  }
  static SetUseNewPreload(t) {
    PreloadSetting.dar = t;
  }
}
(exports.PreloadSetting = PreloadSetting).Default = new PreloadSetting();
PreloadSetting.dar = true;
PreloadSetting.LoadAllPreloadData = false;
class ModelAssetSkillManager {
  constructor(t) {
    this.ModelAssetElement = t;
    this.Ty1 = undefined;
    this.SkillAssetMap = new Map();
    this._ar = undefined;
  }
  GetEntitySkillPreload(t) {
    var s;
    if (!this.Ty1) {
      this.Ty1 = new Map();
      if ((s = this.ModelAssetElement.BlueprintClassPath)?.length) {
        ModelManager_1.ModelManager.PreloadModelNew.GetSkillPreloadData(s)?.forEach(t => {
          this.Ty1.set(t.SkillId, t);
        });
      }
    }
    return this.Ty1.get(t);
  }
  AddSkill(e, t) {
    if (this._ar === undefined) {
      ModelAssetSkillManager.uMc.Start();
      this._ar = UE.NewObject(UE.HoldPreloadObject.StaticClass(), GlobalData_1.GlobalData.GameInstance);
      ModelAssetSkillManager.uMc.Stop();
    }
    if (this.SkillAssetMap.has(e) && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("World", 3, "[预加载] 覆盖添加技能", ["SkillId", e]);
    }
    if (t) {
      this.SkillAssetMap.set(e, t);
      t.AddObjectCallback = (t, s) => {
        if (!this.ModelAssetElement.IsDestroy) {
          this._ar.AddEntityAsset(e, t);
        }
      };
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[预加载] assetElement无效，添加技能失败", ["SkillId", e]);
      }
      return false;
    }
  }
  Clear() {
    this.Ty1?.clear();
    this.SkillAssetMap.clear();
    this._ar?.Clear();
  }
}
(exports.ModelAssetSkillManager = ModelAssetSkillManager).uMc = Stats_1.Stat.Create("Preload.AddSkill.NewObject");
class ModelAssetBulletManager {
  constructor(t) {
    this.ModelAssetElement = t;
    this.ValueMapping = new Map();
    this.IndexMapping = new Map();
    this.AssetMap = new Map();
    this._ar = undefined;
    this.jEe = -1;
  }
  AddAsset(t, s) {
    if (this._ar === undefined) {
      ModelAssetBulletManager.pBu.Start();
      this._ar = UE.NewObject(UE.HoldPreloadObject.StaticClass(), GlobalData_1.GlobalData.GameInstance);
      ModelAssetBulletManager.pBu.Stop();
    }
    if (this.ValueMapping.has(t)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("World", 3, "[预加载] 重复添加", ["Id", t]);
      }
      return false;
    }
    if (!s) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[预加载] assetElement无效，添加失败", ["Id", t]);
      }
      return false;
    }
    const e = ++this.jEe;
    this.ValueMapping.set(t, e);
    this.IndexMapping.set(e, t);
    this.AssetMap.set(e, s);
    s.AddObjectCallback = (t, s) => {
      if (!this.ModelAssetElement.IsDestroy) {
        this._ar.AddEntityAsset(e, t);
      }
    };
    return true;
  }
  Clear() {
    this.jEe = -1;
    this.ValueMapping.clear();
    this.IndexMapping.clear();
    this.AssetMap.clear();
    this._ar?.Clear();
  }
}
(exports.ModelAssetBulletManager = ModelAssetBulletManager).pBu = Stats_1.Stat.Create("Preload.AddStat1.NewObject");
class ModelAssetElement {
  constructor() {
    this.Promise = undefined;
    this.MainAsset = new AssetElement(undefined);
    this.SkillAssetManager = new ModelAssetSkillManager(this);
    this.BulletAssetManager = new ModelAssetBulletManager(this);
    this.Callbacks = undefined;
    this.IsDestroy = false;
    this.LoadPriority = 101;
    this.uar = 0;
    this.mar = undefined;
  }
  get LoadState() {
    return this.uar;
  }
  set LoadState(t) {
    this.uar = t;
  }
  get BlueprintClassPath() {
    return this.mar;
  }
  set BlueprintClassPath(t) {
    this.mar = t;
  }
  AddCallback(t) {
    if (t) {
      this.Callbacks ||= new Array();
      this.Callbacks.push(t);
    }
  }
  DoCallback(t) {
    if (this.Callbacks?.length) {
      for (const s of this.Callbacks) {
        s(t);
      }
      this.Callbacks = undefined;
    }
  }
  ClearCallback() {
    this.Callbacks = undefined;
  }
  Clear() {
    this.IsDestroy = true;
    if (this.Callbacks) {
      this.DoCallback(4);
    }
    this.SkillAssetManager.Clear();
    this.BulletAssetManager.Clear();
    this.Callbacks = undefined;
    this.uar = 0;
  }
  PrintDebugInfo() {}
}
exports.ModelAssetElement = ModelAssetElement;
class PlotAssetManager {
  constructor() {
    this.Sy1 = new Map();
    this.iI1 = new Map();
    this.rI1 = 1;
    this.Mfe = undefined;
    this.IdPendingMap = new Map();
    this.PendingList = new PriorityQueue_1.PriorityQueue((t, s) => s.Priority - t.Priority);
    this.oI1 = (t, s) => {
      var e;
      if (this.iI1.has(s)) {
        e = this.iI1.get(s);
        this.Mfe.AddEntityAsset(e, t);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 加载完毕，持有引用", ["key", e], ["path", s]);
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 加载完成时剧情已移除", ["path", s]);
      }
    };
  }
  Init() {
    this.Mfe = UE.NewObject(UE.HoldPreloadObject.StaticClass(), GlobalData_1.GlobalData.GameInstance);
  }
  CheckCanLoad(t, s) {
    return s > 100 || this.Sy1.size === 0;
  }
  AddPending(t, s) {
    var e;
    if (!this.Sy1.has(t)) {
      if (this.IdPendingMap.has(t)) {
        (e = this.IdPendingMap.get(t)).Priority = s;
        this.PendingList.Update(e);
      } else {
        this.IdPendingMap.set(t, e = {
          Id: t,
          Priority: s
        });
        this.PendingList.Push(e);
      }
    }
  }
  RemovePending(t) {
    if (this.IdPendingMap.has(t)) {
      this.PendingList.Remove(this.IdPendingMap.get(t));
    }
  }
  CheckAndGetPendingPreload() {
    var t;
    if (this.PendingList.Size !== 0) {
      t = this.PendingList.Top;
      if (this.CheckCanLoad(t.Id, t.Priority)) {
        return this.PendingList.Pop();
      } else {
        return undefined;
      }
    }
  }
  AddPlotAssetElement(t) {
    var s;
    if (!this.Sy1.has(t)) {
      (s = new AssetElement(undefined)).AddObjectCallback = this.oI1;
      this.Sy1.set(t, s);
      return s;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 剧情预加载重复", ["id", t]);
    }
  }
  RemovePlotAssetElement(t) {
    var s;
    return !!this.Sy1.has(t) && ((s = this.Sy1.get(t)).LoadingSet.forEach(t => {
      this.iI1.delete(t);
    }), s.LoadedSet.forEach(t => {
      var s = this.iI1.get(t);
      this.Mfe.RemoveEntityAssets(s);
      this.iI1.delete(t);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 卸载资源，移除引用", ["key", s]);
      }
    }), this.Sy1.delete(t), true);
  }
  AddPath(t, s) {
    if (t.AddOther(s)) {
      t = this.rI1++;
      this.iI1.set(s, t);
    }
  }
  RemoveAllPreload() {
    this.PendingList.Clear();
    this.IdPendingMap.clear();
    this.Sy1.clear();
    this.iI1.clear();
    if (this.Mfe) {
      this.Mfe.Clear();
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 清理所有预载剧情");
    }
  }
  Clear() {
    this.RemoveAllPreload();
    this.Mfe = undefined;
  }
  CheckIsLoading(t) {
    var s = this.Sy1.get(t);
    if (s) {
      return s.Loading();
    } else {
      return !!this.IdPendingMap.get(t);
    }
  }
  GetAsset(t, s, e) {
    var i;
    if (this.iI1.has(t)) {
      i = this.iI1.get(t);
      if ((i = this.Mfe.EntityAssetMap.Get(i)) && i.Assets.Num() > 0) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 加载完成的资产", ["path", t]);
        }
        e(i.Assets.Get(0), t);
      } else {
        e(undefined, t);
      }
      return ResourceSystem_1.ResourceSystem.InvalidId;
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 需要加载的资产", ["path", t]);
      }
      return ResourceSystem_1.ResourceSystem.LoadAsync(t, s, e);
    }
  }
  DebugLog() {}
}
exports.PlotAssetManager = PlotAssetManager;
class PbPreloadAssetElement extends AssetElement {
  constructor(t) {
    super(undefined);
    this.PbDataId = undefined;
    this.PbDataId = t;
  }
  get GetPbDataId() {
    return this.PbDataId;
  }
  get v71() {
    return -(this.PbDataId ?? 0);
  }
  AddObject(t, s) {
    return !!super.AddObject(t, s) && (ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject.AddEntityAsset(this.v71, s), true);
  }
}
exports.PbPreloadAssetElement = PbPreloadAssetElement;
class AssetElementBundleBase {
  constructor() {
    this.Promise = undefined;
    this.Callbacks = undefined;
    this.LoadPriority = 100;
    this.LoadStateInternal = 0;
    this.IsDestroy = false;
  }
  get LoadState() {
    return this.LoadStateInternal;
  }
  set LoadState(t) {
    this.LoadStateInternal = t;
  }
  AddCallback(t) {
    if (t) {
      this.Callbacks ||= new Array();
      this.Callbacks.push(t);
    }
  }
  DoCallback(t) {
    if (this.Callbacks?.length) {
      for (const s of this.Callbacks) {
        s(t);
      }
      this.Callbacks = undefined;
    }
  }
  ClearCallback() {
    this.Callbacks = undefined;
  }
  Clear() {
    if (this.Callbacks) {
      this.DoCallback(4);
    }
    this.Callbacks = undefined;
    this.LoadStateInternal = 0;
    this.IsDestroy = true;
  }
  PrintDebugInfo() {}
}
class PbEntityAssetElement extends AssetElementBundleBase {
  constructor(t) {
    super();
    this.PbDataId = undefined;
    this.Promise = undefined;
    this.MainAsset = undefined;
    this.FightAssetManager = new FightAssetManager(this);
    this.car = false;
    this.mar = undefined;
    this.PbDataId = t;
    this.LoadPriority = 101;
    this.MainAsset = new PbPreloadAssetElement(t);
  }
  get CollectMinorAsset() {
    return this.car;
  }
  set CollectMinorAsset(t) {
    this.car = t;
  }
  get BlueprintClassPath() {
    return this.mar;
  }
  set BlueprintClassPath(t) {
    this.mar = t;
  }
  get v71() {
    return -(this.PbDataId ?? 0);
  }
  Clear() {
    super.Clear();
    ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject.RemoveEntityAssets(this.v71);
    this.FightAssetManager.Clear();
    this.mar = undefined;
    this.car = false;
    if (this.Callbacks) {
      this.DoCallback(4);
    }
    this.Callbacks = undefined;
    this.LoadStateInternal = 0;
    this.IsDestroy = true;
  }
}
exports.PbEntityAssetElement = PbEntityAssetElement;
//# sourceMappingURL=PreloadDefine.js.map