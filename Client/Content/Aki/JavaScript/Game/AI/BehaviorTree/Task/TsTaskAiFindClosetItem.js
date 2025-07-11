"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const AiInteractionItemQueryManager_1 = require("../../../NewWorld/SceneItem/AiInteraction/AiInteractionItemQueryManager");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskAiFindClosetItem extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.Range = 0;
    this.ItemBlackboardKey = "";
    this.ItemDistanceBlackboardKey = "";
    this.ItemLocationBlackboardKey = "";
    this.SearchFilterIsMarkByAi = false;
    this.Tag = undefined;
    this.UseNavigation = false;
    this.IsInitTsVariables = false;
    this.TsRange = 0;
    this.TsItemBlackboardKey = "";
    this.TsItemDistanceBlackboardKey = "";
    this.TsItemLocationBlackboardKey = "";
    this.TsSearchFilterIsMarkByAi = false;
    this.TsFilter = undefined;
    this.TsUseNavigation = false;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsRange = 0;
    this.TsItemBlackboardKey = "";
    this.TsItemDistanceBlackboardKey = "";
    this.TsItemLocationBlackboardKey = "";
    this.TsSearchFilterIsMarkByAi = false;
    this.TsFilter = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsRange = this.Range;
      this.TsItemBlackboardKey = this.ItemBlackboardKey;
      this.TsItemDistanceBlackboardKey = this.ItemDistanceBlackboardKey;
      this.TsItemLocationBlackboardKey = this.ItemLocationBlackboardKey;
      this.TsSearchFilterIsMarkByAi = this.SearchFilterIsMarkByAi;
      this.TsFilter = new AiInteractionItemQueryManager_1.AiInteractionSearchFilter();
      if (this.Tag?.Num() === 0) {
        this.TsFilter.Tag = undefined;
      } else {
        for (let t = 0; t < this.Tag.Num(); ++t) {
          this.TsFilter.Tag = new Array();
          this.TsFilter.Tag.push(this.Tag.Get(t));
        }
      }
      this.TsUseNavigation = this.UseNavigation;
    }
  }
  ReceiveExecuteAI(t, i) {
    var e;
    var s = t.AiController;
    if (s) {
      this.InitTsVariables();
      s = s.CharActorComp;
      i = i.D_K2_GetActorLocation();
      this.TsFilter.IsSearchedMarkByAi = this.TsSearchFilterIsMarkByAi;
      this.TsFilter.Entity = s.Entity;
      if (!(i = AiInteractionItemQueryManager_1.AiInteractionItemQueryManager.Get().GetCloseActor(i, this.TsUseNavigation ? 1 : 0, this.TsFilter, t)) || i.Length > this.TsRange) {
        this.FinishExecute(false);
      } else {
        ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(s.Entity.Id, this.TsItemBlackboardKey, i.Entity.Id);
        ControllerHolder_1.ControllerHolder.BlackboardController.SetFloatValueByEntity(s.Entity.Id, this.TsItemDistanceBlackboardKey, i.Length);
        if (e = i.Entity.GetComponent(0)) {
          if (e.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
            e = i.Entity.GetComponent(202).ActorLocation;
            ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(s.Entity.Id, this.TsItemLocationBlackboardKey, e.X, e.Y, e.Z);
          }
          this.FinishExecute(true);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
    }
  }
}
exports.default = TsTaskAiFindClosetItem;
//# sourceMappingURL=TsTaskAiFindClosetItem.js.map