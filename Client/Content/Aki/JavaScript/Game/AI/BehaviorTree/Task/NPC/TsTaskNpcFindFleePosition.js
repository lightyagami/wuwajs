"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const TsAiController_1 = require("../../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
const PROFILE_KEY = "TsTaskNpcFindFleePosition_GetNoTargetDirectionList";
const CHECK_DEGREE_ADDITION = 15;
class TsTaskNpcFindFleePosition extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.SearchRange = 0;
    this.BlackboardKey = "";
    this.TempEnemyList = undefined;
    this.TraceElement = undefined;
    this.IsInitTsVariables = false;
    this.TsSearchRange = 0;
    this.TsBlackboardKey = "";
  }
  Constructor() {
    super.Constructor();
    this.TempEnemyList = undefined;
    this.TraceElement = undefined;
    this.IsInitTsVariables = false;
    this.TsSearchRange = 0;
    this.TsBlackboardKey = "";
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsSearchRange = this.SearchRange;
      this.TsBlackboardKey = this.BlackboardKey;
    }
  }
  ReceiveExecuteAI(t, e) {
    this.InitTsVariables();
    if (t instanceof TsAiController_1.default) {
      this.TempEnemyList ||= new Array();
      this.TempEnemyList.length = 0;
      t = t.AiController;
      const o = t.CharActorComp;
      var i = o.Entity.Id;
      var s = o.ActorLocationProxy;
      this.InitTraceElement();
      if (t.AiPerception) {
        this.FindEnemies(t.AiPerception);
      }
      var t = MathUtils_1.MathUtils.GetRandomFloatNumber(this.TsSearchRange / 2, this.TsSearchRange);
      var r = this.GetNoTargetDirectionList(s, o);
      if (r.length > 0) {
        r = this.GetOptimalDirection(s, r).MultiplyEqual(t).AdditionEqual(s);
        ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(i, this.TsBlackboardKey, r.X, r.Y, r.Z);
      } else {
        r = this.TempEnemyList.length;
        if (!(r > 0)) {
          this.FinishExecute(false);
          return;
        }
        {
          r = Math.floor(MathUtils_1.MathUtils.GetRandomFloatNumber(0, r));
          const o = this.TempEnemyList[r]?.GetComponent(1);
          r = Vector_1.Vector.Create(s).SubtractionEqual(o.ActorLocationProxy);
          r.Normalize();
          r = r.MultiplyEqual(t).AdditionEqual(s);
          ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(i, this.TsBlackboardKey, r.X, r.Y, r.Z);
        }
      }
      this.FinishExecute(true);
    } else {
      this.FinishExecute(false);
    }
  }
  InitTraceElement() {
    if (!this.TraceElement) {
      this.TraceElement = UE.NewObject(UE.TraceLineElement.StaticClass());
      this.TraceElement.bIsSingle = true;
      this.TraceElement.bIgnoreSelf = true;
      this.TraceElement.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Visible);
    }
    this.TraceElement.WorldContextObject = this.GetWorld();
  }
  FindEnemies(t) {
    for (const i of t.AllEnemies) {
      var e = EntitySystem_1.EntitySystem.Get(i);
      if (e) {
        this.TempEnemyList.push(e);
      }
    }
  }
  GetNoTargetDirectionList(e, t) {
    var i = new Array();
    var s = t.ActorForwardProxy;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.TraceElement, e);
    var r = MathUtils_1.PI_DEG_DOUBLE / CHECK_DEGREE_ADDITION;
    for (let t = 0; t < r; t++) {
      var o = t * CHECK_DEGREE_ADDITION;
      var h = Vector_1.Vector.Create();
      s.RotateAngleAxis(o, Vector_1.Vector.UpVectorProxy, h);
      var o = Vector_1.Vector.Create();
      h.Multiply(this.TsSearchRange, o);
      o.AdditionEqual(e);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.TraceElement, o);
      var o = TraceElementCommon_1.TraceElementCommon.LineTrace(this.TraceElement, PROFILE_KEY);
      if (!o || !this.TraceElement.HitResult.bBlockingHit) {
        i.push(h);
      }
    }
    return i;
  }
  GetOptimalDirection(i, s) {
    var r = this.TempEnemyList.length;
    if (r === 0) {
      const o = Math.floor(MathUtils_1.MathUtils.GetRandomFloatNumber(0, s.length));
      return s[o];
    }
    let o = 0;
    let h = 0;
    for (let t = 0, e = s.length; t < e; t++) {
      var l = Vector_1.Vector.Create(s[t]).MultiplyEqual(this.TsSearchRange);
      l.AdditionEqual(i);
      let e = 0;
      for (let t = 0; t < r; t++) {
        var n = this.TempEnemyList[t]?.GetComponent(1);
        var n = Vector_1.Vector.Dist(n.ActorLocationProxy, l);
        if (e < n) {
          e = n;
        }
      }
      if (e > h) {
        h = e;
        o = t;
      }
    }
    return s[o];
  }
}
exports.default = TsTaskNpcFindFleePosition;
//# sourceMappingURL=TsTaskNpcFindFleePosition.js.map