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
const AlterMarksView_1 = require("../AlterMarksView");
const AutoPilotTrackedMarksView_1 = require("../AutoPilotTrackedMarksView");
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
    this.nXf = false;
    this.PKf = undefined;
    this.UJe = undefined;
    this.Q0f = undefined;
    this.X9e = undefined;
    this.V6m = undefined;
    this.cHf = () => {
      this.AKf();
    };
    this.kJe = () => {
      var t = this.ChildViewData.GetChildVisible(17);
      this.GetItem(0).SetUIActive(t);
      this.SJe?.OnBattleHudVisibleChanged(t);
    };
    this.sXf = t => {
      this.nXf = !t;
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
        } else if (i === 3 && (this.Q0f || (this.Q0f = new BreakWeaknessPanel_1.BreakWeaknessPanel(), Info_1.Info.IsInTouch() ? this.Q0f.Init(this.RootItem) : this.Q0f.Init(UiLayer_1.UiLayer.GetBattleViewUnit(1))), this.Q0f.ShowByEntity(e, i), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Battle", 17, "进入破弱范围");
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "离开处决or破弱范围");
        }
        this.UJe?.HideByEntity(e);
        this.Q0f?.HideByEntity(e);
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
    this.oJm = undefined;
    this.nJm = undefined;
    this.lkf = undefined;
    this.sJm = () => {
      this.aJm();
      this.jJe();
    };
    this.yKf = (t, e) => {
      if (t === 0) {
        this.aJm();
      }
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
    await Promise.all([this.WJe(), this.KJe(), this.QJe(), this.j6m(), this.XJe()]);
    this.GetItem(2).SetUIActive(false);
    this.AKf();
    this.aJm();
  }
  OnShowBattleChildViewPanel() {
    this.TJe?.ShowBattleVisibleChildView();
    this.MJe?.OnShowBattleChildViewPanel();
    this.V6m?.OnShowBattleChildViewPanel();
    this.nJm?.OnShowBattleChildViewPanel();
  }
  OnHideBattleChildViewPanel() {
    this.TJe?.HideBattleVisibleChildView();
    this.MJe?.OnHideBattleChildViewPanel();
    this.V6m?.OnHideBattleChildViewPanel();
    this.nJm?.OnHideBattleChildViewPanel();
  }
  SetEventVisible(t) {}
  Reset() {
    this.MJe = undefined;
    this.V6m = undefined;
    this.SJe = undefined;
    this.TJe = undefined;
    this.PKf?.Destroy();
    this.PKf = undefined;
    this.UJe?.Destroy();
    this.UJe = undefined;
    this.Q0f?.Destroy();
    this.Q0f = undefined;
    if (this.oJm) {
      this.oJm.Destroy();
      this.oJm = undefined;
    }
    if (this.nJm) {
      this.nJm.Destroy();
      this.nJm = undefined;
    }
    if (this.lkf) {
      this.lkf.Destroy();
      this.lkf = undefined;
    }
    this.yJe.length = 0;
    super.Reset();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.fHe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ExploreComponentTargetChanged, this.cHf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRouletteViewVisibleChanged, this.FJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterOrExitExecutionRange, this.VJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GmOnlyShowJoyStick, this.HJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.sJm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EnableGrapplingHookMark, this.sXf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSetBattleUiChildCacheState, this.yKf);
    this.ChildViewData.AddCallback(17, this.kJe);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.fHe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ExploreComponentTargetChanged, this.cHf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRouletteViewVisibleChanged, this.FJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterOrExitExecutionRange, this.VJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GmOnlyShowJoyStick, this.HJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.sJm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnableGrapplingHookMark, this.sXf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSetBattleUiChildCacheState, this.yKf);
    this.ChildViewData.RemoveCallback(17, this.kJe);
  }
  OnTickBattleChildViewPanel(t) {
    CenterPanel.$Je.Start();
    this.TJe?.Tick(t);
    this.LJe?.Tick(t);
    this.oJm?.Tick(t);
    this.nJm?.Tick(t);
    this.lkf?.Tick(t);
    CenterPanel.$Je.Stop();
    CenterPanel.YJe.Start();
    this.SJe.Update(t);
    this.DKf();
    this.Q0f?.Tick(t);
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
    CenterPanel.H6m.Start();
    this.V6m?.Update(t);
    CenterPanel.H6m.Stop();
  }
  UKf(t) {
    var e;
    if (this.PKf) {
      this.PKf.UpdateHookPointLocation(t.ToUeVector());
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 79, "已创建钩锁点交互提示, 更新位置");
      }
    } else {
      e = UiLayer_1.UiLayer.GetBattleViewUnit(1);
      this.PKf = new GrapplingHookPoint_1.GrapplingHookPoint(t, e);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 79, "创建钩锁点交互提示");
      }
    }
  }
  xKf() {
    if (this.PKf && (this.PKf.Destroy(), this.PKf = undefined, Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Battle", 79, "移除钩锁点交互提示");
    }
  }
  DKf() {
    var t;
    var e;
    if (this.PKf && (t = ModelManager_1.ModelManager.ExploreModel.GetActiveExploreComponent())?.Valid && (e = t.FocusTarget, t.FocusTargetLegal) && e?.Valid && e.IsMovable()) {
      this.PKf.UpdateHookPointLocation(e.HookLocation.ToUeVector());
    }
  }
  AKf() {
    var t;
    var e = ModelManager_1.ModelManager.ExploreModel.GetActiveExploreComponent();
    if (!e?.Valid || (t = e.FocusTarget, e = e.FocusTargetLegal, !t) || this.nXf) {
      this.xKf();
    } else {
      this.UKf(t.HookLocation);
      if (e) {
        this.PKf?.EnableMarker();
      } else {
        this.PKf?.DisableMarker();
      }
    }
  }
  GetExecutionItem() {
    return this.UJe?.GetExecutionItem();
  }
  eze() {
    var t;
    if (this.PKf) {
      if ((t = ModelManager_1.ModelManager.ExploreModel.GetActiveExploreComponent())?.Valid && t.FocusTarget?.Valid) {
        if (t.FocusTargetLegal) {
          this.PKf.EnableMarker();
          this.PKf.AfterTick();
        } else {
          this.PKf.DisableMarker();
        }
      } else {
        this.xKf();
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
  async j6m() {
    var t = this.GetItem(0);
    this.V6m = await this.NewStaticChildViewAsync(t.GetOwner(), AutoPilotTrackedMarksView_1.AutoPilotTrackedMarksView);
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
      if (ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsDriving) {
        t = 2;
      }
      if (e?.RoleBattleViewInfo) {
        t = e.RoleBattleViewInfo.JoystickType;
      }
      if (this.IJe !== t && (this.IJe = t, this.TJe?.SetVisible(3, t === 0), this.TJe?.SetEnable(t === 0), this.LJe && (this.LJe.Destroy(), this.LJe = undefined), t === 1 && ((e = new MoveSkillPanel_1.MoveSkillPanel()).CreateDynamic(this.GetRootItem()), this.LJe = e), t === 3)) {
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
  aJm() {
    this.qXf();
  }
  qXf() {
    var t;
    var e = ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsDriving;
    var i = ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsNeedCacheUi;
    let s = false;
    if (i) {
      if (!this.oJm) {
        if (Info_1.Info.IsInTouch()) {
          this.oJm = new MotorcycleControlMobilePanel_1.MotorcycleControlMobilePanel();
        } else {
          this.oJm = new MotorcycleControlPanel_1.MotorcycleControlPanel();
        }
        this.oJm.Init(this.GetRootItem(), "UiItem_MotorcycleControl");
        s = true;
      }
      if (!this.nJm) {
        this.nJm = new MotorcycleControlTopPanel_1.MotorcycleControlTopPanel();
        this.nJm.Init(this.GetRootItem(), "UiItem_MotorcycleControlTop");
      }
      if (!this.lkf) {
        this.lkf = new MotorcycleControlHudPanel_1.MotorcycleControlHudPanel();
        t = UiLayer_1.UiLayer.GetBattleViewUnit(1);
        this.lkf.Init(t, "UiItem_MotoParkourHUD_T");
      }
      if (s) {
        return;
      }
    } else if (e) {
      if (!this.oJm) {
        if (Info_1.Info.IsInTouch()) {
          this.oJm = new MotorcycleControlMobilePanel_1.MotorcycleControlMobilePanel();
        } else {
          this.oJm = new MotorcycleControlPanel_1.MotorcycleControlPanel();
        }
        this.oJm.Init(this.GetRootItem(), "UiItem_MotorcycleControl");
      }
      if (!this.nJm) {
        this.nJm = new MotorcycleControlTopPanel_1.MotorcycleControlTopPanel();
        this.nJm.Init(this.GetRootItem(), "UiItem_MotorcycleControlTop");
      }
      if (!this.lkf) {
        this.lkf = new MotorcycleControlHudPanel_1.MotorcycleControlHudPanel();
        t = UiLayer_1.UiLayer.GetBattleViewUnit(1);
        this.lkf.Init(t, "UiItem_MotoParkourHUD_T");
      }
      return;
    }
    if (e) {
      if (this.oJm && !this.oJm.IsCreateOrCreating) {
        this.oJm.ShowBattleVisibleChildView();
      }
      if (this.nJm && !this.nJm.IsCreateOrCreating) {
        this.nJm.ShowBattleVisibleChildView();
      }
      if (this.lkf && !this.lkf.IsCreateOrCreating) {
        this.lkf.ShowBattleVisibleChildView();
      }
    } else {
      if (this.oJm) {
        if (i) {
          this.oJm.HideBattleVisibleChildView();
        } else {
          this.oJm.Destroy();
          this.oJm = undefined;
        }
      }
      if (this.nJm) {
        if (i) {
          this.nJm.HideBattleVisibleChildView();
        } else {
          this.nJm.Destroy();
          this.nJm = undefined;
        }
      }
      if (this.lkf) {
        if (i) {
          this.lkf.HideBattleVisibleChildView();
        } else {
          this.lkf.Destroy();
          this.lkf = undefined;
        }
      }
    }
  }
}
(exports.CenterPanel = CenterPanel).JJe = Stats_1.Stat.Create("[BattleView]CenterPanelTick1");
CenterPanel.zJe = Stats_1.Stat.Create("[BattleView]CenterPanelTick2");
CenterPanel.$Je = Stats_1.Stat.Create("[BattleView]CenterPanelTick5");
CenterPanel.ZJe = Stats_1.Stat.Create("[BattleView]CenterPanelTick6");
CenterPanel.YJe = Stats_1.Stat.Create("[BattleView]CenterPanelTick9");
CenterPanel.H6m = Stats_1.Stat.Create("[BattleView]CenterPanelTick7"); //# sourceMappingURL=CenterPanel.js.map