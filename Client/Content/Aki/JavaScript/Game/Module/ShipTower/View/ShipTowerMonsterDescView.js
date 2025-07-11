"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerMonsterDescView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const TabComponent_1 = require("../../Common/TabComponent/TabComponent");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ShipTowerMonsterListItem_1 = require("./ShipTowerMonsterListItem");
const ShipTowerMonsterWordItem_1 = require("./ShipTowerMonsterWordItem");
const ShipTowerTeamTabItem_1 = require("./ShipTowerTeamTabItem");
class ShipTowerMonsterDescView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.Ivt = undefined;
    this.I6e = 0;
    this.yD_ = undefined;
    this.SD_ = undefined;
    this.MD_ = undefined;
    this.ED_ = undefined;
    this.ID_ = undefined;
    this.fqe = () => {
      return new ShipTowerTeamTabItem_1.ShipTowerTeamTabItem();
    };
    this.KOl = i => {
      this.I6e = i;
      i = this.OpenParam?.StageData.TeamDataList[this.I6e];
      if (i) {
        this.TD_(i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  Es_() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Temp", 69, "", ["DataParam", this.OpenParam]);
    }
  }
  async OnBeforeStartAsync() {
    this.Es_();
    await super.OnBeforeStartAsync();
    this.Ivt = new TabComponent_1.TabComponent(this.GetItem(3), this.fqe, this.KOl, undefined);
    this.ED_ = this.GetItem(1);
    this.ID_ = this.GetItem(2);
    var i = this.GetItem(0);
    var t = LguiUtil_1.LguiUtil.CopyItem(this.ED_, i);
    this.SD_ = new ShipTowerMonsterWordItem_1.ShipTowerMonsterWordItem();
    await this.SD_.Init(t);
    var t = LguiUtil_1.LguiUtil.CopyItem(this.ED_, i);
    this.yD_ = new ShipTowerMonsterWordItem_1.ShipTowerMonsterWordItem();
    await this.yD_.Init(t);
    var t = LguiUtil_1.LguiUtil.CopyItem(this.ID_, i);
    this.MD_ = new ShipTowerMonsterListItem_1.ShipTowerMonsterListItem();
    await this.MD_.Init(t);
    this.ED_.SetUIActive(false);
    this.ID_.SetUIActive(false);
    var i = this.OpenParam?.StageData.TeamDataList.length ?? 2;
    await this.Ivt.RefreshTabItemByLengthAsync(i);
  }
  La_() {
    var i = this.Ivt.GetTabItemMap();
    var t = this.OpenParam?.StageData.TeamDataList ?? [];
    for (const [e, s] of i) {
      s.UpdateName(t[e].AreaName);
    }
    i = t.findIndex(i => i.InstId === this.OpenParam?.InstId);
    const e = Math.max(i, 0);
    this.Ivt.SelectToggleByIndex(e, true);
  }
  OnBeforeShow() {
    this.La_();
  }
  TD_(i) {
    this.yD_?.UpdateData(i.GetInfoAttr());
    var t = i.GetInfoWord();
    if (t) {
      this.SD_?.UpdateData(t);
    }
    this.SD_?.SetActive(!!t);
    this.MD_?.UpdateData(i.GetMonsterListItemData());
  }
}
exports.ShipTowerMonsterDescView = ShipTowerMonsterDescView;
//# sourceMappingURL=ShipTowerMonsterDescView.js.map