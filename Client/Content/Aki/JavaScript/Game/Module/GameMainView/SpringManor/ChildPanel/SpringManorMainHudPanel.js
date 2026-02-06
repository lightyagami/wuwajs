"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorMainHudPanel = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../../../Ui/UiManager");
const SpringManorDefine_1 = require("../../../Activity/ActivityContent/SpringManor/SpringManorDefine");
const ActivityControllerHolder_1 = require("../../../Activity/ActivityControllerHolder");
const BattleChildViewPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel");
const MissionPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/MissionPanel");
const FullScreenPanel_1 = require("../../../BattleUi/Views/FullScreenPanel");
const TrackedMarksView_1 = require("../../../BattleUi/Views/TrackedMarksView");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SpringManorHudButton_1 = require("./SpringManorHudButton");
const controlBattleChildUiChildList = [18, 19, 42, 23];
class SpringManorMainHudPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.Xut = undefined;
    this.mpg = new Map();
    this.fpg = undefined;
    this.Y7g = undefined;
    this.HIg = undefined;
    this.jIg = undefined;
    this.$Ig = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Spring26_MainHud_MissionRemain") ?? "";
    this.Gkg = undefined;
    this.Hea = undefined;
    this.oOg = undefined;
    this.Xet = undefined;
    this.x7g = () => {
      var e = ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.GetChildVisible(42);
      this.GetItem(27)?.SetUIActive(e ?? false);
      this.GetItem(28)?.SetUIActive(e ?? false);
    };
    this.n$g = () => {
      var e = ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.GetChildVisible(5);
      this.GetItem(11)?.SetUIActive(e ?? false);
    };
    this.TAg = () => {
      this.RefreshAtmosphere();
      this.BNe();
    };
    this.itt = () => {
      this.RefreshAtmosphere();
      this.Mpg();
      this.BNe();
    };
    this.gpg = 0;
    this.nOg = undefined;
    this.Jqg = undefined;
    this.sOg = e => {
      this.oOg?.SetValue(e);
    };
    this.aOg = () => {
      this.hOg();
      var e = ModelManager_1.ModelManager.SpringManorModel;
      var i = e.GetAtmosphereLevel();
      this.GetArtText(6)?.SetText(i.toString());
      this.lOg(this.Jqg.Stage);
      var e = e.ActivityData.GetAtmosphere();
      var t = ConfigManager_1.ConfigManager.SpringManorConfig?.GetLevelConfigById(i);
      if (t) {
        e = MathUtils_1.MathUtils.Clamp((e - t.AtmosphereNeed) / t.AtmosphereNext, 0, 1);
        this.nOg = UE.LTweenBPLibrary.FloatTo(this.RootActor, (0, puerts_1.toManualReleaseDelegate)(this.sOg), 0, e);
        this.nOg.OnCompleteCallBack.Bind(() => {
          this.hOg();
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SpringManor", 90, "获取不到等级配置！" + i);
      }
    };
    this.Cpg = () => {
      UiManager_1.UiManager.OpenView("Spring26AtmosphereLevelView");
    };
    this.aVf = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(4);
      e.FunctionMap.set(2, () => {
        ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController?.LeaveInstanceDungeonRequest();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.wXu = () => {
      UiManager_1.UiManager.OpenView("MenuView");
    };
    this.hVf = () => {
      UiManager_1.UiManager.OpenView("Spring26QuestView");
    };
    this.lVf = () => {
      UiManager_1.UiManager.OpenView("Spring26GameplayEntryView");
    };
    this._Vf = () => {
      ControllerHolder_1.ControllerHolder.FurnitureController.OpenFurnitureAreaSelectView();
    };
    this.hoc = () => {
      UiManager_1.UiManager.OpenView("Spring26RewardView");
    };
    this.G3g = () => {
      ControllerHolder_1.ControllerHolder.FunctionController.OpenFunctionRelateView(10049);
    };
    this.F3g = () => {
      UiManager_1.UiManager.OpenView("Spring26RoleSelectView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIArtText], [7, UE.UIText], [8, UE.UISliderComponent], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIText], [17, UE.UIButtonComponent], [18, UE.UIItem], [19, UE.UIButtonComponent], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIButtonComponent], [25, UE.UIButtonComponent], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem]];
    this.BtnBindInfo = [[0, this.aVf], [1, this.wXu], [19, this.Cpg], [24, this.G3g], [25, this.F3g]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var e = [];
    e.push(this.vpg());
    e.push(this.WJe());
    e.push(this.N3g());
    e.push(this.J7g());
    this.Xet = new SpringManorQuestButton();
    this.Xet.ClickCallback = this.hVf;
    e.push(this.Xet.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    this.ypg();
    this.Spg();
    this.HIg = this.GetItem(15);
    this.jIg = this.GetText(16);
    this.oOg = this.GetSlider(8);
    this.Gkg = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(20));
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    this.Gkg?.Clear();
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SpringManorFunctionOpenNotify, this.itt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SpringManorAtmosphereUpdate, this.TAg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SpringManorTaskUpdateNotify, this.itt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddNewQuest, this.itt);
    RedDotController_1.RedDotController.BindRedDot("FurnitureEntranceRedDot", this.GetItem(22));
    RedDotController_1.RedDotController.BindRedDot("SpringManorGameEntrance", this.GetItem(21));
    ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.AddCallback(42, this.x7g);
    ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.AddCallback(5, this.n$g);
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SpringManorFunctionOpenNotify, this.itt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SpringManorAtmosphereUpdate, this.TAg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SpringManorTaskUpdateNotify, this.itt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddNewQuest, this.itt);
    RedDotController_1.RedDotController.UnBindRedDot("FurnitureEntranceRedDot");
    RedDotController_1.RedDotController.UnBindRedDot("SpringManorGameEntrance");
    ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.RemoveCallback(42, this.x7g);
    ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.RemoveCallback(5, this.n$g);
  }
  BNe() {
    var e = ModelManager_1.ModelManager.SpringManorModel?.ActivityData?.HasAtmosphereRedDot() ?? false;
    this.GetItem(26)?.SetUIActive(e);
    var e = ModelManager_1.ModelManager.SpringManorModel?.ActivityData?.HasRewardRedDot() ?? false;
    this.GetItem(23)?.SetUIActive(e);
    this.Xet?.RefreshRedDot();
  }
  ypg() {
    this.Visible = true;
    this.ShowBattleChildViewPanel();
  }
  OnShowBattleChildViewPanel(e) {
    this.fpg?.OnShowBattleChildViewPanel();
    this.Xut?.ShowBattleChildViewPanel();
    this.n$g();
    this.WIg(true);
    if (ModelManager_1.ModelManager.SpringManorModel?.ActivityData !== undefined) {
      this.itt();
    } else {
      EventSystem_1.EventSystem.Once(EventDefine_1.EEventName.OnActivityUpdate, this.itt);
    }
    this.Hea?.StopCurrentSequence();
    this.Hea?.PlaySequencePurely(e ? "Start" : "ShowView");
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateFurnitureEntranceRedDot);
    this.dde();
  }
  OnHideBattleChildViewPanel() {
    this.fpg?.OnHideBattleChildViewPanel();
    this.Xut?.HideBattleChildViewPanel();
    this.WIg(false);
    this.Hea?.StopCurrentSequence();
    this.Hea?.PlaySequencePurely("Close");
    this.hOg();
    this.Cde();
  }
  OnTickBattleChildViewPanel(e) {
    this.CheckMissionTrack();
    this.Xut?.OnTickBattleChildViewPanel(e);
    this.sSt();
  }
  Reset() {
    this.Xut?.Reset();
  }
  OnAfterTickBattleChildViewPanel(e) {
    this.fpg?.Update(e);
  }
  WIg(i) {
    controlBattleChildUiChildList.forEach(e => {
      ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.SetChildVisible(0, e, i, true);
    });
  }
  async J7g() {
    this.Y7g = new FullScreenPanel_1.FullScreenPanel();
    this.Y7g.OpenParam = 23;
    await this.Y7g.CreateThenShowByActorAsync(this.GetItem(29).GetOwner());
  }
  async WJe() {
    var e = this.GetItem(18);
    this.fpg = await this.NewStaticChildViewAsync(e.GetOwner(), TrackedMarksView_1.TrackedMarksView);
    this.fpg?.SetUiActive(true);
  }
  async vpg() {
    var e = this.GetItem(11);
    this.Xut = new MissionPanel_1.MissionPanel();
    this.Xut.OpenParam = 5;
    var i = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id ?? 0;
    this.Xut.SetRestoreWhenInit(ModelManager_1.ModelManager.SpringManorModel.IsMainQuest(i));
    await this.Xut.CreateThenShowByResourceIdAsync("UiItem_Mission", e);
    this.Xut.GetRootItem().SetAnchorOffset(new UE.Vector2D(0, 0));
  }
  SetTipsVisible(e) {
    this.HIg?.SetUIActive(e);
  }
  SetTipsText(e) {
    e = StringUtils_1.StringUtils.Format(this.$Ig, e);
    this.jIg?.SetText(e);
  }
  sSt() {
    var e;
    if (this.gpg !== 0 || ModelManager_1.ModelManager.SpringManorModel.CheckMainQuestIsFinished()) {
      this.SetTipsVisible(false);
    } else {
      e = this.Epg();
      e = ModelManager_1.ModelManager.SpringManorModel.GetMainQuestRemainTimeText(e);
      this.SetTipsVisible(e !== undefined);
      if (e !== undefined) {
        this.SetTipsText(e);
      }
    }
  }
  Epg() {
    return ModelManager_1.ModelManager.SpringManorModel.GetMainQuestId() ?? 0;
  }
  CheckMissionTrack() {
    var e;
    var i = this.Epg();
    var t = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
    if (i === t?.Id) {
      this.gpg = i;
    } else if (!(e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i)) || e.IsSuspend()) {
      if (t) {
        ControllerHolder_1.ControllerHolder.QuestNewController.RequestTrackQuest(t.Id, false, 2);
      }
      this.gpg = 0;
    } else {
      this.gpg = i;
      ControllerHolder_1.ControllerHolder.QuestNewController.RequestTrackQuest(i, true, 2);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, e.Tree.BtType, e.Tree.TreeIncId);
    }
  }
  _Og() {
    var e;
    var i;
    var t;
    if (this.Jqg) {
      i = (t = ModelManager_1.ModelManager.SpringManorModel).ActivityData.GetAtmosphere();
      e = t.GetNextLevel();
      t = t.GetLevelNeedExp(e);
      this.RefreshAtmosphereProgressText(this.Jqg.OldLevel, i, t);
      e = this.Jqg.OldLevel;
      if (i = ConfigManager_1.ConfigManager.SpringManorConfig.GetLevelConfigById(e)) {
        t = MathUtils_1.MathUtils.Clamp((this.Jqg.OldAtmosphere - i.AtmosphereNeed) / i.AtmosphereNext, 0, 1);
        this.nOg = UE.LTweenBPLibrary.FloatTo(this.RootActor, (0, puerts_1.toManualReleaseDelegate)(this.sOg), t, 1);
        this.nOg.OnCompleteCallBack.Bind(this.aOg);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SpringManor", 90, "获取不到等级配置！" + e);
      }
    }
  }
  lOg(e) {
    this.GetItem(3)?.SetUIActive(e === 1 || e === 2);
    this.GetItem(4)?.SetUIActive(e === 2 || e === 3);
    this.GetItem(5)?.SetUIActive(e === 3);
    if (e > 1) {
      e = SpringManorDefine_1.atmosphereLevelUpSeqName[e - 2];
      this.Gkg?.StopCurrentSequence();
      this.Gkg?.PlaySequencePurely(e);
    }
    this.Gkg?.PlaySequencePurely("NumChange");
  }
  hOg() {
    if (this.nOg) {
      this.nOg.Kill();
      this.nOg = undefined;
    }
  }
  RefreshAtmosphere() {
    if (this.nOg) {
      this.hOg();
    }
    var e;
    var i;
    var t;
    var s = ModelManager_1.ModelManager.SpringManorModel.GetAtmosphereStageUpParam();
    if (s) {
      this.Jqg = s;
      this._Og();
    } else {
      e = (s = ModelManager_1.ModelManager.SpringManorModel).GetAtmosphereLevel();
      i = s.ActivityData.GetAtmosphere();
      t = s.GetNextLevel();
      t = s.GetLevelNeedExp(t);
      s = s.GetAtmosphereLevelStage(e);
      this.RefreshPassBg(s);
      this.RefreshAtmosphereProgressText(e, i, t);
      if (s = ConfigManager_1.ConfigManager.SpringManorConfig?.GetLevelConfigById(e)) {
        t = MathUtils_1.MathUtils.Clamp((i - s.AtmosphereNeed) / s.AtmosphereNext, 0, 1);
        this.oOg?.SetValue(t);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SpringManor", 90, "获取不到等级配置！" + e);
      }
    }
  }
  RefreshPassBg(e) {
    this.GetItem(3)?.SetUIActive(e === 1);
    this.GetItem(4)?.SetUIActive(e === 2);
    this.GetItem(5)?.SetUIActive(e === 3);
  }
  RefreshAtmosphereProgressText(e, i, t) {
    this.GetArtText(6)?.SetText(e.toString());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "Spring26_MainHud_PassProgress", i, t);
  }
  async N3g() {
    var e = [];
    var i = new SpringManorHudButton_1.SpringManorHudButton();
    i.SetAction(InputMappingsDefine_1.actionMappings.切换角色1);
    i.ClickCallBack = this.lVf;
    e.push(i.CreateThenShowByActorAsync(this.GetItem(12).GetOwner()));
    var i = new SpringManorHudButton_1.SpringManorHudButton();
    i.SetAction(InputMappingsDefine_1.actionMappings.切换角色2);
    i.ClickCallBack = this._Vf;
    e.push(i.CreateThenShowByActorAsync(this.GetItem(14).GetOwner()));
    var i = new SpringManorHudButton_1.SpringManorHudButton();
    i.SetAction(InputMappingsDefine_1.actionMappings.切换角色3);
    i.ClickCallBack = this.hoc;
    e.push(i.CreateThenShowByActorAsync(this.GetItem(13).GetOwner()));
    await Promise.all(e);
  }
  Spg() {
    this.mpg.set(0, this.GetItem(12));
    this.mpg.set(3, this.GetItem(14));
  }
  Mpg() {
    const t = ModelManager_1.ModelManager.SpringManorModel.ActivityData;
    this.mpg.forEach((e, i) => {
      i = t.IsFunctionUnlocked(i);
      e.SetUIActive(i);
    });
  }
}
exports.SpringManorMainHudPanel = SpringManorMainHudPanel;
class SpringManorQuestButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ClickCallback = undefined;
    this.nqe = () => {
      this.ClickCallback?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem]];
    this.BtnBindInfo = [[0, this.nqe]];
  }
  RefreshRedDot() {
    var e = ModelManager_1.ModelManager.SpringManorModel?.ActivityData.HasAnySubQuestRedDot() ?? false;
    this.GetItem(1)?.SetUIActive(e);
  }
}
//# sourceMappingURL=SpringManorMainHudPanel.js.map