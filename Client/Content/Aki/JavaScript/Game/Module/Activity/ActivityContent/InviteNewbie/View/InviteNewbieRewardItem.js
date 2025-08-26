"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InviteNewbieRewardItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
class InviteNewbieRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.lRo = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.ActivityInviteNewbieController.HandleOnRewardClick(this.$8i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.lRo]];
  }
  SetActivityData(e) {
    this.$8i = e;
  }
  OnStart() {
    this.GetItem(2)?.SetUIActive(false);
  }
  RefreshByDataExternal(e, t) {
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), e, t);
  }
}
exports.InviteNewbieRewardItem = InviteNewbieRewardItem;
//# sourceMappingURL=InviteNewbieRewardItem.js.map