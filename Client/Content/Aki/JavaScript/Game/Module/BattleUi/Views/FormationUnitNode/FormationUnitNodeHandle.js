"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationUnitNodeHandle = undefined;
const Info_1 = require("../../../../../Core/Common/Info");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BattleLinkEnergyButton_1 = require("../BattleChildView/BattleLinkEnergyButton");
const BattleWeeklyRogueButton_1 = require("./BattleWeeklyRogueButton");
class FormationUnitNodeHandle {
  constructor() {
    this.D2u = undefined;
    this.U2u = undefined;
    this.O8c = undefined;
    this.B2u = undefined;
  }
  async InitializeAsync(t) {
    await this.d2u(t);
  }
  Init(t, i) {
    this.k2u(t, i);
    this.q8c();
    this.O2u();
  }
  Destroy() {
    if (this.U2u) {
      this.U2u.Destroy();
      this.U2u = undefined;
      this.O8c = undefined;
      this.B2u = undefined;
    }
  }
  Tick(t) {
    this.U2u?.Tick(t);
  }
  OnInputControllerChange(t, i) {
    this.k2u(t, i);
  }
  async d2u(t) {
    t = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_BattleViewUnitNode_Prefab", t);
    this.D2u = t.RootComponent;
    this.D2u.SetAnchorAlign(2, 2);
    this.D2u.SetWidth(340);
    this.D2u.SetHeight(170);
    this.D2u.SetUIActive(false);
  }
  GetRootItem() {
    return this.D2u;
  }
  SetNodeVisible(t) {
    this.D2u?.SetUIActive(t);
  }
  k2u(t, i) {
    if (this.D2u) {
      (Info_1.Info.IsInGamepad() ? i : t)?.AddChildToRoleHeadPanel(this.D2u);
    }
  }
  GetLinkEnergyButton() {
    return this.O8c;
  }
  q8c() {
    if (!this.O8c) {
      if (ModelManager_1.ModelManager.BattleLinkModel?.CheckInNewBattleLink()) {
        this.O8c = new BattleLinkEnergyButton_1.BattleLinkEnergyButton();
        this.O8c.InitHandle(this);
        this.O8c.CreateByResourceIdAsync("UiItem_RogueScoreE", this.D2u);
        this.U2u = this.O8c;
      }
    }
  }
  ShowLinkButton(t) {
    if (t) {
      if (this.O8c) {
        this.O8c?.SetVisible(true);
      } else {
        this.O8c = new BattleLinkEnergyButton_1.BattleLinkEnergyButton();
        this.O8c.InitHandle(this);
        this.O8c.CreateByResourceIdAsync("UiItem_RogueScoreE", this.D2u).then(() => {
          this.O8c?.SetVisible(true);
        });
        this.U2u = this.O8c;
      }
    } else {
      this.O8c?.SetVisible(false);
    }
  }
  GetWeeklyRogueButton() {
    return this.B2u;
  }
  O2u() {
    if (!this.B2u) {
      if (ModelManager_1.ModelManager.WeeklyRogueModel?.CheckIsInWeeklyRogue()) {
        this.B2u = new BattleWeeklyRogueButton_1.BattleWeeklyRogueButton();
        this.B2u.InitHandle(this);
        this.B2u.CreateByResourceIdAsync("UiItem_WeeklyRogueButton", this.D2u);
        this.U2u = this.B2u;
        this.B2u.SetVisible(true);
      }
    }
  }
}
exports.FormationUnitNodeHandle = FormationUnitNodeHandle;
//# sourceMappingURL=FormationUnitNodeHandle.js.map