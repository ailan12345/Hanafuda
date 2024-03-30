// 找到所有含有 data-seq 属性的元素
$('[data-seq]').each(function() {
    // 取得元素的 data-seq 属性值
    var seqValue = $(this).data('seq');
    makeCards($(this), seqValue)
});


function makeCards(ele, seqValue) {
    // 使用正则表达式匹配数字和字母的组合
    var matches = seqValue.match(/(\d+)([a-zA-Z]+)/g);

    // 如果匹配成功
    if (matches) {
        // 遍历匹配结果
        matches.forEach(function(match) {
            var numbers = match.match(/\d+/)[0]; // 匹配数字部分
            var letters = match.match(/[a-zA-Z]+/)[0]; // 匹配字母部分

            // 将数字字符串转换为数字数组
            var numberArray = numbers.split('').map(Number);

            // 使用循環處理每个数字
            numberArray.forEach(function(number) {
                var imgElement = $('<img>');
                imgElement.attr('src', './res/' + number + letters + '.webp');
                imgElement.attr('data-face', number + letters); // 添加 data-face 屬性
                ele.append(imgElement);
            }, this);
        }, this);
    }
}

