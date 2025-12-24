"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiTaskSitDown = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelAiTask_1 = require("../LevelAiTask");
const LevelAiTaskMoveTo_1 = require("./LevelAiTaskMoveTo");
const LevelAiTaskSetItemCollision_1 = require("./LevelAiTaskSetItemCollision");
const LevelAiTaskSuccess_1 = require("./LevelAiTaskSuccess");
const LevelAiTaskTurnAndPlayMontage_1 = require("./LevelAiTaskTurnAndPlayMontage");
const NEARBY_CHAIR_OFFSET = 100;
const MOVE_TO_NEARBY_CHAIR_SPEED = 100;
const MOVE_TO_CHAIR_SPEED = 70;
class LevelAiTaskSitDown extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments);
    this.CanRecordPlanProgress = false;
    this.Cost = 0;
    this.gU = false;
    this.jTe = undefined;
  }
  MakePlanExpansions(e, i) {
    this.PrintDescription("Sit Down Task Make Plan Expansions", ["LevelIndex", e.CurrentLevelIndex], ["StepIndex", e.CurrentStepIndex]);
    if (!this.gU) {
      this.Init();
    }
    this.CreatePlanSteps(e, i.MakeCopy());
  }
  Init() {
    if (!this.gU) {
      var e = this.Params;
      if (e) {
        switch (e.Option.Type) {
          case IAction_1.ENpcLeisureInteract.SitDown:
            this.I0m(e.Option);
            break;
          case IAction_1.ENpcLeisureInteract.Swing:
            this.T0m(e.Option);
            break;
          case IAction_1.ENpcLeisureInteract.SwingGetUp:
            this.b0m(e.Option);
        }
      }
    }
  }
  T0m(e) {
    ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.TargetNpcId)?.Entity?.GetComponent(325)?.StartSwing(e.SwingDa, e.EntityId, e.SkipSitDown);
  }
  b0m(e) {
    ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.TargetNpcId)?.Entity?.GetComponent(325)?.ExitLoopSwing();
  }
  I0m(e) {
    var i = e.PosEntityId;
    this.jTe = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i);
    if (this.jTe) {
      var t = this.jTe.Entity.GetComponent(207);
      if (t) {
        var t = t.GetSubEntityInteractLogicController();
        var s = this.CreatureDataComponent.Entity.GetComponent(1);
        var o = this.CreatureDataComponent.GetPbDataId();
        var a = new LevelAiTaskSuccess_1.LevelAiTaskSuccess();
        a.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description);
        t.Possess(this.CreatureDataComponent.Entity);
        var n = t.GetSitLocation();
        var r = t.GetForwardDirection();
        var _ = Vector_1.Vector.Create();
        var h = Vector_1.Vector.Create();
        r.Multiply(NEARBY_CHAIR_OFFSET, _);
        n.Addition(_, h);
        var _ = new LevelAiTaskMoveTo_1.LevelAiTaskMoveTo();
        _.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " Move To Nearby Chair Location: " + h.ToString());
        _.Target = Vector_1.Vector.Create();
        _.Target.DeepCopy(h);
        _.MoveState = 1;
        _.MoveSpeed = MOVE_TO_NEARBY_CHAIR_SPEED;
        a.NextNodes.push(_);
        var l = new LevelAiTaskSetItemCollision_1.LevelAiTaskSetItemCollision();
        l.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " Ignore Actor Collision");
        l.ItemEntity = this.jTe;
        l.IsIgnore = true;
        _.NextNodes.push(l);
        var _ = s.ActorLocationProxy;
        var s = Vector_1.Vector.Create(n.X, n.Y, _.Z);
        var n = new LevelAiTaskMoveTo_1.LevelAiTaskMoveTo();
        n.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " Move To Interact Location: " + s.ToString());
        n.Target = Vector_1.Vector.Create();
        n.Target.DeepCopy(s);
        n.MoveState = 1;
        n.MoveSpeed = MOVE_TO_CHAIR_SPEED;
        l.NextNodes.push(n);
        var _ = Vector_1.Vector.Create();
        var s = Vector_1.Vector.Create();
        r.Multiply(200, s);
        h.Addition(s, _);
        var l = {
          EntityId: o,
          Pos: _,
          MontageId: e.MontageId.MontageId,
          IsAbpMontage: e.MontageId.IsAbp,
          LoopDuration: e.Duration
        };
        var r = new LevelAiTaskTurnAndPlayMontage_1.LevelAiTaskTurnAndPlayMontage();
        r.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " Turn To Chair And Play Sit Down Montage", l);
        n.NextNodes.push(r);
        t.UnPossess(this.CreatureDataComponent.Entity);
        var s = new LevelAiTaskMoveTo_1.LevelAiTaskMoveTo();
        s.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " Move Back To Nearby Chair Location: " + h.ToString());
        s.Target = Vector_1.Vector.Create();
        s.Target.DeepCopy(h);
        s.MoveState = 1;
        s.MoveSpeed = MOVE_TO_CHAIR_SPEED;
        r.NextNodes.push(s);
        var A = new LevelAiTaskSetItemCollision_1.LevelAiTaskSetItemCollision();
        A.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " Reset Actor Collision");
        A.ItemEntity = this.jTe;
        A.IsIgnore = false;
        s.NextNodes.push(A);
        if (this.NextNodes.length) {
          for (const v of this.NextNodes) {
            A.NextNodes.push(v);
          }
          this.NextNodes.length = 0;
        }
        this.NextNodes.push(a);
        this.gU = true;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelAi", 50, `[LevelAiTaskSitDown] Item Entity ${i} has no PawnInteractNewComponent`);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelAi", 50, "[LevelAiTaskSitDown] Cannot Find Corresponding Item Entity for: " + i);
    }
  }
}
exports.LevelAiTaskSitDown = LevelAiTaskSitDown;
//# sourceMappingURL=LevelAiTaskSitDown.js.map