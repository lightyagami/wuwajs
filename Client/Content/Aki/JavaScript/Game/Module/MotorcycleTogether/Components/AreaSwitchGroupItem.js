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
    this.xof = [];
    this.Bof = 0;
    this.OnSwitchCallBack = undefined;
    this.kof = () => {
      this.Bof--;
      if (this.Bof < 0) {
        this.Bof = this.xof.length - 1;
      }
      this.bl();
    };
    this.hrd = () => {
      this.Bof++;
      if (this.Bof >= this.xof.length) {
        this.Bof = 0;
      }
      this.bl();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.kof], [3, this.hrd]];
  }
  RefreshAreaList(t, i) {
    t = (this.xof = t).indexOf(i);
    this.Bof = t >= 0 ? t : 0;
    this.bl();
  }
  bl() {
    var t = this.xof[this.Bof];
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