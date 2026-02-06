"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamepadSkillButtonPanel = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const InputEnums_1 = require("../../../../Input/InputEnums");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const BattleSkillCombineItem_1 = require("../BattleSkillCombineItem");
const BattleSkillDpadItem_1 = require("../BattleSkillDpadItem");
const BattleSkillGamepadItem_1 = require("../BattleSkillGamepadItem");
const BattleSkillRouletteItem_1 = require("../BattleSkillRouletteItem");
const BattleUiTweenAnimPlayer_1 = require("../BattleUiTweenAnimPlayer");
const BattleChildViewPanel_1 = require("./BattleChildViewPanel");
const MAIN_KEY_NUM = 8;
const MAIN_HALF_NUM = 4;
const LEFT_KEY_NUM = 4;
const SUB_KEY_NUM = 4;
const LEFT_KEY_START_INDEX = MAIN_KEY_NUM;
const SUB_KEY_START_INDEX = MAIN_KEY_NUM + LEFT_KEY_NUM;
const SUB_KEY_END_INDEX = SUB_KEY_START_INDEX + SUB_KEY_NUM;
class GamepadSkillButtonPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.Let = Stats_1.Stat.Create("[GamepadSkillButton]RefreshAllBattleSkillItem");
    this.nza = Stats_1.Stat.Create("[GamepadSkillButton]OnInputCombineButton");
    this.hZe = undefined;
    this.NWa = undefined;
    this.lZe = [];
    this.Mah = undefined;
    this.Eah = undefined;
    this.VWa = undefined;
    this.HWa = false;
    this._Ze = undefined;
    this.qug = new Map();
    this.uZe = t => {
      this.cZe();
    };
    this.mZe = () => {
      this.dZe();
    };
    this.CZe = () => {
      if (this._Ze.RefreshButtonData()) {
        this.cZe();
      }
    };
    this.gZe = (t, e) => {
      var i;
      if (this.Visible && ((i = this.fZe(t))?.GetSkillButtonData() && i.RefreshEnable(), (i = this.Iah(t))?.GetSkillButtonData())) {
        i.RefreshEnable();
      }
    };
    this.pZe = t => {
      var e = this.fZe(t);
      if (e) {
        e.RefreshVisible();
        e.RefreshKey();
        if ((e = this.Iah(t))?.GetSkillButtonData()) {
          e.RefreshVisible();
          e.RefreshKey();
        }
      } else {
        this._Ze.RefreshButtonData();
        this.cZe();
      }
    };
    this.vZe = t => {
      var e = this.fZe(t);
      if (e?.GetSkillButtonData()) {
        e.RefreshDynamicEffect();
      }
      var e = this.Iah(t);
      if (e?.GetSkillButtonData()) {
        e.RefreshDynamicEffect();
      }
    };
    this.g5g = (t, e = -1) => {
      var i = this.fZe(t);
      if (i?.GetSkillButtonData()) {
        i.RefreshCustomHdData(e);
      }
      var i = this.Iah(t);
      if (i?.GetSkillButtonData()) {
        i.RefreshCustomHdData(e);
      }
    };
    this.EZe = t => {
      var e;
      var i = ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(t);
      if (i) {
        if (e = this.fZe(t)) {
          e.Refresh(i);
        }
        if ((e = this.Iah(t))?.SrcBehaviorButtonData) {
          e.RefreshByBehaviorButtonData(e.SrcBehaviorButtonData);
        } else if (e?.BehaviorButtonData) {
          e.RefreshByBehaviorButtonData(e.BehaviorButtonData);
        }
      }
    };
    this.yZe = t => {
      var e = this.fZe(t);
      if (e) {
        e.RefreshAttribute(true);
      }
      var e = this.Iah(t);
      if (e?.GetSkillButtonData()) {
        e.RefreshAttribute(true);
      }
    };
    this.IZe = t => {
      var e = this.fZe(t);
      if (e) {
        e.RefreshSkillIcon();
        e.RefreshSkillName();
      }
      var e = this.Iah(t);
      if (e?.GetSkillButtonData()) {
        e.RefreshSkillIcon();
        e.RefreshSkillName();
      }
    };
    this.TZe = t => {
      var e = this.fZe(t);
      if (e) {
        e.RefreshSkillCoolDown();
      }
      var e = this.Iah(t);
      if (e?.GetSkillButtonData()) {
        e.RefreshSkillCoolDown();
      }
    };
    this.LZe = t => {
      for (const e of this.lZe) {
        e.PauseGame(t);
      }
    };
    this.nKm = t => {
      this.fZe(t)?.RefreshEnable();
    };
    this.DZe = t => {
      this.fZe(t)?.RefreshVisible();
    };
    this.sKm = t => {
      t = this.fZe(t);
      if (t?.BehaviorButtonData) {
        t.RefreshByBehaviorButtonData(t.BehaviorButtonData);
      }
    };
    this.aKm = t => {
      this.fZe(t)?.RefreshSkillIcon();
    };
    this.hKm = t => {
      this.fZe(t)?.RefreshDynamicEffect();
    };
    this.zze = () => {
      for (const t of this.lZe) {
        t.RefreshTimeDilation();
      }
    };
    this.XBo = () => {
      if (Info_1.Info.IsInGamepad()) {
        this.SetVisible(5, true);
        this.cZe();
      } else {
        this.SetVisible(5, false);
        this._Ze?.ClearInputAxis();
      }
    };
    this.RZe = t => {
      this.nza.Start();
      this.cZe();
      this.UZe();
      this.AZe(t);
      this.Tah();
      this.nza.Stop();
    };
    this.PNf = t => {
      this.nza.Start();
      this.cZe();
      this.UZe();
      this.AZe(t);
      this.Tah();
      this.RefreshDpadKeyItemEnable();
      this.nza.Stop();
    };
    this.HKa = () => {
      this.jKa();
    };
    this.Lah = () => {
      var t;
      var e = this._Ze.SwitchInteractData.State;
      if (e === 2) {
        if ((t = this.fZe(104)) && t.BehaviorButtonData) {
          t.RefreshByBehaviorButtonData(t.BehaviorButtonData);
        }
        this.Xlh();
      } else if (e === 0) {
        if ((t = this.fZe(104)) && t.SrcBehaviorButtonData) {
          t.RefreshByBehaviorButtonData(t.SrcBehaviorButtonData);
        }
        this.Xlh();
      } else if (e === 1) {
        this.fZe(104)?.PlaySwitchCd();
      }
    };
    this.Ahf = () => {
      InputDistributeController_1.InputDistributeController.UnBindActions(this._Ze.GetAllActionNameList(), this.bMe);
      InputDistributeController_1.InputDistributeController.UnBindAxes(this._Ze.GetAllAxisNameList(), this.ABo);
      if (this._Ze.GamepadDataType === 1) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiPressMotorcycleCombineButtonChanged, this.PNf);
      } else {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiPressCombineButtonChanged, this.RZe);
      }
      this._Ze = ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData;
      this.NZe();
      for (const t of this.lZe) {
        t.GamepadData = this._Ze;
      }
      this.RefreshDpadKeyItemEnable();
      this.qug.clear();
      InputDistributeController_1.InputDistributeController.BindActions(this._Ze.GetAllActionNameList(), this.bMe);
      InputDistributeController_1.InputDistributeController.BindAxes(this._Ze.GetAllAxisNameList(), this.ABo);
      if (this._Ze.GamepadDataType === 1) {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiPressMotorcycleCombineButtonChanged, this.PNf);
      } else {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiPressCombineButtonChanged, this.RZe);
      }
    };
    this.bMe = (i, t) => {
      if (t === 0) {
        if (this._Ze.GamepadDataType === 0) {
          if (i !== InputMappingsDefine_1.actionMappings.攻击) {
            let t = undefined;
            let e = false;
            if (i === InputMappingsDefine_1.actionMappings.手柄主攻击) {
              t = 4;
            } else if (i === InputMappingsDefine_1.actionMappings.手柄副攻击) {
              if (!this._Ze.IsAim()) {
                return;
              }
              t = 11;
              e = true;
            } else {
              t = this._Ze.GetButtonTypeByActionName(i);
            }
            this.fZe(t)?.OnInputAction(e);
          }
        } else {
          t = this._Ze.GetButtonTypeByActionName(i);
          if (t) {
            this.fZe(t)?.OnInputAction();
          }
        }
      }
    };
    this.ABo = (t, e) => {
      var i;
      if (e === 0) {
        this.qug.set(t, e);
      } else if ((!((i = this.qug.get(t) ?? 0) > 0) || !(e > 0)) && (!(i < 0) || !(e < 0))) {
        this.qug.set(t, e);
        if (i = this._Ze.GetButtonTypeByAxisName(t, e)) {
          this.fZe(i)?.OnInputAction();
        }
      }
    };
    this.xZe = (t, e) => {
      if (Info_1.Info.IsInGamepad()) {
        this._Ze.CacheInputAxis(InputEnums_1.EInputAxis.MoveForward, e);
      }
    };
    this.BZe = (t, e) => {
      if (Info_1.Info.IsInGamepad()) {
        this._Ze.CacheInputAxis(InputEnums_1.EInputAxis.MoveRight, e);
      }
    };
    this.bZe = t => {
      if (t === "InteractionHintView") {
        this.qZe();
      }
    };
    this.$Ge = t => {
      if (t === "InteractionHintView") {
        this.qZe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem]];
  }
  InitializeTemp() {
    this._Ze = ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData;
  }
  async InitializeAsync() {
    await this.GZe();
    await this.jWa();
    await this.yah();
    await this.NewAllBattleSkillItems();
    this.WWa();
    this.NZe();
    this.cZe();
    this.UZe();
    this.Tah();
    this.qZe();
    this.nit();
    this.jKa();
    this.RefreshDpadKeyItemEnable();
  }
  Reset() {
    this.lZe.length = 0;
    this.Eah?.Clear();
    this.Eah = undefined;
    this.VWa?.Clear();
    this.VWa = undefined;
    this._Ze?.ClearInputAxis();
    super.Reset();
  }
  OnAfterShow() {
    for (const t of this.lZe) {
      t.RefreshEnable(true);
    }
  }
  OnShowBattleChildViewPanel() {
    for (const t of this.lZe) {
      t.RefreshSkillCoolDownOnShow();
    }
  }
  OnTickBattleChildViewPanel(t) {
    if (this.Visible) {
      for (const e of this.lZe) {
        e.Tick(t);
      }
    }
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonDataRefresh, this.uZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonDataClear, this.mZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonIndexRefresh, this.CZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonEnableRefresh, this.gZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonVisibleRefresh, this.pZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonDynamicEffectRefresh, this.vZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonCustomRefresh, this.g5g);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh, this.EZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonAttributeRefresh, this.yZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonIconPathRefresh, this.IZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonCdRefresh, this.TZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBehaviorButtonEnableRefresh, this.nKm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBehaviorButtonVisibleRefresh, this.DZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBehaviorButtonSkillIdRefresh, this.sKm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBehaviorButtonIconPathRefresh, this.aKm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBehaviorButtonDynamicEffectRefresh, this.hKm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PauseGame, this.LZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TriggerUiTimeDilation, this.zze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharSkillCdPauseStateChanged, this.zze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnViewDone, this.bZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiChatScrollViewVisibleChanged, this.HKa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiSwitchInteractStateChanged, this.Lah);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiGamepadDataChanged, this.Ahf);
    if (this._Ze.GamepadDataType === 1) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiPressMotorcycleCombineButtonChanged, this.PNf);
    } else {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiPressCombineButtonChanged, this.RZe);
    }
    InputDistributeController_1.InputDistributeController.BindActions(this._Ze.GetAllActionNameList(), this.bMe);
    InputDistributeController_1.InputDistributeController.BindAxes(this._Ze.GetAllAxisNameList(), this.ABo);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.MoveForward, this.xZe);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.MoveRight, this.BZe);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonDataRefresh, this.uZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonDataClear, this.mZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonIndexRefresh, this.CZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonEnableRefresh, this.gZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonVisibleRefresh, this.pZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonDynamicEffectRefresh, this.vZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonCustomRefresh, this.g5g);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh, this.EZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonAttributeRefresh, this.yZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonIconPathRefresh, this.IZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonCdRefresh, this.TZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBehaviorButtonEnableRefresh, this.nKm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBehaviorButtonVisibleRefresh, this.DZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBehaviorButtonSkillIdRefresh, this.sKm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBehaviorButtonIconPathRefresh, this.aKm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBehaviorButtonDynamicEffectRefresh, this.hKm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PauseGame, this.LZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TriggerUiTimeDilation, this.zze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharSkillCdPauseStateChanged, this.zze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnViewDone, this.bZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiChatScrollViewVisibleChanged, this.HKa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiSwitchInteractStateChanged, this.Lah);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiGamepadDataChanged, this.Ahf);
    InputDistributeController_1.InputDistributeController.UnBindActions(this._Ze.GetAllActionNameList(), this.bMe);
    InputDistributeController_1.InputDistributeController.UnBindAxes(this._Ze.GetAllAxisNameList(), this.ABo);
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.MoveForward, this.xZe);
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.MoveRight, this.BZe);
    if (this._Ze.GamepadDataType === 1) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiPressMotorcycleCombineButtonChanged, this.PNf);
    } else {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiPressCombineButtonChanged, this.RZe);
    }
  }
  NZe() {
    this.SetVisible(5, Info_1.Info.IsInGamepad());
    this._Ze.RefreshInteractBehaviorData();
    this._Ze.RefreshAimState();
  }
  WWa() {
    for (const e of this.lZe) {
      var t;
      if (e.IsSubButton) {
        t = e.GetInputIndex() - MAIN_HALF_NUM;
        e.SetKeyName(this._Ze.ButtonKeyList[t]);
      }
    }
  }
  cZe() {
    if (Info_1.Info.IsInGamepad()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[GamepadSkillButton]RefreshAllBattleSkillItems");
      }
      this.Let.Start();
      this.OZe();
      this.QWa();
      this.kZe();
      this.hZe?.Refresh();
      this.Let.Stop();
    }
  }
  OZe() {
    var e = ModelManager_1.ModelManager.SkillButtonUiModel;
    var i = this._Ze.CurButtonTypeList;
    for (let t = 0; t < SUB_KEY_START_INDEX; t++) {
      var s = i[t];
      var n = this.lZe[t];
      if (s) {
        var h = e.GetSkillButtonDataByButton(s);
        if (!h) {
          s = e.GetBehaviorButtonDataByButton(s);
          if (s?.IsVisible()) {
            n.RefreshByBehaviorButtonData(s);
            continue;
          }
        }
        this.Ylh(n, h);
      } else {
        n.Refresh(undefined);
      }
    }
  }
  Ylh(t, e) {
    if (e && e.GetSkillId() && e.IsVisible()) {
      t.Refresh(e);
    } else {
      t.Refresh(undefined);
    }
  }
  QWa() {
    var t = this.HWa;
    this.HWa = false;
    for (let t = 0; t < LEFT_KEY_NUM; t++) {
      if (this.lZe[t + LEFT_KEY_START_INDEX].IsVisible()) {
        this.NWa.SetArrowVisible(t, true);
        this.HWa = true;
      } else {
        this.NWa.SetArrowVisible(t, false);
      }
    }
    this.NWa?.SetBgVisible(this.HWa);
    if (t !== this.HWa && this.VWa) {
      this.VWa.StopCurrentSequence();
      this.VWa.PlaySequencePurely(this.HWa ? "Show" : "Hide");
    }
  }
  kZe() {
    var e = ModelManager_1.ModelManager.SkillButtonUiModel;
    var i = this._Ze.CurButtonTypeList;
    for (let t = SUB_KEY_START_INDEX; t < SUB_KEY_END_INDEX; t++) {
      var s;
      var n = i[t];
      var h = this.lZe[t];
      if (n) {
        if (s = e.GetSkillButtonDataByButton(n)) {
          if (s.GetSkillId()) {
            h.Refresh(s);
          } else {
            h.Deactivate();
          }
        } else if (s = e.GetBehaviorButtonDataByButton(n)) {
          h.RefreshByBehaviorButtonData(s);
        } else {
          h.Deactivate();
        }
      } else {
        h.Deactivate();
      }
    }
  }
  dZe() {
    for (const t of this.lZe) {
      t.Deactivate();
    }
  }
  async NewAllBattleSkillItems() {
    var t = undefined;
    var t = [this.GetItem(0).GetOwner(), this.GetItem(1).GetOwner(), this.GetItem(2).GetOwner(), this.GetItem(3).GetOwner(), this.GetItem(5).GetOwner(), this.GetItem(6).GetOwner(), this.GetItem(7).GetOwner(), this.GetItem(8).GetOwner(), this.GetItem(11).GetOwner(), this.GetItem(12).GetOwner(), this.GetItem(13).GetOwner(), this.GetItem(14).GetOwner(), this.GetItem(16).GetOwner(), this.GetItem(17).GetOwner(), this.GetItem(18).GetOwner(), this.GetItem(19).GetOwner()];
    await Promise.all(t.map(async (t, e) => {
      await this.FZe(t, e);
    }));
  }
  async GZe() {
    var t = this.GetItem(9)?.GetOwner();
    if (t) {
      this.hZe = new BattleSkillCombineItem_1.BattleSkillCombineItem();
      await this.hZe.CreateByActorAsync(t);
    }
  }
  async jWa() {
    var t = this.GetItem(15)?.GetOwner();
    if (t) {
      this.NWa = new BattleSkillDpadItem_1.BattleSkillDpadItem();
      await this.NWa.CreateThenShowByActorAsync(t);
    }
  }
  async yah() {
    var t = this.GetItem(20)?.GetOwner();
    if (t) {
      this.Mah = new BattleSkillRouletteItem_1.BattleSkillRouletteItem();
      await this.Mah.CreateThenShowByActorAsync(t);
    }
  }
  async FZe(t, e) {
    t = await this.NewStaticChildViewAsync(t, BattleSkillGamepadItem_1.BattleSkillGamepadItem, e);
    t.GamepadData = this._Ze;
    return this.lZe[e] = t;
  }
  VZe(t) {
    return this.lZe[t];
  }
  fZe(t) {
    t = ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData.CurButtonTypeList.indexOf(t);
    if (!(t < 0)) {
      return this.VZe(t);
    }
  }
  Iah(t) {
    if (t === 7 && this._Ze?.SwitchInteractData.IsSwitchInteractOpen) {
      return this.fZe(104);
    }
  }
  UZe() {
    this.hZe?.SetVisible(!this._Ze.GetIsPressCombineButton());
  }
  Tah() {
    this.Mah?.RefreshVisible();
  }
  AZe(t) {
    if (t) {
      for (let t = 0; t < MAIN_HALF_NUM; t++) {
        if (this._Ze.MainSkillCombineButtonTypeList[t] !== 0) {
          this.lZe[t].PlayPressCombineButtonSeq();
        }
      }
      for (let t = LEFT_KEY_START_INDEX; t < SUB_KEY_START_INDEX; t++) {
        if (this._Ze.DpadSkillCombineButtonTypeList[t] !== this._Ze.DpadSkillButtonTypeList[t]) {
          this.lZe[t].PlayPressCombineButtonSeq();
        }
      }
      this.Eah.StopTweenAnim(21);
      this.Eah.PlayTweenAnim(22);
    } else {
      for (let t = 0; t < MAIN_HALF_NUM; t++) {
        this.lZe[t].PlayReleaseCombineButtonSeq();
      }
      this.Eah.StopTweenAnim(22);
      this.Eah.PlayTweenAnim(21);
    }
  }
  jKa() {
    if (ModelManager_1.ModelManager.BattleUiModel?.ChatScrollViewVisible) {
      this.GetItem(10)?.SetAnchorOffsetX(593);
    } else {
      this.GetItem(10)?.SetAnchorOffsetX(393);
    }
  }
  Xlh() {
    var t;
    var e = this.fZe(7);
    if (e?.IsSecondButton) {
      t = ModelManager_1.ModelManager.SkillButtonUiModel?.GetSkillButtonDataByButton(7);
      this.Ylh(e, t);
    }
  }
  qZe() {
    this._Ze.RefreshInteractBehaviorData();
    var t = this.fZe(104);
    if (t) {
      if (!t.IsMainButton) {
        t.RefreshVisible();
      }
      t.RefreshEnable();
    }
  }
  nit() {
    this.Eah = new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer();
    this.Eah.InitTweenAnim(21, this.GetItem(21));
    this.Eah.InitTweenAnim(22, this.GetItem(22));
    this.VWa = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(10));
  }
  RefreshDpadKeyItemEnable() {
    if (this._Ze?.GamepadDataType !== 1) {
      for (let t = 0; t < LEFT_KEY_NUM; t++) {
        this.NWa.SetArrowEnable(t, true);
      }
    } else {
      var e = this._Ze;
      if (e?.GetIsPressCombineButton()) {
        for (let t = 0; t < LEFT_KEY_NUM; t++) {
          var i = e.ButtonKeyList[t + MAIN_HALF_NUM];
          if (e.MusicSubKeyList.includes(i)) {
            this.NWa.SetArrowEnable(t, false);
          } else {
            this.NWa.SetArrowEnable(t, true);
          }
        }
      } else {
        for (let t = 0; t < LEFT_KEY_NUM; t++) {
          this.NWa.SetArrowEnable(t, true);
        }
      }
    }
  }
}
exports.GamepadSkillButtonPanel = GamepadSkillButtonPanel;
//# sourceMappingURL=GamepadSkillButtonPanel.js.map