"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlySkinShowView = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const EffectUtil_1 = require("../../Utils/EffectUtil");
const UiCameraInputComponent_1 = require("../Common/UiCamera/UiCameraInputComponent");
const HelpController_1 = require("../Help/HelpController");
const UiCameraControlRotationComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraControlRotationComponent");
const UiCameraManager_1 = require("../UiCamera/UiCameraManager");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../UiModel/UiModelUtil");
const LguiUtil_1 = require("../Util/LguiUtil");
const SkinDefine_1 = require("./SkinDefine");
const FlySkinDefine_1 = require("./Tab/Fly/FlySkinDefine");
class FlySkinShowView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Idm = undefined;
    this.y31 = 1;
    this.Vkc = undefined;
    this.CameraInputComponent = new UiCameraInputComponent_1.UiCameraInputComponent();
    this.x01 = undefined;
    this.lqe = undefined;
    this.U01 = false;
    this.$Ge = () => {
      this.CloseMe();
    };
    this.Lyl = () => {
      const i = this.GetItem(28).bIsUIActive;
      if (i) {
        this.PlaySequence("UiOut", () => {
          if (!this.IsDestroyOrDestroying) {
            this.GetItem(28).SetUIActive(!i);
          }
        }, true);
      } else {
        this.GetItem(28).SetUIActive(!i);
        this.PlaySequence("UiIn", () => {}, true);
      }
      this.GetItem(46)?.SetUIActive(i);
      this.CameraInputComponent.CanCameraInput = i;
      this.x11();
    };
    this.mmo = i => {
      if (i.HandleName === this.x01) {
        this.x01 = undefined;
        if (!this.U01) {
          this.U01 = true;
          this.TryLoadModel();
        }
      }
    };
    this.dtt = () => {
      HelpController_1.HelpController.OpenHelpById(SkinDefine_1.FLY_SKIN_HELP_ID);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIExtendToggle], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIExtendToggle], [9, UE.UIItem], [10, UE.UIHorizontalLayout], [11, UE.UIItem], [14, UE.UITexture], [12, UE.UIText], [13, UE.UIItem], [15, UE.UIText], [16, UE.UIText], [17, UE.UIButtonComponent], [18, UE.UIItem], [19, UE.UIText], [20, UE.UIItem], [21, UE.UIText], [22, UE.UITexture], [23, UE.UITexture], [24, UE.UITexture], [25, UE.UIItem], [26, UE.UITexture], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIDraggableComponent], [30, UE.UITexture], [31, UE.UIExtendToggle], [32, UE.UIItem], [33, UE.UIItem], [34, UE.UITexture], [35, UE.UIText], [36, UE.UITexture], [37, UE.UIText], [45, UE.UIItem], [46, UE.UIItem], [51, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Lyl]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
  }
  OnStart() {
    var i = this.OpenParam;
    this.Idm = ModelManager_1.ModelManager.FlySkinModel.GetFlySkinData(i);
    this.y31 = this.Idm.GetFlySkinConfig().SkinType;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.$Ge);
    this.lqe.SetTitleLocalText("FlySkinShopTitle_Text");
    this.lqe.SetTitleIconByResourceId("FlySkinShopTitle_Icon");
    this.lqe.SetHelpBtnActive(false);
    this.lqe.SetHelpCallBack(this.dtt);
    this.GetItem(7).SetUIActive(false);
    this.GetItem(25).SetUIActive(false);
    this.GetItem(13).SetUIActive(false);
    this.GetButton(2).RootUIComp.SetUIActive(false);
    this.GetItem(45)?.SetUIActive(false);
    this.GetItem(46)?.SetUIActive(false);
    this.GetButton(3)?.RootUIComp.SetUIActive(false);
    this.GetButton(4)?.RootUIComp.SetUIActive(false);
    this.GetItem(51)?.SetUIActive(false);
    this.GetItem(9).SetUIActive(false);
  }
  OnHandleLoadScene() {
    this.Kkc();
    this.InitCameraInputData();
  }
  Kkc() {
    UiSceneManager_1.UiSceneManager.InitGliderSkeletalHandle();
    var i = UiSceneManager_1.UiSceneManager.GetGliderSkeletalHandle();
    i.Model.CheckGetComponent(1).SetTransformByTag(FlySkinDefine_1.DEFAULT_FLY_SKIN_CASE);
    this.Vkc = i;
  }
  InitCameraInputData() {
    var i;
    var e = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig("翱翔滑翔皮肤旋转查看");
    if (this.Vkc?.Model) {
      i = FlySkinDefine_1.flySkinTypeToCase[this.y31];
      i = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(i), 1).D_K2_GetActorLocation();
      e = {
        DragComponent: this.GetDraggable(29),
        CameraSettingConfig: e,
        SourceLocation: i
      };
      this.CameraInputComponent.InitData(e);
      this.CameraInputComponent.CanCameraInput = false;
    }
  }
  OnBeforeShow() {
    this.x11();
    this.TryLoadModel();
    this.Og();
    this.CameraInputComponent.Start();
    this.CameraInputComponent.TryActivate();
  }
  Og() {
    var i;
    if (this.Idm) {
      i = this.Idm.GetSkinGrade() === 1;
      this.GetItem(33).SetUIActive(i);
      this.GetItem(32).SetUIActive(i);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), this.Idm.GetTitleName());
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), this.Idm.GetSubTitle());
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), this.Idm.GetDesc());
      this.SetTextureByPath(this.Idm.GetPreviewTextureInBuyView(), this.GetTexture(23));
      this.SetTextureByPath(this.Idm.GetBuyPreviewQualityBgPath(), this.GetTexture(22));
      this.GetItem(18).SetUIActive(false);
      this.GetItem(20).SetUIActive(false);
    }
  }
  x11() {
    var i = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinModelCameraId(this.y31);
    this.x01 = i;
    UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(i, true, true, "10010");
  }
  TryLoadModel() {
    var i = this.Vkc?.Model;
    if (i) {
      var e = FlySkinDefine_1.flySkinTypeToCase[this.y31];
      if (this.U01) {
        var t = ConfigManager_1.ConfigManager.SkinConfig;
        var n = this.y31;
        var r = this.Idm.GetFlySkinConfig();
        const a = r.StandAnim;
        var s = t.GetFlySkinSpawnEffectId(n);
        var t = t.GetFlySkinSpawnMaterialController(n);
        var n = EffectUtil_1.EffectUtil.GetEffectPath(s);
        const o = EffectUtil_1.EffectUtil.GetEffectPath(t);
        s = [a, n, o];
        const h = i.CheckGetComponent(2);
        const U = i.CheckGetComponent(1);
        U.SetTransformByTag(e);
        h.LoadModelByModelId(r.ModelId, true, () => {
          var i;
          var e;
          var t = this.Vkc?.Model;
          if (t) {
            UiModelUtil_1.UiModelUtil.SetVisible(t, true);
            if (!(i = h?.GetLoadedResource(a))) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("UiCommon", 71, "[FlySkin] 商城飞行皮肤待机动画预加载失败");
              }
            }
            t.CheckGetComponent(10).PlayAnimation(i, true);
            i = t.CheckGetComponent(5);
            if (e = h.GetLoadedResource(o)) {
              i?.AddRenderingMaterialByData(e);
            }
            UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(t, "GliderEffect");
          }
        }, s);
      } else {
        UiModelUtil_1.UiModelUtil.SetVisible(i, false);
        const U = i.CheckGetComponent(1);
        U.SetTransformByTag(e);
      }
    }
  }
  OnBeforeHide() {
    this.CameraInputComponent?.End();
  }
  OnBeforeDestroy() {
    UiCameraManager_1.UiCameraManager.Get().DestroyUiCameraComponent(UiCameraControlRotationComponent_1.UiCameraControlRotationComponent);
    this.Xkc();
  }
  Xkc() {
    UiSceneManager_1.UiSceneManager.DestroyGliderSkeletalHandle();
    this.Vkc = undefined;
  }
}
exports.FlySkinShowView = FlySkinShowView;
//# sourceMappingURL=FlySkinShowView.js.map