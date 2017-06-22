(function () {
    "use strict";

    var chet, top, morph, aRGBStart, aRGBFinish, elemHeight, wh, maxBlockOffset, dh, maxDocOffset, step,

        elem             = document.getElementById('block'),
        wrapper          = document.getElementById('wrapper'),

        sFadeStartColor  = '#72cc35'; //стартовый цвет

    chet = 0;

    morph = true; // флаг трансформации

    // парсим цвета
    aRGBStart  = sFadeStartColor.replace("#", "").match(/.{2}/g);

    // диагональ ромба для вращения
    elemHeight = elem.clientHeight * Math.sqrt(2);

    // отступ от края с учетом диагонали при вращении
    top = (elemHeight - elem.clientHeight) / 2;

    wh = window.innerHeight;

    // максимальный отступ блока
    maxBlockOffset = wh - elemHeight;

    // высота документа
    dh = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    // максимальнй отступ документа
    maxDocOffset = dh - wh;

    // шаг прокрутки
    step = dh / 20;

    document.addEventListener('scroll', onScroll);

    // клик на фигуре останавливает трансформацию
    elem.addEventListener('click', function () { morph = !morph; });

    function onScroll(ev) {

        // текущий отступ края экрана
        var offset = window.pageYOffset;

        var rate = offset / maxDocOffset;

        // прокрутка до середины
        if (rate * 100 < 50) setPostition(rate);

        // трансформаируем да/нет
        if (morph) setView(rate);
    }

    // промежуточный цвет
    function getFadeMiddleColor() {
        var R, G, B;

        R = Math.floor(Math.random() * (256));
        G = Math.floor(Math.random() * (256));
        B = Math.floor(Math.random() * (256));

        return 'rgb(' + R + ',' + G + ',' + B + ')';
    }

    // установка позиции
    function setPostition(rate) {
        var elem_offset = maxBlockOffset * rate + top;
        elem.style.top  = elem_offset + 'px';
    }

    // установка стилей и угла вращения
    function setView(rate) {
        elem.style.transform       = 'rotate(' + Math.floor(45 * (1 + rate)) + 'deg)';
        elem.style.backgroundColor = getFadeMiddleColor();
        elem.style.borderRadius    = Math.floor(rate * 100 / 2) + '%';
    }

    $(document).on('mousewheel DOMMouseScroll', function (e) {
        e.preventDefault();
        $("body").scrollTop(getDelta(e) < 0 ? chet += step : chet -= step);
    });

    function getDelta(e) {
        var evt = e || window.event;
        evt     = evt.originalEvent ? evt.originalEvent : evt;
        return evt.detail ? evt.detail * (-40) : evt.wheelDelta;
    }

})();