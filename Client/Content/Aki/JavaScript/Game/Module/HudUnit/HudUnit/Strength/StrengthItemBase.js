"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StrengthItemBase = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const BattleUiTweenAnimPlayer_1 = require("../../../BattleUi/Views/BattleUiTweenAnimPlayer");
class StrengthItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.IsAfterStart = false;
    this.RoleData = undefined;
    this.UiVisibleChanged = undefined;
    this.TagTaskList = [];
    this.IsEnableStrengthItem = true;
    this.TweenAnimPlayer = new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer();
  }
  Init(t, e, i) {
    this.RoleData = e;
    this.UiVisibleChanged = i;
    this.InitAsync(t).catch(() => {});
  }
  async InitAsync(t) {
    await this.CreateByResourceIdAsync(this.GetResourceId(), t);
  }
  GetResourceId() {
    return "UiItem_Endurance";
  }
  OnStart() {
    this.IsAfterStart = true;
    this.OnAddEvents();
    this.OnAddEntityEvents();
    this.OnRefreshRoleData();
    if (!this.IsEnableStrengthItem) {
      this.SetEnableStrengthItem(false);
    }
  }
  OnBeforeShow() {
    this.UiVisibleChanged?.(true);
  }
  OnAfterHide() {
    this.UiVisibleChanged?.(false);
  }
  OnBeforeDestroy() {
    this.OnRemoveEvents();
    this.RefreshRoleData(undefined);
    this.IsAfterStart = false;
    super.OnBeforeDestroy();
  }
  RefreshRoleData(t) {
    if (this.RoleData !== t && (this.ClearTagTask(), this.OnRemoveEntityEvents(), this.RoleData = t, this.IsAfterStart)) {
      this.OnAddEntityEvents();
      this.OnRefreshRoleData();
    }
  }
  Tick(t) {}
  GetUiVisible() {
    return this.IsShowing || this.IsShow;
  }
  OnAddEvents() {}
  OnRemoveEvents() {}
  SetEnableStrengthItem(t) {
    if (this.IsEnableStrengthItem !== t && (Log_1.Log.CheckInfo() && Log_1.Log.Info("HudUnit", 96, "体力条 SetEnableStrengthItem", ["", this.constructor.name], ["", t]), this.IsEnableStrengthItem = t, this.IsAfterStart)) {
      this.OnEnableStrengthItem(t);
    }
  }
  OnEnableStrengthItem(t) {}
  OnAddEntityEvents() {}
  OnRemoveEntityEvents() {}
  OnRefreshRoleData() {}
  ListenForTagAddOrRemove(t, e, i) {
    t = t.ListenForTagAddOrRemove(e, i, StrengthItemBase.SYe);
    if (t) {
      this.TagTaskList.push(t);
    }
  }
  ClearTagTask() {
    for (const t of this.TagTaskList) {
      t.EndTask();
    }
    this.TagTaskList.length = 0;
  }
  InitTweenAnim(t) {
    this.TweenAnimPlayer.InitTweenAnim(t, this.GetItem(t));
  }
  PlayTweenAnim(t) {
    this.TweenAnimPlayer.PlayTweenAnim(t);
  }
  StopTweenAnim(t) {
    this.TweenAnimPlayer.StopTweenAnim(t);
  }
}
(exports.StrengthItemBase = StrengthItemBase).SYe = Stats_1.Stat.Create("[StrengthItem]ListenTag");
//# sourceMappingURL=StrengthItemBase.js.map