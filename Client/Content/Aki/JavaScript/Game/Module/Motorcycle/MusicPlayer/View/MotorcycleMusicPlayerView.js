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
    this.oUm = new Map();
    this.nUm = undefined;
    this.sUm = -1;
    this.aUm = undefined;
    this.ODm = undefined;
    this.hUm = undefined;
    this.lUm = undefined;
    this._Um = undefined;
    this.TDe = undefined;
    this.dCg = undefined;
    this.uUm = 0;
    this.ZJm = undefined;
    this.eZm = undefined;
    this.cUm = Rotator_1.Rotator.Create(0, 0, 0);
    this.tZm = false;
    this.pCf = Vector2D_1.Vector2D.Create(0, 0);
    this.vCf = [];
    this.cGf = [];
    this.bzf = undefined;
    this.yCf = () => {
      var i = this.nUm.GetItems();
      this.vCf.length = i.length;
      for (let t = 0; t < i.length; t++) {
        if (this.vCf[t]) {
          this.vCf[t].Distance = Math.abs(i[t].GetCurrentMovePercentage() - 0.5);
          this.vCf[t].UiItem = i[t].GetRootItem();
        } else {
          this.vCf[t] = {
            UiItem: i[t].GetRootItem(),
            Distance: Math.abs(i[t].GetCurrentMovePercentage() - 0.5)
          };
        }
      }
      this.vCf.sort((t, i) => t.Distance - i.Distance);
      let e = false;
      for (let t = 1; t < this.vCf.length; t += 2) {
        var s = this.vCf[t - 1].UiItem.GetHierarchyIndex();
        if (this.vCf[t].UiItem.GetHierarchyIndex() > s || this.vCf[t + 1]?.UiItem.GetHierarchyIndex() > s) {
          e = true;
          break;
        }
      }
      if (e) {
        for (const t of this.vCf) {
          t.UiItem.SetHierarchyIndex(-1);
        }
      }
    };
    this.mUm = () => {
      if (!ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetIsPause()) {
        this.uUm -= CD_ROTATE_SPEED;
        if (this.uUm < -360) {
          this.uUm += 360;
        }
        this.cUm.Yaw = this.uUm;
        this.GetSprite(22).SetUIRelativeRotation(this.cUm.ToUeRotator());
      }
    };
    this.mCg = () => {
      this.gUm();
    };
    this.CUm = () => {
      var t = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayAlbum();
      const i = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayMusicId();
      if (t !== -1 && i !== -1 && this.sUm === t) {
        this.LUm();
        this.PUm(this.sUm, false, false, () => {
          var t;
          if (this.xqe && (t = this.cGf.findIndex(t => t.Id === i)) !== -1 && !this.IsItemInViewport(t)) {
            this.xqe.ScrollToGridIndex(t, false);
          }
        });
        this.nUm.RefreshItems();
      } else {
        this.pUm();
      }
      this.vUm();
    };
    this.yUm = t => {
      t = new MotorcycleAlbumItemGrid(t);
      t.OnSelectAlbumItem = this.dUm;
      t.OnClickAlbumItem = this.SUm;
      t.OnClickBtnPlay = this.MUm;
      return t;
    };
    this.EUm = () => {
      var t = new MotorcycleMusicItemGrid();
      t.OnClickCallback = this.IUm;
      t.OnClickLikeCallback = this.TUm;
      return t;
    };
    this.IUm = t => {
      this.bUm(t);
    };
    this.RUm = () => {
      if (TimerSystem_1.TimerSystem.Has(this._Um)) {
        TimerSystem_1.TimerSystem.Remove(this._Um);
        this._Um = undefined;
      }
      this._Um = TimerSystem_1.TimerSystem.Delay(() => {
        this.wUm(0);
      }, DESC_RESET_WAIT_TIME);
    };
    this.wUm = t => {
      this.GetText(10).SetAnchorOffsetX(t);
    };
    this.TUm = t => {
      var i;
      if (t !== -1) {
        if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsMusicNew(t)) {
          ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.ClearMusicNew(t);
        }
        i = ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.RequestToggleMusicFavorite(t);
        if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsMusicFavorite(t)) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorMusicTips05");
        }
        if (this.sUm !== ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
          if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayAlbum() === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
            ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetPlayList(Array.from(ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetFavoriteMusicList()));
          }
          this.pUm();
        } else {
          this.LUm();
          if (i && !this.ODm.includes(t)) {
            this.ODm.unshift(t);
            this.PUm(ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId(), false, true);
          } else {
            this.PUm(ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId(), false, false);
          }
        }
      }
    };
    this.MUm = (t, i) => {
      if (this.sUm !== i) {
        this.nUm?.AttachToIndex(this.aUm.findIndex(t => t.Id === i));
        this.sUm = i;
      }
      var e = this.AUm(i)?.[0];
      if (e) {
        this.bUm(e);
      }
      this.nUm.RefreshItems();
    };
    this.SUm = t => {
      this.nUm?.AttachToIndex(t.GetCurrentShowItemIndex());
    };
    this.dUm = i => {
      if (this.bzf !== undefined) {
        if (i !== this.bzf) {
          return;
        }
        this.bzf = undefined;
      }
      if (this.sUm !== i) {
        var t = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetFavoriteMusicList();
        if (this.sUm === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
          if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayAlbum() === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
            ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetPlayList(Array.from(t));
          }
          this.iZm(false);
        }
        this.sUm = i;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "MotorMusicAlbum", this.aUm.findIndex(t => t.Id === i) + 1, this.aUm.length);
        this.PUm(i, true, false, () => {
          var t = this.cGf.findIndex(t => t.Id === ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayMusicId());
          var t = t !== -1 ? t : 0;
          if (this.xqe.GetDisplayGridNum() !== 0 && (this.IsItemInViewport(t) ? this.xqe.ResetGridController() : this.xqe.ScrollToGridIndex(t, true), t = this.xqe.GetGrid(t)) && Info_1.Info.IsInGamepad()) {
            ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(t);
          }
        });
        this.GetButton(5).RootUIComp.SetUIActive(this.sUm === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId() && (this.ODm?.length ?? 0) >= 2);
        this.GetButton(26)?.RootUIComp.SetUIActive(this.nUm.GetCurrentSelectIndex() < this.aUm.length - 1);
        this.GetButton(27)?.RootUIComp.SetUIActive(this.nUm.GetCurrentSelectIndex() > 0);
        this.GetButton(19).RootUIComp.SetUIActive(this.sUm !== ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId());
        for (const e of this.aUm) {
          e.IsSelected = e.Id === this.sUm;
        }
        this.nUm?.RefreshItems();
      }
    };
    this.DUm = () => {
      var t;
      if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetFavoriteMusicList().length >= 2) {
        t = {
          MusicList: this.ODm,
          OnCallback: this.rZm
        };
        UiManager_1.UiManager.OpenView("MotorcycleMusicSortView", t);
      }
    };
    this.rZm = t => {
      this.ODm = t;
      this.PUm(this.sUm, false, true);
      if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayAlbum() === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
        ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetPlayList(Array.from(this.ODm));
      }
    };
    this.UUm = () => {
      this.TUm(ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayMusicId());
    };
    this.i71 = () => {
      ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.QuickPlayMusic(false);
      this.oZm();
    };
    this.xUm = () => {
      if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetIsPause()) {
        ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.ResumeMusic();
      } else {
        ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.PauseMusic();
      }
      this.oZm();
      this.pUm();
    };
    this.XRo = () => {
      ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.QuickPlayMusic();
      this.oZm();
    };
    this.SCf = () => {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.ResetNavigationFocusForViewWithDirtyCheck();
      this.nUm?.AttachToNextItem(1);
    };
    this.MCf = () => {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.ResetNavigationFocusForViewWithDirtyCheck();
      this.nUm?.AttachToNextItem(-1);
    };
    this.BUm = () => {
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
      this.kUm();
    };
    this.qUm = () => {
      this.nUm?.AttachToIndex(this.aUm.findIndex(t => t.Id === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIText], [12, UE.UISprite], [13, UE.UIText], [14, UE.UIExtendToggle], [15, UE.UIButtonComponent], [16, UE.UIExtendToggle], [17, UE.UIButtonComponent], [18, UE.UIButtonComponent], [19, UE.UIButtonComponent], [20, UE.UILoopScrollViewComponent], [21, UE.UISprite], [22, UE.UISprite], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIButtonComponent], [27, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.DUm], [14, this.UUm], [15, this.i71], [16, this.xUm], [17, this.XRo], [18, this.BUm], [19, this.qUm], [26, this.SCf], [27, this.MCf]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMotorSwitchMusic, this.CUm);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMotorSwitchMusic, this.CUm);
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
    this.hUm = (0, puerts_1.toManualReleaseDelegate)(this.wUm);
    await this.LoadCurveResource();
    this.ZJm = this.GetItem(24)?.GetOwner()?.GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    this.eZm = this.GetItem(25)?.GetOwner()?.GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0)).SetCloseCallBack(this.CloseMe.bind(this));
    this.Jfo();
    this.Rzf();
    this.Lzf();
    let i = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayAlbum();
    if (i === -1) {
      ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.PlayDefaultMusic();
      i = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayAlbum();
    }
    this.sZm(i);
    this.bzf = i;
    this.nUm.ReloadView(this.aUm.length, this.aUm);
    var t = this.aUm.findIndex(t => t.Id === i);
    this.nUm.AttachToIndex(Math.max(t - START_SCROLL_COUNT, 0), true);
    this.nUm.AttachToIndex(t, false);
    this.TDe = TimerSystem_1.TimerSystem.Forever(this.mUm, TimerSystem_1.MIN_TIME);
    this.dCg = TimerSystem_1.TimerSystem.Forever(this.mCg, CommonDefine_1.MILLIONSECOND_PER_SECOND);
    this.kUm();
    this.LUm();
    this.gUm();
    this.vUm();
    this.oZm();
    var t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.MUSICVOLUMEFUNCTION);
    var e = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.MASTERVOLUMEFUNCTION);
    if (t === 0 || e === 0) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorMusicTips01");
    }
  }
  Jfo() {
    this.nUm = new NoCircleAttachView_1.NoCircleAttachView(this.GetItem(2).GetOwner(), true);
    this.GetItem(3)?.SetUIActive(false);
    this.nUm.CreateItems(this.GetItem(3).GetOwner(), -(this.GetItem(3).GetWidth() - ITEM_SPACING), this.yUm, 0);
    this.nUm.SetShowItemNum(FORCE_SHOW_ALBUM_COUNT);
    this.nUm.SetMoveItemsCallback(this.yCf);
    this.nUm.SetMoveMultiFactor(ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetAlbumVelocity());
    var t = this.GetLoopScrollViewComponent(20);
    var i = this.GetItem(7)?.GetOwner();
    if (t && i) {
      this.xqe = new LoopScrollView_1.LoopScrollView(t, i, this.EUm);
    }
  }
  Lzf() {
    const t = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicList() ?? [];
    for (const i of t) {
      i.Album.forEach(t => {
        if (!this.oUm.has(t)) {
          this.oUm.set(t, []);
        }
        this.oUm.get(t).push(i.Id);
      });
    }
    this.ODm = Array.from(ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetFavoriteMusicList());
    for (const t of this.oUm.values()) {
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
  Rzf() {
    var t = new LongPressButtonItem_1.LongPressButtonItem(this.GetButton(26), 1, this.SCf);
    var i = new LongPressButtonItem_1.LongPressButtonItem(this.GetButton(27), 1, this.MCf);
    t.ShouldPlayLongPressSound = true;
    i.ShouldPlayLongPressSound = true;
  }
  OnBeforeShow() {
    var t = this.RootItem.GetRootCanvas().GetViewportSize();
    var i = MathUtils_1.MathUtils.RangeClamp(this.GetItem(2).GetPositionInScreen(true).X, 0, t.X, -1, 1);
    var t = MathUtils_1.MathUtils.RangeClamp(this.GetItem(2).GetPositionInScreen(true).Y, 0, t.Y, 1, -1);
    this.pCf.X = -i;
    this.pCf.Y = -t;
    UiLayer_1.UiLayer.UiRootItem.GetRootCanvas().ProjectCenterOffset = this.pCf.ToUeVector2D();
  }
  OnAfterHide() {
    UiLayer_1.UiLayer.UiRootItem.GetRootCanvas().ProjectCenterOffset = Vector2D_1.Vector2D.ZeroVector;
  }
  sZm(i) {
    var t = (ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicAlbumList() ?? []).map(t => ({
      Id: t.Id,
      Config: t,
      UnlockMusicNum: ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetUnlockMusicByAlbum(t.Id).length,
      AllMusicNum: this.oUm.get(t.Id)?.length ?? 0,
      IsSelected: t.Id === i
    }));
    t.sort((t, i) => t.Config.SortIndex - i.Config.SortIndex);
    this.aUm = t;
  }
  OnBeforeDestroy() {
    if (this.hUm) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.wUm);
      this.hUm = undefined;
    }
    if (TimerSystem_1.TimerSystem.Has(this._Um)) {
      TimerSystem_1.TimerSystem.Remove(this._Um);
      this._Um = undefined;
    }
    if (this.TDe) {
      TimerSystem_1.TimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
    if (this.dCg) {
      TimerSystem_1.TimerSystem.Remove(this.dCg);
      this.dCg = undefined;
    }
    this.OUm();
    if (this.sUm === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId() && (this.iZm(true), ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayAlbum() === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId())) {
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetPlayList(Array.from(ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetFavoriteMusicList()));
    }
    ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.SendFavoriteUpdateRequest();
    UiLayer_1.UiLayer.UiRootItem.GetRootCanvas().ProjectCenterOffset = Vector2D_1.Vector2D.ZeroVector;
    ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.ClearAlbum2MusicCache();
    MotorcycleAlbumItemGrid.RotateCurve = undefined;
    MotorcycleAlbumItemGrid.ScaleCurve = undefined;
    MotorcycleAlbumItemGrid.AlphaCurve = undefined;
  }
  iZm(t = 0) {
    var i;
    if (this.ODm) {
      i = this.ODm.filter(t => ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsMusicFavorite(t));
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetFavoriteMusicList(i);
    }
  }
  vUm() {
    this.wUm(0);
    if (TimerSystem_1.TimerSystem.Has(this._Um)) {
      TimerSystem_1.TimerSystem.Remove(this._Um);
    }
    this.OUm();
    this._Um = TimerSystem_1.TimerSystem.Delay(() => {
      var t = this.GetItem(9).Width;
      var i = this.GetText(10).Width;
      if (t < i) {
        this.OUm();
        this.lUm = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.hUm, 0, t - i, (i - t) / DESC_SCROLL_SPEED, 0, 0);
        this.lUm.OnCompleteCallBack.Bind(this.RUm);
      }
    }, DESC_START_WAIT_TIME);
  }
  OUm() {
    if (this.lUm) {
      this.lUm.Kill();
      this.lUm = undefined;
    }
  }
  bUm(t) {
    if (this.sUm === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetPlayList(this.ODm ?? []);
    } else if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayAlbum() !== this.sUm && this.sUm !== ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetPlayList(ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetUnlockMusicByAlbum(this.sUm).map(t => t.Id));
    }
    ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.PlayAlbumMusic(this.sUm, t);
    this.oZm();
  }
  LUm() {
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
      this.gUm();
    }
  }
  gUm() {
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
  AUm(t) {
    if (t !== ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
      return this.oUm.get(t);
    } else {
      return this.ODm;
    }
  }
  PUm(t, i = false, e = false, s) {
    let r = this.oUm.get(t);
    if (t === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
      if (i) {
        r = Array.from(ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetFavoriteMusicList());
        this.ODm = r;
      } else {
        r = this.ODm;
      }
    }
    t = (r = r === undefined ? [] : r).map(t => {
      return {
        Id: t,
        IsFavorite: ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsMusicFavorite(t)
      };
    });
    this.cGf = t;
    this.xqe.RefreshByData(t, false, s, e);
    this.GetItem(23)?.SetUIActive(t.length === 0);
  }
  pUm() {
    this.LUm();
    this.PUm(this.sUm);
    this.nUm.RefreshItems();
  }
  kUm() {
    this.SetSpriteByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(MotorcycleMusicPlayerDefine_1.motorMusicPlayModeIcon[ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetPlayMode()]), this.GetSprite(21), false);
  }
  oZm() {
    var t = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetIsPause();
    if (t !== this.tZm) {
      if (this.tZm = t) {
        this.ZJm?.Stop();
        this.eZm?.Play();
      } else {
        this.ZJm?.Play();
        this.eZm?.Stop();
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
    this.GUm = undefined;
    this.TmpVector = Vector_1.Vector.Create(0, 0, 0);
    this.TmpRotate = Rotator_1.Rotator.Create(0, 0, 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
    this.BtnBindInfo = [[0, this.FUm.bind(this)], [4, this.NUm.bind(this)]];
  }
  GetAlbumData() {
    return this.GUm;
  }
  FUm(t) {
    if (this.GUm) {
      this.OnClickAlbumItem?.(this, this.GUm.Id);
    }
  }
  NUm() {
    if (this.GUm) {
      this.OnClickBtnPlay?.(this, this.GUm.Id);
    }
  }
  VUm() {
    if (this.GUm) {
      if (this.GUm.Id === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
        return ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetFavoriteMusicList().length;
      } else {
        return this.GUm.UnlockMusicNum;
      }
    } else {
      return 0;
    }
  }
  _Oe() {
    var t;
    var i;
    var e;
    if (this.GUm) {
      i = (t = this.VUm() > 0) && ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayAlbum() === this.GUm.Id;
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
      i = (this.GUm = t).Config;
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
    if (this.GUm) {
      this.OnSelectAlbumItem?.(this.GUm.Id);
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
    this.rWm = () => {
      if (this.xe !== -1) {
        UiManager_1.UiManager.OpenView("MotorcycleMusicDetailView", this.xe);
      }
    };
    this.jUm = () => {
      if (this.xe !== -1 && ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsMusicUnlock(this.xe)) {
        this.OnClickCallback?.(this.xe);
      }
    };
    this.HUm = () => {
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
    this.BtnBindInfo = [[0, this.jUm], [3, this.HUm]];
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleStateForce(1);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleStateForce(0);
  }
  OnStart() {
    this.GetExtendToggle(0).OnUndeterminedClicked.Add(this.rWm);
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