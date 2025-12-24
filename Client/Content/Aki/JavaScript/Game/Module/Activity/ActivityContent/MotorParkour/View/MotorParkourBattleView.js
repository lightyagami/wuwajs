"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourBattleView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase");
const MissionPanel_1 = require("../../../../BattleUi/Views/BattleChildViewPanel/MissionPanel");
const MotorParkourMapItem_1 = require("./Item/MotorParkourMapItem");
const MotorParkourRankPanel_1 = require("./Item/MotorParkourRankPanel");
class MotorParkourBattleView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.m_i = undefined;
    this.Jjs = undefined;
    this.Xut = undefined;
    this.OMf = undefined;
    this.GMf = (e, t) => {
      e = this.m_i.GetLapRankList(e, t);
      this.OMf.RefreshRankList(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorParkourFinishLap, this.GMf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorParkourFinishLap, this.GMf);
  }
  async OnBeforeStartAsync() {
    this.m_i = this.OpenParam;
    var e = [];
    this.Jjs = new MotorParkourMapItem_1.MotorParkourMapItem(this.m_i);
    e.push(this.Jjs.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.Xut = new MissionPanel_1.MissionPanel();
    this.Xut.OpenParam = 5;
    e.push(this.Xut.CreateThenShowByResourceIdAsync("UiItem_Mission", this.GetItem(1)));
    this.OMf = new MotorParkourRankPanel_1.MotorParkourRankPanel();
    this.OMf.SetUiActive(false);
    e.push(this.OMf.CreateByActorAsync(this.GetItem(2).GetOwner()));
    await Promise.all(e);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(16, [5], false);
    var e = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()?.Tree;
    if (e) {
      e.SetTrack(false);
      e.SetTrack(true);
    }
  }
  OnTick(e) {
    this.Xut.OnTickBattleChildViewPanel(e);
    this.Jjs.UpdatePlayerPosition();
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(16, [5], true);
    this.Xut.Reset();
  }
}
exports.MotorParkourBattleView = MotorParkourBattleView;
//# sourceMappingURL=MotorParkourBattleView.js.map