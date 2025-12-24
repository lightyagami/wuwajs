"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryGamepadInteractController = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const HonamiStoryController_1 = require("../../HonamiStoryController");
const HonamiStoryDefine_1 = require("../../HonamiStoryDefine");
const HonamiStoryInteractOperateAgent_1 = require("./HonamiStoryInteractOperateAgent");
class HonamiStoryGamepadInteractController {
  constructor() {
    this.PanelBaseList = [];
    this.Tgd = new HonamiStoryInteractOperateAgent_1.HonamiStoryInteractOperateAgent();
    this.C2m = -1;
    this.p2m = -1;
  }
  RegisterPanel(t) {
    this.PanelBaseList.push(t);
  }
  ClearPanel() {
    this.PanelBaseList = [];
  }
  get lbi() {
    return ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic();
  }
  CheckOverflowByLeftOrRight(t, e, i, r) {
    t %= i;
    let s = 0;
    e = e.GetData();
    e = t + ((s = e ? e.GetGridWidth() : s) - 1) + r > i;
    return t + r < 0 || e;
  }
  HasFallingPile() {
    return this.PanelBaseList.length > 2;
  }
  nQm(t) {
    t = HonamiStoryDefine_1.HonamiBackpackTypeMap.get(t);
    if (t) {
      return ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(t);
    }
  }
  GetBackpackCapacity(t) {
    let e = 0;
    t = this.nQm(t);
    return e = t ? t.GetCapacity() : e;
  }
  GetBackpackWidth(t) {
    let e = 0;
    t = this.nQm(t);
    return e = t ? t.GetWidthCount() : e;
  }
  sQm(t, e) {
    return Math.floor(t / e);
  }
  aQm(t, e) {
    return t % e;
  }
  v2m(t, e, i, r) {
    var s;
    var a;
    var o = this.aQm(t, r);
    var t = this.sQm(t, r);
    let n = 0;
    let h = 0;
    return (h = e === 1 && i === 1 ? (n = o, t) : e % 2 == 1 && i % 2 == 1 ? (s = Math.floor(i / 2), a = Math.floor(e / 2), n = o + s, t + a) : e % 2 == 0 && i % 2 == 0 ? (n = o + i - 1, t + e - 1) : e % 2 == 1 && i % 2 == 0 ? (s = Math.floor(e / 2), n = o + i - 1, t + s) : e % 2 == 0 && i % 2 == 1 ? (a = Math.floor(i / 2), n = o + a, t + e - 1) : (n = o, t)) * r + n;
  }
  y2m(t, e) {
    let i = 0;
    let r = 0;
    let s = 0;
    t = t.GetData();
    if (t) {
      i = t.GetPosition();
      r = t.GetGridWidth();
      s = t.GetGridHeight();
    }
    return this.v2m(i, r, s, e);
  }
  GetGridItemListByBackpackType(t) {
    let e = [];
    for (const i of this.PanelBaseList) {
      if (i.GetBackpackType() === t) {
        e = i.GetCurrentGridListGamepad();
        break;
      }
    }
    return e;
  }
  GetGridItemByPosition(t, e) {
    for (const r of this.GetGridItemListByBackpackType(e)) {
      var i = r.GetData();
      if (i) {
        if (i.GetPosition() === t || i.GetGridFillPositionList().includes(t)) {
          return r;
        }
      } else if (r.GetEmptyPosition() === t) {
        return r;
      }
    }
  }
  GetPanelByBackpackType(t) {
    let e = undefined;
    for (const i of this.PanelBaseList) {
      if (i.GetBackpackType() === t) {
        e = i;
        break;
      }
    }
    return e;
  }
  GetPanelByGridItem(t) {
    let e = undefined;
    for (const i of this.PanelBaseList) {
      for (const r of i.GetCurrentGridListGamepad()) {
        if (r === t) {
          e = i;
          break;
        }
      }
    }
    return e;
  }
  GetPanelIndexByGridItem(t) {
    let e = 0;
    t = this.GetPanelByGridItem(t);
    if (t) {
      switch (t.GetBackpackType()) {
        case 3:
          e = 1;
          break;
        case 0:
        case 1:
          e = 2;
          break;
        case 2:
          e = 3;
      }
    }
    return e;
  }
  GetEquipIndexByGridItem(t) {
    var e = this.PanelBaseList.find(t => t.GetBackpackType() === 3);
    let i = 0;
    if (e) {
      for (const r of e.GetCurrentGridListGamepad()) {
        if (r === t) {
          break;
        }
        i++;
      }
    }
    return i;
  }
  OnPickUp(t) {
    var e;
    var i = this.GetPanelByGridItem(t);
    if (!!i && ((e = i.GetBackpackType()) === 0 || e === 2 || e === 1)) {
      this.C2m = this.GetBackpackWidth(i.GetBackpackType());
      this.p2m = this.y2m(t, this.C2m);
    }
    this.Tgd.Clear();
    this.Tgd.BaseWidth = 0;
    this.Tgd.BaseHeight = 0;
    this.Tgd.StartOperateBackpack = i;
    this.Tgd.OperateData = t.GetData();
    this.OnMove(t);
  }
  OnMove(t) {
    var e = this.GetPanelByGridItem(t);
    if (e) {
      if (this.Tgd.TargetOperateBackpack !== e) {
        this.Tgd.TargetOperateBackpack?.OnHoverEnd();
        this.Tgd.TargetOperateBackpack = e;
        this.Tgd.TargetOperateBackpack?.OnHoverGamepad(t, this.p2m, this.Tgd);
      } else {
        this.Tgd.TargetOperateBackpack.OnHoverGamepad(t, this.p2m, this.Tgd);
      }
    } else {
      this.Tgd.TargetOperateBackpack?.OnHoverEnd();
      this.Tgd.TargetOperateBackpack = undefined;
      this.Tgd.TargetPosition = -1;
    }
  }
  OnPutDown(t) {
    this.bgd(t);
    if (this.Tgd.TargetOperateBackpack) {
      this.Tgd.TargetOperateBackpack.OnHoverEnd();
    }
  }
  bgd(t) {
    if (this.Tgd.TargetOperateBackpack && this.Tgd.StartOperateBackpack) {
      var e = [];
      if (this.Tgd.TargetOperateBackpack === this.Tgd.StartOperateBackpack) {
        var i = this.Tgd.TargetOperateBackpack.GetUpdateInfoInSameBackpackGamepad(t, this.Tgd.OperateData);
        if (!i) {
          this.lbi.Reset();
          return;
        }
        e.push(i);
      } else {
        i = this.Tgd.TargetOperateBackpack.GetExchangeItemSetGamepad(t, this.Tgd.OperateData);
        if (!i) {
          this.lbi.Reset();
          return;
        }
        var r = this.Tgd.TargetOperateBackpack.GetUpdateInfoInReceiveBackpackGamepad(t, this.Tgd.OperateData, i);
        if (!r) {
          this.lbi.Reset();
          return;
        }
        e.push(r);
        r = this.Tgd.StartOperateBackpack.GetUpdateInfoInSendBackpackGamepad(t, this.Tgd.OperateData, i);
        if (!r) {
          this.lbi.Reset();
          return;
        }
        e.push(r);
      }
      HonamiStoryController_1.HonamiStoryController.SendHonamiStoryBagOperateRequest(e);
    }
  }
  Reset() {
    this.C2m = -1;
    this.p2m = -1;
    for (const t of this.PanelBaseList) {
      t.OnHoverEnd();
    }
  }
}
exports.HonamiStoryGamepadInteractController = HonamiStoryGamepadInteractController;
//# sourceMappingURL=HonamiStoryGamepadInteractController.js.map