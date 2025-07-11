"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueTokenIllustratedView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const RogueResThemeAll_1 = require("../../../../Core/Define/ConfigQuery/RogueResThemeAll");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem");
const TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent");
const RogueResOutDefine_1 = require("../Define/RogueResOutDefine");
class RogueTokenIllustratedView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TabComponent = undefined;
    this.TabViewComponent = undefined;
    this.L6e = undefined;
    this.TabDataList = [];
    this.l8c = 0;
    this.TIc = () => {
      this.CloseMe();
    };
    this.yqe = e => {
      e = this.TabDataList[e];
      return new CommonTabData_1.CommonTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(e.TabName));
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
      var o = this._8c();
      var e = this.TabComponent.GetTabItemByIndex(e);
      var i = this.GetExtendToggle(3).GetToggleState();
      this.TabViewComponent.ToggleCallBack(t, o, e, i);
      this.l8c = t.Config ? t.Config.Id : 0;
    };
    this.wIc = e => {
      ModelManager_1.ModelManager.RogueBattleModel.ChangeDescMode();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIExtendToggle]];
  }
  OnStart() {
    this.GetItem(2)?.SetUIActive(false);
    this.InitTabComponent();
    this.InitExtendToggle();
  }
  OnBeforeShow() {
    this.RIc();
  }
  OnBeforeDestroy() {
    if (this.TabComponent) {
      this.TabComponent.Destroy();
      this.TabComponent = undefined;
    }
  }
  InitTabComponent() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), e, this.TIc);
    this.L6e = undefined;
    this.TabComponent.SetHelpButtonShowState(false);
    this.TabComponent.SetCanChange(this.CanToggleChange);
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
  }
  InitExtendToggle() {
    var e = this.GetExtendToggle(3);
    var t = ModelManager_1.ModelManager.RogueBattleModel.DescMode === 1 ? 0 : 1;
    e?.SetToggleState(t);
    e?.OnStateChange.Add(this.wIc);
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
  ICi(t) {
    var o = t.length;
    var i = this.TabComponent.CreateTabItemDataByLength(o);
    for (let e = 0; e < o; e++) {
      var n = t[e];
      if (n) {
        i[e].RedDotName = "RogueResIllustratedTokenTab";
        i[e].RedDotUid = n.Config ? n.Config.Id : 0;
      }
    }
    return i;
  }
  _8c() {
    var e = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("RogueTokenIllustratedView");
    if (e.length === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Activity", 77, "Missing Rogue Illustrated View Config, Use Default");
      }
      return "RogueIllustratedTokenTabView";
    } else {
      return e[0].ChildViewName;
    }
  }
  c8c() {
    var t = new Array();
    var e = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("RogueTokenIllustratedView");
    if (e.length !== 0) {
      var e = e[0];
      var o = new RogueResOutDefine_1.RogueIllustratedTabData();
      o.TabType = 0;
      o.Icon = e.Icon;
      o.TabName = e.TabName;
      o.Index = e.TabIndex;
      o.Config = undefined;
      t.push(o);
      var i = RogueResThemeAll_1.configRogueResThemeAll.GetConfigList();
      if (i) {
        for (let e = 0; e < i.length; e++) {
          var n = new RogueResOutDefine_1.RogueIllustratedTabData();
          n.TabType = 0;
          n.Icon = i[e].Icon;
          n.TabName = i[e].Name;
          n.Config = i[e];
          n.Index = e + 2;
          t.push(n);
        }
      }
    }
    return t;
  }
}
exports.RogueTokenIllustratedView = RogueTokenIllustratedView;
//# sourceMappingURL=RogueTokenIllustratedView.js.map