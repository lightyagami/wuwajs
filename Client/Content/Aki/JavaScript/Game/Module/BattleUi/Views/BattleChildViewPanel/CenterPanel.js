"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CenterPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const AlterMarksView_1 = require("../AlterMarksView");
const ExecutionPanel_1 = require("../Execution/ExecutionPanel");
const GrapplingHookPoint_1 = require("../GrapplingHookPoint/GrapplingHookPoint");
const Joystick_1 = require("../Joystick");
const JoystickStatic_1 = require("../JoystickStatic");
const ScanTrackedMarksView_1 = require("../ScanTrackedMarksView");
const TrackedMarksView_1 = require("../TrackedMarksView");
const BattleChildViewPanel_1 = require("./BattleChildViewPanel");
const MoveCursorPanel_1 = require("./MoveCursorPanel");
const MoveSkillPanel_1 = require("./MoveSkillPanel");
const GRAPPING_HOOK_SKILL_ID = 100020;
const HOOK_PHANTOM_ID = 1001;
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
    this.DJe = undefined;
    this.RJe = false;
    this.UJe = undefined;
    this.X9e = undefined;
    this.AJe = undefined;
    this.PJe = (t, e) => {
      var i = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
      if (i && i === HOOK_PHANTOM_ID) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "[HookPoint]角色发现钩锁点", ["Found", t], ["IsUsingHook", this.RJe]);
        }
        if (!this.RJe) {
          if (t) {
            if (!this.DJe || !this.DJe.GetIsInterrupting()) {
              this.xJe(e);
            }
          } else {
            this.wJe();
          }
        }
      }
    };
    this.BJe = (t, e, i) => {
      var s = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (s?.Valid && t === s.Id && e === GRAPPING_HOOK_SKILL_ID) {
        this.RJe = true;
      }
    };
    this.bJe = (t, e) => {
      if (!!this.X9e?.Valid && t === this.X9e.Id && e === GRAPPING_HOOK_SKILL_ID && !(this.RJe = false, this.DJe?.GetIsInterrupting()) && !this.qJe()) {
        this.wJe();
      }
    };
    this.GJe = (t, e) => {
      var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (i?.Valid && t === i.Id && e === GRAPPING_HOOK_SKILL_ID) {
        this.DJe?.Interrupt();
      }
    };
    this.NJe = () => {
      if (this.X9e?.Valid) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Test", 17, "[HookPoint]定点钩锁被打断后尝试激活定点钩锁Ui");
        }
        if (!this.qJe()) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Test", 17, "[HookPoint]定点钩锁被打断后找不到定点钩锁点");
          }
          this.wJe();
        }
      }
    };
    this.OJe = () => {
      if (!this.qJe()) {
        this.wJe();
      }
    };
    this.kJe = () => {
      var t = this.ChildViewData.GetChildVisible(17);
      this.GetItem(0).SetUIActive(t);
      this.SJe?.OnBattleHudVisibleChanged(t);
    };
    this.FJe = t => {
      this.GetItem(2).SetUIActive(t);
      this.GetItem(2).SetRaycastTarget(t);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("BattleUiSet", 37, "轮盘界面显隐，设置CenterPanel遮罩", ["bVisible", t]);
      }
    };
    this.VJe = (t, e) => {
      if (t) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "进入处决范围");
        }
        if (!this.UJe) {
          this.UJe = new ExecutionPanel_1.ExecutionPanel();
          this.UJe.Init(this.RootItem);
        }
        this.UJe.ShowByEntity(e);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "离开处决范围");
        }
        this.UJe?.HideByEntity(e);
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
      this.AJe = this.X9e.Entity.GetComponent(100);
      this.jJe();
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
    if (this.X9e?.Valid) {
      this.AJe = this.X9e.Entity.GetComponent(100);
    }
  }
  async InitializeAsync() {
    await Promise.all([this.WJe(), this.KJe(), this.QJe(), this.XJe()]);
    this.GetItem(2).SetUIActive(false);
    this.qJe();
  }
  OnShowBattleChildViewPanel() {
    this.TJe?.ShowBattleVisibleChildView();
    this.MJe?.OnShowBattleChildViewPanel();
  }
  OnHideBattleChildViewPanel() {
    this.TJe?.HideBattleVisibleChildView();
    this.MJe?.OnHideBattleChildViewPanel();
  }
  SetEventVisible(t) {}
  Reset() {
    this.MJe = undefined;
    this.SJe = undefined;
    this.TJe = undefined;
    this.DJe?.Destroy();
    this.DJe = undefined;
    this.UJe?.Destroy();
    this.UJe = undefined;
    this.yJe.length = 0;
    super.Reset();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.fHe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleFindFixHook, this.PJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.BJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillEnd, this.bJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharInterruptSkill, this.GJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.OJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRouletteViewVisibleChanged, this.FJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterOrExitExecutionRange, this.VJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GmOnlyShowJoyStick, this.HJe);
    this.ChildViewData.AddCallback(17, this.kJe);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.fHe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleFindFixHook, this.PJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUseSkill, this.BJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillEnd, this.bJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharInterruptSkill, this.GJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.OJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRouletteViewVisibleChanged, this.FJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterOrExitExecutionRange, this.VJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GmOnlyShowJoyStick, this.HJe);
    this.ChildViewData.RemoveCallback(17, this.kJe);
  }
  OnTickBattleChildViewPanel(t) {
    CenterPanel.$Je.Start();
    this.TJe?.Tick(t);
    this.LJe?.Tick(t);
    CenterPanel.$Je.Stop();
    CenterPanel.YJe.Start();
    this.SJe.Update(t);
    this.uTl();
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
  }
  xJe(t) {
    if (this.DJe) {
      this.DJe.Destroy();
      this.DJe = undefined;
    }
    var e = UiLayer_1.UiLayer.GetBattleViewUnit(1);
    this.DJe = new GrapplingHookPoint_1.GrapplingHookPoint(t, e);
    this.DJe.BindOnInterruptCompleted(this.NJe);
  }
  uTl() {
    var t = this.AJe?.GetNextTarget();
    if (t?.Valid && t.IsMovable() && this.DJe) {
      this.DJe.UpdateHookPointLocation(t.HookLocation.ToUeVector());
    }
  }
  qJe() {
    var t;
    return !!this.AJe?.Valid && !!this.tze() && !!this.ize(this.AJe) && !(t = this.AJe.GetNextTargetVector(), this.xJe(t), 0);
  }
  GetExecutionItem() {
    return this.UJe?.GetExecutionItem();
  }
  ize(t) {
    var e = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
    return !!e && e === HOOK_PHANTOM_ID && !!t.Valid && !!(e = t.GetNextTarget()) && (!e || !!t.CanActivateFixHook()) && !!t.GetNextTargetVector();
  }
  wJe() {
    if (this.DJe && this.DJe.GetIsActivateHook()) {
      this.DJe.Destroy();
      this.DJe = undefined;
    }
  }
  tze() {
    var t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
    return !!t && t === HOOK_PHANTOM_ID;
  }
  eze() {
    if (this.DJe && this.AJe?.Valid) {
      if (this.tze() && this.ize(this.AJe)) {
        this.DJe?.AfterTick();
      } else {
        this.wJe();
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
  async XJe() {
    var t;
    if (this.GetOperationType() === 1) {
      t = this.GetItem(3);
      this.TJe = await this.NewStaticChildViewAsync(t.GetOwner(), Joystick_1.Joystick, this.RootItem);
    }
    this.jJe();
  }
  jJe() {
    if (this.TJe) {
      this.ClearAllTagSignificantChangedCallback();
      this.ListenForTagSignificantChanged(this.X9e, forbidMoveTagId, (t, e) => {
        this.TJe.SetForbidMove(e);
      });
      this.TJe.SetForbidMove(this.ContainsTag(this.X9e, forbidMoveTagId));
    }
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    let e = 0;
    if (t?.RoleBattleViewInfo) {
      e = t.RoleBattleViewInfo.JoystickType;
    }
    if (this.IJe !== e && (this.IJe = e, this.TJe?.SetVisible(3, e === 0), this.TJe?.SetEnable(e === 0), this.LJe && (this.LJe.Destroy(), this.LJe = undefined), e === 1 && ((t = new MoveSkillPanel_1.MoveSkillPanel()).CreateDynamic(this.GetRootItem()), this.LJe = t), e === 3)) {
      if (this.GetOperationType() === 1) {
        this.NewDynamicChildViewByResourceIdWithCallback(this.RootItem, "PnlLevelJoystick", JoystickStatic_1.JoystickStatic, true, t => {
          (this.LJe = t).SetVisible(3, true);
          t.SetEnable(true);
          t.ShowBattleVisibleChildView();
        }, this.RootItem);
      } else {
        (t = new MoveCursorPanel_1.MoveCursorPanel()).CreateDynamic(this.GetRootItem());
        this.LJe = t;
      }
    }
  }
}
(exports.CenterPanel = CenterPanel).JJe = Stats_1.Stat.Create("[BattleView]CenterPanelTick1");
CenterPanel.zJe = Stats_1.Stat.Create("[BattleView]CenterPanelTick2");
CenterPanel.$Je = Stats_1.Stat.Create("[BattleView]CenterPanelTick5");
CenterPanel.ZJe = Stats_1.Stat.Create("[BattleView]CenterPanelTick6");
CenterPanel.YJe = Stats_1.Stat.Create("[BattleView]CenterPanelTick9"); //# sourceMappingURL=CenterPanel.js.map