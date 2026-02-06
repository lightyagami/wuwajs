"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyPartTabItemData = exports.MotorcycleDiyPartTabItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const CommonTabItemBase_1 = require("../../../Common/TabComponent/TabItem/CommonTabItemBase");
class MotorcycleDiyPartTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments);
    this.l4e = undefined;
    this.wEg = 0;
    this.PEg = undefined;
    this.AEg = 0;
    this.kqe = t => {
      var e = t === 1;
      this.v6f(t === 1);
      if (e) {
        this.SelectedCallBack?.(this.GridIndex);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIExtendToggle], [0, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[1, this.kqe]];
  }
  OnRefresh(t, e, i) {
    var o = t.OutlookType;
    var s = t.PartId;
    let r = undefined;
    if (o === 2) {
      r = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerPartConfig(s);
    } else if (o === 3) {
      r = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationPartConfig(s);
    }
    if (r) {
      this.SetTextureByPath(r.Icon, this.GetTexture(0));
    }
    this.GetItem(4).SetUIActive(t.IsShowLine);
  }
  OnUpdateTabIcon(t) {}
  OnSetToggleState(t, e) {
    this.GetExtendToggle(1).SetToggleStateForce(t, e);
    this.v6f(t === 1);
  }
  GetTabToggle() {
    return this.GetExtendToggle(1);
  }
  v6f(t) {
    var e = this.CurrentData;
    var i = e.OutlookType;
    var e = e.PartId;
    let o = undefined;
    if (i === 2) {
      o = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerPartConfig(e);
    } else if (i === 3) {
      o = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationPartConfig(e);
    }
    if (o) {
      i = t ? o.IconSelect : o.Icon;
      this.SetTextureByPath(i, this.GetTexture(0));
    }
  }
  BindRedDot(t, e) {
    this.UnBindRedDot();
    var i = this.GetItem(3);
    this.l4e = t;
    this.wEg = e;
    RedDotController_1.RedDotController.BindRedDot(t, i, undefined, e);
  }
  UnBindRedDot() {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, this.GetItem(3), this.wEg);
      this.l4e = undefined;
      this.wEg = 0;
    }
  }
  BindPreviewRedDot(t, e) {
    this.UnBindPreviewRedDot();
    var i = this.GetItem(5);
    this.PEg = t;
    this.AEg = e;
    RedDotController_1.RedDotController.BindRedDot(t, i, undefined, e);
  }
  UnBindPreviewRedDot() {
    if (this.PEg) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.PEg, this.GetItem(5), this.AEg);
      this.PEg = undefined;
      this.AEg = 0;
    }
  }
}
exports.MotorcycleDiyPartTabItem = MotorcycleDiyPartTabItem;
class MotorcycleDiyPartTabItemData extends CommonTabItemBase_1.CommonTabItemData {
  constructor() {
    super(...arguments);
    this.OutlookType = 0;
    this.PartId = 0;
    this.IsShowLine = true;
  }
}
exports.MotorcycleDiyPartTabItemData = MotorcycleDiyPartTabItemData;
//# sourceMappingURL=MotorcycleDiyPartTabItem.js.map