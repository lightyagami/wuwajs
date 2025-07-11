"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityInstanceEntranceInfoItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const InstOnlineType_1 = require("../../../../../Core/Define/Config/SubType/InstOnlineType");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const InstanceDungeonLockItem_1 = require("../../../InstanceDungeon/InstanceDungeonSubComponent/InstanceDungeonLockItem");
const InstanceDungeonRecommendLevelItem_1 = require("../../../InstanceDungeon/InstanceDungeonSubComponent/InstanceDungeonRecommendLevelItem");
const InstanceDungeonRightTitleItem_1 = require("../../../InstanceDungeon/InstanceDungeonSubComponent/InstanceDungeonRightTitleItem");
const InstanceDungeonStartButtonItem_1 = require("../../../InstanceDungeon/InstanceDungeonSubComponent/InstanceDungeonStartButtonItem");
const ActivityInstanceEntranceDropDownItem_1 = require("./ActivityInstanceEntranceDropDownItem");
const ActivityInstanceEntranceMonsterTipsItem_1 = require("./ActivityInstanceEntranceMonsterTipsItem");
class ActivityInstanceEntranceInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Qth = undefined;
    this.zth = undefined;
    this.Zth = undefined;
    this.$th = undefined;
    this.IBl = undefined;
    this.lOl = undefined;
    this.TBl = undefined;
    this.LBl = undefined;
    this.hOl = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.Qth = new InstanceDungeonRightTitleItem_1.InstanceDungeonRightTitleItem();
    e.push(this.Qth.CreateByResourceIdAsync("UiItem_InstanceDungeon_RightTitle", this.GetItem(0)));
    this.zth = new InstanceDungeonStartButtonItem_1.InstanceDungeonStartButtonItem();
    e.push(this.zth.CreateByResourceIdAsync("UiItem_InstanceDungeon_StartButton", this.GetItem(2)));
    this.Zth = new InstanceDungeonLockItem_1.InstanceDungeonLockItem();
    e.push(this.Zth.CreateByResourceIdAsync("UiItem_InstanceDungeon_Lock", this.GetItem(2)));
    await Promise.all(e);
  }
  RefreshView(e) {
    this.kxt(e);
    this.UBl(e);
    this.NFe(e);
    this.RefreshRecommendLevelItem(e);
    this.RefreshDropDownItem(e);
    this.RefreshMonsterTipsItem(e);
  }
  kxt(e) {
    var t;
    if (e && e.GetActivityEntranceDescInfoData()) {
      this.Qth?.SetUiActive(true);
      t = e.GetActivityEntranceDescInfoData();
      e = e.GetActivityEntranceSelectItemData()?.GetCurrentSelectData()?.GetSelectDataIndex() ?? 0;
      this.Qth?.RefreshName(t.GetName(e));
      this.Qth?.RefreshDesc(t.GetDesc(e));
      this.Qth?.UpdateInstanceDungeonRecommendElementItem(t.GetRecommendElement(e));
    } else {
      this.Qth?.SetUiActive(false);
    }
  }
  UBl(t) {
    var e;
    if (t) {
      this.zth.SetUiActive(true);
      this.zth.RefreshItem(InstOnlineType_1.InstOnlineType.Single);
      ModelManager_1.ModelManager.InstanceDungeonModel.InstanceContinue = false;
      this.zth.OnClickBtnSoloCallBack = () => {
        var e = t.GetActivityEntranceSelectItemData().GetCurrentSelectData();
        if (e) {
          t.GetClickConfirmCallBack()?.(e.GetSelectDataIndex());
        }
      };
      e = t.GetActivityEntranceSelectItemData().GetCurrentSelectData().GetLockState();
      this.zth?.SetActive(!e);
    } else {
      this.zth.SetUiActive(false);
    }
  }
  NFe(e) {
    var t;
    if (e) {
      t = e.GetActivityEntranceSelectItemData().GetCurrentSelectData().GetLockState();
      this.Zth.SetUiActive(t);
      e = t ? e.GetActivityEntranceSelectItemData().GetCurrentSelectData()?.GetUnLockDesc() : "";
      if (t && e !== "") {
        this.Zth.SetLockText(e);
      }
    } else {
      this.Zth.SetUiActive(false);
    }
  }
  async RefreshDropDownItem(e) {
    if (e && e.GetActivityEntranceDropDownData()) {
      if (!this.TBl) {
        this.TBl = new CustomPromise_1.CustomPromise();
        this.IBl = new ActivityInstanceEntranceDropDownItem_1.ActivityInstanceEntranceDropDownItem();
        await this.IBl.CreateThenShowByResourceIdAsync("UiItem_InstanceDungeon_DropItem", this.GetItem(1)).then(() => {
          this.TBl?.SetResult();
        });
      }
      await this.TBl.Promise;
      this.IBl.SetActive(true);
      this.IBl.RefreshView(e, e.GetActivityEntranceDropDownData());
    } else {
      this.IBl?.SetUiActive(false);
    }
  }
  async RefreshRecommendLevelItem(e) {
    if (e) {
      if ((e = e.GetActivityEntranceSelectItemData().GetCurrentSelectData()?.GetRecommendLevel()) && e > 0) {
        if (!this.LBl) {
          this.LBl = new CustomPromise_1.CustomPromise();
          this.$th = new InstanceDungeonRecommendLevelItem_1.InstanceDungeonRecommendLevelItem();
          await this.$th.CreateThenShowByResourceIdAsync("UiItem_InstanceDungeon_RecommenLevel", this.GetItem(1)).then(() => {
            this.LBl?.SetResult();
          });
        }
        await this.LBl.Promise;
        e = {
          TextId: "RecommendLevel",
          Level: e
        };
        this.$th.SetActive(true);
        this.$th.RefreshItem(e);
      }
    } else {
      this.$th?.SetUiActive(false);
    }
  }
  async RefreshMonsterTipsItem(e) {
    if (e && e.GetActivityEntranceMonsterPreviewData()) {
      if (!this.hOl) {
        this.hOl = new CustomPromise_1.CustomPromise();
        this.lOl = new ActivityInstanceEntranceMonsterTipsItem_1.ActivityInstanceEntranceMonsterTipsItem();
        await this.lOl.CreateThenShowByResourceIdAsync("UiItem_InstanceDungeon_Buff", this.GetItem(0)).then(() => {
          this.hOl?.SetResult();
        });
      }
      await this.hOl.Promise;
      this.lOl.SetActive(true);
      this.lOl.RefreshView(e);
    } else {
      this.lOl?.SetUiActive(false);
    }
  }
}
exports.ActivityInstanceEntranceInfoItem = ActivityInstanceEntranceInfoItem;
//# sourceMappingURL=ActivityInstanceEntranceInfoItem.js.map