"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ReachAreaBehaviorNode = void 0;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SceneTeamController_1 = require("../../../SceneTeam/SceneTeamController"),
  GeneralLogicTreeUtil_1 = require("../../GeneralLogicTreeUtil"),
  ChildQuestNodeBase_1 = require("./ChildQuestNodeBase"),
  MIN_INTERVAL = 20,
  MAX_INTERVAL = 500,
  MIN_DIST = 200,
  MAX_DIST = 1e3;
class ReachAreaBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments), this.l$t = void 0, this._$t = -0, this.E0 = 0, this.c$t = Vector_1.Vector.Create(), this.m$t = "Box", this.a$t = [], this.EffectPathKey = void 0, this.ConditionGrop = void 0, this.wY = 0, this.d$t = void 0, this.C$t = void 0, this.g$t = Vector_1.Vector.Create(), this.f$t = void 0, this.p$t = 0, this.v$t = 0, this.OJa = !1, this.IRe = void 0, this.OnTick = () => {
      this.IRe = void 0;
      var e = this.DoTaskAndGetNewInterval();
      this.IRe = TimerSystem_1.TimerSystem.Delay(this.OnTick, e)
    }
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    if (!super.OnCreate(e)) return !1;
    e = e.Condition;
    if (e.Type !== IQuest_1.EChildQuest.ReachArea) return !1;
    this.E0 = e.EntityId, this.a$t = e.MatchRoleOption, this.ConditionGrop = e.PreConditions, this.EffectPathKey = e.EffectPath;
    var t = e.RangeEntityId ? ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e.RangeEntityId) : void 0;
    if (this.OJa = void 0 !== e.RangeEntities && 0 < e.RangeEntities?.length, t) {
      this._$t = e.Range;
      var i = (0, IComponent_1.getComponent)(t.ComponentsData, "RangeComponent"),
        r = (this.m$t = i.Shape.Type, t.Transform.Pos);
      switch (i.Shape.Type) {
        case "Sphere":
          var s = i.Shape.Center;
          this.l$t = Vector_1.Vector.Create(r.X + (s?.X ?? 0), r.Y + (s?.Y ?? 0), r.Z + (s?.Z ?? 0)), this._$t = i.Shape.Radius;
          break;
        case "Box":
          var s = t.Transform.Rot,
            h = i.Shape.Center,
            o = i.Shape.Size,
            a = i.Shape.Rotator,
            s = Rotator_1.Rotator.Create(s?.Y ?? 0 + (a?.Y ?? 0), s?.Z ?? 0 + (a?.Z ?? 0), s?.X ?? 0 + (a?.X ?? 0)).Quaternion(),
            a = Vector_1.Vector.Create(r.X + (h?.X ?? 0), r.Y + (h?.Y ?? 0), r.Z + (h?.Z ?? 0)),
            h = Transform_1.Transform.Create(s, a, Vector_1.Vector.OneVector);
          this.l$t = a, this.d$t = Vector_1.Vector.Create(o.X ?? 0, o.Y ?? 0, o.Z ?? 0), this.C$t = h;
          break;
        case "Cylinder":
          s = i.Shape.Center;
          this.f$t = Vector_1.Vector.Create(r.X ?? 0 + (s?.X ?? 0), r.Y + (s?.Y ?? 0), r.Z + (s?.Z ?? 0)), this.p$t = i.Shape.Radius, this.v$t = i.Shape.Height
      }
    } else this.l$t = Vector_1.Vector.Create(e.Pos.X, e.Pos.Y, e.Pos.Z), this._$t = e.Range, this.m$t = "Sphere";
    return !0
  }
  OnDestroy() {
    super.OnDestroy()
  }
  OnStart(e) {
    super.OnStart(e), this.IRe = TimerSystem_1.TimerSystem.Delay(this.OnTick, MAX_INTERVAL)
  }
  OnEnd(e) {
    this.IRe && (TimerSystem_1.TimerSystem.Remove(this.IRe), this.IRe = void 0)
  }
  DoTaskAndGetNewInterval() {
    var e;
    return this.wY++, !this.uCu() || this.Blackboard?.DungeonId !== ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id || ModelManager_1.ModelManager.TeleportModel.IsTeleport || this.Submitting || !this.Blackboard.IsTracking && this.wY % 2 != 0 || ModelManager_1.ModelManager.SceneTeamModel.IsAllDid() || this.OJa ? MAX_INTERVAL : 1 < (e = this.M$t()) ? MathUtils_1.MathUtils.RangeClamp(e, MIN_DIST, MAX_DIST, MIN_INTERVAL, MAX_INTERVAL) : (this.SubmitNode(), MIN_INTERVAL)
  }
  M$t() {
    if (this.a$t && 0 < this.a$t.length) {
      if (!SceneTeamController_1.SceneTeamController.IsMatchRoleOption(this.a$t)) return MathUtils_1.MathUtils.LargeNumber
    } else if (ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam) return MathUtils_1.MathUtils.LargeNumber;
    if (this.ConditionGrop && !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(this.ConditionGrop, void 0)) return MathUtils_1.MathUtils.LargeNumber;
    if (this.E0) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.E0);
      if (!e) return MathUtils_1.MathUtils.LargeNumber;
      this.c$t.DeepCopy(e.Entity.GetComponent(1).ActorLocationProxy)
    } else {
      e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
      if (!e) return MathUtils_1.MathUtils.LargeNumber;
      this.c$t.DeepCopy(e)
    }
    if (!this.c$t) return MathUtils_1.MathUtils.LargeNumber;
    let t = MathUtils_1.MathUtils.LargeNumber;
    switch (this.m$t) {
      case "Sphere":
        this.l$t && (t = Vector_1.Vector.Distance(this.c$t, this.l$t) - this._$t);
        break;
      case "Box":
        this.C$t?.InverseTransformPosition(this.c$t, this.g$t), t = Math.max(Math.abs(this.g$t.X) - this.d$t.X, Math.abs(this.g$t.Y) - this.d$t.Y, Math.abs(this.g$t.Z) - this.d$t.Z, 0);
        break;
      case "Cylinder":
        var i, r;
        this.f$t && (i = Vector_1.Vector.Dist2D(this.c$t, this.f$t), i = Math.max(0, i - this.p$t), r = Math.max(0, Math.abs(this.c$t.Z - this.f$t.Z) - this.v$t / 2), t = Math.sqrt(i * i + r * r))
    }
    return t
  }
  uCu() {
    var e;
    return this.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest || !(e = ModelManager_1.ModelManager.QuestNewModel).IsInFocusMode() || !(!e.IsInFocusOnQuest(this.Blackboard.TreeConfigId) && !ModelManager_1.ModelManager.LevelLoadingModel.CheckLoadingPerformsEmpty() && ModelManager_1.ModelManager.InputDistributeModel.IsAllowFightMoveInput() && ControllerHolder_1.ControllerHolder.InputController.IsAllMoveEnable())
  }
  GetTargetPosition() {
    return this.l$t
  }
}
exports.ReachAreaBehaviorNode = ReachAreaBehaviorNode;
//# sourceMappingURL=ReachAreaBehaviorNode.js.map