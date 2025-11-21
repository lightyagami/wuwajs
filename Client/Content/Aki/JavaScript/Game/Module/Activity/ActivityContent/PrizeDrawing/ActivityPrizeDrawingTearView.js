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
    this.Lym = 0;
    this.Pym = 0;
    this.Dym = undefined;
    this.wAt = undefined;
    this.yGe = undefined;
    this.Kfm = undefined;
    this.Xfm = undefined;
    this.SPe = undefined;
    this.ac = 0;
    this.Oze = false;
    this.Uym = false;
    this.xym = false;
    this.vEm = () => {
      this.Oze = Info_1.Info.IsInGamepad();
      if (this.Oze) {
        this.GetItem(6)?.SetUIActive(false);
      } else if (this.ac === 0) {
        this.GetItem(6)?.SetUIActive(true);
      }
    };
    this.Pkc = () => {
      if (!this.Xfm?.IsUnOpened()) {
        if (this.CNe.IsAllFinished() || !this.CNe.HaveEnoughCoinToRoll()) {
          this.CloseMe();
        } else {
          this.Yfm();
        }
      }
    };
    this._5e = () => {
      this.CloseMe();
    };
    this.Y8d = () => {
      var t;
      if (this.Xfm?.IsUnOpened()) {
        this.Xfm.SetTearShadowActive(false);
        this.SetGamepadCanPress(false);
        t = tearType2AnimName[this.Lym];
        this.SPe?.PlaySequencePurely(t, true);
      }
    };
    this.yct = t => {
      if (t === "SkipA" || t === "SkipB" || t === "SkipC") {
        this.Xfm?.Open(false);
      }
    };
    this.Bym = t => {
      if (t === "Reveal") {
        this.Xfm?.PlayRevelAnimation();
      }
    };
    this.YJd = t => {
      this.bzt = true;
      if (this.Xfm?.IsUnOpened()) {
        this.$8d(1);
        this.Xfm?.OnStartDragging();
      }
      return true;
    };
    this.zJd = t => {
      this.bzt = false;
      if (this.Xfm?.IsUnOpened()) {
        this.$8d(0);
        this.Xfm?.OnStopDragging();
      }
      return true;
    };
    this.JJd = () => {
      this.SetGamepadCanPress(false);
      if (this.WEm() !== 0) {
        this.GetItem(9)?.SetUIActive(true);
        this.Jfm(this.Xfm.GetFxControl(), false, true, TEAR_SHINE_ALPHA_TWEEN_DURATION);
        this.Jfm(this.Xfm.GetFxControlMinor(), false, true, TEAR_SHINE_ALPHA_TWEEN_DURATION);
        if (TimerSystem_1.GameplayTimerSystem.Has(this.Dym)) {
          TimerSystem_1.GameplayTimerSystem.Remove(this.Dym);
        }
        this.Dym = TimerSystem_1.GameplayTimerSystem.Delay(() => {
          this.SEm();
        }, END_ANIM_DELAY);
      } else {
        this.SEm();
      }
    };
  }
  get CNe() {
    return ActivityControllerHolder_1.ActivityControllerHolder.PrizeDrawingController.ActivityData;
  }
  GetGamepadCanPress() {
    return this.Uym;
  }
  SetGamepadCanPress(t) {
    this.Uym = t;
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
    this.Kfm = new PrizeDrawingTearCoverItem_1.PrizeDrawingTearCoverItemBase();
    t.push(this.Kfm.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    this.Xfm = new PrizeDrawingTearCoverItem_1.PrizeDrawingTearCoverItem();
    t.push(this.Xfm.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    await Promise.all(t);
    i.RefreshTemp(this.CNe.GetCostCoinId());
    i.SetButtonActive(false);
    this.Xfm.OpenedCallback = this.JJd;
  }
  OnStart() {
    this.yGe = this.GetItem(4);
    var t = this.GetScrollViewWithScrollbar(3);
    t?.OnPointerBeginDragCallBack.Bind(this.YJd);
    t?.OnPointerEndDragCallBack.Bind(this.zJd);
    this.wAt?.SetFunction(this.Pkc);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.SPe.BindSequenceCloseEvent(this.yct);
    this.vEm();
    this.zfm();
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    if (TimerSystem_1.GameplayTimerSystem.Has(this.Dym)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.Dym);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Bym);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.vEm);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Bym);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.vEm);
  }
  OnGamepadPress() {
    this.xym = true;
    this.YJd(undefined);
  }
  OnGamepadRelease() {
    this.xym = false;
    this.zJd(undefined);
  }
  OnGamepadHold(t) {
    var t = t >= 1 ? 1 : MathUtils_1.MathUtils.Lerp(this.Pym, t, GAMEPAD_PROGRESS_TWEEN_DURATION);
    this.Pym = t;
    var i = MathUtils_1.MathUtils.Lerp(0, -GAMEPAD_OFFSET_X_RANGE, t);
    this.kym(i, 0);
    this.Xfm?.OnTick(t);
  }
  OnTick() {
    var t;
    var i;
    if (!this.xym) {
      this.Pym = MathUtils_1.MathUtils.Lerp(this.Pym, 0, GAMEPAD_PROGRESS_TWEEN_DURATION);
      t = this.yGe.GetAnchorOffsetX();
      i = this.yGe.GetAnchorOffsetY();
      this.kym(t, i);
      if (this.SPe?.GetCurrentSequence() === undefined) {
        i = MathUtils_1.MathUtils.Clamp(-t / MAX_SLIDE_DISTANCE, 0, 1);
        this.Xfm?.OnTick(Math.max(i, this.Pym));
      }
    }
  }
  kym(t, i) {
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
  zfm() {
    this.MEm();
    this.z8d().then(() => {
      this.EEm();
    });
  }
  async Yfm() {
    this.MEm();
    this.Xfm?.Reset();
    this.Xfm?.SetUiActive(true);
    var t = [];
    t.push(this.z8d());
    t.push(this.SPe?.PlaySequenceAsync("Next", new CustomPromise_1.CustomPromise(), true));
    await Promise.all(t);
    this.EEm();
  }
  MEm() {
    this.$8d(0, false);
  }
  EEm() {
    this.SetGamepadCanPress(true);
    this.IEm();
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
      this.Lym = t;
      this.Xfm?.RefreshEffectVisible(this.WEm());
      await this.Xfm?.CreateTearItem(e, t);
    }
  }
  IEm() {
    if (this.CNe.IsAllFinished()) {
      this.wAt?.SetShowText("PrefabTextItem_1120255634_Text");
    } else if (this.CNe.HaveEnoughCoinToRoll()) {
      this.wAt?.SetShowText("Ichiban_Kuji_TearAgain");
    } else {
      this.wAt?.SetShowText("Ichiban_Kuji_confirm");
    }
  }
  SEm() {
    this.Dym = undefined;
    var t = this.Xfm?.GetTearItem();
    this.Kfm?.AttachTearItemToContent(t);
    this.Xfm?.SetUiActive(false);
    this.Kfm?.SetUiActive(true);
    this.$8d(2);
    this.SPe?.PlaySequencePurely("Next");
    this.SPe?.StopCurrentSequence();
  }
  $8d(t, i = true) {
    this.ac = t;
    this.Jfm(this.GetItem(6), t === 0 && !this.Oze, i);
    this.Jfm(this.GetButton(1).RootUIComp, t === 0, i);
    this.Jfm(this.GetButton(0).RootUIComp, t === 2, i);
    this.Jfm(this.wAt.GetRootItem(), t === 2, i);
    this.Jfm(this.GetItem(5), t !== 1, i);
  }
  Jfm(t, i, e, s) {
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
  WEm() {
    switch (this.Lym) {
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