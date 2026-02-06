"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorQuestView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../../../Core/Define/CommonDefine");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../../Ui/UiManager");
const StepBaseItem_1 = require("../../../../../BattleUi/Views/MissionView/TreeStep/StepBaseItem");
const ButtonItem_1 = require("../../../../../Common/Button/ButtonItem");
const CommonItemSmallItemGrid_1 = require("../../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout");
const GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew");
const ActivityControllerHolder_1 = require("../../../../ActivityControllerHolder");
const ActivityFunctionalTypeA_1 = require("../../../UniversalComponents/Functional/ActivityFunctionalTypeA");
const SpringManorDefine_1 = require("../../SpringManorDefine");
const SpringManorQuestItem_1 = require("./SpringManorQuestItem");
class SpringManorQuestView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.kno = 0;
    this.X0g = 0;
    this.lqe = undefined;
    this.Y0g = undefined;
    this.z0g = undefined;
    this.J0g = undefined;
    this.Ofm = undefined;
    this.Gfm = undefined;
    this.Fmi = undefined;
    this.Vmi = undefined;
    this.oVg = 0;
    this.Og = () => {
      this.spg(false);
    };
    this.q3g = () => {
      var e = new SpringManorQuestItem_1.SpringManorQuestItem();
      e.ToggleClickCallback = this.tpg;
      return e;
    };
    this.Z0g = () => {
      var e = new SpringManorQuestItem_1.SpringManorQuestItem();
      e.ToggleClickCallback = this.epg;
      return e;
    };
    this.tpg = (e, t) => {
      this.Ofm?.SelectGridProxy(e);
      this.Gfm?.DeselectCurrentGridProxy();
      this.Xno(t, true);
    };
    this.epg = (e, t) => {
      this.Gfm?.SelectGridProxy(e);
      this.Ofm?.DeselectCurrentGridProxy();
      this.Xno(t, true);
    };
    this.I5t = () => {
      this.CloseMe();
    };
    this.qLn = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController?.RequestTrackQuest(this.kno, false);
      this.Og();
    };
    this.GLn = () => {
      if (this.X0g === 1) {
        ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController?.RequestTrackQuest(this.kno, true);
      }
      UiManager_1.UiManager.ResetToBattleView();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UILayoutBase], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIText], [8, UE.UIText], [9, UE.UIText], [10, UE.UIScrollViewWithScrollbarComponent], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UILayoutBase]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.lqe?.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.z0g = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    e.push(this.z0g.CreateByActorAsync(this.GetItem(13).GetOwner()));
    this.Fmi = new ButtonItem_1.ButtonItem();
    this.Fmi.SetFunction(this.qLn);
    e.push(this.Fmi.CreateByActorAsync(this.GetItem(14).GetOwner()));
    this.Vmi = new ButtonItem_1.ButtonItem();
    this.Vmi.SetFunction(this.GLn);
    e.push(this.Vmi.CreateByActorAsync(this.GetItem(15).GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    this.zDn();
    this.J0g = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(10), () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid());
    this.z0g?.SetButtonVisible(false);
    this.Ofm = new GenericLayout_1.GenericLayout(this.GetLayoutBase(19), this.q3g);
    this.Gfm = new GenericLayout_1.GenericLayout(this.GetLayoutBase(4), this.Z0g);
    var e = this.OpenParam;
    if (e) {
      this.kno = e;
    }
  }
  async OnBeforeShowAsyncImplementImplement() {
    if (ModelManager_1.ModelManager.SpringManorModel.HasAnyQuest()) {
      await this.spg();
    }
    this.Oxt();
  }
  async spg(e = true) {
    var t = ModelManager_1.ModelManager.SpringManorModel;
    var i = t.GetMainQuestIdList();
    var t = t.GetSubQuestList();
    var s = i.length > 0 && t.length > 0;
    this.GetItem(18)?.SetUIActive(s);
    var s = [];
    s.push(this.Ofm?.RefreshByDataAsync(i, e));
    s.push(this.Gfm?.RefreshByDataAsync(t, e));
    await Promise.all(s);
    let r = -1;
    let n = -1;
    let h = undefined;
    if (this.kno !== 0) {
      if ((e = i.indexOf(this.kno)) >= 0) {
        r = e;
        n = this.kno;
        h = this.Ofm;
      } else if ((e = t.indexOf(this.kno)) >= 0) {
        r = e;
        n = this.kno;
        h = this.Gfm;
      }
    }
    if (r < 0) {
      if (i.length > 0) {
        r = 0;
        n = i[r];
        h = this.Ofm;
      } else if (t.length > 0) {
        r = 0;
        n = t[r];
        h = this.Gfm;
      }
    }
    if (!(r < 0)) {
      h?.SelectGridProxy(r);
      this.Xno(n);
      (s = h?.GetLayoutItemByIndex(r))?.SetToggleSelect(true, false);
      s?.RefreshRedDot();
    }
  }
  OnTick(e) {
    if (this.oVg > 0) {
      this.oVg -= e;
    } else {
      this.oVg = CommonDefine_1.MILLIONSECOND_PER_SECOND;
      if (this.z0g?.IsUiActiveInHierarchy()) {
        this.swg();
      }
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.Og);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.Og);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.Og);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.Og);
  }
  zDn() {
    this.lqe?.SetCloseCallBack(this.I5t);
    this.lqe?.SetHelpCallBack(() => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(SpringManorDefine_1.SPRING_QUEST_HELP_ID);
    });
  }
  Oxt() {
    var e = ModelManager_1.ModelManager.SpringManorModel.HasAnyQuest();
    this.GetItem(1).SetUIActive(!e);
    this.GetItem(2).SetUIActive(e);
  }
  Xno(e, t = false) {
    this.kno = e;
    ModelManager_1.ModelManager.SpringManorModel?.ActivityData.ReadSubQuestRedDot(e);
    if (t) {
      this.UiViewSequence?.PlayOrReplaySequenceByName("Switch");
    }
    t = ModelManager_1.ModelManager.QuestNewModel;
    if (t.GetQuest(e)) {
      this.GetText(6).SetText(t.GetQuestName(e));
      this.GetText(9).SetText(t.GetQuestDetails(e));
      this.oso(e);
      this.r7d(e);
      this.ipg(e);
      this.rpg();
    } else {
      this.wke();
    }
  }
  wke() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(this.kno);
    this.GetText(6).ShowTextNew(e.TidName);
    this.GetText(9).ShowTextNew(e.TidDesc);
    this.GetItem(16)?.SetUIActive(false);
    this.GetScrollViewWithScrollbar(10)?.RootUIComp.SetUIActive(e.RewardId !== undefined);
    if (e.RewardId !== undefined) {
      e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e.RewardId);
      this.J0g?.RefreshByData(e);
    }
    this.GetItem(17)?.SetUIActive(false);
    this.z0g?.SetUiActive(true);
    this.swg();
  }
  swg() {
    var e = ModelManager_1.ModelManager.SpringManorModel;
    if (e.IsMainQuest(this.kno)) {
      e = e.GetMainQuestRemainTimeText(this.kno, "Spring26_Quest_TimeLimit");
      this.z0g?.SetTextByText(e);
    }
  }
  ipg(e) {
    if (ModelManager_1.ModelManager.SpringManorModel.IsQuestUnlocked(e)) {
      e = ModelManager_1.ModelManager.SpringManorModel.IsCurrentTrackQuest(e);
      this.X0g = e ? 2 : 1;
    } else {
      this.X0g = 0;
    }
  }
  rpg() {
    this.Vmi?.SetUiActive(true);
    var e = ModelManager_1.ModelManager.SpringManorModel?.IsMainQuest(this.kno);
    this.Fmi?.SetUiActive(this.X0g === 2 && !e);
    this.GetItem(17)?.SetUIActive(this.X0g !== 0);
    this.z0g?.SetUiActive(this.X0g === 0);
    if (this.X0g === 1) {
      this.Vmi?.SetLocalTextNew("Spring26_Quest_Track");
    } else if (this.X0g === 2) {
      this.Vmi?.SetLocalTextNew("Spring26_Quest_Skip");
      this.Fmi?.SetLocalTextNew("Spring26_Quest_UnTrack");
    }
  }
  async oso(e) {
    var t = this.GetItem(16);
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    if (e && e.HasBehaviorTree()) {
      t.SetUIActive(true);
      if (!this.Y0g) {
        this.Y0g = new StepBaseItem_1.StepBaseItem(0, -1);
        await this.Y0g.CreateThenShowByActorAsync(t.GetOwner(), 1);
      }
      if (e = e.Tree?.GetBlackBoard()?.CreateShowData(false)) {
        await this.Y0g.Refresh(e, e.MainStepInfo);
        this.Y0g.SetActive(true);
      } else {
        this.Y0g.SetActive(false);
      }
    } else {
      t.SetUIActive(false);
    }
  }
  r7d(e) {
    let t = ModelManager_1.ModelManager.QuestNewModel.GetDisplayRewardCommonInfo(e);
    if (!t) {
      var i = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(e)?.RewardId;
      if (!i) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SpringManor", 90, `任务${e}配置无效`);
        }
        return;
      }
      t = ConfigManager_1.ConfigManager.RewardConfig?.GetDropPackagePreviewItemList(i);
    }
    if (t) {
      this.J0g?.RefreshByData(t);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("SpringManor", 90, `任务${e}没有任何奖励信息`);
    }
  }
}
exports.SpringManorQuestView = SpringManorQuestView;
//# sourceMappingURL=SpringManorQuestView.js.map