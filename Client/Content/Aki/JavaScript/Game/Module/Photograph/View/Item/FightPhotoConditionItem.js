"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoConditionItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FightPhotoConditionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.lNe = undefined;
    this.Evm = false;
    this.BPd = () => {
      this.RefreshConditionStatus();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UITexture]];
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeFightPhotoOption, this.BPd);
  }
  Refresh(e, t, i) {
    this.lNe = e.Condition;
    this.Evm = e.IsNeedCheckRole;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Text);
    this.RefreshConditionStatus();
  }
  RefreshConditionStatus() {
    var e = ControllerHolder_1.ControllerHolder.PhotographController.CurrentBtNode;
    if (e && e.InProgress) {
      e = !this.Evm || e.CheckIsTargetRole();
      e = ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(this.lNe, undefined) && e;
      this.GetSprite(0)?.SetUIActive(e);
      this.GetTexture(2)?.SetUIActive(e);
    }
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeFightPhotoOption, this.BPd);
  }
}
exports.FightPhotoConditionItem = FightPhotoConditionItem;
//# sourceMappingURL=FightPhotoConditionItem.js.map