"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindSunSpiritLevelFloor = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ILevelPlay_1 = require("../../../../../UniverseEditor/Interface/ILevelPlay");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class FindSunSpiritLevelFloor {
  constructor() {
    this.ZXf = undefined;
    this.nfn = undefined;
    this.eVm = UE.NewArray(UE.BuiltinInt);
    this.eYf = UE.NewArray(UE.BuiltinInt);
  }
  async SpawnFloorAsync(e, i) {
    var t = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    if (t?.IsValid()) {
      this.ZXf = t;
      const s = new CustomPromise_1.CustomPromise();
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.NiagaraSystem, e => {
        var t;
        var r = this.ZXf;
        if (e?.IsValid() && r?.IsValid() && (t = r.AddComponentByClass(UE.NiagaraComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false))?.IsValid()) {
          (this.nfn = t).SetAsset(e);
          this.yfn(t);
          r.D_K2_SetActorTransform(i.ToUeTransform(), false, undefined, true);
        }
        s.SetResult();
      });
      await s.Promise;
    }
  }
  yfn(e) {
    var t = ModelManager_1.ModelManager.FindSunSpiritModel;
    var r = t.LevelConfig;
    var t = t.LevelPlay;
    e.SetIntParameter(FNameUtil_1.FNameUtil.GetDynamicFName("XSize"), r.LevelWidth);
    e.SetIntParameter(FNameUtil_1.FNameUtil.GetDynamicFName("YSize"), r.LevelHeight);
    this.eVm.Empty();
    this.eYf.Empty();
    var e = r.ModifierList[t.SelectedModifierIndex];
    var i = e.ModifyIndexSet;
    var s = t.GridList;
    var o = s.length;
    for (let e = 0; e < o; e++) {
      var a = s[e];
      this.eVm.Add(this.tYf(a.Type, a.IsBlock));
      this.eYf.Add(a.IsMutable && i.has(e) ? 1 : 0);
    }
    UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(this.nfn, FNameUtil_1.FNameUtil.GetDynamicFName("GridArray"), this.eVm);
    UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(this.nfn, FNameUtil_1.FNameUtil.GetDynamicFName("OutlineArray"), this.eYf);
  }
  RefreshFloor() {
    if (this.nfn?.IsValid()) {
      var t = ModelManager_1.ModelManager.FindSunSpiritModel.LevelPlay.GridList;
      var r = t.length;
      for (let e = 0; e < r; e++) {
        var i = t[e];
        this.eVm.Set(e, this.tYf(i.Type, i.IsBlock));
      }
      UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(this.nfn, FNameUtil_1.FNameUtil.GetDynamicFName("GridArray"), this.eVm);
    }
  }
  RefreshOutline() {
    if (this.nfn?.IsValid()) {
      var e = ModelManager_1.ModelManager.FindSunSpiritModel;
      var t = e.LevelConfig;
      var e = e.LevelPlay;
      var r = t.ModifierList[e.SelectedModifierIndex].ModifyIndexSet;
      var i = e.GridList;
      var s = i.length;
      for (let e = 0; e < s; e++) {
        var o = i[e];
        this.eYf.Set(e, o.IsMutable && r.has(e) ? 1 : 0);
      }
      UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayInt32(this.nfn, FNameUtil_1.FNameUtil.GetDynamicFName("OutlineArray"), this.eYf);
    }
  }
  ClearFloor() {
    this.nfn = undefined;
    if (this.ZXf?.IsValid()) {
      ActorSystem_1.ActorSystem.Put("FindSunSpiritLevelFloor.ClearFloor", this.ZXf);
    }
    this.ZXf = undefined;
  }
  tYf(e, t) {
    switch (e) {
      case ILevelPlay_1.EFindSunSpiritGridType.NormalFloor:
        return 1;
      case ILevelPlay_1.EFindSunSpiritGridType.MutableFloor:
        if (t) {
          return 3;
        } else {
          return 2;
        }
      default:
        return 0;
    }
  }
}
exports.FindSunSpiritLevelFloor = FindSunSpiritLevelFloor;
//# sourceMappingURL=FindSunSpiritLevelFloor.js.map