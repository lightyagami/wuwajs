"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoTaskTabItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class FightPhotoTaskTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.activityData = undefined;
    this.OnToggleClickCallBack = t => {};
    this.N8e = () => {
      this.OnToggleClickCallBack(this.Pe.TabId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  Refresh(t, e, i) {
    this.Pe = t;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.TabTitle);
    t = this.activityData.IsTaskHasRedDotByTab(t.TabId);
    this.GetItem(2)?.SetUIActive(t);
  }
  GetKey(t, e) {
    return t.TabId;
  }
  SetToggleState(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t);
  }
  OnSelected(t) {
    this.SetToggleState(true);
  }
  OnDeselected(t) {
    this.SetToggleState(false);
  }
}
exports.FightPhotoTaskTabItem = FightPhotoTaskTabItem;
//# sourceMappingURL=FightPhotoTaskTabItem.js.map