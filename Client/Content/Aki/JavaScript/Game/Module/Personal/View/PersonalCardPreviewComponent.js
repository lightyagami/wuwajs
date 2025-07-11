"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalCardPreviewComponent = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class PersonalCardPreviewComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UITexture], [5, UE.UITexture], [6, UE.UITexture], [7, UE.UITexture], [8, UE.UIText]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    this.bco();
  }
  bco() {
    this.SPe?.PlaySequencePurely("Start");
  }
  async PlayCloseSequence() {
    var e = new CustomPromise_1.CustomPromise();
    await this.SPe.PlaySequenceAsync("Close", e);
  }
  Refresh(e) {
    this.$8i = e;
    e = ConfigManager_1.ConfigManager.InventoryConfig.GetCardItemConfig(this.$8i.ConfigId);
    this.GetText(3).ShowTextNew(e.Title);
    this.GetText(1).ShowTextNew(e.AttributesDescription);
    this.GetText(2).ShowTextNew(e.Tips);
    this.SetTextureShowUntilLoaded(e.CardPath, this.GetTexture(0));
    this.SetTextureShowUntilLoaded(e.FunctionViewCardPath, this.GetTexture(4));
    this.SetTextureShowUntilLoaded(e.LongCardPath, this.GetTexture(7));
    e = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(4);
    e = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(e);
    if (e !== undefined) {
      const s = this.GetTexture(5);
      s.SetUIActive(false);
      this.SetTextureShowUntilLoaded(e.GetRoleHeadIconCircle(), s, () => {
        s.SetUIActive(true);
      });
      const i = this.GetTexture(6);
      i.SetUIActive(false);
      this.SetTextureShowUntilLoaded(e.GetRoleHeadIconCircle(), i, () => {
        i.SetUIActive(true);
      });
      this.GetText(8).SetText(ModelManager_1.ModelManager.FunctionModel.GetPlayerName());
    }
  }
}
exports.PersonalCardPreviewComponent = PersonalCardPreviewComponent;
//# sourceMappingURL=PersonalCardPreviewComponent.js.map