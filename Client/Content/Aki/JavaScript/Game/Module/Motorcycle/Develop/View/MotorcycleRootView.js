"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleRootView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Time_1 = require("../../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../../Common/TabComponent/TabComponentWithCaptionItem");
const TabViewComponent_1 = require("../../../Common/TabComponent/TabViewComponent");
const MotorcycleUiModelUtil_1 = require("../../Model/MotorcycleUiModelUtil");
const MotorcycleDevelopDefine_1 = require("../MotorcycleDevelopDefine");
const MotorcycleTabItem_1 = require("../TabItem/MotorcycleTabItem");
class MotorcycleRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TabDataList = [];
    this.TabComponent = undefined;
    this.TabViewComponent = undefined;
    this.rmo = undefined;
    this.L6e = undefined;
    this.CanToggleChange = e => {
      var t;
      return !!Info_1.Info.IsInGamepad() || (t = CommonParamById_1.configCommonParamById.GetIntConfig("panel_interval_time"), !this.L6e) || Time_1.Time.Now - this.L6e >= t;
    };
    this.R6e = (e, t) => {
      return new MotorcycleTabItem_1.MotorcycleTabItem();
    };
    this.pqe = e => {
      this.L6e = Time_1.Time.Now;
      var t = this.TabDataList[e];
      const o = t.ChildViewName;
      e = this.TabComponent.GetTabItemByIndex(e);
      this.TabViewComponent.ToggleCallBack(t, o, e);
      this.rmo = o;
      let i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetSelectedTreeType();
      if ((i = i === 0 ? ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurTreeType() : i) !== 0 && o === "MotorcycleTechTreeTabView") {
        if (t = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(i)) {
          this.TabComponent.SetCurrencyItemList([t.TpItemId]);
        }
      } else {
        this.TabComponent.SetCurrencyItemList([]);
      }
      this.TabComponent.SetHelpButtonCallBack(() => {
        if (o === "MotorcycleDiyMainView") {
          ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(MotorcycleDevelopDefine_1.MOTORCYCLE_DEVELOP_HELP_DIY);
        } else {
          ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(MotorcycleDevelopDefine_1.MOTORCYCLE_DEVELOP_HELP);
        }
      });
    };
    this.yqe = e => {
      e = this.TabDataList[e];
      return new CommonTabData_1.CommonTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(e.TabName));
    };
    this.kcf = e => {
      if (e.Currency) {
        this.TabComponent.SetCurrencyItemList(e.Currency);
      }
      const t = e.IsObserving;
      if (t) {
        this.PlaySequence("UiOut", () => {
          this.TabComponent.SetUiActive(!t);
        }, true);
      } else {
        this.TabComponent.SetUiActive(!t);
        this.PlaySequence("UiIn", () => {}, true);
      }
    };
    this.$Bf = t => {
      var e = this.TabDataList.findIndex(e => e.ChildViewName === t);
      this.TabComponent.SelectToggleByIndex(e);
    };
    this.CloseClick = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    this.InitTabComponent();
  }
  OnHandleLoadScene() {
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.CreateMotor();
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.LoadEquippedMotor();
  }
  OnBeforeShow() {
    this.RefreshTabListAsync();
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.ShowMotor(true);
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.ResetEquippedMotor();
  }
  OnAfterHide() {
    this.TabViewComponent.SetCurrentTabViewState(false);
  }
  OnHandleReleaseScene() {
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.DestroyMotor();
  }
  OnBeforeDestroy() {
    if (this.TabComponent) {
      this.TabComponent.Destroy();
      this.TabComponent = undefined;
    }
    if (this.TabViewComponent) {
      this.TabViewComponent.DestroyTabViewComponent();
      this.TabViewComponent = undefined;
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorDevelopRootUpdate, this.kcf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SelectMotorDevelopTab, this.$Bf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorDevelopRootUpdate, this.kcf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SelectMotorDevelopTab, this.$Bf);
  }
  InitTabComponent() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(1), e, this.CloseClick);
    this.L6e = undefined;
    this.TabComponent.SetCanChange(this.CanToggleChange);
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(0));
  }
  async RefreshTabListAsync() {
    UiLayer_1.UiLayer.SetShowMaskLayer("RefreshTabListAsync", true);
    var e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetMotorTabList();
    var t = this.TabDataList.toString() !== e.toString();
    this.TabDataList = e;
    var o = this.TabDataList.length;
    var i = this.TabComponent.CreateTabItemDataByLength(o);
    for (let e = 0; e < o; e++) {
      var n = this.TabDataList[e].ChildViewName;
      i[e].RedDotName = this.GetRedDotName(n);
    }
    await this.TabComponent.RefreshTabItemAsync(i, t).finally(() => {
      UiLayer_1.UiLayer.SetShowMaskLayer("RefreshTabListAsync", false);
    });
    if (t) {
      let t = 0;
      for (let e = 0; e < this.TabDataList.length; e++) {
        if (this.TabDataList[e].ChildViewName === this.rmo) {
          t = e;
          break;
        }
      }
      this.TabComponent.SelectToggleByIndex(t, true);
    } else {
      this.TabViewComponent?.SetCurrentTabViewState(true);
    }
  }
  GetRedDotName(e) {
    if (e === "MotorcycleLevelInfoTabView") {
      return "MotorcycleLevelTab";
    } else if (e === "MotorcycleTechTreeTabView") {
      return "MotorcycleTechTreeTab";
    } else if (e === "MotorcycleTaskTabView") {
      return "MotorcycleTaskTab";
    } else if (e === "MotorcycleDiyMainView") {
      return "MotorcycleDiyTab";
    } else {
      return undefined;
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && e[0] === "Tab" && (e = Number(e[1]), e = this.TabComponent?.GetTabItemByIndex(e)?.GetRootItem())) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.MotorcycleRootView = MotorcycleRootView;
//# sourceMappingURL=MotorcycleRootView.js.map