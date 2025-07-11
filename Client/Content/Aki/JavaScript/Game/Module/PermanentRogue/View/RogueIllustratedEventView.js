"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueIllustratedEventView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Time_1 = require("../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const RogueResThemeAll_1 = require("../../../../Core/Define/ConfigQuery/RogueResThemeAll");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem");
const TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent");
const RogueResOutDefine_1 = require("../Define/RogueResOutDefine");
class RogueIllustratedEventView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TabComponent = undefined;
    this.TabViewComponent = undefined;
    this.L6e = undefined;
    this.TabDataList = [];
    this.IsNormalEvent = true;
    this.l8c = 0;
    this.TIc = () => {
      this.CloseMe();
    };
    this.CanToggleChange = e => {
      var t;
      return !!Info_1.Info.IsInGamepad() || (t = CommonParamById_1.configCommonParamById.GetIntConfig("panel_interval_time"), !this.L6e) || Time_1.Time.Now - this.L6e >= t;
    };
    this.R6e = (e, t) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.pqe = e => {
      this.L6e = Time_1.Time.Now;
      var t = this.TabDataList[e];
      var i = this._8c();
      var e = this.TabComponent.GetTabItemByIndex(e);
      this.TabViewComponent.ToggleCallBack(t, i, e, this.IsNormalEvent);
      this.l8c = t.Config ? t.Config.Id : 0;
    };
    this.yqe = e => {
      e = this.TabDataList[e];
      return new CommonTabData_1.CommonTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(e.TabName));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {}
  OnStart() {
    this.IsNormalEvent = this.OpenParam;
    this.InitTabComponent();
  }
  OnBeforeShow() {
    this.RIc();
  }
  OnBeforeDestroy() {
    this.TabComponent = undefined;
  }
  InitTabComponent() {
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe), this.TIc);
    this.L6e = undefined;
    this.TabComponent.SetCanChange(this.CanToggleChange);
    this.TabComponent.SetHelpButtonShowState(false);
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
  }
  async RIc() {
    var e = this.c8c();
    var t = this.TabDataList.toString() !== e.toString();
    this.TabDataList = e;
    var e = this.ICi(this.TabDataList);
    await this.TabComponent.RefreshTabItemAsync(e, t);
    if (t) {
      let t = 0;
      if (this.l8c !== 0) {
        for (let e = 0; e < this.TabDataList.length; e++) {
          if (this.TabDataList[e].Config.Id === this.l8c) {
            t = e;
            break;
          }
        }
      }
      this.TabComponent.SelectToggleByIndex(t, true);
    }
  }
  _8c() {
    return ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("RogueEventIllustratedView")[0].ChildViewName;
  }
  ICi(t) {
    var i = t.length;
    var o = this.TabComponent.CreateTabItemDataByLength(i);
    for (let e = 0; e < i; e++) {
      var a = t[e];
      if (a) {
        o[e].RedDotName = this.IsNormalEvent ? "RogueResIllustratedNormalTab" : "RogueResIllustratedMapTab";
        o[e].RedDotUid = a.Config?.Id ?? 0;
      }
    }
    return o;
  }
  c8c() {
    var t = new Array();
    var e = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("RogueEventIllustratedView");
    if (e.length !== 0) {
      var e = e[0];
      var i = new RogueResOutDefine_1.RogueIllustratedTabData();
      i.TabType = this.IsNormalEvent ? 1 : 2;
      i.Icon = e.Icon;
      i.TabName = this.IsNormalEvent ? "UiDynamicTab_114_TabName_Normal" : "UiDynamicTab_114_TabName_Map";
      i.Index = e.TabIndex;
      i.Config = undefined;
      t.push(i);
      var o = RogueResThemeAll_1.configRogueResThemeAll.GetConfigList();
      if (o) {
        for (let e = 0; e < o.length; e++) {
          var a = new RogueResOutDefine_1.RogueIllustratedTabData();
          a.TabType = this.IsNormalEvent ? 1 : 2;
          a.Icon = o[e].Icon;
          a.TabName = o[e].Name;
          a.Config = o[e];
          a.Index = e + 2;
          t.push(a);
        }
      }
    }
    return t;
  }
}
exports.RogueIllustratedEventView = RogueIllustratedEventView;
//# sourceMappingURL=RogueIllustratedEventView.js.map