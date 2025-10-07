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
const UiModelUtil_1 = require("../../../UiModel/UiModelUtil");
const RoleController_1 = require("../../RoleController");
class RoleViewViewModel {
  constructor(e, t) {
    this.RoleId = 0;
    this.WeaponIncId = 0;
    this.IsNeedLoadRole = false;
    this.TsUiSceneRoleActor = undefined;
    this.RoleStatePlayContextOnShow = undefined;
    this.RoleStatePlayContextOnHide = undefined;
    this.NeedShowOnViewPlayingStartSequence = false;
    this.NeedHideOnViewPlayingCloseSequence = false;
    this.N4d = false;
    this.Nlo = 0;
    this.FadeInCurveId = "None";
    this.FadeOutCurveId = "None";
    this.RoleId = e;
    this.IsNeedLoadRole = t;
  }
  async InitRoleActor() {
    var e;
    var t;
    var i;
    var o;
    if (this.IsNeedLoadRole) {
      if (!this.TsUiSceneRoleActor && !this.N4d) {
        this.N4d = true;
        this.TsUiSceneRoleActor = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1);
        o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.RoleId);
        await RoleController_1.RoleController.RefreshUiSceneRoleActorAsync(this.TsUiSceneRoleActor, this.RoleId, o.GetRoleSkinId());
      }
    } else {
      this.TsUiSceneRoleActor = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
      o = this.RoleId;
      if (e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o)) {
        t = e.GetRoleSkinId();
        if ((i = this.TsUiSceneRoleActor.Model.GetComponent(13)).RoleConfigId !== o || i.RoleSkinId !== t) {
          RoleController_1.RoleController.OnSelectedRoleChange(o, e.GetRoleSkinId());
        }
      }
    }
  }
  HandleLoadScene(e) {
    this.InitRoleActor().then(() => {
      e?.();
    });
    this.TVd();
    this.TsUiSceneRoleActor.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
  }
  ShowActor() {
    UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor();
    if (this.FadeOutCurveId !== "None") {
      UiModelUtil_1.UiModelUtil.ModelFadeOut(this.TsUiSceneRoleActor.Model, this.FadeOutCurveId);
    }
    if (this.RoleStatePlayContextOnShow) {
      RoleController_1.RoleController.PlayRoleMontage(this.RoleStatePlayContextOnShow.RoleState, this.RoleStatePlayContextOnShow.ReLoop, this.RoleStatePlayContextOnShow.ReLoopFromLoopToStart, this.RoleStatePlayContextOnShow.WaitLaseStateEnd);
    }
  }
  HideActor() {
    if (this.FadeInCurveId !== "None") {
      UiModelUtil_1.UiModelUtil.ModelFadeIn(this.TsUiSceneRoleActor.Model, this.FadeInCurveId, () => {
        UiSceneManager_1.UiSceneManager.HideRoleSystemRoleActor();
      });
    } else {
      UiSceneManager_1.UiSceneManager.HideRoleSystemRoleActor();
    }
    if (this.RoleStatePlayContextOnHide) {
      RoleController_1.RoleController.PlayRoleMontage(this.RoleStatePlayContextOnHide.RoleState, this.RoleStatePlayContextOnHide.ReLoop, this.RoleStatePlayContextOnHide.ReLoopFromLoopToStart, this.RoleStatePlayContextOnHide.WaitLaseStateEnd);
    }
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
    this.IsNeedLoadRole = true;
    this.N4d = false;
  }
}
exports.RoleViewViewModel = RoleViewViewModel;
//# sourceMappingURL=RoleViewViewModel.js.map