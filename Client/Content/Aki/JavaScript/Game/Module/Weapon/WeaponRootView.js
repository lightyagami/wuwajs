"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponRootView = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const RedDotController_1 = require("../../RedDot/RedDotController");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const UiLayer_1 = require("../../Ui/UiLayer");
const CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem");
const WeaponTabItem_1 = require("../Common/TabComponent/TabItem/WeaponTabItem");
const TabViewComponent_1 = require("../Common/TabComponent/TabViewComponent");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const WeaponController_1 = require("./WeaponController");
class WeaponRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TabViewComponent = undefined;
    this.TabComponent = undefined;
    this.TabDataList = [];
    this.DS1 = true;
    this.DOo = 0;
    this.nxl = -1;
    this.N2i = undefined;
    this.O2i = undefined;
    this.R6e = e => new WeaponTabItem_1.WeaponTabItem();
    this.pqe = e => {
      var t = this.TabDataList[e];
      var i = t.ChildViewName;
      var e = this.TabComponent.GetTabItemByIndex(e);
      this.TabViewComponent.ToggleCallBack(t, i, e, this.DOo);
    };
    this.yqe = e => {
      e = this.TabDataList[e];
      return new CommonTabData_1.CommonTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(e.TabName));
    };
    this.Ako = () => {
      this.UpdateDynamicTabComponent();
    };
    this.l7i = e => {
      if (e.ViewName === "WeaponRootView" && (UiLayer_1.UiLayer.SetShowMaskLayer("WeaponRootView", false), this.N2i) && this.O2i && this.DS1) {
        WeaponController_1.WeaponController.OnSelectedWeaponChange(ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.DOo), this.N2i, this.O2i, this.nxl);
        this.DS1 = false;
      }
    };
    this.W7t = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnBeforeCreate() {
    var e = this.OpenParam;
    if (e) {
      if (!e.IsFromRoleRootView) {
        ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(2);
      }
      this.DOo = e.WeaponIncId;
      this.nxl = e.WeaponSkinId;
      this.N2i = UiSceneManager_1.UiSceneManager.InitWeaponObserver();
      this.O2i = UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Weapon", 43, "进入武器培养界面未传参");
    }
  }
  async OnBeforeStartAsync() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), e, this.W7t);
    await this.TabComponent.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]);
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
  }
  OnHandleLoadScene() {
    this.N2i ||= UiSceneManager_1.UiSceneManager.InitWeaponObserver();
    this.O2i ||= UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver();
  }
  OnBeforeShow() {
    UiLayer_1.UiLayer.SetShowMaskLayer("WeaponRootView", true);
    this.UpdateDynamicTabComponent();
    if (!UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation() && this.DS1) {
      WeaponController_1.WeaponController.OnSelectedWeaponChange(ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.DOo), this.N2i, this.O2i, this.nxl);
      this.DS1 = false;
      UiLayer_1.UiLayer.SetShowMaskLayer("WeaponRootView", false);
    }
  }
  OnAfterShow() {
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(2);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WeaponCanGoBreach, this.Ako);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.l7i);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeaponCanGoBreach, this.Ako);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.l7i);
  }
  OnBeforePlayCloseSequence() {
    this.Pko();
  }
  OnHandleReleaseScene() {
    this.Pko();
  }
  Pko() {
    if (this.N2i) {
      UiSceneManager_1.UiSceneManager.HideObserver(this.N2i, "ShowHideWeaponEffect");
      UiSceneManager_1.UiSceneManager.DestroyWeaponObserver(this.N2i);
      this.N2i = undefined;
    }
    if (this.O2i) {
      UiSceneManager_1.UiSceneManager.HideObserver(this.O2i, "ShowHideWeaponEffect");
      UiSceneManager_1.UiSceneManager.DestroyWeaponScabbardObserver(this.O2i);
      this.O2i = undefined;
    }
    this.DS1 = true;
  }
  OnBeforeDestroy() {
    this.Ovt();
    var e = this.OpenParam;
    if (e && e.IsFromRoleRootView && UiSceneManager_1.UiSceneManager.HasRoleSystemRoleActor()) {
      WeaponController_1.WeaponController.RoleFadeOut(UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor());
    }
    if (this.TabComponent) {
      this.TabComponent.Destroy();
      this.TabComponent = undefined;
    }
    this.TabDataList = [];
    if (this.TabViewComponent) {
      this.TabViewComponent.DestroyTabViewComponent();
      this.TabViewComponent = undefined;
    }
  }
  UpdateDynamicTabComponent() {
    this.TabDataList = this.GetWeaponTabList();
    const t = this.TabComponent.GetSelectedIndex();
    this.TabComponent.RefreshTabItemByLength(this.TabDataList.length, () => {
      var e = t > 0 ? t : 0;
      this.TabComponent.SelectToggleByIndex(e);
      this.K8e();
    });
  }
  GetWeaponTabList() {
    var e = [];
    var t = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("WeaponRootView");
    var i = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.DOo).CanGoBreach();
    for (const n of t) {
      if ((n.ChildViewName !== "WeaponBreachView" || !!i) && (n.ChildViewName !== "WeaponLevelUpView" || !i)) {
        e.push(n);
      }
    }
    return e;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length === 1) {
      if (!this.TabComponent) {
        return;
      }
      if (!this.TabComponent.GetTabComponent().GetLayout()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 53, "角色界面聚焦引导的额外参数配置有误, 找不到Layout", ["configParams", e]);
        }
        return;
      }
      const t = Number(e[0]);
      e = this.TabComponent.GetTabItemByIndex(this.TabDataList.findIndex(e => e.Id === t)).GetRootItem();
      if (e) {
        return [e, e];
      }
    }
  }
  K8e() {
    var e = this.TabDataList.findIndex(e => e.ChildViewName === "WeaponResonanceView");
    if (e >= 0 && (e = this.TabComponent.GetTabItemByIndex(e))) {
      e.BindRedDot("RedDotWeaponResonanceTab", this.DOo);
    }
  }
  Ovt() {
    var e = this.TabDataList.findIndex(e => e.ChildViewName === "WeaponResonanceView");
    if (e >= 0 && (e = this.TabComponent.GetTabItemByIndex(e))) {
      e.UnBindRedDot();
      RedDotController_1.RedDotController.UnBindRedDotAndClearData("RedDotWeaponResonanceTab");
    }
  }
}
exports.WeaponRootView = WeaponRootView;
//# sourceMappingURL=WeaponRootView.js.map