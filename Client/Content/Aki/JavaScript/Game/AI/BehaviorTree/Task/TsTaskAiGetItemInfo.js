"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskAiGetItemInfo extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.ItemBlackboardKey = "";
    this.ItemDistanceBlackboardKey = "";
    this.ItemLocationBlackboardKey = "";
    this.UseNavigation = false;
    this.VectorArray = undefined;
    this.IsInitTsVariables = false;
    this.TsItemBlackboardKey = "";
    this.TsItemDistanceBlackboardKey = "";
    this.TsItemLocationBlackboardKey = "";
    this.TsUseNavigation = false;
  }
  Constructor() {
    super.Constructor();
    this.VectorArray = undefined;
    this.IsInitTsVariables = false;
    this.TsItemBlackboardKey = "";
    this.TsItemDistanceBlackboardKey = "";
    this.TsItemLocationBlackboardKey = "";
    this.TsUseNavigation = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsItemBlackboardKey = this.ItemBlackboardKey;
      this.TsItemDistanceBlackboardKey = this.ItemDistanceBlackboardKey;
      this.TsItemLocationBlackboardKey = this.ItemLocationBlackboardKey;
      this.TsUseNavigation = this.UseNavigation;
    }
  }
  ReceiveExecuteAI(e, r) {
    var i = e.AiController;
    if (i) {
      this.InitTsVariables();
      var i = i.CharActorComp;
      var s = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(i.Entity.Id, this.TsItemBlackboardKey);
      var s = EntitySystem_1.EntitySystem.Get(s);
      var o = s.GetComponent(0);
      if (o) {
        if (s === undefined || o.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
          this.FinishExecute(false);
        } else {
          o = s.GetComponent(202).ActorLocation;
          if (this.VectorArray === undefined) {
            this.VectorArray = new Array();
          }
          s = r.D_K2_GetActorLocation();
          let t = 0;
          t = this.TsUseNavigation ? (AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(e, s, o, this.VectorArray), AiContollerLibrary_1.AiControllerLibrary.GetPathLength(s, this.VectorArray)) : (r = Vector_1.Vector.Create(o), s = Vector_1.Vector.Create(s), r.SubtractionEqual(s).Size());
          ControllerHolder_1.ControllerHolder.BlackboardController.SetFloatValueByEntity(i.Entity.Id, this.TsItemDistanceBlackboardKey, t);
          ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(i.Entity.Id, this.TsItemLocationBlackboardKey, o.X, o.Y, o.Z);
          this.FinishExecute(true);
        }
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskAiGetItemInfo;
//# sourceMappingURL=TsTaskAiGetItemInfo.js.map