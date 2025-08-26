"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBdBuffGetView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const TrapDefenseBdBuffSelectBdItem_1 = require("./TrapDefenseBdBuffSelectBdItem");
const TrapDefenseBdSumBuffDescPanel_1 = require("./TrapDefenseBdSumBuffDescPanel");
class TrapDefenseBdBuffGetView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.PanelBdBuffDesc = undefined;
    this.BdProgressItem = undefined;
    this.BdBuffData = undefined;
    this.OnClickBtnClose = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickBtnClose]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.BdBuffData = ModelManager_1.ModelManager.TrapDefenseModel?.RougeModeData.LastGetBdBuffData;
    var e = this.GetItem(1);
    this.PanelBdBuffDesc = new TrapDefenseBdSumBuffDescPanel_1.TrapDefenseBdSumBuffDescPanel();
    await this.PanelBdBuffDesc.Init(e);
    this.PanelBdBuffDesc.OnCanClickCallback = () => false;
    var e = this.GetItem(2);
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
  UpdateData() {
    if (this.BdBuffData) {
      this.PanelBdBuffDesc.SetActive(true);
      this.PanelBdBuffDesc.UpdateDataGetMode(this.BdBuffData);
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
  OnAfterDestroy() {}
}
exports.TrapDefenseBdBuffGetView = TrapDefenseBdBuffGetView;
//# sourceMappingURL=TrapDefenseBdBuffGetView.js.map