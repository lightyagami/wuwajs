"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const TsAiController_1 = require("../../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
class TsTaskFindNearestInteractiveTarget extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.SearchRange = 0;
    this.SaveTargetBlackboardKey = "";
    this.NowLocation = undefined;
    this.TmpHandles = undefined;
    this.IsInitTsVariables = false;
    this.TsSearchRange = 0;
    this.TsSaveTargetBlackboardKey = "";
  }
  Constructor() {
    super.Constructor();
    this.NowLocation = undefined;
    this.TmpHandles = undefined;
    this.IsInitTsVariables = false;
    this.TsSearchRange = 0;
    this.TsSaveTargetBlackboardKey = "";
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsSearchRange = this.SearchRange;
      this.TsSaveTargetBlackboardKey = this.SaveTargetBlackboardKey;
    }
  }
  ReceiveExecuteAI(t, e) {
    var r;
    this.InitTsVariables();
    if (t instanceof TsAiController_1.default && (this.TmpHandles ||= [], t = t.AiController.CharActorComp, this.NowLocation = t.ActorLocationProxy, r = t.Entity.Id, t = this.GetNearestInteractiveEntity(t, this.TsSearchRange))) {
      ControllerHolder_1.ControllerHolder.BlackboardController.SetEntityIdByEntity(r, this.TsSaveTargetBlackboardKey, t);
      this.FinishExecute(true);
    } else {
      this.FinishExecute(false);
    }
  }
  GetNearestInteractiveEntity(e, t) {
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(this.NowLocation, this.TsSearchRange, 255, this.TmpHandles);
    let r = Number.MAX_VALUE;
    let s = undefined;
    for (const o of this.TmpHandles) {
      if (o.Entity?.Active && o.Entity !== e.Entity) {
        var i = o.Entity.GetComponent(1);
        let t = false;
        switch (i.CreatureData.GetEntityType()) {
          case Protocol_1.Aki.Protocol.kks.Proto_Npc:
          case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
            t = true;
            break;
          default:
            t = false;
        }
        if (t && i.Entity.GetComponent(111)?.IsInit && (i = Vector_1.Vector.Dist(e.ActorLocationProxy, i.ActorLocationProxy)) < r) {
          r = i;
          s = o.Id;
        }
      }
    }
    return s;
  }
}
exports.default = TsTaskFindNearestInteractiveTarget;
//# sourceMappingURL=TsTaskFindNearestInteractiveTarget.js.map