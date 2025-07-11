"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfluenceReputationView = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const InfluenceReputationDefine_1 = require("../InfluenceReputationDefine");
const InfluenceDisplayItem_1 = require("./Item/InfluenceDisplayItem");
const DEVIATION_VALUE = 10;
const PROGRESS_DEVIATION_VALUE = 0.05;
class InfluenceReputationView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.tsi = 0;
    this.hLt = 0;
    this.isi = 0;
    this.osi = false;
    this.rsi = false;
    this.nsi = false;
    this.ssi = undefined;
    this.asi = undefined;
    this.hsi = [];
    this.cje = false;
    this.lsi = false;
    this.Rvt = () => {
      this.CloseMe();
    };
    this.DAt = () => {
      UiManager_1.UiManager.OpenView("InfluenceSearchView", this.tsi);
    };
    this._si = () => {
      UiManager_1.UiManager.OpenView("InfluenceAreaSelectView", this.tsi);
    };
    this.usi = () => {
      var t = this.xqe.ContentItem;
      var e = t.GetWidth();
      var t = Math.abs(t.GetAnchorOffsetX()) + this.xqe.ScrollWidth;
      var s = this.hsi.length;
      if (e < t) {
        this.xqe.ScrollToRight(s - 2);
      } else {
        e = e / s;
        let i = 0;
        i = t % e < DEVIATION_VALUE ? Math.floor(t / e) - 1 - 1 : Math.floor(t / e) - 1;
        this.xqe.ScrollToRight(i);
      }
    };
    this.msi = () => {
      var i = this.xqe.ContentItem;
      var t = i.GetWidth();
      var i = Math.abs(i.GetAnchorOffsetX());
      if (i < 0) {
        this.xqe.ScrollToLeft(1);
      }
      var e = this.hsi.length;
      var t = t / e;
      let s = 0;
      s = t - i % t < DEVIATION_VALUE ? Math.floor(i / t) + 1 + 1 : Math.floor(i / t) + 1;
      this.xqe.ScrollToLeft(s);
    };
    this.dsi = () => {
      this.Csi(false);
      if (this.hLt !== undefined) {
        this.xqe.GetScrollItemByKey(this.hLt).SetDisActiveToggleState();
        this.hLt = undefined;
      }
    };
    this.sGe = (i, t, e) => {
      t = new InfluenceDisplayItem_1.InfluenceDisplayItem(t);
      t.UpdateItem(i, this.tsi);
      t.SetToggleFunction(this.pqe);
      t.SetIndex(e);
      return {
        Key: e,
        Value: t
      };
    };
    this.pqe = (i, t) => {
      if (i === 0) {
        if (this.hLt === t) {
          this.hLt = undefined;
          this.gsi();
          this.Csi(false);
        }
      } else {
        i = this.hLt;
        this.hLt = t;
        if (i !== undefined) {
          this.xqe.GetScrollItemByKey(i).SetDisActiveToggleState();
        } else {
          this.gsi();
        }
        this.cje = true;
        this.Csi(true);
      }
    };
    this.fsi = i => {
      if (this.osi && (i = MathUtils_1.MathUtils.Clamp(i.X, 0, 1), this.isi !== i)) {
        this.isi = i;
        this.gsi();
      }
    };
    this.PKt = i => {
      this.tsi = i;
      this.Og();
    };
    this.psi = (i, t) => {
      this.tsi = t;
      this.Og();
      this.vsi(i);
    };
    this.fje = i => {
      if (this.cje) {
        this.cje = false;
        this.Msi();
      }
      if (this.lsi) {
        this.lsi = false;
        this.osi = this.xqe.IsExpand;
        this.gsi();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UITexture], [7, UE.UIText], [8, UE.UIText], [9, UE.UIText], [10, UE.UIButtonComponent], [11, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Rvt], [5, this.DAt], [4, this._si], [2, this.usi], [3, this.msi], [10, this.dsi]];
  }
  OnBeforeCreate() {
    this.tsi = this.OpenParam;
  }
  OnStart() {
    this.xqe = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(1), this.sGe);
    this.xqe.BindScrollValueChange(this.fsi);
    this.xqe.BindLateUpdate(this.fje);
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerStand();
    this.SetTextureByPath(i, this.GetTexture(6));
    this.ssi = this.GetButton(2).RootUIComp;
    this.asi = this.GetButton(3).RootUIComp;
    this.ssi.SetUIActive(false);
    this.asi.SetUIActive(false);
    this.rsi = false;
    this.nsi = false;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshInfluencePanel, this.PKt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SearchInfluence, this.psi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshInfluencePanel, this.PKt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SearchInfluence, this.psi);
  }
  OnAfterShow() {
    this.Og();
  }
  OnBeforeDestroy() {
    this.xqe.ClearChildren();
    this.xqe = undefined;
    this.asi = undefined;
    this.ssi = undefined;
  }
  Og() {
    var i = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(this.tsi);
    this.hsi = i.Influences.filter(i => i !== InfluenceReputationDefine_1.RAMDOM_INFLUENCE_ID);
    this.Esi();
    this.Ssi(i.Title);
    this.ysi();
    this.Isi();
    this.Csi(false);
  }
  vsi(i) {
    i = this.hsi.indexOf(i);
    this.xqe.GetScrollItemByKey(i).SetToggleState(1, true);
  }
  Esi() {
    this.hLt = undefined;
    this.xqe.RefreshByData(this.hsi);
    this.lsi = true;
  }
  Ssi(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), i);
  }
  ysi() {
    let i = 0;
    for (const t of this.xqe.GetScrollItemMap().values()) {
      if (t.IsUnLock()) {
        i++;
      }
    }
    this.GetText(8).SetText(i.toString());
    this.GetText(9).SetText(this.hsi.length.toString());
  }
  Isi() {
    var i = ModelManager_1.ModelManager.InfluenceReputationModel.HasRedDotExcludeCurrentCountry(this.tsi);
    this.GetItem(11).SetUIActive(i);
  }
  gsi() {
    var i;
    if (this.osi && this.hLt === undefined) {
      if (this.isi !== undefined && (i = this.isi < 1 - PROGRESS_DEVIATION_VALUE, this.rsi !== i && (this.rsi = i, this.ssi.SetUIActive(i)), i = this.isi > PROGRESS_DEVIATION_VALUE, this.nsi !== i)) {
        this.nsi = i;
        this.asi.SetUIActive(i);
      }
    } else {
      if (this.rsi) {
        this.rsi = false;
        this.ssi.SetUIActive(false);
      }
      if (this.nsi) {
        this.nsi = false;
        this.asi.SetUIActive(false);
      }
    }
  }
  Csi(i) {
    this.GetButton(10).RootUIComp.SetUIActive(i);
  }
  Msi() {
    var i = this.xqe.GetScrollItemMap().size;
    if (this.hLt === i - 1) {
      this.xqe.ScrollToLeft(this.hLt - 1);
    } else {
      this.xqe.ScrollToLeft(this.hLt);
    }
  }
}
exports.InfluenceReputationView = InfluenceReputationView;
//# sourceMappingURL=InfluenceReputationView.js.map