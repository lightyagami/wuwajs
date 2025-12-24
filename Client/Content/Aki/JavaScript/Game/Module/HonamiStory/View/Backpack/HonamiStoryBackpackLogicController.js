"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryBackpackLogicController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const HonamiStoryController_1 = require("../../HonamiStoryController");
const HonamiStoryUtil_1 = require("../../HonamiStoryUtil");
class HonamiStoryBackpackLogicController {
  constructor() {
    this.BackpackView = undefined;
    this.ahm = undefined;
    this.hhm = undefined;
    this.K_f = undefined;
    this.PanelBaseList = [];
    this._ii = 0;
    this.Bhm = undefined;
    this.khm = new Set();
    this.qhm = 0;
    this.d_m = undefined;
    this.m_m = undefined;
    this.TipsItem = undefined;
    this.vzi = undefined;
  }
  Destroy() {
    this.BCe();
  }
  OnClickGrid(t, i, o) {
    if (this.hhm !== undefined && t !== this.hhm) {
      this.K_f?.CancelToggleSelect();
      this.BCe();
    }
    this.K_f = o;
    this.hhm = t;
    if (this.ahm && this.ahm.Valid()) {
      this.BCe();
      this.K_f = undefined;
      return !(this.hhm = undefined);
    } else {
      o = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetDoubleClickDelay();
      this.ahm = TimerSystem_1.TimerSystem.Delay(() => {
        this.ahm = undefined;
        this.K_f = undefined;
        this.hhm = undefined;
        i();
      }, o);
      return false;
    }
  }
  BCe() {
    if (this.ahm) {
      if (this.ahm.Valid()) {
        TimerSystem_1.TimerSystem.Remove(this.ahm);
      }
      this.ahm = undefined;
    }
  }
  RegisterPanel(t) {
    this.PanelBaseList.push(t);
  }
  RegisterValuePanel(t) {
    this.Bhm = t;
  }
  RegisterTipsItem(t) {
    this.TipsItem = t;
  }
  RegisterBackpackView(t) {
    this.BackpackView = t;
  }
  IsBackpackView() {
    return this.BackpackView !== undefined;
  }
  SetLogicState(t, i = undefined, o = undefined) {
    this.BCe();
    var e = this._ii;
    this._ii = t;
    this.d_m = i;
    this.m_m = o;
    if (t === 0) {
      this.khm.clear();
      this.InitDataSelectState();
      if (e === 4) {
        this.BackpackView?.SetSellMode(false);
      }
      this.HandleGamepadLogicToNormal();
    } else if (t === 4) {
      this.InitDataSelectState();
      this.BackpackView?.SetSellMode(true);
      this.khm.clear();
      this.qhm = 0;
      this.Bhm.SetValue(0);
    }
    for (const r of this.PanelBaseList) {
      r.OnBackpackLogicStateChange(t);
    }
  }
  GetLogicState() {
    return this._ii;
  }
  InitDataSelectState() {
    var t = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon() ? 2 : 1;
    for (const i of ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(t).GetItemDataList()) {
      i.SetIsSelected(false);
    }
  }
  HandleGamepadLogicToNormal() {
    ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic()?.TriggerCurItemEnterGrid();
  }
  OnUnlockSlot(t) {
    for (const i of this.PanelBaseList) {
      if (i.GetBackpackType() === 3) {
        i.RefreshUnlockSlot();
        return;
      }
    }
  }
  RefreshItemLockState(t, i) {
    for (const o of this.PanelBaseList) {
      if (o.GetBackpackType() === i) {
        o.RefreshSingleItem(t);
        return;
      }
    }
  }
  RegisterSingleSellItem(t) {
    var i = !t.GetIsSelected();
    t.SetIsSelected(i);
    if (i) {
      this.khm.add(t);
      this.qhm += t.GetSellPrice();
    } else {
      this.khm.delete(t);
      this.qhm -= t.GetSellPrice();
    }
    this.Bhm.SetValue(this.qhm);
  }
  DoSell() {
    if (this.khm.size === 0) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("HonamiStory_Sell_NoItem_Tip");
    } else {
      var t = [];
      for (const o of this.khm) {
        var i = {
          ItemData: o,
          BackpackType: 1
        };
        t.push(i);
      }
      UiManager_1.UiManager.OpenView("HonamiStorySellConfirmBoxView", {
        SellItemList: t,
        SellCallback: () => {
          this.khm.clear();
          this.qhm = 0;
          this.Bhm.SetValue(0);
          this.SetLogicState(0);
          ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetLockUseDragStateByPanelItem(this.BackpackView.GetRootItem(), false);
        }
      });
    }
  }
  DoSellToAll(t, i, o = 0) {
    var e = [];
    if (t) {
      for (const r of ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(1).GetItemDataList()) {
        if (r.GetItemType() === i && !r.IsLock() && (o === 0 || o === r.GetQuality())) {
          r.SetIsSelected(true);
          e.push(r);
          this.khm.add(r);
        }
      }
      this.qhm = 0;
      for (const s of this.khm) {
        this.qhm += s.GetSellPrice();
      }
    } else {
      for (const h of this.khm) {
        if (h.GetItemType() === i && (o === 0 || o === h.GetQuality())) {
          e.push(h);
          h.SetIsSelected(false);
        }
      }
      for (const n of e) {
        this.khm.delete(n);
        this.qhm -= n.GetSellPrice();
      }
    }
    this.Bhm.SetValue(this.qhm);
    for (const l of this.PanelBaseList) {
      if (l.GetBackpackType() === 0) {
        for (const a of e) {
          l.RefreshSingleItem(a);
        }
        return;
      }
    }
  }
  async DoTipsWithPluginsInstead(i, o) {
    if (!this.d_m) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 77, "Enter TipsWithPlugins Error");
      }
      return false;
    }
    let e = false;
    if (this.m_m !== 4) {
      let t = false;
      if (t = o !== undefined && this.m_m === 1 ? ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(1).GetCapacity() <= this.d_m.GetPosition() : t) {
        e = true;
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_NoSpaceForQuickAll");
      } else {
        e = await HonamiStoryController_1.HonamiStoryController.RequestSwitchItem(this.d_m, o, this.d_m.GetPosition(), i, this.m_m, 4);
      }
    } else {
      e = await HonamiStoryController_1.HonamiStoryController.RequestSwitchInSameBag(this.d_m, i, 4);
    }
    if (e) {
      this.TipsItem.OnClickedMask();
    }
    return e;
  }
  GetInsteadItem() {
    return this.d_m;
  }
  GetTipsOpen() {
    return this.GetLogicState() === 1 || this.GetLogicState() === 2;
  }
  CloseTips() {
    this.TipsItem.OnClickedMask();
  }
  SetInteractController(t) {
    this.vzi = t;
  }
  GetInteractController() {
    return this.vzi;
  }
  RefreshNeedQuickAll() {
    for (const t of this.PanelBaseList) {
      if (t.GetBackpackType() === 3) {
        HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView();
        t.RefreshNeedQuickAll();
        return;
      }
    }
  }
}
exports.HonamiStoryBackpackLogicController = HonamiStoryBackpackLogicController;
//# sourceMappingURL=HonamiStoryBackpackLogicController.js.map