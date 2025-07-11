"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleHandBookSelectionView = exports.ROLE_HAND_BOOK_BLENDNAME = undefined;
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectContext_1 = require("../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const EffectUtil_1 = require("../../Utils/EffectUtil");
const RoleController_1 = require("../RoleUi/RoleController");
const RoleDefine_1 = require("../RoleUi/RoleDefine");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const RoleHandBookSelectionComponent_1 = require("./RoleHandBookSelectionComponent");
exports.ROLE_HAND_BOOK_BLENDNAME = "10061";
class RoleHandBookSelectionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.RoleSelectionComponent = undefined;
    this.Nlo = 0;
    this.RoleList = undefined;
    this.xVi = undefined;
    this.RoleRootUiCameraHandleData = undefined;
    this.TTt = () => {
      var e;
      if (this.RoleSelectionComponent && (e = this.RoleSelectionComponent.GetCurSelectRoleId())) {
        this.RoleSelectionComponent.UpdateItemByRoleId(e);
      }
    };
    this.Olo = e => {
      if (this.RoleSelectionComponent) {
        RoleController_1.RoleController.ShowUiSceneActorAndShadow(false);
        this.SetActive(false);
        this.RoleSelectionComponent.PlaySequence();
      }
    };
    this.RoleSelectionSelectedEvent = e => {
      if (ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId() !== e && (RoleController_1.RoleController.PlayRoleMontage(1), UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName("10061", true, true, "1001"), this.RoleSelectionComponent)) {
        this.RoleSelectionComponent.UpdateRoleHandBookItem(e);
      }
    };
  }
  OnHandleLoadScene() {
    this.RoleRootUiCameraHandleData = UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(RoleDefine_1.ROLE_CAMERA_SETTING_NAME, false);
  }
  OnHandleReleaseScene() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(this.RoleRootUiCameraHandleData);
    this.RoleRootUiCameraHandleData = undefined;
  }
  OnStart() {
    this.RoleSelectionComponent = new RoleHandBookSelectionComponent_1.RoleHandBookSelectionComponent();
    this.LoadFloorEffect();
  }
  OnAfterShow() {
    var e;
    RoleController_1.RoleController.PlayRoleMontage(1);
    UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName("10061", true, true, "1001");
    if (this.RoleSelectionComponent) {
      e = this.RoleSelectionComponent.GetCurSelectRoleId();
      this.RoleSelectionComponent.UpdateComponent(this.RoleList);
      this.RoleSelectionComponent.UpdateRoleHandBookItem(e);
    }
    RoleController_1.RoleController.ShowUiSceneActorAndShadow(true);
  }
  OnAddEventListener() {
    super.OnAddEventListener();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleHandBookActive, this.Olo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddCommonItemList, this.TTt);
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleHandBookActive, this.Olo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddCommonItemList, this.TTt);
  }
  InitRoleList() {
    var t = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.RoleConfig.GetRoleListByType(1));
    t.sort((e, t) => e.Id - t.Id);
    var i = t.length;
    this.RoleList = [];
    for (let e = 0; e < i; e++) {
      var o = t[e];
      if (o.PartyId !== 9) {
        o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o.Id);
        this.RoleList.push(o);
      }
    }
  }
  LoadFloorEffect() {
    var e = UiSceneManager_1.UiSceneManager.GetActorByTag("RoleFloorCase");
    if (e) {
      this.Nlo = EffectUtil_1.EffectUtil.SpawnUiEffect("RoleSystemFloorEffect", "[RoleHandBookSelectionView.LoadFloorEffect]", e.D_GetTransform(), new EffectContext_1.EffectContext(undefined, e));
    }
  }
  OnAfterHide() {
    if (EffectSystem_1.EffectSystem.IsValid(this.Nlo)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.Nlo, "[RoleHandBookSelectionView.OnHide]", false);
    }
  }
  OnBeforeCreate() {
    this.xVi = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1);
  }
  OnBeforeDestroy() {
    UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.xVi);
    if (EffectSystem_1.EffectSystem.IsValid(this.Nlo)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.Nlo, "[RoleHandBookSelectionView.OnDestroy]", true);
      this.Nlo = 0;
    }
    this.RoleList = undefined;
  }
}
exports.RoleHandBookSelectionView = RoleHandBookSelectionView;
//# sourceMappingURL=RoleHandBookSelectionView.js.map