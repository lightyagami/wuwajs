"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionalTerminalGroupItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RegionalTerminalGameplayItem_1 = require("./RegionalTerminalGameplayItem");
class RegionalTerminalGroupItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.Pe = undefined;
    this.BXm = undefined;
    this.vIl = false;
    this.OnClickToggleCallBack = undefined;
    this.IsToggleSelectOnCallBack = undefined;
    this.Wpu = (e, t) => {
      if (e === "Start" && t === "Start") {
        this.BXm?.PlayGridAnim();
      }
    };
    this.HXm = () => {
      var e = new RegionalTerminalGameplayItem_1.RegionalTerminalGameplayItem();
      e.OnClickToggleCallBack = this.kqe;
      e.IsToggleSelectOn = this.QXm;
      return e;
    };
    this.kqe = (e, t) => {
      this.OnClickToggleCallBack?.(e, t, this.Pe.GroupId);
    };
    this.QXm = e => this.IsToggleSelectOnCallBack?.(e) ?? false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIGridLayout], [5, UE.UIItem], [6, UE.UIItem]];
  }
  OnStart() {
    this.BXm = new GenericLayout_1.GenericLayout(this.GetGridLayout(4), this.HXm, undefined, true);
    this.GetGridLayout(4).GetOwner().OnSequencePlayEvent.Bind(this.Wpu);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetItem(6).SetUIActive(false);
  }
  async RefreshAsync(e, t, i) {
    this.Pe = e;
    e = ConfigManager_1.ConfigManager.RegionalTerminalConfig.GetAreaTerminalGroup(e.GroupId);
    this.SetTextureShowUntilLoaded(e.Icon, this.GetTexture(0));
    this.SetTextureShowUntilLoaded(e.IconShadow, this.GetTexture(1));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name);
    await this.BXm.RefreshByDataAsync(this.Pe.GameplayDataList.filter(e => e.GetShowState()).sort(ModelManager_1.ModelManager.RegionalTerminalModel.SortGameplayData));
  }
  RefreshFunctional() {
    this.BXm.GetLayoutItemList().forEach(e => {
      e.RefreshFunctional();
    });
  }
  SetSelectOn(e) {
    if (this.vIl !== e && (this.vIl = e, this.GetItem(6).SetUIActive(e), e)) {
      this.SPe?.PlayOrReplaySequenceByName("Select");
    }
  }
  GetGameplayItem(e) {
    return this.BXm.GetLayoutItemByKey(e);
  }
  GetKey(e, t) {
    return e.GroupId;
  }
}
exports.RegionalTerminalGroupItem = RegionalTerminalGroupItem;
//# sourceMappingURL=RegionalTerminalGroupItem.js.map