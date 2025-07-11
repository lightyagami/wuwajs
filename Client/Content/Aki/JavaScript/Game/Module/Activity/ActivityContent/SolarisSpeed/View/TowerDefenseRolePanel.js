"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseRolePanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const SolarSpeedRolePanelBase_1 = require("./SolarSpeedRolePanelBase");
class TowerDefenseRolePanel extends SolarSpeedRolePanelBase_1.SolarSpeedRolePanelBase {
  constructor() {
    super(...arguments);
    this.DescContent = undefined;
  }
  async Anc() {
    this.DescContent = new TowerDefenseRoleDescContent();
    await this.DescContent.CreateThenShowByResourceIdAsync("UiItem_RaceResulInfo", this.GetItem(11));
  }
  async OnBeforeStartAsync() {
    await Promise.all([super.OnBeforeStartAsync(), this.Anc()]);
    this.GetItem(12).SetUIActive(false);
  }
  OnRefresh(e) {
    this.DescContent.Refresh(e);
  }
}
exports.TowerDefenseRolePanel = TowerDefenseRolePanel;
class TowerDefenseRoleDescContent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Scroll = undefined;
    this.fke = () => new TowerDefenseRoleDescItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem]];
  }
  OnStart() {
    this.Scroll = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.fke, this.GetItem(2).GetOwner());
  }
  Pnc(e) {
    var s = new UiAsyncTask_1.UiAsyncTask("TowerDefenseRoleDescContent.Refresh", async () => {
      await this.Scroll.RefreshByDataAsync(e);
    });
    this.RunAsyncTask(s);
  }
  Refresh(e) {
    var s = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseSettleById(e.BestTitle);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), s.Title);
    this.Pnc(e.DescDataList);
  }
}
class TowerDefenseRoleDescItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText]];
  }
  Refresh(e) {
    this.GetItem(0)?.SetUIActive(this.GridIndex % 2 == 0);
    var s = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseSettleById(e.Title);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.BaseTitle);
    if (s.IsTotalRatio) {
      this.GetText(2)?.SetText(e.Count.toString() + "%");
    } else {
      this.GetText(2)?.SetText(e.Count.toString());
    }
  }
}
//# sourceMappingURL=TowerDefenseRolePanel.js.map