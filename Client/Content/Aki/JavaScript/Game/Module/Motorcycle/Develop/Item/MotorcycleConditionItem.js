"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleConditionItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const UiManager_1 = require("../../../../Ui/UiManager");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class MotorcycleConditionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.$3e = () => {
      if (this.Pe?.AccessId) {
        if (this.Pe.AccessType === 3) {
          ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(this.Pe?.AccessId);
        } else {
          SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Pe.AccessId);
          UiManager_1.UiManager.CloseView("MotorcycleConditionView");
        }
      } else if (this.Pe?.RecommendQuestId) {
        UiManager_1.UiManager.OpenView("QuestView", this.Pe?.RecommendQuestId);
        UiManager_1.UiManager.CloseView("MotorcycleConditionView");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.$3e], [8, this.$3e]];
  }
  Refresh(i, t, r) {
    var e = (this.Pe = i).AccessType === 1;
    var s = i.AccessType === 3;
    var o = this.GetText(4);
    if (StringUtils_1.StringUtils.IsEmpty(i.ConditionTextId)) {
      o.SetText("");
    } else {
      o.ShowTextNew(i.ConditionTextId);
    }
    this.GetItem(1).SetUIActive(e);
    this.GetItem(2).SetUIActive(!e);
    this.GetItem(3).SetUIActive(true);
    this.GetItem(6).SetUIActive(false);
    this.GetItem(7).SetUIActive(false);
    this.GetButton(5).RootUIComp.SetUIActive(!s);
    this.GetButton(8).RootUIComp.SetUIActive(s);
  }
}
exports.MotorcycleConditionItem = MotorcycleConditionItem;
//# sourceMappingURL=MotorcycleConditionItem.js.map