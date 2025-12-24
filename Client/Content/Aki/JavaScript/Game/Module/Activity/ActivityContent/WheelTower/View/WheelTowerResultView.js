"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerResultView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../../ConfirmBox/ConfirmBoxDefine");
const WheelTowerResultBossList_1 = require("../Component/Result/WheelTowerResultBossList");
const WheelTowerResultRoundItem_1 = require("../Component/Result/WheelTowerResultRoundItem");
const WheelTowerResultScoreList_1 = require("../Component/Result/WheelTowerResultScoreList");
class WheelTowerResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.zz = undefined;
    this.Wtf = undefined;
    this._tf = undefined;
    this.ntf = undefined;
    this.Pe = undefined;
    this.Hea = undefined;
    this.GV_ = undefined;
    this.Bqf = undefined;
    this.FV_ = undefined;
    this.bl = e => {
      if (e === "EnterS") {
        this.Wtf?.Refresh(this.Pe.EndlessMode, this.Pe.CurrentRound, this.Pe.TotalRound);
        this._tf?.Refresh(this.Pe.TotalScore, this.Pe.CurrentScore);
        this.ntf?.Refresh(this.Pe.BossInfoList);
      }
    };
    this.Qtf = () => {
      this.sQl(this.Pe?.LeftButtonData);
    };
    this.Ktf = () => {
      this.sQl(this.Pe?.CenterButtonData);
    };
    this.Xtf = () => {
      this.sQl(this.Pe?.RightButtonData);
    };
    this.sQl = e => {
      var t;
      if (e?.ConfirmBoxId) {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e.ConfirmBoxId)).FunctionMap.set(2, () => {
          e.OnClick();
          this.CloseMe();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      } else {
        e?.OnClick();
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UINiagara], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.Pe = this.OpenParam;
    var e = [];
    e.push(this.kqf());
    this.GV_ = new ButtonItem_1.ButtonItem();
    e.push(this.GV_.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.Bqf = new ButtonItem_1.ButtonItem();
    e.push(this.Bqf.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    this.FV_ = new ButtonItem_1.ButtonItem();
    e.push(this.FV_.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Hea.PlaySequencePurely("Success");
    this.ZGe();
    this.qqf();
  }
  qqf() {
    var e = this.Pe?.ShowEndlessUnlockTips ?? false;
    this.GetItem(7)?.SetUIActive(e);
  }
  ZGe() {
    if (this.Pe?.LeftButtonData) {
      this.GV_?.SetShowText(this.Pe.LeftButtonData.Name);
    }
    if (this.Pe?.CenterButtonData) {
      this.Bqf?.SetShowText(this.Pe.CenterButtonData.Name);
    }
    if (this.Pe?.RightButtonData) {
      this.FV_?.SetShowText(this.Pe.RightButtonData.Name);
    }
    this.GV_?.SetUiActive(this.Pe?.LeftButtonData !== undefined);
    this.Bqf?.SetUiActive(this.Pe?.CenterButtonData !== undefined);
    this.FV_?.SetUiActive(this.Pe?.RightButtonData !== undefined);
    this.GV_?.SetFunction(this.Qtf);
    this.Bqf?.SetFunction(this.Ktf);
    this.FV_?.SetFunction(this.Xtf);
  }
  OnBeforeDestroy() {
    this.Hea?.Clear();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.bl);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.bl);
  }
  async kqf() {
    this.zz = this.GetScrollViewWithScrollbar(3).GetContent().GetUIItem();
    this.Wtf = new WheelTowerResultRoundItem_1.WheelTowerResultRoundItem();
    this._tf = new WheelTowerResultScoreList_1.WheelTowerResultScoreList();
    this.ntf = new WheelTowerResultBossList_1.WheelTowerResultBossList();
    await this.Wtf.CreateByResourceIdAsync("UiItem_WheelTowerRoundDescInfo", this.zz);
    await this._tf.CreateByResourceIdAsync("UiItem_WheelTowerScoreList", this.zz);
    await this.ntf.CreateByResourceIdAsync("UiItem_WheelTowerBossRushGrid", this.zz);
  }
}
exports.WheelTowerResultView = WheelTowerResultView;
//# sourceMappingURL=WheelTowerResultView.js.map