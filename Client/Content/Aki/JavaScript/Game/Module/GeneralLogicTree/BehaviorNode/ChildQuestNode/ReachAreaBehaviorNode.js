"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReachAreaBehaviorNode = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SceneTeamController_1 = require("../../../SceneTeam/SceneTeamController");
const GeneralLogicTreeUtil_1 = require("../../GeneralLogicTreeUtil");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
const MIN_INTERVAL = 20;
const MAX_INTERVAL = 500;
const MIN_DIST = 200;
const MAX_DIST = 1000;
class ReachAreaBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.l$t = undefined;
    this._$t = -0;
    this.E0 = 0;
    this.c$t = Vector_1.Vector.Create();
    this.m$t = "Box";
    this.a$t = [];
    this.EffectPathKey = undefined;
    this.ConditionGrop = undefined;
    this.wY = 0;
    this.d$t = undefined;
    this.C$t = undefined;
    this.g$t = Vector_1.Vector.Create();
    this.f$t = undefined;
    this.p$t = 0;
    this.v$t = 0;
    this.OJa = false;
    this.IRe = undefined;
    this.OnTick = () => {
      this.IRe = undefined;
      var e = this.DoTaskAndGetNewInterval();
      this.IRe = TimerSystem_1.TimerSystem.Delay(this.OnTick, e);
    };
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    if (!super.OnCreate(e)) {
      return false;
    }
    e = e.Condition;
    if (e.Type !== IQuest_1.EChildQuest.ReachArea) {
      return false;
    }
    this.E0 = e.EntityId;
    this.a$t = e.MatchRoleOption;
    this.ConditionGrop = e.PreConditions;
    this.EffectPathKey = e.EffectPath;
    var t = e.RangeEntityId ? ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e.RangeEntityId) : undefined;
    this.OJa = e.RangeEntities !== undefined && e.RangeEntities?.length > 0;
    if (t) {
      this._$t = e.Range;
      var i = (0, IComponent_1.getComponent)(t.ComponentsData, "RangeComponent");
      this.m$t = i.Shape.Type;
      var r = t.Transform.Pos;
      switch (i.Shape.Type) {
        case "Sphere":
          var s = i.Shape.Center;
          this.l$t = Vector_1.Vector.Create(r.X + (s?.X ?? 0), r.Y + (s?.Y ?? 0), r.Z + (s?.Z ?? 0));
          this._$t = i.Shape.Radius;
          break;
        case "Box":
          var s = t.Transform.Rot;
          var h = i.Shape.Center;
          var o = i.Shape.Size;
          var a = i.Shape.Rotator;
          var s = Rotator_1.Rotator.Create(s?.Y ?? 0 + (a?.Y ?? 0), s?.Z ?? 0 + (a?.Z ?? 0), s?.X ?? 0 + (a?.X ?? 0)).Quaternion();
          var a = Vector_1.Vector.Create(r.X + (h?.X ?? 0), r.Y + (h?.Y ?? 0), r.Z + (h?.Z ?? 0));
          var h = Transform_1.Transform.Create(s, a, Vector_1.Vector.OneVector);
          this.l$t = a;
          this.d$t = Vector_1.Vector.Create(o.X ?? 0, o.Y ?? 0, o.Z ?? 0);
          this.C$t = h;
          break;
        case "Cylinder":
          s = i.Shape.Center;
          this.f$t = Vector_1.Vector.Create(r.X ?? 0 + (s?.X ?? 0), r.Y + (s?.Y ?? 0), r.Z + (s?.Z ?? 0));
          this.p$t = i.Shape.Radius;
          this.v$t = i.Shape.Height;
      }
    } else {
      this.l$t = Vector_1.Vector.Create(e.Pos.X, e.Pos.Y, e.Pos.Z);
      this._$t = e.Range;
      this.m$t = "Sphere";
    }
    return true;
  }
  OnDestroy() {
    super.OnDestroy();
  }
  OnStart(e) {
    super.OnStart(e);
    this.IRe = TimerSystem_1.TimerSystem.Delay(this.OnTick, MAX_INTERVAL);
  }
  OnEnd(e) {
    if (this.IRe) {
      TimerSystem_1.TimerSystem.Remove(this.IRe);
      this.IRe = undefined;
    }
  }
  DoTaskAndGetNewInterval() {
    var e;
    this.wY++;
    if (this.Blackboard?.DungeonId !== ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id || ModelManager_1.ModelManager.TeleportModel.IsTeleport || this.Submitting || !this.Blackboard.IsTracking && this.wY % 2 != 0 || ModelManager_1.ModelManager.SceneTeamModel.IsAllDid() || this.OJa) {
      return MAX_INTERVAL;
    } else if ((e = this.M$t()) > 1) {
      return MathUtils_1.MathUtils.RangeClamp(e, MIN_DIST, MAX_DIST, MIN_INTERVAL, MAX_INTERVAL);
    } else {
      this.SubmitNode();
      return MIN_INTERVAL;
    }
  }
  M$t() {
    if (this.a$t && this.a$t.length > 0) {
      if (!SceneTeamController_1.SceneTeamController.IsMatchRoleOption(this.a$t)) {
        return MathUtils_1.MathUtils.LargeNumber;
      }
    } else if (ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam) {
      return MathUtils_1.MathUtils.LargeNumber;
    }
    if (this.ConditionGrop && !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(this.ConditionGrop, undefined)) {
      return MathUtils_1.MathUtils.LargeNumber;
    }
    if (this.E0) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.E0);
      if (!e) {
        return MathUtils_1.MathUtils.LargeNumber;
      }
      this.c$t.DeepCopy(e.Entity.GetComponent(1).ActorLocationProxy);
    } else {
      e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
      if (!e) {
        return MathUtils_1.MathUtils.LargeNumber;
      }
      this.c$t.DeepCopy(e);
    }
    if (!this.c$t) {
      return MathUtils_1.MathUtils.LargeNumber;
    }
    let t = MathUtils_1.MathUtils.LargeNumber;
    switch (this.m$t) {
      case "Sphere":
        if (this.l$t) {
          t = Vector_1.Vector.Distance(this.c$t, this.l$t) - this._$t;
        }
        break;
      case "Box":
        this.C$t?.InverseTransformPosition(this.c$t, this.g$t);
        t = Math.max(Math.abs(this.g$t.X) - this.d$t.X, Math.abs(this.g$t.Y) - this.d$t.Y, Math.abs(this.g$t.Z) - this.d$t.Z, 0);
        break;
      case "Cylinder":
        var i;
        var r;
        if (this.f$t) {
          i = Vector_1.Vector.Dist2D(this.c$t, this.f$t);
          i = Math.max(0, i - this.p$t);
          r = Math.max(0, Math.abs(this.c$t.Z - this.f$t.Z) - this.v$t / 2);
          t = Math.sqrt(i * i + r * r);
        }
    }
    return t;
  }
  CheckCanSubmitAboutFocusMode() {
    return this.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest || !ModelManager_1.ModelManager.QuestNewModel.CheckNeedBanQuestPushByFocusMode(this.Blackboard.TreeConfigId) || !!ModelManager_1.ModelManager.LevelLoadingModel.CheckLoadingPerformExist(3) || !ControllerHolder_1.ControllerHolder.InputController.IsAllMoveEnable();
  }
  GetTargetPosition() {
    return this.l$t;
  }
}
exports.ReachAreaBehaviorNode = ReachAreaBehaviorNode;
//# sourceMappingURL=ReachAreaBehaviorNode.js.map