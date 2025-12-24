"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionIntensifyView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../../Common/TabComponent/TabComponentWithCaptionItem");
const VisionTabItem_1 = require("../../../Common/TabComponent/TabItem/VisionTabItem");
const TabViewComponent_1 = require("../../../Common/TabComponent/TabViewComponent");
const HelpController_1 = require("../../../Help/HelpController");
const ItemDefines_1 = require("../../../Item/Data/ItemDefines");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const VisionDefine_1 = require("../VisionDefine");
const VISION_INTENSIFY_HELPID = 32;
class VisionIntensifyView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TabComponent = undefined;
    this.TabViewComponent = undefined;
    this.yvt = [];
    this.aji = 0;
    this.PTt = [];
    this.I6e = 0;
    this.lji = e => {
      this.TabComponent.SetCloseBtnShowState(e);
    };
    this._ji = () => {
      this.TabComponent.SelectToggleByIndex(1);
    };
    this.uji = () => {
      if (!(ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(this.aji).GetQuality() <= VisionDefine_1.CANNOTLEVELSUBQUALITY)) {
        this.ovm();
      }
    };
    this.CanToggleChange = e => {
      var e = this.yvt[e];
      return !VisionDefine_1.tabViewWithLock.has(e.ChildViewName) || (!(e = this.cji(e)).IsUnlocked && e.Message && ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(e.Message), e.IsUnlocked);
    };
    this.R6e = (e, i) => {
      return new VisionTabItem_1.VisionTabItem();
    };
    this.pqe = e => {
      var i = this.yvt[e];
      var t = i.ChildViewName;
      var n = this.TabComponent.GetTabItemByIndex(e);
      var o = this.TabViewComponent.GetCurrentTabView();
      if (o) {
        o.HideUiTabView(false);
      }
      this.SetCurrencyItemList(t);
      var o = this.CreateExtraParams(t);
      this.TabViewComponent.ToggleCallBack(i, t, n, o);
      this.TabComponent.SetHelpButtonCallBack(this.mji);
      this.iId(t);
      this.I6e = e;
    };
    this.mji = () => {
      HelpController_1.HelpController.OpenHelpById(VISION_INTENSIFY_HELPID);
    };
    this.yqe = e => {
      e = this.yvt[e];
      return new CommonTabData_1.CommonTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(e.TabName));
    };
    this.CloseClick = () => {
      this.CloseMe();
    };
    this.rId = () => {
      this.ovm();
      this.TabComponent.SelectToggleByIndex(this.I6e, true);
      this.TabViewComponent.SetCurrentTabViewState(true);
      this.K8e();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshVisionIdentifyRedPoint, this.aji);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnStart() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), e, this.CloseClick);
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
    this.TabComponent.SetHelpButtonShowState(true);
    this.TabComponent.SetCanChange(this.CanToggleChange);
    this.GetItem(2).SetUIActive(false);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionIntensifyViewShow, true);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshVisionIntensifyViewBackBtnState, this.lji);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PhantomLevelUp, this.uji);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnClickVisionIntensifyItemJump, this._ji);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshVisionIntensifyViewBackBtnState, this.lji);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PhantomLevelUp, this.uji);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnClickVisionIntensifyItemJump, this._ji);
  }
  cji(e) {
    switch (e.ChildViewName) {
      case "VisionIdentifyView":
        var i = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(this.aji);
        var t = i.GetSubPropUnlockLevel(0);
        var i = i.GetPhantomLevel() >= t;
        if (i) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.VisionIntensifyTabOpen);
        }
        return {
          IsUnlocked: i,
          Message: i ? undefined : "VisionIdentifyLock"
        };
      case "VisionRefineTabView":
        if (ModelManager_1.ModelManager.FunctionModel.IsOpen(e.FunctionId)) {
          return {
            IsUnlocked: t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(this.aji).GetVisionIfCanRefine(),
            Message: t ? undefined : "Text_PhantomRefineConditionUnfit_Text"
          };
        } else {
          return {
            IsUnlocked: false,
            Message: "Text_PhantomRefineNotOpen_Text"
          };
        }
      default:
        return {
          IsUnlocked: true,
          Message: undefined
        };
    }
  }
  OnBeforePlayCloseSequence() {
    var e = this.TabViewComponent.GetCurrentTabView();
    if (e) {
      new UiSequencePlayer_1.UiSequencePlayer(e.GetRootItem()).PlaySequence("Close");
    }
  }
  iId(e) {
    if (e === "VisionRefineTabView") {
      this.oId();
    } else {
      this.nId();
    }
  }
  nId() {
    var e;
    var i = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.aji);
    if (i && (UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle() || UiSceneManager_1.UiSceneManager.InitVisionSkeletalHandle(), e = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle())) {
      ControllerHolder_1.ControllerHolder.PhantomBattleController.SetMeshShow(i.GetConfigId(true), undefined, e);
    }
  }
  oId() {
    UiSceneManager_1.UiSceneManager.DestroyVisionSkeletalHandle();
  }
  CreateExtraParams(e) {
    let i = undefined;
    return i = e === "VisionRefineTabView" ? {
      ViewState: 2,
      UniqueId: this.aji,
      ActiveCaptionItem: false,
      SlotInteractive: false,
      ResultShowTips: false,
      IsSingleMode: true
    } : this.aji;
  }
  SetCurrencyItemList(e) {
    this.PTt.length = 0;
    if (e === "VisionRefineTabView") {
      ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRefineMaterialCost(this.aji)?.forEach((e, i) => {
        this.PTt.push(i);
      });
    } else {
      this.PTt.push(ItemDefines_1.EItemId.Gold);
    }
    this.TabComponent.SetCurrencyItemList(this.PTt);
  }
  OnHandleLoadScene() {
    var e = this.TabViewComponent.GetCurrentTabViewName();
    if (e) {
      this.iId(e);
    }
  }
  OnHandleReleaseScene() {
    this.oId();
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.PhantomBattleModel?.AddNeedCameraFocusMethodDisableViewCount();
    var e = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(this.Info.Name);
    e.forEach(e => {
      this.yvt.push(e);
    });
    var i = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(this.aji);
    var t = ModelManager_1.ModelManager.FunctionModel.IsOpen(10001004);
    let n = 0;
    if ((n = i.GetQuality() <= VisionDefine_1.CANNOTLEVELSUBQUALITY || !t ? 1 : e.length) !== this.TabComponent?.GetTabItemMap().size) {
      this.I6e = 0;
    }
    this.TabComponent?.RefreshTabItemByLength(n, this.rId);
  }
  ovm() {
    var e = this.TabComponent?.GetTabItemMap();
    if (e) {
      for (var [i, t] of e) {
        i = this.yvt[i];
        if (VisionDefine_1.tabViewWithLock.has(i.ChildViewName)) {
          const n = this.cji(i);
          if (n.IsUnlocked) {
            t.SetToggleStateForce(0, false);
          } else {
            t.SetToggleStateForce(2, false);
            t.SetCanClickWhenDisable(true);
            t.SetOnUndeterminedClick(() => {
              if (n.Message) {
                ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(n.Message);
              }
            });
          }
        }
      }
    }
  }
  K8e() {
    var e = this.yvt.findIndex(e => e.ChildViewName === "VisionIdentifyView");
    if (e > 0 && (e = this.TabComponent.GetTabItemByIndex(e))) {
      e.BindRedDot("IdentifyTab", this.aji);
    }
  }
  Ovt() {
    var e = this.yvt.findIndex(e => e.ChildViewName === "VisionIdentifyView");
    if (e > 0 && (e = this.TabComponent.GetTabItemByIndex(e))) {
      e.UnBindRedDot();
    }
  }
  OnBeforeHide() {
    this.Ovt();
    ModelManager_1.ModelManager.PhantomBattleModel?.ReduceNeedCameraFocusMethodDisableViewCount();
  }
  OnAfterHide() {
    var e = this.TabViewComponent.GetCurrentTabView();
    if (e) {
      e.HideUiTabView(false);
    }
  }
  OnBeforeCreate() {
    this.aji = this.OpenParam;
  }
  OnBeforeDestroy() {
    this.TabViewComponent.DestroyTabViewComponent();
    this.TabComponent.Destroy();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionIntensifyViewShow, false);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    const i = Number(e[0]);
    var t = this.TabComponent.GetTabItemByIndex(this.yvt.findIndex(e => e.Id === i)).GetRootItem();
    if (t) {
      return [t, t];
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 53, "聚焦引导extraParam项配置有误", ["configParams", e]);
    }
  }
  GetCurrentUniqueId() {
    return this.aji;
  }
}
exports.VisionIntensifyView = VisionIntensifyView;
//# sourceMappingURL=VisionIntensifyView.js.map