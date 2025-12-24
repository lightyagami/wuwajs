"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPrizeDrawingTearView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const CommonCurrencyItem_1 = require("../../../Common/CommonCurrencyItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const UiNavigationViewManager_1 = require("../../../UiNavigation/New/UiNavigationViewManager");
const ActivityControllerHolder_1 = require("../../ActivityControllerHolder");
const ActivityButtonItem_1 = require("../UniversalComponents/Functional/ActivityButtonItem");
const PrizeDrawingTearCoverItem_1 = require("./Components/TearItem/PrizeDrawingTearCoverItem");
const ALPHA_TWEEN_DURATION = 0.2;
const TEAR_DAMPING_SPEED = 0.4;
const TEAR_ROTATION_SENSITIVITY = 10;
const TEAR_SHINE_ALPHA_TWEEN_DURATION = 0.5;
const END_ANIM_DELAY = 500;
const MAX_SLIDE_DISTANCE = 110;
const GAMEPAD_OFFSET_X_RANGE = 100;
const GAMEPAD_PROGRESS_TWEEN_DURATION = 0.2;
const TEAR_ROTATION_MAX_ANGLE = 20;
const tearType2AnimName = {
  [0]: "SkipC",
  1: "SkipB",
  2: "SkipB",
  3: "SkipA"
};
class ActivityPrizeDrawingTearView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.bzt = false;
    this.LAm = 0;
    this.PAm = 0;
    this.DAm = undefined;
    this.wAt = undefined;
    this.yGe = undefined;
    this.tSm = undefined;
    this.iSm = undefined;
    this.SPe = undefined;
    this.ac = 0;
    this.Oze = false;
    this.UAm = false;
    this.xAm = false;
    this.B2m = () => {
      this.Oze = Info_1.Info.IsInGamepad();
      if (this.Oze) {
        this.GetItem(6)?.SetUIActive(false);
      } else if (this.ac === 0) {
        this.GetItem(6)?.SetUIActive(true);
      }
    };
    this.Pkc = () => {
      if (!this.iSm?.IsUnOpened()) {
        if (this.CNe.IsAllFinished() || !this.CNe.HaveEnoughCoinToRoll()) {
          this.CloseMe();
        } else {
          this.rSm();
        }
      }
    };
    this._5e = () => {
      this.CloseMe();
    };
    this.Y8d = () => {
      var t;
      if (this.iSm?.IsUnOpened()) {
        this.iSm.SetTearShadowActive(false);
        this.SetGamepadCanPress(false);
        t = tearType2AnimName[this.LAm];
        this.SPe?.PlaySequencePurely(t, true);
      }
    };
    this.yct = t => {
      if (t === "SkipA" || t === "SkipB" || t === "SkipC") {
        this.iSm?.Open(false);
      }
    };
    this.BAm = t => {
      if (t === "Reveal") {
        this.iSm?.PlayRevelAnimation();
      }
    };
    this.Eem = t => {
      this.bzt = true;
      if (this.iSm?.IsUnOpened()) {
        this.$8d(1);
        this.iSm?.OnStartDragging();
      }
      return true;
    };
    this.Iem = t => {
      this.bzt = false;
      if (this.iSm?.IsUnOpened()) {
        this.$8d(0);
        this.iSm?.OnStopDragging();
      }
      return true;
    };
    this.Tem = () => {
      this.SetGamepadCanPress(false);
      if (this.Ikm() !== 0) {
        this.GetItem(9)?.SetUIActive(true);
        this.nSm(this.iSm.GetFxControl(), false, true, TEAR_SHINE_ALPHA_TWEEN_DURATION);
        this.nSm(this.iSm.GetFxControlMinor(), false, true, TEAR_SHINE_ALPHA_TWEEN_DURATION);
        if (TimerSystem_1.GameplayTimerSystem.Has(this.DAm)) {
          TimerSystem_1.GameplayTimerSystem.Remove(this.DAm);
        }
        this.DAm = TimerSystem_1.GameplayTimerSystem.Delay(() => {
          this.q2m();
        }, END_ANIM_DELAY);
      } else {
        this.q2m();
      }
    };
  }
  get CNe() {
    return ActivityControllerHolder_1.ActivityControllerHolder.PrizeDrawingController.ActivityData;
  }
  GetGamepadCanPress() {
    return this.UAm;
  }
  SetGamepadCanPress(t) {
    this.UAm = t;
    UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[0, this._5e], [1, this.Y8d]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.wAt = new ActivityButtonItem_1.ActivityButtonItem();
    t.push(this.wAt.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    var i = new CommonCurrencyItem_1.CommonCurrencyItem();
    t.push(i.CreateThenShowByResourceIdAsync("UiItem_Cost", this.GetItem(5)));
    this.tSm = new PrizeDrawingTearCoverItem_1.PrizeDrawingTearCoverItemBase();
    t.push(this.tSm.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    this.iSm = new PrizeDrawingTearCoverItem_1.PrizeDrawingTearCoverItem();
    t.push(this.iSm.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    await Promise.all(t);
    i.RefreshTemp(this.CNe.GetCostCoinId());
    i.SetButtonActive(false);
    this.iSm.OpenedCallback = this.Tem;
  }
  OnStart() {
    this.yGe = this.GetItem(4);
    var t = this.GetScrollViewWithScrollbar(3);
    t?.OnPointerBeginDragCallBack.Bind(this.Eem);
    t?.OnPointerEndDragCallBack.Bind(this.Iem);
    this.wAt?.SetFunction(this.Pkc);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.SPe.BindSequenceCloseEvent(this.yct);
    this.B2m();
    this.oSm();
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    if (TimerSystem_1.GameplayTimerSystem.Has(this.DAm)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.DAm);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.BAm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.B2m);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.BAm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.B2m);
  }
  OnGamepadPress() {
    this.xAm = true;
    this.Eem(undefined);
  }
  OnGamepadRelease() {
    this.xAm = false;
    this.Iem(undefined);
  }
  OnGamepadHold(t) {
    var t = t >= 1 ? 1 : MathUtils_1.MathUtils.Lerp(this.PAm, t, GAMEPAD_PROGRESS_TWEEN_DURATION);
    this.PAm = t;
    var i = MathUtils_1.MathUtils.Lerp(0, -GAMEPAD_OFFSET_X_RANGE, t);
    this.kAm(i, 0);
    this.iSm?.OnTick(t);
  }
  OnTick() {
    var t;
    var i;
    if (!this.xAm) {
      this.PAm = MathUtils_1.MathUtils.Lerp(this.PAm, 0, GAMEPAD_PROGRESS_TWEEN_DURATION);
      t = this.yGe.GetAnchorOffsetX();
      i = this.yGe.GetAnchorOffsetY();
      this.kAm(t, i);
      if (this.SPe?.GetCurrentSequence() === undefined) {
        i = MathUtils_1.MathUtils.Clamp(-t / MAX_SLIDE_DISTANCE, 0, 1);
        this.iSm?.OnTick(Math.max(i, this.PAm));
      }
    }
  }
  kAm(t, i) {
    var e = this.yGe.RelativeRotation;
    let s = 0;
    let h = 0;
    if (this.bzt) {
      h = -i / TEAR_ROTATION_SENSITIVITY;
      s = t / TEAR_ROTATION_SENSITIVITY;
    }
    i = MathUtils_1.MathUtils.Clamp(s, -TEAR_ROTATION_MAX_ANGLE, TEAR_ROTATION_MAX_ANGLE);
    t = MathUtils_1.MathUtils.Clamp(h, -TEAR_ROTATION_MAX_ANGLE, TEAR_ROTATION_MAX_ANGLE);
    e.Roll = MathUtils_1.MathUtils.Lerp(e.Roll, t, TEAR_DAMPING_SPEED);
    e.Pitch = MathUtils_1.MathUtils.Lerp(e.Pitch, i, TEAR_DAMPING_SPEED);
    this.yGe.SetUIRelativeRotation(e);
  }
  oSm() {
    this.O2m();
    this.z8d().then(() => {
      this.G2m();
    });
  }
  async rSm() {
    this.O2m();
    this.iSm?.Reset();
    this.iSm?.SetUiActive(true);
    var t = [];
    t.push(this.z8d());
    t.push(this.SPe?.PlaySequenceAsync("Next", new CustomPromise_1.CustomPromise(), true));
    await Promise.all(t);
    this.G2m();
  }
  O2m() {
    this.$8d(0, false);
  }
  G2m() {
    this.SetGamepadCanPress(true);
    this.F2m();
    this.GetItem(9)?.SetUIActive(false);
  }
  async z8d() {
    var i = await ActivityControllerHolder_1.ActivityControllerHolder.PrizeDrawingController.GachaRequest();
    if (i === undefined) {
      this.CloseMe();
    } else {
      const e = [];
      i.AOd.forEach(t => {
        var i = ConfigManager_1.ConfigManager.PrizeDrawingConfig.GetKujiAwardsGroupById(t.S9n);
        var i = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(i.RewardId)[0];
        e.push({
          ItemId: i[0].ItemId,
          Count: Object.values(t._vs)[0],
          Times: t.$Us,
          Rare: ConfigManager_1.ConfigManager.PrizeDrawingConfig.GetKujiAwardsGroupById(t.S9n).Rank
        });
      });
      let t = undefined;
      t = i.POd === 1 ? 2 : e[0].Rare === 0 ? 3 : e[0].Times > 1 ? 1 : 0;
      this.LAm = t;
      this.iSm?.RefreshEffectVisible(this.Ikm());
      await this.iSm?.CreateTearItem(e, t);
    }
  }
  F2m() {
    if (this.CNe.IsAllFinished()) {
      this.wAt?.SetShowText("PrefabTextItem_1120255634_Text");
    } else if (this.CNe.HaveEnoughCoinToRoll()) {
      this.wAt?.SetShowText("Ichiban_Kuji_TearAgain");
    } else {
      this.wAt?.SetShowText("Ichiban_Kuji_confirm");
    }
  }
  q2m() {
    this.DAm = undefined;
    var t = this.iSm?.GetTearItem();
    this.tSm?.AttachTearItemToContent(t);
    this.iSm?.SetUiActive(false);
    this.tSm?.SetUiActive(true);
    this.$8d(2);
    this.SPe?.PlaySequencePurely("Next");
    this.SPe?.StopCurrentSequence();
  }
  $8d(t, i = true) {
    this.ac = t;
    this.nSm(this.GetItem(6), t === 0 && !this.Oze, i);
    this.nSm(this.GetButton(1).RootUIComp, t === 0, i);
    this.nSm(this.GetButton(0).RootUIComp, t === 2, i);
    this.nSm(this.wAt.GetRootItem(), t === 2, i);
    this.nSm(this.GetItem(5), t !== 1, i);
  }
  nSm(t, i, e, s) {
    var h;
    if (e) {
      e = i ? 1 : 0;
      if (h = !t.IsUIActiveInHierarchy() && i) {
        t.SetUIActive(true);
      }
      t.PlayUIItemAlphaTween(h ? 0 : t.GetAlpha(), e, s ?? ALPHA_TWEEN_DURATION);
    } else {
      t.SetUIActive(i);
      t.SetAlpha(i ? 1 : 0);
    }
    t.SetRaycastTarget(i);
  }
  Ikm() {
    switch (this.LAm) {
      case 0:
        return 0;
      case 3:
        return 2;
      case 2:
      case 1:
        return 1;
      default:
        return 0;
    }
  }
}
exports.ActivityPrizeDrawingTearView = ActivityPrizeDrawingTearView;
//# sourceMappingURL=ActivityPrizeDrawingTearView.js.map