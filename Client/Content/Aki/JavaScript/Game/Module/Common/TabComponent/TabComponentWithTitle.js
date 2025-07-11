"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabComponentWithTitle = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const CommonTabTitle_1 = require("./CommonTabTitle");
const TabComponent_1 = require("./TabComponent");
const CommonTabItemBase_1 = require("./TabItem/CommonTabItemBase");
class TabComponentWithTitle extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super();
    this.TabTitle = undefined;
    this.Ivt = undefined;
    this.xqe = undefined;
    this.pqe = e => {
      var t = this.Nbt.GetCommonData(e);
      if (t) {
        this.TabTitle.UpdateIcon(t.GetSmallIcon());
        this.TabTitle.UpdateTitle(t.GetTitleData());
      }
      this.Nbt.ToggleCallBack(e);
    };
    this.R6e = (e, t) => {
      return this.Nbt.ProxyCreate(e, t);
    };
    this.Nbt = t;
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent]];
  }
  OnStart() {
    this.xqe = this.GetScrollViewWithScrollbar(1);
    this.Ivt = new TabComponent_1.TabComponent(this.xqe.ContentUIItem, this.R6e, this.pqe, undefined);
    this.TabTitle = new CommonTabTitle_1.CommonTabTitle(this.GetItem(0));
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
  RefreshTabItem(t, e) {
    var s = new Array();
    for (let e = 0; e < t; e++) {
      var i = new CommonTabItemBase_1.CommonTabItemData();
      i.Index = e;
      i.Data = this.Nbt.GetCommonData(e);
      s.push(i);
    }
    this.Ivt.RefreshTabItem(s, e);
  }
  async RefreshTabItemAsync(t) {
    var s = new Array();
    for (let e = 0; e < t; e++) {
      var i = new CommonTabItemBase_1.CommonTabItemData();
      i.Index = e;
      i.Data = this.Nbt.GetCommonData(e);
      s.push(i);
    }
    await this.RefreshTabItemByDataAsync(s);
  }
  async RefreshTabItemByDataAsync(e) {
    await this.Ivt.RefreshTabItemAsync(e);
  }
  SelectToggleByIndex(e, t = false) {
    this.Ivt.SelectToggleByIndex(e, t);
  }
  GetSelectedIndex() {
    return this.Ivt.GetSelectedIndex();
  }
  ScrollToToggleByIndex(e) {
    const t = this.Ivt.GetTabItemByIndex(e);
    this.xqe.OnLateUpdate.Bind(() => {
      TimerSystem_1.GameplayTimerSystem.Next(() => {
        this.xqe.ScrollTo(t.GetRootItem());
      });
      this.xqe.OnLateUpdate.Unbind();
    });
  }
  GetTabItemByIndex(e) {
    return this.Ivt.GetTabItemByIndex(e);
  }
  GetTabItemMap() {
    return this.Ivt.GetTabItemMap();
  }
  GetTabComponentData(e) {
    return this.Nbt.GetCommonData(e);
  }
  GetTabComponent() {
    return this.Ivt;
  }
  SetCanChange(e) {
    this.Ivt.SetCanChange(e);
  }
}
exports.TabComponentWithTitle = TabComponentWithTitle;
//# sourceMappingURL=TabComponentWithTitle.js.map