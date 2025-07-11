"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionLevelUpSettingPopView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
class VisionLevelUpSettingPopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.c1l = 0;
    this.tBt = 0;
    this.pDu = 0;
    this.vDu = () => {
      this.SetIdentify(0);
    };
    this.yDu = () => {
      this.SetIdentify(1);
    };
    this.m1l = () => {
      this.SetPutInMode(0);
    };
    this.d1l = () => {
      this.SetPutInMode(1);
    };
    this.C1l = () => {
      this.SetUseType(0);
    };
    this.g1l = () => {
      this.SetUseType(1);
    };
    this.p1l = () => {
      this.CloseMe();
    };
    this.xco = () => {
      this.SaveSetting();
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIExtendToggle], [2, UE.UIExtendToggle], [3, UE.UIExtendToggle], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIExtendToggle], [7, UE.UIExtendToggle]];
    this.BtnBindInfo = [[0, this.m1l], [1, this.d1l], [2, this.C1l], [3, this.g1l], [4, this.p1l], [5, this.xco], [6, this.vDu], [7, this.yDu]];
  }
  OnStart() {
    var i = ModelManager_1.ModelManager.PhantomBattleModel;
    this.c1l = i.GetVisionLevelUpMaterialPutInMode();
    this.tBt = i.GetVisionLevelUpMaterialUseType();
    this.pDu = i.GetVisionLevelUpIdentify();
    this.Refresh();
  }
  Refresh() {
    this.RefreshPutInModeToggle();
    this.RefreshUseTypeToggle();
    this.RefreshIdentifyToggle();
  }
  RefreshUseTypeToggle() {
    let i = undefined;
    let t = undefined;
    t = this.tBt === 0 ? (i = 1, 0) : (i = 0, 1);
    this.GetExtendToggle(2)?.SetToggleState(i);
    this.GetExtendToggle(3)?.SetToggleState(t);
  }
  RefreshPutInModeToggle() {
    let i = undefined;
    let t = undefined;
    t = this.c1l === 0 ? (i = 1, 0) : (i = 0, 1);
    this.GetExtendToggle(0)?.SetToggleState(i);
    this.GetExtendToggle(1)?.SetToggleState(t);
  }
  RefreshIdentifyToggle() {
    let i = undefined;
    let t = undefined;
    t = this.pDu === 0 ? (i = 1, 0) : (i = 0, 1);
    this.GetExtendToggle(6)?.SetToggleState(i);
    this.GetExtendToggle(7)?.SetToggleState(t);
  }
  SetPutInMode(i) {
    this.c1l = i;
    this.RefreshPutInModeToggle();
  }
  SetUseType(i) {
    this.tBt = i;
    this.RefreshUseTypeToggle();
  }
  SetIdentify(i) {
    this.pDu = i;
    this.RefreshIdentifyToggle();
  }
  SaveSetting() {
    var i = ModelManager_1.ModelManager.PhantomBattleModel;
    i.SetVisionLevelUpMaterialPutInMode(this.c1l);
    i.SetVisionLevelUpMaterialUseType(this.tBt);
    i.SetVisionLevelUpIdentify(this.pDu);
  }
}
exports.VisionLevelUpSettingPopView = VisionLevelUpSettingPopView;
//# sourceMappingURL=VisionLevelUpSettingPopView.js.map