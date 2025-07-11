"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScorePanel = undefined;
const UE = require("ue");
const Stats_1 = require("../../../../../Core/Common/Stats");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FarmGoldController_1 = require("../../../Activity/ActivityContent/FarmGold/FarmGoldController");
const DreamLinkScoreItem_1 = require("../ScoreItem/DreamLinkScoreItem");
const FarmGoldScoreItem_1 = require("../ScoreItem/FarmGoldScoreItem");
const LinkScoreItem_1 = require("../ScoreItem/LinkScoreItem");
const RogueScoreItem_1 = require("../ScoreItem/RogueScoreItem");
const VisionArenaScoreItem_1 = require("../ScoreItem/VisionArenaScoreItem");
const BattleChildViewPanel_1 = require("./BattleChildViewPanel");
class ScorePanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.dul = new Map();
    this.zRl = undefined;
    this.J3l = undefined;
    this.Cul = (e, t) => {
      if (t) {
        this.JRl(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async InitializeAsync() {
    var e;
    var t;
    if (ModelManager_1.ModelManager.BattleLinkModel?.CheckInDreamLink()) {
      await this.I1l();
      await this.iel();
    } else if (ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike() || ModelManager_1.ModelManager.CreatureModel.GetInstanceId() === 1 || ModelManager_1.ModelManager.BossRushModel.CheckInBossRush() || ModelManager_1.ModelManager.BabelTowerModel.CheckInBattleBabelTower() || ControllerHolder_1.ControllerHolder.MapRogueController.CheckInMapRogueInstance()) {
      await this.ZRl(true);
    } else if (FarmGoldController_1.FarmGoldController.CheckInFarmGold()) {
      await this.Z3l();
    } else if (ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()) {
      await this.X7_();
    }
    for ([e, t] of ModelManager_1.ModelManager.BattleScoreModel.GetScoreEnableMap()) {
      if (t) {
        this.JRl(e);
      }
    }
  }
  Reset() {
    this.dul.clear();
    this.zRl = undefined;
    this.J3l = undefined;
    super.Reset();
  }
  OnBeforeDestroyImplement() {
    this.dul.clear();
    this.zRl = undefined;
    this.J3l = undefined;
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleScoreEnableChanged, this.Cul);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleScoreEnableChanged, this.Cul);
  }
  JRl(e) {
    var t = ConfigManager_1.ConfigManager.BattleScoreConfig?.GetBattleScoreConfig(e);
    if (t) {
      switch (t.Type) {
        case 6:
          this.ZRl(false);
          break;
        case 8:
          this.wI1(e);
      }
    }
  }
  async ZRl(e = true) {
    var t;
    if (!this.zRl) {
      t = await this.NewDynamicChildViewByResourceId(this.RootItem, "UiItem_RogueScore", RogueScoreItem_1.RogueScoreItem);
      this.dul.set("RogueScoreItem", t);
      this.zRl = t;
      if (e) {
        await t.HideAsync();
      }
    }
  }
  async Z3l() {
    var e;
    if (!this.J3l) {
      e = await this.NewDynamicChildViewByResourceId(this.GetItem(0), "UiItem_FarmGoldScore", FarmGoldScoreItem_1.FarmGoldScoreItem);
      this.dul.set("FarmGoldScoreItem", e);
      await (this.J3l = e).ShowAsync();
      e.IsScoreEnable = true;
    }
  }
  async I1l() {
    var e = await this.NewDynamicChildViewByResourceId(this.RootItem, "UiItem_RogueScoreC", DreamLinkScoreItem_1.DreamLinkScoreItem);
    this.dul.set("DreamLinkScoreItem", e);
    await e.HideAsync();
  }
  async iel() {
    var e = await this.NewDynamicChildViewByResourceId(this.RootItem, "UiItem_RogueScoreB", LinkScoreItem_1.LinkScoreItem);
    this.dul.set("LinkScoreItem", e);
    await e.HideAsync();
  }
  async X7_() {
    var e = await this.NewDynamicChildViewByResourceId(this.RootItem, "UiItem_RogueScoreD", LinkScoreItem_1.LinkScoreItem);
    this.dul.set("LinkScoreItem", e);
    await e.HideAsync();
  }
  async wI1(e) {
    if (this.dul.has("VisionArenaScoreItem")) {
      const t = this.dul.get("VisionArenaScoreItem");
      if (t.IsScoreEnable || t.IsShowOrShowing) {
        return undefined;
      } else {
        await t.ShowAsync();
        t.IsScoreEnable = true;
        return;
      }
    }
    const t = await this.NewDynamicChildViewByResourceId(this.RootItem, "UiItem_VisionScoreA", VisionArenaScoreItem_1.VisionArenaScoreItem, false, e);
    this.dul.set("VisionArenaScoreItem", t);
    await t.ShowAsync();
    t.IsScoreEnable = true;
  }
  OnShowBattleChildViewPanel(e) {
    if (e) {
      for (const t of this.dul.values()) {
        t.OnShowFirstTime();
      }
    }
  }
  OnTickBattleChildViewPanel(e) {
    ScorePanel.Ult.Start();
    for (const t of this.dul.values()) {
      if (t.IsScoreEnable) {
        t.OnTick(e);
      }
    }
    ScorePanel.Ult.Stop();
  }
}
(exports.ScorePanel = ScorePanel).Ult = Stats_1.Stat.Create("[BattleView]ScorePanelTick");
//# sourceMappingURL=ScorePanel.js.map