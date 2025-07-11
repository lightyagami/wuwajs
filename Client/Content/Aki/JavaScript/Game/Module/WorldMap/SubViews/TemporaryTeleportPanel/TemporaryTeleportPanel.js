"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemporaryTeleportPanel = undefined;
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const MapController_1 = require("../../../Map/Controller/MapController");
const WorldMapDefine_1 = require("../../WorldMapDefine");
const WorldMapSecondaryUiLayoutB_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutB");
class TemporaryTeleportPanel extends WorldMapSecondaryUiLayoutB_1.WorldMapSecondaryUiLayoutB {
  constructor() {
    super(...arguments);
    this.u2o = undefined;
    this.OnMiddleCenterBtnClick = () => {
      MapController_1.MapController.RequestTeleportToTargetByTemporaryTeleport(this.u2o.TeleportId);
      this.Close();
    };
    this.OnDelBtnClick = () => {
      this.Yuc();
    };
    this.zuc = () => {
      ControllerHolder_1.ControllerHolder.MapExploreToolController.RemoveTemporaryTeleportRequest(this.u2o.TeleportId, this.u2o.MarkId);
      this.Close();
    };
  }
  GetResourceId() {
    return "UiItem_TemporaryTeleportPanel_Prefab";
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(false);
    super.OnStart();
  }
  OnShowWorldMapSecondaryUi(e) {
    this.u2o = e;
    this.GetText(1).SetText(StringUtils_1.StringUtils.Format("{0}{1}/{2}", this.u2o.GetTitleText(), ModelManager_1.ModelManager.MapModel.GetMarkCountByType(15).toString(), CommonParamById_1.configCommonParamById.GetIntConfig("TemporaryTeleportCountLimit").toString()));
    this.RightConfirmBtn.SetUiActive(false);
    this.LeftConfirmBtn.SetUiActive(false);
    this.MiddleCenterBtn.SetUiActive(true);
    this.SetDelBtnActive(true);
    this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), false);
    this.GetText(2).SetText(this.u2o.GetDescText());
    this.GetText(3).SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
    this.l_i();
    this.Juc();
  }
  Yuc() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(263);
    e.FunctionMap.set(2, this.zuc);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  l_i() {
    this.MiddleCenterBtn.SetLocalText("TeleportFastMove");
    if (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()) {
      this.SetDelBtnActive(ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam());
    } else {
      this.SetDelBtnActive(true);
    }
    this.MiddleCenterBtn.SetEnableClick(!this.u2o.IsServerDisable);
  }
  Juc() {
    var e = this.u2o.ShowSecondaryUiMultiMapIcon();
    this.GetSprite(11).SetUIActive(true);
    var e = e ? WorldMapDefine_1.MULTI_MAP_SELECT_ICON_PATH : WorldMapDefine_1.TEMPORARY_TELEPORT_NORMAL_ICON_PATH;
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.SetSpriteByPath(e, this.GetSprite(11), false);
  }
}
exports.TemporaryTeleportPanel = TemporaryTeleportPanel;
//# sourceMappingURL=TemporaryTeleportPanel.js.map