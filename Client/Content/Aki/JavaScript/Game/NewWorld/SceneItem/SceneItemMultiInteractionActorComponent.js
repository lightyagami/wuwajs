"use strict";

var __decorate = this && this.__decorate || function (t, e, i, r) {
  var s;
  var o = arguments.length;
  var n = o < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, r);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (s = t[a]) {
        n = (o < 3 ? s(n) : o > 3 ? s(e, i, n) : s(e, i)) || n;
      }
    }
  }
  if (o > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemMultiInteractionActorComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Queue_1 = require("../../../Core/Container/Queue");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const GlobalData_1 = require("../../GlobalData");
const SceneInteractionLevel_1 = require("../../Render/Scene/Item/SceneInteractionLevel");
const AttachToActorController_1 = require("../../World/Controller/AttachToActorController");
const ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController");
const MultiInteractionActorController_1 = require("../../World/Controller/MultiInteractionActorController");
const CharacterNameDefines_1 = require("../Character/Common/CharacterNameDefines");
const SceneItemJigsawBaseComponent_1 = require("./Jigsaw/SceneItemJigsawBaseComponent");
const defaultTagId = -821437887;
const MAX_GEN_TIME = 3;
const needForwardTagIds = [1408918695, -1278190765];
class InteractionData {
  constructor(t, e) {
    this.States = undefined;
    this.Effects = undefined;
    this.States = t;
    this.Effects = e;
  }
}
let SceneItemMultiInteractionActorComponent = class SceneItemMultiInteractionActorComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.Lie = undefined;
    this.nXr = undefined;
    this.Jpc = undefined;
    this.gU = false;
    this.hvn = false;
    this.Ixe = undefined;
    this.lvn = undefined;
    this._vn = new Map();
    this.uvn = undefined;
    this.cvn = new Map();
    this.mvn = new Map();
    this.dvn = new Map();
    this.Cvn = new Map();
    this.rnn = new Map();
    this.qyn = false;
    this.gvn = new Queue_1.Queue();
    this.gIe = (t, e) => {
      if (e) {
        for (var [i] of this.dvn) {
          this.AddTagsByIndex(SceneItemJigsawBaseComponent_1.JigsawIndex.GenObjFromKey(i), t);
        }
      } else {
        for (var [r] of this.dvn) {
          this.RemoveTagsByIndex(SceneItemJigsawBaseComponent_1.JigsawIndex.GenObjFromKey(r), t);
        }
      }
    };
    this.fvn = () => {
      let t = 0;
      if (this.lvn) {
        while (t < MAX_GEN_TIME) {
          if (this.lvn.length <= 0) {
            this.pvn();
            ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(this);
            return;
          }
          var e = this.lvn.shift();
          this.vvn(e, this.Ixe.MainActor);
          t++;
        }
      } else {
        ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(this);
      }
    };
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(212);
    this.Lie = this.Entity.GetComponent(215);
    return true;
  }
  pvn() {
    for (this.hvn = true; !this.gvn.Empty;) {
      var t = this.gvn.Pop();
      t.Func(t.Index, t.TagIds);
    }
    if (this.Jpc) {
      this.Jpc();
    }
    var e = UE.NewArray(UE.Transform);
    var i = this.Ixe?.MainActor;
    if (i?.CollisionActors?.Num()) {
      i = i.CollisionActors?.Get(0);
      if (i) {
        if (i.StaticMeshComponent?.StaticMesh) {
          for (var [, r] of this.dvn) {
            var s = this.Hte?.ActorTransform;
            var r = r.D_GetTransform().GetRelativeTransform(s);
            var s = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(r);
            e.Add(s);
          }
          var o = this.Hte?.Owner;
          if (o &&= o.GetComponentByClass(UE.StaticMeshComponent.StaticClass())) {
            UE.KuroStaticMeshLibrary.MergeSimpleCollisions(i.StaticMeshComponent, e);
            o.SetStaticMesh(i.StaticMeshComponent?.StaticMesh);
          }
          for (const n of needForwardTagIds) {
            this.Lie.AddTagAddOrRemoveListener(n, this.gIe);
          }
        }
      }
    }
  }
  OnEnd() {
    for (const i of needForwardTagIds) {
      this.Lie.RemoveTagAddOrRemoveListener(i, this.gIe);
    }
    for (var [, t] of this.dvn) {
      MultiInteractionActorController_1.MultiInteractionActorController.AddWaitDestroyActor(t);
    }
    var e;
    this.dvn.clear();
    if (this.Ixe?.MainActor?.IsValid()) {
      e = this.Ixe.MainActor;
      MultiInteractionActorController_1.MultiInteractionActorController.AddWaitDestroyActor(e);
    }
    return true;
  }
  vvn(i, t) {
    var e = this.uvn(i);
    const r = UE.KuroStaticLibrary.SpawnActorFromAnother(t, this.Hte.Owner);
    if (r?.IsValid()) {
      AttachToActorController_1.AttachToActorController.AttachToActor(r, this.Hte.Owner, 2, "SceneItemMultiInteractionActorComponent.GenerateActorInternal", undefined, 2, 2, 2, false, false);
      t = t.K2_GetActorRotation();
      r.D_K2_SetActorLocationAndRotation(e.ToUeVector(), t, false, undefined, true);
      this.cvn.clear();
      this.Mvn(r);
      this.Evn(r);
      this.Svn(r, r);
      const s = i.GetKey();
      this.dvn.set(s, r);
      if (GlobalData_1.GlobalData.IsPlayInEditor) {
        r.ActorLabel = s;
      }
      TimerSystem_1.TimerSystem.Next(() => {
        this.qnn(i);
        if (this._vn.has(s)) {
          const e = this._vn.get(s);
          this._vn.delete(s);
          let t = this.Cvn.get(s);
          t = (t = t || []).concat(e);
          this.Cvn.set(s, t);
        }
        const e = this.Cvn.get(s);
        if (e !== undefined) {
          for (const t of e) {
            r.PlayExtraEffectOnTagsChange(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t));
            this.yvn(i, t, true);
          }
        }
      });
    }
  }
  Ivn(t) {
    var e = this.nXr.场景交互物状态列表;
    for (const r of t) {
      var i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r);
      var i = e.Get(i);
      if (i !== undefined) {
        return i;
      }
    }
    return 21;
  }
  Mvn(t) {
    var e = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
    t.GetAttachedActors(e, true);
    var i = (0, puerts_1.$unref)(e);
    for (let t = 0; t < i.Num(); t++) {
      this.Mvn(i.Get(t));
    }
    this.cvn.set(t.GetOwner(), t);
  }
  Evn(e) {
    for (let t = 0; t < e.States.Num(); t++) {
      var i;
      var r = e.States.GetKey(t);
      var s = e.States.Get(r);
      for (let t = 0; t < s.Effects.Num(); t++) {
        const e = s.Effects.Get(t);
        if (this.cvn.has(e)) {
          i = this.cvn.get(e);
          s.Effects.Set(t, i);
        }
      }
      for (let t = 0; t < s.Actors.Num(); t++) {
        const e = s.Actors.Get(t);
        if (this.cvn.has(e)) {
          s.Actors.Set(t, this.cvn.get(e));
        }
      }
      for (let t = 0; t < s.HideActors.Num(); t++) {
        const e = s.HideActors.Get(t);
        if (this.cvn.has(e)) {
          s.HideActors.Set(t, this.cvn.get(e));
        }
      }
      for (let t = 0; t < s.MaterialControllers.Num(); t++) {
        var o = s.MaterialControllers.Get(t);
        for (let t = 0; t < o.Actors.Num(); t++) {
          const e = o.Actors.Get(t);
          if (this.cvn.has(e)) {
            o.Actors.Set(t, this.cvn.get(e));
          }
        }
      }
      for (let t = 0; t < s.StateBasedEffect.Num(); t++) {
        var n;
        var a = s.StateBasedEffect.Get(t);
        const e = a.StateBasedEffect;
        if (this.cvn.has(e)) {
          n = this.cvn.get(e);
          a.StateBasedEffect = n;
        }
      }
    }
    for (let t = 0; t < e.Effects.Num(); t++) {
      var h = e.Effects.GetKey(t);
      var l = e.Effects.Get(h);
      for (let t = 0; t < l.Material.Actors.Num(); t++) {
        const e = l.Material.Actors.Get(t);
        if (this.cvn.has(e)) {
          l.Material.Actors.Set(t, this.cvn.get(e));
        }
      }
      if (this.cvn.has(l.Effect)) {
        h = this.cvn.get(l.Effect);
        l.Effect = h;
      }
    }
    for (let t = 0; t < e.TagsAndCorrespondingEffects.Num(); t++) {
      var c = e.TagsAndCorrespondingEffects.GetKey(t);
      var v = e.TagsAndCorrespondingEffects.Get(c);
      for (let t = 0; t < v.Actors.Num(); t++) {
        const e = v.Actors.Get(t);
        if (this.cvn.has(e)) {
          v.Actors.Set(t, this.cvn.get(e));
        }
      }
      for (let t = 0; t < v.Effects.Num(); t++) {
        var f = v.Effects.Get(t);
        if (this.cvn.has(f)) {
          f = this.cvn.get(f);
          v.Effects.Set(t, f);
        }
      }
      for (let t = 0; t < v.HideActors.Num(); t++) {
        var _ = v.HideActors.Get(t);
        if (this.cvn.has(_)) {
          v.HideActors.Set(t, this.cvn.get(_));
        }
      }
      for (let t = 0; t < v.MaterialControllers.Num(); t++) {
        var p = v.MaterialControllers.Get(t);
        for (let t = 0; t < p.Actors.Num(); t++) {
          var u = p.Actors.Get(t);
          if (this.cvn.has(u)) {
            p.Actors.Set(t, this.cvn.get(u));
          }
        }
      }
    }
    this.mvn.set(e, new InteractionData(e.States, e.Effects));
  }
  Svn(t, e) {
    var i = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
    t.GetAttachedActors(i, true);
    var r = (0, puerts_1.$unref)(i);
    for (let t = 0; t < r.Num(); t++) {
      this.Svn(r.Get(t), e);
    }
    t.Owner = e;
  }
  InitGenerateInfo(t, e, i, r, s = undefined) {
    this.nXr = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(0, t);
    this.Jpc = s;
    this.lvn = e;
    this.uvn = i;
    if (r !== undefined) {
      this.Cvn = r;
    }
    this.InitLevelDynamic(this.Hte.ActorLocation, this.Hte.ActorRotation);
    this.gU = true;
  }
  InitLevelDynamic(t, e) {
    var i = GlobalData_1.GlobalData.World;
    let r = this.nXr.场景交互物.AssetPathName?.toString();
    if (r.includes(".")) {
      r = r.split(".")[0];
    }
    var s = (0, puerts_1.$ref)(false);
    var i = UE.LevelStreamingDynamic.LoadLevelInstance(i, r, t.op_ToVector(), e, s);
    var s = (0, puerts_1.$unref)(s);
    var o = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(defaultTagId);
    var o = this.nXr.场景交互物状态列表.Get(o);
    if (s && i) {
      this.Ixe = new SceneInteractionLevel_1.SceneInteractionLevel();
      this.Ixe.Init(i, r, t, e, -1, o, () => {
        this.Txe();
      }, true);
    }
  }
  Txe() {
    this.Ixe.AttachToActor(this.Hte.Owner);
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      this.Ixe.MainActor.ActorLabel = "Template:" + this.Ixe.LevelName;
    }
    var i = this.Ixe.GetAllActorsInLevel();
    if (i) {
      for (let t = 0, e = i.Num(); t < e; t++) {
        var r = i.Get(t);
        if (r instanceof UE.StaticMeshActor) {
          r.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE);
          r.StaticMeshComponent?.SetReceivesDecals(false);
          r.SetActorHiddenInGame(true);
          r.SetActorEnableCollision(false);
        }
      }
    }
    if (this.Active) {
      if (this.lvn) {
        ComponentForceTickController_1.ComponentForceTickController.RegisterTick(this, this.fvn);
      }
    } else {
      this.qyn = true;
    }
  }
  OnEnable() {
    if (this.qyn && this.lvn) {
      ComponentForceTickController_1.ComponentForceTickController.RegisterTick(this, this.fvn);
      this.qyn = false;
    }
  }
  IsChildrenActor(t) {
    return this.mvn.has(t.Owner);
  }
  GetInteractionActorByIndex(t) {
    return this.dvn.get(t.GetKey());
  }
  AddTagsByIndex(i, r) {
    var s = this.dvn.get(i.GetKey());
    if (s?.IsValid() || !this.hvn) {
      var o = this.hvn ? this.Cvn : this._vn;
      let t = o.get(i.GetKey());
      if (!t) {
        t = [];
        o.set(i.GetKey(), t);
      }
      let e = -1;
      if (Array.isArray(r)) {
        for (const n of r) {
          if ((e = t.indexOf(n)) < 0 && (t.push(n), this.hvn)) {
            s.PlayExtraEffectOnTagsChange(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(n));
            this.yvn(i, n, true);
          }
        }
      } else if ((e = t.indexOf(r)) < 0 && (t.push(r), this.hvn)) {
        s.PlayExtraEffectOnTagsChange(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r));
        this.yvn(i, r, true);
      }
      if (this.hvn) {
        this.qnn(i);
      }
    }
  }
  RemoveTagsByIndex(i, r) {
    var s = this.dvn.get(i.GetKey());
    if (s?.IsValid() || !this.hvn) {
      var o = this.hvn ? this.Cvn : this._vn;
      let t = o.get(i.GetKey());
      if (!t) {
        t = [];
        o.set(i.GetKey(), t);
      }
      let e = -1;
      if (Array.isArray(r)) {
        for (const n of r) {
          if ((e = t.indexOf(n)) > -1 && (t.splice(e, 1), this.hvn)) {
            s.StopExtraEffectOnTagsChange(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(n));
            this.yvn(i, n, false);
          }
        }
      } else if ((e = t.indexOf(r)) > -1 && (t.splice(e, 1), this.hvn)) {
        s.StopExtraEffectOnTagsChange(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r));
        this.yvn(i, r, false);
      }
      if (this.hvn) {
        this.qnn(i);
      }
    }
  }
  HasTagByIndex(t, e) {
    t = (this.hvn ? this.Cvn : this._vn).get(t.GetKey());
    return !!t && t.indexOf(e) > -1;
  }
  yvn(t, e, i) {
    let r = this.rnn.get(t.GetKey());
    var s = this.dvn.get(t.GetKey());
    if (i) {
      if (r === undefined) {
        r = new Map();
        this.rnn.set(t.GetKey(), r);
      }
      if (!r.has(e)) {
        i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e);
        if ((t = this.nXr.场景交互物特效列表.Get(i)) !== undefined) {
          s.PlayIndependentEffect(t);
          r.set(e, t);
        }
      }
    } else if (r !== undefined && r.size !== 0 && r.has(e)) {
      i = r.get(e);
      r.delete(e);
      s.EndIndependentEffect(i);
      s.PlayIndependentEndEffect(i);
    }
  }
  qnn(t) {
    var t = t.GetKey();
    var e = this.dvn.get(t);
    let i = [];
    let r = 21;
    if (this.Cvn.has(t)) {
      i = this.Cvn.get(t);
    }
    if ((r = i?.length > 0 ? this.Ivn(i) : r) === 21) {
      t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(defaultTagId);
      r = this.nXr.场景交互物状态列表.Get(t);
    }
    e.SetState(r, true, false);
  }
  DynamicRemoveActorByIndex(t) {
    var e;
    var i;
    if (this.hvn) {
      e = t.GetKey();
      if ((i = this.dvn.get(e)) !== undefined) {
        this.dvn.delete(e);
        i.DestroySelf();
      }
    } else {
      this.gvn.Push({
        Func: t => {
          this.DynamicRemoveActorByIndex(t);
        },
        Index: t,
        TagIds: []
      });
    }
  }
  DynamicAddActorByIndex(e, i) {
    if (this.hvn) {
      var r = e.GetKey();
      let t = this.Cvn.get(r);
      t = (t = t || []).concat(i);
      this.Cvn.set(r, t);
      this.vvn(e, this.Ixe.MainActor);
    } else {
      this.gvn.Push({
        Func: (t, e) => {
          this.DynamicAddActorByIndex(t, e);
        },
        Index: e,
        TagIds: i
      });
    }
  }
  GetIsInit() {
    return this.gU;
  }
  GetIsFinish() {
    return this.hvn;
  }
  SetIsFinish(t) {
    this.hvn = t;
  }
};
SceneItemMultiInteractionActorComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(168)], SceneItemMultiInteractionActorComponent);
exports.SceneItemMultiInteractionActorComponent = SceneItemMultiInteractionActorComponent; //# sourceMappingURL=SceneItemMultiInteractionActorComponent.js.map