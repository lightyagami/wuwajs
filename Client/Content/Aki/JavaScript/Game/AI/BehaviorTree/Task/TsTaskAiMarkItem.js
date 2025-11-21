"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskAiMarkItem extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.ItemBlackboardKey = "";
    this.SearchFilterIsMarkByAi = false;
    this.IsInitTsVariables = false;
    this.TsItemBlackboardKey = "";
    this.TsSearchFilterIsMarkByAi = false;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsItemBlackboardKey = "";
    this.TsSearchFilterIsMarkByAi = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsItemBlackboardKey = this.ItemBlackboardKey;
      this.TsSearchFilterIsMarkByAi = this.SearchFilterIsMarkByAi;
    }
  }
  ReceiveExecuteAI(t, e) {
    var s;
    var i;
    var r;
    var o = t.AiController;
    if (o) {
      this.InitTsVariables();
      s = (o = o.CharActorComp).Entity.GetComponent(81);
      i = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(o.Entity.Id, this.TsItemBlackboardKey);
      if (s.AiItemMarkId !== 0 && this.TsSearchFilterIsMarkByAi) {
        if (s.AiItemMarkId === i) {
          this.FinishExecute(true);
        } else {
          this.FinishExecute(false);
        }
      } else if (!(i = EntitySystem_1.EntitySystem.Get(i)) || !(r = i.GetComponent(148)) || r.IsSearchByOther(o.Entity.Id)) {
        this.FinishExecute(false);
      } else {
        if (this.TsSearchFilterIsMarkByAi) {
          s.AiItemMarkId = i.Id;
          r.SetSearched(o.Entity);
        } else {
          s.AiItemMarkId = 0;
          r.SetUnSearched();
        }
        this.FinishExecute(true);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskAiMarkItem;
//# sourceMappingURL=TsTaskAiMarkItem.js.map