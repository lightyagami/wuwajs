"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerRewardView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const TowerRewardItem_1 = require("./TowerRewardItem");
class TowerRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.T8e = undefined;
    this.sbi = () => {
      return new TowerRewardItem_1.TowerRewardItem();
    };
    this.uRo = () => {
      this.Og();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIText]];
  }
  OnStart() {
    this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.sbi);
    this.Og();
  }
  OnBeforeDestroy() {
    this.T8e = undefined;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTowerRewardReceived, this.uRo);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTowerRewardReceived, this.uRo);
  }
  Og() {
    var e = this.OpenParam ?? ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties;
    var r = ModelManager_1.ModelManager.TowerModel.GetDifficultyReward(e);
    if (r) {
      r.sort((e, r) => {
        var t = e.IsReceived ? 1 : 0;
        var i = r.IsReceived ? 1 : 0;
        if (t != i) {
          return t - i;
        } else {
          return e.Index - r.Index;
        }
      });
      this.T8e.RefreshByData(r);
      this.GetText(1).SetText(ModelManager_1.ModelManager.TowerModel.GetDifficultyMaxStars(e) + "/" + ModelManager_1.ModelManager.TowerModel.GetDifficultyAllStars(e));
    }
  }
}
exports.TowerRewardView = TowerRewardView;
//# sourceMappingURL=TowerRewardView.js.map