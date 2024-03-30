let ms = ['1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m']; // 1-9 萬
let ps = ['1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p']; // 1-9 筒
let ss = ['1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s']; // 1-9 條
let zs = ['1z', '2z', '3z', '4z', '5z', '6z', '7z']; // 東 南 西 北 白 發 中

class Mahjong {
    constructor(options) {
      this.handList = options['handList'];
      this.furoList = options['furoList'];
    }

    filterCardList(cardList) {
        // 過濾包含特定字符的項目
        function filterItems(list, char) {
            let newList =  list.filter(function(item) {
                return item.indexOf(char) !== -1;
            });
            return newList.map(function(item) {return parseInt(item.replace(char, ''))}).sort();
        }
    
        // 將不同類型的項目進行過濾
        var m_s = filterItems(cardList, 'm');
        var p_s = filterItems(cardList, 'p');
        var s_s = filterItems(cardList, 's');
        var z_s = filterItems(cardList, 'z');
    
        // 將結果存入字典中
        let cDict = {
            '萬': m_s,
            '筒': p_s,
            '條': s_s,
            '字': z_s,
            'origin': cardList,
        };
    
        return cDict;
    }
    

    cards() {
        let cDict = {};
        if (furoList.length > 0) {
            cDict['f'] = this.filterCardList(furoList);
        }
        this.getEye().forEach(eye => {
            let counter = 0;
            const newList = handList.filter(item => {
                if (item === eye) {
                    counter++;
                    return counter > 2;
                }
                return true;
            });
            cDict[eye] = this.filterCardList(newList);
        });
        return cDict;
    }

    yakuHai() {
        let cDict = this.cards();
        tanyao(cDict);
    }

    getEye() {       
        // 尋找重複兩次的元素
        const duplicates = handList.reduce((acc, current) => {
            acc[current] = (acc[current] || 0) + 1;
            return acc;
        }, {});
        
        const repeatedTwice = Object.keys(duplicates).filter(key => duplicates[key] >= 2);
        return repeatedTwice;
    }

}

function reObj(arr, ele) {
    var index = arr.indexOf(ele); // 找到要刪除元素的索引
    if (index !== -1) {
        arr.splice(index, 1); // 從陣列中刪除該元素
    }
}

function getCounters(cards) {
    var counters = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],  // 萬
        [0, 0, 0, 0, 0, 0, 0, 0, 0],  // 筒
        [0, 0, 0, 0, 0, 0, 0, 0, 0],  // 條
        [0, 0, 0, 0, 0, 0, 0]         // 字
    ];

    $.each(cards, function(index, card) {
        var suit = card.slice(-1); // 获取花色
        var value = parseInt(card.slice(0, -1)) - 1; // 获取数字，并将其转换为索引（0到8）
        
        switch(suit) {
            case 'm':
                counters[0][value]++;
                break;
            case 'p':
                counters[1][value]++;
                break;
            case 's':
                counters[2][value]++;
                break;
            case 'z':
                counters[3][value]++;
                break;
            default:
                break;
        }
    });
    return counters;
}


function check3k(counters) {
    var firstNonZeroIndex = -1;
    var firstNonZeroValue = -1;

    // Find the first non-zero value and its index
    for (var i = 0; i < counters.length; i++) {
        for (var j = 0; j < counters[i].length; j++) {
            if (counters[i][j] !== 0) {
                firstNonZeroIndex = i;
                firstNonZeroValue = counters[i][j];
                break;
            }
        }
        if (firstNonZeroIndex !== -1) {
            break;
        }
    }

    // Output the result based on the first non-zero value
    if (firstNonZeroValue === 1) {
        console.log("這張牌是一張順子的第一張牌。");
    } else if (firstNonZeroValue === 2) {
        console.log("這張牌是兩張相同順子的第一張牌。");
    } else if (firstNonZeroValue === 3) {
        console.log("這張牌是三張相同順子的第一張牌，或者是一張順子加上一對子，或者是一副刻子。");
    } else if (firstNonZeroValue === 4) {
        console.log("這張牌是四張相同順子的第一張牌，或者是一張順子加上一副刻子。");
    }
}


// 一飜

// Riichi (立直) - 立直 
function riichi(cDict) {

}

// Ippatsu (一発) - 一發
function ippatsu() {
    // 實現一發的邏輯
}

// Menzen Tsumo (門前ツモ) - 門前清自摸 1飜
function menzenTsumo() {
    // 實現門前清自摸的邏輯
}

// Pinfu (平和) - 平和
function pinfu() {
    // 實現平和的邏輯
}

// Tanyao (斷么九) - 斷么九
function tanyao(cDict) {
    if (cDict['f']) {
        console.log('非斷么九111');
        return false;
    }

    for (var key in cDict) {
        let list = cDict[key];
        if (list['字'].length > 0 || /[z19]/.test(key)) {
            console.log('非斷么九');
            return false;
        }
        
        let counters = getCounters(list['origin']);
        check3k(counters);
    }
    return {'name':'立直', 'yaku':1} 
}

// Tanyao (一盃口) - 一盃口
function lipeikou() {
    // 實現一盃口的邏輯
}

// Yakuhai (役牌) - 役牌
function yakuhai() {
    // 實現役牌的邏輯
}

// Rinshan Kaihou (嶺上開花) - 嶺上開花
function rinshanKaihou() {
    // 實現嶺上開花的邏輯
}

// Chankan (搶槓) - 搶槓
function chankan() {
    // 實現搶槓的邏輯
}

// Haitei Raoyue (海底摸月) - 海底摸月
function haiteiRaoyue() {
    // 實現海底摸月的邏輯
}

// Houtei Raoyui (河底撈魚) - 河底撈魚
function houteiRaoyui() {
    // 實現河底撈魚的邏輯
}

// 二飜 

// Sanshoku Doujun (三色同順) - 三色同順
function sanshokuDoujun() {
    // 實現三色同順的邏輯
}

// Ittsuu (一氣通貫) - 一氣通貫
function ittsuu() {
    // 實現一氣通貫的邏輯
}

// Honroutou (混老頭) - 混老頭
function honroutou() {
    // 實現混老頭的邏輯
}

// Chanta (混全帶么九) - 混全帶么九
function chanta() {
    // 實現混全帶么九的邏輯
}

// Toitoi (對對和) - 對對和
function toitoi() {
    // 實現對對和的邏輯
}

// San Ankou (三暗刻) - 三暗刻
function sanAnkou() {
    // 實現三暗刻的邏輯
}

// San Kantsu (三槓子) - 三槓子
function sanKantsu() {
    // 實現三槓子的邏輯
}

// Honitsu (混一色) - 混一色
function honitsu() {
    // 實現混一色的邏輯
}

// Ryanpeikou (兩立直) - 兩立直
function ryanpeikou() {
    // 實現兩立直的邏輯
}

// Chiitoitsu (七對子) - 七對子
function chiitoitsu() {
    // 實現七對子的邏輯
}

// Toi Toi Hou (対々和) - 対々和
function toiToiHou() {
    // 實現対々和的邏輯
}

// Shousangen (小三元) - 小三元
function shousangen() {
    // 實現小三元的邏輯
}

// 三飜

// Chinitsu (混一色) - 混一色
function chinitsu() {
    // 實現混一色的邏輯
}

// Jun Chantaiyao (純全帶么九) - 純全帶么九
function junChantaiyao() {
    // 實現純全帶么九的邏輯
}

// Ryanpeikou (二盃口) - 二盃口
function ryanpeikou() {
    // 實現二盃口的邏輯
}

// 六飜

// Chinitsu (清一色) - 清一色
function chinitsu() {
    // 实现清一色的逻辑
}

// 役滿





