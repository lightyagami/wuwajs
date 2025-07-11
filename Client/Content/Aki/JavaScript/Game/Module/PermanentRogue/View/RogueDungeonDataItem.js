"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueDungeonDataItem = undefined;
const UE = require("ue");
const RogueResDungeonConfigById_1 = require("../../../../Core/Define/ConfigQuery/RogueResDungeonConfigById");
const RogueResThemeById_1 = require("../../../../Core/Define/ConfigQuery/RogueResThemeById");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AutoAttachItem_1 = require("../../AutoAttach/AutoAttachItem");
const SORT_MAX = 1;
const SORT_EMPTY = 0;
class RogueDungeonDataItem extends AutoAttachItem_1.AutoAttachItem {
  constructor(e) {
    super();
    this.Pe = undefined;
    this.fLt = undefined;
    this.OnToggleClick = undefined;
    this.OnSelectCall = undefined;
    this.CheckToggleCanClick = undefined;
    this.Xpt = () => {
      this.GetExtendToggle(0)?.SetToggleStateForce(1, false);
      this.OnToggleClick?.(this);
    };
    this.UHl = () => !this.CheckToggleCanClick || this.CheckToggleCanClick(this.Pe);
    this.fLt = e.GetComponentByClass(UE.LGUICanvas.StaticClass());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Xpt]];
  }
  OnStart() {
    this.GetExtendToggle(0)?.CanExecuteChange.Bind(this.UHl);
  }
  OnSelect() {
    if (this.OnSelectCall && this.Pe) {
      this.OnSelectCall(this.Pe);
    }
    this.GetExtendToggle(0)?.SetToggleStateForce(1, false);
    this.fLt.SetSortOrder(SORT_MAX, true);
  }
  OnUnSelect() {
    this.GetExtendToggle(0)?.SetToggleStateForce(0, false);
    this.fLt.SetSortOrder(SORT_EMPTY, true);
  }
  OnRefreshItem(e) {
    this.Pe = e;
    this.M5c();
    this._Oe();
  }
  OnMoveItem() {
    this.GetExtendToggle(0)?.SetToggleStateForce(0, false);
  }
  M5c() {
    var e;
    if (this.Pe === undefined) {
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_SelectLevelPixEmpty");
      this.SetTextureByPath(e, this.GetTexture(1));
    } else if (e = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(this.Pe)) {
      e = ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() === 0 ? e.IconF : e.IconM;
      this.SetTextureByPath(e, this.GetTexture(1));
    }
  }
  _Oe() {
    var e;
    var t;
    if (this.Pe === undefined) {
      this.GetExtendToggle(0).SetSelfInteractive(false);
      this.GetItem(3)?.SetUIActive(false);
      this.GetItem(2)?.SetUIActive(false);
    } else {
      this.GetExtendToggle(0).SetSelfInteractive(true);
      if (e = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(this.Pe)) {
        e = RogueResThemeById_1.configRogueResThemeById.GetConfig(e.SeasonId).Insts.indexOf(this.Pe) === 0;
        t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetInstDungeonState(this.Pe);
        this.GetItem(3)?.SetUIActive(!e && t === 0);
        this.GetItem(2)?.SetUIActive(t === 2);
      }
    }
  }
  GetData() {
    return this.Pe;
  }
  UnSelectWhenEnter() {
    this.GetExtendToggle(0)?.SetToggleStateForce(0, false);
    this.fLt.SetSortOrder(SORT_EMPTY, true);
  }
}
exports.RogueDungeonDataItem = RogueDungeonDataItem;
//# sourceMappingURL=RogueDungeonDataItem.js.map