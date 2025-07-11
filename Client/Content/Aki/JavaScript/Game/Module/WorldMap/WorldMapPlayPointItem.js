"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapPlayPointItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const ExploreProgressDefine_1 = require("../ExploreProgress/ExploreProgressDefine");
const MapExplorePlayProgressPanel_1 = require("../ExploreProgress/View/MapExplorePlayProgressPanel");
class WorldMapPlayPointItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.tNl = undefined;
    this.ExploreData = undefined;
    this.Cxo = undefined;
    this.lQl = new CustomPromise_1.CustomPromise();
    this.eTt = () => {
      if (this.ExploreData) {
        this.ExploreData.TrackPlayPoint();
      }
    };
    this.I8l = e => {
      if (e === "Close") {
        if (this.ExploreData?.SequenceData) {
          e = this.ExploreData.SequenceData;
          this.ExploreData.SetSequenceData();
          this._Ql(e);
        } else {
          this.SetUiActive(false);
          this.Cxo?.PlayLevelSequenceByName("Refresh");
        }
        this.lQl.SetResult();
      }
    };
  }
  async Init(e, s) {
    this.ExploreData = s;
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnBeforeCreate() {
    this.Cxo = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Cxo?.BindSequenceCloseEvent(this.I8l);
  }
  async OnBeforeStartAsync() {
    this.tNl = new MapExplorePlayProgressPanel_1.MapExplorePlayProgressPanel();
    await this.tNl.Init(this.GetHorizontalLayout(3).RootUIComp);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIHorizontalLayout]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  OnBeforeShow() {
    this.Slo(this.ExploreData);
  }
  UpdateAreaItemData(e) {
    if (this.IsShow) {
      this.SetUiActive(true);
      this.Slo(e);
    } else {
      this.ExploreData = e;
    }
  }
  Slo(e) {
    this._Ql(e);
    this.PlayStartToPause();
  }
  _Ql(e) {
    this.ExploreData = e;
    this.tNl.UpdateData(e.GetPlayProgressDataIgnoreHiddenList());
    var s = e.GetNameId();
    this.GetText(1).ShowTextNew(s);
    var s = this.GetSprite(2);
    this.SetSpriteByPath(e.Icon, s, false);
    if (this.lQl.IsFulfilled()) {
      this.lQl = new CustomPromise_1.CustomPromise();
    }
  }
  OnBeforeDestroy() {
    this.Cxo?.Clear();
    this.Cxo = undefined;
  }
  PlayStartToPause() {
    if (this.ExploreData?.IsNewRecommendPlay) {
      this.Cxo?.PlayLevelSequenceByName("Start");
      this.Cxo?.PauseSequence();
      this.SetUiActive(false);
    }
  }
  async ResumeSequence(e) {
    if (this.ExploreData?.IsNewRecommendPlay && (this.ExploreData?.FinishNewRecommendPlay(), await TimerSystem_1.GameplayTimerSystem.Wait(ExploreProgressDefine_1.RECOMMEND_PLAY_DELAY_TIME * e), this.ExploreData)) {
      this.SetUiActive(true);
      if (this.Cxo?.IsPlayingSequence("Start")) {
        this.Cxo?.ResumeSequence();
      } else {
        this.Cxo?.PlayLevelSequenceByName("Start");
      }
    }
  }
  async CheckFinish() {
    if (this.ExploreData?.IsFinishedPlayPoint) {
      this.Cxo?.PlayLevelSequenceByName("Close");
      await this.lQl.Promise;
    }
  }
  CheckPlayPointStateSequence() {
    this.tNl.CheckPlayStateChanged();
  }
  HideMe() {
    this.SetUiActive(false);
    this.ExploreData?.SetSequenceData();
    this.ExploreData = undefined;
    this.lQl.SetResult();
  }
}
exports.WorldMapPlayPointItem = WorldMapPlayPointItem;
//# sourceMappingURL=WorldMapPlayPointItem.js.map