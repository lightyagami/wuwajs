"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TipsGetWayItem = exports.TipsGetWayPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew");
class TipsGetWayPanel extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.yxt = undefined;
    this.Ixt = undefined;
    this.Txt = (t, e, s) => {
      return {
        Key: s,
        Value: new TipsGetWayItem(e, t)
      };
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem]];
  }
  OnStart() {
    this.Ixt = new GenericLayoutNew_1.GenericLayoutNew(this.GetVerticalLayout(0), this.Txt);
  }
  OnBeforeDestroy() {
    this.yxt = [];
  }
  Refresh(t) {
    t.sort((t, e) => {
      var s = t.SortIndex;
      var i = e.SortIndex;
      if (s === i) {
        return e.Id - t.Id;
      } else {
        return i - s;
      }
    });
    this.yxt = t;
    this.Ixt.RebuildLayoutByDataNew(this.yxt);
    this.SetActive(this.yxt.length !== 0);
  }
}
exports.TipsGetWayPanel = TipsGetWayPanel;
class TipsGetWayItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, e) {
    super();
    this.Gke = undefined;
    this.Lxt = () => {
      if (this.Gke) {
        this.Gke();
      }
    };
    this.Pe = e;
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.Lxt], [1, this.Lxt]];
  }
  OnStart() {
    this.Gke = this.Pe.Function;
    switch (this.Pe.Type) {
      case 2:
        this.GetButton(0).RootUIComp.SetUIActive(true);
        this.GetButton(1).RootUIComp.SetUIActive(false);
        this.GetText(2).ShowTextNew(this.Pe.Text);
        break;
      case 1:
        this.GetButton(0).RootUIComp.SetUIActive(false);
        this.GetButton(1).RootUIComp.SetUIActive(true);
        this.GetText(3).ShowTextNew(this.Pe.Text);
    }
  }
  OnBeforeDestroy() {
    this.Pe = undefined;
    this.Gke = undefined;
  }
}
exports.TipsGetWayItem = TipsGetWayItem;
//# sourceMappingURL=ItemTipsGetWay.js.map