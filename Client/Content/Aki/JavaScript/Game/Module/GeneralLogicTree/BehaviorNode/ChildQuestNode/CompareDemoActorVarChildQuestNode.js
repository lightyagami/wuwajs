"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareDemoActorVarChildQuestNode = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const TestModuleBridge_1 = require("../../../../Bridge/TestModuleBridge");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LevelGamePlayUtils_1 = require("../../../../LevelGamePlay/LevelGamePlayUtils");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
const FORCE_CHECK_INTERVAL = 500;
class CompareDemoActorVarChildQuestNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.Az1 = undefined;
    this.Pz1 = 0;
    this.Qte = [];
    this.LDe = undefined;
    this.xz1 = false;
    this.Uz1 = () => {
      if (Info_1.Info.IsPlayInEditor && this.xz1 && this.Dz1()) {
        if (this.LDe) {
          TimerSystem_1.GameplayTimerSystem.Remove(this.LDe);
        }
        this.SubmitNode();
      }
    };
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return !!super.OnCreate(e) && !!Info_1.Info.IsPlayInEditor && (e = e.Condition).Type === IQuest_1.EChildQuest.CompareActorVar && (this.Az1 = e.PreConditions, this.Pz1 = e.Count, this.Qte = e.Conditions, this.LDe && (TimerSystem_1.GameplayTimerSystem.Remove(this.LDe), this.LDe = undefined), this.xz1 = false, this.Bz1(), true);
  }
  OnStart(e) {
    super.OnStart(e);
    this.LDe = TimerSystem_1.GameplayTimerSystem.Forever(this.Uz1, FORCE_CHECK_INTERVAL);
  }
  AddEventsOnChildQuestStart() {
    super.AddEventsOnChildQuestStart();
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnDemoInteractiveActorMemberUpdated, this.Uz1)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnDemoInteractiveActorMemberUpdated, this.Uz1);
    }
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnDemoInteractiveActorMemberCalled, this.Uz1)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnDemoInteractiveActorMemberCalled, this.Uz1);
    }
  }
  RemoveEventsOnChildQuestEnd() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnDemoInteractiveActorMemberUpdated, this.Uz1)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnDemoInteractiveActorMemberUpdated, this.Uz1);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnDemoInteractiveActorMemberCalled, this.Uz1)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnDemoInteractiveActorMemberCalled, this.Uz1);
    }
    super.RemoveEventsOnChildQuestEnd();
  }
  OnEnd(e) {
    if (this.LDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.LDe);
      this.LDe = undefined;
    }
    this.xz1 = false;
    super.OnEnd(e);
  }
  Bz1() {
    if (Info_1.Info.IsPlayInEditor) {
      TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then(e => {
        if (e && e.KuroDemoInteractController) {
          this.xz1 = true;
        }
      });
    }
  }
  Dz1() {
    if (this.Az1 && !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(this.Az1, undefined)) {
      return false;
    }
    let e = 0;
    for (const t of this.Qte) {
      if (this.kz1(t)) {
        ++e;
      }
      if (this.Oz1(e, this.Qte.length, this.Pz1)) {
        return true;
      }
    }
    return this.Oz1(e, this.Qte.length, this.Pz1);
  }
  Oz1(e, t, r) {
    switch (r) {
      case 0:
        return e === t;
      case 1:
        return e >= 1;
      case 2:
        return e >= 2;
      case 3:
        return e >= 3;
      case 4:
        return e >= 4;
      case 5:
        return e >= 5;
    }
    return false;
  }
  kz1(e) {
    var t;
    var r = e.ActorRef.PathName.split(".");
    var r = r[1] + "." + r[2];
    var s = TestModuleBridge_1.TestModuleBridge.TryGetLoadedTestModuleExports()?.KuroDemoInteractController?.GetDemoInteractiveActorMemberProperty(r, e.Var1);
    var i = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(e.Var2, this.Context);
    if (s !== undefined && i !== undefined) {
      switch (e.Compare) {
        case "Eq":
        case "Ne":
          if ((s instanceof UE.Transform || s instanceof UE.TransformDouble) && typeof i == "object") {
            return this.qz1(s, i, e.Compare);
          } else if (typeof s == "number" && typeof i == "number") {
            return this.Gz1(s, i, e.Compare);
          } else {
            t = s === i;
            if (e.Compare === "Eq") {
              return t;
            } else {
              return !t;
            }
          }
        case "Ge":
        case "Gt":
        case "Le":
        case "Lt":
          if (typeof s == "number" && typeof i == "number") {
            return this.Gz1(s, i, e.Compare);
          }
      }
    }
    return false;
  }
  qz1(e, t, r, s = MathUtils_1.MathUtils.KindaSmallNumber) {
    var i;
    var n = r === "Eq";
    var r = e instanceof UE.Transform || e instanceof UE.TransformDouble;
    var o = new Array(6);
    if (r) {
      r = e.GetLocation();
      i = e.Rotator();
      o.push(r.X, r.Y, r.Z, i.Roll, i.Pitch, i.Yaw);
    } else {
      o.push(e.X, e.Y, e.Z, e.Roll, e.Pitch, e.A);
    }
    var r = t instanceof UE.Transform || t instanceof UE.TransformDouble;
    var a = new Array(6);
    if (r) {
      i = t.GetLocation();
      e = t.Rotator();
      a.push(i.X, i.Y, i.Z, e.Roll, e.Pitch, e.Yaw);
    } else {
      a.push(t.X, t.Y, t.Z, t.Roll, t.Pitch, t.A);
    }
    for (let e = 0; e < o.length; e++) {
      var h = o[e] ?? 0;
      var u = a[e] ?? 0;
      if (!MathUtils_1.MathUtils.IsNearlyEqual(h, u, s)) {
        return !n;
      }
    }
    return n;
  }
  Gz1(e, t, r, s = MathUtils_1.MathUtils.KindaSmallNumber) {
    if (typeof e == "number" && typeof t == "number") {
      switch (r) {
        case "Ge":
          return t <= e;
        case "Gt":
          return t < e;
        case "Le":
          return e <= t;
        case "Lt":
          return e < t;
        case "Eq":
          return MathUtils_1.MathUtils.IsNearlyEqual(e, t);
        case "Ne":
          return !MathUtils_1.MathUtils.IsNearlyEqual(e, t);
      }
    }
    return false;
  }
}
exports.CompareDemoActorVarChildQuestNode = CompareDemoActorVarChildQuestNode;
//# sourceMappingURL=CompareDemoActorVarChildQuestNode.js.map