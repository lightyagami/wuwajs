"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonEntranceView = undefined;
const ue_1 = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../Ui/Base/UiAsyncTask");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../Ui/UiManager");
const ActivityMowingController_1 = require("../Activity/ActivityContent/Mowing/ActivityMowingController");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const EditBattleTeamController_1 = require("../EditBattleTeam/EditBattleTeamController");
const HelpController_1 = require("../Help/HelpController");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const OnlineController_1 = require("../Online/OnlineController");
const PowerController_1 = require("../Power/PowerController");
const PowerCurrencyItem_1 = require("../Power/SubViews/PowerCurrencyItem");
const RoguelikeInstanceBtnPanel_1 = require("../Roguelike/View/RoguelikeInstanceBtnPanel");
const RoleController_1 = require("../RoleUi/RoleController");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const TowerDefenceController_1 = require("../TowerDefence/TowerDefenceController");
const DynScrollView_1 = require("../Util/ScrollView/DynScrollView");
const InstanceDungeonData_1 = require("./Define/InstanceDungeonData");
const InstanceDungeonDefine_1 = require("./Define/InstanceDungeonDefine");
const InstanceDetectDynamicItem_1 = require("./InstanceDetectDynamicItem");
const InstanceDetectItem_1 = require("./InstanceDetectItem");
const InstanceDungeonEntranceController_1 = require("./InstanceDungeonEntranceController");
const InstanceDungeonMatchingCountDown_1 = require("./InstanceDungeonMatchingCountDown");
const InstanceDungeonInfoItem_1 = require("./InstanceDungeonSubComponent/InstanceDungeonInfoItem");
const InstanceDungeonMowingPanelItem_1 = require("./InstanceDungeonSubComponent/InstanceDungeonMowingPanelItem");
const InstanceDungeonSolarSpeedPanelItem_1 = require("./InstanceDungeonSubComponent/InstanceDungeonSolarSpeedPanelItem");
const InstanceDungeonTimeAndCountItem_1 = require("./InstanceDungeonSubComponent/InstanceDungeonTimeAndCountItem");
const InstanceDungeonTowerDefensePanelItem_1 = require("./InstanceDungeonSubComponent/InstanceDungeonTowerDefensePanelItem");
const BaseInstanceDungeonViewModel_1 = require("./InstanceDungeonViewModel/BaseInstanceDungeonViewModel");
const MATCHING_ITEM_OFFSET = -98;
class InstanceDungeonEntranceView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.NUe = 0;
    this.ili = 0;
    this.sli = undefined;
    this.lli = undefined;
    this._li = undefined;
    this.uli = undefined;
    this.cli = undefined;
    this.mli = undefined;
    this.Cli = undefined;
    this.dli = 0;
    this.Xai = false;
    this._lh = 1000;
    this.xth = undefined;
    this.Pth = undefined;
    this.NXs = undefined;
    this.fea = undefined;
    this.wth = undefined;
    this.Bth = undefined;
    this.Eli = undefined;
    this.bth = undefined;
    this.qth = undefined;
    this.hX_ = undefined;
    this.HLn = undefined;
    this.yli = () => {
      this.CloseMe();
    };
    this.Ili = () => {
      PowerController_1.PowerController.OpenPowerView();
    };
    this.kUc = () => {
      HelpController_1.HelpController.OpenHelpById(InstanceDungeonDefine_1.DUNGEON_ARCHIVE_HELP_ID);
    };
    this.Lli = (e, t, n) => {
      var i = new InstanceDetectItem_1.InstanceDetectItem();
      i.OpenParam = this.HLn;
      i.BindClickInstanceCallback(this.Dli);
      i.BindClickSeriesCallback(this.Rli);
      i.BindCanExecuteChange(this.Lke);
      i.BindCanShowRedDot(this.c_l);
      i.BindIconRightPathGetter(InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.GetIconRightPathGetter);
      return i;
    };
    this.Rli = (e, t, n) => {
      if (this.lli && this.lli !== t) {
        this.lli.SetToggleState(0, true);
      }
      this.lli = t;
      this.ili = n ? e : -1;
      this.NUe = n ? this.HLn.InstanceByTitleMap.get(e)[0] : this.NUe;
      t = this.Uli();
      this.Cli.RefreshByData(t);
      this.Cli.BindLateUpdate(this.Cai);
    };
    this.Cai = () => {
      var e = (this.dli - 1) / (this.HLn.InstanceByTitleMap.size + (this.sli.get(this.ili) ?? 0));
      this.GetUIDynScrollViewComponent(0).SetScrollProgress(e);
      this.Cli?.UnBindLateUpdate();
    };
    this.Dli = (e, t, n = undefined) => {
      var i = new UiAsyncTask_1.UiAsyncTask("InstanceDungeonEntranceView.RefreshInstance", async () => {
        await this.G9_(e, t, n);
      });
      this.RunAsyncTask(i);
    };
    this.G9_ = async (e, t, n = undefined) => {
      this.NUe = e;
      if (n && n.IsOnlyOneGrid && n.InstanceSeriesTitle) {
        this.ili = n.InstanceSeriesTitle;
      }
      if (n && (this.uli && (this.uli.IsSelect = false), this.uli = n, this.uli.IsSelect = true, this.ili !== n.InstanceSeriesTitle)) {
        this.ili = n.InstanceSeriesTitle;
      }
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId = this.NUe;
      this.OUc(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId);
      this.BUc();
      if (this._li && this._li !== t) {
        this._li.SetToggleState(0, true);
      }
      this._li = t;
      this.UiViewSequence.PlaySequence("Xz");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectInstanceIdChallenge, this.NUe);
      await this.F9_();
    };
    this.Lke = e => this.NUe !== e;
    this.c_l = e => {
      if (this.Kli?.InstSubType === 21) {
        var t = this.HLn.InstanceByTitleMap.get(e);
        if (t) {
          for (const n of t) {
            if (this.HLn.CheckInstanceItemHasRedDot(n)) {
              return true;
            }
          }
        }
      } else if (this.Kli?.InstSubType === 28) {
        return ModelManager_1.ModelManager.SolarSpeedModel.HasRedDotByInstanceId(e);
      }
      return false;
    };
    this.xli = () => {
      if (UiManager_1.UiManager.IsViewOpen("PowerView")) {
        UiManager_1.UiManager.CloseView("PowerView");
      }
      this.UiViewSequence.PlaySequencePurely("Close01", true);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CloseInstanceEntrancePositively, this.HLn.EntranceId);
    };
    this.Bli = () => {
      this.UiViewSequence.StopSequenceByKey("Popup");
      this.UiViewSequence.PlaySequencePurely("Popup", false, true);
    };
    this.Oli = e => {
      var t = new UiAsyncTask_1.UiAsyncTask("InstanceDungeonEntranceView.RefreshInstance", async () => {
        await this.N9_(e);
      });
      this.RunAsyncTask(t);
    };
    this.N9_ = async e => {
      if (e === "PowerView") {
        this.Bli();
      } else if (e === "ActivityRewardPopUpView") {
        await this.V9_();
      }
    };
    this.$Ye = () => {
      switch (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState()) {
        case 2:
          this.Pth?.PlayAnimation("Finish");
          UiManager_1.UiManager.OpenView("OnlineInstanceMatchTips");
          break;
        case 0:
          this.Pth?.PlayAnimation("Close");
          break;
        case 1:
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("MatchingOtherCancel");
          this.Pth?.PlayAnimation("Start");
          this.Fli(true);
          this.Vli();
          break;
        case 4:
          this.Fli(false);
          ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter = true;
          if (UiManager_1.UiManager.IsViewOpen("InstanceDungeonMonsterPreView")) {
            UiManager_1.UiManager.CloseView("InstanceDungeonMonsterPreView");
          }
          EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingId(), true);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterTeam);
      }
    };
    this.YYe = () => {
      this.Fli(true);
      this.Pth?.PlayAnimation("Start");
      this.Pth?.BindOnStopTimer(() => ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() !== 1);
      this.Vli();
      this.Gth();
    };
    this.dtt = () => {
      var e = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(this.HLn.EntranceId).HelpButtonId;
      HelpController_1.HelpController.OpenHelpById(e);
    };
    this.wli = () => {
      var e = this.NUe;
      if (e) {
        if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanChallenge(e)) {
          if (RoleController_1.RoleController.IsInRoleTrial() && !ControllerHolder_1.ControllerHolder.InstanceDungeonController.CanTrialRoleEnterDungeon(this.HLn.EntranceId, e)) {
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrialRoleDungeonsLimit");
          } else {
            if (ControllerHolder_1.ControllerHolder.InstanceDungeonController.IsForbidDungeon(e)) {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhantomFormationEnterInstanceTip");
            }
            ModelManager_1.ModelManager.InstanceDungeonModel.InstanceContinue = false;
            if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsDungeonArchiveActivate(e)) {
              if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.HasDungeonArchive(e)) {
                (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(281)).IsEscViewTriggerCallBack = false;
                e.FunctionMap.set(2, () => {
                  ModelManager_1.ModelManager.InstanceDungeonModel.InstanceContinue = true;
                  this.UUc();
                });
                e.FunctionMap.set(1, () => {
                  this.UUc();
                });
                e.FunctionMap.set(-1, () => {
                  ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
                });
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
                return;
              }
            }
            this.UUc();
          }
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("InstanceDungeonLackChallengeTimes");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InstanceDungeon", 16, "副本入口界面点击挑战错误，当前未选择副本");
      }
    };
    this.bli = () => {
      var e;
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter = true;
        ModelManager_1.ModelManager.InstanceDungeonModel.InstanceContinue = false;
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingId(this.NUe);
        if (ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() <= 1) {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamChallengeRequest(this.NUe, false);
        } else {
          (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(326)).IsEscViewTriggerCallBack = false;
          e.FunctionMap.set(2, () => {
            InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamChallengeRequest(this.NUe, true);
          });
          e.FunctionMap.set(1, () => {
            InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamChallengeRequest(this.NUe, false);
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InstanceDungeon", 5, "非联机下无法进行组队挑战，请联系程序查BUG");
      }
    };
    this.qli = () => {
      var e;
      if (OnlineController_1.OnlineController.ShowTipsWhenOnlineDisabled()) {
        if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanChallenge(this.NUe)) {
          if (RoleController_1.RoleController.IsInRoleTrial()) {
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrialRoleDungeonsLimit");
          } else if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10021)) {
            if (ControllerHolder_1.ControllerHolder.InstanceDungeonController.IsForbidDungeon(this.NUe)) {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhantomFormationEnterInstanceTip");
            } else {
              ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter = true;
              ModelManager_1.ModelManager.InstanceDungeonModel.InstanceContinue = false;
              this.Pth.BindOnStopTimer(() => ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() !== 1);
              if (!ModelManager_1.ModelManager.GameModeModel.IsMulti || (e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize()) <= 1) {
                InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchRequest(this.NUe);
              } else if (e < ModelManager_1.ModelManager.OnlineModel.TeamMaxSize) {
                (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(327)).IsEscViewTriggerCallBack = false;
                e.FunctionMap.set(2, () => {
                  InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchRequest(this.NUe, true);
                });
                e.FunctionMap.set(1, () => {
                  InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchRequest(this.NUe);
                });
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
              } else {
                ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("CanNotMatching");
              }
            }
          } else {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("IsNotOpenOnline");
          }
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("InstanceDungeonLackChallengeTimes");
        }
      }
    };
    this.RMt = e => {
      ModelManager_1.ModelManager.InstanceDungeonModel.HidePowerLackConfirmBox = e;
    };
  }
  get Kli() {
    if (this.NUe) {
      return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.NUe);
    } else {
      return undefined;
    }
  }
  OnRegisterComponent() {
    this.HLn = this.OpenParam || new BaseInstanceDungeonViewModel_1.BaseInstanceDungeonViewModel();
    this.HLn.RegisterView(this);
    this.ComponentRegisterInfos = [[0, ue_1.UIDynScrollViewComponent], [1, ue_1.UIItem], [3, ue_1.UITexture], [2, ue_1.UIItem], [4, ue_1.UIItem], [5, ue_1.UIItem], [6, ue_1.UIItem], [7, ue_1.UIItem], [8, ue_1.UIItem], [9, ue_1.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.HLn.EntranceId = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId;
    var e = [];
    this.wth = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(6));
    await this.wth.CreateCaptionStateItem(this.kUc);
    this.OUc(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId);
    this.xth = new InstanceDungeonInfoItem_1.InstanceDungeonInfoItem();
    this.xth.OpenParam = this.HLn;
    e.push(this.xth.CreateThenShowByResourceIdAsync("UiItem_InstanceDungeon_RightInfo", this.GetItem(5)));
    this.Pth = new InstanceDungeonMatchingCountDown_1.InstanceDungeonMatchingCountDown();
    e.push(this.Pth.CreateByResourceIdAsync("UiItem_OnlineApplyUILayer_Prefab", this.GetItem(4)));
    this.cli = this.GetUIDynScrollViewComponent(0);
    this.mli = new InstanceDetectDynamicItem_1.InstanceDetectDynamicItem();
    this.Cli = new DynScrollView_1.DynamicScrollView(this.cli, this.GetItem(1), this.mli, this.Lli);
    e.push(this.Cli.Init());
    this.Bth = new InstanceDungeonTimeAndCountItem_1.InstanceDungeonTimeAndCountItem();
    e.push(this.Bth.CreateThenShowByResourceIdAsync("UiItem_InstanceDungeon_TimeItem", this.GetItem(7)));
    this.fea = new PowerCurrencyItem_1.PowerCurrencyItem();
    e.push(this.fea.CreateByResourceIdAsync("UIItem_CommonCurrencyItem", this.wth.GetCostContent()));
    this.NXs = new PowerCurrencyItem_1.PowerCurrencyItem();
    this.NXs.SkipAutoAddEvent = true;
    e.push(this.NXs.CreateByResourceIdAsync("UIItem_CommonCurrencyItem", this.wth.GetCostContent()));
    e.push(this.Fth());
    e.push(this.HLn.RequestServerData());
    await Promise.all(e);
    this.Pth.GetOriginalItem()?.SetAnchorOffsetY(MATCHING_ITEM_OFFSET);
    this.Pth.SetUiActive(false);
    this.xth.InitButton(this.wli, this.qli, this.bli);
    this.fea.SetActive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10066));
    this.fea.RefreshAddButtonActive();
    this.fea.ShowWithoutText(ItemDefines_1.EItemId.OverPower);
    this.NXs.ShowWithoutText(ItemDefines_1.EItemId.Power);
    this.NXs.SetButtonFunction(this.Ili);
  }
  OnStart() {
    this.GetTexture(3)?.SetUIActive(false);
    this.sli = new Map();
    this.nyi();
    this.UiViewSequence.AddSequenceFinishEvent("Close01", this.yli);
  }
  OnTick(e) {
    if (this.Xai) {
      this.HLn.TimerRefreshFunction(e);
    }
  }
  OnBeforeShow() {
    this.SHe();
  }
  OnAfterShow() {
    this.Pth.BindOnClickBtnCancelMatching(() => {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.CancelMatchRequest();
    });
    this.Pth.BindOnAfterCloseAnimation(e => {
      if (e === "Close") {
        this.Fli(false);
      }
    });
    if (!this.HLn.InstanceIdList || this.HLn.InstanceIdList.length <= 0) {
      this.GetItem(2).SetUIActive(false);
    } else if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() === 1) {
      this.Fli(true);
      this.Pth?.PlayAnimation("Start");
      this.Pth.StartTimer();
    }
  }
  OnBeforeHide() {
    this.Eli?.UnBindRedDot();
  }
  OnBeforeDestroy() {
    if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() === 1) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("MatchingBackground");
    }
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
    this.Pth = undefined;
    this.NXs?.Destroy();
    this.fea?.Destroy();
    if (this.Cli) {
      this.Cli.ClearChildren();
      this.Cli = undefined;
    }
    this.cli = undefined;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBeforeDestroyInstanceDungeonEntranceView);
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId = 0;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.Oli);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMatchingChange, this.$Ye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMatchingBegin, this.YYe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.Oli);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMatchingChange, this.$Ye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMatchingBegin, this.YYe);
  }
  nyi() {
    var e = this.HLn.GetDefaultSelectData();
    if (e) {
      this.ili = e.SeriesId;
      this.NUe = e.InstanceId;
    }
  }
  SHe() {
    var e = new UiAsyncTask_1.UiAsyncTask("InstanceDungeonEntranceView.RefreshInstance", async () => {
      await this.j9_();
    });
    this.RunAsyncTask(e);
  }
  async j9_() {
    var e = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(this.HLn.EntranceId);
    this.wth.SetTitleByTextIdAndArgNew(e.Name);
    if (e.TitleSprite) {
      this.wth.SetTitleIconVisible(true);
      this.wth.SetTitleIcon(e.TitleSprite);
    } else {
      this.wth.SetTitleIconVisible(false);
    }
    this.wth.SetCloseCallBack(this.xli);
    this.wth.SetHelpBtnActive(e.HelpButtonId !== 0);
    this.wth.SetHelpCallBack(this.dtt);
    if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() === 0) {
      this.Pth?.PlayAnimation("Close");
      this.Pth?.SetUiActive(false);
    }
    this.Qli();
    await this.V9_();
  }
  RefreshMowingInstance() {
    var e = new UiAsyncTask_1.UiAsyncTask("InstanceDungeonEntranceView.RefreshInstance", async () => {
      await this.q9_();
    });
    this.RunAsyncTask(e);
  }
  async q9_() {
    var e = ActivityMowingController_1.ActivityMowingController.GetMowingActivityData();
    if (e && (e = e.GetActivityLevelCountdownText(this.NUe), this.xth.SetLockText(e), StringUtils_1.StringUtils.IsEmpty(e))) {
      this.Xai = false;
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityMowing_Newlevel"));
      await this.F9_();
    }
  }
  RefreshTowerDefenseInstance() {
    var e = new UiAsyncTask_1.UiAsyncTask("InstanceDungeonEntranceView.RefreshInstance", async () => {
      await this.O9_();
    });
    this.RunAsyncTask(e);
  }
  async O9_() {
    if (TowerDefenceController_1.TowerDefenseController.CheckIsInstanceUnlock(this.NUe)) {
      this.Xai = false;
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityMowing_Newlevel"));
      await Promise.all([this.F9_(), this.V9_()]);
      this.Qli();
    }
    var e = TowerDefenceController_1.TowerDefenseController.BuildInstanceCountDownText(this.NUe) ?? "";
    this.xth.SetLockText(e);
  }
  RefreshSolarSpeedInstance(e, t = false) {
    if (t || (this._lh -= e, !(this._lh > 0))) {
      if (this.Cli) {
        for (let e = 0; e < this.Cli.GetScrollItemCount(); e++) {
          this.Cli?.GetScrollItemFromIndex(e)?.UpdateSelf();
        }
      }
      this.Gth();
      this._lh = 1000;
    }
  }
  OUc(e) {
    var t = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsDungeonArchiveActivate(e);
    this.wth.SetCaptionStateActive(t);
    this.wth.SetCaptionChangeColor(false);
    if (t) {
      if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.HasDungeonArchive(e)) {
        this.wth.SetCaptionStateTip("instance_HaveRecord");
        this.wth.SetCaptionChangeColor(true);
      } else if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsDungeonSupportAndWithoutArchive(e)) {
        this.wth.SetCaptionStateTip("instance_Record_leave");
      }
    }
  }
  Qli() {
    var e = this.Uli();
    this.Cli.RefreshByData(e);
    this.GetItem(2).SetUIActive(true);
    this.Cli.BindLateUpdate(() => {
      var e = this.Cli.GetScrollItemCount();
      if (!(this.dli + 1 < e)) {
        e = this.HLn.InstanceByTitleMap?.size ?? 0;
        if (this.dli >= e) {
          this.dli = e - 1;
        }
        this.Cli.ScrollToItemIndex(this.dli);
      }
      this.Cli.UnBindLateUpdate();
    });
  }
  async V9_() {
    await Promise.all([this.H9_(), this.$9_(), this.lX_()]);
  }
  async $9_() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsSpecificInstanceDungeonBySubType(21);
    if (this.Kli?.InstSubType === 21 && e) {
      if (!this.bth) {
        this.bth = new InstanceDungeonTowerDefensePanelItem_1.InstanceDungeonTowerDefensePanelItem();
        await this.bth.CreateThenShowByResourceIdAsync("UiItem_InstanceDungeon_TowerDefensePanel", this.GetItem(8));
      }
      this.bth.SetActive(true);
      this.bth.RefreshItem();
    } else {
      this.bth?.SetActive(false);
    }
  }
  async lX_() {
    if (this.Kli?.InstSubType === 28) {
      if (!this.hX_) {
        this.hX_ = new InstanceDungeonSolarSpeedPanelItem_1.InstanceDungeonSolarSpeedPanelItem();
        await this.hX_.CreateThenShowByResourceIdAsync("UiItem_InstanceDungeon_TowerDefensePanel", this.GetItem(8));
      }
      this.hX_?.SetUiActive(true);
      this.hX_?.RefreshItem();
    } else {
      this.hX_?.SetUiActive(false);
    }
  }
  async H9_() {
    var e;
    if (this.Kli?.InstSubType === 22) {
      e = {
        ScoreItemActive: e = !ModelManager_1.ModelManager.MowingRiskModel.GetRiskHarvestInstConfigByInstanceId(this.NUe).Accumulate,
        ScoreText: e ? ModelManager_1.ModelManager.MowingRiskModel.BuildInstanceTotalScore() : undefined,
        LeftBtnClickCallBack: function () {
          UiManager_1.UiManager.OpenView("MowingBuffView", 0);
        },
        RightBtnClickCallBack: function () {
          UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", ModelManager_1.ModelManager.MowingRiskModel.BuildActivityRewardViewData(), (e, t) => {
            if (e && UiManager_1.UiManager.IsViewOpen("InstanceDungeonEntranceView")) {
              UiManager_1.UiManager.GetViewByName("InstanceDungeonEntranceView")?.AddChildViewById(t);
            }
          });
        }
      };
      if (!this.qth) {
        this.qth = new InstanceDungeonMowingPanelItem_1.InstanceDungeonMowingPanelItem();
        await this.qth.CreateThenShowByResourceIdAsync("UiItem_InstanceDungeon_MowingPanel", this.GetItem(8));
      }
      this.qth.SetActive(true);
      this.qth.RefreshItemByData(e);
    } else {
      this.qth?.SetUiActive(false);
    }
  }
  BUc() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId;
    ControllerHolder_1.ControllerHolder.InstanceDungeonController.CheckAndShowDungeonArchiveExpireTips(e);
  }
  async F9_() {
    await Promise.all([this.W9_(), this.Q9_(), this.Fth()]);
    this.Hth();
    this.K9_();
    this.Xai = this.HLn.CheckNeedOnTimer(this.NUe);
  }
  async Fth() {
    var e = this.Kli;
    if (e) {
      await this.SetTextureAsync(e.BannerPath, this.GetTexture(3));
      this.GetTexture(3)?.SetUIActive(true);
    }
  }
  async W9_() {
    await this.xth.RefreshItem(this.NUe);
  }
  async Q9_() {
    if (this.Kli.InstSubType === 15) {
      if (this.Eli) {
        this.Eli.SetActive(true);
      } else {
        this.Eli = new RoguelikeInstanceBtnPanel_1.RoguelikeInstanceBtnPanel();
        await this.Eli.CreateThenShowByResourceIdAsync("UiItem_InstanceDungeon_RoguelikePanel", this.GetItem(8));
        this.Eli.BindRedDot();
        this.AddChild(this.Eli);
      }
    } else {
      this.Eli?.SetActive(false);
    }
  }
  Hth() {
    this.Bth.RefreshItem(this.NUe);
  }
  Gth() {
    this.xth.UpdateInstanceDungeonLockItemAndCostItem();
  }
  K9_() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(this.NUe);
    if (!e || e <= 0) {
      this.NXs.SetActive(false);
      this.fea.SetActive(false);
    } else {
      this.NXs.SetActive(true);
      this.fea.SetActive(true);
    }
  }
  Fli(e) {
    this.xth?.SetMatchingItemActive(e);
  }
  Vli() {
    this.Pth.SetMatchingTime(0);
    this.Pth.StartTimer();
  }
  Uli() {
    this.dli = 0;
    var e = [];
    let t = -1;
    this.o1i();
    var n;
    var i;
    var s = this.sli.size === 1;
    let r = false;
    for ([n, i] of this.HLn.InstanceByTitleMap) {
      var a = n === this.ili;
      var o = this.sli.get(n) === 1;
      this.HLn.SortInstanceArray(i);
      for (const l of i) {
        if (t !== n && !s || t !== n && s && o) {
          var h = new InstanceDungeonData_1.InstanceDetectionDynamicData();
          h.InstanceSeriesTitle = n;
          h.InstanceGirdId = l;
          h.IsSelect = a;
          h.IsOnlyOneGrid = o;
          t = n;
          e.push(h);
          if (!(r = this.ili === this.NUe && this.NUe === l ? true : r)) {
            this.dli++;
          }
          if (s && o) {
            break;
          }
        }
        if (!!a && !o && !((h = new InstanceDungeonData_1.InstanceDetectionDynamicData()).InstanceGirdId = l, h.IsSelect = l === (this.NUe ?? 0), h.IsShow = a, e.push(h), r = !!h.IsSelect || r)) {
          this.dli++;
        }
      }
    }
    return e;
  }
  o1i() {
    let e = 0;
    let t = 0;
    let n = 0;
    this.sli.clear();
    var i;
    var s;
    var r;
    var a;
    var o;
    var h = !!this.NUe;
    for ([i, s] of this.HLn.InstanceByTitleMap) {
      t = t || i;
      this.sli.set(i, s.length);
      if (!h) {
        for (const l of s) {
          if (!this.ili || i === this.ili) {
            e = e || l;
            if ((r = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(l)) && l > this.NUe && (a = ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(l), o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(l, ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel), r) && !a && o > n) {
              this.NUe = l;
              this.ili = i;
              n = o;
            }
          }
        }
      }
    }
    this.NUe ||= e;
    this.ili ||= t;
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId = this.NUe;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t = Number(e[0]) - 1;
    var t = this.Cli.GetScrollItemFromIndex(t);
    if (t) {
      return [t = t.GetExtendToggleForGuide().RootUIComp, t];
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 16, "副本入口聚焦引导extraParam字段配置错误, 找不到对应的副本选项", ["configParams", e]);
    }
  }
  UUc() {
    const e = this.NUe;
    ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter = false;
    const t = ModelManager_1.ModelManager.PowerModel.IsPowerEnough(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(this.NUe));
    var n;
    var i;
    if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceLevelTooLow(this.NUe)) {
      (n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(200)).FunctionMap.set(2, () => {
        if (t || ModelManager_1.ModelManager.InstanceDungeonModel?.HidePowerLackConfirmBox) {
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId = e;
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow();
        } else {
          this.Bsa();
        }
      });
      n.FunctionMap.set(1, () => {
        this.Bli();
      });
      i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockCondition(e);
      n.SetTextArgs(i[1].toString());
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(n);
    } else if (t || ModelManager_1.ModelManager.InstanceDungeonModel?.HidePowerLackConfirmBox) {
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId = e;
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow();
    } else {
      this.Bsa();
    }
  }
  Bsa() {
    const e = this.NUe;
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(35);
    t.FunctionMap.set(2, () => {
      this.Bli();
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId = e;
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow();
    });
    t.FunctionMap.set(1, () => {
      this.Bli();
    });
    t.HasToggle = true;
    t.ToggleText = ConfigManager_1.ConfigManager.TextConfig.GetTextById("PlotSkipConfirmToggle");
    t.SetToggleFunction(this.RMt);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
  }
}
exports.InstanceDungeonEntranceView = InstanceDungeonEntranceView;
//# sourceMappingURL=InstanceDungeonEntranceView.js.map