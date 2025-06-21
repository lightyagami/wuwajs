"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoWorldQuestItem = void 0;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  DangoAbyssGoalItem_1 = require("./DangoAbyssGoalItem");
class DangoWorldQuestItem {
  constructor() {
    this.X01 = 0, this.i3c = void 0, this.DSe = (e, t, i) => {
      this.n3c()
    }, this.Kfc = () => {
      this.n3c()
    }, this.XZe = e => {
      this.n3c()
    }, this.JZe = (e, t) => {
      this.n3c()
    }, this.zZe = (e, t) => {
      this.n3c()
    }, this.Gre = () => {
      this.n3c()
    }, this.r3c = () => {
      return new DangoAbyssGoalItem_1.DangoAbyssGoalItem
    }, this.n3c = () => {
      var e = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest(),
        t = new Array;
      if (e && 10 === e.MainTypeId && 1 === e.SubType) {
        var i, n, s = new DangoAbyssGoalItem_1.GoalPanelData,
          r = (s.Title = ModelManager_1.ModelManager.QuestNewModel.GetQuestName(e.Id), e.Tree.GetBlackBoard().GetCurrentActiveChildQuestNode()),
          o = e.Tree.GetBlackBoard().CreateShowData();
        if (o.MainStepText && (n = ModelManager_1.ModelManager.QuestNewModel.CheckBehaviorStepFinishState(o.MainStepText, e.Tree.TreeIncId), i = PublicUtil_1.PublicUtil.GetConfigTextByKey(o.MainStepText.TidTitle), 1 === n ? (n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DangoMainQuestColor") ?? "", n = StringUtils_1.StringUtils.Format(n, i) + "\n", s.Desc += n) : (n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DangoMainQuest") ?? "", n = StringUtils_1.StringUtils.Format(n, i) + "\n", s.Desc += n)), o.SubStepTexts)
          for (const a of o.SubStepTexts) {
            var _ = ModelManager_1.ModelManager.QuestNewModel.CheckBehaviorStepFinishState(a, e.Tree.TreeIncId),
              l = PublicUtil_1.PublicUtil.GetConfigTextByKey(a.TidTitle);
            1 === _ ? (_ = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("AbyssQuestColor"), _ = StringUtils_1.StringUtils.Format(_, l) + "\n", s.Desc += _) : s.Desc += l + "\n"
          }
        r && r.TrackTextConfig && (s.Desc += r.MultiTrackText), t.push(s)
      }
      this.i3c.RefreshByData(t)
    }
  }
  Init(e, t) {
    this.i3c = new GenericScrollViewNew_1.GenericScrollViewNew(e, this.r3c), this.AddEvents()
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.DSe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText, this.XZe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText, this.JZe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText, this.zZe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MissionPanelStepConditionIndexChange, this.Kfc), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.Gre)
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.DSe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText, this.XZe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText, this.JZe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText, this.zZe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MissionPanelStepConditionIndexChange, this.Kfc), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.Gre)
  }
  Clear() {
    this.RemoveEvents()
  }
  Refresh() {
    this.n3c()
  }
  Y01() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestsByTypeAndSubType(10, 1);
    if (0 !== e.length)
      for (const i of e) {
        var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i.Id);
        if (1 === t || 2 === t) return i.Id
      }
    return 0
  }
  Tick() {
    var e, t = this.Y01();
    0 === t || (e = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest(), t === this.X01 && this.X01 === e?.Id) || (this.X01 = t, (e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.X01))?.IsSuspend()) || (QuestController_1.QuestNewController.RequestTrackQuest(this.X01, !0, 2), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, e.Tree.BtType, e.Tree.TreeIncId))
  }
}
exports.DangoWorldQuestItem = DangoWorldQuestItem;
//# sourceMappingURL=DangoWorldQuestItem.js.map