"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorLinkageButton = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
class MotorLinkageButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this._Dm = 0;
    this.NTt = undefined;
    this.U6f = undefined;
    this.Y9f = undefined;
    this.Fr = () => {
      this.NTt?.(this._Dm);
    };
    this.A6f = () => {
      this.U6f?.(this._Dm);
    };
    this.Q9f = () => {
      this.Y9f?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Fr]];
  }
  OnStart() {
    var t = this.GetButton(0);
    if (t) {
      t.OnPointEnterCallBack.Bind(this.A6f);
      t.OnPointExitCallBack.Bind(this.Q9f);
    }
  }
  OnBeforeShow() {
    this.Refresh();
  }
  Refresh() {
    var t;
    var i = ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetIpConfig(this._Dm);
    if (i) {
      t = ActivityControllerHolder_1.ActivityControllerHolder.ActivityMotorLinkageController.ActivityData;
      this.GetItem(1)?.SetUIActive(t.IsStickerReceived(i.IpStickerList[0]));
      this.GetItem(2)?.SetUIActive(t.IsStickerReceived(i.IpStickerList[1]));
      i = t.IpHasAnyRewardCanReceive(this._Dm);
      this.GetItem(3)?.SetUIActive(i);
    }
  }
  SetIpId(t) {
    this._Dm = t;
  }
  SetClickCallback(t) {
    this.NTt = t;
  }
  SetEnterCallback(t) {
    this.U6f = t;
  }
  SetExitCallback(t) {
    this.Y9f = t;
  }
}
exports.MotorLinkageButton = MotorLinkageButton;
//# sourceMappingURL=MotorLinkageButtonItem.js.map