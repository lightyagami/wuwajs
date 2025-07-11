"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RolePreviewDescribeTabView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const RoleController_1 = require("../../RoleUi/RoleController");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RolePreviewDescribeTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.CharacterVoiceTitleText = undefined;
    this.CharacterVoiceNameText = undefined;
    this.AttributeIconTexture = undefined;
    this.AttributeText = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UITexture], [7, UE.UIText]];
  }
  OnStart() {
    this.gCt();
    this.PlayMontageStart();
  }
  OnBeforeDestroy() {
    this.CharacterVoiceTitleText = undefined;
    this.CharacterVoiceNameText = undefined;
    this.AttributeIconTexture = undefined;
    this.AttributeText = undefined;
  }
  gCt() {
    var e;
    var i = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance();
    var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i.GetRoleId());
    if (i) {
      this.GetText(0).ShowTextNew(i.Name);
      e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponTypeName(i.WeaponType);
      this.GetText(1).SetText(e);
      this.GetText(2).ShowTextNew(i.Introduction);
    }
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "RoleFilterWeapon");
    this.CharacterVoiceTitleText = this.GetText(4);
    this.CharacterVoiceNameText = this.GetText(5);
    this.AttributeIconTexture = this.GetTexture(6);
    this.AttributeText = this.GetText(7);
    this.SetCharacterVoiceInfo();
    this.SetAttributeInfo();
  }
  SetCharacterVoiceInfo() {
    this.CharacterVoiceTitleText.SetUIActive(false);
    this.CharacterVoiceNameText.SetUIActive(false);
  }
  SetAttributeInfo() {
    this.AttributeIconTexture.SetUIActive(false);
    this.AttributeText.SetUIActive(false);
  }
  PlayMontageStart() {
    RoleController_1.RoleController.PlayRoleMontage(3);
  }
  OnBeforeShow() {
    this.PlayMontageStart();
  }
}
exports.RolePreviewDescribeTabView = RolePreviewDescribeTabView;
//# sourceMappingURL=RolePreviewDescribeTabView.js.map