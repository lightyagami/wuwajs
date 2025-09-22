"use strict";

var __decorate = this && this.__decorate || function (t, e, s, i) {
  var h;
  var r = arguments.length;
  var o = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, s) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, s, i);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (h = t[n]) {
        o = (r < 3 ? h(o) : r > 3 ? h(e, s, o) : h(e, s)) || o;
      }
    }
  }
  if (r > 3 && o) {
    Object.defineProperty(e, s, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubMeshComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const SkeletalMeshEffectContext_1 = require("../../../Effect/EffectContext/SkeletalMeshEffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const standardMeshNames = new Set(["Mesh", "Hulu", "OtherCase0", "WeaponCase0", "WeaponCase1"]);
class SubMeshItem {
  constructor(t, e) {
    this.Name = t;
    this.Mesh = e;
    this.VisibleInternal = false;
    this.hva = undefined;
    this.lva = () => {
      this.Mesh.SetVisibility(false, false);
      this.hva = undefined;
    };
    this.CurrentPdHandle = 0;
    this.CurrentEffectHandle = 0;
    this.iwc = undefined;
    this.rwc = FNameUtil_1.FNameUtil.NONE;
    this.owc = Transform_1.Transform.Create();
    this.VisibleInternal = e.bVisible;
    this.iwc = e.GetAttachParent();
    this.rwc = e.GetAttachSocketName();
    this.owc.FromUeTransform(e.GetRelativeTransform());
  }
  get Visible() {
    return this.VisibleInternal;
  }
  SetVisible(t, e = 0) {
    if (this.VisibleInternal !== t) {
      this.VisibleInternal = t;
      if (this.hva) {
        TimerSystem_1.TimerSystem.Remove(this.hva);
        this.hva = undefined;
      }
      if (!this.VisibleInternal && e > 0) {
        this.hva = TimerSystem_1.TimerSystem.Delay(this.lva, e);
      } else {
        this.Mesh.SetVisibility(t, false);
      }
    }
  }
  AttachToNewSocket(t, e) {
    this.Mesh.K2_AttachToComponent(this.iwc, t, 0, 0, 0, true);
    this.Mesh.K2_SetRelativeTransform(e, false, undefined, true);
  }
  ResetAttach() {
    this.Mesh.K2_AttachToComponent(this.iwc, this.rwc, 0, 0, 0, true);
    this.Mesh.K2_SetRelativeTransform(this.owc.ToUeTransformOld(), false, undefined, true);
  }
}
class SubMeshOrder {
  constructor(t, e, s, i) {
    this.Visible = t;
    this.CharControllerData = e;
    this.EffectDataAssetRef = s;
    this.DelayTime = i;
  }
}
let SubMeshComponent = class SubMeshComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.CharActorComp = undefined;
    this.CharRenderComp = undefined;
    this.SubMeshMap = new Map();
    this.SubMeshOrderMap = new Map();
    this.YZu = 1;
    this.zZu = new Map();
    this.JZu = new Map();
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(1);
    this.CharActorComp = this.Entity.GetComponent(3);
    this.CharRenderComp = this.CharActorComp?.Actor.CharRenderingComponent;
    return true;
  }
  OnClear() {
    this.zZu.clear();
    this.JZu.clear();
    return true;
  }
  OnActivate() {
    if (this.ActorComp) {
      var e = this.ActorComp.Owner.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
      for (let t = e.Num() - 1; t >= 0; --t) {
        var s = e.Get(t);
        var i = s.GetName();
        if (!standardMeshNames.has(i)) {
          this.SubMeshMap.set(i, new SubMeshItem(i, s));
        }
      }
    }
  }
  OnAfterTick(t) {
    this.ILc();
  }
  OnEnable() {
    this.ILc(false);
  }
  ILc(t = true) {
    for (var [e, s] of this.SubMeshOrderMap) {
      this.SetSubMeshVisible(e, s, t);
    }
    this.SubMeshOrderMap.clear();
  }
  SetSubMeshVisible(t, e, s = true) {
    var i;
    var t = this.SubMeshMap.get(t);
    if (t && t.Visible !== e.Visible) {
      if (t.CurrentPdHandle) {
        this.CharRenderComp?.RemoveMaterialControllerData(t.CurrentPdHandle);
        t.CurrentPdHandle = 0;
      }
      if (s && e.CharControllerData) {
        t.CurrentPdHandle = this.CharRenderComp?.AddMaterialControllerData(e.CharControllerData) ?? 0;
      }
      if (t.CurrentEffectHandle) {
        EffectSystem_1.EffectSystem.StopEffectById(t.CurrentEffectHandle, "SubMesh", true, true);
        t.CurrentEffectHandle = 0;
      }
      if (s && e.EffectDataAssetRef && (s = e.EffectDataAssetRef.ToAssetPathName()) && (s = this.CharActorComp?.GetReplaceEffect(s) ?? s, (i = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(this.Entity.Id)).SkeletalMeshComp = t.Mesh, s = EffectSystem_1.EffectSystem.SpawnEffect(t.Mesh, new UE.TransformDouble(), s, "SubMeshComponent", i, 3)) && EffectSystem_1.EffectSystem.IsValid(s)) {
        i = EffectSystem_1.EffectSystem.GetEffectActor(s);
        t.CurrentEffectHandle = s;
        i.K2_AttachToComponent(t.Mesh, FNameUtil_1.FNameUtil.NONE, 0, 0, 0, false);
        i.D_K2_SetActorRelativeTransform(new UE.TransformDouble(), false, undefined, true);
        EffectSystem_1.EffectSystem.ForceCheckPendingInit(s);
      }
      t.SetVisible(e.Visible, e.DelayTime);
    }
  }
  SetSubMeshOrder(t, e, s, i, h) {
    this.SubMeshOrderMap.set(t, new SubMeshOrder(e, s, i, h));
  }
  SetSubMeshAttach(t, e, s) {
    this.SubMeshMap.get(t)?.AttachToNewSocket(e, s);
  }
  ResetSubMeshAttach(t) {
    this.SubMeshMap.get(t)?.ResetAttach();
  }
  SetHideMesh(t, e, s, i, h = 0) {
    if (h && this.zZu.get(t) !== h) {
      return this.zZu.get(t) ?? 0;
    }
    var r = this.JZu.get(t);
    if (r) {
      for (const m of r[1]) {
        m.SetActorHiddenInGame(!r[0]);
      }
      this.JZu.delete(t);
    }
    h = this.YZu++;
    this.zZu.set(t, h);
    t.SetVisibility(e, s);
    if (i) {
      var o = !e;
      var n = new Array();
      this.JZu.set(t, [o, n]);
      var s = this.Entity.GetComponent(3);
      var a = new Array();
      if (s && s.Actor.Mesh === t) {
        var i = (0, puerts_1.$ref)(undefined);
        s.Actor.GetAllChildActors(i, true);
        var f = (0, puerts_1.$unref)(i);
        for (let t = f.Num() - 1; t >= 0; --t) {
          a.push(f.Get(t));
        }
      } else {
        var u = t.AttachChildren;
        for (let t = u.Num() - 1; t >= 0; --t) {
          var c = u.Get(t).GetOwner();
          if (c) {
            a.push(c);
          }
        }
      }
      for (const S of a) {
        if (S.bHidden !== o) {
          n.push(S);
          S.SetActorHiddenInGame(o);
        }
      }
    }
    return h;
  }
};
SubMeshComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(224)], SubMeshComponent);
exports.SubMeshComponent = SubMeshComponent; //# sourceMappingURL=SubMeshComponent.js.map