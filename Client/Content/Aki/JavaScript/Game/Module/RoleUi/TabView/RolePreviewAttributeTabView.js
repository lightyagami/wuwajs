"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RolePreviewAttributeTabView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const RoleController_1 = require("../RoleController");
const RoleFavorUtil_1 = require("../RoleFavor/RoleFavorUtil");
const RoleLevelUpSuccessAttributeView_1 = require("../RoleLevel/RoleLevelUpSuccessAttributeView");
class RolePreviewAttributeTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.RoleViewAgent = undefined;
    this.RoleInstance = undefined;
    this.nvt = undefined;
    this.Kco = e => {
      this.PlayMontageStartWithReLoop();
      this.VC(e);
    };
    this.iCo = (e, t, i) => {
      var r = new RoleLevelUpSuccessAttributeView_1.RoleAttributeItem();
      r.SetRootActor(t.GetOwner(), true);
      r.Refresh(e);
      return {
        Key: i,
        Value: r
      };
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIVerticalLayout], [4, UE.UIText]];
  }
  OnStart() {
    this.RoleViewAgent = this.ExtraParams;
    if (this.RoleViewAgent === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 58, "RoleViewAgent为空", ["界面名称", "RolePreviewAttributeTabView"]);
      }
    } else {
      this.nvt = new GenericLayoutNew_1.GenericLayoutNew(this.GetVerticalLayout(3), this.iCo);
    }
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleSystemChangeRole, this.Kco);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleSystemChangeRole, this.Kco);
  }
  OnBeforeShow() {
    this.PlayMontageStart();
    var e = this.RoleViewAgent.GetCurSelectRoleId();
    this.VC(e);
  }
  OnBeforeDestroy() {
    this.RoleInstance = undefined;
    this.nvt?.ClearChildren();
    this.nvt = undefined;
  }
  PlayMontageStart() {
    RoleController_1.RoleController.PlayRoleMontage(3);
  }
  PlayMontageStartWithReLoop() {
    RoleController_1.RoleController.PlayRoleMontage(3, false, true, false);
  }
  VC(e) {
    this.RoleInstance = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    this.oCo();
    this.rCo();
    this.nCo();
    this.sCo();
  }
  rCo() {
    var e = this.RoleInstance.GetElementInfo();
    this.SetElementIcon(e.Icon, this.GetTexture(1), this.RoleInstance.GetRoleConfig().ElementId);
    var e = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfoLocalName(e.Name);
    this.GetText(2).SetText(e);
  }
  oCo() {
    this.GetText(0).SetText(this.RoleInstance.GetName());
  }
  nCo() {
    var e = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(this.RoleInstance.GetRoleId());
    var t = this.RoleInstance.GetRoleConfig();
    var i = [];
    var t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponTypeName(t.WeaponType);
    i.push({
      Name: "Text_Weapon_Text",
      CurText: t
    });
    if (e) {
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Sex);
      i.push({
        Name: "PrefabTextItem_3159729083_Text",
        CurText: t
      });
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Country);
      i.push({
        Name: "PrefabTextItem_3969856612_Text",
        CurText: t
      });
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Influence);
      i.push({
        Name: "PrefabTextItem_152395022_Text",
        CurText: t
      });
    }
    var e = RoleFavorUtil_1.RoleFavorUtil.GetCurLanguageCvName(this.RoleInstance.GetRoleId());
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
    i.push({
      Name: "Text_CharacterVoice_Text",
      CurText: t
    });
    let r = true;
    for (const o of i) {
      o.ShowArrow = false;
      r = !(o.InnerShowBg = r);
    }
    this.nvt?.RebuildLayoutByDataNew(i);
  }
  sCo() {
    var e = this.RoleInstance.GetRoleConfig();
    this.GetText(4).ShowTextNew(e.Introduction);
  }
}
exports.RolePreviewAttributeTabView = RolePreviewAttributeTabView;
//# sourceMappingURL=RolePreviewAttributeTabView.js.map