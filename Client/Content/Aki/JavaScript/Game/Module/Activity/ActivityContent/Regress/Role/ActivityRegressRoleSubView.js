"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressRoleSubView = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GachaDefine_1 = require("../../../../Gacha/GachaDefine");
const SpineRoleGachaPoolItem_1 = require("../../../../Gacha/GachaMainView/SpineRoleGachaPoolItem");
const UpRoleGachaPoolItem_1 = require("../../../../Gacha/GachaMainView/UpRoleGachaPoolItem");
const RoleController_1 = require("../../../../RoleUi/RoleController");
const ActivityRoleDescribeComponent_1 = require("../../UniversalComponents/ActivityRoleDescribeComponent");
const ActivityRegressDefine_1 = require("../ActivityRegressDefine");
const ActivityRegressMainSubViewBase_1 = require("../Base/ActivityRegressMainSubViewBase");
const ActivityRegressTabGroupPanel_1 = require("../Panels/ActivityRegressTabGroupPanel");
const ActivityRegressRoleActivityInfoPanel_1 = require("./ActivityRegressRoleActivityInfoPanel");
class ActivityRegressRoleSubView extends ActivityRegressMainSubViewBase_1.ActivityRegressMainSubViewBase {
  constructor() {
    super(...arguments);
    this.tma = undefined;
    this.Oda = undefined;
    this.ima = undefined;
    this.Gda = undefined;
    this.Xda = undefined;
    this.Lo = undefined;
    this.oCa = undefined;
    this.$Ql = undefined;
    this.XQl = 0;
    this.Wwn = e => {
      var i;
      var t;
      var e = this.Gda[e].Config;
      this.ima.RefreshData(e);
      var s = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(e.GachaId);
      if (s === undefined) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("ActivityRecall", 63, "回流活动->ActivityRecallRoleSubView.TabCallBack 不存在该抽卡数据", ["GachaId: ", e.GachaId]);
        }
      } else if ((i = (t = s.UsePoolId) > 0 ? s.GetPoolInfo(t) : s.GetFirstValidPool()) === undefined) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("ActivityRecall", 63, "[回流活动]ActivityRecallRoleSubView->TabCallBack 不存在该卡池数据", ["GachaId: ", e.GachaId], ["usePoolId: ", t]);
        }
      } else {
        this.YQl(s, i);
        this.Lo = e;
        t = ModelManager_1.ModelManager.ActivityRegressModel.GetGachaRoleId(e.GachaId);
        this.tma.Update(t);
        this.SequencePlayer.PlaySequence("Start");
      }
    };
    this.rma = () => {
      var e = ModelManager_1.ModelManager.ActivityRegressModel.GetGachaTrialRoleId(this.Lo.GachaId);
      RoleController_1.RoleController.OpenRoleMainView(1, 0, [e]);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = ActivityRegressDefine_1.activityRegressMainViewComponentsInfo;
    this.BtnBindInfo = [[2, this.rma]];
  }
  async OnBeforeStartAsync() {
    this.Xda = this.OpenParam;
    var e = this.GetItem(4);
    this.XQl = e.GetAnchorOffsetX();
    e = this.GetItem(1).GetOwner();
    this.tma = new ActivityRoleDescribeComponent_1.ActivityRoleDescribeComponent();
    await this.tma.CreateThenShowByActorAsync(e, undefined, true);
    e = this.GetItem(6).GetOwner();
    this.ima = new ActivityRegressRoleActivityInfoPanel_1.ActivityRegressRoleActivityInfoPanel();
    await this.ima.CreateThenShowByActorAsync(e);
  }
  OnStart() {
    super.OnStart();
    var e = this.GetHorizontalLayout(0);
    var i = this.GetItem(5);
    this.Oda = new ActivityRegressTabGroupPanel_1.ActivityRegressTabGroupPanel(e, i, this.Wwn);
    this.Oda.Init();
    this.GetItem(3).SetUIActive(true);
  }
  OnBeforeDestroy() {
    this.Oda.Destroy();
    this.Oda = undefined;
  }
  OnUpdate(e) {
    var i = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetSortedOpenRegressBaseConfigList();
    this.Gda = [];
    for (const a of i) {
      var t = new ActivityRegressDefine_1.ActivityRegressTabSwitchItemCommonData();
      t.RecallEntryType = this.Xda;
      t.Config = a;
      var s = ModelManager_1.ModelManager.ActivityRegressModel.GetRoleConfigByGachaId(a.GachaId);
      t.Title = s.Name;
      this.Gda.push(t);
    }
    this.GetItem(7).SetUIActive(this.Gda.length > 1);
    this.Oda.RefreshByData(this.Gda, e);
  }
  OnParentShow() {
    super.OnParentShow();
    this.oCa?.PlayStartSeq();
  }
  async YQl(e, i) {
    var t;
    var e = new GachaDefine_1.GachaPoolData(e, i);
    var i = i.Id;
    var i = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(i);
    if (StringUtils_1.StringUtils.IsBlank(i.SpinePrefabResource)) {
      if (this.$Ql !== 0) {
        await this.oCa?.DestroyAsync();
        this.oCa = undefined;
        this.oCa = new UpRoleGachaPoolItem_1.UpRoleGachaPoolItem(2);
        t = this.GetItem(4);
        await this.oCa.CreateThenShowByResourceIdAsync("UiItem_LuckdrawPixF", t);
        this.$Ql = 0;
      }
    } else {
      await this.oCa?.DestroyAsync();
      this.oCa = new SpineRoleGachaPoolItem_1.SpineRoleGachaPoolItem(2);
      t = i.SpinePrefabResource;
      i = this.GetItem(8);
      await this.oCa.CreateThenShowByResourceIdAsync(t, i);
      this.oCa.GetRootItem().SetAnchorOffsetX(this.XQl);
      this.$Ql = 1;
    }
    this.oCa.SetDescUiActive(false);
    this.oCa.Update(e);
    this.oCa.PlayStartSeq();
  }
}
exports.ActivityRegressRoleSubView = ActivityRegressRoleSubView;
//# sourceMappingURL=ActivityRegressRoleSubView.js.map