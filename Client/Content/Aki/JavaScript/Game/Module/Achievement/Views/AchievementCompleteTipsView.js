"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementCompleteTipsView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const AchievementCompleteTipsStarItem_1 = require("./AchievementCompleteTipsStarItem");
class AchievementCompleteTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Xbe = undefined;
    this.$be = undefined;
    this.Ybe = 4000;
    this.Jbe = () => {
      this.CloseMe();
    };
    this.zbe = () => new AchievementCompleteTipsStarItem_1.AchievementCompleteTipsStarItem();
    this.ZDe = () => {
      ModelManager_1.ModelManager.AchievementModel.CurrentFinishAchievementArray.push(this.OpenParam.GetId());
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DisActiveBattleView, this.ZDe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DisActiveBattleView, this.ZDe);
  }
  OnStart() {
    var e;
    var t = this.OpenParam;
    if (t !== undefined) {
      this.$be = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.zbe);
      e = t.GetGroupId();
      e = ModelManager_1.ModelManager.AchievementModel.GetAchievementGroupData(e);
      if (!StringUtils_1.StringUtils.IsEmpty(e.GetTexture())) {
        this.SetTextureByPath(e.GetTexture(), this.GetTexture(0));
      }
      this.GetText(1).SetText(t.GetTitle());
      this.Zbe(t);
      this.Xbe = TimerSystem_1.GameplayTimerSystem.Delay(this.Jbe, this.Ybe);
    }
  }
  Zbe(e) {
    var t = [];
    var i = e.GetMaxStar();
    var s = e.GetAchievementConfigStar();
    for (let e = 0; e < i; e++) {
      var r = s > e;
      t.push(r);
    }
    this.$be.RefreshByData(t);
  }
  OnBeforeDestroy() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.Xbe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.Xbe);
      this.Xbe = undefined;
    }
  }
}
exports.AchievementCompleteTipsView = AchievementCompleteTipsView;
//# sourceMappingURL=AchievementCompleteTipsView.js.map