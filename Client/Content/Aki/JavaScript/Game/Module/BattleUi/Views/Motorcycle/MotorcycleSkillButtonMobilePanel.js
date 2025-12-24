"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleSkillButtonMobilePanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const VisibleStateUtil_1 = require("../../VisibleStateUtil");
const BattleSkillExploreItem_1 = require("../BattleSkillExploreItem");
const BehaviorButton_1 = require("../BehaviorButton");
const MotorcycleSkillItem_1 = require("./MotorcycleSkillItem");
const MOBILE_INDEX_EXPLORE_ITEM = 3;
class MotorcycleSkillButtonMobilePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.lZe = [];
    this.Tet = new Map();
    this.Let = Stats_1.Stat.Create("[SkillButton]RefreshAllBattleSkillItem");
    this.aZf = false;
    this.hZf = 1;
    this.Ret = t => {
      if (t) {
        for (const e of this.lZe) {
          e.RefreshEnable(true);
        }
      }
    };
    this.uZe = t => {
      if (t !== 4 && t !== 3) {
        this.cZe();
        this.wet();
      }
    };
    this.mZe = () => {
      this.dZe();
    };
    this.CZe = () => {
      if (ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsDriving) {
        this.cZe();
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
    this.eDf = () => {
      var t = this.GetVisible();
      this.aZf = ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(38);
      this.nJe(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.NewAllBattleSkillItems(), this.Oet()]);
    this.aZf = ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(38);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(38, this.eDf);
    this.cZe();
    this.wet();
  }
  OnBeforeDestroy() {
    this.lZe.length = 0;
    this.Tet.clear();
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(38, this.eDf);
  }
  OnAfterShow() {
    this.AddEvents();
    for (const t of this.lZe) {
      t.RefreshEnable(true);
    }
    for (const e of this.Tet.values()) {
      e.UpdateAlpha();
    }
  }
  OnBeforeHide() {
    this.RemoveEvents();
    for (const t of this.lZe) {
      if (t.IsShowOrShowing) {
        t.TryReleaseButton();
      }
    }
  }
  OnBeforeShow() {
    for (const t of this.lZe) {
      t.RefreshSkillCoolDownOnShow();
    }
  }
  Tick(t) {
    if (this.IsShowOrShowing) {
      for (const e of this.lZe) {
        e.Tick(t);
      }
    }
  }
  cZe() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[摩托车]MotorcycleSkillButtonMobilePanel RefreshAllBattleSkillItems");
    }
    this.Let.Start();
    var e = ModelManager_1.ModelManager.SkillButtonUiModel;
    var i = e.GetButtonTypeList();
    for (let t = 0; t < this.lZe.length; t++) {
      var s = i[t];
      var n = this.lZe[t];
      var h = e.GetSkillButtonDataByButton(s);
      if (h) {
        if (!s || s < 0) {
          n.Deactivate();
        } else if (h.GetSkillId()) {
          n.Refresh(h);
        } else if (s !== 201 && s !== 202) {
          n.Deactivate();
        }
      } else {
        n.Deactivate();
      }
    }
    this.Let.Stop();
    ModelManager_1.ModelManager.SkillButtonUiModel.GetCurSkillButtonEntityData()?.ClearNextTickAfterRefreshAllBattleSkillItems();
  }
  dZe() {
    for (const t of this.lZe) {
      t.Deactivate();
    }
  }
  async NewAllBattleSkillItems() {
    var t = undefined;
    var t = [this.GetItem(0).GetOwner(), this.GetItem(1).GetOwner(), this.GetItem(2).GetOwner(), this.GetItem(3).GetOwner(), this.GetItem(4).GetOwner(), this.GetItem(5).GetOwner(), this.GetItem(6).GetOwner(), this.GetItem(9).GetOwner()];
    await Promise.all(t.map(async (t, e) => this.FZe(t, e)));
  }
  async FZe(t, e) {
    let i = undefined;
    await (i = new (e === MOBILE_INDEX_EXPLORE_ITEM ? BattleSkillExploreItem_1.BattleSkillExploreItem : MotorcycleSkillItem_1.MotorcycleSkillItem)()).NewByRootActorAsync(t, e);
    return this.lZe[e] = i;
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
    var t = this.GetItem(7);
    await this.ket(t.GetOwner(), 102);
    var t = this.GetItem(8);
    await this.ket(t.GetOwner(), 101);
  }
  async ket(t, e, i, s = false) {
    i = {
      InputActionType: e,
      ActionName: i,
      IsToggle: s
    };
    s = new BehaviorButton_1.BehaviorButton();
    await s.NewByRootActorAsync(t, i);
    this.Tet.set(e, s);
    return s;
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
  }
  SetActive(t) {
    if (this.GetVisible() !== t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "战斗子界面不要直接调用SetActive, 请调用SetVisible");
      }
    } else {
      super.SetActive(t);
    }
  }
  SetVisible(t, e) {
    var i = this.GetVisible();
    this.rJe(t, e);
    this.nJe(i);
  }
  rJe(t, e) {
    this.hZf = VisibleStateUtil_1.VisibleStateUtil.SetVisible(this.hZf, e, t);
  }
  GetVisible() {
    return this.aZf && this.hZf === 0;
  }
  nJe(t) {
    var e = this.GetVisible();
    if (t !== e) {
      this.SetActive(e);
    }
  }
}
exports.MotorcycleSkillButtonMobilePanel = MotorcycleSkillButtonMobilePanel;
//# sourceMappingURL=MotorcycleSkillButtonMobilePanel.js.map