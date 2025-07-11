"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapAreaShowView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponent_1 = require("../../Common/TabComponent/TabComponent");
const TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const MapAreaShowCountryItem_1 = require("./MapAreaShowCountryItem");
const MapAreaShowItem_1 = require("./MapAreaShowItem");
const MapAreaShowTabItem_1 = require("./MapAreaShowTabItem");
class MapAreaShowView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OOl = undefined;
    this.Ivt = undefined;
    this.NOl = 0;
    this.ZZt = undefined;
    this.L6e = undefined;
    this.AreaScroll = undefined;
    this.FOl = undefined;
    this.VOl = undefined;
    this.HOl = 0;
    this.DNl = undefined;
    this.R6e = () => {
      return new MapAreaShowCountryItem_1.MapAreaShowCountryItem();
    };
    this.pqe = e => {
      this.L6e = Time_1.Time.Now;
      this.NOl = e;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 69, "触发选择", ["index", this.NOl]);
      }
      this.jOl();
    };
    this.WOl = e => {
      e = this.OOl[e];
      return new CommonTabData_1.CommonTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(e.TitleId, e));
    };
    this.lyt = () => {
      this.CloseMe();
    };
    this.Bpt = () => !!Info_1.Info.IsInGamepad() || !this.L6e || Time_1.Time.Now - this.L6e >= this.ZZt;
    this.QOl = () => {
      var e;
      var t;
      let i = false;
      for ([e, t] of this.FOl.GetTabItemMap()) {
        t.UpdateView(this.VOl[e]);
        if (!this.VOl[e].IsNoneState) {
          i = true;
        }
      }
      this.FOl.SelectToggleByIndex(0, true);
      this.GetItem(3).SetUIActive(i);
    };
    this.fqe = () => {
      return new MapAreaShowTabItem_1.MapAreaShowTabItem();
    };
    this.KOl = e => {
      this.HOl = e;
      this.$Ol();
    };
    this.KPn = () => {
      return new MapAreaShowItem_1.MapAreaShowItem();
    };
    this.mNl = e => {
      this.DNl?.OnClickArea?.(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIHorizontalLayout], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.OOl = ModelManager_1.ModelManager.ExploreProgressModel.GetExploreCountryDataList();
    await this.InitCommonOneTab();
  }
  OnStart() {
    this.Ivt.SetHelpButtonShowState(false);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MapAreaShowClickArea, this.mNl);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MapAreaShowClickArea, this.mNl);
  }
  OnBeforeShow() {
    this.DNl = this.OpenParam;
    let t = 0;
    if (this.DNl) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 69, "params", ["国家id", this.DNl.CountryId], ["区域ID", this.DNl.AreaId]);
      }
      for (let e = 0; e < this.OOl.length; e++) {
        var i = this.OOl[e];
        if (this.DNl.CountryId === i.CountryId) {
          t = e;
          break;
        }
      }
    }
    this.Ivt.SelectToggleByIndex(t, true);
  }
  OnBeforeDestroy() {
    if (this.FOl) {
      this.FOl.Destroy();
      this.FOl = undefined;
    }
  }
  async InitCommonOneTab() {
    this.ZZt = CommonParamById_1.configCommonParamById.GetIntConfig("panel_interval_time");
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.WOl);
    this.Ivt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), e, this.lyt);
    this.Ivt.SetCanChange(this.Bpt);
    var e = this.OOl.length;
    var e = this.Ivt.CreateTabItemDataByLength(e);
    await this.Ivt.RefreshTabItemAsync(e);
  }
  jOl() {
    this.FOl ||= new TabComponent_1.TabComponent(this.GetItem(3), this.fqe, this.KOl, this.GetItem(5));
    var e = this.OOl[this.NOl];
    this.VOl = e.GetStateDataList();
    var e = this.VOl.length;
    this.FOl.RefreshTabItemByLength(e, this.QOl);
  }
  $Ol() {
    this.RefreshLoopScrollView();
  }
  RefreshLoopScrollView() {
    var e = this.GetLoopScrollViewComponent(1);
    this.AreaScroll ||= new LoopScrollView_1.LoopScrollView(e, this.GetItem(2).GetOwner(), this.KPn, true);
    var e = this.VOl[this.HOl].ExploreAreaDataList;
    this.AreaScroll.RefreshByData(e, false, () => {}, true);
  }
}
exports.MapAreaShowView = MapAreaShowView;
//# sourceMappingURL=MapAreaShowView.js.map