"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapNoteItem = undefined;
const UE = require("ue");
const MapNoteById_1 = require("../../../Core/Define/ConfigQuery/MapNoteById");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const ExploreProgressDefine_1 = require("../ExploreProgress/ExploreProgressDefine");
class WorldMapNoteItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.MCt = 0;
    this.NTt = undefined;
    this.Cxo = undefined;
    this.eTt = () => {
      this.NTt(this.MCt);
    };
    e.SetUIActive(true);
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[2, this.eTt]];
  }
  OnStart() {}
  OnBeforeDestroy() {
    this.Cxo?.Clear();
    this.Cxo = undefined;
  }
  UpdateNoteItem(e, t, s) {
    var i = this.GetSprite(0);
    var e = MapNoteById_1.configMapNoteById.GetConfig(e);
    this.SetSpriteByPath(e.Icon, i, true);
    var i = this.GetText(1);
    var r = e.Desc;
    i.ShowTextNew(r);
    var i = e.Style;
    this.GetItem(3).SetUIActive(i === 0);
    this.GetItem(6).SetUIActive(i === 0);
    this.GetItem(4).SetUIActive(i === 1);
    this.GetItem(5).SetUIActive(i === 1);
    this.MCt = s;
    this.NTt = t;
  }
  PlayStartToPause() {
    this.Cxo ||= new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Cxo.PlayLevelSequenceByName("Start");
    this.Cxo.PauseSequence();
    this.RootItem?.SetUIActive(false);
  }
  async ResumeSequence(e) {
    if (this.Cxo) {
      if (e > 0) {
        await TimerSystem_1.GameplayTimerSystem.Wait(ExploreProgressDefine_1.RECOMMEND_PLAY_DELAY_TIME * e);
      }
      this.RootItem?.SetUIActive(true);
      this.Cxo?.ResumeSequence();
    }
  }
}
exports.WorldMapNoteItem = WorldMapNoteItem;
//# sourceMappingURL=WorldMapNoteItem.js.map