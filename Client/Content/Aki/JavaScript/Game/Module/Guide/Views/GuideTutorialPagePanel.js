"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideTutorialPagePanel = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GuideDescribeNew_1 = require("./GuideDescribeNew");
class GuideTutorialPagePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
    this.pZt = undefined;
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UITexture]];
  }
  OnStart() {
    this.pZt = new GuideDescribeNew_1.GuideDescribeNew(this.GetText(2));
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.GetTexture(3).SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.SPe.Clear();
    this.SPe = undefined;
  }
  Init(e) {
    this.SetRootActor(e.GetOwner(), true);
    this.pZt = new GuideDescribeNew_1.GuideDescribeNew(this.GetText(2));
  }
  RefreshPage(e) {
    if (e) {
      if (StringUtils_1.StringUtils.IsEmpty(e.SubTitle)) {
        this.GetItem(0).SetUIActive(false);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.SubTitle);
        this.GetItem(0).SetUIActive(true);
      }
      if (!StringUtils_1.StringUtils.IsEmpty(e.Pic)) {
        this.SetTextureByPath(e.Pic, this.GetTexture(3), undefined, () => {
          this.GetTexture(3).SetUIActive(true);
        });
      }
      this.GetText(2).SetUIActive(true);
      this.pZt.SetUpText(e.Content, ...e.Button);
    }
  }
  PlayAnime(e) {
    this.SPe.PlayLevelSequenceByName(e ? "Show" : "Hide");
  }
}
exports.GuideTutorialPagePanel = GuideTutorialPagePanel;
//# sourceMappingURL=GuideTutorialPagePanel.js.map