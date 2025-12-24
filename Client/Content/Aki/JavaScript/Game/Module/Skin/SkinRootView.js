"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkinRootView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../Core/Common/Info");
const Time_1 = require("../../../Core/Common/Time");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const EffectContext_1 = require("../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const EffectUtil_1 = require("../../Utils/EffectUtil");
const CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem");
const TabViewComponent_1 = require("../Common/TabComponent/TabViewComponent");
const HelpController_1 = require("../Help/HelpController");
const RoleController_1 = require("../RoleUi/RoleController");
const RoleDefine_1 = require("../RoleUi/RoleDefine");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const SkinTabItem_1 = require("./Role/Item/SkinTabItem");
class SkinRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TabViewComponent = undefined;
    this.TabComponent = undefined;
    this.TabDataList = [];
    this.yil = undefined;
    this.L6e = 0;
    this.Nlo = 0;
    this.c8l = false;
    this.R6e = e => new SkinTabItem_1.SkinTabItem();
    this.pqe = e => {
      this.L6e = Time_1.Time.Now;
      var t = this.TabDataList[e];
      var i = t.ChildViewName;
      var e = this.TabComponent.GetTabItemByIndex(e);
      this.TabViewComponent.ToggleCallBack(t, i, e, this.yil);
      this.TabComponent.SetHelpButtonShowState(this.yil.HelpIdMap.has(i));
      this.yil.CurSelectTabViewName = i;
      this.RefreshGamePadKeyTip();
    };
    this.yqe = e => {
      e = this.TabDataList[e];
      return new CommonTabData_1.CommonTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(e.TabName));
    };
    this.CanToggleChange = e => {
      var t;
      return !!Info_1.Info.IsInGamepad() || (t = CommonParamById_1.configCommonParamById.GetIntConfig("panel_interval_time"), !this.L6e) || Time_1.Time.Now - this.L6e >= t;
    };
    this.pcr = () => {
      var e = this.TabViewComponent.GetCurrentTabViewName();
      if (e &&= this.yil.HelpIdMap.get(e)) {
        HelpController_1.HelpController.OpenHelpById(e);
      }
    };
  }
  OnRegisterComponent() {
    this.yil = this.OpenParam;
    this.yil.RegisterView(this);
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIDraggableComponent], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnStart() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), e, this.yil.CloseView);
    this.TabComponent.SetHelpButtonCallBack(this.pcr);
    this.TabComponent.SetCanChange(this.CanToggleChange);
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
    AudioSystem_1.AudioSystem.SetState(RoleDefine_1.ROLE_MUTE_NATURE_AUDIO_GROUP, "mute");
  }
  OnHandleLoadScene() {
    var e;
    UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor();
    if (this.yil.NeedLoadRole && (e = UiSceneManager_1.UiSceneManager.GetActorByTag("RoleFloorCase"))) {
      this.Nlo = EffectUtil_1.EffectUtil.SpawnUiEffect("RoleSystemFloorEffect", "[RoleRootView.LoadFloorEffect]", e.D_GetTransform(), new EffectContext_1.EffectContext(undefined, e));
    }
  }
  async OnHandlePostLoadSceneAsync(e) {
    if (!this.yil.TsUiSceneRoleActor) {
      if (this.yil.NeedLoadRole) {
        await this.Jjd();
      } else {
        this.yil.TsUiSceneRoleActor = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
      }
    }
  }
  async Jjd() {
    var e;
    if (!this.c8l) {
      this.c8l = true;
      this.yil.TsUiSceneRoleActor = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(12);
      e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.yil.RoleId);
      await RoleController_1.RoleController.RefreshUiSceneRoleActorAsync(this.yil.TsUiSceneRoleActor, this.yil.RoleId, e.GetRoleSkinId());
      if (UiSceneManager_1.UiSceneManager.GetActorByTag("RoleCase")) {
        this.yil.TsUiSceneRoleActor.Model.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
      }
    }
  }
  OnHandleReleaseScene() {
    UiSceneManager_1.UiSceneManager.HideRoleSystemRoleActor();
    if (this.yil.NeedLoadRole && EffectSystem_1.EffectSystem.IsValid(this.Nlo)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.Nlo, "[RoleRootView.HandleReleaseScene]", false);
    }
  }
  OnBeforeShow() {
    this.UpdateDynamicTabComponent();
    this.RefreshGamePadKeyTip();
  }
  UpdateDynamicTabComponent() {
    this.TabDataList = ModelManager_1.ModelManager.RoleSkinModel.GetSkinTabList(this.yil.IsMainRole);
    var t = this.TabDataList.length;
    var i = this.TabComponent.CreateTabItemDataByLength(t);
    for (let e = 0; e < t; e++) {
      var o = this.TabDataList[e].ChildViewName;
      var o = this.yil.GetTabRedDotName(o);
      i[e].RedDotName = o;
    }
    this.TabComponent.RefreshTabItem(i, () => {
      let t = 0;
      for (let e = 0; e < this.TabDataList.length; e++) {
        if (this.TabDataList[e].ChildViewName === this.yil.CurSelectTabViewName) {
          t = e;
          break;
        }
      }
      this.TabComponent.SelectToggleByIndex(t, true);
    });
  }
  OnAddEventListener() {
    this.yil.AddEventListener();
  }
  OnRemoveEventListener() {
    this.yil.RemoveEventListener();
  }
  OnBeforeHide() {
    this.TabViewComponent.HideCurrentTabView();
    if (this.LastHide) {
      this.yil.BeforeDestroy();
    }
  }
  OnBeforeDestroy() {
    AudioSystem_1.AudioSystem.SetState(RoleDefine_1.ROLE_MUTE_NATURE_AUDIO_GROUP, "none");
    this.m8l();
  }
  m8l() {
    if (this.c8l) {
      this.c8l = false;
      UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.yil.TsUiSceneRoleActor);
      this.yil.TsUiSceneRoleActor = undefined;
    }
  }
  HideView() {
    this.TabComponent.SetUiActive(false);
  }
  ShowView() {
    this.TabComponent.SetUiActive(true);
  }
  RefreshGamePadKeyTip() {
    var e;
    this.GetItem(3)?.SetUIActive(false);
    this.GetItem(4)?.SetUIActive(false);
    if (this.yil.CurSelectTabViewName === "RoleSkinTabView") {
      this.GetItem(3)?.SetUIActive(true);
    } else if (this.yil.CurSelectTabViewName === "FlySkinTabView") {
      e = !this.TabComponent.IsUiActiveInHierarchy();
      this.GetItem(4)?.SetUIActive(e);
    }
  }
  SetMoveGamepadKeyTipActive(e) {
    this.GetItem(4)?.SetUIActive(e);
  }
  GetDragItem() {
    return this.GetDraggable(2);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    const t = Number(e[0]);
    e = this.TabComponent?.GetTabItemByIndex(this.TabDataList.findIndex(e => e.Id === t))?.GetRootItem();
    if (e) {
      return [e, e];
    }
  }
}
exports.SkinRootView = SkinRootView;
//# sourceMappingURL=SkinRootView.js.map