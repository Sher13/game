var cn = document.getElementById("holst"),
    ctx = cn.getContext('2d');
var clFon = "rgb(200,200,200)";
document.onkeydown = document.onkeyup = handle;
var clLine = "rgb(0,0,0)";
var clFinish = "rgb(115,18,19)";
var clSolve = "rgb(185,99,99)";
var flag = 0;
var GO = 0;
var x, y;
var a, b, c, d;
a = 0;
b = 0;
c = 0;
d = 0;
var timerId1;

function getCl(x1, y1) {

    return "rgb(" + (ctx.getImageData(x1, y1, 1, 1).data)[0] + "," + (ctx.getImageData(x1, y1, 1, 1).data)[1] + "," + (ctx.getImageData(x1, y1, 1, 1).data)[2] + ")";
}

function prov(x1, y1, h, w) {
    if (x1 < 0 || x1 >= h * 20)
        return 0;
    if (y1 < 0 || y1 >= w * 20)
        return 0;
    if (getCl(x1, y1) == clLine)
        return 0;
    return 1;
}

function win(x1, y1) {
    if (getCl(x1, y1) == clFinish)
        return 1;
    return 0;
}

function gameOver() {
    GO = 1;
    clearInterval(timerId1);
    x = -1;
    y = -1;
    a = 0;
    b = 0;
    c = 0;
    d = 0;
    var block = document.getElementById("Lost1");
    block.style.display = "inline";
    document.getElementById("Gen1").disabled = true;
    document.getElementById("Del1").disabled = true;
    document.getElementById("h").disabled = true;
    document.getElementById("w").disabled = true;
    document.getElementById("ch1").disabled = true;
    document.getElementById("ch2").disabled = true;
}

function WinGame() {
    GO = 1;
    clearInterval(timerId1);
    x = -1;
    y = -1;
    a = 0;
    b = 0;
    c = 0;
    d = 0;
    var block = document.getElementById("Win1");
    block.style.display = "inline";
    document.getElementById("Gen1").disabled = true;
    document.getElementById("Del1").disabled = true;
    document.getElementById("h").disabled = true;
    document.getElementById("w").disabled = true;
    document.getElementById("ch1").disabled = true;
    document.getElementById("ch2").disabled = true;
}

function del(x1, y1) {
    ctx.fillStyle = clFon;
    ctx.fillRect(x1, y1, 2, 2);
}

function ris(x1, y1) {
    if (win(x1, y1) || win(x1 + 1, y1) || win(x1, y1 + 1) || win(x1 + 1, y1 + 1))
        WinGame();
    else {
        if (prov(x1, y1, h, w) && prov(x1 + 1, y1, h, w) && prov(x1, y1 + 1, h, w) && prov(x1 + 1, y1 + 1, h, w)) {
            ctx.fillStyle = clLine;
            ctx.fillRect(x1, y1, 2, 2);
        } else
            gameOver();
    }
}

function fi(a1, b1, c1, d1) {
    if (GO == 0) {
        del(x, y);
        if (a1)
            x++;
        if (b1)
            y++;
        if (c1)
            x--;
        if (d1)
            y--;
        ris(x, y);
    }
}

function r1(e1, l) {
    var k = e1[0];
    for (var i = 0; i < e1.length; i++)
        k = Math.max(k, e1[i]);
    k++;
    for (var i = 0; i < e1.length - 1; i++)
        if (e1[i] == e1[i + 1]) {
            ctx.fillRect((i + 1) * 20, l, 1, 21);
        }
    else {
        var r = (Math.floor(Math.random() * 2)) % 2;
        if (r == 1) {
            var j = i + 1;
            while (e1[j] == e1[i + 1]) {
                e1[j] = Math.min(e1[i], e1[j]);
                j++;
            }
            e1[i + 1] = Math.min(e1[i], e1[i + 1]);
            j = i - 1;
            while (j >= 0 && e1[j] == e1[i]) {
                e1[j] = e1[i + 1];
                j--;
            }
            e1[i] = e1[i + 1];
        } else {
            ctx.fillRect((i + 1) * 20, l, 1, 21);
        }
    }
}

function r2(e1, l) {
    var t = new Array(e1.length);
    var i = 0;
    while (i < e1.length) {
        var j = i;
        var g = new Array();
        while (e1[i] == e1[j]) {
            g.push(e1[j]);
            j++;
        }
        var g1 = new Array(g.length);
        var kl = 0;
        for (var o = 0; o < g.length; o++) {
            g1[o] = (Math.floor(Math.random() * 2)) % 2;
            kl += g1[o];
        }

        if (kl == g.length) {

            var r = (Math.floor(Math.random() * (g.length)));
            g1[r] = 0;
        }
        for (var k = i; k < j; k++)
            t[k] = g1[k - i];
        i = j;
    }
    for (var k = 0; k < t.length; k++)
        if (t[k] == 1)
            ctx.fillRect(20 * k, l, 21, 1);
    return t;
}

function r3(e1, l) {
    for (var i = 0; i < e1.length - 1; i++)
        if (e1[i] == e1[i + 1]) {
            ctx.fillRect((i + 1) * 20, l, 1, 21);
        }
}

function Ellers_Algorithm(h, w) {
    var s1 = new Array();
    ctx.fillStyle = clLine;
    for (var i = 0; i < w; i++)
        s1.push(i);
    var hor = 0;
    while (hor != (h - 1) * 20) {
        r1(s1, hor);
        var niz = r2(s1, hor + 20);
        for (var i = 0; i < s1.length; i++)
            if (niz[i] == 1)
                s1[i] = -1;
        var k = s1[0];
        for (var i = 0; i < s1.length; i++)
            k = Math.max(k, s1[i]);
        k++;
        for (var i = 0; i < s1.length; i++)
            if (s1[i] == -1) {
                s1[i] = k;
                k++;
            }
        hor += 20;
    }
    r3(s1, hor);

}
var pred = new Array();

function make_set(a1) {
    pred[a1] = a1;
}

function find_set(a1) {
    if (a1 == pred[a1])
        return a1;
    return pred[a1] = find_set(pred[a1]);
}

function union_set(a1, b1) {
    a1 = find_set(a1);
    b1 = find_set(b1);
    if (a1 != b1) {
        if ((Math.floor(Math.random() * 2)) % 2)
            pred[a1] = b1;
        else
            pred[b1] = a1;
    }
}

function check(x1, y1, h, w) {
    if (x1 + 1 < w * 20 && getCl(x1 + 1, y1) == clLine)
        return 0;
    if (x1 - 1 >= 0 && getCl(x1 + -1, y1) == clLine)
        return 0;
    if (y1 + 1 < h * 20 && getCl(x1, y1 + 1) == clLine)
        return 0;
    if (y1 - 1 >= 0 && getCl(x1, y1 - 1) == clLine)
        return 0;
    return 1;
}

function Kruskals_Algorithm(h, w) {
    ctx.fillStyle = clLine;
    for (var i = 1; i < w; i++)
        ctx.fillRect(i * 20, 0, 1, h * 20);
    for (var i = 1; i < h; i++)
        ctx.fillRect(0, i * 20, w * 20, 1);
    pred.length = h * w;
    var rebr = new Array(0);
    for (let i = 0; i < h; i++)
        for (let j = 0; j < w; j++)
            make_set(i * w + j);
    for (var i = 0; i < h; i++)
        for (var j = 0; j < w; j++) {
            if (i + 1 < h)
                rebr.push({
                    S: (i + 1) * w + j,
                    F: i * w + j
                });
            if (j + 1 < w)
                rebr.push({
                    S: i * w + j + 1,
                    F: i * w + j
                });
        }
    ctx.fillStyle = clFon;
    var kol = 0;
    for (var k = 0; k < h * w - 1; k++) {
        var r;
        r = Math.floor(Math.random() * rebr.length) % rebr.length;
        while (find_set(rebr[r].F) == find_set(rebr[r].S)) {
            var removedItem = rebr.splice(r, 1);
            r = Math.floor(Math.random() * rebr.length) % rebr.length;
        }
        union_set(rebr[r].F, rebr[r].S);
        if (Math.floor((rebr[r].F) % w) == Math.floor((rebr[r].S) % w)) {
            var x1 = Math.floor((rebr[r].S) % w) * 20
            var y1 = Math.floor((rebr[r].S) / w) * 20;
            ctx.fillRect(1 + x1, y1, 19, 1);
            if (getCl(x1, y1) == clLine && check(x1, y1) == 1)
                ctx.fillRect(x1, y1, 1, 1);
            if (getCl(x1 + 20, y1) == clLine && check(x1 + 20, y1) == 1)
                ctx.fillRect(x1 + 20, y1, 1, 1);
        }
        if (Math.floor((rebr[r].F) / w) == Math.floor((rebr[r].S) / w)) {
            var x1 = Math.floor((rebr[r].S) % w) * 20
            var y1 = Math.floor((rebr[r].S) / w) * 20;
            ctx.fillRect(x1, 1 + y1, 1, 19);
            if (getCl(x1, y1) == clLine && check(x1, y1) == 1)
                ctx.fillRect(x1, y1, 1, 1);
            if (getCl(x1, y1 + 20) == clLine && check(x1, y1 + 20) == 1)
                ctx.fillRect(x1, y1 + 20, 1, 1);
        }
        var removedItem = rebr.splice(r, 1);
    }

}

function GenerateLabirint() {
    var h = document.getElementById("h").value;
    var w = document.getElementById("w").value;
    if (h > 1 && w > 1 && h <= 30 && w <= 30) {
        GO = 0;
        var element = document.getElementById('img');
        ctx.clearRect(0, 0, cn.width, cn.height);
        element.style.opacity = "0";
        ctx.fillStyle = "rgba(255,255,255,0)";
        ctx.fillRect(0, 0, cn.width, cn.height);
        ctx.fillStyle = clFon;
        ctx.fillRect(0, 0, w * 20, h * 20);
        x = 2;
        y = 2;
        ris(x, y);
        timerId1 = setInterval(function() {
            fi(a, b, c, d);
        }, 10);
        var El = document.getElementById("ch1");
        if (El.checked)
            Ellers_Algorithm(h, w);
        else
            Kruskals_Algorithm(h, w);
        ctx.fillStyle = clFinish;
        ctx.strokeStyle = clFinish;
        ctx.strokeRect(20 * w - 20 + 5, 20 * h - 20 + 5, 10, 10);
        ctx.stroke();
        ctx.fillRect(20 * w - 20 + 8, 20 * h - 20 + 8, 4, 4);
    } else {
        var block = document.getElementById("Error1");
        block.style.display = "inline";
        document.getElementById("Gen1").disabled = true;
        document.getElementById("Del1").disabled = true;
        document.getElementById("h").disabled = true;
        document.getElementById("w").disabled = true;
        document.getElementById("ch1").disabled = true;
        document.getElementById("ch2").disabled = true;
    }
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function SolveLabirint() {
    var h = document.getElementById("h").value;
    var w = document.getElementById("w").value;
    if ((GO == 0) && (h > 1 && w > 1 && h <= 30 && w <= 30)) {
        var rebr = new Array(0);
        var ver = new Array();
        for (var i = 0; i < h; i++)
            for (var j = 0; j < w; j++) {
                if (i + 1 < h && getCl(5 + j * 20, (i + 1) * 20) == clFon)
                    rebr.push({
                        S: (i + 1) * w + j,
                        F: i * w + j
                    });
                if (j + 1 < w && getCl((j + 1) * 20, 5 + i * 20) == clFon)
                    rebr.push({
                        S: i * w + j + 1,
                        F: i * w + j
                    });
            }
        var bfs = new Array(0);
        ver.push({
            pr: 0,
            zn: 0
        });
        for (var i = 1; i < h * w; i++)
            ver.push({
                pr: 0,
                zn: 1000
            });
        bfs.push(0);
        while (bfs.length != 0) {
            var nw = bfs[0];
            bfs.shift();
            for (var i = 0; i < rebr.length; i++) {
                if (rebr[i].F == nw && ver[rebr[i].S].zn > ver[rebr[i].F].zn + 1) {
                    bfs.push(rebr[i].S);
                    ver[rebr[i].S].zn = ver[rebr[i].F].zn + 1;
                    ver[rebr[i].S].pr = rebr[i].F;
                } else
                if (rebr[i].S == nw && ver[rebr[i].F].zn > ver[rebr[i].S].zn + 1) {
                    bfs.push(rebr[i].F);
                    ver[rebr[i].F].zn = ver[rebr[i].S].zn + 1;
                    ver[rebr[i].F].pr = rebr[i].S;
                }
            }
        }
        var nw = h * w - 1;
        ctx.fillStyle = clSolve;
        var k = 1;
        var v = new Array(0);
        v.push(899);
        while (ver[nw].pr != 0) {
            if (nw != h * w - 1)
                v.push(nw);
            nw = ver[nw].pr;
        }
        v.push(nw);
        v.push(0);
        for (var i = v.length - 1; i > 0; i--) {
            var x1 = Math.floor((v[i]) % w) * 20;
            var y1 = Math.floor((v[i]) / w) * 20;
            var x2 = Math.floor((v[i - 1]) % w) * 20;
            var y2 = Math.floor((v[i - 1]) / w) * 20;
            //await timeout(10);
            ctx.fillStyle = clSolve;
            if (x2 - x1 > 0 && y2 - y1 == 0)
                ctx.fillRect(x1 + 8, y1 + 8, x2 - x1 + 4, 4);
            if (x2 - x1 == 0 && y2 - y1 < 0)
                ctx.fillRect(x1 + 8, y2 + 8, 4, y1 - y2 + 4);
            if (x2 - x1 == 0 && y2 - y1 > 0)
                ctx.fillRect(x2 + 8, y1 + 8, 4, y2 - y1 + 4);
            if (x2 - x1 < 0 && y2 - y1 == 0)
                ctx.fillRect(x2 + 8, y2 + 8, x1 - x2 + 4, 4);
            //ctx.fillRect(x1,y1,20,20);
        }
        clearInterval(timerId1);
        GO = 1;
    }
}

function DeleteLabirint() {
    var element = document.getElementById('img');
    element.style.opacity = "1";
    clearInterval(timerId1);
    GO = 1;
}

function handle(e) {
    if (!document.getElementById("Gen1").disabled) {
        var co = e.keyCode;
        var h = e.type;
        if (h == 'keydown') {
            if (co == 39)
                a = 1;
            if (co == 40)
                b = 1;
            if (co == 37)
                c = 1;
            if (co == 38)
                d = 1;
            if (co == 13 || co == 32)
                GenerateLabirint();
            if (co == 83)
                SolveLabirint();
        } else {
            if (co == 39)
                a = 0;
            if (co == 40)
                b = 0;
            if (co == 37)
                c = 0;
            if (co == 38)
                d = 0;
        }
    }
}

function NewGame() {
    var element = document.getElementById('img');
    element.style.opacity = "1";
    document.getElementById("Win1").style.display = "none";
    document.getElementById("Lost1").style.display = "none";
    document.getElementById("Error1").style.display = "none";
    document.getElementById("Gen1").disabled = 0;
    document.getElementById("Del1").disabled = 0;
    document.getElementById("h").disabled = 0;
    document.getElementById("w").disabled = 0;
    document.getElementById("ch1").disabled = 0;
    document.getElementById("ch2").disabled = 0;
}
NewGame();
//alert(document.body.clientHeight);
var element = document.getElementById('img');
element.draggable = false;