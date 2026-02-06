"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaSwitchGroupItem = undefined;
const UE = require("ue");
const MotorRoleCategoryById_1 = require("../../../../Core/Define/ConfigQuery/MotorRoleCategoryById");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class AreaSwitchGroupItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eaf = [];
    this.taf = 0;
    this.OnSwitchCallBack = undefined;
    this.iaf = () => {
      this.taf--;
      if (this.taf < 0) {
        this.taf = this.eaf.length - 1;
      }
      this.bl();
    };
    this.hrd = () => {
      this.taf++;
      if (this.taf >= this.eaf.length) {
        this.taf = 0;
      }
      this.bl();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.iaf], [3, this.hrd]];
  }
  RefreshAreaList(t, i) {
    t = (this.eaf = t).indexOf(i);
    this.taf = t >= 0 ? t : 0;
    this.bl();
  }
  bl() {
    var t = this.eaf[this.taf];
    var i = MotorRoleCategoryById_1.configMotorRoleCategoryById.GetConfig(t);
    if (i) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.RegionName);
      this.SetSpriteByPath(i.Icon, this.GetSprite(0), false);
      this.OnSwitchCallBack?.(t);
    }
  }
}
exports.AreaSwitchGroupItem = AreaSwitchGroupItem;
//# sourceMappingURL=AreaSwitchGroupItem.js.map