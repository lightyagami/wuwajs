"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EquipBuffItemDetailView = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const InputSettings_1 = require("../../InputSettings/InputSettings");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const RenderUtil_1 = require("../../Render/Utils/RenderUtil");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const TouchFingerDefine_1 = require("../../Ui/TouchFinger/TouchFingerDefine");
const TouchFingerManager_1 = require("../../Ui/TouchFinger/TouchFingerManager");
const UiCameraControlRotationComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraControlRotationComponent");
const UiCameraManager_1 = require("../UiCamera/UiCameraManager");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../UiModel/UiModelUtil");
const LguiUtil_1 = require("../Util/LguiUtil");
const disableNodeList = [6, 7, 9, 50, 13, 47, 51, 52, 53, 8, 31, 3, 4];
class EquipBuffItemDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.C0t = undefined;
    this.Syl = 0;
    this.lqe = undefined;
    this.dmo = undefined;
    this.x8i = undefined;
    this.A8i = undefined;
    this.Sql = 0;
    this.Eqt = (e, i) => {
      if (i.TouchType === 2) {
        this.Egt();
      }
    };
    this.w8i = e => {
      this.x8i = e.GetLocalPointInPlane();
    };
    this.B8i = e => {
      var i;
      if (TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1 || InputSettings_1.InputSettings.IsInputKeyDown("RightMouseButton")) {
        this.x8i = undefined;
      } else {
        i = this.x8i;
        this.x8i = e.GetLocalPointInPlane();
        if (i && (e = this.x8i.X - i.X, i = this.x8i.Y - i.Y, e != 0 && this.A8i.AddYawInput(e), i != 0)) {
          this.A8i.AddPitchInput(i);
        }
      }
    };
    this.b8i = e => {
      this.x8i = undefined;
    };
    this.N8i = e => {
      if (e.scrollAxisValue !== 0) {
        this.A8i.AddZoomInput(-e.scrollAxisValue);
      }
    };
    this.q8i = e => {
      if (e !== 0 && Info_1.Info.IsInGamepad()) {
        this.A8i.AddPitchInput(-e);
      }
    };
    this.G8i = e => {
      if (e !== 0 && Info_1.Info.IsInGamepad()) {
        this.A8i.AddYawInput(e);
      }
    };
    this.PUn = (e, i) => {
      if (i !== 0 && Info_1.Info.IsInGamepad()) {
        this.A8i.AddZoomInput(i);
      }
    };
    this._mo = () => {
      var e = UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData();
      if (e) {
        UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(e.HandleName, true, true, "1001");
      }
    };
    this.A5e = () => !(TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.Sql < ConfigManager_1.ConfigManager.SkinConfig.GetSkinDetailButtonSwitchGap());
    this.$Oe = () => {
      this.CloseMe();
    };
    this.cmo = () => {
      this.A8i?.PauseTick();
    };
    this.mmo = e => {
      this.Tyl();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIExtendToggle], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIExtendToggle], [9, UE.UIItem], [10, UE.UIHorizontalLayout], [11, UE.UIItem], [14, UE.UITexture], [12, UE.UIText], [13, UE.UIItem], [15, UE.UIText], [16, UE.UIText], [17, UE.UIButtonComponent], [18, UE.UIItem], [19, UE.UIText], [20, UE.UIItem], [21, UE.UIText], [22, UE.UITexture], [23, UE.UITexture], [24, UE.UITexture], [25, UE.UIItem], [26, UE.UITexture], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIDraggableComponent], [30, UE.UITexture], [31, UE.UIExtendToggle], [32, UE.UIItem], [33, UE.UIItem], [34, UE.UITexture], [35, UE.UIText], [36, UE.UITexture], [37, UE.UIText], [38, UE.UIItem], [39, UE.UIItem], [40, UE.UIText], [43, UE.UITexture], [42, UE.UIText], [41, UE.UITexture], [44, UE.UIText], [45, UE.UIItem], [46, UE.UIItem], [47, UE.UIItem], [48, UE.UIExtendToggle], [49, UE.UIExtendToggle], [50, UE.UIText], [51, UE.UIItem], [52, UE.UIItem], [53, UE.UIItem]];
  }
  OnAddEventListener() {
    var e = this.GetDraggable(29);
    e.OnPointerBeginDragCallBack.Bind(this.w8i);
    e.OnPointerDragCallBack.Bind(this.B8i);
    e.OnPointerEndDragCallBack.Bind(this.b8i);
    e.OnPointerScrollCallBack.Bind(this.N8i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerRoleLookUp, this.q8i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerRoleTurn, this.G8i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerRoleZoom, this.PUn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerRoleReset, this._mo);
    InputDistributeController_1.InputDistributeController.BindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2], this.Eqt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayCameraAnimationStart, this.cmo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
  }
  pmo() {
    var e = this.GetDraggable(29);
    e.OnPointerBeginDragCallBack.Unbind();
    e.OnPointerDragCallBack.Unbind();
    e.OnPointerEndDragCallBack.Unbind();
    e.OnPointerScrollCallBack.Unbind();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerRoleLookUp, this.q8i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerRoleTurn, this.G8i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerRoleZoom, this.PUn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerRoleReset, this._mo);
    InputDistributeController_1.InputDistributeController.UnBindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2], this.Eqt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayCameraAnimationStart, this.cmo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
  }
  OnHandleLoadScene() {
    this.dmo?.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
  }
  Egt() {
    var e;
    if (TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1) {
      e = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(TouchFingerDefine_1.EFingerIndex.One, TouchFingerDefine_1.EFingerIndex.Two);
      this.A8i.AddZoomInput(-e);
    }
  }
  OnBeforeShow() {
    var e = this.dmo?.Model;
    if (e) {
      UiModelUtil_1.UiModelUtil.SetVisible(e, true);
    }
    var e = CommonParamById_1.configCommonParamById.GetStringConfig("ShopPreviewCharacterSkinIcon");
    var i = CommonParamById_1.configCommonParamById.GetStringConfig("ShopPreviewCharacterSkinPackIcon");
    this.SetTextureByPath(e, this.GetTexture(34));
    this.SetTextureByPath(i, this.GetTexture(36));
    var e = CommonParamById_1.configCommonParamById.GetStringConfig("ShopPreviewCharacterSkinText");
    var i = CommonParamById_1.configCommonParamById.GetStringConfig("ShopPreviewCharacterSkinPackText");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(35), e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(37), i);
    this.GetItem(45)?.SetUIActive(true);
    this.GetItem(46)?.SetUIActive(false);
    this.Og();
    for (const t of disableNodeList) {
      this.GetItem(t)?.SetUIActive(false);
    }
  }
  OnAfterShow() {
    this.Tyl();
    RenderUtil_1.RenderUtil.BeginPSOSyncMode();
  }
  OnAfterHide() {
    var e = this.dmo?.Model;
    if (e) {
      UiModelUtil_1.UiModelUtil.SetVisible(e, false);
    }
    RenderUtil_1.RenderUtil.EndPSOSyncMode();
  }
  Tyl() {
    var e;
    if (!UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation()) {
      e = this.Syl === 0 ? ConfigManager_1.ConfigManager.PayShopConfig.GetBuySkinDetailRoleCameraConfigId() : ConfigManager_1.ConfigManager.PayShopConfig.GetBuySkinDetailWeaponCameraConfigId();
      this.Ayl(e);
    }
  }
  Ayl(e) {
    var i = UiCameraManager_1.UiCameraManager.Get();
    this.A8i = i.AddUiCameraComponent(UiCameraControlRotationComponent_1.UiCameraControlRotationComponent, false);
    var i = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig(e);
    this.A8i.InitDataByConfig(i);
    this.A8i.SetNeedFloorReflection(true);
    e = this.dmo.D_K2_GetActorLocation();
    i = this.C0t.RoleSkinData.GetRoleId();
    i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i).RoleBody;
    i = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraOffsetConfig(i);
    this.A8i.UpdateData(e, i.镜头浮动最大高度, i.镜头浮动最低高度, i.镜头浮动最长臂长, i.镜头浮动最短臂长);
    this.A8i.Activate();
    this.A8i.ResumeTick();
  }
  OnStart() {
    this.dmo = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(22);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.$Oe);
    this.C0t = this.OpenParam;
    this.lqe.SetTitleLocalText("TotalTopUp_1003");
    this.lqe.SetTitleIconByResourceId("EquipBuffItemDetailTitle_Icon");
    this.lqe.SetHelpBtnActive(false);
    this.GetExtendToggle(8).CanExecuteChange.Bind(this.A5e);
    this.GetExtendToggle(31).CanExecuteChange.Bind(this.A5e);
    this.Uyl();
  }
  OnBeforeHide() {
    this.pmo();
    this.A8i.PauseTick();
  }
  OnBeforeDestroy() {
    UiCameraManager_1.UiCameraManager.Get().DestroyUiCameraComponent(UiCameraControlRotationComponent_1.UiCameraControlRotationComponent);
    UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.dmo);
    this.dmo = undefined;
  }
  xyl() {
    ControllerHolder_1.ControllerHolder.RoleController.RefreshUiSceneRoleActorByConfigId(this.C0t.RoleSkinData.GetRoleId(), this.C0t.RoleSkinData.GetItemId(), () => {});
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectedRoleChanged);
  }
  OnHandleReleaseScene() {
    this.UDn();
  }
  UDn() {}
  Uyl() {
    this.Syl = 0;
  }
  Og() {
    this.Nft(this.C0t);
    this.Iwn(this.C0t);
    this.xyl();
  }
  Iwn(e) {
    if (e) {
      e = e.Description;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), e);
    } else {
      this.GetText(12).SetText("");
    }
  }
  Nft(e) {
    if (e) {
      e = e.TitleName;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e);
    } else {
      this.GetText(5).SetText("");
    }
  }
}
exports.EquipBuffItemDetailView = EquipBuffItemDetailView;
//# sourceMappingURL=EquipBuffItemDetailView.js.map