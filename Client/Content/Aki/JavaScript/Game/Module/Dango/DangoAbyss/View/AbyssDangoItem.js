"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbyssDangoItem = exports.AbyssDangoItemData = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const AbyssDangoCircleQulityItem_1 = require("./AbyssDangoCircleQulityItem");
class AbyssDangoItemData {
  constructor() {
    this.DangoId = 0;
    this.PlayerId = 0;
    this.RoleId = 0;
    this.SelectState = false;
    this.OnSelectCallBack = () => {};
  }
}
exports.AbyssDangoItemData = AbyssDangoItemData;
class AbyssDangoItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.$8i = new AbyssDangoItemData();
    this.hUc = undefined;
    this.lUc = undefined;
    this.wCo = false;
    this.PVi = e => {
      this.$8i.OnSelectCallBack(this.$8i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [3, UE.UIItem], [4, UE.UIText], [2, UE.UITexture], [5, UE.UIItem], [6, UE.UIExtendToggle], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[6, this.PVi]];
  }
  async OnBeforeStartAsync() {}
  OnBeforeDestroy() {
    if (this.wCo) {
      RedDotController_1.RedDotController.UnBindGivenUi("RedDotDangoFormationRole", this.GetItem(8));
    }
  }
  Refresh(e, t, s) {
    this.$8i = e;
    this._wc(e);
    this.Olt(e);
    this.cwc(e);
    this.mFe(e);
    this.Oqe(e);
    this.NFe(e);
    this.Cy1(e);
    if (e.PlayerId === ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
      RedDotController_1.RedDotController.BindRedDot("RedDotDangoFormationRole", this.GetItem(8), undefined, e.DangoId);
      this.wCo = true;
    }
  }
  Cy1(e) {
    var t;
    var s = ModelManager_1.ModelManager.EditBattleTeamModel.GetCurrentDungeonConfig;
    var i = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentOpenAbyssActivityData();
    if (s && i) {
      for (const r of i.GetAbyssChallengeDataList()) {
        if (r.GetConfig()?.InstId === s.Id) {
          t = r.GetConfig().RecommendLittleRole.includes(e.DangoId);
          this.GetItem(7)?.SetUIActive(t);
          return;
        }
      }
      this.GetItem(7)?.SetUIActive(false);
    }
  }
  Oqe(e) {
    e = e.SelectState ? 1 : 0;
    this.GetExtendToggle(6)?.SetToggleState(e);
  }
  mFe(e) {
    this._Uc(e);
  }
  _Uc(s) {
    var e = new UiAsyncTask_1.UiAsyncTask("RefreshQualitySpriteAsync", async () => {
      if (this.hUc) {
        await this.lUc.Promise;
      } else {
        this.hUc = new AbyssDangoCircleQulityItem_1.AbyssDangoCircleQualityItem();
        this.lUc = new CustomPromise_1.CustomPromise();
        await this.hUc.CreateByActorAsync(this.GetItem(0).GetOwner());
        this.lUc.SetResult();
        this.hUc.SetActive(true);
      }
      var e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(s.DangoId).GetEquipPluginMap();
      var t = new AbyssDangoCircleQulityItem_1.DangoCircleQualityData();
      t.PluginIdMap = e;
      this.hUc.RefreshData(t);
    });
    this.RunAsyncTask(e);
  }
  cwc(e) {
    e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(e.DangoId).GetFormationIcon();
    this.SetTextureByPath(e, this.GetTexture(1));
  }
  Olt(e) {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(e.DangoId);
    var t = e.GetLevel();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "AbyssDango_LV", t?.toString());
    this.GetItem(3)?.SetUIActive(!e.GetIfLock());
  }
  _wc(e) {
    var t = e.PlayerId;
    if (t !== 0 && !ModelManager_1.ModelManager.DangoAbyssModel?.CheckIsSelf(t) || e.RoleId === 0) {
      this.GetTexture(2)?.SetUIActive(false);
    } else {
      this.GetTexture(2)?.SetUIActive(true);
      t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.RoleId);
      this.SetRoleIcon(t.RoleHeadIconCircle, this.GetTexture(2), e.RoleId);
    }
  }
  NFe(e) {
    e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(e.DangoId).GetIfLock();
    this.GetItem(5)?.SetUIActive(e);
  }
}
exports.AbyssDangoItem = AbyssDangoItem;
//# sourceMappingURL=AbyssDangoItem.js.map