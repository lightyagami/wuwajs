"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiTaskSitDown = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
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
        var i = e.Option.PosEntityId;
        this.jTe = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i);
        if (this.jTe) {
          var t = this.jTe.Entity.GetComponent(197);
          if (t) {
            var t = t.GetSubEntityInteractLogicController();
            var s = this.CreatureDataComponent.Entity.GetComponent(1);
            var o = this.CreatureDataComponent.GetPbDataId();
            var n = new LevelAiTaskSuccess_1.LevelAiTaskSuccess();
            n.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description);
            t.Possess(this.CreatureDataComponent.Entity);
            var a = t.GetSitLocation();
            var r = t.GetForwardDirection();
            var l = Vector_1.Vector.Create();
            var _ = Vector_1.Vector.Create();
            r.Multiply(NEARBY_CHAIR_OFFSET, l);
            a.Addition(l, _);
            var l = new LevelAiTaskMoveTo_1.LevelAiTaskMoveTo();
            l.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " Move To Nearby Chair Location: " + _.ToString());
            l.Target = Vector_1.Vector.Create();
            l.Target.DeepCopy(_);
            l.MoveState = 1;
            l.MoveSpeed = MOVE_TO_NEARBY_CHAIR_SPEED;
            n.NextNodes.push(l);
            var h = new LevelAiTaskSetItemCollision_1.LevelAiTaskSetItemCollision();
            h.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " Ignore Actor Collision");
            h.ItemEntity = this.jTe;
            h.IsIgnore = true;
            l.NextNodes.push(h);
            var l = s.ActorLocationProxy;
            var s = Vector_1.Vector.Create(a.X, a.Y, l.Z);
            var a = new LevelAiTaskMoveTo_1.LevelAiTaskMoveTo();
            a.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " Move To Interact Location: " + s.ToString());
            a.Target = Vector_1.Vector.Create();
            a.Target.DeepCopy(s);
            a.MoveState = 1;
            a.MoveSpeed = MOVE_TO_CHAIR_SPEED;
            h.NextNodes.push(a);
            var l = Vector_1.Vector.Create();
            var s = Vector_1.Vector.Create();
            r.Multiply(200, s);
            _.Addition(s, l);
            var h = {
              EntityId: o,
              Pos: l,
              MontageId: e.Option.MontageId.MontageId,
              IsAbpMontage: e.Option.MontageId.IsAbp,
              LoopDuration: e.Option.Duration
            };
            var r = new LevelAiTaskTurnAndPlayMontage_1.LevelAiTaskTurnAndPlayMontage();
            r.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " Turn To Chair And Play Sit Down Montage", h);
            a.NextNodes.push(r);
            t.UnPossess(this.CreatureDataComponent.Entity);
            var s = new LevelAiTaskMoveTo_1.LevelAiTaskMoveTo();
            s.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " Move Back To Nearby Chair Location: " + _.ToString());
            s.Target = Vector_1.Vector.Create();
            s.Target.DeepCopy(_);
            s.MoveState = 1;
            s.MoveSpeed = MOVE_TO_CHAIR_SPEED;
            r.NextNodes.push(s);
            var T = new LevelAiTaskSetItemCollision_1.LevelAiTaskSetItemCollision();
            T.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " Reset Actor Collision");
            T.ItemEntity = this.jTe;
            T.IsIgnore = false;
            s.NextNodes.push(T);
            if (this.NextNodes.length) {
              for (const A of this.NextNodes) {
                T.NextNodes.push(A);
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