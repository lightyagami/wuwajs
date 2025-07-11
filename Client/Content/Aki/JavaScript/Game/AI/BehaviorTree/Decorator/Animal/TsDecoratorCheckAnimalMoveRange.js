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
  PerformConditionCheckAI(e, r) {
    var o;
    var t = e.AiController;
    if (t) {
      if (!this.IsInitTsVariables) {
        this.IsInitTsVariables = true;
        o = t.CharActorComp.Entity;
        this.InitRangeInfo(o);
      }
      return !this.RangeInfo || this.RangeInfo.IsInRange(t.CharActorComp.ActorLocationProxy);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 29, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      return false;
    }
  }
  InitRangeInfo(e) {
    e = e.GetComponent(0)?.GetPbEntityInitData();
    if (e) {
      e = (0, IComponent_1.getComponent)(e.ComponentsData, "AnimalComponent");
      if (e && e.MoveRange) {
        e = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e.MoveRange);
        if (e) {
          var r = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(e.BlueprintType);
          var e = (0, IEntity_1.decompressEntityData)(e, r);
          var o = (0, IComponent_1.getComponent)(e.ComponentsData, "RangeComponent");
          var t = e.Transform;
          switch (o.Shape.Type) {
            case "Box":
              this.RangeInfo = new AiContollerLibrary_1.BoxRangeEntityInfo(o.Shape, t);
              break;
            case "Sphere":
              this.RangeInfo = new AiContollerLibrary_1.SphereRangeEntityInfo(o.Shape, t);
          }
        }
      }
    }
  }
}
exports.default = TsDecoratorCheckAnimalMoveRange;
//# sourceMappingURL=TsDecoratorCheckAnimalMoveRange.js.map