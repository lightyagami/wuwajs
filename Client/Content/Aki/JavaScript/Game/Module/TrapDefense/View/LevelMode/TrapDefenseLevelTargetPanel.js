"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseLevelTargetPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const TrapDefenseLevelGoToPanel_1 = require("./TrapDefenseLevelGoToPanel");
const TrapDefenseLevelRewardPanel_1 = require("./TrapDefenseLevelRewardPanel");
const TrapDefenseLevelTargetItem_1 = require("./TrapDefenseLevelTargetItem");
const TrapDefenseLevelWavePanel_1 = require("./TrapDefenseLevelWavePanel");
class TrapDefenseLevelTargetPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelData = undefined;
    this.LayoutTarget = undefined;
    this.PanelRewardInfo = undefined;
    this.PanelWaveInfo = undefined;
    this.PanelGoToInfo = undefined;
    this.CreateItemTarget = () => new TrapDefenseLevelTargetItem_1.TrapDefenseLevelTargetItem();
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnBeforeCreate() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var e = this.GetLayoutBase(0);
    var a = this.GetItem(1)?.GetOwner();
    this.LayoutTarget = new GenericLayout_1.GenericLayout(e, this.CreateItemTarget, a);
    var e = this.GetItem(3);
    this.PanelRewardInfo = new TrapDefenseLevelRewardPanel_1.TrapDefenseLevelRewardPanel();
    await this.PanelRewardInfo.Init(e);
    var a = this.GetItem(4);
    this.PanelWaveInfo = new TrapDefenseLevelWavePanel_1.TrapDefenseLevelWavePanel();
    await this.PanelWaveInfo.Init(a);
    var e = this.GetItem(5);
    this.PanelGoToInfo = new TrapDefenseLevelGoToPanel_1.TrapDefenseLevelGoToPanel();
    await this.PanelGoToInfo.Init(e);
  }
  OnStart() {}
  OnBeforeShow() {}
  OnBeforeDestroy() {}
  UpdateData(e) {
    this.LevelData = e;
    this.LayoutTarget.RefreshByData(e.GetTargetInfoList());
    this.PanelRewardInfo.UpdateData(e);
    this.PanelWaveInfo.UpdateData(e);
    this.PanelGoToInfo.UpdateData(e);
  }
}
exports.TrapDefenseLevelTargetPanel = TrapDefenseLevelTargetPanel;
//# sourceMappingURL=TrapDefenseLevelTargetPanel.js.map