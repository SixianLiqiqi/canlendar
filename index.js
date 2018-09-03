var $nowTime = document.getElementById('nowTime');
var $nextTime = document.getElementById('nextTime');

var oDate = new Date();
var oNowMonth = oDate.getMonth() + 1;
var oNowDay = oDate.getDate();

function init () {
    var oDate = new Date();
    var dataDate = {};
    dataDate.oDateObj = oDate;
    dataDate.year = oDate.getFullYear();
    dataDate.month = oDate.getMonth() + 1;

    // 生成左侧日历
    showDate($nowTime, dataDate);

    // 生成右侧日历
    if (dataDate.month === 12) {
        dataDate.year += 1;
        dataDate.month = 1;
        showDate($nextTime, dataDate);
    } else {
        dataDate.month += 1;
        showDate($nextTime, dataDate);
    }
}

init();

function bindEvent () {
    var oSpanLeft = document.getElementById('left');
    var oSpanRight = document.getElementById('right');    

    if ( oSpanLeft && !oSpanLeft.flag) {
        oSpanLeft.flag = true;
        oSpanLeft.onclick = turnPage;
    } else if ( oSpanRight && !oSpanRight.flag ) {
        oSpanRight.flag = true;
        oSpanRight.onclick = turnPage;
    }
}

function turnPage (event) {
    var oNowSpan = document.getElementsByClassName('title')[0].getElementsByTagName('span');
    var oNextSpan = document.getElementsByClassName('title')[1].getElementsByTagName('span');
    
    var oDate = new Date();
    var dataDate = {};
    dataDate.oDateObj = oDate;

    $nowTime.innerHTML = '';
    $nextTime.innerHTML = '';
    // 清空原表

    if (event.target.className === 'left') {
        console.log('left');
        var Month = parseInt(oNowSpan[0].innerHTML);
        var Year = parseInt(oNowSpan[1].innerHTML);
        dataDate.month = Month;

        if(Month === 12) {
            dataDate.month = Month;
            dataDate.year = Year - 1; 
            showDate($nowTime, dataDate); 

            dataDate.month = 1;
            dataDate.year = Year;
            showDate($nextTime, dataDate);
        } else {
            dataDate.year = Year;
            dataDate.month = Month;
            showDate($nowTime, dataDate);

            dataDate.year = Year;
            dataDate.month = Month + 1;
            showDate($nextTime, dataDate);
        }

    } else {
        console.log('right');
        // console.log(1);
        var Month = parseInt(oNextSpan[0].innerHTML);
        // console.log(oNextSpan[0].innerHTML)  // 7
        var Year = parseInt(oNextSpan[1].innerHTML);
        dataDate.month = Month;

        if (Month === 1) {
            dataDate.month = Month;
            // Month = 1;
            dataDate.year = Year + 1;
            showDate($nextTime, dataDate);

            dataDate.month = 12;
            dataDate.year = Year;
            showDate($nowTime, dataDate);
        } else {
            dataDate.year = Year;
            dataDate.month = Month;
            // console.log(dataDate.month)
            showDate($nextTime, dataDate);

            dataDate.year = Year;
            dataDate.month = Month - 1;
            showDate($nowTime, dataDate);
        }
    }
}


function isLeapYear (month) {
    if (month % 4 === 0 && month % 100 !== 0) {
        return true;
    } else {
        if (month % 400 === 0) {
            return true;
        } else {
            return false;
        }
    }
}

function createDay (oTd, index, dayNum, nowMonth) {
    for (var i = 0; i < dayNum; i++) {
        oTd[i + index].innerHTML = i + 1;
        if ( (i + 1) === oNowDay && nowMonth === oNowMonth ) {
            oTd[i + index].className = 'red';
        } else if ( (i + 1) > oNowDay && nowMonth === oNowMonth ) {
            oTd[i + index].className = 'blue'; 
        }
    }
}

function showDate (dom, oDate) {
    var $Title = document.createElement('div');
    $Title.className = 'title';
    var strDate = dom.className === 'nowTime' ? '<div id="left" class="left"><span>' + ( (oDate.month - 1) === 0 ? 12 : oDate.month - 1 ) + '</span>月</div><div class="c"><span>' + oDate.year + '</span>年<span>' + oDate.month + '</span>月</div>' : '<div id="right" class="right"><span>' + ( (oDate.month + 1)=== 13 ? 1 : oDate.month + 1 ) + '</span>月</div><div class="c"><span>' + oDate.year + '</span>年<span>' + oDate.month + '</span>月</div>';
    $Title.innerHTML = strDate;
    dom.appendChild($Title);

    // 绑定点击事件
    bindEvent();

    var $Table = document.createElement('table');
    var $Thead = document.createElement('thead');
    var $Tr = document.createElement('tr'); 
    var arrWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    for (var i = 0; i < arrWeek.length; i++) {
        var $Th = document.createElement('th');
        $Th.innerHTML = arrWeek[i];
        if(i === 5 || i === 6) {
        // 或者 || ； 并且 && 
            $Th.className = 'red';
        }
        $Tr.appendChild($Th);
    }

    $Thead.appendChild($Tr);
    $Table.appendChild($Thead);


    var $Tbody = document.createElement('tbody');
    for (var i = 0; i < 6; i ++) {
        var $Tr = document.createElement('tr');
        for (var j = 0; j < 7; j ++) {
            var $Td = document.createElement('td');
            $Tr.appendChild($Td);
        }
        $Tbody.appendChild($Tr);
    }
    $Table.appendChild($Tbody);

    dom.appendChild($Table);

    var dayNum;
    // console.log(oDate.month) // 5    6
    if ( oDate.month === 1 || oDate.month === 3 || oDate.month === 5 || oDate.month === 7 || oDate.month === 8 || oDate.month === 10 || oDate.month === 12 ) {
        dayNum = 31;
    } else if ( oDate.month === 4 || oDate.month === 6 || oDate.month === 9 || oDate.month === 11 ) {
        dayNum = 30;
    } else if ( oDate.month === 2 && isLeapYear(oDate.month) ) {
        dayNum = 29;
    } else {
        dayNum = 28;
    }

    var $TdCollection = dom.getElementsByTagName('td');
    // 注意是dom. 不是document. 当前这个dom

    // 此时还在showData函数里，oData是形参名，实参为dataDate
    var nowDay = oDate.oDateObj.getDate();
    // console.log(oDate.oDateObj.getDate()); // 17
    var nowMonth = oDate.month;

    oDate.oDateObj.setFullYear(oDate.year);
    oDate.oDateObj.setMonth(oDate.month - 1);  
    // console.log(oDate.month - 1);
    // 注意：是oDate.month - 1 因为oDate.month -> 5, 6 -> 取6 -> - 1 ;  
    oDate.oDateObj.setDate(1);

    // 看看是周几
    switch(oDate.oDateObj.getDay()) {
        case 0:
                createDay($TdCollection, 6, dayNum, nowMonth);
            break;
        case 1:
                createDay($TdCollection, 0, dayNum, nowMonth);
            break;
        case 2:
                createDay($TdCollection, 1, dayNum, nowMonth);
            break;
        case 3:
                createDay($TdCollection, 2, dayNum, nowMonth);
            break;
        case 4:
                createDay($TdCollection, 3, dayNum, nowMonth);
            break;
        case 5:
                createDay($TdCollection, 4, dayNum, nowMonth);
            break;
        case 6:
                createDay($TdCollection, 5, dayNum, nowMonth);
            break;
    }

}

