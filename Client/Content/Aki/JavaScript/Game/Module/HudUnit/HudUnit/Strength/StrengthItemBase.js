"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StrengthItemBase = undefined;
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
    this.TweenAnimPlayer = new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer();
  }
  Init(t, e, s) {
    this.RoleData = e;
    this.UiVisibleChanged = s;
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
  OnAddEntityEvents() {}
  OnRemoveEntityEvents() {}
  OnRefreshRoleData() {}
  ListenForTagAddOrRemove(t, e, s) {
    t = t.ListenForTagAddOrRemove(e, s, StrengthItemBase.SYe);
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