"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTreeTypeTabItemData = exports.MotorcycleTreeTypeTabItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const CommonTabItemBase_1 = require("../../../Common/TabComponent/TabItem/CommonTabItemBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
class MotorcycleTreeTypeTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments);
    this.l4e = undefined;
    this.rcf = 0;
    this.kqe = e => {
      if (e === 1) {
        this.SelectedCallBack?.(this.GridIndex);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnRefresh(e, t, o) {
    var s = e.TreeType;
    var e = e.IsFinish;
    var s = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(s);
    if (s) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), s.Name);
      this.SetTextureByPath(s.Icon, this.GetTexture(1));
      this.GetItem(3).SetUIActive(e);
    }
  }
  OnUpdateTabIcon(e) {}
  OnSetToggleState(e, t) {
    this.GetExtendToggle(0).SetToggleStateForce(e, t);
  }
  GetTabToggle() {
    return this.GetExtendToggle(0);
  }
  BindRedDot(e, t) {
    this.UnBindRedDot();
    var o = this.GetItem(4);
    this.l4e = e;
    this.rcf = t;
    RedDotController_1.RedDotController.BindRedDot(e, o, undefined, t);
  }
  UnBindRedDot() {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, this.GetItem(4), this.rcf);
      this.l4e = undefined;
      this.rcf = 0;
    }
  }
}
exports.MotorcycleTreeTypeTabItem = MotorcycleTreeTypeTabItem;
class MotorcycleTreeTypeTabItemData extends CommonTabItemBase_1.CommonTabItemData {
  constructor() {
    super(...arguments);
    this.TreeType = 0;
    this.IsFinish = false;
  }
}
exports.MotorcycleTreeTypeTabItemData = MotorcycleTreeTypeTabItemData;
//# sourceMappingURL=MotorcycleTreeTypeTabItem.js.map