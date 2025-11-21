"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationUnitNodeHandle = undefined;
const Info_1 = require("../../../../../Core/Common/Info");
const GlobalData_1 = require("../../../../GlobalData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BattleLinkEnergyButton_1 = require("../BattleChildView/BattleLinkEnergyButton");
const BattleTimeDilationButton_1 = require("./BattleTimeDilationButton");
const BattleWeeklyRogueButton_1 = require("./BattleWeeklyRogueButton");
const BATTLE_TIME_DILATION_UI = "UiItem_BattlePhotoHourglass";
class FormationUnitNodeHandle {
  constructor() {
    this.gNu = undefined;
    this.CNu = undefined;
    this.O8c = undefined;
    this.pNu = undefined;
    this.c2d = undefined;
  }
  async InitializeAsync(t) {
    await this.rNu(t);
  }
  Init(t, i) {
    this.vNu(t, i);
    this.q8c();
    this.yNu();
    this.d2d();
  }
  Destroy() {
    if (this.CNu) {
      this.CNu.Destroy();
      this.CNu = undefined;
      this.O8c = undefined;
      this.pNu = undefined;
    }
  }
  Tick(t) {
    this.CNu?.Tick(t);
  }
  OnInputControllerChange(t, i) {
    this.vNu(t, i);
  }
  async rNu(t) {
    t = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_BattleViewUnitNode_Prefab", t, GlobalData_1.GlobalData.World, 100, "BattleUi");
    this.gNu = t.RootComponent;
    this.gNu.SetAnchorAlign(2, 2);
    this.gNu.SetWidth(340);
    this.gNu.SetHeight(170);
    this.gNu.SetUIActive(false);
  }
  GetRootItem() {
    return this.gNu;
  }
  SetNodeVisible(t) {
    this.gNu?.SetUIActive(t);
  }
  vNu(t, i) {
    if (this.gNu) {
      (Info_1.Info.IsInGamepad() ? i : t)?.AddChildToRoleHeadPanel(this.gNu);
    }
  }
  GetLinkEnergyButton() {
    return this.O8c;
  }
  q8c() {
    var t;
    var i;
    if (!this.O8c) {
      if ((ModelManager_1.ModelManager.BattleLinkModel?.CheckInNewBattleLink() || ModelManager_1.ModelManager.BattleLinkModel?.CheckInSpecialBattleLink()) && (i = (t = new BattleLinkEnergyButton_1.BattleLinkEnergyButton()).GetResourceId())) {
        this.O8c = t;
        this.O8c.InitHandle(this);
        this.O8c.CreateByResourceIdAsync(i, this.gNu);
        this.CNu = this.O8c;
      }
    }
  }
  ShowLinkButton(t) {
    var i;
    if (t) {
      if (this.O8c) {
        this.O8c?.SetVisible(true);
      } else if (i = (t = new BattleLinkEnergyButton_1.BattleLinkEnergyButton()).GetResourceId()) {
        this.O8c = t;
        this.O8c.InitHandle(this);
        this.O8c.CreateByResourceIdAsync(i, this.gNu).then(() => {
          this.O8c?.SetVisible(true);
        });
        this.CNu = this.O8c;
      }
    } else {
      this.O8c?.SetVisible(false);
    }
  }
  GetWeeklyRogueButton() {
    return this.pNu;
  }
  yNu() {
    if (!this.pNu) {
      if (ModelManager_1.ModelManager.WeeklyRogueModel?.CheckIsInWeeklyRogue()) {
        this.pNu = new BattleWeeklyRogueButton_1.BattleWeeklyRogueButton();
        this.pNu.InitHandle(this);
        this.pNu.CreateByResourceIdAsync("UiItem_WeeklyRogueButton", this.gNu);
        this.CNu = this.pNu;
        this.pNu.SetVisible(true);
      }
    }
  }
  GetBattleTimeDilationButton() {
    return this.c2d;
  }
  d2d() {
    if (!this.c2d) {
      if (ModelManager_1.ModelManager.BattleUiModel?.IsTimeDilationSkillButtonEnable()) {
        this.c2d = new BattleTimeDilationButton_1.BattleTimeDilationButton();
        this.c2d.InitHandle(this);
        this.c2d.CreateByResourceIdAsync(BATTLE_TIME_DILATION_UI, this.gNu);
        this.CNu = this.c2d;
        this.c2d.SetVisible(true);
      }
    }
  }
  UpdateTimeDilationButton() {
    if (ModelManager_1.ModelManager.BattleUiModel?.IsTimeDilationSkillButtonEnable() ?? false) {
      if (this.c2d) {
        this.c2d?.SetVisible(true);
      } else {
        this.c2d = new BattleTimeDilationButton_1.BattleTimeDilationButton();
        this.c2d.InitHandle(this);
        this.c2d.CreateByResourceIdAsync(BATTLE_TIME_DILATION_UI, this.gNu).then(() => {
          this.c2d?.SetVisible(ModelManager_1.ModelManager.BattleUiModel?.IsTimeDilationSkillButtonEnable() ?? false);
        });
        this.CNu = this.c2d;
      }
    } else {
      this.c2d?.SetVisible(false);
    }
  }
}
exports.FormationUnitNodeHandle = FormationUnitNodeHandle;
//# sourceMappingURL=FormationUnitNodeHandle.js.map