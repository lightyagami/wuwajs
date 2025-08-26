"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBdBuffStrengthenView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const TrapDefenseBdBuffSelectBdItem_1 = require("./TrapDefenseBdBuffSelectBdItem");
const TrapDefenseBdSumBuffDescPanel_1 = require("./TrapDefenseBdSumBuffDescPanel");
class TrapDefenseBdBuffStrengthenView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.PanelBdBuffDescLeft = undefined;
    this.PanelBdBuffDescRight = undefined;
    this.BdBuffData = undefined;
    this.BdProgressItem = undefined;
    this.OnClickBtnClose = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickBtnClose]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.BdBuffData = ModelManager_1.ModelManager.TrapDefenseModel?.RougeModeData.LastGetBdBuffData;
    var e = this.GetItem(1);
    this.PanelBdBuffDescLeft = new TrapDefenseBdSumBuffDescPanel_1.TrapDefenseBdSumBuffDescPanel();
    await this.PanelBdBuffDescLeft.Init(e);
    var e = this.GetItem(3);
    this.PanelBdBuffDescRight = new TrapDefenseBdSumBuffDescPanel_1.TrapDefenseBdSumBuffDescPanel();
    await this.PanelBdBuffDescRight.Init(e);
    var e = this.GetItem(4);
    this.BdProgressItem = new TrapDefenseBdBuffSelectBdItem_1.TrapDefenseBdBuffSelectBdItem();
    await this.BdProgressItem.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnStart() {}
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnBeforeShow() {
    this.UpdateData();
  }
  OnBeforeDestroy() {}
  OnAfterDestroy() {
    ModelManager_1.ModelManager.TrapDefenseModel?.BdBuffSelectProcessFinish();
  }
  UpdateData() {
    if (this.BdBuffData) {
      this.PanelBdBuffDescLeft.SetActive(true);
      this.PanelBdBuffDescRight.SetActive(true);
      this.PanelBdBuffDescLeft.UpdateDataStrengthenModeBefore(this.BdBuffData);
      this.PanelBdBuffDescRight.UpdateDataStrengthenModeAfter(this.BdBuffData);
      this.NHc();
    }
  }
  NHc() {
    var e = this.BdBuffData.GetBelongBdData();
    var t = !e.IsZeroBdType();
    this.BdProgressItem.SetActive(t);
    if (t) {
      if (ModelManager_1.ModelManager.TrapDefenseModel?.RougeModeData.IsCheckBdProgress) {
        this.BdProgressItem.RefreshCheckProgress(e);
      } else {
        this.BdProgressItem.RefreshItem(e);
      }
    }
  }
  OnAfterPlayStartSequence() {
    this.CheckBdUpStageEffect();
  }
  async CheckBdUpStageEffect() {
    if (ModelManager_1.ModelManager.TrapDefenseModel?.RougeModeData.IsCheckBdProgress) {
      UiLayer_1.UiLayer.SetShowNormalMaskLayer(true);
      if (!this.BdBuffData.GetBelongBdData().IsZeroBdType()) {
        await this.BdProgressItem.CheckPlayUpStageEffect();
      }
      UiLayer_1.UiLayer.SetShowNormalMaskLayer(false);
    }
  }
}
exports.TrapDefenseBdBuffStrengthenView = TrapDefenseBdBuffStrengthenView;
//# sourceMappingURL=TrapDefenseBdBuffStrengthenView.js.map