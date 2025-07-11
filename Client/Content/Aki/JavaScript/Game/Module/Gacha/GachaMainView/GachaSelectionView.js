"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaSelectionView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const GachaController_1 = require("../GachaController");
const GachaDefine_1 = require("../GachaDefine");
const GachaSelectionItem_1 = require("./GachaSelectionItem");
class GachaSelectionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Jjt = undefined;
    this.zjt = undefined;
    this.Zjt = undefined;
    this.eWt = undefined;
    this.tWt = () => {
      GachaController_1.GachaController.GachaUsePoolRequest(this.Jjt.Id, this.iWt);
      UiManager_1.UiManager.CloseView("GachaSelectionView");
    };
    this.oWt = e => {
      this.Jjt = e;
      this.rWt();
    };
    this.nWt = () => {
      var e = new GachaSelectionItem_1.GachaSelectionItem();
      e.ToggleCallBack = this.sWt;
      e.CanToggleChange = this.Bpt;
      return e;
    };
    this.sWt = e => {
      this.zjt?.GetGenericLayout()?.SelectGridProxy(e);
      this.aWt();
    };
    this.Bpt = e => {
      return e !== this.zjt?.GetGenericLayout()?.GetSelectedGridIndex();
    };
  }
  get iWt() {
    var e = this.zjt.GetGenericLayout().GetSelectedGridIndex();
    if (!this.Zjt || e < 0 || e >= this.Zjt.length) {
      return 0;
    } else {
      return this.Zjt[e].PoolInfo.Id;
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UIText]];
    this.BtnBindInfo = [[5, this.tWt]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GachaSelectionViewRefresh, this.oWt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GachaSelectionViewRefresh, this.oWt);
  }
  async OnBeforeStartAsync() {
    this.zjt = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.nWt);
    this.eWt = new SmallItemGrid_1.SmallItemGrid();
    await this.eWt.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
    this.Jjt = this.OpenParam.GachaInfo;
    this.rWt();
  }
  _Wt() {
    if (this.Jjt) {
      var i = this.Jjt.GetValidPoolList();
      if (i) {
        var t = new Array(i.length);
        for (let e = 0; e < i.length; e++) {
          var s = new GachaDefine_1.GachaPoolData(this.Jjt, i[e]);
          t[e] = s;
        }
        return t;
      }
    }
  }
  lWt() {
    var e = this.Jjt.GetValidPoolList();
    return !!e && !!this.Zjt && e.length === this.Zjt.length;
  }
  rWt() {
    if (this.zjt && (this.Zjt = this._Wt(), this.Zjt) && this.Zjt.length !== 0) {
      const t = this.iWt;
      this.zjt.RefreshByData(this.Zjt, () => {
        if (this.lWt()) {
          const i = t > 0 ? t : this.Jjt.UsePoolId;
          let e = 0;
          if (i > 0 && (e = this.Zjt.findIndex(e => e.PoolInfo.Id === i)) < 0) {
            e = 0;
          }
          this.zjt.GetGenericLayout().SelectGridProxy(e);
          this.aWt();
        } else {
          this.rWt();
        }
      });
    }
  }
  aWt() {
    var e = this.zjt.GetGenericLayout().GetSelectedGridIndex();
    var e = this.Zjt[e].PoolInfo.Id;
    var i = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(e);
    var t = i.ShowIdList[0];
    var i = i.Type;
    var s = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewTypeConfig(i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), s.OptionalTitle);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.OptionalDesc);
    var s = ModelManager_1.ModelManager.GachaModel.IsRolePool(i);
    if (s) {
      i = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.Name);
      this.eWt.Apply({
        Data: undefined,
        Type: 2,
        ItemConfigId: t
      });
    } else {
      s = ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), s.WeaponName);
      this.eWt.Apply({
        Data: undefined,
        Type: 4,
        ItemConfigId: t
      });
    }
    var i = this.Jjt.UsePoolId;
    var s = i === e;
    var t = s ? "Text_GachaOptionalText1_Text" : "Text_GachaOptionalText2_Text";
    this.GetButton(5)?.SetSelfInteractive(!s);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t);
  }
}
exports.GachaSelectionView = GachaSelectionView;
//# sourceMappingURL=GachaSelectionView.js.map