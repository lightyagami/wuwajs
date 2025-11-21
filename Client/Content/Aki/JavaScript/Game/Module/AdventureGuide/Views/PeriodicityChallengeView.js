"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PeriodicityChallengeView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const PeriodicityChallengeItem_1 = require("./PeriodicityChallengeItem");
const PeriodicityChallengeTypeItem_1 = require("./PeriodicityChallengeTypeItem");
class PeriodicityChallengeView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.a8e = 4;
    this.H6e = undefined;
    this.s8e = [];
    this.r8e = undefined;
    this.Prm = undefined;
    this.l8e = undefined;
    this._8e = undefined;
    this.Arm = () => {
      var e = new PeriodicityChallengeTypeItem_1.PeriodicityChallengeTypeItem();
      e.BindOnToggleFunc(this.Drm);
      e.BindCanToggleExecuteChange(this.Urm);
      return e;
    };
    this.xrm = () => {
      return new PeriodicityChallengeItem_1.PeriodicityChallengeItem();
    };
    this.Drm = (e, i) => {
      this.a8e = e;
      this.H6e?.SetToggleState(0, false);
      this.H6e = i;
      e = this.s8e.indexOf(this.a8e);
      if (e >= 0) {
        this.r8e.SelectGridProxy(e, false);
      }
      i = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(this.a8e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdventureHelpBtn, i.HelpGroupId);
      e = ModelManager_1.ModelManager.AdventureGuideModel.GetCanShowDungeonRecordsByType(this.a8e)[1];
      this.Prm?.RefreshByData(this.Dnm(e));
      if (this._8e?.GetCurrentSequence()) {
        this._8e?.ReplaySequenceByKey("Switch");
      } else {
        this._8e?.PlayLevelSequenceByName("Switch");
      }
    };
    this.Urm = e => this.a8e !== e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIItem]];
  }
  Dnm(e) {
    var i;
    var t = [];
    var r = new Map();
    for (const o of e) {
      let e = r.get(o.Conf.DetectionTitlePanel);
      (e = e || []).push(o);
      r.set(o.Conf.DetectionTitlePanel, e);
    }
    for ([, i] of r) {
      if (ModelManager_1.ModelManager.AdventureGuideModel.IsTowerType(i[0].Conf.PeriodicityChallengeType)) {
        i.sort((e, i) => {
          var t = e.GetTargetTowerIsUnlock() ? 1 : 0;
          var r = i.GetTargetTowerIsUnlock() ? 1 : 0;
          if (t != r) {
            return r - t;
          } else {
            r = e.GetTargetTowerDifficulty();
            e = i.GetTargetTowerDifficulty();
            if (t) {
              return e - r;
            } else {
              return r - e;
            }
          }
        });
      }
      for (let e = 0; e < i.length; e++) {
        var s = {
          Data: i[e],
          Title: i[e].Conf.DetectionTitlePanel > 0 && e < 1
        };
        t.push(s);
      }
    }
    return t;
  }
  async OnBeforeStartAsync() {
    await ControllerHolder_1.ControllerHolder.TowerController.RefreshTower();
  }
  OnStart() {
    this.Prm = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.xrm);
    this.r8e = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(2).GetOwner(), this.Arm);
    var e = ModelManager_1.ModelManager.AdventureGuideModel.GetAllCanShowDungeonTypeList("PeriodicityChallengeView");
    this.s8e = e;
    this.l8e = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this._8e = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    this.$8i = this.ExtraParams;
    var e = this.$8i;
    var e = e?.OpenTabViewName === "PeriodicityChallengeView" ? Number(e?.OpenParam) : this.a8e;
    let i = 0;
    if (e !== undefined && (e = this.s8e.indexOf(Number(e))) >= 0) {
      i = e;
    }
    var t = this.s8e.length;
    var r = new Array();
    for (let e = 0; e < t; e++) {
      var s = ModelManager_1.ModelManager.WeeklyRogueModel.CycleId;
      if (this.s8e[e] !== 29 || s !== 0) {
        r.push(this.s8e[e]);
      }
    }
    this.r8e.RefreshByData(r, undefined, () => {
      this.r8e.SelectGridProxy(i, false);
      this.r8e.ScrollToGridIndex(i);
      this.r8e.UnsafeGetGridProxy(i)?.SetSelectToggle();
    });
    this.l8e?.PlayLevelSequenceByName("Start");
  }
  OnBeforeDestroy() {
    this.l8e?.Clear();
    this.l8e = undefined;
    this._8e?.Clear();
    this._8e = undefined;
  }
}
exports.PeriodicityChallengeView = PeriodicityChallengeView;
//# sourceMappingURL=PeriodicityChallengeView.js.map