"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleQuestUpdateTipsView = undefined;
const ue_1 = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../../../Ui/UiManager");
const GeneralLogicTreeController_1 = require("../../../GeneralLogicTree/GeneralLogicTreeController");
const QuestController_1 = require("../../../QuestNew/Controller/QuestController");
const BattleChildView_1 = require("../BattleChildView/BattleChildView");
const CombineKeyItem_1 = require("../KeyItem/CombineKeyItem");
const MissionViewStepTextUtil_1 = require("./MissionViewStepTextUtil");
class BattleQuestUpdateTipsView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.Qtt = undefined;
    this.Avi = undefined;
    this.oct = false;
    this._xn = false;
    this.uxn = false;
    this.lct = () => {
      var e;
      if (this.Avi && (e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.Avi.QuestId))) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Quest", 18, "BattleQuestUpdateTipsView:UpdateQuestName", ["QuestName", e.Name]);
        }
        this.GetText(0).SetText(e.Name);
      }
    };
    this._ct = () => {
      if (this.Avi) {
        let e = "";
        if (this.Avi.MissionViewShowData.MainStepInfo) {
          e = MissionViewStepTextUtil_1.MissionViewStepTextUtil.GetStepTextByConfig(this.Avi.MissionViewShowData.Id, this.Avi.MissionViewShowData.MainStepInfo);
        } else if (this.Avi.MissionViewShowData.DataSource === 0) {
          e = GeneralLogicTreeController_1.GeneralLogicTreeController.GetNodeTrackText(this.Avi.MissionViewShowData.Id, this.Avi.NodeId);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Quest", 18, "BattleQuestUpdateTipsView:UpdateNodeDescribe", ["describe", e]);
        }
        this.GetText(1).SetText(e);
      }
    };
    this.bMe = (e, t) => {
      if (t === 1) {
        this.uct();
      }
    };
    this.uct = () => {
      if (!this.oct && this.Avi && this.Avi.QuestId) {
        this.oct = true;
        if (!this.uxn) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.QuestUpdateTipsClickTrack);
          this.uxn = true;
        }
        QuestController_1.QuestNewController.RequestTrackQuest(this.Avi.QuestId, true, 1, 0, () => {
          this.oct = false;
        });
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIText], [1, ue_1.UIText], [2, ue_1.UISprite], [3, ue_1.UIButtonComponent], [4, ue_1.UIItem]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([5, ue_1.UIItem]);
    }
    this.BtnBindInfo = [[3, this.uct]];
  }
  OnStart() {
    this.GetText(0).OnSelfLanguageChange.Bind(this.lct);
    this.GetText(1).OnSelfLanguageChange.Bind(this._ct);
    this.GetItem(4).SetUIActive(true);
  }
  async InitializeAsync(e) {
    var t;
    if (!Info_1.Info.IsInTouch()) {
      t = this.GetItem(5);
      this.Qtt = new CombineKeyItem_1.CombineKeyItem();
      await this.Qtt.CreateThenShowByActorAsync(t.GetOwner());
      this.Qtt.RefreshAction(InputMappingsDefine_1.actionMappings.任务追踪);
    }
  }
  OnBeforeDestroy() {
    this.GetText(0).OnSelfLanguageChange.Unbind();
    this.GetText(1).OnSelfLanguageChange.Unbind();
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.任务追踪, this.bMe);
  }
  OnBeforePlayShowSequence(e) {
    this.UpdateData(e);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.任务追踪, this.bMe);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.任务追踪, this.bMe);
  }
  OnBeforePlayHideSequence() {
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.任务追踪, this.bMe);
    this._xn = true;
  }
  OnAfterPlayHideSequence() {
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.任务追踪, this.bMe);
    this._xn = false;
    if (!this.uxn && this.Avi?.IsNewQuest) {
      QuestController_1.QuestNewController.TryChangeTrackedQuest(ModelManager_1.ModelManager.QuestNewModel.CurShowUpdateTipsQuest);
    }
    ModelManager_1.ModelManager.QuestNewModel.CurShowUpdateTipsQuest = undefined;
    this.Avi = undefined;
  }
  UpdateData(e) {
    this.uxn = false;
    this.RefreshUi(e);
    this.cxn();
    if (this.Avi?.IsNewQuest) {
      ModelManager_1.ModelManager.QuestNewModel.CurShowUpdateTipsQuest = e.QuestId;
    }
  }
  RefreshUi(e) {
    this.Avi = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Quest", 18, "BattleQuestUpdateTipsView:界面刷新", ["任务Id", this.Avi.QuestId]);
    }
    this.Ost();
    this.lct();
    this._ct();
  }
  Ost() {
    var e = this.Avi?.MissionViewShowData.TrackIconConfigId ?? 0;
    var e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(e);
    var t = this.GetSprite(2);
    this.SetSpriteByPath(e, t, false);
  }
  cxn() {
    var e;
    if (this.Avi && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MissionUpdate, this.Avi.IsNewQuest), this.Avi.IsNewQuest) && (e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.Avi.QuestId)?.Type) && (ConfigManager_1.ConfigManager.QuestNewConfig.GetNewTipsShowTime(e) ?? 0)) {
      UiManager_1.UiManager.OpenView("NewMissionTips", this.Avi.QuestId);
    }
  }
  IsClosing() {
    return this._xn;
  }
}
exports.BattleQuestUpdateTipsView = BattleQuestUpdateTipsView;
//# sourceMappingURL=BattleQuestUpdateTipsView.js.map