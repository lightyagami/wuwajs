"use strict";
var __decorate = this && this.__decorate || function(e, t, i, s) {
  var o, r = arguments.length,
    h = r < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) h = Reflect.decorate(e, t, i, s);
  else
    for (var l = e.length - 1; 0 <= l; l--)(o = e[l]) && (h = (r < 3 ? o(h) : 3 < r ? o(t, i, h) : o(t, i)) || h);
  return 3 < r && h && Object.defineProperty(t, i, h), h
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.UiModelLoadComponent = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  ModelUtil_1 = require("../../../../../Core/Utils/ModelUtil"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  UiModelResourcesManager_1 = require("../../../UiComponent/UiModelResourcesManager"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelUtil_1 = require("../../UiModelUtil"),
  UiModelComponentBase_1 = require("../UiModelComponentBase"),
  UiModelMorphComponent_1 = require("./UiModelMorphComponent");
let UiModelLoadComponent = class UiModelLoadComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments), this.UiModelActorComponent = void 0, this.UiModelDataComponent = void 0, this.UiModelMorphComponent = void 0, this.LoadHandleId = UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue, this.ResourceLoadCache = void 0, this.MeshArray = UE.NewArray(UE.SkeletalMesh), this.StreamingHandleId = UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue, this.LoadFinishCallBack = void 0, this.xX1 = ResourceSystem_1.ResourceSystem.InvalidId, this.OnPostLoadAnimClass = (u, e, c, t, f = 0) => {
      const p = this.GetMainMeshPath(),
        v = this.GetChildMeshPathList();
      var i = this.GetAllMorphPathList(),
        s = this.GetEffectAssetByAssetClass(u),
        o = [];
      p && !StringUtils_1.StringUtils.IsEmpty(p) && o.push(p), UiModelUtil_1.UiModelUtil.CheckPathListAndAdd(o, v), UiModelUtil_1.UiModelUtil.CheckPathListAndAdd(o, i), UiModelUtil_1.UiModelUtil.CheckPathListAndAdd(o, t), UiModelUtil_1.UiModelUtil.CheckPathListAndAdd(o, s), this.LoadHandleId = UiModelResourcesManager_1.UiModelResourcesManager.LoadUiModelResources(o, (e, t) => {
        this.DestroyLoadMesh(), this.ResourceLoadCache = t;
        var i = UE.NewArray(UE.SkeletalMesh),
          t = this.GetLoadedResource(p);
        i.Add(t);
        let s = void 0;
        if (v) {
          s = [];
          for (const U of v) {
            var o = this.GetLoadedResource(U);
            s.push(o), i.Add(o)
          }
        }
        let r = void 0,
          h = void 0;
        var l, n = [],
          a = this.GetSpecialMorphIdList();
        if (a)
          for (const M of a)
            if (M.MainMeshPath && (l = this.GetLoadedResource(M.MainMeshPath), i.Add(l), r = l), M.AnimPath && (h = this.GetLoadedResource(M.AnimPath)), M.ChildMeshPathList)
              for (const _ of M.ChildMeshPathList) {
                var d = this.GetLoadedResource(_);
                i.Add(d), n.push(d)
              }
        0 !== (this.UiModelMorphComponent?.GetMorphType() ?? 0) ? (r || Log_1.Log.CheckError() && Log_1.Log.Error("Character", 78, "形态mainMesh为空"), h || Log_1.Log.CheckError() && Log_1.Log.Error("Character", 78, "形态animClass为空"), this.UiModelActorComponent?.ChangeMesh(r, h, n, f)) : this.UiModelActorComponent?.ChangeMesh(t, u, s, f), c ? this.StreamingHandleId = UiModelResourcesManager_1.UiModelResourcesManager.LoadMeshesComponentsBundleStreaming(i, void 0, () => {
          this.FinishLoad();
          var e = this.UiModelDataComponent?.GetLoadingVisible() ?? !0;
          this.UiModelDataComponent?.SetVisible(e), this.UiModelDataComponent?.ClearLoadingVisible()
        }) : (this.FinishLoad(), this.MeshArray.Empty())
      })
    }, this.UX1 = (0, puerts_1.$ref)(UE.NewSet(UE.AnimationAsset)), this.DX1 = (0, puerts_1.$ref)(UE.NewArray(UE.AnimNotifyEvent))
  }
  OnInit() {
    this.UiModelActorComponent = this.Owner.CheckGetComponent(1), this.UiModelDataComponent = this.Owner.CheckGetComponent(0), this.UiModelMorphComponent = this.Owner.GetComponentByCtor(UiModelMorphComponent_1.UiModelMorphComponent)
  }
  OnEnd() {
    this.CancelLoad(), this.DestroyLoadMesh()
  }
  GetMainMeshPath() {
    return ModelUtil_1.ModelUtil.GetModelConfig(this.UiModelDataComponent.ModelConfigId).网格体.ToAssetPathName()
  }
  GetAnimClassPath() {
    return ModelUtil_1.ModelUtil.GetModelConfig(this.UiModelDataComponent.ModelConfigId).动画蓝图.ToAssetPathName()
  }
  GetChildMeshPathList() {
    var t = ModelUtil_1.ModelUtil.GetModelConfig(this.UiModelDataComponent.ModelConfigId).子网格体;
    if (t) {
      var i = t.Num();
      if (0 < i) {
        var s = new Array(i);
        for (let e = 0; e < i; e++) s[e] = t.Get(e).ToAssetPathName();
        return s
      }
    }
  }
  GetAllMorphPathList() {
    return this.UiModelMorphComponent?.GetAllMorphPathList()
  }
  GetSpecialMorphIdList() {
    return this.UiModelMorphComponent?.GetSpecialMorphIdList()
  }
  LoadModelByModelId(e, t = !1, i, s) {
    e === this.UiModelDataComponent.ModelConfigId && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Character", 43, "重复加载模型", ["modelId", e]), this.UiModelDataComponent.ModelConfigId = e, this.LoadFinishCallBack = i, this.LoadModel(t, s)
  }
  LoadModel(i, s, o = 0) {
    1 === this.UiModelDataComponent?.GetModelLoadState() && (this.CancelLoad(), Log_1.Log.CheckWarn()) && Log_1.Log.Warn("Character", 43, "取消上一个模型加载"), this.UiModelDataComponent?.ClearLoadingVisible(), i && this.UiModelDataComponent?.SetVisible(!1), this.UiModelMorphComponent?.ClearData(), this.UiModelDataComponent?.SetModelLoadState(1);
    var e = this.GetAnimClassPath();
    StringUtils_1.StringUtils.IsEmpty(e) ? this.OnPostLoadAnimClass(void 0, e, i, s, o) : this.xX1 = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Class, (e, t) => {
      this.xX1 = ResourceSystem_1.ResourceSystem.InvalidId, this.OnPostLoadAnimClass(e, t, i, s, o)
    })
  }
  GetEffectAssetByAssetClass(e) {
    if (e) {
      (0, puerts_1.$unref)(this.UX1).Empty(), UE.KuroStaticLibrary.GetAnimAssetsByAnimBlueprintClass(e, this.UX1);
      var t = (0, puerts_1.$unref)(this.UX1);
      if (0 !== t.Num()) {
        var i = new Array,
          s = t.Num();
        for (let e = 0; e < s; ++e) {
          var o = t.Get(e);
          if (o.IsA(UE.AnimSequence.StaticClass()))
            if (o) {
              (0, puerts_1.$unref)(this.DX1).Empty(), UE.KuroStaticLibrary.GetAnimSequenceNotifies(o, this.DX1);
              var r = (0, puerts_1.$unref)(this.DX1),
                h = r.Num();
              if (0 !== h)
                for (let e = 0; e < h; ++e) {
                  var l = r.Get(e);
                  l.NotifyStateClass?.IsValid() && l.NotifyStateClass.IsA(UE.AnimNotifyStateEffect_C.StaticClass()) && (l = l.NotifyStateClass, FNameUtil_1.FNameUtil.IsNothing(l.EffectSlotName) || (l = l.EffectDataAssetRef?.ToAssetPathName()) && 0 !== l.length && "None" !== l && i.push(l))
                }
            }
        }
        return i
      }
    }
  }
  FinishLoad() {
    this.UiModelDataComponent?.SetModelLoadState(2);
    var e = this.UiModelDataComponent?.GetDitherEffectValue() ?? 1;
    this.UiModelDataComponent?.SetDitherEffect(e), this.UiModelMorphComponent?.PreloadMorphData(), this.LoadFinishCallBack?.()
  }
  CancelLoad() {
    1 === this.UiModelDataComponent?.GetModelLoadState() && (UiModelResourcesManager_1.UiModelResourcesManager.CancelUiModelResourceLoad(this.LoadHandleId), this.DestroyLoadMesh(), this.xX1 !== ResourceSystem_1.ResourceSystem.InvalidId) && ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.xX1), this.ResourceLoadCache = void 0, this.UiModelDataComponent?.SetModelLoadState(0), this.UiModelMorphComponent?.ClearData()
  }
  GetLoadedResource(e) {
    if (this.ResourceLoadCache) return this.ResourceLoadCache.get(e)
  }
  GetModelAllMesh() {
    var e, t = UE.NewArray(UE.SkeletalMesh),
      i = this.GetMainMeshPath(),
      i = (i && !StringUtils_1.StringUtils.IsEmpty(i) && (i = this.GetLoadedResource(i), t.Add(i)), this.GetChildMeshPathList());
    if (i && 0 < i.length)
      for (const s of i) StringUtils_1.StringUtils.IsEmpty(s) || (e = this.GetLoadedResource(s), t.Add(e));
    return t
  }
  DestroyLoadMesh() {
    this.StreamingHandleId !== UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue && (UiModelResourcesManager_1.UiModelResourcesManager.ReleaseMeshesComponentsBundleStreaming(this.StreamingHandleId), this.StreamingHandleId = UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue)
  }
};
UiModelLoadComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(2)], UiModelLoadComponent), exports.UiModelLoadComponent = UiModelLoadComponent;
//# sourceMappingURL=UiModelLoadComponent.js.map