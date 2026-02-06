"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReachAreaBehaviorNode = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SceneTeamController_1 = require("../../../SceneTeam/SceneTeamController");
const GeneralLogicTreeUtil_1 = require("../../GeneralLogicTreeUtil");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
const MIN_INTERVAL = 20;
const MAX_INTERVAL = 500;
const MIN_FACTOR = 200;
const MAX_FACTOR = 1000;
class ReachAreaBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.l$t = undefined;
    this._$t = -0;
    this.wDe = 0;
    this.c$t = Vector_1.Vector.Create();
    this.m$t = "Box";
    this.a$t = [];
    this.EffectPathKey = undefined;
    this.ConditionGrop = undefined;
    this.wY = 0;
    this.d$t = undefined;
    this.C$t = undefined;
    this.g$t = Vector_1.Vector.Create();
    this.pFu = undefined;
    this.f$t = undefined;
    this.p$t = 0;
    this.v$t = 0;
    this.OJa = false;
    this.vFu = undefined;
    this.IRe = undefined;
    this.OnTick = () => {
      this.IRe = undefined;
      var e = this.DoTaskAndGetNewInterval();
      this.IRe = TimerSystem_1.GameplayTimerSystem.Delay(this.OnTick, e);
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
    this.wDe = e.EntityId;
    this.a$t = e.MatchRoleOption;
    this.ConditionGrop = e.PreConditions;
    this.EffectPathKey = e.EffectPath;
    var t = e.RangeEntityId ? ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e.RangeEntityId) : undefined;
    var i = e.RangeEntities;
    this.OJa = i !== undefined && i.length > 0;
    if (this.OJa) {
      this.vFu = [];
      for (const l of i) {
        this.vFu.push(l);
      }
    }
    if (t) {
      this._$t = e.Range;
      var r = (0, IComponent_1.getComponent)(t.ComponentsData, "RangeComponent");
      this.m$t = r.Shape.Type;
      var s = t.Transform.Pos;
      switch (r.Shape.Type) {
        case "Sphere":
          var h = r.Shape.Center;
          this.l$t = Vector_1.Vector.Create(s.X + (h?.X ?? 0), s.Y + (h?.Y ?? 0), s.Z + (h?.Z ?? 0));
          this._$t = r.Shape.Radius;
          break;
        case "Box":
          var h = t.Transform.Rot;
          var o = r.Shape.Center;
          var a = r.Shape.Size;
          var n = r.Shape.Rotator;
          var h = Rotator_1.Rotator.Create(h?.Y ?? 0 + (n?.Y ?? 0), h?.Z ?? 0 + (n?.Z ?? 0), h?.X ?? 0 + (n?.X ?? 0)).Quaternion();
          var n = Vector_1.Vector.Create(s.X + (o?.X ?? 0), s.Y + (o?.Y ?? 0), s.Z + (o?.Z ?? 0));
          var o = Transform_1.Transform.Create(h, n, Vector_1.Vector.OneVector);
          this.l$t = n;
          this.d$t = Vector_1.Vector.Create(a.X ?? 0, a.Y ?? 0, a.Z ?? 0);
          this.C$t = o;
          break;
        case "Cylinder":
          h = r.Shape.Center;
          this.f$t = Vector_1.Vector.Create(s.X ?? 0 + (h?.X ?? 0), s.Y + (h?.Y ?? 0), s.Z + (h?.Z ?? 0));
          this.p$t = r.Shape.Radius;
          this.v$t = r.Shape.Height;
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
    this.IRe = TimerSystem_1.GameplayTimerSystem.Delay(this.OnTick, MIN_INTERVAL);
    if (ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel(GeneralLogicTreeUtil_1.GENERAL_LOGIC_TREE_DEBUG_KEY) > 0 && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("GeneralLogicTree", 72, "ReachAreaBehaviorNode.OnStart", ["PbDataId", this.wDe], ["NodeId", this.NodeId]);
    }
  }
  OnEnd(e) {
    if (this.IRe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
      this.IRe = undefined;
    }
  }
  DoTaskAndGetNewInterval() {
    var e;
    this.wY++;
    if (this.Blackboard?.DungeonId !== ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id || ModelManager_1.ModelManager.TeleportModel.IsTeleport || this.Submitting || !this.Blackboard.IsTracking && this.wY % 2 != 0 || ModelManager_1.ModelManager.SceneTeamModel.IsAllDid() || this.OJa) {
      return MAX_INTERVAL;
    } else {
      e = this.M$t();
      if (ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel(GeneralLogicTreeUtil_1.GENERAL_LOGIC_TREE_DEBUG_KEY) > 0 && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("GeneralLogicTree", 72, "ReachAreaBehaviorNode.CheckReached", ["DistAndSpeedFactor", e], ["PbDataId", this.wDe], ["NodeId", this.NodeId]);
      }
      if (e > 1) {
        return MathUtils_1.MathUtils.RangeClamp(e, MIN_FACTOR, MAX_FACTOR, MIN_INTERVAL, MAX_INTERVAL);
      } else {
        this.SubmitNode();
        return MIN_INTERVAL;
      }
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
    if (this.ConditionGrop && !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(this.ConditionGrop, undefined, this.Context)) {
      return MathUtils_1.MathUtils.LargeNumber;
    }
    var e = this.wDe ? ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.wDe) : ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    var t = e?.Entity?.CheckGetComponent(1);
    if (!t?.Owner) {
      return MathUtils_1.MathUtils.LargeNumber;
    }
    this.c$t.DeepCopy(t.ActorLocationProxy);
    if (!this.c$t) {
      return MathUtils_1.MathUtils.LargeNumber;
    }
    var i;
    var r;
    var t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetEntitySpeed(e);
    let s = MathUtils_1.MathUtils.LargeNumber;
    switch (this.m$t) {
      case "Sphere":
        if (this.l$t) {
          s = Vector_1.Vector.Distance(this.c$t, this.l$t) - this._$t;
        }
        break;
      case "Box":
        this.C$t?.InverseTransformPosition(this.c$t, this.g$t);
        s = Math.max(Math.abs(this.g$t.X) - this.d$t.X, Math.abs(this.g$t.Y) - this.d$t.Y, Math.abs(this.g$t.Z) - this.d$t.Z, 0);
        break;
      case "Cylinder":
        if (this.f$t) {
          i = Vector_1.Vector.Dist2D(this.c$t, this.f$t);
          i = Math.max(0, i - this.p$t);
          r = Math.max(0, Math.abs(this.c$t.Z - this.f$t.Z) - this.v$t / 2);
          s = Math.sqrt(i * i + r * r);
        }
    }
    return Math.min(s, t > 0 ? s / t * MIN_FACTOR : MathUtils_1.MathUtils.LargeNumber);
  }
  CheckCanSubmitAboutFocusMode() {
    return this.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest || !ModelManager_1.ModelManager.QuestNewModel.CheckNeedBanQuestPushByFocusMode(this.Blackboard.TreeConfigId) || !!ModelManager_1.ModelManager.LevelLoadingModel.CheckLoadingPerformExist(3) || !ControllerHolder_1.ControllerHolder.InputController.IsAllMoveEnable();
  }
  GetTargetPosition() {
    return this.l$t;
  }
  GetRangePbDataIds() {
    var e = [];
    if (this.vFu) {
      for (const t of this.vFu) {
        e.push(t);
      }
    }
    return e;
  }
  DrawRange(e, t, i) {
    switch (this.m$t) {
      case "Sphere":
        if (this.l$t) {
          UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, this.l$t.ToUeVector(), this._$t, i, e, t);
        }
        break;
      case "Box":
        if (this.C$t && this.d$t) {
          UE.KismetSystemLibrary.D_DrawDebugBox(GlobalData_1.GlobalData.World, this.C$t.GetLocation().ToUeVector(), this.d$t.ToUeVector(), e, this.C$t.GetRotation().Rotator().ToUeRotator(), t);
        }
        break;
      case "Cylinder":
        var r;
        if (this.f$t) {
          this.pFu ||= Vector_1.Vector.Create();
          r = this.v$t / 2;
          this.g$t.DeepCopy(this.f$t);
          this.pFu.DeepCopy(this.f$t);
          this.g$t.Z += r;
          this.pFu.Z -= r;
          UE.KismetSystemLibrary.D_DrawDebugCylinder(GlobalData_1.GlobalData.World, this.g$t.ToUeVector(), this.pFu.ToUeVector(), this.p$t, i, e, t);
        }
    }
  }
}
exports.ReachAreaBehaviorNode = ReachAreaBehaviorNode;
//# sourceMappingURL=ReachAreaBehaviorNode.js.map