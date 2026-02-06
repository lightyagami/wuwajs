"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleArrowHpPlayerItem = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const BattleUiTweenAnimPlayer_1 = require("../../../BattleUi/Views/BattleUiTweenAnimPlayer");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const DigitScroll_1 = require("../Utilities/DigitScroll");
const MotorcycleUtil_1 = require("../Utilities/MotorcycleUtil");
const SCROLL_DURATION = 500;
const HURT_EVENT_NAME = "play_ui_moto_battle_hurt_start";
class MotorcycleArrowHpPlayerItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.HpText = undefined;
    this.VNd = undefined;
    this.$pt = undefined;
    this.zna = -1;
    this.Lpi = true;
    this.Aqg = new DigitScroll_1.DigitScroll();
    this.Eah = new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer();
    this.NZf = () => {
      this.InitPlayerData();
    };
    this.IHd = () => {
      this.RefreshHpInfo();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIArtText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    this.HpText = this.GetArtText(1);
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Eah.InitTweenAnim(2, this.GetItem(2));
    this.Eah.InitTweenAnim(3, this.GetItem(3));
    this.Eah.InitTweenAnim(4, this.GetItem(4));
    this.Eah.InitTweenAnim(5, this.GetItem(5));
    this.Aqg.Init(0, 0, SCROLL_DURATION);
  }
  OnBeforeShow() {
    this.OnAddEventListener();
    this.InitPlayerData();
    this.$pt.PlaySequencePurely("Start");
  }
  OnBeforeHide() {
    this.OnRemoveEventListener();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnKscPlayerHpChanged, this.IHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnKscPlayerCreate, this.NZf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnKscPlayerHpChanged, this.IHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnKscPlayerCreate, this.NZf);
  }
  InitPlayerData() {
    var e = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel?.KscPlayerEntity;
    if (e &&= e.GetSkillComp()?.AttrSet_?.Attrs_) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiComponent", 85, "[摩托战斗]UI初始化角色生命值成功");
      }
      this.VNd = e;
      this.RefreshHpInfo();
    }
  }
  RefreshHpInfo() {
    let e = 0;
    if (this.VNd) {
      e = this.VNd.Get(3) ?? 0;
    }
    if (this.zna !== e) {
      if (this.Lpi) {
        this.Aqg.Reset(e);
        this.HpText?.SetText(MotorcycleUtil_1.MotorcycleUtil.CompactNumberFormat(e));
      } else {
        this.Aqg.SetTarget(e);
        this.$pt.StopPlayingSequence();
        if (e > this.zna) {
          this.Eah.PlayTweenAnim(5);
          this.Eah.PlayTweenAnim(3);
        } else {
          this.Eah.PlayTweenAnim(4);
          this.Eah.PlayTweenAnim(2);
          AudioSystem_1.AudioSystem.PostEvent(HURT_EVENT_NAME);
        }
      }
      this.Lpi = false;
      this.zna = e;
    }
  }
  OnTick(e) {
    if (!this.Aqg.IsFinished()) {
      e = this.Aqg.Tick(e);
      this.HpText?.SetText(MotorcycleUtil_1.MotorcycleUtil.CompactNumberFormat(Math.floor(e)));
    }
  }
}
exports.MotorcycleArrowHpPlayerItem = MotorcycleArrowHpPlayerItem;
//# sourceMappingURL=MotorcycleArrowHpPlayerItem.js.map