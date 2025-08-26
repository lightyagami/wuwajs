"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerItemInfoView = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const BabelTowerController_1 = require("./BabelTowerController");
class BabelTowerItemInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.xqe = undefined;
    this.Awe = () => {
      this.CloseMe();
    };
    this.Qlc = e => {
      this.CloseMe();
      ModelManager_1.ModelManager.BabelTowerModel.LevelChoseHandle = e;
      if (ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(e).IsDifficult) {
        if (UiManager_1.UiManager.IsViewHide("BabelTowerHardLevelChoseView")) {
          UiManager_1.UiManager.NormalResetToView("BabelTowerHardLevelChoseView");
        } else {
          UiManager_1.UiManager.NormalResetToView("BabelTowerMainView", () => {
            UiManager_1.UiManager.OpenView("BabelTowerHardLevelChoseView");
          });
        }
      } else if (UiManager_1.UiManager.IsViewHide("BabelTowerNormalLevelChoseView")) {
        UiManager_1.UiManager.NormalResetToView("BabelTowerNormalLevelChoseView");
      } else {
        UiManager_1.UiManager.NormalResetToView("BabelTowerMainView", () => {
          UiManager_1.UiManager.OpenView("BabelTowerNormalLevelChoseView");
        });
      }
    };
    this.sGe = () => {
      var e = new JumpToItem();
      e.OnClickButtonCallBack = this.Qlc;
      return e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIText], [5, UE.UITexture], [6, UE.UIText], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIScrollViewWithScrollbarComponent], [10, UE.UIButtonComponent], [11, UE.UISprite], [12, UE.UIText], [13, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.Awe], [13, this.Awe]];
  }
  OnStart() {
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(9), this.sGe);
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    this.Pe = e;
    this.GetItem(1).SetUIActive(e.IsDeTerm);
    this.GetItem(2).SetUIActive(!e.IsDeTerm);
    if (e.IsDeTerm) {
      this.wRc();
    } else {
      this.RRc();
    }
  }
  wRc() {
    const e = this.Pe;
    var i = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTerm(e.ConfigId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), i.NameText);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), i.DesText);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "BabelTowerUnlockTtitleDebuff");
    var r = this.GetSprite(11);
    r.SetChangeColor(false, r.changeColor);
    this.SetTextureByPath(i.Texture, this.GetTexture(3));
    this.GetText(4).SetText(i.Star + "");
    this.GetItem(8).SetUIActive(e.ShowWays);
    if (e.ShowWays) {
      var t;
      var s;
      var a = [];
      var o = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
      for ([t, s] of i.DifficultPreLevelStar) {
        var l = TimeUtil_1.TimeUtil.GetServerTimeStamp();
        var h = (ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(t).IsDifficult ? o.HardLevelDataMap : o.NormalLevelDataMap).get(t);
        var n = MathUtils_1.MathUtils.LongToNumber(h?.yzs ?? 0);
        const e = {
          LevelId: t ?? 0,
          Done: (h?.dMs ?? false) && (h?.rAu ?? 0) >= s,
          IsUnlock: !n || n <= l,
          StarNumber: s
        };
        a.push(e);
      }
      this.xqe?.RefreshByData(a);
    }
  }
  RRc() {
    const e = this.Pe;
    var i = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerBuff(e.ConfigId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), i.NameText);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), i.DesText);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "BabelTowerUnlockTtitlebuff");
    var r = this.GetSprite(11);
    r.SetChangeColor(true, r.changeColor);
    this.SetTextureByPath(i.Texture, this.GetTexture(5));
    this.GetItem(8).SetUIActive(e.ShowWays);
    if (e.ShowWays) {
      var t;
      var s;
      var a = [];
      var o = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
      for ([t, s] of i.DifficultPreLevelStar) {
        var l = TimeUtil_1.TimeUtil.GetServerTimeStamp();
        var h = (ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(t).IsDifficult ? o.HardLevelDataMap : o.NormalLevelDataMap).get(t);
        var n = MathUtils_1.MathUtils.LongToNumber(h?.yzs ?? 0);
        const e = {
          LevelId: t ?? 0,
          Done: (h?.dMs ?? false) && (h?.rAu ?? 0) >= s,
          IsUnlock: !n || n <= l,
          StarNumber: s
        };
        a.push(e);
      }
      this.xqe?.RefreshByData(a);
    }
  }
}
exports.BabelTowerItemInfoView = BabelTowerItemInfoView;
class JumpToItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.yq = 0;
    this.gQl = false;
    this.BT = false;
    this.OnClickButtonCallBack = undefined;
    this.nqe = () => {
      if (this.gQl) {
        if (!this.BT) {
          this.OnClickButtonCallBack?.(this.yq);
        }
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("BabelTowerLevelUnlock");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[3, this.nqe]];
  }
  Refresh(e, i, r) {
    this.yq = e.LevelId;
    var t = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(e.LevelId);
    this.gQl = e.IsUnlock;
    this.GetItem(1).SetUIActive(e.Done);
    this.BT = e.LevelId === ModelManager_1.ModelManager.BabelTowerModel.CurrentSelectLevel;
    if (this.BT) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "BabelTowerCurrentLevel");
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.NameText);
    }
    this.GetItem(6).SetUIActive(!this.BT);
    this.GetItem(5).SetUIActive(e.StarNumber > 0);
    this.GetText(4).SetText(e.StarNumber.toString());
  }
}
//# sourceMappingURL=BabelTowerItemInfoView.js.map