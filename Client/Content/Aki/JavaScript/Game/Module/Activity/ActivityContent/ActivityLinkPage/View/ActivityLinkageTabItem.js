"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityLinkageTabItem = undefined;
const UE = require("ue");
const ActivityLinkageById_1 = require("../../../../../../Core/Define/ConfigQuery/ActivityLinkageById");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityLinkageTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.pua = undefined;
    this.OnToggleCallBack = undefined;
    this.RefreshRedDot = () => {
      var e = !this.pua?.IsReceive;
      this.GetItem(3)?.SetUIActive(e);
    };
    this.kqe = () => {
      if (this.OnToggleCallBack) {
        this.OnToggleCallBack(this.GridIndex, this.pua);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.RefreshRedDot);
  }
  Refresh(e, t, i) {
    this.pua = e;
    e = ActivityLinkageById_1.configActivityLinkageById.GetConfig(e.TabId);
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.TabName);
      this.SetTextureByPath(e.SmallImage, this.GetTexture(1));
      this.RefreshRedDot();
    }
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.RefreshRedDot);
  }
  SetToggleCallBack(e) {
    this.OnToggleCallBack = e;
  }
  SetToggleState(e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(e);
  }
  OnSelected(e) {
    this.SetToggleState(true);
  }
  OnDeselected(e) {
    this.SetToggleState(false);
  }
}
exports.ActivityLinkageTabItem = ActivityLinkageTabItem;
//# sourceMappingURL=ActivityLinkageTabItem.js.map