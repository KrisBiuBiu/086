const fs = require("fs");

const eightRandom = () => {
  var num = '';
  for (var i = 0; i < 8; i++) {
    if (i == 0) {
      num += Math.floor(Math.random() * 9 + 1);
    } else {
      num += Math.floor(Math.random() * 10);
    }
  };
  return num;
};

const threeRandom = () => {
  var num = '';
  for (var i = 0; i < 3; i++) {
    if (i == 0) {
      num += Math.floor(Math.random() * 9 + 1);
    } else {
      num += Math.floor(Math.random() * 10);
    }
  };
  return num;
};

const code12create = () => {
  let start = eightRandom();
  let end = threeRandom();
  console.log(`${start}4${end}`)
  return `${start}4${end}`
}

const code10create = () => {
  let start = eightRandom();
  console.log(`${start}66`)
}

const code1to27create = () => {
  let dayReal = ""
  let day = `${parseInt(Math.random() * (27) + 1)}`;
  if (day.length === 2) {
    dayReal = day
  } else {
    dayReal = `0${day}`
  }
  return dayReal
}

const code0to24create = () => {
  let hourReal = ""
  let hour = `${parseInt(Math.random() * (23) + 0)}`;
  if (hour.length === 2) {
    hourReal = hour
  } else {
    hourReal = `0${hour}`
  }
  return hourReal
}

const code0to60create = () => {
  let minuteReal = ""
  let minute = `${parseInt(Math.random() * (60) + 0)}`;
  if (minute.length === 2) {
    minuteReal = minute
  } else {
    minuteReal = `0${minute}`
  }
  return minuteReal
}

const code10to99create = () => {
  let minuteReal = ""
  let orderTypes = ["66", "74", "28", "31"];
  let minute = `${parseInt(Math.random() * (4) + 0)}`;
  return orderTypes[minute]
}

const countAndCost = () => {
  let costs = [
    {
      num: "50",
      cost: "2950",
    },
    {
      num: "100",
      cost: "5900",
    },
    {
      num: "100",
      cost: "5900",
    },
    {
      num: "80",
      cost: "4720",
    },
    {
      num: "90",
      cost: "5310",
    },
    {
      num: "100",
      cost: "5900",
    },
  ];

  let index = `${parseInt(Math.random() * (6) + 0)}`;
  return costs[index]
}

let meituanquan = () => {
  let meituan = ""
  for (var i = 0; i < 50; i++) {
    meituan += `
    <li>美团券密码： ${code12create()}<span> 已消费</span></li>`
  }
  return meituan;
}

let payTimeCreate = (time) => {
  let lastNum = time.substring((time.length - 2), (time.length));
  let minute = parseInt(Math.random() * (3) + 1);
  let lastStr = `${parseInt(lastNum) + minute}`;
  let firstStr = time.substring(0, (time.length - 2));
  let lastStrReal = lastStr.length === 1 ? `0${lastStr}` : `${lastStr}`
  return `${firstStr}${lastStrReal}`
}

const htmlFileCreate = () => {
  let years = ["2019", "2020", "2021"];
  let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  let orderTypes = ["66", "74", "28", "31"];
  for (var y = 0; y < years.length; y++) {
    for (var m = 0; m < months.length; m++) {
      for (var d = 0; d < 1; d++) {
        // console.log(`${years[y]}-${months[m]}-${code1to27create()} ${code0to24create()}:${code0to60create()}`);
        let orderTime = `${years[y]}-${months[m]}-${code1to27create()} ${code0to24create()}:${code0to60create()}`;
        let timeReal = `${orderTime}:${code0to60create()}`;
        let fileName = `${years[y]}${months[m]}${code1to27create()}`;
        // console.log(new Date(timeReal).getTime());
        let basicSec = 49462734;
        let basicStamp = 1559145600;
        let currentStamp = parseInt((`${new Date(timeReal).getTime()}`).substring(0, 10));
        // console.log(currentStamp);
        let minusStamp = (parseInt(currentStamp) - parseInt(basicStamp));
        let orderNum = `${basicSec + parseInt(minusStamp * 0.4)}${code10to99create()}`;
        let obj = countAndCost();
        let realCount = obj.num;
        let realCost = obj.cost;
        console.log(fileName, timeReal, orderTime, orderNum, realCount, realCost, payTimeCreate(orderTime));
        let content = `
          <html>
          <head>
          <style>
          .star-cont{display:inline-block;width:84px;height:24px;position:relative}.star-cont .stars-light,.star-cont .stars-ul{list-style:none;padding:0;text-align:left;margin:3px 0;white-space:nowrap;color:#c3c3c3}.star-cont .stars-light li,.star-cont .stars-ul li{margin:0!important;border:0!important;padding:0 2px;display:inline-block}.star-cont .stars-light li .iconfont,.star-cont .stars-ul li .iconfont{font-size:12px}.star-cont .stars-light{color:#F90;position:absolute;top:0;overflow:hidden}ul{margin:0;padding:0;list-style:none}.order{box-sizing:border-box;width:980px;margin:10px auto;padding:25px 25px 65px;border:1px solid #eee}.order h2{padding:0 0 10px;margin:0 0 10px;font-size:28px;color:#333;border-bottom:1px solid #ddd}.order .status a,.order h2 a{color:#2bb8aa;text-decoration:none}.order h2 a{float:right;margin-top:10px;font-size:14px;font-weight:400}.order .status{padding:8px 16px;margin:0 0 10px;font-size:12px;border:1px solid #f5d8a7;background-color:#fff6db}.order .status span{float:left}.order .status .refund-tip{float:right}.order .status .opts{margin-top:5px}.order .status .opts button{border:none;outline:0;cursor:pointer}.order .status .opts .comment-btn,.order .status .opts .pay-btn{display:inline-block;padding:1px 8px 0;background-color:#2db3a6;background-image:linear-gradient(to bottom,#2ec3b4,#2db3a6);color:#fff;line-height:1.5;letter-spacing:.1em;border:1px solid #008177;border-width:0 0 1px;border-radius:2px;-webkit-user-select:none;user-select:none;text-decoration:none;outline:0}.order .status .opts .comment-btn:hover,.order .status .opts .pay-btn:hover{background-color:#2eb7aa;background-image:linear-gradient(to bottom,#2bb8aa,#2eb7aa)}.order .status .opts .del-btn{background-color:transparent;color:#2db3a6}.order .status .comment{margin:8px 0 0;padding:5px 0 0;border-top:1px dashed #f76120}.order .status .comment p{margin:0;padding:0;line-height:1.5}.order .status .comment .title{font-weight:700}.order .status .comment .stars{display:inline-block;float:none}.order .status .comment .stars .star{display:inline-block;width:12px;height:12px;background:url(//p1.meituan.net/travelcube/68da5078a6e59a822fb4ee326ddf740a527.png) 0 -13px no-repeat}.order .status .comment .stars .star-full{background:url(//p1.meituan.net/travelcube/68da5078a6e59a822fb4ee326ddf740a527.png) top left no-repeat}.order .status ul{margin-left:84px}.order .status ul li{font-weight:700;color:#d00}.order .coupon{border:1px solid #e5e5e5;font-size:12px}.order .coupon dt{padding:5px 8px;font-size:14px;font-weight:700;color:#333;background-color:#eee}.order .coupon dd{padding:5px 8px 10px;margin:0}.order .coupon dd .outline{padding:5px 0 1px 10px;border:1px solid #eee;background-color:#eee;color:#999}.order .coupon dd .outline li{margin-bottom:5px}.order .coupon dd .order-info{overflow:hidden}.order .coupon dd .order-info li{float:left;width:25%;text-align:left;text-align: left;margin-bottom: 10px;font-size:12px}.order .coupon dd table{width:100%}.order .coupon dd table th{font-weight:700;text-align:center}.order .coupon dd table th:first-child{text-align:left}.order .coupon dd table td{text-align:center}.order .coupon dd table td:first-child{text-align:left}.order .coupon dd table td:last-child{color:#c33}.order .coupon dd table a{color:#2bb8aa;text-decoration:none}
          </style>
          </head>
          <body>
           <div id="app">
            <div class="order" data-reactroot="" data-reactid="1" data-react-checksum="1474108813">
             <h2 data-reactid="2">
              <!-- react-text: 3 -->订单详情
              <a href="/orders" data-reactid="4">返回我的订单</a></h2>
             <dl class="coupon" data-reactid="24">
              <div data-reactid="25">
               <dt data-reactid="26">
                美团券
               </dt>
               <dd data-reactid="27">
                <div class="outline" data-reactid="28">
                 <ul data-reactid="29" style="font-size:10px">
                  <li data-reactid="30">小提示：记下或拍下美团券密码向商家出示即可消费，无需等待短信</li>
                  <li data-reactid="31">
                  ${meituanquan()}
                 </ul>
                </div>
               </dd>
              </div>
              <dt data-reactid="431">
               订单信息
              </dt>
              <dd data-reactid="432">
               <ul class="order-info" data-reactid="433">
                <li data-reactid="434">
                 <!-- react-text: 435 -->订单编号：

                 <!-- react-text: 436 -->${orderNum}
                 </li>
                <li data-reactid="437">
                 <!-- react-text: 438 -->下单时间：

                 <!-- react-text: 439 -->${orderTime}
                 </li>
                <li data-reactid="440">
                 <!-- react-text: 441 -->付款方式：

                 <!-- react-text: 442 -->支付宝极简收银台支付
                 </li>
                <li data-reactid="443">
                 <!-- react-text: 444 -->付款时间：

                 <!-- react-text: 445 -->${payTimeCreate(orderTime)}
                 </li>
               </ul>
              </dd>
              <div data-reactid="446">
               <dt data-reactid="447">
                团购信息
               </dt>
               <dd data-reactid="448">
                <table data-reactid="449" style="
                font-size: 12px;
            ">
                 <tbody data-reactid="450">
                  <tr data-reactid="451">
                   <th width="100" data-reactid="452">团购项目</th>
                   <th width="50" data-reactid="453">单价</th>
                   <th width="10" data-reactid="454"></th>
                   <th width="50" data-reactid="455">数量</th>
                   <th width="10" data-reactid="456"></th>
                   <th width="50" data-reactid="457">优惠</th>
                   <th width="10" data-reactid="458"></th>
                   <th width="54" data-reactid="459">支付金额</th>
                  </tr>
                  <tr data-reactid="460">
                   <td data-reactid="461"><a href="/meishi/d2443804.html" data-reactid="462">免费WiFi</a>
                    <!-- react-text: 463 --> 
                    </td>
                   <td data-reactid="464">59</td>
                   <td data-reactid="465">x</td>
                   <td data-reactid="466">${realCount}</td>
                   <td data-reactid="467">-</td>
                   <td data-reactid="468">0</td>
                   <td data-reactid="469">=</td>
                   <td data-reactid="470">
                    <!-- react-text: 471 -->&yen;

                    <!-- react-text: 472 -->${realCost}
                    </td>
                  </tr>
                 </tbody>
                </table>
               </dd>
              </div>
             </dl>
            </div>
           </div>
          </body>
         </html>
          `;
        fs.writeFileSync(`./orders/${fileName}.html`, content)
      }
    }
  }
}

htmlFileCreate()

// code12create()
// code10create()
// code1to27create()
// code0to24create()
// code0to60create()