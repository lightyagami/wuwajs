"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BossRushMainView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData");
const TabComponentWithCaptionItem_1 = require("../../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../../Common/TabComponent/TabItem/CommonTabItem");
const TabViewComponent_1 = require("../../../Common/TabComponent/TabViewComponent");
class BossRushMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.yvt = [];
    this.TabViewComponent = undefined;
    this.TabComponent = undefined;
    this.b9i = 0;
    this.hyn = e => {
      this.TabComponent?.SelectToggleByIndex(this.lyn(e));
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BossRushSubViewChanged, e);
    };
    this.fqe = (e, t) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.pqe = e => {
      this.b9i = e;
      var t = this.yvt[e];
      var i = t.ChildViewName;
      var e = this.TabComponent.GetTabItemByIndex(e);
      this.TabViewComponent.ToggleCallBack(t, i, e);
    };
    this.yqe = e => new CommonTabData_1.CommonTabData("", undefined);
    this.W7t = () => {
      if (this.b9i !== 0) {
        if (this.b9i === this.lyn("BossRushRewardView")) {
          ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation = true;
          if (ModelManager_1.ModelManager.BossRushModel.OnlyOpenRewardView) {
            ModelManager_1.ModelManager.BossRushModel.OnlyOpenRewardView = false;
            this.CloseMe();
            return;
          } else {
            this.hyn("BossRushSelectView");
            return;
          }
        }
        var e = this.yvt[this.b9i - 1].ChildViewName;
        ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation = true;
        this.hyn(e);
      } else if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      } else {
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    ModelManager_1.ModelManager.BossRushModel.CurrentSelectActivityId = this.OpenParam;
    this.yvt = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("BossRushMainView");
    await this._yn();
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
  }
  OnBeforeDestroy() {
    this.TabViewComponent?.DestroyTabViewComponent();
    this.TabViewComponent = undefined;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RequestChangeBossRushView, this.hyn);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RequestChangeBossRushView, this.hyn);
  }
  OnStart() {
    this.TabComponent?.SelectToggleByIndex(this.lyn(ModelManager_1.ModelManager.BossRushModel.OnlyOpenRewardView ? "BossRushRewardView" : "BossRushSelectView"), true);
  }
  async _yn() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.fqe, this.pqe, this.yqe);
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), e, this.W7t);
    this.TabComponent.SetScrollViewVisible(false);
    this.TabComponent.NeedCaptionSwitchWithToggle = false;
    this.TabComponent.SetHelpButtonShowState(false);
    this.TabComponent.SetTitle(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Activity_100805001_Title"));
    await this.TabComponent.RefreshTabItemByLengthAsync(this.yvt.length);
  }
  lyn(t) {
    for (let e = 0; e < this.yvt.length; e++) {
      if (this.yvt[e].ChildViewName === t) {
        return e;
      }
    }
    return 0;
  }
}
exports.BossRushMainView = BossRushMainView;
//# sourceMappingURL=BossRushMainView.js.map