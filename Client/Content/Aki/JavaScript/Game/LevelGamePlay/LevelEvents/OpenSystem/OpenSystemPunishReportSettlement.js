"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemPunishReportSettlement = undefined;
const IVar_1 = require("../../../../UniverseEditor/Interface/IVar");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GeneralLogicTreeDefine_1 = require("../../../Module/GeneralLogicTree/Define/GeneralLogicTreeDefine");
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemPunishReportSettlement extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    if (e && e.InputVars && r.Type === 6) {
      var n = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(r.TreeIncId);
      if (n) {
        var t = [];
        for (const i of e.InputVars) {
          var a = this.EGl(n, i);
          t.push(a ? 1 : 0);
        }
        r = new GeneralLogicTreeDefine_1.PunishReportSettlementViewParams(n.TreeConfigId, t);
        await UiManager_1.UiManager.OpenViewAsync("PunishReportSettlementView", r);
      }
    }
    return true;
  }
  EGl(e, r) {
    var n = r.Source;
    var t = r.Type;
    if (n === "Self") {
      n = e.GetTreeVarByKey(r.Name);
      if (n === undefined) {
        return false;
      }
      if (n.iTs === (0, IVar_1.getVarConfigIndex)(t) && t === "Boolean") {
        return n.rTs ?? false;
      }
    }
    return false;
  }
  GetViewName(e, r) {
    return "PunishReportSettlementView";
  }
}
exports.OpenSystemPunishReportSettlement = OpenSystemPunishReportSettlement;
//# sourceMappingURL=OpenSystemPunishReportSettlement.js.map