"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorTabView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../../NewWorld/Character/Common/CharacterNameDefines");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoleController_1 = require("../RoleController");
class RoleFavorTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.d1o = undefined;
    this.bl = () => {
      var e = this.d1o.GetCurSelectRoleId();
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
      var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      var o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name);
      var t = this.GetText(1);
      var r = this.GetText(2);
      var a = this.GetText(0);
      var e = e.PartyId !== 9;
      t.SetUIActive(e);
      r.SetUIActive(e);
      this.GetButton(6).RootUIComp.SetUIActive(e);
      this.GetButton(3).RootUIComp.SetUIActive(e);
      if (e) {
        a.SetText(o);
      } else {
        a.SetText(i.GetName());
      }
      var e = i.GetFavorData();
      var o = e.GetFavorLevel();
      LguiUtil_1.LguiUtil.SetLocalText(t, "FavorLevel", o);
      var a = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorLevelConfig(o);
      var i = e.GetFavorExp();
      if (a) {
        LguiUtil_1.LguiUtil.SetLocalText(r, "RoleExp", i, a.LevelUpExp);
      } else {
        t = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorLevelConfig(o - 1).LevelUpExp;
        LguiUtil_1.LguiUtil.SetLocalText(r, "RoleExp", t, t);
      }
      this.BNe();
    };
    this.BNe = () => {
      var e = this.d1o.GetCurSelectRoleData().GetFavorData();
      this.GetItem(7).SetUIActive(e.IsFavorItemCanUnlock(2));
      this.GetItem(8).SetUIActive(e.IsFavorItemCanUnlock(0));
      this.GetItem(9).SetUIActive(e.IsFavorItemCanUnlock(3));
      this.GetItem(10).SetUIActive(e.IsFavorItemCanUnlock(4));
    };
    this.OnClickExperienceButton = () => {
      var e = this.d1o.GetCurSelectRoleId();
      if (ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(e)) {
        UiManager_1.UiManager.OpenView("RoleFavorInfoView", {
          RoleId: e,
          FavorTabType: 1
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 43, "该角色的好感度配置FavorRoleInfo找不到!!!", ["角色Id", e]);
      }
    };
    this.OnClickVoiceButton = () => {
      const e = this.d1o.GetCurSelectRoleId();
      if (ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorWordConfig(e, 1)[0]) {
        UiManager_1.UiManager.OpenView("RoleFavorInfoView", {
          RoleId: e,
          FavorTabType: 0
        });
      } else {
        const e = this.d1o.GetCurSelectRoleId();
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Role", 43, "该角色的好感度配置FavorWord找不到!!!", ["角色Id", e]);
        }
      }
    };
    this.OnClickActionButton = () => {
      const e = this.d1o.GetCurSelectRoleId();
      if (ConfigManager_1.ConfigManager.MotionConfig.GetRoleMotionByType(e, 1)[0]) {
        UiManager_1.UiManager.OpenView("RoleFavorInfoView", {
          RoleId: e,
          FavorTabType: 2
        });
      } else {
        const e = this.d1o.GetCurSelectRoleId();
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Role", 43, "该角色的好感度配置Motion找不到!!!", ["角色Id", e]);
        }
      }
    };
    this.OnClickPreciousItemButton = () => {
      const e = this.d1o.GetCurSelectRoleId();
      if (ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorGoodsConfig(e)[0]) {
        UiManager_1.UiManager.OpenView("RoleFavorInfoView", {
          RoleId: e,
          FavorTabType: 3
        });
      } else {
        const e = this.d1o.GetCurSelectRoleId();
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Role", 43, "该角色的好感度配置FavorGoods找不到!!!", ["角色Id", e]);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[3, this.OnClickExperienceButton], [4, this.OnClickVoiceButton], [5, this.OnClickActionButton], [6, this.OnClickPreciousItemButton]];
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateRoleFavorData, this.bl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleSystemChangeRole, this.bl);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateRoleFavorData, this.bl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleSystemChangeRole, this.bl);
  }
  OnStart() {
    this.d1o = this.ExtraParams;
    if (this.d1o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 58, "RoleViewAgent为空", ["界面名称", "RoleFavorTabView"]);
      }
    } else {
      RoleController_1.RoleController.SendRoleFavorListRequest();
    }
  }
  OnBeforeShow() {
    this.PlayMontageStart();
    this.BNe();
    var e = this.Suo();
    if (e) {
      e.Montage_Stop(0);
    }
    this.bl();
  }
  PlayMontageStart() {
    RoleController_1.RoleController.PlayRoleMontage(13);
  }
  yuo() {
    var e = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    if (e) {
      e = e.Model?.CheckGetComponent(1)?.MainMeshComponent;
      if (e) {
        return e;
      }
    }
  }
  Suo() {
    var e = this.yuo();
    if (e) {
      return e.GetAnimInstance().GetLinkedAnimGraphInstanceByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_BASE);
    }
  }
}
exports.RoleFavorTabView = RoleFavorTabView;
//# sourceMappingURL=RoleFavorTabView.js.map