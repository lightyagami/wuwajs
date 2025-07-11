"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuickNavigateItemPanelB = undefined;
const UE = require("ue");
const StateByStateId_1 = require("../../../../../Core/Define/ConfigQuery/StateByStateId");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class QuickNavigateItemPanelB extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RYa = undefined;
    this.kqe = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapFirstNavigateSelect, this.RYa);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  RefreshByData(e) {
    var t = (this.RYa = e).StateId;
    var t = StateByStateId_1.configStateByStateId.GetConfig(t);
    var i = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, t.StateName);
    var i = this.GetExtendToggle(0);
    if (e.IsSelected) {
      i.SetToggleState(1);
    } else {
      i.SetToggleState(0);
    }
  }
}
exports.QuickNavigateItemPanelB = QuickNavigateItemPanelB;
//# sourceMappingURL=QuickNavigateItemPanelB.js.map