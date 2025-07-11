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
    this.oz1 = undefined;
    this.nz1 = 0;
    this.Qte = [];
    this.LDe = undefined;
    this.sz1 = false;
    this.az1 = () => {
      if (Info_1.Info.IsPlayInEditor && this.sz1 && this.hz1()) {
        if (this.LDe) {
          TimerSystem_1.TimerSystem.Remove(this.LDe);
        }
        this.SubmitNode();
      }
    };
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return !!super.OnCreate(e) && !!Info_1.Info.IsPlayInEditor && (e = e.Condition).Type === IQuest_1.EChildQuest.CompareActorVar && (this.oz1 = e.PreConditions, this.nz1 = e.Count, this.Qte = e.Conditions, this.LDe && (TimerSystem_1.TimerSystem.Remove(this.LDe), this.LDe = undefined), this.sz1 = false, this.lz1(), true);
  }
  OnStart(e) {
    super.OnStart(e);
    this.LDe = TimerSystem_1.TimerSystem.Forever(this.az1, FORCE_CHECK_INTERVAL);
  }
  AddEventsOnChildQuestStart() {
    super.AddEventsOnChildQuestStart();
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnDemoInteractiveActorMemberUpdated, this.az1)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnDemoInteractiveActorMemberUpdated, this.az1);
    }
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnDemoInteractiveActorMemberCalled, this.az1)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnDemoInteractiveActorMemberCalled, this.az1);
    }
  }
  RemoveEventsOnChildQuestEnd() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnDemoInteractiveActorMemberUpdated, this.az1)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnDemoInteractiveActorMemberUpdated, this.az1);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnDemoInteractiveActorMemberCalled, this.az1)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnDemoInteractiveActorMemberCalled, this.az1);
    }
    super.RemoveEventsOnChildQuestEnd();
  }
  OnEnd(e) {
    if (this.LDe) {
      TimerSystem_1.TimerSystem.Remove(this.LDe);
      this.LDe = undefined;
    }
    this.sz1 = false;
    super.OnEnd(e);
  }
  lz1() {
    if (Info_1.Info.IsPlayInEditor) {
      TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then(e => {
        if (e && e.KuroDemoInteractController) {
          this.sz1 = true;
        }
      });
    }
  }
  hz1() {
    if (this.oz1 && !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(this.oz1, undefined)) {
      return false;
    }
    let e = 0;
    for (const t of this.Qte) {
      if (this._z1(t)) {
        ++e;
      }
      if (this.uz1(e, this.Qte.length, this.nz1)) {
        return true;
      }
    }
    return this.uz1(e, this.Qte.length, this.nz1);
  }
  uz1(e, t, r) {
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
  _z1(e) {
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
            return this.cz1(s, i, e.Compare);
          } else if (typeof s == "number" && typeof i == "number") {
            return this.dz1(s, i, e.Compare);
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
            return this.dz1(s, i, e.Compare);
          }
      }
    }
    return false;
  }
  cz1(e, t, r, s = MathUtils_1.MathUtils.KindaSmallNumber) {
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
  dz1(e, t, r, s = MathUtils_1.MathUtils.KindaSmallNumber) {
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