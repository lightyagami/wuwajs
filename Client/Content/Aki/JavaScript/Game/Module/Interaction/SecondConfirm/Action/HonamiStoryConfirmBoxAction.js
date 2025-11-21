"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryConfirmBoxAction = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const HonamiStoryUtil_1 = require("../../../HonamiStory/HonamiStoryUtil");
const InteractConfirmActionBase_1 = require("../InteractConfirmActionBase");
class HonamiStoryConfirmBoxAction extends InteractConfirmActionBase_1.InteractConfirmBoxActionBase {
  ConfigConfirmBoxData() {
    var o = this.Context.Option.ConfirmBox.Type;
    if (o) {
      (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(o.Id)).SetTextArgs(this.GetLifeSupportCost().toString());
      o.FunctionMap.set(1, () => {
        this.ExecuteFinish(false);
      });
      o.FunctionMap.set(2, () => {
        this.ExecuteFinish(true);
      });
      return o;
    }
  }
  GetHonamiStoryLifeSupport() {
    return ControllerHolder_1.ControllerHolder.FormationAttributeController.GetValue(13);
  }
  GetLifeSupportCost() {
    var o;
    var r = this.Context?.Option?.Type;
    let e = 0;
    if (r) {
      for (const t of r.Actions) {
        if (t.Name === "HonamiStoryReceiveCorruptedChestReward") {
          if ((o = t.Params).CostGroup && o.CostGroup > 0) {
            e += HonamiStoryUtil_1.HonamiStoryUtil.GetSteadyConsumeByCostGroup(o.CostGroup);
          } else {
            e += o.Cost;
          }
        }
      }
    }
    return e;
  }
}
exports.HonamiStoryConfirmBoxAction = HonamiStoryConfirmBoxAction;
//# sourceMappingURL=HonamiStoryConfirmBoxAction.js.map