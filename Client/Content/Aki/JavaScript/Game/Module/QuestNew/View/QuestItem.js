"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestItem = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  FunctionConditionByFunctionId_1 = require("../../../../Core/Define/ConfigQuery/FunctionConditionByFunctionId"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  QuestTagById_1 = require("../../../../Core/Define/ConfigQuery/QuestTagById"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GeneralLogicTreeController_1 = require("../../GeneralLogicTree/GeneralLogicTreeController"),
  MapUtil_1 = require("../../Map/MapUtil"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  TICK_INTERVAL = 1e3;
class QuestItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), this.QuestId = 0, this.TreeId = BigInt(0), this.QuestType = 0, this.qGn = !1, this.e8 = 0, this.Cno = void 0, this.Mno = void 0, this.Cno = e
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIExtendToggle],
      [5, UE.UISprite],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UITexture],
      [9, UE.UISprite],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UISprite],
      [13, UE.UIText],
      [14, UE.UISprite]
    ]
  }
  OnStart() {
    this.Mno = this.GetItem(7).GetOwner().GetComponentByClass(UE.UIExtendToggleSpriteTransition.StaticClass()), this.Mno.SetEnable(!1), this.GetItem(7).SetColor(this.Mno.TransitionState.CheckedHoverState.Color), this.GetExtendToggle(4)?.SetToggleState(0)
  }
  OnTick(e) {
    this.QuestId && (this.e8 > TICK_INTERVAL && (this.e8 -= TICK_INTERVAL, this.GGn(this.QuestId, !0)), this.e8 += e)
  }
  UpdateItem(e, t) {
    this.QuestId = e, this.QuestType = t, this.gno(), this.UpdateTrackIconActive();
    e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.QuestId);
    e ? (this.TreeId = e.TreeId ?? BigInt(0), this.Eno(e), this.Sno(), this.yno(e), this.lct(e), this.Ino(e), this.UpdateFunctionIcon(e), this.Tno(e), this.kfa(e), t = ModelManager_1.ModelManager.QuestNewModel.IsInFocusOnQuest(this.QuestId), this.GetSprite(14)?.SetUIActive(t), RedDotController_1.RedDotController.BindRedDot("QuestViewItem", this.GetItem(6), void 0, this.QuestId)) : Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 18, "任务界面任务Item更新时找不到任务", ["任务Id", this.QuestId])
  }
  SetActiveItem(e) {
    this.SetActive(e), e || RedDotController_1.RedDotController.UnBindRedDot("QuestViewItem")
  }
  Eno(e) {
    var e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeColor(e.Type),
      t = this.GetSprite(5);
    StringUtils_1.StringUtils.IsEmpty(e) ? t.SetUIActive(!1) : (t.SetUIActive(!0), t.SetColor(UE.Color.FromHex(e)))
  }
  Sno() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestLockIconPath(this.QuestId),
      t = this.GetSprite(1);
    StringUtils_1.StringUtils.IsEmpty(e) || ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id === this.QuestId ? t.SetUIActive(!1) : (this.SetSpriteByPath(e, t, !0), t.SetUIActive(!0))
  }
  yno(e) {
    this.SetSpriteByPath(ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(e.QuestMarkId), this.GetSprite(0), !1)
  }
  UpdateTrackIconActive() {
    var e = this.GetExtendToggle(4).ToggleState;
    this.Lno(e), this.GetSprite(0).SetUIActive(this.QuestId === ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id)
  }
  gno() {
    this.GetExtendToggle(4).OnStateChange.Add(e => {
      1 === e && this.Cno(this.QuestId)
    })
  }
  lct(e) {
    this.GetText(2).SetText(e.Name)
  }
  Ino(e) {
    var t, i, a, r = this.GetText(3);
    e.IsSuspend() || !(t = e.GetCurrentActiveChildQuestNode()) || !GeneralLogicTreeController_1.GeneralLogicTreeController.IsShowNodeTrackDistance(e.TreeId, t.NodeId) || !(i = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e.TreeId)) || (a = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), 3 === MapUtil_1.MapUtil.GetDungeonsRelation(a, i.DungeonId)) || (a = e.GetTrackDistance(t.NodeId), e.IsInTrackRange()) || !a ? r.SetUIActive(!1) : (LguiUtil_1.LguiUtil.SetLocalText(r, "Meter", a), r.SetUIActive(!0))
  }
  UpdateFunctionIcon(e) {
    var t = this.GetTexture(8),
      i = this.GetSprite(9);
    (e && 7 === e.Type && e.FunctionId && (e = FunctionConditionByFunctionId_1.configFunctionConditionByFunctionId.GetConfig(e.FunctionId)) ? StringUtils_1.StringUtils.IsBlank(e.Icon) ? StringUtils_1.StringUtils.IsBlank(e.IconSprite) ? (t.SetUIActive(!1), i) : (this.SetSpriteByPath(e.IconSprite, i, !1), i.SetUIActive(!0), t) : (this.SetTextureByPath(e.Icon, t), t.SetUIActive(!0), i) : (t.SetUIActive(!1), i)).SetUIActive(!1)
  }
  Tno(t) {
    var e = ModelManager_1.ModelManager.QuestNewModel,
      i = (this.qGn = !1, this.GetText(10));
    let a = void 0,
      r = void 0;
    switch (e.GetQuestSpecialState(t)) {
      case 4:
        a = t.GetSuspendText()?.split("，")[0], r = CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableColor") ?? "";
        break;
      case 5:
        a = ConfigManager_1.ConfigManager.TextConfig.GetTextById("SuspendByOnline") ?? "SuspendByOnline", r = CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableColor") ?? "";
        break;
      case 7:
        a = t.GetRefOccupiedEntityText()?.split("，")[0], r = CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableColor") ?? "";
        break;
      case 1:
        a = ModelManager_1.ModelManager.QuestNewModel.GetShowQuestConditionDescribe(t.Id), r = CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableColor") ?? "";
        break;
      case 2:
        a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DownloadResource") ?? "DownloadResource", r = CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableColor") ?? "";
        break;
      case 6: {
        var o = t.GetRecommendPreQuest();
        let e = "";
        o?.length && (e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(o[0])?.Name ?? ""), LguiUtil_1.LguiUtil.SetLocalText(i, "QuestRecommendTip", e), r = CommonParamById_1.configCommonParamById.GetStringConfig("TaskRemindColor") ?? "";
        break
      }
      case 8:
        a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Task_Focus_Tips01") ?? "Task_Focus_Tips01", r = CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableColor") ?? "";
        break;
      case 11:
      case 12:
        this.qGn = !0, this.GGn(t.Id, !1), r = CommonParamById_1.configCommonParamById.GetStringConfig("TaskCountDownColor") ?? ""
    }
    r && !StringUtils_1.StringUtils.IsBlank(r) && (e = UE.Color.FromHex(r), i.SetColor(e)), a && !StringUtils_1.StringUtils.IsBlank(a) ? (i.SetText(a), i.SetUIActive(!0)) : i.SetUIActive(!1)
  }
  GGn(i, a) {
    if (this.qGn)
      if (ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.QuestId)) {
        var r = this.GetText(10);
        let e = 0,
          t = void 0;
        if (0 === (e = ModelManager_1.ModelManager.QuestNewModel.GetQuestBindingActivityId(i))) {
          if (e = ModelManager_1.ModelManager.QuestNewModel.GetQuestActivityId(i), !(t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)) || !ModelManager_1.ModelManager.QuestNewModel.GetQuestShowQuestLeftTime(i)) return void r.SetUIActive(!1)
        } else if (!(t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)) || !t.LocalConfig?.IfShowQuestLeftTime) return void r.SetUIActive(!1);
        var o, n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityRemainingTime");
        n ? t.CheckIfInOpenTime() ? t.EndOpenTime ? (o = TimeUtil_1.TimeUtil.GetServerTime(), o = t.EndOpenTime - o, o = ModelManager_1.ModelManager.QuestNewModel.GetActivityGuideQuestRemainTimeText(o, n), r.SetText(o)) : r.SetUIActive(!1) : a && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityQuestCountdownEnd, i), this.qGn = !1) : r.SetUIActive(!1)
      } else a && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityQuestCountdownEnd, i), this.qGn = !1)
  }
  kfa(e) {
    var t, i, a = this.GetItem(11);
    a && (e.TagId ? (t = QuestTagById_1.configQuestTagById.GetConfig(e.TagId)) ? ((i = this.GetSprite(12)) && (this.SetSpriteByPath(t.BgSpritePath, i, !1), i.SetUIActive(!0)), (i = this.GetText(13)) && (LguiUtil_1.LguiUtil.SetLocalTextNew(i, t.Text), i.SetUIActive(!0)), a.SetUIActive(!0)) : Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 18, "找不到任务标签配置", ["questId", e.Id], ["TagId", e.TagId]) : a.SetUIActive(!1))
  }
  SetSelected(e) {
    var t = e ? 1 : 0;
    this.GetExtendToggle(4).SetToggleState(t, !1), e && this.Dno(), this.Lno(t)
  }
  Lno(e) {
    var t = this.GetItem(7);
    1 === e ? (this.QuestId !== ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id ? t.SetUIActive(!0) : t.SetUIActive(!1), e = this.GetSprite(1), t?.GetParentAsUIItem()?.SetUIActive(!e.bIsUIActive)) : t.SetUIActive(!1)
  }
  SetNotAllowNoneSelect() {
    var e = this.GetExtendToggle(4);
    e.RootUIComp.SetRaycastTarget(1 !== e.ToggleState)
  }
  Dno() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateQuestDetails, this.QuestId, !0)
  }
  GetTaskToggleItem() {
    return this.GetExtendToggle(4).RootUIComp
  }
  OnBeforeDestroy() {}
}
exports.QuestItem = QuestItem;
//# sourceMappingURL=QuestItem.js.map