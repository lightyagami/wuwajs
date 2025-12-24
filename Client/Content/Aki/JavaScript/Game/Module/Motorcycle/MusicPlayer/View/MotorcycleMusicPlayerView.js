"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleMusicPlayerView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const GameSettingsDefine_1 = require("../../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../../GameSettings/GameSettingsManager");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const AutoAttachItem_1 = require("../../../AutoAttach/AutoAttachItem");
const NoCircleAttachView_1 = require("../../../AutoAttach/NoCircleAttachView");
const LongPressButtonItem_1 = require("../../../Common/Button/LongPressButtonItem");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const MotorcycleMusicPlayerDefine_1 = require("../MotorcycleMusicPlayerDefine");
const MAX_OFFSET = 117;
const DESC_SCROLL_SPEED = 30;
const DESC_RESET_WAIT_TIME = 3000;
const DESC_START_WAIT_TIME = 1500;
const CD_ROTATE_SPEED = 0.2;
const ITEM_SPACING = 276;
const SHADOW_START = 70;
const SHADOW_END = 170;
const FORCE_SHOW_ALBUM_COUNT = 7;
const START_SCROLL_COUNT = 3;
class MotorcycleMusicPlayerView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.GPm = new Map();
    this.FPm = undefined;
    this.NPm = -1;
    this.VPm = undefined;
    this.vPm = undefined;
    this.jPm = undefined;
    this.HPm = undefined;
    this.$Pm = undefined;
    this.TDe = undefined;
    this.vJf = undefined;
    this.WPm = 0;
    this.LYm = undefined;
    this.PYm = undefined;
    this.QPm = Rotator_1.Rotator.Create(0, 0, 0);
    this.AYm = false;
    this.Fff = Vector2D_1.Vector2D.Create(0, 0);
    this.Nff = [];
    this.AUf = [];
    this.u6f = undefined;
    this.Vff = () => {
      var i = this.FPm.GetItems();
      this.Nff.length = i.length;
      for (let t = 0; t < i.length; t++) {
        if (this.Nff[t]) {
          this.Nff[t].Distance = Math.abs(i[t].GetCurrentMovePercentage() - 0.5);
          this.Nff[t].UiItem = i[t].GetRootItem();
        } else {
          this.Nff[t] = {
            UiItem: i[t].GetRootItem(),
            Distance: Math.abs(i[t].GetCurrentMovePercentage() - 0.5)
          };
        }
      }
      this.Nff.sort((t, i) => t.Distance - i.Distance);
      let e = false;
      for (let t = 1; t < this.Nff.length; t += 2) {
        var s = this.Nff[t - 1].UiItem.GetHierarchyIndex();
        if (this.Nff[t].UiItem.GetHierarchyIndex() > s || this.Nff[t + 1]?.UiItem.GetHierarchyIndex() > s) {
          e = true;
          break;
        }
      }
      if (e) {
        for (const t of this.Nff) {
          t.UiItem.SetHierarchyIndex(-1);
        }
      }
    };
    this.XPm = () => {
      if (!ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetIsPause()) {
        this.WPm -= CD_ROTATE_SPEED;
        if (this.WPm < -360) {
          this.WPm += 360;
        }
        this.QPm.Yaw = this.WPm;
        this.GetSprite(22).SetUIRelativeRotation(this.QPm.ToUeRotator());
      }
    };
    this.yJf = () => {
      this.zPm();
    };
    this.JPm = () => {
      var t = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayAlbum();
      const i = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayMusicId();
      if (t !== -1 && i !== -1 && this.NPm === t) {
        this._Am();
        this.uAm(this.NPm, false, false, () => {
          var t;
          if (this.xqe && (t = this.AUf.findIndex(t => t.Id === i)) !== -1 && !this.IsItemInViewport(t)) {
            this.xqe.ScrollToGridIndex(t, false);
          }
        });
        this.FPm.RefreshItems();
      } else {
        this.ZPm();
      }
      this.eAm();
    };
    this.tAm = t => {
      t = new MotorcycleAlbumItemGrid(t);
      t.OnSelectAlbumItem = this.KPm;
      t.OnClickAlbumItem = this.iAm;
      t.OnClickBtnPlay = this.rAm;
      return t;
    };
    this.oAm = () => {
      var t = new MotorcycleMusicItemGrid();
      t.OnClickCallback = this.nAm;
      t.OnClickLikeCallback = this.sAm;
      return t;
    };
    this.nAm = t => {
      this.aAm(t);
    };
    this.hAm = () => {
      if (TimerSystem_1.TimerSystem.Has(this.$Pm)) {
        TimerSystem_1.TimerSystem.Remove(this.$Pm);
        this.$Pm = undefined;
      }
      this.$Pm = TimerSystem_1.TimerSystem.Delay(() => {
        this.lAm(0);
      }, DESC_RESET_WAIT_TIME);
    };
    this.lAm = t => {
      this.GetText(10).SetAnchorOffsetX(t);
    };
    this.sAm = t => {
      var i;
      if (t !== -1) {
        if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsMusicNew(t)) {
          ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.ClearMusicNew(t);
        }
        i = ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.RequestToggleMusicFavorite(t);
        if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsMusicFavorite(t)) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorMusicTips05");
        }
        if (this.NPm !== ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
          if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayAlbum() === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
            ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetPlayList(Array.from(ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetFavoriteMusicList()));
          }
          this.ZPm();
        } else {
          this._Am();
          if (i && !this.vPm.includes(t)) {
            this.vPm.unshift(t);
            this.uAm(ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId(), false, true);
          } else {
            this.uAm(ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId(), false, false);
          }
        }
      }
    };
    this.rAm = (t, i) => {
      if (this.NPm !== i) {
        this.FPm?.AttachToIndex(this.VPm.findIndex(t => t.Id === i));
        this.NPm = i;
      }
      var e = this.cAm(i)?.[0];
      if (e) {
        this.aAm(e);
      }
      this.FPm.RefreshItems();
    };
    this.iAm = t => {
      this.FPm?.AttachToIndex(t.GetCurrentShowItemIndex());
    };
    this.KPm = i => {
      if (this.u6f !== undefined) {
        if (i !== this.u6f) {
          return;
        }
        this.u6f = undefined;
      }
      if (this.NPm !== i) {
        var t = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetFavoriteMusicList();
        if (this.NPm === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
          if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayAlbum() === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
            ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetPlayList(Array.from(t));
          }
          this.DYm(false);
        }
        this.NPm = i;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "MotorMusicAlbum", this.VPm.findIndex(t => t.Id === i) + 1, this.VPm.length);
        this.uAm(i, true, false, () => {
          var t = this.AUf.findIndex(t => t.Id === ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayMusicId());
          var t = t !== -1 ? t : 0;
          if (this.xqe.GetDisplayGridNum() !== 0 && (this.IsItemInViewport(t) ? this.xqe.ResetGridController() : this.xqe.ScrollToGridIndex(t, true), t = this.xqe.GetGrid(t)) && Info_1.Info.IsInGamepad()) {
            ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(t);
          }
        });
        this.GetButton(5).RootUIComp.SetUIActive(this.NPm === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId() && (this.vPm?.length ?? 0) >= 2);
        this.GetButton(26)?.RootUIComp.SetUIActive(this.FPm.GetCurrentSelectIndex() < this.VPm.length - 1);
        this.GetButton(27)?.RootUIComp.SetUIActive(this.FPm.GetCurrentSelectIndex() > 0);
        this.GetButton(19).RootUIComp.SetUIActive(this.NPm !== ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId());
        for (const e of this.VPm) {
          e.IsSelected = e.Id === this.NPm;
        }
        this.FPm?.RefreshItems();
      }
    };
    this.dAm = () => {
      var t;
      if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetFavoriteMusicList().length >= 2) {
        t = {
          MusicList: this.vPm,
          OnCallback: this.UYm
        };
        UiManager_1.UiManager.OpenView("MotorcycleMusicSortView", t);
      }
    };
    this.UYm = t => {
      this.vPm = t;
      this.uAm(this.NPm, false, true);
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetPlayList(this.vPm);
    };
    this.mAm = () => {
      this.sAm(ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayMusicId());
    };
    this.i71 = () => {
      ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.QuickPlayMusic(false);
      this.xYm();
    };
    this.fAm = () => {
      if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetIsPause()) {
        ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.ResumeMusic();
      } else {
        ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.PauseMusic();
      }
      this.xYm();
      this.ZPm();
    };
    this.XRo = () => {
      ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.QuickPlayMusic();
      this.xYm();
    };
    this.Hff = () => {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.ResetNavigationFocusForViewWithDirtyCheck();
      this.FPm?.AttachToNextItem(1);
    };
    this.jff = () => {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.ResetNavigationFocusForViewWithDirtyCheck();
      this.FPm?.AttachToNextItem(-1);
    };
    this.gAm = () => {
      let t = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetPlayMode();
      switch (t) {
        case 0:
          t = 1;
          break;
        case 1:
          t = 2;
          break;
        case 2:
          t = 0;
      }
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetCurPlayMode(t);
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(MotorcycleMusicPlayerDefine_1.motorPlayModeName[t]);
      this.CAm();
    };
    this.pAm = () => {
      this.FPm?.AttachToIndex(this.VPm.findIndex(t => t.Id === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIText], [12, UE.UISprite], [13, UE.UIText], [14, UE.UIExtendToggle], [15, UE.UIButtonComponent], [16, UE.UIExtendToggle], [17, UE.UIButtonComponent], [18, UE.UIButtonComponent], [19, UE.UIButtonComponent], [20, UE.UILoopScrollViewComponent], [21, UE.UISprite], [22, UE.UISprite], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIButtonComponent], [27, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.dAm], [14, this.mAm], [15, this.i71], [16, this.fAm], [17, this.XRo], [18, this.gAm], [19, this.pAm], [26, this.Hff], [27, this.jff]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMotorSwitchMusic, this.JPm);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMotorSwitchMusic, this.JPm);
  }
  async LoadCurveResource() {
    const i = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetRotateCurvePath(), UE.CurveFloat, t => {
      MotorcycleAlbumItemGrid.RotateCurve = t;
      i.SetResult(t);
    });
    const e = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetScaleCurvePath(), UE.CurveFloat, t => {
      MotorcycleAlbumItemGrid.ScaleCurve = t;
      e.SetResult(t);
    });
    const s = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetAlphaCurvePath(), UE.CurveFloat, t => {
      MotorcycleAlbumItemGrid.AlphaCurve = t;
      s.SetResult(t);
    });
    await Promise.all([i.Promise, e.Promise, s.Promise]);
  }
  async OnBeforeStartAsync() {
    this.jPm = (0, puerts_1.toManualReleaseDelegate)(this.lAm);
    await this.LoadCurveResource();
    this.LYm = this.GetItem(24)?.GetOwner()?.GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    this.PYm = this.GetItem(25)?.GetOwner()?.GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0)).SetCloseCallBack(this.CloseMe.bind(this));
    this.Jfo();
    this.c6f();
    this.d6f();
    let i = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayAlbum();
    if (i === -1) {
      ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.PlayDefaultMusic();
      i = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayAlbum();
    }
    this.kYm(i);
    this.u6f = i;
    this.FPm.ReloadView(this.VPm.length, this.VPm);
    var t = this.VPm.findIndex(t => t.Id === i);
    this.FPm.AttachToIndex(Math.max(t - START_SCROLL_COUNT, 0), true);
    this.FPm.AttachToIndex(t, false);
    this.TDe = TimerSystem_1.TimerSystem.Forever(this.XPm, TimerSystem_1.MIN_TIME);
    this.vJf = TimerSystem_1.TimerSystem.Forever(this.yJf, CommonDefine_1.MILLIONSECOND_PER_SECOND);
    this.CAm();
    this._Am();
    this.zPm();
    this.eAm();
    this.xYm();
    var t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.MUSICVOLUMEFUNCTION);
    var e = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.MASTERVOLUMEFUNCTION);
    if (t === 0 || e === 0) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorMusicTips01");
    }
  }
  Jfo() {
    this.FPm = new NoCircleAttachView_1.NoCircleAttachView(this.GetItem(2).GetOwner(), true);
    this.GetItem(3)?.SetUIActive(false);
    this.FPm.CreateItems(this.GetItem(3).GetOwner(), -(this.GetItem(3).GetWidth() - ITEM_SPACING), this.tAm, 0);
    this.FPm.SetShowItemNum(FORCE_SHOW_ALBUM_COUNT);
    this.FPm.SetMoveItemsCallback(this.Vff);
    this.FPm.SetMoveMultiFactor(ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetAlbumVelocity());
    var t = this.GetLoopScrollViewComponent(20);
    var i = this.GetItem(7)?.GetOwner();
    if (t && i) {
      this.xqe = new LoopScrollView_1.LoopScrollView(t, i, this.oAm);
    }
  }
  d6f() {
    const t = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicList() ?? [];
    for (const i of t) {
      i.Album.forEach(t => {
        if (!this.GPm.has(t)) {
          this.GPm.set(t, []);
        }
        this.GPm.get(t).push(i.Id);
      });
    }
    this.vPm = Array.from(ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetFavoriteMusicList());
    for (const t of this.GPm.values()) {
      const s = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel;
      t.sort((t, i) => {
        var e = s.IsMusicUnlock(t);
        if (e !== s.IsMusicUnlock(i)) {
          if (e) {
            return -1;
          } else {
            return 1;
          }
        } else {
          return t - i;
        }
      });
    }
  }
  c6f() {
    var t = new LongPressButtonItem_1.LongPressButtonItem(this.GetButton(26), 1, this.Hff);
    var i = new LongPressButtonItem_1.LongPressButtonItem(this.GetButton(27), 1, this.jff);
    t.ShouldPlayLongPressSound = true;
    i.ShouldPlayLongPressSound = true;
  }
  OnBeforeShow() {
    var t = this.RootItem.GetRootCanvas().GetViewportSize();
    var i = MathUtils_1.MathUtils.RangeClamp(this.GetItem(2).GetPositionInScreen(true).X, 0, t.X, -1, 1);
    var t = MathUtils_1.MathUtils.RangeClamp(this.GetItem(2).GetPositionInScreen(true).Y, 0, t.Y, 1, -1);
    this.Fff.X = -i;
    this.Fff.Y = -t;
    UiLayer_1.UiLayer.UiRootItem.GetRootCanvas().ProjectCenterOffset = this.Fff.ToUeVector2D();
  }
  OnAfterHide() {
    UiLayer_1.UiLayer.UiRootItem.GetRootCanvas().ProjectCenterOffset = Vector2D_1.Vector2D.ZeroVector;
  }
  kYm(i) {
    var t = (ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicAlbumList() ?? []).map(t => ({
      Id: t.Id,
      Config: t,
      UnlockMusicNum: ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetUnlockMusicByAlbum(t.Id).length,
      AllMusicNum: this.GPm.get(t.Id)?.length ?? 0,
      IsSelected: t.Id === i
    }));
    t.sort((t, i) => t.Config.SortIndex - i.Config.SortIndex);
    this.VPm = t;
  }
  OnBeforeDestroy() {
    if (this.jPm) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.lAm);
      this.jPm = undefined;
    }
    if (TimerSystem_1.TimerSystem.Has(this.$Pm)) {
      TimerSystem_1.TimerSystem.Remove(this.$Pm);
      this.$Pm = undefined;
    }
    if (this.TDe) {
      TimerSystem_1.TimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
    if (this.vJf) {
      TimerSystem_1.TimerSystem.Remove(this.vJf);
      this.vJf = undefined;
    }
    this.vAm();
    if (this.NPm === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
      this.DYm(true);
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetPlayList(Array.from(ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetFavoriteMusicList()));
    }
    ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.SendFavoriteUpdateRequest();
    UiLayer_1.UiLayer.UiRootItem.GetRootCanvas().ProjectCenterOffset = Vector2D_1.Vector2D.ZeroVector;
    ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.ClearAlbum2MusicCache();
    MotorcycleAlbumItemGrid.RotateCurve = undefined;
    MotorcycleAlbumItemGrid.ScaleCurve = undefined;
    MotorcycleAlbumItemGrid.AlphaCurve = undefined;
  }
  DYm(t = 0) {
    var i;
    if (this.vPm) {
      i = this.vPm.filter(t => ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsMusicFavorite(t));
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetFavoriteMusicList(i);
    }
  }
  eAm() {
    this.lAm(0);
    if (TimerSystem_1.TimerSystem.Has(this.$Pm)) {
      TimerSystem_1.TimerSystem.Remove(this.$Pm);
    }
    this.vAm();
    this.$Pm = TimerSystem_1.TimerSystem.Delay(() => {
      var t = this.GetItem(9).Width;
      var i = this.GetText(10).Width;
      if (t < i) {
        this.vAm();
        this.HPm = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.jPm, 0, t - i, (i - t) / DESC_SCROLL_SPEED, 0, 0);
        this.HPm.OnCompleteCallBack.Bind(this.hAm);
      }
    }, DESC_START_WAIT_TIME);
  }
  vAm() {
    if (this.HPm) {
      this.HPm.Kill();
      this.HPm = undefined;
    }
  }
  aAm(t) {
    if (this.NPm === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetPlayList(this.vPm ?? []);
    } else if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayAlbum() !== this.NPm && this.NPm !== ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetPlayList(ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetUnlockMusicByAlbum(this.NPm).map(t => t.Id));
    }
    ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.PlayAlbumMusic(this.NPm, t);
    this.xYm();
  }
  _Am() {
    var t;
    var i = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayMusicId();
    if (i !== -1 && (t = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(i))) {
      this.GetText(8).ShowTextNew(t.Title);
      t = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(t.Desc).replace(/[\n]+/g, " ");
      this.GetText(10).SetText(t);
      t = !ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetIsPause();
      this.GetExtendToggle(16).SetToggleStateForce(t ? 1 : 0);
      t = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel?.IsMusicFavorite(i);
      this.GetExtendToggle(14).SetToggleStateForce(t ? 1 : 0);
      this.zPm();
    }
  }
  zPm() {
    var t = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel;
    var i = ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.GetCurrentPlayTimeFromAudio();
    let e = i / t.CurrentPlayMusicTotalTime;
    if (t.CurrentPlayMusicTotalTime === 0) {
      e = 0;
    }
    this.GetSprite(12).SetFillAmount(e);
    this.GetText(11).SetText(TimeUtil_1.TimeUtil.GetTimeDataFormat(i));
    this.GetText(13).SetText("/" + TimeUtil_1.TimeUtil.GetTimeDataFormat(t.CurrentPlayMusicTotalTime));
  }
  cAm(t) {
    if (t !== ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
      return this.GPm.get(t);
    } else {
      return this.vPm;
    }
  }
  uAm(t, i = false, e = false, s) {
    let r = this.GPm.get(t);
    if (t === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
      if (i) {
        r = Array.from(ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetFavoriteMusicList());
        this.vPm = r;
      } else {
        r = this.vPm;
      }
    }
    t = (r = r === undefined ? [] : r).map(t => {
      return {
        Id: t,
        IsFavorite: ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsMusicFavorite(t)
      };
    });
    this.AUf = t;
    this.xqe.RefreshByData(t, false, s, e);
    this.GetItem(23)?.SetUIActive(t.length === 0);
  }
  ZPm() {
    this._Am();
    this.uAm(this.NPm);
    this.FPm.RefreshItems();
  }
  CAm() {
    this.SetSpriteByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(MotorcycleMusicPlayerDefine_1.motorMusicPlayModeIcon[ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetPlayMode()]), this.GetSprite(21), false);
  }
  xYm() {
    var t = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetIsPause();
    if (t !== this.AYm) {
      if (this.AYm = t) {
        this.LYm?.Stop();
        this.PYm?.Play();
      } else {
        this.LYm?.Play();
        this.PYm?.Stop();
      }
    }
  }
  IsItemInViewport(t, i = 0) {
    var e;
    var s;
    var r;
    return !!this.xqe && !!this.xqe.IsGridDisplaying(t) && !!(t = this.xqe.GetGrid(t)) && !(e = (r = this.GetLoopScrollViewComponent(20)).ContentUIItem, r = r.GetViewport()?.GetUIItem(), !e) && !!r && !(s = t.GetAnchorOffsetY(), t = t.GetHeight(), r = r.GetHeight(), -s < e.GetAnchorOffsetY()) && !(-s + t > e.GetAnchorOffsetY() + r);
  }
}
exports.MotorcycleMusicPlayerView = MotorcycleMusicPlayerView;
class MotorcycleAlbumItemGrid extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments);
    this.OnSelectAlbumItem = undefined;
    this.OnClickAlbumItem = undefined;
    this.OnClickBtnPlay = undefined;
    this.yAm = undefined;
    this.TmpVector = Vector_1.Vector.Create(0, 0, 0);
    this.TmpRotate = Rotator_1.Rotator.Create(0, 0, 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
    this.BtnBindInfo = [[0, this.SAm.bind(this)], [4, this.MAm.bind(this)]];
  }
  GetAlbumData() {
    return this.yAm;
  }
  SAm(t) {
    if (this.yAm) {
      this.OnClickAlbumItem?.(this, this.yAm.Id);
    }
  }
  MAm() {
    if (this.yAm) {
      this.OnClickBtnPlay?.(this, this.yAm.Id);
    }
  }
  EAm() {
    if (this.yAm) {
      if (this.yAm.Id === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
        return ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetFavoriteMusicList().length;
      } else {
        return this.yAm.UnlockMusicNum;
      }
    } else {
      return 0;
    }
  }
  _Oe() {
    var t;
    var i;
    var e;
    if (this.yAm) {
      i = (t = this.EAm() > 0) && ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayAlbum() === this.yAm.Id;
      e = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetIsPause();
      this.GetItem(5).SetUIActive(i && !e);
      this.GetButton(4).RootUIComp.SetUIActive(t && !i && this.SelectState);
      this.GetItem(11)?.SetUIActive(i && e);
    }
  }
  OnRefreshItem(t) {
    var i;
    var e;
    if (t) {
      i = (this.yAm = t).Config;
      this.GetText(2)?.ShowTextNew(i.Title);
      if (t.Id === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
        this.GetText(3)?.SetText(ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetFavoriteMusicList().length.toString());
      } else {
        this.GetText(3)?.SetText(t.UnlockMusicNum + "/" + t.AllMusicNum);
      }
      e = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.CheckAlbumHasNewMusic(t.Id);
      this.GetItem(10)?.SetUIActive(e);
      this.SetTextureByPath(i.Cover, this.GetTexture(8));
      this.GetItem(1)?.SetUIActive(t.Id === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId());
      this.GetExtendToggle(0).SetToggleStateForce(t.IsSelected ? 1 : 0);
      this._Oe();
    }
  }
  OnSelect() {
    this.GetExtendToggle(0).SetToggleStateForce(1);
    if (this.yAm) {
      this.OnSelectAlbumItem?.(this.yAm.Id);
    }
  }
  OnUnSelect() {
    this.GetExtendToggle(0).SetToggleStateForce(0);
  }
  OnMoveItem() {
    var t = this.GetCurrentMovePercentage();
    let i = MathUtils_1.MathUtils.RangeClamp(Math.abs(this.RootItem.GetAnchorOffsetX()), ITEM_SPACING, ITEM_SPACING * 2, 0, MAX_OFFSET);
    if (t > 0.5) {
      i = -i;
    }
    this.GetItem(9)?.SetAnchorOffsetX(i);
    var t = this.RootItem.GetAnchorOffsetX() + i;
    this.TmpRotate.Pitch = MotorcycleAlbumItemGrid.RotateCurve.GetFloatValue(t);
    var e = MotorcycleAlbumItemGrid.AlphaCurve.GetFloatValue(t);
    this.RootItem?.SetAlpha(e);
    e = MotorcycleAlbumItemGrid.ScaleCurve.GetFloatValue(t);
    this.GetItem(9).SetUIRelativeRotation(this.TmpRotate.ToUeRotator());
    this.TmpVector.Set(e, e, e);
    this.GetItem(9).SetUIItemScale(this.TmpVector.ToUeVectorOld());
    if (t > SHADOW_START) {
      this.GetItem(6)?.SetUIActive(true);
      this.GetItem(6)?.SetAlpha(MathUtils_1.MathUtils.RangeClamp(t, SHADOW_START, SHADOW_END, 0, 1));
    } else {
      this.GetItem(6)?.SetUIActive(false);
    }
    if (t < -SHADOW_START) {
      this.GetItem(7)?.SetUIActive(true);
      this.GetItem(7)?.SetAlpha(MathUtils_1.MathUtils.RangeClamp(t, -SHADOW_START, -SHADOW_END, 0, 1));
    } else {
      this.GetItem(7)?.SetUIActive(false);
    }
  }
}
MotorcycleAlbumItemGrid.RotateCurve = undefined;
MotorcycleAlbumItemGrid.ScaleCurve = undefined;
MotorcycleAlbumItemGrid.AlphaCurve = undefined;
class MotorcycleMusicItemGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OnClickCallback = undefined;
    this.OnClickLikeCallback = undefined;
    this.xe = -1;
    this.THm = () => {
      if (this.xe !== -1) {
        UiManager_1.UiManager.OpenView("MotorcycleMusicDetailView", this.xe);
      }
    };
    this.IAm = () => {
      if (this.xe !== -1 && ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsMusicUnlock(this.xe)) {
        this.OnClickCallback?.(this.xe);
      }
    };
    this.TAm = () => {
      if (this.xe !== -1) {
        if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsMusicUnlock(this.xe)) {
          this.OnClickLikeCallback?.(this.xe);
        } else {
          this.IHe();
          UiManager_1.UiManager.OpenView("MotorcycleMusicDetailView", this.xe);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText], [3, UE.UIExtendToggle], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UIItem]];
    this.BtnBindInfo = [[0, this.IAm], [3, this.TAm]];
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleStateForce(1);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleStateForce(0);
  }
  OnStart() {
    this.GetExtendToggle(0).OnUndeterminedClicked.Add(this.THm);
  }
  IHe() {
    this.GetExtendToggle(3)?.SetToggleStateForce(ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsMusicFavorite(this.xe) ? 1 : 0, false, true);
  }
  Refresh(t, i, e) {
    this.xe = t.Id;
    var s;
    var r;
    var t = t.Id;
    var h = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(t);
    if (h) {
      this.xe = t;
      t = (s = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsMusicUnlock(t)) && ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayMusicId() === t;
      r = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetIsPause();
      this.IHe();
      this.GetItem(4)?.SetUIActive(ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsMusicNew(this.xe));
      this.GetExtendToggle(0).SetToggleStateForce(ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayMusicId() === this.xe ? 1 : 0, false, false, true);
      if (!s) {
        this.GetExtendToggle(0).SetToggleStateForce(2);
      }
      this.GetSprite(7)?.SetUIActive(!s);
      this.GetItem(6)?.SetUIActive(t && !r);
      this.GetItem(5)?.SetUIActive(s && !t);
      this.GetItem(8)?.SetUIActive(t && r);
      this.GetText(1)?.ShowTextNew(h.Title);
      this.GetExtendToggle(3)?.RootUIComp?.SetUIActive(s);
      ModelManager_1.ModelManager.PhonographModel.GetMusicDuration(this.xe).then(t => this.GetText(2)?.SetText(TimeUtil_1.TimeUtil.GetTimeDataFormat(Math.trunc(t))));
    }
  }
}
//# sourceMappingURL=MotorcycleMusicPlayerView.js.map