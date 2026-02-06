"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CenterPanel = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const AutoPilotController_1 = require("../../../AutoPilot/AutoPilotController");
const AlterMarksView_1 = require("../AlterMarksView");
const AutoPilotTrackedMarksView_1 = require("../AutoPilotTrackedMarksView");
const BattleSkillSlideControlItem_1 = require("../BattleSkillSlideControlItem");
const BreakWeaknessPanel_1 = require("../Execution/BreakWeaknessPanel");
const ExecutionPanel_1 = require("../Execution/ExecutionPanel");
const GrapplingHookPoint_1 = require("../GrapplingHookPoint/GrapplingHookPoint");
const Joystick_1 = require("../Joystick");
const JoystickStatic_1 = require("../JoystickStatic");
const MotorcycleControlHudPanel_1 = require("../Motorcycle/MotorcycleControlHudPanel");
const MotorcycleControlMobilePanel_1 = require("../Motorcycle/MotorcycleControlMobilePanel");
const MotorcycleControlPanel_1 = require("../Motorcycle/MotorcycleControlPanel");
const MotorcycleControlTopPanel_1 = require("../Motorcycle/MotorcycleControlTopPanel");
const ScanTrackedMarksView_1 = require("../ScanTrackedMarksView");
const TrackedMarksView_1 = require("../TrackedMarksView");
const BattleChildViewPanel_1 = require("./BattleChildViewPanel");
const MoveCursorPanel_1 = require("./MoveCursorPanel");
const MoveSkillPanel_1 = require("./MoveSkillPanel");
const forbidMoveTagId = 1616400338;
class CenterPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.MJe = undefined;
    this.EJe = undefined;
    this.SJe = undefined;
    this.yJe = [];
    this.IJe = 0;
    this.TJe = undefined;
    this.LJe = undefined;
    this.c_g = false;
    this.xlg = undefined;
    this.UJe = undefined;
    this.Pvf = undefined;
    this.X9e = undefined;
    this.H7m = undefined;
    this.Itg = () => {
      this.Blg();
    };
    this.kJe = () => {
      var t = this.ChildViewData.GetChildVisible(17);
      this.GetItem(0).SetUIActive(t);
      this.SJe?.OnBattleHudVisibleChanged(t);
    };
    this.d_g = t => {
      this.c_g = !t;
    };
    this.FJe = t => {
      this.GetItem(2).SetUIActive(t);
      this.GetItem(2).SetRaycastTarget(t);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("BattleUiSet", 37, "轮盘界面显隐，设置CenterPanel遮罩", ["bVisible", t]);
      }
    };
    this.VJe = (t, e, i) => {
      if (t) {
        if (i === 1) {
          if (!this.UJe) {
            this.UJe = new ExecutionPanel_1.ExecutionPanel();
            this.UJe.Init(this.RootItem);
          }
          this.UJe.ShowByEntity(e, i);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 17, "进入处决范围");
          }
        } else if (i === 3 && (this.Pvf || (this.Pvf = new BreakWeaknessPanel_1.BreakWeaknessPanel(), Info_1.Info.IsInTouch() ? this.Pvf.Init(this.RootItem) : this.Pvf.Init(UiLayer_1.UiLayer.GetBattleViewUnit(1))), this.Pvf.ShowByEntity(e, i), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Battle", 17, "进入破弱范围");
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "离开处决or破弱范围");
        }
        this.UJe?.HideByEntity(e);
        this.Pvf?.HideByEntity(e);
      }
    };
    this.HJe = t => {
      this.GetItem(0).SetUIActive(t);
      this.GetItem(1).SetUIActive(t);
      this.GetItem(2).SetUIActive(t);
    };
    this.fHe = () => {
      var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
      this.X9e = t.EntityHandle;
      this.jJe();
    };
    this.jef = undefined;
    this.$ef = undefined;
    this.e3f = undefined;
    this.Wef = () => {
      this.Qef();
      this.rxg();
    };
    this.glg = (t, e) => {
      if (t === 0) {
        this.Qef();
      }
    };
    this.pqg = undefined;
    this.vqg = t => {
      this.yqg();
    };
    this.C8g = () => {
      this.rxg();
    };
  }
  OnRegisterComponent() {
    var t = this.GetOperationType();
    if (t === 2) {
      this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
    } else if (t === 1) {
      this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
    }
  }
  InitializeTemp() {
    this.kJe();
    this.X9e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  }
  async InitializeAsync() {
    await Promise.all([this.WJe(), this.KJe(), this.QJe(), this.$7m(), this.XJe()]);
    this.GetItem(2).SetUIActive(false);
    this.Blg();
    this.Qef();
  }
  OnShowBattleChildViewPanel() {
    this.TJe?.ShowBattleVisibleChildView();
    this.MJe?.OnShowBattleChildViewPanel();
    this.H7m?.OnShowBattleChildViewPanel();
    this.$ef?.OnShowBattleChildViewPanel();
  }
  OnHideBattleChildViewPanel() {
    this.TJe?.HideBattleVisibleChildView();
    this.MJe?.OnHideBattleChildViewPanel();
    this.H7m?.OnHideBattleChildViewPanel();
    this.$ef?.OnHideBattleChildViewPanel();
  }
  SetEventVisible(t) {}
  Reset() {
    this.MJe = undefined;
    this.H7m = undefined;
    this.SJe = undefined;
    this.TJe = undefined;
    this.xlg?.Destroy();
    this.xlg = undefined;
    this.UJe?.Destroy();
    this.UJe = undefined;
    this.Pvf?.Destroy();
    this.Pvf = undefined;
    if (this.jef) {
      this.jef.Destroy();
      this.jef = undefined;
    }
    if (this.$ef) {
      this.$ef.Destroy();
      this.$ef = undefined;
    }
    if (this.e3f) {
      this.e3f.Destroy();
      this.e3f = undefined;
    }
    if (this.pqg) {
      this.pqg.Destroy();
      this.pqg = undefined;
      ModelManager_1.ModelManager.BattleUiModel.SlideControlData.ForceStop();
    }
    this.yJe.length = 0;
    super.Reset();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.fHe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ExploreComponentTargetChanged, this.Itg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRouletteViewVisibleChanged, this.FJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterOrExitExecutionRange, this.VJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GmOnlyShowJoyStick, this.HJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.Wef);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EnableGrapplingHookMark, this.d_g);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSetBattleUiChildCacheState, this.glg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiSlideControlVisibleChanged, this.vqg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMotorcycleRoundJoystickChanged, this.C8g);
    this.ChildViewData.AddCallback(17, this.kJe);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.fHe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ExploreComponentTargetChanged, this.Itg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRouletteViewVisibleChanged, this.FJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterOrExitExecutionRange, this.VJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GmOnlyShowJoyStick, this.HJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.Wef);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnableGrapplingHookMark, this.d_g);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSetBattleUiChildCacheState, this.glg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiSlideControlVisibleChanged, this.vqg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMotorcycleRoundJoystickChanged, this.C8g);
    this.ChildViewData.RemoveCallback(17, this.kJe);
  }
  OnTickBattleChildViewPanel(t) {
    CenterPanel.$Je.Start();
    this.TJe?.Tick(t);
    this.LJe?.Tick(t);
    this.jef?.Tick(t);
    this.$ef?.Tick(t);
    this.e3f?.Tick(t);
    this.pqg?.Tick(t);
    CenterPanel.$Je.Stop();
    CenterPanel.YJe.Start();
    this.SJe.Update(t);
    this.klg();
    this.Pvf?.Tick(t);
    CenterPanel.YJe.Stop();
  }
  OnAfterTickBattleChildViewPanel(t) {
    CenterPanel.JJe.Start();
    this.MJe?.Update(t);
    CenterPanel.JJe.Stop();
    CenterPanel.zJe.Start();
    this.EJe.Update();
    CenterPanel.zJe.Stop();
    CenterPanel.ZJe.Start();
    this.eze();
    CenterPanel.ZJe.Stop();
    CenterPanel.W7m.Start();
    this.H7m?.Update(t);
    CenterPanel.W7m.Stop();
  }
  qlg(t) {
    var e;
    if (this.xlg) {
      this.xlg.UpdateHookPointLocation(t.ToUeVector());
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 79, "已创建钩锁点交互提示, 更新位置");
      }
    } else {
      e = UiLayer_1.UiLayer.GetBattleViewUnit(1);
      this.xlg = new GrapplingHookPoint_1.GrapplingHookPoint(t, e);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 79, "创建钩锁点交互提示");
      }
    }
  }
  Olg() {
    if (this.xlg && (this.xlg.Destroy(), this.xlg = undefined, Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Battle", 79, "移除钩锁点交互提示");
    }
  }
  klg() {
    var t;
    var e;
    if (this.xlg && (t = ModelManager_1.ModelManager.ExploreModel.GetActiveExploreComponent())?.Valid && (e = t.FocusTarget, t.FocusTargetLegal) && e?.Valid && e.IsMovable()) {
      this.xlg.UpdateHookPointLocation(e.HookLocation.ToUeVector());
    }
  }
  Blg() {
    var t;
    var e = ModelManager_1.ModelManager.ExploreModel.GetActiveExploreComponent();
    if (!e?.Valid || (t = e.FocusTarget, e = e.FocusTargetLegal, !t) || this.c_g) {
      this.Olg();
    } else {
      this.qlg(t.HookLocation);
      if (e) {
        this.xlg?.EnableMarker();
      } else {
        this.xlg?.DisableMarker();
      }
    }
  }
  GetExecutionItem() {
    return this.UJe?.GetExecutionItem();
  }
  eze() {
    var t;
    if (this.xlg) {
      if ((t = ModelManager_1.ModelManager.ExploreModel.GetActiveExploreComponent())?.Valid && t.FocusTarget?.Valid) {
        if (t.FocusTargetLegal) {
          this.xlg.EnableMarker();
          this.xlg.AfterTick();
        } else {
          this.xlg.DisableMarker();
        }
      } else {
        this.Olg();
      }
    }
  }
  async WJe() {
    var t = this.GetItem(0);
    this.MJe = await this.NewStaticChildViewAsync(t.GetOwner(), TrackedMarksView_1.TrackedMarksView);
  }
  async KJe() {
    var t = this.GetItem(0);
    this.EJe = await this.NewStaticChildViewAsync(t.GetOwner(), ScanTrackedMarksView_1.ScanTrackedMarksView);
  }
  async QJe() {
    var t = this.GetItem(1);
    this.SJe = await this.NewStaticChildViewAsync(t.GetOwner(), AlterMarksView_1.AlterMarksView);
  }
  async $7m() {
    var t = this.GetItem(0);
    this.H7m = await this.NewStaticChildViewAsync(t.GetOwner(), AutoPilotTrackedMarksView_1.AutoPilotTrackedMarksView);
  }
  async XJe() {
    var t;
    if (this.GetOperationType() === 1) {
      t = this.GetItem(3);
      this.TJe = await this.NewStaticChildViewAsync(t.GetOwner(), Joystick_1.Joystick, this.RootItem);
    }
    this.jJe();
  }
  jJe() {
    if (this.X9e?.Valid) {
      if (this.TJe) {
        this.ClearAllTagSignificantChangedCallback();
        this.ListenForTagSignificantChanged(this.X9e, forbidMoveTagId, (t, e) => {
          this.TJe.SetForbidMove(e);
        });
        this.TJe.SetForbidMove(this.ContainsTag(this.X9e, forbidMoveTagId));
      }
      var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
      let t = 0;
      if (e?.RoleBattleViewInfo) {
        t = e.RoleBattleViewInfo.JoystickType;
      }
      if (this.IJe !== t && (this.IJe = t, this.TJe?.SetVisible(3, t === 0), this.rxg(), this.LJe && (this.LJe.Destroy(), this.LJe = undefined), t === 1 && ((e = new MoveSkillPanel_1.MoveSkillPanel()).CreateDynamic(this.GetRootItem()), this.LJe = e), t === 3)) {
        if (this.GetOperationType() === 1) {
          this.NewDynamicChildViewByResourceIdWithCallback(this.RootItem, "PnlLevelJoystick", JoystickStatic_1.JoystickStatic, true, t => {
            (this.LJe = t).SetVisible(3, true);
            t.SetEnable(true);
            t.ShowBattleVisibleChildView();
          }, this.RootItem);
        } else {
          (e = new MoveCursorPanel_1.MoveCursorPanel()).CreateDynamic(this.GetRootItem());
          this.LJe = e;
        }
      }
    }
  }
  rxg() {
    var t = ModelManager_1.ModelManager.BattleUiModel.MotorcycleData;
    if (t.IsDriving && !t.GetIsRoundJoystick()) {
      this.TJe?.SetEnable(false);
    } else {
      this.TJe?.SetEnable(this.IJe === 0);
    }
  }
  Qef() {
    this.Y_g();
  }
  Y_g() {
    var t;
    var e = ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsDriving;
    var i = ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsNeedCacheUi;
    let s = false;
    if (i) {
      if (!this.jef) {
        if (Info_1.Info.IsInTouch()) {
          this.jef = new MotorcycleControlMobilePanel_1.MotorcycleControlMobilePanel();
        } else {
          this.jef = new MotorcycleControlPanel_1.MotorcycleControlPanel();
        }
        this.jef.Init(this.GetRootItem(), "UiItem_MotorcycleControl");
        s = true;
      }
      if (!this.$ef) {
        this.$ef = new MotorcycleControlTopPanel_1.MotorcycleControlTopPanel();
        this.$ef.Init(this.GetRootItem(), "UiItem_MotorcycleControlTop");
      }
      if (!this.e3f) {
        this.e3f = new MotorcycleControlHudPanel_1.MotorcycleControlHudPanel();
        t = UiLayer_1.UiLayer.GetBattleViewUnit(1);
        this.e3f.Init(t, "UiItem_MotoParkourHUD_T");
      }
      if (s) {
        return;
      }
    } else if (e) {
      if (!this.jef) {
        if (Info_1.Info.IsInTouch()) {
          this.jef = new MotorcycleControlMobilePanel_1.MotorcycleControlMobilePanel();
        } else {
          this.jef = new MotorcycleControlPanel_1.MotorcycleControlPanel();
        }
        this.jef.Init(this.GetRootItem(), "UiItem_MotorcycleControl");
      }
      if (!this.$ef) {
        this.$ef = new MotorcycleControlTopPanel_1.MotorcycleControlTopPanel();
        this.$ef.Init(this.GetRootItem(), "UiItem_MotorcycleControlTop");
      }
      if (!this.e3f) {
        this.e3f = new MotorcycleControlHudPanel_1.MotorcycleControlHudPanel();
        t = UiLayer_1.UiLayer.GetBattleViewUnit(1);
        this.e3f.Init(t, "UiItem_MotoParkourHUD_T");
      }
      return;
    }
    if (e) {
      if (this.jef && !this.jef.IsCreateOrCreating) {
        this.jef.ShowBattleVisibleChildView();
      }
      if (this.$ef && !this.$ef.IsCreateOrCreating) {
        this.$ef.ShowBattleVisibleChildView();
      }
      if (this.e3f && !this.e3f.IsCreateOrCreating) {
        this.e3f.ShowBattleVisibleChildView();
      }
    } else {
      if (this.jef) {
        if (i) {
          this.jef.HideBattleVisibleChildView();
        } else {
          this.jef.Destroy();
          this.jef = undefined;
        }
      }
      if (this.$ef) {
        if (i) {
          this.$ef.HideBattleVisibleChildView();
        } else {
          this.$ef.Destroy();
          this.$ef = undefined;
        }
      }
      if (this.e3f) {
        if (i) {
          this.e3f.HideBattleVisibleChildView();
        } else {
          this.e3f.Destroy();
          this.e3f = undefined;
        }
      }
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t[0] === "MotorMobile") {
      return this.xDg(this.jef, t) ?? this.xDg(this.$ef, t) ?? this.xDg(AutoPilotController_1.AutoPilotController.AutoPilotViewInstance, t);
    }
  }
  xDg(t, e) {
    var i;
    if (t) {
      i = e[1];
      e = e[2];
      i = i ? t.GetGuideUiItem(i) : undefined;
      t = e ? t.GetGuideUiItem(e) : undefined;
      if (i && t) {
        return [i, t];
      } else if (i) {
        return [i, i];
      } else {
        return undefined;
      }
    }
  }
  yqg() {
    if (ModelManager_1.ModelManager.BattleUiModel.SlideControlData.GetVisible()) {
      if (!this.pqg) {
        this.pqg = new BattleSkillSlideControlItem_1.BattleSkillSlideControlItem();
        this.pqg.CreateByResourceIdAsync("UiItem_AimisiFlyControl", this.RootItem);
      }
      this.pqg.SetComponentActive(true);
    } else if (this.pqg) {
      this.pqg.SetComponentActive(false);
    }
  }
}
(exports.CenterPanel = CenterPanel).JJe = Stats_1.Stat.Create("[BattleView]CenterPanelTick1");
CenterPanel.zJe = Stats_1.Stat.Create("[BattleView]CenterPanelTick2");
CenterPanel.$Je = Stats_1.Stat.Create("[BattleView]CenterPanelTick5");
CenterPanel.ZJe = Stats_1.Stat.Create("[BattleView]CenterPanelTick6");
CenterPanel.YJe = Stats_1.Stat.Create("[BattleView]CenterPanelTick9");
CenterPanel.W7m = Stats_1.Stat.Create("[BattleView]CenterPanelTick7"); //# sourceMappingURL=CenterPanel.js.map