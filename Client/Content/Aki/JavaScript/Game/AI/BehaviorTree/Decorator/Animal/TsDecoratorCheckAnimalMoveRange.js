"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const IEntity_1 = require("../../../../../UniverseEditor/Interface/IEntity");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const AiContollerLibrary_1 = require("../../../Controller/AiContollerLibrary");
class TsDecoratorCheckAnimalMoveRange extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.RangeInfo = undefined;
    this.IsInitTsVariables = false;
  }
  Constructor() {
    this.RangeInfo = undefined;
    this.IsInitTsVariables = false;
  }
  PerformConditionCheckAI(e, o) {
    var r;
    var n = e.AiController;
    if (n) {
      if (!this.IsInitTsVariables) {
        this.IsInitTsVariables = true;
        r = n.CharActorComp.Entity;
        this.InitRangeInfo(r);
      }
      return !this.RangeInfo || this.RangeInfo.IsInRange(n.CharActorComp.ActorLocationProxy);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 29, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      return false;
    }
  }
  InitRangeInfo(e) {
    var e = e.GetComponent(0);
    var o = e?.GetPbEntityInitData();
    if (o && e) {
      var r = (0, IComponent_1.getComponent)(o.ComponentsData, "AnimalComponent");
      if (r) {
        if (r.UseRangeComponentAsMoveRange) {
          const n = (0, IComponent_1.getComponent)(o.ComponentsData, "RangeComponent");
          const t = {
            Pos: e.GetInitLocation()
          };
          this.SetRangeInfo(n?.Shape, t);
        } else if (r.MoveRange) {
          o = ModelManager_1.ModelManager.CreatureModel.GetEntityData(r.MoveRange);
          if (o) {
            e = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(o.BlueprintType);
            r = (0, IEntity_1.decompressEntityData)(o, e);
            const n = (0, IComponent_1.getComponent)(r.ComponentsData, "RangeComponent");
            const t = r.Transform;
            this.SetRangeInfo(n.Shape, t);
          }
        }
      }
    }
  }
  SetRangeInfo(e, o) {
    if (e && o) {
      switch (e.Type) {
        case "Box":
          this.RangeInfo = new AiContollerLibrary_1.BoxRangeEntityInfo(e, o);
          break;
        case "Sphere":
          this.RangeInfo = new AiContollerLibrary_1.SphereRangeEntityInfo(e, o);
      }
    }
  }
}
exports.default = TsDecoratorCheckAnimalMoveRange;
//# sourceMappingURL=TsDecoratorCheckAnimalMoveRange.js.map