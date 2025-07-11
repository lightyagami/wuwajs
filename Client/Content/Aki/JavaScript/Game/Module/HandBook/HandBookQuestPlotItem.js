"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotNodeItem = exports.HandBookQuestPlotItem = undefined;
const UE = require("ue");
const PublicUtil_1 = require("../../Common/PublicUtil");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class HandBookQuestPlotItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.PlotNodeItem = undefined;
    this.kxn = undefined;
    this.jBn = undefined;
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
    await this.WZt();
  }
  async WZt() {
    this.PlotNodeItem = new PlotNodeItem();
    this.AddChild(this.PlotNodeItem);
    this.GetItem(0).SetUIActive(false);
    await this.PlotNodeItem.CreateByActorAsync(this.GetItem(1).GetOwner());
    this.PlotNodeItem.BindClickCallback(this.kxn);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  GetUsingItem(t) {
    return this.GetItem(1).GetOwner();
  }
  Update(t, e) {
    this.PlotNodeItem.SetUiActive(true);
    this.PlotNodeItem.Update(t.TidText, this.WBn(t.TidText));
  }
  GetNodeToggle() {
    return this.PlotNodeItem.GetNodeToggle();
  }
  SetToggleState(t) {
    this.PlotNodeItem.SetToggleState(t);
  }
  ClearItem() {
    this.Destroy();
  }
  BindClickCallback(t) {
    this.kxn = t;
  }
  WBn(t) {
    return !!this.jBn && this.jBn(t);
  }
  BindIsSelectFunction(t) {
    this.jBn = t;
  }
  GetTidText() {
    return this.PlotNodeItem?.GetTidText();
  }
  GetToggleItem() {
    return this.PlotNodeItem?.GetNodeToggle();
  }
}
exports.HandBookQuestPlotItem = HandBookQuestPlotItem;
class PlotNodeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.kxn = undefined;
    this.$Ve = undefined;
    this.os = "";
    this.OnClickExtendToggle = t => {
      if (t === 1 && this.kxn) {
        this.kxn(this.os, this.$Ve);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickExtendToggle]];
  }
  OnStart() {
    this.$Ve = this.GetExtendToggle(0);
    this.$Ve.SetToggleState(0);
  }
  BindClickCallback(t) {
    this.kxn = t;
  }
  Update(t, e) {
    this.os = t;
    t = PublicUtil_1.PublicUtil.GetConfigTextByKey(t).replace("{q_count}", "0").replace("{q_countMax}", "-");
    this.GetText(1)?.SetText(t);
    this.$Ve?.SetToggleStateForce(e ? 1 : 0, false, false);
  }
  GetTidText() {
    return this.os;
  }
  SetToggleState(t) {
    this.$Ve?.SetToggleStateForce(t, false, false);
  }
  GetNodeToggle() {
    return this.$Ve;
  }
}
exports.PlotNodeItem = PlotNodeItem;
//# sourceMappingURL=HandBookQuestPlotItem.js.map