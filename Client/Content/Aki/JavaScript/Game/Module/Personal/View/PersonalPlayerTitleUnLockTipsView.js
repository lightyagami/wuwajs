"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalPlayerTitleUnLockTipsView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PlayerTitleItem_1 = require("../../Common/PlayerTitleItem");
class PersonalPlayerTitleUnLockTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.rhc = undefined;
    this.Xbe = undefined;
    this.Ybe = 4000;
    this.Jbe = () => {
      if (this.Xbe !== undefined) {
        this.CloseMe();
      }
    };
    this.ZDe = () => {
      ModelManager_1.ModelManager.PersonalModel.CurrentNewUnLockTitleArray.push(this.OpenParam);
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.rhc = new PlayerTitleItem_1.PlayerTitleItem();
    this.rhc.SetIsPreview(true);
    await this.rhc.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    var e;
    var t = this.OpenParam;
    if (t === undefined) {
      this.CloseMe();
    } else {
      e = ModelManager_1.ModelManager.PersonalModel.GetSex();
      this.rhc.Refresh(t.PlayerTitleId, t.StarLevel, e);
      this.Xbe = TimerSystem_1.GameplayTimerSystem.Delay(this.Jbe, this.Ybe);
    }
  }
  OnBeforeDestroy() {
    if (this.Xbe?.Remove()) {
      this.Xbe = undefined;
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DisActiveBattleView, this.ZDe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DisActiveBattleView, this.ZDe);
  }
}
exports.PersonalPlayerTitleUnLockTipsView = PersonalPlayerTitleUnLockTipsView;
//# sourceMappingURL=PersonalPlayerTitleUnLockTipsView.js.map