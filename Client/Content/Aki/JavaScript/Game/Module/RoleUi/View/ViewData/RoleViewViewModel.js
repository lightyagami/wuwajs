"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleViewViewModel = undefined;
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const EffectUtil_1 = require("../../../../Utils/EffectUtil");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const RoleController_1 = require("../../RoleController");
class RoleViewViewModel {
  constructor(e, t, i = 0, o = 0) {
    this.RoleId = 0;
    this.WeaponIncId = 0;
    this.WeaponConfigId = 0;
    this.IsNeedLoadRole = false;
    this.TsUiSceneRoleActor = undefined;
    this.N4d = false;
    this.Nlo = 0;
    this.RoleId = e;
    this.WeaponIncId = i;
    this.WeaponConfigId = o;
    this.IsNeedLoadRole = t;
  }
  async InitRoleActor() {
    var e;
    if (this.IsNeedLoadRole) {
      if (!this.TsUiSceneRoleActor && !this.N4d) {
        this.N4d = true;
        this.TsUiSceneRoleActor = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1);
        e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.RoleId);
        await RoleController_1.RoleController.RefreshUiSceneRoleActorAsync(this.TsUiSceneRoleActor, this.RoleId, e.GetRoleSkinId());
      }
    } else {
      this.TsUiSceneRoleActor = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    }
  }
  HandleLoadScene(e) {
    this.InitRoleActor().then(() => {
      this.TVd();
      this.TsUiSceneRoleActor.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
      e?.();
    });
  }
  ShowActor() {
    var e = this.RoleId;
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    if (t) {
      RoleController_1.RoleController.OnSelectedRoleChange(e, t.GetRoleSkinId());
    }
    UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor();
  }
  HideActor() {
    UiSceneManager_1.UiSceneManager.HideRoleSystemRoleActor();
  }
  TVd() {
    var e = UiSceneManager_1.UiSceneManager.GetActorByTag("RoleFloorCase");
    if (e) {
      this.Nlo = EffectUtil_1.EffectUtil.SpawnUiEffect("RoleSystemFloorEffect", "[RoleRootView.LoadFloorEffect]", e.D_GetTransform(), new EffectContext_1.EffectContext(undefined, e));
    }
  }
  HandleReleaseScene() {
    this.HideActor();
    if (EffectSystem_1.EffectSystem.IsValid(this.Nlo)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.Nlo, "[RoleRootView.HandleReleaseScene]", false);
    }
    UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.TsUiSceneRoleActor);
    this.TsUiSceneRoleActor = undefined;
    UiSceneManager_1.UiSceneManager.ClearUiSequenceFrame();
    this.RoleId = 0;
    this.WeaponIncId = 0;
    this.IsNeedLoadRole = false;
    this.N4d = false;
  }
}
exports.RoleViewViewModel = RoleViewViewModel;
//# sourceMappingURL=RoleViewViewModel.js.map