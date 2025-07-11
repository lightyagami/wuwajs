"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonChasingMemoryDetailView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem");
const GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout");
const MemoryContentItem_1 = require("./MemoryContentItem");
class MoonChasingMemoryDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.C7s = undefined;
    this.g7s = undefined;
    this.f7s = () => new MemoryContentItem_1.MemoryContentItemA();
    this.p7s = () => new MemoryContentItem_1.MemoryContentItemB();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIGridLayout], [2, UE.UIItem], [3, UE.UIHorizontalLayout], [4, UE.UIItem]];
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.C7s = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.f7s);
    this.g7s = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.p7s);
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    var t = e.filter(e => e.Classify === 0);
    this.C7s.RefreshByData(t);
    var t = e.filter(e => e.Classify === 1);
    this.g7s.RefreshByData(t);
  }
}
exports.MoonChasingMemoryDetailView = MoonChasingMemoryDetailView;
//# sourceMappingURL=MoonChasingMemoryDetailView.js.map