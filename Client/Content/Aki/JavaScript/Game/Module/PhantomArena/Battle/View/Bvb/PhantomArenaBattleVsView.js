"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleVsView = void 0;
const AudioSystem_1 = require("../../../../../../Core/Audio/AudioSystem"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer"),
  PhantomArenaBattleDetailsViewProxy_1 = require("./PhantomArenaBattleDetailsViewProxy");
class PhantomArenaBattleVsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.SequencePlayer = void 0, this.Zau = () => {
      var e = new PhantomArenaBattleDetailsViewProxy_1.PhantomArenaBattleDetailsViewProxy;
      UiManager_1.UiManager.OpenView("PhantomArenaBattleDetailsView", e, () => {
        ModelManager_1.ModelManager.PhantomArenaBattleModel.SetIsInBattle(!0), ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestBvbLoadingFinish(), this.CloseMe()
      })
    }, this.Esu = () => {
      this.SequencePlayer?.PlayLevelSequenceByName("Start01"), AudioSystem_1.AudioSystem.SetState("arena_battle", "battle_3d")
    }
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), this.SequencePlayer.BindSequenceCloseEvent(this.Zau)
  }
  OnAfterShow() {
    UiManager_1.UiManager.IsViewHide("PhantomArenaBattleLoading") && this.Esu()
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaBattleLoadingHide, this.Esu)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaBattleLoadingHide, this.Esu)
  }
}
exports.PhantomArenaBattleVsView = PhantomArenaBattleVsView;
//# sourceMappingURL=PhantomArenaBattleVsView.js.map