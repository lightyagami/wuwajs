"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattlePassRewardGridItem = exports.BattlePassRewardItem = exports.BattlePassRewardData = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const BattlePassController_1 = require("./../BattlePassController");
const BattlePassSmallGridItem_1 = require("./BattlePassSmallGridItem");
class BattlePassRewardData {
  constructor(t) {
    this.FreeRewardItem = [];
    this.PayRewardItem = [];
    this.Level = 0;
    this.Level = t;
  }
  IsThisType(t) {
    for (const s of this.FreeRewardItem) {
      if (s.ItemType === t) {
        return true;
      }
    }
    for (const e of this.PayRewardItem) {
      if (e.ItemType === t) {
        return true;
      }
    }
    return false;
  }
  GetItemCount(t, s) {
    if (t === Protocol_1.Aki.Protocol.ANs.Proto_Free) {
      const e = this.GetFreeRewardItem(s);
      return e.Item[1];
    }
    const e = this.GetPayRewardItem(s);
    return e.Item[1];
  }
  GetFreeRewardItem(t) {
    for (const s of this.FreeRewardItem) {
      if (s.Item[0].ItemId === t) {
        return s;
      }
    }
  }
  GetPayRewardItem(t) {
    for (const s of this.PayRewardItem) {
      if (s.Item[0].ItemId === t) {
        return s;
      }
    }
  }
}
exports.BattlePassRewardData = BattlePassRewardData;
class BattlePassRewardItem {
  constructor(t, s, e = 0) {
    this.Item = undefined;
    this.ItemType = undefined;
    this.Item = [{
      IncId: 0,
      ItemId: t
    }, s];
    this.ItemType = e;
  }
}
exports.BattlePassRewardItem = BattlePassRewardItem;
class BattlePassRewardGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.m2i = [];
    this.$Tt = undefined;
    this.d2i = t => {
      t = t.Data[0].ItemId;
      this.jbe(this.$Tt.FreeRewardItem[0].ItemType, t, Protocol_1.Aki.Protocol.ANs.Proto_Free);
    };
    this.C2i = t => {
      t = t.Data[0].ItemId;
      this.jbe(this.$Tt.PayRewardItem[0].ItemType, t, Protocol_1.Aki.Protocol.ANs.Proto_Pay);
    };
    this.g2i = t => {
      t = t.Data[0].ItemId;
      this.jbe(this.$Tt.PayRewardItem[1].ItemType, t, Protocol_1.Aki.Protocol.ANs.Proto_Pay);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [];
  }
  jbe(t, s, e) {
    if (t === 1) {
      BattlePassController_1.BattlePassController.RequestTakeBattlePassReward(e, this.$Tt.Level, s, this.GridIndex);
    } else {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(s);
    }
  }
  OnStart() {
    var t = new BattlePassSmallGridItem_1.BattlePassSmallGridItem();
    t.Initialize(this.GetItem(1).GetOwner());
    t.BindOnExtendToggleClicked(this.d2i);
    this.m2i.push(t);
    var t = new BattlePassSmallGridItem_1.BattlePassSmallGridItem();
    t.Initialize(this.GetItem(2).GetOwner());
    t.BindOnExtendToggleClicked(this.C2i);
    this.m2i.push(t);
    var t = new BattlePassSmallGridItem_1.BattlePassSmallGridItem();
    t.Initialize(this.GetItem(3).GetOwner());
    t.BindOnExtendToggleClicked(this.g2i);
    this.m2i.push(t);
  }
  f2i(t, s, e) {
    t.SetReceivedVisible(s === 2);
    t.SetLockVisible(s === 0);
    t.SetReceivableVisible(s === 1);
  }
  Refresh(t, s, e) {
    this.$Tt = t;
    this.GetText(0).SetText(t.Level.toString());
    if (t.FreeRewardItem.length === 1) {
      const e = 0;
      var r = this.m2i[0];
      r.SetActive(true);
      r.Refresh(t.FreeRewardItem[0].Item);
      this.f2i(r, t.FreeRewardItem[0].ItemType, 0);
    } else {
      this.m2i[0].SetActive(false);
    }
    var i;
    if (t.PayRewardItem.length === 2) {
      r = this.m2i[1];
      i = this.m2i[2];
      r.SetActive(true);
      i.SetActive(true);
      r.Refresh(t.PayRewardItem[0].Item);
      i.Refresh(t.PayRewardItem[1].Item);
      this.f2i(r, t.PayRewardItem[0].ItemType, 1);
      this.f2i(i, t.PayRewardItem[1].ItemType, 2);
    } else if (t.PayRewardItem.length === 1) {
      this.m2i[1].SetActive(true);
      this.m2i[2].SetActive(false);
      this.m2i[1].Refresh(t.PayRewardItem[0].Item);
      this.f2i(this.m2i[1], t.PayRewardItem[0].ItemType, 1);
    } else {
      this.m2i[1].SetActive(false);
      this.m2i[2].SetActive(false);
    }
  }
}
exports.BattlePassRewardGridItem = BattlePassRewardGridItem;
//# sourceMappingURL=BattlePassRewardGridItem.js.map