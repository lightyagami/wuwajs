"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerInfoModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const RandomSystem_1 = require("../../../Core/Random/RandomSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
class PlayerInfoModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.tMi = undefined;
    this.N3a = undefined;
    this.F3a = undefined;
    this.RandomSeed = 0;
  }
  GetId() {
    return this.xe;
  }
  SetId(e) {
    this.xe = e;
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.RecentlyLoginUID, e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Log", 37, "设置当前UID", ["UID", e]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangePlayerInfoId, e);
  }
  GetIconList() {
    return this.fXi;
  }
  SetIconList(e) {
    this.fXi = e;
  }
  GetFrameList() {
    return this.pXi;
  }
  SetFrameList(e) {
    this.pXi = e;
  }
  GetNumberProp() {
    return this.vXi;
  }
  SetNumberProp(e) {
    this.vXi = e;
  }
  GetStringProp() {
    return this.MXi;
  }
  SetStringProp(e) {
    this.MXi = e;
  }
  ChangeNumberProp(e, t) {
    if (this.vXi !== undefined) {
      this.vXi.set(e, t);
    }
    if (e === 13 || e === 2 || e === 3) {
      t = this.GetPlayerMoneyItemId(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerCurrencyChange, t);
    }
  }
  ChangeStringProp(e, t) {
    if (this.MXi) {
      this.MXi.set(e, t);
    }
  }
  GetNumberPropById(e) {
    if (this.vXi !== undefined) {
      return this.vXi.get(e);
    }
  }
  SetNumberPropById(e, t) {
    if (this.vXi !== undefined) {
      this.vXi.set(e, t);
    }
  }
  GetPlayerGender() {
    var e = this.GetNumberPropById(9);
    if (e === undefined) {
      return 2;
    } else {
      return e;
    }
  }
  GetPlayerMoney(e) {
    if (e === ItemDefines_1.EItemId.Gold) {
      return this.GetNumberPropById(2) ?? 0;
    } else if (e === ItemDefines_1.EItemId.BlackCard) {
      return this.GetNumberPropById(3) ?? 0;
    } else if (e === ItemDefines_1.EItemId.PayGold) {
      return this.GetNumberPropById(13) ?? 0;
    } else if (e === ItemDefines_1.EItemId.Power) {
      return ModelManager_1.ModelManager.PowerModel.GetPowerDataById(ItemDefines_1.EItemId.Power).GetCurrentPower();
    } else if (e === ItemDefines_1.EItemId.OverPower) {
      return ModelManager_1.ModelManager.PowerModel.GetPowerDataById(ItemDefines_1.EItemId.OverPower).GetCurrentPower();
    } else {
      return 0;
    }
  }
  GetPlayerMoneyItemId(e) {
    if (e === 2) {
      return ItemDefines_1.EItemId.Gold;
    } else if (e === 3) {
      return ItemDefines_1.EItemId.BlackCard;
    } else if (e === 13) {
      return ItemDefines_1.EItemId.PayGold;
    } else {
      return undefined;
    }
  }
  GetAccountName(e = true) {
    if (this.MXi) {
      if (!e || ConfigManager_1.ConfigManager.PlayerInfoConfig.GetIsUseAccountName()) {
        return ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
      } else {
        e = this.GetPlayerRoleId();
        return ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e).GetRoleRealName();
      }
    }
  }
  IsPlayerId(e, t = undefined) {
    var t = t ?? this.GetId();
    var r = this.GetPlayerRoleId();
    return t === this.GetId() && e === r;
  }
  GetPlayerRoleId() {
    return ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId();
  }
  GetPlayerHeadIconBig() {
    var e = this.GetNumberPropById(4);
    if (e) {
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      if (e) {
        return e.RoleHeadIconBig;
      }
    }
    return "";
  }
  GetPlayerHeadIconLarge() {
    var e = this.GetNumberPropById(4);
    if (e) {
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      if (e) {
        return e.RoleHeadIconLarge;
      }
    }
    return "";
  }
  GetPlayerHeadIconCircle() {
    var e = this.GetNumberPropById(4);
    if (e) {
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      if (e) {
        return e.RoleHeadIconCircle;
      }
    }
    return "";
  }
  GetHeadIconId() {
    var e = this.GetNumberPropById(4);
    return e || 0;
  }
  GetPlayerStand() {
    var e = this.GetPlayerGender();
    if (e === 1) {
      return ConfigManager_1.ConfigManager.PlayerInfoConfig.GetMaleStandPath();
    } else if (e === 0) {
      return ConfigManager_1.ConfigManager.PlayerInfoConfig.GetFemaleStandPath();
    } else {
      return undefined;
    }
  }
  GetPlayerLevel() {
    return this.GetNumberPropById(0);
  }
  GetRandomSeed() {
    return this.RandomSeed;
  }
  AdvanceRandomSeed(e) {
    var t = this.RandomSeed;
    this.RandomSeed = RandomSystem_1.default.IterateRandomSeed(t, e);
    return t;
  }
  InitThirdPartyId(e, t, r) {
    this.tMi = e;
    this.N3a = t;
    this.F3a = r;
  }
  GetThirdPartyUserId() {
    return this.tMi;
  }
  GetThirdPartyOnlineId() {
    return this.N3a;
  }
  GetThirdPartyAccountId() {
    return this.F3a;
  }
}
exports.PlayerInfoModel = PlayerInfoModel;
//# sourceMappingURL=PlayerInfoModel.js.map