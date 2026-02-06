"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapTileMgr = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const ConfigCommon_1 = require("../../../../../../Core/Config/ConfigCommon");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../../../../Core/Utils/DataTableUtil");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../../GlobalData");
const LevelConditionRegistry_1 = require("../../../../../LevelGamePlay/LevelConditions/LevelConditionRegistry");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiLayer_1 = require("../../../../../Ui/UiLayer");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const MapDefine_1 = require("../../../MapDefine");
const MapUtil_1 = require("../../../MapUtil");
const MapLogger_1 = require("../../../Misc/MapLogger");
const MapTileItem_1 = require("./MapTile/MapTileItem");
const FAKE_TILE_COUNT = 3;
const MAP_TILE_COMMON = "T_CommonDefault_UI";
const MAX_COLOR = 255;
const FOG_TEXTURE_NAME = new UE.FName("FogTexture");
const HD_TEXTURE_NAME = new UE.FName("HDTexture");
const HD_SCALAR_NAME = new UE.FName("UseHDPicture");
const FOG_MASK_1 = new UE.FName("FogMask");
const FOG_MASK_2 = new UE.FName("FogMask2");
const FOG_TEXTURE_1 = FOG_TEXTURE_NAME;
const FOG_TEXTURE_2 = new UE.FName("FogTexture2");
const FOG_UNLOCK_CENTERX_NAME = new UE.FName("CenterX");
const FOG_UNLOCK_CENTERY_NAME = new UE.FName("CenterY");
const DTPATH_AREA_ID_TO_MASK_CODE = "/Game/Aki/Data/PathLine/FogLine/DT_AreaToMaskCode.DT_AreaToMaskCode";
const DTPATH_FOG_AREA_ID = "/Game/Aki/Data/PathLine/FogLine/DT_FogToArea.DT_FogToArea";
const V2FogPath = "/Game/Aki/UI/UIResources/UIWorldMap/Image/FogTilesV2";
const V2FogMiniPath = "/Game/Aki/UI/UIResources/UIWorldMap/Image/FogTilesV2Mini";
class FogOpenParams {
  constructor() {
    this.ExtraHdMapTileIndex = -1;
    this.MapTileIndex = -1;
    this.Channel = 0;
    this.ChannelV2 = 0;
  }
}
class MapTileMgr {
  constructor(i) {
    this.qUi = undefined;
    this.pfc = [];
    this.J__ = undefined;
    this.GUi = undefined;
    this.vKs = undefined;
    this.r1g = [];
    this.OUi = undefined;
    this.wUi = new Map();
    this.AUi = undefined;
    this.OpenFogSet = undefined;
    this.Rbc = -1;
    this.xUi = undefined;
    this.Abc = 0;
    this.kUi = undefined;
    this.FUi = undefined;
    this.VUi = undefined;
    this.HUi = undefined;
    this.dil = false;
    this.jUi = undefined;
    this.tzs = undefined;
    this.MKs = undefined;
    this.SKs = 0;
    this.PUi = 2;
    this._Ui = 0;
    this.z3t = 0;
    this.WUi = new UE.Color(0, 0, 0, MAX_COLOR);
    this.ish = new UE.Color(0, 0, 0, 0);
    this.lPn = new Map();
    this.DPn = new Map();
    this.RPn = -1;
    this.MapOffset = undefined;
    this.FakeOffset = 0;
    this.KUi = Number.MAX_SAFE_INTEGER;
    this.QUi = Number.MAX_SAFE_INTEGER;
    this.XUi = Number.MAX_SAFE_INTEGER;
    this.$Ui = Number.MAX_SAFE_INTEGER;
    this.JUi = undefined;
    this.zUi = undefined;
    this.ZUi = undefined;
    this.eAi = false;
    this.L7s = undefined;
    this.D7s = undefined;
    this.EKs = undefined;
    this.Ata = 1;
    this.yua = undefined;
    this.Iua = undefined;
    this.h8l = undefined;
    this.Yfe = false;
    this.Cfc = 1;
    this.TLc = [];
    this.vv1 = undefined;
    this.TotalTileSize = Vector2D_1.Vector2D.Create();
    this.U1g = true;
    this.tAi = () => {
      this.r1g.forEach(i => {
        i.GetOwner()?.K2_DestroyActor();
      });
      this.r1g.length = 0;
      this.LoadMapBorder();
    };
    this.bLc = () => {
      var i = (this.qUi.length - 1) * 2 + 1;
      if (!(this.TLc.length <= i)) {
        for (let i = 0; i < this.qUi.length; i++) {
          var t = this.TLc[i * 2];
          var e = this.TLc[i * 2 + 1];
          this.nzs(this.qUi[i], t, e);
        }
      }
    };
    this.Vhl = i => {
      if (this.OpenFogSet) {
        this.OpenFogSet.add(i);
        this.rAi();
      }
    };
    this.Hhl = i => {
      if (this.OpenFogSet) {
        this.OpenFogSet.clear();
        for (const t of i.keys()) {
          this.OpenFogSet.add(t);
        }
        this.rAi();
      }
    };
    this.nAi = i => {
      if (this.zUi && this.zUi.length !== 0 && this.qUi) {
        for (const e of this.zUi) {
          var t = e.MapTileIndex;
          if (t >= 0 && t < this.qUi.length) {
            t = this.qUi[t];
            if (this.Ata === 2) {
              this.Cil(t, e.ChannelV2, i);
            } else {
              this.sAi(t, e.Channel, i);
            }
          }
        }
      }
    };
    this.Ata = i.MapVersion;
    if (this.Ata === 2) {
      this.yua = ResourceSystem_1.ResourceSystem.Load(DTPATH_AREA_ID_TO_MASK_CODE, UE.DataTable, "Ui.MapUi");
      this.Iua = ResourceSystem_1.ResourceSystem.Load(DTPATH_FOG_AREA_ID, UE.DataTable, "Ui.MapUi");
    }
    this.kUi = i.MapRootItem;
    this.L7s = UE.NewArray(UE.UIItem);
    this.L7s.Add(this.kUi);
    this.D7s = (0, puerts_1.$ref)(this.L7s);
    this.FUi = i.TileContainer;
    this.VUi = i.TileTexture;
    this.HUi = i.SubMapContainer;
    this.dil = false;
    this.jUi = i.SubMapTexture;
    this.MKs = i.SubMapContainer?.GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    this.SKs = i.SubMapContainer?.GetOwner().GetComponentByClass(UE.UISprite.StaticClass())?.GetAlpha();
    this.tzs = i.SubMapMask;
    this.tzs?.SetWidth(MapDefine_1.DETAIL_TILE_REALSIZE);
    this.tzs?.SetHeight(MapDefine_1.DETAIL_TILE_REALSIZE);
    this.VUi.SetColor(this.WUi);
    this.PUi = i.MapType;
    this._Ui = i.MapId;
    this.z3t = i.InstanceDungeonId;
    if (i.PreloadTiles) {
      this.wUi = i.PreloadTiles;
    }
    this.Cfc = i.Gravity ?? 1;
    this.h8l = i;
  }
  aAi() {
    this.qUi = [];
    this.J__ = [];
    this.GUi = [];
    this.vKs = [];
    this.AUi = [];
    this.MapOffset = new UE.Vector4(0, 0, 0, 0);
    this.FakeOffset = 0;
  }
  Initialize() {
    this.aAi();
    this.dde();
  }
  async OnChangeTilesAsync(i, t, e) {
    if (this.z3t !== t || this.Cfc !== e) {
      this._Ui = i;
      this.z3t = t;
      this.Cfc = e;
      this.vfc();
      this.yfc();
      this.aAi();
      this.OnMapSetUp();
      return this.LoadMapBorder();
    } else {
      MapLogger_1.MapLogger.Debug(63, "地图系统->切换地图地块失败， 地图参数没有发生变化", ["InstanceDungeonIdInner", this.z3t], ["instanceId", t], ["MapId", i], ["MapGravity", this.Cfc], ["gravity", e]);
      return new Promise(i => {
        i();
      });
    }
  }
  vfc() {
    this.qUi.forEach(i => {
      i.SetTexture(undefined);
      if (this.Ata === 2) {
        i.SetCustomMaterialTextureParameter(FOG_TEXTURE_1, undefined);
        i.SetCustomMaterialTextureParameter(FOG_TEXTURE_2, undefined);
      } else {
        i.SetCustomMaterialTextureParameter(FOG_TEXTURE_NAME, undefined);
      }
      i.SetCustomMaterialTextureParameter(HD_TEXTURE_NAME, undefined);
      if (this.VUi !== i) {
        this.Sfc(i);
      }
    });
    this.qUi = undefined;
  }
  Sfc(i) {
    i.SetUIActive(false);
    this.pfc.push(i);
  }
  Mfc() {
    var i;
    if (this.pfc.length > 0) {
      (i = this.pfc.shift()).SetUIActive(true);
      return i;
    } else {
      return LguiUtil_1.LguiUtil.CopyItem(this.VUi, this.FUi);
    }
  }
  yfc() {
    if (this.AUi) {
      this.AUi.splice(0, this.AUi.length);
      this.AUi = undefined;
    }
    this.yKs();
    this.J__.forEach(i => {
      i.ReleaseLoadHandle();
    });
    this.J__.length = 0;
    this.HUi?.SetAlpha(this.SKs);
    this.HUi?.SetUIActive(false);
    this.dil = false;
    this.r1g.forEach(i => {
      i.GetOwner()?.K2_DestroyActor();
    });
    this.r1g.length = 0;
    this.Rbc = -1;
  }
  Dispose() {
    this.Cde();
    this.yfc();
    this.vfc();
    this.pfc.forEach(i => {
      if (this.VUi !== i) {
        i.GetOwner()?.K2_DestroyActor();
      }
    });
    this.GUi.forEach(i => {
      i.SetTexture(undefined);
      if (this.jUi !== i) {
        i.GetOwner()?.K2_DestroyActor();
      }
    });
    ModelManager_1.ModelManager.RegionalTerminalModel.CurrentAreaMapGroupId = 0;
    this.pfc.length = 0;
    this.qUi = undefined;
    this.J__ = undefined;
    this.GUi = undefined;
    this.vKs = undefined;
    this.Yfe = true;
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MapOpenFogChange, this.Vhl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MapOpenFogFullUpdate, this.Hhl);
    if (this.PUi === 1) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MiniMapForceUpdate, this.bLc);
    }
    this.OUi = new LevelConditionRegistry_1.ConditionPassCallback(this.tAi);
    for (const t of ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfigList()) {
      var i = t.ConditionId;
      if (i > 0) {
        LevelConditionRegistry_1.LevelConditionRegistry.RegisterConditionGroup(i, this.OUi);
      }
    }
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MapOpenFogChange, this.Vhl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MapOpenFogFullUpdate, this.Hhl);
    if (this.PUi === 1) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MiniMapForceUpdate, this.bLc);
    }
    for (const t of ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfigList()) {
      var i = t.ConditionId;
      if (i > 0) {
        LevelConditionRegistry_1.LevelConditionRegistry.UnRegisterConditionGroup(i, this.OUi);
      }
    }
  }
  GetMapTiles() {
    return this.qUi;
  }
  GetMapTileItems() {
    return this.J__;
  }
  OnMapSetUp() {
    var i;
    if (this.PUi !== 1 || ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(this._Ui)) {
      this.eAi = true;
      this.hAi();
      this.lAi();
      i = ConfigManager_1.ConfigManager.MapConfig?.GetMultiMapAreaConfigList();
      this.lPn.clear();
      i?.forEach(i => {
        if (i.MapConfigId === this._Ui && i.GravityFlip === this.Cfc) {
          this.lPn.set(i.Block, i);
        }
      });
      i = ConfigManager_1.ConfigManager.MapConfig?.GetAllSubMapConfig();
      this.DPn.clear();
      i?.forEach(t => {
        if (t.MapId === this._Ui) {
          t.Area.forEach(i => {
            this.DPn.set(i, t.Id);
          });
        }
      });
      this.KUi = Number.MAX_SAFE_INTEGER;
      this.QUi = Number.MAX_SAFE_INTEGER;
      i = ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(this._Ui);
      i = MapDefine_1.MINI_MAP_DEFAULT_SCALE / i.LittleMapDefaultScale;
      this.tzs?.SetWidth(MapDefine_1.DETAIL_TILE_REALSIZE * i);
      this.tzs?.SetHeight(MapDefine_1.DETAIL_TILE_REALSIZE * i);
      if ((i = ModelManager_1.ModelManager.RegionalTerminalModel.GetAreaMapGroupIdByInstanceId(this.z3t)) !== undefined) {
        ModelManager_1.ModelManager.RegionalTerminalModel.CurrentAreaMapGroupId = i;
        this.U1g = false;
      } else {
        ModelManager_1.ModelManager.RegionalTerminalModel.CurrentAreaMapGroupId = 0;
        this.U1g = true;
      }
    } else {
      this.eAi = false;
    }
  }
  _Ai(i, t) {
    if (this.PUi === 1) {
      return t;
    } else {
      return i;
    }
  }
  hAi() {
    this.OpenFogSet = new Set();
    for (var [i] of ModelManager_1.ModelManager.MapModel.GetAllUnlockedFogs()) {
      this.OpenFogSet.add(i);
    }
  }
  Efc() {
    var i = ConfigManager_1.ConfigManager.MapConfig.GetAllTileConfigByMapId(this._Ui);
    this.AUi.splice(0, this.AUi.length);
    for (const r of i) {
      if (!StringUtils_1.StringUtils.IsEmpty(r.MapTilePath) && this.Cfc === r.GravityFlip) {
        var e = ModelManager_1.ModelManager.MapModel.CheckUnlockMapBlockIds(r.Block, this.Cfc, this._Ui);
        var s = r.MapTilePath.split("/");
        var s = s[s.length - 1];
        let i = "";
        let t = "";
        t = e !== 0 ? (e = ConfigManager_1.ConfigManager.MapConfig.GetUnlockMapTileConfigById(e), i = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(e.MapTilePath), ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(e.MiniMapTilePath)) : (i = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(r.MapTilePath), ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(r.MiniMapTilePath));
        var e = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(r.HdMapTilePath);
        var a = this._Ai(i, t);
        var h = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(r.FogTilePath);
        var _ = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(r.MiniFogTilePath);
        var h = this._Ai(h, _);
        this.AUi.push({
          MapTilePath: a,
          HdMapTilePath: e,
          FogTilePath: h,
          MapTileName: s
        });
      }
    }
  }
  Ifc() {
    this.OnCalTotalTileNum();
    let t = 0;
    let i = 0;
    if (this.PUi === 1) {
      t = 4;
      this.GUi.length = 0;
      this.GUi.push(this.jUi);
      for (let i = 1; i < t; ++i) {
        var e = LguiUtil_1.LguiUtil.CopyItem(this.jUi, this.HUi);
        this.GUi.push(e);
      }
    } else {
      i = this.xUi.MaxX - this.xUi.MinX + 1 + FAKE_TILE_COUNT * 2;
      var s = this.xUi.MaxY - this.xUi.MinY + 1 + FAKE_TILE_COUNT * 2;
      t = i * s;
    }
    this.qUi.length = 0;
    this.VUi.SetUIActive(true);
    this.qUi.push(this.VUi);
    this.J__.length = 0;
    for (let i = 1; i < t; ++i) {
      var a = this.Mfc();
      this.qUi.push(a);
    }
    return [t, i];
  }
  Tfc(i) {
    var t = i.MaxX;
    var e = 1 - i.MinX;
    var s = Math.max(t, e);
    var a = i.MaxY;
    var i = 1 - i.MinY;
    var h = Math.max(a, i);
    this.kUi.SetWidth(s * 2 * MapDefine_1.DETAIL_TILE_REALSIZE);
    this.kUi.SetHeight(h * 2 * MapDefine_1.DETAIL_TILE_REALSIZE);
    this.MapOffset.Set(Math.max(0, t - e) * MapDefine_1.DETAIL_TILE_REALSIZE * 2, Math.max(0, e - t) * MapDefine_1.DETAIL_TILE_REALSIZE * 2, Math.max(0, i - a) * MapDefine_1.DETAIL_TILE_REALSIZE * 2, Math.max(0, a - i) * MapDefine_1.DETAIL_TILE_REALSIZE * 2);
    this.FakeOffset = MapDefine_1.DETAIL_TILE_REALSIZE * FAKE_TILE_COUNT;
  }
  lAi() {
    this.Efc();
    var [, i] = this.Ifc();
    this.Abc = i;
    var t = new Map();
    const e = this._Ui;
    for (const r of this.AUi) {
      var s = this.bUi(r.MapTileName);
      if (this.Ata === 2) {
        var a = `${e}_${s.X}_${s.Y}`;
        var a = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Iua, a);
        let i = V2FogPath;
        if (this.PUi === 1) {
          i = V2FogMiniPath;
        }
        if (a && (a.IsFogP1 && (r.FogTilePath = `${i}/T_FogTiles_${e}_${s.X}_${s.Y}_UI_p1.T_FogTiles_${e}_${s.X}_${s.Y}_UI_p1`), a.IsFogP2)) {
          r.FogTilePath2 = `${i}/T_FogTiles_${e}_${s.X}_${s.Y}_UI_p2.T_FogTiles_${e}_${s.X}_${s.Y}_UI_p2`;
        }
      }
      t.set(s.X + "_" + s.Y, r);
    }
    var h;
    var _ = Vector2D_1.Vector2D.Create();
    for (let i = 0; i < this.qUi.length; i++) {
      const n = this.qUi[i];
      n.SetWidth(MapDefine_1.DETAIL_TILE_SPACE);
      n.SetHeight(MapDefine_1.DETAIL_TILE_SPACE);
      if (this.PUi === 1) {
        this.uAi(n);
      } else {
        const [o, M] = this.Pbc(i);
        _.X = (o - 0.5) * MapDefine_1.DETAIL_TILE_SPACE;
        _.Y = (M - 0.5) * MapDefine_1.DETAIL_TILE_SPACE;
        n.SetAnchorOffset(_.ToUeVector2D());
        if (GlobalData_1.GlobalData.IsPlayInEditor) {
          n.GetOwner()?.SetActorLabel(`X:${o}_Y:${M}`);
        }
        const l = t.get(o + "_" + M);
        if (l) {
          if (GlobalData_1.GlobalData.IsPlayInEditor) {
            n.GetOwner()?.SetActorLabel(l.MapTileName);
          }
          n.SetCustomMaterialScalarParameter(HD_SCALAR_NAME, 0);
          h = {
            TileX: o,
            TileY: M,
            AnchorOffset: _,
            LoadMapTileCallBack: i => {
              var t;
              n.SetTexture(i);
              if (this.Ata === 2) {
                t = `${e}_${o}_${M}`;
                if ((t = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Iua, t)) && (t.IsFogP1 && this.gil(n, l.FogTilePath, 1), t.IsFogP2)) {
                  this.gil(n, l.FogTilePath2, 2);
                }
              } else if (StringUtils_1.StringUtils.IsEmpty(l.FogTilePath)) {
                n.SetColor(this.WUi);
              } else {
                if (i === undefined && Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Map", 63, "[地图系统]->loadCallback 切块贴图为空", ["MapId", e], ["TileX", o], ["TileY", M], ["assetData", l]);
                }
                this.cAi(n, l.FogTilePath);
              }
            },
            AssetData: l,
            FogDefaultColor: this.WUi,
            MapType: this.PUi,
            MapTile: n,
            MapId: e
          };
          h = new MapTileItem_1.MapTileItem(h);
          this.J__.push(h);
        }
      }
    }
    if (this.PUi !== 1) {
      this.Tfc(this.xUi);
    }
  }
  Pbc(i) {
    var t = Math.ceil((i + 1) / this.Abc);
    return [i - (t - 1) * this.Abc + this.xUi.MinX - FAKE_TILE_COUNT, -(t - 1) + this.xUi.MaxY + FAKE_TILE_COUNT];
  }
  bUi(i) {
    i = i.split("_");
    return {
      X: UE.KismetStringLibrary.Conv_StringToInt(i[2]),
      Y: UE.KismetStringLibrary.Conv_StringToInt(i[3])
    };
  }
  cAi(i, t, e) {
    const s = i;
    this.rsh(t, i => {
      if (i) {
        this.uAi(s, i);
      } else {
        s.SetColor(this.WUi);
      }
      if (e) {
        e();
      }
    });
  }
  gil(i, t, e, s) {
    const a = i;
    this.rsh(t, i => {
      if (i) {
        this.uAi(a, i, e);
      } else {
        a.SetColor(this.WUi);
      }
      if (s) {
        s();
      }
    });
  }
  osh(i, t, e, s = 1) {
    const a = i;
    this.rsh(t, i => {
      if (i) {
        this.nsh(a, i, s);
      } else {
        a.SetColor(this.ish);
      }
      if (e) {
        e();
      }
    });
  }
  rsh(i, t) {
    var e = this.wUi.get(i);
    if (e) {
      t(e);
    } else {
      ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.Texture, t, 102, "Ui.MapUi");
    }
  }
  async LoadMapBorder() {
    this.r1g.forEach(i => {
      i.GetOwner()?.K2_DestroyActor();
    });
    this.r1g.length = 0;
    var i = ModelManager_1.ModelManager.MapModel.GetCurMapBorderConfig(this._Ui, this.z3t, this.PUi, this.Cfc);
    if (i !== undefined) {
      i = i.PrefabPaths;
      await Promise.all(i.map(async i => LguiUtil_1.LguiUtil.LoadPrefabByAsync(i, this.kUi))).then(i => {
        if (this.Yfe) {
          i.forEach(i => {
            i?.K2_DestroyActor();
          });
        } else {
          i.forEach(i => {
            i = i.GetComponentByClass(UE.UIItem.StaticClass());
            i.SetAnchorOffset(new UE.Vector2D(0, 0));
            this.r1g.push(i);
          });
        }
      });
    }
  }
  UpdateMinimapTiles(i) {
    if (this.PUi === 1 && this.eAi) {
      var t = MapUtil_1.MapUtil.GetTilePosition(i, 0.5);
      var e = t.X;
      var t = t.Y;
      var s = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId();
      var a = this.DPn.has(s) ? this.DPn.get(s) : 0;
      var h = this.RPn !== a;
      if (!(Math.abs(this.XUi - i.X) < MapDefine_1.MINI_MAP_UPDATE_GAP * MapDefine_1.UNIT) || !(Math.abs(this.$Ui - i.Y) < MapDefine_1.MINI_MAP_UPDATE_GAP * MapDefine_1.UNIT) || this.KUi !== e || this.QUi !== t || h) {
        this.TLc = [e, t, e - 1, t, e, t - 1, e - 1, t - 1];
        var _ = this.izs(i, e, t);
        this.rzs(this.qUi, this.TLc, _);
        var r = a !== 0 && this.HUi !== undefined;
        if (r) {
          this.rzs(this.GUi, this.TLc, _);
          for (let i = 0; i < this.GUi.length; i++) {
            var n = this.TLc[i * 2];
            var o = this.TLc[i * 2 + 1];
            if (_[i].R > 0) {
              n = (n - 0.5 - 0.5 + _[i].B + _[i].R / 2) * MapDefine_1.DETAIL_TILE_SPACE;
              o = (o - 0.5 + 0.5 - _[i].A - _[i].G / 2) * MapDefine_1.DETAIL_TILE_SPACE;
              this.tzs?.SetAnchorOffset(new UE.Vector2D(n, o));
              break;
            }
          }
        }
        this.HUi?.SetUIActive(r);
        this.dil = r;
        if (this.KUi !== e || this.QUi !== t || h) {
          this.KUi = e;
          this.QUi = t;
          for (let i = 0; i < this.qUi.length; i++) {
            var M = this.TLc[i * 2];
            var l = this.TLc[i * 2 + 1];
            if (r) {
              this.ozs(this.GUi[i], M, l, a, s);
            }
            this.nzs(this.qUi[i], M, l);
          }
          if (r) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapSubMapChanged, a);
          } else {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapSubMapChanged, 0);
          }
          this.RPn = a ?? 0;
        }
      }
    }
  }
  ozs(e, s, a, i, t) {
    var h = ConfigManager_1.ConfigManager.MapConfig.GetTileConfig(s.toString() + "_" + a.toString(), this._Ui, this.Cfc);
    if (!h || StringUtils_1.StringUtils.IsEmpty(h.MapTilePath)) {
      e.SetColor(this.ish);
    } else {
      var _ = ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigById(i);
      if (_) {
        _ = _.MiniMapTilePath.find(i => i.includes(s + "_" + a));
        if (_) {
          _ = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(_);
          if (StringUtils_1.StringUtils.IsEmpty(_)) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Map", 34, "UpdateMinimapTiles 多层地图小地图获取地图块资源为空", ["x", s], ["y", a], ["MultiMapId", i], ["AreaId", t]);
            }
            e.SetColor(this.ish);
          } else if (this.Ata === 2) {
            i = `${this._Ui}_${s}_${a}`;
            const r = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Iua, i);
            ResourceSystem_1.ResourceSystem.LoadAsync(_, UE.Texture, t => {
              if (t) {
                e.SetTexture(t);
                if (r && (r.IsFogP1 || r.IsFogP2)) {
                  e.SetColor(this.WUi);
                  let i = V2FogPath;
                  if (this.PUi === 1) {
                    i = V2FogMiniPath;
                  }
                  if (r.IsFogP1) {
                    t = `${i}/T_FogTiles_${this._Ui}_${s}_${a}_UI_p1.T_FogTiles_${this._Ui}_${s}_${a}_UI_p1`;
                    this.osh(e, t, undefined, 1);
                  }
                  if (r.IsFogP2) {
                    t = `${i}/T_FogTiles_${this._Ui}_${s}_${a}_UI_p2.T_FogTiles_${this._Ui}_${s}_${a}_UI_p2`;
                    this.osh(e, t, undefined, 2);
                  }
                } else {
                  e.SetColor(this.WUi);
                }
              }
            }, 100, "Ui.MapUi");
          } else {
            t = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(h.MiniFogTilePath);
            i = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(h.FogTilePath);
            const n = this._Ai(i, t);
            ResourceSystem_1.ResourceSystem.LoadAsync(_, UE.Texture, i => {
              if (i) {
                e.SetTexture(i);
                if (StringUtils_1.StringUtils.IsEmpty(n)) {
                  e.SetColor(this.WUi);
                } else {
                  this.osh(e, n, undefined);
                }
              }
            }, 100, "Ui.MapUi");
          }
        } else {
          e.SetColor(this.ish);
        }
      } else {
        e.SetColor(this.ish);
      }
    }
  }
  nzs(e, s, a) {
    var h = ConfigManager_1.ConfigManager.MapConfig.GetTileConfig(s.toString() + "_" + a.toString(), this._Ui, this.Cfc);
    if (h && !StringUtils_1.StringUtils.IsEmpty(h.MapTilePath)) {
      var _ = ModelManager_1.ModelManager.MapModel.CheckUnlockMapBlockIds(h.Block, this.Cfc, this._Ui);
      let i = "";
      let t = "";
      t = _ !== 0 ? (_ = ConfigManager_1.ConfigManager.MapConfig.GetUnlockMapTileConfigById(_), i = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(_.MapTilePath), ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(_.MiniMapTilePath)) : (i = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(h.MapTilePath), ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(h.MiniMapTilePath));
      _ = this._Ai(i, t);
      if (this.Ata === 2) {
        var r = `${this._Ui}_${s}_${a}`;
        const n = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Iua, r);
        ResourceSystem_1.ResourceSystem.LoadAsync(_, UE.Texture, t => {
          if (t?.IsValid() && (e.SetTexture(t), n)) {
            let i = V2FogPath;
            if (this.PUi === 1) {
              i = V2FogMiniPath;
            }
            if (n.IsFogP1) {
              t = `${i}/T_FogTiles_${this._Ui}_${s}_${a}_UI_p1.T_FogTiles_${this._Ui}_${s}_${a}_UI_p1`;
              this.gil(e, t, 1);
            }
            if (n.IsFogP2) {
              t = `${i}/T_FogTiles_${this._Ui}_${s}_${a}_UI_p2.T_FogTiles_${this._Ui}_${s}_${a}_UI_p2`;
              this.gil(e, t, 2);
            }
          }
        }, 100, "Ui.MapUi");
      } else {
        r = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(h.FogTilePath);
        h = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(h.MiniFogTilePath);
        const o = this._Ai(r, h);
        ResourceSystem_1.ResourceSystem.LoadAsync(_, UE.Texture, i => {
          if (i?.IsValid()) {
            e.SetTexture(i);
            if (StringUtils_1.StringUtils.IsEmpty(o)) {
              e.SetColor(this.WUi);
            } else {
              this.cAi(e, o);
            }
          }
        }, 100, "Ui.MapUi");
      }
    }
  }
  izs(i, t, e) {
    var s = Vector2D_1.Vector2D.Create(i);
    s.DivisionEqual(MapDefine_1.DETAIL_TILE_REALSIZE * MapDefine_1.UNIT);
    var t = s.X - t + 1;
    var s = s.Y + e;
    this.XUi = i.X;
    this.$Ui = i.Y;
    var e = MapDefine_1.MINI_MAP_RADIUS / MapDefine_1.DETAIL_TILE_REALSIZE;
    var i = Math.min(t + e, 1);
    var a = Math.max(t - e, 0);
    var h = Math.min(s + e, 1);
    var _ = Math.max(s - e, 0);
    var i = new UE.LinearColor(i - a, h - _, a, _);
    var h = new UE.LinearColor(e * 2 - i.R, i.G, Math.min(1 - e + t, 1), _);
    var t = new UE.LinearColor(i.R, e * 2 - i.G, a, Math.max(s - e - 1, 0));
    return [i, h, t, new UE.LinearColor(h.R, t.G, h.B, t.A)];
  }
  rzs(t, e, s) {
    var a = Vector2D_1.Vector2D.Create();
    for (let i = 0; i < t.length; i++) {
      var h = t[i];
      h.SetWidth(Math.max(s[i].R * MapDefine_1.DETAIL_TILE_REALSIZE, 0));
      h.SetHeight(Math.max(s[i].G * MapDefine_1.DETAIL_TILE_REALSIZE, 0));
      var _ = e[i * 2];
      var r = e[i * 2 + 1];
      a.X = (_ - 0.5 - 0.5 + s[i].B + s[i].R / 2) * MapDefine_1.DETAIL_TILE_SPACE;
      a.Y = (r - 0.5 + 0.5 - s[i].A - s[i].G / 2) * MapDefine_1.DETAIL_TILE_SPACE;
      h.SetAnchorOffset(a.ToUeVector2D());
      h.SetCustomMaterialVectorParameter(new UE.FName("UVCorrect"), s[i]);
    }
  }
  ShowSubMapByPosition(i, t, e = false) {
    var s;
    if (this.PUi !== 1 && i !== 0 && !(s = this.dil, this.CreateSubMapTile(i, -t, s), this.HUi?.SetUIActive(true), this.dil = true, s)) {
      this.IKs(false, undefined, e);
    }
  }
  HideSubMap() {
    if (this.dil) {
      this.vKs.forEach(i => {
        this.TKs(i, false);
      });
      this.IKs(true, () => {
        this.HUi?.SetUIActive(false);
      });
    } else {
      this.HUi?.SetUIActive(false);
    }
    this.dil = false;
  }
  IKs(i = false, t, e = false) {
    var s = this.MKs?.GetPlayTween();
    if (s) {
      this.yKs();
      this.MKs.Stop();
      s.from = i ? this.SKs : 0;
      s.to = i ? 0 : this.SKs;
      s.duration = e ? 0 : 0.2;
      if (t) {
        this.vv1 = () => {
          t();
          this.yv1();
        };
        i = (0, puerts_1.toManualReleaseDelegate)(this.vv1);
        this.EKs = s.RegisterOnComplete(i);
      }
      this.MKs.Play();
    }
  }
  yv1() {
    if (this.vv1) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.vv1);
      this.vv1 = undefined;
    }
  }
  yKs() {
    if (this.EKs !== undefined) {
      (this.MKs?.GetPlayTween()).UnregisterOnComplete(this.EKs);
      this.EKs = undefined;
    }
    this.yv1();
  }
  TKs(i, t = true) {
    var e;
    var s;
    var a = this.MKs?.GetPlayTween();
    if (a) {
      s = (e = i.GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass()))?.GetPlayTween();
      e.Stop();
      s.duration = a.duration - a.duration * 0.25;
      s.from = t ? 0 : i.GetAlpha();
      s.to = t ? i.GetAlpha() : 0;
      e.Play();
    }
  }
  LKs(i, t = true) {
    var e = i.GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    var s = e?.GetPlayTween();
    e.Stop();
    s.duration = t ? 0.3 : 0.15;
    if (t) {
      s.from = i.GetAlpha();
      s.to = 1;
    } else {
      s.to = i.GetAlpha();
    }
    e.Play();
  }
  GetMultiMapAreaIdByPosition(i) {
    i = this.GetSubMapGroupByPosition(i);
    i = ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigByGroupId(i);
    if (i && i.length > 0) {
      i = i.find(i => i.Floor === -1);
      if (i && i.Area.length > 0) {
        return i.Area[0];
      }
    }
    return 0;
  }
  GetWorldMapCenterPosition() {
    var i = UE.LGUIBPLibrary.SimulationLineTraceOnCenterScreen(GlobalData_1.GlobalData.World, this.D7s);
    if (i && i.enterComponent) {
      i = i.GetLocalPointInPlane();
      return Vector_1.Vector.Create(i);
    }
  }
  GetSubMapGroupByPosition(i) {
    var t = this.kUi.GetWidth();
    var e = this.kUi.GetHeight();
    var s = MapUtil_1.MapUtil.GetTilePositionByUiPosition(i.ToUeVectorOld());
    var a = s.X;
    var s = s.Y;
    var h = (i.X + t / 2) % MapDefine_1.DETAIL_TILE_SPACE;
    var _ = (i.Y + e / 2) % MapDefine_1.DETAIL_TILE_SPACE;
    var r = this.lPn.get(a + "_" + s);
    if (r) {
      for (let t = 0; t < r?.MultiMapRangeList.length; t++) {
        var n = r?.MultiMapRangeList[t];
        for (let i = 0; i < n.ArrayInt.length; i += 4) {
          var o = n.ArrayInt[i];
          var M = n.ArrayInt[i + 1];
          var l = n.ArrayInt[i + 2];
          var g = n.ArrayInt[i + 3];
          if (o <= h && h <= l && M <= _ && _ <= g) {
            return r.MultiMapList[t];
          }
        }
      }
    }
    return 0;
  }
  CreateSubMapTile(e, s, a = false) {
    this.vKs = [];
    e = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigByGroupId(e));
    if (e) {
      let t = 0;
      let i = 0;
      e.sort((i, t) => i.Floor === s && t.Floor !== s ? 1 : i.Floor !== s && t.Floor === s ? -1 : i.Floor - t.Floor);
      for (const n of e) {
        i++;
        for (const o of n.MapTilePath) {
          if (this.GUi && !this.GUi[t]) {
            h = LguiUtil_1.LguiUtil.CopyItem(this.jUi, this.HUi);
            this.GUi.push(h);
          }
          t++;
          var h = o.split("_");
          var _ = Number(h[2]);
          var r = Number(h[3]);
          const M = this.GUi[t - 1];
          if (a) {
            M.SetColor(this.ish);
          }
          M.SetAnchorOffsetX((_ - 0.5) * MapDefine_1.DETAIL_TILE_SPACE);
          M.SetAnchorOffsetY((r - 0.5) * MapDefine_1.DETAIL_TILE_SPACE);
          M.SetHierarchyIndex(t);
          M.SetWidth(MapDefine_1.DETAIL_TILE_SPACE);
          M.SetHeight(MapDefine_1.DETAIL_TILE_SPACE);
          _ = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(o);
          const l = s === n.Floor ? 255 : 20 + i * 20;
          ResourceSystem_1.ResourceSystem.LoadAsync(_, UE.Texture, i => {
            if (i) {
              M.SetTexture(i);
              M.SetColor(new UE.Color(l, l, l, 255));
            } else {
              M.SetColor(this.WUi);
            }
            M.SetUIActive(true);
            if (a) {
              this.LKs(M, s === n.Floor);
            } else {
              this.TKs(M, true);
            }
            this.vKs.push(M);
          }, 100, "Ui.MapUi");
        }
      }
      for (let i = t; i < this.GUi.length; i++) {
        this.GUi[i].SetUIActive(false);
      }
    }
  }
  ConvertUiPositionToMapTilePosition(i) {
    return Vector2D_1.Vector2D.Create();
  }
  UpdateCurrentAreaMapGroupId(i) {
    if (this.U1g) {
      var i = MapUtil_1.MapUtil.GetTilePositionByUiPosition(i.ToUeVectorOld());
      var t = i.X;
      var e = i.Y;
      for (const s of ConfigManager_1.ConfigManager.RegionalTerminalConfig.GetAllAreaMapGroup()) {
        if (this._Ui === s.MapId) {
          for (const a of s.BlockBorder) {
            if (t >= a.XMin && t <= a.XMax && e >= a.YMin && e <= a.YMax) {
              ModelManager_1.ModelManager.RegionalTerminalModel.CurrentAreaMapGroupId = s.Id;
              return;
            }
          }
        }
      }
      ModelManager_1.ModelManager.RegionalTerminalModel.CurrentAreaMapGroupId = 0;
    }
  }
  rAi() {
    for (const i of this.qUi) {
      this.uAi(i);
    }
    for (const t of this.GUi) {
      this.nsh(t, undefined);
    }
  }
  HandleFogAreaOpen(e) {
    this.zUi = [];
    this.JUi ||= (0, puerts_1.toManualReleaseDelegate)(this.nAi);
    this.Rbc = e;
    if (this.Ata === 2) {
      var i = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.yua, e.toString());
      if (i === undefined) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Map", 63, "fog data not found", ["fogId", e]);
        }
        return;
      }
      var s;
      var a;
      var h = i.Mask;
      let t = false;
      for (let i = 0; i < this.qUi.length; i++) {
        if (this.qUi[i] && ([a, s] = this.Pbc(i), a = `${this._Ui}_${a}_${s}`, s = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Iua, a)) && s.AreaFogIDs && s.AreaFogIDs.Contains(e)) {
          (a = new FogOpenParams()).MapTileIndex = i;
          this.zUi.push(a);
          a.ChannelV2 = h;
          if (!t) {
            s = this.Mwl(e);
            a = Vector_1.Vector.Create(s.X, s.Y, s.Z);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MoveWorldMapToPosition, a);
            t = true;
          }
        }
      }
    } else {
      for (let i = 0; i < this.qUi.length; i++) {
        var t;
        var _ = this.qUi[i];
        var _ = this.mAi(_, e);
        if (_ !== undefined) {
          (t = new FogOpenParams()).MapTileIndex = i;
          t.Channel = _;
          this.zUi.push(t);
        }
      }
    }
    this.nAi(0);
  }
  mAi(i, t) {
    if (i && i.texture) {
      i = i.texture.GetName();
      if (i !== MAP_TILE_COMMON) {
        i = this.bUi(i);
        i = i.X + "_" + i.Y;
        i = ConfigManager_1.ConfigManager.MapConfig.GetFogBlockConfig(i, this._Ui);
        if (i) {
          if (t === i.R) {
            return 0;
          } else if (t === i.G) {
            return 1;
          } else if (t === i.B) {
            return 2;
          } else if (t === i.Alpha) {
            return 3;
          } else {
            return undefined;
          }
        }
      }
    }
  }
  sAi(i, t, e) {
    var s = i.GetColor().ReinterpretAsLinear();
    switch (t) {
      case 0:
        s.R = e;
        break;
      case 1:
        s.G = e;
        break;
      case 2:
        s.B = e;
        break;
      case 3:
        s.A = e;
    }
    i.SetColor(s.ToFColor(false));
  }
  Cil(i, t, e) {
    if (t < 4) {
      var s = i.CustomVectorParameterTMap.Get(FOG_MASK_1);
      var a = s || new UE.LinearColor(0, 0, 0, 0);
      switch (t) {
        case 0:
          a.R = e;
          break;
        case 1:
          a.G = e;
          break;
        case 2:
          a.B = e;
          break;
        case 3:
          a.A = e;
      }
      i.SetCustomMaterialVectorParameter(FOG_MASK_1, a);
    } else {
      var s = i.CustomVectorParameterTMap.Get(FOG_MASK_2);
      var h = s || new UE.LinearColor(0, 0, 0, 0);
      switch (t) {
        case 4:
          h.R = e;
          break;
        case 5:
          h.G = e;
          break;
        case 6:
          h.B = e;
          break;
        case 7:
          h.A = e;
      }
      i.SetCustomMaterialVectorParameter(FOG_MASK_2, h);
    }
  }
  ywl() {
    if (this.Ata === 2 && this.zUi && this.zUi.length !== 0 && this.qUi) {
      let i = undefined;
      for (const h of this.zUi) {
        var t;
        var e;
        var s;
        var a = h.MapTileIndex;
        if (i === undefined && (s = this.h8l.FogUnlockItem, e = UiLayer_1.UiLayer.UiRootItem.GetRenderCanvas(), t = s.GetAnchorOffset(), s = s.GetPositionInViewPort(true), e = e.GetViewportSize(), i = new UE.Vector2D(s.X / e.X, s.Y / e.Y), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Map", 63, "Fog unlock center screen uv", ["anchorOffset", t], ["screenUv", i]);
        }
        if (a >= 0 && a < this.qUi.length) {
          (s = this.qUi[a]).SetCustomMaterialScalarParameter(FOG_UNLOCK_CENTERX_NAME, i?.X ?? 0.5);
          s.SetCustomMaterialScalarParameter(FOG_UNLOCK_CENTERY_NAME, i?.Y ?? 0.5);
        }
      }
    }
  }
  Mwl(i) {
    var t = ConfigManager_1.ConfigManager.WorldMapConfig.GetMapFogConfig(i);
    if (t === undefined) {
      MapLogger_1.MapLogger.Error(63, `FogId ${i} not found in config, can not unlock material effect`);
      return new UE.VectorDouble(0, 0, 0);
    } else {
      i = t.FogUnlockPosition;
      return new UE.VectorDouble(i[0], i[1], i[2]);
    }
  }
  HandleDelegate() {
    var i;
    if (this.JUi) {
      this.ywl();
      i = ConfigManager_1.ConfigManager.MapConfig.GetMapDissolveTime();
      if (this.ZUi?.IsValid()) {
        this.ZUi.Kill();
        this.ZUi = undefined;
      }
      this.ZUi = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.JUi, 0, 1, i);
      this.Rbc = -1;
    }
  }
  UnBindDelegate() {
    if (this.JUi) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.nAi);
      this.JUi = undefined;
    }
    if (this.ZUi?.IsValid()) {
      this.ZUi.Kill();
      this.ZUi = undefined;
    }
  }
  uAi(i, t, e = 0) {
    var s;
    if (i && i.texture) {
      if ((s = i.texture.GetName()) === MAP_TILE_COMMON) {
        i.SetColor(this.WUi);
      } else {
        s = (s = this.bUi(s)).X + "_" + s.Y;
        if (this.Ata === 2) {
          if (t?.IsValid()) {
            if (e === 1) {
              i.SetCustomMaterialTextureParameter(FOG_TEXTURE_1, t);
            } else {
              i.SetCustomMaterialTextureParameter(FOG_TEXTURE_2, t);
            }
          }
          this.ssh(i, s);
        } else if (e = ConfigManager_1.ConfigManager.MapConfig.GetFogBlockConfig(s, this._Ui)) {
          if (t?.IsValid()) {
            i.SetCustomMaterialTextureParameter(FOG_TEXTURE_NAME, t);
          }
          s = this.ash(e);
          i.SetColor(s);
        } else {
          i.SetColor(this.WUi);
        }
      }
    }
  }
  nsh(t, i, e = 0) {
    if (t && t.texture) {
      var s = t.texture.GetName();
      if (s === MAP_TILE_COMMON) {
        t.SetColor(this.ish);
      } else {
        var [s, a] = this.hsh(s);
        if (this.Ata === 2) {
          var a = this._Ui + "_" + a;
          const h = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Iua, a);
          if (h !== undefined && this.OpenFogSet !== undefined) {
            this.OpenFogSet?.forEach(i => {
              if (h.AreaFogIDs.Contains(i)) {
                t.SetColor(new UE.Color(MAX_COLOR, MAX_COLOR, MAX_COLOR, MAX_COLOR));
              }
            });
          }
        } else if (s) {
          if (i?.IsValid()) {
            t.SetCustomMaterialTextureParameter(FOG_TEXTURE_NAME, i);
          }
          a = this.lsh(s);
          t.SetColor(a);
        } else {
          t.SetColor(this.ish);
        }
      }
    }
  }
  hsh(i) {
    i = this.bUi(i);
    i = i.X + "_" + i.Y;
    return [ConfigManager_1.ConfigManager.MapConfig.GetFogBlockConfig(i, this._Ui), i];
  }
  ssh(i, t) {
    t = this._Ui + "_" + t;
    const e = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Iua, t);
    const s = [0, 0, 0, 0, 0, 0, 0, 0];
    if (e !== undefined && this.OpenFogSet !== undefined) {
      this.OpenFogSet?.forEach(i => {
        if (this.Rbc !== i && e.AreaFogIDs.Contains(i)) {
          i = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.yua, i.toString());
          s[i.Mask] = 1;
        }
      });
    }
    if (ModelManager_1.ModelManager.WorldMapModel.EnableInstanceDungeonFilterMark && this._Ui !== MapDefine_1.HONAMI_MAP_ID) {
      for (let i = 0; i < s.length; i++) {
        s[i] = 1;
      }
    }
    var a = new UE.LinearColor(s[0], s[1], s[2], s[3]);
    var h = new UE.LinearColor(s[4], s[5], s[6], s[7]);
    var _ = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Iua, t);
    if (this.OpenFogSet && _) {
      for (let i = 0; i < _.AreaFogIDs.Num(); i++) {
        var r = _.AreaFogIDs.Get(i);
        if (this.Rbc !== r && this.OpenFogSet.has(r)) {
          switch (DataTableUtil_1.DataTableUtil.GetDataTableRow(this.yua, r.toString()).Mask) {
            case 0:
              a.R = 1;
              break;
            case 1:
              a.G = 1;
              break;
            case 2:
              a.B = 1;
              break;
            case 3:
              a.A = 1;
              break;
            case 4:
              h.R = 1;
              break;
            case 5:
              h.G = 1;
              break;
            case 6:
              h.B = 1;
              break;
            case 7:
              h.A = 1;
          }
        }
      }
    }
    i.SetCustomMaterialVectorParameter(FOG_MASK_1, a);
    i.SetCustomMaterialVectorParameter(FOG_MASK_2, h);
  }
  ash(i) {
    var t = this.OpenFogSet.has(i.R) ? MAX_COLOR : 0;
    var e = this.OpenFogSet.has(i.G) ? MAX_COLOR : 0;
    var s = this.OpenFogSet.has(i.B) ? MAX_COLOR : 0;
    var i = this.OpenFogSet.has(i.Alpha) ? MAX_COLOR : 0;
    return new UE.Color(t, e, s, i);
  }
  lsh(i) {
    var t = this.OpenFogSet.has(i.R) ? MAX_COLOR : 0;
    var e = this.OpenFogSet.has(i.G) ? MAX_COLOR : 0;
    var s = this.OpenFogSet.has(i.B) ? MAX_COLOR : 0;
    var i = this.OpenFogSet.has(i.Alpha) ? MAX_COLOR : 0;
    if (t === MAX_COLOR || e === MAX_COLOR || s === MAX_COLOR || i === MAX_COLOR) {
      return new UE.Color(MAX_COLOR, MAX_COLOR, MAX_COLOR, MAX_COLOR);
    } else {
      return new UE.Color(t, e, s, i);
    }
  }
  InValidTile(i) {
    i = MapUtil_1.MapUtil.GetTilePosition(i);
    return i.X >= this.xUi.MinX && i.X <= this.xUi.MaxX && i.Y >= this.xUi.MinY && i.Y <= this.xUi.MaxY;
  }
  UpdateDraggableParams(i) {
    this.Tfc(i);
  }
  ResetDraggableParams() {
    this.Tfc(this.xUi);
  }
  OnCalTotalTileNum() {
    this.xUi = {
      MaxX: -1,
      MinX: 1,
      MaxY: -1,
      MinY: 1
    };
    for (const h of this.AUi) {
      var i = this.bUi(h.MapTileName);
      var t = i.X;
      var i = i.Y;
      this.xUi.MaxX = Math.max(t, this.xUi.MaxX);
      this.xUi.MinX = Math.min(t, this.xUi.MinX);
      this.xUi.MaxY = Math.max(i, this.xUi.MaxY);
      this.xUi.MinY = Math.min(i, this.xUi.MinY);
    }
    var e = this.xUi.MaxX;
    var s = 1 - this.xUi.MinX;
    var e = Math.max(e, s);
    var s = this.xUi.MaxY;
    var a = 1 - this.xUi.MinY;
    var s = Math.max(s, a);
    this.TotalTileSize.Set(e * 2 * MapDefine_1.DETAIL_TILE_REALSIZE, s * 2 * MapDefine_1.DETAIL_TILE_REALSIZE);
  }
}
exports.MapTileMgr = MapTileMgr;
//# sourceMappingURL=MapTileMgr.js.map