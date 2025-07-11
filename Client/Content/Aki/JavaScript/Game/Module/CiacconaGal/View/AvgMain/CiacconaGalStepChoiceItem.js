"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalStepChoiceItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CiacconaGalDefine_1 = require("../../CiacconaGalDefine");
class CiacconaGalStepChoiceItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.eLc = undefined;
    this.Gtr = 0;
    this.H5e = undefined;
    this.Hea = undefined;
    this.OZt = () => {
      ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.OnClick(this.eLc.Id);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIExtendToggleTextureTransition]];
    this.BtnBindInfo = [[0, this.OZt]];
  }
  OnStart() {
    this.H5e = this.GetExtendToggle(0);
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnAfterShow() {
    this.Hea?.PlayLevelSequenceByName("Start");
  }
  Refresh(e, i, t) {
    this.eLc = e;
    this.Dke();
    this._Oe();
  }
  Dke() {
    if (this.eLc) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.eLc.Content);
    }
  }
  _Oe() {
    if (this.eLc) {
      this.H5e?.OnPointUpCallBack.Unbind();
      switch (this.eLc.State) {
        case 0:
          if (this.Gtr === 1) {
            this.Hea?.PlayLevelSequenceByName("Use");
          }
          this.ehi("T_PlotReasoningIcon04");
          this.H5e?.SetToggleState(0);
          break;
        case 1:
          this.ehi("T_PlotReasoningIcon02");
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), CiacconaGalDefine_1.TEXT_CIACCONA_LOCKING_BY_INSPIRATION, [this.eLc.RequiredInspiration]);
          this.H5e?.SetToggleState(0);
          break;
        case 2:
          this.ehi("T_PlotReasoningIcon01");
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.eLc.Content);
          this.H5e?.SetToggleState(0);
          break;
        case 3:
          this.ehi("T_PlotReasoningIcon03");
          this.H5e?.SetToggleState(2);
          this.H5e?.OnPointUpCallBack.Bind(this.OZt);
      }
      this.Gtr = this.eLc.State;
    }
  }
  async ehi(e) {
    var i = this.GetUiExtendToggleTextureTransition(2);
    await this.SetExtendToggleTextureTransitionByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e), i);
    i.GetRootComponent().SetUIActive(true);
  }
}
exports.CiacconaGalStepChoiceItem = CiacconaGalStepChoiceItem;
//# sourceMappingURL=CiacconaGalStepChoiceItem.js.map