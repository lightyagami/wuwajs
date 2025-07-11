"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerTitleItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class TowerTitleItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super();
    this.cRo = t;
    this.Awe = () => {
      if (this.cRo) {
        this.cRo();
      }
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.Awe]];
  }
  OnStart() {}
  RefreshText(e, ...t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e, ...t);
  }
  OnBeforeDestroy() {
    this.cRo = undefined;
  }
}
exports.TowerTitleItem = TowerTitleItem;
//# sourceMappingURL=TowerTitleItem.js.map