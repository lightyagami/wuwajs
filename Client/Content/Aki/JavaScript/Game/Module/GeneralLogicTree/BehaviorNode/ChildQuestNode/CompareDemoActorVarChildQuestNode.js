"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CompareDemoActorVarChildQuestNode = void 0;
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  TestModuleBridge_1 = require("../../../../Bridge/TestModuleBridge"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LevelGamePlayUtils_1 = require("../../../../LevelGamePlay/LevelGamePlayUtils"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ChildQuestNodeBase_1 = require("./ChildQuestNodeBase"),
  FORCE_CHECK_INTERVAL = 500;
class CompareDemoActorVarChildQuestNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments), this.uY1 = void 0, this.cY1 = 0, this.Qte = [], this.LDe = void 0, this.dY1 = !1, this.mY1 = () => {
      Info_1.Info.IsPlayInEditor && this.dY1 && this.fY1() && (this.LDe && TimerSystem_1.TimerSystem.Remove(this.LDe), this.SubmitNode())
    }
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return !!super.OnCreate(e) && !!Info_1.Info.IsPlayInEditor && (e = e.Condition).Type === IQuest_1.EChildQuest.CompareActorVar && (this.uY1 = e.PreConditions, this.cY1 = e.Count, this.Qte = e.Conditions, this.LDe && (TimerSystem_1.TimerSystem.Remove(this.LDe), this.LDe = void 0), this.dY1 = !1, this.gY1(), !0)
  }
  OnStart(e) {
    super.OnStart(e), this.LDe = TimerSystem_1.TimerSystem.Forever(this.mY1, FORCE_CHECK_INTERVAL)
  }
  AddEventsOnChildQuestStart() {
    super.AddEventsOnChildQuestStart(), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnDemoInteractiveActorMemberUpdated, this.mY1) || EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnDemoInteractiveActorMemberUpdated, this.mY1), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnDemoInteractiveActorMemberCalled, this.mY1) || EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnDemoInteractiveActorMemberCalled, this.mY1)
  }
  RemoveEventsOnChildQuestEnd() {
    EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnDemoInteractiveActorMemberUpdated, this.mY1) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnDemoInteractiveActorMemberUpdated, this.mY1), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnDemoInteractiveActorMemberCalled, this.mY1) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnDemoInteractiveActorMemberCalled, this.mY1), super.RemoveEventsOnChildQuestEnd()
  }
  OnEnd(e) {
    this.LDe && (TimerSystem_1.TimerSystem.Remove(this.LDe), this.LDe = void 0), this.dY1 = !1, super.OnEnd(e)
  }
  gY1() {
    Info_1.Info.IsPlayInEditor && TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then(e => {
      e && e.KuroDemoInteractController && (this.dY1 = !0)
    })
  }
  fY1() {
    if (this.uY1 && !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(this.uY1, void 0)) return !1;
    let e = 0;
    for (const t of this.Qte)
      if (this.CY1(t) && ++e, this.pY1(e, this.Qte.length, this.cY1)) return !0;
    return this.pY1(e, this.Qte.length, this.cY1)
  }
  pY1(e, t, r) {
    switch (r) {
      case 0:
        return e === t;
      case 1:
        return 1 <= e;
      case 2:
        return 2 <= e;
      case 3:
        return 3 <= e;
      case 4:
        return 4 <= e;
      case 5:
        return 5 <= e
    }
    return !1
  }
  CY1(e) {
    var t, r = e.ActorRef.PathName.split("."),
      r = r[1] + "." + r[2],
      s = (TestModuleBridge_1.TestModuleBridge.TryGetLoadedTestModuleExports()?.KuroDemoInteractController)?.GetDemoInteractiveActorMemberProperty(r, e.Var1),
      i = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(e.Var2, this.Context);
    if (void 0 !== s && void 0 !== i) switch (e.Compare) {
      case "Eq":
      case "Ne":
        return (s instanceof UE.Transform || s instanceof UE.TransformDouble) && "object" == typeof i ? this.vY1(s, i, e.Compare) : "number" == typeof s && "number" == typeof i ? this.yY1(s, i, e.Compare) : (t = s === i, "Eq" === e.Compare ? t : !t);
      case "Ge":
      case "Gt":
      case "Le":
      case "Lt":
        if ("number" == typeof s && "number" == typeof i) return this.yY1(s, i, e.Compare)
    }
    return !1
  }
  vY1(e, t, r, s = MathUtils_1.MathUtils.KindaSmallNumber) {
    var i, n = "Eq" === r,
      r = e instanceof UE.Transform || e instanceof UE.TransformDouble,
      o = new Array(6),
      r = (r ? (r = e.GetLocation(), i = e.Rotator(), o.push(r.X, r.Y, r.Z, i.Roll, i.Pitch, i.Yaw)) : o.push(e.X, e.Y, e.Z, e.Roll, e.Pitch, e.A), t instanceof UE.Transform || t instanceof UE.TransformDouble),
      a = new Array(6);
    r ? (i = t.GetLocation(), e = t.Rotator(), a.push(i.X, i.Y, i.Z, e.Roll, e.Pitch, e.Yaw)) : a.push(t.X, t.Y, t.Z, t.Roll, t.Pitch, t.A);
    for (let e = 0; e < o.length; e++) {
      var h = o[e] ?? 0,
        u = a[e] ?? 0;
      if (!MathUtils_1.MathUtils.IsNearlyEqual(h, u, s)) return !n
    }
    return n
  }
  yY1(e, t, r, s = MathUtils_1.MathUtils.KindaSmallNumber) {
    if ("number" == typeof e && "number" == typeof t) switch (r) {
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
        return !MathUtils_1.MathUtils.IsNearlyEqual(e, t)
    }
    return !1
  }
}
exports.CompareDemoActorVarChildQuestNode = CompareDemoActorVarChildQuestNode;
//# sourceMappingURL=CompareDemoActorVarChildQuestNode.js.map