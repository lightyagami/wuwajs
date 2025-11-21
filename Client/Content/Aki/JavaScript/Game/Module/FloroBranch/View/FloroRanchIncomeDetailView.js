"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchIncomeDetailView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown");
const OneTextDropDownItem_1 = require("../../Common/DropDown/Item/OneText/OneTextDropDownItem");
const OneTextTitleItem_1 = require("../../Common/DropDown/Item/OneText/OneTextTitleItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const FloroRanchTipData_1 = require("../Data/FloroRanchTipData");
const FloroRanchDefine_1 = require("../FloroRanchDefine");
const FloroRanchCommonTipItem_1 = require("./Item/FloroRanchCommonTipItem");
const FloroRanchIncomeItem_1 = require("./Item/FloroRanchIncomeItem");
const FloroRanchTerrainTipItem_1 = require("./Item/FloroRanchTerrainTipItem");
class FloroRanchIncomeDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Dvu = undefined;
    this.VRu = [];
    this.BSi = undefined;
    this.jRu = undefined;
    this.kvu = false;
    this.pUt = true;
    this.ypt = [];
    this.rVu = -1;
    this.IOu = undefined;
    this.c3u = undefined;
    this.d3u = undefined;
    this.m3u = undefined;
    this.f3u = undefined;
    this.DOu = undefined;
    this.$_u = () => {
      var i = new FloroRanchIncomeItem_1.FloroRanchIncomeItem();
      i.BindClickCallBack(this.$Ru);
      i.SetSelectState(false);
      this.VRu.push(i);
      return i;
    };
    this.$Ru = (i, e) => {
      this.aWt(i);
      var i = e.CheckGetComponent(0);
      var t = i.Point;
      var s = i.IsValid && t !== -1;
      if (s) {
        this.jt_(e);
      } else {
        if (t === -1) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_AnimalBehind");
        }
        this.aVu();
      }
      if (s && e.EntityType !== 2) {
        if (i?.IsValid && s) {
          this.DOu?.(t);
        } else {
          this.DOu?.(0);
        }
      } else {
        this.DOu?.(-1);
      }
    };
    this.$Yl = i => {
      this.WRu(false, this.rVu);
      this.uju();
      this.d3u.GetRootItem().SetUIActive(false);
      this.c3u.GetRootItem().SetUIActive(false);
      this.DOu?.(-1);
    };
    this.fbu = (i, e) => {
      this.jRu = e;
      this.uju();
      this.sVu();
    };
    this.Suu = i => {
      return new LguiUtil_1.TableTextArgNew(i.Name);
    };
    this.qvu = () => {
      this.kvu = !this.kvu;
      this.uju();
      this.sVu();
    };
    this.gbu = () => {
      this.pUt = !this.pUt;
      this.uju();
      this.sVu();
    };
    this.dV1 = () => {
      this.DOu?.(-1);
      this.sVu();
      this.CloseMe();
    };
    this.W3u = i => {
      if (i === "Close") {
        this.c3u?.SetUiActive(false);
      }
    };
    this.Q3u = i => {
      if (i === "Close") {
        this.d3u?.SetUiActive(false);
      }
    };
    this.rqu = () => {
      var i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.OwnCardEntityCount;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "Farm_ShowAllAnimal", i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[2, UE.UIText], [1, UE.UITexture], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIItem], [0, UE.UIButtonComponent], [6, UE.UIExtendToggle], [7, UE.UIExtendToggle], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIButtonComponent], [11, UE.UIItem]];
    this.BtnBindInfo = [[0, this.dV1], [7, this.qvu], [6, this.gbu], [10, this.dV1]];
  }
  async OnBeforeStartAsync() {
    this.DOu = this.OpenParam;
    this.IOu = new FloroRanchTipData_1.FloroRanchTipData();
    this.Dvu = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.$_u);
    var i = [];
    var e = this.GetItem(9);
    this.d3u = new FloroRanchTerrainTipItem_1.FloroRanchTerrainTipItem();
    i.push(this.d3u.CreateByResourceIdAsync("PnlMapInfo", e, false));
    this.c3u = new FloroRanchCommonTipItem_1.FloroRanchCommonTipItem();
    i.push(this.c3u.CreateByResourceIdAsync("PnlCardItemInfo", e, false));
    this.BSi = new CommonDropDown_1.CommonDropDown(this.GetItem(5), i => new OneTextDropDownItem_1.OneTextDropDownItem(i), i => new OneTextTitleItem_1.OneTextTitleItem(i));
    i.push(this.BSi.Init());
    await Promise.all(i);
    this.m3u = new LevelSequencePlayer_1.LevelSequencePlayer(this.c3u.GetRootItem());
    this.m3u.BindSequenceCloseEvent(this.W3u);
    this.f3u = new LevelSequencePlayer_1.LevelSequencePlayer(this.d3u.GetRootItem());
    this.f3u.BindSequenceCloseEvent(this.Q3u);
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.FloroRanchGamePlayModel.RefreshLastIncomeEntityList();
    this.kvu = false;
    this.pUt = true;
    this.GetText(2).SetText(ModelManager_1.ModelManager.FloroRanchModel.GetCoinText(ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetLastDayIncome()));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "Farm_ShowAllAnimal", ModelManager_1.ModelManager.FloroRanchGamePlayModel.OwnCardEntityCount);
    this.SetTextureByPath(ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchCurrencyConfig(1).GetSmallIcon(), this.GetTexture(1));
    this.uju();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFloroRanchCardEntityCountChange, this.rqu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFloroRanchCardEntityCountChange, this.rqu);
  }
  OnStart() {
    var i = ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchFilterTypeConfigList();
    if (i.length <= 0) {
      this.BSi.SetUiActive(false);
    } else {
      this.jRu = i[0];
      this.BSi.InitScroll(i, this.Suu, 0);
      this.BSi.SetShowType(1);
      this.BSi.SetOnSelectCall(this.fbu);
    }
  }
  aWt(i) {
    this.WRu(false, this.rVu);
    if (i < 0 || i >= this.ypt.length || i === this.rVu) {
      this.rVu = -1;
    } else {
      this.rVu = i;
    }
    this.WRu(true, i);
  }
  sVu() {
    this.aWt(-1);
    this.aVu();
    this.DOu?.(-1);
  }
  hVu(e) {
    var i = e.EntityType;
    var t = e.CheckGetComponent(0).Point;
    switch (i) {
      case 1:
        {
          let i = undefined;
          if (t !== -1) {
            i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetTerrainEntityByPoint(t);
          }
          this.IOu.ChangeTipInfo(1, e, i);
        }
        break;
      case 0:
        {
          let i = undefined;
          if (t !== -1) {
            i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetCardEntityByPoint(t);
          }
          this.IOu.ChangeTipInfo(1, i, e);
        }
        break;
      case 2:
        this.IOu.ChangeTipInfo(2, e, undefined);
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("FloroRanchGamePlay", 78, "SetTipType Invalid entity type:", ["entityType", i]);
        }
    }
  }
  jt_(i) {
    this.hVu(i);
    var i = this.IOu.LastMainEntityData;
    var e = this.IOu.LastSubEntityData;
    var t = this.IOu.MainEntityData;
    var s = this.IOu.SubEntityData;
    var h = this.IOu.LastTipType;
    var o = this.IOu.TipType;
    var h = h === 0 || o === 0;
    if (t) {
      this.C3u(h);
    } else if (i) {
      this.p3u(h);
    }
    if (s) {
      this.y3u(h);
    } else if (e) {
      this.S3u(h);
    }
  }
  S3u(i = true) {
    this.f3u.PlayLevelSequenceByName("Close");
    if (!i) {
      this.f3u.EndSequenceLastFrame("Close");
      this.d3u?.SetUiActive(false);
    }
  }
  p3u(i = true) {
    this.m3u.PlayLevelSequenceByName("Close");
    if (!i) {
      this.m3u.EndSequenceLastFrame("Close");
      this.c3u?.SetUiActive(false);
    }
  }
  y3u(i = true) {
    var e = this.IOu.SubEntityData;
    this.d3u.RefreshInfoTipByEntity(e);
    var e = this.IOu.MainEntityData;
    this.iVu(e ? FloroRanchDefine_1.FLORO_RANCH_TERRAIN_TIP_HEIGHT_SHORT : FloroRanchDefine_1.FLORO_RANCH_TERRAIN_TIP_HEIGHT_HIGHER);
    this.f3u.PlayLevelSequenceByName("Start");
    if (!i) {
      this.f3u.EndSequenceLastFrame("Start");
    }
  }
  C3u(i = true) {
    var e = this.IOu.MainEntityData;
    this.c3u?.RefreshInfoTipByParam({
      TipType: 0,
      EntityData: e,
      RemoveCallback: this.$Yl,
      CurrencyData: undefined
    });
    this.m3u.PlayLevelSequenceByName("Start");
    if (!i) {
      this.m3u.EndSequenceLastFrame("Start");
    }
  }
  aVu() {
    this.IOu.ChangeTipInfo(0, undefined, undefined);
    this.p3u();
    this.S3u();
  }
  iVu(i) {
    var e = this.d3u?.GetRootItem();
    if (e) {
      e.SetHeight(i);
    }
  }
  WRu(i, e) {
    if (!(e < 0) && !(e >= this.VRu.length)) {
      this.VRu[e].SetSelectState(i);
    }
  }
  uju() {
    this.ypt = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetLastIncomeEntityList(this.jRu, this.pUt, this.kvu);
    this.Dvu.RefreshByData(this.ypt);
    this.GetItem(11).SetUIActive(this.ypt.length <= 0);
  }
}
exports.FloroRanchIncomeDetailView = FloroRanchIncomeDetailView;
//# sourceMappingURL=FloroRanchIncomeDetailView.js.map