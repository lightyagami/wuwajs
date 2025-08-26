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
    this._2u = undefined;
    this.Proxy = new BattleViewProxy_1.BattleViewProxy();
    this.zot = undefined;
    this.Zot = () => {
      this.Proxy.HeadStatePanel.RefreshCurrentRole();
    };
    this.ert = () => {
      var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
      if (e?.RoleConfig) {
        this.trt(e.RoleConfig.RoleType === 2);
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
    this.Jpe = (e, t, i) => {
      if (t?.Valid) {
        this.Proxy.HeadStatePanel.OnCreateEntity(t.Entity);
        this.Vot.OnCreateEntity(t.Entity);
      }
    };
    this.zpe = (e, t) => {
      if (t?.Valid) {
        this.Proxy.HeadStatePanel.OnRemoveEntity(t.Entity);
        this.Vot.DestroyPartStateFromRole(t.Entity);
      }
    };
    this.FJe = e => {
      var t = this.ort(6).GetRootItem();
      var i = (Info_1.Info.IsInTouch() ? this.ort(5) : this.ort(7)).GetRootItem();
      var s = t.GetHierarchyIndex();
      var i = i.GetHierarchyIndex();
      if (e && s <= i) {
        this.Yot = s;
        t.SetHierarchyIndex(i);
      } else if (this.Yot !== undefined) {
        t.SetHierarchyIndex(this.Yot);
        this.Yot = undefined;
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("BattleUiSet", 37, "轮盘界面显隐，调整摇杆面板层级", ["bVisible", e]);
      }
    };
    this.Yoh = () => {
      for (const e of this.Kot.values()) {
        if (e !== undefined) {
          e.OnSeamlessTravelFinish();
        }
      }
    };
    this.rrt = e => {
      AudioSystem_1.AudioSystem.PostEvent(e);
    };
    this.KHa = e => {
      this.RootItem?.SetAlpha(e);
    };
    this.TEl = () => {
      this.LEl();
    };
    this.fIl = (e, t) => {
      if (t === 0) {
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
          this._2u?.OnInputControllerChange(this.sza, this.Hot);
        } else {
          this.lza().then(() => {
            if (!this.IsDestroyOrDestroying) {
              this.Hot.ShowBattleChildViewPanel();
              this.Hot.RefreshOnDelayShow();
              this.jot.ShowBattleChildViewPanel();
              this._2u?.OnInputControllerChange(this.sza, this.Hot);
            }
          });
        }
      } else if (Info_1.Info.IsInKeyBoard()) {
        if (this.hza) {
          this._2u?.OnInputControllerChange(this.sza, this.Hot);
        } else {
          this._za().then(() => {
            if (!this.IsDestroyOrDestroying) {
              this.sza.ShowBattleChildViewPanel();
              this.sza.RefreshOnDelayShow();
              this.aza.ShowBattleChildViewPanel();
              this._2u?.OnInputControllerChange(this.sza, this.Hot);
            }
          });
        }
      }
    };
    this.ttt = e => {
      for (var [t, i] of this.Kot) {
        if (t !== 5) {
          if (e) {
            if (i.GetVisible()) {
              i.GetRootItem().SetUIActive(true);
            }
          } else {
            i.GetRootItem().SetUIActive(false);
          }
        }
      }
    };
    this.HJe = e => {
      for (var [t, i] of this.Kot) {
        if (t !== 6) {
          if (e) {
            if (i.GetVisible()) {
              i.GetRootItem().SetUIActive(true);
            }
          } else {
            i.GetRootItem().SetUIActive(false);
          }
        }
      }
    };
    this._F_ = e => {
      this.GetItem(1)?.SetUIActive(e);
      ModelManager_1.ModelManager.BattleUiModel.IsMissionPanelVisible = e;
    };
    this.Tla = () => {
      var e = this.Kot.get(6);
      if (e = e && e.GetExecutionItem()) {
        return [e, e];
      } else {
        return undefined;
      }
    };
    this.Lla = e => {
      var t = this.Kot.get(3);
      if (t) {
        return t.GetBattleSkillItemByButtonType(Number(e[1]))?.GetGuideItem();
      }
    };
    this.Dla = t => {
      var i = this.Kot.get(Number(t[0]))?.GetUiActorForGuide()?.GetComponentByClass(UE.GuideHookRegistry.StaticClass());
      if (i) {
        var s = t[2];
        var n = i.GuideHookComponents.Get(s);
        if (!n) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Guide", 16, "战斗界面挂接组件(GuideHookRegistry)不存在该挂接点名称，请检查聚焦引导配置或挂接组件");
          }
        }
        var n = n.GetUIItem();
        let e = t[1];
        if (StringUtils_1.StringUtils.IsEmpty(e)) {
          e = s;
        }
        t = i.GuideHookComponents.Get(e);
        if (!t) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Guide", 16, "战斗界面挂接组件(GuideHookRegistry)不存在该挂接点（展示用）名称，请检查聚焦引导配置或挂接组件");
          }
        }
        s = t.GetUIItem();
        return [n, s];
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 16, "战斗界面挂接组件(GuideHookRegistry)缺失");
      }
    };
    this.Ala = () => {
      var e;
      var t = this.ort(2);
      if (t) {
        for (const i of t.GetFormationItemList()) {
          if (!i.IsMyRole) {
            if (e = i.GetRootItem()) {
              return [e, e];
            } else {
              return undefined;
            }
          }
        }
      }
    };
    this.MF_ = e => {
      return this.ort(5)?.GetGuideUiItemAndUiItemForShowEx(e);
    };
    this.lB1 = e => this.gp1?.GetGuideUiItemAndUiItemForShowEx(e);
    this.Lq1 = e => {
      var t = this._2u?.GetLinkEnergyButton()?.GetRootItem();
      if (t) {
        return [t, t];
      } else {
        return undefined;
      }
    };
    this.IK1 = e => {
      return this.ort(1)?.GetGuideUiItemAndUiItemForShowEx(e);
    };
    this.u2u = e => {
      return this.ort(4)?.GetGuideUiItemAndUiItemForShowEx(e);
    };
    this.c2u = e => {
      return this.ort(5)?.GetGuideUiItemAndUiItemForShowEx(e);
    };
    this.whd = e => {
      return this.ort(11)?.GetGuideUiItemAndUiItemForShowEx(e);
    };
    this.L_d = e => this._2u?.GetWeeklyRogueButton()?.GetGuideUiItemAndUiItemForShowEx(e);
    this.Ula = new Map([["Execution", this.Tla], ["Skill", this.Lla], ["Default", this.Dla], ["Teammate", this.Ala], ["FishingViewBtn", this.MF_], ["DangoViewBtn", this.lB1], ["LinkBtn", this.Lq1], ["DangoMissionButton", this.IK1], ["MoraleTempExp", this.u2u], ["MoraleExp", this.c2u], ["ScorePanel", this.whd], ["WeeklyRogueBtn", this.L_d]]);
    this.cah = (e, t, i, s) => {
      this.Hot?.RefreshFormationCooldownExternal(e, t, i, s);
      this.sza?.RefreshFormationCooldownExternal(e, t, i, s);
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
    await Promise.all([this.uza(), this.art(), this.hrt(0, BossStatePanel_1.BossStatePanel, true, 13), this.hrt(5, TopPanel_1.TopPanel, true, 37), this.hrt(4, BottomPanel_1.BottomPanel, true, 11), this.hrt(1, MissionPanel_1.MissionPanel, true, 5), this.hrt(6, CenterPanel_1.CenterPanel, true, 37), this.hrt(7, ChatPanel_1.ChatPanel, false, 6), this.hrt(8, FullScreenPanel_1.FullScreenPanel, true, 23), this.hrt(9, PositionPanel_1.PositionPanel, true, 37), this.hrt(11, ScorePanel_1.ScorePanel, true, 24), this.xFc(), this.d2u(), this._cd()]);
    this.lrt();
    this._rt();
    this._2u.Init(this.sza, this.Hot);
    this.Ore();
    this.UiViewSequence.AddSequenceStartEvent("ShowView", this.irt);
    ModelManager_1.ModelManager.BattleUiModel.UpdateViewPortSize();
    this.LEl();
  }
  async xFc() {
    var e;
    var t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t)?.WorldDungeonSubType === 1) {
      t = this.GetItem(14);
      this.gp1 = new DangoWorldMainPanel_1.DangoWorldMainPanel();
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("UiView_CelebrationPark");
      await this.gp1.CreateByPathAsync(e, t);
      this.Qot.push(this.gp1);
    }
  }
  Cp1() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.WorldDungeonSubType === 1) {
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
  OnTick(e) {
    BattleView.vJe.Start();
    for (const t of this.Qot) {
      if (t.GetVisible()) {
        t.OnTickBattleChildViewPanel(e);
      }
    }
    this.Proxy.HeadStatePanel.Tick(e);
    this.Vot.Tick(e);
    this._2u?.Tick(e);
    BattleView.vJe.Stop();
  }
  OnAfterTick(e) {
    for (const t of this.Qot) {
      if (t.GetVisible()) {
        t.OnAfterTickBattleChildViewPanel(e);
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
      for (const e of this.Kot.values()) {
        if (this.P01(e)) {
          e.ShowBattleChildViewPanel();
        } else {
          e.HideBattleChildViewPanel();
        }
      }
      this.Cp1();
    }
  }
  OnAfterShow() {
    var e;
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
      (e = ModelManager_1.ModelManager.BattleUiModel).TryBroadcastCacheRoleLevelUpData();
      e.TryBroadcastCacheRevive();
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
    for (const e of this.Kot.values()) {
      e.HideBattleChildViewPanel();
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
    this._2u?.Destroy();
    this._2u = undefined;
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
  trt(e) {
    if (this.Jot !== e && (this.Jot = e, this.IsShow) && !this.EEl) {
      this.UiViewSequence?.PlaySequencePurely("Switch");
    }
  }
  async _cd() {
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
  ShowLinkButton(e) {
    this._2u?.ShowLinkButton(e);
  }
  async hrt(e, t, i = false, s = 0) {
    var n = this.GetItem(e);
    var t = new t();
    await t.CreateThenShowByActorAsync(n.GetOwner(), s);
    this.Kot.set(e, t);
    if (i) {
      this.Qot.push(t);
    }
    return t;
  }
  ort(e) {
    return this.Kot.get(e);
  }
  LEl() {
    this.EEl = ModelManager_1.ModelManager.BattleUiModel.PureModeData?.IsOpen ?? false;
    this.GetItem(15)?.SetUIActive(this.EEl);
    for (const e of this.Kot.values()) {
      e?.RefreshPureMode(this.EEl);
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
      for (const e of this.Kot.values()) {
        e?.RefreshPureMode(this.EEl);
      }
    }
  }
  DEl() {
    if (this.EEl) {
      this.GetItem(14)?.SetUIActive(false);
    }
  }
  mrt() {
    for (const e of this.Kot.values()) {
      if (e !== undefined) {
        e.Reset();
      }
    }
    this.Kot.clear();
    this.Qot.length = 0;
  }
  crt() {
    if (Info_1.Info.IsInTouch()) {
      var e = ModelManager_1.ModelManager.BattleUiSetModel.GetPanelDataMap();
      if (e) {
        for (var [t, i] of e) {
          var s = this.ort(t);
          if (s) {
            var n;
            var a;
            var h;
            var r;
            var i = i.GetPanelItemDataMap();
            if (i) {
              for (var [o, _] of i) {
                if (_.IsInitialized()) {
                  let e = s.GetItem(o);
                  if (e = o === -1 ? s.GetRootItem() : e) {
                    n = _.Size;
                    a = _.Alpha;
                    h = _.OffsetX;
                    r = _.OffsetY;
                    _ = _.HierarchyIndex;
                    this.Xot.X = n;
                    this.Xot.Y = n;
                    this.Xot.Z = n;
                    e.SetUIItemScale(this.Xot);
                    e.SetAnchorOffsetX(h);
                    e.SetAnchorOffsetY(r);
                    e.SetUIItemAlpha(a);
                    e.SetHierarchyIndex(_);
                  } else if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("BattleUiSet", 17, "刷新移动端主界面设置时，找不到对应按钮", ["panelIndex", t], ["panelItemIndex", o]);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  P01(e) {
    return !e.IsChildType(5) || !!ModelManager_1.ModelManager.BattleUiModel.IsMissionPanelVisible;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0) {
      return (this.Ula.get(e[0]) || this.Ula.get("Default"))(e);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 64, "BattleView相关的引导Extra参数设置错误，不能为空");
    }
  }
  ResetFormationCooldownExternal() {
    this.Hot?.ResetFormationCooldownExternal();
    this.sza?.ResetFormationCooldownExternal();
  }
  async d2u() {
    this._2u = new FormationUnitNodeHandle_1.FormationUnitNodeHandle();
    await this._2u.InitializeAsync(this.RootItem);
  }
}
(exports.BattleView = BattleView).vJe = Stats_1.Stat.Create("[BattleView]BattleViewTick");
//# sourceMappingURL=BattleView.js.map