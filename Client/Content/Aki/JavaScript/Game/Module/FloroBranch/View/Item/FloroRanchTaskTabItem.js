"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchTaskTabItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FloroRanchTaskTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.aIu = 1;
    this.OnToggleCallBack = undefined;
    this.kqe = () => {
      if (this.OnToggleCallBack) {
        this.OnToggleCallBack(this.GridIndex, this.aIu);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIExtendToggle], [0, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[1, this.kqe]];
  }
  Refresh(t, e, s) {
    this.aIu = t.Id;
    t = t.TabName;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t);
    this.RefreshRedDot();
  }
  RefreshRedDot() {
    var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().IsTaskHasRedDotByTab(this.aIu);
    this.GetItem(2)?.SetUIActive(t);
  }
  SetToggleState(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(1).SetToggleState(t);
  }
  OnSelected(t) {
    this.SetToggleState(true);
  }
  OnDeselected(t) {
    this.SetToggleState(false);
  }
}
exports.FloroRanchTaskTabItem = FloroRanchTaskTabItem;
//# sourceMappingURL=FloroRanchTaskTabItem.js.map