"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelpGuidePage = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class HelpGuidePage extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UITexture]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.GetTexture(3).SetUIActive(false);
    this.GetText(2).SetUIActive(false);
    this.GetItem(0).SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.SPe.Clear();
    this.SPe = undefined;
  }
  RefreshPage(e) {
    var i;
    if (e && (i = !StringUtils_1.StringUtils.IsEmpty(e.Picture), this.GetTexture(3).SetUIActive(i), i && this.SetTextureByPath(e.Picture, this.GetTexture(3), undefined, () => {
      this.GetTexture(3).SetUIActive(true);
    }), i = !StringUtils_1.StringUtils.IsEmpty(e.Content), this.GetText(2).SetUIActive(i), i)) {
      this.GetText(2).ShowTextNew(e.Content);
    }
  }
  PlayAnime(e) {
    this.SPe.PlayLevelSequenceByName(e ? "Show" : "Hide");
  }
}
exports.HelpGuidePage = HelpGuidePage;
//# sourceMappingURL=HelpGuidePage.js.map