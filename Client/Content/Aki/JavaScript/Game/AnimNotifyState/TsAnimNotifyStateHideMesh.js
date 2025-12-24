"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const TsBaseVehicle_1 = require("../NewWorld/Vehicle/TsBaseVehicle");
class HideMeshParams {
  constructor(e) {
    this.MeshComp = e;
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
  K2_NotifyBegin(e, t, i) {
    var s = e.GetOwner();
    if (!s) {
      return false;
    }
    let r = undefined;
    if (this.ChildMeshName) {
      var a = s.K2_GetComponentsByClass(UE.MeshComponent.StaticClass());
      for (let e = a.Num() - 1; e >= 0; --e) {
        var o = a.Get(e);
        if (o.GetName() === this.ChildMeshName) {
          r = o;
          break;
        }
      }
    } else {
      r = e;
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
        Log_1.Log.Error("Test", 6, "TsAnimNotifyStateHideMesh Error.", ["Mesh", e?.GetName()], ["Anim", t?.GetName()]);
      }
      return false;
    }
    n = new HideMeshParams(r);
    h.set(this, n);
    if (s instanceof TsBaseCharacter_1.default || s instanceof TsBaseVehicle_1.default) {
      e = s.GetEntityNoBlueprint()?.GetComponent(45);
      if (e) {
        e.StartForceDisableAnimOptimization(2, false);
      } else {
        s.GetEntityNoBlueprint()?.GetComponent(248)?.StartForceDisableAnimOptimization(2, false);
      }
      e = s.GetEntityNoBlueprint()?.GetComponent(235);
      if (e) {
        n.HideKey = e.SetHideMesh(n.MeshComp, !this.Hide, this.HideChildren, this.HideChildrenActors, 0);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Test", 6, "HideMesh Begin", ["Animation", t?.GetName()], ["Hide", this.Hide], ["HideKey", n.HideKey]);
        }
        return true;
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Test", 6, "HideMesh Begin2", ["Animation", t?.GetName()], ["Hide", this.Hide], ["HideKey", n.HideKey]);
    }
    r.SetVisibility(!this.Hide, this.HideChildren);
    if (this.HideChildrenActors) {
      if (this.ChildMeshName) {
        var f = r.AttachChildren;
        for (let e = f.Num() - 1; e >= 0; --e) {
          var c = f.Get(e).GetOwner();
          if (!c.bHidden) {
            n.Children.push(c);
          }
        }
      } else {
        var e = (0, puerts_1.$ref)(undefined);
        s.GetAllChildActors(e, true);
        var u = (0, puerts_1.$unref)(e);
        for (let e = u.Num() - 1; e >= 0; --e) {
          var d = u.Get(e);
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
  K2_NotifyEnd(e, t) {
    e = e.GetOwner();
    if (!e) {
      return false;
    }
    var i = actorAnsMap.get(e);
    if (!i) {
      return false;
    }
    var s = i.get(this);
    if (!s) {
      return false;
    }
    i.delete(this);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Test", 6, "HideMesh End", ["Animation", t?.GetName()], ["Hide", this.Hide], ["HideKey", s.HideKey]);
    }
    if (e instanceof TsBaseCharacter_1.default || e instanceof TsBaseVehicle_1.default) {
      t = e.GetEntityNoBlueprint()?.GetComponent(45);
      if (t) {
        t.CancelForceDisableAnimOptimization(2);
      } else {
        e.GetEntityNoBlueprint()?.GetComponent(248)?.CancelForceDisableAnimOptimization(2);
      }
      if (s.HideKey) {
        t = e.GetEntityNoBlueprint()?.GetComponent(235);
        if (t) {
          t.SetHideMesh(s.MeshComp, this.Hide, this.HideChildren, this.HideChildrenActors, s.HideKey);
          return true;
        }
      }
    }
    s.MeshComp.SetVisibility(this.Hide, this.HideChildren);
    if (this.HideChildrenActors) {
      for (const r of s.Children) {
        r.SetActorHiddenInGame(!this.Hide);
      }
    }
    if (i.size === 0) {
      actorAnsMap.delete(e);
    }
    if (this.EndEffect) {
      e.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass())?.AddMaterialControllerData(this.EndEffect);
    }
    return true;
  }
  GetNotifyName() {
    return "隐藏网格体";
  }
}
exports.default = TsAnimNotifyStateHideMesh;
//# sourceMappingURL=TsAnimNotifyStateHideMesh.js.map