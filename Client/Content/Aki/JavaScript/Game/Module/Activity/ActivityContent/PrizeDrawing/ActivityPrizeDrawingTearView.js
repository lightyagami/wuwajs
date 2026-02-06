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
    this.FPm = 0;
    this.NPm = 0;
    this.jPm = undefined;
    this.wAt = undefined;
    this.yGe = undefined;
    this.zym = undefined;
    this.Jym = undefined;
    this.SPe = undefined;
    this.ac = 0;
    this.Oze = false;
    this.HPm = false;
    this.$Pm = false;
    this.Ykm = () => {
      this.Oze = Info_1.Info.IsInGamepad();
      if (this.Oze) {
        this.GetItem(6)?.SetUIActive(false);
      } else if (this.ac === 0) {
        this.GetItem(6)?.SetUIActive(true);
      }
    };
    this.Pkc = () => {
      if (!this.Jym?.IsUnOpened()) {
        if (this.CNe.IsAllFinished() || !this.CNe.HaveEnoughCoinToRoll()) {
          this.CloseMe();
        } else {
          this.Zym();
        }
      }
    };
    this._5e = () => {
      this.CloseMe();
    };
    this.Y8d = () => {
      var t;
      if (this.Jym?.IsUnOpened()) {
        this.Jym.SetTearShadowActive(false);
        this.SetGamepadCanPress(false);
        t = tearType2AnimName[this.FPm];
        this.SPe?.PlaySequencePurely(t, true);
      }
    };
    this.yct = t => {
      if (t === "SkipA" || t === "SkipB" || t === "SkipC") {
        this.Jym?.Open(false);
      }
    };
    this.WPm = t => {
      if (t === "Reveal") {
        this.Jym?.PlayRevelAnimation();
      }
    };
    this.Eem = t => {
      this.bzt = true;
      if (this.Jym?.IsUnOpened()) {
        this.$8d(1);
        this.Jym?.OnStartDragging();
      }
      return true;
    };
    this.Iem = t => {
      this.bzt = false;
      if (this.Jym?.IsUnOpened()) {
        this.$8d(0);
        this.Jym?.OnStopDragging();
      }
      return true;
    };
    this.Tem = () => {
      this.SetGamepadCanPress(false);
      if (this.Gqm() !== 0) {
        this.GetItem(9)?.SetUIActive(true);
        this.tSm(this.Jym.GetFxControl(), false, true, TEAR_SHINE_ALPHA_TWEEN_DURATION);
        this.tSm(this.Jym.GetFxControlMinor(), false, true, TEAR_SHINE_ALPHA_TWEEN_DURATION);
        if (TimerSystem_1.GameplayTimerSystem.Has(this.jPm)) {
          TimerSystem_1.GameplayTimerSystem.Remove(this.jPm);
        }
        this.jPm = TimerSystem_1.GameplayTimerSystem.Delay(() => {
          this.Jkm();
        }, END_ANIM_DELAY);
      } else {
        this.Jkm();
      }
    };
  }
  get CNe() {
    return ActivityControllerHolder_1.ActivityControllerHolder.PrizeDrawingController.ActivityData;
  }
  GetGamepadCanPress() {
    return this.HPm;
  }
  SetGamepadCanPress(t) {
    this.HPm = t;
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
    this.zym = new PrizeDrawingTearCoverItem_1.PrizeDrawingTearCoverItemBase();
    t.push(this.zym.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    this.Jym = new PrizeDrawingTearCoverItem_1.PrizeDrawingTearCoverItem();
    t.push(this.Jym.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    await Promise.all(t);
    i.RefreshTemp(this.CNe.GetCostCoinId());
    i.SetButtonActive(false);
    this.Jym.OpenedCallback = this.Tem;
  }
  OnStart() {
    this.yGe = this.GetItem(4);
    var t = this.GetScrollViewWithScrollbar(3);
    t?.OnPointerBeginDragCallBack.Bind(this.Eem);
    t?.OnPointerEndDragCallBack.Bind(this.Iem);
    this.wAt?.SetFunction(this.Pkc);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.SPe.BindSequenceCloseEvent(this.yct);
    this.Ykm();
    this.eSm();
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    if (TimerSystem_1.GameplayTimerSystem.Has(this.jPm)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.jPm);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.WPm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.Ykm);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.WPm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.Ykm);
  }
  OnGamepadPress() {
    this.$Pm = true;
    this.Eem(undefined);
  }
  OnGamepadRelease() {
    this.$Pm = false;
    this.Iem(undefined);
  }
  OnGamepadHold(t) {
    var t = t >= 1 ? 1 : MathUtils_1.MathUtils.Lerp(this.NPm, t, GAMEPAD_PROGRESS_TWEEN_DURATION);
    this.NPm = t;
    var i = MathUtils_1.MathUtils.Lerp(0, -GAMEPAD_OFFSET_X_RANGE, t);
    this.QPm(i, 0);
    this.Jym?.OnTick(t);
  }
  OnTick() {
    var t;
    var i;
    if (!this.$Pm) {
      this.NPm = MathUtils_1.MathUtils.Lerp(this.NPm, 0, GAMEPAD_PROGRESS_TWEEN_DURATION);
      t = this.yGe.GetAnchorOffsetX();
      i = this.yGe.GetAnchorOffsetY();
      this.QPm(t, i);
      if (this.SPe?.GetCurrentSequence() === undefined) {
        i = MathUtils_1.MathUtils.Clamp(-t / MAX_SLIDE_DISTANCE, 0, 1);
        this.Jym?.OnTick(Math.max(i, this.NPm));
      }
    }
  }
  QPm(t, i) {
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
  eSm() {
    this.Zkm();
    this.z8d().then(() => {
      this.eqm();
    });
  }
  async Zym() {
    this.Zkm();
    this.Jym?.Reset();
    this.Jym?.SetUiActive(true);
    var t = [];
    t.push(this.z8d());
    t.push(this.SPe?.PlaySequenceAsync("Next", new CustomPromise_1.CustomPromise(), true));
    await Promise.all(t);
    this.eqm();
  }
  Zkm() {
    this.$8d(0, false);
  }
  eqm() {
    this.SetGamepadCanPress(true);
    this.tqm();
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
      this.FPm = t;
      this.Jym?.RefreshEffectVisible(this.Gqm());
      await this.Jym?.CreateTearItem(e, t);
    }
  }
  tqm() {
    if (this.CNe.IsAllFinished()) {
      this.wAt?.SetShowText("PrefabTextItem_1120255634_Text");
    } else if (this.CNe.HaveEnoughCoinToRoll()) {
      this.wAt?.SetShowText("Ichiban_Kuji_TearAgain");
    } else {
      this.wAt?.SetShowText("Ichiban_Kuji_confirm");
    }
  }
  Jkm() {
    this.jPm = undefined;
    var t = this.Jym?.GetTearItem();
    this.zym?.AttachTearItemToContent(t);
    this.Jym?.SetUiActive(false);
    this.zym?.SetUiActive(true);
    this.$8d(2);
    this.SPe?.PlaySequencePurely("Next");
    this.SPe?.StopCurrentSequence();
  }
  $8d(t, i = true) {
    this.ac = t;
    this.tSm(this.GetItem(6), t === 0 && !this.Oze, i);
    this.tSm(this.GetButton(1).RootUIComp, t === 0, i);
    this.tSm(this.GetButton(0).RootUIComp, t === 2, i);
    this.tSm(this.wAt.GetRootItem(), t === 2, i);
    this.tSm(this.GetItem(5), t !== 1, i);
  }
  tSm(t, i, e, s) {
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
  Gqm() {
    switch (this.FPm) {
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