"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressMainCaptionListPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const TabComponent_1 = require("../../../../Common/TabComponent/TabComponent");
const ActivityRegressMainTabTitlePanel_1 = require("./ActivityRegressMainTabTitlePanel");
class ActivityRegressMainCaptionListPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.TabTitle = undefined;
    this.Nbt = undefined;
    this.Ivt = undefined;
    this.xqe = undefined;
    this.pqe = t => {
      var i = this.Nbt.GetCommonData(t);
      if (i) {
        this.TabTitle.UpdateIcon(i.GetSmallIcon());
        this.TabTitle.UpdateTitle(i.GetTitleData());
      }
      this.Nbt.ToggleCallBack(t);
    };
    this.R6e = (t, i) => {
      return this.Nbt.ProxyCreate(t, i);
    };
  }
  Init(t) {
    this.Nbt = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(0).GetOwner();
    this.TabTitle = new ActivityRegressMainTabTitlePanel_1.ActivityRegressMainTabTitlePanel();
    await this.TabTitle.CreateThenShowByActorAsync(t);
  }
  BindTabTitleCallBack(t) {
    this.TabTitle.OnBackBtnCallBack = t;
  }
  OnStart() {
    this.xqe = this.GetScrollViewWithScrollbar(1);
    this.Ivt = new TabComponent_1.TabComponent(this.xqe.ContentUIItem, this.R6e, this.pqe, undefined);
  }
  OnBeforeDestroy() {
    if (this.Ivt) {
      this.Ivt.Destroy();
      this.Ivt = undefined;
    }
    if (this.TabTitle) {
      this.TabTitle.Destroy();
      this.TabTitle = undefined;
    }
  }
  async RefreshTabItemByDataAsync(t) {
    await this.Ivt.RefreshTabItemAsync(t);
  }
  SelectToggleByIndex(t, i = false, e = true) {
    this.Ivt.SelectToggleByIndex(t, i, e);
  }
  GetTabItemMap() {
    return this.Ivt.GetTabItemMap();
  }
  GetTabComponentData(t) {
    return this.Nbt.GetCommonData(t);
  }
  SetPnlListUiActive(t) {
    this.GetItem(2).SetUIActive(t);
  }
  UpdateTitle(t, i) {
    if (t) {
      this.TabTitle.UpdateIcon(t);
    }
    if (i) {
      this.TabTitle.UpdateTitle(i);
    }
  }
}
exports.ActivityRegressMainCaptionListPanel = ActivityRegressMainCaptionListPanel;
//# sourceMappingURL=ActivityRegressMainCaptionListPanel.js.map