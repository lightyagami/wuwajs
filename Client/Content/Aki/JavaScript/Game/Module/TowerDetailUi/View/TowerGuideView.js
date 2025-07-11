"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerGuideView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const TowerGuidePanel_1 = require("./TowerGuidePanel");
class TowerGuideView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.Vgt = () => {
      this.CloseMe();
      this.SPe?.StopCurrentSequence(false, true);
      this.SPe?.PlayLevelSequenceByName("Close");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIHorizontalLayout], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [14, UE.UIItem]];
    this.BtnBindInfo = [[2, this.Vgt]];
  }
  OnStart() {
    this.GetItem(14).SetUIActive(false);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetItem(4)?.SetUIActive(false);
    new TowerGuidePanel_1.TowerGuidePanel().CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "TowerGuideTitle");
    this.SPe?.StopCurrentSequence(false, true);
    this.SPe?.PlayLevelSequenceByName("StartAtOnce");
  }
  OnAfterDestroy() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTowerGuideClose);
  }
}
exports.TowerGuideView = TowerGuideView;
//# sourceMappingURL=TowerGuideView.js.map