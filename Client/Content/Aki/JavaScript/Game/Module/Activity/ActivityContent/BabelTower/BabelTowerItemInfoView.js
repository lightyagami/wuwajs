"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BabelTowerItemInfoView = void 0;
const UE = require("ue"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  BabelTowerController_1 = require("./BabelTowerController");
class BabelTowerItemInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.Pe = void 0, this.xqe = void 0, this.Awe = () => {
      this.CloseMe()
    }, this.Qlc = e => {
      this.CloseMe(), ModelManager_1.ModelManager.BabelTowerModel.LevelChoseHandle = e, ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(e).IsDifficult ? UiManager_1.UiManager.IsViewHide("BabelTowerHardLevelChoseView") ? UiManager_1.UiManager.NormalResetToView("BabelTowerHardLevelChoseView") : UiManager_1.UiManager.NormalResetToView("BabelTowerMainView", () => {
        UiManager_1.UiManager.OpenView("BabelTowerHardLevelChoseView")
      }) : UiManager_1.UiManager.IsViewHide("BabelTowerNormalLevelChoseView") ? UiManager_1.UiManager.NormalResetToView("BabelTowerNormalLevelChoseView") : UiManager_1.UiManager.NormalResetToView("BabelTowerMainView", () => {
        UiManager_1.UiManager.OpenView("BabelTowerNormalLevelChoseView")
      })
    }, this.sGe = () => {
      var e = new JumpToItem;
      return e.OnClickButtonCallBack = this.Qlc, e
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UITexture],
      [4, UE.UIText],
      [5, UE.UITexture],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIScrollViewWithScrollbarComponent],
      [10, UE.UIButtonComponent],
      [11, UE.UISprite],
      [12, UE.UIText],
      [13, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [0, this.Awe],
      [13, this.Awe]
    ]
  }
  OnStart() {
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(9), this.sGe)
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    this.Pe = e, this.GetItem(1).SetUIActive(e.IsDeTerm), this.GetItem(2).SetUIActive(!e.IsDeTerm), e.IsDeTerm ? this.wRc() : this.RRc()
  }
  wRc() {
    const e = this.Pe;
    var i = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTerm(e.ConfigId),
      r = (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), i.NameText), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), i.DesText), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "BabelTowerUnlockTtitleDebuff"), this.GetSprite(11));
    if (r.SetChangeColor(!1, r.changeColor), this.SetTextureByPath(i.Texture, this.GetTexture(3)), this.GetText(4).SetText(i.Star + ""), this.GetItem(8).SetUIActive(e.ShowWays), e.ShowWays) {
      var t, s, a = [],
        o = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
      for ([t, s] of i.DifficultPreLevelStar) {
        var l = TimeUtil_1.TimeUtil.GetServerTimeStamp(),
          h = (ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(t).IsDifficult ? o.HardLevelDataMap : o.NormalLevelDataMap).get(t),
          n = MathUtils_1.MathUtils.LongToNumber(h?.yzs ?? 0);
        const e = {
          LevelId: t ?? 0,
          Done: (h?.dMs ?? !1) && (h?.Jdu ?? 0) >= s,
          IsUnlock: !n || n <= l,
          StarNumber: s
        };
        a.push(e)
      }
      this.xqe?.RefreshByData(a)
    }
  }
  RRc() {
    const e = this.Pe;
    var i = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerBuff(e.ConfigId),
      r = (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), i.NameText), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), i.DesText), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "BabelTowerUnlockTtitlebuff"), this.GetSprite(11));
    if (r.SetChangeColor(!0, r.changeColor), this.SetTextureByPath(i.Texture, this.GetTexture(5)), this.GetItem(8).SetUIActive(e.ShowWays), e.ShowWays) {
      var t, s, a = [],
        o = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
      for ([t, s] of i.DifficultPreLevelStar) {
        var l = TimeUtil_1.TimeUtil.GetServerTimeStamp(),
          h = (ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(t).IsDifficult ? o.HardLevelDataMap : o.NormalLevelDataMap).get(t),
          n = MathUtils_1.MathUtils.LongToNumber(h?.yzs ?? 0);
        const e = {
          LevelId: t ?? 0,
          Done: (h?.dMs ?? !1) && (h?.Jdu ?? 0) >= s,
          IsUnlock: !n || n <= l,
          StarNumber: s
        };
        a.push(e)
      }
      this.xqe?.RefreshByData(a)
    }
  }
}
exports.BabelTowerItemInfoView = BabelTowerItemInfoView;
class JumpToItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.yq = 0, this.gQl = !1, this.BT = !1, this.OnClickButtonCallBack = void 0, this.nqe = () => {
      this.gQl ? this.BT || this.OnClickButtonCallBack?.(this.yq) : ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("BabelTowerLevelUnlock")
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem]
    ], this.BtnBindInfo = [
      [3, this.nqe]
    ]
  }
  Refresh(e, i, r) {
    this.yq = e.LevelId;
    var t = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(e.LevelId);
    this.gQl = e.IsUnlock, this.GetItem(1).SetUIActive(e.Done), this.BT = e.LevelId === ModelManager_1.ModelManager.BabelTowerModel.CurrentSelectLevel, this.BT ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "BabelTowerCurrentLevel") : LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.NameText), this.GetItem(6).SetUIActive(!this.BT), this.GetItem(5).SetUIActive(0 < e.StarNumber), this.GetText(4).SetText(e.StarNumber.toString())
  }
}
//# sourceMappingURL=BabelTowerItemInfoView.js.map