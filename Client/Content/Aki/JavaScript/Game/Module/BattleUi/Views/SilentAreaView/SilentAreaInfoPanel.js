"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SilentAreaInfoPanel = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BossRushController_1 = require("../../../Activity/ActivityContent/BossRush/BossRushController");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BattleChildView_1 = require("../BattleChildView/BattleChildView");
const SilentAreaInfoItem_1 = require("./SilentAreaInfoItem");
class SilentAreaInfoPanel extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.Hmt = false;
    this.jmt = undefined;
    this.TDe = undefined;
    this.SPe = undefined;
    this.e4 = [];
    this.EndShow = () => {
      if (this.TDe) {
        TimerSystem_1.TimerSystem.Remove(this.TDe);
      }
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlayLevelSequenceByName("Close");
    };
    this.eRe = () => {
      this.EndShow();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiToggleSilentAreaInfoView);
    };
  }
  Initialize(e) {
    super.Initialize(e);
  }
  async InitializeAsync() {
    var e = this.GetItem(1);
    var t = new SilentAreaInfoItem_1.SilentAreaInfoItem();
    await t.CreateByActorAsync(e.GetOwner());
    this.e4.push(t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    this.RootItem?.SetAnchorOffsetX(0);
    this.RootItem?.SetAnchorOffsetY(0);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(e => {
      if (e === "Close") {
        this.SetActive(false);
      }
    });
  }
  CreateAndShow(e, t, i) {
    if (this.Hmt) {
      this.UpdateInfo(i);
      this.SetActive(true);
      this.Wmt();
    } else {
      this.NewByResourceId(t, e).finally(() => {
        this.Hmt = true;
        this.UpdateInfo(i);
        this.Wmt();
      });
    }
  }
  OnShowBattleChildView() {
    this.SPe.StopCurrentSequence();
    this.SPe.PlaySequencePurely("Start");
  }
  UpdateInfo(e) {
    this.jmt = e;
    if (this.Hmt) {
      this.Kmt();
    }
  }
  kO_() {
    var e;
    if (this.jmt) {
      if (this.jmt.ShowInfo.Type !== IQuest_1.EInformationViewType.LevelPlay) {
        if (this.jmt.ShowInfo.Type === IQuest_1.EInformationViewType.BossRushBuffInfo && (e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId, e = BossRushController_1.BossRushController.GetBossRushSelectedBuffId(e), e = ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(e))) {
          return [{
            TidMainTitle: "BossRushBuffDesc",
            SubTitles: [{
              TidTitle: e.BuffTitle,
              TidContent: e.BuffDesc
            }]
          }];
        } else {
          return [];
        }
      } else {
        return this.jmt.ShowInfo.InformationConfig;
      }
    } else {
      return [];
    }
  }
  Kmt() {
    if (this.jmt) {
      const r = this.kO_();
      for (let t = 0; t < r.length; t++) {
        var i;
        var s = r[t];
        let e = undefined;
        if (t < this.e4.length) {
          (e = this.e4[t]).SetCurrentShowType(this.jmt.ShowInfo.Type);
          e.UpdateItem(s);
        } else {
          i = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(1), this.GetItem(0));
          (e = new SilentAreaInfoItem_1.SilentAreaInfoItem()).SetCurrentShowType(this.jmt.ShowInfo.Type);
          e.Initialize(i.GetOwner(), s);
          this.e4.push(e);
        }
      }
      this.e4.forEach((e, t) => {
        e.SetActive(t < r.length);
      });
    }
  }
  Wmt() {
    this.TDe = TimerSystem_1.TimerSystem.Delay(this.eRe, 8000);
  }
}
exports.SilentAreaInfoPanel = SilentAreaInfoPanel;
//# sourceMappingURL=SilentAreaInfoPanel.js.map