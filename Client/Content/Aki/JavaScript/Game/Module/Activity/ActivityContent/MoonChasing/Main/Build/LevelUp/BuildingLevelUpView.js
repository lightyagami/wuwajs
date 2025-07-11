"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuildingLevelUpView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../../../../../../Ui/Base/UiSequencePlayer");
const UiTickViewBase_1 = require("../../../../../../../Ui/Base/UiTickViewBase");
const LguiUtil_1 = require("../../../../../../Util/LguiUtil");
const BuildingLevelUpViewController_1 = require("./BuildingLevelUpViewController");
class BuildingLevelUpView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Hwt = undefined;
    this.OIa = undefined;
    this.kIa = false;
    this.aOn = new BuildingLevelUpViewController_1.BuildingLevelUpViewController();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISliderComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UITexture], [8, UE.UITexture], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem]];
    this.BtnBindInfo = [[6, this.aOn.CloseSelf]];
  }
  OnStart() {
    this.aOn.RegisterView(this);
    this.aOn.Start();
    this.Hwt = this.GetSlider(0);
    this.OIa = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(13));
    this.SetFillAmount(0);
  }
  OnTick(i) {
    this.aOn.Tick(i);
  }
  InitUnlock(i) {
    var i = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(i);
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(i.AssociateRole);
    this.GetSlider(0)?.RootUIComp.SetUIActive(true);
    this.GetItem(2)?.SetUIActive(false);
    this.GetButton(6)?.RootUIComp.SetUIActive(false);
    var t = this.GetButton(5);
    t?.OnPointDownCallBack.Bind(this.aOn.UnlockPress);
    t?.OnPointUpCallBack.Bind(this.aOn.UnlockRelease);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Moonfiesta_StartBuild");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), i.BuildSuccessDialog);
    this.SetTextureByPath(i.SmallHeadIcon, this.GetTexture(8));
    this.GetItem(10)?.SetUIActive(true);
    this.GetItem(11)?.SetUIActive(false);
    this.GetItem(12)?.SetUIActive(false);
  }
  ShowUnlock() {
    this.GetText(1)?.SetUIActive(false);
    this.GetButton(5)?.RootUIComp.SetUIActive(false);
  }
  FinishUnlock(i) {
    var t = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(i);
    this.GetSlider(0)?.RootUIComp.SetUIActive(false);
    this.GetItem(2)?.SetUIActive(true);
    this.GetText(1)?.SetUIActive(true);
    this.GetButton(6)?.RootUIComp.SetUIActive(true);
    var i = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(i);
    this.SetTextureByPath(i.BuildingTexture, this.GetTexture(7));
    var i = t.GetLevelUpIncreaseDesc();
    this.GetText(4)?.SetText(i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "Moonfiesta_BuildingTips_Built");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Moonfiesta_ClickContinue");
    this.GetItem(10)?.SetUIActive(false);
    this.GetItem(11)?.SetUIActive(true);
    this.GetItem(12)?.SetUIActive(true);
  }
  InitLevelUp(i) {
    this.GetSlider(0)?.RootUIComp.SetUIActive(false);
    this.GetItem(2)?.SetUIActive(false);
    this.GetButton(5)?.RootUIComp.SetUIActive(false);
    this.GetButton(6)?.RootUIComp.SetUIActive(false);
    i = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(i);
    this.SetTextureByPath(i.BuildingTexture, this.GetTexture(7));
    this.GetItem(10)?.SetUIActive(false);
    this.GetItem(11)?.SetUIActive(true);
    this.GetItem(12)?.SetUIActive(true);
  }
  ShowLevelUp() {
    this.GetText(1)?.SetUIActive(false);
  }
  FinishLevelUp(i) {
    i = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(i);
    this.GetItem(2)?.SetUIActive(true);
    this.GetText(1)?.SetUIActive(true);
    this.GetButton(6)?.RootUIComp.SetUIActive(true);
    i = i.GetLevelUpIncreaseDesc();
    this.GetText(4)?.SetText(i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "Moonfiesta_BuildingTips_Built");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Moonfiesta_ClickContinue");
  }
  SetFillAmount(i) {
    this.Hwt.SetValue(i);
  }
  PlayBuildingLoopSequence(i) {
    if (this.kIa !== i) {
      if (this.kIa = i) {
        this.OIa.PlaySequence("Loop");
      } else {
        this.OIa.StopPrevSequence(false, true);
      }
    }
  }
}
exports.BuildingLevelUpView = BuildingLevelUpView;
//# sourceMappingURL=BuildingLevelUpView.js.map