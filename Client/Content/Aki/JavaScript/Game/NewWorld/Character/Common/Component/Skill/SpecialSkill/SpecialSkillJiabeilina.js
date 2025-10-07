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
    this.GKd = undefined;
    this.nYd = undefined;
    this.tTu = (e, t) => {
      this.nYd ||= new Map();
      let i = undefined;
      if (this.nYd.has(e)) {
        i = this.nYd.get(e);
      } else {
        var s = this.cBe?.GetSkill(e)?.GetLoadedMontages();
        if (!s) {
          this.nYd.set(e, undefined);
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
          this.nYd.set(e, undefined);
          return;
        }
        this.nYd.set(e, i);
      }
      if (i && i.size > 0) {
        this.sYd(i, false);
      }
    };
    this.bJe = (e, t) => {
      t = this.nYd?.get(t);
      if (t && t.size > 0) {
        this.sYd(t, true);
      }
    };
  }
  OnStart() {
    var e = this.SpecialSkillComponent.Entity;
    this.Hte = e.GetComponent(3);
    this.cBe = e.GetComponent(39);
    if (this.Hte?.IsRoleAndCtrlByMe && SpecialSkillJiabeilina.NKd) {
      this.nYd = new Map();
      this.FKd();
      EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.tTu);
      EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.OnSkillEnd, this.bJe);
    }
  }
  OnEnd() {
    this.GKd?.clear();
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
    this.oRe = e.GetComponent(178);
    if (this.GKd) {
      this.oRe?.SetNoUpdateMeshes(this.GKd);
    }
  }
  FKd() {
    if (this.Hte) {
      var t = ["OtherCase1", "OtherCase2", "OtherCase3", "OtherCase4", "OtherCase5", "OtherCase6", "OtherCase9", "OtherCase10"];
      this.GKd ||= new Set();
      var i = this.Hte.Actor.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
      for (let e = 0; e < i.Num(); e++) {
        var s = i.Get(e);
        var h = s.GetName();
        if (t.includes(h)) {
          if (s.AnimClass) {
            this.GKd.add(s);
          } else {
            s.bNoSkeletonUpdate = true;
          }
        }
      }
    }
  }
  sYd(i, s) {
    if (this.Hte && this.GKd) {
      var h = this.Hte.Actor.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
      let t = false;
      for (let e = 0; e < h.Num(); e++) {
        var a = h.Get(e);
        var n = a.GetName();
        if (i.has(n)) {
          if (s && !this.GKd.has(a)) {
            this.GKd.add(a);
            t = true;
          } else if (!s && this.GKd.has(a)) {
            this.GKd.delete(a);
            t = true;
          }
        }
      }
      if (t) {
        this.oRe?.SetNoUpdateMeshes(this.GKd);
      }
    }
  }
  static SetOptimizeEnable(e) {
    SpecialSkillJiabeilina.NKd = e;
  }
}
(exports.SpecialSkillJiabeilina = SpecialSkillJiabeilina).NKd = true;
//# sourceMappingURL=SpecialSkillJiabeilina.js.map