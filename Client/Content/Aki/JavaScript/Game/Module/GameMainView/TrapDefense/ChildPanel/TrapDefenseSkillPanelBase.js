"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseSkillPanelBase = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BattleChildViewPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel");
const TrapDefenseBattleSkillExploreItem_1 = require("../ChildItem/TrapDefenseBattleSkillExploreItem");
const TrapDefenseBattleSkillItem_1 = require("../ChildItem/TrapDefenseBattleSkillItem");
class TrapDefenseSkillPanelBase extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.BattleSkillItemList = [];
    this.DataMap = new Map();
    this.zze = () => {
      for (const e of this.BattleSkillItemList) {
        e.RefreshTimeDilation();
      }
    };
    this.LZe = e => {
      for (const t of this.BattleSkillItemList) {
        t.PauseGame(e);
      }
    };
    this.EZe = e => {
      this.TYu(e);
    };
    this.TZe = e => {
      this.TYu(e);
    };
  }
  OnStart() {
    this.cZe();
    this.OnChildStart();
  }
  OnAfterShow() {
    for (const e of this.BattleSkillItemList) {
      e.RefreshEnable(true);
    }
  }
  OnShowBattleChildViewPanel() {
    for (const e of this.BattleSkillItemList) {
      e.RefreshSkillCoolDownOnShow();
    }
  }
  OnHideBattleChildViewPanel() {
    for (const e of this.BattleSkillItemList) {
      if (e.IsShowOrShowing) {
        e.TryReleaseButton();
      }
    }
  }
  OnTickBattleChildViewPanel(e) {
    if (this.Visible) {
      for (const t of this.BattleSkillItemList) {
        t.Tick(e);
      }
    }
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TriggerUiTimeDilation, this.zze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PauseGame, this.LZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh, this.EZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonCdRefresh, this.TZe);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TriggerUiTimeDilation, this.zze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PauseGame, this.LZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh, this.EZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonCdRefresh, this.TZe);
  }
  cZe() {
    var t = this.GetActionNameList();
    for (let e = 0; e < t.length; e++) {
      var i = t[e];
      var s = this.BattleSkillItemList[e];
      var i = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetSkillData(i);
      s.Refresh(i);
      this.DataMap.set(e, i);
    }
  }
  TYu(e) {
    var t;
    var i = this.GetActionNameList();
    for (const s of this.DataMap.values()) {
      if (s.GetButtonType() === e && (t = i.indexOf(s.GetActionName())) >= 0) {
        this.BattleSkillItemList[t].Refresh(s);
      }
    }
  }
  async NewBattleSkillItem(e, t, i) {
    let s = undefined;
    s = i ? await this.NewStaticChildViewAsync(e, TrapDefenseBattleSkillExploreItem_1.TrapDefenseBattleSkillExploreItem, t) : await this.NewStaticChildViewAsync(e, TrapDefenseBattleSkillItem_1.TrapDefenseBattleSkillItem, t);
    this.BattleSkillItemList.push(s);
    return s;
  }
  OnChildStart() {}
}
exports.TrapDefenseSkillPanelBase = TrapDefenseSkillPanelBase;
//# sourceMappingURL=TrapDefenseSkillPanelBase.js.map