"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleVsView = undefined;
const AudioSystem_1 = require("../../../../../../Core/Audio/AudioSystem");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const PhantomArenaBattleDetailsViewProxy_1 = require("./PhantomArenaBattleDetailsViewProxy");
class PhantomArenaBattleVsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.SequencePlayer = undefined;
    this.Amu = () => {
      var e = new PhantomArenaBattleDetailsViewProxy_1.PhantomArenaBattleDetailsViewProxy();
      UiManager_1.UiManager.OpenView("PhantomArenaBattleDetailsView", e, () => {
        ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestBvbLoadingFinish();
        this.CloseMe();
      });
    };
    this.Quu = () => {
      this.SequencePlayer?.PlayLevelSequenceByName("Start01");
      AudioSystem_1.AudioSystem.SetState("arena_battle", "battle_3d");
    };
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SequencePlayer.BindSequenceCloseEvent(this.Amu);
  }
  OnAfterShow() {
    if (UiManager_1.UiManager.IsViewHide("PhantomArenaBattleLoading")) {
      this.Quu();
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaBattleLoadingHide, this.Quu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaBattleLoadingHide, this.Quu);
  }
}
exports.PhantomArenaBattleVsView = PhantomArenaBattleVsView;
//# sourceMappingURL=PhantomArenaBattleVsView.js.map