"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefensePhantomSkillInBattleItem = exports.TowerDefenseInBattleView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const BattleChildView_1 = require("../../BattleUi/Views/BattleChildView/BattleChildView");
const BattleVisibleChildView_1 = require("../../BattleUi/Views/BattleChildView/BattleVisibleChildView");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const TowerDefenceController_1 = require("../TowerDefenceController");
class TowerDefenseInBattleView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.EZs = undefined;
    this.Hea = undefined;
    this.qbi = 1;
    this.eTt = e => {
      this.EZs?.SetActive(e);
      if (e) {
        this.EZs?.Refresh();
      }
    };
    this.Cke = () => {
      var e = this.GetExtendToggle(0);
      if (e) {
        if (e.GetToggleState() === 1) {
          e.SetToggleState(0, true);
        } else {
          e.SetToggleState(1, true);
        }
      }
    };
    this.yZs = () => {
      var e = this.GetExtendToggle(0);
      if (e && e.GetToggleState() === 1) {
        e.SetToggleState(0, true);
      }
    };
    this.Cqc = () => {
      if (this.GetVisible()) {
        this.IZs();
      }
    };
    this.IZs = () => {
      if (ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.Id !== 0) {
        this.TZs();
        this.EZs?.Refresh();
        this.jea();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  Initialize(e) {
    super.Initialize(e);
    this.InitChildType(4);
    this.SetVisible(1, false);
    this.LZs();
  }
  Reset() {
    super.Reset();
    this.DZs();
  }
  async OnBeforeStartAsync() {
    var e = new TowerDefenseInBattlePanel();
    var t = this.GetItem(3);
    await e.GetOrCreateAsync(t, "UiItem_HoverTipsD");
    this.EZs = e;
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnStart() {
    this.GetSprite(2).SetUIActive(true);
    this.Hea.PlayLevelSequenceByName("Start");
    this.Hea.StopCurrentSequence(false, true);
  }
  OnAfterDestroy() {
    ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(5, false);
  }
  StartShow() {
    this.SetVisible(1, true);
    this.IZs();
    ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(5, true);
  }
  EndShow() {
    this.SetVisible(1, false);
    ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(5, false);
  }
  LZs() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiToggleTowerDefenseInfoView, this.Cke);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TowerDefenseOnPhantomInfoUpdateNotify, this.IZs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.yZs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TowerDefenseDataInit, this.Cqc);
  }
  DZs() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiToggleTowerDefenseInfoView, this.Cke);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TowerDefenseOnPhantomInfoUpdateNotify, this.IZs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.yZs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TowerDefenseDataInit, this.Cqc);
  }
  TZs() {
    var e = TowerDefenceController_1.TowerDefenseController.GetLevelContentInBattle();
    this.GetText(1).SetText(e);
    this.GetSprite(2).SetFillAmount(TowerDefenceController_1.TowerDefenseController.GetProgressInBattle());
  }
  jea() {
    var e = TowerDefenceController_1.TowerDefenseController.GetLevelInBattle();
    if (e !== this.qbi) {
      this.qbi = e;
      this.Hea.PlayLevelSequenceByName("Start");
    }
  }
}
exports.TowerDefenseInBattleView = TowerDefenseInBattleView;
class TowerDefenseInBattlePanel extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.Hmt = false;
    this.xKt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(1);
    var t = new TowerDefenseInBattleInfoItem();
    await t.CreateThenShowByActorAsync(e.GetOwner());
    this.xKt = t;
  }
  async GetOrCreateAsync(e, t) {
    if (!this.Hmt) {
      await this.NewByResourceId(e, t);
      this.Hmt = true;
    }
    this.SetActive(false);
  }
  Refresh() {
    this.xKt?.Refresh();
  }
}
class TowerDefenseInBattleInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.DOt = undefined;
    this.AZs = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var e = new SmallItemGrid_1.SmallItemGrid();
    await e.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.DOt = e;
    this.AZs = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), TowerDefenceController_1.TowerDefenseController.BuildPhantomSkillInBattleItem);
  }
  Refresh() {
    var e = TowerDefenceController_1.TowerDefenseController.BuildPhantomIconInBattleData();
    this.DOt?.Apply(e);
    this.DOt?.SetToggleInteractive(false);
    var e = TowerDefenceController_1.TowerDefenseController.BuildPhantomSkillInBattleLayoutData();
    this.AZs.RefreshByData(e);
    var e = TowerDefenceController_1.TowerDefenseController.GetExpDataInBattle();
    var t = this.GetText(0);
    t.SetUIActive(e !== undefined);
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, "TowerDefence_LV", e?.Exp, e?.Threshold === 0 ? e?.Exp : e?.Threshold);
    }
    var t = ModelManager_1.ModelManager.TowerDefenseModel?.GetCurrentActivityConfig();
    if (t && t.ActivityType === 1) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), TowerDefenceController_1.TowerDefenseController.BuildCurrentPhantomNameTextIdInBattle());
    }
  }
}
class TowerDefensePhantomSkillInBattleItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIItem]];
  }
  OnStart() {
    this.GetItem(4)?.SetUIActive(false);
  }
  Refresh(e, t, i) {
    var s = UE.Color.FromHex(e.IsUnlock ? "adfb5aff" : "adadadff");
    this.GetText(1)?.SetColor(s);
    this.GetSprite(0).SetUIActive(e.IsUnlock);
    this.GetSprite(3).SetUIActive(!e.IsUnlock);
    var s = ModelManager_1.ModelManager.TowerDefenseModel.GetCurrentActivityConfig();
    var r = this.GetText(2);
    if (s.ActivityType === 1) {
      if (e.DescriptionArgs) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(r, e.Description, ...e.DescriptionArgs);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(r, e.Description);
      }
    } else if (s.ActivityType === 2) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Skill);
      LguiUtil_1.LguiUtil.SetLocalTextNew(r, e.Description);
    }
    r.SetChangeColor(ModelManager_1.ModelManager.TowerDefenseModel.CheckCurrentActivityShowDifferent(), r.changeColor);
  }
}
exports.TowerDefensePhantomSkillInBattleItem = TowerDefensePhantomSkillInBattleItem;
//# sourceMappingURL=TowerDefenceInBattleView.js.map