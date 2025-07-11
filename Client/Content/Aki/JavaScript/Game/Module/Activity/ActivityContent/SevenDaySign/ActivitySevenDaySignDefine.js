"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VersionSignRewardItem = exports.NormalRewardItem = exports.ImportantRewardItem = exports.SignRewardItemBase = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class SignRewardItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Index = 0;
    this.CanGetReward = false;
    this.OnClickToGet = undefined;
    this.OnClickToggle = () => {
      this.OnClickToGet?.(this.Index);
    };
  }
  RefreshByData(t, e, i) {}
  GetRewardStateTextId(t) {
    switch (t) {
      case Protocol_1.Aki.Protocol.zps.Z6n:
        return "NeedSign";
      case Protocol_1.Aki.Protocol.zps.CMs:
        return "CanGetReward";
      case Protocol_1.Aki.Protocol.zps.ovs:
        return "CollectActivity_state_recived";
      default:
        return "NeedSign";
    }
  }
  OnBeforeDestroyImplement() {
    this.OnClickToGet = undefined;
  }
}
class ImportantRewardItem extends (exports.SignRewardItemBase = SignRewardItemBase) {
  constructor() {
    super(...arguments);
    this.BigIconPath = "";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIExtendToggle], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[5, this.OnClickToggle]];
  }
  SetDayText(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "DayNum", t);
  }
  SetStateText(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t);
  }
  RefreshByData(t, e, i) {
    this.Index = i;
    this.SetDayText(i + 1);
    this.SetStateText(this.GetRewardStateTextId(e));
    var i = e === Protocol_1.Aki.Protocol.zps.ovs;
    var s = e === Protocol_1.Aki.Protocol.zps.CMs;
    this.CanGetReward = s;
    var r = this.GetText(4);
    r?.SetChangeColor(e === Protocol_1.Aki.Protocol.zps.Z6n, r.changeColor);
    this.GetItem(6).SetUIActive(i);
    this.GetItem(9).SetUIActive(!s && !i);
    this.GetSprite(7).SetUIActive(s);
    this.GetSprite(1).SetUIActive(s);
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s ? "SP_NewSignInBigItemBg_Reward" : "SP_NewSignInBigItemBg_Normal");
    this.SetSpriteByPath(e, this.GetSprite(0), false);
    this.GetItem(8).SetUIActive(s);
    if (!StringUtils_1.StringUtils.IsEmpty(this.BigIconPath)) {
      this.SetTextureByPath(this.BigIconPath, this.GetTexture(2));
    }
  }
}
exports.ImportantRewardItem = ImportantRewardItem;
class NormalRewardItem extends SignRewardItemBase {
  constructor() {
    super(...arguments);
    this.b3e = undefined;
    this.Mne = 0;
    this.q3e = () => {
      if (this.CanGetReward) {
        this.OnClickToGet?.(this.Index);
      } else {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.Mne);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIExtendToggle], [4, UE.UIItem], [5, UE.UISprite], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UIItem]];
    this.BtnBindInfo = [[3, this.OnClickToggle]];
  }
  async OnBeforeStartAsync() {
    this.b3e = new SmallItemGrid_1.SmallItemGrid();
    this.b3e.SkipDestroyActor = true;
    await this.b3e.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.b3e.GetItemGridExtendToggle().CanExecuteChange.Bind(() => false);
    this.b3e.BindOnExtendToggleClicked(this.q3e);
  }
  OnBeforeDestroy() {
    if (this.b3e) {
      this.AddChild(this.b3e);
    }
  }
  SetDayText(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "DayNum", t);
  }
  SetStateText(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t);
  }
  RefreshByData(t, e, i) {
    this.Index = i;
    this.Mne = t.ItemId;
    this.SetDayText(i + 1);
    this.SetStateText(this.GetRewardStateTextId(e));
    var i = e === Protocol_1.Aki.Protocol.zps.ovs;
    var s = e === Protocol_1.Aki.Protocol.zps.CMs;
    this.CanGetReward = s;
    var r = this.GetText(2);
    r?.SetChangeColor(e === Protocol_1.Aki.Protocol.zps.Z6n, r.changeColor);
    this.GetItem(4).SetUIActive(i);
    this.GetSprite(5).SetUIActive(s);
    this.GetSprite(6).SetUIActive(s);
    var r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s ? "SP_NewSignInSmallItemBg_Reward" : "SP_NewSignInSmallItemBg_Normal");
    this.SetSpriteByPath(r, this.GetSprite(7), false);
    this.GetItem(8).SetUIActive(s);
    this.cNe(t, e);
  }
  cNe(t, e) {
    var i = t.Count;
    var s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(this.Mne);
    var r = e === Protocol_1.Aki.Protocol.zps.CMs;
    var o = e === Protocol_1.Aki.Protocol.zps.Z6n;
    var a = e === Protocol_1.Aki.Protocol.zps.ovs;
    switch (s) {
      case 1:
        var h = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.Mne);
        var h = {
          Data: t,
          ElementId: h.ElementId,
          Type: 2,
          ItemConfigId: this.Mne,
          BottomText: i.toString(),
          QualityId: h.QualityId,
          IsReceivableVisible: r,
          IsLockVisible: o,
          IsReceivedVisible: a
        };
        this.b3e.Apply(h);
        break;
      case 3:
        h = {
          Data: t,
          Type: 3,
          ItemConfigId: this.Mne,
          BottomText: i.toString(),
          IsReceivableVisible: r,
          IsLockVisible: o,
          IsReceivedVisible: a
        };
        this.b3e.Apply(h);
        break;
      default:
        h = {
          Data: t,
          Type: 4,
          ItemConfigId: this.Mne,
          BottomText: i.toString(),
          IsReceivableVisible: r,
          IsLockVisible: o,
          IsReceivedVisible: a
        };
        this.b3e.Apply(h);
    }
  }
}
exports.NormalRewardItem = NormalRewardItem;
class VersionSignRewardItem extends SignRewardItemBase {
  constructor() {
    super(...arguments);
    this._Ne = undefined;
    this.Mne = 0;
    this.G3e = () => {
      if (this.CanGetReward) {
        this.OnClickToGet?.(this.Index);
      } else {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.Mne);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickToggle]];
  }
  OnStart() {
    this._Ne = new SmallItemGrid_1.SmallItemGrid();
    this._Ne.Initialize(this.GetItem(4).GetOwner());
    this._Ne.BindOnCanExecuteChange(() => false);
    this._Ne.BindOnExtendToggleClicked(this.G3e);
  }
  RefreshByData(t, e, i) {
    this.Index = i;
    this.Mne = t.ItemId;
    this.N3e(i + 1);
    var i = e === Protocol_1.Aki.Protocol.zps.ovs;
    var s = e === Protocol_1.Aki.Protocol.zps.CMs;
    this.CanGetReward = s;
    this.O3e(this.GetRewardStateTextId(e));
    this.GetItem(1).SetUIActive(s);
    this.GetItem(2).SetUIActive(i);
    this.cNe(t, e);
  }
  N3e(t) {
    this.GetText(5).SetText("0" + t.toString());
  }
  O3e(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t);
  }
  cNe(t, e) {
    var i = t.Count;
    var s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(this.Mne);
    var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(this.Mne)?.QualityId ?? 1;
    var o = e === Protocol_1.Aki.Protocol.zps.CMs;
    var a = e === Protocol_1.Aki.Protocol.zps.Z6n;
    var h = e === Protocol_1.Aki.Protocol.zps.ovs;
    switch (s) {
      case 1:
        var l = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.Mne);
        var l = {
          Data: t,
          ElementId: l.ElementId,
          Type: 2,
          ItemConfigId: this.Mne,
          BottomText: i.toString(),
          QualityId: l.QualityId,
          IsReceivableVisible: o,
          IsLockVisible: a,
          IsReceivedVisible: h
        };
        this._Ne.Apply(l);
        break;
      case 3:
        l = {
          Data: t,
          Type: 3,
          ItemConfigId: this.Mne,
          BottomText: i.toString(),
          IsReceivableVisible: o,
          IsLockVisible: a,
          IsReceivedVisible: h
        };
        this._Ne.Apply(l);
        break;
      default:
        l = {
          Data: t,
          Type: 4,
          ItemConfigId: this.Mne,
          BottomText: i.toString(),
          IsReceivableVisible: o,
          IsLockVisible: a,
          IsReceivedVisible: h
        };
        this._Ne.Apply(l);
    }
    this.GetItem(6)?.SetUIActive(r === 5);
  }
}
exports.VersionSignRewardItem = VersionSignRewardItem;
//# sourceMappingURL=ActivitySevenDaySignDefine.js.map