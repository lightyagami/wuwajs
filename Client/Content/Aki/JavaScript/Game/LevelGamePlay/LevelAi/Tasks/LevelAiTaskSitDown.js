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
      if (e && e.Option.Type === IAction_1.ENpcLeisureInteract.SitDown) {
        var i = e.Option.PosEntityId;
        this.jTe = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i);
        if (this.jTe) {
          var t = this.jTe.Entity.GetComponent(198);
          if (t) {
            var t = t.GetSubEntityInteractLogicController();
            var s = this.CreatureDataComponent.Entity.GetComponent(1);
            var o = this.CreatureDataComponent.GetPbDataId();
            var n = new LevelAiTaskSuccess_1.LevelAiTaskSuccess();
            n.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description);
            t.Possess(this.CreatureDataComponent.Entity);
            var a = t.GetSitLocation();
            var r = t.GetForwardDirection();
            var _ = Vector_1.Vector.Create();
            var l = Vector_1.Vector.Create();
            r.Multiply(NEARBY_CHAIR_OFFSET, _);
            a.Addition(_, l);
            var _ = new LevelAiTaskMoveTo_1.LevelAiTaskMoveTo();
            _.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " Move To Nearby Chair Location: " + l.ToString());
            _.Target = Vector_1.Vector.Create();
            _.Target.DeepCopy(l);
            _.MoveState = 1;
            _.MoveSpeed = MOVE_TO_NEARBY_CHAIR_SPEED;
            n.NextNodes.push(_);
            var h = new LevelAiTaskSetItemCollision_1.LevelAiTaskSetItemCollision();
            h.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " Ignore Actor Collision");
            h.ItemEntity = this.jTe;
            h.IsIgnore = true;
            _.NextNodes.push(h);
            var _ = s.ActorLocationProxy;
            var s = Vector_1.Vector.Create(a.X, a.Y, _.Z);
            var a = new LevelAiTaskMoveTo_1.LevelAiTaskMoveTo();
            a.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " Move To Interact Location: " + s.ToString());
            a.Target = Vector_1.Vector.Create();
            a.Target.DeepCopy(s);
            a.MoveState = 1;
            a.MoveSpeed = MOVE_TO_CHAIR_SPEED;
            h.NextNodes.push(a);
            var _ = Vector_1.Vector.Create();
            var s = Vector_1.Vector.Create();
            r.Multiply(200, s);
            l.Addition(s, _);
            var h = {
              EntityId: o,
              Pos: _,
              MontageId: e.Option.MontageId.MontageId,
              IsAbpMontage: e.Option.MontageId.IsAbp,
              LoopDuration: e.Option.Duration
            };
            var r = new LevelAiTaskTurnAndPlayMontage_1.LevelAiTaskTurnAndPlayMontage();
            r.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " Turn To Chair And Play Sit Down Montage", h);
            a.NextNodes.push(r);
            t.UnPossess(this.CreatureDataComponent.Entity);
            var s = new LevelAiTaskMoveTo_1.LevelAiTaskMoveTo();
            s.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " Move Back To Nearby Chair Location: " + l.ToString());
            s.Target = Vector_1.Vector.Create();
            s.Target.DeepCopy(l);
            s.MoveState = 1;
            s.MoveSpeed = MOVE_TO_CHAIR_SPEED;
            r.NextNodes.push(s);
            var A = new LevelAiTaskSetItemCollision_1.LevelAiTaskSetItemCollision();
            A.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " Reset Actor Collision");
            A.ItemEntity = this.jTe;
            A.IsIgnore = false;
            s.NextNodes.push(A);
            if (this.NextNodes.length) {
              for (const T of this.NextNodes) {
                A.NextNodes.push(T);
              }
              this.NextNodes.length = 0;
            }
            this.NextNodes.push(n);
            this.gU = true;
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelAi", 50, `[LevelAiTaskSitDown] Item Entity ${i} has no PawnInteractNewComponent`);
          }
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelAi", 50, "[LevelAiTaskSitDown] Cannot Find Corresponding Item Entity for: " + i);
        }
      }
    }
  }
}
exports.LevelAiTaskSitDown = LevelAiTaskSitDown;
//# sourceMappingURL=LevelAiTaskSitDown.js.map