"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorAtmosphereView = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../Ui/UiManager");
const AutoAttachItem_1 = require("../../../../AutoAttach/AutoAttachItem");
const NoCircleAttachView_1 = require("../../../../AutoAttach/NoCircleAttachView");
const ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const SpringManorDefine_1 = require("../SpringManorDefine");
const ARROW_DISABLE_ALPHA = 0.3;
class SpringManorAtmosphereView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Qyi = undefined;
    this.Wnu = undefined;
    this.$5f = undefined;
    this.W5f = undefined;
    this.bOe = undefined;
    this.nVg = undefined;
    this.r71 = -1;
    this.U7g = false;
    this.Qnu = (t, e) => {
      if (this.r71 !== t) {
        var i = this.Wnu?.GetItemByShowIndex(this.r71 - 1);
        if (i) {
          const e = i;
          e.PlaySequence("SleToNor");
        }
        e.PlaySequence("NorToSle");
        this.r71 = t;
        this.Og();
      }
    };
    this.aVt = () => this.U7g;
    this.Zqg = () => {
      UiManager_1.UiManager.ResetToBattleView();
    };
    this.c71 = (t, e, i) => {
      var s = new LevelItem();
      s.CreateThenShowByActor(t);
      s.ClickCallback = this.Jj1;
      s.SelectCallback = this.Qnu;
      s.GetIsSelectLevel = this.G5g;
      return s;
    };
    this.Jj1 = t => {
      if (this.Wnu?.GetCurrentSelectIndex() !== t - 1) {
        this.Wnu.AttachToIndex(t - 1);
      }
    };
    this.G5g = t => this.r71 === t;
    this.hoc = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController.RequestAtmosphereRewardReceive(() => {
        this.Og();
        this.WLl();
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIScrollViewWithScrollbarComponent], [5, UE.UIButtonComponent], [6, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIText], [17, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    t.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.nVg = new ButtonItem_1.ButtonItem();
    this.nVg.SetFunction(this.hoc);
    t.push(this.nVg.OnlyCreateByActorAsync(this.GetItem(8).GetOwner()));
    await Promise.all(t);
  }
  OnStart() {
    this.zDn();
    this.Q5f();
    this.K5f();
    this.X5f();
    this.Fmm();
    this.nVg?.SetRedDotVisible(true);
  }
  OnBeforeShow() {
    this.WLl();
    this.Y5f();
  }
  Og() {
    this.z5f();
    this.J5f();
    this.r7d();
  }
  Y5f() {
    var t;
    var e = ModelManager_1.ModelManager.SpringManorModel;
    var i = e.ActivityData.GetAtmosphereLevel();
    var i = e.IsMaxLevel(i);
    var s = this.GetText(16);
    if (i) {
      s?.ShowTextNew(SpringManorDefine_1.TEXT_ID_ATMOSPHERER_MAX);
    } else {
      i = e.ActivityData.GetAtmosphere();
      t = e.GetNextLevel();
      e = e.GetLevelNeedExp(t);
      s?.SetText(i + "/" + e);
    }
  }
  zDn() {
    this.Qyi?.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.Qyi?.SetHelpCallBack(() => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(SpringManorDefine_1.ATMOSPHERE_HELP_ID);
    });
  }
  Fmm() {
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), () => {
      var t = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      t.ShowReceivedCallBack = this.aVt;
      return t;
    });
  }
  r7d() {
    var t;
    var e = ModelManager_1.ModelManager.SpringManorModel;
    var i = e.GetLevelConfig(this.r71);
    if (i && i.DropId !== 0) {
      t = e.ActivityData.IsLevelRewardClaimed(i.Id);
      this.U7g = t;
      i = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(i.DropId);
      this.bOe?.RefreshByData(i);
      if (t) {
        this.Z5f(3);
      } else if (e.GetAtmosphereLevel() >= this.r71) {
        this.Z5f(2);
      } else {
        this.Z5f(1);
      }
    } else {
      this.Z5f(0);
    }
  }
  Z5f(t) {
    var e = t === 0;
    this.GetItem(11)?.SetUIActive(!e);
    this.GetItem(12)?.SetUIActive(e);
    this.nVg?.SetUiActive(t === 2);
    this.GetItem(9)?.SetUIActive(t === 1);
    this.GetItem(10)?.SetUIActive(t === 3);
  }
  K5f() {
    this.$5f = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), () => {
      var t = new GetWayItem();
      t.OnTrackPositionCallback = this.Zqg;
      return t;
    });
  }
  X5f() {
    this.W5f = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(4), () => {
      var t = new UnlockItem();
      t.OnTrackPositionCallback = this.Zqg;
      return t;
    });
  }
  J5f() {
    var t = ModelManager_1.ModelManager.SpringManorModel.GetLevelConfig(this.r71);
    if (t) {
      this.$5f?.RefreshByData(t.UpgradeWay);
    }
  }
  z5f() {
    var t = ModelManager_1.ModelManager.SpringManorModel.GetLevelConfig(this.r71);
    if (t) {
      this.GetItem(17)?.SetUIActive(t.UnlockFunction.length === 0);
      this.W5f?.RefreshByData(t.UnlockFunction);
    }
  }
  Q5f() {
    this.Wnu = new NoCircleAttachView_1.NoCircleAttachView(this.GetItem(13).GetOwner());
    var t = this.GetItem(14);
    t.SetUIActive(false);
    this.Wnu.CreateItems(t.GetOwner(), 0, this.c71);
  }
  WLl() {
    var t = ModelManager_1.ModelManager.SpringManorModel.GetTotalLevelData();
    if (this.r71 === -1) {
      var e = ModelManager_1.ModelManager.SpringManorModel.GetAtmosphereLevel();
      this.Wnu.ReloadView(t.length, t, e - 1);
      this.Wnu.AttachToIndex(e - 1, true);
    } else {
      for (const i of this.Wnu.GetItems()) {
        i.SetData(t);
        i.RefreshPerformance();
      }
    }
  }
}
exports.SpringManorAtmosphereView = SpringManorAtmosphereView;
class LevelItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.ClickCallback = undefined;
    this.SelectCallback = undefined;
    this.GetIsSelectLevel = undefined;
    this.Rjt = true;
    this.Hea = undefined;
    this.Fr = () => {
      if (this.ClickCallback && this.Pe) {
        this.ClickCallback(this.Pe.Level);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIText], [9, UE.UIItem], [10, UE.UISprite], [11, UE.UIItem], [12, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Fr]];
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnRefreshItem(t) {
    if (t) {
      this.Pe = t;
      this.RefreshPerformance();
    }
  }
  RefreshPerformance() {
    var t = this.Pe;
    var e = ModelManager_1.ModelManager.SpringManorModel.GetAtmosphereLevel();
    var e = t.Level > e;
    this.eVf(e);
    this.tVf()?.SetText(t.Level.toString());
    this.GetItem(11)?.SetUIActive(false);
    var e = t.Level >= ModelManager_1.ModelManager.SpringManorModel.GetMaxLevel();
    this.GetItem(12)?.SetUIActive(!e);
    var i = this.GetSprite(10);
    i?.SetUIActive(!e);
    if (!e) {
      e = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetAtmosphere();
      e = MathUtils_1.MathUtils.Clamp((e - t.ExpLevel) / t.ExpNext, 0, 1);
      i.SetFillAmount(e);
    }
    var i = ModelManager_1.ModelManager.SpringManorModel?.ActivityData.IsLevelCanReceive(t.Level);
    this.GetItem(6)?.SetUIActive(i ?? false);
    var e = this.GetIsSelectLevel?.(t.Level) ?? false;
    this.Hea?.PlayOrReplaySequenceByName(e ? "NorToSle" : "SleToNor");
    this.Hea?.StopCurrentSequence(false, true);
  }
  PlaySequence(t) {
    this.Hea?.StopPlayingSequence();
    this.Hea?.PlayOrReplaySequenceByName(t);
  }
  OnSelect() {
    if (this.SelectCallback && this.Pe) {
      this.SelectCallback(this.Pe.Level, this);
    }
  }
  OnUnSelect() {}
  OnMoveItem() {}
  eVf(t) {
    this.Rjt = t;
    this.GetItem(2).SetUIActive(!t);
    this.GetItem(4).SetUIActive(t);
    this.GetText(7).SetUIActive(!t);
    this.GetText(8).SetUIActive(t);
    this.GetItem(3).SetUIActive(!t);
    this.GetItem(5).SetUIActive(t);
  }
  tVf() {
    if (this.Rjt) {
      return this.GetText(8);
    } else {
      return this.GetText(7);
    }
  }
}
class GetWayItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.eOg = 0;
    this.ac = 0;
    this.OnTrackPositionCallback = undefined;
    this.Fr = () => {
      if (this.ac === 0 && !(this.eOg <= 0)) {
        ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController?.ExecuteSkipEntry(this.eOg, this.OnTrackPositionCallback);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Fr]];
  }
  Refresh(t, e, i) {
    this.eOg = t;
    var s = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSkipEntryConfigById(t);
    if (s) {
      this.GetText(2)?.ShowTextNew(s.Name);
      if (ModelManager_1.ModelManager.SpringManorModel?.ActivityData.IsSkipEntryUnLock(t)) {
        if (ModelManager_1.ModelManager.SpringManorModel.ActivityData.IsSkipEntryFinish(t)) {
          this._Oe(3);
        } else {
          t = s.JumpId > 0;
          s = s.TrackPosition.length > 0;
          this._Oe(t || s ? 0 : 1);
        }
      } else {
        this._Oe(2);
      }
    }
  }
  _Oe(t) {
    this.ac = t;
    this.GetButton(0)?.SetSelfInteractive(t !== 2 && t !== 1);
    this.GetItem(3)?.SetUIActive(t === 0);
    this.GetItem(4)?.SetUIActive(t === 2);
    this.GetItem(5)?.SetUIActive(t === 3);
  }
}
class UnlockItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.eOg = 0;
    this.OnTrackPositionCallback = undefined;
    this.Fr = () => {
      if (!(this.eOg <= 0)) {
        ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController?.ExecuteSkipEntry(this.eOg, this.OnTrackPositionCallback);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Fr]];
  }
  Refresh(t, e, i) {
    this.eOg = t;
    var s = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSkipEntryConfigById(t);
    if (s) {
      this.GetText(2)?.ShowTextNew(s.Name);
      t = ModelManager_1.ModelManager.SpringManorModel?.ActivityData.IsSkipEntryUnLock(t);
      this.GetItem(1)?.SetUIActive(!t);
      if (t) {
        t = s.JumpId > 0;
        s = s.TrackPosition.length > 0;
        t = t || s;
        this.GetButton(0)?.SetSelfInteractive(t);
        this.GetItem(3)?.SetAlpha(t ? 1 : ARROW_DISABLE_ALPHA);
      } else {
        this.GetButton(0)?.SetSelfInteractive(false);
      }
    }
  }
}
//# sourceMappingURL=SpringManorAtmosphereView.js.map