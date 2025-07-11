"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerBuffSelectViewLevelItem = exports.BabelTowerBuffSelectView = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const BabelTowerBuffSelectItem_1 = require("./BabelTowerBuffSelectItem");
const BabelTowerController_1 = require("./BabelTowerController");
class BabelTowerBuffSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.vVt = undefined;
    this.GLl = undefined;
    this.Eoc = undefined;
    this.Yal = [];
    this.L3e = () => {
      for (const t of this.Eoc.CurrentSelectBuffList) {
        var e = this.boc(t);
        if (e === 2 || e === 1) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("BabelTowerBuffCannotChose");
          this.Og(t);
          return;
        }
      }
      this.Eoc?.OnConfirmCallBack?.(this.Eoc?.CurrentSelectBuffList);
      this.CloseMe();
    };
    this.sGe = () => {
      var e = new BabelTowerBuffSelectItem_1.BabelTowerBuffSelectItem();
      e.CanClickCallBack = this.Ioc;
      e.OnClickToggleCallBack = this.zal;
      e.OnCancelClickToggleCallBack = this.Toc;
      this.Yal.push(e);
      return e;
    };
    this.j1a = () => {
      return new BabelTowerBuffSelectViewLevelItem();
    };
    this.Ioc = e => this.Eoc.MaxSelectBuffCount === 1 || !(this.Eoc.CurrentSelectBuffList.length >= this.Eoc.MaxSelectBuffCount) || !(ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("BabelTowerBuffMax"), this.Og(e), 1);
    this.zal = t => {
      if (this.Eoc?.MaxSelectBuffCount === 1) {
        var i = this.Eoc.AllBuffList.length;
        for (let e = 0; e < i; e++) {
          if (this.vVt?.UnsafeGetGridProxy(e)?.BuffId !== t) {
            this.vVt?.UnsafeGetGridProxy(e).SetToggleState(0);
          }
        }
        this.Eoc.CurrentSelectBuffList = [];
      }
      this.Eoc?.CurrentSelectBuffList.push(t);
      this.Og(t);
    };
    this.Toc = t => {
      var i = this.Eoc?.CurrentSelectBuffList;
      if ((i?.length ?? 0) > 0) {
        for (let e = 0; e < i.length; e++) {
          if (i[e] === t) {
            this.Eoc?.CurrentSelectBuffList.splice(e, 1);
            break;
          }
        }
      }
      this.Og(t);
    };
    this.ovc = () => {
      var e;
      var t = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(this.Eoc.LevelId);
      var i = t.IsDifficult;
      var r = t.OptionalBabelBuff;
      var s = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
      var o = [];
      for (const n of r) {
        let e = 0;
        if (i) {
          if (s.GetBuffIsLock(n)) {
            e = 1;
          } else if ((h = s.GetBuffIsUse(n)) > 0 && h !== this.Eoc.LevelId) {
            e = 2;
          }
        }
        var h = {
          Id: n,
          State: e,
          LevelId: this.Eoc.LevelId,
          IsRecommend: t.RecommendBuff.includes(n)
        };
        o.push(h);
      }
      this.Eoc.AllBuffList = o;
      for (const l of this.Yal) {
        var a = this.boc(l.BuffId);
        l.RefreshState(a);
      }
      for (const f of this.GLl.GetLayoutItemList()) {
        f.RefreshState(0);
      }
      if (i) {
        for (const _ of this.Eoc.AllBuffList) {
          if (s.GetBuffIsLock(_.Id)) {
            _.State = 1;
          } else if ((e = s.GetBuffIsUse(_.Id)) > 0 && e !== this.Eoc.LevelId) {
            _.State = 2;
          } else {
            _.State = 0;
          }
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIText], [3, UE.UIButtonComponent], [8, UE.UIText], [9, UE.UIVerticalLayout], [10, UE.UIItem]];
    this.BtnBindInfo = [[3, this.L3e]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BabelTowerRefreshLevelInfo, this.ovc);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BabelTowerRefreshLevelInfo, this.ovc);
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.vVt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.sGe);
    this.GLl = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(9), this.j1a);
  }
  OnStart() {
    this.Eoc = this.OpenParam;
    this.GetItem(4).SetUIActive(true);
    this.GetItem(5).SetUIActive(false);
    this.Eoc.AllBuffList.sort((e, t) => {
      return (e.IsRecommend ? 0 : 1) - (t.IsRecommend ? 0 : 1);
    });
    this.vVt?.RefreshByData(this.Eoc.AllBuffList, false, () => {
      var e = this.Eoc?.CurrentSelectBuffList ?? [];
      for (const t of this.Yal) {
        if (e.includes(t.BuffId)) {
          t.SetToggleState(1);
        } else {
          t.SetToggleState(0);
        }
      }
    });
    if (this.Eoc.ShowBuffId > 0) {
      this.Og(this.Eoc.ShowBuffId);
    }
    this.GetLoopScrollViewComponent(1).Content.GetComponentByClass(UE.UIInturnAnimController.StaticClass())?.Play();
  }
  Og(e) {
    this.GetItem(4).SetUIActive(false);
    this.GetItem(5).SetUIActive(true);
    var t = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerBuff(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t.NameText);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), t.DesText);
    var i = [];
    var r = this.boc(e);
    for (const o of t.DifficultPreLevel) {
      var s = {
        LevelId: o,
        BuffId: e,
        State: r
      };
      i.push(s);
    }
    if (r === 2) {
      this.GetText(7).SetUIActive(false);
    } else if (r === 1) {
      this.GetText(7).SetUIActive(true);
    } else if (r === 0) {
      t = t.DifficultPreLevel.length;
      this.GetText(7).SetUIActive(t > 0);
    }
    this.GLl?.RefreshByData(i);
  }
  boc(e) {
    for (const t of this.Eoc.AllBuffList) {
      if (t.Id === e) {
        return t.State;
      }
    }
    return 0;
  }
}
exports.BabelTowerBuffSelectView = BabelTowerBuffSelectView;
class BabelTowerBuffSelectViewLevelItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.gQl = false;
    this.uEc = 0;
    this.eHr = 0;
    this.Ykt = () => {
      if (this.gQl) {
        ModelManager_1.ModelManager.BabelTowerModel.LevelChoseHandle = this.uEc;
        if (ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(this.uEc).IsDifficult) {
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
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("BabelTowerLevelUnlock");
      }
    };
    this.tPc = () => {
      var e = BabelTowerController_1.BabelTowerController.GetBabelTowerData().GetBuffUseLevel(this.eHr);
      if (e > 0) {
        UiManager_1.UiManager.OpenView("BabelTowerResetView", e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [5, UE.UIButtonComponent], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.Ykt], [4, this.tPc]];
  }
  Refresh(e, t, i) {
    var r = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
    var s = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    this.uEc = e.LevelId;
    var o = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(e.LevelId);
    var o = o.IsDifficult ? MathUtils_1.MathUtils.LongToNumber(r.HardLevelDataMap.get(e.LevelId)?.yzs ?? 0) : MathUtils_1.MathUtils.LongToNumber(r.NormalLevelDataMap.get(e.LevelId)?.yzs ?? 0);
    this.gQl = !o || o <= s;
    this.eHr = e.BuffId;
    this.RefreshState(e.State);
  }
  RefreshState(e) {
    var t;
    if (e === 2) {
      this.GetItem(0).SetUIActive(true);
      this.GetItem(2).SetUIActive(false);
      this.GetItem(3).SetUIActive(false);
      this.GetButton(4).RootUIComp.SetUIActive(true);
      this.GetButton(5).SetSelfInteractive(false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "BabelTowerBuffUse");
    } else if (e === 1) {
      this.GetItem(0).SetUIActive(true);
      this.GetItem(2).SetUIActive(false);
      this.GetItem(3).SetUIActive(true);
      this.GetButton(5).SetSelfInteractive(true);
      this.GetButton(4).RootUIComp.SetUIActive(false);
      t = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(this.uEc);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.NameText);
    } else if (e === 0) {
      this.GetItem(0).SetUIActive(true);
      this.GetItem(2).SetUIActive(true);
      this.GetItem(3).SetUIActive(false);
      this.GetButton(4).RootUIComp.SetUIActive(false);
      this.GetButton(5).SetSelfInteractive(false);
      t = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(this.uEc);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.NameText);
    }
  }
}
exports.BabelTowerBuffSelectViewLevelItem = BabelTowerBuffSelectViewLevelItem;
//# sourceMappingURL=BabelTowerBuffSelectView.js.map