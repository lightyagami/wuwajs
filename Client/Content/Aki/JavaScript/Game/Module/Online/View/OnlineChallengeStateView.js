"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineChallengeStateView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const OnlineChallengePlayerStateItem_1 = require("./OnlineChallengePlayerStateItem");
class OnlineChallengeStateView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.SNi = -1;
    this.TMa = undefined;
    this.pNi = undefined;
    this.LMa = [];
    this.DMa = () => {
      var e = new OnlineChallengePlayerStateItem_1.OnlineChallengePlayerStateItem();
      this.LMa.push(e);
      return e;
    };
    this.$1i = (e, i) => {
      if (i === 1) {
        this.CloseMe();
      } else {
        for (const t of this.LMa) {
          t.SetTeamPlayerSprite(e, i);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIHorizontalLayout], [2, UE.UIText], [3, UE.UISprite]];
  }
  OnStart() {
    this.SNi = ModelManager_1.ModelManager.OnlineModel.ApplyCd;
    this.pNi = this.GetSprite(3);
    this.TMa = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.DMa);
    this.RefreshView();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlayerChallengeStateChange, this.$1i);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlayerChallengeStateChange, this.$1i);
  }
  OnBeforeDestroy() {
    this.pNi = undefined;
    this.SNi = -1;
    this.LMa = [];
  }
  OnTick(e) {
    this.SNi -= e * TimeUtil_1.TimeUtil.Millisecond;
    if (this.SNi <= 0) {
      this.CloseMe();
    } else {
      this.pNi.SetFillAmount(this.SNi / ModelManager_1.ModelManager.OnlineModel.ApplyCd);
    }
  }
  RefreshView() {
    var e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(ModelManager_1.ModelManager.OnlineModel.OwnerId)?.Name;
    if (ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "ChallengeAgain");
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "HasInviteChallengeAgain", e);
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "ContinueChallenge");
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "HasInviteContinueChallenge", e);
    }
    var e = ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers();
    var i = [];
    for (const t of e) {
      i.push(t.GetPlayerId());
    }
    this.TMa.RefreshByData(i);
  }
}
exports.OnlineChallengeStateView = OnlineChallengeStateView;
//# sourceMappingURL=OnlineChallengeStateView.js.map