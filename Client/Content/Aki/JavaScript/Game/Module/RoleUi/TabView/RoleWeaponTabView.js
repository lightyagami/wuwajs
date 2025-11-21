"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleWeaponTabView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonEquippedItem_1 = require("../../Common/CommonEquippedItem");
const SkinController_1 = require("../../Skin/SkinController");
const WeaponSkinDefine_1 = require("../../Skin/Tab/Weapon/WeaponSkinDefine");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WeaponController_1 = require("../../Weapon/WeaponController");
const WeaponDetailTipsComponent_1 = require("../../Weapon/WeaponDetailTipsComponent");
const RoleController_1 = require("../RoleController");
const RoleViewViewModel_1 = require("../View/ViewData/RoleViewViewModel");
class RoleWeaponTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.d1o = undefined;
    this.ICo = undefined;
    this.Mko = undefined;
    this.dCo = () => {
      this.CCo = false;
    };
    this.TCo = e => {
      var i = new RoleViewViewModel_1.RoleViewViewModel(this.d1o.GetCurSelectRoleId(), false);
      i.WeaponIncId = e;
      ControllerHolder_1.ControllerHolder.RoleController.OpenRoleViewByViewModel("WeaponReplaceView", i);
    };
    this.LCo = e => {
      var i = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
      var e = {
        WeaponIncId: e,
        WeaponSkinId: ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(i.GetRoleId()),
        IsFromRoleRootView: true
      };
      UiManager_1.UiManager.OpenView("WeaponRootView", e);
      WeaponController_1.WeaponController.RoleFadeIn(UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor());
    };
    this.DCo = (e, i) => {
      this.ICo.UpdateWeaponLock(i);
    };
    this.CCo = false;
    this.RCo = () => {
      this.CCo = true;
      this.PlayMontageStart(true);
      this.UCo();
    };
    this.fil = () => {
      var e = this.d1o.GetCurSelectRoleId();
      SkinController_1.SkinController.SkipToSkinView(e, "WeaponSkinTabView", false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIItem]];
    this.BtnBindInfo = [[2, this.fil]];
  }
  async vil() {
    var e = this.GetItem(0);
    this.ICo = new WeaponDetailTipsComponent_1.WeaponDetailTipsComponent();
    await this.ICo.CreateThenShowByActorAsync(e.GetOwner());
  }
  async Mil() {
    this.Mko = new CommonEquippedItem_1.CommonEquippedItem();
    await this.Mko.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  async OnBeforeStartAsync() {
    this.d1o = this.ExtraParams;
    if (this.d1o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 58, "RoleViewAgent为空", ["界面名称", "RoleWeaponTabView"]);
      }
    } else {
      await Promise.all([this.vil(), this.Mil()]);
    }
  }
  OnStart() {
    this.ICo.SetCanShowEquip(false);
    this.ICo.SetReplaceFunction(this.TCo);
    this.ICo.SetCultureFunction(this.LCo);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemLock, this.DCo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleSystemChangeRole, this.RCo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ResetRoleFlag, this.dCo);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemLock, this.DCo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleSystemChangeRole, this.RCo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ResetRoleFlag, this.dCo);
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(1);
    if (this.CCo) {
      this.PlayMontageStart(true);
      this.CCo = false;
    } else {
      this.PlayMontageStart(false);
    }
    this.UCo();
  }
  OnBeforeDestroy() {
    if (this.ICo) {
      this.ICo.Destroy();
      this.ICo = undefined;
    }
  }
  PlayMontageStart(e = false) {
    RoleController_1.RoleController.PlayRoleMontage(6, e);
  }
  UCo() {
    var e = this.d1o.GetCurSelectRoleData();
    var i = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(e.GetDataId());
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 58, "RoleWeaponTabView获取不到武器数据", ["roleId", e.GetDataId()]);
      }
    } else {
      this.ICo.UpdateComponent(i);
      i = ModelManager_1.ModelManager.WeaponModel.RedDotWeaponBreachCondition(e.GetDataId());
      e = ModelManager_1.ModelManager.WeaponModel.RedDotWeaponResonanceConditionByRole(e.GetDataId());
      this.ICo.UpdateWeaponBreachRedDot(i || e);
      this.Sil();
      this.lpl();
      this.BNe();
    }
  }
  Sil() {
    var e;
    if (!this.d1o.GetRoleSystemUiParams().SwitchSkin || (e = this.d1o.GetCurSelectRoleData(), (e = ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(e.GetDataId())) === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID)) {
      this.Mko?.SetIconRootItemState(false);
    } else {
      e = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(e);
      this.Mko?.SetEquipIcon(e.IconSmall);
      this.Mko.SetEquipText("WeaponTipsRoleText", new LguiUtil_1.TableTextArgNew(e.Name));
      this.Mko?.SetIconRootItemState(true);
    }
  }
  lpl() {
    var e;
    if (!this.d1o.GetRoleSystemUiParams().SwitchSkin || !(e = this.d1o.GetCurSelectRoleData()) || e.IsTrialRole()) {
      this.GetButton(2)?.RootUIComp.SetUIActive(false);
    } else {
      this.GetButton(2)?.RootUIComp.SetUIActive(true);
    }
  }
  BNe() {
    var e;
    if (this.d1o.GetRoleSystemUiParams().SwitchSkin) {
      e = this.d1o.GetCurSelectRoleData();
      e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(e.GetDataId()).GetWeaponConfig().WeaponType;
      e = ModelManager_1.ModelManager.WeaponSkinModel.HasWeaponSkinRedDot(e);
      this.GetItem(3)?.SetUIActive(e);
    } else {
      this.GetItem(3)?.SetUIActive(false);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return this.ICo.GetGuideUiItemAndUiItemForShowEx(e);
  }
}
exports.RoleWeaponTabView = RoleWeaponTabView;
//# sourceMappingURL=RoleWeaponTabView.js.map