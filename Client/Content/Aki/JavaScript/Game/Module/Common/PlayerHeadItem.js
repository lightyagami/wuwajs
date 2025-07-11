"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerHeadItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class PlayerHeadItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.CreateThenShowByActor(e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  RefreshByPlayerId(e, r = false) {
    this.nSt(e, r);
  }
  nSt(e, r = false) {
    var a = ModelManager_1.ModelManager.PlayerInfoModel;
    var s = this.GetTexture(0);
    if (a.GetId() === e) {
      if (r) {
        a = ModelManager_1.ModelManager.PlayerInfoModel.GetHeadIconId();
        this.RefreshByRoleIdUseCard(a);
        return;
      } else {
        a = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerHeadIconBig();
        if (!StringUtils_1.StringUtils.IsEmpty(a)) {
          this.SetTextureByPath(a, s);
        }
        return;
      }
    }
    a = ModelManager_1.ModelManager.FriendModel.GetFriendById(e);
    if (a) {
      s = a.PlayerHeadPhoto;
      if (r) {
        this.RefreshByRoleIdUseCard(s);
      } else {
        this.RefreshByHeadPhotoId(s);
      }
    }
  }
  RefreshByHeadPhotoId(e) {
    this.RefreshByRoleId(e);
  }
  RefreshByRoleId(e) {
    const r = this.GetTexture(0);
    var a = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(e, false);
    if (a) {
      r.SetUIActive(false);
      this.SetTextureShowUntilLoaded(a.GetRoleHeadIconCircle(), r, () => {
        r.SetUIActive(true);
      });
    } else if (e > 0) {
      a = ConfigManager_1.ConfigManager.RoleConfig.GetRoleHeadIcon(e);
      this.SetRoleIcon(a, r, e);
    }
  }
  RefreshByRoleIdUseCard(e) {
    const r = this.GetTexture(0);
    var a = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(e, false);
    if (a) {
      r.SetUIActive(false);
      this.SetTextureShowUntilLoaded(a.GetRoleHeadIconCircle(), r, () => {
        r.SetUIActive(true);
      });
    } else {
      a = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).Card;
      this.SetRoleIcon(a, r, e);
    }
  }
  SetIsGray(e) {
    this.GetTexture(0).SetIsGray(e);
  }
}
exports.PlayerHeadItem = PlayerHeadItem;
//# sourceMappingURL=PlayerHeadItem.js.map