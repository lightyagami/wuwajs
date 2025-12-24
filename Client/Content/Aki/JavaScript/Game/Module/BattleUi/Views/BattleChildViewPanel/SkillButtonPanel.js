"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillButtonPanel = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const BattleSkillExploreItem_1 = require("../BattleSkillExploreItem");
const BattleSkillItem_1 = require("../BattleSkillItem");
const BehaviorButton_1 = require("../BehaviorButton");
const BattleChildViewPanel_1 = require("./BattleChildViewPanel");
const INIT_OFFSET_X = -86;
const ITEM_WIDTH = 144;
const MOBILE_INDEX_EXPLORE_ITEM = 3;
const actionNameList = [InputMappingsDefine_1.actionMappings.攻击, InputMappingsDefine_1.actionMappings.大招, InputMappingsDefine_1.actionMappings.幻象1, InputMappingsDefine_1.actionMappings.幻象2, InputMappingsDefine_1.actionMappings.技能1, InputMappingsDefine_1.actionMappings.闪避, InputMappingsDefine_1.actionMappings.瞄准, InputMappingsDefine_1.actionMappings.锁定目标, InputMappingsDefine_1.actionMappings.载具漂移, InputMappingsDefine_1.actionMappings.载具子弹跳, InputMappingsDefine_1.actionMappings.载具退场技和下车, InputMappingsDefine_1.actionMappings.载具探索工具, InputMappingsDefine_1.actionMappings.载具氮气, InputMappingsDefine_1.actionMappings.载具空中抬升, InputMappingsDefine_1.actionMappings.载具子弹跳1, InputMappingsDefine_1.actionMappings.载具视角切换, InputMappingsDefine_1.actionMappings.载具锁定目标];
const SECOND_LAYOUT_START_COUNT = 6;
class SkillButtonPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.lZe = [];
    this.Tet = new Map();
    this.Let = Stats_1.Stat.Create("[SkillButton]RefreshAllBattleSkillItem");
    this.Pnm = Stats_1.Stat.Create("[SkillButton]RefreshSkillItemLayoutStat");
    this.Det = undefined;
    this.$Qe = false;
    this.Anm = [];
    this.DXe = (0, puerts_1.$ref)(0);
    this.RXe = (0, puerts_1.$ref)(0);
    this.Dnm = 1.77778;
    this.Cam = 1.33333;
    this.Unm = undefined;
    this.Ret = t => {
      if (t) {
        for (const e of this.lZe) {
          e.RefreshEnable(true);
        }
      }
    };
    this.RQe = (t, e) => {
      if (t === 10031) {
        this.Uet(102)?.SetActive(e);
      }
    };
    this.uZe = t => {
      if (t !== 4 && t !== 3) {
        this.cZe();
        this.wet();
        this.Aet();
        this.Bnm();
      }
    };
    this.mZe = () => {
      this.dZe();
    };
    this.CZe = () => {
      if (!Info_1.Info.IsInTouch() || !ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsDriving) {
        this.cZe();
        this.Aet();
        this.Bnm();
      }
    };
    this.gZe = (t, e) => {
      t = this.GetBattleSkillItemByButtonType(t);
      if (t && t.GetSkillButtonData()) {
        t.RefreshEnable();
      }
    };
    this.pZe = t => {
      t = this.GetBattleSkillItemByButtonType(t);
      if (t && t.GetSkillButtonData()) {
        t.RefreshVisible();
        t.RefreshKey();
        if (!Info_1.Info.IsInTouch()) {
          this.Aet();
          this.Bnm();
        }
      }
    };
    this.vZe = t => {
      t = this.GetBattleSkillItemByButtonType(t);
      if (t && t.GetSkillButtonData()) {
        t.RefreshDynamicEffect();
      }
    };
    this.EZe = t => {
      var e = ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(t);
      if (e && (t = this.GetBattleSkillItemByButtonType(t))) {
        if (e.GetSkillId()) {
          t.Refresh(e);
        } else {
          t.Deactivate();
        }
        if (!Info_1.Info.IsInTouch()) {
          this.Aet();
        }
      }
    };
    this.yZe = t => {
      t = this.GetBattleSkillItemByButtonType(t);
      if (t) {
        t.RefreshAttribute(true);
      }
    };
    this.IZe = t => {
      t = this.GetBattleSkillItemByButtonType(t);
      if (t) {
        t.RefreshSkillIcon();
        t.RefreshSkillName();
      }
    };
    this.TZe = t => {
      t = this.GetBattleSkillItemByButtonType(t);
      if (t) {
        t.RefreshSkillCoolDown();
      }
    };
    this.lvl = t => {
      t = this.GetBattleSkillItemByButtonType(t);
      if (t) {
        t.RefreshSkillButtonLongPress();
        t.RefreshConfigLongPress();
      }
    };
    this.$Xd = t => {
      t = this.GetBattleSkillItemByButtonType(t);
      if (t) {
        t.RefreshExtraEffect();
      }
    };
    this.uWm = t => {
      t = this.Uet(t);
      if (t) {
        t.RefreshEnable(false);
      }
    };
    this.DZe = t => {
      t = this.Uet(t);
      if (t) {
        t.RefreshVisible();
      }
    };
    this.cWm = t => {
      t = this.Uet(t);
      if (t) {
        t.RefreshAll();
      }
    };
    this.dWm = t => {
      t = this.Uet(t);
      if (t) {
        t.RefreshSkillIcon();
      }
    };
    this.mWm = t => {
      t = this.Uet(t);
      if (t) {
        t.RefreshDynamicEffect();
      }
    };
    this.LZe = t => {
      for (const e of this.lZe) {
        e.PauseGame(t);
      }
    };
    this.zze = () => {
      for (const t of this.lZe) {
        t.RefreshTimeDilation();
      }
    };
    this.XBo = () => {
      if (Info_1.Info.IsInGamepad()) {
        this.SetVisible(5, false);
      } else {
        this.SetVisible(5, true);
        this.cZe();
        this.Aet();
        this.Bnm();
      }
    };
    this.bet = t => {
      if (ModelManager_1.ModelManager.SkillButtonUiModel.CurSkillButtonIndexData.IsNormalButtonTypeList && !ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()?.IsPhantom() && this.$Qe !== t) {
        this.qet(t, true);
      }
    };
    this.xQe = () => {
      this.xnm();
      this.Bnm();
    };
    this.knm = () => {
      this.qnm();
    };
    this.Onm = () => {
      this.Unm = undefined;
      this.Bnm();
    };
    this.bMe = (t, e) => {
      if (e === 0) {
        if (t === InputMappingsDefine_1.actionMappings.瞄准 || t === InputMappingsDefine_1.actionMappings.载具视角切换) {
          if ((e = this.Tet.get(101))?.GetActionName() === t) {
            e.OnInputAction();
          }
        } else if (t === InputMappingsDefine_1.actionMappings.锁定目标 || t === InputMappingsDefine_1.actionMappings.载具锁定目标) {
          if ((e = this.Tet.get(102))?.GetActionName() === t) {
            e.OnInputAction();
          }
        } else {
          for (const s of this.lZe) {
            var i = s.GetSkillButtonData();
            if (i && i.GetActionName() === t) {
              s.OnInputAction();
              return;
            }
          }
        }
      }
    };
    this.zAf = () => {
      this.RefreshKeyItemEnableInMotorcycle();
    };
    this.sJm = () => {
      if (!Info_1.Info.IsInTouch() && !ModelManager_1.ModelManager.BattleUiModel.MotorcycleData?.IsDriving) {
        for (const t of this.lZe) {
          t.GetKeyItem()?.SetEnable(true);
        }
        for (const e of this.Tet.values()) {
          e.GetKeyItem()?.SetEnable(true);
        }
      }
    };
  }
  OnRegisterComponent() {
    switch (this.GetOperationType()) {
      case 2:
      case 1:
        this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem]];
    }
  }
  async InitializeAsync() {
    await Promise.all([this.NewAllBattleSkillItems(), this.Oet()]);
    this.SetVisible(5, !Info_1.Info.IsInGamepad());
    this.cZe();
    this.wet();
    this.Aet();
    var t = CommonParamById_1.configCommonParamById.GetFloatConfig("SkillButtonLayoutAspectRatio");
    if (t) {
      this.Cam = t;
    }
    this.xnm();
    this.Bnm();
  }
  Reset() {
    this.lZe.length = 0;
    super.Reset();
    this.Det = undefined;
    this.Gnm();
  }
  OnAfterShow() {
    for (const t of this.lZe) {
      t.RefreshEnable(true);
    }
    for (const e of this.Tet.values()) {
      e.UpdateAlpha();
    }
  }
  OnHideBattleChildViewPanel() {
    for (const t of this.lZe) {
      if (t.IsShowOrShowing) {
        t.TryReleaseButton();
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonPanelVisibleChange);
  }
  OnShowBattleChildViewPanel() {
    for (const t of this.lZe) {
      t.RefreshSkillCoolDownOnShow();
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonPanelVisibleChange);
  }
  OnTickBattleChildViewPanel(t) {
    if (this.Visible) {
      for (const e of this.lZe) {
        e.Tick(t);
      }
    }
  }
  cZe() {
    if (!Info_1.Info.IsInGamepad()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "SkillButtonPanel RefreshAllBattleSkillItems");
      }
      this.Let.Start();
      var e = ModelManager_1.ModelManager.SkillButtonUiModel;
      var i = e.GetButtonTypeList();
      for (let t = 0; t < this.lZe.length; t++) {
        var s = i[t];
        var n = this.lZe[t];
        var h = e.GetSkillButtonDataByButton(s);
        if (h) {
          if (s && !(s < 0) && h.GetSkillId()) {
            n.Refresh(h);
          } else {
            n.Deactivate();
          }
        } else {
          n.Deactivate();
        }
      }
      this.Let.Stop();
    }
  }
  dZe() {
    for (const t of this.lZe) {
      t.Deactivate();
    }
  }
  async NewAllBattleSkillItems() {
    let t = undefined;
    var e;
    var i;
    var s = this.GetOperationType();
    if (s === 2) {
      t = [this.GetItem(0).GetOwner(), this.GetItem(1).GetOwner(), this.GetItem(2).GetOwner(), this.GetItem(3).GetOwner(), this.GetItem(4).GetOwner(), this.GetItem(5).GetOwner(), this.GetItem(8).GetOwner()];
      e = this.GetItem(9);
      i = this.GetItem(10);
      this.Anm.push({
        Item: e,
        Index: 0
      });
      this.Anm.push({
        Item: i,
        Index: 1
      });
      this.GetItem(8).GetParentAsUIItem()?.SetUIParent(e);
    } else if (s === 1) {
      t = [this.GetItem(0).GetOwner(), this.GetItem(1).GetOwner(), this.GetItem(2).GetOwner(), this.GetItem(3).GetOwner(), this.GetItem(4).GetOwner(), this.GetItem(5).GetOwner(), this.GetItem(6).GetOwner(), this.GetItem(9).GetOwner(), this.GetItem(10).GetOwner()];
    }
    const n = s === 1;
    await Promise.all(t.map(async (t, e) => this.FZe(t, e, n)));
  }
  async FZe(t, e, i) {
    let s = undefined;
    s = i && e === MOBILE_INDEX_EXPLORE_ITEM ? await this.NewStaticChildViewAsync(t, BattleSkillExploreItem_1.BattleSkillExploreItem, e) : await this.NewStaticChildViewAsync(t, BattleSkillItem_1.BattleSkillItem, e);
    if (!i) {
      s?.SetOnVisibleChangedCallback(this.knm);
    }
    this.lZe.push(s);
    return s;
  }
  VZe(t) {
    return this.lZe[t];
  }
  GetBattleSkillItemByButtonType(t) {
    t = ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonIndexByButton(t);
    if (!(t < 0)) {
      return this.VZe(t);
    }
  }
  async Oet() {
    var t;
    var e;
    var i = this.GetOperationType();
    if (i === 2) {
      t = this.GetItem(6);
      e = this.GetItem(7);
      await Promise.all([this.ket(t.GetOwner(), 101, true), this.ket(e.GetOwner(), 102)]);
    } else if (i === 1) {
      t = this.GetItem(8);
      e = this.GetItem(7);
      await Promise.all([this.ket(t.GetOwner(), 101, true), this.ket(e.GetOwner(), 102)]);
    }
  }
  async ket(t, e, i = false) {
    i = {
      InputActionType: e,
      IsToggle: i
    };
    t = await this.NewStaticChildViewAsync(t, BehaviorButton_1.BehaviorButton, i);
    this.Tet.set(e, t);
    if (this.GetOperationType() === 2) {
      t?.SetOnVisibleChangedCallback(this.knm);
    }
    return t;
  }
  wet() {
    var t = ModelManager_1.ModelManager.SkillButtonUiModel;
    for (const i of this.Tet.values()) {
      var e = t.GetBehaviorButtonDataByButton(i.BehaviorType);
      i.Refresh(e);
    }
  }
  Uet(t) {
    return this.Tet.get(t);
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUiScreenRootVisibleChange, this.Ret);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonDataRefresh, this.uZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonDataClear, this.mZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonIndexRefresh, this.CZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonEnableRefresh, this.gZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonVisibleRefresh, this.pZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonDynamicEffectRefresh, this.vZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh, this.EZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonAttributeRefresh, this.yZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonIconPathRefresh, this.IZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonCdRefresh, this.TZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonLongPressRefresh, this.lvl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonExtraEffectRefresh, this.$Xd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBehaviorButtonEnableRefresh, this.uWm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBehaviorButtonVisibleRefresh, this.DZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBehaviorButtonSkillIdRefresh, this.cWm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBehaviorButtonIconPathRefresh, this.dWm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBehaviorButtonDynamicEffectRefresh, this.mWm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PauseGame, this.LZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TriggerUiTimeDilation, this.zze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharSkillCdPauseStateChanged, this.zze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenSet, this.RQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiExploreModeChanged, this.bet);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.sJm);
    if (this.GetOperationType() === 2) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiPressMotorcycleCombineButtonChanged, this.zAf);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UIViewPortSizeChanged, this.xQe);
      InputDistributeController_1.InputDistributeController.BindActions(actionNameList, this.bMe);
    }
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUiScreenRootVisibleChange, this.Ret);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonDataRefresh, this.uZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonDataClear, this.mZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonIndexRefresh, this.CZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonEnableRefresh, this.gZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonVisibleRefresh, this.pZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonDynamicEffectRefresh, this.vZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh, this.EZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonAttributeRefresh, this.yZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonIconPathRefresh, this.IZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonCdRefresh, this.TZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonLongPressRefresh, this.lvl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonExtraEffectRefresh, this.$Xd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBehaviorButtonEnableRefresh, this.uWm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBehaviorButtonVisibleRefresh, this.DZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBehaviorButtonSkillIdRefresh, this.cWm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBehaviorButtonIconPathRefresh, this.dWm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBehaviorButtonDynamicEffectRefresh, this.mWm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PauseGame, this.LZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TriggerUiTimeDilation, this.zze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharSkillCdPauseStateChanged, this.zze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, this.RQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiExploreModeChanged, this.bet);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.sJm);
    if (this.GetOperationType() === 2) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiPressMotorcycleCombineButtonChanged, this.zAf);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UIViewPortSizeChanged, this.xQe);
      InputDistributeController_1.InputDistributeController.UnBindActions(actionNameList, this.bMe);
    }
  }
  Aet() {
    var t = ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.GetIsInExploreMode();
    if (ModelManager_1.ModelManager.SkillButtonUiModel.CurSkillButtonIndexData.IsNormalButtonTypeList || ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()?.IsPhantom()) {
      if (this.$Qe === t && Info_1.Info.IsInTouch()) {
        return undefined;
      } else {
        this.qet(t);
        return;
      }
    }
    if (this.$Qe) {
      this.qet(false);
    }
  }
  qet(t, e = false) {
    var i = !(this.$Qe = t);
    this.Tet.get(101)?.SetVisibleByExploreMode(i, e);
    this.Tet.get(102)?.SetVisibleByExploreMode(i, e);
    this.lZe[1]?.SetVisibleByExploreMode(i, e);
    this.lZe[2]?.SetVisibleByExploreMode(i, e);
    if (Info_1.Info.IsInTouch()) {
      this.lZe[4]?.SetVisibleByExploreMode(i, e);
    } else {
      this.lZe[3]?.SetVisibleByExploreMode(i, e);
      this.Fet(t, e);
    }
  }
  Fet(t, e = false) {
    let i = INIT_OFFSET_X;
    if (t) {
      let e = 0;
      for (let t = 1; t < 4; t++) {
        if (this.lZe[t].IsShowOrShowing) {
          e++;
        }
      }
      i += e * ITEM_WIDTH;
    }
    if (e) {
      if (this.Det) {
        this.Det.Stop();
      } else {
        this.Det = this.RootActor.GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
      }
      (t = this.Det.GetPlayTween()).from = this.RootItem.GetAnchorOffsetX();
      t.to = i;
      this.Det.Play();
    } else {
      if (this.Det) {
        this.Det.Stop();
      }
      this.RootItem?.SetAnchorOffsetX(i);
    }
  }
  xnm() {
    Global_1.Global.CharacterController.GetViewportSize(this.DXe, this.RXe);
    var t = (0, puerts_1.$unref)(this.DXe);
    var e = (0, puerts_1.$unref)(this.RXe);
    if (e !== 0) {
      this.Dnm = t / e;
    }
  }
  Bnm() {
    if (Info_1.Info.IsInKeyBoard() && this.Anm.length !== 0) {
      this.Pnm.Start();
      var t = this.Tet.get(101);
      var i = this.Tet.get(102);
      var s = t?.IsVisible() && i?.IsVisible();
      let e = 0;
      for (let t = this.lZe.length - 1; t >= 0; t--) {
        var n = this.lZe[t];
        if (n.IsVisible()) {
          e += 1;
        }
        if (e < SECOND_LAYOUT_START_COUNT) {
          n.SetSkillItemLayout(this.Anm[0]);
        } else if (e === SECOND_LAYOUT_START_COUNT) {
          if (this.Dnm <= this.Cam || s) {
            n.SetSkillItemLayout(this.Anm[1]);
          } else {
            n.SetSkillItemLayout(this.Anm[0]);
          }
        } else if (e > SECOND_LAYOUT_START_COUNT) {
          n.SetSkillItemLayout(this.Anm[1]);
        }
      }
      this.Gnm();
      this.Pnm.Stop();
    }
  }
  qnm() {
    this.Unm ||= TimerSystem_1.TimerSystem.Next(this.Onm);
  }
  Gnm() {
    if (this.Unm) {
      if (TimerSystem_1.TimerSystem.Has(this.Unm)) {
        TimerSystem_1.TimerSystem.Remove(this.Unm);
      }
      this.Unm = undefined;
    }
  }
  RefreshKeyItemEnableInMotorcycle() {
    if (Info_1.Info.IsInGamepad()) {
      var t = ModelManager_1.ModelManager.BattleUiModel.MotorcycleData;
      if (t?.IsDriving) {
        if (ModelManager_1.ModelManager.SkillButtonUiModel.GetGamepadDataByType(1)?.GetIsPressCombineButton()) {
          for (const e of this.lZe) {
            if (e.IsVisible()) {
              e.GetKeyItem()?.SetDisableBySingleKeyList(["LeftMouseButton", "RightMouseButton", "MiddleMouseButton"]);
            }
          }
          for (const i of this.Tet.values()) {
            if (i.IsVisible()) {
              i.GetKeyItem()?.SetDisableBySingleKeyList(["LeftMouseButton", "RightMouseButton", "MiddleMouseButton"]);
            }
          }
        } else {
          for (const s of this.lZe) {
            s.GetKeyItem()?.SetEnable(true);
          }
          for (const n of this.Tet.values()) {
            n.GetKeyItem()?.SetEnable(true);
          }
        }
      }
    }
  }
}
exports.SkillButtonPanel = SkillButtonPanel;
//# sourceMappingURL=SkillButtonPanel.js.map