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
    this.hji = false;
    this.tHi = undefined;
    this.lji = e => {
      this.TabComponent.SetCloseBtnShowState(e);
    };
    this._ji = () => {
      this.TabComponent.SelectToggleByIndex(1);
    };
    this.uji = () => {
      var e;
      var t;
      if (ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(this.aji).GetQuality() > VisionDefine_1.CANNOTLEVELSUBQUALITY && (e = this.TabComponent.GetTabItemByIndex(1))) {
        t = this.cji();
        e.SetToggleStateForce(t ? 0 : 2, false);
      }
    };
    this.CanToggleChange = e => {
      return e !== 1 || ((e = this.cji()) || ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("VisionIdentifyLock"), e);
    };
    this.R6e = (e, t) => {
      return new VisionTabItem_1.VisionTabItem();
    };
    this.SetOnUndeterminedClick = () => {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("VisionIdentifyLock");
    };
    this.pqe = e => {
      var t = this.yvt[e];
      var i = t.ChildViewName;
      var e = this.TabComponent.GetTabItemByIndex(e);
      var n = this.TabViewComponent.GetCurrentTabView();
      if (n) {
        n.HideUiTabView(false);
      }
      this.TabViewComponent.ToggleCallBack(t, i, e, this.aji);
      this.TabComponent.SetHelpButtonCallBack(this.mji);
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
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnStart() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), e, this.CloseClick);
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
    var e = new Array();
    e.push(ItemDefines_1.EItemId.Gold);
    this.TabComponent.SetCurrencyItemList(e);
    this.TabComponent.SetHelpButtonShowState(true);
    this.TabComponent.SetCanChange(this.CanToggleChange);
    this.GetItem(2).SetUIActive(false);
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
  cji() {
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(this.aji);
    var t = e.GetSubPropUnlockLevel(0);
    var e = e.GetPhantomLevel() >= t;
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.VisionIntensifyTabOpen);
    }
    return e;
  }
  OnBeforePlayCloseSequence() {
    var e = this.TabViewComponent.GetCurrentTabView();
    if (e) {
      new UiSequencePlayer_1.UiSequencePlayer(e.GetRootItem()).PlaySequence("Close");
    }
  }
  OnHandleLoadScene() {
    var e = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.aji);
    if (e) {
      ControllerHolder_1.ControllerHolder.PhantomBattleController.SetMeshShow(e.GetConfigId(true), undefined, this.tHi);
    }
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.PhantomBattleModel?.AddNeedCameraFocusMethodDisableViewCount();
    var e = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(this.Info.Name);
    e.forEach(e => {
      this.yvt.push(e);
    });
    var t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(this.aji);
    var i = ModelManager_1.ModelManager.FunctionModel.IsOpen(10001004);
    let n = 0;
    n = t.GetQuality() <= VisionDefine_1.CANNOTLEVELSUBQUALITY || !i ? 1 : e.length;
    this.TabComponent.RefreshTabItemByLength(n, () => {
      var e;
      var t;
      var i;
      for ([e, t] of this.TabComponent.GetTabItemMap()) {
        if (e === 1) {
          i = this.cji();
          t.SetToggleStateForce(i ? 0 : 2, false);
          t.SetCanClickWhenDisable(true);
          t.SetOnUndeterminedClick(this.SetOnUndeterminedClick);
        }
      }
      this.TabComponent.SelectToggleByIndex(0, true);
      this.TabViewComponent.SetCurrentTabViewState(true);
      this.K8e();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshVisionIdentifyRedPoint, this.aji);
    });
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
    if (!UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle()) {
      UiSceneManager_1.UiSceneManager.InitVisionSkeletalHandle();
      this.hji = true;
    }
    this.tHi = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle();
  }
  OnBeforeDestroy() {
    this.TabViewComponent.DestroyTabViewComponent();
    this.TabComponent.Destroy();
    if (this.hji) {
      UiSceneManager_1.UiSceneManager.DestroyVisionSkeletalHandle();
      this.tHi = undefined;
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    const t = Number(e[0]);
    var i = this.TabComponent.GetTabItemByIndex(this.yvt.findIndex(e => e.Id === t)).GetRootItem();
    if (i) {
      return [i, i];
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 53, "聚焦引导extraParam项配置有误", ["configParams", e]);
    }
  }
}
exports.VisionIntensifyView = VisionIntensifyView;
//# sourceMappingURL=VisionIntensifyView.js.map