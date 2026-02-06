"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialSkillJiabeilina = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const SpecialSkillBase_1 = require("./SpecialSkillBase");
class SpecialSkillJiabeilina extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.oRe = undefined;
    this.cBe = undefined;
    this.rSm = undefined;
    this.YIm = undefined;
    this.tTu = (e, t) => {
      this.YIm ||= new Map();
      let i = undefined;
      if (this.YIm.has(e)) {
        i = this.YIm.get(e);
      } else {
        var s = this.cBe?.GetSkill(e)?.GetLoadedMontages();
        if (!s) {
          this.YIm.set(e, undefined);
          return;
        }
        i = new Set();
        for (const r of s) {
          var h = r.Notifies;
          var a = h.Num();
          for (let e = 0; e < a; e++) {
            var n = h.Get(e);
            if (n.NotifyStateClass?.IsValid() && n.NotifyStateClass.IsA(UE.TsAnimNotifyStateHideMesh_C.StaticClass()) && (n = n.NotifyStateClass.ChildMeshName)) {
              i.add(n);
            }
          }
        }
        if (!(i.size > 0)) {
          this.YIm.set(e, undefined);
          return;
        }
        this.YIm.set(e, i);
      }
      if (i && i.size > 0) {
        this.zIm(i, false);
      }
    };
    this.bJe = (e, t) => {
      t = this.YIm?.get(t);
      if (t && t.size > 0) {
        this.zIm(t, true);
      }
    };
  }
  OnStart() {
    var e = this.SpecialSkillComponent.Entity;
    this.Hte = e.GetComponent(3);
    this.cBe = e.GetComponent(42);
    if (this.Hte?.IsRoleAndCtrlByMe && SpecialSkillJiabeilina.nSm) {
      this.YIm = new Map();
      this.oSm();
      EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.tTu);
      EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.OnSkillEnd, this.bJe);
    }
  }
  OnEnd() {
    this.rSm?.clear();
    var e = this.SpecialSkillComponent.Entity;
    if (EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.tTu)) {
      EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.tTu);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.OnSkillEnd, this.bJe)) {
      EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.OnSkillEnd, this.bJe);
    }
  }
  OnActivate() {
    var e = this.SpecialSkillComponent.Entity;
    this.oRe = e.GetComponent(188);
    if (this.rSm) {
      this.oRe?.SetNoUpdateMeshes(this.rSm);
    }
  }
  oSm() {
    if (this.Hte) {
      var t = ["OtherCase1", "OtherCase2", "OtherCase3", "OtherCase4", "OtherCase5", "OtherCase6", "OtherCase9", "OtherCase10"];
      this.rSm ||= new Set();
      var i = this.Hte.Actor.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
      for (let e = 0; e < i.Num(); e++) {
        var s = i.Get(e);
        var h = s.GetName();
        if (t.includes(h)) {
          if (s.AnimClass) {
            this.rSm.add(s);
          } else {
            s.bNoSkeletonUpdate = true;
          }
        }
      }
    }
  }
  zIm(i, s) {
    if (this.Hte && this.rSm) {
      var h = this.Hte.Actor.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
      let t = false;
      for (let e = 0; e < h.Num(); e++) {
        var a = h.Get(e);
        var n = a.GetName();
        if (i.has(n)) {
          if (s && !this.rSm.has(a)) {
            this.rSm.add(a);
            t = true;
          } else if (!s && this.rSm.has(a)) {
            this.rSm.delete(a);
            t = true;
          }
        }
      }
      if (t) {
        this.oRe?.SetNoUpdateMeshes(this.rSm);
      }
    }
  }
  static SetOptimizeEnable(e) {
    SpecialSkillJiabeilina.nSm = e;
  }
}
(exports.SpecialSkillJiabeilina = SpecialSkillJiabeilina).nSm = true;
//# sourceMappingURL=SpecialSkillJiabeilina.js.map