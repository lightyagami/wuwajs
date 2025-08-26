"use strict";

var __decorate = this && this.__decorate || function (e, t, i, s) {
  var o;
  var r = arguments.length;
  var h = r < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(e, t, i, s);
  } else {
    for (var l = e.length - 1; l >= 0; l--) {
      if (o = e[l]) {
        h = (r < 3 ? o(h) : r > 3 ? o(t, i, h) : o(t, i)) || h;
      }
    }
  }
  if (r > 3 && h) {
    Object.defineProperty(t, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelLoadComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const ModelUtil_1 = require("../../../../../Core/Utils/ModelUtil");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const UiModelResourcesManager_1 = require("../../../UiComponent/UiModelResourcesManager");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelUtil_1 = require("../../UiModelUtil");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
const UiModelMorphComponent_1 = require("./UiModelMorphComponent");
let UiModelLoadComponent = class UiModelLoadComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.UiModelActorComponent = undefined;
    this.UiModelDataComponent = undefined;
    this.UiModelMorphComponent = undefined;
    this.LoadHandleId = UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue;
    this.ResourceLoadCache = undefined;
    this.MeshArray = UE.NewArray(UE.SkeletalMesh);
    this.StreamingHandleId = UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue;
    this.LoadFinishCallBack = undefined;
    this.zY1 = ResourceSystem_1.ResourceSystem.InvalidId;
    this.OnPostLoadAnimClass = (u, e, c, t, f = 0) => {
      const p = this.GetMainMeshPath();
      const v = this.GetChildMeshPathList();
      var i = this.GetAllMorphPathList();
      var s = this.GetEffectAssetByAssetClass(u);
      var o = [];
      if (p && !StringUtils_1.StringUtils.IsEmpty(p)) {
        o.push(p);
      }
      UiModelUtil_1.UiModelUtil.CheckPathListAndAdd(o, v);
      UiModelUtil_1.UiModelUtil.CheckPathListAndAdd(o, i);
      UiModelUtil_1.UiModelUtil.CheckPathListAndAdd(o, t);
      UiModelUtil_1.UiModelUtil.CheckPathListAndAdd(o, s);
      this.LoadHandleId = UiModelResourcesManager_1.UiModelResourcesManager.LoadUiModelResources(o, (e, t) => {
        this.DestroyLoadMesh();
        this.ResourceLoadCache = t;
        var i = UE.NewArray(UE.SkeletalMesh);
        var t = this.GetLoadedResource(p);
        i.Add(t);
        let s = undefined;
        if (v) {
          s = [];
          for (const U of v) {
            var o = this.GetLoadedResource(U);
            s.push(o);
            i.Add(o);
          }
        }
        let r = undefined;
        let h = undefined;
        var l;
        var n = [];
        var a = this.GetSpecialMorphIdList();
        if (a) {
          for (const M of a) {
            if (M.MainMeshPath) {
              l = this.GetLoadedResource(M.MainMeshPath);
              i.Add(l);
              r = l;
            }
            if (M.AnimPath) {
              h = this.GetLoadedResource(M.AnimPath);
            }
            if (M.ChildMeshPathList) {
              for (const _ of M.ChildMeshPathList) {
                var d = this.GetLoadedResource(_);
                i.Add(d);
                n.push(d);
              }
            }
          }
        }
        if ((this.UiModelMorphComponent?.GetMorphType() ?? 0) !== 0) {
          if (!r) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Character", 78, "形态mainMesh为空");
            }
          }
          if (!h) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Character", 78, "形态animClass为空");
            }
          }
          this.UiModelActorComponent?.ChangeMesh(r, h, n, f);
        } else {
          this.UiModelActorComponent?.ChangeMesh(t, u, s, f);
        }
        if (c) {
          this.StreamingHandleId = UiModelResourcesManager_1.UiModelResourcesManager.LoadMeshesComponentsBundleStreaming(i, undefined, () => {
            this.FinishLoad();
            var e = this.UiModelDataComponent?.GetLoadingVisible() ?? true;
            this.UiModelDataComponent?.SetVisible(e);
            this.UiModelDataComponent?.ClearLoadingVisible();
          });
        } else {
          this.FinishLoad();
          this.MeshArray.Empty();
        }
      });
    };
    this.JY1 = (0, puerts_1.$ref)(UE.NewSet(UE.AnimationAsset));
    this.ZY1 = (0, puerts_1.$ref)(UE.NewArray(UE.AnimNotifyEvent));
  }
  OnInit() {
    this.UiModelActorComponent = this.Owner.CheckGetComponent(1);
    this.UiModelDataComponent = this.Owner.CheckGetComponent(0);
    this.UiModelMorphComponent = this.Owner.GetComponentByCtor(UiModelMorphComponent_1.UiModelMorphComponent);
  }
  OnEnd() {
    this.CancelLoad();
    this.DestroyLoadMesh();
  }
  GetMainMeshPath() {
    return ModelUtil_1.ModelUtil.GetModelConfig(this.UiModelDataComponent.ModelConfigId).网格体.ToAssetPathName();
  }
  GetAnimClassPath() {
    return ModelUtil_1.ModelUtil.GetModelConfig(this.UiModelDataComponent.ModelConfigId).动画蓝图.ToAssetPathName();
  }
  GetChildMeshPathList() {
    var t = ModelUtil_1.ModelUtil.GetModelConfig(this.UiModelDataComponent.ModelConfigId).子网格体;
    if (t) {
      var i = t.Num();
      if (i > 0) {
        var s = new Array(i);
        for (let e = 0; e < i; e++) {
          s[e] = t.Get(e).ToAssetPathName();
        }
        return s;
      }
    }
  }
  GetAllMorphPathList() {
    return this.UiModelMorphComponent?.GetAllMorphPathList();
  }
  GetSpecialMorphIdList() {
    return this.UiModelMorphComponent?.GetSpecialMorphIdList();
  }
  LoadModelByModelId(e, t = false, i, s) {
    if (e === this.UiModelDataComponent.ModelConfigId && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 43, "重复加载模型", ["modelId", e]);
    }
    this.UiModelDataComponent.ModelConfigId = e;
    this.LoadFinishCallBack = i;
    this.LoadModel(t, s);
  }
  LoadModel(i, s, o = 0) {
    if (this.UiModelDataComponent?.GetModelLoadState() === 1 && (this.CancelLoad(), Log_1.Log.CheckWarn())) {
      Log_1.Log.Warn("Character", 43, "取消上一个模型加载");
    }
    this.UiModelDataComponent?.ClearLoadingVisible();
    if (i) {
      this.UiModelDataComponent?.SetVisible(false);
    }
    this.UiModelMorphComponent?.ClearData();
    this.UiModelDataComponent?.SetModelLoadState(1);
    var e = this.GetAnimClassPath();
    if (StringUtils_1.StringUtils.IsEmpty(e)) {
      this.OnPostLoadAnimClass(undefined, e, i, s, o);
    } else {
      this.zY1 = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Class, (e, t) => {
        this.zY1 = ResourceSystem_1.ResourceSystem.InvalidId;
        this.OnPostLoadAnimClass(e, t, i, s, o);
      });
    }
  }
  GetEffectAssetByAssetClass(e) {
    if (e) {
      (0, puerts_1.$unref)(this.JY1).Empty();
      UE.KuroStaticLibrary.GetAnimAssetsByAnimBlueprintClass(e, this.JY1);
      var t = (0, puerts_1.$unref)(this.JY1);
      if (t.Num() !== 0) {
        var i = new Array();
        var s = t.Num();
        for (let e = 0; e < s; ++e) {
          var o = t.Get(e);
          if (o.IsA(UE.AnimSequence.StaticClass())) {
            if (o) {
              (0, puerts_1.$unref)(this.ZY1).Empty();
              UE.KuroStaticLibrary.GetAnimSequenceNotifies(o, this.ZY1);
              var r = (0, puerts_1.$unref)(this.ZY1);
              var h = r.Num();
              if (h !== 0) {
                for (let e = 0; e < h; ++e) {
                  var l = r.Get(e);
                  if (l.NotifyStateClass?.IsValid() && l.NotifyStateClass.IsA(UE.AnimNotifyStateEffect_C.StaticClass())) {
                    l = l.NotifyStateClass;
                    if (!FNameUtil_1.FNameUtil.IsNothing(l.EffectSlotName)) {
                      if ((l = l.EffectDataAssetRef?.ToAssetPathName()) && l.length !== 0 && l !== "None") {
                        i.push(l);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return i;
      }
    }
  }
  FinishLoad() {
    this.UiModelDataComponent?.SetModelLoadState(2);
    var e = this.UiModelDataComponent?.GetDitherEffectValue() ?? 1;
    this.UiModelDataComponent?.SetDitherEffect(e);
    this.UiModelMorphComponent?.PreloadMorphData();
    this.LoadFinishCallBack?.();
  }
  CancelLoad() {
    if (this.UiModelDataComponent?.GetModelLoadState() === 1 && (UiModelResourcesManager_1.UiModelResourcesManager.CancelUiModelResourceLoad(this.LoadHandleId), this.LoadHandleId = UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue, this.DestroyLoadMesh(), this.zY1 !== ResourceSystem_1.ResourceSystem.InvalidId)) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.zY1);
      this.zY1 = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    this.ResourceLoadCache = undefined;
    this.UiModelDataComponent?.SetModelLoadState(0);
    this.UiModelMorphComponent?.ClearData();
  }
  GetLoadedResource(e) {
    if (this.ResourceLoadCache) {
      return this.ResourceLoadCache.get(e);
    }
  }
  GetModelAllMesh() {
    var e;
    var t = UE.NewArray(UE.SkeletalMesh);
    var i = this.GetMainMeshPath();
    if (i && !StringUtils_1.StringUtils.IsEmpty(i)) {
      i = this.GetLoadedResource(i);
      t.Add(i);
    }
    var i = this.GetChildMeshPathList();
    if (i && i.length > 0) {
      for (const s of i) {
        if (!StringUtils_1.StringUtils.IsEmpty(s)) {
          e = this.GetLoadedResource(s);
          t.Add(e);
        }
      }
    }
    return t;
  }
  DestroyLoadMesh() {
    if (this.StreamingHandleId !== UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue) {
      UiModelResourcesManager_1.UiModelResourcesManager.ReleaseMeshesComponentsBundleStreaming(this.StreamingHandleId);
      this.StreamingHandleId = UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue;
    }
  }
};
UiModelLoadComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(2)], UiModelLoadComponent);
exports.UiModelLoadComponent = UiModelLoadComponent; //# sourceMappingURL=UiModelLoadComponent.js.map