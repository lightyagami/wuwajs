"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapPlayPointDetailView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const MapExplorePlayProgressPanel_1 = require("./MapExplorePlayProgressPanel");
class MapPlayPointDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.tNl = undefined;
    this.DNl = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.DNl = this.OpenParam;
    this.tNl = new MapExplorePlayProgressPanel_1.MapExplorePlayProgressPanel();
    await this.tNl.Init(this.GetItem(0));
  }
  OnBeforeShow() {
    var e = this.DNl.ExploreAreaItemData;
    this.tNl.UpdateData(e.PlayProgressDataList);
    var s = e.PlayPointTotalCount;
    var i = e.PlayPointCompletedCount;
    var t = e.PlayPointToBeCompletedCount;
    var r = e.PlayPointLockedCount;
    this.GetText(1).SetText(s.toString());
    this.GetText(2).SetText(i.toString());
    this.GetText(3).SetText(t.toString());
    this.GetText(4).SetText(r.toString());
    this.GetText(5).SetText(e.GetPlayDetailTitle());
    this.GetText(6).ShowTextNew(e.GetNameId());
    var s = e.HasSpecialPlayPoint();
    this.GetItem(8).SetUIActive(s);
    if (s) {
      this.GetText(7).ShowTextNew(e.SpecialPlayerDesc);
    }
  }
}
exports.MapPlayPointDetailView = MapPlayPointDetailView;
//# sourceMappingURL=MapPlayPointDetailView.js.map