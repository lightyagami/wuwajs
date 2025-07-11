"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TicTacToeBoard = undefined;
class TicTacToeBoard {
  constructor() {
    this.OriginBoardInfo = [0, 0, 2, 2, 1, 1, 0, 1, 2];
    this.BoardInfo = [0, 0, 2, 2, 1, 1, 0, 1, 2];
    this.NextPoints = [1, 2, 5, 0, -1, 8, 3, 6, 7];
    this.PrePoints = [3, 0, 1, 6, -1, 2, 7, 8, 5];
    this.CirclePoints = [1, 2, 5, 8, 7, 6, 3, 0];
    this.FOa = 3;
    this.VOa = 4;
    this.HOa = 3;
    this.jOa = undefined;
    this.WOa = undefined;
    this.SelectNeighbors = new Array();
  }
  GetBoardInfo(t) {
    t.length = 0;
    for (const i of this.BoardInfo) {
      t.push(i);
    }
  }
  GetNextPoints(t) {
    t.length = 0;
    for (const i of this.NextPoints) {
      t.push(i);
    }
  }
  GetPrePoints(t) {
    t.length = 0;
    for (const i of this.PrePoints) {
      t.push(i);
    }
  }
  GetCirclePoints(t) {
    t.length = 0;
    for (const i of this.CirclePoints) {
      t.push(i);
    }
  }
  get BoardLength() {
    return this.FOa;
  }
  get CenterIndex() {
    return this.VOa;
  }
  get WinLineCount() {
    return this.HOa;
  }
  Init(t, i, s) {
    this.HOa = t;
    this.jOa = i;
    this.WOa = s;
  }
  InitOriginBoardInfo(i) {
    this.OriginBoardInfo.length = i.length;
    this.BoardInfo.length = this.OriginBoardInfo.length;
    for (let t = 0; t < i.length; t++) {
      this.OriginBoardInfo[t] = i[t];
      this.BoardInfo[t] = i[t];
    }
  }
  InitBoardInfo(i) {
    this.BoardInfo.length = i.length;
    for (let t = 0; t < i.length; t++) {
      this.BoardInfo[t] = i[t];
    }
  }
  StartGame() {}
  ResetGame() {
    this.BoardInfo.length = 0;
    for (const t of this.OriginBoardInfo) {
      this.BoardInfo.push(t);
    }
  }
  CheckPieceSelect(t, i) {
    return this.BoardInfo.length > t && this.BoardInfo[t] === i;
  }
  CheckPieceMove(t, i, s) {
    return this.BoardInfo[t] === s && this.BoardInfo[i] === 0 && (t === this.VOa || i === this.VOa || this.PrePoints[i] === t || this.NextPoints[i] === t);
  }
  OnPieceMove(t, i) {
    var s;
    return this.BoardInfo[i] === 0 && (s = this.BoardInfo[t], this.BoardInfo[t] = 0, this.BoardInfo[i] = s, this.CheckGameOver(i) || this.WOa && this.WOa(), true);
  }
  CheckBoardValue(t, i) {
    return this.BoardInfo[t] === i;
  }
  GetNoneNeighbors(t) {
    this.SelectNeighbors.length = 0;
    if (t === this.CenterIndex) {
      var s;
      var h = t % this.FOa;
      var e = Math.floor(t / this.FOa);
      for (let i = e - 1; i < e + 2; i++) {
        if (!(i < 0) && !(i >= this.FOa)) {
          for (let t = h - 1; t < 2 + h; t++) {
            if (!(t < 0) && !(t >= this.FOa)) {
              s = i * this.FOa + t;
              if (this.BoardInfo[s] === 0) {
                this.SelectNeighbors.push(s);
              }
            }
          }
        }
      }
    } else if (t > -1) {
      var i;
      var r;
      var o = t % this.FOa;
      var f = Math.floor(t / this.FOa);
      for (let t = f - 1; t < f + 2; t++) {
        if (!(t < 0) && !(t >= this.FOa)) {
          i = t * this.FOa + o;
          if (this.BoardInfo[i] === 0) {
            this.SelectNeighbors.push(i);
          }
        }
      }
      for (let t = o - 1; t < 2 + o; t++) {
        if (!(t < 0) && !(t >= this.FOa)) {
          r = f * this.FOa + t;
          if (this.BoardInfo[r] === 0) {
            this.SelectNeighbors.push(r);
          }
        }
      }
      if (this.BoardInfo[this.VOa] === 0 && !this.SelectNeighbors.includes(this.VOa)) {
        this.SelectNeighbors.push(this.VOa);
      }
    }
    return this.SelectNeighbors;
  }
  GetNoneNeighborsWithCustomInfos(s, t) {
    var h = new Array();
    if (t === this.CenterIndex) {
      var e;
      var r = t % this.FOa;
      var o = Math.floor(t / this.FOa);
      for (let i = o - 1; i < o + 2; i++) {
        if (!(i < 0) && !(i >= this.FOa)) {
          for (let t = r - 1; t < 2 + r; t++) {
            if (!(t < 0) && !(t >= this.FOa)) {
              if (s[e = i * this.FOa + t] === 0) {
                h.push(e);
              }
            }
          }
        }
      }
    } else if (t > -1) {
      var i;
      var f;
      var n = t % this.FOa;
      var a = Math.floor(t / this.FOa);
      for (let t = a - 1; t < a + 2; t++) {
        if (!(t < 0) && !(t >= this.FOa)) {
          if (s[i = t * this.FOa + n] === 0) {
            h.push(i);
          }
        }
      }
      for (let t = n - 1; t < 2 + n; t++) {
        if (!(t < 0) && !(t >= this.FOa)) {
          if (s[f = a * this.FOa + t] === 0) {
            h.push(f);
          }
        }
      }
      if (s[this.VOa] === 0 && !h.includes(this.VOa)) {
        h.push(this.VOa);
      }
    }
    return h;
  }
  CheckGameOver(h) {
    var e = this.BoardInfo[h];
    if (e !== 0) {
      var r = this.CirclePoints.length;
      var o = this.CirclePoints.length / 2;
      if (h !== this.VOa) {
        let t = this.HOa - 1;
        let i = this.NextPoints[h];
        while (t--) {
          if (this.BoardInfo[i] !== e) {
            t++;
            break;
          }
          i = this.NextPoints[i];
        }
        let s = this.PrePoints[h];
        while (t--) {
          if (this.BoardInfo[s] !== e) {
            t++;
            break;
          }
          s = this.PrePoints[s];
        }
        if (t < 1) {
          if (this.jOa) {
            this.jOa(e);
          }
          return true;
        }
        if (e === this.BoardInfo[this.VOa]) {
          h = this.CirclePoints.indexOf(h);
          if (h > -1) {
            if (e === this.BoardInfo[this.CirclePoints[(h + o) % r]]) {
              if (this.jOa) {
                this.jOa(e);
              }
              return true;
            }
          }
        }
      } else {
        for (let t = 0; t < o; t++) {
          var i = (t + o) % r;
          if (e === this.BoardInfo[this.CirclePoints[t]] && e === this.BoardInfo[this.CirclePoints[i]]) {
            if (this.jOa) {
              this.jOa(e);
            }
            return true;
          }
        }
      }
    }
    return false;
  }
  GetDebugBoardInfo(t) {
    t.Empty();
    for (const i of this.BoardInfo) {
      t.Add(i);
    }
  }
}
exports.TicTacToeBoard = TicTacToeBoard;
//# sourceMappingURL=TicTacToeBoard.js.map