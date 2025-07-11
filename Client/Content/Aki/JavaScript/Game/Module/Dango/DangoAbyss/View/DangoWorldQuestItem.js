"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoWorldQuestItem = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const QuestController_1 = require("../../../QuestNew/Controller/QuestController");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const DangoAbyssGoalItem_1 = require("./DangoAbyssGoalItem");
class DangoWorldQuestItem {
  constructor() {
    this.vp1 = 0;
    this.i3c = undefined;
    this.DSe = (e, t, i) => {
      this.n3c();
    };
    this.Kfc = () => {
      this.n3c();
    };
    this.XZe = e => {
      this.n3c();
    };
    this.JZe = (e, t) => {
      this.n3c();
    };
    this.zZe = (e, t) => {
      this.n3c();
    };
    this.Gre = () => {
      this.n3c();
    };
    this.r3c = () => {
      return new DangoAbyssGoalItem_1.DangoAbyssGoalItem();
    };
    this.n3c = () => {
      var e = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
      var t = new Array();
      if (e && e.MainTypeId === 10 && e.SubType === 1) {
        var i;
        var n;
        var s = new DangoAbyssGoalItem_1.GoalPanelData();
        s.Title = ModelManager_1.ModelManager.QuestNewModel.GetQuestName(e.Id);
        var r = e.Tree.GetBlackBoard().GetCurrentActiveChildQuestNode();
        var o = e.Tree.GetBlackBoard().CreateShowData();
        if (o.MainStepInfo) {
          n = ModelManager_1.ModelManager.QuestNewModel.CheckBehaviorStepFinishState(o.MainStepInfo, e.Tree.TreeIncId);
          i = PublicUtil_1.PublicUtil.GetConfigTextByKey(o.MainStepInfo.TidTitle);
          if (n === 1) {
            n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DangoMainQuestColor") ?? "";
            n = StringUtils_1.StringUtils.Format(n, i) + "\n";
            s.Desc += n;
          } else {
            n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DangoMainQuest") ?? "";
            n = StringUtils_1.StringUtils.Format(n, i) + "\n";
            s.Desc += n;
          }
        }
        if (o.SubStepInfos) {
          for (const a of o.SubStepInfos) {
            var _ = ModelManager_1.ModelManager.QuestNewModel.CheckBehaviorStepFinishState(a, e.Tree.TreeIncId);
            var l = PublicUtil_1.PublicUtil.GetConfigTextByKey(a.TidTitle);
            if (_ === 1) {
              _ = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("AbyssQuestColor");
              _ = StringUtils_1.StringUtils.Format(_, l) + "\n";
              s.Desc += _;
            } else {
              s.Desc += l + "\n";
            }
          }
        }
        if (r && r.TrackTextConfig) {
          s.Desc += r.MultiTrackText;
        }
        t.push(s);
      }
      this.i3c.RefreshByData(t);
    };
  }
  Init(e, t) {
    this.i3c = new GenericScrollViewNew_1.GenericScrollViewNew(e, this.r3c);
    this.AddEvents();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText, this.XZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText, this.JZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText, this.zZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MissionPanelStepConditionIndexChange, this.Kfc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.Gre);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText, this.XZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText, this.JZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText, this.zZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MissionPanelStepConditionIndexChange, this.Kfc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.Gre);
  }
  Clear() {
    this.RemoveEvents();
  }
  Refresh() {
    this.n3c();
  }
  yp1() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestsByTypeAndSubType(10, 1);
    if (e.length !== 0) {
      for (const i of e) {
        var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i.Id);
        if (t === 1 || t === 2) {
          return i.Id;
        }
      }
    }
    return 0;
  }
  Tick() {
    var e;
    var t = this.yp1();
    if (t !== 0 && !(e = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest(), t === this.vp1 && this.vp1 === e?.Id) && !(this.vp1 = t, (e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.vp1))?.IsSuspend())) {
      QuestController_1.QuestNewController.RequestTrackQuest(this.vp1, true, 2);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, e.Tree.BtType, e.Tree.TreeIncId);
    }
  }
}
exports.DangoWorldQuestItem = DangoWorldQuestItem;
//# sourceMappingURL=DangoWorldQuestItem.js.map