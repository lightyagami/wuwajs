"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerQuestTabItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BabelTowerController_1 = require("./BabelTowerController");
class BabelTowerQuestTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.vua = 0;
    this.OnClickToggleCallBack = undefined;
    this.kqe = () => {
      this.OnClickToggleCallBack?.(this.GetExtendToggle(0), this.vua);
    };
    this.DMc = () => {
      var e = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
      this.GetItem(2).SetUIActive(e.GetQuestTabRedDot(this.vua));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BabelTowerRefreshQuestState, this.DMc);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BabelTowerRefreshQuestState, this.DMc);
  }
  Refresh(e, t, r) {
    this.vua = e;
    e = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
    this.GetItem(2).SetUIActive(e.GetQuestTabRedDot(this.vua));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "BabelTowerTaskType_" + this.vua);
  }
  SelectToggle() {
    this.GetExtendToggle(0).SetToggleState(1, false);
    this.OnClickToggleCallBack?.(this.GetExtendToggle(0), this.vua);
  }
}
exports.BabelTowerQuestTabItem = BabelTowerQuestTabItem;
//# sourceMappingURL=BabelTowerQuestTabItem.js.map