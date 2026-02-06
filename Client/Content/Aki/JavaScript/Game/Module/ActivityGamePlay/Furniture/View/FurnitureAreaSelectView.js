"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureAreaSelectView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const FurnitureAreaFinishTipItem_1 = require("./FurnitureAreaFinishTipItem");
const FurnitureAreaLockTipItem_1 = require("./FurnitureAreaLockTipItem");
const FurnitureAreaSelectItem_1 = require("./FurnitureAreaSelectItem");
const FurnitureAtmosphereLevelItem_1 = require("./FurnitureAtmosphereLevelItem");
class FurnitureAreaSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.weg = 0;
    this.mDf = 0;
    this.Aeg = new Map();
    this.lqe = undefined;
    this.Peg = undefined;
    this.Deg = undefined;
    this.Ueg = undefined;
    this.xeg = undefined;
    this.Beg = new Map();
    this.keg = new Map();
    this.$pt = undefined;
    this.qeg = new Map([[5, 106], [6, 104], [7, 102], [8, 101], [9, 103], [10, 105], [12, 107]]);
    this.DA_ = e => {
      var t;
      var i = this.mDf;
      if (i !== e) {
        t = this.keg.get(i);
        if (i = this.Aeg.get(i)) {
          i.IsSelected = false;
        }
        if (t) {
          t.RefreshToggleState();
        }
        i = this.keg.get(e);
        if ((t = this.Aeg.get(e)) && (t.IsSelected = true, t.RedDotShowState)) {
          ControllerHolder_1.ControllerHolder.FurnitureController.SetFurnitureAreaRedDotAsRead(e);
          t.RedDotShowState = false;
        }
        if (i && t) {
          i.RefreshToggleState();
          i.RefreshRedDot();
          if ((i = t.FloorId) === 1) {
            this.RefreshFirstFloorRedDot();
          } else if (i === 2) {
            this.RefreshSecondFloorRedDot();
          }
        }
        this.Geg(e);
        this.RefreshDetail();
        this.PlayDetailSwitchAnimation();
      }
    };
    this.lPe = () => {
      this.CloseMe();
    };
    this.xco = () => {
      var e;
      if (ModelManager_1.ModelManager.FurnitureModel.GetAreaIsUnlock(this.mDf)) {
        e = {
          MapId: ModelManager_1.ModelManager.FurnitureModel.MapId,
          ToSelectAreaId: this.mDf
        };
        UiManager_1.UiManager.OpenView("FurnitureDesignView", e);
      }
    };
    this.zxl = () => {
      ControllerHolder_1.ControllerHolder.FurnitureController.OpenFurnitureShopViewAsync();
    };
    this.Bfg = () => {
      UiManager_1.UiManager.OpenView("FurnitureHandBookView");
    };
    this.zLg = () => {
      UiManager_1.UiManager.OpenView("Spring26AtmosphereLevelView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIExtendToggle], [3, UE.UIExtendToggle], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UISprite], [14, UE.UISprite], [15, UE.UIText], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIText], [19, UE.UIText], [20, UE.UIText], [21, UE.UIButtonComponent], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIButtonComponent], [25, UE.UIItem], [26, UE.UIButtonComponent], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem]];
    this.BtnBindInfo = [[21, this.xco], [24, this.zxl], [26, this.Bfg]];
  }
  async OnBeforeStartAsync() {
    var e;
    var t;
    var i = [];
    this.Deg = new FurnitureAtmosphereLevelItem_1.FurnitureAtmosphereLevelItem();
    i.push(this.Deg.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    for ([e, t] of this.qeg) {
      var r = new FurnitureAreaSelectItem_1.FurnitureAreaSelectItem();
      i.push(r.CreateThenShowByActorAsync(this.GetItem(e).GetOwner()));
      this.keg.set(t, r);
    }
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    i.push(this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.Ueg = new FurnitureAreaFinishTipItem_1.FurnitureAreaFinishTipItem();
    this.xeg = new FurnitureAreaLockTipItem_1.FurnitureAreaLockTipItem();
    i.push(this.Ueg.CreateThenShowByActorAsync(this.GetItem(22).GetOwner()));
    i.push(this.xeg.CreateThenShowByActorAsync(this.GetItem(23).GetOwner()));
    await Promise.all(i);
    this.xeg?.Refresh("DIY_RegionDesc_Locked_Tip", this.zLg);
    this.Ueg.Refresh("DIY_DecComplete_Content");
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnStart() {
    let e = this.OpenParam;
    e = e || 101;
    this.Geg(e);
    ControllerHolder_1.ControllerHolder.FurnitureController.SetFurnitureAreaRedDotAsRead(e);
    var t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureAreaConfig(this.mDf);
    if (t) {
      this.Feg(t.Floor);
      this.lqe?.SetCloseCallBack(this.lPe);
      this.Beg.set(1, this.GetExtendToggle(2));
      this.Beg.set(2, this.GetExtendToggle(3));
      for (const [i, r] of this.Beg) {
        r.OnStateChange.Add(e => {
          if (e === 1) {
            this.Neg(i);
          }
        });
      }
      this.RefreshFloorToggleState();
      this.RefreshFloorAreaRootItemShowState();
    }
  }
  OnBeforeShow() {
    this.A7g();
    this.$_g();
    this.RefreshAreaItem();
    this.J1l();
    this.RefreshDetail();
    this.RefreshButton();
    this.RefreshFloorRedDot();
  }
  Feg(e) {
    this.weg = e;
  }
  Geg(e) {
    this.mDf = e;
  }
  A7g() {
    for (const t of this.keg.keys()) {
      var e = this.Veg(t);
      if (e) {
        this.Aeg.set(t, e);
      }
    }
  }
  $_g() {
    var e = ModelManager_1.ModelManager.FurnitureModel.GetAtmosphereLevelData();
    if (e) {
      this.Peg = e;
    }
  }
  Veg(e) {
    var t;
    var i;
    var r;
    var s;
    var h = ModelManager_1.ModelManager.FurnitureModel;
    var a = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureAreaConfig(e);
    if (a) {
      t = h.GetAreaIsUnlock(e);
      i = this.mDf === e;
      r = h.GetAreaPlacedSlotCount(e);
      s = a.MaxSlotCount;
      h = h.CheckFurnitureAreaRedDot(e);
      return {
        AreaId: e,
        FloorId: a.Floor,
        AreaName: a.AreaName,
        LockAreaIcon: a.AreaUnFinishedBigIcon,
        UnlockAreaIcon: a.AreaFinishedBigIcon,
        IsSelected: i,
        IsUnlock: t,
        PlacedSlotCount: r,
        MaxSlotCount: s,
        RedDotShowState: h,
        OnSelected: this.DA_
      };
    }
  }
  RefreshAreaItem() {
    for (var [e, t] of this.keg) {
      e = this.Aeg.get(e);
      if (e) {
        t.Refresh(e);
      }
    }
  }
  RefreshFloorToggleState() {
    for (var [e, t] of this.Beg) {
      t.SetToggleState(e === this.weg ? 1 : 0);
    }
  }
  RefreshFloorAreaRootItemShowState() {
    this.GetItem(4).SetUIActive(this.weg === 1);
    this.GetItem(11).SetUIActive(this.weg === 2);
  }
  RefreshDetail() {
    var e;
    var t;
    var i;
    var r;
    var s;
    var h;
    var a = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureAreaConfig(this.mDf);
    if (a) {
      i = (r = ModelManager_1.ModelManager.FurnitureModel).GetAreaIsUnlock(this.mDf);
      this.GetItem(17).SetUIActive(!i);
      this.GetItem(16).SetUIActive(i);
      this.GetItem(23).SetUIActive(!i);
      this.GetButton(21).RootUIComp.SetUIActive(i);
      e = this.GetSprite(14);
      t = this.GetSprite(13);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), a.AreaName);
      if (i) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(20), a.AreaDescription);
        i = r.GetAreaAtmosphere(this.mDf);
        this.GetText(18).SetText(i.toString());
        i = r.GetAreaPlacedSlotCount(this.mDf);
        s = (r = a.MaxSlotCount) <= i;
        (h = this.GetText(19)).SetChangeColor(s, h.changeColor);
        LguiUtil_1.LguiUtil.SetLocalTextNew(h, "DIY_RegionAtmosphere_Content_1", i, r);
        e.SetUIActive(h = s);
        t.SetUIActive(!h);
        if (h) {
          this.SetSpriteByPath(a.AreaFinishedSmallIcon, e, false);
        } else {
          this.SetSpriteByPath(a.AreaUnFinishedSmallIcon, t, false);
        }
        this.GetItem(22).SetUIActive(h);
      } else {
        e.SetUIActive(false);
        t.SetUIActive(true);
        this.SetSpriteByPath(a.AreaUnFinishedSmallIcon, t, false);
        this.GetItem(22).SetUIActive(false);
      }
    }
  }
  PlayDetailSwitchAnimation() {
    this.$pt?.PlayOrReplaySequenceByName("Switch01");
  }
  J1l() {
    if (this.Peg) {
      this.Deg?.Refresh(this.Peg);
    }
  }
  RefreshButton() {
    var e = ModelManager_1.ModelManager.FurnitureModel;
    var t = e.GetFurnitureHandBookFunctionIsUnlocked();
    var i = e.GetFurnitureShopFunctionIsUnlocked();
    this.GetButton(24).RootUIComp.SetUIActive(i);
    this.GetButton(26).RootUIComp.SetUIActive(t);
    if (i) {
      this.GetItem(25).SetUIActive(e.CheckFurnitureShopRedDot());
    }
    if (t) {
      this.GetItem(27).SetUIActive(e.CheckFurnitureHandBookRedDot());
    }
  }
  RefreshFirstFloorRedDot() {
    var e = this.GetItem(28);
    var t = ModelManager_1.ModelManager.FurnitureModel;
    e.SetUIActive(t.CheckFurnitureFloorRedDot(1));
  }
  RefreshSecondFloorRedDot() {
    var e = this.GetItem(29);
    var t = ModelManager_1.ModelManager.FurnitureModel;
    e.SetUIActive(t.CheckFurnitureFloorRedDot(2));
  }
  RefreshFloorRedDot() {
    this.RefreshFirstFloorRedDot();
    this.RefreshSecondFloorRedDot();
  }
  Neg(e) {
    var t = this.weg;
    if (t !== e) {
      if (t = this.Beg.get(t)) {
        t.SetToggleState(0);
      }
      if (t = this.Beg.get(e)) {
        t.SetToggleState(1);
      }
      this.Feg(e);
      this.RefreshFloorAreaRootItemShowState();
      this.dBg();
    }
  }
  dBg() {
    this.$pt?.PlayOrReplaySequenceByName("Switch");
  }
}
exports.FurnitureAreaSelectView = FurnitureAreaSelectView;
//# sourceMappingURL=FurnitureAreaSelectView.js.map