"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MascotCollectBookInfoItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const MascotCollectBookMascotToggle_1 = require("./MascotCollectBookMascotToggle");
class MascotCollectBookInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.b5d = undefined;
    this.R5d = undefined;
    this.Dzd = [];
    this.w5d = undefined;
    this.L5d = () => {
      var t = new MascotCollectBookMascotToggle_1.MascotCollectBookMascotToggle();
      t.BindMascotToggleClick(this.w5d);
      this.Dzd.push(t);
      return t;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIItem]];
  }
  OnStart() {
    this.R5d = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.L5d);
  }
  Refresh(t, e, o) {
    this.b5d = t;
    this.sbi();
  }
  sbi() {
    var t = this.b5d.AreaData;
    var e = t.IsAreaUnlock;
    this.GetItem(3).SetUIActive(!e);
    this.R5d.GetRootUiItem().SetUIActive(e);
    if (e) {
      this.GetText(0).ShowTextNew(t.Name);
      e = this.b5d.MascotDataList;
      this.GetItem(3).SetActive(e.length === 0);
      this.R5d.RefreshByData(e);
    } else {
      this.GetText(0).SetText("???");
    }
  }
  GetMascotToggleList() {
    return this.Dzd;
  }
  BindMascotToggleClick(t) {
    this.w5d = t;
  }
}
exports.MascotCollectBookInfoItem = MascotCollectBookInfoItem;
//# sourceMappingURL=MascotCollectBookInfoItem.js.map