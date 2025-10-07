"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const DangoWorldMainPanel_1 = require("../../Dango/DangoAbyss/View/DangoWorldMainPanel");
const BottomPanel_1 = require("./BattleChildViewPanel/BottomPanel");
const CenterPanel_1 = require("./BattleChildViewPanel/CenterPanel");
const ChatPanel_1 = require("./BattleChildViewPanel/ChatPanel");
const FormationPanel_1 = require("./BattleChildViewPanel/FormationPanel");
const GamepadSkillButtonPanel_1 = require("./BattleChildViewPanel/GamepadSkillButtonPanel");
const MissionPanel_1 = require("./BattleChildViewPanel/MissionPanel");
const PositionPanel_1 = require("./BattleChildViewPanel/PositionPanel");
const ScorePanel_1 = require("./BattleChildViewPanel/ScorePanel");
const SkillButtonPanel_1 = require("./BattleChildViewPanel/SkillButtonPanel");
const TopPanel_1 = require("./BattleChildViewPanel/TopPanel");
const BattleViewProxy_1 = require("./BattleViewProxy");
const BossStatePanel_1 = require("./BossState/BossStatePanel");
const FormationUnitNodeHandle_1 = require("./FormationUnitNode/FormationUnitNodeHandle");
const FullScreenPanel_1 = require("./FullScreenPanel");
const BattleHeadStatePanel_1 = require("./HeadState/BattleHeadStatePanel");
const PartStatePanel_1 = require("./PartStatePanel");
const CHECK_DESTROY_TIME = 5000;
class BattleView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Vot = undefined;
    this.sza = undefined;
    this.aza = undefined;
    this.Hot = undefined;
    this.jot = undefined;
    this.gp1 = undefined;
    this.hza = false;
    this.Wot = false;
    this.Kot = new Map();
    this.Qot = [];
    this.Xot = new UE.Vector();
    this.Yot = undefined;
    this.Jot = false;
    this.EEl = false;
    this.iNu = undefined;
    this.Proxy = new BattleViewProxy_1.BattleViewProxy();
    this.zot = undefined;
    this.Zot = () => {
      this.Proxy.HeadStatePanel.RefreshCurrentRole();
    };
    this.ert = () => {
      var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
      if (t?.RoleConfig) {
        this.trt(t.RoleConfig.RoleType === 2);
      }
    };
    this.IEl = () => {
      ControllerHolder_1.ControllerHolder.BattleUiControl.TryClosePureMode();
    };
    this.fHe = () => {
      this.Proxy.HeadStatePanel.RefreshCurrentRole();
    };
    this.irt = () => {
      if (this.IsShow) {
        this.SetActive(true);
      }
    };
    this.Jpe = (t, e, i) => {
      if (e?.Valid) {
        this.Proxy.HeadStatePanel.OnCreateEntity(e.Entity);
        this.Vot.OnCreateEntity(e.Entity);
      }
    };
    this.zpe = (t, e) => {
      if (e?.Valid) {
        this.Proxy.HeadStatePanel.OnRemoveEntity(e.Entity);
        this.Vot.DestroyPartStateFromRole(e.Entity);
      }
    };
    this.FJe = t => {
      var e = this.ort(6).GetRootItem();
      var i = (Info_1.Info.IsInTouch() ? this.ort(5) : this.ort(7)).GetRootItem();
      var s = e.GetHierarchyIndex();
      var i = i.GetHierarchyIndex();
      if (t && s <= i) {
        this.Yot = s;
        e.SetHierarchyIndex(i);
      } else if (this.Yot !== undefined) {
        e.SetHierarchyIndex(this.Yot);
        this.Yot = undefined;
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("BattleUiSet", 37, "轮盘界面显隐，调整摇杆面板层级", ["bVisible", t]);
      }
    };
    this.Yoh = () => {
      for (const t of this.Kot.values()) {
        if (t !== undefined) {
          t.OnSeamlessTravelFinish();
        }
      }
    };
    this.rrt = t => {
      AudioSystem_1.AudioSystem.PostEvent(t);
    };
    this.KHa = t => {
      this.RootItem?.SetAlpha(t);
    };
    this.TEl = () => {
      this.LEl();
    };
    this.fIl = (t, e) => {
      if (e === 0) {
        if (this.EEl) {
          ControllerHolder_1.ControllerHolder.BattleUiControl.TryClosePureMode();
        } else {
          ControllerHolder_1.ControllerHolder.BattleUiControl.TryOpenPureMode();
        }
      }
    };
    this.XBo = () => {
      if (Info_1.Info.IsInGamepad()) {
        if (this.Wot) {
          this.iNu?.OnInputControllerChange(this.sza, this.Hot);
        } else {
          this.lza().then(() => {
            if (!this.IsDestroyOrDestroying) {
              this.Hot.ShowBattleChildViewPanel();
              this.Hot.RefreshOnDelayShow();
              this.jot.ShowBattleChildViewPanel();
              this.iNu?.OnInputControllerChange(this.sza, this.Hot);
            }
          });
        }
      } else if (Info_1.Info.IsInKeyBoard()) {
        if (this.hza) {
          this.iNu?.OnInputControllerChange(this.sza, this.Hot);
        } else {
          this._za().then(() => {
            if (!this.IsDestroyOrDestroying) {
              this.sza.ShowBattleChildViewPanel();
              this.sza.RefreshOnDelayShow();
              this.aza.ShowBattleChildViewPanel();
              this.iNu?.OnInputControllerChange(this.sza, this.Hot);
            }
          });
        }
      }
    };
    this.ttt = t => {
      for (var [e, i] of this.Kot) {
        if (e !== 5) {
          if (t) {
            if (i.GetVisible()) {
              i.GetRootItem().SetUIActive(true);
            }
          } else {
            i.GetRootItem().SetUIActive(false);
          }
        }
      }
    };
    this.HJe = t => {
      for (var [e, i] of this.Kot) {
        if (e !== 6) {
          if (t) {
            if (i.GetVisible()) {
              i.GetRootItem().SetUIActive(true);
            }
          } else {
            i.GetRootItem().SetUIActive(false);
          }
        }
      }
    };
    this._F_ = t => {
      this.GetItem(1)?.SetUIActive(t);
      ModelManager_1.ModelManager.BattleUiModel.IsMissionPanelVisible = t;
    };
    this.Tla = () => {
      var t = this.Kot.get(6);
      if (t = t && t.GetExecutionItem()) {
        return [t, t];
      } else {
        return undefined;
      }
    };
    this.Lla = t => {
      var e = this.Kot.get(3);
      if (e) {
        return e.GetBattleSkillItemByButtonType(Number(t[1]))?.GetGuideItem();
      }
    };
    this.Dla = e => {
      var i = this.Kot.get(Number(e[0]))?.GetUiActorForGuide()?.GetComponentByClass(UE.GuideHookRegistry.StaticClass());
      if (i) {
        var s = e[2];
        var n = i.GuideHookComponents.Get(s);
        if (!n) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Guide", 16, "战斗界面挂接组件(GuideHookRegistry)不存在该挂接点名称，请检查聚焦引导配置或挂接组件");
          }
        }
        var n = n.GetUIItem();
        let t = e[1];
        if (StringUtils_1.StringUtils.IsEmpty(t)) {
          t = s;
        }
        e = i.GuideHookComponents.Get(t);
        if (!e) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Guide", 16, "战斗界面挂接组件(GuideHookRegistry)不存在该挂接点（展示用）名称，请检查聚焦引导配置或挂接组件");
          }
        }
        s = e.GetUIItem();
        return [n, s];
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 16, "战斗界面挂接组件(GuideHookRegistry)缺失");
      }
    };
    this.Ala = () => {
      var t;
      var e = this.ort(2);
      if (e) {
        for (const i of e.GetFormationItemList()) {
          if (!i.IsMyRole) {
            if (t = i.GetRootItem()) {
              return [t, t];
            } else {
              return undefined;
            }
          }
        }
      }
    };
    this.MF_ = t => {
      return this.ort(5)?.GetGuideUiItemAndUiItemForShowEx(t);
    };
    this.lB1 = t => this.gp1?.GetGuideUiItemAndUiItemForShowEx(t);
    this.Lq1 = t => {
      var e = this.iNu?.GetLinkEnergyButton()?.GetRootItem();
      if (e) {
        return [e, e];
      } else {
        return undefined;
      }
    };
    this.IK1 = t => {
      return this.ort(1)?.GetGuideUiItemAndUiItemForShowEx(t);
    };
    this.P3u = t => {
      return this.ort(4)?.GetGuideUiItemAndUiItemForShowEx(t);
    };
    this.x3u = t => {
      return this.ort(5)?.GetGuideUiItemAndUiItemForShowEx(t);
    };
    this.pdd = t => {
      return this.ort(11)?.GetGuideUiItemAndUiItemForShowEx(t);
    };
    this.tgd = t => this.iNu?.GetWeeklyRogueButton()?.GetGuideUiItemAndUiItemForShowEx(t);
    this.mWd = t => {
      var e = this.iNu?.GetBattleTimeDilationButton()?.GetRootItem();
      if (e) {
        return [e, e];
      } else {
        return undefined;
      }
    };
    this.Ula = new Map([["Execution", this.Tla], ["Skill", this.Lla], ["Default", this.Dla], ["Teammate", this.Ala], ["FishingViewBtn", this.MF_], ["DangoViewBtn", this.lB1], ["LinkBtn", this.Lq1], ["DangoMissionButton", this.IK1], ["MoraleTempExp", this.P3u], ["MoraleExp", this.x3u], ["ScorePanel", this.pdd], ["WeeklyRogueBtn", this.tgd], ["TimeDilationBtn", this.mWd]]);
    this.cah = (t, e, i, s) => {
      this.Hot?.RefreshFormationCooldownExternal(t, e, i, s);
      this.sza?.RefreshFormationCooldownExternal(t, e, i, s);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIButtonComponent]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([12, UE.UIItem]);
      this.ComponentRegisterInfos.push([13, UE.UIItem]);
    }
    this.BtnBindInfo = [[16, this.IEl]];
  }
  async OnBeforeStartAsync() {
    this.OpenParam = this.Proxy;
    await Promise.all([this.uza(), this.art(), this.hrt(0, BossStatePanel_1.BossStatePanel, true, 13), this.hrt(5, TopPanel_1.TopPanel, true, 37), this.hrt(4, BottomPanel_1.BottomPanel, true, 11), this.hrt(1, MissionPanel_1.MissionPanel, true, 5), this.hrt(6, CenterPanel_1.CenterPanel, true, 37), this.hrt(7, ChatPanel_1.ChatPanel, false, 6), this.hrt(8, FullScreenPanel_1.FullScreenPanel, true, 23), this.hrt(9, PositionPanel_1.PositionPanel, true, 37), this.hrt(11, ScorePanel_1.ScorePanel, true, 24), this.xFc(), this.rNu(), this.cMd()]);
    this.lrt();
    this._rt();
    this.iNu.Init(this.sza, this.Hot);
    this.Ore();
    this.UiViewSequence.AddSequenceStartEvent("ShowView", this.irt);
    ModelManager_1.ModelManager.BattleUiModel.UpdateViewPortSize();
    this.LEl();
  }
  async xFc() {
    var t;
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.WorldDungeonSubType === 1) {
      e = this.GetItem(14);
      this.gp1 = new DangoWorldMainPanel_1.DangoWorldMainPanel();
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("UiView_CelebrationPark");
      await this.gp1.CreateByPathAsync(t, e);
      this.Qot.push(this.gp1);
    }
  }
  Cp1() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t)?.WorldDungeonSubType === 1) {
      this.GetItem(4)?.SetUIActive(false);
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(9, 5, false);
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(9, 7, false);
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(9, 8, false);
    }
  }
  async uza() {
    if (Info_1.Info.IsInGamepad()) {
      this.GetItem(2)?.SetUIActive(false);
      this.GetItem(3)?.SetUIActive(false);
    } else if (!this.hza) {
      await this._za();
    }
  }
  async _za() {
    this.hza = true;
    this.sza = await this.hrt(2, FormationPanel_1.FormationPanel, true, 7);
    this.aza = await this.hrt(3, SkillButtonPanel_1.SkillButtonPanel, true, 9);
  }
  async art() {
    if (Info_1.Info.IsInGamepad()) {
      if (!this.Wot) {
        await this.lza();
      }
    } else {
      this.GetItem(12)?.SetUIActive(false);
      this.GetItem(13)?.SetUIActive(false);
    }
  }
  async lza() {
    ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.RefreshButtonData();
    this.Wot = true;
    this.Hot = await this.hrt(12, FormationPanel_1.FormationPanel, true, 8);
    this.Hot.SetIsGamepad();
    this.jot = await this.hrt(13, GamepadSkillButtonPanel_1.GamepadSkillButtonPanel, true, 10);
    if (this.EEl) {
      this.Hot.RefreshPureMode(true);
      this.jot.RefreshPureMode(true);
    }
  }
  OnTick(t) {
    BattleView.vJe.Start();
    for (const e of this.Qot) {
      if (e.GetVisible()) {
        e.OnTickBattleChildViewPanel(t);
      }
    }
    this.Proxy.HeadStatePanel.Tick(t);
    this.Vot.Tick(t);
    this.iNu?.Tick(t);
    BattleView.vJe.Stop();
  }
  OnAfterTick(t) {
    for (const e of this.Qot) {
      if (e.GetVisible()) {
        e.OnAfterTickBattleChildViewPanel(t);
      }
    }
  }
  OnBeforeShow() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[battleView]OnBeforeShow");
    }
    if (this.IsDestroyOrDestroying) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[battleView]OnBeforeShow Cancel Because Destroy");
      }
    } else {
      this.REl();
      this.crt();
      for (const t of this.Kot.values()) {
        if (this.P01(t)) {
          t.ShowBattleChildViewPanel();
        } else {
          t.HideBattleChildViewPanel();
        }
      }
      this.Cp1();
    }
  }
  OnAfterShow() {
    var t;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[battleView]OnAfterShow");
    }
    if (this.IsDestroyOrDestroying) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[battleView]OnAfterShow Cancel Because Destroy");
      }
    } else {
      this.UEl();
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddBattleUiCommonChildVisibleReason(0);
      (t = ModelManager_1.ModelManager.BattleUiModel).TryBroadcastCacheRoleLevelUpData();
      t.TryBroadcastCacheRevive();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleViewActiveSequenceFinish);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActiveBattleView);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotStart);
    }
  }
  OnBeforeHide() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[battleView]OnBeforeHide");
    }
    this.DEl();
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveBattleUiCommonChildVisibleReason(0);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DisActiveBattleView);
  }
  OnAfterHide() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[battleView]OnAfterHide");
    }
    for (const t of this.Kot.values()) {
      t.HideBattleChildViewPanel();
    }
  }
  OnBeforeDestroy() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[battleView]OnBeforeDestroy");
    }
    this.kre();
    this.mrt();
    this.drt();
    this.Crt();
    this.ResetFormationCooldownExternal();
    this.iNu?.Destroy();
    this.iNu = undefined;
    this.Xot = undefined;
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      this.zot = TimerSystem_1.TimerSystem.Forever(() => {
        if (ModelManager_1.ModelManager.GameModeModel.WorldDone && (TimerSystem_1.TimerSystem.Remove(this.zot), this.zot = undefined, Log_1.Log.CheckError())) {
          Log_1.Log.Error("Battle", 17, "[battleView]主界面销毁超时，请将本次日志提交给测试");
        }
      }, CHECK_DESTROY_TIME);
    }
  }
  OnAfterDestroy() {
    if (this.zot) {
      TimerSystem_1.TimerSystem.Remove(this.zot);
      this.zot = undefined;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[battleView]OnAfterDestroy");
    }
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.fHe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.Zot);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiAllRoleDataChanged, this.ert);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.Jpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GmOnlyShowMiniMap, this.ttt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GmOnlyShowJoyStick, this.HJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GmHideMissionAndBossName, this._F_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRouletteViewVisibleChanged, this.FJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshFormationCooldownExternalInBattleView, this.cah);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SeamlessTravelFinishBeforeShowUI, this.Yoh);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiPlayAudio, this.rrt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiAlphaChanged, this.KHa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiPureModeChanged, this.TEl);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.退出精简模式, this.fIl);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.退出精简模式PC触摸板, this.fIl);
    if (!Info_1.Info.IsInTouch()) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    }
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.fHe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.Zot);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiAllRoleDataChanged, this.ert);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.Jpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GmOnlyShowMiniMap, this.ttt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GmOnlyShowJoyStick, this.HJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GmHideMissionAndBossName, this._F_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRouletteViewVisibleChanged, this.FJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshFormationCooldownExternalInBattleView, this.cah);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SeamlessTravelFinishBeforeShowUI, this.Yoh);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiPlayAudio, this.rrt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiAlphaChanged, this.KHa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiPureModeChanged, this.TEl);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.退出精简模式, this.fIl);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.退出精简模式PC触摸板, this.fIl);
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.InputControllerChange, this.XBo)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    }
  }
  trt(t) {
    if (this.Jot !== t && (this.Jot = t, this.IsShow) && !this.EEl) {
      this.UiViewSequence?.PlaySequencePurely("Switch");
    }
  }
  async cMd() {
    this.Proxy.HeadStatePanel = new BattleHeadStatePanel_1.BattleHeadStatePanel();
    await this.Proxy.HeadStatePanel.Preload();
  }
  lrt() {
    this.Proxy.HeadStatePanel?.Init();
  }
  drt() {
    if (this.Proxy.HeadStatePanel) {
      this.Proxy.HeadStatePanel.ResetAllHeadStates();
      this.Proxy.HeadStatePanel = undefined;
    }
  }
  _rt() {
    this.Vot = new PartStatePanel_1.PartStatePanel();
    this.Vot.InitializePartStatePanel();
  }
  Crt() {
    if (this.Vot) {
      this.Vot.ResetPartStatePanel();
      this.Vot = undefined;
    }
  }
  ShowLinkButton(t) {
    this.iNu?.ShowLinkButton(t);
  }
  UpdateTimeDilationButton() {
    this.iNu?.UpdateTimeDilationButton();
  }
  async hrt(t, e, i = false, s = 0) {
    var n = this.GetItem(t);
    var e = new e();
    await e.CreateThenShowByActorAsync(n.GetOwner(), s);
    this.Kot.set(t, e);
    if (i) {
      this.Qot.push(e);
    }
    return e;
  }
  ort(t) {
    return this.Kot.get(t);
  }
  LEl() {
    this.EEl = ModelManager_1.ModelManager.BattleUiModel.PureModeData?.IsOpen ?? false;
    this.GetItem(15)?.SetUIActive(this.EEl);
    for (const t of this.Kot.values()) {
      t?.RefreshPureMode(this.EEl);
    }
    if (!this.EEl) {
      this.GetItem(14)?.SetUIActive(true);
    }
  }
  REl() {
    if (this.EEl) {
      this.GetItem(14)?.SetUIActive(false);
    }
  }
  UEl() {
    if (this.EEl) {
      this.GetItem(14)?.SetUIActive(true);
      for (const t of this.Kot.values()) {
        t?.RefreshPureMode(this.EEl);
      }
    }
  }
  DEl() {
    if (this.EEl) {
      this.GetItem(14)?.SetUIActive(false);
    }
  }
  mrt() {
    for (const t of this.Kot.values()) {
      if (t !== undefined) {
        t.Reset();
      }
    }
    this.Kot.clear();
    this.Qot.length = 0;
  }
  crt() {
    if (Info_1.Info.IsInTouch()) {
      var t = ModelManager_1.ModelManager.BattleUiSetModel.GetPanelDataMap();
      if (t) {
        for (var [e, i] of t) {
          var s = this.ort(e);
          if (s) {
            var n;
            var a;
            var h;
            var r;
            var i = i.GetPanelItemDataMap();
            if (i) {
              for (var [o, _] of i) {
                if (_.IsInitialized()) {
                  let t = s.GetItem(o);
                  if (t = o === -1 ? s.GetRootItem() : t) {
                    n = _.Size;
                    a = _.Alpha;
                    h = _.OffsetX;
                    r = _.OffsetY;
                    _ = _.HierarchyIndex;
                    this.Xot.X = n;
                    this.Xot.Y = n;
                    this.Xot.Z = n;
                    t.SetUIItemScale(this.Xot);
                    t.SetAnchorOffsetX(h);
                    t.SetAnchorOffsetY(r);
                    t.SetUIItemAlpha(a);
                    t.SetHierarchyIndex(_);
                  } else if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("BattleUiSet", 17, "刷新移动端主界面设置时，找不到对应按钮", ["panelIndex", e], ["panelItemIndex", o]);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  P01(t) {
    return !t.IsChildType(5) || !!ModelManager_1.ModelManager.BattleUiModel.IsMissionPanelVisible;
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t.length !== 0) {
      return (this.Ula.get(t[0]) || this.Ula.get("Default"))(t);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 64, "BattleView相关的引导Extra参数设置错误，不能为空");
    }
  }
  ResetFormationCooldownExternal() {
    this.Hot?.ResetFormationCooldownExternal();
    this.sza?.ResetFormationCooldownExternal();
  }
  async rNu() {
    this.iNu = new FormationUnitNodeHandle_1.FormationUnitNodeHandle();
    await this.iNu.InitializeAsync(this.RootItem);
  }
}
(exports.BattleView = BattleView).vJe = Stats_1.Stat.Create("[BattleView]BattleViewTick");
//# sourceMappingURL=BattleView.js.map