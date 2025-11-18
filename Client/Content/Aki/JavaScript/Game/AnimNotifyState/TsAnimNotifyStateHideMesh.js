"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class HideMeshParams {
  constructor(t) {
    this.MeshComp = t;
    this.Children = new Array();
    this.HideKey = 0;
  }
}
const actorAnsMap = new Map();
class TsAnimNotifyStateHideMesh extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.ChildMeshName = "";
    this.HideChildren = true;
    this.HideChildrenActors = true;
    this.EndEffect = undefined;
    this.Hide = true;
  }
  Constructor() {}
  K2_NotifyBegin(t, e, i) {
    var s = t.GetOwner();
    if (!s) {
      return false;
    }
    let r = undefined;
    if (this.ChildMeshName) {
      var a = s.K2_GetComponentsByClass(UE.MeshComponent.StaticClass());
      for (let t = a.Num() - 1; t >= 0; --t) {
        var o = a.Get(t);
        if (o.GetName() === this.ChildMeshName) {
          r = o;
          break;
        }
      }
    } else {
      r = t;
    }
    if (!r) {
      return false;
    }
    let h = actorAnsMap.get(s);
    if (!h) {
      h = new Map();
      actorAnsMap.set(s, h);
    }
    var n = h.get(this);
    if (n) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Test", 6, "TsAnimNotifyStateHideMesh Error.", ["Mesh", t?.GetName()], ["Anim", e?.GetName()]);
      }
      return false;
    }
    n = new HideMeshParams(r);
    h.set(this, n);
    if (s instanceof TsBaseCharacter_1.default) {
      s.CharacterActorComponent?.Entity?.GetComponent(181)?.StartForceDisableAnimOptimization(2, false);
      t = s.GetEntityNoBlueprint()?.GetComponent(227);
      if (t) {
        n.HideKey = t.SetHideMesh(n.MeshComp, !this.Hide, this.HideChildren, this.HideChildrenActors, 0);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Test", 6, "HideMesh Begin", ["Animation", e?.GetName()], ["Hide", this.Hide], ["HideKey", n.HideKey]);
        }
        return true;
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Test", 6, "HideMesh Begin2", ["Animation", e?.GetName()], ["Hide", this.Hide], ["HideKey", n.HideKey]);
    }
    r.SetVisibility(!this.Hide, this.HideChildren);
    if (this.HideChildrenActors) {
      if (this.ChildMeshName) {
        var f = r.AttachChildren;
        for (let t = f.Num() - 1; t >= 0; --t) {
          var u = f.Get(t).GetOwner();
          if (!u.bHidden) {
            n.Children.push(u);
          }
        }
      } else {
        var t = (0, puerts_1.$ref)(undefined);
        s.GetAllChildActors(t, true);
        var c = (0, puerts_1.$unref)(t);
        for (let t = c.Num() - 1; t >= 0; --t) {
          var d = c.Get(t);
          if (!d.bHidden) {
            n.Children.push(d);
          }
        }
      }
      for (const _ of n.Children) {
        _.SetActorHiddenInGame(this.Hide);
      }
    }
    return true;
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    if (!t) {
      return false;
    }
    var i = actorAnsMap.get(t);
    if (!i) {
      return false;
    }
    var s = i.get(this);
    if (!s) {
      return false;
    }
    if ((i.delete(this), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Test", 6, "HideMesh End", ["Animation", e?.GetName()], ["Hide", this.Hide], ["HideKey", s.HideKey]), t instanceof TsBaseCharacter_1.default) && (t.GetEntityNoBlueprint()?.GetComponent(181)?.CancelForceDisableAnimOptimization(2), s.HideKey)) {
      e = t.GetEntityNoBlueprint()?.GetComponent(227);
      if (e) {
        e.SetHideMesh(s.MeshComp, this.Hide, this.HideChildren, this.HideChildrenActors, s.HideKey);
        return true;
      }
    }
    s.MeshComp.SetVisibility(this.Hide, this.HideChildren);
    if (this.HideChildrenActors) {
      for (const r of s.Children) {
        r.SetActorHiddenInGame(!this.Hide);
      }
    }
    if (i.size === 0) {
      actorAnsMap.delete(t);
    }
    if (this.EndEffect) {
      t.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass())?.AddMaterialControllerData(this.EndEffect);
    }
    return true;
  }
  GetNotifyName() {
    return "隐藏网格体";
  }
}
exports.default = TsAnimNotifyStateHideMesh;
//# sourceMappingURL=TsAnimNotifyStateHideMesh.js.map