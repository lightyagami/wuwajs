"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardExploreOnlineChallengePlayer = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const RewardExploreOnlineChallengePlayerItem_1 = require("./RewardExploreOnlineChallengePlayerItem");
const MAX_PLAYER_COUNT = 3;
const playerItemIndicesUsedBySeq = [[0, 1, 2], [1, 2, 0], [0, 1, 2]];
const SEQ_NAME_PLAYER_01 = "Start01";
const SEQ_NAME_PLAYER_02 = "Start02";
const SEQ_NAME_PLAYER_03 = "Start03";
const SEQ_NAME_TEX = "Start_T";
const playerItemChildTypes = [2, 1, 3];
const playerItemSeqNames = [SEQ_NAME_PLAYER_01, SEQ_NAME_PLAYER_02, SEQ_NAME_PLAYER_03];
class RewardExploreOnlineChallengePlayer extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.c9_ = false;
    this.u9_ = [];
    this.d9_ = [];
    this.m9_ = [];
    this.SPe = undefined;
    this.SWs = () => {
      this.FullRefresh();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    await this.g9_();
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshOnlineChallengePlayer, this.SWs);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshOnlineChallengePlayer, this.SWs);
  }
  async g9_() {
    await this.SHe();
  }
  FullRefresh() {
    this.bNe();
    this.Og();
  }
  async SHe() {
    this.GetText(0).SetUIActive(false);
    this.u9_ = [];
    var t = [];
    for (let e = 0; e < MAX_PLAYER_COUNT; e++) {
      var i = new RewardExploreOnlineChallengePlayerItem_1.RewardExploreOnlineChallengePlayerItem();
      this.u9_.push(i);
      t.push(i.CreateByActorAsync(this.GetItem(playerItemChildTypes[e]).GetOwner()));
    }
    await Promise.all(t);
  }
  bNe() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers();
    this.d9_ = this.m9_;
    this.m9_ = [];
    for (const t of e) {
      if (ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(t.GetPlayerId()) === 0) {
        this.m9_.push(t.GetPlayerId());
      }
    }
  }
  Og() {
    this.C9_();
    this.p9_();
  }
  C9_() {
    if (this.m9_.length === 0) {
      this.SetUiActive(false);
    } else {
      this.SetUiActive(true);
      var t = playerItemIndicesUsedBySeq[this.m9_.length - 1];
      for (let e = 0; e < MAX_PLAYER_COUNT; e++) {
        if (e < this.m9_.length) {
          this.u9_[t[e]].SetUiActive(true);
          this.u9_[t[e]].Refresh(this.m9_[e]);
        } else {
          this.u9_[t[e]].SetUiActive(false);
        }
      }
    }
  }
  p9_() {
    if (!(this.m9_.length <= this.d9_.length) && !(this.SPe?.PlayLevelSequenceByName(playerItemSeqNames[this.m9_.length - 1]), this.c9_)) {
      this.GetText(0).SetUIActive(true);
      this.SPe?.PlayLevelSequenceByName(SEQ_NAME_TEX);
      this.c9_ = true;
    }
  }
}
exports.RewardExploreOnlineChallengePlayer = RewardExploreOnlineChallengePlayer;
//# sourceMappingURL=RewardExploreOnlineChallengePlayer.js.map