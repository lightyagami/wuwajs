"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const FunctionConditionByFunctionId_1 = require("../../../../Core/Define/ConfigQuery/FunctionConditionByFunctionId");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const QuestTagById_1 = require("../../../../Core/Define/ConfigQuery/QuestTagById");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GeneralLogicTreeController_1 = require("../../GeneralLogicTree/GeneralLogicTreeController");
const MapUtil_1 = require("../../Map/MapUtil");
const LguiUtil_1 = require("../../Util/LguiUtil");
const TICK_INTERVAL = 1000;
class QuestItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.QuestId = 0;
    this.TreeId = BigInt(0);
    this.QuestType = 0;
    this.qGn = false;
    this.e8 = 0;
    this.Cno = undefined;
    this.Mno = undefined;
    this.Cno = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText], [4, UE.UIExtendToggle], [5, UE.UISprite], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UISprite], [10, UE.UIText], [11, UE.UIItem], [12, UE.UISprite], [13, UE.UIText], [14, UE.UISprite]];
  }
  OnStart() {
    this.Mno = this.GetItem(7).GetOwner().GetComponentByClass(UE.UIExtendToggleSpriteTransition.StaticClass());
    this.Mno.SetEnable(false);
    this.GetItem(7).SetColor(this.Mno.TransitionState.CheckedHoverState.Color);
    this.GetExtendToggle(4)?.SetToggleState(0);
  }
  OnTick(e) {
    if (this.QuestId) {
      if (this.e8 > TICK_INTERVAL) {
        this.e8 -= TICK_INTERVAL;
        this.GGn(this.QuestId, true);
      }
      this.e8 += e;
    }
  }
  UpdateItem(e, t) {
    this.QuestId = e;
    this.QuestType = t;
    this.gno();
    this.UpdateTrackIconActive();
    e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.QuestId);
    if (e) {
      this.TreeId = e.TreeId ?? BigInt(0);
      this.Eno(e);
      this.Sno();
      this.yno(e);
      this.lct(e);
      this.Ino(e);
      this.UpdateFunctionIcon(e);
      this.Tno(e);
      this.kfa(e);
      t = ModelManager_1.ModelManager.QuestNewModel.IsInFocusOnQuest(this.QuestId);
      this.GetSprite(14)?.SetUIActive(t);
      RedDotController_1.RedDotController.BindRedDot("QuestViewItem", this.GetItem(6), undefined, this.QuestId);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Quest", 18, "任务界面任务Item更新时找不到任务", ["任务Id", this.QuestId]);
    }
  }
  SetActiveItem(e) {
    this.SetActive(e);
    if (!e) {
      RedDotController_1.RedDotController.UnBindRedDot("QuestViewItem");
    }
  }
  Eno(e) {
    var e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeColor(e.Type);
    var t = this.GetSprite(5);
    if (StringUtils_1.StringUtils.IsEmpty(e)) {
      t.SetUIActive(false);
    } else {
      t.SetUIActive(true);
      t.SetColor(UE.Color.FromHex(e));
    }
  }
  Sno() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestLockIconPath(this.QuestId);
    var t = this.GetSprite(1);
    if (StringUtils_1.StringUtils.IsEmpty(e) || ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id === this.QuestId) {
      t.SetUIActive(false);
    } else {
      this.SetSpriteByPath(e, t, true);
      t.SetUIActive(true);
    }
  }
  yno(e) {
    this.SetSpriteByPath(ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(e.QuestMarkId), this.GetSprite(0), false);
  }
  UpdateTrackIconActive() {
    var e = this.GetExtendToggle(4).ToggleState;
    this.Lno(e);
    this.GetSprite(0).SetUIActive(this.QuestId === ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id);
  }
  gno() {
    this.GetExtendToggle(4).OnStateChange.Add(e => {
      if (e === 1) {
        this.Cno(this.QuestId);
      }
    });
  }
  lct(e) {
    this.GetText(2).SetText(e.Name);
  }
  Ino(e) {
    var t;
    var i;
    var a;
    var r = this.GetText(3);
    if (e.IsSuspend() || !(t = e.GetCurrentActiveChildQuestNode()) || !GeneralLogicTreeController_1.GeneralLogicTreeController.IsShowNodeTrackDistance(e.TreeId, t.NodeId) || !(i = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e.TreeId)) || (a = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), MapUtil_1.MapUtil.GetDungeonsRelation(a, i.DungeonId) === 3) || (a = e.GetTrackDistance(t.NodeId), e.IsInTrackRange()) || !a) {
      r.SetUIActive(false);
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(r, "Meter", a);
      r.SetUIActive(true);
    }
  }
  UpdateFunctionIcon(e) {
    var t = this.GetTexture(8);
    var i = this.GetSprite(9);
    (e && e.Type === 7 && e.FunctionId && (e = FunctionConditionByFunctionId_1.configFunctionConditionByFunctionId.GetConfig(e.FunctionId)) ? StringUtils_1.StringUtils.IsBlank(e.Icon) ? StringUtils_1.StringUtils.IsBlank(e.IconSprite) ? (t.SetUIActive(false), i) : (this.SetSpriteByPath(e.IconSprite, i, false), i.SetUIActive(true), t) : (this.SetTextureByPath(e.Icon, t), t.SetUIActive(true), i) : (t.SetUIActive(false), i)).SetUIActive(false);
  }
  Tno(t) {
    var e = ModelManager_1.ModelManager.QuestNewModel;
    this.qGn = false;
    var i = this.GetText(10);
    let a = undefined;
    let r = undefined;
    switch (e.GetQuestSpecialState(t)) {
      case 4:
        a = t.GetSuspendText()?.split("，")[0];
        r = CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableColor") ?? "";
        break;
      case 5:
        a = ConfigManager_1.ConfigManager.TextConfig.GetTextById("SuspendByOnline") ?? "SuspendByOnline";
        r = CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableColor") ?? "";
        break;
      case 7:
        a = t.GetRefOccupiedEntityText()?.split("，")[0];
        r = CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableColor") ?? "";
        break;
      case 1:
        a = ModelManager_1.ModelManager.QuestNewModel.GetShowQuestConditionDescribe(t.Id);
        r = CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableColor") ?? "";
        break;
      case 2:
        a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DownloadResource") ?? "DownloadResource";
        r = CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableColor") ?? "";
        break;
      case 6:
        {
          var o = t.GetRecommendPreQuest();
          let e = "";
          if (o?.length) {
            e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(o[0])?.Name ?? "";
          }
          LguiUtil_1.LguiUtil.SetLocalText(i, "QuestRecommendTip", e);
          r = CommonParamById_1.configCommonParamById.GetStringConfig("TaskRemindColor") ?? "";
          break;
        }
      case 8:
        a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Task_Focus_Tips01") ?? "Task_Focus_Tips01";
        r = CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableColor") ?? "";
        break;
      case 11:
      case 12:
        this.qGn = true;
        this.GGn(t.Id, false);
        r = CommonParamById_1.configCommonParamById.GetStringConfig("TaskCountDownColor") ?? "";
    }
    if (r && !StringUtils_1.StringUtils.IsBlank(r)) {
      e = UE.Color.FromHex(r);
      i.SetColor(e);
    }
    if (a && !StringUtils_1.StringUtils.IsBlank(a)) {
      i.SetText(a);
      i.SetUIActive(true);
    } else {
      i.SetUIActive(false);
    }
  }
  GGn(i, a) {
    if (this.qGn) {
      if (ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.QuestId)) {
        var r = this.GetText(10);
        let e = 0;
        let t = undefined;
        if ((e = ModelManager_1.ModelManager.QuestNewModel.GetQuestBindingActivityId(i)) === 0) {
          e = ModelManager_1.ModelManager.QuestNewModel.GetQuestActivityId(i);
          if (!(t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)) || !ModelManager_1.ModelManager.QuestNewModel.GetQuestShowQuestLeftTime(i)) {
            r.SetUIActive(false);
            return;
          }
        } else if (!(t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)) || !t.LocalConfig?.IfShowQuestLeftTime) {
          r.SetUIActive(false);
          return;
        }
        var o;
        var n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityRemainingTime");
        if (n) {
          if (t.CheckIfInOpenTime()) {
            if (t.EndOpenTime) {
              o = TimeUtil_1.TimeUtil.GetServerTime();
              o = t.EndOpenTime - o;
              o = ModelManager_1.ModelManager.QuestNewModel.GetActivityGuideQuestRemainTimeText(o, n);
              r.SetText(o);
            } else {
              r.SetUIActive(false);
            }
          } else if (a) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityQuestCountdownEnd, i);
            this.qGn = false;
          }
        } else {
          r.SetUIActive(false);
        }
      } else if (a) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityQuestCountdownEnd, i);
        this.qGn = false;
      }
    }
  }
  kfa(e) {
    var t;
    var i;
    var a = this.GetItem(11);
    if (a) {
      if (e.TagId) {
        if (t = QuestTagById_1.configQuestTagById.GetConfig(e.TagId)) {
          if (i = this.GetSprite(12)) {
            this.SetSpriteByPath(t.BgSpritePath, i, false);
            i.SetUIActive(true);
          }
          if (i = this.GetText(13)) {
            LguiUtil_1.LguiUtil.SetLocalTextNew(i, t.Text);
            i.SetUIActive(true);
          }
          a.SetUIActive(true);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Quest", 18, "找不到任务标签配置", ["questId", e.Id], ["TagId", e.TagId]);
        }
      } else {
        a.SetUIActive(false);
      }
    }
  }
  SetSelected(e) {
    var t = e ? 1 : 0;
    this.GetExtendToggle(4).SetToggleState(t, false);
    if (e) {
      this.Dno();
    }
    this.Lno(t);
  }
  Lno(e) {
    var t = this.GetItem(7);
    if (e === 1) {
      if (this.QuestId !== ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id) {
        t.SetUIActive(true);
      } else {
        t.SetUIActive(false);
      }
      e = this.GetSprite(1);
      t?.GetParentAsUIItem()?.SetUIActive(!e.bIsUIActive);
    } else {
      t.SetUIActive(false);
    }
  }
  SetNotAllowNoneSelect() {
    var e = this.GetExtendToggle(4);
    e.RootUIComp.SetRaycastTarget(e.ToggleState !== 1);
  }
  Dno() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateQuestDetails, this.QuestId, true);
  }
  GetTaskToggleItem() {
    return this.GetExtendToggle(4).RootUIComp;
  }
  OnBeforeDestroy() {}
}
exports.QuestItem = QuestItem;
//# sourceMappingURL=QuestItem.js.map