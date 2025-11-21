"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeBtnItem = undefined;
const UE = require("ue");
const HomeBtnStyleById_1 = require("../../../../Core/Define/ConfigQuery/HomeBtnStyleById");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class HomeBtnItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Gvr = () => {};
    this.yum = undefined;
    this.Fr = () => {
      if (this.Gvr) {
        this.Gvr();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISpriteTransition]];
    this.BtnBindInfo = [[0, this.Fr]];
  }
  async OnBeforeStartAsync() {
    var t;
    var i;
    if (this.yum !== undefined && (i = HomeBtnStyleById_1.configHomeBtnStyleById.GetConfig(this.yum)) !== undefined && (t = this.GetUiSpriteTransition(1))) {
      if (!StringUtils_1.StringUtils.IsEmpty(i.SPNormal)) {
        await this.SetSpriteTransitionByPath(i.SPNormal, t, 0);
      }
      if (!StringUtils_1.StringUtils.IsEmpty(i.SPHighLighted)) {
        await this.SetSpriteTransitionByPath(i.SPHighLighted, t, 1);
      }
      if (!StringUtils_1.StringUtils.IsEmpty(i.SPPressed)) {
        await this.SetSpriteTransitionByPath(i.SPPressed, t, 2);
      }
      i = StringUtils_1.StringUtils.IsEmpty(i.SPDisable) ? i.SPNormal : i.SPDisable;
      if (!StringUtils_1.StringUtils.IsEmpty(i)) {
        await this.SetSpriteTransitionByPath(i, t, 3);
      }
    }
  }
  SetFunction(t) {
    this.Gvr = t;
  }
  SetHomeBtnStyle(t) {
    this.yum = t;
  }
}
exports.HomeBtnItem = HomeBtnItem;
//# sourceMappingURL=HomeBtnItem.js.map